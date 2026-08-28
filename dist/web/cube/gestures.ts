// Touch. This is the app.
//
// Three gestures share one pointer stream. A single raycast at touch-down tells the
// first two apart: land on a sticker and you are turning a layer, land on the
// background and you are orbiting. A second finger promotes either into a pinch.
//
// The raycast happens ONCE, at touch-down. Everything after is driven from the 2D
// screen delta, so nothing re-raycasts a moving mesh sixty times a second.

import { Vector3 } from 'three';
import { TURNS, type Move, type TurnBase, type Vec3 } from '../../cube/state';
import type { CubeRenderer } from './renderer';
import { defaultOrientation, ZOOM_MAX, ZOOM_MIN, ZOOM_REST, ZOOM_RUBBER_R } from './renderer';
import { prefersReducedMotion, REDUCED_SETTLE_MS } from './motion';

const DEG = Math.PI / 180;

/**
 * A quarter turn per `TURN_GAIN * S * max(TANGENT_FLOOR, |t|)` px of drag along the
 * layer's screen tangent, where S is one world unit in px and |t| is how much of that
 * tangent survives projection -- 1 in the screen plane, 0 pointing at the camera.
 *
 * The floor is a guard, and free rotation is what made it necessary. A face turned
 * nearly edge-on has |t| approaching zero, and an uncompensated 1:1 gain explodes; the
 * clamped orbit could never reach that pose and a free one can.
 */
const TURN_GAIN = 1.06;
const TANGENT_FLOOR = 0.62;
/**
 * One quarter turn is the most a single drag can do, and the layer cannot be dragged
 * past it. Design allowed 180deg of live travel; a fast swipe then carried the layer
 * past 90 and committed two quarters at once, which is not what a hand on a cube
 * expects -- you turn a face, you do not spin it.
 */
const LIVE_CLAMP = 90 * DEG;
/**
 * Travel before the rotation axis is resolved and then locked for the gesture.
 *
 * Was 8px, which is inside the distance a thumb's contact patch rolls before the stroke
 * has any direction at all -- so the axis was decided from the noisiest part of the
 * gesture and then held for the rest of it.
 */
const AXIS_LOCK_PX = 13;
/**
 * How far the winning axis must beat the runner-up before the lock is taken.
 *
 * A sticker offers exactly two candidate axes, and their screen tangents sit roughly 60
 * degrees apart rather than square, so a drag aimed between them scores both almost
 * equally and taking the larger is a coin flip. That coin flip is the "it rotated a face
 * I didn't intend" report. 1.25 means "within about 19 degrees of one tangent"; anything
 * vaguer keeps sampling rather than guessing.
 */
const AXIS_MARGIN = 1.25;
/**
 * Past this, take the best candidate anyway. A drag that never sharpens still has to turn
 * something -- stalling forever is a worse answer than a considered guess.
 */
const AXIS_DECIDE_PX = 30;
/**
 * Release angular speed at or above which a flick fires in the direction of travel.
 *
 * This was 900deg/s, which is a quarter turn in 100ms -- reachable only by swiping hard.
 * That number was defence against a one-frame release velocity, not a judgement about
 * flicks: a jitter pixel on the last pointermove had to stay under it. The velocity is
 * windowed now, so the threshold can describe an actual flick again.
 */
const FLICK_RAD_PER_S = 400 * DEG;

const ORBIT_DECAY_MS = 400;
/** Below the rotation this rate of drag produces, momentum simply stops. */
const ORBIT_CUTOFF_PXPS = 26;
/**
 * Momentum reads the last 60ms of pointer history, never a single final frame. On iOS
 * the last pointermove before a lift routinely carries a 2ms dt and a jitter pixel,
 * which as a one-frame velocity reads as a violent flick nobody asked for.
 */
const VELOCITY_WINDOW_MS = 60;

/** A tap: short, and under the axis-lock threshold, so it can never have turned a layer. */
const TAP_MAX_MS = 220;
const TAP_MAX_PX = 8;
const DOUBLE_TAP_MS = 280;
const VIEW_RESET_MS = 260;

/** Pinch travels a little before it engages, so resting two fingers is not a zoom. */
const PINCH_THRESHOLD_PX = 12;

const TURN_SPRING = { stiffness: 520, damping: 26, mass: 0.55 };

export interface GestureCallbacks {
  /** A layer has been grabbed. Used to lift the layer and trace its boundary. */
  onGrab(base: TurnBase): void;
  /** The gesture ended without committing a turn. */
  onRelease(): void;
  /** A quarter turn has settled and should be applied to the logical cube. */
  onCommit(move: Move): void;
  /** The nearest quarter turn changed. Plays the detent tick. */
  onDetent(): void;
  /** A turn has been released and is springing to its target. Plays the clack. */
  onSnapStart(settleMs: number): void;
}

interface TurnDrag {
  kind: 'turn';
  base: TurnBase;
  /** Screen-space unit vector, y-up, along which dragging turns the layer clockwise. */
  tangent: { x: number; y: number };
  /** How much of that unit tangent survived projection. Feeds the gain. */
  tangentLength: number;
  startX: number;
  startY: number;
  angle: number;
  /** Recent angle samples, for a windowed release velocity. The orbit already had this. */
  history: { t: number; angle: number }[];
  detent: number;
}

interface PendingDrag {
  kind: 'pending';
  cubieIndex: number;
  normal: Vec3;
  startX: number;
  startY: number;
  /**
   * When the finger landed. The turn's velocity window is seeded from here, because the
   * angle at the moment the axis locks is NOT zero -- the finger has already travelled
   * AXIS_LOCK_PX. Seeding the window with a zero at lock time claims all of that angle
   * accrued in the instant of locking, which reads as a flick on a slow, careful drag.
   */
  startTime: number;
}

interface OrbitDrag {
  kind: 'orbit';
  lastX: number;
  lastY: number;
  /** Recent pointer samples, for a windowed release velocity. */
  history: { t: number; x: number; y: number }[];
}

/**
 * Two fingers scale AND orbit at once, over any pixel.
 *
 * They have to. Zoomed all the way in the cube fills the stage and there is no
 * background left to grab, so a background-only orbit would strand the user at exactly
 * the zoom where turning it matters most.
 */
interface PinchDrag {
  kind: 'pinch';
  startSpan: number;
  startZoom: number;
  lastCentroid: { x: number; y: number };
  engaged: boolean;
}

/**
 * A touch whose raycast is held over to the next move event.
 *
 * Landing a still-settling turn on pointerdown fires `onCommit`, which reaches the
 * renderer through React. The cubie transforms `pickSticker` raycasts are therefore the
 * PRE-commit ones for the rest of that tick, and picking against them would grab the
 * piece that used to be under the finger. One event later they are current.
 */
interface DeferredDrag {
  kind: 'deferred';
  x: number;
  y: number;
  t: number;
}

type Drag = PendingDrag | TurnDrag | OrbitDrag | PinchDrag | DeferredDrag | null;

const AXES: Vec3[] = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

/** The move whose layer is `layer` on `axis`. Every axis/layer pair is a real move. */
export function baseFor(axis: number, layer: number): TurnBase | null {
  for (const [name, spec] of Object.entries(TURNS)) {
    if (spec.axis === axis && spec.layer === layer) return name as TurnBase;
  }
  return null;
}

/**
 * Which layer a drag turns, and which screen direction turns it clockwise.
 *
 * A sticker gives exactly two candidate axes: the two perpendicular to its outward
 * normal. Under a rotation about axis `a`, the grabbed point moves along `a x p`, so
 * projecting both candidates to the screen and taking the one the drag agrees with
 * more resolves the ambiguity. It is then locked for the rest of the gesture, so a
 * curving thumb cannot switch layers halfway through a turn.
 *
 * Both the drag and the projection are +y UP here. They were not always: the renderer
 * used to return a y-down projection while this compared it against a y-up drag, which
 * inverted every turn that needed a vertical drag. See `project.ts`.
 */
export function resolveAxis(
  renderer: CubeRenderer,
  cubieIndex: number,
  normal: Vec3,
  dragX: number,
  dragY: number,
): { base: TurnBase; tangent: { x: number; y: number }; tangentLength: number; confidence: number } | null {
  const coords = renderer.cubieCoords(cubieIndex);
  // Pointer y grows downward; flip it so both sides of the dot product are y-up.
  const drag = { x: dragX, y: -dragY };

  let best: { base: TurnBase; tangent: { x: number; y: number }; tangentLength: number; score: number } | null = null;
  /** The best score this drag did NOT pick. How close the two candidates ran. */
  let runnerUp = 0;

  for (let axis = 0; axis < 3; axis++) {
    if (normal[axis] !== 0) continue; // a rotation about the sticker's own normal spins it in place
    const motion = cross(AXES[axis], coords);
    if (motion.every((v) => v === 0)) continue;
    const screen = renderer.projectTangent(coords, motion);
    const base = baseFor(axis, coords[axis]);
    if (!base) continue;

    // `motion` is the velocity under a POSITIVE rotation about the positive axis.
    // Convert to the move's own clockwise sense so the caller never has to think
    // about right-hand rules again.
    const flip = TURNS[base].negIsCw ? -1 : 1;
    const tangent = { x: screen.x * flip, y: screen.y * flip };
    const score = tangent.x * drag.x + tangent.y * drag.y;
    if (!best || Math.abs(score) > Math.abs(best.score)) {
      if (best) runnerUp = Math.abs(best.score);
      best = { base, tangent, tangentLength: screen.length, score };
    } else if (Math.abs(score) > runnerUp) {
      runnerUp = Math.abs(score);
    }
  }
  if (!best) return null;

  // Infinite when the runner-up scores nothing at all -- a drag straight along one
  // tangent, which is as decisive as this gets.
  const confidence = runnerUp > 1e-6 ? Math.abs(best.score) / runnerUp : Number.POSITIVE_INFINITY;
  return { base: best.base, tangent: best.tangent, tangentLength: best.tangentLength, confidence };
}

/**
 * Angular speed over the last `VELOCITY_WINDOW_MS`, never a single frame.
 *
 * The turn read a one-frame delta while the orbit read a window, and the window's own
 * comment says why that is wrong: on iOS the last pointermove before a lift routinely
 * carries a 2ms dt and a jitter pixel. As a one-frame velocity that reads as a flick
 * nobody asked for -- and, worse in practice, any pause before lifting reads as a dead
 * stop, which killed the flick branch and forced the full 45 degrees. The guard existed;
 * it was simply never applied to the gesture that matters most.
 */
export function releaseVelocity(history: readonly { t: number; angle: number }[]): number {
  if (history.length < 2) return 0;
  const first = history[0];
  const last = history[history.length - 1];
  const dt = (last.t - first.t) / 1000;
  if (dt <= 0) return 0;
  return (last.angle - first.angle) / dt;
}

export class CubeGestures {
  private drag: Drag = null;
  private animation = 0;
  /** Set while a turn is springing to its target: finishes it early and commits. */
  private landTurn: (() => void) | null = null;
  /** Tracked apart from `animation` so a touch can kill a glide without killing a snap. */
  private momentum = 0;
  /**
   * -Infinity, not 0. Starting at zero makes the very FIRST tap look like the second
   * half of a double tap whenever the clock is near zero -- masked in the app because
   * performance.now() is large by then, and caught immediately by a test clock that
   * starts at 0. A real one would have surfaced on a page that had just loaded.
   */
  private lastTapEndedAt = Number.NEGATIVE_INFINITY;
  private pressedAt = 0;
  private pressedAtXY = { x: 0, y: 0 };
  /** Live contacts, so a second finger can promote a drag into a pinch. */
  private readonly pointers = new Map<number, { x: number; y: number }>();

  /**
   * The clock and the frame scheduler are injected rather than reached for directly.
   * That is not test decoration: a turn commits at the END of a spring animation, so
   * without an injectable scheduler the single most important interaction in this app
   * could only be verified by watching it, and requestAnimationFrame does not run at
   * all in a backgrounded tab.
   */
  constructor(
    private readonly renderer: CubeRenderer,
    private readonly callbacks: GestureCallbacks,
    private readonly scheduler: {
      now: () => number;
      raf: (cb: () => void) => number;
      caf: (handle: number) => void;
    } = { now: () => performance.now(), raf: (cb) => requestAnimationFrame(cb), caf: (h) => cancelAnimationFrame(h) },
  ) {
    const el = renderer.canvas;
    el.addEventListener('pointerdown', this.onDown);
    el.addEventListener('pointermove', this.onMove);
    el.addEventListener('pointerup', this.onUp);
    el.addEventListener('pointercancel', this.onUp);
  }

  dispose(): void {
    const el = this.renderer.canvas;
    el.removeEventListener('pointerdown', this.onDown);
    el.removeEventListener('pointermove', this.onMove);
    el.removeEventListener('pointerup', this.onUp);
    el.removeEventListener('pointercancel', this.onUp);
    this.scheduler.caf(this.animation);
    this.scheduler.caf(this.momentum);
  }

  /** True while a turn is springing to its target, so input is ignored until it lands. */
  get animating(): boolean {
    return this.animation !== 0;
  }

  private pinchDistance(): number {
    const [a, b] = [...this.pointers.values()];
    return a && b ? Math.hypot(a.x - b.x, a.y - b.y) : 0;
  }

  private centroid(): { x: number; y: number } {
    const all = [...this.pointers.values()];
    if (all.length === 0) return { x: 0, y: 0 };
    return {
      x: all.reduce((n, p) => n + p.x, 0) / all.length,
      y: all.reduce((n, p) => n + p.y, 0) / all.length,
    };
  }

  private stopMomentum(): void {
    if (this.momentum) {
      this.scheduler.caf(this.momentum);
      this.momentum = 0;
    }
  }

  /**
   * Cancel whatever is currently driving the view.
   *
   * `animation` is written by the turn spring, the view reset and the reduced-motion
   * glide alike. Starting one without cancelling the last left two frame loops running,
   * fighting over orientation and zoom, with whichever finished first zeroing the
   * shared handle while the other kept going underneath the next gesture.
   */
  private stopAnimation(): void {
    if (this.animation) {
      this.scheduler.caf(this.animation);
      this.animation = 0;
    }
  }

  /**
   * Zoom past a limit resists rather than stopping dead.
   *
   * A hard stop is indistinguishable from a frozen app on a device with no vibration
   * API -- the same argument the refusal spec makes for a locked drag -- so the limits
   * reuse the refusal's asymptotic shape rather than inventing a third vocabulary.
   * The ceiling is 17% past either end, reached by pulling and never by accident.
   */
  private setZoomRubberBanded(f: number): void {
    const limit = f > ZOOM_MAX ? ZOOM_MAX : f < ZOOM_MIN ? ZOOM_MIN : null;
    if (limit === null) {
      this.renderer.setZoom(f);
      return;
    }
    const u = Math.log(f / limit);
    const eased = Math.sign(u) * ZOOM_RUBBER_R * (1 - Math.exp(-Math.abs(u) / ZOOM_RUBBER_R));
    this.renderer.setZoom(limit * Math.exp(eased));
  }

  /** Let go past a limit and it springs back to it. This is the refuse spring. */
  private settleZoom(): void {
    const f = this.renderer.getZoom();
    const target = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, f));
    if (Math.abs(Math.log(f / target)) < 1e-4) return;
    this.spring(Math.log(f), Math.log(target), 0, { stiffness: 700, damping: 34, mass: 0.5 }, (v) =>
      this.renderer.setZoom(Math.exp(v)),
    );
  }

  private onDown = (event: PointerEvent): void => {
    event.preventDefault();
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    this.pressedAt = this.scheduler.now();
    this.pressedAtXY = { x: event.clientX, y: event.clientY };

    // Touching the cube kills any momentum on the same frame. Without that release
    // valve a 400ms decay is a nuisance mid-solve; with it, the cube stops dead under
    // your finger, which is what a real one does.
    this.stopMomentum();

    // A second finger means scale and orbit together, whatever the first was doing --
    // but a turn in progress has to be put down properly first. Without this the layer
    // keeps its live rotation applied every frame and sits frozen mid-turn until the
    // user happens to start and finish another turn.
    if (this.pointers.size === 2) {
      if (this.drag?.kind === 'turn') {
        this.renderer.setLayerRotation(null, 0);
        this.callbacks.onRelease();
      }
      this.landSettlingTurn();
      // A pinch must not start on top of a running spring or reset either; they would
      // fight over orientation and zoom every frame.
      this.stopAnimation();
      this.drag = {
        kind: 'pinch',
        startSpan: this.pinchDistance(),
        startZoom: this.renderer.getZoom(),
        lastCentroid: this.centroid(),
        engaged: false,
      };
      return;
    }
    if (this.pointers.size > 2) return;

    // A turn still springing is LANDED, not allowed to eat this touch. It used to be
    // `if (this.animating) return`, which threw away every pointerdown for the ~200ms
    // the spring ran: turning at speed silently lost every second turn, and the cube
    // read as heavy rather than as unresponsive. A view reset or zoom settle has
    // nothing to commit, so it is simply stopped.
    const landed = this.landTurn !== null;
    this.landSettlingTurn();
    this.stopAnimation();

    try {
      this.renderer.canvas.setPointerCapture(event.pointerId);
    } catch {
      // A synthetic or already-captured pointer. Capture keeps a drag alive past the
      // canvas edge; it is not required for the gesture to work.
    }

    if (landed) {
      // The commit has not reached the renderer yet. Pick on the next move instead.
      this.drag = { kind: 'deferred', x: event.clientX, y: event.clientY, t: this.pressedAt };
      return;
    }

    const hit = this.renderer.pickSticker(event.clientX, event.clientY);
    if (hit) {
      this.drag = {
        kind: 'pending',
        cubieIndex: hit.cubieIndex,
        normal: hit.worldNormal,
        startX: event.clientX,
        startY: event.clientY,
        startTime: this.pressedAt,
      };
      return;
    }

    this.drag = {
      kind: 'orbit',
      lastX: event.clientX,
      lastY: event.clientY,
      history: [{ t: this.scheduler.now(), x: event.clientX, y: event.clientY }],
    };
  };

  // The state mutation happens synchronously here and only the redraw is left to the
  // render loop. Batching the mutation into the loop instead lets a pointerup commit
  // run before the next frame, writing back the pre-drag value -- the user drags, sees
  // the layer follow, releases, and watches the turn silently revert.
  private onMove = (event: PointerEvent): void => {
    if (this.pointers.has(event.pointerId)) {
      this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    }
    let drag = this.drag;
    if (!drag) return;
    event.preventDefault();

    if (drag.kind === 'deferred') {
      const hit = this.renderer.pickSticker(drag.x, drag.y);
      // Measured from where the finger LANDED, not from here, so the turn that follows
      // is the one the whole stroke asked for.
      this.drag = hit
        ? {
            kind: 'pending',
            cubieIndex: hit.cubieIndex,
            normal: hit.worldNormal,
            startX: drag.x,
            startY: drag.y,
            startTime: drag.t,
          }
        : { kind: 'orbit', lastX: drag.x, lastY: drag.y, history: [{ t: drag.t, x: drag.x, y: drag.y }] };
      drag = this.drag;
    }

    if (drag.kind === 'pinch') {
      const span = this.pinchDistance();
      const centre = this.centroid();
      if (!span || !drag.startSpan) return;

      // The centroid orbits even before the span has moved enough to be a zoom, so two
      // fingers can always turn the cube.
      this.renderer.orbitBy(centre.x - drag.lastCentroid.x, centre.y - drag.lastCentroid.y);
      drag.lastCentroid = centre;

      if (!drag.engaged && Math.abs(span - drag.startSpan) < PINCH_THRESHOLD_PX) return;
      drag.engaged = true;
      // Fingers apart means a bigger cube: f follows the span directly.
      this.setZoomRubberBanded(drag.startZoom * (span / drag.startSpan));
      return;
    }

    if (drag.kind === 'orbit') {
      // Incremental, about the axes the screen defines right now -- which is what makes
      // this continuous in every direction with no clamp and no gimbal lock.
      this.renderer.orbitBy(event.clientX - drag.lastX, event.clientY - drag.lastY);
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;

      const t = this.scheduler.now();
      drag.history.push({ t, x: event.clientX, y: event.clientY });
      while (drag.history.length > 2 && t - drag.history[0].t > VELOCITY_WINDOW_MS) drag.history.shift();
      return;
    }

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;

    if (drag.kind === 'pending') {
      const travel = Math.hypot(dx, dy);
      if (travel < AXIS_LOCK_PX) return;
      const resolved = resolveAxis(this.renderer, drag.cubieIndex, drag.normal, dx, dy);
      if (!resolved) return;
      // Nothing has moved yet, so waiting costs nothing and guessing costs a wrong turn.
      if (resolved.confidence < AXIS_MARGIN && travel < AXIS_DECIDE_PX) return;
      this.drag = {
        kind: 'turn',
        base: resolved.base,
        tangent: resolved.tangent,
        tangentLength: resolved.tangentLength,
        startX: drag.startX,
        startY: drag.startY,
        angle: 0,
        history: [{ t: drag.startTime, angle: 0 }],
        detent: 0,
      };
      this.callbacks.onGrab(resolved.base);
      this.applyTurn(this.drag as TurnDrag, dx, dy);
      return;
    }

    this.applyTurn(drag, dx, dy);
  };

  private applyTurn(drag: TurnDrag, dx: number, dy: number): void {
    // Per quarter turn: TURN_GAIN * S * max(floor, |t|) px along the tangent. Stated in
    // the cube's own on-screen units, so a zoomed-in cube is heavier to turn -- the same
    // rule the trackball follows, and physically honest for a bigger object.
    const perQuarter = TURN_GAIN * this.renderer.unitScreenPx() * Math.max(TANGENT_FLOOR, drag.tangentLength);
    // Only the component of the drag along the layer's tangent turns it. Both are y-up.
    const along = dx * drag.tangent.x + -dy * drag.tangent.y;
    const raw = (along / (perQuarter || 1)) * (90 * DEG);
    const angle = Math.max(-LIVE_CLAMP, Math.min(LIVE_CLAMP, raw));

    const t = this.scheduler.now();
    drag.angle = angle;
    drag.history.push({ t, angle });
    while (drag.history.length > 2 && t - drag.history[0].t > VELOCITY_WINDOW_MS) drag.history.shift();

    // The detent: crossing a 45-degree boundary is the moment the nearest quarter turn
    // changes. It is the difference between dragging a shape and turning a mechanism.
    const detent = Math.round(angle / (90 * DEG));
    if (detent !== drag.detent) {
      drag.detent = detent;
      this.callbacks.onDetent();
    }

    this.renderer.setLayerRotation(drag.base, angle);
  }

  private onUp = (event: PointerEvent): void => {
    this.pointers.delete(event.pointerId);
    const drag = this.drag;

    // A tap is short and barely moves -- under the axis-lock threshold, so it can never
    // have committed a turn. Two of them reset the view.
    const now = this.scheduler.now();
    const travel = Math.hypot(event.clientX - this.pressedAtXY.x, event.clientY - this.pressedAtXY.y);
    if (now - this.pressedAt <= TAP_MAX_MS && travel <= TAP_MAX_PX) {
      if (now - this.lastTapEndedAt <= DOUBLE_TAP_MS) {
        this.lastTapEndedAt = Number.NEGATIVE_INFINITY;
        this.drag = null;
        this.resetView();
        return;
      }
      this.lastTapEndedAt = now;
    }

    // Lifting one finger of a pinch ends the pinch rather than resuming an orbit
    // mid-gesture, which would jump the cube.
    if (drag?.kind === 'pinch') {
      if (this.pointers.size < 2) {
        this.drag = null;
        this.settleZoom();
      }
      return;
    }

    this.drag = null;
    if (!drag) return;
    try {
      this.renderer.canvas.releasePointerCapture(event.pointerId);
    } catch {
      // Already released; nothing to undo.
    }

    if (drag.kind === 'deferred') return;
    if (drag.kind === 'pending') {
      this.callbacks.onRelease();
      return;
    }
    if (drag.kind === 'orbit') {
      this.glideOrbit(drag);
      return;
    }
    this.settleTurn(drag);
  };

  private settleTurn(drag: TurnDrag): void {
    const quarter = 90 * DEG;
    const velocity = releaseVelocity(drag.history);
    // A flick fires to the next quarter turn in the direction of travel even if the
    // layer has moved less than 45 degrees. That is what makes a flick feel like a
    // flick rather than like a command.
    // A flick fires to the next quarter in the direction of travel even under 45deg;
    // both branches are then held to a single quarter, so a hard swipe and a slow drag
    // commit the same amount and only the feel differs.
    const raw =
      Math.abs(velocity) >= FLICK_RAD_PER_S
        ? (velocity > 0 ? Math.floor(drag.angle / quarter) + 1 : Math.ceil(drag.angle / quarter) - 1)
        : Math.round(drag.angle / quarter);
    const target = Math.max(-1, Math.min(1, raw)) * quarter;

    this.callbacks.onSnapStart(170);

    // Idempotent on purpose. Two things can reach it -- the spring finishing on its own
    // and a new touch landing it early -- and a turn committed twice is a move the user
    // never made.
    let landed = false;
    const land = (): void => {
      if (landed) return;
      landed = true;
      this.landTurn = null;
      // Never more than one quarter, whatever the flick did.
      const quarters = Math.max(-1, Math.min(1, Math.round(target / quarter)));
      const amount = ((quarters % 4) + 4) % 4;
      this.renderer.setLayerRotation(null, 0);
      if (amount === 0) {
        this.callbacks.onRelease();
        return;
      }
      this.callbacks.onCommit({ base: drag.base, amount: amount as 1 | 2 | 3 });
    };
    this.landTurn = land;

    // The release velocity is carried into the spring as initial velocity.
    this.spring(drag.angle, target, velocity, TURN_SPRING, (value) => this.renderer.setLayerRotation(drag.base, value), land);
  }

  /**
   * Finish a turn that is still springing, right now, and commit it.
   *
   * The turn is already decided by the time the spring starts -- the spring is how it
   * looks, not what it does -- so landing it early loses nothing but the animation.
   */
  private landSettlingTurn(): void {
    const land = this.landTurn;
    if (!land) return;
    this.stopAnimation();
    land();
  }

  /**
   * Momentum, and nothing after it. The orbit used to settle onto one of eight
   * canonical poses; it does not any more, because a cube that repositions itself when
   * you let go is not a cube you are holding.
   */
  private glideOrbit(drag: OrbitDrag): void {
    if (prefersReducedMotion()) return;

    // Velocity over the last window, never a single frame delta.
    const history = drag.history;
    if (history.length < 2) return;
    const first = history[0];
    const last = history[history.length - 1];
    const dt = (last.t - first.t) / 1000;
    if (dt <= 0) return;

    const dx = last.x - first.x;
    const dy = last.y - first.y;
    let speed = Math.hypot(dx, dy) / dt; // px per second
    if (speed < ORBIT_CUTOFF_PXPS) return;

    // The axis is captured once and stays screen-fixed: the cube turns under it rather
    // than it turning with the cube, so a glide keeps going the way the finger went.
    const axis = new Vector3(dy, dx, 0).normalize();
    const perPx = Math.PI / this.renderer.faceWidthPx();
    let last_t = this.scheduler.now();

    const glide = (): void => {
      const t = this.scheduler.now();
      const step = Math.min(0.05, Math.max(0.001, (t - last_t) / 1000));
      last_t = t;
      speed *= Math.exp(-(step * 1000) / ORBIT_DECAY_MS);
      this.renderer.spinBy(axis, speed * step * perPx);

      if (speed > ORBIT_CUTOFF_PXPS) {
        this.momentum = this.scheduler.raf(glide);
        return;
      }
      this.momentum = 0;
    };

    this.momentum = this.scheduler.raf(glide);
  }

  /** Double tap anywhere in the stage returns the view to where it started. */
  private resetView(): void {
    this.stopMomentum();
    // A double tap can land while a turn's commit spring is still settling. Cancel it
    // rather than run a second loop against the same orientation.
    this.stopAnimation();
    const fromQ = this.renderer.orientationQuaternion();
    const toQ = defaultOrientation();
    const fromF = this.renderer.getZoom();
    const start = this.scheduler.now();

    const step = (): void => {
      const raw = Math.min(1, (this.scheduler.now() - start) / VIEW_RESET_MS);
      // cubic-bezier(0.16, 1, 0.3, 1), near enough for a 260ms view move.
      const p = 1 - (1 - raw) ** 3;
      const q = fromQ.clone().slerp(toQ, p); // shortest arc
      this.renderer.setOrientation(q);
      this.renderer.setZoom(fromF + (ZOOM_REST - fromF) * p);
      if (raw < 1) {
        this.animation = this.scheduler.raf(step);
        return;
      }
      this.animation = 0;
    };
    this.animation = this.scheduler.raf(step);
  }

  /**
   * Semi-implicit Euler on a real spring, so the release velocity is carried into the
   * animation rather than replaced by a fixed curve. The turn spring is tuned to about
   * 2.3% overshoot: critically damped reads as software, and more than about 5% reads
   * as rubber.
   */
  private spring(
    from: number,
    to: number,
    velocity: number,
    { stiffness, damping, mass }: { stiffness: number; damping: number; mass: number },
    onValue: (value: number) => void,
    onDone?: () => void,
  ): void {
    if (prefersReducedMotion()) {
      // Still animated, because a turn that teleports is harder to follow than one
      // that moves -- just short, linear, and with no overshoot to read as bounce.
      const start = this.scheduler.now();
      const glide = (): void => {
        const t = Math.min(1, (this.scheduler.now() - start) / REDUCED_SETTLE_MS);
        onValue(from + (to - from) * t);
        if (t < 1) {
          this.animation = this.scheduler.raf(glide);
          return;
        }
        this.animation = 0;
        onDone?.();
      };
      this.animation = this.scheduler.raf(glide);
      return;
    }

    let x = from;
    let v = velocity;
    let last = this.scheduler.now();

    const step = (): void => {
      const t = this.scheduler.now();
      const dt = Math.min(0.032, Math.max(0.001, (t - last) / 1000));
      last = t;
      const acceleration = (-stiffness * (x - to) - damping * v) / mass;
      v += acceleration * dt;
      x += v * dt;
      onValue(x);

      if (Math.abs(x - to) > 0.0015 || Math.abs(v) > 0.02) {
        this.animation = this.scheduler.raf(step);
        return;
      }
      onValue(to);
      this.animation = 0;
      onDone?.();
    };

    this.animation = this.scheduler.raf(step);
  }
}

export const DEFAULTS = {
  TURN_GAIN,
  TANGENT_FLOOR,
  FLICK_RAD_PER_S,
  AXIS_LOCK_PX,
  AXIS_MARGIN,
  AXIS_DECIDE_PX,
  PINCH_THRESHOLD_PX,
  ORBIT_DECAY_MS,
  ORBIT_CUTOFF_PXPS,
  VELOCITY_WINDOW_MS,
  TAP_MAX_MS,
  TAP_MAX_PX,
  DOUBLE_TAP_MS,
};

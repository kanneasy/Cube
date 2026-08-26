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
import { prefersReducedMotion, REDUCED_SETTLE_MS } from './motion';

const DEG = Math.PI / 180;

/** A drag of this fraction of one on-screen cube edge, along the tangent, is 90 degrees. */
const TURN_GAIN = 0.42;
/** Live rotation is clamped so a runaway drag cannot spin a layer indefinitely. */
const LIVE_CLAMP = 180 * DEG;
/** Travel before the rotation axis is resolved and then locked for the gesture. */
const AXIS_LOCK_PX = 8;
/** Release angular speed at or above which a flick fires in the direction of travel. */
const FLICK_RAD_PER_S = 900 * DEG;

/** Orbit: a drag of this fraction of viewport width is 180 degrees, on either axis. */
const ORBIT_GAIN = 0.55;
const ORBIT_DECAY_MS = 260;
const ORBIT_CUTOFF = 12 * DEG;

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
  startX: number;
  startY: number;
  angle: number;
  lastAngle: number;
  lastTime: number;
  velocity: number;
  detent: number;
}

interface PendingDrag {
  kind: 'pending';
  cubieIndex: number;
  normal: Vec3;
  startX: number;
  startY: number;
}

interface OrbitDrag {
  kind: 'orbit';
  lastX: number;
  lastY: number;
  lastTime: number;
  /** Radians per second about the screen's own right and up axes. */
  velocityRight: number;
  velocityDown: number;
}

/** Two fingers: the cube stops turning and starts scaling. */
interface PinchDrag {
  kind: 'pinch';
  startDistance: number;
  startZoom: number;
  engaged: boolean;
}

type Drag = PendingDrag | TurnDrag | OrbitDrag | PinchDrag | null;

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
): { base: TurnBase; tangent: { x: number; y: number } } | null {
  const coords = renderer.cubieCoords(cubieIndex);
  // Pointer y grows downward; flip it so both sides of the dot product are y-up.
  const drag = { x: dragX, y: -dragY };

  let best: { base: TurnBase; tangent: { x: number; y: number }; score: number } | null = null;

  for (let axis = 0; axis < 3; axis++) {
    if (normal[axis] !== 0) continue; // a rotation about the sticker's own normal spins it in place
    const motion = cross(AXES[axis], coords);
    if (motion.every((v) => v === 0)) continue;
    const screen = renderer.projectDirection(coords, motion);
    const base = baseFor(axis, coords[axis]);
    if (!base) continue;

    // `motion` is the velocity under a POSITIVE rotation about the positive axis.
    // Convert to the move's own clockwise sense so the caller never has to think
    // about right-hand rules again.
    const flip = TURNS[base].negIsCw ? -1 : 1;
    const tangent = { x: screen.x * flip, y: screen.y * flip };
    const score = tangent.x * drag.x + tangent.y * drag.y;
    if (!best || Math.abs(score) > Math.abs(best.score)) best = { base, tangent, score };
  }

  return best ? { base: best.base, tangent: best.tangent } : null;
}

export class CubeGestures {
  private drag: Drag = null;
  private animation = 0;
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
  }

  /** True while a turn is springing to its target, so input is ignored until it lands. */
  get animating(): boolean {
    return this.animation !== 0;
  }

  private pinchDistance(): number {
    const [a, b] = [...this.pointers.values()];
    return a && b ? Math.hypot(a.x - b.x, a.y - b.y) : 0;
  }

  private onDown = (event: PointerEvent): void => {
    event.preventDefault();
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    // A second finger always means zoom, whatever the first one was doing.
    if (this.pointers.size === 2) {
      this.drag = {
        kind: 'pinch',
        startDistance: this.pinchDistance(),
        startZoom: this.renderer.getZoom(),
        engaged: false,
      };
      return;
    }
    if (this.pointers.size > 2) return;
    if (this.animating) return;

    try {
      this.renderer.canvas.setPointerCapture(event.pointerId);
    } catch {
      // A synthetic or already-captured pointer. Capture keeps a drag alive past the
      // canvas edge; it is not required for the gesture to work.
    }

    const hit = this.renderer.pickSticker(event.clientX, event.clientY);
    if (hit) {
      this.drag = {
        kind: 'pending',
        cubieIndex: hit.cubieIndex,
        normal: hit.worldNormal,
        startX: event.clientX,
        startY: event.clientY,
      };
      return;
    }

    this.drag = {
      kind: 'orbit',
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: this.scheduler.now(),
      velocityRight: 0,
      velocityDown: 0,
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
    const drag = this.drag;
    if (!drag) return;
    event.preventDefault();

    if (drag.kind === 'pinch') {
      const distance = this.pinchDistance();
      if (!distance || !drag.startDistance) return;
      if (!drag.engaged && Math.abs(distance - drag.startDistance) < PINCH_THRESHOLD_PX) return;
      drag.engaged = true;
      // Fingers apart means bigger, so the camera comes IN: zoom scale is inverse.
      this.renderer.setZoom(drag.startZoom * (drag.startDistance / distance));
      return;
    }

    if (drag.kind === 'orbit') {
      const dx = event.clientX - drag.lastX;
      const dy = event.clientY - drag.lastY;
      const width = this.renderer.canvas.clientWidth || 1;
      const perPixel = Math.PI / (ORBIT_GAIN * width);

      // Incremental, about the axes the screen defines right now -- which is what makes
      // this continuous in every direction with no clamp and no gimbal lock.
      this.renderer.orbitBy(dx * perPixel, dy * perPixel);

      const t = this.scheduler.now();
      const dt = Math.max(1, t - drag.lastTime) / 1000;
      drag.velocityRight = (dx * perPixel) / dt;
      drag.velocityDown = (dy * perPixel) / dt;
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
      drag.lastTime = t;
      return;
    }

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;

    if (drag.kind === 'pending') {
      if (Math.hypot(dx, dy) < AXIS_LOCK_PX) return;
      const resolved = resolveAxis(this.renderer, drag.cubieIndex, drag.normal, dx, dy);
      if (!resolved) return;
      this.drag = {
        kind: 'turn',
        base: resolved.base,
        tangent: resolved.tangent,
        startX: drag.startX,
        startY: drag.startY,
        angle: 0,
        lastAngle: 0,
        lastTime: this.scheduler.now(),
        velocity: 0,
        detent: 0,
      };
      this.callbacks.onGrab(resolved.base);
      this.applyTurn(this.drag as TurnDrag, dx, dy);
      return;
    }

    this.applyTurn(drag, dx, dy);
  };

  private applyTurn(drag: TurnDrag, dx: number, dy: number): void {
    const edge = this.renderer.screenEdgeLength() || 1;
    // Only the component of the drag along the layer's tangent turns it. Both are y-up.
    const along = dx * drag.tangent.x + -dy * drag.tangent.y;
    const raw = (along / (TURN_GAIN * edge)) * (90 * DEG);
    const angle = Math.max(-LIVE_CLAMP, Math.min(LIVE_CLAMP, raw));

    const t = this.scheduler.now();
    const dt = Math.max(1, t - drag.lastTime) / 1000;
    drag.velocity = (angle - drag.lastAngle) / dt;
    drag.lastAngle = angle;
    drag.lastTime = t;
    drag.angle = angle;

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

    // Lifting one finger of a pinch ends the pinch rather than resuming an orbit
    // mid-gesture, which would jump the cube.
    if (drag?.kind === 'pinch') {
      if (this.pointers.size < 2) this.drag = null;
      return;
    }

    this.drag = null;
    if (!drag) return;
    try {
      this.renderer.canvas.releasePointerCapture(event.pointerId);
    } catch {
      // Already released; nothing to undo.
    }

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
    // A flick fires to the next quarter turn in the direction of travel even if the
    // layer has moved less than 45 degrees. That is what makes a flick feel like a
    // flick rather than like a command.
    const target =
      Math.abs(drag.velocity) >= FLICK_RAD_PER_S
        ? (drag.velocity > 0 ? Math.floor(drag.angle / quarter) + 1 : Math.ceil(drag.angle / quarter) - 1) * quarter
        : Math.round(drag.angle / quarter) * quarter;

    this.callbacks.onSnapStart(170);

    // The release velocity is carried into the spring as initial velocity.
    this.spring(drag.angle, target, drag.velocity, TURN_SPRING, (value) => this.renderer.setLayerRotation(drag.base, value), () => {
      const quarters = Math.round(target / quarter);
      const amount = ((quarters % 4) + 4) % 4;
      this.renderer.setLayerRotation(null, 0);
      if (amount === 0) {
        this.callbacks.onRelease();
        return;
      }
      this.callbacks.onCommit({ base: drag.base, amount: amount as 1 | 2 | 3 });
    });
  }

  /**
   * Momentum, and nothing after it. The orbit used to settle onto one of eight
   * canonical poses; it does not any more, because a cube that repositions itself when
   * you let go is not a cube you are holding.
   */
  private glideOrbit(drag: OrbitDrag): void {
    if (prefersReducedMotion()) return;

    let vRight = drag.velocityRight;
    let vDown = drag.velocityDown;
    if (Math.hypot(vRight, vDown) < ORBIT_CUTOFF) return;

    // The screen axes are captured once: the cube turns under them, they do not turn
    // with it, so a glide keeps going the way the finger was going.
    const { up, right } = this.renderer.screenAxes();
    let last = this.scheduler.now();

    const glide = (): void => {
      const t = this.scheduler.now();
      const dt = Math.min(0.05, Math.max(0.001, (t - last) / 1000));
      last = t;
      const decay = Math.exp(-(dt * 1000) / ORBIT_DECAY_MS);
      vRight *= decay;
      vDown *= decay;
      this.renderer.spinBy(up, vRight * dt);
      this.renderer.spinBy(right, vDown * dt);

      if (Math.hypot(vRight, vDown) > ORBIT_CUTOFF) {
        this.animation = this.scheduler.raf(glide);
        return;
      }
      this.animation = 0;
    };

    this.animation = this.scheduler.raf(glide);
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

export const DEFAULTS = { TURN_GAIN, FLICK_RAD_PER_S, AXIS_LOCK_PX, ORBIT_GAIN, PINCH_THRESHOLD_PX };
export { Vector3 };

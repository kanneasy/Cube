// Touch. This is the app.
//
// Two gestures share one pointer stream and are told apart by a single raycast at
// touch-down: land on a sticker and you are turning a layer, land on the background
// and you are orbiting the view.
//
// The raycast happens ONCE, at touch-down. Everything after that is driven from the
// 2D screen delta, so nothing re-raycasts a moving mesh sixty times a second.

import { TURNS, type Move, type TurnBase, type Vec3 } from '../../cube/state';
import type { CubeRenderer } from './renderer';
import { prefersReducedMotion, REDUCED_SETTLE_MS } from './motion';
import { DEFAULT_PITCH, PITCH_CLAMP, PITCH_SNAPS, YAW_SNAPS } from './renderer';

const DEG = Math.PI / 180;

/** A drag of this fraction of one on-screen cube edge, along the tangent, is 90 degrees. */
const TURN_GAIN = 0.42;
/** Live rotation is clamped so a runaway drag cannot spin a layer indefinitely. */
const LIVE_CLAMP = 180 * DEG;
/** Travel before the rotation axis is resolved and then locked for the gesture. */
const AXIS_LOCK_PX = 8;
/** Release angular speed at or above which a flick fires in the direction of travel. */
const FLICK_RAD_PER_S = 900 * DEG;

/** Orbit: a drag of this fraction of viewport width is 180 degrees. */
const ORBIT_GAIN = 0.55;
const ORBIT_DECAY_MS = 260;
const ORBIT_CUTOFF = 12 * DEG;

const TURN_SPRING = { stiffness: 520, damping: 26, mass: 0.55 };
const ORBIT_SPRING = { stiffness: 180, damping: 24, mass: 1 };

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
  startX: number;
  startY: number;
  startYaw: number;
  startPitch: number;
  lastX: number;
  lastY: number;
  lastTime: number;
  velocityYaw: number;
  velocityPitch: number;
}

type Drag = PendingDrag | TurnDrag | OrbitDrag | null;

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
 */
export function resolveAxis(
  renderer: CubeRenderer,
  cubieIndex: number,
  normal: Vec3,
  dragX: number,
  dragY: number,
): { base: TurnBase; tangent: { x: number; y: number } } | null {
  const coords = renderer.cubieCoords(cubieIndex);
  // Screen y grows downward; the projection helper returns y-up, so flip the drag.
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

  private onDown = (event: PointerEvent): void => {
    if (this.animating) return;
    event.preventDefault();
    try {
      this.renderer.canvas.setPointerCapture(event.pointerId);
    } catch {
      // A synthetic or already-captured pointer. Capture is an optimisation that keeps
      // a drag alive past the canvas edge, not a requirement for the gesture to work.
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

    const { yaw, pitch } = this.renderer.getOrbit();
    this.drag = {
      kind: 'orbit',
      startX: event.clientX,
      startY: event.clientY,
      startYaw: yaw,
      startPitch: pitch,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: this.scheduler.now(),
      velocityYaw: 0,
      velocityPitch: 0,
    };
  };

  // The state mutation happens synchronously here and only the redraw is left to the
  // render loop. Batching the mutation into the loop instead lets a pointerup commit
  // run before the next frame, writing back the pre-drag value -- the user drags, sees
  // the layer follow, releases, and watches the turn silently revert.
  private onMove = (event: PointerEvent): void => {
    const drag = this.drag;
    if (!drag) return;
    event.preventDefault();

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

    if (drag.kind === 'turn') {
      this.applyTurn(drag, dx, dy);
      return;
    }

    // Orbit. 1:1 with the finger, no smoothing.
    const width = this.renderer.canvas.clientWidth || 1;
    const perPixel = Math.PI / (ORBIT_GAIN * width);
    const yaw = drag.startYaw + dx * perPixel;
    const pitch = Math.max(-PITCH_CLAMP, Math.min(PITCH_CLAMP, drag.startPitch + dy * perPixel));

    const t = this.scheduler.now();
    const dt = Math.max(1, t - drag.lastTime) / 1000;
    drag.velocityYaw = ((event.clientX - drag.lastX) * perPixel) / dt;
    drag.velocityPitch = ((event.clientY - drag.lastY) * perPixel) / dt;
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    drag.lastTime = t;

    this.renderer.setOrbit(yaw, pitch);
  };

  private applyTurn(drag: TurnDrag, dx: number, dy: number): void {
    const edge = this.renderer.screenEdgeLength() || 1;
    // Only the component of the drag along the layer's tangent turns it.
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
    const drag = this.drag;
    this.drag = null;
    if (!drag) return;
    try {
      this.renderer.canvas.releasePointerCapture(event.pointerId);
    } catch {
      // The pointer may already have been released; nothing to undo.
    }

    if (drag.kind === 'pending') {
      this.callbacks.onRelease();
      return;
    }

    if (drag.kind === 'orbit') {
      this.settleOrbit(drag);
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

    const settleMs = 170;
    this.callbacks.onSnapStart(settleMs);

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

  private settleOrbit(drag: OrbitDrag): void {
    let { yaw, pitch } = this.renderer.getOrbit();
    // Momentum is the part of the orbit most likely to be unwelcome; drop it entirely
    // and go straight to the nearest canonical view.
    if (prefersReducedMotion()) {
      this.snapOrbit(yaw, pitch);
      return;
    }
    let vYaw = drag.velocityYaw;
    let vPitch = drag.velocityPitch;
    let last = this.scheduler.now();

    const glide = (): void => {
      const t = this.scheduler.now();
      const dt = Math.min(0.05, Math.max(0.001, (t - last) / 1000));
      last = t;
      const decay = Math.exp(-(dt * 1000) / ORBIT_DECAY_MS);
      vYaw *= decay;
      vPitch *= decay;
      yaw += vYaw * dt;
      pitch = Math.max(-PITCH_CLAMP, Math.min(PITCH_CLAMP, pitch + vPitch * dt));
      this.renderer.setOrbit(yaw, pitch);

      if (Math.hypot(vYaw, vPitch) > ORBIT_CUTOFF) {
        this.animation = this.scheduler.raf(glide);
        return;
      }
      this.animation = 0;
      this.snapOrbit(yaw, pitch);
    };

    this.animation = this.scheduler.raf(glide);
  }

  /**
   * The orbit always lands on one of eight canonical three-quarter views. A free orbit
   * leaves the cube in oblique poses where stickers are foreshortened and unreadable at
   * speed; every one of these eight shows three faces cleanly.
   */
  private snapOrbit(yaw: number, pitch: number): void {
    const nearest = (value: number, options: number[], period?: number): number => {
      let best = options[0];
      let bestDelta = Infinity;
      for (const option of options) {
        let delta = option - value;
        if (period) delta -= Math.round(delta / period) * period;
        if (Math.abs(delta) < Math.abs(bestDelta)) {
          bestDelta = delta;
          best = value + delta;
        }
      }
      return best;
    };

    const targetYaw = nearest(yaw, YAW_SNAPS, Math.PI * 2);
    const targetPitch = nearest(pitch, PITCH_SNAPS);
    const fromYaw = yaw;
    const fromPitch = pitch;

    this.spring(0, 1, 0, ORBIT_SPRING, (p) => {
      this.renderer.setOrbit(fromYaw + (targetYaw - fromYaw) * p, fromPitch + (targetPitch - fromPitch) * p);
    });
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

export const DEFAULTS = { DEFAULT_PITCH, TURN_GAIN, FLICK_RAD_PER_S, AXIS_LOCK_PX, ORBIT_GAIN };

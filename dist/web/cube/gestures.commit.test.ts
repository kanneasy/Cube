// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CubeGestures } from './gestures';
import { DEFAULT_PITCH, DEFAULT_YAW } from './renderer';
import type { CubeRenderer } from './renderer';
import { Quaternion } from 'three';
import type { Move, Vec3 } from '../../cube/state';

// A clock and frame scheduler under test control. requestAnimationFrame does not run
// in a backgrounded tab, so driving the spring by hand is the only way to verify the
// commit deterministically rather than by watching it.
function fakeScheduler() {
  let t = 0;
  let queue: (() => void)[] = [];
  let next = 1;
  return {
    scheduler: {
      now: () => t,
      raf: (cb: () => void) => {
        queue.push(cb);
        return next++;
      },
      caf: () => {},
    },
    advance(ms: number) {
      t += ms;
    },
    /** Run frames at 16ms until the queue drains or the cap is hit. */
    flush(maxFrames = 400) {
      for (let i = 0; i < maxFrames && queue.length > 0; i++) {
        const due = queue;
        queue = [];
        t += 16;
        for (const cb of due) cb();
      }
      return queue.length === 0;
    },
  };
}

const UNIT_PX = 262 / 2 / (12 * Math.tan((28 * Math.PI) / 360));

function mockRenderer(coords: Vec3, opts: { hits?: boolean } = {}) {
  const orbits: { dx: number; dy: number }[] = [];
  const spins: number[] = [];
  const zooms: number[] = [];
  /** Written only by the view reset, so a test can prove a pinch did not trigger one. */
  const resets: number[] = [];
  const canvas = document.createElement('canvas');
  Object.defineProperty(canvas, 'clientWidth', { value: 375 });
  canvas.setPointerCapture = () => {};
  canvas.releasePointerCapture = () => {};

  const cp = Math.cos(DEFAULT_PITCH);
  const eye = [12 * cp * Math.sin(DEFAULT_YAW), 12 * Math.sin(DEFAULT_PITCH), 12 * cp * Math.cos(DEFAULT_YAW)];
  const norm = (v: number[]) => {
    const l = Math.hypot(...v);
    return v.map((x) => x / l);
  };
  const cross = (a: number[], b: number[]) => [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
  const forward = norm(eye.map((x) => -x));
  const right = norm(cross(forward, [0, 1, 0]));
  const up = cross(right, forward);

  const layerCalls: { base: string | null; angle: number }[] = [];
  const renderer = {
    canvas,
    // Configurable, so a test can land on the background and get an orbit. Previously
    // this always hit, so every simulated touch became a turn and orbit/pinch were
    // never exercised at all.
    pickSticker: () => (opts.hits === false ? null : { cubieIndex: 0, worldNormal: [0, 0, 1] as Vec3 }),
    cubieCoords: () => coords,

    projectTangent: (_o: Vec3, d: Vec3) => {
      const x = d[0] * right[0] + d[1] * right[1] + d[2] * right[2];
      const y = d[0] * up[0] + d[1] * up[1] + d[2] * up[2];
      const l = Math.hypot(x, y) || 1;
      return { x: x / l, y: y / l, length: l };
    },
    unitScreenPx: () => UNIT_PX,
    faceWidthPx: () => UNIT_PX * 3,
    setLayerRotation: (base: string | null, angle: number) => layerCalls.push({ base, angle }),
    orbitBy: (dx: number, dy: number) => orbits.push({ dx, dy }),
    spinBy: () => spins.push(1),
    getZoom: () => 1,
    setZoom: (f: number) => zooms.push(f),
    orientationQuaternion: () => new Quaternion(),
    setOrientation: () => resets.push(1),
  };
  return { renderer: renderer as unknown as CubeRenderer, canvas, layerCalls, orbits, spins, zooms, resets };
}

const pointer = (canvas: HTMLCanvasElement, type: string, x: number, y: number, pointerId = 1) =>
  canvas.dispatchEvent(
    new PointerEvent(type, {
      pointerId,
      isPrimary: pointerId === 1,
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y,
    }),
  );

interface Harness {
  commits: Move[];
  grabs: string[];
  detents: number;
  releases: number;
}

function setup(coords: Vec3 = [1, -1, 1], opts: { hits?: boolean } = {}) {
  const clock = fakeScheduler();
  const { renderer, canvas, layerCalls, orbits, spins, zooms, resets } = mockRenderer(coords, opts);
  const h: Harness = { commits: [], grabs: [], detents: 0, releases: 0 };
  const gestures = new CubeGestures(
    renderer,
    {
      onGrab: (base) => h.grabs.push(base),
      onRelease: () => h.releases++,
      onCommit: (move) => h.commits.push(move),
      onDetent: () => h.detents++,
      onSnapStart: () => {},
    },
    clock.scheduler,
  );
  return { clock, canvas, gestures, h, layerCalls, orbits, spins, zooms, resets };
}

/** Drag from (x,y) by (dx,dy) over `steps` moves, `msPerStep` apart. */
function drag(
  canvas: HTMLCanvasElement,
  clock: ReturnType<typeof fakeScheduler>,
  dx: number,
  dy: number,
  { steps = 10, msPerStep = 16 } = {},
) {
  const x0 = 200;
  const y0 = 250;
  pointer(canvas, 'pointerdown', x0, y0);
  for (let i = 1; i <= steps; i++) {
    clock.advance(msPerStep);
    pointer(canvas, 'pointermove', x0 + (dx * i) / steps, y0 + (dy * i) / steps);
  }
  pointer(canvas, 'pointerup', x0 + dx, y0 + dy);
}

/** Drag `dist` px along a unit screen direction, so a test can aim between two tangents. */
function dragAlong(
  canvas: HTMLCanvasElement,
  clock: ReturnType<typeof fakeScheduler>,
  ux: number,
  uy: number,
  dist: number,
  steps = 10,
) {
  drag(canvas, clock, ux * dist, uy * dist, { steps });
}

describe('a drag turns a layer and commits it', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('commits a quarter turn once the spring settles', () => {
    const { clock, canvas, h } = setup();
    // 0.42 x a 200px edge is 90 degrees, so ~84px along the tangent is a full quarter.
    drag(canvas, clock, 0, -90);
    expect(h.commits).toHaveLength(0); // nothing commits until the spring lands
    expect(clock.flush()).toBe(true);
    expect(h.commits).toHaveLength(1);
    expect(h.commits[0].base).toBe('R');
    expect([1, 3]).toContain(h.commits[0].amount);
  });

  it('does not commit a drag too small to reach a quarter turn', () => {
    const { clock, canvas, h } = setup();
    drag(canvas, clock, 0, -20); // well under 45 degrees, and slow
    clock.flush();
    expect(h.commits).toHaveLength(0);
    expect(h.releases).toBeGreaterThan(0); // it released without turning, not silently
  });

  it('follows the thumb live, before anything is committed', () => {
    const { clock, canvas, layerCalls, h } = setup();
    drag(canvas, clock, 0, -90);
    const during = layerCalls.filter((c) => c.base !== null && Math.abs(c.angle) > 0);
    expect(during.length).toBeGreaterThan(3); // the layer moved with the finger
    expect(h.grabs).toEqual(['R']); // and the grab was announced for the lift treatment
  });

  it('fires a flick to the next quarter turn even under 45 degrees', () => {
    const { clock, canvas, h } = setup();
    // A short but very fast drag: 30px in two 4ms steps is far past 900 deg/s.
    drag(canvas, clock, 0, -30, { steps: 2, msPerStep: 4 });
    expect(clock.flush()).toBe(true);
    expect(h.commits).toHaveLength(1);
  });

  it('ticks the detent as the nearest quarter turn changes', () => {
    const { clock, canvas, h } = setup();
    drag(canvas, clock, 0, -90, { steps: 20 });
    clock.flush();
    expect(h.detents).toBeGreaterThan(0);
  });

  it('lands a settling turn on a new touch instead of eating the touch', () => {
    const { clock, canvas, h } = setup();
    drag(canvas, clock, 0, -90);
    expect(h.commits).toHaveLength(0); // still springing

    // The old behaviour dropped this pointerdown outright, and with it the whole
    // second turn -- about 200ms of dead input after every turn.
    pointer(canvas, 'pointerdown', 200, 250);
    expect(h.commits).toHaveLength(1); // the first turn landed rather than blocking

    pointer(canvas, 'pointermove', 200, 180);
    pointer(canvas, 'pointerup', 200, 180);
    expect(clock.flush()).toBe(true);
    expect(h.commits).toHaveLength(2); // and the second turn happened
  });

  it('commits a landed turn exactly once', () => {
    // Two things can finish a turn: the spring completing, and a new touch landing it
    // early. A turn committed twice is a move the user never made.
    const { clock, canvas, h } = setup();
    drag(canvas, clock, 0, -90);
    pointer(canvas, 'pointerdown', 200, 250);
    pointer(canvas, 'pointerup', 200, 250);
    clock.flush();
    expect(h.commits).toHaveLength(1);
  });

  it('does not turn anything when the drag never passes the axis-lock threshold', () => {
    const { clock, canvas, h, layerCalls } = setup();
    drag(canvas, clock, 3, 2, { steps: 2 });
    clock.flush();
    expect(h.grabs).toHaveLength(0);
    expect(layerCalls).toHaveLength(0);
    expect(h.commits).toHaveLength(0);
  });
});

describe('taps and the view reset', () => {
  it('does not treat the very first tap as a double tap', () => {
    // The clock starts at 0 here, which is the case that exposed it: a lastTapEndedAt
    // initialised to 0 makes the first tap look like the second half of a pair.
    const { clock, canvas } = setup();
    let reset = false;
    // A reset would move the orientation; the mock records nothing, so assert instead
    // that a single tap leaves no animation queued.
    pointer(canvas, 'pointerdown', 200, 250);
    clock.advance(30);
    pointer(canvas, 'pointerup', 202, 251);
    expect(clock.flush()).toBe(true);
    expect(reset).toBe(false);
  });

  it('treats two quick taps as a double tap', () => {
    const { clock, canvas, gestures } = setup();
    pointer(canvas, 'pointerdown', 200, 250);
    clock.advance(30);
    pointer(canvas, 'pointerup', 201, 250);
    clock.advance(100);
    pointer(canvas, 'pointerdown', 200, 250);
    clock.advance(30);
    pointer(canvas, 'pointerup', 201, 250);
    // The reset runs as an animation; it must be scheduled.
    expect(gestures.animating).toBe(true);
    clock.flush();
  });

  it('does not treat a long press as a tap', () => {
    const { clock, canvas, gestures } = setup();
    for (let i = 0; i < 2; i++) {
      pointer(canvas, 'pointerdown', 200, 250);
      clock.advance(400); // well past the 220ms tap window
      pointer(canvas, 'pointerup', 201, 250);
      clock.advance(50);
    }
    expect(gestures.animating).toBe(false);
  });
});

describe('a drag never commits more than one quarter turn', () => {
  // Reported from a real phone: a strong swipe committed two quarters at once. A hand
  // on a cube turns a face; it does not spin it.
  it('commits one quarter for a drag far past a quarter turn', () => {
    const { clock, canvas, h } = setup();
    drag(canvas, clock, 0, -400, { steps: 20 }); // many times the ~46px a quarter needs
    expect(clock.flush()).toBe(true);
    expect(h.commits).toHaveLength(1);
    expect(h.commits[0].amount).not.toBe(2);
    expect([1, 3]).toContain(h.commits[0].amount);
  });

  it('commits one quarter for a violent flick', () => {
    const { clock, canvas, h } = setup();
    drag(canvas, clock, 0, -300, { steps: 2, msPerStep: 4 }); // far past the flick threshold
    expect(clock.flush()).toBe(true);
    expect(h.commits).toHaveLength(1);
    expect(h.commits[0].amount).not.toBe(2);
  });

  it('never lets the live layer travel past a quarter turn', () => {
    const { clock, canvas, layerCalls } = setup();
    drag(canvas, clock, 0, -400, { steps: 20 });
    const live = layerCalls.filter((c) => c.base !== null).map((c) => Math.abs(c.angle));
    expect(Math.max(...live)).toBeLessThanOrEqual(Math.PI / 2 + 1e-6);
    clock.flush();
  });

  it('still commits nothing for a drag that stays under half a quarter', () => {
    const { clock, canvas, h } = setup();
    drag(canvas, clock, 0, -15, { steps: 6, msPerStep: 40 }); // small and slow
    clock.flush();
    expect(h.commits).toHaveLength(0);
  });
});

// A vertical drag of V px on this mock turns the R layer by ~1.36 * V degrees, so 20px
// is ~27deg -- deliberately short of every commit threshold, leaving the flick branch as
// the only thing that can commit these. That is what makes them about velocity and
// nothing else.
describe('the release velocity is read over a window, not one frame', () => {
  it('still flicks when the thumb pauses for a frame before lifting', () => {
    const { clock, canvas, h } = setup();
    pointer(canvas, 'pointerdown', 200, 250);
    clock.advance(4);
    pointer(canvas, 'pointermove', 200, 234);
    clock.advance(4);
    pointer(canvas, 'pointermove', 200, 230);
    // The pause. A one-frame velocity reads this as a dead stop and kills the flick,
    // which is the "it only rotates a little and returns" report.
    clock.advance(20);
    pointer(canvas, 'pointermove', 200, 230);
    pointer(canvas, 'pointerup', 200, 230);

    expect(clock.flush()).toBe(true);
    expect(h.commits).toHaveLength(1);
  });

  it('does not fire a phantom flick on a jitter pixel at the end of a slow drag', () => {
    const { clock, canvas, h } = setup();
    pointer(canvas, 'pointerdown', 200, 250);
    for (let i = 1; i <= 10; i++) {
      clock.advance(16);
      pointer(canvas, 'pointermove', 200, 250 - i * 2);
    }
    // iOS routinely delivers this: one pixel, 2ms after the last real move. As a
    // one-frame velocity it is ~680 deg/s, which clears the lowered flick threshold on
    // its own -- the window is what makes lowering that threshold safe.
    clock.advance(2);
    pointer(canvas, 'pointermove', 200, 229);
    pointer(canvas, 'pointerup', 200, 229);

    expect(clock.flush()).toBe(true);
    expect(h.commits).toHaveLength(0);
    expect(h.releases).toBeGreaterThan(0);
  });
});

// On this mock the two candidate tangents are (0.749, -0.663) and (1, 0) in screen
// space, so they tie exactly 20.7 degrees below horizontal. A drag along that line
// scores both axes the same, and locking there is a coin flip between two different
// layers -- the "it rotated a face I didn't intend" report.
const TIE = { x: 0.9353, y: 0.3542 };

describe('the axis lock waits for the drag to mean something', () => {
  it('does not lock on a drag aimed exactly between the two candidates', () => {
    const { clock, canvas, h, layerCalls } = setup();
    dragAlong(canvas, clock, TIE.x, TIE.y, 20); // past AXIS_LOCK_PX, short of AXIS_DECIDE_PX
    clock.flush();
    expect(h.grabs).toHaveLength(0);
    expect(layerCalls).toHaveLength(0);
    expect(h.commits).toHaveLength(0);
  });

  it('takes the best candidate anyway once the drag has gone far enough', () => {
    const { clock, canvas, h } = setup();
    dragAlong(canvas, clock, TIE.x, TIE.y, 35); // past AXIS_DECIDE_PX
    clock.flush();
    expect(h.grabs).toHaveLength(1);
  });

  it('locks straight away on a drag that plainly means one of them', () => {
    const { clock, canvas, h } = setup();
    drag(canvas, clock, 0, -14, { steps: 1 });
    expect(h.grabs).toEqual(['R']);
  });

  it('still ignores a drag that never travels far enough to resolve anything', () => {
    const { clock, canvas, h, layerCalls } = setup();
    drag(canvas, clock, 6, 4, { steps: 2 }); // 7.2px, under AXIS_LOCK_PX
    clock.flush();
    expect(h.grabs).toHaveLength(0);
    expect(layerCalls).toHaveLength(0);
  });
});

// Two fingers have never had a single test. The mock has recorded `orbits`, `spins` and
// `zooms` since it was written and nothing ever read them, and no test dispatched a
// second pointerId -- so the whole pinch path shipped unverified.
describe('two fingers', () => {
  /** Put two fingers down at a known span, centred on the stage. */
  const twoDown = (canvas: HTMLCanvasElement, span = 40) => {
    pointer(canvas, 'pointerdown', 220 - span / 2, 250, 1);
    pointer(canvas, 'pointerdown', 220 + span / 2, 250, 2);
  };

  it('orbits from the centroid before the span has moved enough to be a zoom', () => {
    const { canvas, orbits, zooms } = setup();
    twoDown(canvas);
    // Both fingers slide right together: the span never changes, so this is pure orbit.
    pointer(canvas, 'pointermove', 210, 250, 1);
    pointer(canvas, 'pointermove', 250, 250, 2);
    expect(orbits.reduce((n, o) => n + o.dx, 0)).toBeCloseTo(10, 5);
    expect(zooms).toHaveLength(0);
  });

  it('zooms in when the fingers spread and out when they close', () => {
    const spread = setup();
    twoDown(spread.canvas);
    pointer(spread.canvas, 'pointermove', 300, 250, 2); // span 40 -> 100
    expect(spread.zooms.length).toBeGreaterThan(0);
    expect(spread.zooms[spread.zooms.length - 1]).toBeGreaterThan(1);

    const close = setup();
    twoDown(close.canvas, 120);
    pointer(close.canvas, 'pointermove', 230, 250, 2); // span 120 -> 70
    expect(close.zooms.length).toBeGreaterThan(0);
    expect(close.zooms[close.zooms.length - 1]).toBeLessThan(1);
  });

  it('orbits and zooms in the same gesture', () => {
    const { canvas, orbits, zooms } = setup();
    twoDown(canvas);
    // One finger travels: the centroid shifts AND the span opens.
    pointer(canvas, 'pointermove', 320, 250, 2);
    expect(orbits.reduce((n, o) => n + Math.abs(o.dx), 0)).toBeGreaterThan(0);
    expect(zooms.length).toBeGreaterThan(0);
  });

  it('does not reset the view when a pinch is lifted, however quickly', () => {
    // The tap test runs against a `pressedAt` the second finger overwrote. Anchor one
    // finger, move the other, lift the mover, then lift the anchor -- the anchor never
    // moved and lifted well inside the tap window, so it used to register as a tap.
    // Twice in a row was a double tap, and the view jumped home mid-gesture.
    const { clock, canvas, resets } = setup();
    for (let i = 0; i < 2; i++) {
      pointer(canvas, 'pointerdown', 200, 250, 1);
      pointer(canvas, 'pointerdown', 240, 250, 2); // this one overwrites pressedAt/XY
      clock.advance(10);
      pointer(canvas, 'pointermove', 140, 250, 1); // the mover
      pointer(canvas, 'pointerup', 140, 250, 1);
      clock.advance(10);
      pointer(canvas, 'pointerup', 240, 250, 2); // the anchor, lifting where it landed
      clock.advance(40);
    }
    clock.flush();
    expect(resets).toHaveLength(0);
  });

  it('hands the surviving finger a live orbit when the other lifts', () => {
    const { canvas, orbits } = setup();
    twoDown(canvas);
    pointer(canvas, 'pointerup', 240, 250, 2);
    const before = orbits.length;
    // One finger left, still down, still dragging. This used to do nothing at all.
    pointer(canvas, 'pointermove', 230, 250, 1);
    expect(orbits.length).toBeGreaterThan(before);
    expect(orbits[orbits.length - 1].dx).toBeCloseTo(30, 5);
  });

  it('still resets the view on a genuine double tap', () => {
    const { clock, canvas, resets } = setup();
    pointer(canvas, 'pointerdown', 200, 250);
    pointer(canvas, 'pointerup', 200, 250);
    clock.advance(60);
    pointer(canvas, 'pointerdown', 200, 250);
    pointer(canvas, 'pointerup', 200, 250);
    clock.flush();
    expect(resets.length).toBeGreaterThan(0);
  });
});

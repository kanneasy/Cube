// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CubeGestures } from './gestures';
import { DEFAULT_PITCH, DEFAULT_YAW } from './renderer';
import type { CubeRenderer } from './renderer';
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

function mockRenderer(coords: Vec3) {
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
    pickSticker: () => ({ cubieIndex: 0, worldNormal: [0, 0, 1] as Vec3 }),
    cubieCoords: () => coords,
    screenEdgeLength: () => 200,
    projectDirection: (_o: Vec3, d: Vec3) => {
      const x = d[0] * right[0] + d[1] * right[1] + d[2] * right[2];
      const y = d[0] * up[0] + d[1] * up[1] + d[2] * up[2];
      const l = Math.hypot(x, y) || 1;
      return { x: x / l, y: y / l };
    },
    setLayerRotation: (base: string | null, angle: number) => layerCalls.push({ base, angle }),
    setOrbit: () => {},
    getOrbit: () => ({ yaw: DEFAULT_YAW, pitch: DEFAULT_PITCH }),
  };
  return { renderer: renderer as unknown as CubeRenderer, canvas, layerCalls };
}

const pointer = (canvas: HTMLCanvasElement, type: string, x: number, y: number) =>
  canvas.dispatchEvent(
    new PointerEvent(type, { pointerId: 1, isPrimary: true, bubbles: true, cancelable: true, clientX: x, clientY: y }),
  );

interface Harness {
  commits: Move[];
  grabs: string[];
  detents: number;
  releases: number;
}

function setup(coords: Vec3 = [1, -1, 1]) {
  const clock = fakeScheduler();
  const { renderer, canvas, layerCalls } = mockRenderer(coords);
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
  return { clock, canvas, gestures, h, layerCalls };
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

  it('ignores a new touch while a turn is still springing', () => {
    const { clock, canvas, h } = setup();
    drag(canvas, clock, 0, -90);
    // Mid-spring: a second grab must not start.
    pointer(canvas, 'pointerdown', 200, 250);
    pointer(canvas, 'pointermove', 200, 180);
    pointer(canvas, 'pointerup', 200, 180);
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

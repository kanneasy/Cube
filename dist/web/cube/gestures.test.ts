import { describe, it, expect } from 'vitest';
import { baseFor, resolveAxis } from './gestures';
import { DEFAULT_PITCH, DEFAULT_YAW } from './renderer';
import { TURNS, type TurnBase, type Vec3 } from '../../cube/state';
import type { CubeRenderer } from './renderer';

// A mock renderer carrying the app's real default camera, so these assertions are
// about the view the user actually sees rather than an invented projection.
function mockRenderer(coords: Vec3): CubeRenderer {
  const cp = Math.cos(DEFAULT_PITCH);
  const eye = [
    12 * cp * Math.sin(DEFAULT_YAW),
    12 * Math.sin(DEFAULT_PITCH),
    12 * cp * Math.cos(DEFAULT_YAW),
  ] as const;

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
  const screenUp = cross(right, forward);

  return {
    cubieCoords: () => coords,
    projectDirection: (_origin: Vec3, direction: Vec3) => {
      const x = direction[0] * right[0] + direction[1] * right[1] + direction[2] * right[2];
      const y = direction[0] * screenUp[0] + direction[1] * screenUp[1] + direction[2] * screenUp[2];
      const l = Math.hypot(x, y) || 1;
      return { x: x / l, y: y / l };
    },
  } as unknown as CubeRenderer;
}

// Screen coordinates: y grows downward, as pointer events report them.
const DRAG = { right: [60, 0], left: [-60, 0], down: [0, 60], up: [0, -60] } as const;

describe('every axis and layer names a real move', () => {
  it.each([
    [1, 1, 'U'],
    [1, -1, 'D'],
    [0, 1, 'R'],
    [0, -1, 'L'],
    [2, 1, 'F'],
    [2, -1, 'B'],
    [0, 0, 'M'],
    [1, 0, 'E'],
    [2, 0, 'S'],
  ])('axis %i layer %i is %s', (axis, layer, expected) => {
    expect(baseFor(axis, layer)).toBe(expected);
  });
});

describe('resolving which layer a drag grabbed', () => {
  const cases: { label: string; coords: Vec3; normal: Vec3; drag: readonly [number, number]; expected: TurnBase }[] = [
    // Front face, bottom-right corner. Horizontal drag rolls the bottom layer;
    // vertical drag rolls the right layer.
    { label: 'front corner dragged sideways turns the bottom layer', coords: [1, -1, 1], normal: [0, 0, 1], drag: DRAG.right, expected: 'D' },
    { label: 'front corner dragged up turns the right layer', coords: [1, -1, 1], normal: [0, 0, 1], drag: DRAG.up, expected: 'R' },
    // Top face, front-right corner.
    { label: 'top corner dragged sideways turns the front layer', coords: [1, 1, 1], normal: [0, 1, 0], drag: DRAG.right, expected: 'F' },
    { label: 'top corner dragged away turns the right layer', coords: [1, 1, 1], normal: [0, 1, 0], drag: DRAG.up, expected: 'R' },
    // Centres reach the slices, which is the whole reason slice moves exist in this app.
    { label: 'front centre dragged sideways turns the middle horizontal slice', coords: [0, 0, 1], normal: [0, 0, 1], drag: DRAG.right, expected: 'E' },
    { label: 'front centre dragged up turns the middle vertical slice', coords: [0, 0, 1], normal: [0, 0, 1], drag: DRAG.up, expected: 'M' },
  ];

  it.each(cases)('$label', ({ coords, normal, drag, expected }) => {
    const resolved = resolveAxis(mockRenderer(coords), 0, normal, drag[0], drag[1]);
    expect(resolved?.base).toBe(expected);
  });

  it('never picks a rotation about the sticker it grabbed', () => {
    // Turning about a sticker's own normal would spin it in place and move nothing.
    for (const [axis, coord] of [
      [0, 1],
      [1, 1],
      [2, 1],
    ] as const) {
      const normal: Vec3 = [0, 0, 0].map((_, i) => (i === axis ? coord : 0)) as unknown as Vec3;
      const coords: Vec3 = [1, 1, 1];
      const resolved = resolveAxis(mockRenderer(coords), 0, normal, 40, 25);
      expect(resolved).not.toBeNull();
      expect(TURNS[resolved!.base].axis).not.toBe(axis);
    }
  });

  it('turns the layer the grabbed piece is actually in', () => {
    const coords: Vec3 = [1, -1, 1];
    for (const drag of [DRAG.right, DRAG.left, DRAG.up, DRAG.down]) {
      const resolved = resolveAxis(mockRenderer(coords), 0, [0, 0, 1], drag[0], drag[1])!;
      const spec = TURNS[resolved.base];
      expect(coords[spec.axis]).toBe(spec.layer);
    }
  });

  it('gives the same layer whichever way along it you drag', () => {
    // Direction lives in the sign of the drag along the tangent, not in the move name.
    const coords: Vec3 = [1, -1, 1];
    const a = resolveAxis(mockRenderer(coords), 0, [0, 0, 1], ...DRAG.right)!;
    const b = resolveAxis(mockRenderer(coords), 0, [0, 0, 1], ...DRAG.left)!;
    expect(a.base).toBe(b.base);
    // ...and the tangent points the same way, so the sign of the drag decides.
    expect(Math.sign(a.tangent.x)).toBe(Math.sign(b.tangent.x));
  });

  it('reports a tangent that dragging along turns the layer clockwise', () => {
    // The tangent is returned in the move's own clockwise sense, so callers never have
    // to reason about right-hand rules.
    const resolved = resolveAxis(mockRenderer([1, 1, 1]), 0, [0, 1, 0], ...DRAG.right)!;
    const alongTangent = DRAG.right[0] * resolved.tangent.x + -DRAG.right[1] * resolved.tangent.y;
    expect(alongTangent).toBeGreaterThan(0);
  });
});

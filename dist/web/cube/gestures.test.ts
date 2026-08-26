import { describe, it, expect } from 'vitest';
import { baseFor, resolveAxis } from './gestures';
import { PerspectiveCamera } from 'three';
import { DEFAULT_PITCH, DEFAULT_YAW } from './renderer';
import { projectDirection } from './project';
import { TURNS, type TurnBase, type Vec3 } from '../../cube/state';
import type { CubeRenderer } from './renderer';

// A mock renderer carrying the app's real default camera AND its real projection
// function. Reimplementing the projection here is what hid the inverted-drag bug:
// this file's own version was correct and the renderer's was not, so the tests agreed
// with the intention rather than with the code.
function mockRenderer(coords: Vec3): CubeRenderer {
  const camera = new PerspectiveCamera(28, 390 / 524, 0.1, 100);
  const distance = 12;
  const cp = Math.cos(DEFAULT_PITCH);
  camera.position.set(
    distance * cp * Math.sin(DEFAULT_YAW),
    distance * Math.sin(DEFAULT_PITCH),
    distance * cp * Math.cos(DEFAULT_YAW),
  );
  camera.up.set(0, 1, 0);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();
  camera.updateProjectionMatrix();

  return {
    cubieCoords: () => coords,
    projectDirection: (origin: Vec3, direction: Vec3) => projectDirection(camera, origin, direction),
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

// The bug a user hit on a real phone: the layer was right and the DIRECTION was
// inverted on every drag with a vertical component. Nothing above tests direction --
// they all assert which layer, never which way -- so the renderer could return a
// y-flipped projection and every one of them still passed.
describe('which way a drag turns the layer', () => {
  const sign = (coords: Vec3, normal: Vec3, drag: readonly [number, number]) => {
    const r = resolveAxis(mockRenderer(coords), 0, normal, drag[0], drag[1])!;
    // Reproduces applyTurn's dot product exactly: both sides y-up.
    return Math.sign(drag[0] * r.tangent.x + -drag[1] * r.tangent.y);
  };

  it('turns the right layer clockwise when its front face is dragged upward', () => {
    // Dragging up the right-hand side of the front face carries the front of the R
    // layer toward the top and then the back. That is R, clockwise.
    expect(sign([1, -1, 1], [0, 0, 1], DRAG.up)).toBe(1);
  });

  it('turns the right layer counter-clockwise when dragged downward', () => {
    expect(sign([1, -1, 1], [0, 0, 1], DRAG.down)).toBe(-1);
  });

  it('turns the top layer one way and only one way for a given drag', () => {
    expect(sign([1, 1, 0], [0, 1, 0], DRAG.right)).toBe(1);
    expect(sign([1, 1, 0], [0, 1, 0], DRAG.left)).toBe(-1);
  });

  it('turns the bottom layer the way it always did', () => {
    // The one the user reported as already correct: horizontal drag, so the sign error
    // in y never reached it. It must not change now that y is fixed.
    expect(sign([1, -1, 1], [0, 0, 1], DRAG.right)).toBe(1);
    expect(sign([1, -1, 1], [0, 0, 1], DRAG.left)).toBe(-1);
  });
});

describe('resolving which layer a drag grabbed', () => {
  const cases: { label: string; coords: Vec3; normal: Vec3; drag: readonly [number, number]; expected: TurnBase }[] = [
    // Front face, bottom-right corner. Horizontal drag rolls the bottom layer;
    // vertical drag rolls the right layer.
    { label: 'front corner dragged sideways turns the bottom layer', coords: [1, -1, 1], normal: [0, 0, 1], drag: DRAG.right, expected: 'D' },
    { label: 'front corner dragged up turns the right layer', coords: [1, -1, 1], normal: [0, 0, 1], drag: DRAG.up, expected: 'R' },
    // Top face, along each edge. NOT the corner: on the top-front-right corner a purely
    // horizontal drag scores identically for R and F (37.372 each, measured), because
    // the two candidate tangents are mirror images about the horizontal there. That is
    // a real tie, not a missing rule, and a test of it is a test of iteration order.
    { label: 'top front edge dragged sideways turns the front layer', coords: [0, 1, 1], normal: [0, 1, 0], drag: DRAG.right, expected: 'F' },
    { label: 'top right edge dragged sideways turns the right layer', coords: [1, 1, 0], normal: [0, 1, 0], drag: DRAG.right, expected: 'R' },
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

  it('resolves a genuinely ambiguous drag deterministically', () => {
    // Horizontal on the top-front-right corner is an exact tie. It must still land on
    // the same layer every time rather than flickering between two.
    const first = resolveAxis(mockRenderer([1, 1, 1]), 0, [0, 1, 0], ...DRAG.right)!;
    for (let i = 0; i < 5; i++) {
      expect(resolveAxis(mockRenderer([1, 1, 1]), 0, [0, 1, 0], ...DRAG.right)!.base).toBe(first.base);
    }
  });

  it('reports a tangent that dragging along turns the layer clockwise', () => {
    // The tangent is returned in the move's own clockwise sense, so callers never have
    // to reason about right-hand rules.
    const resolved = resolveAxis(mockRenderer([1, 1, 1]), 0, [0, 1, 0], ...DRAG.right)!;
    const alongTangent = DRAG.right[0] * resolved.tangent.x + -DRAG.right[1] * resolved.tangent.y;
    expect(alongTangent).toBeGreaterThan(0);
  });
});

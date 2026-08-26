import { describe, it, expect } from 'vitest';
import { PATTERNS, matchesTarget, patternById, patternTarget } from './patterns';
import {
  applyMoves,
  colorAt,
  cubieKind,
  isSolved,
  solvedCube,
  FACES,
  FACE_NORMAL,
  IDENTITY,
  type CubeState,
  type Face,
  type Vec3,
} from './state';
import { inverseAlg, parseAlg } from './notation';

const OPPOSITE: Record<Face, Face> = { U: 'D', D: 'U', R: 'L', L: 'R', F: 'B', B: 'F' };

/** The nine stickers on a face, with their in-face coordinates. */
function faceStickers(state: CubeState, face: Face): { a: number; b: number; color: Face }[] {
  const n = FACE_NORMAL[face];
  const axis = n.findIndex((v) => v !== 0);
  const sign = n[axis];
  const out: { a: number; b: number; color: Face }[] = [];
  for (let a = -1; a <= 1; a++) {
    for (let b = -1; b <= 1; b++) {
      const p = [0, 0, 0];
      p[axis] = sign;
      p[(axis + 1) % 3] = a;
      p[(axis + 2) % 3] = b;
      out.push({ a, b, color: colorAt(state, p as unknown as Vec3, n)! });
    }
  }
  return out;
}

describe('patterns', () => {
  it.each(PATTERNS.map((p) => p.id))('%s is a real, non-solved arrangement', (id) => {
    const target = patternTarget(id);
    expect(isSolved(target)).toBe(false);
  });

  // Deliberately NOT "playing the algorithm reaches the target": both sides of that
  // comparison are the same expression, so it passes no matter how wrong the engine or
  // the algorithm string is. Each pattern instead gets an independent structural check
  // that a mistyped move would break.

  it('checkerboard shows every face as an alternating checker of an opposite pair', () => {
    const s = patternTarget('checkerboard');
    for (const face of FACES) {
      const stickers = faceStickers(s, face);
      const distinct = [...new Set(stickers.map((x) => x.color))];
      expect(distinct.sort()).toEqual([face, OPPOSITE[face]].sort());
      // The centre keeps its own colour, and the pattern alternates around it.
      expect(stickers.find((x) => x.a === 0 && x.b === 0)!.color).toBe(face);
      for (const { a, b, color } of stickers) {
        expect(color).toBe(Math.abs(a + b) % 2 === 0 ? face : OPPOSITE[face]);
      }
    }
  });

  it('cube in a cube puts a 2x2 corner block of an ADJACENT face on every face', () => {
    const s = patternTarget('cube-in-cube');
    for (const face of FACES) {
      const stickers = faceStickers(s, face);
      const counts = new Map<string, number>();
      for (const { color } of stickers) counts.set(color, (counts.get(color) ?? 0) + 1);

      expect(counts.size).toBe(2);
      const [minority] = [...counts.entries()].sort((x, y) => x[1] - y[1]);
      expect([...counts.values()].sort()).toEqual([4, 5]);

      // The invading colour comes from a face that TOUCHES this one -- never its
      // opposite. That is what makes it read as a smaller cube nested in a corner.
      const other = [...counts.keys()].find((c) => c !== face);
      expect(other).toBeDefined();
      expect(other).not.toBe(OPPOSITE[face]);

      // Its four stickers form a contiguous 2x2 block anchored on the centre.
      const block = stickers.filter((x) => x.color === minority[0]);
      expect(block).toHaveLength(4);
      const as = [...new Set(block.map((x) => x.a))].sort();
      const bs = [...new Set(block.map((x) => x.b))].sort();
      expect(as).toHaveLength(2);
      expect(bs).toHaveLength(2);
      expect(as.includes(0) && bs.includes(0)).toBe(true);
    }
  });

  it.each(PATTERNS.map((p) => p.id))('%s is undone by the inverse of its algorithm', (id) => {
    const undone = applyMoves(patternTarget(id), inverseAlg(parseAlg(patternById(id).alg)));
    expect(isSolved(undone)).toBe(true);
  });

  it('the patterns are all distinct from each other', () => {
    const targets = PATTERNS.map((p) => patternTarget(p.id));
    for (let i = 0; i < targets.length; i++) {
      for (let j = i + 1; j < targets.length; j++) {
        expect(matchesTarget(targets[i], targets[j])).toBe(false);
      }
    }
  });

  it('superflip has every corner solved and every edge flipped in place', () => {
    // This is the definition of the position, and it is what makes the algorithm
    // checkable rather than merely transcribed.
    const s = patternTarget('superflip');
    for (const c of s.cubies) {
      const home = c.home.every((v, i) => v === c.pos[i]);
      expect(home).toBe(true); // nothing moves; every piece is flipped or twisted in place
      if (cubieKind(c) === 'corner') {
        expect(c.rot).toEqual(IDENTITY); // corners are untouched
      }
      if (cubieKind(c) === 'edge') {
        expect(c.rot).not.toEqual(IDENTITY); // every edge is flipped
      }
    }
  });

  it('does not treat a solved cube as any pattern', () => {
    for (const p of PATTERNS) expect(matchesTarget(solvedCube(), patternTarget(p.id))).toBe(false);
  });

  it('refuses an unknown pattern rather than returning a wrong target', () => {
    // @ts-expect-error deliberately invalid
    expect(() => patternById('not-a-pattern')).toThrow(/Unknown pattern/);
  });
});

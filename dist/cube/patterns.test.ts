import { describe, it, expect } from 'vitest';
import { PATTERNS, matchesTarget, patternById, patternTarget } from './patterns';
import { applyMoves, cubieKind, isSolved, solvedCube, IDENTITY } from './state';
import { inverseAlg, parseAlg } from './notation';

describe('patterns', () => {
  it.each(PATTERNS.map((p) => p.id))('%s is a real, non-solved arrangement', (id) => {
    const target = patternTarget(id);
    expect(isSolved(target)).toBe(false);
  });

  it.each(PATTERNS.map((p) => p.id))('%s is reached by playing its algorithm from solved', (id) => {
    const target = patternTarget(id);
    const played = applyMoves(solvedCube(), parseAlg(patternById(id).alg));
    expect(matchesTarget(played, target)).toBe(true);
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

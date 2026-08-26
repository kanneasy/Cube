import { describe, it, expect } from 'vitest';
import { generateScramble, nextHint } from './oracle';
import { applyMoves, isSolved, solvedCube } from '../cube/state';
import { parseAlg } from '../cube/notation';

describe('scrambles', () => {
  it('produces a state that is genuinely scrambled', async () => {
    const scramble = await generateScramble();
    expect(isSolved(applyMoves(solvedCube(), parseAlg(scramble)))).toBe(false);
  }, 30_000);

  it('produces a different scramble each time', async () => {
    const [a, b] = await Promise.all([generateScramble(), generateScramble()]);
    expect(a).not.toBe(b);
  }, 30_000);
});

describe('hints', () => {
  it('returns a single move that is a legal turn', async () => {
    const scramble = await generateScramble();
    const hint = await nextHint(scramble, []);
    expect(hint).not.toBeNull();
    expect(['U', 'D', 'F', 'B', 'L', 'R']).toContain(hint!.base);
    expect([1, 2, 3]).toContain(hint!.amount);
  }, 30_000);

  it('is deterministic for a given cube state', async () => {
    // Two hints on the same position must agree, or a user who asks twice gets sent
    // down two different lines.
    const scramble = await generateScramble();
    const [a, b] = await Promise.all([nextHint(scramble, []), nextHint(scramble, [])]);
    expect(a).toEqual(b);
  }, 30_000);

  it('moves the cube genuinely closer to solved, from a mid-solve position', async () => {
    // The real test of a hint is that following it repeatedly finishes the cube.
    //
    // The bound is deliberately loose. Following hints is NOT an optimal path: taking
    // one move off an optimal solution and re-solving can land on a different, longer
    // line, so the total can exceed the scramble length -- 29 steps for an 18-move
    // scramble, measured. A tight bound here is a test that fails on an unlucky
    // scramble rather than a test that has found anything.
    const scramble = await generateScramble();
    const played = parseAlg("R U R' U'");
    let state = applyMoves(applyMoves(solvedCube(), parseAlg(scramble)), played);
    const log = [...played];

    for (let i = 0; i < 80 && !isSolved(state); i++) {
      const hint = await nextHint(scramble, log);
      if (!hint) break;
      state = applyMoves(state, [hint]);
      log.push(hint);
    }
    expect(isSolved(state)).toBe(true);
  }, 60_000);

  it('has nothing to hint on an already-solved cube', async () => {
    const scramble = await generateScramble();
    const solution = parseAlg(scramble);
    // Playing the inverse of the scramble returns the cube to solved.
    const undo = solution.map((m) => ({ base: m.base, amount: (4 - m.amount) as 1 | 2 | 3 })).reverse();
    expect(await nextHint(scramble, undo)).toBeNull();
  }, 30_000);
});

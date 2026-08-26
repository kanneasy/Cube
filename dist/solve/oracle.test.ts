import { describe, it, expect } from 'vitest';
import { generateScramble, solutionFrom } from './oracle';
import { HintPlanner } from './hints';
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
    const planner = new HintPlanner((log) => solutionFrom(scramble, log));
    const hint = await planner.next([]);
    expect(hint).not.toBeNull();
    expect(['U', 'D', 'F', 'B', 'L', 'R']).toContain(hint!.base);
    expect([1, 2, 3]).toContain(hint!.amount);
  }, 30_000);

  it('is deterministic for a given cube state', async () => {
    // Two solves of the same position must agree, or a user who asks twice gets sent
    // down two different lines.
    const scramble = await generateScramble();
    const [a, b] = await Promise.all([solutionFrom(scramble, []), solutionFrom(scramble, [])]);
    expect(a).toEqual(b);
  }, 30_000);

  // The real test of a hint is that following it repeatedly finishes the cube, and
  // this used to fail. Re-solving on every request and revealing the new first move
  // does not converge: the two-phase solver is deterministic per state but not
  // optimal, so its first move from one state can lead to a state whose own first move
  // comes straight back. Measured before the fix: F2 returned forever, the cube
  // flipping between two positions. Several scrambles are tried because it only bites
  // on some of them.
  it.each([0, 1, 2])('following hints solves the cube, from a mid-solve position (%i)', async () => {
    const scramble = await generateScramble();
    const planner = new HintPlanner((log) => solutionFrom(scramble, log));
    const played = parseAlg("R U R' U'");
    let state = applyMoves(applyMoves(solvedCube(), parseAlg(scramble)), played);
    const log = [...played];

    for (let i = 0; i < 60 && !isSolved(state); i++) {
      const hint = await planner.next(log);
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
    expect(await solutionFrom(scramble, undo)).toEqual([]);
  }, 30_000);
});

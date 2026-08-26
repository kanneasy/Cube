import { describe, it, expect } from 'vitest';
import { applyMoves, solvedCube } from '../cube/state';
import { inverseAlg, parseAlg } from '../cube/notation';
import { computeStageSplits, crossComplete, f2lComplete, ollComplete, type LoggedMove } from './stages';

// A deliberately CFOP-shaped solve, built backward from solved so every stage boundary
// is known exactly rather than eyeballed.
const CROSS = "D R2 F' D'";
const F2L = "U R U' R' U' F' U F";
const OLL = "R U R' U R U2 R'"; // Sune
const PLL = "R U R' U' R' F R2 U' R' U' R U R' F'"; // T-perm

const SOLVE = parseAlg([CROSS, F2L, OLL, PLL].join(' '));
const CROSS_END = parseAlg(CROSS).length - 1; // 3
const F2L_END = CROSS_END + parseAlg(F2L).length; // 11
const OLL_END = F2L_END + parseAlg(OLL).length; // 18
const SOLVED_END = SOLVE.length - 1; // 32

const scrambleFor = (solution = SOLVE) => applyMoves(solvedCube(), inverseAlg(solution));
const logOf = (moves = SOLVE): LoggedMove[] => moves.map((move, i) => ({ move, atMs: (i + 1) * 100 }));

describe('stage splits on a CFOP solve', () => {
  const splits = computeStageSplits(scrambleFor(), logOf());

  it('recognises the shape', () => {
    expect(splits.shape).toBe('cfop');
  });

  it('infers the cross colour instead of assuming white', () => {
    // 'U' is first in the face list, so returning 'D' proves inference ran rather
    // than a default being taken.
    expect(splits.shape === 'cfop' && splits.crossColor).toBe('D');
  });

  it('picks the colour whose cross completes earliest, not merely a valid one', () => {
    // Proving inference RAN is weaker than proving it CHOSE. Several faces can have a
    // complete cross by the end of a solve -- a solved cube has six -- so the
    // tie-break is what makes the reported split the one the solver actually built.
    const states = [scrambleFor()];
    for (const move of SOLVE) states.push(applyMoves(states[states.length - 1], [move]));

    const firstCrossIndex = (color: Parameters<typeof crossComplete>[1]) =>
      states.findIndex((s) => crossComplete(s, color)) - 1;

    const chosen = splits.shape === 'cfop' ? splits.crossColor : null;
    expect(chosen).not.toBeNull();

    const chosenIndex = firstCrossIndex(chosen!);
    const others = (['U', 'R', 'F', 'D', 'L', 'B'] as const)
      .filter((c) => c !== chosen)
      .map(firstCrossIndex)
      .filter((i) => i >= 0);

    // More than one face does complete a cross in this solve, so the comparison is real.
    expect(others.length).toBeGreaterThan(0);
    for (const other of others) expect(chosenIndex).toBeLessThanOrEqual(other);
  });

  it('lands each stage on the exact move that completed it', () => {
    expect(splits.shape === 'cfop' && splits.cross.moveIndex).toBe(CROSS_END);
    expect(splits.shape === 'cfop' && splits.f2l.moveIndex).toBe(F2L_END);
    expect(splits.shape === 'cfop' && splits.oll.moveIndex).toBe(OLL_END);
    expect(splits.shape === 'cfop' && splits.solved.moveIndex).toBe(SOLVED_END);
  });

  it('carries the timestamp of the completing move', () => {
    expect(splits.shape === 'cfop' && splits.oll.atMs).toBe((OLL_END + 1) * 100);
  });
});

describe('why the scan runs forward', () => {
  // This is the test that stops anyone reverting to a backward "last continuously
  // true" scan. Every OLL and PLL algorithm breaks F2L partway through and restores
  // it, so the final unbroken run of "F2L complete" begins inside the last-layer
  // algorithm -- which would collapse three stages onto one index.
  it('shows F2L going false again in the middle of the OLL algorithm', () => {
    const states = [scrambleFor()];
    for (const move of SOLVE) states.push(applyMoves(states[states.length - 1], [move]));

    const f2lAt = (moveIndex: number) => f2lComplete(states[moveIndex + 1], 'D');

    expect(f2lAt(F2L_END)).toBe(true); // F2L genuinely finished here
    expect(f2lAt(F2L_END + 1)).toBe(false); // Sune's first move opens a slot again
    expect(f2lAt(SOLVED_END)).toBe(true); // and it is closed again by the end
  });

  it('still reports F2L at its real completion, not inside the last layer', () => {
    const splits = computeStageSplits(scrambleFor(), logOf());
    expect(splits.shape === 'cfop' && splits.f2l.moveIndex).toBe(F2L_END);
    expect(splits.shape === 'cfop' && splits.f2l.moveIndex).toBeLessThan(OLL_END);
  });
});

describe('predicates', () => {
  const states = (() => {
    const out = [scrambleFor()];
    for (const move of SOLVE) out.push(applyMoves(out[out.length - 1], [move]));
    return out;
  })();

  it('does not call the cross complete before it is built', () => {
    expect(crossComplete(states[0], 'D')).toBe(false);
    expect(crossComplete(states[CROSS_END + 1], 'D')).toBe(true);
  });

  it('treats OLL as orientation only, ignoring where the pieces sit', () => {
    // After Sune the top face is one colour but the layer is not permuted, so OLL is
    // complete while the cube is not solved.
    expect(ollComplete(states[OLL_END + 1], 'D')).toBe(true);
    expect(f2lComplete(states[OLL_END + 1], 'D')).toBe(true);
    expect(crossComplete(states[OLL_END + 1], 'D')).toBe(true);
    expect(computeStageSplits(scrambleFor(), logOf()).shape).toBe('cfop');
  });
});

describe('solves that are not CFOP-shaped', () => {
  it('reports unrecognised rather than a wrong number when stages coincide', () => {
    // One move from solved: every stage completes on the same move, so there are no
    // distinct phases to report. A Roux or blockbuilding solve fails the same check.
    const solution = parseAlg('R');
    expect(computeStageSplits(scrambleFor(solution), logOf(solution)).shape).toBe('unrecognised');
  });

  it('reports unrecognised when the log does not reach a solved cube', () => {
    const partial = SOLVE.slice(0, 10);
    expect(computeStageSplits(scrambleFor(), logOf(partial)).shape).toBe('unrecognised');
  });

  it('reports unrecognised for an empty log', () => {
    expect(computeStageSplits(solvedCube(), []).shape).toBe('unrecognised');
  });
});

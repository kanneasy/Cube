import { describe, it, expect } from 'vitest';
import { cube3x3x3 } from 'cubing/puzzles';
import { experimentalSolve3x3x3IgnoringCenters } from 'cubing/search';
import { randomScrambleForEvent } from 'cubing/scramble';
import {
  applyMove,
  applyMoves,
  centerFrame,
  colorAt,
  cubieKind,
  differsByWholeCubeRotation,
  isSolved,
  solvedCube,
  FACES,
  FACE_NORMAL,
  TURNS,
  type Move,
  type TurnBase,
} from './state';
import { formatAlg, inverseAlg, obtmCost, obtmTotal, parseAlg, parseMove } from './notation';

const BASES = Object.keys(TURNS) as TurnBase[];

describe('cube structure', () => {
  it('has 26 cubies: 8 corners, 12 edges, 6 centers', () => {
    const c = solvedCube().cubies;
    expect(c).toHaveLength(26);
    expect(c.filter((x) => cubieKind(x) === 'corner')).toHaveLength(8);
    expect(c.filter((x) => cubieKind(x) === 'edge')).toHaveLength(12);
    expect(c.filter((x) => cubieKind(x) === 'center')).toHaveLength(6);
  });

  it('starts solved, with each centre showing its own colour', () => {
    const s = solvedCube();
    expect(isSolved(s)).toBe(true);
    const frame = centerFrame(s);
    for (const f of FACES) expect(frame[f]).toBe(f);
  });
});

describe('move algebra', () => {
  it.each(BASES)('%s applied four times is the identity', (base) => {
    let s = solvedCube();
    for (let i = 0; i < 4; i++) s = applyMove(s, { base, amount: 1 });
    expect(isSolved(s)).toBe(true);
  });

  it.each(BASES)('%s2 equals %s applied twice', (base) => {
    const a = applyMove(solvedCube(), { base, amount: 2 });
    const b = applyMove(applyMove(solvedCube(), { base, amount: 1 }), { base, amount: 1 });
    expect(a.cubies).toEqual(b.cubies);
  });

  it.each(BASES)("%s followed by %s' is the identity", (base) => {
    let s = applyMove(solvedCube(), { base, amount: 1 });
    s = applyMove(s, { base, amount: 3 });
    expect(isSolved(s)).toBe(true);
  });

  it.each(BASES)('a single %s turn leaves the cube unsolved', (base) => {
    expect(isSolved(applyMove(solvedCube(), { base, amount: 1 }))).toBe(false);
  });

  it('an algorithm followed by its inverse is the identity', () => {
    const alg = parseAlg("R U R' U' F2 L D B' M E S' R2");
    const scrambled = applyMoves(solvedCube(), alg);
    expect(isSolved(scrambled)).toBe(false);
    expect(isSolved(applyMoves(scrambled, inverseAlg(alg)))).toBe(true);
  });

  it('the sexy move repeated six times returns to solved', () => {
    // R U R' U' has order 6. A classic check that orientation, not just permutation,
    // is being tracked correctly.
    let s = solvedCube();
    for (let i = 0; i < 6; i++) s = applyMoves(s, parseAlg("R U R' U'"));
    expect(isSolved(s)).toBe(true);
  });

  it('counts a whole-cube reorientation as solved', () => {
    // R M' L' is a legal sequence in this app and rotates the entire cube. Someone
    // looking at six solid faces must not be told they are unfinished.
    const s = applyMoves(solvedCube(), parseAlg("R M' L'"));
    expect(s.cubies.every((c) => c.pos[0] === c.home[0] && c.pos[1] === c.home[1])).toBe(false);
    expect(isSolved(s)).toBe(true);
  });

  it('does not call a slice-shifted cube solved', () => {
    // M2 leaves the outer layers looking untouched but parks the U centre on D.
    expect(isSolved(applyMoves(solvedCube(), parseAlg('M2')))).toBe(false);
  });
});

describe('U turns the layer the standard way', () => {
  it('sends the front-top row to the left', () => {
    // U clockwise seen from above: F -> L -> B -> R -> F.
    const s = applyMove(solvedCube(), { base: 'U', amount: 1 });
    expect(colorAt(s, [0, 1, 1], FACE_NORMAL.F)).toBe('R');
    expect(colorAt(s, [-1, 1, 0], FACE_NORMAL.L)).toBe('F');
    expect(colorAt(s, [0, 1, -1], FACE_NORMAL.B)).toBe('L');
    expect(colorAt(s, [1, 1, 0], FACE_NORMAL.R)).toBe('B');
  });
});

// The oracle below cannot reach these. WCA scrambles and solutions never contain a
// slice move, so cubing.js never exercises M, E or S -- yet the spec, the engine and
// the notation module all assert their handedness as the fact that justifies charging
// a slice two moves under OBTM. Without this, changing L's handedness and forgetting M
// would regress in silence.
describe('slice moves turn the way the face they are named after turns', () => {
  it.each([
    ['M', "R L'"], // M follows L
    ['E', "U D'"], // E follows D
    ['S', "F' B"], // S follows F
  ])('%s reaches the same cube as %s, up to a whole-cube rotation', (slice, outer) => {
    const viaSlice = applyMoves(solvedCube(), parseAlg(slice));
    const viaOuter = applyMoves(solvedCube(), parseAlg(outer));
    expect(differsByWholeCubeRotation(viaSlice, viaOuter)).toBe(true);
  });

  it.each([
    ["M'", "R L'"],
    ["E'", "U D'"],
    ["S'", "F' B"],
  ])('%s does NOT match %s, so the check has teeth', (slice, outer) => {
    // The inverse slice must fail the same comparison, or the test above would pass
    // against an engine that turned every slice the wrong way.
    const viaSlice = applyMoves(solvedCube(), parseAlg(slice));
    const viaOuter = applyMoves(solvedCube(), parseAlg(outer));
    expect(differsByWholeCubeRotation(viaSlice, viaOuter)).toBe(false);
  });
});

describe('whole-cube rotation comparison', () => {
  it('says a cube and itself match', () => {
    const s = applyMoves(solvedCube(), parseAlg("R U R'"));
    expect(differsByWholeCubeRotation(s, s)).toBe(true);
  });

  it('says two genuinely different cubes do not', () => {
    expect(
      differsByWholeCubeRotation(applyMoves(solvedCube(), parseAlg('R')), applyMoves(solvedCube(), parseAlg('U'))),
    ).toBe(false);
  });
});

describe('notation', () => {
  it('round-trips every base and amount', () => {
    for (const base of BASES) {
      for (const amount of [1, 2, 3] as const) {
        const m: Move = { base, amount };
        expect(parseMove(formatAlg([m]))).toEqual(m);
      }
    }
  });

  it('rejects notation this cube does not define', () => {
    // Wide moves and rotations are real WCA notation but are not in v1's vocabulary,
    // and must fail loudly rather than be silently dropped from a move log.
    for (const bad of ['Rw', 'x', "y'", 'U3', 'r', '']) expect(parseMove(bad)).toBeNull();
    expect(() => parseAlg('R Rw U')).toThrow(/Unparseable/);
  });

  it('prices a face turn at 1 and a slice at 2, per OBTM', () => {
    expect(obtmCost({ base: 'R', amount: 1 })).toBe(1);
    expect(obtmCost({ base: 'R', amount: 2 })).toBe(1); // a half turn is still one turn
    expect(obtmCost({ base: 'M', amount: 1 })).toBe(2); // M = R L' x', and x' is free
    expect(obtmCost({ base: 'E', amount: 2 })).toBe(2);
    expect(obtmTotal(parseAlg("R U2 M D' S"))).toBe(1 + 1 + 2 + 1 + 2);
  });
});

// The oracle. Both models start solved and receive the same move sequence, so they are
// in the same state by construction -- which means a solution the reference computes
// for its state must solve ours. If any move in this engine disagreed with standard
// notation in any way, this is where it would show.
describe('agreement with the reference solver', () => {
  it.each([0, 1, 2, 3, 4])('solves a real random-state scramble (%i)', async () => {
    const scramble = (await randomScrambleForEvent('333')).toString();
    const mine = applyMoves(solvedCube(), parseAlg(scramble));
    expect(isSolved(mine)).toBe(false);

    const kpuzzle = await cube3x3x3.kpuzzle();
    const pattern = kpuzzle.defaultPattern().applyAlg(scramble);
    const solution = (await experimentalSolve3x3x3IgnoringCenters(pattern)).toString();

    expect(isSolved(applyMoves(mine, parseAlg(solution)))).toBe(true);
  }, 30_000);

  it('solves from a partially-solved state, which is what a hint does', async () => {
    const scramble = (await randomScrambleForEvent('333')).toString();
    const played = parseAlg("R U R' U' F R U R'");
    const mine = applyMoves(applyMoves(solvedCube(), parseAlg(scramble)), played);

    const kpuzzle = await cube3x3x3.kpuzzle();
    const pattern = kpuzzle.defaultPattern().applyAlg(scramble).applyAlg(formatAlg(played));
    const solution = (await experimentalSolve3x3x3IgnoringCenters(pattern)).toString();

    expect(isSolved(applyMoves(mine, parseAlg(solution)))).toBe(true);
  }, 30_000);

  // Scenario: "A new casual scramble is random-state and at least two moves from
  // solved" (@tests, story 2).
  it('generates scrambles that are face turns only, and never trivially short', async () => {
    const scramble = (await randomScrambleForEvent('333')).toString();
    const moves = parseAlg(scramble);
    expect(moves.length).toBeGreaterThan(2); // Reg. 4b3: at least 2 moves from solved
    for (const m of moves) expect(['M', 'E', 'S']).not.toContain(m.base);
  }, 30_000);
});

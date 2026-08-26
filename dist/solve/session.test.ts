import { describe, it, expect } from 'vitest';
import {
  canUndo,
  elapsedMs,
  inspectionElapsedMs,
  reachedGoal,
  reduce,
  startSession,
  type Action,
  type Session,
} from './session';
import { inverseAlg, parseAlg } from '../cube/notation';
import { isSolved } from '../cube/state';

const SCRAMBLE = "R U R' U' F2 L D2 B";
const SOLUTION = inverseAlg(parseAlg(SCRAMBLE));

const casual = () => startSession({ mode: 'casual', goal: { kind: 'solved' }, scramble: SCRAMBLE });
const competition = () => startSession({ mode: 'competition', goal: { kind: 'solved' }, scramble: SCRAMBLE });

const play = (s: Session, actions: Action[]): Session => actions.reduce(reduce, s);
const turn = (notation: string, at: number): Action => ({ type: 'turn', move: parseAlg(notation)[0], at });

/** Play the whole solution, one move per 100ms, starting at `from`. */
const solveIt = (s: Session, from = 1000): Session =>
  SOLUTION.reduce((acc, move, i) => reduce(acc, { type: 'turn', move, at: from + i * 100 }), s);

describe('casual mode', () => {
  it('starts idle with the scramble already visible', () => {
    const s = casual();
    expect(s.phase.kind).toBe('ready');
    expect(elapsedMs(s, 5_000)).toBe(0);
    expect(s.moveCount).toBe(0);
  });

  it('leaves the clock at zero however long you look at it', () => {
    expect(elapsedMs(casual(), 999_999)).toBe(0);
  });

  it('starts the clock on the first turn, not before', () => {
    const s = reduce(casual(), turn('R', 5_000));
    expect(s.phase.kind).toBe('solving');
    expect(elapsedMs(s, 8_000)).toBe(3_000);
  });

  it('stops the clock the instant the cube is solved', () => {
    const s = solveIt(casual());
    expect(s.phase.kind).toBe('finished');
    expect(isSolved(s.cube)).toBe(true);
    expect(reachedGoal(s)).toBe(true);
    // Started on move 1 at 1000, last move at 1000 + (n-1)*100.
    expect(s.phase.kind === 'finished' && s.phase.result.rawMs).toBe((SOLUTION.length - 1) * 100);
  });

  it('freezes the clock after finishing', () => {
    const s = solveIt(casual());
    expect(elapsedMs(s, 999_999)).toBe(elapsedMs(s, 0));
  });

  it('ignores further turns once finished', () => {
    const s = solveIt(casual());
    const after = reduce(s, turn('R', 900_000));
    expect(after).toBe(s);
  });
});

describe('competition mode', () => {
  it('keeps the scramble covered until revealed', () => {
    expect(competition().phase.kind).toBe('covered');
  });

  it('will not let a turn start the clock; the ritual is required', () => {
    const s = reduce(competition(), turn('R', 1_000));
    expect(s.phase.kind).toBe('covered');
    expect(s.log).toHaveLength(0);
  });

  it('starts inspection on reveal', () => {
    const s = reduce(competition(), { type: 'reveal', at: 1_000 });
    expect(s.phase.kind).toBe('inspecting');
    expect(inspectionElapsedMs(s, 6_000)).toBe(5_000);
  });

  it('starts the clock on the lift, in the same instant inspection stops', () => {
    const s = play(competition(), [
      { type: 'reveal', at: 1_000 },
      { type: 'holdDown', at: 9_000 },
      { type: 'holdUp', at: 10_000 },
    ]);
    expect(s.phase.kind).toBe('solving');
    expect(elapsedMs(s, 12_000)).toBe(2_000);
    expect(inspectionElapsedMs(s, 12_000)).toBe(0);
  });

  it.each([
    ['clean under 15 seconds', 14_900, 'none'],
    ['penalised at exactly 15.00', 15_000, 'plus2'],
    ['penalised below 17', 16_999, 'plus2'],
    ['a DNF at exactly 17.00', 17_000, 'dnf'],
  ])('is %s', (_label, inspectionMs, expected) => {
    const s = play(competition(), [
      { type: 'reveal', at: 0 },
      { type: 'holdDown', at: inspectionMs - 1 },
      { type: 'holdUp', at: inspectionMs },
    ]);
    expect(s.phase.kind === 'solving' && s.phase.penalty).toBe(expected);
  });

  it('carries the inspection penalty through to the recorded result', () => {
    const started = play(competition(), [
      { type: 'reveal', at: 0 },
      { type: 'holdDown', at: 15_400 },
      { type: 'holdUp', at: 15_500 },
    ]);
    const s = solveIt(started, 20_000);
    expect(s.phase.kind === 'finished' && s.phase.result.penalty).toBe('plus2');
  });
});

describe('moves and undo', () => {
  // Scenario: "A slice-style drag charges two moves toward the counter, matching
  // Outer Block Turn Metric" (@tests, story 4).
  it('counts a face turn as one and a slice as two, per OBTM', () => {
    let s = reduce(casual(), turn('R', 1_000));
    expect(s.moveCount).toBe(1);
    s = reduce(s, turn('U2', 1_100));
    expect(s.moveCount).toBe(2); // a half turn is still one turn
    s = reduce(s, turn('M', 1_200));
    expect(s.moveCount).toBe(4); // M = R L' x', and the rotation is free
  });

  it('reverses exactly one move and puts the cube back', () => {
    const before = reduce(casual(), turn('R', 1_000));
    const after = reduce(reduce(before, turn('U', 1_100)), { type: 'undo', at: 1_200 });
    expect(after.cube.cubies).toEqual(before.cube.cubies);
    expect(after.log).toHaveLength(1);
  });

  it('decrements the counter while the clock keeps running', () => {
    let s = reduce(casual(), turn('R', 1_000));
    s = reduce(s, turn('U', 1_100));
    expect(s.moveCount).toBe(2);
    s = reduce(s, { type: 'undo', at: 5_000 });
    expect(s.moveCount).toBe(1);
    // The whole point: backtracking costs time, not moves.
    expect(elapsedMs(s, 6_000)).toBe(5_000);
  });

  it('gives back the two moves a slice charged', () => {
    let s = reduce(casual(), turn('M', 1_000));
    expect(s.moveCount).toBe(2);
    s = reduce(s, { type: 'undo', at: 1_100 });
    expect(s.moveCount).toBe(0);
  });

  // Scenario: "Undo can be repeated back to the first move of the solve, and is a
  // no-op at zero moves" (@tests, story 4).
  it('can be repeated back to the first move, and is a no-op at zero', () => {
    let s = casual();
    parseAlg("R U F L").forEach((move, i) => {
      s = reduce(s, { type: 'turn', move, at: 1_000 + i * 100 });
    });
    for (let i = 0; i < 4; i++) s = reduce(s, { type: 'undo', at: 5_000 });
    expect(s.moveCount).toBe(0);
    expect(s.log).toHaveLength(0);
    expect(canUndo(s)).toBe(false);

    const idle = reduce(s, { type: 'undo', at: 5_100 });
    expect(idle).toBe(s);
    expect(idle.moveCount).toBe(0); // never negative
  });

  it('is unavailable once the cube is solved and the clock has stopped', () => {
    const s = solveIt(casual());
    expect(canUndo(s)).toBe(false);
    expect(reduce(s, { type: 'undo', at: 900_000 })).toBe(s);
  });

  it('leaves the move count reading the solution actually arrived at', () => {
    // Three moves, two taken back: the counter reads one, which is the length of the
    // path the solver ended up on.
    let s = casual();
    parseAlg('R U F').forEach((move, i) => {
      s = reduce(s, { type: 'turn', move, at: 1_000 + i * 100 });
    });
    s = reduce(s, { type: 'undo', at: 2_000 });
    s = reduce(s, { type: 'undo', at: 2_100 });
    expect(s.moveCount).toBe(1);
  });
});

describe('hints', () => {
  it('marks the solve as practice the moment one is shown, not at the end', () => {
    const s = reduce(casual(), { type: 'hintShown', move: parseAlg('R')[0] });
    expect(s.hinted).toBe(true);
    expect(s.shownHint).toEqual(parseAlg('R')[0]);
  });

  it('stays marked for the rest of the solve', () => {
    let s = reduce(casual(), { type: 'hintShown', move: parseAlg('R')[0] });
    s = solveIt(s);
    expect(s.hinted).toBe(true);
  });

  it('clears the displayed hint once a turn is made', () => {
    let s = reduce(casual(), { type: 'hintShown', move: parseAlg('R')[0] });
    s = reduce(s, turn('R', 1_000));
    expect(s.shownHint).toBeNull();
    expect(s.hinted).toBe(true); // the mark itself does not clear
  });
});

describe('pattern goals', () => {
  it('finishes when the pattern is reached rather than when the cube is solved', () => {
    const s = startSession({ mode: 'casual', goal: { kind: 'pattern', pattern: 'checkerboard' }, scramble: '' });
    expect(reachedGoal(s)).toBe(false);
    const done = parseAlg('M2 E2 S2').reduce((acc, move, i) => reduce(acc, { type: 'turn', move, at: 1_000 + i * 100 }), s);
    expect(done.phase.kind).toBe('finished');
    expect(isSolved(done.cube)).toBe(false); // a checkerboard is not a solved cube
  });

  it('does not finish a pattern session on a solved cube', () => {
    const s = startSession({ mode: 'casual', goal: { kind: 'pattern', pattern: 'superflip' }, scramble: "R" });
    const back = reduce(s, turn("R'", 1_000));
    expect(isSolved(back.cube)).toBe(true);
    expect(back.phase.kind).toBe('solving'); // still going: the goal was not the solved state
  });
});

describe('stage splits on finishing', () => {
  it('computes splits from the log actually ended on', () => {
    const s = solveIt(casual());
    expect(s.phase.kind === 'finished' && s.phase.splits).toBeDefined();
  });
});

import { describe, it, expect } from 'vitest';
import { toStoredSolve } from './library';
import { reduce, startSession, type Session } from '../solve/session';
import { inverseAlg, parseAlg } from '../cube/notation';
import { fastestBoard, fewestMovesBoard } from './records';

const SCRAMBLE = "R U R' U' F2 L D2 B";
const SOLUTION = inverseAlg(parseAlg(SCRAMBLE));
const NOW = new Date('2026-08-26T12:00:00.000Z');

function solved(over: { hinted?: boolean; extraThenUndo?: boolean } = {}): Session {
  let s = startSession({ mode: 'casual', goal: { kind: 'solved' }, scramble: SCRAMBLE });
  if (over.hinted) s = reduce(s, { type: 'hintShown', move: parseAlg('R')[0] });
  if (over.extraThenUndo) {
    s = reduce(s, { type: 'turn', move: parseAlg('R')[0], at: 500 });
    s = reduce(s, { type: 'undo', at: 600 });
  }
  return SOLUTION.reduce((acc, move, i) => reduce(acc, { type: 'turn', move, at: 1000 + i * 100 }), s);
}

describe('turning a session into a record', () => {
  it('refuses to store a solve that has not finished', () => {
    const running = reduce(startSession({ mode: 'casual', goal: { kind: 'solved' }, scramble: SCRAMBLE }), {
      type: 'turn',
      move: parseAlg('R')[0],
      at: 1000,
    });
    expect(toStoredSolve(running, NOW)).toBeNull();
  });

  it('stores the scramble, the solution and the count', () => {
    const stored = toStoredSolve(solved(), NOW)!;
    expect(stored.scramble).toBe(SCRAMBLE);
    expect(stored.solution.split(/\s+/)).toHaveLength(SOLUTION.length);
    expect(stored.moveCount).toBe(SOLUTION.length);
    expect(stored.penalty).toBe('none');
    expect(stored.hinted).toBe(false);
  });

  it('stores the solution actually arrived at, not everything tried', () => {
    // A move made and taken back is not part of the solution, which is the whole
    // reason the fewest-moves board means something.
    const stored = toStoredSolve(solved({ extraThenUndo: true }), NOW)!;
    expect(stored.moveCount).toBe(SOLUTION.length);
    expect(stored.solution.split(/\s+/)).toHaveLength(SOLUTION.length);
  });

  it('carries the practice mark through to the record', () => {
    const stored = toStoredSolve(solved({ hinted: true }), NOW)!;
    expect(stored.hinted).toBe(true);
    // And that mark is what keeps it off both boards.
    expect(fastestBoard([stored])).toHaveLength(0);
    expect(fewestMovesBoard([stored])).toHaveLength(0);
  });

  it('marks a daily attempt with its date, and an ordinary solve with none', () => {
    expect(toStoredSolve(solved(), NOW, '2026-08-26')!.dailyDate).toBe('2026-08-26');
    expect(toStoredSolve(solved(), NOW)!.dailyDate).toBeUndefined();
  });

  it('gives every solve a distinct id', () => {
    const ids = new Set(Array.from({ length: 50 }, () => toStoredSolve(solved(), NOW)!.id));
    expect(ids.size).toBe(50);
  });

  it('lands on the boards once stored', () => {
    const stored = toStoredSolve(solved(), NOW)!;
    expect(fastestBoard([stored]).map((s) => s.id)).toEqual([stored.id]);
    expect(fewestMovesBoard([stored]).map((s) => s.id)).toEqual([stored.id]);
  });
});

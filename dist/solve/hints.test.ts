import { describe, it, expect, vi } from 'vitest';
import { HintPlanner, nextFromPlan, progressAlong, toQuarterTurns } from './hints';
import { parseAlg, formatAlg } from '../cube/notation';
import type { Move } from '../cube/state';

const alg = (s: string) => parseAlg(s);

describe('following a plan', () => {
  const plan = { origin: alg("R U"), solution: alg("F D L") };

  it('offers the first move when nothing has been played since', () => {
    expect(nextFromPlan(plan, alg("R U"))).toEqual(alg('F')[0]);
  });

  it('advances as the plan is followed', () => {
    expect(nextFromPlan(plan, alg("R U F"))).toEqual(alg('D')[0]);
    expect(nextFromPlan(plan, alg("R U F D"))).toEqual(alg('L')[0]);
  });

  it('is spent once the plan is complete', () => {
    expect(nextFromPlan(plan, alg("R U F D L"))).toBeNull();
  });

  it('is abandoned when the solver plays something else', () => {
    expect(progressAlong(plan, alg("R U B"))).toBeNull();
    expect(nextFromPlan(plan, alg("R U B"))).toBeNull();
  });

  it('is abandoned when the log no longer starts with the origin', () => {
    // An undo took the log back behind where the plan was made.
    expect(progressAlong(plan, alg('R'))).toBeNull();
  });
});

describe('the planner', () => {
  it('solves once and serves the solution in order', async () => {
    const solve = vi.fn(async () => alg("F D L"));
    const planner = new HintPlanner(solve);

    expect(formatAlg([(await planner.next(alg('R')))!])).toBe('F');
    expect(formatAlg([(await planner.next(alg('R F')))!])).toBe('D');
    expect(formatAlg([(await planner.next(alg('R F D')))!])).toBe('L');
    expect(solve).toHaveBeenCalledTimes(1);
  });

  it('re-solves when the solver leaves the plan', async () => {
    const solve = vi
      .fn<(log: readonly Move[]) => Promise<Move[]>>()
      .mockResolvedValueOnce(alg("F D L"))
      .mockResolvedValueOnce(alg("U2 R"));
    const planner = new HintPlanner(solve);

    expect(formatAlg([(await planner.next(alg('R')))!])).toBe('F');
    // They played B instead of F.
    expect(formatAlg([(await planner.next(alg('R B')))!])).toBe('U'); // U2, offered a quarter at a time
    expect(solve).toHaveBeenCalledTimes(2);
  });

  // The reason this module exists. Reproduced from a real failure: the two-phase solver
  // is deterministic per state but not optimal, so its first move from a state can lead
  // to a state whose own first move leads straight back. Re-solving every time then
  // hands out F2 forever and the cube flips between two positions.
  it('does not cycle against a solver whose first move oscillates', async () => {
    const cyclingSolver = async (log: readonly Move[]) => {
      // Whatever has been played, this solver always says "F2 then done", which taken
      // one move at a time is an infinite two-cycle.
      void log;
      return alg('F2');
    };

    const planner = new HintPlanner(cyclingSolver);
    let log = alg('R');
    // F2 arrives as two quarter turns, since that is what a drag can do.
    const first = await planner.next(log);
    expect(formatAlg([first!])).toBe('F');
    log = [...log, first!];
    const second = await planner.next(log);
    expect(formatAlg([second!])).toBe('F');
    log = [...log, second!];

    // Having followed the whole plan, it is spent -- the planner does not simply
    // re-offer the same first move the way re-solving every time did.
    expect(await planner.next(log)).toBeNull();
  });

  it('reports nothing to hint when the solver returns an empty solution', async () => {
    const planner = new HintPlanner(async () => []);
    expect(await planner.next(alg('R'))).toBeNull();
  });

  it('forgets its plan on reset', async () => {
    const solve = vi.fn(async () => alg('F D'));
    const planner = new HintPlanner(solve);
    await planner.next(alg('R'));
    planner.reset();
    await planner.next(alg('R'));
    expect(solve).toHaveBeenCalledTimes(2);
  });
});

describe('hints stay in the vocabulary a drag has', () => {
  // A drag commits at most one quarter turn, so a hint of U2 asks for something no
  // gesture can do -- turn once, ask again, get another U-family hint, and the hint
  // reads as stuck. Reported from a real phone.
  it('splits a half turn into two quarter turns', () => {
    expect(formatAlg(toQuarterTurns(alg('U2')))).toBe('U U');
    expect(formatAlg(toQuarterTurns(alg("R2 F' D2")))).toBe("R R F' D D");
  });

  it('leaves quarter turns and primes alone', () => {
    expect(formatAlg(toQuarterTurns(alg("R U' F")))).toBe("R U' F");
  });

  it('never offers a half turn as a hint', async () => {
    const planner = new HintPlanner(async () => alg("U2 R2 F"));
    const seen: Move[] = [];
    let log: Move[] = [];
    for (let i = 0; i < 5; i++) {
      const move = await planner.next(log);
      if (!move) break;
      seen.push(move);
      log = [...log, move];
    }
    expect(formatAlg(seen)).toBe('U U R R F');
    expect(seen.every((m) => m.amount !== 2)).toBe(true);
  });

  it('advances one quarter at a time through a half turn', async () => {
    const solve = vi.fn(async () => alg('U2 R'));
    const planner = new HintPlanner(solve);
    expect(formatAlg([(await planner.next(alg('D')))!])).toBe('U');
    // Having played the first quarter, the hint moves on rather than repeating -- and
    // without re-solving, because the plan already knows.
    expect(formatAlg([(await planner.next(alg('D U')))!])).toBe('U');
    expect(formatAlg([(await planner.next(alg('D U U')))!])).toBe('R');
    expect(solve).toHaveBeenCalledTimes(1);
  });
});

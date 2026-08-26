import { describe, it, expect } from 'vitest';
import {
  BOARD_SIZE,
  dailyAttempts,
  fastestBoard,
  fewestMovesBoard,
  isEligibleForRecords,
  localDateKey,
  patternBest,
  type StoredSolve,
} from './records';

let seq = 0;
const solve = (over: Partial<StoredSolve> = {}): StoredSolve => ({
  id: `s${seq}`,
  createdAt: `2026-08-26T10:00:${String(seq++).padStart(2, '0')}.000Z`,
  mode: 'casual',
  goal: { kind: 'solved' },
  scramble: "R U R'",
  solution: "R U' R'",
  moveCount: 30,
  rawMs: 30_000,
  penalty: 'none',
  hinted: false,
  ...over,
});

describe('eligibility', () => {
  it('accepts an ordinary finished solve', () => {
    expect(isEligibleForRecords(solve())).toBe(true);
  });

  it('rejects a hinted solve', () => {
    expect(isEligibleForRecords(solve({ hinted: true }))).toBe(false);
  });

  it('rejects a DNF', () => {
    expect(isEligibleForRecords(solve({ penalty: 'dnf' }))).toBe(false);
  });

  it('accepts a +2, which is a finished solve with a penalty', () => {
    expect(isEligibleForRecords(solve({ penalty: 'plus2' }))).toBe(true);
  });
});

describe('fastest board', () => {
  it('ranks by final time and holds five', () => {
    const all = [50, 10, 30, 20, 60, 40].map((s) => solve({ rawMs: s * 1000 }));
    const board = fastestBoard(all);
    expect(board).toHaveLength(BOARD_SIZE);
    expect(board.map((s) => s.rawMs / 1000)).toEqual([10, 20, 30, 40, 50]);
  });

  it('ranks on the penalised time, not the raw one', () => {
    // 11.00 raw with a +2 becomes 13.00, so it ranks behind a clean 12.00.
    const fast = solve({ rawMs: 11_000, penalty: 'plus2' });
    const clean = solve({ rawMs: 12_000 });
    expect(fastestBoard([fast, clean]).map((s) => s.id)).toEqual([clean.id, fast.id]);
  });

  // Scenario: "A hinted or DNF solve never enters either record board" (@tests,
  // story 5) and "A practice-marked solve is excluded from both record boards and
  // from the averages" (@tests, story 6).
  it('keeps hinted and DNF solves off the board', () => {
    const good = solve({ rawMs: 40_000 });
    const board = fastestBoard([solve({ rawMs: 1_000, hinted: true }), solve({ rawMs: 2_000, penalty: 'dnf' }), good]);
    expect(board.map((s) => s.id)).toEqual([good.id]);
  });

  it('keeps pattern solves off the speed board entirely', () => {
    const pattern = solve({ rawMs: 1_000, goal: { kind: 'pattern', pattern: 'superflip' } });
    const normal = solve({ rawMs: 90_000 });
    expect(fastestBoard([pattern, normal]).map((s) => s.id)).toEqual([normal.id]);
  });

  it('breaks a tie by which was solved first', () => {
    const first = solve({ rawMs: 20_000 });
    const second = solve({ rawMs: 20_000 });
    expect(fastestBoard([second, first]).map((s) => s.id)).toEqual([first.id, second.id]);
  });
});

describe('fewest moves board', () => {
  it('ranks by move count, lowest first', () => {
    const all = [44, 21, 60, 33].map((m) => solve({ moveCount: m }));
    expect(fewestMovesBoard(all).map((s) => s.moveCount)).toEqual([21, 33, 44, 60]);
  });

  it('is independent of how long the solve took', () => {
    const slowButShort = solve({ moveCount: 22, rawMs: 600_000 });
    const fastButLong = solve({ moveCount: 80, rawMs: 9_000 });
    expect(fewestMovesBoard([fastButLong, slowButShort])[0].id).toBe(slowButShort.id);
  });

  it('keeps hinted solves off', () => {
    const hinted = solve({ moveCount: 1, hinted: true });
    const real = solve({ moveCount: 50 });
    expect(fewestMovesBoard([hinted, real]).map((s) => s.id)).toEqual([real.id]);
  });
});

describe('pattern records', () => {
  it('keeps each pattern its own best, by moves', () => {
    const checker = solve({ moveCount: 12, goal: { kind: 'pattern', pattern: 'checkerboard' } });
    const checkerWorse = solve({ moveCount: 30, goal: { kind: 'pattern', pattern: 'checkerboard' } });
    const flip = solve({ moveCount: 20, goal: { kind: 'pattern', pattern: 'superflip' } });
    const all = [checkerWorse, checker, flip];
    expect(patternBest(all, 'checkerboard')?.id).toBe(checker.id);
    expect(patternBest(all, 'superflip')?.id).toBe(flip.id);
    expect(patternBest(all, 'cube-in-cube')).toBeNull();
  });
});

describe('daily attempts', () => {
  it('shows only that date, most recent first', () => {
    const today1 = solve({ dailyDate: '2026-08-26' });
    const today2 = solve({ dailyDate: '2026-08-26' });
    const yesterday = solve({ dailyDate: '2026-08-25' });
    const attempts = dailyAttempts([today1, yesterday, today2], '2026-08-26');
    expect(attempts.map((s) => s.id)).toEqual([today2.id, today1.id]);
  });
});

describe('date key', () => {
  it('uses the local calendar date, not UTC', () => {
    // 23:30 local on the 26th is already the 27th in UTC. "Today" must be the user's.
    const late = new Date(2026, 7, 26, 23, 30, 0);
    expect(localDateKey(late)).toBe('2026-08-26');
  });

  it('pads months and days', () => {
    expect(localDateKey(new Date(2026, 0, 5))).toBe('2026-01-05');
  });
});

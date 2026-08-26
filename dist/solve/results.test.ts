import { describe, it, expect } from 'vitest';
import {
  averageOf12,
  averageOf5,
  finalMs,
  formatScoreSheet,
  formatTime,
  inspectionPenalty,
  rollingWindow,
  roundAverage,
  truncateSingle,
  type SolveResult,
} from './results';

const t = (rawMs: number, penalty: SolveResult['penalty'] = 'none'): SolveResult => ({ rawMs, penalty });
const DNF = t(0, 'dnf');

describe('inspection penalties (A4d1, A4d2)', () => {
  it('is clean strictly under 15 seconds', () => {
    expect(inspectionPenalty(0)).toBe('none');
    expect(inspectionPenalty(14_999)).toBe('none');
  });

  it('penalises exactly 15.00 seconds', () => {
    // A4d1+ makes the boundary land against the competitor rather than for them.
    expect(inspectionPenalty(15_000)).toBe('plus2');
  });

  it('is +2 through the band below 17 seconds', () => {
    expect(inspectionPenalty(16_999)).toBe('plus2');
  });

  it('DNFs at exactly 17.00 seconds and beyond', () => {
    expect(inspectionPenalty(17_000)).toBe('dnf');
    expect(inspectionPenalty(30_000)).toBe('dnf');
  });
});

describe('precision (9f1, 9f2)', () => {
  it('truncates a single rather than rounding it', () => {
    // The regulation's own example: 12.678 is recorded as 12.67, not 12.68.
    expect(truncateSingle(12_678)).toBe(12_670);
    expect(truncateSingle(12_679)).toBe(12_670);
    expect(truncateSingle(12_670)).toBe(12_670);
  });

  it('rounds an average rather than truncating it', () => {
    expect(roundAverage(12_678)).toBe(12_680);
    expect(roundAverage(12_674)).toBe(12_670);
  });

  it('keeps the two operations distinct on the same input', () => {
    // Reusing one rounding function for both is the mistake the regs invite.
    expect(truncateSingle(9_999)).not.toBe(roundAverage(9_999));
  });
});

describe('final result', () => {
  it('adds two seconds to a penalised solve, on top of the truncated raw time', () => {
    expect(finalMs(t(17_658, 'plus2'))).toBe(19_650);
  });

  it('has no time at all for a DNF', () => {
    // null rather than a sentinel: a sentinel number sorts into a leaderboard.
    expect(finalMs(DNF)).toBeNull();
  });

  it('reads like a score sheet (A7b1)', () => {
    expect(formatScoreSheet(t(17_658, 'plus2'))).toBe('17.65 + 2 = 19.65');
    expect(formatScoreSheet(t(17_658))).toBe('17.65');
    expect(formatScoreSheet(t(17_658, 'dnf'))).toBe('DNF (17.65)');
  });
});

describe('average of 5 (9f8, 9f9)', () => {
  it('drops the best and the worst and means the middle three', () => {
    const a = averageOf5([t(10_000), t(12_000), t(14_000), t(16_000), t(30_000)]);
    expect(a).toEqual({ kind: 'time', ms: 14_000 }); // 12 + 14 + 16 over 3
  });

  it('absorbs a single DNF as the dropped worst result', () => {
    const a = averageOf5([t(10_000), t(12_000), t(14_000), t(16_000), DNF]);
    expect(a).toEqual({ kind: 'time', ms: 14_000 }); // 12 + 14 + 16, the 10 is the best
  });

  it('is a DNF once two results are DNFs', () => {
    // Counted first. Sort-and-drop reasoning gets the single-DNF case right and this
    // one wrong, which is exactly why 9f9 is written as a count.
    expect(averageOf5([t(10_000), t(12_000), t(14_000), DNF, DNF])).toEqual({ kind: 'dnf' });
  });

  it('is a DNF when every result is a DNF', () => {
    expect(averageOf5([DNF, DNF, DNF, DNF, DNF])).toEqual({ kind: 'dnf' });
  });

  it('applies penalties before ranking, so a +2 can change the trim', () => {
    // 14.00 raw with a +2 becomes 16.00, which makes it the worst and drops it.
    const a = averageOf5([t(10_000), t(12_000), t(14_000, 'plus2'), t(13_000), t(11_000)]);
    expect(a).toEqual({ kind: 'time', ms: 12_000 }); // 11 + 12 + 13 over 3
  });

  it('refuses a window that is not exactly five results', () => {
    expect(() => averageOf5([t(1), t(2), t(3)])).toThrow(/Expected 5/);
  });
});

describe('average of 12', () => {
  it('drops one from each end and means the middle ten', () => {
    const results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => t(n * 1000));
    // Drops 1 and 12; mean of 2..11 is 6.5s.
    expect(averageOf12(results)).toEqual({ kind: 'time', ms: 6_500 });
  });

  it('absorbs one DNF and fails on two', () => {
    const base = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => t(n * 1000));
    expect(averageOf12([...base, DNF]).kind).toBe('time');
    expect(averageOf12([...base.slice(1), DNF, DNF]).kind).toBe('dnf');
  });
});

describe('rolling window', () => {
  it('is null until enough solves exist', () => {
    expect(rollingWindow([t(1), t(2)], 5)).toBeNull();
  });

  it('takes the most recent results, oldest first', () => {
    const h = [t(1), t(2), t(3), t(4), t(5), t(6)];
    expect(rollingWindow(h, 5)).toEqual([t(2), t(3), t(4), t(5), t(6)]);
  });
});

describe('formatting', () => {
  it.each([
    [0, '0.00'],
    [1_230, '1.23'],
    [59_990, '59.99'],
    [60_000, '1:00.00'],
    [83_450, '1:23.45'],
    [600_000, '10:00.00'],
  ])('formats %ims as %s', (ms, expected) => {
    expect(formatTime(ms)).toBe(expected);
  });

  it('shows a DNF as DNF rather than as a time', () => {
    expect(formatTime(null)).toBe('DNF');
  });
});

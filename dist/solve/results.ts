// Result arithmetic, to the Regulations.
//
// Everything here is specified precisely by the WCA and gets implemented wrong in
// predictable ways, so each rule cites the regulation it comes from. See
// src/references/wca-legitimacy.md for the quoted text.

export type Penalty = 'none' | 'plus2' | 'dnf';

export interface SolveResult {
  /** Raw stopped time in milliseconds, before any penalty. */
  readonly rawMs: number;
  readonly penalty: Penalty;
}

/** Inspection thresholds, in milliseconds. */
export const PLUS_TWO_THRESHOLD_MS = 15_000;
export const DNF_THRESHOLD_MS = 17_000;
const PLUS_TWO_MS = 2_000;

/**
 * The penalty for how long inspection ran (Regulations A4d1, A4d2).
 *
 * A3a1 allots "strictly less than 15 seconds", and the clarifications make both
 * boundaries land against the competitor: exactly 15.00 already incurs the +2, and
 * exactly 17.00 is already a DNF.
 */
export function inspectionPenalty(inspectionMs: number): Penalty {
  if (inspectionMs >= DNF_THRESHOLD_MS) return 'dnf';
  if (inspectionMs >= PLUS_TWO_THRESHOLD_MS) return 'plus2';
  return 'none';
}

/**
 * Truncate a single result to hundredths (Regulation 9f1): "if the timer displays
 * 12.678 ... the original recorded time is 12.67". Truncated, never rounded.
 */
export const truncateSingle = (ms: number): number => Math.floor(ms / 10) * 10;

/** Round an average to hundredths (Regulation 9f2). Averages round; singles truncate. */
export const roundAverage = (ms: number): number => Math.round(ms / 10) * 10;

/**
 * The final result: the truncated raw time plus any time penalty. A DNF has no final
 * time at all, which is why this returns null rather than a sentinel number -- a
 * sentinel would sort into a leaderboard.
 */
export function finalMs(result: SolveResult): number | null {
  if (result.penalty === 'dnf') return null;
  return truncateSingle(result.rawMs) + (result.penalty === 'plus2' ? PLUS_TWO_MS : 0);
}

export type AverageResult = { kind: 'time'; ms: number } | { kind: 'dnf' };

/**
 * A WCA "Average" is a TRIMMED mean: drop the best and the worst, take the arithmetic
 * mean of the rest (9f8). An untrimmed mean is called a "Mean" and is a different
 * thing; the two words are not interchangeable in this vocabulary.
 *
 * The DNF rule is the part implementations get wrong (9f9). One DNF is permitted and
 * becomes the dropped worst result. Two or more make the whole average a DNF. This is
 * counted FIRST rather than discovered by sorting, because sort-and-drop reasoning
 * gives the right answer for the common case and the wrong one for five results where
 * two are DNFs.
 */
export function trimmedAverage(results: readonly SolveResult[], count: number, trim: number): AverageResult {
  if (results.length !== count) throw new Error(`Expected ${count} results, got ${results.length}`);

  const dnfCount = results.filter((r) => r.penalty === 'dnf').length;
  if (dnfCount > trim) return { kind: 'dnf' };

  const finals = results.map(finalMs);
  // A DNF sorts as the worst possible result so the trim drops it.
  const sorted = [...finals].sort((a, b) => (a === null ? 1 : b === null ? -1 : a - b));
  const kept = sorted.slice(trim, sorted.length - trim) as number[];
  const mean = kept.reduce((s, x) => s + x, 0) / kept.length;
  return { kind: 'time', ms: roundAverage(mean) };
}

/** Average of 5: drop best and worst, mean the middle 3 (Regulation 9f8). */
export const averageOf5 = (results: readonly SolveResult[]): AverageResult => trimmedAverage(results, 5, 1);

/**
 * Average of 12: drop best and worst, mean the middle 10.
 *
 * This is NOT a WCA format -- the WCA never runs one. It is the community convention
 * that generalises 9f8's trimming to twelve attempts, and it is what every cuber
 * expects to see, so it ships, labelled honestly wherever it appears.
 */
export const averageOf12 = (results: readonly SolveResult[]): AverageResult => trimmedAverage(results, 12, 1);

/** The most recent `count` results, oldest first, or null if there are not enough yet. */
export function rollingWindow(history: readonly SolveResult[], count: number): SolveResult[] | null {
  if (history.length < count) return null;
  return history.slice(history.length - count);
}

/** mm:ss.hh, or m:ss.hh under ten minutes, or s.hh under a minute. */
export function formatTime(ms: number | null): string {
  if (ms === null) return 'DNF';
  const total = Math.max(0, ms);
  const minutes = Math.floor(total / 60_000);
  const seconds = Math.floor((total % 60_000) / 1000);
  const hundredths = Math.floor((total % 1000) / 10);
  const hh = String(hundredths).padStart(2, '0');
  if (minutes === 0) return `${seconds}.${hh}`;
  return `${minutes}:${String(seconds).padStart(2, '0')}.${hh}`;
}

export const formatAverage = (a: AverageResult): string => (a.kind === 'dnf' ? 'DNF' : formatTime(a.ms));

/**
 * How a score sheet reads (Regulation A7b1): "T + X = F". Shown in history so a
 * penalised solve says what happened rather than only showing the number it became.
 */
export function formatScoreSheet(result: SolveResult): string {
  const raw = formatTime(truncateSingle(result.rawMs));
  if (result.penalty === 'dnf') return `DNF (${raw})`;
  if (result.penalty === 'plus2') return `${raw} + 2 = ${formatTime(finalMs(result))}`;
  return raw;
}

// What gets stored, and which solves earn a place on a board.

import { finalMs, type Penalty, type SolveResult } from '../solve/results';
import type { StageSplits } from '../solve/stages';

export type TimerMode = 'casual' | 'competition';
export type PatternId = 'checkerboard' | 'cube-in-cube' | 'superflip';
export type Goal = { kind: 'solved' } | { kind: 'pattern'; pattern: PatternId };

export interface StoredSolve {
  readonly id: string;
  readonly createdAt: string;
  readonly mode: TimerMode;
  readonly goal: Goal;
  /** The scramble as standard notation, exactly as generated. */
  readonly scramble: string;
  /** The solution the solver actually ended on, after any undos. */
  readonly solution: string;
  /** OBTM: a face turn is 1, a slice is 2. */
  readonly moveCount: number;
  readonly rawMs: number;
  readonly penalty: Penalty;
  /** True once a hint was taken. Permanently disqualifies the solve from the boards. */
  readonly hinted: boolean;
  /** Present only for a daily-scramble attempt: the local calendar date, YYYY-MM-DD. */
  readonly dailyDate?: string;
  readonly splits?: StageSplits;
}

export const asResult = (s: StoredSolve): SolveResult => ({ rawMs: s.rawMs, penalty: s.penalty });

/**
 * A solve earns a place on a board unless a hint was taken or it did not finish.
 * Practice solves still enter the history — a history that hides them is lying about
 * what happened — they just cannot set a record.
 */
export const isEligibleForRecords = (s: StoredSolve): boolean => !s.hinted && s.penalty !== 'dnf';

export const BOARD_SIZE = 5;

/** Fastest final times, best first. Penalties are already applied. */
export function fastestBoard(solves: readonly StoredSolve[], size = BOARD_SIZE): StoredSolve[] {
  return solves
    .filter((s) => s.goal.kind === 'solved' && isEligibleForRecords(s))
    .map((s) => ({ s, ms: finalMs(asResult(s)) }))
    .filter((x): x is { s: StoredSolve; ms: number } => x.ms !== null)
    .sort((a, b) => a.ms - b.ms || a.s.createdAt.localeCompare(b.s.createdAt))
    .slice(0, size)
    .map((x) => x.s);
}

/** Fewest moves, in OBTM, lowest first. */
export function fewestMovesBoard(solves: readonly StoredSolve[], size = BOARD_SIZE): StoredSolve[] {
  return solves
    .filter((s) => s.goal.kind === 'solved' && isEligibleForRecords(s))
    .slice()
    .sort((a, b) => a.moveCount - b.moveCount || a.createdAt.localeCompare(b.createdAt))
    .slice(0, size);
}

/**
 * A pattern's own fewest-moves record. Patterns keep no time record: a pattern is
 * something to solve efficiently rather than race.
 */
export function patternBest(solves: readonly StoredSolve[], pattern: PatternId): StoredSolve | null {
  const forPattern = solves
    .filter((s) => s.goal.kind === 'pattern' && s.goal.pattern === pattern && isEligibleForRecords(s))
    .sort((a, b) => a.moveCount - b.moveCount || a.createdAt.localeCompare(b.createdAt));
  return forPattern[0] ?? null;
}

/** Attempts at one day's scramble, most recent first. */
export const dailyAttempts = (solves: readonly StoredSolve[], date: string): StoredSolve[] =>
  solves.filter((s) => s.dailyDate === date).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

/** The device's local calendar date as YYYY-MM-DD. Local, not UTC: "today" is the user's. */
export function localDateKey(now: Date): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

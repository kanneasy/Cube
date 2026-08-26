// Turning a finished session into a stored solve, and reading the boards back.

import { formatAlg } from '../cube/notation';
import type { Session } from '../solve/session';
import type { StoredSolve } from './records';

/** A stable id without pulling in a uuid dependency. Local to one device. */
function solveId(createdAt: string): string {
  const rand = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0');
  return `${createdAt}-${rand}`;
}

/**
 * A finished session becomes a record. Returns null while the solve is still running,
 * so a caller cannot accidentally persist a half-finished attempt.
 *
 * Note what is stored: the SOLUTION, meaning the move log as it stands after any
 * undos, not everything that was ever tried. That is what makes the fewest-moves
 * board the length of the path actually arrived at.
 */
export function toStoredSolve(session: Session, now: Date, dailyDate?: string): StoredSolve | null {
  if (session.phase.kind !== 'finished') return null;
  const createdAt = now.toISOString();
  return {
    id: solveId(createdAt),
    createdAt,
    mode: session.mode,
    goal: session.goal,
    scramble: session.scramble,
    solution: formatAlg(session.log.map((entry) => entry.move)),
    moveCount: session.moveCount,
    rawMs: session.phase.result.rawMs,
    penalty: session.phase.result.penalty,
    hinted: session.hinted,
    ...(dailyDate ? { dailyDate } : {}),
    splits: session.phase.splits,
  };
}

// Hint planning.
//
// The obvious implementation -- compute a fresh solution every time and reveal its
// first move -- does not converge. The solver is two-phase, not optimal, and its
// solutions are deterministic per state, so the first move from state S can lead to a
// state whose own first move leads straight back to S. Measured on this machine: a
// hint returning F2 forever, the cube flipping between two positions, for as long as
// anyone was willing to keep tapping.
//
// So a hint plans once and serves the plan in order. The plan is a real solution, so
// following it terminates. It is recomputed only when the solver actually leaves it,
// which is what makes a hint safe to take repeatedly.

import type { Move } from '../cube/state';
import { formatMove } from '../cube/notation';

export interface HintPlan {
  /** The move log this plan was computed from. */
  readonly origin: readonly Move[];
  /** A complete solution from the position that log produced. */
  readonly solution: readonly Move[];
}

const sameMove = (a: Move, b: Move) => a.base === b.base && a.amount === b.amount;

/**
 * How far into `plan` the given log has travelled, or null if the log has left the
 * plan and it must be recomputed.
 */
export function progressAlong(plan: HintPlan, log: readonly Move[]): number | null {
  if (log.length < plan.origin.length) return null;
  for (let i = 0; i < plan.origin.length; i++) {
    if (!sameMove(plan.origin[i], log[i])) return null;
  }
  const played = log.slice(plan.origin.length);
  if (played.length > plan.solution.length) return null;
  for (let i = 0; i < played.length; i++) {
    if (!sameMove(plan.solution[i], played[i])) return null;
  }
  return played.length;
}

/** The next move a plan offers, or null when the plan is spent or abandoned. */
export function nextFromPlan(plan: HintPlan, log: readonly Move[]): Move | null {
  const progress = progressAlong(plan, log);
  if (progress === null) return null;
  return plan.solution[progress] ?? null;
}

/**
 * Serves hints from a plan, recomputing only when the log leaves it.
 *
 * `solve` is injected rather than imported so this can be tested against a solver that
 * deliberately cycles -- which is the failure this exists to prevent, and which a real
 * solver only exhibits on some scrambles.
 */
export class HintPlanner {
  private plan: HintPlan | null = null;

  constructor(private readonly solve: (log: readonly Move[]) => Promise<Move[]>) {}

  async next(log: readonly Move[]): Promise<Move | null> {
    if (this.plan) {
      const move = nextFromPlan(this.plan, log);
      if (move) return move;
      // Either the plan is spent, or the solver went their own way.
      if (progressAlong(this.plan, log) !== null) return null; // solved; nothing left
    }

    const solution = await this.solve(log);
    if (solution.length === 0) {
      this.plan = null;
      return null;
    }
    this.plan = { origin: [...log], solution };
    return solution[0] ?? null;
  }

  /** Drop the plan. Used when the session restarts on a new scramble. */
  reset(): void {
    this.plan = null;
  }

  /** For diagnostics and tests. */
  get planned(): string | null {
    return this.plan ? this.plan.solution.map(formatMove).join(' ') : null;
  }
}

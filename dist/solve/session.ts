// The solve session: one scramble, from reveal to record.
//
// A pure reducer that never reads the clock itself -- every action carries the time it
// happened. That keeps the timing rules, which are the part a cuber will judge the app
// on, deterministically testable rather than dependent on real elapsed seconds.

import { applyMoves, isSolved, type CubeState, type Move } from '../cube/state';
import { obtmCost, parseAlg } from '../cube/notation';
import { matchesTarget, patternTarget } from '../cube/patterns';
import { inspectionPenalty, type Penalty, type SolveResult } from './results';
import { computeStageSplits, type LoggedMove, type StageSplits } from './stages';
import type { Goal, TimerMode } from '../store/records';
import { solvedCube } from '../cube/state';

export type Phase =
  /** Casual: scramble is visible, clock idle, waiting for the first turn. */
  | { readonly kind: 'ready' }
  /** Competition: the scramble is still covered. */
  | { readonly kind: 'covered' }
  /** Competition: inspection is running. */
  | { readonly kind: 'inspecting'; readonly startedAt: number }
  /** Competition: fingers are down; lifting them starts the solve. */
  | { readonly kind: 'holding'; readonly inspectionStartedAt: number }
  | { readonly kind: 'solving'; readonly startedAt: number; readonly penalty: Penalty }
  | { readonly kind: 'finished'; readonly result: SolveResult; readonly splits: StageSplits };

export interface Session {
  readonly mode: TimerMode;
  readonly goal: Goal;
  readonly scramble: string;
  /** The state the scramble produced. The solve is measured from here. */
  readonly scrambled: CubeState;
  readonly cube: CubeState;
  readonly log: readonly LoggedMove[];
  /** Outer Block Turn Metric: a face turn is 1, a slice is 2. */
  readonly moveCount: number;
  readonly hinted: boolean;
  /** The move a hint most recently revealed, for display. */
  readonly shownHint: Move | null;
  readonly phase: Phase;
}

export type Action =
  | { readonly type: 'reveal'; readonly at: number }
  | { readonly type: 'holdDown'; readonly at: number }
  | { readonly type: 'holdUp'; readonly at: number }
  | { readonly type: 'turn'; readonly move: Move; readonly at: number }
  | { readonly type: 'undo'; readonly at: number }
  | { readonly type: 'hintShown'; readonly move: Move };

export function startSession(params: {
  mode: TimerMode;
  goal: Goal;
  scramble: string;
}): Session {
  const scrambled = applyMoves(solvedCube(), parseAlg(params.scramble));
  return {
    mode: params.mode,
    goal: params.goal,
    scramble: params.scramble,
    scrambled,
    cube: scrambled,
    log: [],
    moveCount: 0,
    hinted: false,
    shownHint: null,
    // Competition covers the scramble until the solver is ready; casual just shows it.
    phase: params.mode === 'competition' ? { kind: 'covered' } : { kind: 'ready' },
  };
}

/** Whether the cube has reached whatever this session is aiming at. */
export function reachedGoal(session: Session): boolean {
  return session.goal.kind === 'pattern'
    ? matchesTarget(session.cube, patternTarget(session.goal.pattern))
    : isSolved(session.cube);
}

/** Milliseconds on the clock right now. Zero before the solve starts; frozen after. */
export function elapsedMs(session: Session, now: number): number {
  if (session.phase.kind === 'solving') return Math.max(0, now - session.phase.startedAt);
  if (session.phase.kind === 'finished') return session.phase.result.rawMs;
  return 0;
}

/** Milliseconds of inspection used so far. Competition only. */
export function inspectionElapsedMs(session: Session, now: number): number {
  if (session.phase.kind === 'inspecting') return Math.max(0, now - session.phase.startedAt);
  if (session.phase.kind === 'holding') return Math.max(0, now - session.phase.inspectionStartedAt);
  return 0;
}

export const canUndo = (session: Session): boolean =>
  session.log.length > 0 && session.phase.kind === 'solving';

const rebuild = (session: Session, log: readonly LoggedMove[]): CubeState =>
  applyMoves(session.scrambled, log.map((e) => e.move));

function finish(session: Session, next: Session, at: number): Session {
  if (next.phase.kind !== 'solving' || !reachedGoal(next)) return next;
  const rawMs = Math.max(0, at - next.phase.startedAt);
  return {
    ...next,
    phase: {
      kind: 'finished',
      result: { rawMs, penalty: next.phase.penalty },
      splits: next.goal.kind === 'solved' ? computeStageSplits(next.scrambled, next.log) : { shape: 'unrecognised' },
    },
  };
}

export function reduce(session: Session, action: Action): Session {
  switch (action.type) {
    case 'reveal': {
      // Only competition has anything to reveal; inspection starts the moment it is.
      if (session.phase.kind !== 'covered') return session;
      return { ...session, phase: { kind: 'inspecting', startedAt: action.at } };
    }

    case 'holdDown': {
      if (session.phase.kind !== 'inspecting') return session;
      return { ...session, phase: { kind: 'holding', inspectionStartedAt: session.phase.startedAt } };
    }

    case 'holdUp': {
      if (session.phase.kind !== 'holding') return session;
      // The lift both stops inspection and starts the solve, in the same instant.
      const inspectionMs = Math.max(0, action.at - session.phase.inspectionStartedAt);
      return {
        ...session,
        phase: { kind: 'solving', startedAt: action.at, penalty: inspectionPenalty(inspectionMs) },
      };
    }

    case 'turn': {
      if (session.phase.kind === 'finished' || session.phase.kind === 'covered') return session;
      // Competition requires the hold ritual; a turn cannot start the clock there.
      if (session.phase.kind === 'inspecting' || session.phase.kind === 'holding') return session;

      // Casual starts the clock on the first turn, and not a moment before.
      const phase: Phase =
        session.phase.kind === 'ready'
          ? { kind: 'solving', startedAt: action.at, penalty: 'none' }
          : session.phase;
      const startedAt = phase.kind === 'solving' ? phase.startedAt : action.at;

      const log = [...session.log, { move: action.move, atMs: Math.max(0, action.at - startedAt) }];
      const next: Session = {
        ...session,
        phase,
        log,
        cube: applyMoves(session.cube, [action.move]),
        moveCount: session.moveCount + obtmCost(action.move),
        shownHint: null, // the hint has been acted on, or superseded
      };
      return finish(session, next, action.at);
    }

    case 'undo': {
      if (!canUndo(session)) return session;
      const removed = session.log[session.log.length - 1];
      const log = session.log.slice(0, -1);
      // Undo decrements the counter and never touches the clock. The counter therefore
      // always reads the length of the solution actually arrived at, and backtracking
      // costs time rather than moves.
      return {
        ...session,
        log,
        cube: rebuild(session, log),
        moveCount: Math.max(0, session.moveCount - obtmCost(removed.move)),
        shownHint: null,
      };
    }

    case 'hintShown': {
      if (session.phase.kind === 'finished') return session;
      // Taking a hint disqualifies the solve from the boards from this moment on, not
      // at the end -- so the cost is visible while there is still a choice about it.
      return { ...session, hinted: true, shownHint: action.move };
    }
  }
}

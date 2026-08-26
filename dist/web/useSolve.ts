// The bridge between the pure session reducer and the imperative cube stage.
//
// Session state lives in a ref rather than in useState, because a committed turn has
// to reach the renderer in the same tick the gesture released. Going through a React
// state update would leave a frame where the live layer rotation has been cleared but
// the new logical state has not landed, which reads as the cube flickering back.

import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { reduce, startSession, type Action, type Session } from '../solve/session';
import { generateScramble, nextHint } from '../solve/oracle';
import type { Goal, TimerMode } from '../store/records';
import type { CubeRenderer } from './cube/renderer';
import type { CubeAudio } from './cube/audio';

export interface SolveController {
  session: Session;
  /** Set when a turn was refused, for the notation strip to announce. Clears itself. */
  refusal: string | null;
  scrambling: boolean;
  hintPending: boolean;
  dispatch: (action: Action) => void;
  newScramble: (options?: { mode?: TimerMode; goal?: Goal }) => void;
  requestHint: () => void;
}

const REFUSAL_MS = 1400;

export function useSolve(
  rendererRef: React.RefObject<CubeRenderer | null>,
  audio: CubeAudio,
  initialMode: TimerMode,
): SolveController {
  const [, force] = useReducer((n: number) => n + 1, 0);
  const sessionRef = useRef<Session>(startSession({ mode: initialMode, goal: { kind: 'solved' }, scramble: '' }));
  const [refusal, setRefusal] = useState<string | null>(null);
  const [scrambling, setScrambling] = useState(true);
  const [hintPending, setHintPending] = useState(false);
  const refusalTimer = useRef<number | undefined>(undefined);

  const announceRefusal = useCallback(
    (message: string) => {
      audio.thunk();
      setRefusal(message);
      window.clearTimeout(refusalTimer.current);
      refusalTimer.current = window.setTimeout(() => setRefusal(null), REFUSAL_MS);
    },
    [audio],
  );

  const dispatch = useCallback(
    (action: Action) => {
      const before = sessionRef.current;
      const after = reduce(before, action);
      if (after === before) {
        // The reducer refused. A refusal only ever means the puzzle must not change
        // right now, so it has to read as locked rather than as ignored.
        if (action.type === 'turn') {
          // Exact strings from @brand/voice.md, authored in caps rather than
          // transformed, and never punitive: a refusal states the state, not a scolding.
          announceRefusal(
            before.phase.kind === 'finished'
              ? 'SOLVED · LOCKED'
              : before.phase.kind === 'holding'
                ? 'STILL HOLDING'
                : 'INSPECTING · NOT YET',
          );
        }
        return;
      }
      sessionRef.current = after;
      // Synchronously, before React re-renders: the stage must never show a state the
      // logic has already moved past.
      if (after.cube !== before.cube) rendererRef.current?.setState(after.cube);
      force();
    },
    [announceRefusal, rendererRef],
  );

  const newScramble = useCallback(
    (options?: { mode?: TimerMode; goal?: Goal }) => {
      const mode = options?.mode ?? sessionRef.current.mode;
      const goal = options?.goal ?? sessionRef.current.goal;
      setScrambling(true);
      setRefusal(null);

      void generateScramble()
        .then((scramble) => {
          sessionRef.current = startSession({ mode, goal, scramble });
          rendererRef.current?.setState(sessionRef.current.cube);
          setScrambling(false);
          force();
        })
        .catch(() => {
          setScrambling(false);
          announceRefusal('SCRAMBLE FAILED');
        });
    },
    [announceRefusal, rendererRef],
  );

  const requestHint = useCallback(() => {
    const session = sessionRef.current;
    if (session.phase.kind === 'finished' || hintPending) return;
    setHintPending(true);
    void nextHint(session.scramble, session.log.map((entry) => entry.move))
      .then((move) => {
        setHintPending(false);
        if (move) dispatch({ type: 'hintShown', move });
      })
      .catch(() => {
        setHintPending(false);
        announceRefusal('HINT UNAVAILABLE');
      });
  }, [announceRefusal, dispatch, hintPending]);

  useEffect(() => () => window.clearTimeout(refusalTimer.current), []);

  return {
    session: sessionRef.current,
    refusal,
    scrambling,
    hintPending,
    dispatch,
    newScramble,
    requestHint,
  };
}

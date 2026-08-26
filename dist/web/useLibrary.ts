// Everything the device remembers.

import { useCallback, useEffect, useState } from 'react';
import { allSolves, dailyScramble, getSetting, saveSolve, setSetting } from '../store/repo';
import { localDateKey, type StoredSolve } from '../store/records';
import { generateScramble } from '../solve/oracle';

export interface Library {
  solves: StoredSolve[];
  ready: boolean;
  /**
   * Set when the device's storage could not be opened at all -- a private window, or
   * site data blocked. Distinct from having no solves yet, and it has to be, because
   * showing "no solves yet" to someone whose history exists but cannot be read is a
   * lie the app would keep telling on every launch.
   */
  unavailable: boolean;
  record: (solve: StoredSolve) => Promise<void>;
  todaysScramble: () => Promise<{ date: string; scramble: string }>;
  readSetting: <T>(key: string) => Promise<T | undefined>;
  writeSetting: <T>(key: string, value: T) => Promise<void>;
}

export function useLibrary(): Library {
  const [solves, setSolves] = useState<StoredSolve[]>([]);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void allSolves()
      .then((rows) => {
        if (cancelled) return;
        setSolves(rows);
        setReady(true);
      })
      .catch(() => {
        // A device that will not open its database still plays; it just cannot
        // remember. Failing to a working cube beats failing to a blank screen -- but
        // the app says which of the two it is rather than pretending the history is
        // empty.
        if (cancelled) return;
        setUnavailable(true);
        setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const record = useCallback(async (solve: StoredSolve) => {
    // Optimistic: the board updates now, the write settles on its transaction.
    setSolves((prev) => [...prev, solve]);
    try {
      await saveSolve(solve);
    } catch {
      setSolves((prev) => prev.filter((s) => s.id !== solve.id));
      throw new Error('This solve could not be saved.');
    }
  }, []);

  const todaysScramble = useCallback(async () => {
    const date = localDateKey(new Date());
    const scramble = await dailyScramble(date, generateScramble);
    return { date, scramble };
  }, []);

  return {
    solves,
    ready,
    unavailable,
    record,
    todaysScramble,
    readSetting: getSetting,
    writeSetting: setSetting,
  };
}

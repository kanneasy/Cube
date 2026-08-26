// The repository. Everything the app persists goes through here.

import { getAll, getOne, put, withTransaction } from './db';
import type { StoredSolve } from './records';

export interface DailyScramble {
  /** Local calendar date, YYYY-MM-DD. */
  readonly date: string;
  readonly scramble: string;
}

export const saveSolve = (solve: StoredSolve): Promise<void> =>
  withTransaction('solves', 'readwrite', async (tx) => {
    await put(tx, 'solves', solve);
  });

export const allSolves = (): Promise<StoredSolve[]> =>
  withTransaction('solves', 'readonly', (tx) => getAll<StoredSolve>(tx, 'solves'));

/**
 * Today's scramble, generated once and kept.
 *
 * Per-device by construction: with no server there is no way for two phones to share a
 * puzzle, so this stores a scramble rather than reproducing one from a seed.
 */
export async function dailyScramble(date: string, generate: () => Promise<string>): Promise<string> {
  const existing = await withTransaction('dailyScrambles', 'readonly', (tx) =>
    getOne<DailyScramble>(tx, 'dailyScrambles', date),
  );
  if (existing) return existing.scramble;

  const scramble = await generate();
  // Generating is async and cannot happen inside the transaction, so another call could
  // have landed first. Re-read inside the write and keep whichever was stored, so every
  // attempt on a given date sees the identical scramble.
  return withTransaction('dailyScrambles', 'readwrite', async (tx) => {
    const raced = await getOne<DailyScramble>(tx, 'dailyScrambles', date);
    if (raced) return raced.scramble;
    await put(tx, 'dailyScrambles', { date, scramble } satisfies DailyScramble);
    return scramble;
  });
}

export const getSetting = <T>(key: string): Promise<T | undefined> =>
  withTransaction('settings', 'readonly', async (tx) => {
    const row = await getOne<{ key: string; value: T }>(tx, 'settings', key);
    return row?.value;
  });

export const setSetting = <T>(key: string, value: T): Promise<void> =>
  withTransaction('settings', 'readwrite', async (tx) => {
    await put(tx, 'settings', { key, value });
  });

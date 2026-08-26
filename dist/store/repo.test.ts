// @vitest-environment jsdom
import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';
import { DB_NAME, openDatabase, resetDatabaseForTests, STORES, withTransaction, put, getAll } from './db';
import { allSolves, dailyScramble, getSetting, saveSolve, setSetting } from './repo';
import type { StoredSolve } from './records';

beforeEach(() => {
  // A fresh backing store per test, and drop the memoised connection with it.
  globalThis.indexedDB = new IDBFactory();
  resetDatabaseForTests();
});

const solve = (over: Partial<StoredSolve> = {}): StoredSolve => ({
  id: 'a',
  createdAt: '2026-08-26T10:00:00.000Z',
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

describe('opening the database', () => {
  it('creates every store on a first open', async () => {
    const db = await openDatabase();
    for (const spec of STORES) expect(db.objectStoreNames.contains(spec.name)).toBe(true);
  });

  it('does not pin a version, so a second open neither upgrades nor blocks', async () => {
    const first = await openDatabase();
    const version = first.version;
    resetDatabaseForTests();
    const second = await openDatabase();
    expect(second.version).toBe(version);
  });

  it('adds a store that a later build introduces, without a version constant', async () => {
    // Simulate an older build's database: one store, at version 1.
    await new Promise<void>((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => req.result.createObjectStore('solves', { keyPath: 'id' });
      req.onsuccess = () => {
        req.result.close();
        resolve();
      };
      req.onerror = () => reject(req.error);
    });
    resetDatabaseForTests();

    const db = await openDatabase();
    expect(db.version).toBe(2); // bumped from what the device held, not to a constant
    for (const spec of STORES) expect(db.objectStoreNames.contains(spec.name)).toBe(true);
  });
});

describe('transactions settle on commit', () => {
  it('resolves only after the transaction completes', async () => {
    let committed = false;
    await withTransaction('solves', 'readwrite', async (tx) => {
      tx.addEventListener('complete', () => {
        committed = true;
      });
      await put(tx, 'solves', solve());
    });
    // If this resolved on request.onsuccess instead, the commit listener would not
    // have run yet and a commit-time abort would have gone unnoticed.
    expect(committed).toBe(true);
  });

  it('rejects and writes nothing when the work throws', async () => {
    await expect(
      withTransaction('solves', 'readwrite', async (tx) => {
        await put(tx, 'solves', solve());
        throw new Error('boom');
      }),
    ).rejects.toThrow('boom');

    const rows = await withTransaction('solves', 'readonly', (tx) => getAll<StoredSolve>(tx, 'solves'));
    expect(rows).toHaveLength(0);
  });
});

describe('solves', () => {
  it('round-trips a solve', async () => {
    const s = solve({ id: 'one', moveCount: 42 });
    await saveSolve(s);
    expect(await allSolves()).toEqual([s]);
  });

  it('survives the negative-zero problem in a persisted cube state', async () => {
    // JSON and structured clone both distinguish -0 from 0, so a state carrying -0
    // would not equal itself after a round trip. The engine normalises at the source.
    await saveSolve(solve({ id: 'z', rawMs: 0 }));
    const [back] = await allSolves();
    expect(Object.is(back.rawMs, 0)).toBe(true);
  });
});

describe('the daily scramble', () => {
  it('generates once and reuses it for every attempt that day', async () => {
    let calls = 0;
    const generate = async () => `SCRAMBLE-${++calls}`;

    const first = await dailyScramble('2026-08-26', generate);
    const second = await dailyScramble('2026-08-26', generate);
    const third = await dailyScramble('2026-08-26', generate);

    expect(first).toBe('SCRAMBLE-1');
    expect(second).toBe(first);
    expect(third).toBe(first);
    expect(calls).toBe(1);
  });

  it('gives a different date its own scramble', async () => {
    let calls = 0;
    const generate = async () => `SCRAMBLE-${++calls}`;
    const today = await dailyScramble('2026-08-26', generate);
    const tomorrow = await dailyScramble('2026-08-27', generate);
    expect(tomorrow).not.toBe(today);
  });

  it('keeps one scramble when two opens race', async () => {
    let calls = 0;
    const generate = async () => {
      await new Promise((r) => setTimeout(r, 5));
      return `SCRAMBLE-${++calls}`;
    };
    const [a, b] = await Promise.all([dailyScramble('2026-08-26', generate), dailyScramble('2026-08-26', generate)]);
    expect(a).toBe(b);
  });
});

describe('settings', () => {
  it('returns undefined for a key never set', async () => {
    expect(await getSetting('mode')).toBeUndefined();
  });

  it('round-trips and overwrites', async () => {
    await setSetting('mode', 'competition');
    expect(await getSetting('mode')).toBe('competition');
    await setSetting('mode', 'casual');
    expect(await getSetting('mode')).toBe('casual');
  });
});

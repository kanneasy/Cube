// IndexedDB, opened carefully.
//
// Solve history is meant to survive years of app updates on a device nobody can reach
// to repair, so the three failure modes below are designed against rather than
// discovered later. Each is a real, documented way to lose a user's data silently.

export interface StoreSpec {
  readonly name: string;
  readonly keyPath: string;
  readonly indexes?: readonly { name: string; keyPath: string; unique?: boolean }[];
}

export const STORES: readonly StoreSpec[] = [
  {
    name: 'solves',
    keyPath: 'id',
    indexes: [
      { name: 'byCreatedAt', keyPath: 'createdAt' },
      { name: 'byDailyDate', keyPath: 'dailyDate' },
    ],
  },
  { name: 'dailyScrambles', keyPath: 'date' },
  { name: 'patternRecords', keyPath: 'patternId' },
  { name: 'settings', keyPath: 'key' },
];

export const DB_NAME = 'quarter-turn';

function request<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function rawOpen(version?: number, upgrade?: (db: IDBDatabase) => void): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = version === undefined ? indexedDB.open(DB_NAME) : indexedDB.open(DB_NAME, version);
    req.onupgradeneeded = () => upgrade?.(req.result);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    // Without this, a blocked open leaves a promise that never settles and the user
    // sits on a splash screen forever with nothing in the console.
    req.onblocked = () => reject(new Error('The database is open in another tab. Close it and reload.'));
  });
}

function createMissing(db: IDBDatabase): void {
  for (const spec of STORES) {
    if (db.objectStoreNames.contains(spec.name)) continue;
    const store = db.createObjectStore(spec.name, { keyPath: spec.keyPath });
    for (const index of spec.indexes ?? []) {
      store.createIndex(index.name, index.keyPath, { unique: index.unique ?? false });
    }
  }
}

let cached: Promise<IDBDatabase> | null = null;

/**
 * Open with NO version, and bump from whatever the device actually holds.
 *
 * Pinning a constant version is the trap. Open at a LOWER version than the device has
 * and it is a permanent VersionError: reads fall back to empty, writes throw, and the
 * app looks fine, so it reads as a phantom bug. Open at a HIGHER one and every launch
 * is a version change that blocks until every other context closes its connection.
 * Bumping from `db.version + 1` means no later revert can walk the number backward.
 */
export function openDatabase(): Promise<IDBDatabase> {
  if (cached) return cached;
  cached = (async () => {
    const db = await rawOpen();
    const missing = STORES.filter((s) => !db.objectStoreNames.contains(s.name));
    if (missing.length === 0) {
      db.onversionchange = () => db.close();
      return db;
    }
    const next = db.version + 1;
    db.close();
    const upgraded = await rawOpen(next, createMissing);
    upgraded.onversionchange = () => upgraded.close();
    return upgraded;
  })();
  cached.catch(() => {
    cached = null;
  });
  return cached;
}

/** Test seam. Drops the memoised connection so a fresh open happens next time. */
export function resetDatabaseForTests(): void {
  cached = null;
}

/**
 * Run work in a transaction and settle on COMMIT, not on the request succeeding.
 *
 * `request.onsuccess` fires first, before the transaction commits. Resolving there
 * reports a write that a commit-time abort — quota, eviction, storage pressure — then
 * silently discards. The error is captured off the request because `tx.error` is still
 * null while `tx.onerror` runs, so reading it there replaces a real QuotaExceededError
 * with a generic one.
 */
export async function withTransaction<T>(
  storeNames: string | string[],
  mode: IDBTransactionMode,
  work: (tx: IDBTransaction) => Promise<T> | T,
): Promise<T> {
  const db = await openDatabase();
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction(storeNames, mode);
    let result: T;
    let failure: unknown = null;

    tx.oncomplete = () => (failure ? reject(failure) : resolve(result));
    tx.onabort = () => reject(failure ?? tx.error ?? new Error('Transaction aborted'));
    tx.onerror = () => reject(failure ?? tx.error ?? new Error('Transaction failed'));

    (async () => {
      try {
        result = await work(tx);
      } catch (err) {
        failure = err;
        try {
          tx.abort();
        } catch {
          // Already finished; onabort or oncomplete will settle it.
        }
      }
    })();
  });
}

export const put = <T>(tx: IDBTransaction, store: string, value: T): Promise<IDBValidKey> =>
  request(tx.objectStore(store).put(value as unknown as never));

export const getAll = <T>(tx: IDBTransaction, store: string): Promise<T[]> =>
  request(tx.objectStore(store).getAll() as IDBRequest<T[]>);

export const getOne = <T>(tx: IDBTransaction, store: string, key: IDBValidKey): Promise<T | undefined> =>
  request(tx.objectStore(store).get(key) as IDBRequest<T | undefined>);

export const deleteOne = (tx: IDBTransaction, store: string, key: IDBValidKey): Promise<undefined> =>
  request(tx.objectStore(store).delete(key));

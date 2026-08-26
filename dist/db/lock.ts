import { readFileSync, statSync, unlinkSync, utimesSync, writeFileSync, writeSync } from 'node:fs';
import path from 'node:path';

// PGlite is a single-process embedded Postgres: two processes that open the SAME
// data directory silently diverge (a seed writes state the running dev server's
// own in-memory copy never re-reads) or corrupt the directory outright. This is a
// mutual-exclusion lock over one data dir: the dev server and every script that
// opens PGlite take it, so whoever asks second is refused with an error naming
// the holder instead of quietly clobbering it.
//
// A holder that dies without releasing must not wedge the project, so a lock goes
// stale on its own: the holder touches the file while it runs, and a lock whose
// pid is gone, or that nobody has touched in STALE_MS, is cleared by the next
// process to want it. The heartbeat is what makes this safe against pid reuse; a
// live pid alone proves nothing, since the OS recycles pids freely.

const HEARTBEAT_MS = 5_000;
const STALE_MS = 20_000; // three missed beats
const OVERRIDE_ENV = 'PGLITE_FORCE_UNLOCK';

export type LockRole = 'dev' | 'script';

type Holder = { pid: number; role: LockRole; startedAt: number };

// Thrown rather than exiting the process: this module is imported as a side
// effect of dist/db/index.ts, so killing the process here would take out every
// transitive importer with no chance to report context. Entry points catch it
// (see failFastOnDevLock) and decide how to exit.
export class DevLockError extends Error {
  readonly code = 'pglite_dir_locked';
  constructor(message: string) {
    super(message);
    this.name = 'DevLockError';
  }
}

function lockPath(dir: string): string {
  return path.join(dir, '.dev-lock');
}

function toHolder(pid: unknown, role: LockRole, startedAt: unknown): Holder | null {
  const n = Number(pid);
  // Rejects '' (which Number() turns into 0) and any negative value: process.kill
  // treats pid 0 as "my whole process group" and negatives as other groups, so
  // signalling either would always succeed and report a phantom holder forever.
  if (!Number.isInteger(n) || n <= 0) return null;
  return { pid: n, role, startedAt: Number(startedAt) || 0 };
}

function parseHolder(raw: string): Holder | null {
  const text = raw.trim();
  if (!text) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return null; // garbage in the lock file, so treat it as no holder
  }
  // The first version of this file wrote a bare pid; still honour those.
  if (typeof parsed === 'number') return toHolder(parsed, 'dev', 0);
  if (typeof parsed !== 'object' || parsed === null) return null;
  const { pid, role, startedAt } = parsed as Record<string, unknown>;
  return toHolder(pid, role === 'dev' ? 'dev' : 'script', startedAt);
}

function isAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (err) {
    // EPERM means the process exists but belongs to another user (a sudo'd or
    // launchd-started dev server). That is ALIVE; only ESRCH means dead.
    return (err as NodeJS.ErrnoException).code === 'EPERM';
  }
}

// The holder of `file` if one is actually running, else null (no lock, garbage
// lock, dead pid, or a lock nobody has touched in STALE_MS).
function liveHolder(file: string): Holder | null {
  let holder: Holder | null;
  let mtimeMs: number;
  try {
    holder = parseHolder(readFileSync(file, 'utf-8'));
    mtimeMs = statSync(file).mtimeMs;
  } catch {
    return null; // vanished under us
  }
  if (!holder || !isAlive(holder.pid)) return null;
  if (Date.now() - mtimeMs > STALE_MS) return null;
  return holder;
}

function describe(dir: string, file: string, holder: Holder): string {
  const [who, fix] =
    holder.role === 'dev'
      ? [`the running dev server (pid ${holder.pid})`, 'Stop `npm run dev` first, then re-run this command.']
      : [`another database script (pid ${holder.pid})`, 'Wait for it to finish, then re-run this command.'];
  return [
    `PGlite data dir "${dir}" is held by ${who}.`,
    fix,
    `Lock file: ${file}. If you are certain nothing else is using the database, delete it or re-run with ${OVERRIDE_ENV}=1.`,
  ].join('\n');
}

function touch(file: string): void {
  try {
    const now = new Date();
    utimesSync(file, now, now);
  } catch {
    // lock is gone, so nothing is left to keep alive
  }
}

// Take the lock for this process, or throw DevLockError naming who holds it.
// Exported separately from acquireLock so it can be exercised without installing
// process-wide exit handlers.
export function claimLock(dir: string, role: LockRole): void {
  const file = lockPath(dir);
  const payload = JSON.stringify({ pid: process.pid, role, startedAt: Date.now() });

  if (process.env[OVERRIDE_ENV] === '1') {
    writeSync(2, `${OVERRIDE_ENV}=1: clearing any existing lock on "${dir}".\n`);
    try {
      unlinkSync(file);
    } catch {
      // nothing to clear
    }
  }

  // Two passes: create exclusively, and if something is already there, either
  // refuse (live holder) or clear it and try once more (stale holder).
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      writeFileSync(file, payload, { encoding: 'utf-8', flag: 'wx' });
      return;
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'EEXIST') throw err;
      const holder = liveHolder(file);
      if (holder) throw new DevLockError(describe(dir, file, holder));
      try {
        unlinkSync(file);
      } catch {
        // another process cleared the same stale lock first
      }
    }
  }
  throw new DevLockError(
    `Could not claim the PGlite lock at ${file}: another process is contending for "${dir}". Re-run this command.`,
  );
}

// Release the lock only if it is still ours: a lock rewritten by someone else
// means we already lost it (or were replaced as stale), and deleting theirs would
// hand the data dir to a third process.
export function releaseLock(dir: string): void {
  const file = lockPath(dir);
  try {
    if (parseHolder(readFileSync(file, 'utf-8'))?.pid === process.pid) unlinkSync(file);
  } catch {
    // already gone
  }
}

// claimLock + keep it fresh + release it on the way out. Called by makeDb() for
// every process that opens PGlite, dev server and scripts alike.
export function acquireLock(dir: string, role: LockRole): void {
  claimLock(dir, role);

  const file = lockPath(dir);
  const beat = setInterval(() => touch(file), HEARTBEAT_MS);
  beat.unref(); // never keeps a short-lived script alive

  const release = () => {
    clearInterval(beat);
    releaseLock(dir);
  };
  process.once('exit', release);
  for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP'] as const) {
    process.once(signal, () => {
      release();
      // Re-raise with the default disposition rather than process.exit(): an
      // immediate exit skips the HTTP server's and PGlite's own shutdown, and
      // reports success for a process that was in fact terminated. `once` has
      // already removed this listener, so the signal now hits the default.
      process.kill(process.pid, signal);
    });
  }
}

// For entry points (scripts, the dev server): print a refused lock as one plain
// line and stop, but let anything else propagate with its stack. writeSync, not
// console.error, since stderr writes are asynchronous when stderr is a pipe on
// macOS, so a buffered write can be lost to the process.exit below.
export function failFastOnDevLock(err: unknown): never {
  if (err instanceof DevLockError) {
    writeSync(2, `${err.message}\n`);
    process.exit(1);
  }
  throw err;
}

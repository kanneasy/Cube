import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, utimesSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { claimLock, DevLockError, releaseLock } from './lock';

// Unit tests for the PGlite mutual-exclusion lock. No PGlite here: these drive
// the lock file directly, which is where every interesting case lives (a dead
// holder, a recycled pid, a truncated file, a lock that is not ours).

let dir: string;
let lockFile: string;

const readLock = () => JSON.parse(readFileSync(lockFile, 'utf-8'));
const writeLock = (holder: unknown) => writeFileSync(lockFile, JSON.stringify(holder), 'utf-8');
const backdate = (ms: number) => {
  const when = new Date(Date.now() - ms);
  utimesSync(lockFile, when, when);
};

// A pid that is certainly gone: run a trivial process to completion and reuse its
// pid. Nothing else can have claimed it in the microseconds since it exited.
const deadPid = (): number => spawnSync(process.execPath, ['-e', '']).pid as number;

beforeEach(() => {
  dir = mkdtempSync(path.join(os.tmpdir(), 'lock-test-'));
  lockFile = path.join(dir, '.dev-lock');
  delete process.env.PGLITE_FORCE_UNLOCK;
});

afterEach(() => {
  delete process.env.PGLITE_FORCE_UNLOCK;
  rmSync(dir, { recursive: true, force: true });
});

describe('claimLock', () => {
  it('claims a free data dir and records this process', () => {
    claimLock(dir, 'dev');
    expect(readLock()).toMatchObject({ pid: process.pid, role: 'dev' });
  });

  it('refuses a dir held by a live dev server, naming the fix and the lock file', () => {
    writeLock({ pid: process.pid, role: 'dev', startedAt: Date.now() });

    try {
      claimLock(dir, 'script');
      expect.unreachable('should have refused');
    } catch (err) {
      expect(err).toBeInstanceOf(DevLockError);
      const { message } = err as DevLockError;
      expect(message).toContain('the running dev server');
      expect(message).toContain('npm run dev');
      expect(message).toContain(lockFile);
    }
  });

  it('refuses a dir held by another live script', () => {
    writeLock({ pid: process.pid, role: 'script', startedAt: Date.now() });
    expect(() => claimLock(dir, 'dev')).toThrow(/another database script/);
  });

  it('refuses a legacy bare-pid lock whose holder is still alive', () => {
    writeFileSync(lockFile, String(process.pid), 'utf-8');
    expect(() => claimLock(dir, 'script')).toThrow(DevLockError);
  });

  it('takes over a lock whose holder is gone', () => {
    writeLock({ pid: deadPid(), role: 'dev', startedAt: Date.now() });
    claimLock(dir, 'script');
    expect(readLock()).toMatchObject({ pid: process.pid, role: 'script' });
  });

  // The pid alone proves nothing: the OS recycles pids, so a lock left behind by
  // a killed dev server can point at an unrelated live process indefinitely.
  it('takes over a live-pid lock that has not been touched recently', () => {
    writeLock({ pid: process.pid, role: 'dev', startedAt: Date.now() });
    backdate(60_000);
    claimLock(dir, 'script');
    expect(readLock()).toMatchObject({ pid: process.pid, role: 'script' });
  });

  // Number('') is 0, and process.kill(0, 0) signals the caller's own process
  // group, so an empty lock file must never read as a live holder.
  it('takes over an empty lock file instead of blaming pid 0', () => {
    writeFileSync(lockFile, '', 'utf-8');
    claimLock(dir, 'script');
    expect(readLock().pid).toBe(process.pid);
  });

  it('takes over a whitespace-only lock file', () => {
    writeFileSync(lockFile, '   \n', 'utf-8');
    claimLock(dir, 'script');
    expect(readLock().pid).toBe(process.pid);
  });

  it('takes over an unparseable lock file', () => {
    writeFileSync(lockFile, 'not json at all', 'utf-8');
    claimLock(dir, 'script');
    expect(readLock().pid).toBe(process.pid);
  });

  it('takes over a lock recording a nonsense pid', () => {
    writeLock({ pid: -1, role: 'dev', startedAt: Date.now() });
    claimLock(dir, 'script');
    expect(readLock().pid).toBe(process.pid);
  });

  it('breaks a live lock when PGLITE_FORCE_UNLOCK is set', () => {
    writeLock({ pid: process.pid, role: 'dev', startedAt: Date.now() });
    process.env.PGLITE_FORCE_UNLOCK = '1';
    claimLock(dir, 'script');
    expect(readLock()).toMatchObject({ pid: process.pid, role: 'script' });
  });
});

describe('releaseLock', () => {
  it('removes our own lock', () => {
    claimLock(dir, 'script');
    releaseLock(dir);
    expect(existsSync(lockFile)).toBe(false);
  });

  it('leaves a lock belonging to another process alone', () => {
    const other = deadPid();
    writeLock({ pid: other, role: 'dev', startedAt: Date.now() });
    releaseLock(dir);
    expect(existsSync(lockFile)).toBe(true);
    expect(readLock().pid).toBe(other);
  });

  it('is a no-op when there is no lock', () => {
    expect(() => releaseLock(dir)).not.toThrow();
  });
});

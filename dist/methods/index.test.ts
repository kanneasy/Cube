import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { methods } from './index';
import { setupDb, resetDb } from '../test/db';

// Example method tests — DB-backed, no mocks. They run against a real (throwaway)
// PGlite instance via the harness. Copy this shape for EVERY new method: cover the
// happy path and at least one edge/error case. A method without a test is untested.

beforeAll(setupDb); // migrate once per process
beforeEach(resetDb); // truncate between tests

describe('addNote / listNotes', () => {
  it('adds a note and reads it back', async () => {
    const created = await methods.addNote({ text: 'hello' });
    expect(created.id).toBeGreaterThan(0);
    expect(created.text).toBe('hello');

    const all = await methods.listNotes();
    expect(all.map((n) => n.text)).toEqual(['hello']);
  });

  it('returns notes newest-first', async () => {
    await methods.addNote({ text: 'first' });
    await methods.addNote({ text: 'second' });
    const all = await methods.listNotes();
    expect(all.map((n) => n.text)).toEqual(['second', 'first']);
  });
});

import type { Methods } from '../shared/api';
import { db } from '../db/index';
import { notes } from '../schema/index';
import { desc } from 'drizzle-orm';

// Methods are plain typed functions. They are interface-agnostic: the web app,
// a scheduled routine, or a CLI can all call them. The Hono app exposes each one
// as POST /api/<name>. DB calls are async (Postgres dialect) — always await them.
export const methods: Methods = {
  async listNotes() {
    return await db.select().from(notes).orderBy(desc(notes.id));
  },

  async addNote({ text }) {
    const createdAt = new Date().toISOString();
    const [row] = await db.insert(notes).values({ text, createdAt }).returning();
    return row;
  },
};

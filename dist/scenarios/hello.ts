import { db } from '../db/index';
import { notes } from '../schema/index';

// A scenario seeds the local DB with realistic data so the app feels alive and
// so the agent can verify its work. Every app ships scenarios (realistic + empty,
// plus one per role when there are roles). DB calls are async — always await them.
export async function run() {
  await db.delete(notes);
  const seed = [
    'Welcome to your new Builder app.',
    'This note was seeded by the "hello" scenario.',
    'Replace all of this when you build the real app.',
  ];
  for (const text of seed) {
    await db.insert(notes).values({ text, createdAt: new Date().toISOString() });
  }
  return { seeded: seed.length };
}

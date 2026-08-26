import { sql } from 'drizzle-orm';
import { db, migrateDb } from '../db/index';

// DB harness for the method/integration tests. The active db is PGlite, pointed at
// a throwaway temp dir by vitest.config.ts (PGLITE_DIR) with DATABASE_URL forced
// empty. Migrations run once per process; rows are truncated between tests so each
// test starts clean. No production code changes — this rides the existing seams.

let migrated = false;

export async function setupDb(): Promise<void> {
  if (migrated) return;
  await migrateDb();
  migrated = true;
}

// Truncate every table so each test starts from a clean DB. List your tables here
// as the schema grows (matches dist/schema/index.ts).
export async function resetDb(): Promise<void> {
  await db.execute(sql`TRUNCATE notes RESTART IDENTITY CASCADE`);
}

export { db };

import { mkdirSync } from 'node:fs';
import postgres from 'postgres';
import { drizzle as drizzlePostgres, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { PGlite } from '@electric-sql/pglite';
import { drizzle as drizzlePglite, type PgliteDatabase } from 'drizzle-orm/pglite';
import * as schema from '../schema/index';
import { acquireLock } from './lock';

// The data adapter seam. One Postgres dialect everywhere:
//   - Local dev: PGlite, an embedded Postgres in a folder under data/pg. Free, no
//     server, no Docker — the same SQL as production.
//   - Production: Supabase Postgres via postgres-js when DATABASE_URL is set. Use
//     Supabase's connection-pooling (Transaction) string for serverless;
//     prepare:false keeps it compatible with the pooler.
// Fully static, synchronous init (no top-level await) so the data layer is ready
// at module load and the production serverless function bundles cleanly. Both
// drivers construct synchronously and connect lazily.

const DATABASE_URL = process.env.DATABASE_URL;

export const dialect: 'postgres' | 'pglite' = DATABASE_URL ? 'postgres' : 'pglite';

type Db = PostgresJsDatabase<typeof schema> | PgliteDatabase<typeof schema>;

function makeDb(): Db {
  if (DATABASE_URL) {
    return drizzlePostgres(postgres(DATABASE_URL, { prepare: false }), { schema });
  }
  const dir = process.env.PGLITE_DIR ?? 'data/pg';
  mkdirSync(dir, { recursive: true });
  // Single-process guard (see ./lock). PGlite allows exactly one process per data
  // dir, so every process that opens one takes the lock: the dev server, a second
  // dev server, and each migrate/scenario/method/query script alike. Whoever asks
  // second is refused here rather than silently writing into state the other
  // process will never re-read. Throws DevLockError; entry points report it.
  acquireLock(dir, process.env.DEV_SERVER === '1' ? 'dev' : 'script');
  return drizzlePglite(new PGlite(dir), { schema });
}

export const db: Db = makeDb();
export { schema };

// Apply the generated Drizzle migrations (dist/drizzle) to the active driver.
// Run `npm run db:generate` after a schema change, then `npm run migrate`.
export async function migrateDb(): Promise<void> {
  const migrationsFolder = 'dist/drizzle';
  if (DATABASE_URL) {
    const { migrate } = await import('drizzle-orm/postgres-js/migrator');
    await migrate(db as PostgresJsDatabase<typeof schema>, { migrationsFolder });
  } else {
    const { migrate } = await import('drizzle-orm/pglite/migrator');
    await migrate(db as PgliteDatabase<typeof schema>, { migrationsFolder });
  }
}

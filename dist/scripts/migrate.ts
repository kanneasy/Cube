import { failFastOnDevLock } from '../db/lock';

// Applies the generated Drizzle migrations (dist/drizzle) to the active database:
// PGlite locally, Supabase Postgres when DATABASE_URL is set. Run `npm run
// db:generate` after a schema change to regenerate the migration SQL.
// The db module is imported dynamically so a refused PGlite lock (the dev server
// is still holding the data dir) surfaces here as one readable line rather than
// an uncaught failure inside a static import.
try {
  const { migrateDb, dialect } = await import('../db/index');
  await migrateDb();
  console.log(`migrated (${dialect})`);
} catch (err) {
  failFastOnDevLock(err);
}
process.exit(0);

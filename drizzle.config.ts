import { defineConfig } from 'drizzle-kit';

// Generates Postgres migrations from the Drizzle schema into dist/drizzle.
// `npm run db:generate` after a schema change; `npm run migrate` applies them to
// the active database (PGlite locally, Supabase Postgres when DATABASE_URL is set).
export default defineConfig({
  schema: './dist/schema/index.ts',
  out: './dist/drizzle',
  dialect: 'postgresql',
});

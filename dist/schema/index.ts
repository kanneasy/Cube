import { pgTable, serial, text } from 'drizzle-orm/pg-core';

// The typed schema is the single source of truth for the data model. Postgres
// dialect: it runs on PGlite locally and Supabase Postgres in production — same
// SQL either way, so there is no dialect conversion when the app goes live.
export const notes = pgTable('notes', {
  id: serial('id').primaryKey(),
  text: text('text').notNull(),
  createdAt: text('created_at').notNull(),
});

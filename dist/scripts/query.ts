import { writeSync } from 'node:fs';
import { sql } from 'drizzle-orm';
import { failFastOnDevLock } from '../db/lock';

// Query the active DB for verification (PGlite locally, Supabase Postgres when
// DATABASE_URL is set). Usage: npm run db '<sql>'
const query = process.argv[2];
if (!query) {
  writeSync(2, "usage: npm run db '<sql>'\n");
  process.exit(1);
}

try {
  const { db } = await import('../db/index');
  const out = (await (db as { execute: (q: unknown) => Promise<unknown> }).execute(sql.raw(query))) as {
    rows?: unknown;
  };
  // writeSync, not console.log: this script's stdout is parsed by tooling
  // (bin/dashboard.mjs), so it is a pipe, and pipe writes are asynchronous on
  // macOS, which lets the process.exit below truncate a buffered write.
  writeSync(1, `${JSON.stringify(out.rows ?? out, null, 2)}\n`);
} catch (err) {
  failFastOnDevLock(err);
}
process.exit(0);

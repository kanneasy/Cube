import { failFastOnDevLock } from '../db/lock';

// Local dev entry only (run by `tsx watch dist/server/index.ts`). A dedicated API
// port (not the generic PORT, which preview/host tooling sets to the web port —
// that would collide with Vite). When the app is ported to production, the Vercel
// function imports ./app directly, so serve() never enters the serverless bundle.

// Tag this process as the dev server BEFORE ./app is imported, since that import
// opens the DB and the PGlite lock keys off DEV_SERVER. Claiming the tag here
// rather than only in package.json's `dev:api` script means a launcher that
// bypasses npm (a debugger, a wrapper, a bare `tsx dist/server/index.ts`) still
// identifies itself as the dev server instead of taking a script's lock.
process.env.DEV_SERVER ??= '1';

try {
  const { serve } = await import('@hono/node-server');
  const { app } = await import('./app');
  const port = Number(process.env.API_PORT ?? 8787);
  serve({ fetch: app.fetch, port }, (info) => console.log(`API listening on :${info.port}`));
} catch (err) {
  failFastOnDevLock(err);
}

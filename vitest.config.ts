import os from 'node:os';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// One config, two environments. Node is the default (pure logic, DB-backed method
// tests); web component tests opt into jsdom with a `// @vitest-environment jsdom`
// docblock at the top of the file. Everything runs in a single fork (serial) so
// the DB-backed tests share one migrated PGlite instance without races.

// A throwaway PGlite directory for this run, outside the repo. DATABASE_URL is
// forced empty so the data adapter always takes the PGlite branch (see dist/db).
const PGLITE_DIR = path.join(os.tmpdir(), `vitest-pg-${process.pid}-${Date.now()}`);

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['dist/test/setup.ts'],
    include: ['dist/**/*.test.{ts,tsx}'],
    // Source lives in dist/, so override Vitest's default exclude (which drops all
    // of dist/). Only the real build output is excluded.
    exclude: ['**/node_modules/**', 'dist/web/dist/**', '**/.{idea,git,cache,output,temp}/**'],
    env: { DATABASE_URL: '', PGLITE_DIR },
    // Serial, single process: DB tests share one migrated PGlite; isolation is by
    // truncating between tests (see dist/test/db.ts). `isolate: false` is load-bearing
    // beside `singleFork` — singleFork only serializes at the PROCESS level, while
    // Vitest's separate `isolate` option (default true) still resets the module registry
    // between test FILES inside that one process. Without it, dist/db re-opens PGlite per
    // file and the self-guarding lock correctly refuses the second open. A scaffold with
    // one test file passes clean either way; it breaks on the second DB-backed file.
    pool: 'forks',
    poolOptions: { forks: { singleFork: true, isolate: false } },
    coverage: {
      provider: 'v8',
      include: ['dist/**/*.{ts,tsx}'],
      exclude: [
        'dist/web/dist/**',
        'dist/drizzle/**',
        'dist/scripts/**',
        'dist/scenarios/**',
        'dist/test/**',
        'dist/web/main.tsx',
        'dist/web/vite-env.d.ts',
        '**/*.test.{ts,tsx}',
        // Deployment glue / type-only modules with no testable runtime:
        'dist/server/index.ts', // local dev serve() entry
        'dist/shared/api.ts', // types only
      ],
      reporter: ['text', 'html'],
      // Coverage is REPORTED, not gated, in a young app — the build gate is the
      // `npm test` pass/fail, so a fresh scaffold is never blocked by a percentage.
      // Ratchet these up as the app matures (reference values from a mature app
      // shown below); pin the crown-jewel modules (renderers, auth/methods) highest.
      //   thresholds: {
      //     lines: 90,
      //     statements: 90,
      //     functions: 73, // inline React handlers run lower than lines by design
      //     branches: 80,
      //     'dist/methods/index.ts': { lines: 98, functions: 100, branches: 85 },
      //   },
    },
  },
});

import { failFastOnDevLock } from '../db/lock';

// Reset + seed the local DB with a named scenario. Usage: npm run scenario <name>
// The scenarios module is imported dynamically because it opens the DB: a refused
// PGlite lock (the dev server still holds the data dir) then arrives here as one
// readable line instead of an uncaught failure inside a static import.
const name = process.argv[2] ?? 'hello';

try {
  const { scenarios } = await import('../scenarios/index');
  const fn = scenarios[name as keyof typeof scenarios];
  if (!fn) {
    console.error(`unknown scenario: ${name}. available: ${Object.keys(scenarios).join(', ')}`);
    process.exit(1);
  }
  const result = await fn();
  console.log(`scenario "${name}":`, result);
} catch (err) {
  failFastOnDevLock(err);
}
process.exit(0);

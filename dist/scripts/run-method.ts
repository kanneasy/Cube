import { failFastOnDevLock } from '../db/lock';

// Invoke a backend method directly for verification. Usage: npm run method <name> '<json>'
// The methods module is imported dynamically because it opens the DB: a refused
// PGlite lock (the dev server still holds the data dir) then arrives here as one
// readable line instead of an uncaught failure inside a static import.
const name = process.argv[2];
const input = process.argv[3] ? JSON.parse(process.argv[3]) : {};

try {
  const { methods } = await import('../methods/index');
  if (!name || !(name in methods)) {
    console.error(`usage: npm run method <name> '<json>'   (methods: ${Object.keys(methods).join(', ')})`);
    process.exit(1);
  }
  const result = await (methods as unknown as Record<string, (i: unknown) => Promise<unknown>>)[name](input);
  console.log(JSON.stringify(result, null, 2));
} catch (err) {
  failFastOnDevLock(err);
}
process.exit(0);

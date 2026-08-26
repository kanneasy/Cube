// Load the project's .env into process.env. Imported first thing by the server and any
// script that needs a key. Safe no-op when there's no .env. Without this, keys in .env
// are invisible to the running app.
//
// Deliberately NOT process.loadEnvFile(): that only sets a variable it does not already
// find in process.env, so whatever launched the app (a preview/dev supervisor, an IDE
// integration, a shell that once exported a key) silently outranks this project's own
// .env for the entire life of that process. The call succeeds, nothing warns, and the
// stale value wins — the symptom is a 401 that reproduces only from the running dev
// server and never from a CLI script in a clean shell. util.parseEnv is the same parser
// (comments, quotes, `export` prefixes) shipped in the same Node release as
// loadEnvFile(); assigning its result ourselves is what makes the project's file win.
import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';

try {
  Object.assign(process.env, parseEnv(readFileSync('.env', 'utf8')));
} catch {
  // no .env present — the app runs without keys
}

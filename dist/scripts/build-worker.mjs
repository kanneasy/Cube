#!/usr/bin/env node
// Build cubing.js's scramble worker, and tell the service worker about it.
//
// Runs AFTER `vite build`, deliberately, rather than as a Vite plugin: vite-plugin-pwa
// writes sw.js in its own closeBundle, so a plugin that stamps sw.js races it and loses.
//
// Two things happen here, and the app is broken in production without either.
//
// 1. cubing spawns its solver in a module Web Worker. Vite does not recognise how cubing
//    constructs that Worker URL, so it bundles the worker entry as an ordinary chunk --
//    which then shares the app's entry chunk. At runtime the worker imports that chunk,
//    pulls in React and three.js, and dies on `document is not defined` before it runs,
//    so the app cannot produce a scramble at all. cubing's own prebuilt copy is no help
//    either: it imports bare npm specifiers a browser cannot resolve. So the worker is
//    bundled here, self-contained, at exactly the URL cubing asks for.
//
//    None of this is visible in dev, which serves modules unbundled. It appears only in
//    a production build, which is why it has to be checked in one.
//
// 2. vite-plugin-pwa writes `revision: null` for every precached asset, because Vite
//    normally puts a content hash in the filename and a hashed name IS the revision.
//    This file is deliberately unhashed -- it must be, because cubing asks for it by
//    that exact name -- so without a revision the service worker treats it as immutable
//    and would serve a stale solver forever after the next deploy.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = new URL('../../', import.meta.url);
const entry = fileURLToPath(new URL('node_modules/cubing/dist/lib/cubing/chunks/search-worker-entry.js', root));
const outfile = fileURLToPath(new URL('build/assets/search-worker-entry.js', root));
const swPath = fileURLToPath(new URL('build/sw.js', root));

if (!existsSync(entry)) {
  console.error(`build-worker: cubing worker entry missing at ${entry}`);
  process.exit(1);
}

await build({
  entryPoints: [entry],
  outfile,
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  minify: true,
  external: [],
  loader: { '.wasm': 'binary' },
  allowOverwrite: true,
});

const revision = createHash('md5').update(readFileSync(outfile)).digest('hex');
const sw = readFileSync(swPath, 'utf8');
const needle = '{url:"assets/search-worker-entry.js",revision:null}';
if (!sw.includes(needle)) {
  console.error('build-worker: could not find the worker entry in sw.js to stamp a revision.');
  console.error('  The precache manifest shape changed. Without a revision the service worker');
  console.error('  will serve a stale solver after the next deploy. Failing rather than shipping that.');
  process.exit(1);
}
writeFileSync(swPath, sw.replace(needle, `{url:"assets/search-worker-entry.js",revision:"${revision}"}`));

const kb = Math.round(readFileSync(outfile).length / 1024);
console.log(`build-worker: scramble worker bundled (${kb} KB), sw.js revision ${revision.slice(0, 8)}`);

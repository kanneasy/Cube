# Quarter Turn

This is a Builder project, worked on from inside this directory (your cwd is this
project's root). The reusable kit — orchestrator, specialists, design library,
pitfalls KB, skills — lives at `~/builder/` and loads here as the `builder@builder`
project-scope plugin, declared in the tracked `.claude/settings.json`. It loads the
same way in a worktree of this project, which is the point: a worktree receives only
tracked files, so anything the kit needs has to be tracked or come from the plugin.

## Focus guard
- **This project only.** Do not read, search, or modify sibling projects under `../`.
- **cwd is the project root.** Specs in `src/`, code in `dist/`, knowledge/runs in
  `wiki/`. Kit tools are at `~/builder/bin/` (pass `.` as the project).
- **Spec first.** `src/` is the source of truth; change the spec before `dist/`.
- Significant decisions and each specialist run are recorded in `wiki/`.

## Shipping

The contract `ship-it` reads. This app has no server, so most of that skill's
machinery has nothing to act on.

### Preflight

`npm run build` is the whole gate: it runs the Vitest suite, then `tsc --noEmit`, then
the Vite build. A red test or a type error blocks the build, which blocks the deploy.

Two checks the build does not do:

- **`node ~/builder/bin/detect.mjs http://localhost:<port>`** against the running dev
  server. It is clean today and it should stay clean.
- **The icon set.** `dist/web/public/icons/` is committed and derived, not generated at
  build time. If a new master is generated, run
  `node dist/scripts/normalize-icon.mjs dist/assets-source/<master>.png` — the raw
  provider output is never shipped directly, because it comes back with real alpha and
  off-centre framing (see `dist/assets-source/README.md`).

### The icon ships before anyone installs

iOS copies the home-screen icon into SpringBoard once, at Add to Home Screen, and never
re-reads it. A corrected icon shipped later changes nothing for anyone already
installed; the only fix is deleting and re-adding the app. Treat any icon change as
something that must land before the first real install, not after.

The browser-tab icon (`favicon.svg`) is different — it is read live on every load.
Establish which of the two a stale-icon report is about before treating it as a bug.

### Deploying

Static hosting, no database, no serverless function, no environment variables. The
build output is `build/`. Any static host works; the free tier is sufficient and there
is no recurring cost.

Do not add `_headers`/`_redirects` caching rules for `sw.js` without checking
`~/builder/.claude/knowledge/pitfalls/ship.md` first — a cached service worker is how a
PWA gets stuck on an old build.

### Verifying it landed

Not with a fetch. An installed service worker can serve a stale response for `/` itself,
and an SPA rewrite serves `index.html` for any path not on disk — either one returns a
real 200 carrying the wrong content. Check the host's own deployment record instead.

The only complete check is a real iPhone: add to the home screen, confirm it opens
full-screen with no browser chrome, and confirm a drag turns a layer without Safari's
edge-swipe intercepting it.

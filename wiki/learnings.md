# Learnings — Quarter Turn

Durable, non-obvious lessons from building and iterating on this app — decisions and their *why*, hard-won fixes and their root cause, conventions discovered, dead ends not to revisit. The `knowledge-curator` writes here after a build session; `familiarize` and future work read it back so the project gets smarter over time instead of relearning the same things.

Keep it sharp: one true, reusable lesson per entry. Prune what's stale. Don't duplicate the spec (`src/`), the code (`dist/`), or git history — capture what those don't.

## No backend convention here — an approved deviation, don't relitigate it by default

Quarter Turn is a static PWA with IndexedDB, not the kit's Hono/Drizzle/Postgres
convention. `architecture`'s intake scope call
(`wiki/runs/2026-08-26T15-20-50-builder:architecture.md`) ruled this in plainly:
single player, one device, no login, and both the scrambling and the solving already
run client-side, so a server would add a network hop to every solve write and buy
nothing. Recorded as a "Key decision" in `.builder-plan.md`. If a future roadmap item
wants cross-device sync or a shared daily scramble/leaderboard, that is exactly the
fork this decision named and deferred, not evidence the original call was wrong —
redo the same cost/benefit before reaching for a server; don't assume either the old
ruling or a default "add the convention" instinct still applies without checking.

## The `ui/` design-system primitives are scaffolded but genuinely unused

`dist/web/ui/` (Button, Card, Dialog, Toast, etc., themed by generated `tokens.css`)
exists because `bin/new-app` scaffolds it into every project, but nothing in
`App.tsx` or the solve chrome imports from it — every reference to `ui/` in this repo
is inside `ui/` itself or its own `gallery.tsx`. This app's entire interface is
bespoke game chrome (timer, notation strip, sheets) built directly against
`@brand/tokens.json` values, because `design-expert`'s spec here (exact motion
timings, exact hex values, the achromatic-chrome decision) doesn't map onto generic
form-and-list primitives. Don't treat the empty `ui/` usage as a gap to fill in on
this app — it's a scaffold that was correctly never needed, not an oversight.

## Use `window.__quarterTurn` for automated verification, not synthetic PointerEvents

A dev-only handle (`import.meta.env.DEV`-gated) exposes `play(alg)`, `solve()`,
`session()`, and `solves()` on `window.__quarterTurn` — it dispatches through the real
reducer, bypassing only the gesture/WebGL layer. Reach for it on any future QA or
smoke pass instead of trying to synthesize `PointerEvent`s against the canvas: the
renderer's `requestAnimationFrame` loop doesn't run in a backgrounded preview tab, so
a driven drag can visibly appear to work and never actually commit. This handle is
this app's own answer to that gap, and it is how the 2026-08-26 QA pass verified every
acceptance scenario that didn't specifically require the drag *feel* itself.

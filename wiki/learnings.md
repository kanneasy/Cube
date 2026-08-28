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

A dev-only handle (`import.meta.env.DEV`-gated) exposes **nine** methods on
`window.__quarterTurn`: `play(alg)`, `solve()`, `session()`, `solves()`, and — added
later and worth knowing about — `zoom()`, `setZoom(f)`, `orbitBy(right, down)`,
`pick(x, y)` and `orientation()`. It dispatches through the real reducer, bypassing only
the gesture/WebGL layer. Reach for it on any future QA or
smoke pass instead of trying to synthesize `PointerEvent`s against the canvas: the
renderer's `requestAnimationFrame` loop doesn't run in a backgrounded preview tab, so
a driven drag can visibly appear to work and never actually commit. This handle is
this app's own answer to that gap, and it is how the 2026-08-26 QA pass verified every
acceptance scenario that didn't specifically require the drag *feel* itself.

`pick(x, y)` is the one to reach for first when driving the canvas at all: it answers
"is this coordinate on the cube, and which piece" directly, instead of guessing screen
fractions and then reverse-engineering from the move log why a drag meant to orbit turned
a slice. `orientation()` measures view drift without watching.

**But the renderer diagnostics are only meaningful while the render loop is actually
running.** `pick()` raycasts the meshes as of the last rendered frame against a live
`getBoundingClientRect()`, so in a hidden or backgrounded pane — or after a viewport
change with no repaint — it will answer confidently and wrongly. Caught on 2026-08-28
returning the same cubie for three widely separated points, including one well outside
the cube. The same stall is what made a design-critic pass on that date see turns that
never resolved after release; it was traced to `document.visibilityState: hidden` and is
not a product defect.

The robust move when driving gestures for real: **assert on committed state, not on
appearance.** A move counter that goes up cannot happen without the settle spring having
actually run, so it proves the rAF path end to end; a screenshot that looks right proves
only that a frame was painted at some point.

See also: "Gesture-feel bugs surface on a real iPhone, not in the suite" below, which
is the other half of this — what the handle deliberately doesn't cover.

## Gesture-feel bugs surface on a real iPhone, not in the suite — but the suite pins them exactly once taught

A 2026-08-28 user report (wrong-layer turns, a flick that needed a hard deliberate
swipe, a stray finger jump-rotating the cube) landed despite the gesture test suite
passing in full. All three were real physics facts about touchscreens that a synthetic
`PointerEvent` stream driven in a straight line simply doesn't encounter: a thumb's
contact patch rolls for a few milliseconds after touch-down before the intended stroke
starts, iOS's last `pointermove` before a lift is a decelerating sample, and a third
contact (palm edge, second hand) is common during a two-finger gesture. `window.__quarterTurn`
(above) never exercises this layer at all — it dispatches through the reducer, bypassing
gesture code entirely — and the pre-existing unit suite (`dist/web/cube/gestures.ts`,
`gestures.commit.test.ts`) drove only idealized straight-line drags, so it had nothing
to catch. Once each bug was named from the device report, the fix could be pinned
exactly with a fake-clock pointer harness (see the `describe('a stray third finger
during a pinch', ...)` block for the pattern: inject a stream shaped like the real
failure, assert the specific invariant). The lesson for this app specifically: treat
"263 tests pass" as necessary but never sufficient for a gesture change, and budget a
real-device pass before calling one done — this is a concrete instance of what this
project's own `CLAUDE.md` already says under Shipping ("The only complete check is a
real iPhone"), not a new rule, just proof it applies to gesture *logic* and not only to
install/PWA behavior.

The gesture state machine's own documentation now lives in `dist/web/cube/gestures.ts`'s
header comment and the inline comments beside each constant (axis-resolution window,
engage-vs-commit thresholds, release-velocity window) — read the code first, before
`visual.md`'s Motion section, when the question is "what does the code actually do
right now": the code comments are what's guaranteed current.

## This spec's timing budgets need a buildability check against the mechanism they name

The grab acknowledgement's spec said "within 60ms," and separately said it fires at
axis resolution — a trigger that structurally requires travel. On a slow press that
combination is 300ms; on a press that never moves, it never fires. That contradiction
sat in the spec unbuilt for months (a required behavior — the app's only touch
confirmation with no haptics available — silently never shipped) because nothing short
of actually building it runs the arithmetic on a prose timing claim. Fixed by moving
the trigger to touch-down itself. `src/interfaces/@brand/visual.md`'s "Motion" section
carries many more numeric timing/latency claims in the same style (engage windows,
spring constants, detent thresholds) — when editing or adding one, check the stated
budget against the mechanism named in the same breath rather than trusting that a
plausible-sounding number was already checked.

## If `wiki/daily/` looks stale for a date with real activity, check for a missed hook reload first

`wiki/runs/` and `wiki/daily/` stop at 2026-08-26 even though a 2026-08-28 session
landed twelve commits of gesture-physics and rendering fixes — the `SubagentStop`/`Stop`
capture hook only registers at session start, and this session didn't get a reload
after a kit change. Don't read a gap here as "nothing happened": `git log`/`git diff`
on the branch carry the reasoning (commit messages in this kit are written to carry
it deliberately), and `src/interfaces/@brand/visual.md` and `src/interfaces/web.md`
capture each specialist's exact returned values verbatim rather than paraphrasing them
— between the two, a session's decisions are recoverable even with zero captured runs.
A kit-wide version of this is proposed at
`~/builder/.claude/knowledge/inbox/2026-08-28-quarter-turn-run-capture-reload-gap.md`.

# Run — builder:code-reviewer — 2026-08-26T21:38:46.585Z

Captured verbatim by the SubagentStop hook: the handoff Builder sent, and the agent's complete output (its `## Thinking` and `## Result`).

## Handoff

**Review today's changes**

Review the code in /Users/erickanney/builder/projects/quarter-turn/dist/. Work only in that project, and **read only — do not edit**, since another agent is driving the running app at the same time.

You reviewed this app earlier today and found four things: an untested slice-move claim, a tautological pattern test, a dead `onFirstFrame` hook, and an untested cross-colour tie-break. All four are fixed. Please do not re-derive those; spend your effort on what has changed since, which is a lot and much of it in the riskiest files.

`git log --oneline` will show you the day. The changes worth your scepticism:

- **`dist/web/cube/project.ts` is new, and it exists because of a real bug.** The renderer projected a direction and negated its y; `Vector3.project` returns normalised device coordinates, which are already +y up. Only y carried the sign error, so horizontal drags were fine and every drag with a vertical component turned the wrong way. The test mock computed its own projection correctly, so nineteen gesture tests passed against a projection the app never used. There is now one function shared by both. **Check that the sharing is real and that nothing reimplements it anywhere.**

- **`dist/web/cube/renderer.ts` was rewritten.** The camera is now fixed at (0, 0, distance) and never rotates; all orientation lives in the cube's quaternion. Framing solves against the on-screen face width rather than the projected silhouette, because the silhouette is pose-dependent. `screenEdgeLength()` was deleted because under free rotation it could project to zero pixels and make the turn gain divide by nothing. Shading now reads the sticker's world normal — it was reading the cubie's own quaternion, which no longer contains the orbit. **Check the framing maths, the shading blend, and whether anything else in that file still assumes a moving camera or a stationary cube.**

- **`dist/web/cube/gestures.ts` gained pinch, momentum from a 60ms window, double-tap reset, and rubber-banded zoom.** Pointer bookkeeping is now a Map, and there are two separate animation handles (`animation` and `momentum`). **Look hard for leaks and for states that can strand**: a pointer that never lifts, a pinch that loses one finger, a double-tap during a spring, a gesture that starts mid-reset.

- **`dist/solve/hints.ts` gained `toQuarterTurns`** because a drag commits at most one quarter turn, so a `U2` hint named a move no gesture could perform.

- **`dist/web/App.tsx`** persists zoom to IndexedDB, migrates away a stale persisted default, and carries a dev-only `window.__quarterTurn` handle guarded by `import.meta.env.DEV`. **Confirm that handle cannot reach production**, and check the effect dependencies around the zoom save for staleness.

263 tests pass. As before: tell me which of them do not bite, and which new branch has no test at all. I would rather hear that a test is theatre than that the count went up.

## Agent output

## Thinking

I read the five flagged files plus the tests that exercise them, ignoring the four already-fixed items.

**`project.ts` sharing is real.** Both `gestures.test.ts`'s mock renderer and `gestures.commit.test.ts` explicitly import `projectDirection` from `./project` rather than reimplementing it (the file-header comments say as much, and the import lines confirm it). `project.test.ts`'s `defaultCamera()` builds an orbiting-camera reference frame rather than the app's actual fixed-camera-plus-quaternion setup — I worked through the rotation algebra and it's an exact equivalent construction (camera orbit by `Ry(yaw)·Rx(-pitch)` around a fixed target is the same image as a fixed camera viewing a world pre-rotated by `Rx(pitch)·Ry(-yaw)`, which is exactly `defaultOrientation()`), so this is a legitimate independent check, not theater. No leftover `-y` flip or reimplementation exists anywhere else (`renderer.ts`'s raycast NDC math is the standard, unrelated three.js convention).

**`renderer.ts` framing math checks out.** `applyFraming`'s `distance = 1.5·h/(f·w·tan)` is the correct algebraic solve for "cube face width / stage width = f" given the vertical-FOV pinhole model; I re-derived it independently and it matches. `shadeFor`'s sum-of-squares blend and the world-normal-via-`orientation·cubie.quaternion` shading are consistent with a truly fixed camera. `pickSticker`'s normal is deliberately left in cube-space (not multiplied by `orientation`), which is correct because it feeds `resolveAxis`/`cubieCoords`, not shading. I found no leftover moving-camera assumption.

**Two real bugs in `gestures.ts`, both exactly the shape the brief asked me to hunt for, and both untested:**

1. A second finger landing mid-turn (`this.drag.kind === 'turn'`) unconditionally overwrites `this.drag` with a `PinchDrag` in `onDown`. Nothing on that path calls `renderer.setLayerRotation(null, 0)` or `callbacks.onRelease()` for the abandoned turn. Since `applyTransforms()` re-applies `this.liveBase`/`this.liveAngle` every frame until `setLayerRotation` is called again, the layer stays visually frozen mid-turn for the rest of the pinch/orbit and beyond — a genuinely broken-looking cube, stranded until the user happens to grab and complete another turn.

2. `settleTurn`'s spring, `resetView`'s tween, and `spring()`'s reduced-motion glide all write to the single `this.animation` field via `raf(...)` without ever `caf`-cancelling whatever was already running there. `onDown`'s `if (this.animating) return` guard only blocks a *new single-finger drag*; it does not block a second finger starting a pinch (that branch returns before the animating check), and the tap/double-tap detector in `onUp` isn't gated on `animating` at all (`pressedAt`/`pressedAtXY` are set on every `onDown` unconditionally). So a double-tap landing while a turn-commit spring is still running — a very plausible "impatient user" sequence — calls `resetView()` on top of it, and both `requestAnimationFrame` loops keep running, fighting over orientation/zoom each frame, with whichever finishes first zeroing `this.animation` while the other is still live underneath the user's next gesture.

**Test coverage gap matches exactly where those bugs live.** In both `gestures.test.ts` and `gestures.commit.test.ts` the mock renderer's `pickSticker` always returns a hit, so every simulated touch becomes a turn drag. Pinch, momentum/glide, rubber-banded zoom, and even plain single-finger orbit are never exercised anywhere — only double-tap-reset and turn-commit have coverage. That's the bulk of what the brief said gestures.ts gained this session, untested, and it's precisely where bugs 1 and 2 hide.

**`renderer.ts` itself has no test file at all.** `shadeFor` is pure and trivially testable (no WebGL dependency) with a stated invariant (exact at the axes, sum-of-squares = 1) and has zero assertions anywhere.

**`hints.ts`/`toQuarterTurns`** is well covered — split, leave-alone, and full-planner integration cases all present, including the U2-in-the-planner scenario. No issues.

**`App.tsx`** — the dev handle is correctly gated by `import.meta.env.DEV` (a real compile-time constant Vite folds to `false` in production, so the block is unreachable, matching project convention already used elsewhere). The zoom load/save logic lives inside the single mount-only effect and reads/writes exclusively through `libraryRef.current`, the same ref-indirection pattern the file already uses to avoid staleness — no stale-closure bug there. Minor: `renderer.ts`'s doc comment above `ZOOM_REST` still says "the resting value is 0.40 ... 0.40 leaves 53px at the worst pose," but the constant is `0.45` — stale prose next to the exact constant I was asked to check (harmless; App.tsx's `FORMER_DEFAULT_ZOOMS = [0.4]` migration still correctly targets the actual old default).

## Result

- **Pinch mid-turn strands the layer.** `dist/web/cube/gestures.ts` `onDown`: when a second pointer lands while `this.drag` is a `TurnDrag`, `this.drag` is replaced with a `PinchDrag` without calling `renderer.setLayerRotation(null, 0)` or `callbacks.onRelease()`. Since `applyTransforms()` in `dist/web/cube/renderer.ts` re-applies `liveBase`/`liveAngle` every frame, the layer freezes visibly mid-turn until the user starts and finishes another single-finger turn. Fix: on the `pointers.size === 2` branch, if the outgoing drag was a `TurnDrag`, reset the layer rotation and fire `onRelease` before switching to pinch.

- **Animation handles collide across gesture types.** `settleTurn`'s spring, `resetView`'s tween, and `spring()`'s reduced-motion glide all assign `this.animation = raf(...)` without ever cancelling whatever was previously running there. The `animating` guard in `onDown` doesn't cover pinch-start (its branch returns before that check) or the tap/double-tap detector in `onUp` (unconditional). Concretely: double-tap right after releasing a turn, before its spring settles, or two-finger-touch during either a spring or a reset — starts a second `raf` loop that fights the first over orientation/zoom, and whichever finishes first zeroes the shared `animation` handle while the other is still silently running. Fix: `caf` the existing handle (turn spring and momentum both) before starting `resetView` or a new pinch, and gate the tap/double-tap branch and pinch-start on `this.animating`/`this.momentum` the same way single-finger drags already are.

- **Untested surface is exactly where those two bugs live.** Neither `gestures.test.ts` nor `gestures.commit.test.ts` ever drives a pinch, momentum/glide, rubber-banded zoom, or even plain single-finger orbit — the mock's `pickSticker` always returns a hit, so every simulated touch resolves to a turn drag. Only double-tap-reset and turn-commit are covered. This is the majority of what the brief says `gestures.ts` gained this session, and it's untested theater-adjacent by omission rather than by a bad assertion.

- **`renderer.ts` has no test file at all.** `shadeFor` is pure, cheap to test, and carries a stated invariant (exact at axes, sum-of-squares = 1) that nothing currently checks. Worth two or three direct unit tests given the file was fully rewritten this session.

- Minor: `dist/web/cube/renderer.ts`'s doc comment above `ZOOM_REST` still cites "0.40 ... 53px at the worst pose" against a constant that is now `0.45` — stale prose next to the exact math the brief asked me to verify; won't bite functionally (App.tsx's migration list correctly still targets the true old default `0.4`), but will mislead the next person tuning framing off the stated numbers.

- Minor: `dist/web/cube/gestures.commit.test.ts`'s mock renderer defines `screenAxes()`, which no production code calls anymore — harmless leftover from the pre-rewrite camera-orbit model.

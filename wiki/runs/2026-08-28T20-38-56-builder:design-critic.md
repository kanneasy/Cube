# Run — builder:design-critic — 2026-08-28T20:38:56.924Z

Captured verbatim by the SubagentStop hook: the handoff Builder sent, and the agent's complete output (its `## Thinking` and `## Result`).

## Handoff

**Critique the running cube UI**

Critique the running app for /Users/erickanney/builder/projects/quarter-turn/.claude/worktrees/cube-rotation-face-controls-56433f. This is a git worktree; work only inside it.

A dev server is already running at **http://localhost:5173** (started with `npm run dev`; if it is gone, restart it from that directory). Use a mobile viewport — this is an iPhone PWA, portrait, and nothing else matters.

**What changed and why.** The user reported, in their own words, after using the installed app on a real iPhone:

- "3d rotation of the cube is still challenging. I'd like to be able to use two fingers to zoom and rotate if necessary, sometimes at the same time."
- "Moving the cube faces is challenging too. It's rotating a face I didn't intend or only slightly rotating and returning. I have to swipe very hard and deliberately in the exact direction I want to work, and it just slows down the movements."

This session reworked the gesture layer against that: the turn axis is now read from the recent stroke rather than from touch-down, a wrong pick can correct itself, release velocity is windowed, a settling turn no longer swallows the next touch, two fingers now roll as well as tumble and zoom, and — the part I most want your eye on — **a grab acknowledgement was built that had been specified since the first spec and never implemented**: a hairline ring traces the touched cubie at pointerdown, then expands into a "seam" tracing the cut plane of the layer that will turn, with that layer's plastic lifting.

**What I want from you.**

1. **Judge the grab acknowledgement as a usability control, hard.** `src/interfaces/@brand/visual.md` → "Grabbing a layer" is the spec; read it. It claims to be the app's only affirmative marker for which layer is under your thumb, on a surface with no haptics — a visibility-of-system-status control, not decoration. Does it actually read that way on screen? Is the ring visible enough at touch-down, is the seam legible against both the near-black plastic and a saturated sticker, and does the expansion from ring to seam teach the gesture or just flicker? You can drive it by dispatching PointerEvents at the canvas with `javascript_tool` — the app is driven entirely by pointer events on a single `<canvas>`.

2. Score the whole running screen against `~/builder/.claude/design/design-system-rubric.md`, both pillars, and run `node ~/builder/bin/detect.mjs http://localhost:5173` (it exits 0 clean today and must stay clean).

3. **The discoverability question I think is the weakest point.** The first-run overlay says only "Drag a sticker to turn that layer / Drag the background to look around." It teaches neither two fingers nor the double-tap view reset, and the user's complaint above is partly that they could not find gestures that already existed. I have a copy revision in flight for the overlay. Tell me whether a first-run card that dismisses on the very first touch is the right carrier for this at all, or whether it needs somewhere more durable, and be specific about where.

4. Anything else that fails a persona walkthrough on a phone.

Give me a PASS or FAIL on the acceptance scenario "Turning and orbiting feel natural and satisfying on a real installed iPhone" as far as a desktop browser can judge it — and say plainly which parts of it only a real thumb can answer, rather than passing or failing those on a mouse.

## Agent output

## Thinking

**Register:** The Solve screen is, per its own spec, "a product surface pretending to be a brand surface" — I judged it as a product surface: state legibility and control proximity held to the hard bar, atmosphere alone doesn't earn credit. I opened `ui/33-focus-timer-session.png` (photographic hero + bottom-sheet controls) and `ui/55-meditation-player.png` (committed warm radial glow) as the closest archetypes — both immersive single-screen players with a hero number/control. Quarter Turn's counter-decision — true black void, zero atmosphere, one saturated object — is a real, nameable choice against both references, not an absence of one.

**What I walked:** iPhone reference viewport (390×844). Install-notice card → dismiss → first-run overlay → grab acknowledgement (ring/seam) driven by dispatched `PointerEvent`s at the canvas per the brief's own suggestion → two-finger pinch+orbit via two synthetic pointer streams → Menu sheet → `node bin/detect.mjs` against the live server.

**Methodology hazard worth naming honestly:** this dev server exhibited two environment confounds during testing, both of which I isolated rather than blamed on the app. First, the Claude Browser pane's `computer` click/drag tool hung repeatedly ("pane hidden") — I fell back to `javascript_tool`-dispatched `PointerEvent`s for everything, which is exactly the sanctioned path the brief names. Second, I hit a reproducible "turn never resolves after release" state; I traced this to `document.visibilityState === 'hidden'` persisting in this automation context, and the app's release/commit path (`settleTurn` → `spring` → `requestAnimationFrame`) is the *only* piece of the gesture pipeline gated on rAF — the live-drag portion (ring, seam, 1:1 tracking) is driven by direct synchronous calls and worked flawlessly throughout, including across three clean reproductions. That asymmetry (live tracking always worked; only the rAF-gated settle spring froze) is consistent with a harness artifact, not a product defect, so I did not score it — but I also could not fully rule it out on a real device's foreground rAF, so I've carried it into the "only a real thumb" list below rather than silently dropping it. Also observed and set aside: `App.tsx` was hot-reloaded by Vite mid-session (visible in console as repeated `[vite] hot updated: /App.tsx`) from a source outside my own edits — a dev-server-only hazard, not something I can attribute to the shipped code, and not scored.

**What I found, in order of confidence (highest first):**

1. **The grab acknowledgement works, and it's good.** Dispatching `pointerdown` and holding (no move) for 55ms reliably produced a crisp hairline ring on the touched cubie's face — confirmed legible on white, orange, red, yellow, blue, green and gray stickers, and against the black grout. Crossing the 10px engage threshold reliably dissolved the ring into the seam within the spec's 80ms window, with a genuine, visible geometric lift (the layer physically separates from its neighbors, not just a color shift) — this reads as a real two-step teach ("I have this square" → "this is what will turn"), not a flicker, across every one of six clean reproductions. This is the strongest thing on the screen and it directly answers the user's "I have to swipe very hard and deliberately" complaint: the acknowledgement fires at touch-down, before any commitment, so a wrong grab is visible before the user has invested a drag.

2. **The two-finger complaint is substantively fixed.** Two independent synthetic pointer streams, moved asymmetrically (spread + offset), produced simultaneous live zoom *and* orbit in one gesture, 1:1, with no arbitration lag — exactly the "sometimes at the same time" the user asked for. I did not exercise the twist/roll channel (would need a third staged gesture) or the mid-turn-interrupt-promotes-to-pinch path, both of which I read in code but didn't drive.

3. **Discoverability is a real, correctly-identified gap.** I confirmed by reading `App.tsx`: `firstRunSeen` is set permanently (localStorage) the instant `onTouchCubie` fires — i.e., on the *first contact with the cube itself*, not on reading the card, not on completing a turn. A user who brushes the cube out of curiosity loses the teaching card forever in the same motion that was supposed to teach them. I confirmed the Menu sheet (Records / Daily Scramble / Patterns / Settings) and the Settings→About copy (`ABOUT_PARAGRAPHS`) contain zero mention of controls — there is no durable second location. I did also confirm a partial mitigation exists and works: a one-line "DOUBLE TAP TO RESET" hint fired correctly in the notation strip the first time my orbit test crossed 90° while idle, matching the spec's once-per-session teach. That's real, but it's one specific gesture, one time, gone after — it doesn't cover two-finger pinch/roll at all.

**Cognitive load:** low overall — single focus, clear zoning, ≤4 live choices — with exactly one real fail: the two-finger and double-tap gestures are pure recall after the first-run card dismisses, no persistent affordance anywhere.

**AI-slop:** none. Detector is clean (0 findings, matches the prior gate). Waiver check: only the standard kit-wide `border-accent-on-rounded` waiver in `.impeccable/config.json`, reasoned and pre-existing; no project-specific or unreasoned suppressions, no `impeccable-disable` directives in `dist/web`.

## Result

**Verdict:** Slop pass. Heuristic total **33/40 — good band**. This is a well-executed, restrained instrument-register screen with one load-bearing control (the grab acknowledgement) that genuinely works, sitting alongside one real, correctly-scoped usability gap (gesture discoverability) that the user's own complaint already named.

**Scenario verdict — "Turning and orbiting feel natural and satisfying on a real installed iPhone":**
- **Mechanics: PASS**, as far as a desktop browser can show. The grab ring→seam acknowledgement fires within budget and reads clearly against every sticker color tested; axis resolution now visibly tracks the drag correctly (a horizontal drag on a middle-row sticker engaged the middle layer, not the whole cube, across repeated clean tests); simultaneous two-finger pinch+orbit works live with no arbitration lag.
- **What only a real thumb can answer:** (a) whether release/settle/commit is reliable under real touch sampling — I could not close this cleanly in this sandbox because the settle spring is `requestAnimationFrame`-gated and this automation context reported `document.visibilityState: hidden` throughout, which stalled that one code path while everything else kept working; (b) whether the axis-switch self-correction and the flick-vs-settle thresholds feel right under a real finger's velocity and contact-patch roll, which no synthetic event can reproduce; (c) two-finger twist/roll and the second-finger-cancels-a-live-turn path, neither of which I exercised. Recommend leaving this scenario **OPEN** for the user's real-device pass, exactly as `mvp.md` already records — my testing narrows what's left to confirm rather than closing it.

**What's working:**
- The seam is the right object, not a hack — it's a real cut-plane in the cube's own frame (confirmed visually: it holds its position and legibility through a live drag, not a screen-space approximation that would degrade off-axis), and its additive-white-on-flat-plastic treatment reads on every color in the palette, including the hardest case (white-on-white), which the spec itself flags as the weak point.
- Two-finger pinch+orbit-simultaneously is real and responsive, not stubbed.
- The screen clears the decision test: a committed black void with zero atmosphere, against a hero-number readout that deliberately shrank (per the 2026-08-26 correction) to stay secondary to the cube — a specific, defensible choice against both reference screens I opened, not "plausible."

**Priority issues:**

- **P1 — The only gesture teaching surface is destroyed by the first touch it's supposed to survive.** `dist/web/App.tsx` (`onTouchCubie` → `setFirstRunSeen(true)` + `writeFlag(FIRST_RUN_KEY)`), consumed by the `!firstRunSeen &amp;&amp; ...` gate around `&lt;FIRST_RUN&gt;` (`dist/web/components/copy.ts`). Any contact with the cube — including a curious tap that never completes a drag — permanently retires the card, and there is no second location: the Menu sheet (Records / Daily Scramble / Patterns / Settings) and Settings→About cover rules and scoring, never controls. This is close to verbatim the user's complaint ("I could not find gestures that already existed"). **Direction:** keep first-touch dismissal for the common case — it's the right lightweight carrier for someone who's already dragging correctly — but add one durable, on-brand fallback the user can return to. The natural slot is a fifth row in the existing Menu list (it's already a plain label + one-line description pattern, zero new chrome, matching the "Palette, sound, timer mode, about" register) rather than a new control on the stage, which the spec is explicit about protecting from chrome.
- **P2 — Two-finger and double-tap remain pure recall after the card dismisses.** Same root cause as the P1 above, but worth calling out on its own axis: even a user who *did* read the card has no persistent visual cue (no small affordance, no icon) that two fingers or a double-tap do anything — this is heuristic #6 (recognition over recall) failing specifically for those two gestures, while drag-a-sticker and drag-the-background stay self-teaching because the grab acknowledgement itself is the persistent affordance. The one-time notation-strip hint (confirmed firing correctly) is a good partial mitigation but is gesture-specific (view reset only) and one-shot. Worth folding into the same Menu-row fix rather than solving separately.

**Persona red flags:**
- **Jordan (first-timer):** the first 5 seconds are unambiguous (cube, drag-me affordance appears on touch) — passes. But Jordan who explores with two fingers before reading the card, or who taps-and-releases without dragging, loses the only lesson permanently, with no path back except reinstalling or clearing site data.
- **Alex (power user):** primary task (turn a layer) is fast and legible now — the grab acknowledgement removes the "did that register" uncertainty that was the root of the original complaint. No keyboard path exists, but that's consistent with a direct-manipulation single-canvas instrument rather than a gap.
- **Sam (accessibility):** no reduced-motion or focus-visible testing was in scope for this pass per the brief's focus, and the app is inherently touch-only by design (spec explicitly treats sound as the accessibility affordance in place of haptics) — flagging as unexamined rather than scoring it.

**Scores:**
- Visibility of system status: 3/4 — excellent for the cube itself (ring/seam), weaker for what a fresh touch will do before you've touched anything.
- Recognition over recall: **2/4** — the flagged gap.
- Consistency: 4/4
- Error prevention: 4/4 (refusal states, undo always visible-but-disabled rather than hidden)
- User control/undo: 3/4
- Real-world match: 4/4 (Stackmat quote, WCA notation)
- Flexibility: 3/4 (flick-vs-settle is a real accelerator; no keyboard path)
- Minimalist hierarchy: 4/4
- Plain-language recovery: 4/4
- Contextual help: **2/4** — the flagged gap
- Cognitive load: low (one real fail — the recall dependency above)
- Detector: 0 findings, clean; one pre-existing, reasoned, kit-wide waiver (`border-accent-on-rounded`), nothing project-specific hidden.

**Questions to consider:**
- If the Menu sheet gets a fifth "CONTROLS" row, should it also be the thing a stray first tap opens instead of silently retiring — i.e., should the *first* touch anywhere near a sticker that doesn't turn anything (a tap, not a drag) leave the card alone, and only a completed *turn* retire it? That would make the dismissal track actual comprehension instead of mere contact.
- Given the seam is confirmed legible even in the worst case (white-on-white), is the sticker lift's `k×1.10` clamp-removal still worth its own line in the spec, or has the hairline made it genuinely redundant — i.e., is there a simpler spec now that the seam alone is proven to carry the signal?

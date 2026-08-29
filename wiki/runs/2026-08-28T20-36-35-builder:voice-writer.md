# Run — builder:voice-writer — 2026-08-28T20:36:35.852Z

Captured verbatim by the SubagentStop hook: the handoff Builder sent, and the agent's complete output (its `## Thinking` and `## Result`).

## Handoff

**First-run overlay copy**

Work only in /Users/erickanney/builder/projects/quarter-turn/.claude/worktrees/cube-rotation-face-controls-56433f (a git worktree; do not reach outside it). You own `src/interfaces/@brand/voice.md`; read it and `src/interfaces/web.md` yourself.

**What I need: the first-run overlay copy.**

It currently lives in `src/interfaces/web.md` around line 106 and reads:

```
Drag a sticker to turn that layer.
Drag the background to look around.
```

It dismisses on the first touch, which is also the user's first real drag, so the lesson and the action are the same motion.

**Why it has to change.** The app has gained gestures the overlay never taught, and the user has just told us in their own words that they could not find them: "3d rotation of the cube is still challenging. I'd like to be able to use two fingers to zoom and rotate if necessary, sometimes at the same time." Two fingers already zoomed and tumbled together before this session — they simply had no idea, because nothing said so.

The complete gesture vocabulary now is:

- Drag a sticker to turn that layer.
- Drag the background to look around.
- **Two fingers, anywhere on the screen, do three things at once and independently:** sliding them tumbles the cube, spreading or pinching them zooms, and twisting them rolls the cube in the screen plane. This works over any pixel, including on top of the cube, which matters because zoomed in there is no background left to grab.
- **Double tap anywhere returns the view to where it started.** `visual.md` line 379 has required a line teaching this since the original spec and it was never written, so the reset is currently undiscoverable.

**The constraint I care most about.** This overlay sits over the cube on a phone and dismisses on the very first touch. Four lines may well be one too many — that is your call, not mine. If two-finger and double-tap can be taught somewhere better than a first-run card that vanishes on contact, say so and tell me where; I would rather hear that than pad the overlay. If four lines is right, give me four.

Give me the exact lines to put in the spec, in the order they should appear, plus a one-line note on anything you would change elsewhere (the About screen, the Mode sheet, an empty state) to carry what does not fit. Do not edit files; hand the copy back.

## Agent output

## Thinking

**Voice grounding.** This app's register is "a Stackmat judge, not a coach" — state the fact, then stop, no hedging, no cheerleading. The existing two-line overlay already set the pattern I have to extend, not reinvent: sentence case, one verb-first clause, ends flat with a period, six-to-seven words. Whatever I add has to sit in that same family or it'll read like a different app wrote it.

**What's actually being asked of the overlay vs. what belongs elsewhere.** I read `visual.md`'s "Getting home" section before writing anything, because it already made two structural calls that aren't mine to re-litigate: the overlay gains a *third* line for two-finger orbit+zoom, and the double-tap reset is taught separately, once per session, as a 1400ms hint in the notation strip's reserved slot — the exact slot and treatment the refusal messages use — fired the first time the view actually drifts while the clock is idle. That second mechanism is real, already engineered, and unused only because the two lines it needs were never written. So my job splits cleanly: write the third overlay line, and write the line that slot has been waiting for since 2026-08-26.

**Why double-tap doesn't belong on the overlay.** The overlay fires and dies before the user has ever moved the view — teaching "here's how to undo a thing you haven't done yet" at that moment is a fact with no purchase. The JIT toast fires at the one moment the lesson is relevant: right after the person has actually drifted from home. That's a strictly better teaching moment than a card that's gone at first touch, so I'm not padding the overlay with it. This directly answers "say so and tell me where" — the answer is: it already has a better home, it just never got its words.

**Why I kept the overlay at three lines, not four.** Three matches what `visual.md` already committed to. A fourth line (teaching double-tap on top of sticker-drag, background-drag, and two-finger-drag) asks a thumb mid-motion to absorb four unrelated facts before it's touched anything — and one of those four wouldn't even be true yet, since the view hasn't moved. Three lines, each teaching a fact the user is about to need in the next second, is the right size.

**Word choices, and why.** Line 3 reuses "look around" verbatim from line 2 rather than a synonym like "orbit" or "rotate the view" — `voice.md`'s own rule 5 ("never introduce a second word for a thing that already has one") applies here even though "orbit" is the *internal* spec term; the on-screen word this card already committed to is "look around," so the two-finger gesture gets the same word, which also does useful teaching work: it tells the user this is the *same* action as line 2, just reachable two ways now. I added "even on the cube" because that's the single fact the user's own feedback proves was missing — they didn't know two fingers work where one finger can't (there's no background left to grab once you're zoomed in). That clause is the whole point of this change; I wasn't willing to cut it for brevity.

For the reset hint, I chose "DOUBLE TAP TO RESET" over "DOUBLE TAP TO RESET VIEW" — a real word-economy call, flagged rather than silently made. I dropped "home" as the object even though `app.md` already defines "home orientation," because this app already uses "Home" to mean the iOS Home Screen (`Add to Home Screen`), and colliding those two meanings in a one-second toast is exactly the kind of ambiguity this app's own terminology table exists to prevent. "Reset" doesn't collide with anything on screen, and it only ever fires while the clock is idle — nothing else in that state is plausibly the thing being reset.

**What I didn't teach, on purpose.** Two-finger twist-to-roll is real and shipped (`dist/web/cube/gestures.ts` — `TWIST_ENGAGE`, `rollOffset`, `spinBy`), but `visual.md`'s own "Two fingers, always" section doesn't mention it — it only documents orbit+zoom. I didn't write teaching copy for roll: it's a safe, fully reversible refinement of a gesture the user is already being taught (twist your two fingers a little further and the cube rolls), not a new law the user needs told to them, and double-tap already resets it if it surprises anyone. Inventing a fourth overlay line or a second toast for it wasn't asked for and I don't think it's earned yet.

## Result

**1. First-run overlay — replace the block at `web.md` line ~106.** The description line above the block also needs its word updated (two → three), since it currently miscounts:

```
**First-run overlay.** Three lines, dismisses on the first touch — which is also the
user's first real drag, so the lesson and the action are the same motion:

~~~ first-run
Drag a sticker to turn that layer.
Drag the background to look around.
Two fingers zoom and look around, even on the cube.
~~~
```

**2. View-reset hint — new copy, new location.** This does not go on the overlay. It belongs in the Solve section of `web.md`, as a second transient string sharing the notation strip's slot, right after the existing sentence about the `Refused` state (web.md line ~104-105). Suggested text to add there:

```
Separately, once per session — the first time the view is rotated more than 90° or
zoomed more than 10% while the clock is idle — this same slot carries a one-line hint
for 1400ms. It is not a refusal; nothing was blocked. Full trigger in visual.md.

~~~ view-reset-hint
DOUBLE TAP TO RESET
~~~
```

This is the line `visual.md` line 379 has been waiting on since the original spec.

**One-line notes on what I'd change elsewhere:**

- `voice.md`'s refusal section currently reads "six real triggers, five distinct strings" — once `DOUBLE TAP TO RESET` exists it shares the slot but is not a refusal (nothing was blocked), so that count should stay describing refusals only, and this new string should get its own short heading in `voice.md` rather than be folded into the refusal set — I'd add it as its own paragraph right after "Refusal reasons," not inside it.
- `visual.md`'s "Two fingers, always" section documents orbit+zoom but not the twist-to-roll gesture that's already shipped in `gestures.ts` — worth a design/architecture pass to reconcile the spec with what's actually running before someone reads that section and assumes roll doesn't exist yet.
- I did not add anything to About, the Mode sheet, or any empty state — none of them are naturally about camera controls, and between the overlay's new third line and the JIT reset hint, the two gaps that were actually reported (two-finger discoverability, and the undiscoverable reset) are now covered. I'd resist adding a third surface unless a specific gesture (roll, most likely) turns out to need it later.

# Run — builder:voice-writer — 2026-08-28T20:58:35.318Z

Captured verbatim by the SubagentStop hook: the handoff Builder sent, and the agent's complete output (its `## Thinking` and `## Result`).

## Handoff

**Controls reference copy**

Work only in /Users/erickanney/builder/projects/quarter-turn/.claude/worktrees/cube-rotation-face-controls-56433f (a git worktree; do not reach outside it). You own `src/interfaces/@brand/voice.md`. You wrote the first-run overlay copy earlier today and it has shipped:

```
Drag a sticker to turn that layer.
Drag the background to look around.
Two fingers zoom and look around, even on the cube.
```

plus `DOUBLE TAP TO RESET` in the notation strip's transient slot.

**Why I am back.** You closed your last note with "I'd resist adding a third surface unless a specific gesture turns out to need it later." Design-critic has now established it does, and found something worse that I caused. Two things:

1. **The overlay is destroyed by the touch it was meant to survive.** The card is permanently retired (localStorage) the instant a finger contacts the cube — including a curious tap that never becomes a drag. I did that: I moved the dismissal from "a real drag" to "any contact" while wiring up the grab acknowledgement. I am fixing that regression separately so the card retires on an actual completed gesture, not on mere contact.

2. **There is no durable second location, and that is the user's actual complaint.** Their words were "I'd like to be able to use two fingers to zoom and rotate if necessary" — about a gesture that already worked and that they could not find. Design-critic confirmed the Menu sheet (Records / Daily Scramble / Patterns / Settings) and Settings→About cover rules and scoring and never mention controls, scored recognition-over-recall 2/4 and contextual-help 2/4 on exactly this, and recommended a row in the existing Menu list rather than new chrome on the stage. I agree and I am building it.

**What I need: the copy for that surface.**

The Menu list is a plain pattern — an uppercase label plus one line of what it is — used four times already, and you can read it in `dist/web/components/Sheets.tsx` around line 107. So I need:

- The **menu row**: its label and its one-line blurb, matching the register of the four rows beside it.
- The **screen it opens**: the complete gesture vocabulary as label + one-line rows in that same pattern. The four things to cover are: drag a sticker to turn a layer; drag the background to look around; two fingers anywhere to zoom, look around and roll; double tap to reset the view. Note the roll gesture is currently taught nowhere at all — the overlay line deliberately omitted it as "a safe reversible refinement discovered by twisting a little further," and that reasoning holds for a card that flashes once, but this is a reference someone came looking for, so I think it earns a line here. Tell me if you disagree.

Do not simply restate the overlay lines. That card catches you mid-motion and teaches the next second; this is a reference someone opened deliberately, and the register can differ accordingly — that is your call, not mine.

One constraint: this app already uses "Home" for the iOS Home Screen, which is why you chose "RESET" over "RESET HOME" earlier. Keep that consistent.

Do not edit files; hand the copy back.

## Agent output

## Thinking

**Two separate jobs, one register decision each.** The menu row is a doorway — same four-times-proven shape as the sheet it's back-referencing: an ALL-CAPS label typed directly (not CSS-transformed, per the app's own convention) plus one lowercase line that previews what's inside. Looking at the actual pattern in `Sheets.tsx`, three of the four existing rows (Records, Patterns, Settings) don't summarize their destination — they literally list the destination's own row names, lowercased, comma-joined, first word capped. That's not incidental; it's the mechanism that makes "recognition over recall" real: the menu row is a preview of the exact words waiting on the other side. I followed that convention rather than writing a fresh summary sentence, because a summary is exactly the kind of paraphrase that makes a search miss.

**The destination screen gets a different register than the overlay, on purpose.** The overlay is imperative and stripped to the bone because it's competing with a thumb mid-motion — three lines, no room to spare. This screen is opened deliberately by someone who already failed to find something once; they have attention to spend and a specific question in mind. So each row keeps the same opening gesture-instruction the overlay taught, but adds exactly one fact the overlay had no room for: the quarter-turn limit on Turn, momentum on Look Around, and — the one that matters most for a "where do I read the manual" surface — that Reset is never logged as a move, so nobody worries it costs them anything. That's the actual value of a reference over a toast: not different facts, one layer deeper on the same facts.

**On "orbit" vs "look around":** voice.md's terminology table says say "orbit," never "rotate the view, spin, pan." But the shipped overlay — written today, by this same voice — already chose "look around" as the public word and reserved "orbit" for spec/engineering prose (`app.md`, `visual.md` use it that way consistently; no UI string anywhere says "orbit"). I kept "look around," because principle 5 ("never introduce a second word for a thing that already has one") outranks the table here: the table's job is to stop copy drifting to a *third* synonym, and "look around" is already the one the user has seen. I did not edit voice.md to reconcile this, since I was asked to hand back copy only — but it's worth someone tightening that table entry later so the next writer doesn't hit the same fork blind.

**On naming the two-finger row:** I named it `TWO FINGERS` rather than a result-word like `ZOOM`, because the user's own complaint used exactly that phrase — "I'd like to be able to use two fingers to zoom and rotate." That's the strongest recognition signal available: it's literally the term they reached for. A single result-word would have privileged one of the three simultaneous behaviors (zoom, look around, roll) over the other two, which the spec is explicit is wrong — "do not arbitrate."

**On the roll gesture: I agree it earns a line, and here's why the same fact reads differently on the two surfaces.** On the overlay, teaching roll would be handing someone a fourth rule before they've touched anything — real cost, no purchase yet. On a screen someone opened *because* they went looking for exactly this kind of thing, omitting it isn't restraint, it's a gap in the manual. I used "twist to roll" — "twist" is already the spec's own word for the finger motion (`visual.md`'s twist-roll section, and the design rationale in `web.md` itself: "discovered by twisting a little further"), and "roll" is what that motion does to the cube. Neither word collides with anything else this app's copy uses.

**On em dashes:** the kit's global style guide says none. This product's own shipped voice — `voice.md` and `web.md` both, written and approved before this task — uses them constantly and precisely (a pause before a clarifying clause: "Cardinal — the classic Rubik's colors, retuned for the screen."). Per the brief ("the voice is set by this product, not by you"), I matched what's already shipped rather than the generic default.

One naming note to flag rather than silently decide: I made `TWO FINGERS` a device-named label (like `TIMER MODE`) rather than a verb (like `TURN`, `RESET`). That's a real mix of label styles on one screen — but it's the same mix Settings already runs (`PALETTE`, `SOUND`, `TIMER MODE`, `ABOUT` aren't all one part of speech either), so it's precedented, not new.

## Result

**The menu row** — same shape as the four beside it in `Sheets.tsx` (line 107), label typed in caps, blurb lowercased and comma-joined from the destination's own row names, exactly like Records/Patterns/Settings do:

```
CONTROLS
Turn, look around, two fingers, reset.
```

**The screen it opens — title `CONTROLS`, back destination `menu`** (fits the existing `back` logic with no special case). Four rows, same label-plus-blurb shape as every other sheet:

```
TURN
Drag a sticker to turn its layer, one quarter at a time.

LOOK AROUND
Drag the background to look around the cube. Flick it and it keeps spinning.

TWO FINGERS
Pinch to zoom, drag to look around, and twist to roll — anywhere, even on the cube.

RESET
Double tap anywhere to snap the view back to center, zoom included — it's never logged as a move.
```

If it's easier to drop straight into the `Sheets.tsx` array shape:

```
[
  ['TURN', 'Drag a sticker to turn its layer, one quarter at a time.'],
  ['LOOK AROUND', "Drag the background to look around the cube. Flick it and it keeps spinning."],
  ['TWO FINGERS', 'Pinch to zoom, drag to look around, and twist to roll — anywhere, even on the cube.'],
  ['RESET', "Double tap anywhere to snap the view back to center, zoom included — it's never logged as a move."],
]
```

No files were edited — this is copy only, per the instruction. Files read for context: `/Users/erickanney/builder/projects/quarter-turn/.claude/worktrees/cube-rotation-face-controls-56433f/src/app.md`, `/Users/erickanney/builder/projects/quarter-turn/.claude/worktrees/cube-rotation-face-controls-56433f/src/interfaces/web.md`, `/Users/erickanney/builder/projects/quarter-turn/.claude/worktrees/cube-rotation-face-controls-56433f/src/interfaces/@brand/voice.md`, `/Users/erickanney/builder/projects/quarter-turn/.claude/worktrees/cube-rotation-face-controls-56433f/src/interfaces/@brand/visual.md`, `/Users/erickanney/builder/projects/quarter-turn/.claude/worktrees/cube-rotation-face-controls-56433f/dist/web/components/Sheets.tsx`.

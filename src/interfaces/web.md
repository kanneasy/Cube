---
name: Web Interface
description: The web experience, screen by screen.
---

# Web interface

One screen you live on — Solve — and eight sheets that slide up over it. Layout, motion
and color are `visual.md`, `colors.md`, `typography.md`. This file is the words: every
label, state, empty board and honest caveat, screen by screen, exactly as they render.
Voice principles and the terminology this all follows live in `@brand/voice.md`.

## Solve

The app's one screen. States: `Scrambled/idle` · `Inspecting` (Competition) · `Armed`
(holding) · `Running` · `Solved` · `Practice` · `Refused` (transient, 1400ms).

**Status rail.** Left, the mode chip, tapped to open the Mode sheet:

~~~ mode-chip
CASUAL
COMPETITION
~~~

Right, the menu control: `MENU`, three-bar glyph, 44px hit box.

**Readout.** The timer needs no label — it's the largest thing on the screen and its
state is carried entirely by color (idle/running/stopped/DNF, per typography.md). Two
rows beneath it, both reserved from first paint, both normally empty:

- The qualifier line carries exactly one of `PRACTICE · NO RECORD`, `+2`, or `DNF` —
  never more than one at a time, never a sentence. It sits touching the number it
  qualifies because that's what disqualifies it.
- The splits row: four `micro` labels, each over a `data` value.

~~~ splits-labels
CROSS
F2L      (with CFOP beneath it, in ink-32 — the scope tag)
OLL      (with CFOP beneath it, in ink-32 — the scope tag)
SOLVED
~~~

When a solve doesn't hold CFOP's order, `F2L` and `OLL` show `—` in place of a value,
labels intact. The explanation for that dash lives one tap away, in Solve detail — not
here, where there's no room to earn it honestly.

**The notation strip.** Before the first move, this slot shows the scramble, not a blank:

~~~ pre-move-strip
SCRAMBLE
~~~

...prefixed to the scramble notation itself (`R U2 F′ ...`). After the first move, the
label disappears and the strip becomes the live notation readout — no re-labeling, the
content itself signals the change. During a `Refused` state, the whole strip is replaced
for 1400ms by one of the five strings in `voice.md`'s refusal set.

**Control bar.** Undo, the move count, Hint — exactly as visual.md lays them out:

~~~ control-bar-copy
‹ UNDO

[count]
MOVES

HINT
PRACTICE
~~~

`HINT`'s second line is not a warning that appears after tapping — it is permanent, on
the button, before the first tap. This is the answer to "the practice flag has to be
legible before you tap, not after": the cost is printed on the control itself, the same
way `F2L` always carries `CFOP` beneath it, rather than a confirmation dialog the user
clicks through once and stops reading. Taking a hint doesn't change the button; it lights
the qualifier line, which is where the consequence actually lands for the rest of the
solve.

**The hint reveal.** The next-move token appears above the notation strip with its own
scope tag directly beneath it:

~~~ hint-token
[move]
SOLVER'S ROUTE
~~~

This is the honest-limitation line from `app.md`: the hint is a correct next move, but
it's the two-phase solver's move, not necessarily the one a CFOP or Roux solver reaches
from memory. It's permanent on every hint token, not a one-time tooltip, because the
limitation is true every time, not just the first.

**Competition: the hold-to-start zone.** The two circles quote a Stackmat's sensor pads
and need one small label above them the first few times a Competition solve is run,
since nothing else on screen explains what two blank circles are for:

~~~ hold-label
HOLD BOTH TO START
~~~

No text for the 8-second and 12-second inspection calls, and none for the lift itself —
those are the judge's calls a Stackmat gives as tones, not words, and colors.md already
carries the exact tone and color-inversion treatment for each threshold. Rendering them
as on-screen text would be narrating a sound that's doing its job.

**Refusals.** Full set and trigger mapping in `voice.md`.

**First-run overlay.** Two lines, dismisses on the first touch — which is also the
user's first real drag, so the lesson and the action are the same motion:

~~~ first-run
Drag a sticker to turn that layer.
Drag the background to look around.
~~~

## Mode sheet

Title `Mode`. Two rows, each a name and one line of what it costs or gives — tapping a
row selects it and closes the sheet, no separate confirm step. This exact copy is reused
verbatim in Settings → Timer mode; never write it twice.

~~~ mode-sheet
Casual
Scramble, solve, done. No inspection, no penalties.

Competition
The full ritual — inspection, +2 and DNF penalties, Ao5 and Ao12 — the way it's
actually judged.
~~~

## Menu sheet

Title `Menu`. Four rows, the app's four destinations:

~~~ menu-sheet
Records
Fastest, fewest moves, full history.

Daily
Today's scramble, and yesterday's best.

Patterns
Checkerboard, cube in a cube, superflip.

Settings
Palette, sound, timer mode, about.
~~~

## Records sheet

Title `Records`. Segmented control: `FASTEST | FEWEST MOVES | HISTORY` (set by design;
kept exact). In Competition mode, a small stat block sits above the segments — the only
place Ao5 and Ao12 appear:

~~~ averages-block
AO5
[value]
BEST [value]

AO12
NOT WCA
[value]
BEST [value]
~~~

`NOT WCA` is the scope tag for Ao12 — it sits under the label, not under the number, so
it reads as a fact about the format, not a caveat on any one result. Ao5 needs no tag; it
is the real thing.

The Fewest Moves segment carries its own one-line disclosure, sitting above the list —
this is the OBTM slice-cost disclosure and the not-real-FMC claim, done together in one
sentence rather than two separate warnings:

~~~ fewest-moves-disclosure
Scored in OBTM — quarter and half turns count once, slice turns count two, rotations
are free. Not competition FMC: no paper, no time limit, just what you actually turned.
~~~

**Row content.** Rank, result (with `+2`/`DNF` inline where earned), date. A history row
additionally carries a tag when it doesn't qualify for either board:

~~~ history-tags
PRACTICE
DNF
~~~

Same words, same case, as everywhere else they appear — a history row is never given its
own synonym for the same fact.

**Empty states**, one per segment, before any qualifying solve exists:

~~~ records-empty
Fastest:      Nothing timed yet. Your first solve sets the pace.
Fewest Moves: No solutions logged yet. Your first solve sets the count.
History:      No solves yet. Everything lands here after — practice and DNFs included.
~~~

## Solve detail

Opened from a row in History or a board. No literal "Solve Detail" title — the result is
its own headline, with the date as a small over-line above it (`AUG 26` — the same date
format as the row it was opened from).

~~~ solve-detail
[date, small, over the result]

17.65 + 2 = 19.65        (or, for a DNF-by-overrun solve: "DNF", with a small caption
                           beneath: "Started 17.4s into inspection.")

CROSS   [value]
F2L     [value]   CFOP
OLL     [value]   CFOP
SOLVED  [value]

[move count]
MOVES  OBTM

SCRAMBLE
[notation]

SOLUTION
[notation]
~~~

`PRACTICE · NO RECORD` appears here exactly as it does on the Solve screen, when
applicable, in the same slot relative to the result. Two footnotes sit directly under the
splits — never combined into one, since they answer two different questions:

~~~ solve-detail-footnotes
Standard (splits shown):
Cross and Solved hold for any method. F2L and OLL assume CFOP.

Unrecognised (splits show "—"):
This solve didn't progress in CFOP order, so F2L and OLL aren't shown.
~~~

## Daily sheet

Title `Daily`. Today's scramble (same `SCRAMBLE` label as the Solve screen — one label,
every place a scramble string appears), a `SOLVE` button, today's board, and yesterday's
best.

~~~ daily-sheet
TODAY
SCRAMBLE
[notation]

SOLVE

TODAY'S BOARD
[rows, or the empty state below]

YESTERDAY'S BEST
[result, or "No attempt yesterday."]
~~~

Empty state for today's board before the first attempt of the day:

~~~ daily-empty
Today's scramble is untouched. Solve it once to put a time on the board.
~~~

The per-device honesty line, placed under the board where it applies rather than as a
banner over the whole sheet:

~~~ daily-per-device
Per-device only. There's no server, so today's board is just yours.
~~~

## Patterns sheet

Title `Patterns`. Three rows — name, one line, and its own move record (never a time
record, and the row says so rather than just omitting a clock icon):

~~~ patterns-sheet
Checkerboard
Every face split into a checkerboard of two colors.
[best move count, or "Not solved yet."]

Cube in a cube
A smaller cube nested inside the frame of colors.
[best move count, or "Not solved yet."]

Superflip
Every corner solved, every edge flipped in place — the one position that needs
all twenty moves.
[best move count, or "Not solved yet."]
~~~

~~~ patterns-empty-secondary
Move count only — there's no time record for patterns.
~~~

Shown once, under whichever pattern is currently open, not repeated per row.

## Settings sheet

Title `Settings`. Four rows: Palette, Sound, Timer mode, About.

~~~ settings-rows
PALETTE
Cardinal — the classic Rubik's colors, retuned for the screen.
Universal — colorblind-safe. Same faces, different pigments.

SOUND
[on/off]
There's no vibration on iOS Safari. Sound carries what touch would — every turn,
tick, and refusal.

TIMER MODE
[reuses the exact Mode sheet copy above, verbatim]

ABOUT
~~~

## Palette preview

Live mini-cube, six swatches. Each swatch is labeled with the color a cuber already
knows, and the app's own name for it beneath, small:

~~~ palette-preview-cardinal
WHITE       YELLOW      GREEN       BLUE        ORANGE      RED
Chalk       Flare       Verde       Cobalt      Ember       Signal
~~~

~~~ palette-preview-universal
WHITE       YELLOW      GREEN       BLUE        ORANGE      RED
Bone        Amber       Cyan        Cobalt Deep Rust        Rose
~~~

Face assignments never move between palettes — the top row is always the same six
cuber-familiar color words in the same order, so switching palettes is legibly "the same
cube, retinted," never "a different cube." Commit buttons:

~~~ palette-commit
USE CARDINAL
USE UNIVERSAL
~~~

## About

Reached from Settings. The one place the full explanation lives — everywhere else stays
to one line because this exists.

~~~ about-copy
Quarter Turn plays by the WCA Regulations (current as of January 2025) wherever a real
cube would: fifteen seconds of inspection, the same +2 and DNF thresholds, and scrambles
that are genuinely random-state, not twenty random turns dressed up as one.

Three things it doesn't claim. Fewest Moves counts the length of a solution you actually
turned, in OBTM — the same metric real Fewest Moves competition uses, but there's no
paper and no sixty-minute limit, so it isn't competition FMC. Average of 12 is what
cubers use in practice, not a format the WCA runs; Average of 5 is the real one. And the
Cross, F2L, OLL and PLL splits assume you solve CFOP — Cross and Solved hold no matter
how you solve, but F2L and OLL are the wrong number if you solve Roux or ZZ, so a solve
that doesn't hold CFOP's shape shows no F2L or OLL at all rather than a wrong one.

Everything above lives on this phone. There's no account and no server, so none of it is
ranked against anyone else's.
~~~

## Browser-tab notice

Shown once, only when the app is opened in a Safari tab rather than from the home screen.
Names the actual conflict rather than letting the drag gestures fail silently and read as
a broken app, and its instruction matches the literal words on iOS's share sheet.

~~~ browser-tab-notice
Add this to your Home Screen.

In a browser tab, Safari's own edge-swipe fights the drag you use to turn the cube.
Installed, there's no browser chrome left to fight it.

Tap Share, then Add to Home Screen.

NOT NOW
~~~

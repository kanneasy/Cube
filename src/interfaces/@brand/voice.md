---
name: Voice & Terminology
type: design/voice
description: A cuber's own vocabulary, spoken precisely, by an instrument that is uninterested in entertaining you.
---

# Voice

**In one phrase: a Stackmat judge, not a coach.** Quarter Turn talks to someone mid-solve,
one thumb occupied, who already knows what F2L and DNF mean and will notice in three
words if the app is guessing. A judge doesn't cheer for you, doesn't apologize to you,
and doesn't explain the rules unless you ask — they call the number, call the penalty,
and get out of the way. That is this app's whole register.

The visual identity calls the Solve screen "precise, quiet, slightly severe, uninterested
in entertaining you." The words follow the same brief. Every string on this transient
1400ms message or that empty-state line was written to be read once, one-handed, without
slowing anyone down.

## Who this is for

A speedcuber, or someone who wants to be one. They know the vocabulary already — this
app never defines "DNF" or "F2L" on the screen where those words appear, because
explaining a cuber's own terms back to them reads as condescension, not helpfulness. The
one full explanation lives in Settings → About, one level down, for the person who wants
it; everywhere else, the words are used correctly and left alone.

## Principles

1. **State the fact, then stop.** No hedging, no cheerleading, no "Nice!" after a solve —
   the number stopping is the reward, and it needs no caption. A refusal doesn't say
   "Oops, can't do that right now"; it says what's locked, in three words, and clears
   itself in 1400ms.
2. **Say the true trade before it's made, not after.** Where a choice costs the user
   something — a hint costing eligibility — the cost is a permanent label on the
   control, not a modal they click through once and forget.
3. **One honest line beats a wall of disclaimers.** Every claim this app doesn't fully
   earn (not real FMC, not a WCA format, CFOP-only splits) gets exactly one short line,
   placed on the number it qualifies, never a paragraph of legal hedging. The full,
   unhurried explanation lives in exactly one place — Settings → About — so nothing else
   has to carry it.
4. **Proximity is the rule, not styling.** A qualifier sits touching the number it
   changes. `PRACTICE · NO RECORD` sits directly under the time it disqualifies. The
   OBTM line sits on the Fewest Moves board, not buried in a help menu.
5. **Never introduce a second word for a thing that already has one.** One term per
   concept, used identically on the Solve screen, in a sheet, and in a toast. Drift
   between "solve" and "attempt," or "best" and "PB," is a legitimacy leak in an app
   whose entire premise is that its numbers mean what they say.
6. **No exclamation points, no emoji, no "Oops."** Nothing here is a game show. Errors
   are calm and say what to do next; there usually isn't an error, because there's no
   network and no account to fail.

## The scope tag — a device, used on purpose, four times

The single recurring voice pattern in this app: a short label, and directly beneath it
in the smallest type on the page, the one word that admits its limit. It's how the app
states a scope limit *affirmatively* instead of burying it in a tooltip or hiding it
until someone hits it.

~~~ scope-tag-instances
F2L      -> CFOP           (design's, on the Solve readout and Solve detail — a CFOP-shaped split)
HINT     -> PRACTICE       (control bar — this button always costs eligibility, before it's tapped)
[move]   -> SOLVER'S ROUTE (the revealed hint token — it's a correct move, not necessarily yours)
AO12     -> NOT WCA        (Records — a real number, not an official format)
~~~

The same two-line shape (`MOVES` under the move count, `BEST` under an average) is used
elsewhere for plain description, not disclosure — the scope tag specifically is reserved
for the four honesty admissions above. Don't add a fifth without a real new limitation to
name; don't use the shape decoratively.

## Terminology

Use the left column, everywhere, always. Never the right column.

| Say this | Never this | Why |
|---|---|---|
| solve | attempt, try, run | The app's own word throughout `app.md`; WCA says "attempt," this app says "solve" — consistent, not wrong |
| turn (verb) / move (counted noun) | tap, click, twist | "Turn" is the gesture, "move" is what the counter counts — see Moves section below |
| orbit | rotate the view, spin, pan | Reserved for the whole-cube camera drag, so it's never confused with a face turn |
| scramble | shuffle | "Shuffle" implies random moves, which this app specifically doesn't do |
| records | leaderboard, high score, rankings | There's no server and no one else's number to rank against — "leaderboard" overclaims a social feature that doesn't exist |
| best single / best average | best time, PB (alone) | "Best time" is genuinely ambiguous to a cuber; always qualify which kind of best |
| Practice | disqualified, invalid, void | A hint is a trade the user chose, not a violation — the word can't sound punitive |
| +2 / DNF | penalty (as a number), fail / failed | Use the WCA's own marks, exactly. "Fail" mislabels a DNF, which has one specific cause here: starting a solve after 17 seconds of inspection |
| Undo | back, redo (it isn't) | Undo only ever steps backward one move; don't imply a forward action exists |
| Add to Home Screen | install the app | This is the literal words on the iOS share sheet — instructional copy has to match what's actually on the user's screen, or it reads as broken |

## Numbers and notation

These belong to typography.md and app.md; voice only enforces that copy never
contradicts them.

- Prime mark is `′` (U+2032). `R U R′ U′` — never a typewriter apostrophe.
- A penalized result reads exactly `T + X = F` — e.g. `17.65 + 2 = 19.65`. Never add a
  label ("Time:", "Penalty:") to this line; a cuber reads this format on sight, and
  labeling it over-explains to the one audience that needs it least.
- A DNF replaces the result outright — it is never averaged into an equation. Show `DNF`
  alone; if the cause is worth surfacing (inspection ran past 17 seconds), say so as a
  small caption underneath, not folded into the headline.
- "Truncated" and "rounded" are different words for different operations (a single
  result truncates, an average rounds) — never use one to describe the other, even in
  passing prose.

## Register by surface

- **The Solve screen.** Fewest possible words. States and refusals are three words or
  fewer where they can be. This is the instrument face — it reads like a plate, not a
  page.
- **Sheets (Records, Daily, Patterns, Settings).** Dense and tabular, per visual.md, but
  the copy can breathe a little more than the Solve screen — a one-line explainer per
  row is fine here; a whole paragraph still isn't.
- **Settings → About.** The one place the full, unhurried explanation lives — what the
  app claims, what it doesn't, and why. Sentence case, full sentences, no shouting caps.
  Nothing anywhere else needs to re-explain what's said here once.
- **Errors.** There is almost no server to fail against, so most "errors" are locks, not
  failures — see the refusal set below. A genuine error (a local write failed) states
  what happened and what to try, never a raw exception and never an apology.
- **Empty states.** Point at the action, never apologize for having nothing to show. "No
  solves logged yet" plus what fills it, never "No results found."

## Refusal reasons — the transient 1400ms message

Visual.md names three broad states where a drag is refused: after a solve or pattern
is complete, during competition inspection, and during the hold-to-start. Grounding
those in the app's actual state machine gives **six real triggers, five distinct
strings** — a completed solve and a completed pattern intentionally share one string,
because `app.md` treats "solved" as the same predicate for both and the copy shouldn't
invent a distinction the logic doesn't have. A DNF from an inspection overrun is *not*
a drag refusal — nothing was touched, so it's carried entirely by the timer's own
color-and-fill treatment in colors.md, not by a strip message.

~~~ refusal-copy
INSPECTING · NOT YET     — drag attempted before the hold-to-start (Competition)
STILL HOLDING            — drag attempted while both fingers are down on the start pads
SOLVED · LOCKED          — drag attempted after a solve OR a pattern reaches its target
SCRAMBLING               — drag attempted while the cube is auto-turning itself
UNDOING                  — drag attempted while a queued undo is still resolving
~~~

All uppercase, Supreme 700, the exact rendered string — matching how every other label
in this app (`CASUAL`, `MOVES`, `SCRAMBLE`) is authored directly in caps rather than
relying on a CSS transform.

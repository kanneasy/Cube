---
name: Copy the Solve
type: roadmap
status: not-started
description: One tap turns any saved solve into real WCA notation you can paste anywhere cubers talk.
effort: quick
---

**As** a cuber who wants a second opinion on a solve **I want** to copy its full move
sequence in standard WCA notation **So that** I can paste it into a forum or an alg site
without retyping every turn by hand.

The notation strip already shows this while you solve; Copy the Solve just makes any
saved solve's full sequence copyable in one tap, in the same letters-primes-twos
vocabulary every cuber already reads. Scramble and solution both, so a shared solve is
reproducible by anyone who reads it.

## What it looks like
- A "copy notation" action on any solve in history, the daily board, or a record board
- Copies both the scramble and the solution, clearly separated
- Confirms the copy with a brief, quiet toast, matching the app's tone

## Key details
- Output format matches Regulation 12a1 exactly: face letters, a prime for
  counter-clockwise, a two for a half turn
- Slice-style moves the user actually made need a decision at build time: expand to
  their equivalent face-turn notation (since M/E/S aren't official notation), or mark
  them clearly as community shorthand
- Practice and DNF solves can still be copied; only record eligibility is affected by
  those flags, never exportability

~~~
Implementation notes: pure string formatting over the existing move log; no new state
or storage. Clipboard API only — no share-sheet dependency needed for this item.
~~~

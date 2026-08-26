---
name: Redo From Here
type: roadmap
status: not-started
description: Jump into a past solve at the exact moment it went wrong and drill that stretch until it doesn't.
effort: large
---

**As** a cuber who keeps fumbling the same part of a solve **I want** to jump into a
past solve at the exact moment before it went wrong and try that stretch again from the
same cube state **So that** I can drill exactly the part that's actually holding me back
instead of re-scrambling and hoping the next attempt goes better.

This is what Watch It Back is for once it stops being passive. Pick any point in a past
solve's replay and branch: the cube resets to that exact state, live and interactive,
and you solve forward from there as many times as you want, timed and counted
independently of the original. It turns "I always mess up this one transition" into an
actual practice loop instead of a feeling.

## What it looks like
- From replay, a "practice from here" action at any move index
- The cube becomes interactive at that state; a small independent timer and counter track just this drill
- Repeat instantly: reset to the same branch point again with one tap
- Drill attempts are recorded separately from full solves — they never enter the fastest or fewest-moves boards, and never touch an average

## Key details
- The branch point is a full cube state, not a resumed move log — computed by replaying
  the stored moves up to that index
- A drill session is disposable by default; nothing about it is presented as a real solve
- Works from any solve in history, not only the daily scramble

~~~
Implementation notes: state-at-index is already computable via the same simulator stage
splits use. The interactive-from-arbitrary-state path likely reuses the main solve
engine with a different starting state and a separate recording namespace — worth an
architecture gut-check before building, since it touches the core solve/record flow
twice over.
~~~

---
name: Your Bottleneck
type: roadmap
status: not-started
description: The app names your single slowest stage instead of leaving you to guess.
effort: small
---

**As** a cuber who wants to get faster **I want** the app to tell me which stage is
actually costing me the most time on average **So that** I know what to practice
instead of guessing from memory.

Every solve already produces a stage split. Your Bottleneck is the first aggregate read
on all of them: after enough solves, the app names your single slowest stage on
average, in your own detected method's vocabulary, instead of leaving you to eyeball a
screen of numbers solve by solve.

## What it looks like
- A single, clear callout: "Your slowest stage: F2L, averaging 14.2s" (or the
  equivalent for the user's detected method)
- Only appears once there's enough data behind it to mean something, and says so
  honestly rather than guessing early
- Sits near the records, not buried in a settings screen

## Key details
- Averages here are simple means over recent solves, not WCA-style trimmed averages —
  a different, clearly-labelled statistic from the timer's Ao5/Ao12
- Depends on Your Stages, Not CFOP's to be honest for non-CFOP solvers; can ship
  CFOP-only first with the same scoping caveat v1's splits carry

~~~
Implementation notes: pure aggregation query over already-stored stage-split data; no
new capture needed.
~~~

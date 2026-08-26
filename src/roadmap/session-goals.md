---
name: Set a Target
type: roadmap
status: not-started
description: Set a time goal for your weakest stage and watch each solve chase it live.
effort: medium
---

**As** a cuber working on a specific weakness **I want** to set a target time for my
slowest stage and watch my recent attempts against it **So that** a practice session
has a concrete goal instead of just being "more solves."

Once the app can name your bottleneck and show its trend, the natural next step is
letting you aim at it. Set a target time for a stage, and every solve during that
session shows live progress against it — met, missed, by how much — turning a vague
"get better at F2L" into a number to chase.

## What it looks like
- Set a target time for any stage the app tracks for the user's method
- During a session, each solve's relevant stage split is shown against the target, met or missed
- A lightweight session summary: how many attempts hit the target, out of how many

## Key details
- Targets are personal and private; nothing here is a public challenge or a comparison
  to another cuber
- Pairs naturally with Drill the Case for stages where a specific weak algorithm is the
  actual bottleneck, though the two ship independently

~~~
Implementation notes: small addition to session state and the existing stage-split
display; no new detection work required.
~~~

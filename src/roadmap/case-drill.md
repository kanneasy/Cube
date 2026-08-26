---
name: Drill the Case
type: roadmap
status: not-started
description: Set the cube to any OLL or PLL case on demand and time just that algorithm.
effort: medium
---

**As** a cuber trying to get faster at one specific case **I want** to drill just that
case — set up instantly on the cube, timed on its own **So that** I can get fast at a
weak algorithm without waiting for it to come up naturally in a real solve.

Redo From Here drills a stretch you actually hit. Drill the Case drills any case you
choose, on demand — a specific OLL, a specific PLL, or "surprise me with one I haven't
seen in a while." The cube sets itself up already in that case, mid-last-layer, and
times just the execution.

## What it looks like
- A case picker, by name or by picture, using cuber-standard case naming
- The cube resets already in the chosen case, ready to execute
- Its own small best-time board per case, separate from the main records
- An optional spaced mode that favors cases drilled less recently or proven slowest

## Key details
- Case setups are generated the same principled way scrambles are, not hand-authored
  per case, so the set stays complete and correct
- Timing starts on first move exactly like casual mode; no inspection ritual here
- Case drills never touch the daily board or the all-time records — their own space

~~~
Implementation notes: needs a real OLL/PLL case dataset (57 OLL, 21 PLL, canonical
naming). Consider adopting an existing open case-list/algorithm database rather than
hand-typing 78 algorithms. A researcher pass on case naming and imagery conventions is
worth doing before building the picker UI.
~~~

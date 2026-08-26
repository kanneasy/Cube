---
name: The Hint That Stays On Your Line
type: roadmap
status: not-started
description: A hint that continues in your method instead of handing you the machine's route.
effort: large
---

**As** a cuber stuck mid-solve **I want** a hint that continues in the method I'm
already solving with **So that** taking one unsticks me without putting my cube on a
line I can't finish from memory.

This is the honest gap v1 ships with, named plainly in the spec: the hint today answers
with the two-phase solver's route, which is correct but foreign — it's not how a human
continues a CFOP or Roux solve from memory. This item makes the hint search for a next
move that's consistent with the method already detected in the partial solve so far, so
a hint feels like a nudge along your own path rather than a swap onto someone else's.

## What it looks like
- Mid-solve, the app reads the moves made so far, infers the method in progress, and
  constrains the hint's search to a continuation that stays in that method's shape
- If no method is confidently detected yet — early in a solve, say — the hint falls
  back to today's honest solver-path hint, and says so
- The honest-limitation notice from v1 updates to reflect when a route-true hint was
  actually given versus when it fell back

## Key details
- This is a materially harder search problem than v1's hint: not "find any solution"
  but "find a continuation consistent with a specific method's remaining steps," which
  may need per-method heuristics rather than one generic solver call
- A wrong method guess mid-solve is worse than no guess at all — the fallback path
  matters as much as the happy path

~~~
Implementation notes: architecture scoping strongly recommended before build. This may
require per-method solving strategies (e.g., a Roux-aware CMLL/LSE solver) beyond what
cubing.js's two-phase solver gives for free. Budget as a real research-and-build item,
not a small extension of the existing hint.
~~~

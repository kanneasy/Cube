---
name: Know Your Method
type: roadmap
status: not-started
description: The app quietly learns to tell a Roux solve from a ZZ solve from a CFOP solve.
effort: medium
---

**As** a cuber who doesn't solve CFOP **I want** the app to recognize that my solve was
a Roux or ZZ solve **So that** its analysis is telling me something true about how I
actually solve, not silently assuming everyone uses CFOP.

Stage splits ship in v1 honest about their limit: cross and solved are true for anyone,
F2L/OLL/PLL are a CFOP-shaped read on a solve. Know Your Method is the foundation that
fixes this at the root — reading a completed move log and recognizing its shape: did it
build a cross, then pairs, then orient, then permute, or did it block-build two sides
and finish with CMLL and LSE, or line up edges first. It doesn't change the split screen
by itself; it labels the solve honestly and makes the next two items possible.

## What it looks like
- Each completed solve is quietly tagged with its detected method shape: CFOP, Roux, ZZ, or unclassified
- The tag sits somewhere unobtrusive in solve history, not front-and-center
- Unclassified is a legitimate, honestly-shown outcome for a solve that doesn't fit cleanly, or a mixed/freestyle solve

## Key details
- Detection runs on the same stable, backward-scanned predicates the CFOP splits
  already use, extended with equivalent predicates for Roux (first block, second block,
  CMLL, LSE) and ZZ (EOLine, blocks, last layer)
- This item deliberately ships with no visible change to stage splits or hints; it
  exists to be built on
- Needs its own research pass, at the same rigor the original CFOP predicates got,
  since Roux/ZZ boundaries were never vetted the way CFOP's were

~~~
Implementation notes: architecture and researcher gut-check recommended before build —
this is genuinely new predicate work, not a UI change. Reuse the backward-scan
detection pattern already proven for CFOP (last stable moment a predicate holds, not
the first accidental instant).
~~~

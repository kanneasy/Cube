---
name: Your Stages, Not CFOP's
type: roadmap
status: not-started
description: Roux and ZZ solvers finally get their own honest stage-by-stage breakdown.
effort: medium
---

**As** a Roux or ZZ solver **I want** to see my own stages timed the way a CFOP solver
sees cross, F2L, OLL, and PLL **So that** the breakdown tells me where my seconds
actually go instead of showing me two blank marks.

Once a solve is fingerprinted, the split screen stops defaulting to CFOP's shape for
everyone. A Roux solve shows first block, second block, CMLL, LSE. A ZZ solve shows
EOLine, blocks, last layer. CFOP solves look exactly as they do today. Unclassified
solves still show only cross and solved, honestly, rather than force-fitting a label
that doesn't apply.

## What it looks like
- The split screen reads the method tag and renders the matching stage set
- Each method's stages get their own honest label, the same way CFOP's are labelled today
- Method-specific splits get their own place in the trend data that The Numbers That Matter lane depends on

## Key details
- No solve is ever shown a split its method didn't actually produce
- The backward-scan detection discipline (last stable moment, not first accidental one)
  applies identically across every method

~~~
Implementation notes: mostly a rendering and lookup change once Know Your Method
exists — the harder work already happened in that item.
~~~

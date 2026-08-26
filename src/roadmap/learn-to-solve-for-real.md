---
name: Learn It On Your Own Cube
type: roadmap
status: not-started
description: A full guided solve, on your own scramble, one route-true hint at a time.
effort: large
---

**As** a cuber who wants to actually learn a method, not just get unstuck once **I
want** a string of route-true hints that walks me through a full solve on my own
scrambled cube **So that** I can learn to solve for real, in the method I'm actually
working on, instead of memorizing an abstract lesson that isn't mine.

The plan chose the hint over a guided tutorial for v1, and predicted correctly that the
hint machinery would be most of what a tutorial needs. Once hints stay on a chosen
method's line, chaining them into a full walkthrough is the natural next step: pick a
method to learn, and every hint continues the last one until the cube is solved, on
your actual scramble, not a demo cube.

## What it looks like
- A "walk me through it" mode: choose a method to learn, starting with whichever the
  app already detects well, and take one route-true hint after another until solved
- Each step names the stage it belongs to ("this is your cross," "this is F2L pair
  one"), tying directly into the split vocabulary the app already teaches
- A solve completed this way is clearly marked as guided — not practice-with-one-hint, and not a real solve

## Key details
- This item is only as good as The Hint That Stays On Your Line beneath it; it
  inherits that item's method-detection accuracy
- Should not gate on supporting every method at once — shipping CFOP-guided first and
  expanding later is a reasonable slice

~~~
Implementation notes: largely a UI and sequencing layer over the route-true hint
engine — the real cost already lives in that prior item.
~~~

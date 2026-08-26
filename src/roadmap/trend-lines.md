---
name: The Trend Line
type: roadmap
status: not-started
description: A simple chart of your stage times over recent solves, so progress is seen, not felt.
effort: medium
---

**As** a cuber tracking my progress **I want** to see my times trending over my recent
solves, per stage **So that** I can tell whether practice is actually working instead
of relying on how a session felt.

One number (Your Bottleneck) says what to work on; a trend line says whether working on
it is doing anything. A simple chart, per stage, over the last N solves — plateaus and
real improvement both become visible instead of felt.

## What it looks like
- A chart per stage (cross, and whichever further stages the user's method supports),
  plotted over recent solves
- A toggle between all solves and daily-scramble-only, since daily is the closest thing
  to a controlled comparison the app has
- No comparison to anyone else's numbers here; this is entirely about the user's own history

## Key details
- Practice solves and DNFs are visually distinguished on the chart rather than
  silently excluded or silently included
- This is squarely a personal-data visualization, not a public or social feature — it
  stays scoped that way even once The Shared Scramble lane exists

~~~
Implementation notes: straightforward client-side charting over existing solve
history; no new backend or storage need, since everything is already in IndexedDB.
~~~

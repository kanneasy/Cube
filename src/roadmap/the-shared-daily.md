---
name: Everyone's Scramble
type: roadmap
status: not-started
description: The daily scramble becomes one puzzle, shared by every cuber using the app.
effort: large
---

**As** a cuber who does the daily scramble **I want** today's puzzle to be the same one
every other user gets **So that** comparing my time against anyone else's is comparing
the same scramble.

The v1 daily scramble is honest about being per-device — there's no way for two phones
to agree on the same puzzle without something in the middle to hand it out. This item
is that something: one scramble per calendar day, generated once and served to
everyone, so "today's scramble" finally means what a cuber expects it to mean.

## What it looks like
- One scramble per date, generated server-side once and fetched by every installed app that day
- Falls back gracefully offline: without a connection, the app behaves exactly as v1's
  per-device daily scramble already does
- The daily board becomes meaningful across devices for the first time, laying the
  groundwork for Your People's Board

## Key details
- Depends on Your Records, Any Phone existing first, since a shared scramble with no
  account concept has nowhere to attribute a comparison to
- Scramble generation logic itself doesn't change — it's the same random-state
  generator, just run once centrally instead of once per device

~~~
Implementation notes: needs a minimal server that does exactly one job well (serve
today's scramble); resist scope creep toward a general backend until Your People's
Board actually needs one.
~~~

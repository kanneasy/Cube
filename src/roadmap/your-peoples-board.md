---
name: Your People's Board
type: roadmap
status: not-started
description: A tiny leaderboard for the daily scramble, scoped to the people you actually know.
effort: medium
---

**As** a cuber who does the daily scramble **I want** to see how a few specific people
I know did on today's puzzle **So that** the daily scramble is something we talk about
instead of something I only do alone.

The payoff of this lane, and deliberately the smallest possible version of "social":
not a public leaderboard, not a friends-of-friends discovery feed, just a board scoped
to the handful of people the user actually added, on the one puzzle they're all already
doing that day.

## What it looks like
- Add someone by a code or link, the same lightweight mechanism as device linking
- A small board, today's scramble only, ranked by the same rules as the app's own boards (fastest, fewest moves)
- No public profile, no discovery, and no notifications pushing you back in — checking is something the user chooses to do

## Key details
- Explicitly not a general social network; the ceiling on this feature is a handful of
  named people, by design
- If this list ever wants to grow past "people you know," that's a different, bigger
  bet and not one this item makes

~~~
Implementation notes: reuses the shared-daily infrastructure; mainly a scoped
read/write on top of it, plus the people-linking flow already built for Your Records,
Any Phone.
~~~

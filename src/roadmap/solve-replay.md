---
name: Watch It Back
type: roadmap
status: not-started
description: Scrub through any past solve and watch the cube turn itself, live, exactly the way you turned it.
effort: small
---

**As** a cuber who just finished a solve **I want** to watch it play back move by move
at my own pace, forward or backward, **So that** I can see exactly what I did without
trying to remember it.

Every solve already produces a full move log, because the stage splits require one.
Watch It Back turns that log into a cube that replays itself: scrub a timeline and the
cube turns through your actual solution, live, the same way it turned under your thumb
the first time. Jump straight to whichever stage took the longest and slow down just
that stretch.

## What it looks like
- A play/scrub control under any solve in history, including practice and DNF solves
- Playback speed control, including a frame-by-frame slow motion
- Tapping a stage split (cross, F2L, OLL, PLL, or a method's equivalent) jumps playback to the start of that stage
- Reachable from the record boards, the daily board, and full history alike

## Key details
- Replay reads the stored move log; it never re-runs the solver
- Undo events from the original solve are not replayed as moves — they were already removed from the log when they happened
- Every solve ever recorded is replayable, not just recent ones

~~~
Implementation notes for the building agent: reuse the existing move log and cube-state
simulator; scrub is index-driven over stored moves. Move counts stay well under 100, so
a simple timeline component is enough — no need for virtualization or windowing.
~~~

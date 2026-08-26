---
name: The Whole Cube
type: roadmap
status: in-progress
description: The full competition-legal 3x3x3 — drag to turn, two timer modes, real penalties, records, hints, a daily scramble, three patterns, and stage splits — the whole app in one build.
effort: large
---

The complete v1 as scoped and approved in `.builder-plan.md`: a WebGL 3x3x3 you turn by
dragging your thumb across it, timed the way a competition times it, with an honest
record of every solve. No server, no account — everything lives in IndexedDB on the
phone it was solved on. This item is the whole first build; it fails Independent and
Small as one story, so it splits into the ten stories below, each shippable and
gate-checked on its own.

Scenario titles only below — the Given/When/Then bodies get written during design and
build, per `~/builder/.claude/knowledge/acceptance-criteria.md`. Each is tagged with the
verifier that proves it.

## Stories

### 1. Turn the Cube

**As** a cuber picking up my phone **I want** to press a sticker and drag to turn that
layer live under my thumb, releasing into the nearest quarter turn, **So that** turning
feels like handling a real cube instead of tapping a button pad.

Acceptance scenarios:
- Pressing a sticker and dragging rotates that layer live, following the thumb in real time — @qa
- Releasing mid-drag snaps the layer into the nearest quarter turn — @qa
- A quick flick commits the turn immediately, before release — @qa
- Dragging the background orbits the whole cube and is never logged as a move — @qa
- Each turn plays a distinct sound, the only tactile feedback since iOS gives none — @qa
- The rendered cube reads as flat, saturated, hard-edged color, not glossy plastic — @design-critic
- Turning and orbiting feel natural and satisfying on a real installed iPhone, not just in a browser tab — @user

### 2. Casual Solve

**As** a cuber who just wants to solve **I want** a competition-legal scramble and a
clock that starts on my first move and stops the instant I finish, **So that** nothing
stands between me and cubing.

Acceptance scenarios:
- A new casual scramble is random-state and at least two moves from solved — @tests
- The clock reads zero and idle until the first move is made — @qa
- The clock starts on the first turn, not on scramble reveal — @qa
- The clock stops the instant the cube reaches solved state, ignoring center orientation — @qa
- Casual is the default mode on first launch — @qa

### 3. Competition Solve

**As** a cuber who trains seriously **I want** the real inspection-and-penalty ritual,
**So that** my competition-mode times mean exactly what they'd mean at a real
competition.

Acceptance scenarios:
- Revealing the scramble starts a 15-second inspection countdown — @qa
- Starting the solve at 15.00 seconds or later into inspection applies a +2 penalty — @tests
- Starting the solve at 17.00 seconds or later into inspection results in a DNF — @tests
- Holding two fingers down and lifting them both starts the clock and the solve in the same instant — @qa
- A single result displays truncated to hundredths, never rounded — @tests
- Average of 5 and average of 12 compute as trimmed means and go DNF only when 2 or more DNFs are present in that window — @tests

### 4. Moves, Notation & Undo

**As** a cuber checking my efficiency **I want** a live move counter and notation
readout with full undo, **So that** my move count always reflects the solution I
actually ended up with.

Acceptance scenarios:
- Every face turn appends its standard notation (letter, prime, or two) to the strip in real time — @qa
- Undo reverses exactly one move, replaying the cube backward — @qa
- Undo decrements the move counter while the clock keeps running — @qa
- Undo can be repeated back to the first move of the solve, and is a no-op at zero moves — @tests
- A slice-style drag charges two moves toward the counter, matching Outer Block Turn Metric — @tests
- Undo is unavailable once the cube is solved and the clock has stopped — @qa

### 5. Records & History

**As** a cuber who wants proof of progress **I want** top-five boards for speed and for
fewest moves plus a full history, **So that** I can see how I'm actually improving over
time.

Acceptance scenarios:
- A qualifying solve enters the top-five fastest board in the correct rank position — @qa
- A qualifying solve enters the top-five fewest-moves board, counted in OBTM — @qa
- A hinted or DNF solve never enters either record board — @tests
- Every solve, including practice and DNF solves, appears in the full history, clearly marked — @qa
- A personal best is always labelled as best single or best average, never an unqualified best time — @design-critic

### 6. Hints

**As** a cuber stuck mid-solve **I want** a hint that reads my cube and shows me only
the next turn, **So that** I can get unstuck without the app just solving it for me.

Acceptance scenarios:
- Requesting a hint reveals exactly one next turn, not a full solution — @qa
- Taking a hint immediately marks the solve as practice, visibly, from that moment on — @qa
- A practice-marked solve is excluded from both record boards and from the averages — @tests
- The hint's known limitation — that it follows the solver's route, not the user's method — is stated where hints are offered — @design-critic

### 7. Daily Scramble

**As** a cuber building a habit **I want** one fixed scramble per day with its own small
board, **So that** today is something I can be measurably better at than yesterday.

Acceptance scenarios:
- The first open of a new calendar date generates and persists that day's scramble — @tests
- Every attempt that same date reuses the identical persisted scramble — @tests
- The daily board shows only that date's attempts, separate from the all-time boards — @qa
- Yesterday's daily attempt remains visible next to today's new scramble — @qa

### 8. Pattern Challenges

**As** a cuber who wants a change of pace **I want** checkerboard, cube-in-cube, and
superflip as alternate goal states, **So that** I have something efficient to solve
toward besides a plain scramble.

Acceptance scenarios:
- Selecting a pattern sets the cube to that pattern's exact target arrangement — @tests
- Reaching a pattern's target state is detected the same way a solved cube is — @qa
- Each pattern keeps its own fewest-moves record and no time record — @qa

### 9. Stage Splits

**As** a cuber who wants to know where my seconds go **I want** automatic cross, F2L,
OLL, and PLL splits inside each solve, **So that** I can see my breakdown without doing
the math myself.

Acceptance scenarios:
- Cross completion is detected at the last stable moment it holds, not the first accidental instant — @tests
- The cross face is inferred from whichever color's cross completes and survives to the end, not assumed to be white — @tests
- F2L, OLL, and PLL splits are shown labelled as CFOP-oriented stages — @design-critic
- A solve that doesn't progress in CFOP shape shows only the cross and solved marks, suppressing F2L/OLL/PLL rather than a wrong number — @tests
- Undo before a stage boundary correctly removes that stage's recorded split — @tests

### 10. Install & Offline

**As** a cuber who wants this on my home screen **I want** the app to install like a
real app and work with no network at all, **So that** it's always right there when I
want to solve.

Acceptance scenarios:
- Adding the app to the home screen uses the final icon set, present before install — @image
- The installed app launches full-screen with no browser chrome, in standalone display mode — @qa
- The app loads and functions with the network fully disabled — @qa
- Launching from a plain Safari tab, not installed, shows a one-time notice about installing — @qa
- A new service worker update never swaps code under a running session; it prompts rather than auto-activates — @tests

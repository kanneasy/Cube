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

> Three scenario titles here were rewritten at pickup, on 2026-08-26, because building
> the detector disproved the behaviour they described. They originally called for
> scanning backward for the last stable moment each stage holds, and for showing the
> cross and solved marks when a solve is not CFOP-shaped. Every last-layer algorithm
> breaks the first two layers partway through and restores them, so a backward scan
> reports F2L complete from inside the last-layer algorithm on every real solve. And a
> partial set of marks is still a confident claim about a solve the app did not
> understand. See `src/app.md` and the commit that corrected the spec.

**As** a cuber who wants to know where my seconds go **I want** automatic cross, F2L,
OLL, and PLL splits inside each solve, **So that** I can see my breakdown without doing
the math myself.

Acceptance scenarios:
- Cross completion is detected at its real boundary, not pushed into the last-layer algorithm that temporarily breaks it — @tests
- The cross face is inferred from whichever color yields a properly ordered CFOP shape with the earliest cross, not assumed to be white — @tests
- F2L, OLL, and PLL splits are shown labelled as CFOP-oriented stages — @design-critic
- A solve that doesn't progress in CFOP shape is reported as unrecognised with no stage times at all, rather than a partial set of confident wrong ones — @tests
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

---

## Gate verdict — 2026-08-26

Every scenario went to its tagged verifier. 239 tests, the detector, `qa` on the running
app, `code-reviewer` on `dist/`, `design-critic` on the rendered UI, and the image gate.

**One open FAIL and one gap in how this was gated**, both stated before the passes:

- Story 9's *"F2L, OLL, and PLL splits are shown labelled as CFOP-oriented stages"* is a
  **FAIL** and is left open. The screen shows `CROSS · F2L (CFOP) · OLL (CFOP) · SOLVED`,
  which is what `visual.md` specifies and argues for: Cross and Solved are true of any
  solve however it was solved, F2L and OLL are CFOP's model of one, and all four are
  moments rather than phases. Naming the last moment `PLL` would assert CFOP for the one
  mark that holds regardless of method. The implementation is right and the scenario's
  wording is the thing out of step — but changing a scenario after its story is picked up
  is a scope change and belongs to the user, so it is recorded as a FAIL rather than
  edited to match. `web.md` contradicted itself on the same point and has been corrected.

- **Story 1's `@qa` scenarios were never sent to `qa`.** That is an authoring miss in the
  handoff, not a verifier failure. They are marked below by what actually proved them:
  the gesture suite drives real pointer events through the real `CubeGestures` with an
  injected scheduler, which is stronger than a screenshot for a commit that happens at
  the end of a spring — but it is not the same as `qa` walking the flow, and it is not
  claimed to be.

### 1. Turn the Cube — 7 scenarios, 5 passed, 1 not gated, 1 for the user

| Scenario | Verifier | Verdict |
|---|---|---|
| Pressing a sticker and dragging rotates that layer live, following the thumb in real time | @tests (not @qa — see above) | **PASS** — `gestures.commit.test.ts` asserts >3 live layer updates before any commit; also observed mid-drag in the browser |
| Releasing mid-drag snaps the layer into the nearest quarter turn | @tests | **PASS** — commits one quarter turn once the spring settles; a sub-45° slow drag releases without turning |
| A quick flick commits the turn immediately, before release | @tests | **PASS** — 30px over two 4ms steps commits |
| Dragging the background orbits the whole cube and is never logged as a move | @tests | **PASS** — orbit never calls `onCommit`; `obtmCost` never sees a rotation |
| Each turn plays a distinct sound, the only tactile feedback since iOS gives none | — | **NOT GATED** — three synthesised layers with per-strike variation exist and are wired to the detent, snap and refusal, but no verifier here can hear them |
| The rendered cube reads as flat, saturated, hard-edged color, not glossy plastic | @design-critic | **PASS** — flat per-face colour, hard grid lines, zero specular/gradient/AO |
| Turning and orbiting feel natural and satisfying on a real installed iPhone | @user | **OPEN** — only a thumb on real hardware can answer this |

### 2. Casual Solve — 5 scenarios, 5 passed

| Scenario | Verifier | Verdict |
|---|---|---|
| A new casual scramble is random-state and at least two moves from solved | @tests | **PASS** |
| The clock reads zero and idle until the first move is made | @qa | **PASS** — `0.00`, phase `ready` |
| The clock starts on the first turn, not on scramble reveal | @qa | **PASS** |
| The clock stops the instant the cube reaches solved state, ignoring center orientation | @qa | **PASS** |
| Casual is the default mode on first launch | @qa | **PASS** |

### 3. Competition Solve — 6 scenarios, 6 passed

| Scenario | Verifier | Verdict |
|---|---|---|
| Revealing the scramble starts a 15-second inspection countdown | @qa | **PASS** |
| Starting the solve at 15.00s or later applies a +2 | @tests | **PASS** — boundary-exact at 14.999 / 15.000 |
| Starting the solve at 17.00s or later results in a DNF | @tests | **PASS** — boundary-exact at 16.999 / 17.000 |
| Holding two fingers and lifting both starts the clock and the solve in the same instant | @qa | **PASS** — re-verified live after the same-tick contact fix |
| A single result displays truncated to hundredths, never rounded | @tests | **PASS** |
| Ao5 and Ao12 are trimmed means, DNF only at 2+ in the window | @tests | **PASS** — counted before trimming |

### 4. Moves, Notation & Undo — 6 scenarios, 6 passed

| Scenario | Verifier | Verdict |
|---|---|---|
| Every face turn appends its standard notation to the strip in real time | @qa | **PASS** |
| Undo reverses exactly one move, replaying the cube backward | @qa | **PASS** |
| Undo decrements the move counter while the clock keeps running | @qa | **PASS** — 3→2 moves, clock 9.67→17.14 |
| Undo can be repeated back to the first move, and is a no-op at zero | @tests | **PASS** |
| A slice-style drag charges two moves, matching OBTM | @tests | **PASS** |
| Undo is unavailable once the cube is solved and the clock has stopped | @qa | **PASS** |

### 5. Records & History — 5 scenarios, 5 passed

| Scenario | Verifier | Verdict |
|---|---|---|
| A qualifying solve enters the top-five fastest board in the correct rank position | @qa | **PASS** — after fixing the duplicate write that was contaminating both boards |
| A qualifying solve enters the top-five fewest-moves board, counted in OBTM | @qa | **PASS** — a slice pattern charged 6 for `M2 E2 S2` |
| A hinted or DNF solve never enters either record board | @tests | **PASS** |
| Every solve, including practice and DNF, appears in the full history, clearly marked | @qa | **PASS** |
| A personal best is always labelled best single or best average, never an unqualified best time | @design-critic | **PASS** |

### 6. Hints — 4 scenarios, 4 passed

| Scenario | Verifier | Verdict |
|---|---|---|
| Requesting a hint reveals exactly one next turn, not a full solution | @qa | **PASS** |
| Taking a hint immediately marks the solve as practice, visibly, from that moment | @qa | **PASS** |
| A practice-marked solve is excluded from both record boards and from the averages | @tests | **PASS** |
| The hint's known limitation is stated where hints are offered | @design-critic | **PASS** — `SOLVER'S ROUTE` under the token, `PRACTICE` on the button before it is tapped |

### 7. Daily Scramble — 4 scenarios, 3 passed, 1 for the user

| Scenario | Verifier | Verdict |
|---|---|---|
| The first open of a new calendar date generates and persists that day's scramble | @tests | **PASS** |
| Every attempt that same date reuses the identical persisted scramble | @tests | **PASS** — also re-verified live |
| The daily board shows only that date's attempts, separate from the all-time boards | @qa | **PASS** |
| Yesterday's daily attempt remains visible next to today's new scramble | @user | **OPEN** — needs a real second day |

### 8. Pattern Challenges — 3 scenarios, 3 passed

| Scenario | Verifier | Verdict |
|---|---|---|
| Selecting a pattern sets the cube to that pattern's exact target arrangement | @tests | **PASS** — structural checks, not a tautology |
| Reaching a pattern's target state is detected the same way a solved cube is | @qa | **PASS** |
| Each pattern keeps its own fewest-moves record and no time record | @qa | **PASS** |

### 9. Stage Splits — 5 scenarios, 4 passed, 1 FAILED

| Scenario | Verifier | Verdict |
|---|---|---|
| Cross completion is detected at its real boundary, not pushed into the last-layer algorithm | @tests | **PASS** |
| The cross face is inferred, not assumed to be white | @tests | **PASS** — chosen colour's cross is no later than every other candidate's |
| F2L, OLL, and PLL splits are shown labelled as CFOP-oriented stages | @design-critic | **FAIL — open.** See the note at the top of this verdict |
| A solve not in CFOP shape is reported as unrecognised with no stage times at all | @tests | **PASS** — also observed live: inverting a scramble returns `unrecognised` |
| Undo before a stage boundary correctly removes that stage's recorded split | @tests | **PASS** — added during this gate; it had no test |

### 10. Install & Offline — 5 scenarios, 3 passed, 2 for the user

| Scenario | Verifier | Verdict |
|---|---|---|
| Adding the app to the home screen uses the final icon set, present before install | @image | **PASS** — 28/32 after three attempts; opaque black and even margins verified by pixel sampling |
| The installed app launches full-screen with no browser chrome, in standalone display mode | @user | **OPEN** — the manifest declares it; only an iPhone can confirm it |
| The app loads and functions with the network fully disabled | @user | **OPEN** — 35 precached entries including the solver's wasm; not exercised offline here |
| Launching from a plain Safari tab shows a one-time notice about installing | @qa | **PASS** — now genuinely one-time and dismissible |
| A service worker update never swaps code under a running session; it prompts | @tests | **PASS** — config and the component that surfaces it are both asserted |

### Detector

**0 findings.** Down from 13. The only suppression is the standing kit-wide
`border-accent-on-rounded` waiver with its recorded reason; nothing project-specific is
hiding anything.

Worth recording: `design-critic` found five real P1s the detector structurally could not
see, including a 2.7:1 contrast failure on functional text that its own contrast rule did
not fire on. A clean detector run is a floor, not a verdict.

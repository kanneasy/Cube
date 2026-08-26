---
name: Quarter Turn
description: A competition-legal 3x3x3 Rubik's cube you solve with your thumb, on your phone, offline.
---

# Quarter Turn

A 3x3x3 Rubik's cube that lives on your iPhone home screen. You turn it by dragging its
faces, it times you the way a competition would, and it keeps an honest record of your
best solves. Everything runs on the device. There is no account, no server, and no
network requirement after the first load.

The app has one user: the person holding the phone. Every record is theirs and lives
only on their device.

## What legitimacy means here, and where it stops

The app claims its scrambles and its penalties are the real thing, and that claim is
checkable, so it is grounded in the actual World Cube Association Regulations rather
than in a general impression of them. `src/references/wca-legitimacy.md` carries the
regulation numbers and the quoted text; this spec carries the decisions.

Three claims the app is careful **not** to make, because it has not earned them:

- The fewest-moves board is not competition Fewest Moves. Real FMC is a single written
  solution found on paper inside sixty minutes. Ours is the length of a solution you
  actually turned. The counting metric matches (below), the discipline does not.
- The average of twelve is a community convention, not a WCA format. WCA never runs one.
- The stage splits describe a CFOP-shaped solve. They are labelled as such, because for
  a Roux solver they would be a wrong number rather than a rounding error.

## The cube

A standard 3x3x3 in the Western scheme, which cubers call BOY. Three opposite pairs:
white against yellow, green against blue, orange against red. At the corner where blue,
orange and yellow meet, those three run clockwise in that order seen from outside, which
is the check that a scheme is the conventional one rather than a mirror of it.

Home orientation is white on top and green in front. This is not an arbitrary choice: it
is the orientation the Regulations pin a scramble sequence to, so a scramble only means
what it says when it is applied from there.

~~~ cube-model
State is 20 movable cubies (8 corners, 12 edges) as permutation + orientation, plus 6
fixed centers. Centers are fixed because a solid-color center has no visible orientation.
Solved test ignores center orientation, matching experimentalSolve3x3x3IgnoringCenters.
~~~

A colorblind-safe palette is a first-class alternative, not an afterthought toggle. The
standard scheme's orange against green is the pair that defeats the most common form of
red-green deficiency, with orange against red close behind. Research found no palette the
community has converged on, so the values are derived rather than borrowed, and they are
design's to set.

## Moves and how they are counted

The turn vocabulary is the six face turns, each clockwise, counter-clockwise, or double.
Written the standard way: the six letters for the faces, a prime mark for
counter-clockwise, a two for a half turn.

~~~ notation
Faces: U D F B L R. Clockwise = bare letter. Counter-clockwise = letter + '.
Half turn = letter + 2. This is the complete WCA scramble and solution vocabulary
(Regulation 12a1).
~~~

Slice moves are reachable, because the gesture model makes them reachable: drag the
middle row of a face and the middle layer is what turns. Refusing to move under a real
drag would read as a broken cube. So they are allowed, and they are charged honestly.

**The move counter counts in Outer Block Turn Metric.** A face turn costs one whether it
is a quarter or a half turn. Rotating your view of the cube costs nothing, because a
rotation does not change the puzzle's state. A slice move costs **two**, because a slice
is exactly two outer turns and a free rotation, and charging it one would quietly make
the fewest-moves board incomparable to the metric the rest of the world uses. The app
says so where the number is shown rather than burying it.

~~~ obtm
Face turn (U, U', U2, ...) = 1. Slice turn (M, E, S and variants) = 2, since
M = R L' x', E = U D' y', S = F' B z, and a rotation is 0 under OBTM (Reg. 12a5).
View orbit = 0 and is never logged as a move.
~~~

Slice moves never appear in a scramble. WCA's notation does not define them for the
3x3x3 at all, which surprises most cubers, and official scrambles are face turns only.

## Undo

Undo steps back exactly one move and can be repeated to the first move of the solve.
It decrements the move counter and it does not touch the clock.

That combination is the whole design. Because the counter goes down, the number it ends
on is the length of the solution you actually arrived at, not a tally of everything you
tried, which is what makes the fewest-moves board mean something. Because the clock does
not stop, backtracking has a real price and the two boards pull against each other
exactly as they should.

An undo is not itself a move and is never written to the move log; it removes the last
entry. Undo is unavailable once the cube is solved and the clock has stopped.

## The timer

Two modes. The mode is a setting, not a per-solve choice, and it is remembered.

### Casual, the default

Scramble appears. The clock is at zero and idle. It starts on the first move you make
and stops the instant the cube reaches a solved state. Nothing else to do.

### Competition

The full ritual, to the Regulations.

Inspection begins when you reveal the scramble. You get strictly less than fifteen
seconds. The app calls eight seconds and twelve seconds the way a judge does.

To start you hold two fingers down; the clock starts the moment you lift them, and that
same lift is what starts the solve.

~~~ penalties
Inspection elapsed at the moment the solve starts:
  t < 15.00s          -> clean            (A3a1: "strictly less than 15 seconds")
  15.00 <= t < 17.00  -> +2 seconds       (A4d1, and A4d1+ makes exactly 15.00 penalised)
  t >= 17.00          -> DNF              (A4d2, and A4d2+ makes exactly 17.00 a DNF)
Recorded the way a score sheet reads: T + X = F, e.g. 17.65 + 2 = 19.65 (A7b1).
~~~

A solve is recorded with its raw time, its penalty, and its final result, and the
history shows all three rather than only the final number.

### Precision

A single result is **truncated** to hundredths of a second. An average is **rounded** to
hundredths. These are different operations and reusing one function for both is the
mistake the Regulations invite.

~~~ precision
Single: truncate toward zero at 2dp. 12.678 -> 12.67 (Reg. 9f1).
Average: round half up at 2dp (Reg. 9f2).
~~~

## Averages

Competition mode carries a rolling average of five and a rolling average of twelve
alongside the record boards.

An average in WCA's vocabulary is a **trimmed** mean: drop the best and the worst, take
the arithmetic mean of what is left. An untrimmed mean is called a mean, and the two
words are not interchangeable. The app uses them the way the Regulations do.

DNF handling is the part implementations get wrong. One DNF is permitted and becomes the
dropped worst result, so the average still computes from the remaining three. Two or more
DNFs make the whole average a DNF. This is a count-first rule, not a sort-and-drop rule.

~~~ averages
ao5(results):
  if count(DNF or DNS) >= 2 -> DNF          (Reg. 9f9, checked BEFORE trimming)
  else drop one best and one worst, mean the middle 3, round 2dp   (Reg. 9f8)
ao12: same shape, drop 1 from each end, mean the middle 10. Community convention
generalizing 9f9, not an official WCA format. Labelled as such in the UI.
~~~

A personal best is always qualified as a best single or a best average, never an
unqualified "best time", because in cuber vocabulary that phrase is genuinely ambiguous.

## Scrambles

Every scramble is random-state, in both modes. This is the app's central legitimacy claim
and it is a specific mechanism, not a synonym for random: a uniformly random cube state
is generated, a solution to it is found, and the inverse of that solution is the scramble.
Applying twenty random turns instead produces a biased and often too-easy distribution,
which is what most novelty cube apps ship.

Generation is adopted rather than written. Reimplementing a two-phase solver is a
multi-week correctness project and the ecosystem has a maintained one.

~~~ scramble
cubing.js: randomScrambleForEvent("333"). Verified on this machine 2026-08-26:
cold init + first scramble 79ms, warm 4-5ms, mean length 20.9 moves over 8 samples.
Runs in a Web Worker by default, so it never competes with the render thread.
Face turns only. Applied from white-top/green-front (Reg. 4d1).
~~~

Scrambles are never inspected, filtered, or regenerated to look fairer.

## Hints

A hint reads the cube's current state, computes a full solution to it, and reveals only
the next single turn. Taking one marks the solve as practice: it is excluded from both
record boards and from the averages, permanently and visibly, from the moment the hint is
taken rather than at the end.

**A hint plans once and serves the plan in order.** The obvious implementation, solving
afresh on every request and revealing the new first move, does not converge. The solver
is two-phase and so not optimal, and it is deterministic per position, which means its
first move from one state can lead to a state whose own first move leads straight back.
Measured during the build: a hint returning the same move forever, the cube flipping
between two positions for as long as anyone kept tapping. So the app computes a whole
solution, hands out its moves one at a time, and only recomputes when the solver plays
something the plan did not expect. Following a real solution terminates; following
first-moves does not.

~~~ hint
cubing.js: experimentalSolve3x3x3IgnoringCenters(state) on the live state, replayed as
scramble + move log. Verified 6ms on an arbitrary mid-solve state, 2026-08-26.
Keep the whole solution. Serve solution[i] while the log matches the plan; recompute
when it diverges; drop the plan on a new scramble.
~~~

**Following hints is not the short way home.** Taking one move off an optimal solution
and re-solving can land on a different, longer line, so a solve done entirely on hints
runs longer than the scramble that produced it. Measured on this machine: twenty-nine
hint moves for an eighteen-move scramble. That is not a defect to fix, it is what
one-move-at-a-time advice from an optimal solver costs, and it is another reason hinted
solves do not touch the boards.

**An honest characteristic, stated because a user will meet it.** The hint follows the
solver's path, not yours. It is a correct next move toward a solve, but it is the
machine's route, and after taking one your cube is on a line that a layer-by-layer or
CFOP solver cannot simply continue from memory. It unsticks you; it does not coach you.
The app says this where hints are offered rather than letting the user infer it after
their method stops applying. A method-aware hint is a real feature and it is on the
roadmap, not in v1.

## Solved, and the goal states

A solve completes when every face is a single color, ignoring center orientation.

Pattern challenges reuse the same machinery against a different target state. Each
pattern has its own fewest-moves record and no time record, because a pattern is a
puzzle to be solved efficiently rather than raced.

~~~ patterns
Checkerboard: M2 E2 S2 applied to solved.
Cube in a cube: F L F U' R U F2 L2 U' L' B D' B' L2 U.
Superflip: every edge flipped in place, all corners solved. The one position known to
require 20 moves in HTM.
Each stored as a target state, compared the same way solved is.
~~~

## Stage splits

Inside each solve the app reports when the cross, the first two layers, the last-layer
orientation, and the full solve were each reached. These are cheap: each is a plain
predicate over cube state, checked against a simulator the app already runs.

Two things make them harder than they look, and both are handled rather than ignored.

**Detection is a sequential forward scan.** Each stage completes at the first move at or
after the previous stage completed, which makes the four boundaries monotone by
construction.

The obvious alternative, and the one this spec originally called for, was to scan
backward for the last moment a predicate holds continuously through to the solved state,
so that a stage going briefly true by coincidence could not be mistaken for the real
thing. Building it proved that wrong. Every last-layer algorithm breaks the first two
layers partway through and restores them, Sune opening the front-right slot on its very
first move, so the final unbroken run of "first two layers complete" begins somewhere
inside the last-layer algorithm on every real solve. A backward scan collapses three
stages onto one index. The coincidence it was guarding against is real; the ordering
check below is what catches it instead.

Undo needs no special handling here: it rewrites the move log, and the scan reads the
log, so a backtracked solve is scored on the path it actually ended up taking.

**The cross face is inferred, not assumed.** Solvers who are color neutral pick whichever
face gives the easiest cross for that scramble. Assuming white would misreport every
solve by such a person.

~~~ stage-predicates
A piece is correct when every sticker it shows matches the center of the face it shows
on. Read against the CURRENT centers, not against home positions, which is how a person
reads a cube and what keeps every predicate right after a slice move.

Cross: the four edge slots on the cross face are correct.
F2L:   every non-center slot on the cross side and the middle layer is correct.
OLL:   every sticker on the far face shows that face's center color; where the pieces
       sit is irrelevant.
Solved: the cube is solved.

Scan: cross = first index where the cross holds; F2L = first index at or after that
where F2L holds; and so on. Each candidate cross color is scored by running the whole
scan; the color giving a properly ordered shape with the earliest cross wins.
~~~

**The scoping limit is shown, not buried.** These are CFOP's stages, not a universal
property of a solve. A Roux solver has no first-two-layers and no last-layer-orientation
phase in this sense. So the ordering is the test: a CFOP solve completes the four stages
on four distinct, increasing moves, and a solve that does not is reported as
unrecognised, with no stage times at all rather than a partial set of confident wrong
ones. The splits are labelled as CFOP stages wherever they appear.

The one coincidence that is allowed is the last-layer orientation and the solve landing
on the same move. That is a genuine skip, not a detection failure.

## Records and history

Two boards, each holding five, and a full history behind them.

- **Fastest** — five best final times. Competition-mode penalties are already applied.
- **Fewest moves** — five lowest move counts, in OBTM.

A solve is eligible for a board unless a hint was taken, or unless it is a DNF. Practice
solves still enter the history, marked, because a history that hides them is lying about
what happened.

The daily scramble keeps its own small board, separate from the all-time boards.

## Daily scramble

One scramble per calendar date, generated on the device the first time that date is
opened and kept. Every attempt at it that day lands on its own small board so today can
be measured against yesterday.

It is per-device by construction. With no server there is no way for two phones to share
a puzzle, and the app does not imply otherwise. A shared daily scramble is a real feature
and it needs a backend, so it is on the roadmap rather than quietly absent.

~~~ daily
Key on the device's local calendar date. Generate once, persist the move sequence, reuse
for every attempt that date. No seeded RNG and no server: a stored scramble, not a
reproducible one.
~~~

## Storage

Everything persists locally in IndexedDB: solve history, both record boards, the daily
scrambles and their attempts, pattern records, and settings. There is no server, no
account, and nothing leaves the device.

~~~ storage
Open with NO version. Bump from db.version + 1 only when a required store is genuinely
absent, so no later revert can walk the number backward into a permanent VersionError.
Always register onblocked, or a blocked open leaves a promise that never settles.
Settle writes on tx.oncomplete, never on request.onsuccess: a request succeeds before the
transaction commits, and a commit-time abort (quota, eviction) discards it silently.
Capture the error off the request, since tx.error is still null inside tx.onerror.
~~~

Solve history is meant to survive years of app updates, which is why the versioning
discipline above is worth getting right on day one rather than retrofitting onto a live
device.

## Installation

The app is installed to the home screen from Safari, and that is the context it is
designed for. In a browser tab, Safari's own edge-swipe-back gesture competes with
dragging the cube; installed, there is no browser chrome left to swipe and the conflict
is gone. The app detects a browser-tab launch and says so once.

~~~ install
Web App Manifest with display: standalone, viewport-fit=cover, and the full icon set
present BEFORE the user installs: iOS copies the home-screen icon into SpringBoard once,
at add time, and never re-reads it. Shipping a new icon later changes nothing for anyone
already installed.
Service worker registers with type 'prompt', never 'autoUpdate' -- auto-activating swaps
JS chunks mid-session under a running app. Disabled entirely in dev.
~~~

## Edge cases and rules

- A solve already solved by its scramble cannot happen: the Regulations require a state
  at least two moves from solved, and the generator honors it.
- Turning the cube back into a solved state during a scramble that was already solved is
  not a solve; a solve requires the clock to have started, which requires a first move.
- Closing the app mid-solve abandons that solve. The clock is wall-clock from the first
  move, so an interrupted solve cannot be honestly resumed and is discarded rather than
  recorded with a false time.
- A DNF in competition mode still records the solve and its move count. It is excluded
  from the fastest board and counts against averages per the rule above.
- The move counter is never negative. Undo at zero moves is a no-op.
- Rotating the view is never a move, is never logged, and never starts the clock.

# What makes a Rubik's cube app's times, scrambles, and stats legitimate to a speedcuber

Grounding for the cube app's "competition-legal" claims: random-state scrambling, inspection/penalty rules, Ao5/Ao12, notation and color scheme, CFOP stage-split legitimacy, and how a homebrew "fewest moves" board relates to real FMC.

Primary source for all regulation numbers: **WCA Regulations and Guidelines, version January 1, 2025** (fetched and read directly, PDF), official source at https://www.worldcubeassociation.org/regulations/ and https://regulations.worldcubeassociation.org/wca-regulations-and-guidelines.merged.pdf. All article/regulation numbers below (`4b3`, `A4d1`, `9f8`, `12a5`, `E2d`, etc.) are quoted from that document unless otherwise cited. The WCA regs get periodic dot revisions; before shipping, a builder should re-fetch the "official" version banner (`[official:<hash>]` on page 1) to confirm nothing has moved.

---

## 1. Random-state scrambles

**What WCA actually requires (Regulation 4b3):**

> "Specification for a scramble program: An official scramble sequence must produce a random state from all states that require at least 2 moves to solve (equal probability for each state)."

This is the core legitimacy fact: it is not "make random moves," it is **produce a uniformly random element of the state space** (excluding the trivially-close-to-solved states), then find *a* solution and use its inverse as the scramble. That distinction matters because:

- **Random-moves** scrambling (apply N random face turns from solved) produces a biased, non-uniform, and often too-easy distribution over states — short scrambles are more likely to revisit near-solved configurations, and the "scrambledness" isn't guaranteed. This is what most non-competition novelty apps still do, and it's the thing to explicitly avoid.
- **Random-state** scrambling guarantees fairness across competitors solving the "same difficulty" of scramble, which is the entire reason WCA cares.

**Important nuance the regs make explicit — not every event is random-state.** 4b3 has per-puzzle exceptions:
- 4b3a (blindfolded events): orient the puzzle randomly, equal probability per orientation.
- 4b3b (2x2x2): random state requiring **at least 4 moves** to solve.
- 4b3c (Skewb): random state requiring **at least 7 moves**.
- 4b3d (Square-1): random state requiring **at least 11 moves**.
- 4b3e (5x5x5, 6x6x6, 7x7x7, Megaminx): **"sufficiently many random moves (instead of random state), at least 2 moves to solve."** Big cubes are explicitly *not* random-state in official competition — full random-state enumeration over their state space is computationally infeasible, so WCA falls back to random-moves for those. For a 3x3x3-only app this doesn't bite, but it's worth knowing in case the roadmap grows to 4x4x4+.
- 4b3f (Pyraminx): random state requiring **at least 6 moves**.

3x3x3 has no listed exception, so it uses the base 4b3 rule directly.

**How TNoodle (the official scrambler) actually generates a 3x3x3 scramble:**

TNoodle uses Shuang Chen's **min2phase**, a highly optimized implementation of **Kociemba's two-phase algorithm**, to generate a uniformly random cube state, solve it near-optimally, and invert that solution to produce the scramble. ([SpeedSolving: "TNoodle uses ... min2phase to generate a random state, solve the state using Kociemba, and invert the solution to get a scramble"](https://www.speedsolving.com/threads/wca-scramble-algorithm.12969/page-3), [thewca/tnoodle](https://github.com/thewca/tnoodle))

Mechanically: generate a uniform-random legal cube permutation+orientation (respecting parity constraints), run min2phase to find a short solution to it, then the **scramble is the inverse of that solution**. The "last half of the found solution becomes the first half of the scramble," per community writeups of the technique. Kociemba's algorithm works in two phases — phase 1 gets the cube into a restricted subgroup (`G1`) in at most 12 moves, phase 2 solves within `G1` in at most 18 moves — using precomputed pruning tables over cube-state coordinates (corner orientation, edge orientation, UD-slice edge placement for phase 1; corner/edge permutation for phase 2) to make the search fast. ([cs0x7f/min2phase](https://github.com/cs0x7f/min2phase), [min2phase Algorithm.md](https://github.com/cs0x7f/min2phase/blob/master/Algorithm.md), [CubeRoot — Kociemba two-phase](https://cuberoot.me/code/algorithms/kociemba))

**Typical scramble length.** There is no fixed target length in the regulation — length is simply "however many moves the solver found," so it varies scramble to scramble. Community analysis of a large TNoodle sample found an average length around **19.3 moves**, with the bulk clustering at 20 moves (~20,038 of a sample) and a meaningful share at 21 (~3,016). ([SpeedSolving: "Move Counts From TNoodle Scrambles"](https://speedsolving.com/forum/threads/move-counts-from-tnoodle-scrambles.52290)) Background: God's Number (the proven worst-case optimal solve length for *any* state) is **20 in Half Turn Metric** and **26 in Quarter Turn Metric** (Rokicki, Kociemba, Reid, Davidson, 2010), which is why TNoodle scrambles cluster in the high teens/low twenties rather than needing to be capped. ([Wikipedia: Optimal solutions for Rubik's Cube](https://en.wikipedia.org/wiki/Optimal_solutions_for_Rubik%27s_Cube))

**Table sizes / precomputed vs. runtime.** I could not find a published exact byte-size for min2phase's pruning tables in its JS ports, and I'm flagging that rather than guessing. What is documented: the JS port (`min2phase.js`) **builds its tables at runtime** rather than shipping precomputed data files — "full initialization will spend about 350ms, and about 150ms if partially initialized by the first solve"; if you skip explicit pre-initialization, "the first solve will spend about 200ms, and the next 25 solves will spend about 10-50ms on average, with initialization finishing after ~26 solves." Once warm, **each solve is ~2.3ms**, and it automatically offloads to a Web Worker in any modern browser so this doesn't block the UI thread. ([min2phase.js discussion, SpeedSolving](https://www.speedsolving.com/threads/pure-javascript-solvers-for-random-state-3x3-scrambles.66772/), [cubing/min2phase.js](https://github.com/cubing/min2phase.js)) This is the practical cost signal for a mobile web app: expect roughly a third of a second of one-time table-build cost (worker thread, so non-blocking) plus low-single-digit-ms per scramble after that — cheap enough to run per-scramble on a phone, not something to precompute server-side unless you want to shave that first-load moment.

**Established libraries worth adopting rather than writing:**
- **`cubing.js`** (published as `cubing` on npm, from the team behind `alg.cubing.net`/`twizzle.net`) — the most directly reusable option. `randomScrambleForEvent("333")` returns a promise for a scramble `Alg`; "all scrambles are random-state where required by WCA Regulation 4b3." It runs scramble generation in a Web Worker automatically, supports all official WCA events plus a few unofficial puzzles, and is explicitly licensed for use in **unofficial** apps/software (the docs are explicit that official WCA competitions must use the official TNoodle program instead — irrelevant restriction for a consumer app, but worth knowing the phrasing exists). ([js.cubing.net/cubing/scramble](https://js.cubing.net/cubing/scramble/), [cubing/scramble.cubing.net](https://github.com/cubing/scramble.cubing.net))
- **`min2phase.js`** (`cubing/min2phase.js` on GitHub, also published to npm) — the lower-level solver itself, if you want to drive the random-state-then-invert process yourself rather than depend on `cubing.js`'s higher-level API.
- **WASM option**: cuberoot.me runs "a Rust port of min2phase compiled to WASM that is 117 KB and ~20% faster than the Java original" — evidence that a WASM path exists and is small, if a future perf need justifies it, but pure-JS (`min2phase.js`/`cubing.js`) already appears fast enough for interactive use per the timings above. ([CubeRoot scramble guide](https://cuberoot.me/scramble/gen-about))

**Recommendation:** adopt `cubing.js` for scramble generation rather than reimplementing Kociemba's algorithm or hand-rolling pruning tables — this is exactly the kind of "expensive machinery" the question anticipated, and it is a solved, actively maintained problem in the ecosystem.

**What a scramble is allowed to look like:**
- **Canonical move set for 3x3x3 scrambles**: single-layer face turns only — `F B R L U D`, their primes, and their doubles (see notation section below). WCA's own scrambling regulations don't introduce wide or slice moves into 3x3x3 scrambles; those are reserved for bigger cubes' own scrambling notation.
- **No slice moves (M/E/S)** appear in official scrambles or notation for the 3x3x3 at all — see section 4, this is a real and easy-to-miss fact.
- **Normalization / canonical orientation**: per Regulation 4d1, "NxNxN Cubes and Megaminx are scrambled starting with the white face (if not possible, then the lightest face) on top and the darkest adjacent green face (if not possible, then the darkest adjacent face) on the front." So the canonical "home" orientation a scramble is defined against is **white on top, green on front** — this is also exactly the corner of the standard Western color scheme (see section 4). A generated scramble sequence's moves are relative to that fixed reference orientation, not to whatever orientation the physical cube happens to be sitting in.
- Scramble sequences must be generated fresh, never inspected, filtered, or re-generated to "improve fairness" (Regulation 4b1, 4b1+) — a rule about competition-integrity procedure, not directly relevant to a solo app, but useful context for "why does the regulation care so much about this."

---

## 2. Inspection and penalty rules, precisely

Everything below is Article A ("Speed Solving") of the January 1, 2025 regs, quoted/paraphrased with exact regulation numbers.

**Setup, before inspection starts:**
- A2c: after the puzzle is scrambled, the competitor must not see it until inspection starts — it stays covered.
- A3a1: **"The competitor is allotted strictly less than 15 seconds to inspect the puzzle and start the solve."**
- A3b1: the judge asks "READY?"; the competitor must confirm readiness within 1 minute or forfeits the attempt (DNS).
- A3b2: competitor confirms ready → judge uncovers the puzzle and **starts timing inspection at that moment**.

**During the 15-second inspection:**
- A3b3: at **8 seconds elapsed**, the judge calls "8 SECONDS."
- A3b4: at **12 seconds elapsed**, the judge calls "12 SECONDS."
- A3b5: the judge stops timing inspection the instant the competitor lifts their hands and starts the timer.
- A3c: the competitor may pick up/handle the puzzle during inspection but must not apply moves or intentionally change its alignment (A3c1: penalty DNF), with narrow exceptions for realigning within the misalignment tolerance (A3c2, tied to Regulation 10f) and an accidental-move exception specific to Square-1 (A3c5).
- A3d: **at the end of inspection**, the puzzle must be placed fully on the mat, in any orientation, and must not be resting even partially on the Stackmat timer — penalty **+2 seconds** if violated.

**The hold-to-release start ritual (this is the mechanism, precisely):**
- A4b: the competitor's fingers must touch the *elevated sensor surfaces* of the Stackmat timer, palms facing down, hands on the side of the timer closer to them — penalty **+2** if violated.
- A4b1: the competitor must have **no physical contact with the puzzle** while starting the solve — penalty **+2** if violated.
- A4d: with a Stackmat in use, the competitor keeps hands resting on the timer's sensors until they see the green light; **the timer starts the instant they lift their hands off the sensors**, and that same hand-lift is what starts the solve.

**The +2 / DNF inspection thresholds — the exact numbers:**
- **A4d1: the competitor must start the solve within 15 seconds of the start of inspection — penalty: time penalty (+2 seconds).** Clarification A4d1+: if inspection took *exactly* 15.00 seconds, the +2 still applies (the boundary is inclusive against the competitor).
- **A4d2: the competitor must start the solve within 17 seconds of the start of inspection — penalty: disqualification of the attempt (DNF).** Clarification A4d2+: exactly 17.00 seconds is also DNF.
- A4d3: if a stopwatch (not just Stackmat) is in use, the judge starts the stopwatch the instant the competitor starts the solve.
- **A4e: time penalties for starting the solve are cumulative** — e.g., a competitor who both starts late (+2) *and* has improper hand contact (+2) gets both, stacking to +4 (subject to A7b1's recording format below), unless a DNF-level infraction applies instead.

So concretely: **≤15.00s → no penalty; 15.01–17.00s (regs treat exactly 15.00s as already incurring the penalty, and exactly 17.00s as already DNF, so the clean +2 band is `(15.00s, 17.00s)` inclusive of the 17.00 boundary going to DNF) → +2; ≥17.00s → DNF.**

**During the solve:**
- A5a: no communication with anyone but the judge/Delegate — penalty DNF (narrow discretion exception if no advantage was gained).
- A5b: no assistance from anyone or anything but the solving surface — penalty DNF.
- A5c: may hold the puzzle against the surface to help operate it (this is allowed, not a violation).

**Stopping the solve — precisely when the clock stops:**
- A6a: the competitor releases the puzzle *before* stopping the solve, and stops the solve by stopping the timer.
- A6b/A6b1/A6b2: the competitor is responsible for stopping a Stackmat correctly; there's a technical carve-out around timer displays strictly below 0.06 seconds (treated as likely malfunction → extra attempt) vs. 0.06s or higher (treated as a real premature stop → DNF, absent suspected malfunction).
- A6c: the competitor must **fully release the puzzle before stopping the timer** — penalty DNF, with a judge-discretion exception dropping to +2 if no move or realignment was actually applied.
- A6d: must stop the Stackmat using **both hands**, palms down on the sensors — penalty **+2** if violated.
- A6e: after stopping the timer, the competitor must not touch, move, or realign the puzzle until the judge has inspected it — A6e1: applying a move after stopping → DNF; A6e2: merely touching without a move → **+2** (judge has discretion to waive if the touch was brief and didn't affect state).
- A6f: the competitor must not reset the timer until *both* they and the judge have signed the score sheet — penalty DNF if violated.
- **A6i: time penalties for stopping the solve are cumulative**, mirroring A4e for starting.

**Recording format (A7b1):** the judge records results as `T + X = F` — original recorded time `T`, sum of time penalties `X`, final result `F` — e.g. `17.65 + 4 = 21.65` (two +2s stacked). This is the exact format to mirror in a results/history UI if you want it to read the way a WCA score sheet does.

**Solved-state / move-based penalty (Article 10, distinct from the inspection penalty but often confused with it):**
- 10e2: if the puzzle needs **no further moves**, it's solved with no penalty.
- **10e3: if the puzzle needs exactly one more move to be solved, it's "considered solved with a time penalty (+2 seconds)."**
- **10e4: if more than one move is needed, the puzzle is considered unsolved — DNF.**
- 10f1: for NxNxN cubes, "acceptable misalignment" is **up to 45 degrees** per adjacent-parts boundary before it counts as needing an extra move at all (10e1). This is the rule that lets a slightly-crooked-but-clearly-solved cube still count as solved with no penalty; it's a physical-cube regulation with no real analog in a virtual cube (where alignment is exact by construction), so it's mostly irrelevant to a web app *except* as the origin of the informal "+2 = off by one twist" rule cubers already know from lore — worth stating in copy/help text since it's the intuition your users already carry from real competition.

---

## 3. Average of 5 and Average of 12, exactly — and "mean" vs. "average"

**Terminology first, because WCA is deliberately precise here and it's the thing people get backwards:**
- WCA calls a **trimmed** statistic (drop best and worst, then take the arithmetic mean of what's left) an **"Average."**
- WCA calls an **untrimmed** arithmetic mean of all attempts a **"Mean."**
- So "Average of 5" (Ao5) is *not* a plain average in the colloquial sense — it's a trimmed mean of 3 out of 5. "Mean of 3" (Mo3) *is* a plain arithmetic mean of all 3 attempts, no trimming. These are officially distinct WCA formats (9b1a lists "Average of 5" as the format for 3x3x3 and most events; 9b2a lists "Mean of 3" as the format for 6x6x6/7x7x7). A 3x3x3-focused app's "Ao12" (average of 12) is not an official WCA competition format at all — WCA never runs Bo12/Ao12 in competition — but it's ubiquitous unofficial-practice terminology (cstimer, csTimer-style apps, community leaderboards) built on exactly the same trimming logic as Ao5, just with 12 attempts, 2 dropped from each end. Treat Ao12 as "the community convention that generalizes WCA's Ao5 rule," not as a WCA-defined format — worth being explicit about that distinction in your own docs so nobody mistakes it for an official WCA statistic.

**Average of 5 — exact regulation text:**
- **9f8: "For 'Average of 5' rounds, competitors are allotted 5 attempts. Of these 5 attempts, the best and worst attempts are removed, and the arithmetic mean of the remaining 3 attempts determines the competitor's ranking in the round."**
- **9f9: "For 'Average of 5' rounds, one DNF or DNS is permitted to count as the competitor's worst result of the round. If a competitor has more than one DNF and/or DNS result in the round, their average result for the round is DNF."**

This is the exact rule people implement wrong: **one** DNF/DNS can be absorbed as the dropped worst result — the average still computes normally from the other 3. **Two or more** DNF/DNS in the same average makes the *entire average* DNF, even if, arithmetically, one of those DNFs would have been the dropped "worst" anyway. It is not "drop the worst, then check if what's left has a DNF" — it's "if two-or-more DNFs exist among the 5, the average is DNF, full stop," which in practice collapses to the same outcome as trim-then-check for the "does the average show a number" question but matters for *how* you implement the check (count DNFs first, short-circuit to DNF at ≥2, don't rely on sort-and-drop logic alone).

**Mean of 3 — exact regulation text:**
- 9f10: "For 'Mean of 3' rounds, competitors are allotted 3 attempts. The arithmetic mean of the 3 attempts determines the competitor's ranking in the round."
- 9f11: "For 'Mean of 3' rounds, if the competitor has at least one DNF or DNS result, their average result for the round is DNF."

So Mo3 has **zero tolerance** for DNF — a single DNF among 3 attempts kills the whole mean. This is the sharp contrast with Ao5's one-DNF grace: Ao5's forgiveness comes specifically from the fact that it's a *trimmed* statistic with a result to spare; Mo3 has no result to spare.

**Generalizing to Ao12 (unofficial, but this is the standard community rule your users will expect, e.g. what cstimer implements):** best and worst are dropped (1 from each end, same as Ao5, *not* 2-from-each-end unless you're building something like "Ao100" conventions — the community-standard trim for Ao12 is exactly "drop 1 best, 1 worst, mean the middle 10"), and the DNF tolerance generalizes the same way: **more than one DNF among the 12 makes the whole average DNF**, exactly mirroring 9f9's logic, because a single DNF can still be the one dropped worst result.

**Rounding/measurement precision (9f1, 9f2):** results under 10 minutes are **truncated** (not rounded) to hundredths of a second — "if the timer displays 12.678 for an attempt, the original recorded time is 12.67 (drop any digit after a hundredth of a second)." Averages/means under 10 minutes are **rounded** to the nearest hundredth. Results/averages over 10 minutes are measured/rounded to the nearest second (X.49 → X, X.50 → X+1). This truncate-vs-round distinction (individual results truncate; averages round) is a precise, easy-to-miss detail if your stats pipeline reuses one rounding function for both.

**Ties and ranking (9f13–9f15):** rankings for Ao5/Mo3 rounds are based on ordering the averages/means; ties between competitors with identical averages are broken by best single attempt (9f14); competitors with genuinely identical results (single and average) get an identical ranking, not an arbitrary tiebreak (9f15).

**"Mean" vs. "Average" as WCA profile/personal-record language, and single vs. average PBs:** a WCA competitor's profile carries separate personal records for **"single"** (best individual solve, ever) and **"average"** (best Ao5/Mo3 result, ever) per event — these are tracked and ranked completely independently (a competitor can have a blazing single that's nowhere near their average-PB solve quality, and vice versa). "PB" (personal best) is used informally as a synonym for personal record and can refer to either, so UI copy should always specify **PB single** vs. **PB average** rather than an unqualified "your best time," which is genuinely ambiguous in cuber vocabulary. ([speedcubing.org: Cubing record terminology](https://speedcubing.org/blogs/news/cubing-record-terminology), [Wikipedia: Personal record](https://en.wikipedia.org/wiki/Personal_record))

---

## 4. Notation and the standard color scheme

**Canonical face notation (Regulation 12a1):**
- 12a1a — clockwise 90°: `F B R L U D` (Front, Back, Right, Left, Up, Down).
- 12a1b — counter-clockwise 90° (prime): `F' B' R' L' U' D'`.
- 12a1c — 180° (double turn): `F2 B2 R2 L2 U2 D2`.

**Wide/"Outer Block" moves (12a2):** written `nFw`, `nBw`, `nRw`, `nLw`, `nUw`, `nDw` (and their `'`/`2` variants), where `n` is the number of layers turned together (`1 < n < N` for an `N`-layer cube; `n` is omittable when it equals 2). For the 3x3x3, `n=2` is the only meaningful value, and it can be omitted — so `Rw` and `2Rw` are both valid notation for the *same* physical move. This is where the common lowercase-`r` convention (`r` = `Rw`) comes from community shorthand (SiGN notation), not WCA's own Article 12 — WCA's official notation is always the capital-letter-plus-`w` form.

**Rotations (12a4):** whole-cube rotations `x` (same direction as `R`, or `L'`), `y` (same direction as `U`, or `D'`), `z` (same direction as `F`, or `B'`), with `'` for counter-clockwise and `2` for 180°. Per 12i+, **rotations do not change the puzzle's solved state** — they're bookkeeping for orientation only. This is exactly why they're free in the FMC move-count metric (see section 6).

**No slice-move notation (M/E/S) exists anywhere in WCA's Article 12 for the standard cube.** This is a concrete, checkable, and somewhat surprising fact: the extremely common `M`/`E`/`S` slice-turn shorthand that every cuber learns from algorithm sheets and tutorials is **not part of the WCA Regulations at all** — it's a community convention (most formally standardized as "SiGN notation," used by algorithm databases, tutorials, and apps like alg.cubing.net) layered on top of, not defined within, the official regs. The Regulations directly confirm this indirectly in Regulation E2c2+, a 2025-current clarification for Fewest Moves solutions: *"In the past, bracket notation (e.g. `[r]` or `[u2]`) were permitted for Fewest Moves. Only rotations based on x, y, or z are permitted now"* — i.e., even the narrower bracket-shorthand that used to exist for FMC has been *removed*, tightening FMC notation strictly to Article 12a's face/wide/rotation vocabulary, with no slice moves at all, ever, in an official WCA-notation-compliant sequence.

**Two metrics, both officially named, that matter for counting moves:**
- **12a5 — Outer Block Turn Metric (OBTM):** each Face Move or Outer Block (wide) Move counts as **1**; each Rotation counts as **0**. This is WCA's official generalization of what the wider cubing community informally calls "HTM" (Half Turn Metric) — a half-turn (`F2`) and a quarter-turn (`F`) both cost 1, and OBTM just extends that same "1 per turn regardless of layer count" rule to wide moves too.
- **12a6 — Execution Turn Metric (ETM):** Face Moves, Outer Block Moves, *and* Rotations **all** count as 1. This metric exists specifically to measure "how many physical hand actions did this take," and it's the one used for FMC's 80-move ceiling (see section 6) — rotations are free for *scoring* (OBTM) but not free against the *legality* ceiling (ETM).

**v1 vocabulary recommendation:** face turns + primes + doubles (`F B R L U D`, `'`, `2`) are non-negotiable — this is the entire WCA scramble/solution vocabulary. Wide moves (`Rw` etc.) and rotations (`x y z`) are legitimate WCA notation and worth having available for FMC-solution display/entry fidelity, but are not needed for scrambles (3x3x3 scrambles never contain them) or for the speedsolving timer mode (the physical cube doesn't need software rotation moves at all — a user rotates their view, not the cube's logical state). **Slice moves (M/E/S) are a UX decision, not a legitimacy requirement** — they're extremely common in virtual-cube UIs for ergonomic parity with algorithm tutorials, but including them means every place you count "moves" for a legitimacy-bearing stat (especially the fewest-moves board) has to either forbid them or explicitly define their OBTM-equivalent cost, because the official notation simply has no such move (see section 6's flag on this).

**Standard color scheme — Western / "BOY":**
The scheme virtually all WCA competitors use (because it's what official cubes ship with) is called the **Western color scheme**, mnemonically the **"BOY"** scheme:
- **White** top, **Yellow** bottom (opposite pair)
- **Green** front, **Blue** back (opposite pair)
- **Orange** left, **Red** right (opposite pair)

Opposite pairs, stated plainly: **white–yellow, blue–green, orange–red.** ([cuberpal.com: "the standard Western color scheme ... white on the top, yellow on the bottom, orange on the left, red on the right, green on the front, and blue on the back. White is opposite yellow, blue is opposite green, and orange is opposite red."](https://www.cuberpal.com/blog/rubiks-cube-colors))

**The "BOY" corner rule, precisely:** at the single corner piece where **B**lue, **O**range, and **Y**ellow meet, those three colors run **clockwise** in that order (B→O→Y) when viewed from outside that corner. This is the standard mnemonic/check cubers use to verify any given physical cube (or any color scheme in software) is using the conventional Western arrangement rather than a mirrored or otherwise nonstandard one. A related mnemonic — the "minus yellow" trick — holds that combining any color with yellow (in the sense of "what's opposite what") yields its complementary pair predictably (e.g., white "plus" yellow gives you the white/yellow opposite pair; red "plus" yellow gives orange, meaning red and orange sit in a fixed cyclic relationship around the yellow corner) — a useful sanity check when generating or validating a color-scheme config in code. ([ruwix.com: Japanese vs. Western color schemes](https://ruwix.com/the-rubiks-cube/japanese-western-color-schemes/))

**WCA ties its canonical scrambling orientation to this same scheme, precisely** (Regulation 4d1, already cited in section 1): scrambling starts from **white on top, green on front** — i.e., the WCA's own "home orientation" for applying a scramble sequence is defined as a specific corner/edge of the Western scheme, not an arbitrary choice. This gives you a clean, citable anchor for what "home" means in your app: white-top/green-front is not just a convention you inherited from Rubik's-brand cubes, it's the literal orientation WCA regulation nails a scramble sequence to.

**Colorblind-safe palettes — what's known.** Standard-issue red/green color vision deficiency (the most common form) makes the orange/green pair — and to a lesser extent orange/red — hard to distinguish on a stock Western-scheme cube; even fully color-sighted people report orange/yellow as visually close. ([speedcube.us: Best Cubes for Colorblind Solvers](https://www.speedcube.us/blogs/speedcubing_news_and_advice/best-cubes-for-colorblind-solvers)) The most concrete documented approach is designer Kyo Takano's "color universal" cube: rather than swap in arbitrary "colorblind-friendly" hues by guesswork, the palette was built by searching the **HCL (Hue-Chroma-Lightness) perceptual color space** for six colors that stay distinguishable under simulated color-vision-deficiency filters (deuteranopia/protanopia, i.e., red-green types, primarily), verified with vision-deficiency simulation tools rather than eyeballing it. ([designboom: Kyo Takano color universal Rubik's cube](https://www.designboom.com/design/kyo-takano-color-universal-rubiks-cube-06-03-2022/)) I could not find the exact six hex values from Takano's published palette in what's publicly indexed — that's a genuine gap, not something I'm papering over — so if the app wants a specific, defensible colorblind-safe swap rather than a generic "shift the hues a bit" pass, the actionable next step is either (a) commission/derive one the same way (HCL-space search + CVD simulation, e.g. via a tool like Coblis or a programmatic CVD-simulation library, rather than picking six "safe-looking" colors by eye), or (b) treat it as a `design-expert` + accessibility-focused task rather than something this research can hand over as an established standard, because — unlike the WCA regulations — there is no single agreed-upon "the" colorblind cube palette the community has converged on. The practical community fallback mentioned in forums is simpler and lower-tech: darken the green and/or steer it more yellow-toward relative to orange, since that's the specific pair driving most complaints. ([speedsolving.com: colorblind solver threads](https://www.speedsolving.com/threads/does-me-being-colorblind-affect-how-fast-solve-the-cube.88044/))

---

## 5. Stage boundaries: cross, F2L, OLL, PLL

**The honest headline: each stage's *end state* is a crisp, checkable predicate on cube state. What's fuzzy is (a) whether the solver's actual move sequence visits those predicates in the assumed order at all, and (b) attributing "stage time/moves" cleanly when it doesn't.**

**The four predicates, precisely, as CFOP (Cross → F2L → OLL → PLL) defines them:**
- **Cross complete:** the four edge pieces sharing one common color are each correctly placed and correctly oriented relative to their adjacent center pieces, forming a "+" of that color on one face. This is a clean, testable predicate: pick a face color, check that face's 4 edge positions hold the 4 edges carrying that color, oriented correctly against their neighboring centers.
- **F2L complete:** the bottom two layers (all 8 corner/edge pairs of the first two layers) are fully solved — every corner-edge pair correctly placed and oriented. Also a clean, testable predicate: check all 8 pieces of the first two layers against solved positions/orientations.
- **OLL complete:** every last-layer piece has the same color facing up, **regardless of position** — i.e., orientation-only, permutation doesn't matter yet. Clean predicate: check the "up" face is monochrome; ignore where pieces actually sit.
- **PLL complete:** the cube is fully solved (permutation of the already-oriented last layer resolved). Trivially the "is the cube solved" predicate.
([Wikipedia: CFOP method](https://en.wikipedia.org/wiki/CFOP_method); corroborated by [speedsolving.com wiki via search index](https://www.speedsolving.com/wiki/index.php?title=CFOP_method) — direct fetch of the wiki 403'd for me, so I'm relying on Wikipedia's own citation plus search-engine-indexed excerpts of the wiki page, which agree.)

So: **your instinct that "F2L in particular may not be a single clean test" is right about *attribution*, not about the *state predicate itself*.** The predicate ("are the bottom two layers solved") is unambiguous. The problems are all upstream/downstream of that:

1. **Cross-face choice isn't fixed.** Advanced solvers practice "color neutrality" — picking whichever face gives the easiest cross for that particular scramble, not always white. Your detector has to infer *which* color the solver used as their cross face (typically: whichever face ends up opposite the final "up" face and had its 4 edges solved earliest/continuously through to the end) rather than assuming white-on-bottom.
2. **CFOP-specific stages don't exist for non-CFOP solvers.** Roux (blockbuilding → CMLL → LSE) and ZZ/Petrus (EOLine or a 2x2x2/2x2x3 block first, not a cross) don't pass through a "cross-then-F2L-then-OLL-then-PLL" state sequence at all — Roux has no OLL or PLL step in the CFOP sense, it has CMLL (corners-only, ignoring the middle slice) and LSE (last six edges, solved together, not orientation-then-permutation). ([SpeedSolving: Roux method](https://ruwix.com/the-rubiks-cube/different-rubiks-cube-solving-methods/roux-method/)) If your auto-split assumes CFOP and a user solves with Roux, the predicates for "cross" and "F2L" may never cleanly fire in the expected order (a Roux block isn't a CFOP cross, and Roux's corner-first CMLL doesn't correspond to OLL). **This is the single biggest "more expensive than it looks" item in this whole research brief**: automatic CFOP-stage splitting is *inherently CFOP-specific* — it is not a generic property of any legal solve, it's a lens that only produces meaningful numbers when the underlying solve actually happened to be CFOP-shaped. You will need to either (a) explicitly scope the feature as "CFOP stage splits" and accept that non-CFOP solves show nonsensical or null splits, or (b) detect the method being used before attempting to label stages, which is a materially larger feature.
3. **Even within CFOP, execution doesn't always visit the stages in strict textbook order.** "Multi-slotting" and "advanced F2L" techniques deliberately interleave cross-edge placement with corner-edge pair insertion (e.g., "keyhole," "pseudoslotting," "free slotting" all describe techniques where the last cross edge gets placed *during* an F2L pair insertion, not before any F2L pair begins). ([SpeedSolving forum: CFOP efficiency and multi-slotting](https://www.speedsolving.com/threads/cfop-efficiency-and-multi-slotting.45301/), [Potential technique: Free Slotting](https://www.speedsolving.com/threads/potential-new-3x3-technique-free-slotting-cfop-extension-cousin-to-psuedoslotting.75559/)) A move-by-move predicate scan still gets a well-defined "moment cross became permanently solved" and "moment F2L became permanently solved" — but that "cross" timestamp might land *after* one or two F2L pairs have already gone in, which will look surprising in a naive UI if you present it as "here's when they finished the cross, before they started F2L," because for these solvers that framing is simply false to what happened. The state predicates are still correct; the *narrative* CFOP model of strictly sequential stages is the thing that's approximate.
4. **Last-layer alg sets can collapse OLL and PLL into a single move.** ZBLL solves orientation *and* permutation of the entire last layer in one algorithm once edges are pre-oriented; COLL/OLLCP solve corners' orientation-and-permutation together, leaving only edge permutation (EPLL) as a genuinely separate final step. ([SpeedSolving wiki: ZBLL](https://www.speedsolving.com/wiki/index.php/ZBLL), [SpeedSolving wiki: OLLCP](https://www.speedsolving.com/wiki/index.php/OLLCP)) This isn't actually a predicate problem (OLL-complete and cube-solved are still well-defined instants), it just means for advanced solvers the "OLL" phase and "PLL" phase can be near-simultaneous or have PLL at effectively 0 moves — which is a correct, if visually anticlimactic, result, not a bug to "fix."
5. **A subtlety a naive first-true-instant scan will get wrong**: don't flag "cross complete" (or F2L, or OLL) at the *first* move index where the predicate happens to be momentarily true — scan for the **last** move index after which the predicate holds continuously through to the solved end-state. A predicate can transiently and coincidentally become true mid-solve (e.g., a cross-colored edge randomly lands correctly while working on something else, then gets disturbed a few moves later) and a first-true scan would misreport that as "cross done" far too early. This is exactly the kind of bug real reconstruction tools have hit — a GitHub issue against csTimer's own reconstruction tool ("Incorrect recognition of PLL skip in reconstruction tool") documents a live instance of this class of misdetection. ([cs0x7f/cstimer issue #263](https://github.com/cs0x7f/cstimer/issues/263))

**This is a solved problem in the wild, not unexplored territory — but it required real engineering, and it's specifically enabled by full move-log capture, which your app already has by construction.** Smart-cube apps (GAN Bluetooth cubes paired with apps like **ScrambleCube** and **Sub-X**) already do exactly this: "when you connect a smart cube, every solve is split into cross, F2L, OLL and PLL, with recognition versus execution, turns per second, and times by case," including "bottleneck detection" comparing phase times against goal pace. ([SpeedSolving: "Smart cube solves now get auto-reconstructed and analyzed (phase splits, bottleneck detection)"](https://www.speedsolving.com/threads/smart-cube-solves-now-get-auto-reconstructed-and-analyzed-phase-splits-bottleneck-detection-on-sub-x.97079/), [ScrambleCube](https://www.scramblecube.com/)) These products only work because a Bluetooth smart cube streams a live, complete move log — which is precisely what a virtual/web cube gives you for free and a *physical, non-instrumented* cube never can. So: **the machinery (full-state playback + predicate-scan) is exactly the kind of thing already built and shipped by real products for real cubers, using your exact data shape (a move log)** — the honest caveat is narrower than "can we even do this," it's "the split is legitimately meaningful only for solves that are actually CFOP-shaped, and the UI needs to either communicate that scoping or detect method first."

**Recommendation for v1 honesty:** ship the four predicates as defined above (they're cheap — pure cube-state checks against a simulator you already need for the timer itself), present them explicitly as "CFOP stage splits" (not "your solving stages," which implies universality), and consider either detecting/flagging non-CFOP-looking solves (e.g., no clean monotonic cross-then-pairs progression) to suppress a misleading split, or simply documenting the scope limitation in-app rather than silently mislabeling a Roux solver's blockbuilding as "cross."

---

## 6. Fewest-moves as a discipline, and how your undo rule maps to it

**What real FMC (3x3x3 Fewest Moves) actually is, per Article E:**

- **Scrambling:** FMC uses the *same* base random-state rule as speedsolving (Regulation 4b3 has no FMC-specific exception), so a single shared scrambler serves both your timer mode and your fewest-moves board — this part of your architecture is already aligned with the real discipline at no extra cost.
- **Format:** one attempt = one scramble, and the competitor has a hard **60-minute** time limit to find and write down a single solution (E2b) — this is planning time on paper (or with up to 3 self-supplied scratch cubes to test ideas by hand, E3b), not a timed execution of moves. There's no "how fast can you turn the cube" component at all; FMC is purely about move-count optimization under a long, generous time budget.
- **The written solution's rules, precisely:**
  - E2c2: it must be an **unambiguous, sequential** list of moves — no bracket shorthand, no out-of-line insertions/pre-moves. E2c2+ specifically notes that bracket notation like `[r]` or `[u2]`, once allowed, **is no longer permitted** — only literal `x`/`y`/`z` rotations, spelled out.
  - E2c4: every move in the final solution must be **exactly** one of the moves defined in Regulation 12a for the 3x3x3 — i.e., face turns, wide/outer-block turns, and rotations **only**. There is no legal way to write `M`, `E`, or `S` in an official FMC solution, because those symbols simply aren't defined notation for the cube at all (see section 4). A solver who wants the *effect* of a slice move has to spell it out as an equivalent combination of face/wide turns and rotations.
  - **E2d: the scored result is the move count of the solution, calculated using the Outer Block Turn Metric (OBTM, Regulation 12a5)** — face and wide moves cost 1, rotations cost 0.
  - **E2d1: separately, the solution must not exceed 80 moves *including rotations*, calculated using the Execution Turn Metric (ETM, Regulation 12a6)** — this is a DNF ceiling, not the score. Rotations are free for your leaderboard number but not free against this legality cap; a solution that leans very heavily on rotations could theoretically blow the 80-move ETM ceiling while still looking modest on the OBTM scoreboard.
  - E2e: the solution must not be "directly derived from any part of the scramble sequence" (e.g., starting with 4+ moves identical to the scramble's inverse) — a rule specifically against trivial/lazy non-solutions, enforceable in competition by a judge asking the solver to explain their moves.

**Does your undo-based "fewest moves" rule land somewhere recognizable, or somewhere idiosyncratic?**

**In spirit, it's a reasonable and recognizable analog.** Real FMC's entire premise is "only the *final*, submitted solution is judged — exploration, false starts, and scratch-cube experimentation are free and untracked." An undo-capable virtual cube where only the final move-path length counts is structurally the same idea: you're scoring the output artifact, not the search process that produced it. That's the right instinct and it's not a stretch to call it FMC-flavored.

**Where it will silently diverge from being genuinely the same discipline, and what to decide about each:**

1. **Move-counting metric.** If "moves" in your undo/redo log means raw keystrokes/taps rather than OBTM, decide explicitly: face turns and wide turns should cost 1 each; whole-cube rotations (if you expose them at all) should cost 0 to match OBTM, or you're scoring a different (harsher, non-standard) metric than real FMC PBs use. This matters for any UI copy that invites comparison to real-world FMC records (e.g., the celebrated 19-move human FMC solves) — those records are OBTM by definition.
2. **Slice-move notation.** If your virtual cube UI lets someone twist via `M`/`E`/`S` gestures as a single logged action (common in cube-simulator UX for ergonomic/tutorial parity — see section 4), you have a real decision to make: either disallow slice moves in fewest-moves mode entirely (matching real FMC's legal notation exactly), or explicitly define and disclose the OBTM-equivalent cost you're charging for a logged slice move, because WCA's own regulation has no answer to borrow here — it simply doesn't define the move. Silently counting a slice-move keystroke as "1 move" isn't wrong by some external standard (there isn't one), but it *is* a place where your number stops being comparable to a real FMC solution length, and that gap should be a deliberate, named decision rather than an artifact of however the UI happened to log input.
3. **No time limit vs. the 60-minute cap.** Real FMC is time-boxed at 60 minutes specifically so it stays a competition event with a bounded session. If your fewest-moves board has no time limit, you've built something arguably *purer* (pure move-count optimization, unconstrained), but it's a different competitive claim than "matches real FMC" — worth stating plainly in your copy as "optimize with no clock," not "the same as competitive FMC," unless you also add the 60-minute cap.
4. **The 80-move ETM ceiling and the "not derived from scramble" rule** are both easy, cheap things to add if you want closer fidelity (an 80-move ETM check is a trivial counter; a naive "did you just invert the scramble" check is a simple sequence-overlap comparison) — neither requires new machinery beyond what your move-log and cube-state simulator already give you, so there's no real cost argument against including them if fidelity to the real discipline is a goal.

**Bottom line:** your rule is FMC-*flavored* by construction (final-output-only scoring is the correct core idea), and can be made genuinely FMC-*comparable* cheaply by (a) counting in OBTM, (b) deciding explicitly what a slice move costs or forbidding it in this mode, and (c) optionally adding the 80-move ETM ceiling and the anti-scramble-copying check. Without those three decisions made deliberately, it's closer to "a fewest-moves-flavored board with its own house rules" than "an FMC leaderboard" — which may be entirely fine for v1, as long as the app's copy doesn't claim more legitimacy than the implementation actually earns.

---

## Cheap vs. expensive — a straight answer to "what does v1 have to get exactly right"

**Cheap (a day or two of focused work each, mostly adopting existing tools or encoding a lookup table of regulation values):**
- Random-state 3x3x3 scrambling — don't write a solver, adopt `cubing.js` (or `min2phase.js` directly). This is genuinely a solved, small, MIT-ecosystem problem, not something to reimplement.
- Inspection timing, the 15s/17s thresholds, +2/DNF rules, hold-to-release mechanics — this is pure state-machine + timer logic once you have the exact numbers (which this document gives you verbatim from the regs).
- Ao5/Ao12 trimmed-mean math and DNF handling — a small, well-specified pure function once you have 9f8/9f9 (and the Ao12 community generalization) right; the "count DNFs first, don't just sort-and-drop" detail is the one place to be careful.
- Notation (face turns, primes, doubles, wide moves, rotations) and the Western/BOY color scheme — both are fully pinned-down, static facts to encode directly (see sections 4's exact values).
- Reusing one scrambler for both the timer and the FMC board — free, because WCA's own scrambling rule for 3x3x3 doesn't distinguish between the two disciplines.
- The 80-move ETM ceiling and "don't let a solution start with the inverse of the scramble" check for FMC — small, self-contained checks layered on data you already have.

**Expensive, or at least more expensive than the surface question suggests:**
- **CFOP stage auto-splitting.** The state predicates themselves are cheap (you need a cube-state simulator, which you're building anyway for the timer). What's expensive is (a) building it as a "last-true-instant, scanned backward" detector rather than a naive first-true-instant flag, to avoid false positives, and (b) the scoping decision that this feature is inherently CFOP-specific and will misrepresent Roux/ZZ/Petrus/COLL-ZBLL solves if presented without qualification. This is the one place in this whole brief where "automatic" quietly means "automatic, for a method-shaped subset of solves, with real engineering behind avoiding false-positive stage boundaries" — budget for it accordingly, and treat the smart-cube-app prior art (ScrambleCube, Sub-X) as your reference implementation to emulate rather than a sign it's trivial.
- **A colorblind-safe palette that's actually defensible**, as opposed to "we shifted some hues." There's no single agreed community standard to copy (unlike the WCA regs, which are exhaustively specific); doing this properly means an HCL-space-search-plus-CVD-simulation pass, which is a `design-expert`-and-accessibility-tooling task, not a research-lookup task — flagged here as a gap this document could not close with a citable "the" answer.
- **Deciding what a "fewest moves" board actually measures**, given your undo mechanic — not expensive in engineering terms, but it's a real decision (metric, slice-move handling, time limit, ETM ceiling) that needs to be made explicitly rather than inherited by accident from however move-logging happens to work, or the app's "this is FMC" claim will be false in a way a knowledgeable user will notice immediately.

---

## Sources

- WCA Regulations and Guidelines, version January 1, 2025 (primary source for all regulation numbers/quotes): https://www.worldcubeassociation.org/regulations/ and merged PDF: https://regulations.worldcubeassociation.org/wca-regulations-and-guidelines.merged.pdf
- TNoodle (official WCA scramble program): https://github.com/thewca/tnoodle
- min2phase (Kociemba two-phase implementation): https://github.com/cs0x7f/min2phase, algorithm notes: https://github.com/cs0x7f/min2phase/blob/master/Algorithm.md, CubeRoot explainer: https://cuberoot.me/code/algorithms/kociemba
- cubing.js / scramble.cubing.net: https://js.cubing.net/cubing/scramble/, https://github.com/cubing/scramble.cubing.net, https://github.com/cubing/min2phase.js
- WASM min2phase note (CubeRoot): https://cuberoot.me/scramble/gen-about
- TNoodle scramble length sample data: https://speedsolving.com/forum/threads/move-counts-from-tnoodle-scrambles.52290
- God's Number (HTM 20 / QTM 26): https://en.wikipedia.org/wiki/Optimal_solutions_for_Rubik%27s_Cube
- Random-state vs. min2phase mechanics discussion: https://www.speedsolving.com/threads/wca-scramble-algorithm.12969/page-3
- CFOP method definitions: https://en.wikipedia.org/wiki/CFOP_method, https://www.speedsolving.com/wiki/index.php?title=CFOP_method
- Roux method: https://ruwix.com/the-rubiks-cube/different-rubiks-cube-solving-methods/roux-method/
- Multi-slotting / advanced F2L techniques: https://www.speedsolving.com/threads/cfop-efficiency-and-multi-slotting.45301/, https://www.speedsolving.com/threads/potential-new-3x3-technique-free-slotting-cfop-extension-cousin-to-psuedoslotting.75559/
- ZBLL / OLLCP (last-layer alg-set collapse): https://www.speedsolving.com/wiki/index.php/ZBLL, https://www.speedsolving.com/wiki/index.php/OLLCP
- csTimer reconstruction-tool misdetection example: https://github.com/cs0x7f/cstimer/issues/263
- Smart-cube stage-split prior art: https://www.speedsolving.com/threads/smart-cube-solves-now-get-auto-reconstructed-and-analyzed-phase-splits-bottleneck-detection-on-sub-x.97079/, https://www.scramblecube.com/
- Western/BOY color scheme: https://www.cuberpal.com/blog/rubiks-cube-colors, https://ruwix.com/the-rubiks-cube/japanese-western-color-schemes/
- Colorblind cube palette: https://www.designboom.com/design/kyo-takano-color-universal-rubiks-cube-06-03-2022/, https://www.speedcube.us/blogs/speedcubing_news_and_advice/best-cubes-for-colorblind-solvers, https://www.speedsolving.com/threads/does-me-being-colorblind-affect-how-fast-solve-the-cube.88044/
- PB single vs. average terminology: https://speedcubing.org/blogs/news/cubing-record-terminology, https://en.wikipedia.org/wiki/Personal_record

# Run — builder:product-vision — 2026-08-26T15:56:42.350Z

Captured by the run-log hook from workflow `wf_8b80bd17-d4e` (`wf_8b80bd17-d4e`), agent ? of 1 labelled `a7c86a500d6512aff`. Workflow agents are spawned inside the script rather than by the Agent tool, so this record is reconstructed from the run's journal and the agent's own transcript.

## Handoff

**a7c86a500d6512aff**


Work inside /Users/erickanney/builder/projects/quarter-turn. That is the project root; read and write only there.

The app is **Quarter Turn**, a 3x3x3 Rubik's cube game that installs to an iPhone home
screen as a PWA. Read these three files first, in this order:
  - /Users/erickanney/builder/projects/quarter-turn/.builder-plan.md          (the approved plan, status: approved)
  - /Users/erickanney/builder/projects/quarter-turn/src/app.md                (the domain spec, just written, the source of truth)
  - /Users/erickanney/builder/projects/quarter-turn/src/references/wca-legitimacy.md  (grounded WCA research, 261 lines)

Hard constraints that are already decided and are not yours to revisit:
  - It is a static PWA. No server, no account, no login. IndexedDB on the device.
  - Phone first, portrait, full screen, installed to the home screen. Not a desktop app.
  - iOS Safari has NO vibration API. There is no haptic feedback available, at all.
    Sound and motion carry the entire tactile burden.
  - The turn gesture is drag-follow: press a sticker, the layer rotates live under the
    thumb, releases into the nearest quarter turn. A drag on the background orbits the
    whole cube. There is no button pad and no escape hatch.
  - Art direction is "flat and modern": pure saturated faces, no gloss, hard edges, on a
    clean dark surface. Legibility of six colors at speed beats realism. This was the
    user's explicit choice over a realistic plastic cube and over a neon/glass look.


Seed this app's product vision and roadmap. There is no roadmap yet beyond the
template's empty /Users/erickanney/builder/projects/quarter-turn/src/roadmap/index.json. Write the roadmap and the pitch.

v1 is already scoped and approved, so your job is not to re-scope it. Your job is the
lanes, the outcomes, what comes after v1 and in what order, and the stories and
acceptance-scenario titles that the build will be gated against.

Read /Users/erickanney/builder/projects/quarter-turn/.builder-plan.md for what v1 ships and what was explicitly deferred. The
deferred list is real and came from the user's own choices: solve replay (they declined
it, but the move log makes it nearly free later), a guided learn-to-solve tutorial (they
chose the hint instead), a shared daily scramble and any friends leaderboard (needs a
server), cross-device sync, other puzzles, an algorithm trainer, a native app.

Two things worth your judgment specifically:

- The hint, as built, follows the SOLVER's path rather than the user's method. It
  unsticks you but after taking one your cube is on a line a CFOP or layer-by-layer
  solver cannot continue from memory. A method-aware hint is a materially different and
  better feature. Decide where that sits.
- The stage splits ship labelled as CFOP-specific, and will show only the two universal
  marks for a Roux or ZZ solver. Decide whether method detection earns a lane.

Follow ~/builder/.claude/knowledge/acceptance-criteria.md exactly for the story format
and the progressive timing. For v1 specifically I need the stories and their acceptance
scenario TITLES with verifier tags, because the build gates on them this session — the
Given/When/Then bodies get filled during the build, not now. Note this app is personal
and pre-production with one user, so per that file a lane outcome stands on its own and
you should NOT force a Signal metric onto it.

## Agent output

All roadmap files are written. Here is the full report.

## Thinking

**What the spec actually promises.** `app.md` and the plan are unusually precise for a personal app: every number the app shows — scramble legitimacy, +2/DNF thresholds, Ao5/Ao12 trimming, OBTM move counting — is grounded in a quoted WCA regulation, not a general impression of "how cubing works." The product's entire claim to a real speedcuber's trust is that it never asserts more legitimacy than it's earned, and it says so out loud where it falls short (Ao12 isn't an official format, CFOP splits aren't universal, the hint isn't the user's own route). That honesty is the voice, and it's the thing I had to carry into the roadmap rather than paper over with generic feature-speak.

**Vision.** A phone that behaves like a stopwatch, a cube, and a WCA-grade data engine a serious cuber actually trusts — so idle time (an elevator, a waiting room) becomes a real rep instead of a toy distraction, and every personal best means exactly what it says it means. The product isn't trying to be a casual puzzle app; it's trying to be the instrument a real competitor reaches for when they don't have a physical cube on them.

**Strategy — what matters most, and what I deliberately didn't chase.** Two forces did the real work of prioritization:

1. The move log is the sleeper asset. It exists only because stage splits need it, but it makes replay, export, drilling, and trend analysis all nearly free relative to what they'd cost from scratch. That's why "The Reconstruction" leads the roadmap — it's the highest value-per-effort lane, entirely additive to what's already built, and needs zero new architecture.
2. The two honest gaps the spec names out loud — the hint following the solver's route instead of the user's, and stage splits being silently CFOP-only — are not separate nice-to-haves. I made a deliberate call to treat them as one lane, "Beyond CFOP," because they share one foundation: knowing which method a solve actually took. Once that detection exists, it doesn't just fix the two named gaps — it also unlocks a genuinely new, harder-won payoff (a full guided solve on the user's own scramble) that the plan predicted would become cheap exactly once the hint engine matured. That's the sequencing bet I'm proudest of: fingerprint → honest splits → route-true hint → a real tutorial, each step earning the next rather than four unrelated asks.

What I chose not to chase: a guided learn-to-solve tutorial as a standalone near-term item (the user explicitly picked the hint over it for v1), other puzzles (2x2/4x4/pyraminx — no signal anyone wants this, and it would dilute the one thing this app does with total legitimacy), and native app packaging (explicitly out of scope, no reason to revisit). I also refused to bolt on generic "insight" dressing — no genre-heatmap-style vanity screen. "The Numbers That Matter" only exists because real competitive cubers already study exactly this kind of split data in the wild (the research doc cites smart-cube apps doing "bottleneck detection" as established practice) — it's grounded in the domain, not invented to look like a growth lane.

**The two judgment calls, decided plainly:**
- *Method-aware hint*: it's real and it's big enough to be two items, not one — "The Hint That Stays On Your Line" (constrain the search to a continuation in the detected method) and its capstone "Learn It On Your Own Cube" (chain route-true hints into a full guided solve). Both sit in Beyond CFOP, sequenced after detection exists, both flagged `large` and needing an `architecture` scoping pass before build — this is a real solver-engineering problem, not a small UI extension.
- *Method detection*: yes, it earns its own lane-opening item, "Know Your Method," precisely because it's a shared foundation for three different payoffs (honest non-CFOP splits, the route-true hint, and later the per-method trend data), not a one-off. I scoped it deliberately narrow first — it ships with zero visible UI change — so its cost is paid once and reused three times downstream.

**Where I pushed past the stated scope.** Two lanes go genuinely beyond what v1 does at all: "Beyond CFOP" requires new predicate research and per-method solving strategy the spec never asked for, and "The Shared Scramble" requires reversing the "no server" decision entirely — a real architectural pivot I named honestly in the item itself (`cross-device-sync.md` says outright: "the one item on the entire roadmap that requires standing up a real backend... a genuine strategic pivot, not a small add") and sequenced last across the whole roadmap because it's the least essential to the core promise (a legitimate, free, account-less personal cube) and the biggest ongoing cost. That's a strategic choice, not an oversight: depth on the free, offline, single-player core outranks turning this into a small social product.

**Signal.** Per `app.md`, this app carries no `deployStatus: live` and has exactly one user — the builder. Every lane outcome stands alone; I did not attach a Signal or `signal-check` to anything, including the shared-scramble lane that imagines other users existing someday. Forcing a metric onto a two-user (soon one-user) app is exactly the vanity-measure trap the knowledge base warns against.

**v1 stories.** Because the whole "What v1 ships" section fails Independent/Small as one story — turning, two timer modes, undo, records, hints, daily scramble, patterns, and stage splits are each independently valuable and separately testable — I split `mvp.md` into 10 stories (one per major capability), each with its own shell and scenario titles tagged to the verifier that will actually prove it (`@qa`, `@tests`, `@design-critic`, `@image`, and one `@user` scenario for the installed-device feel the plan itself calls out as unjudgeable any other way). Bodies are titles only, per the progressive-timing rule — Given/When/Then gets written during design and build.

## Result

**Files written** (all under `/Users/erickanney/builder/projects/quarter-turn/src/roadmap/`):
- `index.json` — 4 lanes + `mvp.md` standalone
- `mvp.md` — v1, `status: in-progress`, 10 stories with scenario titles + verifier tags
- `solve-replay.md`, `reconstruction-export.md`, `redo-from-here.md`, `case-drill.md` — Lane: The Reconstruction
- `method-fingerprint.md`, `splits-for-every-method.md`, `route-true-hint.md`, `learn-to-solve-for-real.md` — Lane: Beyond CFOP
- `your-bottleneck.md`, `trend-lines.md`, `session-goals.md` — Lane: The Numbers That Matter
- `cross-device-sync.md`, `the-shared-daily.md`, `your-peoples-board.md` — Lane: The Shared Scramble

### Standalone: The Whole Cube (`mvp.md`, large, in-progress)
The complete v1 build, split into 10 gate-checked stories: Turn the Cube, Casual Solve, Competition Solve, Moves/Notation/Undo, Records & History, Hints, Daily Scramble, Pattern Challenges, Stage Splits, Install & Offline. Full scenario titles + verifier tags are in the file, ready for this session's gate.

### Lane 1 — The Reconstruction
*Narrative:* Turn the move log every solve already keeps into something to study, share, and drill — not just a timer result left behind the instant the cube scrambles again.
*Outcome:* After a solve worth learning from, the user studies or drills it before scrambling again, instead of clearing the cube and moving straight to the next attempt.

1. **Watch It Back** (small) — Scrub through any past solve and watch the cube turn itself, live, exactly the way you turned it.
2. **Copy the Solve** (quick) — One tap turns any saved solve into real WCA notation you can paste anywhere cubers talk.
3. **Redo From Here** (large) — Jump into a past solve at the exact moment it went wrong and drill that stretch until it doesn't.
4. **Drill the Case** (medium) — Set the cube to any OLL or PLL case on demand and time just that algorithm.

### Lane 2 — Beyond CFOP
*Narrative:* Make the app's feedback — stage splits and the hint — match how a solver actually solves, not just the machine's own two-phase route, so no method gets treated as a rounding error.
*Outcome:* A cuber trusts and uses what the app tells them mid-solve and after it — reads their splits, takes a hint — as readily whatever method they solve with, instead of learning which parts of the app are only for CFOP.

1. **Know Your Method** (medium) — The app quietly learns to tell a Roux solve from a ZZ solve from a CFOP solve.
2. **Your Stages, Not CFOP's** (medium) — Roux and ZZ solvers finally get their own honest stage-by-stage breakdown.
3. **The Hint That Stays On Your Line** (large) — A hint that continues in your method instead of handing you the machine's route.
4. **Learn It On Your Own Cube** (large) — A full guided solve, on your own scramble, one route-true hint at a time.

### Lane 3 — The Numbers That Matter
*Narrative:* Turn the splits every solve already produces into a trend a cuber can act on, so practice time goes where the data says it's actually needed.
*Outcome:* The user targets practice at whichever stage their own numbers prove slowest, instead of picking what to drill by feel.

1. **Your Bottleneck** (small) — The app names your single slowest stage instead of leaving you to guess.
2. **The Trend Line** (medium) — A simple chart of your stage times over recent solves, so progress is seen, not felt.
3. **Set a Target** (medium) — Set a time goal for your weakest stage and watch each solve chase it live.

### Lane 4 — The Shared Scramble
*Narrative:* Extend the daily ritual from a private log into something a few real cubers share — same puzzle, same day, a board scoped to people who matter, never a public leaderboard or an account nobody asked for.
*Outcome:* The user checks how specific people they know did on today's scramble, not just their own history, turning the daily scramble into something to talk about instead of something done alone.

1. **Your Records, Any Phone** (medium) — Your solve history follows you to a new phone, no account required. (Names the architectural pivot honestly: this is the one item that requires a real backend.)
2. **Everyone's Scramble** (large) — The daily scramble becomes one puzzle, shared by every cuber using the app.
3. **Your People's Board** (medium) — A tiny leaderboard for the daily scramble, scoped to the people you actually know.

4 large items total (`Redo From Here`, `The Hint That Stays On Your Line`, `Learn It On Your Own Cube`, `Everyone's Scramble`); 14 forward items across 4 lanes plus the v1 standalone; lanes 2 and 4 reach genuinely beyond current scope (new solver research; a server). No Signal anywhere — the app has one user and no `deployStatus: live`.

### Pitch content (for `design-expert` to build into `src/roadmap/pitch.html`)

1. **Title** — "Quarter Turn." Tagline: "A real cube. Real rules. In your pocket."
2. **The problem** — Cubing apps on your phone are toys: twenty random moves called a scramble, no idea what a DNF is, a "personal best" that doesn't mean anything because nothing about the number was ever checked against how competitive cubing actually works.
3. **The gap** — The real practice — legal scrambles, real inspection, real Ao5 — only exists standing in front of a physical cube and a stackmat. The dead time in between (an elevator, a waiting room, five minutes before bed) stays dead, because nothing in your pocket does this correctly.
4. **The turn (resolution begins)** — Quarter Turn is a real WCA-legal cube that fits in a pocket: random-state scrambles from the same two-phase algorithm the WCA's own scrambler uses, real inspection, real +2s and DNFs, trimmed averages computed exactly the way a competition computes them. Every number this app shows is a number you could defend to another cuber.
5. **How it feels** — Press a sticker, drag, and the layer turns live under your thumb — you feel it decide which way it wants to snap before you let go. No d-pad, no notation to learn. Turn sound stands in for the haptics iOS will never give a cuber; every color is chosen to be read correctly at full speed, not to look like plastic.
6. **What ships day one** — The drag-turn cube, casual and competition timing, live move count with true undo, top-five boards for speed and moves, hints, a daily scramble that's actually yours, three classic patterns, and an honest read on where your seconds go: cross, F2L, OLL, PLL.
7. **What it doesn't pretend to be** — Not real competition Fewest Moves. Not an official WCA format for Ao12. CFOP stage splits labelled for exactly what they are. Quarter Turn tells the truth about its own limits — that honesty is the whole legitimacy pitch.
8. **The vision opens** — The next chapters make Quarter Turn something you keep coming back to, not just something you trust.
9. **The Reconstruction** — Every solve is already a full move log. Watch it rebuild itself, share it in notation another cuber would recognize, or drop back into the exact instant it went sideways and drill that stretch until it doesn't anymore.
10. **Beyond CFOP** — Today's splits know CFOP and nothing else — Roux and ZZ solvers get two honest blank marks instead of a wrong number. That changes: the app learns to recognize how you actually solve, gives real stage-by-stage feedback whatever your method, and — the harder, better problem — stops the hint from handing you the machine's route and starts it continuing yours.
11. **The numbers that matter** — Once every solve knows which stage actually cost the time, the app stops making you eyeball your own bottleneck. A trend line, a named weak stage, a target for your next session — it tells you what to practice instead of you guessing.
12. **The shared scramble** — Someday the daily scramble stops being yours alone: the same puzzle, the same day, a board scoped to the handful of cubers who actually matter to you — not a public leaderboard, just your people, on the puzzle you're both already doing.
13. **Close** — One cube. Numbers you can defend. A method that's actually yours. Quarter Turn is what a Rubik's cube app looks like when it refuses to lie to a speedcuber about what a personal best means.

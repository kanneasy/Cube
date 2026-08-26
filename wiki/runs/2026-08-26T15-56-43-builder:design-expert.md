# Run — builder:design-expert — 2026-08-26T15:56:43.317Z

Captured by the run-log hook from workflow `wf_8b80bd17-d4e` (`wf_8b80bd17-d4e`), agent ? of 2 labelled `ab9dfc022e76a7e9d`. Workflow agents are spawned inside the script rather than by the Agent tool, so this record is reconstructed from the run's journal and the agent's own transcript.

## Handoff

**ab9dfc022e76a7e9d**


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


You own every visual decision for this app, and this is the seeding pass: there are no
screens yet and no tokens beyond the template's placeholders. Write your decisions into
the brand files under /Users/erickanney/builder/projects/quarter-turn/src/interfaces/@brand/ (colors.md, typography.md,
visual.md, tokens.json) so the build has exact values to code against rather than
adjectives.

Three things about this particular app that make it not a normal design job:

1. **The six cube colors are functional, not decorative.** They are the standard Western
   (BOY) scheme: white/yellow, green/blue, orange/red as opposite pairs. A cuber's
   muscle memory depends on them being recognizably those colors, so you cannot simply
   choose a nicer palette. What you CAN do is tune each hue for a self-lit phone screen
   in a dark UI, where pigment values look wrong. Give exact hex values for the six
   faces plus the cube body/plastic color, and say what you changed from naive
   primaries and why.

2. **The colorblind-safe palette is a real design problem and research explicitly
   handed it to you.** It could not find a palette the community has converged on. The
   failing pairs on a standard cube are orange-against-green (the common red-green
   deficiency) and orange-against-red. The documented credible approach is a search in
   HCL perceptual space verified against simulated deuteranopia and protanopia, rather
   than picking six colors that look safe. Derive a real alternative set of six, give
   exact hex values, and say how you checked it. This ships as a first-class palette
   the user picks, not a filter.

3. **There are no haptics, and the app is mostly one screen.** The turn has to feel
   physical through motion and sound alone. Specify the snap: the easing curve, the
   duration, the overshoot if any, what the layer does between release and settle, and
   what an illegal or refused drag does. Also specify the orbit's momentum and settle.
   These timings are the app's entire sense of touch, so give real numbers.

Beyond those: the timer is the hero typographic element and it changes every 10ms
without the layout shifting, so the numerals need to be tabular. Decide the type system,
the dark surface, the chrome around the cube (timer, move count, undo, hint), the safe
area treatment, and how the app reads in one hand at arm's length mid-solve.

Also give me the screen inventory you are designing to, since the next agent writes copy
against it.

## Agent output

## Thinking

**Reading the room first.** Three things about this brief pulled hardest. It's a single-screen app, so there's no "navigation design" to hide behind — the design *is* the object, the number, and the motion. The six colors are functional, so the usual palette work is inverted: I'm not choosing hues, I'm re-deriving values for a medium (emissive, black-backed) that the pigment values were never made for. And there are no haptics, which means the motion spec isn't polish — it's the primary interaction surface, and vague easing language would have been a failure to deliver the actual product.

**The feel.** A black room with one saturated object in it. Precise, quiet, slightly severe, uninterested in entertaining you. It should read as a timing instrument you picked up, not a game you launched. Every bit of delight is in how the cube moves under the thumb, not in anything decorating the screen.

**The decision I made, stated so it can be argued with: the chrome is achromatic, and the puzzle owns every hue in the product.** The obvious move for a dark cube app in 2026 is the neon/glass thing — glow, gradients, a violet or cyan brand accent, radial spotlight behind the cube. The user already rejected that direction, and the detector's standing shortlist literally names `radial-spotlight-glow`. But routing around it left me needing an accent, and I went in circles: a green "ready" light quotes the Stackmat ritual but green is a sticker color; a magenta alarm hue is safely outside the cube's hue set but lands 20° from cube red and smells like importing a seventh color to solve a problem I created. The resolution is the part I'm happiest with — **the alarm hue is drawn from the active palette's own red slot, and "go" is rendered as pure white rather than green.** That produces a free systemic win: a user on the colorblind palette gets an alarm color they can actually see, because the alarm follows the palette. Constraint produced the right answer.

**True black is a functional call, not a style one.** Any tint in the background shifts perceived sticker hue by simultaneous contrast, and this app asks you to name six hues in a tenth of a second. Neutral zero. It's also correct on OLED. The consequence is that shadows are invisible, so **depth is luminance plus a hairline, and the app has exactly one `box-shadow` in it.**

**On the six colors.** The naive-pigment failure is specific and worth naming: Rubik's own blue `#0051BA` sits at 0.13 relative luminance, green at 0.28, red at 0.14. On true black, blue reads as a *hole punched in the cube* and the silhouette falls apart. So the real constraint isn't hue fidelity — it's keeping all six inside a luminance band well clear of the surface while holding hue separation. Everything got lifted; white came *down* off `#FFFFFF` (it blooms, and it was stealing the one value I reserved for the running timer) and went slightly cool, because a neutral white beside a warm yellow reads as cream.

**The colorblind palette was the hardest part and I did it as a real derivation.** Under deuteranopia/protanopia the space collapses to roughly two usable dimensions — L\* and the blue↔yellow axis — and the red↔green axis carries nearly nothing. That's *why* orange/green and orange/red fail: they land on top of each other in that plane. So I placed six points on the (L\*, b\*) plane with a guaranteed minimum separation, which is what an HCL search converges on anyway. Green becomes cyan and red becomes rose — the two moves that get those hues onto the blue side and stop them competing with orange. Face *assignments* don't move, so BOY topology and a cuber's sense of "the face opposite orange" survive. Weakest pair lands at ≈31 in that plane; I've specified it as a Vitest invariant rather than a claim, including asserting that Cardinal *fails* deutan on exactly the two pairs that justify Universal existing.

That palette then forced a real consequence I nearly missed: it encodes information in lightness, so my flat-shading ramp would have eaten it. Universal compresses the ramp and widens the sticker gap so form is read from the grid instead of from value.

**Type.** I rejected the reflex pairing (characterful display face + neutral body) because in this app the headline *is a number*. So the mono is the identity face, not the bolted-on timestamp font. Monospace over a proportional face with `tabular-nums` was a layout-stability call — at 100Hz redraw I want fixed advance by construction, not by an OpenType feature a fallback might not carry. I opened the specimens: Geist Mono's digits are open and unambiguous and hold at 74px; Supreme's squared terminals belong beside a hard-cornered sticker in a way Cabinet Grotesk's warmer curves don't. The one detail I'd defend hardest: **the hundredths are set at 62% size at 0.55 opacity while running and brighten to full on stop.** The flickering digit is noise mid-solve and the whole point of the number afterward.

**Motion.** I spent most of the effort here because it's the tactile channel. The load-bearing numbers: 1:1 follow with *zero* smoothing (any lerp between finger and layer kills the illusion); a snap spring at ζ=0.77 giving **2.3% overshoot and a ~170ms settle**, which is the number that reads as plastic — critically damped reads as software, past ~5% reads as rubber; the clack at **70ms after release**, which is perceptually when the layer seats. The 45° tick is the plan's "you feel it decide which way it wants to snap," made audible.

The orbit got the decision I'd most expect pushback on: **it always lands on one of eight canonical three-quarter views.** Free-floating orbit strands the cube in oblique poses where stickers are foreshortened and unreadable at speed. And because a rotation is 0 under OBTM and never logged, **the orbit is silent** — sound means the puzzle changed. That rule fell straight out of the spec's own metric.

**Usability, since this is a product surface wearing a brand surface's clothes.** Two things I moved on proximity grounds: the move count sits beside Undo, not under the timer, because Undo is what changes it (under the timer would be prettier and would be wrong); and the `PRACTICE · NO RECORD` qualifier sits directly under the number it disqualifies. No spinner on cold start — the app renders the solved cube and **scrambles itself in front of you**, which covers the solver's 350ms warm-up honestly and is a better first second than a loader. Every reserved row is reserved from first paint.

---

## Result

Written verbatim into `/Users/erickanney/builder/projects/quarter-turn/src/interfaces/@brand/` — `colors.md`, `typography.md`, `visual.md`, `tokens.json`. Regenerate with `node ~/builder/bin/build-tokens.mjs .`

### Type
- **Supreme** — Fontshare, free commercial. https://www.fontshare.com/fonts/supreme — weights 400/500/700/800. Words.
- **Geist Mono** — Vercel, OFL. https://vercel.com/font — weights 400/500/600. Anything measured.
- Rule: *measurement → mono; language → Supreme.*
- Timer anchor: `Geist Mono 500 / clamp(4rem, 19vw, 5.25rem) / -0.045em / line-height 0.92`, hundredths at 62% size, opacity 0.55 running → 1.0 stopped, size never changes.
- Self-host woff2, preload both, `font-display: block`, precache in the SW. Subset the mono to digits `. : + - = ′ U D F B L R M E S x y z w`.
- Prime mark is `′` (U+2032), never `'`.

### Color
Surfaces `#000000` void / `#0D0E11` slate / `#16181C` graphite / `#141518` cube body. Ink `#FFFFFF` (reserved: running timer, primary label, live state) / `#C9CDD3` / `#878D96` / `#4E545C`. Lines `rgba(255,255,255,0.10)` and `0.28`. Alarm `#FF4A5C` (Cardinal) / `#F55E92` (Universal). Dark-only by construction; both token slots identical, `data-theme="dark"` hard-set.

**Cardinal (default, BOY retuned):** U `#ECEFF2` · D `#FFC81E` · F `#0BC25E` · B `#2E7BFF` · L `#FF7A1A` · R `#FA2F45`

**Universal (colorblind-safe, derived):** U `#F1F4F7` · D `#F5C518` · F `#22C7E0` · B `#2A62E0` · L `#D9660F` · R `#E8497F`

Verification ships as a test: Brettel-Viénot-Mollon simulation × {normal, deutan, protan, tritan}, assert CIEDE2000 ≥ 20 across all 15 pairs. Universal passes all four; Cardinal is asserted to *fail* deutan/protan on Verde-vs-Ember and Ember-vs-Signal.

### Cube rendering
Perspective 28° fov, default azimuth +45° / elevation +24°, projected bbox = 78% of stage width, never any roll. Sticker inset 6% of cubie face (9% on Universal), **corner radius 0**, unbeveled silhouette, no gloss/specular/AO/bloom. Flat view-space shading, multipliers `up 1.00 / toward 0.88 / left 0.82 / right 0.76 / away 0.76 / down 0.70`, blended by squared positive normal components, **applied in linear light**. Check: Verde at k=0.88 → `#0AB758`, at k=0.76 → `#08AC52`.

### Motion (the numbers)
- Grab ack ≤ **60ms**: stickers to k×1.06, 1px `rgba(255,255,255,0.22)` layer outline.
- Follow **1:1, no smoothing**. Gain: 0.42 × cube edge = 90°. Tick at each 45° crossing.
- Flick threshold **900°/s**. Snap spring `{stiffness: 520, damping: 26, mass: 0.55}` + release velocity → 2.3% overshoot, ~170ms. CSS fallback `110ms + (|Δ|/90°)×100ms`, `cubic-bezier(0.18, 0.92, 0.22, 1.055)`.
- Clack at **release + 70ms** (capped at 0.6× settle). Web Audio, three layers, ±9% bandpass / ±1.5 dB per-strike variation.
- Refusal: asymptotic 5° ceiling `5° × (1 - e^(-d/28))`, return spring `{700, 34, 0.5}` (~130ms, no bounce), 120Hz lowpassed thunk at −24 dBFS, one uppercase line in the notation slot for 1400ms.
- Orbit: 0.55 × viewport = 180°, pitch clamped ±72°, momentum `e^(-t/260ms)` cutoff 12°/s, then **snaps to one of eight canonical views** (yaw 45/135/225/315, pitch ±24) via `{180, 24, 1}` ≈ 340ms. Silent.
- Undo: `{620, 30, 0.5}` ≈ 130ms, clack at 0.85 gain / bandpass −20%, queued taps flat 90ms.
- Reduced motion: 90ms linear snaps, τ→0, no stagger — **sound unaffected**, it's the accessibility affordance here.

### Layout (Solve, 390×844 reference)
24px gutter. Rows: safe-top / 36 rail / 8 / **148 readout (fully reserved: timer 68 + qualifier 20 + splits 44)** / 1fr stage / 32 notation / 8 / 64 control bar / safe-bottom. Never scrolls. Two radii only — 8px controls/sheets, 0px stickers. No pills, no circles except the two Stackmat hold discs. No shadows except the sheet's `0 -24px 48px rgba(0,0,0,0.65)` scrim. Lucide icons at `stroke-width: 1.75; linecap: square; linejoin: miter`, **never without a word**.

### Screen inventory (for voice-writer)
1. **Solve** — states: `Scrambled/idle` · `Inspecting` (comp) · `Armed` (holding) · `Running` · `Solved` · `Practice` · `Refused` (transient, 1400ms).
2. **Mode sheet** — Casual / Competition, one line of explanation each.
3. **Menu sheet** — the four destinations.
4. **Records sheet** — segments `FASTEST | FEWEST MOVES | HISTORY`; needs the OBTM disclosure line.
5. **Solve detail** — `T + X = F`, splits, move count, scramble, solution notation, practice mark, the CFOP-scope footnote.
6. **Daily sheet** — today's scramble, today's board, yesterday's best; needs the "per-device, not shared" line.
7. **Patterns sheet** — Checkerboard / Cube in a cube / Superflip, each with its own move record.
8. **Settings sheet** — palette (Cardinal / Universal), sound on/off (with the "this stands in for haptics" line), timer mode, About/regulations note.
9. **Palette preview** — inside Settings, live mini-cube + six swatches, previewable before commit.
10. **First-run overlay** — two lines (drag a sticker / drag the background), dismisses on touch.
11. **Browser-tab notice** — the one-time add-to-home-screen banner.
12. **Hint reveal** — in-place on Solve: next-move token above the notation strip, 2px white outline on the affected layer, plus the permanent qualifier. Needs the "this is the solver's route, not yours" caveat copy.

Copy slots that carry real risk and want your attention: the OBTM slice-cost disclosure, the Ao12-is-not-WCA label, the CFOP scope qualifier, the hint caveat, and the seven refusal reasons.

### Generated asset (one)

**App icon — `icon-1024.png`, 1024×1024**

```
A 3D icon of a cube puzzle caught mid-turn, filling the frame edge to edge with no border,
no rounded corner and no padding, on a pure black background. The cube is seen in a
three-quarter view, tilted so its top face and two side faces are all visible, and it
occupies the central eighty percent of the frame with even black margin on every side. Its
entire top layer is frozen rotated forty-five degrees out of alignment with the two layers
beneath it, breaking the silhouette into a clean interlocking step. Every small square face
is a flat, fully saturated block of pure color -- chalk white, warm gold, spring green,
electric blue, bright orange, crimson -- with hard square corners, no gloss, no reflection,
no highlight, no bevel. The gaps between squares are near-black graphite. Lighting is flat
and graphic: top faces brightest, side faces one step darker, no gradients, no shadow.
Centered, symmetrical, high contrast.
```

Derive `icon-192`, `icon-512`, `icon-512-maskable`, `apple-touch-icon-180` from the master — the 80% safe zone is what makes the maskable crop survive. Launch image is the same mark as SVG on `#000000`, generated in code. **iOS copies the home-screen icon once at install and never re-reads it, so this must be final before anyone adds the app.**

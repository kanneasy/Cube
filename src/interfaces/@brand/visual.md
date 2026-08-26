---
name: Visual Identity
description: A hard-edged instrument in a black room — one saturated object, achromatic chrome, and motion doing the work of touch.
---

# Visual identity

## The feel

You open it and there is a cube in a black room, already scrambled, already waiting. No
splash, no menu, nothing to dismiss. The room is genuinely empty — true black to every
edge — so the only thing carrying color is the puzzle, and the only thing carrying weight
is the number above it. It should feel like picking up a well-made timing device, not like
opening a game: precise, quiet, slightly severe, and completely uninterested in
entertaining you. The delight lives entirely in how the cube moves under your thumb.

**Register.** The Solve screen is a **product surface pretending to be a brand surface**.
It has the atmosphere of a hero, but everything on it is operated, so it obeys product
rules: state is affirmative, controls sit with what they control, motion is fast and
purposeful. The sheets behind it — records, daily, patterns, settings — are unambiguously
product surfaces: dense, tabular, quiet.

## The signature object: how the cube is drawn

This is the whole product, so it is specified to the number.

**Camera.** Perspective, not orthographic — orthographic reads as a technical diagram and
this needs to read as an object you could pick up. Narrow field of view so the distortion
stays honest.

~~~ camera
fov: 28deg vertical, perspective projection
target: cube center at origin
default view: azimuth +45deg, elevation +24deg  (shows U, F and R)
framing: the cube's projected bounding box is 78% of the stage's width
No camera roll, ever. The horizon of the cube stays level.
~~~

**Geometry.**

~~~ cube-geometry
Cubie face = square. Sticker inset 6% of the cubie face width on all four sides; the
inset shows the body color, and that gap is what makes the 3x3 grid read.
Sticker corner radius: 0. Perfect squares.
Cube outer silhouette: unbeveled, unrounded. A hard cube.
Body / plastic color: --color-body (#141518).
No inner cavity detail, no screw wells, no torpedoes, no logo.
(On the Universal palette, sticker inset widens to 9% -- see colors.md.)
~~~

Square stickers are the decision. The obvious move is the softly rounded rectangle every
physical cube uses and every cube app copies; going fully square is what makes this read
as a flat, modern, designed object rather than a render of a toy.

**Shading — flat, graphic, and anchored to the screen.** A flat-shaded cube with no
shading at all collapses into a hexagon: three visible faces of the same color become
indistinguishable and the form disappears. So there is shading, but it is not a light. It
is a fixed per-direction value ramp evaluated in **view space**, which means the shading
stays anchored to the screen while the cube orbits. That is the trick that keeps it
reading as a graphic rather than as a lit object.

~~~ face-shading
Per-axis multipliers, in view space:
  up      1.00
  toward  0.88
  left    0.82
  right   0.76
  away    0.76
  down    0.70

For an arbitrary face normal N (view space), blend by the squared positive components:
  k = SUM over the 6 signed axes of ( max(0, dot(N, axis))^2 * k_axis )
Exactly three axes can be positive and their squares sum to 1, so this is exact at the
axes and smooth between them.

Apply k in LINEAR light, not on the sRGB byte values:
  linear = srgb_to_linear(base); shaded = linear_to_srgb(linear * k)

Worked example, Verde #0BC25E:
  k = 0.88  ->  #0AB758
  k = 0.76  ->  #08AC52
Implementations that multiply the hex bytes directly will land a few points off and
desaturate; check against these two values.

On the Universal palette the ramp compresses to 1.00 / 0.94 / 0.88 / 0.86 / 0.86 / 0.84,
because that palette encodes information in lightness and a wide ramp would eat it.
~~~

No gloss, no specular, no environment map, no ambient occlusion, no bloom, no post
effects. If a rendering technique makes it look more like plastic, it is wrong.

## Motion — the app's entire sense of touch

iOS Safari has no vibration API. There are no haptics available at all. Motion and sound
carry the whole tactile burden, so these numbers are the product, not decoration.

### Grabbing a layer

Touch begins on a sticker. **Within 60ms** the app must acknowledge — this budget is
absolute, because with no haptic there is no other confirmation that the touch registered.

- The grabbed layer's nine stickers lift to `k × 1.06` (clamped at 1.0).
- A 1px `rgba(255, 255, 255, 0.22)` hairline traces the layer's outer boundary.
- Both appear over 60ms, `cubic-bezier(0.16, 1, 0.3, 1)`. Both clear on release over 120ms.

### Following the thumb

**Zero smoothing and zero lag. The layer's angle tracks the finger 1:1.** Any lerp, spring
or damping between finger and layer destroys the illusion of touching a physical thing.
This is the single most important feel decision in the app; if it is wrong, nothing else
matters.

~~~ turn-follow
gain: a drag of 0.42 x (the cube's on-screen edge length) along the layer's tangent = 90deg
clamp: +/-180deg of live rotation
axis resolution: a sticker gives exactly two valid tangents; take the one with the larger
  projection of the first 8px of travel, then lock it for the rest of the gesture
~~~

**The detent.** Crossing a 45° boundary — the moment the nearest quarter turn changes — is
the "you feel it decide which way it wants to snap" moment. It plays a **tick**: 8ms,
bandpassed noise at 3.1kHz, −26 dBFS. Nothing visual. It is very quiet and it is the
difference between dragging a shape and turning a mechanism.

### The snap

On release, two paths:

- **Flick** — release angular velocity ≥ 900°/s: fire to the next quarter turn *in the
  direction of travel*, even if the layer has moved less than 45°.
- **Settle** — below 900°/s: go to the nearest 90° multiple.

Either way the animation is the same spring, and the release velocity is passed into it as
initial velocity — that is what makes a flick feel like a flick rather than like a
command.

~~~ turn-snap
spring: { type: "spring", stiffness: 520, damping: 26, mass: 0.55, velocity: <release rad/s> }
  natural frequency 30.7 rad/s, damping ratio 0.77
  => 2.3% overshoot (about 2.1deg on a 90deg carry), settles in ~170ms, no second bounce

CSS fallback where a spring is not available:
  duration: 110ms + (|delta| / 90deg) * 100ms, clamped [110ms, 210ms]
  easing:   cubic-bezier(0.18, 0.92, 0.22, 1.055)
~~~

2.3% overshoot is the number that reads as *plastic*. Critically damped reads as software;
more than about 5% reads as rubber.

**The clack.** Fires **70ms after release** — capped at `0.6 ×` the predicted settle time
so a fast flick does not clack after it has already arrived. 70ms is when the layer is
roughly three-quarters of the way home and moving fast, which is perceptually the moment
it seats. Firing at release feels disconnected from the picture; firing at arrival feels
laggy.

~~~ clack
Synthesised in Web Audio -- no sample files, so the PWA stays small and every strike can
vary. Three layers, total length ~85ms:
  transient  3ms sine at 4200Hz, -20 dBFS, at t=0
  body       18ms bandpassed noise, center 1900Hz, Q 1.4, exp decay -14 dBFS -> 0 over 55ms
  thud       40ms sine at 168Hz, exp decay, -18 dBFS  (gives it weight on a phone speaker)
Per-strike variation: bandpass center +/-9%, total gain +/-1.5 dB, randomised each time.
Without that variation twenty turns in a row read as a machine beeping.

Audio unlock: resume the AudioContext on the very first touchstart of the session. iOS
requires a user gesture and a silent first turn would be a broken first impression.
~~~

### A refused drag

Nothing about the cube is illegal to turn, so a refusal only ever means the app is in a
state where the puzzle must not change: after a solve has stopped the clock, during
competition inspection (applying a move there is a DNF under A3c1, so the app refuses
rather than allows-and-penalises), and during the hold-to-start.

The refusal must read as *locked*, not as *ignored*.

~~~ refusal
Live: the layer follows, but asymptotically to a 5deg ceiling.
  angle = 5deg * (1 - e^(-d / 28))    where d = projected drag in degrees
Release: return to 0.
  spring: { stiffness: 700, damping: 34, mass: 0.5 }  -> damping ratio 0.91, ~130ms, no bounce
Sound: a dull thunk -- 45ms sine at 120Hz, lowpassed at 400Hz, -24 dBFS. Deliberately
  duller and quieter than the clack. It is the sound of something not moving.
Message: one line of Supreme 700 11px/0.12em uppercase in --color-ink-56, in the notation
  strip's slot, replacing it for 1400ms. Fade in 120ms, out 200ms. No layout shift --
  the strip's height is already reserved. (Copy is voice-writer's.)
~~~

### Orbiting the view

A drag that begins on the background rotates the whole cube. **A rotation is not a move
under OBTM, is never logged, and never starts the clock — so it is also silent.** That is
the rule: *sound means the puzzle changed.*

~~~ orbit
Follow: 1:1, no smoothing.
  horizontal drag of 0.55 x viewport width = 180deg of yaw
  vertical   drag of 0.55 x viewport width = 180deg of pitch, clamped to +/-72deg
  (the clamp exists so the user never ends up edge-on and disoriented)

Momentum on release:
  omega(t) = omega_0 * e^(-t / 260ms), cut off below 12deg/s
  a 900deg/s flick carries about 230deg over roughly 700ms

Settle -- the decision: the orbit always lands on one of EIGHT canonical three-quarter
views. Once momentum falls under the cutoff:
  yaw   eases to the nearest of 45 / 135 / 225 / 315 deg
  pitch eases to the nearest of +24 / -24 deg
  spring: { stiffness: 180, damping: 24, mass: 1 } -> damping ratio 0.89, ~340ms, 0.4% overshoot
Every one of those eight poses shows three faces cleanly. A free-floating orbit leaves the
cube in oblique poses where stickers are foreshortened and unreadable at speed; snapping
means the cube is never left in a pose you cannot solve from.
~~~

### Undo

Undo replays the inverse turn with a **tighter** spring than a hand turn, so it reads as
the machine doing it rather than as you doing it.

~~~ undo
spring: { stiffness: 620, damping: 30, mass: 0.5 }  -> damping ratio 0.85, ~130ms
Sound: the clack at 0.85 gain with the bandpass center dropped 20% (to ~1520Hz).
Queued taps: if more than two are pending, each runs at a flat 90ms so holding undo scrubs.
The move count decrements on the SAME frame the animation starts, and the numeral plays
  translateY(-2px) -> 0 with opacity 0.4 -> 1 over 120ms so the change is seen. Tabular
  figures mean the row never reflows.
~~~

### The timer's own motion

The digits never animate. No odometer roll, no counting-up flourish — at 100Hz that is
noise. Only the *state transitions* animate.

~~~ timer-motion
idle -> running: color --color-ink-56 -> --color-ink over 160ms; hundredths opacity
  1.0 -> 0.55 over 160ms. Size never changes, so nothing reflows.
running -> stopped: transform scale(1) -> 1.04 -> 1 over 260ms,
  cubic-bezier(0.34, 1.56, 0.4, 1), on a transform-only layer so no reflow;
  hundredths opacity 0.55 -> 1 over 200ms;
  the four splits reveal beneath with a 60ms stagger, each translateY(6px) -> 0 and
  opacity 0 -> 1 over 260ms, cubic-bezier(0.16, 1, 0.3, 1).
The splits row's 44px height is RESERVED from first paint. It never inserts into flow.
Solve sound: one clean low tone, not a fanfare -- 220Hz + 330Hz sines, -12 dBFS,
  320ms exponential decay. The clock stopping is the event; the sound only marks it.
~~~

### The cold start — and why there is no spinner

`cubing.js` needs about 350ms to warm its tables. Rather than hide that behind a spinner
(a named enemy, and a lie), **the app renders the solved cube immediately and then scrambles
itself in front of you.**

~~~ cold-start
First scramble of a session: 20 turns at 45ms each, ~900ms.
Subsequent scrambles: 26ms per turn, ~560ms.
Sound: the clack at 0.35 gain, so it reads as a soft rattle rather than twenty strikes.
Tapping anywhere jumps to the end state instantly.
~~~

### Reduced motion

`@media (prefers-reduced-motion: reduce)`: turn snaps become 90ms linear with no
overshoot; orbit momentum τ goes to 0 (the cube stops when the finger lifts) and the
canonical settle runs 160ms linear; the stop flourish and the splits stagger are removed
and the splits appear at once; timer state changes are instant; the auto-scramble
resolves in one step. **Sound is unaffected** — with no haptics available, audio is the
accessibility affordance here, not the thing being reduced.

## Chrome

**Two radii and nothing else. There are no pills and no circles**, except the two
hold-to-start discs, which are circles because they are quoting a Stackmat's sensors.

- `--radius-control: 8px` — every button, chip, tag, row and sheet corner.
- `--radius-sticker: 0px` — the cube, and any full-bleed rule.

**Borders** carry what shadows normally would. `--color-line` at rest,
`--color-line-strong` when armed or selected.

**Elevation is luminance, not shadow.** A sheet is `--color-slate` with a
`1px solid rgba(255,255,255,0.12)` top edge. The only `box-shadow` in the product is the
scrim a sheet casts down over the stage.

**Icons.** Lucide, with its defaults overridden to match the hard-edged language:
`stroke-width: 1.75; stroke-linecap: square; stroke-linejoin: miter;` in a 20px box.
Rounded caps would be the only soft corners in the app. **No icon appears without a
word** — every control is icon plus an uppercase label, or a label alone.

## The Solve screen — composition

Fixed grid. **This screen never scrolls, in any state, on any device.**

~~~ solve-grid
Reference device 390 x 844pt, safe insets 59 top / 34 bottom.
Page gutter: 24px inline, everywhere.

grid-template-rows:
  max(env(safe-area-inset-top), 12px)     /* 59 */
  36px    status rail
  8px
  148px   readout      (timer 68 + 8 + qualifier 20 + 8 + splits 44) -- fully reserved
  1fr     stage        (min-height 320px; 471px on the reference device)
  32px    notation strip
  8px
  64px    control bar
  max(env(safe-area-inset-bottom), 12px)  /* 34 */

viewport-fit=cover; height in dvh. Tap targets end at least 8px above the bottom inset so
nothing sits under the home indicator. Portrait-locked via the manifest; if a landscape
render happens anyway, the readout moves to a left column and the stage takes the rest.
~~~

**Why the timer is above the cube and the notation below it.** During a solve the hand
occupies the lower third of the screen, so the number that matters lives in the upper
visual field where nothing occludes it. The notation strip grows underneath the cube,
where the plan puts it and where it is glanceable without being the thing you are reading.

**Status rail (36px).** Left: the mode chip — `--color-graphite` fill, `--color-line`
border, 8px radius, 28px tall, 12px inline padding, `label` type in pure white, reading
`CASUAL` or `COMPETITION`. This is affirmative state: the mode is always legible without
opening anything, and tapping the chip is how you change it. Right: `MENU` in `label` type,
`--color-ink-56`, with a three-bar glyph, in a 44px hit box.

**Readout (148px, all four rows reserved).**
- The timer, left-aligned to the gutter.
- A 20px **qualifier line** directly under it — normally empty; carries `PRACTICE · NO
  RECORD` when a hint has been taken, or `+2` / `DNF` when a penalty applies. It sits
  against the number it disqualifies, which is where proximity puts it.
- A 44px **splits row**: four columns, each a `micro` label over a `data` value.
  `CROSS` and `SOLVED` carry no qualifier. `F2L` and `OLL` render their label as
  `F2L` followed by `CFOP` at `micro` size in `--color-ink-32` — the scope limit stated
  affirmatively rather than buried. When a solve is not CFOP-shaped those two columns show
  `—` with the labels intact, and the Solve detail sheet explains why.

**Stage (1fr).** Nothing but the cube. No grid, no glow, no vignette, no floor, no
reflection. The cube never touches or passes under any chrome.

**Notation strip (32px).** One line of `notation` type in `--color-ink-56`,
**right-aligned and overflowing to the left**, with a 32px left fade
(`mask-image: linear-gradient(to right, transparent, black 32px)`) so the newest move is
always pinned at the right edge. Each new token enters with `opacity 0 → 1,
translateX(6px) → 0` over 140ms. **Before the first move this slot shows the scramble**,
prefixed with a `SCRAMBLE` label — reusing the reserved height rather than adding chrome.
It also carries refusal messages.

**Control bar (64px).**

```
[ ‹ UNDO ]   24        HINT [ ? ]
             MOVES
```

- **UNDO**, left: 72 × 48 hit box, 8px radius, transparent fill, `--color-line` border,
  `label` type in `--color-ink-80`, chevron-left glyph 6px to the left of the word.
  Disabled at zero moves and after a solve: border drops to `rgba(255,255,255,0.06)`, text
  to `--color-ink-32`. A visibly present, visibly inert control — never a hidden one.
- **The move count**, 16px to the right of Undo: `metric` type in `--color-ink-80`, with
  `MOVES` in `micro` type beneath. **It sits beside Undo because Undo is what changes it.**
  Putting it under the timer would be prettier and would break proximity.
- **HINT**, right: same button spec as Undo. Taking a hint does not disable it — it lights
  the qualifier line in the readout permanently, which is where the consequence actually
  lands.

## Records, history and the sheets

Product surfaces. Dense, tabular, quiet.

- Sheet: `--color-slate`, top corners 8px, max height 88dvh, drag-to-dismiss, hairline top
  edge. Enters `translateY(100%) → 0` over 320ms `cubic-bezier(0.16, 1, 0.3, 1)`; the
  stage behind dims to `rgba(0,0,0,0.5)` over the same 320ms.
- Rows are **56px separated by a 1px `rgba(255,255,255,0.08)` rule — not cards.** No card
  ever nests inside another container in this app.
- Row grid: rank (`data`, `--color-ink-32`, 24px column) · result (`metric`,
  `--color-ink-80`, with any `+2` / `DNF` inline in `label` type) · date (`label` type,
  `--color-ink-56`, right-aligned).
- **The current personal best carries two affirmative marks**: a 3px pure-white bar down
  its left edge, full row height, and its value in pure white. Never a badge, never a
  colored background.
- Segmented control at the sheet head — `FASTEST | FEWEST MOVES | HISTORY`. The selected
  segment gets `--color-graphite` fill **and** white text **and** a 2px white underline.
  Three marks, because this is the state the whole sheet's meaning depends on.

## Competition mode: inspection and the hold

The hold zone is a literal, deliberate quote of a Stackmat.

- A 148px full-width zone across the bottom, `--color-void`, hairline top edge, holding
  **two 96px circles** side by side — the two sensor pads.
- Resting: `1px solid --color-line-strong`, unfilled.
- One finger down: that circle fills `rgba(255,255,255,0.16)`.
- **Both down: both circles fill pure white over 180ms** and a 2px white rule connects
  them. This is the green light, rendered white — because green is a sticker color and no
  hue in the chrome may compete with the puzzle. It is the app's one deliberate deviation
  from the ritual, and the compensation is that it is the brightest thing on screen.
- Lift: the clock starts on the frame that drops below two contacts (A4d). Circles fade
  over 120ms, the zone exits `translateY(100%)` over 200ms
  `cubic-bezier(0.32, 0, 0.67, 0)`.

Inspection counts **down** from 15.0 at one decimal, in the timer's slot:

| Elapsed | Treatment |
|---|---|
| 0–8.00s | number in `--color-ink-56` |
| 8.00s (the judge's call) | snaps to pure white; one 900Hz tone, 60ms |
| 12.00s (the second call) | white plus a 2px underline the width of the number; two tones |
| ≥ 15.00s | the number's box inverts — white fill, black digits — and a `+2` tag lights in the alarm hue beside it |
| ≥ 17.00s | the box fills with the alarm hue, black digits, tag reads `DNF` |

Each threshold is an inversion or a fill, never a color change alone, so it survives both
a colorblind viewer and a glance.

## The mark and the icon

The app's mark is a 3×3 grid of squares whose **top row is offset by a quarter turn** —
the atomic unit the app is named for, frozen. It is drawn as SVG in-app (menu head,
settings, empty states); only the home-screen icon is generated.

**iOS copies the home-screen icon once, at install, and never re-reads it.** The final icon
ships before anyone installs, or changing it later means deleting and re-adding the app.

App icon — `icon-1024.png`, 1024×1024

```
A 3D icon of a Rubik's-style cube frozen mid-turn, filling a full bleed square
composition with no padding or margin, on a pure black background. The cube's entire top
layer is twisted forty-five degrees out of alignment with the two layers beneath it: at
each of the top layer's four corners a small triangular notch cuts into the outline and
reveals near-black plastic underneath, and the outer edge of the object is a stepped,
notched silhouette, never a plain straight-sided box. The cube is centered with identical
black margin on all four sides -- left, right, top and bottom the same width -- occupying
the central eighty percent of the frame on both axes. Seen in a three-quarter view tilted
so the top face and two side faces are visible. Every small square sticker is a flat,
fully saturated block of pure color with hard square corners, no gloss, no reflection, no
highlight, no bevel: a cool pale grey-white (never cream, never yellow) visible on at
least one face, a warm muted gold rather than lemon yellow, a true spring green leaning
cool rather than olive or lime, a clear mid-value blue with a faint violet cast rather
than a pure primary blue, a bright tangerine orange, and a deep crimson red with a hint of
magenta rather than fire-engine red. The gaps between squares are near-black graphite.
Lighting is flat and graphic: top faces brightest, side faces one step darker, no
gradients, no shadow. Centered, symmetrical, high contrast.
```

This brief was rewritten on 2026-08-26 after the first generation failed the image gate.
Two lessons are baked into the wording above and should not be edited back out. The
offset top layer is described by its **visible geometric result** -- corner notches, a
stepped silhouette -- because stating the instruction abstractly produced a flush, solved
cube with a cosmetic colour stripe standing in for the offset. And each hue is stated as a
relationship *against the generic version it drifted to*, with the near-white called out
explicitly, because it vanished entirely on the first attempt.

Derive `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` and
`apple-touch-icon-180.png` from the 1024 master; the 80% safe zone in the brief is what
makes the maskable crop survive. The iOS launch image is the same SVG mark centered on
`#000000` — generated in code, not by a model.

## The five-second test

Black room. One saturated object. One number. Nothing else asking for attention. If a
screenshot of this app has more than one thing in it carrying color, something has gone
wrong.

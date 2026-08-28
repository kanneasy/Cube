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

The camera NEVER moves and never rotates. It sits at (0, 0, distance), up (0, 1, 0),
looking at the origin. ALL orientation lives in the cube's own quaternion; zoom is the
only thing that touches `distance`. This is what keeps the shading ramp anchored to the
screen and what removes gimbal lock from the orbit -- see "Orbiting and zooming".

Default pose, the first frame of every launch -- the three-quarter view showing U, F, R:
  q_default = Rx(+24deg) * Ry(-45deg), applied to the cube (Ry first, then Rx)
  Check: U's normal lands at view-space (0, 0.9135, 0.4067),
         F at (-0.7071, -0.2876, 0.6459), R at (0.7071, -0.2876, 0.6459).

Framing is measured on a ROTATION-INVARIANT quantity. A free-rotating cube's projected
bounding box swings from 3.0 to 5.196 world units with pose, so framing on it would make
the cube breathe as it turned.
  S = the on-screen size of ONE WORLD UNIT at the cube's centre depth, in CSS px
      S = (stage height px / 2) / (distance * tan(fov / 2))
  D = 3S = the cube's on-screen FACE WIDTH -- how wide a face reads seen straight on.
  f = D / stage width px.   Resting f = 0.55.
  => distance = 1.5 * (stage height px) / (f * stage width px * tan 14deg)

On the 390x844pt reference device (stage 342 x 471px): S = 62.9px, D = 189px,
distance = 15.06. At the default pose that puts the projected silhouette at 78% of the
stage width -- identical to the framing this spec carried before, restated in a form that
survives free rotation.
~~~

**The camera never rolls; the cube can end up rolled, and that is fine.** A screen-space
trackball composes rotations that do not commute, so a loop of drags leaves the cube
visibly twisted. On an object with a canonical up that would be a defect. A cube has 24
identical orientations and no up, so a "rolled" pose is just a pose. What matters is that
the *camera* stays level, because the value ramp below is anchored to it: top is bright
and bottom is dark on screen no matter what the cube is doing.

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
STICKER ramp -- per-axis multipliers, in view space:
  up      1.00
  toward  0.88
  left    0.84
  right   0.72
  away    0.72   (never used: an away-facing sticker is back-facing and culled)
  down    0.66

For an arbitrary face normal N (view space), blend by the SQUARED positive components:
  k = SUM over the 6 signed axes of ( max(0, dot(N, axis))^2 * k_axis )
Exactly three axes can be positive and their squares sum to 1, so this is exact at the
axes, smooth between them, and needs NO normalising divide. An implementation that blends
by the raw components and divides by their sum is a different, flatter interpolation --
it agrees only at the axes, and free rotation makes off-axis normals the common case.

Apply k in LINEAR light, not on the sRGB byte values:
  linear = srgb_to_linear(base); shaded = linear_to_srgb(linear * k)

Worked example, Verde #0BC25E:
  k = 0.88  ->  #0AB758
  k = 0.84  ->  #09B356
  k = 0.72  ->  #08A750
Implementations that multiply the hex bytes directly will land a few points off and
desaturate; check against these three values.

BODY ramp -- the plastic takes the same view-space blend with its OWN, much wider
multipliers, applied to --color-body (#141518) in linear light:
  up 3.00  toward 1.90  left 1.50  right 0.90  away 0.90  down 0.50
  ->  #28292E / #1E2024 / #1A1B1F / #131416 / #131416 / #0B0C0E
Identical on BOTH palettes. The body is achromatic and carries no palette information, so
nothing is lost by giving it a wide ramp -- and it is the only form cue that survives the
Universal palette's compressed sticker ramp. Implementation: the cubie box takes an array
of six materials indexed by local face, shaded in the same per-frame loop as the stickers
(26 x 6 = 156 colour writes, negligible).

While CONCEALED (competition inspection) the body ramp is NOT applied: the plastic renders
flat at #141518 and every sticker renders at body x 1.9 x k_sticker, exactly as before.
Ramping both would put the inset lighter than the sticker and invert the grid.

On the Universal palette the STICKER ramp compresses to 1.00 / 0.94 / 0.88 / 0.86 / 0.86 /
0.84, because that palette encodes information in lightness and a wide ramp would eat it.
~~~

**Why the sticker ramp widened.** The old ramp separated the two side faces of a
three-quarter view by only 3.6% (0.835 vs 0.805) -- two adjacent same-coloured faces
nearly merged, at the *default* pose, before free rotation was even on the table. The
revision puts them 7.1% apart (0.842 vs 0.782), and holds that separation through the two
poses free rotation newly makes reachable: edge-on reads 0.86 / 0.80 and corner-on reads
0.96 / 0.823 / 0.763. Face-on is the one pose with no separation to give -- a single face
fills the silhouette -- and there the body ramp and the 3x3 grid are what say "cube."

No gloss, no specular, no environment map, no ambient occlusion, no bloom, no post
effects. If a rendering technique makes it look more like plastic, it is wrong.

## Motion — the app's entire sense of touch

iOS Safari has no vibration API. There are no haptics available at all. Motion and sound
carry the whole tactile burden, so these numbers are the product, not decoration.

### Grabbing a layer

Touch begins on the cube. **Within 60ms** the app must acknowledge — absolute, because
with no haptic there is no other confirmation the touch registered. The old spec fired
this at axis resolution, which needs travel: on a slow press that is 300ms, and on a press
that never moves it never fires at all. The budget was unmeetable by construction. It
fires at TOUCH-DOWN now, and expands.

**Stage one, pointerdown.** A square hairline RING traces the touched cubie's face,
centred in the grout between the sticker edge and the cubie edge. "I have this square."

**Stage two, engage.** The ring dissolves into the SEAM — the cut plane where the layer
will shear away — and the whole layer lifts. "This is what will turn."

The seam is the right object, not a silhouette. A silhouette of a 3x3x1 slab is a
screen-space computation that changes topology as the cube rotates; the cut is one closed
square loop in the cube's own frame, four segments, known in closed form, parented to the
root so it rotates for free. And it falls exactly in the 0.02-unit gap the geometry
already leaves between cubie rows, so the seam does not overlay the cube — it lights a
groove that is already there.

~~~ grab-geometry
RING (stage one): a square ring on the touched cubie's outer face.
  centreline half-width r = (CUBIE * (1 - 2*inset) + CUBIE) / 4
    Cardinal (inset 0.06): r = 0.4606.  Universal (inset 0.09): r = 0.4459.
  pushed 0.008 world units proud of the cubie's face plane.

SEAM (stage two): the cut plane's closed loop, on the cube's four side faces.
  layer on axis a at coordinate c = +1  ->  ONE loop at a = +0.5
                                  c = -1  ->  ONE loop at a = -0.5
                                  c =  0  ->  TWO loops, at a = -0.5 and a = +0.5
  A slice takes two cuts. That is the same fact that makes a slice cost 2 under OBTM,
  and showing it is honest.

WIDTH, both: w = max(0.02, 1.2 / unitScreenPx()) world units.
  Below f ~ 0.53 the 1.2 CSS px minimum governs, so the line never falls below legibility
  zoomed out (a world-fixed 0.02 renders 0.55px at f_min and shimmers). Above it the
  groove width governs and the seam reads as the groove itself lighting up.

MATERIAL, both:
  color #FFFFFF, additive blending, transparent, opacity 0.62,
  depthWrite false, depthTest TRUE, side DoubleSide.
  Additive is right in a renderer with flat MeshBasicMaterial, no lights and a black
  room: it lifts what is under it rather than replacing it, so it survives on plastic
  AND on a saturated sticker. On #000 it renders ~#9E9E9E -- a light line, not a glow.
  depthTest must stay TRUE: the back of the loop must be hidden or it reads as a
  wireframe box rather than a groove on a solid.
~~~

~~~ grab-lift
Applied in applyShading, in LINEAR light, gated on a `grabbed` flag so the auto-scramble
-- which also sets liveBase -- does not light layers up in sequence.

BODY   x 1.55, UNCLAMPED.  #1A1B1F -> #222428.  #0B0C0E -> #111214.  #28292E -> #33343A.
  A clear 6-11 byte step on a dark neutral against a black room, at EVERY orientation.
  Because the body is the 6% grout, this draws the grabbed layer's 3x3 grid in light
  grey. This is the lift.
STICKER x 1.10, UNCLAMPED. The clamp at 1.0 is DELETED, and it was never the reason the
  lift was weak: a multiply on an sRGB-encoded bright colour is compressed to nothing.
  Verde at 1.06 moves byte 188 -> 194; at 1.10, 188 -> 196. Four percent. It exists so
  the stickers move with the grout rather than looking dead beside it. It is not the
  signal.
~~~

~~~ grab-timing
touch-down   ring 0 -> 0.62 over 50ms LINEAR (not ease-out: its slow start is the enemy
             of "it registered now"). Full at 50ms, inside the 60ms budget.
engage       ring out, seam in, over 80ms LINEAR, and the layer lift ramps with it.
release      all -> 0 over 120ms.
reduced motion: on and off instantly. This is an accessibility affordance, like the
             sound, not a thing to reduce.
~~~

The seam is not decoration. It is the app's only affirmative marker for which layer is
under your thumb, on a surface with no haptics. **It must never be conditional.**

### Following the thumb

**Zero smoothing and zero lag. The layer's angle tracks the finger 1:1.** Any lerp, spring
or damping between finger and layer destroys the illusion of touching a physical thing.
This is the single most important feel decision in the app; if it is wrong, nothing else
matters.

~~~ turn-follow
gain: 90deg per  0.90 * S * max(0.68, |t|)  px of drag along the layer's screen tangent,
  measured from the ENGAGE POINT, not from touch-down.
  S is from the camera block. |t| is the SCREEN-PROJECTED LENGTH of the unit tangent --
  1.0 in the screen plane, 0 pointing at the camera. Read it off the same projection that
  resolves the axis, before that vector is normalised.
  At f_rest on the reference device a quarter turn is ~42px and the total stroke to
  commit is ~25px, about a sixth of the cube's on-screen face width, against a physical
  finger trick's fifth. Slightly lighter than the physical reference, which is right for
  a surface with no purchase and no springs.
  The 0.68 floor guards a near-edge-on face, where |t| -> 0 and an uncompensated gain
  explodes. It went UP as the gain came down, to hold the worst case where it was.
clamp: +/-90deg of live rotation. A drag commits at most one quarter.

ENGAGE, at 10px of travel from touch-down:
  The axis resolves from the RECENT drag vector -- current position minus the earliest
  pointer sample within the last 45ms, falling back to (current - touch-down) if fewer
  than two samples exist. Measuring from touch-down sums the thumb-roll into the stroke
  and is why 8px picked the wrong axis: a contact patch rolls further than the stroke
  has travelled.
  The turn's ORIGIN is that sample's position. The 10px is SPENT, not banked, so the
  layer starts at exactly 0deg and never pops. It also puts engage 2px clear of
  TAP_MAX_PX, so a tap can never engage a turn.

PROVISIONAL, until the live angle reaches 20deg or travel from touch-down reaches 26px:
  Re-score both candidates every move against the cumulative drag from the engage point.
  SWITCH if |score_challenger| >= 1.35 * |score_incumbent|. On a switch the old layer
  zeroes the same frame, the new layer takes the same origin, and no tick plays.
  1.35 is a ~7deg band past the bisector for tangents 75deg apart: an unambiguous
  correction, not a wobble. Both gates are needed -- the degree gate governs a normal
  stroke, the pixel gate governs a stroke running nearly perpendicular to the tangent
  where the angle would barely grow. Both close well below the commit point, so a switch
  can never take back something that looked committed.
  After the window, the axis is locked hard for the rest of the gesture.

DELETE screenEdgeLength(). It measures one specific world edge, which under free rotation
  can point straight at the camera and project to zero pixels.
~~~

**The detent.** The tick fires at the COMMIT boundary, not at the rounding boundary. It
means "past this, releasing turns the layer," which is the only mid-gesture information
worth having on a device with no haptics, and it is what teaches the threshold. It ticked
at 45° when 45° was also where a turn committed; at a 0.35 commit it would fire 13.5°
after the turn became inevitable, which is feedback about a rounding operation.

~~~ detent
fires at +/-31.5deg away from zero; re-arms at +/-24.0deg returning toward zero.
7.5deg of hysteresis, so a wobble at the boundary cannot chatter.
Sound unchanged: 8ms bandpassed noise at 3.1kHz, -26 dBFS. Nothing visual.
A refusal asymptotes to 5deg, so it never ticks. Correct: nothing will commit.
~~~

### The snap

~~~ turn-snap
Release velocity is ANGULAR velocity over the last 60ms of samples, never a single frame
delta. On iOS the last pointermove before a lift is a decelerating sample, so single-frame
sampling read near zero and the flick branch never fired on device at all.
Fewer than two samples in the window -> velocity 0 -> settle.

Flick   -- |velocity| >= 520deg/s AND |angle| >= 8deg: fire to the next quarter in the
           direction of travel. 520deg/s is ~243px/s at rest, above what a thumb
           decelerating into a lift comes off at and below a quick swipe. Going much
           lower is its own failure: nearly every release becomes a flick and the settle
           branch stops existing. The 8deg floor stops a fast release at 2deg committing
           a whole quarter.
Settle  -- otherwise, commit if |angle| >= 0.35 of a quarter (31.5deg), else return to 0.

Either way, held to a single quarter, and the release velocity is passed into the spring.

spring: { stiffness: 580, damping: 26.5, mass: 0.52, velocity: <release rad/s> }
  natural frequency 33.40 rad/s, damping ratio 0.763
  => 2.46% overshoot (1.44deg on a 58.5deg carry), settles in ~157ms, no second bounce
  Tightened because a commit now starts from 31.5deg rather than 45, so the spring
  carries 30% further -- keeping the clock the same is what stops chained turns queueing.
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

### Orbiting and zooming the view

**This section supersedes the "Orbiting the view" block of 2026-08-26, which clamped pitch
to ±72° and settled every orbit onto one of eight canonical three-quarter views.** Both
were built to protect sticker readability. On a real iPhone both read as the app refusing
to move: the clamp is a wall you hit mid-drag with no explanation, and the snap takes the
pose away from you the moment you stop. The readability concern was real and it has been
moved to where it actually belonged — the value ramp above, which now separates the two
side faces of any three-face pose by 7.1% instead of 3.6%, at *every* orientation rather
than at eight of them. Free rotation and a shading fix; not a clamp and a snap.

A one-finger drag that begins on the background rotates the whole cube. Two fingers rotate
*and* zoom it from anywhere, including from on top of the cube. **Neither a rotation nor a
zoom is a move under OBTM, neither is ever logged, and neither starts the clock — so both
are silent.** That is the rule: *sound means the puzzle changed.*

**The trackball.** Screen-space, position-independent, quaternion. Where on the background
the drag starts is irrelevant — the drag *direction* picks the axis and the drag *length*
picks the angle, so there is no dead zone, no pole, no gimbal lock, and no wall.

~~~ trackball
Follow: 1:1, no smoothing, exactly like a layer turn.
  axis  (view space, = world space, since the camera never rotates):
        normalize( dy_client, dx_client, 0 )      -- screen y is DOWN
  angle:  hypot(dx, dy) px  *  (180deg / D)       -- D from the camera block
  compose on the LEFT:  q <- deltaQ * q .  Renormalise q every frame.

  So a drag equal to the cube's own on-screen face width turns it half way around.
  On the reference device at the resting zoom that is 189px per 180deg -- 0.95deg/px,
  within 1% of the horizontal feel the old yaw drag had. Because the gain is expressed in
  the cube's on-screen units, zooming in makes the cube heavier to spin and zooming out
  makes it lighter. That is the same rule the turn gain already follows, and it is
  physically honest: a bigger object under the same thumb turns less.

  NO clamp. NO pole. NO snap. NO settle. The cube rests exactly where you left it.

Momentum on release:
  omega_0: total rotation over the LAST 60ms of pointer history / 60ms, about the axis of
    the summed drag over that same window. Fewer than two samples in the window -> zero.
    Never take a single final frame delta: on iOS the last pointermove before lift often
    carries a 2ms dt and a jitter pixel, which reads as a violent unintended flick.
  omega(t) = omega_0 * e^(-t / 400ms), about a screen-fixed axis
  cut off below the rate 26 px/s of drag would produce (24.8deg/s at the resting zoom)
  => a 900deg/s flick carries 360deg -- exactly one revolution -- and comes to rest in
     about 1.45s.
  A slow deliberate drag releases below the cutoff and simply stops. That is the promise:
  put it somewhere and it stays there.

  ANY pointerdown kills momentum on the same frame. That is the release valve that lets
  the glide be long: flick it, watch it spin, touch it and it is dead still. If that
  pointerdown lands on a sticker, the turn begins from the stopped orientation.
~~~

**Pinch to zoom.** Zoom is a preference about how big you like the cube, not a state of
the puzzle, and it behaves like one.

~~~ zoom
Range, expressed as f = the cube's on-screen face width / stage width (see the camera
block). Log-symmetric about the rest, +/- 1.72x, 2.9x end to end:
  f_min   0.32   (D = 109px on the reference device; a small precise object in a big room)
  f_rest  0.55   (D = 189px; today's framing, unchanged)
  f_max   0.94   (D = 321px; a face seen head-on nearly spans the stage)

Follow: 1:1, no smoothing, no momentum.
  f_target = f_at_pinch_start * (current two-pointer span / span at pinch start)
  Pinch NEVER has momentum. Rotation coasts because a real cube spins; scale does not fly
  toward your face, the range is only 2.9x, and drifting into a limit you did not ask for
  is the exact complaint this correction exists to fix. The pinch stops when you stop.

At both limits: RUBBER-BAND, then settle back. Not a hard stop. A hard stop is
indistinguishable from a frozen app on a device with no haptics -- the same argument the
refusal spec already makes, so it reuses the refusal's shape and its spring.
  live, in log space, with u = ln(f_raw / f_limit) and r = 0.16:
    f = f_limit * exp( sign(u) * r * (1 - e^(-|u| / r)) )
    -> an asymptotic ceiling of 17% past either limit, reached by pulling and never by
       accident
  release: spring back to f_limit -- { stiffness: 700, damping: 34, mass: 0.5 }
    operating on ln(f). Damping ratio 0.91, ~130ms, no bounce. (This is the refuse spring.)
  silent, like every other view change.

Persistence: zoom PERSISTS -- across scrambles, across solves, and across launches, stored
with the settings in IndexedDB. Someone who zoomed in because the stickers were small
wants it zoomed in tomorrow; resetting it every scramble would be the app overruling a
deliberate choice, which is the whole class of thing being corrected here.
Orientation does NOT persist across launches: it resets to q_default. It is transient
working state rather than a preference, the first frame of a launch is the brand ("a cube
in a black room, already scrambled, already waiting"), and a scramble is defined from
white-top / green-front, so opening there makes the notation strip match what you see.
A new scramble mid-session changes neither.

The camera's `distance` follows f directly, so perspective strengthens as you zoom in:
half-diagonal / distance runs 10% at f_min to 29% at f_max. Zoomed out it reads flatter
and more diagrammatic, zoomed in more like an object in your hand. That is a property to
keep, not a defect to correct.
~~~

**Two fingers, always — three channels, no arbitration.** At f_max the cube fills the
stage and there is no background left to grab, so background-only orbit would strand the
user at exactly the zoom where they most need to turn it. With two pointers down, the
midpoint's translation orbits at the trackball gain, the span's ratio zooms, and the
relative twist rolls, all **simultaneously** and each with its own engage state.
Re-baseline all three at the instant the pointer count changes.

Do not arbitrate between them. Picking "the one gesture the user means" is what makes a
gesture feel like it is guessing, and it reproduces "it turned a face I did not intend"
one level up.

~~~ twist-roll
engage:  9deg of relative twist. A phone pinch leaks 3-6deg of incidental rotation over
         its course; 9 is above that and below anything anyone would call a deliberate
         twist.
deadzone SPENT, not banked: roll = twist - sign(twist) * 9deg. No jump at engage, and the
         sign is frozen at engage so twisting back through zero cannot flip it.
follow:  1:1, no smoothing. The fingers are describing the rotation.
axis:    world +z (the camera never rotates, so the screen normal IS +z).
         q <- Rz(-dTheta_screen) * q, composed on the LEFT, renormalised every frame.
         The sign flips because screen angle grows clockwise and +z is counter-clockwise
         from the camera.
NO momentum. Roll stops when the fingers stop, like the zoom. The trackball coasts
  because a flicked cube spins; a twist is a grip adjustment, not a throw.
NO clamp, no snap, no settle. Silent.
~~~

**Recorded beside the decision: the position this supersedes.** On 2026-08-26 design
declined twist-to-roll on two grounds. Information: a cube has 24 identical orientations
and no canonical up, the one-finger trackball already reaches every one of them, so twist
is a second path to a destination already reachable. Leakage: a two-finger grip maps three
degrees of freedom onto one hand, so every pinch injects unrequested roll, and a cube that
quietly tilts whenever you zoom is worse than one that never rolls.

The first ground was wrong. It weighed DIRECTNESS at zero — one grip instead of two drags
— and, worse, without twist a grip that naturally rotates produces nothing for that
component, which reads as the gesture being half-ignored. The second ground survives and
is exactly why the 9deg deadzone exists and is spent rather than banked.

**A second finger during a live turn promotes to the pinch, and promotion can only ever
CANCEL.** Ignoring it fails the need that two fingers work everywhere, and "everywhere
except during a turn" is a rule nobody can hold. Tearing the turn down instantly is worse:
an accidental brush discards a live turn with a visual snap-back and no explanation, which
reads exactly like the app refusing. What survives of "a surprise commit is unforgivable"
is the load-bearing half.

~~~ turn-interrupted
Second finger down during a live turn:
  target 0deg, ALWAYS, whatever the live angle was -- even at 85deg. It never commits.
  return on the refuse spring { stiffness: 700, damping: 34, mass: 0.5 }
    -> damping ratio 0.91, ~130ms, no bounce.
  SILENT. No clack (the puzzle did not change) and no thunk (nothing was refused).
  The grab acknowledgement clears over the same window -- that is the visible explanation
    the instant teardown lacked.
  The pinch baselines centroid, span and twist on the same frame.

Second finger down during the SNAP spring (post-release): the turn LANDS and commits. The
  release already expressed the intent to commit; do not take it back.
~~~

**Any pointerdown lands a running turn and stops a running view change.** The old
`if (animating) return` swallowed every touch for the ~160ms the spring ran, so turning at
speed silently lost every second turn, and it blocked the 260ms view reset the same way.

~~~ interrupt
animation kind 'turn' -> LAND IT. Set the layer to its target this frame and commit, then
  process the new touch. Instant, not eased: the new touch is about to raycast, and a
  raycast against a layer 70% through a rotation returns a cubie at a position that will
  have moved. It reads as fast, not broken, and it is the same valve "any pointerdown
  kills momentum" already establishes.
  The commit reaches the renderer through React, so the cubie transforms are the
  PRE-commit ones for the rest of that tick. The touch therefore holds its raycast over
  to its first move event, measuring from where the finger landed.
animation kind 'view' -> STOP IT WHERE IT IS (the double-tap slerp, the zoom settle). A
  view change carries no logical commitment, so completing it would be the app moving the
  cube after you touched it.
~~~

**Getting home.** With no snap there is no implicit reset, so there is an explicit one —
double tap, placed directly on the thing it controls, which is the strongest proximity
available and costs the stage no chrome.

~~~ view-reset
Double tap anywhere in the stage -- on the cube or on the background, since at f_max there
is no background. A "tap" is pointerdown to pointerup within 220ms and under 8px of travel,
which is below the 10px engage threshold, so a tap can never have committed a turn. Two of
them, the second beginning within 280ms of the first ending.
  -> quaternion SLERP to q_default and lerp f to 0.55, both over 260ms
     cubic-bezier(0.16, 1, 0.3, 1). Shortest arc. Silent.
  Suppressed while the auto-scramble is animating -- a tap there already means "jump to
  the end state."
~~~

It is taught twice rather than given a control, because a control here would be the only
action row in a sheet of destinations and the only chrome ever added to the stage. First,
the first-run overlay gains a third line, beside the two it already carries about dragging
a sticker and dragging the background. Second, once per session, the first time the view
is rotated past 90deg or zoomed past 10% **while the clock is idle**, the notation strip's
reserved slot carries a one-line hint for 1400ms -- the refusal message's slot, timing and
treatment exactly. No new chrome, no layout shift, never during a running solve. (Both
lines are voice-writer's.)

The reset is a convenience, not a recovery: the cube is never *stuck*, only in a pose you
did not want, and one drag always fixes that. That is why it does not earn chrome.

**What is lost, honestly.** The eight canonical poses guaranteed you were never looking at
the cube from somewhere useless. That guarantee is gone and nothing cheap brings it back
without taking the pose away from the user again — a "slight bias toward a readable pose"
is still the app moving the cube after you stopped, which is the complaint, only quieter
and harder to explain. So: **nothing settles.** What survives of the concern is the wider
value ramp, which does more than the snap did because it works at every orientation rather
than eight, and which improves the default pose the app has always opened on. The one pose
with genuinely no shading answer is dead face-on, where a single face fills the silhouette
and the cube reads flat — and that one is self-correcting, because it is also the pose you
can see least of and the first thing anyone does is turn it back.

One consequence to hold: the grab acknowledgement lifts stickers to `k × 1.06` **clamped at
1.0**, so a layer grabbed on the up face gets no lift at all. Free rotation makes any face
reachable as the up face, so that hole is now common rather than rare. **The 1px hairline
tracing the layer boundary is therefore the load-bearing acknowledgement and must never be
conditional.** With no haptics it is the only proof the touch registered.

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
overshoot; orbit momentum τ goes to 0, so the cube stops the frame the finger lifts; the
zoom rubber-band still stretches live (it is the only feedback a limit gets) but returns
over 120ms linear instead of on the spring; the double-tap view reset is instant, with no
slerp; the stop flourish and the splits stagger are removed and the splits appear at once;
timer state changes are instant; the auto-scramble resolves in one step. **Sound is
unaffected** — with no haptics available, audio is the accessibility affordance here, not
the thing being reduced.

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
reflection. **The cube never draws outside the stage** — the canvas is the stage's exact
box, so it clips there and can never touch or pass under the readout or the notation
strip. Within the stage it is free: at the resting zoom the worst-case silhouette across a
body diagonal is 327px on the reference device, which still leaves a 31px margin to the
viewport edge, and zoomed in past that the cube is simply cropped by the stage. Cropping
under a deliberate pinch is expected and correct; it is what every zoom surface does.

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
settings, empty states) and as the browser-tab favicon.

**iOS copies the home-screen icon once, at install, and never re-reads it.** The final icon
ships before anyone installs, or changing it later means deleting and re-adding the app.

### The tile is drawn, not generated, and it is not the mark

App icon — `icon-cube.png`, 1024×1024, full bleed, produced by
`dist/scripts/render-icon.mjs`.

A solved 3×3×3 cube in three-quarter view at the app's own resting pose — Ry(-45) then
Rx(+24), so the white face is on top, green on the screen left and red on the screen
right. Nine evenly sized square stickers to a face, each inset within near-black graphite
plastic, with a hairline of pure black between cubies. Flat and graphic: no gloss, no
bevel, no shadow, no gradient within a sticker.

~~~ icon-geometry
Every number is the app's own, restated as a literal because a standalone node script
cannot import the TypeScript, and asserted against the source in
`dist/web/cube/icon-master.test.ts`:
  cubie 0.98 at spacing 1.0, sticker inset 0.06, camera FOV 28 at distance 18
  colour: the Cardinal faces, put through the SHADE ramp; plastic through SHADE_BODY
  the ramp multiplies in LINEAR light, exactly as applyShading does, because three.js
    holds colour in linear working space -- multiplying the sRGB bytes instead lands a
    few points off and desaturates
full bleed: the cube fills the frame. The safe zone is applied by normalize-icon.mjs,
  not here, and a master carrying its own margin would be inset twice.
~~~

**Why this stopped being a generated asset.** Three generations of `gpt-image-2` failed,
each differently, and the third shipped: a top layer of four unevenly sized cubies
floating over a 3×3 cube. Every failure was the same instruction — the top layer twisted
45 degrees out of alignment, described by its visible geometric result after the first
attempt produced a flush cube with a painted-on stripe. The brief was rewritten three
times and never moved it, because the brief was never the problem: that geometry is the
part a model cannot build.

So the tile is no longer the mark. The offset stays where it works — the in-app `Mark`
and the favicon, both drawn in code, both exact at any size. The tile is a portrait of
the cube the app actually renders, which is a thing that can be drawn exactly, and being
recognisably a Rubik's cube at 48px is worth more on a home screen than being a clever
logo nobody can resolve.

Derive `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` and
`apple-touch-icon-180.png` from the master with `dist/scripts/normalize-icon.mjs`, which
also writes them to the served directory. The plain variants take the 80% safe zone; the
**maskable takes 0.56**, because Android's maskable safe zone is a circle of 80%
*diameter* and an 80% *bounding box* puts a square subject's corners exactly on the crop.
The two 512s used to be byte-identical, which was the tell: the maskable variant had no
protection the plain one lacked. The iOS launch image is the same SVG mark centered on
`#000000` — generated in code, not by a model.

## The five-second test

Black room. One saturated object. One number. Nothing else asking for attention. If a
screenshot of this app has more than one thing in it carrying color, something has gone
wrong.


## A note on `dist/web/ui/`

The template's primitive library (Button, Card, Dialog, Field, Input, Skeleton, Toast,
EmptyState) ships with every Builder app and **this app uses none of it.**

That is not an oversight. The composition above is a fixed grid holding a cube, a
number, a notation strip and four controls; there is no card, no text input, no dialog
and no toast anywhere in the product, and the controls that do exist are specified here
down to their hit boxes. Generic primitives would have to be bent out of shape to
produce any of it.

The consequence worth knowing: the `/design-system` gallery currently shows primitives
no screen renders, so it describes the template rather than this app. Nothing is broken
by that -- unused modules are tree-shaken out of the bundle -- but anyone running
`design-sync` should expect the gallery to need repointing at the real chrome
(`.control`, `.chip`, `.board`, the hold pads, the splits row) before it means anything.


## Correction: the resting zoom, and the readout's weight

Set 2026-08-26, at the user's direction after holding the app on a real iPhone.

**Resting zoom is f = 0.45, not 0.55.** The trackball correction above solved for a
resting framing that reproduced the old silhouette exactly at the DEFAULT pose. But a
free-rotating cube's silhouette swings from 3.0 to 5.196 world units, and at f = 0.55
the corner-on pose reaches 95% of the stage width -- eight pixels of background each
side. The gesture that orbits the cube needs somewhere to start, and there was nowhere.
It was set to 0.40 first, which leaves 53px, and then to 0.45 at the user's request for
a slightly larger cube: the worst pose sits at 78% and leaves 38px, about a fingertip.
That is the closest the cube can come and still leave somewhere to start an orbit.

The zoom RANGE keeps its far end and its shape: f_min 0.24, f_rest 0.40, f_max 0.94.
It is no longer log-symmetric about the rest, deliberately -- there is more call to zoom
in on a small sticker than to push a cube that is already comfortably framed further
away.

**The readout steps back.** The timer drops from `clamp(4rem, 19vw, 5.25rem)` at weight
800 to `clamp(2.5rem, 12vw, 3.25rem)` at weight 500; the splits row's values drop from
`data` at ink-80 to `small` at ink-56; the reserved readout row goes from 148px to 124px
and the splits row from 44px to 38px. The mode chip loses its fill, its border and its
pure-white ink entirely -- it stopped being a button in the same pass, and a status that
looks like the loudest control on the screen was reading as one.

The hierarchy underneath is unchanged: the timer still goes from ink-56 idle to pure
white running, the qualifier still sits against the number it disqualifies, and every
label still clears the 11px legibility floor and the 3:1 contrast floor. What changed is
how much of the screen the chrome asks for, against a cube that is the actual subject.


## Correction: the whole cube turns, and a drag turns it once

Set 2026-08-26, from use on a real iPhone.

**The turn region is the cube's silhouette, not its stickers.** Hit-testing only the
sticker planes left roughly a sixth of the visible cube -- the black grid between them --
falling through to the background, so a drag that plainly started ON the cube orbited it
instead. Measured before the fix: 62% of the cube's bounding box hit a sticker; after,
100% of the cube itself. The plastic is raycast alongside the stickers and reports the
face it belongs to. Only true background orbits now, which is the rule a hand expects: if
you can see cube under your thumb, your thumb turns cube.

**A drag commits at most one quarter turn.** Live travel is clamped to 90 degrees rather
than the 180 this spec allowed, and both the flick and settle branches are held to a
single quarter. A hard swipe used to carry the layer past 90 and commit two at once. You
turn a face; you do not spin it. A hard swipe and a slow drag now commit the same amount
and only the feel between them differs.

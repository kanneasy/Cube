---
name: Colors
type: design/color
description: A true-black instrument where the puzzle owns every hue and the chrome owns none.
---

# Colors

The governing rule, and the decision this app makes: **the six cube faces are the only
saturated color anywhere in the product.** The chrome is achromatic — black, white, and
four greys — and the one exception borrows a hue the puzzle already owns rather than
importing a seventh. A cuber judges six colors at speed; anything else on screen that
carries chroma is competing with the task.

## The surface

**Void `#000000`.** True black, zero tint, full bleed. This is a functional decision, not
a stylistic one: any tint in the background shifts the perceived hue of the stickers by
simultaneous contrast, and this app asks the user to name six hues in a tenth of a second.
It is also the correct choice on an OLED iPhone, where true black is the absence of light
and the cube genuinely floats.

**Slate `#0D0E11`.** Sheets and overlays. The only surface that is not the void.

**Graphite `#16181C`.** Rows and chips inside a sheet, and the fill of the active state
chip.

**Cube body `#141518`.** The puzzle's plastic. Deliberately a hair above the void so the
cube reads as a solid object with a silhouette, never as six sets of floating tiles.

~~~ surfaces
--color-void:    #000000
--color-slate:   #0D0E11
--color-graphite:#16181C
--color-body:    #141518
There are no drop shadows in this app. On true black a shadow is invisible, so depth is
expressed as surface luminance plus a 1px top hairline. The single exception is the scrim
a sheet casts over the stage: box-shadow: 0 -24px 48px rgba(0, 0, 0, 0.65).
~~~

## The ink ramp

Pure white is an accent, not a default. It is reserved for exactly three things: the
running timer, the label of a primary action, and the affirmative mark on a live state.
Everything else steps down.

- **Ink `#FFFFFF`** — the running timer, primary action labels, the active state chip.
- **Ink 80 `#C9CDD3`** — record values, the move count, secondary numerals. 13.2:1 on void.
- **Ink 56 `#878D96`** — labels, notation, the idle timer. 6.3:1 on void.
- **Ink 32 `#4E545C`** — disabled controls and scope qualifiers. 2.8:1; never used for text
  that must be read, only for text that must be *seen to exist*.
- **Line `rgba(255, 255, 255, 0.10)`** — hairlines and control borders.
- **Line strong `rgba(255, 255, 255, 0.28)`** — the border of an armed or selected control.

## The alarm

One chromatic exception, and it is drawn from the active sticker palette rather than
invented: **the alarm hue is the palette's red slot, lightened for small-text legibility.**

- Cardinal palette → **Alarm `#FF4A5C`** (6.4:1 on void).
- Universal palette → **Alarm `#F55E92`** (6.9:1 on void).

Used only for `+2` and `DNF`. Because it follows the sticker palette, a user on the
colorblind-safe palette gets an alarm color they can actually see — the constraint
produces the right answer for free.

**Color never carries a penalty on its own.** A `+2` is the alarm hue *plus* the literal
`+2` glyph; a `DNF` is a filled alarm block with black letters *plus* the word. The
regulations record a result as `T + X = F`, so the app already has the glyph it needs.

## Palette one — Cardinal (default)

The standard Western BOY scheme, retuned for a self-lit display on true black. A cuber's
muscle memory depends on these reading as white / yellow / green / blue / orange / red,
so the hues are anchored; the *values* are not.

| Face | Name | Hex | Hue | L\* |
|---|---|---|---|---|
| U (up) | **Chalk** | `#ECEFF2` | neutral, cool | 94 |
| D (down) | **Flare** | `#FFC81E` | 45° | 83 |
| F (front) | **Verde** | `#0BC25E` | 147° | 69 |
| B (back) | **Cobalt** | `#2E7BFF` | 218° | 54 |
| L (left) | **Ember** | `#FF7A1A` | 25° | 66 |
| R (right) | **Signal** | `#FA2F45` | 354° | 55 |

**What changed from naive primaries, and why.**

1. **White is not `#FFFFFF`.** At full white on an OLED black field a large face blooms,
   flares the adjacent stickers, and — worse — steals the one value reserved for the
   running timer. Chalk sits at 92% luminance and is very slightly cool, because a neutral
   white sitting beside a warm yellow reads as cream; the cool cast is what makes it read
   as *white* rather than *the lighter of two yellows*.

2. **Blue, green and red were lifted hard.** The pigment values cubers know
   (`#0051BA`, `#009E60`, `#C41E3A`) have relative luminances of 0.13, 0.28 and 0.14. On
   true black, blue at 0.13 reads as a hole punched in the cube and the silhouette falls
   apart. Every face here sits at or above 0.219 relative luminance, so no face ever
   collapses into the background. This is the single biggest correction from pigment to
   screen: the constraint is not matching a plastic sticker, it is keeping all six faces
   inside a luminance band well clear of the surface.

3. **Yellow was pulled off the green edge and dropped in value.** `#FFFF00` is the
   brightest thing a display can make and would out-shout white, inverting the scheme's
   own hierarchy. Flare sits at 45° (a true lemon-gold), 17 L\* below Chalk and 17 L\*
   above Ember.

4. **Orange and red were pushed apart, and orange carries the light.** Orange at 25° with
   L\* 66 against red at 354° with L\* 55 gives 31° of hue separation *and* a 1.5:1
   luminance ratio. Real cubes separate this pair the same way — a bright orange over a
   deeper crimson red — so it also reads correct.

5. **Green stayed a true green, not an emerald.** 147° is far from yellow (45°) and far
   from blue (218°), and the lift to L\* 69 keeps it from going muddy without tipping it
   into neon lime.

Minimum pairwise separation across the six, in normal vision, is 20° of hue between Flare
and Ember, backed by 17 L\*. Every other pair is wider on at least one axis.

## Palette two — Universal (the colorblind-safe set)

A first-class palette the user selects, not a filter applied over the first one. Research
found no palette the community has converged on, only a method, so this set is derived.

**The method, stated so it can be checked.** Under deuteranopia and protanopia the
perceptual space collapses to roughly two usable dimensions: lightness (L\*) and the
blue↔yellow axis (b\*). The red↔green axis (a\*) carries almost no information. So the six
colors are not "six colors that look safe" — they are six points placed on the (L\*, b\*)
plane with a guaranteed minimum separation, which is the same thing an HCL-space search
converges on. The two failing pairs on a standard cube fail for exactly this reason:
orange and green land near each other on that plane, as do orange and red.

**The swaps, and what is preserved.** Green becomes cyan and red becomes rose — the two
hues that move to the blue side of the collapsed plane and stop competing with orange.
White, yellow, orange and blue are kept. Critically, **the face assignments do not move**:
the F face is still the "green slot," the R face is still the "red slot." A cuber's
memory of *relationships* — the face opposite orange, the face opposite blue, the BOY
corner — survives intact; only the pigment changes.

| Face | Name | Hex | L\* | b\* |
|---|---|---|---|---|
| U (up) | **Bone** | `#F1F4F7` | 96 | −2 |
| D (down) | **Amber** | `#F5C518` | 81 | +73 |
| F (front) | **Cyan** | `#22C7E0` | 74 | −23 |
| B (back) | **Cobalt Deep** | `#2A62E0` | 45 | −58 |
| L (left) | **Rust** | `#D9660F` | 56 | +58 |
| R (right) | **Rose** | `#E8497F` | 56 | +2 |

**How this was checked.** All fifteen pairs were evaluated as Euclidean distance in the
(L\*, b\*) plane, which is the signal a deutan or protan viewer retains. The weakest pair
is Cyan against Rose at ≈31; every other pair is ≥28, and most are 40–130. Protanopia
darkens the two warm colors by roughly 10 L\*, which *widens* Rust against Amber and
leaves Rust against Rose separated by 56 units of b\* alone. Under normal vision the
closest pair is Cyan against Cobalt Deep, held apart by 29 L\* plus a large chroma
difference.

~~~ cvd-verification
Ship this as a unit test, not as a claim. For each palette, for each of the four
observers (normal, deuteranopia, protanopia, tritanopia), simulate all six colors with
the Brettel-Vienot-Mollon transform and assert CIEDE2000 >= 20 for all 15 pairs.
Threshold 20 is the "distinguishable at a glance on a moving object" bar, well above the
~2.3 just-noticeable-difference. Cardinal is expected to FAIL deutan/protan on
Verde-vs-Ember and Ember-vs-Signal -- that failure is the reason Universal exists, so the
test asserts the failure rather than pretending it away. Universal must pass all four.
~~~

**The systemic consequence.** Universal encodes information in lightness, so the flat
shading ramp (see `visual.md`) would eat its separations. On Universal the ramp compresses
from `1.00 / 0.88 / 0.76` to `1.00 / 0.94 / 0.88`, and the sticker gap widens from 6% to
9% of the cubie face so form is read from the grid rather than from value.

## Light mode

**There is none, and that is a decision.** The six face values are calibrated against a
zero-luminance background; on a white surface every one of them would need re-deriving and
the luminance-band argument above inverts. The app sets `color-scheme: dark` and
`data-theme="dark"` unconditionally. The token file carries identical values in both the
light and dark slots so an accidental light render is still correct rather than broken.


## Correction: scope tags sit at ink-56, not ink-32

Set 2026-08-26, after the design critique measured the built screen.

This file reserves Ink 32 for text that "must be *seen to exist*" and never for text
that must be read, and that rule is right. The scope tags were rendering at it: `CFOP`
under a split, `PRACTICE` under the hint button, `NOT WCA` under an average. Measured
2.7:1 on the void, below the 3:1 floor even for large text.

The size correction in typography.md already argued the opposite case for these exact
strings -- that they are the app's honesty admissions and so the last text in the
product that should be hard to read -- and then fixed only the size. The colour half
was left undone, which is how a half-finished fix looks: defensible in each file and
wrong where the two meet.

Scope tags now use Ink 56 (`#878D96`, 6.3:1). Ink 32 keeps its stated job: disabled
controls, and nothing that carries meaning.

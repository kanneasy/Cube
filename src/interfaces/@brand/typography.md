---
name: Typography
type: design/typography
description: Supreme for language, Geist Mono for anything measured — a readout, not a page.
---

# Typography

Two faces and one rule that decides between them, every time:

> **If it is a measurement, it is set in the mono. If it is language, it is set in
> Supreme.** Times, move counts, notation, splits, dates, scramble sequences, ranks — mono.
> Labels, buttons, headings, sentences, warnings — Supreme.

That rule is the type system. It never needs a judgement call and it makes the app read
like an instrument with a plate on it rather than a page with numbers in it.

## The faces

**Supreme** — Fontshare (Indian Type Foundry), free for commercial use.
<https://www.fontshare.com/fonts/supreme>
A crisp, squared-off grotesque with flat terminals and even color. It was chosen over
Cabinet Grotesk, which is warmer and more editorial, because this app's whole visual
language is hard edges and flat planes — Supreme's squarer joints belong next to a
hard-cornered sticker; Cabinet's rounder ones fight it. Weights used: 400, 500, 700, 800.

**Geist Mono** — Vercel, SIL Open Font License.
<https://vercel.com/font> (also on Google Fonts; self-host the woff2)
A monospace was chosen deliberately over a proportional face with tabular figures. The
timer redraws every 10ms and layout stability is non-negotiable: a monospace guarantees a
fixed advance width by construction rather than by an OpenType feature that a fallback
face may not carry. Geist Mono's digits are open, unambiguous, and hold their shape at
74px on black. Weights used: 400, 500, 600.

At hero size the mono is tracked to **−0.045em**, which is the move that turns it from
"code" into "readout." Do not skip it.

~~~ loading
Self-host both as woff2 and precache them in the service worker (this is an offline PWA;
neither face may be network-dependent). Preload both in the document head:
  <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/Supreme-Variable.woff2">
  <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/GeistMono-Variable.woff2">
and declare font-display: block. Preload + block gives one short invisible period and
zero fallback flash -- a swap on the hero timer would shift the layout, which the rubric
forbids outright.

Subset Geist Mono to: 0123456789 . : + - = ' U+2032 U D F B L R M E S x y z w space.
That is roughly a 4KB file. Supreme carries full Latin.
~~~

## The timer — the hero, and how it is built

`12.47` is the number the whole app exists to produce. It is the largest thing on screen
after the cube.

~~~ timer-anchor
font-family: "Geist Mono", ui-monospace, monospace;
font-weight: 500;
font-size: clamp(4rem, 19vw, 5.25rem);   /* 74px at 390pt */
letter-spacing: -0.045em;
line-height: 0.92;
font-variant-numeric: tabular-nums;      /* belt and braces; mono already guarantees it */
text-align: left;
~~~

**The decision inside the number.** The hundredths digit changes 100 times a second and is
visual noise while a solve is in flight. So the seconds are set at full size in the ink of
the current state, and **the decimal point and the hundredths are set at 62% of that size,
baseline-aligned, at 0.55 opacity while the clock runs.** The moment the clock stops, the
hundredths go to opacity 1 over 200ms — they now matter, and they brighten to say so. The
*size* never changes, in any state, so nothing reflows.

Colour by state: idle `--color-ink-56`; running `--color-ink` (pure white); stopped
`--color-ink`; DNF, the alarm hue.

Weight 500, not 400. On a black field a 400 mono at 74px thins out and blooms at the
stroke edges; 500 holds.

## The scale

Every size below is fixed or a `clamp` — never a breakpoint jump.

| Token | Face / weight | Size | Tracking | Leading | Used for |
|---|---|---|---|---|---|
| `timer` | Geist Mono 500 | `clamp(4rem, 19vw, 5.25rem)` | `-0.045em` | 0.92 | the solve clock |
| `metric` | Geist Mono 500 | `1.375rem` (22px) | `-0.01em` | 1.1 | move count, record values |
| `display` | Supreme 800 | `clamp(1.5rem, 6vw, 1.875rem)` | `-0.02em` | 1.08 | sheet titles |
| `title` | Supreme 700 | `1.0625rem` (17px) | `-0.005em` | 1.3 | row primaries, sheet rows |
| `body` | Supreme 400 | `0.9375rem` (15px) | `0` | 1.5 | sentences, help, caveats |
| `data` | Geist Mono 400 | `0.9375rem` (15px) | `0.02em` | 1.4 | split values, dates in rows |
| `notation` | Geist Mono 400 | `0.8125rem` (13px) | `0.06em` | 1.2 | the notation strip, scrambles |
| `label` | Supreme 700 | `0.6875rem` (11px) | `0.12em`, uppercase | 1.1 | every micro-label and button |
| `micro` | Supreme 700 | `0.5625rem` (9px) | `0.14em`, uppercase | 1.1 | `MOVES`, the `CFOP` qualifier |

**Floors that are not negotiable, because this is read one-handed at arm's length
mid-solve:** no text below 9px, and nothing below 11px that carries meaning the user must
act on. Every uppercase run carries at least `0.12em` of tracking — Supreme's caps are
tight and close up badly at small sizes on black.

## Notation, set properly

A cuber will notice this, and it costs nothing.

- The prime mark is **`′` (U+2032 PRIME)**, never a typewriter apostrophe `'` and never a
  right single quote `’`. `R U R′ U′`.
- Face letters and modifiers are never separated: `R2`, not `R 2`. Tokens are separated by
  a single space, and the strip relies on the mono's fixed advance for its rhythm rather
  than on manual spacing.
- Move counts and times are never mixed into a sentence set in Supreme; a measurement
  inside prose still switches to the mono. `Best single 12.47` sets `12.47` in Geist Mono.
- `+2` and `DNF` are set in Supreme 700 uppercase at `label` size, not in the mono — they
  are verdicts, not measurements.

## What this system deliberately is not

It is not a two-face pairing where a characterful display face carries the headline and a
neutral sans carries the text. That is the reflex, and here it would be wrong: the
headline in this app *is* a number, so the number's face is the display face and Supreme
is the supporting voice. Naming the mono as the identity — rather than as the "code font"
a design bolts on for timestamps — is the type decision this app makes.


## Correction: the micro step is 11px, not 9px

Set 2026-08-26, after the detector ran against the built screen.

`micro` was specified at 9px and is now 11px. The detector's floor for functional UI
text is 11px and its rule is explicit that sitting on the type ramp is not an exemption:
"adding 8px to the ramp launders the token but not the legibility problem." Every use of
this step in this app is functional rather than decorative -- `MOVES` under the move
count, `CROSS` and `SOLVED` over the splits, `PRACTICE` under the hint, the `CFOP` and
`NOT WCA` scope tags. Those scope tags are the app's honesty admissions, which makes them
the last text in the product that should be hard to read.

Nothing in the reserved grid moves as a result: the splits row holds 11 + 15 + 2 = 28px
inside its 44px, and the control bar holds 22 + 11 + 3 = 36px inside its 64px.

Notation tracking drops from 0.06em to 0.05em for the same reason -- a twenty-move
scramble is a long string, not a short label, and 0.05em is the point where wide tracking
stops costing reading speed.

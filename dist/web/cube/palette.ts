// The two sticker palettes, from src/interfaces/@brand/colors.md.
//
// Both are first-class: Universal is a palette the user picks, not a filter over
// Cardinal. Research found no colourblind-safe cube palette the community has
// converged on, only a method, so Universal is derived -- six points placed on the
// (L*, b*) plane, which is the signal a deutan or protan viewer actually retains.
//
// Face assignments do not move between palettes. The F face is still the "green slot"
// and R is still the "red slot", so a cuber's memory of which face is opposite which
// survives the swap; only the pigment changes.

import type { Face } from '../../cube/state';

export type PaletteId = 'cardinal' | 'universal';

export interface Palette {
  readonly id: PaletteId;
  readonly name: string;
  readonly faces: Record<Face, string>;
  /** Used for +2 and DNF. Drawn from this palette's red slot so it stays visible. */
  readonly alarm: string;
  /** Fraction of a cubie face left as body colour around each sticker. */
  readonly stickerInset: number;
}

export const PALETTES: Record<PaletteId, Palette> = {
  cardinal: {
    id: 'cardinal',
    name: 'Cardinal',
    // The standard Western BOY scheme retuned for a self-lit display on true black.
    // Every face sits at or above 0.219 relative luminance so none collapses into the
    // background -- the pigment blue cubers know (#0051BA) reads as a hole punched in
    // the cube on an OLED panel.
    faces: {
      U: '#ECEFF2', // Chalk. Not #FFFFFF: pure white blooms and steals the timer's value.
      D: '#FFC81E', // Flare
      F: '#0BC25E', // Verde
      B: '#2E7BFF', // Cobalt
      L: '#FF7A1A', // Ember
      R: '#FA2F45', // Signal
    },
    alarm: '#FF4A5C',
    stickerInset: 0.06,
  },
  universal: {
    id: 'universal',
    name: 'Universal',
    // Green becomes cyan and red becomes rose: the two hues that move to the blue side
    // of the collapsed plane and stop competing with orange.
    faces: {
      U: '#F1F4F7', // Bone
      D: '#F5C518', // Amber
      F: '#22C7E0', // Cyan
      B: '#2A62E0', // Cobalt Deep
      L: '#D9660F', // Rust
      R: '#E8497F', // Rose
    },
    alarm: '#F55E92',
    // A wider gap on this palette: separation is doing more work, so the grid helps.
    stickerInset: 0.09,
  },
};

export const BODY_COLOR = '#141518';

/**
 * The view-space value ramp. A flat-shaded cube with no shading collapses into a
 * hexagon, because three visible faces of one colour become indistinguishable and the
 * form disappears. This is not a light: it is a fixed per-direction multiplier
 * evaluated in VIEW space, so the shading stays anchored to the screen while the cube
 * orbits, which is what keeps it reading as a graphic rather than a lit object.
 */
export const SHADE = {
  up: 1.0,
  toward: 0.88,
  left: 0.82,
  right: 0.76,
  away: 0.76,
  down: 0.7,
} as const;

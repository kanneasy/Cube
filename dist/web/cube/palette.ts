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

export interface Ramp {
  readonly up: number;
  readonly toward: number;
  readonly left: number;
  readonly right: number;
  readonly away: number;
  readonly down: number;
}

/**
 * The view-space value ramp. A flat-shaded cube with no shading collapses into a
 * hexagon, because three visible faces of one colour become indistinguishable and the
 * form disappears. This is not a light: it is a fixed per-direction multiplier
 * evaluated in view space, which -- now that the camera never moves -- is world space
 * up to a translation, so the shading is anchored to the screen by construction.
 *
 * Widened on 2026-08-26. The previous ramp put the two visible side faces 3.6% apart at
 * the DEFAULT pose (0.835 against 0.805), so two adjacent same-coloured faces were
 * already close to merging before free rotation existed. The eight-view snap was not
 * protecting readability; it was hiding how little the left/right pair separated
 * off-axis. This pair sits 7.1% apart and holds at EVERY orientation rather than eight.
 */
export const SHADE: Ramp = {
  up: 1.0,
  toward: 0.88,
  left: 0.84,
  right: 0.72,
  away: 0.72,
  down: 0.66,
};

/**
 * Universal's ramp is deliberately compressed: that palette encodes information in
 * lightness, so a wide value ramp would eat the very separation it was derived to
 * guarantee.
 */
export const SHADE_UNIVERSAL: Ramp = {
  up: 1.0,
  toward: 0.94,
  left: 0.88,
  right: 0.86,
  away: 0.86,
  down: 0.84,
};

/**
 * The plastic gets a much wider ramp than any sticker. It is achromatic, so it carries
 * no palette information and nothing is lost -- and it is the only form cue that
 * survives Universal's compressed sticker ramp.
 */
export const SHADE_BODY: Ramp = {
  up: 3.0,
  toward: 1.9,
  left: 1.5,
  right: 0.9,
  away: 0.9,
  down: 0.5,
};

export interface Palette {
  readonly id: PaletteId;
  readonly name: string;
  readonly shade: Ramp;
  readonly faces: Record<Face, string>;
  /**
   * This palette's own name for each face. Shown under the colour word a cuber already
   * knows, so switching palettes reads as "the same cube, retinted" rather than as a
   * different cube.
   */
  readonly faceNames: Record<Face, string>;
  /** Used for +2 and DNF. Drawn from this palette's red slot so it stays visible. */
  readonly alarm: string;
  /** Fraction of a cubie face left as body colour around each sticker. */
  readonly stickerInset: number;
}

export const PALETTES: Record<PaletteId, Palette> = {
  cardinal: {
    id: 'cardinal',
    name: 'Cardinal',
    shade: SHADE,
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
    faceNames: { U: 'Chalk', D: 'Flare', F: 'Verde', B: 'Cobalt', L: 'Ember', R: 'Signal' },
    alarm: '#FF4A5C',
    stickerInset: 0.06,
  },
  universal: {
    id: 'universal',
    name: 'Universal',
    shade: SHADE_UNIVERSAL,
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
    faceNames: { U: 'Bone', D: 'Amber', F: 'Cyan', B: 'Cobalt Deep', L: 'Rust', R: 'Rose' },
    alarm: '#F55E92',
    // A wider gap on this palette: separation is doing more work, so the grid helps.
    stickerInset: 0.09,
  },
};

export const BODY_COLOR = '#141518';



/** The colour word a cuber already knows, per face. Never changes between palettes. */
export const FACE_WORDS: Record<Face, string> = {
  U: 'WHITE',
  D: 'YELLOW',
  F: 'GREEN',
  B: 'BLUE',
  L: 'ORANGE',
  R: 'RED',
};

/** Reading order for the palette preview, so both palettes line up column for column. */
export const FACE_ORDER: Face[] = ['U', 'D', 'F', 'B', 'L', 'R'];

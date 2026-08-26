// Long-form copy, verbatim from src/interfaces/@brand/voice.md and src/interfaces/web.md.
//
// Kept in one module rather than inline in components because voice.md's rule is that
// the same fact never gets a second synonym: the mode descriptions appear in two places
// and must read identically, and the About text is the single destination every
// one-line scope tag in the product defers to.

import type { TimerMode } from '../../store/records';

export const MODE_ROWS: { id: TimerMode; label: string; blurb: string }[] = [
  {
    id: 'casual',
    label: 'CASUAL',
    blurb: 'The clock starts on your first turn and stops when the cube is solved. Nothing else.',
  },
  {
    id: 'competition',
    label: 'COMPETITION',
    blurb: 'Fifteen seconds of inspection, hold to start, and the real +2 and DNF thresholds.',
  },
];

export const FEWEST_MOVES_DISCLOSURE =
  'Scored in OBTM — quarter and half turns count once, slice turns count two, rotations are free. ' +
  'Not competition FMC: no paper, no time limit, just what you actually turned.';

export const EMPTY_STATES = {
  fastest: 'Nothing timed yet. Your first solve sets the pace.',
  fewest: 'No solutions logged yet. Your first solve sets the count.',
  history: 'No solves yet. Everything lands here after — practice and DNFs included.',
} as const;

export const ABOUT_PARAGRAPHS = [
  'Quarter Turn plays by the WCA Regulations (current as of January 2025) wherever a real cube would: ' +
    'fifteen seconds of inspection, the same +2 and DNF thresholds, and scrambles that are genuinely ' +
    'random-state, not twenty random turns dressed up as one.',
  'Three things it doesn’t claim. Fewest Moves counts the length of a solution you actually turned, in ' +
    'OBTM — the same metric real Fewest Moves competition uses, but there’s no paper and no sixty-minute ' +
    'limit, so it isn’t competition FMC. Average of 12 is what cubers use in practice, not a format the WCA ' +
    'runs; Average of 5 is the real one. And the Cross, F2L and OLL splits assume you solve CFOP — Cross and ' +
    'Solved hold no matter how you solve, but F2L and OLL are the wrong number if you solve Roux or ZZ, so a ' +
    'solve that doesn’t hold CFOP’s shape shows no F2L or OLL at all rather than a wrong one.',
  'Everything above lives on this phone. There’s no account and no server, so none of it is ranked ' +
    'against anyone else’s.',
] as const;

/** Shown once, only in a browser tab. The instruction matches iOS's own share sheet wording. */
export const BROWSER_TAB_NOTICE = {
  title: 'Add this to your Home Screen.',
  body:
    'In a browser tab, Safari’s own edge-swipe fights the drag you use to turn the cube. ' +
    'Installed, there’s no browser chrome left to fight it.',
  action: 'Tap Share, then Add to Home Screen.',
  dismiss: 'NOT NOW',
} as const;

/** Two lines, dismissed by the first drag — so the lesson and the action are one motion. */
export const FIRST_RUN = [
  'Drag a sticker to turn that layer.',
  'Drag the background to look around.',
  // With no pitch clamp and nothing settling to a canonical pose, this is the only way
  // back to a known view -- so the one surface built to teach the gestures has to say it.
  'Pinch to zoom. Double tap to reset the view.',
] as const;

export const HOLD_LABEL = 'HOLD BOTH TO START';

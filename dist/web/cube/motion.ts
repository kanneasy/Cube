/**
 * Whether this person has asked for less motion.
 *
 * Read as a function rather than captured once, because the setting can change while
 * the app is open, and because a CSS `prefers-reduced-motion` block cannot reach any
 * of this app's animation: the turn spring, the orbit momentum and the opening
 * scramble are all JS-driven, so a stylesheet rule would look like a fix while doing
 * nothing at all.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Where a spring is inappropriate, land in this long instead. */
export const REDUCED_SETTLE_MS = 90;

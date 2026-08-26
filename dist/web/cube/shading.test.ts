import { describe, it, expect } from 'vitest';
import { Vector3 } from 'three';
import { shadeFor } from './renderer';
import { SHADE, SHADE_BODY, SHADE_UNIVERSAL } from './palette';

describe('the view-space value ramp', () => {
  it('is exact at each axis', () => {
    // Squares of a unit axis vector sum to 1, so an axis-aligned normal gets its own
    // multiplier untouched. That is what makes the blend need no normalising divide.
    expect(shadeFor(new Vector3(0, 1, 0), SHADE)).toBeCloseTo(SHADE.up, 10);
    expect(shadeFor(new Vector3(0, -1, 0), SHADE)).toBeCloseTo(SHADE.down, 10);
    expect(shadeFor(new Vector3(1, 0, 0), SHADE)).toBeCloseTo(SHADE.right, 10);
    expect(shadeFor(new Vector3(-1, 0, 0), SHADE)).toBeCloseTo(SHADE.left, 10);
    expect(shadeFor(new Vector3(0, 0, 1), SHADE)).toBeCloseTo(SHADE.toward, 10);
    expect(shadeFor(new Vector3(0, 0, -1), SHADE)).toBeCloseTo(SHADE.away, 10);
  });

  it('blends smoothly between two axes, without a normalising divide', () => {
    // Halfway between up and toward: squares are 0.5 each, so the result is the mean.
    const diagonal = new Vector3(0, 1, 1).normalize();
    expect(shadeFor(diagonal, SHADE)).toBeCloseTo((SHADE.up + SHADE.toward) / 2, 10);
  });

  it('stays inside the ramp for every direction on the sphere', () => {
    const values = [...Object.values(SHADE)];
    const lo = Math.min(...values);
    const hi = Math.max(...values);
    for (let i = 0; i < 400; i++) {
      // Deterministic spiral over the sphere -- no Math.random, so a failure reproduces.
      const t = i / 400;
      const phi = Math.acos(1 - 2 * t);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const n = new Vector3(Math.sin(phi) * Math.cos(theta), Math.sin(phi) * Math.sin(theta), Math.cos(phi));
      const k = shadeFor(n, SHADE);
      expect(k).toBeGreaterThanOrEqual(lo - 1e-9);
      expect(k).toBeLessThanOrEqual(hi + 1e-9);
    }
  });

  it('separates the two visible side faces by enough to read', () => {
    // The reason this ramp was widened: the previous one put left and right 3.6% apart
    // at the DEFAULT pose, so two adjacent same-coloured faces nearly merged.
    const separation = (SHADE.left - SHADE.right) / SHADE.left;
    expect(separation).toBeGreaterThan(0.1);
  });

  it('keeps the Universal ramp compressed', () => {
    // That palette encodes information in LIGHTNESS, so a wide value ramp would eat the
    // separation it was derived to guarantee.
    const spread = (r: typeof SHADE) => Math.max(...Object.values(r)) - Math.min(...Object.values(r));
    expect(spread(SHADE_UNIVERSAL)).toBeLessThan(spread(SHADE));
  });

  it('gives the plastic a far wider ramp than any sticker', () => {
    // The body is achromatic and carries no palette information, so a wide ramp costs
    // nothing -- and it is the only form cue that survives Universal's compression.
    const spread = (r: typeof SHADE) => Math.max(...Object.values(r)) - Math.min(...Object.values(r));
    expect(spread(SHADE_BODY)).toBeGreaterThan(spread(SHADE) * 2);
  });
});

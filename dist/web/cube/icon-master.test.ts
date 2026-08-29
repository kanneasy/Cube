import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { PALETTES, SHADE, SHADE_BODY, BODY_COLOR } from './palette';
import { DEFAULT_PITCH, DEFAULT_YAW, ZOOM_REST } from './renderer';

// The home-screen tile is drawn by `dist/scripts/render-icon.mjs`, which cannot import
// from this TypeScript at all -- it is a standalone node script that shells out to
// Pillow. So it restates the app's geometry and colour as literals, and the only thing
// keeping the tile a portrait of the real cube rather than an approximation of one is
// that those literals still agree. That is what this file is.
//
// iOS copies the home-screen icon into SpringBoard once, at install, and never re-reads
// it. Drift here cannot be fixed for anyone already installed, so it is worth a test.
const SOURCE = readFileSync(new URL('../../scripts/render-icon.mjs', import.meta.url), 'utf-8');

/** `const NAME = <number>;` */
const num = (name: string): number => {
  const m = SOURCE.match(new RegExp(`const ${name} = ([-0-9.]+)`));
  expect(m, `render-icon.mjs declares ${name}`).toBeTruthy();
  return Number(m![1]);
};

/** `const NAME = { a: 1, b: 2 };` on one line. */
const ramp = (name: string): Record<string, number> => {
  const m = SOURCE.match(new RegExp(`const ${name} = \\{([^}]*)\\}`));
  expect(m, `render-icon.mjs declares ${name}`).toBeTruthy();
  return Object.fromEntries(
    m![1]
      .split(',')
      .map((pair) => pair.split(':').map((s) => s.trim()))
      .filter((kv) => kv.length === 2)
      .map(([k, v]) => [k, Number(v)]),
  );
};

describe('the drawn icon master uses the app’s own numbers', () => {
  it('matches the cube geometry', () => {
    expect(num('CUBIE')).toBe(0.98);
    expect(num('SPACING')).toBe(1.0);
    expect(num('FOV')).toBe(28);
  });

  it('derives the camera distance rather than picking one', () => {
    // The one geometry constant that used to be hand-picked. Derived from these two, so
    // a change to either cannot silently leave the tile at the old framing.
    expect(num('ZOOM_REST')).toBe(ZOOM_REST);
    expect(SOURCE).toContain('const DISTANCE = (1.5 * REFERENCE_STAGE.h)');
  });

  it('matches the resting pose, so the tile is the pose the app opens on', () => {
    // Written in the script the way renderer.ts writes them, so compare the values.
    expect(num('DEFAULT_YAW')).toBeCloseTo(DEFAULT_YAW, 10);
    expect(num('DEFAULT_PITCH')).toBeCloseTo(DEFAULT_PITCH, 10);
  });

  it('matches the Cardinal palette', () => {
    const faces = SOURCE.match(/const FACES = \{([^}]*)\}/)![1];
    for (const [face, hex] of Object.entries(PALETTES.cardinal.faces)) {
      expect(faces, `${face} is ${hex}`).toContain(`${face}: '${hex}'`);
    }
    expect(SOURCE).toContain(`const BODY_COLOR = '${BODY_COLOR}'`);
    expect(num('STICKER_INSET')).toBe(PALETTES.cardinal.stickerInset);
  });

  it('matches both value ramps, which is what makes the shading agree', () => {
    expect(ramp('SHADE')).toEqual({ ...SHADE });
    expect(ramp('SHADE_BODY')).toEqual({ ...SHADE_BODY });
  });
});

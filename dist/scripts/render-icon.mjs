#!/usr/bin/env node
// Draw the home-screen icon master, rather than generate it.
//
//   node dist/scripts/render-icon.mjs [out.png]
//
// Three generations of gpt-image-2 failed this asset, each differently, and the third
// is what shipped: a top layer of four unevenly sized cubies floating over a 3x3 cube.
// The brief's load-bearing instruction was a top layer twisted 45 degrees out of
// alignment, and that geometry is the part a model cannot build -- it produced a flush
// cube with a painted-on stripe, then a scramble, then broken geometry. An isometric
// cube is exactly specifiable, so specify it.
//
// This is the same argument Mark.tsx already makes for the in-app mark: "Drawn in code
// rather than generated, so it stays exact at any size and costs nothing to ship." The
// offset mark stays where it works -- Mark.tsx and favicon.svg are untouched. Only the
// tile stops trying to be it.
//
// Every constant below is the app's own, and `render-icon.test.ts` fails if any of them
// drifts from palette.ts or renderer.ts. The tile is a portrait of the cube that opens
// when you tap it, which is only true while those numbers agree.
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const out = process.argv[2] || join('dist', 'assets-source', 'icon-cube.png');
mkdirSync(dirname(out), { recursive: true });

// --- the app's geometry (renderer.ts) ---
const CUBIE = 0.98; // leaves a hairline of black between cubies
const SPACING = 1.0;
const STICKER_INSET = 0.06; // PALETTES.cardinal.stickerInset
const FOV = 28;
const DEFAULT_YAW = 0.7853981633974483; // Math.PI / 4
const DEFAULT_PITCH = 0.41887902047863906; // 24 degrees
/** The app's resting framing solves to about this on a phone. Mild perspective, not flat. */
const DISTANCE = 18;

// --- the app's colour (palette.ts) ---
const FACES = { U: '#ECEFF2', D: '#FFC81E', F: '#0BC25E', B: '#2E7BFF', L: '#FF7A1A', R: '#FA2F45' };
const BODY_COLOR = '#141518';
const SHADE = { up: 1.0, toward: 0.88, left: 0.84, right: 0.72, away: 0.72, down: 0.66 };
const SHADE_BODY = { up: 3.0, toward: 1.9, left: 1.5, right: 0.9, away: 0.9, down: 0.5 };

/** Face normals in cube space, matching the move letters. */
const NORMALS = {
  U: [0, 1, 0],
  D: [0, -1, 0],
  F: [0, 0, 1],
  B: [0, 0, -1],
  L: [-1, 0, 0],
  R: [1, 0, 0],
};

// Ry(-yaw) then Rx(+pitch), exactly as defaultOrientation() composes them.
const rotate = ([x, y, z]) => {
  const cy = Math.cos(-DEFAULT_YAW);
  const sy = Math.sin(-DEFAULT_YAW);
  const x1 = cy * x + sy * z;
  const z1 = -sy * x + cy * z;
  const cp = Math.cos(DEFAULT_PITCH);
  const sp = Math.sin(DEFAULT_PITCH);
  return [x1, cp * y - sp * z1, sp * y + cp * z1];
};

/**
 * The value ramp, as `shadeFor` computes it: squared components against the ramp, which
 * is smooth off-axis and needs no normalising divide.
 */
const shadeFor = ([x, y, z], ramp) =>
  Math.max(0, y) ** 2 * ramp.up +
  Math.max(0, -y) ** 2 * ramp.down +
  Math.max(0, x) ** 2 * ramp.right +
  Math.max(0, -x) ** 2 * ramp.left +
  Math.max(0, z) ** 2 * ramp.toward +
  Math.max(0, -z) ** 2 * ramp.away;

// Three.js holds colours in linear working space and converts on output, so the ramp
// multiplies in LINEAR light. Multiplying the sRGB bytes instead lands a few points off
// and desaturates -- the renderer says so where it does the same multiply.
const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toSrgb = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const shadeHex = (hex, k) => {
  const rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return rgb.map((c) => Math.max(0, Math.min(255, Math.round(toSrgb(Math.min(1, toLinear(c) * k)) * 255))));
};

/** Every quad to draw, as world-space corners plus a resolved sRGB fill. */
const quads = [];
const half = CUBIE / 2;
const stickerHalf = (CUBIE * (1 - STICKER_INSET * 2)) / 2;

for (const [face, n] of Object.entries(NORMALS)) {
  const worldN = rotate(n);
  if (worldN[2] <= 1e-6) continue; // pointing away from the camera; nothing to draw

  // The two in-plane axes for this face.
  const axis = n.findIndex((v) => v !== 0);
  const inPlane = [0, 1, 2].filter((a) => a !== axis);
  const bodyShade = shadeFor(worldN, SHADE_BODY);
  const faceShade = shadeFor(worldN, SHADE);
  const bodyFill = shadeHex(BODY_COLOR, bodyShade);
  const stickerFill = shadeHex(FACES[face], faceShade);

  for (const a of [-1, 0, 1]) {
    for (const b of [-1, 0, 1]) {
      const centre = [0, 0, 0];
      centre[axis] = n[axis] * SPACING;
      centre[inPlane[0]] = a * SPACING;
      centre[inPlane[1]] = b * SPACING;

      // Body first, then its own sticker directly on top. The renderer puts the sticker
      // plane 0.001 proud of the 0.98 body cube; here that offset is cosmetic, because
      // painting has no depth buffer -- the ORDER is what stacks them.
      for (const [lift, h, fill] of [
        [0, half, bodyFill],
        [0.001, stickerHalf, stickerFill],
      ]) {
        quads.push({
          fill,
          corners: [
            [-1, -1],
            [1, -1],
            [1, 1],
            [-1, 1],
          ].map(([u, v]) => {
            const p = [...centre];
            p[axis] += n[axis] * (half + lift);
            p[inPlane[0]] += u * h;
            p[inPlane[1]] += v * h;
            return rotate(p);
          }),
        });
      }
    }
  }
}

// No depth sort, deliberately. The front-facing sides of a convex solid tile the
// silhouette without overlapping, and within a face the cells do not overlap either, so
// emission order is already correct. Sorting by centroid depth was actively WRONG: a
// body quad and its sticker share a centroid exactly, so the comparison fell to
// floating-point noise and some bodies painted over their own stickers -- which came out
// as blank dark cells scattered across the faces.

const payload = JSON.stringify({
  out,
  fov: FOV,
  distance: DISTANCE,
  quads: quads.map((q) => ({ c: q.corners, f: q.fill })),
});

// Pillow, the same dependency normalize-icon.mjs already shells out to. Supersampled 4x
// and box-filtered down, which is cheaper to reason about than any polygon antialiasing
// and gives clean edges on the diagonals that make up most of this drawing.
const python = `
import json, math, sys
from PIL import Image, ImageDraw

d = json.load(sys.stdin)
SIZE, SS = 1024, 4
W = SIZE * SS
tan = math.tan(math.radians(d["fov"]) / 2)
dist = d["distance"]

def project(p):
    x, y, z = p
    # Camera sits at +z looking down -z, square aspect.
    depth = dist - z
    ndc_x = x / (depth * tan)
    ndc_y = y / (depth * tan)
    return ((ndc_x + 1) / 2 * W, (1 - ndc_y) / 2 * W)

im = Image.new("RGB", (W, W), (0, 0, 0))
draw = ImageDraw.Draw(im)
for q in d["quads"]:
    draw.polygon([project(c) for c in q["c"]], fill=tuple(q["f"]))

# FULL BLEED, because that is the contract normalize-icon.mjs expects of a master: it
# crops to the content box itself and insets to the safe zone. A master that already
# carries an even margin is a letterboxed mockup by every measure image-check.mjs has,
# and it would then get inset a second time.
box = im.convert("L").point(lambda v: 255 if v > 24 else 0).getbbox()
content = im.crop(box)
scale = SIZE / max(content.size)
content = content.resize(
    (max(1, round(content.width * scale)), max(1, round(content.height * scale))), Image.LANCZOS
)
out = Image.new("RGB", (SIZE, SIZE), (0, 0, 0))
out.paste(content, ((SIZE - content.width) // 2, (SIZE - content.height) // 2))
out.save(d["out"], "PNG", optimize=True)
print(f"{d['out']}  content {content.width}x{content.height} of {SIZE}")
`;

const written = execFileSync('python3', ['-c', python], { input: payload, encoding: 'utf-8' }).trim();
console.log(`drew ${quads.length} quads -> ${written}`);

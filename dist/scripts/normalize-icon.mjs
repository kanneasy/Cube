#!/usr/bin/env node
// Normalise a generated icon into the derivation master, then derive the set.
//
//   node dist/scripts/normalize-icon.mjs <master>.png [out-dir]
//
// Two defects in the generated render are compositing-level rather than creative, and
// two attempts with identical `transparent: false` requests differed on the first of
// them -- so they are provider non-determinism, not something the brief can control.
// Fixing them deterministically here costs no generation attempts and cannot regress:
//
//   1. The provider returns real alpha even when opaque was requested. The brief says
//      "pure black background", and an icon with a transparent field behind it does
//      something unpredictable once OS compositing touches it.
//   2. It does not centre reliably. The maskable variant crops to a circle, so an
//      off-centre master clips the cube unevenly -- and the checker cannot see the
//      problem at all while the surround is transparent, because its border-band
//      detector needs opaque pixels to measure.
import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const source = process.argv[2];
if (!source || !existsSync(source)) {
  console.error('usage: normalize-icon.mjs <generated.png>');
  process.exit(1);
}

// The served path, not `dirname(source)/icons`. That default put the output beside
// whatever master was passed, so neither documented invocation of this script landed on
// the directory the app actually ships, and the copy across was a manual step nobody
// recorded. Pass an explicit second argument to override.
const outDir = process.argv[3] || join('dist', 'web', 'public', 'icons');
mkdirSync(outDir, { recursive: true });

// The safe zone the brief specifies, and what the maskable crop depends on.
const CONTENT_FRACTION = 0.8;
/**
 * The maskable variant gets its own, tighter fraction.
 *
 * Android's maskable safe zone is a CIRCLE of 80% diameter, and 0.8 here is an 80%
 * BOUNDING BOX -- so a square-ish subject's corners sit exactly on the crop boundary.
 * The two files used to be byte-identical, which is the tell: the maskable variant was
 * getting no protection the plain one did not already have. A corner of the bounding box
 * is at radius 0.8 * sqrt(2)/2 = 0.566 of the frame, against the circle's 0.4, so the
 * box has to come in to 0.4 * 2/sqrt(2) = 0.566 for the corners to clear it. 0.56.
 */
const MASKABLE_FRACTION = 0.56;
const MASTER = 1024;

const python = `
import sys
from PIL import Image

src, out, size, frac = sys.argv[1], sys.argv[2], int(sys.argv[3]), float(sys.argv[4])
im = Image.open(src).convert("RGBA")

# The content bounding box comes from the alpha channel when there is one, which is
# exact. Falling back to a luminance threshold would be wrong here: the cube's own
# grid gaps are near-black graphite and would be read as background.
alpha = im.getchannel("A")
box = alpha.getbbox() if alpha.getextrema()[0] < 255 else None
if box is None:
    # Fully opaque: measure against the black field instead.
    grey = im.convert("L").point(lambda v: 255 if v > 24 else 0)
    box = grey.getbbox()
if box is None:
    box = (0, 0, im.width, im.height)

content = im.crop(box)
target = int(round(size * frac))
w, h = content.size
scale = min(target / w, target / h)
content = content.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)

# Opaque black, always. This is the half the provider keeps getting wrong.
canvas = Image.new("RGBA", (size, size), (0, 0, 0, 255))
canvas.paste(content, ((size - content.width) // 2, (size - content.height) // 2), content)
canvas.convert("RGB").save(out, "PNG", optimize=True)

lm = (size - content.width) // 2
tm = (size - content.height) // 2
print(f"{out.split('/')[-1]}  {size}x{size}  margins L/R {lm}/{size - content.width - lm}  T/B {tm}/{size - content.height - tm}")
`;

const master = join(outDir, 'icon-1024.png');
const run = (out, size, frac = CONTENT_FRACTION) =>
  console.log('  ' + execFileSync('python3', ['-c', python, source, out, String(size), String(frac)]).toString().trim());

console.log('normalize-icon: flattening onto opaque black and recentring');
run(master, MASTER);

// Every variant is derived from the SAME normalised geometry rather than from each
// other, so a rounding error cannot compound down the chain.
for (const [name, size, frac] of [
  ['icon-512.png', 512, CONTENT_FRACTION],
  ['icon-512-maskable.png', 512, MASKABLE_FRACTION],
  ['icon-192.png', 192, CONTENT_FRACTION],
  ['apple-touch-icon-180.png', 180, CONTENT_FRACTION],
]) {
  run(join(outDir, name), size, frac);
}
console.log(`wrote ${outDir}/`);

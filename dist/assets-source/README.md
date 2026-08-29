# Masters

The 1024 master every shipped icon is derived from, kept with its `.gen.json` sidecar as
the provenance record.

It lives here rather than in `dist/web/public/` for one concrete reason: the service
worker precaches `**/*.png`, so a master sitting in the served directory is downloaded by
every person who installs the app and never requested by anything.

## The icon is drawn, not generated

`icon-cube.png` is produced by:

    node dist/scripts/render-icon.mjs
    node dist/scripts/normalize-icon.mjs dist/assets-source/icon-cube.png

Three generations of `gpt-image-2` failed this asset before that, each differently, and
the third is what shipped for two days: a top layer of four unevenly sized cubies
floating over a 3x3 cube. The brief's load-bearing instruction was a top layer twisted 45
degrees out of alignment, and that geometry is exactly the part a model cannot build — it
returned a flush cube with a painted-on stripe, then a full scramble, then broken
geometry. Sharpening the brief three times did not move it, because the brief was never
the problem.

A cube in three-quarter view is exactly specifiable, so it is specified. This is the same
argument `Mark.tsx` already makes for the in-app mark: drawn in code, it stays exact at
any size and costs nothing to ship. The twisted-layer mark is kept where it works —
`Mark.tsx` and `favicon.svg` are untouched. Only the tile stopped trying to be it.

The renderer restates the app's geometry, resting pose and palette as literals, because a
standalone node script cannot import the TypeScript. `dist/web/cube/icon-master.test.ts`
fails if any of them drifts, which is what keeps the tile a portrait of the cube the app
actually draws rather than an approximation of one.

## What the normalise step is for

`normalize-icon.mjs` crops to the content box, insets to the safe zone and flattens onto
opaque black. It was written to correct two things the image provider got wrong — real
alpha when opaque was requested, and unreliable centring — and it still earns its place
now that the master is drawn: it is the one place the safe zone is applied, and the
maskable variant needs a tighter one than the rest.

The master is therefore **full bleed** by construction. A master that already carries an
even margin is a letterboxed mockup by every measure `image-check.mjs` has, and it would
be inset a second time on top of its own margin.

## Running the gate

Run `image-check.mjs` against **this** directory, not the derived set:

    node ~/builder/bin/image-check.mjs . --dir dist/assets-source

The derived icons in `dist/web/public/icons/` carry a deliberate safe-zone margin, which
is a letterbox failure by that checker's rules. It is written for full-bleed masters, and
pointing it at the derived set is a category error — one the earlier pipeline avoided
only by accident, because it never ran the checker on that directory at all.

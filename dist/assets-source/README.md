# Generated masters

The raw output of `bin/gen-image.mjs`, kept with its `.gen.json` sidecar as the
provenance record for every shipped asset.

These live here rather than in `dist/web/public/` for one concrete reason: the service
worker precaches `**/*.png`, so a 900KB master sitting in the served directory is
downloaded by every person who installs the app and never requested by anything.

What ships is `dist/web/public/icons/`, produced by:

    node dist/scripts/normalize-icon.mjs dist/assets-source/<master>.png

That step is not cosmetic. The provider returns real alpha even when opaque is
requested, and does not centre reliably — two generations with identical
`transparent: false` requests differed on the first of those, so it is provider
non-determinism rather than something the brief can control. Flattening onto opaque
black and recentring deterministically costs no generation attempts and cannot regress.

`icon-ea2543bc.png` is the third and shipped generation. The first two failed the image
gate: the first produced a flush, solved cube with a colour stripe standing in for the
offset layer, and the second fixed the geometry but scrambled every face, which dissolves
into a colourless mosaic at 48px. `src/interfaces/@brand/visual.md` carries the brief and
the reasons its wording is shaped the way it is.

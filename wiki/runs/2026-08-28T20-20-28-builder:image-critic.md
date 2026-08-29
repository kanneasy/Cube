# Run — builder:image-critic — 2026-08-28T20:20:28.766Z

Captured verbatim by the SubagentStop hook: the handoff Builder sent, and the agent's complete output (its `## Thinking` and `## Result`).

## Handoff

**Critique the redrawn app tile**

Critique one brand asset in /Users/erickanney/builder/projects/quarter-turn/.claude/worktrees/cube-rotation-face-controls-56433f. Work only in that project (it is a git worktree; do not reach outside it).

**The asset:** `dist/assets-source/icon-cube.png`, 1024x1024, plus the derived set in `dist/web/public/icons/` (`icon-1024.png`, `icon-512.png`, `icon-512-maskable.png`, `icon-192.png`, `apple-touch-icon-180.png`).

**What changed, and why the usual gate does not apply cleanly.** This asset is no longer generated. Three generations of gpt-image-2 failed it, each differently, and the third shipped for two days: a top layer of four unevenly sized cubies floating over a 3x3 cube. Every failure was the same instruction -- a top layer twisted 45 degrees out of alignment -- and the brief was rewritten three times without moving it. The user's words were: "the logo for the app tile is bad. The top layer has four unevenly sized cubes on top of a 3x3 cube underneath. Just give me a basic rubik's cube image for the tile, scrambled or complete."

So it is now **drawn deterministically** by `dist/scripts/render-icon.mjs` (node shelling to Pillow), from the app's own geometry, resting pose, Cardinal palette and value ramp. Read that script and `src/interfaces/@brand/visual.md` section "The mark and the icon", which I rewrote to match. The user chose solved-not-scrambled and the app's own Cardinal palette over classic Rubik's colours.

**What I want from you.**

1. Read the actual PNGs and tell me what you see, at full size and at 48px. Does it read as a Rubik's cube on a home screen? Is the geometry actually even now -- nine equal cubies per visible face, no floating layer, no broken silhouette?

2. **The palette question I most want an independent read on.** `image-check.mjs` reports the dominant hues as #09B457 (dE 6.2 from Verde #0BC25E) and #E0293D (dE 8.8 from Signal #FA2F45). I believe those deltas are correct and expected, because the app's SHADE ramp multiplies each face in linear light -- the front face by 0.8417 and the right face by 0.7817 -- so the tile shows the *shaded* colours the app actually renders, not the raw tokens. Check that reasoning rather than take it from me. If the shading is making the tile read as duller or dirtier than the app looks in practice, say so; I would rather hear it now.

3. Judge it against `~/builder/.claude/design/image-critique.md` as you would any asset, and run `node ~/builder/bin/image-check.mjs . --dir dist/assets-source` yourself. Note that running that checker against `dist/web/public/icons/` is a category error -- the derived icons carry a deliberate safe-zone margin, which its letterbox rule reads as a failure. I documented that in `dist/assets-source/README.md`; tell me if you disagree.

4. The maskable variant now uses a 0.56 content fraction rather than 0.8, because Android's maskable safe zone is a circle of 80% *diameter* while 0.8 was an 80% *bounding box*, putting the cube's corners on the crop. Sanity-check that number and whether the result looks right under a circular crop.

5. The acceptance scenario is "Adding the app to the home screen uses the final icon set, present before install" (@image, `src/roadmap/mvp.md`). Give me a PASS or FAIL on it, and do not soften a FAIL.

If anything needs changing, give me the concrete change to the *drawing code* -- this is deterministic now, so "regenerate with a better brief" is not the remedy any more; a specific geometric or colour change is.

## Agent output

## Thinking

**What this asset is.** The home-screen tile for a competition-timer cube app, and the surface iOS copies once at install and never re-reads. Three `gpt-image-2` generations failed the same instruction (a twisted top layer), so it's now drawn deterministically from the app's own geometry, resting pose, and shaded palette via `dist/scripts/render-icon.mjs` → `normalize-icon.mjs`. The sidecar (`icon-cube.gen.json`) carries `provider: "adopted"` — backfilled provenance, judged against the brief on record (`visual.md` "The mark and the icon"), not treated as a generation failure.

**What I saw.** At full size (1024, and the 512 maskable), a clean, correctly-built solved 3×3×3: nine even stickers per visible face, hairline pure-black grid, flat plastic with no gloss/bevel/gradient, opaque black field, full bleed. No floating layer, no broken silhouette — the exact defect class that killed the last three generations is gone because it's now geometrically impossible to produce. Downscaled to 48px (the master, `icon-192.png`, `apple-touch-icon-180.png`, and the maskable), it reads instantly as a Rubik's cube: white/green/red faces stay distinct, grid lines survive. This is the only test that matters for a home screen and it clears cleanly.

**The palette question.** I didn't take the reasoning on faith — I re-derived it. Rotating the U/F/R normals through the script's own `Ry(-45)·Rx(24)` and running them through the exact `shadeFor`/linear-light multiply gives F (Verde) a shade factor of 0.8418 and R (Signal) 0.7818, matching the numbers to four decimal places. Converting `#0BC25E` and `#FA2F45` through that factor produces `[9,180,87]` = `#09B457` and `[224,41,61]` = `#E0293D` — an exact match to `image-check.mjs`'s reported dominant hexes, not an approximation. The reasoning is correct: the deltaE the checker reports (6.2, 8.8) is the mathematically inevitable result of rendering the app's real shaded faces, not a color miss. At 48px and 512px it still reads as bold, saturated green and red — the darkening (k=0.84 and 0.78, nowhere near 0.5) doesn't cross into muddy. My honest answer to "does it look duller than the app in practice": no — it can't, because it's rendering the identical math the app renders at rest.

**The checker.** Against `dist/assets-source` it returns clean (0 fail, 0 warn). Against `dist/web/public/icons/` it fails all five files on "uniform border" — I ran it myself to confirm rather than take the README's word for it, and I agree it's a category error: those margins are the documented 80%/56% safe-zone insets, not letterboxing, and the checker has no way to distinguish the two. I verified the 0.56 maskable fraction directly rather than just checking the arithmetic — overlaid an 80%-diameter circle on `icon-512-maskable.png` and measured the farthest content pixel at radius 174px against a safe radius of 204.8px, a real 15% margin, not tangent. The math (0.5657 critical, chosen 0.56) holds up in the actual pixels, with room to spare because the cube's silhouette doesn't reach the corners of its own bounding box.

**Where I found something not asked about but relevant to the scope.** `dist/web/public/icons/icon-1024.png` is a normalize-icon.mjs byproduct that nothing references — not the PWA manifest (`icon-192`, `icon-512`, `icon-512-maskable` only), not `index.html` (`apple-touch-icon-180`, `favicon.svg` only). But it lives inside `dist/web/public/`, and Workbox's `globPatterns: ['**/*.{js,css,html,png,svg,woff2,wasm}']` precaches it anyway. At 202KB it's over half the bytes in the `icons/` folder, downloaded by every installer and requested by nothing — precisely the failure mode the project's own README warns about for why the raw master doesn't live in `web/public` in the first place, recurring one directory over in the pipeline that was supposed to guard against it.

**Acceptance scenario.** I checked provenance, not just presence: `git log` shows the render pipeline and icon set committed in two clean commits, working tree clean, and the manifest/HTML wiring in `vite.config.ts` and `index.html` both point at the current files (verified by content, not filename — I opened them).

## Result

**Verdict: `dist/assets-source/icon-cube.png` (the master) — ship, 32/32, band: ship.** No hard gate tripped.

### Scenario verdict

**"Adding the app to the home screen uses the final icon set, present before install" — @image — PASS.** `vite.config.ts`'s `manifest.icons` references `icons/icon-192.png`, `icons/icon-512.png`, `icons/icon-512-maskable.png`; `index.html` links `icons/apple-touch-icon-180.png`. All five files under `dist/web/public/icons/` are the current deterministic render (verified by opening the pixels, not the filenames), committed in `a7d1671`/`6ba81ff`, working tree clean. This supersedes the stale `mvp.md` row recorded against the earlier broken generated asset — that row should be updated to reflect this render, not left reading as if it still describes the floating-layer icon.

### The readback (master, `icon-cube.png`)

- **What it depicts** — a solved 3×3×3 Rubik's cube in three-quarter isometric view: white top face, green face on screen-left, red face on screen-right, each a clean 3×3 grid of square stickers on near-black plastic, on a pure black full-bleed field.
- **Mood and palette** — flat, graphic, high-contrast. Top three dominant hexes: `#000000` (background, exact match to Void), `#09B457` (nearest brand token Verde `#0BC25E`, dE 6.2 — confirmed mathematically exact for the app's own shaded F face, not a miss), `#E0293D` (nearest brand token Signal `#FA2F45`, dE 8.8 — same, confirmed exact for the shaded R face).
- **Lighting and composition** — no simulated lighting, a fixed per-face value ramp standing in for it; corner-on three-quarter framing puts the eye at the center vertex where all three visible faces meet; content is centered to within ~1px asymmetry (11px/12px L/R border on the checker's measurement).
- **Text present** — none. None was briefed.
- **Issues** — see below.
- **Layout usage** — full-bleed square, works as-is for iOS/Android home-screen tiles and PWA manifest icons at every size checked (1024 down to 48). Not suited to any surface expecting margin or overlaid type without its own compositing — none is asked of it.

### Issues

- **P2 — `dist/web/public/icons/icon-1024.png` is unreferenced dead weight in the precache.** Nothing in `manifest.icons` or `index.html` points at a 1024px icon; Workbox's `globPatterns` (`**/*.png`) and `includeAssets: ['icons/*.png']` sweep it into the service-worker precache anyway. At 202KB it's over half the total bytes in `icons/` and every installer downloads it for nothing. **Fix (pipeline, not the master):** in `dist/scripts/normalize-icon.mjs`, stop writing the normalized 1024 master into the served directory — write it to `dist/assets-source/` (e.g. `icon-cube-normalized.png`) instead of `join(outDir, 'icon-1024.png')`, or exclude it explicitly from `includeAssets`/`globPatterns` if a served reference copy is wanted. This is the same defect the README already diagnosed for the raw master one directory over; it just recurred in the derived set.
- **P3 — `DISTANCE = 18` in `render-icon.mjs` is the one geometry constant not covered by `icon-master.test.ts`.** Every other literal (`CUBIE`, `SPACING`, `FOV`, yaw, pitch, palette, both ramps) is asserted against `palette.ts`/`renderer.ts` by that test; `DISTANCE` is hand-picked and only documented in a code comment ("solves to about this on a phone"). It doesn't produce a visible defect today, but nothing will catch it if `ZOOM_REST` or `FOV` changes later. **Fix:** either derive it in the script from the same formula `applyFraming()` uses (`1.5 / (ZOOM_REST * tan(FOV/2))`, adjusted for the phone-shaped aspect ratio it was solved against) so it can't silently drift, or add a tolerance assertion in `icon-master.test.ts` the way the other constants are covered.

No P0 or P1. No brief edit is warranted for the master — it clears the brief as specified.

### Scores (master, `icon-cube.png`)

| Dimension | Score |
|---|---|
| Brief fidelity | 4 |
| Text integrity | 4 (none present, none invented, none briefed) |
| Framing | 4 |
| Brand color fit | 4 (dE 6.2/8.8 verified as the exact, correct result of the specified shading — not a miss) |
| Small-size legibility | 4 (confirmed at 48px on master + all four derived sizes) |
| Alpha and background integrity | 4 |
| Craft | 4 |
| Register and type fit | 4 |
| **Total** | **32/32 — ship** |

Nothing at or below 2.

### Proposed token changes

None. The shaded values are correctly derived from existing tokens through the app's own documented ramp, not a candidate replacement for them.

Files referenced: `/Users/erickanney/builder/projects/quarter-turn/.claude/worktrees/cube-rotation-face-controls-56433f/dist/assets-source/icon-cube.png`, `.../dist/assets-source/icon-cube.gen.json`, `.../dist/assets-source/README.md`, `.../dist/scripts/render-icon.mjs`, `.../dist/scripts/normalize-icon.mjs`, `.../dist/web/cube/palette.ts`, `.../dist/web/cube/renderer.ts`, `.../dist/web/cube/icon-master.test.ts`, `.../dist/web/public/icons/*.png`, `.../vite.config.ts`, `.../dist/web/index.html`, `.../src/interfaces/@brand/visual.md`, `.../src/roadmap/mvp.md`.

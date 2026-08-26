# Quarter Turn

A competition-legal 3x3x3 Rubik's cube you solve with your thumb, on your phone.

Press a sticker and drag: that layer rotates live under your finger and releases into
the nearest quarter turn. Drag the background to spin the whole cube, pinch to zoom.
The clock starts on your first move and stops the instant the cube is solved.

Everything runs on the device. No account, no server, no network after the first load.

## What "competition-legal" means here

The claim is checkable, so it is grounded in the actual
[WCA Regulations](https://www.worldcubeassociation.org/regulations/) rather than an
impression of them.

- **Scrambles are random-state**, not twenty random turns — a uniformly random cube
  state, solved, and the solution inverted (Regulation 4b3).
- **Competition mode** runs the real ritual: fifteen seconds of inspection, hold to
  start, and the actual +2 and DNF thresholds (A4d1, A4d2).
- **Averages are trimmed means** with the real DNF rule — one DNF is absorbed as the
  dropped worst result, two make the average a DNF (9f8, 9f9).
- **Move counts are OBTM**: a half turn costs one, a slice costs two.

### Three things it deliberately does not claim

- The fewest-moves board is **not competition FMC**. The metric matches; the discipline
  does not — there is no paper and no sixty-minute limit.
- **Average of 12 is not a WCA format.** The WCA has never run one. It ships because
  cubers expect it, labelled `NOT WCA` where the number appears.
- **The stage splits assume CFOP.** Cross and Solved hold however you solve, but F2L and
  OLL are the wrong number for a Roux or ZZ solve — so a solve that does not hold CFOP's
  shape shows no stage times at all rather than confident wrong ones.

## Running it

```bash
npm install
npm run dev -- --host    # --host so a phone on the same wifi can reach it
```

Judge it installed to a home screen, not in a browser tab: Safari's edge-swipe gesture
fights the drag you use to turn the cube, and installed there is no browser chrome left
to fight it.

```bash
npm run build            # tests, then typecheck, then bundle
npm test
```

`npm run build` runs the suite first on purpose: a red test blocks the build, and the
build blocks the deploy.

## Notes for anyone reading the code

- **The engine is rotations, not facelet permutation tables** (`dist/cube/state.ts`).
  Tables are the most error-prone thing in a cube implementation and there is no cheap
  way to eyeball one. Correctness is proved against `cubing.js` rather than asserted:
  both models take the same moves, so a solution the reference computes must solve ours.
- **The scramble worker is bundled separately** (`dist/scripts/build-worker.mjs`). Vite
  does not recognise how cubing.js builds its Worker URL and bundles it into the app's
  chunk, where it dies on `document is not defined` — visible only in a production
  build. That script is why the built app can scramble at all.
- Built with [Builder](https://github.com/anthropics/claude-code), a spec-driven agent
  workflow. The specs in `src/` are the source of truth; `dist/` is the code.

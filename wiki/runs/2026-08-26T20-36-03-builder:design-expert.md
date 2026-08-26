# Run — builder:design-expert — 2026-08-26T20:36:03.877Z

Captured verbatim by the SubagentStop hook: the handoff Builder sent, and the agent's complete output (its `## Thinking` and `## Result`).

## Handoff

**Free orbit and pinch zoom**

Work in /Users/erickanney/builder/projects/quarter-turn. Read `src/interfaces/@brand/visual.md` — its "Orbiting the view" block is yours and I am about to overrule part of it, so I want your version of the replacement rather than my guess at it.

**The user has now held this on a real iPhone and reported two things about the orbit.** Their words: they are "unable to rotate the cube past a certain point" and "can't zoom out or in", and they want to "pinch zoom in or out and drag to rotate the cube fully and continuously in any direction."

Two of your decisions are what they hit:

1. **Pitch is clamped to ±72°** — you wrote the clamp so the user "never ends up edge-on and disoriented." That is the wall they are describing.
2. **The orbit settles onto one of eight canonical three-quarter views** — your reasoning was that a free-floating orbit "leaves the cube in oblique poses where stickers are foreshortened and unreadable at speed."

Both arguments are good and I am not dismissing them. But the user is explicit, they are the one holding the phone, and "continuously in any direction" is not compatible with either a clamp or a snap. So the orbit is becoming a free trackball: drag rotates the cube itself about screen-space axes with no clamp and no gimbal lock, momentum on release, and no settle to a canonical pose. There is also no zoom at all today, and there will be pinch-to-zoom.

What I want from you, written into `visual.md` as a correction that supersedes the old block rather than as a new section beside it:

- **The trackball's feel, in numbers I can implement.** Degrees of rotation per unit of drag (yours was 0.55 × viewport width = 180°, which may or may not still be right for a trackball where both axes are live). Momentum decay and its cutoff. Whether anything at all should still settle — I suspect the honest answer is nothing, but if you think there is a version of your readability concern that survives free rotation, tell me what it is.
- **Pinch zoom, fully specified.** The range, expressed however is most useful — the cube's projected size as a fraction of the stage width is how the existing framing is specified, so probably that. What the resting default is. What happens at each limit: hard stop, or rubber-band and settle back. Whether a pinch has momentum. And whether zoom persists across scrambles and launches or resets.
- **Your read on what you lose.** You argued the eight canonical views protect sticker readability at speed. With free rotation that protection is gone. Is there something cheap that recovers most of it — a slight bias back toward a readable pose when momentum dies, a shading tweak for grazing angles, nothing at all? I would rather ship your answer than my compromise.

One constraint that has not changed: the shading ramp is evaluated in view space and stays anchored to the screen. If free rotation interacts badly with that — grazing faces going muddy, say — that is worth knowing now.

Be concrete enough that I can code it without inventing numbers.

## Agent output

The correction is written into `/Users/erickanney/builder/projects/quarter-turn/src/interfaces/@brand/visual.md`.

## Thinking

**Taking the loss properly.** The user is holding the phone and I am not. A clamp you hit mid-drag with no explanation and a snap that takes the pose away the instant you stop are both the app overruling the hand, and on a product whose entire sense of touch is motion (no haptics, remember) that is the worst thing it can do. So I'm not defending either. But conceding without relocating the concern would be lazy, and the interesting work is in the relocation.

**The readability argument was right about the problem and wrong about the instrument.** I said free rotation leaves stickers "foreshortened and unreadable at speed." When I actually did the arithmetic against the running renderer, the ramp separates the two side faces of the default three-quarter view — the pose the app has *always* opened on — by 3.6% (k = 0.835 vs 0.805). Two adjacent same-coloured faces were already nearly merging, at the canonical pose, before free rotation was on the table. The eight-view snap was never protecting readability; it was protecting me from noticing that the ramp's left/right pair (0.82 vs 0.76) attenuates to almost nothing off-axis. So the honest fix is the ramp, not the rotation. Widening it to `up 1.00 / toward 0.88 / left 0.84 / right 0.72 / down 0.66` puts that pair 7.1% apart, and — this is the part that beats the snap — it holds at *every* orientation, not eight of them: edge-on reads 0.86/0.80, corner-on reads 0.96/0.823/0.763. The snap protected eight poses. The ramp protects all of them and improves the default. That is my answer to "is there a version of the concern that survives": yes, and it's better than what it replaces.

**The architecture change is the real unlock, and it also answers the shading question.** Today the orbit moves the *camera* around a fixed cube in spherical yaw/pitch — which is precisely why a clamp was needed, because pitch ±90° is a pole. A free trackball inverts it: the camera stops moving entirely (fixed at `(0,0,d)`, up `+y`), and all orientation lives in the cube's quaternion. This does three things at once. No gimbal lock, structurally. Zoom becomes a single scalar (`distance`) with nothing else coupled to it. And the view matrix becomes a constant, so the view-space shading ramp is now *more* anchored to the screen than before, not less — view space and world space differ only by a translation. The ramp does not degrade under free rotation; it never sees the rotation at all. Two implementation traps come with that, and I've written both into the spec because they're silent failures: `applyShading` currently reads the *cubie's* quaternion, which no longer contains the orbit, and `projectDirection` has the same gap.

**The framing rule had to change or the cube would breathe.** "Projected bounding box is 78% of stage width" is pose-dependent — a free-rotating cube's projected width swings from 3.0 to 5.196 world units. Holding 78% would force `distance` to chase the pose and the cube would visibly pulse as it turned. So framing re-anchors to a rotation-invariant quantity: `D`, the cube's on-screen face width. `D = 0.55 × stage width` reproduces today's framing at the default pose *exactly* (78% silhouette, distance 15.06 on the reference device) while being immune to rotation. That one substitution then pays for everything downstream — the trackball gain, the turn gain, and the zoom range all become expressions in `D`, so the whole touch model is stated in the cube's own on-screen units and feels identical on any phone.

**The gain, and why I tied it to the cube rather than the viewport.** 180° per `D` px is 0.95°/px at rest — within 1% of the old horizontal yaw feel, so the muscle memory survives. But because it's expressed in the cube's units rather than the viewport's, zooming in makes the cube heavier to spin and zooming out makes it lighter. That's not an accident I'm tolerating, it's the point: a bigger object under the same thumb should turn less, and the turn gain already worked this way. Tying it to viewport width instead would make a zoomed-in cube whip, which is the twitchy-3D-viewer feeling I'm most trying to avoid.

**Momentum got longer, not shorter, and that needed a release valve.** With the snap gone, momentum is the whole ending rather than a prelude. τ = 400ms gives a 900°/s flick exactly one full revolution, which is a satisfying and memorable physical fact. The cost is a 1.45s tail. That's only acceptable because **any pointerdown kills it on the same frame** — flick it, watch it spin, touch it and it's dead still. Without that valve the long glide would be a nuisance during a timed solve; with it, it's a toy you can't put down. I also specified velocity off a 60ms window rather than the final frame delta, because iOS routinely delivers a 2ms-dt jitter pixel as the last `pointermove` and the current single-frame sampling will occasionally launch the cube for no reason.

**Directions I rejected.** A bias back toward a readable pose when momentum dies — the user suspected I'd want this and I don't; it's still the app moving the cube after you stopped, just quieter and harder to explain, and it fails for the same reason the snap failed. Twist-to-roll on the pinch — nothing to gain on an object with 24 identical orientations. Hard stops at the zoom limits — on a device with literally no vibration API, a hard stop is indistinguishable from a frozen app; the rubber-band *is* the feedback, and the refusal spec already made exactly this argument ("must read as locked, not as ignored"), so the zoom limits reuse the refusal's asymptotic shape and its spring rather than inventing a third vocabulary. Pinch momentum — rejected, because drifting into a limit you didn't ask for is the precise complaint this whole correction exists to fix.

**Two problems free zoom creates that had to be solved in the same pass.** At `f_max` the cube fills the stage and there is *no background left to grab*, so background-only orbit would strand the user at exactly the zoom where they most need to turn it — hence two-finger drag orbits and zooms simultaneously, over any pixel. And with no snap there's no implicit way home, so double-tap resets. I originally gave that a menu row for discoverability and cut it: the Menu sheet is four destinations, and one action row in it would be the mixed-visual-languages enemy plus the only chrome ever added to a stage the spec says holds "nothing but the cube." The double-tap sits directly on the thing it controls, which is the strongest proximity available, and it gets taught twice — a third line in the first-run overlay, and a once-per-session hint in the notation strip's already-reserved slot. Zero new chrome, zero layout shift.

**One usability catch that free rotation promotes from rare to common.** The grab acknowledgement lifts stickers to `k × 1.06` *clamped at 1.0*, so a layer grabbed on the up face gets no lift. Under the clamped orbit that was an edge case; under free rotation any face can be the up face, so it's now routine. The 1px hairline is therefore the load-bearing "your touch registered" signal and must never be conditional — with no haptics it is the only proof.

## Result

### What changed in `visual.md`

Six blocks, all superseding rather than sitting beside the old text. Full paths: `/Users/erickanney/builder/projects/quarter-turn/src/interfaces/@brand/visual.md`.

1. **`camera`** — camera fixed and non-rotating; `q_default = Rx(+24°)·Ry(−45°)` with three verification normals; framing restated on the rotation-invariant `S`/`D`/`f`.
2. **`face-shading`** — widened sticker ramp, new body ramp, squared-blend correction, three worked hexes.
3. **`turn-follow`** — gain restated against `S` with a foreshortening term and a floor; `screenEdgeLength()` deleted.
4. **`Orbiting and zooming the view`** — replaces `Orbiting the view` entirely: `trackball`, `zoom`, two-finger rule, `view-reset`, and an explicit "what is lost" note.
5. **Reduced motion** — updated for momentum, rubber-band, and reset.
6. **Stage** — "never touches chrome" restated as "never draws outside the stage," with the crop rule.

### The numbers, condensed

**Trackball.** Axis `normalize(dy, dx, 0)` in view space (= world, camera fixed); angle `hypot(dx,dy) × 180°/D`; compose left, renormalize every frame. **180° per `D` px** = 0.95°/px at rest = 189px on the reference device. No clamp, no pole, no snap, no settle.

**Momentum.** `ω₀` from the last 60ms of pointer history (never a single frame delta). `ω(t) = ω₀·e^(−t/400ms)` about a screen-fixed axis, cut off below the rate 26 px/s of drag produces (24.8°/s at rest). A 900°/s flick = exactly 360°, at rest in ~1.45s. **Any pointerdown kills momentum on the same frame.**

**Zoom.** `f = D / stage width`. **0.32 / 0.55 / 0.94** (log-symmetric ±1.72×, 2.9× end to end). 1:1, no smoothing, **no momentum**. Rubber-band both limits in log space, `r = 0.16` (17% asymptotic ceiling), release on the refuse spring `{700, 34, 0.5}`. **Zoom persists across scrambles and launches; orientation resets to `q_default` on launch only.**

**Nothing settles.** That is the honest answer.

### `tokens.json` diff — drop in verbatim

```
color.shade:            up 1.00 · toward 0.88 · left 0.84 · right 0.72 · away 0.72 · down 0.66
color.shade-universal:  unchanged (1.00 / 0.94 / 0.88 / 0.86 / 0.86 / 0.84)
color.shade-body:       NEW — up 3.00 · toward 1.90 · left 1.50 · right 0.90 · away 0.90 · down 0.50
                        $description: "Applied to color.body in linear light. Identical on both
                        palettes; the body is achromatic so a wide ramp costs no information.
                        Not applied while concealed."

motion.duration.orbit-settle   DELETE (340ms — no pose settle exists)
motion.duration.view-reset     NEW    260ms
motion.spring.orbit            DELETE (180/24/1 — no pose settle exists)

motion.gesture.pitch-clamp-deg      DELETE
motion.gesture.orbit-gain           DELETE (0.55 — superseded)
motion.gesture.trackball-gain-deg   NEW    180      // per D px
motion.gesture.orbit-tau            260ms -&gt; 400ms
motion.gesture.orbit-cutoff-degps   DELETE -&gt; replaced by:
motion.gesture.orbit-cutoff-pxps    NEW    26       // scales with zoom; 24.8deg/s at rest
motion.gesture.turn-gain            0.42 -&gt; 1.06    // MEANING CHANGED: multiplier on S, not on
                                                    // projected edge length
motion.gesture.turn-tangent-floor   NEW    0.62
motion.gesture.zoom-min             NEW    0.32
motion.gesture.zoom-rest            NEW    0.55
motion.gesture.zoom-max             NEW    0.94
motion.gesture.zoom-rubber-r        NEW    0.16
motion.gesture.tap-max-ms           NEW    220
motion.gesture.tap-max-px           NEW    8
motion.gesture.double-tap-window-ms NEW    280
```

### Implementation traps — silent failures, worth reading before coding

These are the four places the existing code will keep running and quietly produce wrong output once orientation moves from the camera to the cube:

- **`applyShading` reads `cubie.group.quaternion`**, which will no longer contain the orbit. It needs the sticker's *world* normal. Once the camera is fixed, `transformDirection(view)` becomes a no-op and can be dropped — but only because the camera truly never rotates.
- **`projectDirection` projects raw world coordinates.** Same gap; it must go through the root's world matrix, and it must now also return the un-normalized magnitude (that's `|t|` for the turn gain).
- **`screenEdgeLength()` must be deleted, not adapted.** It measures one specific world edge, which under free rotation can point at the camera and project to zero pixels — the turn gain then divides by ~0 and the layer whips. Replace with `S = (stageHeight/2)/(distance·tan(fov/2))`.
- **`pickSticker`'s `worldNormal` is correct as-is** and should *not* be "fixed" — it returns a cube-space normal, which is what the move logic wants.

One more: the shading blend in `renderer.ts` uses raw components divided by their sum, not the squared form the spec specifies. Those agree only at the axes. It was a tolerable divergence when poses were canonical; free rotation makes off-axis normals the common case, so correct it in the same pass.

### Handoffs

- **voice-writer** owns two new lines: a third line for the first-run overlay (`web.md` → `first-run`, which currently teaches only sticker-drag and background-drag), and the once-per-session view hint that renders in the notation strip's refusal slot.
- **`web.md` needs no structural change** — I deliberately added no chrome. The first-run block gains a line; nothing else moves.
- **`app.md` needs no change.** "Rotating the view is never a move, is never logged, and never starts the clock" already covers zoom; both are silent, and the OBTM contract is untouched.
- **The @user acceptance scenario in `src/roadmap/mvp.md`** — "Turning and orbiting feel natural and satisfying on a real installed iPhone" — is the one that just failed. It should be re-verified on hardware after this lands, and it's worth adding a sibling scenario for pinch zoom, since it didn't exist to be tested before.

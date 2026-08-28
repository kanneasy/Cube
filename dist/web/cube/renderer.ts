// The three.js stage.
//
// The renderer reads the engine's cubie model directly -- position plus orientation
// matrix -- which is why the engine was built as rotations rather than facelet
// permutation tables. There is no translation layer between the logic and the pixels.
//
// The camera NEVER moves and never rotates. It sits at (0, 0, distance) looking at the
// origin, and zoom is the only thing that touches distance. All orientation lives in
// the cube's own quaternion. That single decision does three things at once: it removes
// gimbal lock from the orbit structurally, it makes zoom one uncoupled scalar, and it
// makes view space equal world space up to a translation -- so the view-space shading
// ramp is anchored to the screen by construction rather than by bookkeeping.

import * as THREE from 'three';
import { applyMove, stickersOf, TURNS, type CubeState, type Face, type Move, type TurnBase, type Vec3 } from '../../cube/state';
import { BODY_COLOR, SHADE_BODY, type Palette, type Ramp } from './palette';
import { projectDirection as projectDirectionOnto } from './project';
import { prefersReducedMotion } from './motion';

const CUBIE = 0.98; // leaves a hairline of black between cubies
const SPACING = 1.0;
const FOV = 28;

/** The default pose: Ry(-45) then Rx(+24), showing U, F and R. */
export const DEFAULT_YAW = Math.PI / 4;
export const DEFAULT_PITCH = (24 * Math.PI) / 180;

export function defaultOrientation(): THREE.Quaternion {
  const rx = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), DEFAULT_PITCH);
  const ry = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -DEFAULT_YAW);
  return rx.multiply(ry);
}

/**
 * Zoom, as `f` -- the cube's on-screen FACE width divided by the stage width. Framing on
 * a rotation-invariant quantity is the point: a free-rotating cube's projected
 * silhouette swings between 3.0 and 5.196 world units, so framing on the silhouette
 * would make the cube breathe as it turned.
 *
 * The resting value is 0.40 rather than design's 0.55 at the user's direction. At 0.55
 * the silhouette reaches 95% of the stage width at a corner-on pose, leaving 8px of
 * background each side -- nowhere to put the thumb that has to orbit it. 0.40 leaves 53px
 * at the worst pose.
 */
export const ZOOM_MIN = 0.24;
export const ZOOM_REST = 0.45;
export const ZOOM_MAX = 0.94;

/** Rubber-band shape past a zoom limit: an asymptotic 17% ceiling, reached only by pulling. */
export const ZOOM_RUBBER_R = 0.16;

interface StickerRef {
  readonly mesh: THREE.Mesh;
  readonly material: THREE.MeshBasicMaterial;
  readonly face: Face;
  base: THREE.Color;
  readonly localNormal: THREE.Vector3;
}

interface CubieRef {
  readonly group: THREE.Group;
  readonly body: THREE.Mesh;
  readonly stickers: StickerRef[];
  basePosition: THREE.Vector3;
  baseQuaternion: THREE.Quaternion;
  coords: Vec3;
}

const AXIS_VECTORS = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)];

/**
 * The grab acknowledgement.
 *
 * iOS Safari has no haptics, so nothing else in this app can tell you a touch registered
 * or which layer it caught. `visual.md` has required this since the first spec and it was
 * never built: `onGrab` fired and the app used it only to unlock audio, so until the
 * layer visibly moved there was no confirmation at all -- and if the axis had resolved
 * wrongly, the first confirmation you got was the wrong face turning.
 *
 * Two stages, because the two things knowable are knowable at different moments. At
 * touch-down the only fact is which cubie is under the thumb, so a RING traces that
 * cubie's face. At engage the layer is known, so the ring gives way to the SEAM -- the
 * cut plane the layer will shear along.
 *
 * The seam, not a silhouette. A silhouette of a 3x3x1 slab is a screen-space computation
 * whose topology changes as the cube rotates; the cut is one closed square loop in the
 * cube's own frame, known in closed form, and parented to the root so it rotates for
 * free. It also falls exactly in the 0.02-unit gap the geometry already leaves between
 * cubie rows, so it does not overlay the cube -- it lights a groove that is already there.
 */
const GRAB_SURFACE_OFFSET = 0.008;
/** Screen-space floor, so the line does not thin to a shimmer when zoomed out... */
const GRAB_HAIRLINE_PX = 1.2;
/** ...and the groove's own width above about f = 0.53, so it reads as the groove lighting up. */
const GRAB_HAIRLINE_WORLD = 0.02;
const GRAB_OPACITY = 0.62;
/**
 * The body carries the lift, not the stickers.
 *
 * A multiply on an sRGB-encoded bright colour is compressed to almost nothing: Verde at
 * 1.06 moves byte 188 to 194, which is invisible, and that -- not the clamp -- is why the
 * specified sticker lift never read. The body is #141518 on a ramp already running 0.50
 * to 3.00, so it has real headroom, and because the body IS the grout between stickers,
 * lifting it draws the grabbed layer's 3x3 grid. Unclamped, in linear light.
 */
const GRAB_LIFT_BODY = 1.55;
/** Supporting only, so the stickers move with the grout instead of looking dead beside it. */
const GRAB_LIFT_STICKER = 1.1;
const GRAB_IN_MS = 50;
const GRAB_EXPAND_MS = 80;
const GRAB_OUT_MS = 120;

/** Two triangles through four coplanar corners, in the cube's own frame. */
function quad(corners: THREE.Vector3[]): THREE.BufferGeometry {
  const [a, b, c, d] = corners;
  const g = new THREE.BufferGeometry();
  g.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
      [a, b, c, a, c, d].flatMap((v) => [v.x, v.y, v.z]),
      3,
    ),
  );
  return g;
}

const vec = (axis: number, value: number, other: number, otherValue: number, third: number, thirdValue: number) => {
  const p = new THREE.Vector3();
  p.setComponent(axis, value);
  p.setComponent(other, otherValue);
  p.setComponent(third, thirdValue);
  return p;
};

/** BoxGeometry's material groups, in order, as local face normals. */
const BOX_FACE_NORMALS = [
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(-1, 0, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0, -1, 0),
  new THREE.Vector3(0, 0, 1),
  new THREE.Vector3(0, 0, -1),
];

/**
 * Blend a ramp by the SQUARED positive components of a view-space normal.
 *
 * Exactly three axes can be positive and their squares sum to one, so this is exact at
 * the axes, smooth between them, and needs no normalising divide. Blending by the raw
 * components over their sum is a different, flatter interpolation that agrees only at
 * the axes -- and free rotation makes off-axis normals the common case.
 */
export function shadeFor(n: THREE.Vector3, ramp: Ramp): number {
  const up = Math.max(0, n.y);
  const down = Math.max(0, -n.y);
  const right = Math.max(0, n.x);
  const left = Math.max(0, -n.x);
  const toward = Math.max(0, n.z);
  const away = Math.max(0, -n.z);
  return (
    up * up * ramp.up +
    down * down * ramp.down +
    right * right * ramp.right +
    left * left * ramp.left +
    toward * toward * ramp.toward +
    away * away * ramp.away
  );
}

export class CubeRenderer {
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly root = new THREE.Group();
  private readonly cubies: CubieRef[] = [];
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2();

  /** The cube's own orientation. Free trackball: no clamp, no pole, no snap. */
  private readonly orientation = defaultOrientation();
  private zoomF = ZOOM_REST;
  private distance = 12;
  /** One world unit, in CSS px, at the cube's centre depth. */
  private unitPx = 60;

  /** Body faces shade by their own normals, so a turning layer needs its own set. */
  private readonly restingBody: THREE.MeshBasicMaterial[] = [];
  private readonly turningBody: THREE.MeshBasicMaterial[] = [];

  private concealed = false;
  private liveBase: TurnBase | null = null;
  private liveAngle = 0;

  /** The acknowledgement's own scene graph, rebuilt when what is held changes. */
  private readonly grabGroup = new THREE.Group();
  private readonly grabMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    // Additive is right in a renderer with flat materials, no lights and a black room:
    // the line lifts whatever is under it rather than replacing it, so the same line
    // survives on near-black plastic and on a saturated sticker. depthTest stays ON --
    // the far side of the loop has to be hidden, or it reads as a wireframe box around
    // the cube rather than a groove cut into a solid.
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    depthTest: true,
    side: THREE.DoubleSide,
  });
  private touchedCubie: number | null = null;
  private grabbedBase: TurnBase | null = null;
  /** 0 to 1. Drives both the line's opacity and the layer's lift. */
  private grabAmount = 0;
  private grabTarget = 0;
  private grabRampMs = GRAB_IN_MS;
  private grabLastFrame = 0;
  private grabHairline = GRAB_HAIRLINE_WORLD;
  private frameHandle = 0;
  private readonly resizeObserver: ResizeObserver | null;

  constructor(
    private readonly container: HTMLElement,
    private palette: Palette,
  ) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 1);
    container.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.display = 'block';
    this.renderer.domElement.style.touchAction = 'none';

    this.camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
    this.scene.add(this.root);
    this.root.add(this.grabGroup);
    this.buildCubies();
    this.resize();

    // The stage changes size for reasons that are not a window resize -- a first-run
    // card appearing beneath the cube, the install note being dismissed. Listening only
    // to window.resize left the canvas at its old height, overflowing its box and
    // painting opaque black over whatever had just appeared below it.
    this.resizeObserver =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => this.resize());
    this.resizeObserver?.observe(container);

    this.loop();
  }

  private buildCubies(): void {
    const bodyGeometry = new THREE.BoxGeometry(CUBIE, CUBIE, CUBIE);
    for (let i = 0; i < 6; i++) {
      this.restingBody.push(new THREE.MeshBasicMaterial({ color: BODY_COLOR }));
      this.turningBody.push(new THREE.MeshBasicMaterial({ color: BODY_COLOR }));
    }

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (!x && !y && !z) continue;
          const group = new THREE.Group();
          const body = new THREE.Mesh(bodyGeometry, this.restingBody);
          group.add(body);

          const home: Vec3 = [x, y, z];
          const stickers: StickerRef[] = [];
          for (const { normal, color } of stickersOf({ home, pos: home, rot: [1, 0, 0, 0, 1, 0, 0, 0, 1] })) {
            const size = CUBIE * (1 - this.palette.stickerInset * 2);
            const geometry = new THREE.PlaneGeometry(size, size);
            const base = new THREE.Color(this.palette.faces[color]);
            const material = new THREE.MeshBasicMaterial({ color: base.clone(), side: THREE.FrontSide });
            const mesh = new THREE.Mesh(geometry, material);
            const n = new THREE.Vector3(normal[0], normal[1], normal[2]);
            mesh.position.copy(n).multiplyScalar(CUBIE / 2 + 0.001);
            mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n);
            group.add(mesh);
            stickers.push({ mesh, material, face: color, base, localNormal: n });
          }

          this.root.add(group);
          this.cubies.push({
            group,
            body,
            stickers,
            basePosition: new THREE.Vector3(x * SPACING, y * SPACING, z * SPACING),
            baseQuaternion: new THREE.Quaternion(),
            coords: home,
          });
        }
      }
    }
  }

  setState(state: CubeState): void {
    state.cubies.forEach((cubie, i) => {
      const ref = this.cubies[i];
      ref.basePosition.set(cubie.pos[0] * SPACING, cubie.pos[1] * SPACING, cubie.pos[2] * SPACING);
      const m = new THREE.Matrix4().set(
        cubie.rot[0], cubie.rot[1], cubie.rot[2], 0,
        cubie.rot[3], cubie.rot[4], cubie.rot[5], 0,
        cubie.rot[6], cubie.rot[7], cubie.rot[8], 0,
        0, 0, 0, 1,
      );
      ref.baseQuaternion.setFromRotationMatrix(m);
      ref.coords = cubie.pos;
    });
    this.liveBase = null;
    this.liveAngle = 0;
  }

  /**
   * Play a sequence onto the cube, one quarter turn at a time. Used for the opening: the
   * app shows a solved cube and scrambles itself rather than showing a spinner.
   *
   * The LOGICAL state is already final before this runs. The visual must never be left
   * BEHIND it, so a hidden document (where requestAnimationFrame does not run at all)
   * lands immediately, and a wall-clock timer force-lands if frames stop for any other
   * reason.
   */
  playSequence(from: CubeState, moves: readonly Move[], msPerMove: number, onDone?: () => void): () => void {
    let cancelled = false;
    let state = from;
    let index = 0;
    let startedAt = 0;
    let handle = 0;

    const land = (): void => {
      if (cancelled) return;
      cancelled = true;
      cancelAnimationFrame(handle);
      window.clearTimeout(guard);
      this.setLayerRotation(null, 0);
      onDone?.();
    };

    if (prefersReducedMotion() || (typeof document !== 'undefined' && document.hidden)) {
      onDone?.();
      return () => {};
    }

    const guard = window.setTimeout(land, moves.length * msPerMove + 1500);

    const step = (now: number): void => {
      if (cancelled) return;
      if (startedAt === 0) startedAt = now;
      const move = moves[index];
      if (!move) {
        land();
        return;
      }
      const t = Math.min(1, (now - startedAt) / msPerMove);
      const eased = 1 - (1 - t) ** 3;
      this.setLayerRotation(move.base, eased * (Math.PI / 2) * move.amount);

      if (t >= 1) {
        state = applyMove(state, move);
        this.setState(state);
        index++;
        startedAt = 0;
      }
      handle = requestAnimationFrame(step);
    };

    this.setState(from);
    handle = requestAnimationFrame(step);
    return () => {
      cancelled = true;
      cancelAnimationFrame(handle);
      window.clearTimeout(guard);
      this.setLayerRotation(null, 0);
    };
  }

  /**
   * Hide what the cube is showing without hiding the cube. Competition inspection begins
   * when the scramble is revealed, so before that it must genuinely not be readable.
   */
  // ---- the grab acknowledgement ----

  /**
   * Stage one: the cubie under the thumb, at touch-down.
   *
   * This is what meets the 60ms budget the spec asks for. The old spec fired the
   * acknowledgement at axis resolution, which needs travel -- on a slow press that is
   * hundreds of milliseconds, and on a press that never moves it never fires at all. The
   * budget was unmeetable by construction until it moved here.
   */
  setTouched(cubieIndex: number | null): void {
    if (this.touchedCubie === cubieIndex) return;
    this.touchedCubie = cubieIndex;
    if (cubieIndex !== null) this.grabbedBase = null;
    this.rebuildGrab(GRAB_IN_MS);
  }

  /** Stage two: the layer, once the axis is known. The ring gives way to the seam. */
  setGrabbed(base: TurnBase | null): void {
    if (this.grabbedBase === base && base !== null) return;
    this.grabbedBase = base;
    if (base !== null) this.touchedCubie = null;
    this.rebuildGrab(base === null ? GRAB_OUT_MS : GRAB_EXPAND_MS);
  }

  /** Let go of everything, on the slower outgoing ramp. */
  clearGrab(): void {
    if (this.touchedCubie === null && this.grabbedBase === null) return;
    this.touchedCubie = null;
    this.grabbedBase = null;
    this.rebuildGrab(GRAB_OUT_MS);
  }

  private rebuildGrab(rampMs: number): void {
    for (const child of [...this.grabGroup.children]) {
      this.grabGroup.remove(child);
      (child as THREE.Mesh).geometry.dispose();
    }

    this.grabHairline = Math.max(GRAB_HAIRLINE_WORLD, GRAB_HAIRLINE_PX / (this.unitPx || 1));
    this.grabRampMs = rampMs;
    this.grabTarget = this.touchedCubie !== null || this.grabbedBase !== null ? 1 : 0;

    for (const geometry of this.grabGeometry()) {
      this.grabGroup.add(new THREE.Mesh(geometry, this.grabMaterial));
    }
  }

  private grabGeometry(): THREE.BufferGeometry[] {
    const w = this.grabHairline;
    const out: THREE.BufferGeometry[] = [];

    if (this.touchedCubie !== null) {
      // A square ring centred in the grout between the sticker edge and the cubie edge,
      // so it works on either palette's inset without being told which.
      const cubie = this.cubies[this.touchedCubie];
      if (!cubie) return out;
      const r = (CUBIE * (1 - this.palette.stickerInset * 2) + CUBIE) / 4;
      const [o, i] = [r + w / 2, r - w / 2];
      // Every outward face of the touched cubie: the thumb is on one of them, and which
      // one is not worth a second raycast when the cube hides the rest anyway.
      for (let axis = 0; axis < 3; axis++) {
        if (cubie.coords[axis] === 0) continue;
        const sign = Math.sign(cubie.coords[axis]);
        const [u, v] = [0, 1, 2].filter((a) => a !== axis);
        const at = cubie.basePosition.getComponent(axis) + sign * (CUBIE / 2 + GRAB_SURFACE_OFFSET);
        const cu = cubie.basePosition.getComponent(u);
        const cv = cubie.basePosition.getComponent(v);
        for (const [u0, u1, v0, v1] of [
          [-o, o, i, o],
          [-o, o, -o, -i],
          [-o, -i, -i, i],
          [i, o, -i, i],
        ]) {
          out.push(
            quad([
              vec(axis, at, u, cu + u0, v, cv + v0),
              vec(axis, at, u, cu + u1, v, cv + v0),
              vec(axis, at, u, cu + u1, v, cv + v1),
              vec(axis, at, u, cu + u0, v, cv + v1),
            ]),
          );
        }
      }
      return out;
    }

    if (this.grabbedBase === null) return out;
    const spec = TURNS[this.grabbedBase];
    // A slice takes TWO cuts, and showing both is honest: it is the same fact that makes
    // a slice cost two under OBTM.
    const cuts = spec.layer === 0 ? [-0.5, 0.5] : [spec.layer * 0.5];
    const face = 1.5 - (SPACING - CUBIE) / 2 + GRAB_SURFACE_OFFSET;
    const reach = 1.5 - (SPACING - CUBIE) / 2 + w / 2;

    for (const cut of cuts) {
      for (const side of [0, 1, 2].filter((a) => a !== spec.axis)) {
        const third = [0, 1, 2].find((a) => a !== spec.axis && a !== side)!;
        for (const sign of [-1, 1]) {
          out.push(
            quad([
              vec(side, sign * face, spec.axis, cut - w / 2, third, -reach),
              vec(side, sign * face, spec.axis, cut - w / 2, third, reach),
              vec(side, sign * face, spec.axis, cut + w / 2, third, reach),
              vec(side, sign * face, spec.axis, cut + w / 2, third, -reach),
            ]),
          );
        }
      }
    }
    return out;
  }

  /** Ease the acknowledgement toward its target. Linear: an ease-in reads as hesitation. */
  private stepGrab(): void {
    const now = performance.now();
    const dt = this.grabLastFrame ? Math.min(64, now - this.grabLastFrame) : 0;
    this.grabLastFrame = now;
    if (this.grabAmount === this.grabTarget) return;

    const step = prefersReducedMotion() ? 1 : dt / this.grabRampMs;
    this.grabAmount =
      this.grabTarget > this.grabAmount
        ? Math.min(this.grabTarget, this.grabAmount + step)
        : Math.max(this.grabTarget, this.grabAmount - step);
    this.grabMaterial.opacity = this.grabAmount * GRAB_OPACITY;
  }

  setConcealed(concealed: boolean): void {
    this.concealed = concealed;
  }

  setPalette(palette: Palette): void {
    this.palette = palette;
    const inset = CUBIE * (1 - palette.stickerInset * 2);
    for (const cubie of this.cubies) {
      for (const sticker of cubie.stickers) {
        sticker.base = new THREE.Color(palette.faces[sticker.face]);
        sticker.mesh.geometry.dispose();
        sticker.mesh.geometry = new THREE.PlaneGeometry(inset, inset);
      }
    }
  }

  setLayerRotation(base: TurnBase | null, radians: number): void {
    this.liveBase = base;
    this.liveAngle = radians;
  }

  // ---- orbit ----

  /**
   * Turn the cube about the axes the SCREEN defines. Because the camera never rotates,
   * those are simply the world axes, so a drag of (dx, dy) rotates about
   * normalize(dy, dx, 0) -- screen y being down.
   */
  orbitBy(dxPx: number, dyPx: number): void {
    const travel = Math.hypot(dxPx, dyPx);
    if (travel === 0) return;
    const axis = new THREE.Vector3(dyPx, dxPx, 0).normalize();
    const angle = travel * (Math.PI / this.faceWidthPx());
    this.orientation.premultiply(new THREE.Quaternion().setFromAxisAngle(axis, angle)).normalize();
  }

  /** Momentum keeps turning about a screen-fixed axis after the finger has gone. */
  spinBy(axis: THREE.Vector3, radians: number): void {
    this.orientation.premultiply(new THREE.Quaternion().setFromAxisAngle(axis, radians)).normalize();
  }

  setOrientation(q: THREE.Quaternion): void {
    this.orientation.copy(q).normalize();
  }

  orientationQuaternion(): THREE.Quaternion {
    return this.orientation.clone();
  }

  // ---- zoom ----

  /** `f`: the cube's on-screen face width over the stage width. */
  setZoom(f: number): void {
    this.zoomF = f;
    this.applyFraming();
  }

  getZoom(): number {
    return this.zoomF;
  }

  /** One world unit in CSS px at the cube's centre depth. */
  unitScreenPx(): number {
    return this.unitPx;
  }

  /** The cube's on-screen face width, D = 3S. The unit every gesture gain is stated in. */
  faceWidthPx(): number {
    return this.unitPx * 3;
  }

  private applyFraming(): void {
    const w = this.container.clientWidth || 1;
    const h = this.container.clientHeight || 1;
    // distance = 1.5 * H / (f * W * tan(fov/2))
    const tan = Math.tan((FOV * Math.PI) / 360);
    this.distance = (1.5 * h) / (this.zoomF * w * tan);
    this.unitPx = h / 2 / (this.distance * tan);
    this.camera.position.set(0, 0, this.distance);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(0, 0, 0);
    this.camera.updateMatrixWorld();
  }

  // ---- projection ----

  /**
   * Where a direction in the cube's own frame points on screen, +y up, together with the
   * projected LENGTH of that unit direction -- 1 when it lies in the screen plane, 0
   * when it points at the camera. The turn gain needs that length: a face turned nearly
   * edge-on would otherwise get an uncompensated 1:1 gain and whip.
   */
  projectTangent(origin: Vec3, direction: Vec3): { x: number; y: number; length: number } {
    const v = projectDirectionOnto(this.camera, origin, direction, this.orientation, false);
    const w = this.container.clientWidth || 1;
    const h = this.container.clientHeight || 1;
    const px = Math.hypot((v.x * w) / 2, (v.y * h) / 2);
    const unit = px / this.unitPx;
    const n = Math.hypot(v.x, v.y) || 1;
    return { x: v.x / n, y: v.y / n, length: unit };
  }

  /** Backwards-compatible unit-vector form, used where only the direction matters. */
  projectDirection(origin: Vec3, direction: Vec3): THREE.Vector2 {
    const t = this.projectTangent(origin, direction);
    return new THREE.Vector2(t.x, t.y);
  }

  /**
   * What the cube shows at a screen point -- which cubie, and which of its faces.
   *
   * The BODY is raycast alongside the stickers, and that is the whole point. A sticker
   * covers 86% of its cell, so roughly a sixth of the cube's visible surface is the
   * black grid between them; hit-testing stickers alone let a drag that plainly started
   * ON the cube fall through to the background and orbit it. Measured at 62% of the
   * cube's bounding box hitting a sticker. A thumb finds those lines constantly.
   *
   * Hits come back sorted by distance, so the nearest surface wins whether it is a
   * sticker or the plastic beside it.
   */
  pickSticker(clientX: number, clientY: number): { cubieIndex: number; worldNormal: Vec3 } | null {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);

    const meshes = this.cubies.flatMap((c) => [c.body, ...c.stickers.map((s) => s.mesh)]);
    const hit = this.raycaster.intersectObjects(meshes, false)[0];
    if (!hit) return null;

    const mesh = hit.object as THREE.Mesh;
    const cubieIndex = this.cubies.findIndex((c) => c.body === mesh || c.stickers.some((s) => s.mesh === mesh));
    if (cubieIndex < 0) return null;
    const cubie = this.cubies[cubieIndex];

    const sticker = cubie.stickers.find((s) => s.mesh === mesh);
    // Both paths give a normal in the cubie's own frame; rotating by the cubie's
    // quaternion lands in CUBE space, which is where the move logic's grid lives.
    const local = sticker ? sticker.localNormal.clone() : (hit.face?.normal.clone() ?? null);
    if (!local) return null;
    const n = local.applyQuaternion(cubie.group.quaternion).round();
    return { cubieIndex, worldNormal: [n.x, n.y, n.z] };
  }

  cubieCoords(index: number): Vec3 {
    return this.cubies[index].coords;
  }

  resize(): void {
    const w = this.container.clientWidth || 1;
    const h = this.container.clientHeight || 1;
    this.camera.aspect = w / h;
    this.applyFraming();
    this.camera.updateProjectionMatrix();
    // updateStyle defaults true; passing false makes the canvas take the drawing-buffer
    // pixel size as CSS pixels and the scene pushes off-frame.
    this.renderer.setSize(w, h);
  }

  private applyTransforms(): void {
    const spec = this.liveBase ? TURNS[this.liveBase] : null;
    const live = spec
      ? new THREE.Quaternion().setFromAxisAngle(
          AXIS_VECTORS[spec.axis],
          spec.negIsCw ? -this.liveAngle : this.liveAngle,
        )
      : null;

    for (const cubie of this.cubies) {
      const inLayer = spec !== null && cubie.coords[spec.axis] === spec.layer;
      if (live && inLayer) {
        cubie.group.position.copy(cubie.basePosition).applyQuaternion(live);
        cubie.group.quaternion.copy(live).multiply(cubie.baseQuaternion);
        cubie.body.material = this.turningBody;
      } else {
        cubie.group.position.copy(cubie.basePosition);
        cubie.group.quaternion.copy(cubie.baseQuaternion);
        cubie.body.material = this.restingBody;
      }
    }
  }

  /**
   * Re-evaluate the value ramp against each sticker's WORLD normal.
   *
   * The cube's orientation lives on the root, so shading against the cubie's own
   * quaternion -- which no longer contains the orbit -- would silently shade a cube that
   * is not where it is. Because the camera never rotates, world space and view space
   * differ only by a translation, so no view transform is needed at all.
   */
  private applyShading(): void {
    const n = new THREE.Vector3();
    const q = new THREE.Quaternion();
    const ramp = this.palette.shade;

    for (const cubie of this.cubies) {
      q.copy(this.orientation).multiply(cubie.group.quaternion);
      for (const sticker of cubie.stickers) {
        n.copy(sticker.localNormal).applyQuaternion(q);
        // Three.js holds colours in linear working space and converts on output, so
        // multiplying here IS multiplying in linear light, which is what the ramp
        // specifies. Multiplying the sRGB bytes lands a few points off and desaturates.
        const lift =
          this.grabbedBase !== null && cubie.coords[TURNS[this.grabbedBase].axis] === TURNS[this.grabbedBase].layer
            ? 1 + (GRAB_LIFT_STICKER - 1) * this.grabAmount
            : 1;
        sticker.material.color
          .copy(this.concealed ? CONCEALED_COLOR : sticker.base)
          .multiplyScalar(shadeFor(n, ramp) * lift);
      }
    }

    // The plastic takes the same blend with a much wider ramp. It is achromatic, so a
    // wide ramp costs no information -- and it is the only form cue that survives the
    // Universal palette's deliberately compressed sticker ramp.
    const liveSpec = this.liveBase ? TURNS[this.liveBase] : null;
    const liveQ = liveSpec
      ? new THREE.Quaternion().setFromAxisAngle(AXIS_VECTORS[liveSpec.axis], liveSpec.negIsCw ? -this.liveAngle : this.liveAngle)
      : null;

    for (let i = 0; i < 6; i++) {
      n.copy(BOX_FACE_NORMALS[i]).applyQuaternion(this.orientation);
      this.restingBody[i].color.copy(BODY_BASE).multiplyScalar(this.concealed ? 1 : shadeFor(n, SHADE_BODY));
      // The lift rides the TURNING set, which is already exactly the grabbed layer --
      // and it is gated on `grabAmount` rather than on liveBase, so a replay or an
      // auto-scramble, which also sets liveBase, does not light layers up in sequence.
      const lift = 1 + (GRAB_LIFT_BODY - 1) * this.grabAmount;
      if (liveQ) {
        q.copy(this.orientation).multiply(liveQ);
        n.copy(BOX_FACE_NORMALS[i]).applyQuaternion(q);
      }
      this.turningBody[i].color
        .copy(BODY_BASE)
        .multiplyScalar((this.concealed ? 1 : shadeFor(n, SHADE_BODY)) * lift);
    }
  }

  private loop = (): void => {
    this.frameHandle = requestAnimationFrame(this.loop);
    this.stepGrab();
    this.root.quaternion.copy(this.orientation);
    this.camera.updateMatrixWorld();
    this.applyTransforms();
    this.root.updateMatrixWorld(true);
    this.applyShading();
    this.renderer.render(this.scene, this.camera);
  };

  dispose(): void {
    this.resizeObserver?.disconnect();
    cancelAnimationFrame(this.frameHandle);
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  get canvas(): HTMLCanvasElement {
    return this.renderer.domElement;
  }
}

/** What a covered cube shows: its own plastic, lifted just enough to keep the grid. */
const CONCEALED_COLOR = new THREE.Color(BODY_COLOR).multiplyScalar(1.9);
const BODY_BASE = new THREE.Color(BODY_COLOR);

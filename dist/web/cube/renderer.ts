// The three.js stage.
//
// The renderer reads the engine's cubie model directly -- position plus orientation
// matrix -- which is why the engine was built as rotations rather than facelet
// permutation tables. There is no translation layer between logic and pixels.

import * as THREE from 'three';
import { applyMove, stickersOf, TURNS, type CubeState, type Face, type Move, type TurnBase, type Vec3 } from '../../cube/state';
import { BODY_COLOR, SHADE, type Palette } from './palette';
import { prefersReducedMotion } from './motion';

const CUBIE = 0.98; // leaves a hairline of black between cubies
const SPACING = 1.0;

/** azimuth +45deg, elevation +24deg: the default three-quarter view showing U, F and R. */
export const DEFAULT_YAW = Math.PI / 4;
export const DEFAULT_PITCH = (24 * Math.PI) / 180;
export const PITCH_CLAMP = (72 * Math.PI) / 180;

/** The eight canonical poses an orbit settles onto. Every one shows three faces cleanly. */
export const YAW_SNAPS = [45, 135, 225, 315].map((d) => (d * Math.PI) / 180);
export const PITCH_SNAPS = [24, -24].map((d) => (d * Math.PI) / 180);

interface StickerRef {
  readonly mesh: THREE.Mesh;
  readonly material: THREE.MeshBasicMaterial;
  /** Which face this sticker belongs to. Fixed for the life of the sticker. */
  readonly face: Face;
  base: THREE.Color;
  /** The sticker's normal in the cubie's own frame. */
  readonly localNormal: THREE.Vector3;
}

interface CubieRef {
  readonly group: THREE.Group;
  readonly stickers: StickerRef[];
  /** Settled transform, before any live layer rotation is applied. */
  basePosition: THREE.Vector3;
  baseQuaternion: THREE.Quaternion;
  /** Which axis coordinate this cubie currently sits at, for layer selection. */
  coords: Vec3;
}

const AXIS_VECTORS = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)];

export class CubeRenderer {
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly root = new THREE.Group();
  private readonly cubies: CubieRef[] = [];
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2();

  private yaw = DEFAULT_YAW;
  private pitch = DEFAULT_PITCH;
  private distance = 12;

  private liveBase: TurnBase | null = null;
  private liveAngle = 0;

  private frameHandle = 0;

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

    this.camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    this.scene.add(this.root);
    this.buildCubies();
    this.resize();
    this.loop();
  }

  private buildCubies(): void {
    const bodyGeometry = new THREE.BoxGeometry(CUBIE, CUBIE, CUBIE);
    const bodyMaterial = new THREE.MeshBasicMaterial({ color: BODY_COLOR });

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (!x && !y && !z) continue;
          const group = new THREE.Group();
          group.add(new THREE.Mesh(bodyGeometry, bodyMaterial));

          const home: Vec3 = [x, y, z];
          const stickers: StickerRef[] = [];
          for (const { normal, color } of stickersOf({ home, pos: home, rot: [1, 0, 0, 0, 1, 0, 0, 0, 1] })) {
            const size = CUBIE * (1 - this.palette.stickerInset * 2);
            // Square stickers, no corner radius. That is the decision that makes this
            // read as a designed object rather than a render of a toy.
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
            stickers,
            basePosition: new THREE.Vector3(x * SPACING, y * SPACING, z * SPACING),
            baseQuaternion: new THREE.Quaternion(),
            coords: home,
          });
        }
      }
    }
  }

  /** Snap every cubie to the logical state. Called after a turn commits. */
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
   * Swap the pigment without moving any face assignment. A sticker belongs to a face
   * permanently; only which colour that face is drawn in changes, which is what lets a
   * cuber's memory of the scheme survive the swap.
   */
  /**
   * Play a sequence onto the cube, one quarter turn at a time.
   *
   * Used for the opening: the app shows a solved cube and scrambles itself in front of
   * you rather than showing a spinner, which covers the solver's warm-up honestly and
   * is a better first second than a loader.
   *
   * The LOGICAL state is already final before this runs; this only animates the visual
   * catching up. But the visual must never be left BEHIND the logic, which is the trap
   * here: requestAnimationFrame does not run in a hidden tab, so without a guard the
   * cube would sit showing a solved position while the session holds a scrambled one,
   * and the user would drag against a cube that is not the cube they can see. So a
   * hidden document skips the animation entirely, and a wall-clock timer force-lands
   * the final state if frames stop partway for any other reason.
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

    // Frames do not run while the document is hidden. Land immediately rather than
    // leaving the stage showing a position the logic has already moved past. The same
    // immediate landing serves reduced motion: this animation is decorative, and its
    // whole job is to fill a wait somebody has asked not to watch.
    if (prefersReducedMotion() || (typeof document !== 'undefined' && document.hidden)) {
      onDone?.();
      return () => {};
    }

    // Belt and braces for every other reason frames might stop: a backgrounded tab
    // mid-sequence, a stalled compositor, a device throttling under load.
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
      // Ease out, so each turn arrives rather than stopping dead.
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

  /** Live layer rotation while a thumb is dragging. Angle in radians, clockwise-positive. */
  setLayerRotation(base: TurnBase | null, radians: number): void {
    this.liveBase = base;
    this.liveAngle = radians;
  }

  setOrbit(yaw: number, pitch: number): void {
    this.yaw = yaw;
    this.pitch = THREE.MathUtils.clamp(pitch, -PITCH_CLAMP, PITCH_CLAMP);
  }

  getOrbit(): { yaw: number; pitch: number } {
    return { yaw: this.yaw, pitch: this.pitch };
  }

  /**
   * Which sticker is under a screen point. Raycast happens once, at touch start: the
   * rest of a drag is driven from the 2D screen delta, so there is no per-move
   * raycasting against a moving mesh.
   */
  pickSticker(clientX: number, clientY: number): { cubieIndex: number; worldNormal: Vec3 } | null {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);

    const meshes = this.cubies.flatMap((c) => c.stickers.map((s) => s.mesh));
    const hits = this.raycaster.intersectObjects(meshes, false);
    if (hits.length === 0) return null;

    const mesh = hits[0].object as THREE.Mesh;
    const cubieIndex = this.cubies.findIndex((c) => c.stickers.some((s) => s.mesh === mesh));
    if (cubieIndex < 0) return null;
    const sticker = this.cubies[cubieIndex].stickers.find((s) => s.mesh === mesh)!;
    const n = sticker.localNormal.clone().applyQuaternion(this.cubies[cubieIndex].group.quaternion).round();
    return { cubieIndex, worldNormal: [n.x, n.y, n.z] };
  }

  /** The cubie's settled grid coordinates, for deciding which layer a drag grabbed. */
  cubieCoords(index: number): Vec3 {
    return this.cubies[index].coords;
  }

  /** Project a world direction into screen space, for mapping a drag to an axis. */
  projectDirection(origin: Vec3, direction: Vec3): THREE.Vector2 {
    const a = new THREE.Vector3(...origin).project(this.camera);
    const b = new THREE.Vector3(origin[0] + direction[0], origin[1] + direction[1], origin[2] + direction[2]).project(
      this.camera,
    );
    return new THREE.Vector2(b.x - a.x, -(b.y - a.y)).normalize();
  }

  /**
   * One cube edge, in CSS pixels on screen. The turn gain is specified relative to
   * this rather than to the viewport, so the feel is identical on any phone.
   */
  screenEdgeLength(): number {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const a = new THREE.Vector3(-1.5, 1.5, 1.5).project(this.camera);
    const b = new THREE.Vector3(1.5, 1.5, 1.5).project(this.camera);
    return (Math.hypot(b.x - a.x, b.y - a.y) / 2) * rect.width;
  }

  resize(): void {
    const w = this.container.clientWidth || 1;
    const h = this.container.clientHeight || 1;
    this.camera.aspect = w / h;
    // Frame so the cube's projected width is 78% of the stage. Projected size is
    // very nearly inversely proportional to distance, so two corrections converge.
    this.distance = 12;
    for (let i = 0; i < 3; i++) {
      this.placeCamera();
      this.camera.updateProjectionMatrix();
      const width = this.projectedWidth();
      if (width <= 0) break;
      this.distance *= width / 0.78;
    }
    this.placeCamera();
    this.camera.updateProjectionMatrix();
    // updateStyle defaults true; passing false makes the canvas take the drawing-buffer
    // pixel size as CSS pixels and the scene pushes off-frame.
    this.renderer.setSize(w, h);
  }

  private projectedWidth(): number {
    let min = Infinity;
    let max = -Infinity;
    for (const sx of [-1.5, 1.5]) {
      for (const sy of [-1.5, 1.5]) {
        for (const sz of [-1.5, 1.5]) {
          const p = new THREE.Vector3(sx, sy, sz).project(this.camera);
          min = Math.min(min, p.x);
          max = Math.max(max, p.x);
        }
      }
    }
    return (max - min) / 2; // normalised device coords span -1..1
  }

  private placeCamera(): void {
    const cp = Math.cos(this.pitch);
    this.camera.position.set(
      this.distance * cp * Math.sin(this.yaw),
      this.distance * Math.sin(this.pitch),
      this.distance * cp * Math.cos(this.yaw),
    );
    this.camera.up.set(0, 1, 0); // no camera roll, ever
    this.camera.lookAt(0, 0, 0);
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
      } else {
        cubie.group.position.copy(cubie.basePosition);
        cubie.group.quaternion.copy(cubie.baseQuaternion);
      }
    }
  }

  /**
   * Re-evaluate the view-space value ramp. Blended by the positive components of the
   * view-space normal, so a sticker mid-turn shades smoothly instead of stepping
   * between the six fixed values.
   */
  private applyShading(): void {
    const view = this.camera.matrixWorldInverse;
    const n = new THREE.Vector3();
    for (const cubie of this.cubies) {
      for (const sticker of cubie.stickers) {
        n.copy(sticker.localNormal).applyQuaternion(cubie.group.quaternion).transformDirection(view);
        const w = {
          up: Math.max(0, n.y),
          down: Math.max(0, -n.y),
          right: Math.max(0, n.x),
          left: Math.max(0, -n.x),
          toward: Math.max(0, n.z),
          away: Math.max(0, -n.z),
        };
        const total = w.up + w.down + w.right + w.left + w.toward + w.away || 1;
        const shade =
          (w.up * SHADE.up +
            w.down * SHADE.down +
            w.right * SHADE.right +
            w.left * SHADE.left +
            w.toward * SHADE.toward +
            w.away * SHADE.away) /
          total;
        sticker.material.color.copy(sticker.base).multiplyScalar(shade);
      }
    }
  }

  private loop = (): void => {
    this.frameHandle = requestAnimationFrame(this.loop);
    this.placeCamera();
    this.camera.updateMatrixWorld();
    this.applyTransforms();
    this.root.updateMatrixWorld(true);
    this.applyShading();
    this.renderer.render(this.scene, this.camera);
  };

  dispose(): void {
    cancelAnimationFrame(this.frameHandle);
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  get canvas(): HTMLCanvasElement {
    return this.renderer.domElement;
  }
}

// The cube engine.
//
// State is 26 cubies, each carrying its home position (which identifies the piece
// permanently), its current position, and an integer orientation matrix. A move is a
// 90-degree rotation applied to every cubie in one layer.
//
// This is modelled as rotations rather than as facelet permutation tables for two
// reasons: the tables are the single most error-prone thing in a cube implementation
// and there is no cheap way to eyeball one, and three.js needs exactly this
// position+orientation shape to render, so the renderer reads the model directly
// instead of translating it.
//
// Integer matrices throughout. There is no floating point anywhere in the state, so a
// cube cannot drift out of alignment no matter how many turns it takes.

export type Vec3 = readonly [number, number, number];
/** Row-major 3x3. Maps a vector in the cubie's home frame to world space. */
export type Mat3 = readonly [number, number, number, number, number, number, number, number, number];

export const IDENTITY: Mat3 = [1, 0, 0, 0, 1, 0, 0, 0, 1];

// Adding zero collapses -0 to +0. Multiplying a signed axis by a zero coordinate
// produces -0 constantly, and while `-0 === 0` is true, `Object.is` and structural
// equality both disagree, and JSON round-trips it as `0` -- so a state written to
// IndexedDB would not deep-equal the one that wrote it. Normalise at the source.
const z = (n: number): number => n + 0;

export function matMul(a: Mat3, b: Mat3): Mat3 {
  const out = new Array(9) as unknown as number[];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      out[r * 3 + c] = z(a[r * 3] * b[c] + a[r * 3 + 1] * b[3 + c] + a[r * 3 + 2] * b[6 + c]);
    }
  }
  return out as unknown as Mat3;
}

export function matApply(m: Mat3, v: Vec3): Vec3 {
  return [
    z(m[0] * v[0] + m[1] * v[1] + m[2] * v[2]),
    z(m[3] * v[0] + m[4] * v[1] + m[5] * v[2]),
    z(m[6] * v[0] + m[7] * v[1] + m[8] * v[2]),
  ];
}

export const vecEq = (a: Vec3, b: Vec3) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
export const matEq = (a: Mat3, b: Mat3) => a.every((x, i) => x === b[i]);

// Right-hand-rule rotations. About axis +e, a positive angle carries the next axis
// toward the one after it.
const ROT: Record<0 | 1 | 2, { pos: Mat3; neg: Mat3 }> = {
  // X
  0: { pos: [1, 0, 0, 0, 0, -1, 0, 1, 0], neg: [1, 0, 0, 0, 0, 1, 0, -1, 0] },
  // Y
  1: { pos: [0, 0, 1, 0, 1, 0, -1, 0, 0], neg: [0, 0, -1, 0, 1, 0, 1, 0, 0] },
  // Z
  2: { pos: [0, -1, 0, 1, 0, 0, 0, 0, 1], neg: [0, 1, 0, -1, 0, 0, 0, 0, 1] },
};

/**
 * The six face colors, named by the face each belongs to on a solved cube. This is the
 * standard convention and it keeps the engine free of any actual color: the palette
 * maps these to hex, so a colorblind-safe scheme is a rendering concern only.
 */
export const FACES = ['U', 'R', 'F', 'D', 'L', 'B'] as const;
export type Face = (typeof FACES)[number];

export const FACE_NORMAL: Record<Face, Vec3> = {
  U: [0, 1, 0],
  D: [0, -1, 0],
  R: [1, 0, 0],
  L: [-1, 0, 0],
  F: [0, 0, 1],
  B: [0, 0, -1],
};

export interface Cubie {
  /** Never changes. Identifies the piece and determines its sticker colors. */
  readonly home: Vec3;
  readonly pos: Vec3;
  readonly rot: Mat3;
}

export interface CubeState {
  readonly cubies: readonly Cubie[];
}

export function solvedCube(): CubeState {
  const cubies: Cubie[] = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        if (x === 0 && y === 0 && z === 0) continue; // no core piece
        const p: Vec3 = [x, y, z];
        cubies.push({ home: p, pos: p, rot: IDENTITY });
      }
    }
  }
  return { cubies };
}

/** How many of a cubie's coordinates are non-zero: 3 corner, 2 edge, 1 center. */
export const cubieKind = (c: Cubie): 'corner' | 'edge' | 'center' => {
  const n = c.home.filter((v) => v !== 0).length;
  return n === 3 ? 'corner' : n === 2 ? 'edge' : 'center';
};

// A turn is an axis, a layer coordinate on that axis, and a direction. `cw` is the
// direction a person means by "clockwise", which for a face is clockwise seen from
// outside that face -- a negative rotation about the outward normal.
interface TurnSpec {
  axis: 0 | 1 | 2;
  layer: -1 | 0 | 1;
  /** true when clockwise-from-outside is a negative rotation about the positive axis. */
  negIsCw: boolean;
}

export const TURNS = {
  U: { axis: 1, layer: 1, negIsCw: true },
  D: { axis: 1, layer: -1, negIsCw: false },
  R: { axis: 0, layer: 1, negIsCw: true },
  L: { axis: 0, layer: -1, negIsCw: false },
  F: { axis: 2, layer: 1, negIsCw: true },
  B: { axis: 2, layer: -1, negIsCw: false },
  // Slice moves follow the face they are named after: M with L, E with D, S with F.
  M: { axis: 0, layer: 0, negIsCw: false },
  E: { axis: 1, layer: 0, negIsCw: false },
  S: { axis: 2, layer: 0, negIsCw: true },
} as const satisfies Record<string, TurnSpec>;

export type TurnBase = keyof typeof TURNS;
export const isTurnBase = (s: string): s is TurnBase => s in TURNS;

/** Quarter turns clockwise: 1 = clockwise, 2 = half, 3 = counter-clockwise. */
export type Amount = 1 | 2 | 3;

export interface Move {
  readonly base: TurnBase;
  readonly amount: Amount;
}

/** The rotation matrix one clockwise quarter turn of `base` applies to world space. */
function quarterMatrix(base: TurnBase): Mat3 {
  const spec = TURNS[base];
  return spec.negIsCw ? ROT[spec.axis].neg : ROT[spec.axis].pos;
}

export function applyMove(state: CubeState, move: Move): CubeState {
  const spec = TURNS[move.base];
  const q = quarterMatrix(move.base);
  let m = q;
  for (let i = 1; i < move.amount; i++) m = matMul(q, m);

  return {
    cubies: state.cubies.map((c) =>
      c.pos[spec.axis] === spec.layer ? { home: c.home, pos: matApply(m, c.pos), rot: matMul(m, c.rot) } : c,
    ),
  };
}

export const applyMoves = (state: CubeState, moves: readonly Move[]): CubeState =>
  moves.reduce(applyMove, state);

/**
 * A cube is solved when every piece sits where it belongs and points the way it
 * belongs -- allowing for the whole cube being rotated.
 *
 * The rotation allowance is not pedantry. `R M' L'` is a legal sequence of moves this
 * app permits and it reorients the entire cube; without this the app would tell someone
 * staring at six solid faces that they had not finished. Centers are exempt from the
 * orientation check only, because a solid-color center has no visible orientation --
 * but not from the position check, or a slice move that parks the white center on the
 * bottom would read as solved.
 */
export function isSolved(state: CubeState): boolean {
  const reference = state.cubies.find((c) => cubieKind(c) === 'corner');
  if (!reference) return false;
  const q = reference.rot;

  return state.cubies.every((c) => {
    if (!vecEq(c.pos, matApply(q, c.home))) return false;
    return cubieKind(c) === 'center' || matEq(c.rot, q);
  });
}

/** Transpose. For an integer rotation matrix this is also its inverse. */
export const matTranspose = (m: Mat3): Mat3 => [m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]];

/**
 * Whether two states are the same cube seen from a different angle.
 *
 * `isSolved` is the special case of this against a solved cube. Exposed separately
 * because it is the only way to check a claim like "M turns the same way L does":
 * M and R L' reach the same cube, differing only by a whole-cube rotation, and no
 * comparison that ignores that rotation can say so.
 */
export function differsByWholeCubeRotation(a: CubeState, b: CubeState): boolean {
  if (a.cubies.length !== b.cubies.length) return false;
  const i = a.cubies.findIndex((c) => cubieKind(c) === 'corner');
  if (i < 0) return false;
  // Both states carry cubies in the same order, keyed by an unchanging home position.
  const q = matMul(a.cubies[i].rot, matTranspose(b.cubies[i].rot));

  return a.cubies.every((ca, index) => {
    const cb = b.cubies[index];
    if (!vecEq(ca.home, cb.home)) return false;
    if (!vecEq(ca.pos, matApply(q, cb.pos))) return false;
    return cubieKind(ca) === 'center' || matEq(ca.rot, matMul(q, cb.rot));
  });
}

/** Every sticker on a cubie, as (home-frame normal, the face color it carries). */
export function stickersOf(c: Cubie): { normal: Vec3; color: Face }[] {
  const out: { normal: Vec3; color: Face }[] = [];
  for (let axis = 0; axis < 3; axis++) {
    const v = c.home[axis];
    if (v === 0) continue;
    const normal = [0, 0, 0] as unknown as number[];
    normal[axis] = v;
    const n = normal as unknown as Vec3;
    const face = FACES.find((f) => vecEq(FACE_NORMAL[f], n))!;
    out.push({ normal: n, color: face });
  }
  return out;
}

/** The color facing `direction` from the cubie currently at `position`, if any. */
export function colorAt(state: CubeState, position: Vec3, direction: Vec3): Face | null {
  const c = state.cubies.find((x) => vecEq(x.pos, position));
  if (!c) return null;
  for (const s of stickersOf(c)) {
    if (vecEq(matApply(c.rot, s.normal), direction)) return s.color;
  }
  return null;
}

/**
 * Which color's center currently sits on each face. A person reads a cube relative to
 * its centers, so every stage predicate is evaluated in this frame rather than against
 * fixed world axes -- which is what keeps them correct after a slice move has shifted
 * the centers around.
 */
export function centerFrame(state: CubeState): Record<Face, Face> {
  const frame = {} as Record<Face, Face>;
  for (const f of FACES) {
    frame[f] = colorAt(state, FACE_NORMAL[f], FACE_NORMAL[f]) ?? f;
  }
  return frame;
}

// CFOP stage splits.
//
// Each stage's end state is a crisp predicate on cube state, so the arithmetic is
// cheap. Two things about it are not cheap, and both are handled here rather than
// discovered later:
//
//   1. Detection is a SEQUENTIAL FORWARD scan: each stage completes at the first move
//      at or after the previous stage completed. It is monotone by construction.
//
//      The tempting alternative -- scan backward for the last moment a predicate holds
//      continuously to the end -- is what the research for this app recommended, and it
//      does not survive contact with real algorithms. Every OLL and PLL algorithm
//      breaks F2L partway through and restores it: Sune (R U R' U R U2 R') opens the
//      front-right slot on its very first move. A backward scan therefore reports "F2L
//      complete" from somewhere inside the last-layer algorithm on every real solve,
//      collapsing three stages onto one index. The failure it was guarding against --
//      a stage flickering true by coincidence -- is real, and the ordering check at the
//      bottom of this file is what catches it instead.
//   2. The cross colour is INFERRED. Colour-neutral solvers pick whichever face gives
//      the easiest cross for that scramble, so assuming white misreports every solve
//      by such a person.
//
// And the scoping limit: these are CFOP's stages, not a universal property of a solve.
// A Roux solver has no F2L or OLL in this sense. Rather than print a confident wrong
// number, a solve that did not travel a CFOP-shaped path is reported as unrecognised.

import {
  applyMove,
  centerFrame,
  colorAt,
  FACES,
  FACE_NORMAL,
  type CubeState,
  type Face,
  type Move,
  type Vec3,
} from '../cube/state';
import { isSolved } from '../cube/state';

export interface LoggedMove {
  readonly move: Move;
  /** Milliseconds since the timer started. */
  readonly atMs: number;
}

export interface StageSplit {
  /** Index into the move log of the move that completed this stage. */
  readonly moveIndex: number;
  readonly atMs: number;
}

export type StageSplits =
  | {
      readonly shape: 'cfop';
      readonly crossColor: Face;
      readonly cross: StageSplit;
      readonly f2l: StageSplit;
      readonly oll: StageSplit;
      readonly solved: StageSplit;
    }
  | { readonly shape: 'unrecognised' };

/** The outward direction of each axis a position touches. */
function outwardDirections(p: Vec3): Vec3[] {
  const dirs: Vec3[] = [];
  for (let axis = 0; axis < 3; axis++) {
    if (p[axis] === 0) continue;
    const d = [0, 0, 0];
    d[axis] = p[axis];
    dirs.push(d as unknown as Vec3);
  }
  return dirs;
}

/**
 * A piece is right when every sticker it shows matches the centre of the face it is
 * showing on. Read against the current centres rather than against home positions, the
 * way a person reads a cube -- which keeps every predicate correct after a slice move
 * has shifted the centres.
 */
function pieceCorrect(state: CubeState, p: Vec3, frame: Record<Face, Face>): boolean {
  for (const d of outwardDirections(p)) {
    const face = FACES.find((f) => FACE_NORMAL[f].every((v, i) => v === d[i]))!;
    if (colorAt(state, p, d) !== frame[face]) return false;
  }
  return true;
}

const faceOfNormal = (d: Vec3): Face => FACES.find((f) => FACE_NORMAL[f].every((v, i) => v === d[i]))!;

/** Where the centre showing `color` currently sits. */
function faceShowing(frame: Record<Face, Face>, color: Face): Face | null {
  return FACES.find((f) => frame[f] === color) ?? null;
}

/** All 26 positions, as a fixed list. */
const POSITIONS: Vec3[] = (() => {
  const out: Vec3[] = [];
  for (let x = -1; x <= 1; x++)
    for (let y = -1; y <= 1; y++)
      for (let z = -1; z <= 1; z++) if (x || y || z) out.push([x, y, z]);
  return out;
})();

const isCenterSlot = (p: Vec3): boolean => p.filter((v) => v !== 0).length === 1;

const axisOf = (f: Face): number => FACE_NORMAL[f].findIndex((v) => v !== 0);
const signOf = (f: Face): number => FACE_NORMAL[f][axisOf(f)];

/** The four edge slots on a face. */
function crossSlots(f: Face): Vec3[] {
  const a = axisOf(f);
  const s = signOf(f);
  return POSITIONS.filter((p) => p[a] === s && p.filter((v) => v !== 0).length === 2);
}

export function crossComplete(state: CubeState, color: Face): boolean {
  const frame = centerFrame(state);
  const face = faceShowing(frame, color);
  if (!face) return false;
  return crossSlots(face).every((p) => pieceCorrect(state, p, frame));
}

/** Both layers on the cross side: every non-centre piece there shows the right colours. */
export function f2lComplete(state: CubeState, color: Face): boolean {
  const frame = centerFrame(state);
  const face = faceShowing(frame, color);
  if (!face) return false;
  const a = axisOf(face);
  const s = signOf(face);
  return POSITIONS.filter((p) => p[a] === s || p[a] === 0).every(
    (p) => isCenterSlot(p) || pieceCorrect(state, p, frame),
  );
}

/** The far face shows one colour. Orientation only -- where the pieces sit is irrelevant. */
export function ollComplete(state: CubeState, color: Face): boolean {
  const frame = centerFrame(state);
  const face = faceShowing(frame, color);
  if (!face) return false;
  const a = axisOf(face);
  const far = -signOf(face);
  const farDir = [0, 0, 0];
  farDir[a] = far;
  const d = farDir as unknown as Vec3;
  const topColor = frame[faceOfNormal(d)];
  return POSITIONS.filter((p) => p[a] === far).every((p) => colorAt(state, p, d) === topColor);
}

/**
 * The first move index at or after `from` whose resulting state satisfies `holds`.
 * `states[0]` is the state before any move, so a state index of i means move index
 * i - 1, and -1 means the predicate already held on the scrambled cube.
 */
function firstIndexFrom(
  states: readonly CubeState[],
  holds: (s: CubeState) => boolean,
  from: number,
): number | null {
  for (let i = Math.max(0, from + 1); i < states.length; i++) {
    if (holds(states[i])) return i - 1;
  }
  return null;
}

export function computeStageSplits(scrambled: CubeState, log: readonly LoggedMove[]): StageSplits {
  if (log.length === 0) return { shape: 'unrecognised' };

  const states: CubeState[] = [scrambled];
  for (const entry of log) states.push(applyMove(states[states.length - 1], entry.move));
  if (!isSolved(states[states.length - 1])) return { shape: 'unrecognised' };

  const at = (moveIndex: number): StageSplit => ({
    moveIndex,
    atMs: moveIndex < 0 ? 0 : log[Math.min(moveIndex, log.length - 1)].atMs,
  });

  // Infer the cross colour rather than assuming white: a colour-neutral solver picks
  // whichever face gives the easiest cross for that scramble. Each candidate is scored
  // by running the whole sequential scan, and the one that yields a properly ordered
  // CFOP shape with the earliest cross wins.
  let best: (StageSplits & { shape: 'cfop' }) | null = null;

  for (const crossColor of FACES) {
    const crossIndex = firstIndexFrom(states, (s) => crossComplete(s, crossColor), -1);
    if (crossIndex === null) continue;
    const f2lIndex = firstIndexFrom(states, (s) => f2lComplete(s, crossColor), crossIndex);
    if (f2lIndex === null) continue;
    const ollIndex = firstIndexFrom(states, (s) => ollComplete(s, crossColor), f2lIndex);
    if (ollIndex === null) continue;
    const solvedIndex = firstIndexFrom(states, isSolved, ollIndex - 1);
    if (solvedIndex === null) continue;

    // A CFOP solve visits these as distinct phases. If cross and F2L land on the same
    // move, or F2L and OLL do, this was some other method -- blockbuilding, Roux, ZZ --
    // and labelling its phases with CFOP's names would be a wrong number rather than a
    // rounding error. OLL and the solve MAY coincide: that is a PLL skip, which is real.
    if (!(crossIndex < f2lIndex && f2lIndex < ollIndex && ollIndex <= solvedIndex)) continue;

    const candidate = {
      shape: 'cfop',
      crossColor,
      cross: at(crossIndex),
      f2l: at(f2lIndex),
      oll: at(ollIndex),
      solved: at(solvedIndex),
    } as const;
    if (!best || candidate.cross.moveIndex < best.cross.moveIndex) best = candidate;
  }

  return best ?? { shape: 'unrecognised' };
}

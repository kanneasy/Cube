// Alternate goal states.
//
// A pattern reuses the whole engine: it is just a different target to compare against,
// reached the same way a solved cube is. Each is defined as the algorithm that produces
// it from solved, so the target is derived rather than hand-transcribed.

import { applyMoves, solvedCube, type CubeState, type Cubie } from './state';
import { parseAlg } from './notation';
import type { PatternId } from '../store/records';

export interface PatternDef {
  readonly id: PatternId;
  readonly name: string;
  /** Produces the pattern from a solved cube. */
  readonly alg: string;
}

export const PATTERNS: readonly PatternDef[] = [
  { id: 'checkerboard', name: 'Checkerboard', alg: 'M2 E2 S2' },
  { id: 'cube-in-cube', name: 'Cube in a Cube', alg: "F L F U' R U F2 L2 U' L' B D' B' L2 U" },
  {
    id: 'superflip',
    name: 'Superflip',
    // Every edge flipped in place, every corner solved. The best-known position: it is
    // one of the states proven to need the full 20 moves in the half-turn metric.
    alg: "U R2 F B R B2 R U2 L B2 R U' D' R2 F R' L B2 U2 F2",
  },
];

export const patternById = (id: PatternId): PatternDef => {
  const found = PATTERNS.find((p) => p.id === id);
  if (!found) throw new Error(`Unknown pattern: ${id}`);
  return found;
};

export const patternTarget = (id: PatternId): CubeState =>
  applyMoves(solvedCube(), parseAlg(patternById(id).alg));

const sameCubie = (a: Cubie, b: Cubie): boolean =>
  a.pos.every((v, i) => v === b.pos[i]) && a.rot.every((v, i) => v === b.rot[i]);

/**
 * Whether the cube has reached a goal. Compared piece by piece against the target,
 * which is the same comparison a solved cube gets — a pattern is not a special case in
 * the engine, only a different target.
 */
export function matchesTarget(state: CubeState, target: CubeState): boolean {
  return state.cubies.every((c) => {
    const t = target.cubies.find((x) => x.home.every((v, i) => v === c.home[i]));
    return !!t && sameCubie(c, t);
  });
}

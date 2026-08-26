// Scrambles and hints, both from cubing.js.
//
// One engine serves both, which is the convergence that made the hint affordable. It
// runs in a Web Worker by default, so it never competes with the thread drawing the
// cube.
//
// Notice there is no state conversion anywhere here. Both this app's engine and
// cubing.js start from a solved cube and receive the same move sequence, so they hold
// the same state by construction — a hint replays the log rather than translating a
// position across two representations. That removes the single most error-prone piece
// of a cube app, and the engine's test suite proves the two agree.

import { cube3x3x3 } from 'cubing/puzzles';
import { randomScrambleForEvent } from 'cubing/scramble';
import { experimentalSolve3x3x3IgnoringCenters } from 'cubing/search';
import { formatAlg, parseAlg } from '../cube/notation';
import type { Move } from '../cube/state';

/**
 * A competition-legal scramble: a uniformly random state, solved, and the solution
 * inverted (WCA Regulation 4b3). Not twenty random turns, which is biased and often
 * too easy.
 */
export async function generateScramble(): Promise<string> {
  const alg = await randomScrambleForEvent('333');
  return alg.toString();
}

/**
 * The next single turn toward a solution from wherever the cube is now.
 *
 * Returns the machine's route, not the user's method. That is an honest limitation
 * rather than a defect, and the app says so where hints are offered: after taking one,
 * a cube is on a line a layer-by-layer solver cannot continue from memory.
 */
export async function nextHint(scramble: string, played: readonly Move[]): Promise<Move | null> {
  const kpuzzle = await cube3x3x3.kpuzzle();
  let pattern = kpuzzle.defaultPattern().applyAlg(scramble);
  if (played.length > 0) pattern = pattern.applyAlg(formatAlg(played));

  const solution = (await experimentalSolve3x3x3IgnoringCenters(pattern)).toString().trim();
  if (solution === '') return null; // already solved; nothing to hint

  const moves = parseAlg(solution);
  return moves[0] ?? null;
}

/**
 * Build the solver's tables before the user needs them.
 *
 * Measured on this machine: about 80ms cold including the first scramble, then single
 * digits. Cheap, but it happens on app open so the first scramble is instant and a
 * mid-solve hint never pays for a cold start.
 */
export function warmUp(): void {
  void generateScramble().catch(() => {
    // A failed warm-up is not an error the user needs: the real call will retry and
    // report properly if it also fails.
  });
}

// Standard cube notation, and what a move costs.
//
// The vocabulary is WCA Regulation 12a1: the six faces, a prime for counter-clockwise,
// a 2 for a half turn. Slice moves (M, E, S) are NOT WCA notation for the 3x3x3 -- the
// Regulations do not define them at all -- but this cube reaches them by gesture, so
// they are supported and priced honestly. See src/app.md.

import { isTurnBase, type Amount, type Move, type TurnBase } from './state';

const SLICES: readonly TurnBase[] = ['M', 'E', 'S'];

export function parseMove(token: string): Move | null {
  const m = /^([UDFBLRMES])(2|'|)$/.exec(token.trim());
  if (!m) return null;
  const base = m[1];
  if (!isTurnBase(base)) return null;
  const amount: Amount = m[2] === '2' ? 2 : m[2] === "'" ? 3 : 1;
  return { base, amount };
}

export function parseAlg(alg: string): Move[] {
  const tokens = alg.trim().split(/\s+/).filter(Boolean);
  const moves: Move[] = [];
  for (const t of tokens) {
    const move = parseMove(t);
    if (!move) throw new Error(`Unparseable move in algorithm: ${JSON.stringify(t)}`);
    moves.push(move);
  }
  return moves;
}

export const formatMove = (m: Move): string => m.base + (m.amount === 2 ? '2' : m.amount === 3 ? "'" : '');

export const formatAlg = (moves: readonly Move[]): string => moves.map(formatMove).join(' ');

export const inverseMove = (m: Move): Move => ({
  base: m.base,
  amount: (m.amount === 2 ? 2 : m.amount === 1 ? 3 : 1) as Amount,
});

export const inverseAlg = (moves: readonly Move[]): Move[] => moves.map(inverseMove).reverse();

/**
 * What a move costs on the move counter, in Outer Block Turn Metric (WCA 12a5).
 *
 * A face turn costs 1 whether it is a quarter or a half turn. A slice costs 2, because
 * a slice IS two outer turns and a free rotation -- M = R L' x', and a rotation is 0
 * under OBTM. Charging a slice 1 would quietly make the fewest-moves board incomparable
 * to the metric every real fewest-moves record is stated in.
 */
export const obtmCost = (m: Move): number => (SLICES.includes(m.base) ? 2 : 1);

export const obtmTotal = (moves: readonly Move[]): number => moves.reduce((n, m) => n + obtmCost(m), 0);

export const isSliceMove = (m: Move): boolean => SLICES.includes(m.base);

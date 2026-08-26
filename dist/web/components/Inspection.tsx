import { DNF_THRESHOLD_MS, PLUS_TWO_THRESHOLD_MS } from '../../solve/results';

/**
 * Inspection counts DOWN from 15.0 at one decimal, in the timer's own slot.
 *
 * Every threshold is an inversion or a fill, never a colour change alone, so the state
 * survives both a colourblind viewer and a half-second glance.
 */
export function Inspection({ elapsedMs }: { elapsedMs: number }) {
  const remaining = Math.max(0, PLUS_TWO_THRESHOLD_MS - elapsedMs);
  const dnf = elapsedMs >= DNF_THRESHOLD_MS;
  const overrun = elapsedMs >= PLUS_TWO_THRESHOLD_MS;
  const called = elapsedMs >= 8_000;
  const secondCall = elapsedMs >= 12_000;

  const state = dnf ? 'dnf' : overrun ? 'plus2' : secondCall ? 'second' : called ? 'first' : 'idle';

  return (
    <div className="inspection" data-state={state}>
      <span className="inspection__number">{(remaining / 1000).toFixed(1)}</span>
      {overrun && <span className="inspection__tag">{dnf ? 'DNF' : '+2'}</span>}
    </div>
  );
}

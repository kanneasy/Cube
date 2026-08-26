// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { HoldZone } from './HoldZone';

function pads() {
  return [screen.getByLabelText('Start pad 1'), screen.getByLabelText('Start pad 2')];
}

const down = (el: Element) =>
  el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, pointerId: 1 }));
const up = (el: Element) =>
  el.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, pointerId: 1 }));

describe('the hold pads', () => {
  it('arms only when both pads are down', () => {
    const onBothDown = vi.fn();
    render(<HoldZone onBothDown={onBothDown} onRelease={() => {}} />);
    const [a, b] = pads();

    act(() => void down(a));
    expect(onBothDown).not.toHaveBeenCalled();

    act(() => void down(b));
    expect(onBothDown).toHaveBeenCalledTimes(1);
  });

  // The regression this component was rewritten for. Two fingers genuinely can land in
  // the same tick; with contact state held in a closure-captured useState value the
  // second event overwrote the first, "both down" was never reached, and the clock
  // never started -- on the one interaction the regulations are most precise about.
  it('arms when both contacts land in the same tick', () => {
    const onBothDown = vi.fn();
    render(<HoldZone onBothDown={onBothDown} onRelease={() => {}} />);
    const [a, b] = pads();

    act(() => {
      down(a);
      down(b);
    });

    expect(onBothDown).toHaveBeenCalledTimes(1);
  });

  it('starts the solve on the first contact that lifts', () => {
    const onRelease = vi.fn();
    render(<HoldZone onBothDown={() => {}} onRelease={onRelease} />);
    const [a, b] = pads();

    act(() => {
      down(a);
      down(b);
    });
    expect(onRelease).not.toHaveBeenCalled();

    act(() => void up(a));
    expect(onRelease).toHaveBeenCalledTimes(1);
  });

  it('does not fire release again as the second finger lifts', () => {
    const onRelease = vi.fn();
    render(<HoldZone onBothDown={() => {}} onRelease={onRelease} />);
    const [a, b] = pads();

    act(() => {
      down(a);
      down(b);
    });
    act(() => void up(a));
    act(() => void up(b));

    expect(onRelease).toHaveBeenCalledTimes(1);
  });

  it('can be armed again after a full release', () => {
    const onBothDown = vi.fn();
    render(<HoldZone onBothDown={onBothDown} onRelease={() => {}} />);
    const [a, b] = pads();

    act(() => {
      down(a);
      down(b);
    });
    act(() => {
      up(a);
      up(b);
    });
    act(() => {
      down(a);
      down(b);
    });

    expect(onBothDown).toHaveBeenCalledTimes(2);
  });

  it('shows the white light only when both are down', () => {
    const { container } = render(<HoldZone onBothDown={() => {}} onRelease={() => {}} />);
    const [a, b] = pads();
    const rule = container.querySelector('.hold__rule')!;

    act(() => void down(a));
    expect(rule.getAttribute('data-both')).toBe('false');

    act(() => void down(b));
    expect(rule.getAttribute('data-both')).toBe('true');
  });
});

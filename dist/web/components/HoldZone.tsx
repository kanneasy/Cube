import { useCallback, useRef, useState } from 'react';
import { HOLD_LABEL } from './copy';

/**
 * A literal, deliberate quote of a Stackmat: two sensor pads you rest fingers on, and
 * the clock starts on the frame that drops below two contacts (Regulation A4d).
 *
 * Both pads filling is the green light, rendered pure white -- green is a sticker
 * colour and no hue in the chrome may compete with the puzzle. It is the app's one
 * deliberate deviation from the ritual, and the compensation is that it is the
 * brightest thing on the screen.
 *
 * Contact state lives in a ref, not in state, and that is load-bearing. Two fingers
 * genuinely can land in the same tick, and a handler reading a closure-captured set
 * would have the second contact overwrite the first -- so "both down" would never be
 * reached and the clock would never start. On the one interaction the regulations are
 * most precise about, that is not a risk worth taking on how a browser happens to
 * batch touches.
 */
export function HoldZone({ onBothDown, onRelease }: { onBothDown: () => void; onRelease: () => void }) {
  const contacts = useRef<Set<number>>(new Set());
  const armed = useRef(false);
  const [, force] = useState(0);

  const settle = useCallback(() => {
    const count = contacts.current.size;
    force((n) => n + 1);

    if (count >= 2 && !armed.current) {
      armed.current = true;
      onBothDown();
      return;
    }
    // The lift is the start. Any drop below two contacts fires it.
    if (count < 2 && armed.current) {
      armed.current = false;
      onRelease();
    }
  }, [onBothDown, onRelease]);

  const press = (pad: number) => (event: React.PointerEvent) => {
    event.preventDefault();
    contacts.current.add(pad);
    settle();
  };

  const lift = (pad: number) => (event: React.PointerEvent) => {
    event.preventDefault();
    contacts.current.delete(pad);
    settle();
  };

  const both = contacts.current.size >= 2;

  return (
    <div className="hold" data-both={both}>
      {/* Nothing else on screen explains what two blank circles are for. */}
      <span className="hold__label">{HOLD_LABEL}</span>
      {[0, 1].map((pad) => (
        <div
          key={pad}
          className="hold__pad"
          data-down={contacts.current.has(pad)}
          data-both={both}
          onPointerDown={press(pad)}
          onPointerUp={lift(pad)}
          onPointerCancel={lift(pad)}
          onPointerLeave={lift(pad)}
          aria-label={`Start pad ${pad + 1}`}
        />
      ))}
      <div className="hold__rule" data-both={both} />
    </div>
  );
}

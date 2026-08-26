import { useCallback, useRef, useState } from 'react';

/**
 * A literal, deliberate quote of a Stackmat: two sensor pads you rest fingers on, and
 * the clock starts on the frame that drops below two contacts (Regulation A4d).
 *
 * Both pads filling is the green light, rendered pure white -- green is a sticker
 * colour and no hue in the chrome may compete with the puzzle. It is the app's one
 * deliberate deviation from the ritual, and the compensation is that it is the
 * brightest thing on the screen.
 */
export function HoldZone({
  onBothDown,
  onRelease,
}: {
  onBothDown: () => void;
  onRelease: () => void;
}) {
  const [down, setDown] = useState<Set<number>>(new Set());
  const armed = useRef(false);

  const update = useCallback(
    (next: Set<number>) => {
      setDown(next);
      if (next.size >= 2 && !armed.current) {
        armed.current = true;
        onBothDown();
        return;
      }
      // The lift is the start. Any drop below two contacts fires it.
      if (next.size < 2 && armed.current) {
        armed.current = false;
        onRelease();
      }
    },
    [onBothDown, onRelease],
  );

  const press = (pad: number) => (event: React.PointerEvent) => {
    event.preventDefault();
    const next = new Set(down);
    next.add(pad);
    update(next);
  };

  const lift = (pad: number) => (event: React.PointerEvent) => {
    event.preventDefault();
    const next = new Set(down);
    next.delete(pad);
    update(next);
  };

  const both = down.size >= 2;

  return (
    <div className="hold" data-both={both}>
      {[0, 1].map((pad) => (
        <div
          key={pad}
          className="hold__pad"
          data-down={down.has(pad)}
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

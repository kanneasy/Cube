/**
 * The app's mark: a 3x3 grid of squares whose top row is offset by a quarter turn.
 * The atomic unit the app is named for, frozen.
 *
 * Drawn in code rather than generated, so it stays exact at any size and costs nothing
 * to ship. Only the home-screen icon is generated, because that one has to look like an
 * object rather than a diagram.
 */
export function Mark({ size = 20, title }: { size?: number; title?: string }) {
  const unit = 8;
  const gap = 2;
  const step = unit + gap;
  // The offset row is shifted by half a cell -- a quarter turn's worth of travel --
  // which is what breaks the grid and makes the mark read as motion rather than as a
  // plain nine-square logo.
  const offset = step / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={col * step + (row === 0 ? offset : 0)}
            y={row * step}
            width={unit}
            height={unit}
            fill="currentColor"
            opacity={row === 0 ? 1 : 0.42}
          />
        )),
      )}
    </svg>
  );
}

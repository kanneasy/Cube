import type { CSSProperties } from 'react';

type Props = {
  width?: string;
  height?: string;
  style?: CSSProperties;
};

// Static placeholder that mirrors the real layout's shape — no shimmer, and the
// container it fills must reserve the same space the loaded content will take.
export function Skeleton({ width, height, style }: Props) {
  return <div className="ui-skeleton" aria-hidden="true" style={{ width, height, ...style }} />;
}

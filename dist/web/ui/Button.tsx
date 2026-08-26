import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'quiet' | 'danger';
  loading?: boolean;
  children: ReactNode;
};

// Loading never changes the button's size: the label stays mounted (transparent)
// and the spinner overlays it. See the design rubric's layout-stability rule.
export function Button({ variant = 'primary', loading = false, disabled, children, className, ...rest }: Props) {
  return (
    <button
      className={['ui-btn', `ui-btn--${variant}`, className].filter(Boolean).join(' ')}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      <span className="ui-btn-label">{children}</span>
      {loading && (
        <span className="ui-btn-spinner" aria-hidden="true">
          <span className="ui-spinner" />
        </span>
      )}
    </button>
  );
}

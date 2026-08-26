import type { ReactNode } from 'react';

type Props = {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
};

// Label wraps the control (no id wiring needed). The error replaces the hint and
// announces itself; the wrapper's data-invalid drives the control's danger border.
export function Field({ label, hint, error, children }: Props) {
  return (
    <label className="ui-field" data-invalid={error ? 'true' : undefined}>
      <span className="ui-field-label">{label}</span>
      {children}
      {error ? (
        <p className="ui-field-error" role="alert">{error}</p>
      ) : hint ? (
        <p className="ui-field-hint">{hint}</p>
      ) : null}
    </label>
  );
}

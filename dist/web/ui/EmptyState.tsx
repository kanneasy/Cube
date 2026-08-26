import type { ReactNode } from 'react';

type Props = {
  title: string;
  hint?: string;
  action?: ReactNode;
};

// Warm and encouraging, never apologetic (see @brand/voice.md for the words).
export function EmptyState({ title, hint, action }: Props) {
  return (
    <div className="ui-empty">
      <p className="ui-empty-title">{title}</p>
      {hint && <p className="ui-empty-hint">{hint}</p>}
      {action}
    </div>
  );
}

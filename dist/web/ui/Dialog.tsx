import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
};

// Native <dialog> via showModal(): focus trap, Escape, and ::backdrop for free.
// Clicking the backdrop closes (a click on the dialog element itself, not its
// contents, can only be the backdrop area).
export function Dialog({ open, onClose, title, children, footer }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="ui-dialog"
      aria-label={title}
      onClose={onClose}
      onMouseDown={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <h2 className="ui-dialog-title">{title}</h2>
      {children}
      {footer && <div className="ui-dialog-footer">{footer}</div>}
    </dialog>
  );
}

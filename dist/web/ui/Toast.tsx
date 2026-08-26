import { useSyncExternalStore } from 'react';

type Toast = { id: number; message: string; tone: 'neutral' | 'danger' };

let toasts: Toast[] = [];
let nextId = 1;
const listeners = new Set<() => void>();

function emit() {
  toasts = [...toasts];
  listeners.forEach((l) => l());
}

/** Show a transient confirmation. Every action confirms itself — use this when the
 *  result isn't already visible in place. */
export function toast(message: string, tone: Toast['tone'] = 'neutral') {
  const id = nextId++;
  toasts.push({ id, message, tone });
  emit();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  }, 4000);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Mount once, near the app root. */
export function Toaster() {
  const items = useSyncExternalStore(subscribe, () => toasts);
  if (items.length === 0) return null;
  return (
    <div className="ui-toaster" role="status" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className={t.tone === 'danger' ? 'ui-toast ui-toast--danger' : 'ui-toast'}>
          {t.message}
        </div>
      ))}
    </div>
  );
}

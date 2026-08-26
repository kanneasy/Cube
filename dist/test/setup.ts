// Global test setup. Registers jest-dom matchers (toBeInTheDocument, etc.) on the
// shared expect, and — in the browser environment — a working localStorage and
// React Testing Library cleanup between tests. Node tests have no window and skip
// the browser-only bits.
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';

if (typeof window !== 'undefined') {
  // jsdom + Node's experimental global localStorage collide, leaving the bare
  // `localStorage` the app uses without working methods. Install a clean one.
  const store = new Map<string, string>();
  const localStorageMock: Storage = {
    getItem: (k) => (store.has(k) ? store.get(k)! : null),
    setItem: (k, v) => void store.set(k, String(v)),
    removeItem: (k) => void store.delete(k),
    clear: () => store.clear(),
    key: (i) => [...store.keys()][i] ?? null,
    get length() {
      return store.size;
    },
  };
  Object.defineProperty(window, 'localStorage', { value: localStorageMock, configurable: true });
  Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, configurable: true });

  // Unmount React trees between tests so renders don't accumulate in document.body.
  const { cleanup } = await import('@testing-library/react');
  afterEach(() => cleanup());
}

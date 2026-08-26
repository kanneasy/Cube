// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { prefersReducedMotion } from './motion';

const withPreference = (reduce: boolean) => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches: reduce && query.includes('prefers-reduced-motion'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    })),
  );
};

afterEach(() => vi.unstubAllGlobals());

describe('reduced motion', () => {
  it('is false by default', () => {
    withPreference(false);
    expect(prefersReducedMotion()).toBe(false);
  });

  it('is true when the preference is set', () => {
    withPreference(true);
    expect(prefersReducedMotion()).toBe(true);
  });

  it('is read fresh each time, not captured once at import', () => {
    // The setting can change while the app is open, and a value captured at module
    // load would be wrong for the rest of the session.
    withPreference(false);
    expect(prefersReducedMotion()).toBe(false);
    withPreference(true);
    expect(prefersReducedMotion()).toBe(true);
  });
});

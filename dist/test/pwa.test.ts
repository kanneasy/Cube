import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const config = readFileSync(join(process.cwd(), 'vite.config.ts'), 'utf8');

describe('service worker configuration', () => {
  // Scenario: "A new service worker update never swaps code under a running session;
  // it prompts rather than auto-activates" (@tests, story 10).
  it('registers with prompt, never autoUpdate', () => {
    expect(config).toMatch(/registerType:\s*'prompt'/);
    expect(config).not.toMatch(/registerType:\s*'autoUpdate'/);
  });

  it('has something that actually surfaces the prompt', () => {
    // registerType: 'prompt' on its own is configuration with no consequence. Without
    // a component calling useRegisterSW, a waiting worker never activates at all and
    // the setting reads as done while doing nothing.
    const prompt = readFileSync(join(process.cwd(), 'dist/web/components/UpdatePrompt.tsx'), 'utf8');
    expect(prompt).toMatch(/useRegisterSW/);
    expect(prompt).toMatch(/updateServiceWorker/);
  });

  it('disables the service worker in dev', () => {
    // A worker in dev fights HMR and produces stale-asset confusion that reads as a
    // code bug.
    expect(config).toMatch(/devOptions:\s*\{\s*enabled:\s*false\s*\}/);
  });

  it('declares standalone display and portrait orientation', () => {
    // Scenario: "The installed app launches full-screen with no browser chrome, in
    // standalone display mode" (@qa, story 10) -- this is the half of it that is
    // checkable without an iPhone.
    expect(config).toMatch(/display:\s*'standalone'/);
    expect(config).toMatch(/orientation:\s*'portrait'/);
  });

  it('precaches the wasm the solver needs offline', () => {
    // The search worker statically imports a 656KB wasm chunk, so it is on the hot
    // path for both scrambling and hints. Leaving it out of the precache would make
    // the app unable to produce a scramble with no network.
    expect(config).toMatch(/globPatterns/);
    expect(config).toMatch(/wasm/);
  });
});

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// One config, two environments. Node is the default (the cube engine, the timer
// state machine, the stats math — all pure). Component and IndexedDB tests opt into
// jsdom with a `// @vitest-environment jsdom` docblock at the top of the file.
//
// There is no database and no server in this app, so none of the template's serial
// PGlite machinery applies: tests run parallel and isolated, the normal way.
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['dist/test/setup.ts'],
    include: ['dist/**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', 'build/**', '**/.{idea,git,cache,output,temp}/**'],
    coverage: {
      provider: 'v8',
      include: ['dist/**/*.{ts,tsx}'],
      exclude: [
        'build/**',
        'dist/scripts/**',
        'dist/test/**',
        'dist/web/main.tsx',
        'dist/web/vite-env.d.ts',
        '**/*.test.{ts,tsx}',
      ],
      reporter: ['text', 'html'],
    },
  },
});

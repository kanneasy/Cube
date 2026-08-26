import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';

// Quarter Turn is a static PWA: no API, no proxy, no server. The architecture consult
// at intake ruled the kit's Hono/Drizzle backend out for this app — everything is
// single-player and on-device, so a server would add a hop and buy nothing.
const WEB_PORT = Number(process.env.WEB_PORT ?? 5173);
const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: 'dist/web',
  envDir: projectRoot,
  plugins: [
    react(),
    VitePWA({
      // 'prompt', never 'autoUpdate': auto-activating a new service worker swaps JS
      // chunks under a running app and any in-flight module reference breaks. Deadly
      // in a long-session app, which a cube timer is.
      registerType: 'prompt',
      // A service worker in dev fights HMR and causes stale-asset confusion. Offline
      // is only meaningfully testable from a production build on the home screen.
      devOptions: { enabled: false },
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'Quarter Turn',
        short_name: 'Quarter Turn',
        description: 'A competition-legal 3x3x3 cube you solve with your thumb.',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#0a0a0c',
        theme_color: '#0a0a0c',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // cubing.js ships large wasm/worker chunks; they must be precached for the
        // app to scramble offline.
        globPatterns: ['**/*.{js,css,html,png,svg,woff2,wasm}'],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
      },
    }),
  ],
  worker: { format: 'es' },
  server: { port: WEB_PORT, fs: { allow: ['..', '../..'] } },
  build: { outDir: '../../build', emptyOutDir: true, target: 'es2022' },
});

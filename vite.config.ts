import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';

// Quarter Turn is a static PWA: no API, no proxy, no server. The architecture consult
// at intake ruled the kit's Hono/Drizzle backend out for this app — everything is
// single-player and on-device, so a server would add a hop and buy nothing.
const WEB_PORT = Number(process.env.WEB_PORT ?? 5173);

// The app root is dist/web, but .env lives at the project root — load env from there so
// VITE_* vars are inlined.
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
        // True black, matching --color-void. Design's call and a functional one: any
        // tint shifts perceived sticker hue by simultaneous contrast, and this app asks
        // you to name six hues in a tenth of a second. A near-black splash would also
        // flash against the app's own background on launch.
        background_color: '#000000',
        theme_color: '#000000',
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
  // 'iife', not 'es'. As an ES-module worker, Vite lets the worker bundle IMPORT the
  // app's shared entry chunk -- React, three.js and all -- and it dies on `document is
  // not defined` before running. An iife worker is inlined and self-contained, so there
  // is nothing to share and nothing to import.
  worker: { format: 'iife' },
  server: { port: WEB_PORT, fs: { allow: ['..', '../..'] } },
  build: {
    outDir: '../../build',
    emptyOutDir: true,
    target: 'es2022',
    // Vite's module-preload helper creates <link> elements, so it touches `document`.
    // The scramble worker imported it -- and through it the whole app bundle, React and
    // three.js included -- and died on `document is not defined` before it could run.
    // Disabling the helper costs a little main-thread preloading and buys a worker that
    // starts at all.
    modulePreload: false,
    rollupOptions: {
      output: {
        // NOTE: do not add manualChunks here. Grouping cubing.js into a named chunk
        // stops Vite emitting its worker entry as its own file at all, and the worker
        // then cannot be fetched.
        // cubing.js builds its own worker URL and asks for
        // /assets/search-worker-entry.js -- literally, with no content hash. Vite
        // hashes every chunk by default, so that request 404s, the SPA fallback hands
        // back index.html, and the worker dies on the wrong MIME type. The app then
        // cannot scramble at all.
        //
        // This is invisible in dev, which serves modules unbundled, so it only appears
        // in a production build. Emitting this one chunk unhashed is what makes the URL
        // cubing.js asks for the URL that exists. Workbox still revisions it in the
        // precache manifest, so it is not uncached.
        chunkFileNames: (chunk) =>
          chunk.name === 'search-worker-entry' ? 'assets/[name].js' : 'assets/[name]-[hash].js',
      },
    },
  },
});

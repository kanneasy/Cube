import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// The web app lives in dist/web. /api is proxied to the Hono method server.
// Ports read from env so several apps can run at once (the Builder dashboard
// assigns a unique pair per app). Defaults preserve a standalone `npm run dev`.
const WEB_PORT = Number(process.env.WEB_PORT ?? 5173);
const API_PORT = Number(process.env.API_PORT ?? 8787);

// The app root is dist/web, but .env lives at the project root — load env from
// there so VITE_* vars are inlined. (Only VITE_-prefixed vars reach the client
// bundle; server secrets never do.)
const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: 'dist/web',
  envDir: projectRoot,
  plugins: [react()],
  server: {
    port: WEB_PORT,
    proxy: { '/api': `http://localhost:${API_PORT}` },
    fs: { allow: ['..', '../..'] },
  },
});

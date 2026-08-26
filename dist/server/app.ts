import { Hono } from 'hono';
import { methods } from '../methods/index';

// The Hono method app — defined separately from any server bootstrap so it can be
// imported by both the local dev server (dist/server/index.ts, which calls serve())
// and, once the app is ported to production, the Vercel serverless function —
// WITHOUT pulling @hono/node-server or serve() into the serverless bundle. Every
// method is reachable at POST /api/<name>.
export const app = new Hono();

app.post('/api/:name', async (c) => {
  const name = c.req.param('name');
  const fn = (methods as unknown as Record<string, (input: unknown) => Promise<unknown>>)[name];
  if (!fn) return c.json({ error: `unknown method: ${name}` }, 404);
  const input = await c.req.json().catch(() => ({}));
  try {
    return c.json((await fn(input)) as object);
  } catch (e) {
    return c.json({ error: (e as Error).message }, 500);
  }
});

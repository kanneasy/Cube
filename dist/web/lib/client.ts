import type { Methods } from '../../shared/api';

// Typed RPC to backend methods: client.listNotes(), client.addNote({ text }).
// No raw fetch in components. type-only import keeps backend code out of the bundle.
export const client = new Proxy(
  {},
  {
    get: (_t, name: string) => async (input?: unknown) => {
      const res = await fetch(`/api/${name}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(input ?? {}),
      });
      if (!res.ok) throw new Error(`${name} failed: ${res.status}`);
      return res.json();
    },
  },
) as unknown as Methods;

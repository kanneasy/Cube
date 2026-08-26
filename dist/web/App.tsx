import { useEffect, useState } from 'react';
import { client } from './lib/client';
import type { Note } from '../shared/api';
import { Button, Card, EmptyState, Input, Skeleton } from './ui';

export function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    client.listNotes().then((n) => {
      setNotes(n);
      setLoading(false);
    });
  }, []);

  async function add() {
    if (!text.trim() || saving) return;
    setSaving(true);
    try {
      const note = await client.addNote({ text: text.trim() });
      setNotes((prev) => [note, ...prev]);
      setText('');
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="wrap">
      <h1>Quarter Turn</h1>
      <p className="sub">Full-stack skeleton. The build replaces all of this from the spec.</p>
      <div className="composer">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder="Write a note"
        />
        <Button onClick={add} loading={saving}>Add</Button>
      </div>
      {loading ? (
        <div className="notes" aria-hidden="true">
          <Skeleton height="3.3rem" />
          <Skeleton height="3.3rem" />
          <Skeleton height="3.3rem" />
        </div>
      ) : notes.length === 0 ? (
        <EmptyState title="No notes yet" hint="Write the first one above." />
      ) : (
        <ul className="notes">
          {notes.map((n) => (
            <Card as="li" key={n.id}>
              {n.text}
            </Card>
          ))}
        </ul>
      )}
    </main>
  );
}

// The component gallery behind /design-system: every primitive rendered in
// isolation with its variants and states. Three consumers share it:
//   1. design-critic reviews component states here without hunting through screens
//   2. visual-regression baselines it as a screen (design-system--gallery.png)
//   3. a future design-sync push derives its preview cards from these entries
//      (group/name/subtitle map to the @dsCard card convention)
// When a new primitive lands in ui/, add its entry here — an unlisted component
// is invisible to review.
import { useState, type ReactNode } from 'react';
import { Button, Card, Dialog, EmptyState, Field, Input, Select, Skeleton, Toaster, toast } from './index';

type GalleryEntry = {
  group: string;
  name: string;
  subtitle?: string;
  render: () => ReactNode;
  // Static markup for the design-sync preview card when the interactive demo
  // doesn't capture the component's real states in server-rendered HTML
  // (open dialogs, loading buttons, live toasts). Defaults to render.
  previewRender?: () => ReactNode;
};

const swatches = ['surface', 'raised', 'ink', 'muted', 'line', 'accent', 'on-accent', 'danger'] as const;

function LoadingButtonDemo() {
  const [busy, setBusy] = useState(false);
  return (
    <Button
      loading={busy}
      onClick={() => {
        setBusy(true);
        setTimeout(() => setBusy(false), 1500);
      }}
    >
      Save changes
    </Button>
  );
}

function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="quiet" onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete note?"
        footer={
          <>
            <Button variant="quiet" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
          </>
        }
      >
        <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: 'var(--type-size-small)' }}>
          This removes the note for everyone. There is no undo.
        </p>
      </Dialog>
    </>
  );
}

export const galleryEntries: GalleryEntry[] = [
  {
    group: 'Tokens',
    name: 'Colors',
    subtitle: 'The named palette from tokens.json',
    render: () => (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-12)' }}>
        {swatches.map((name) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
            <div
              style={{
                width: 'var(--space-48)',
                height: 'var(--space-48)',
                borderRadius: 'var(--radius-control)',
                background: `var(--color-${name})`,
                border: '1px solid var(--color-line)',
              }}
            />
            <code style={{ fontSize: 'var(--type-size-small)', fontFamily: 'var(--type-family-mono)' }}>{name}</code>
          </div>
        ))}
      </div>
    ),
  },
  {
    group: 'Tokens',
    name: 'Type',
    subtitle: 'Display / title / body / small anchors',
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <span style={{ fontFamily: 'var(--type-family-display)', fontWeight: 'var(--type-weight-display)', fontSize: 'var(--type-size-display)', lineHeight: 'var(--type-leading-display)' }}>Display anchor</span>
        <span style={{ fontWeight: 'var(--type-weight-display)', fontSize: 'var(--type-size-title)' }}>Title anchor</span>
        <span style={{ fontSize: 'var(--type-size-body)' }}>Body text at its resting size and weight.</span>
        <span style={{ fontSize: 'var(--type-size-small)', color: 'var(--color-muted)' }}>Small / secondary text.</span>
      </div>
    ),
  },
  {
    group: 'Tokens',
    name: 'Spacing',
    subtitle: 'The 4/8/12/16/24/32/48/64 scale',
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {[4, 8, 12, 16, 24, 32, 48, 64].map((s) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)' }}>
            <code style={{ width: '3rem', fontSize: 'var(--type-size-small)', fontFamily: 'var(--type-family-mono)' }}>{s}</code>
            <div style={{ height: 'var(--space-8)', width: `var(--space-${s})`, background: 'var(--color-accent)', borderRadius: '2px' }} />
          </div>
        ))}
      </div>
    ),
  },
  {
    group: 'Controls',
    name: 'Button',
    subtitle: 'Primary / quiet / danger · disabled · loading (fixed width)',
    render: () => (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-12)', alignItems: 'center' }}>
        <Button>Primary</Button>
        <Button variant="quiet">Quiet</Button>
        <Button variant="danger">Danger</Button>
        <Button disabled>Disabled</Button>
        <LoadingButtonDemo />
      </div>
    ),
    previewRender: () => (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-12)', alignItems: 'center' }}>
        <Button>Primary</Button>
        <Button variant="quiet">Quiet</Button>
        <Button variant="danger">Danger</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Saving</Button>
      </div>
    ),
  },
  {
    group: 'Controls',
    name: 'Field + Input + Select',
    subtitle: 'Label · hint · error state',
    render: () => (
      <div style={{ display: 'grid', gap: 'var(--space-16)', maxWidth: '20rem' }}>
        <Field label="Workspace name" hint="Shown to everyone you invite.">
          <Input placeholder="Acme Inc" />
        </Field>
        <Field label="Role">
          <Select defaultValue="editor">
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </Select>
        </Field>
        <Field label="Email" error="That address is already invited.">
          <Input defaultValue="sam@example" />
        </Field>
      </div>
    ),
  },
  {
    group: 'Containers',
    name: 'Card',
    render: () => (
      <Card style={{ maxWidth: '20rem' }}>
        <p style={{ margin: 0, fontWeight: 'var(--type-weight-display)' }}>Weekly review</p>
        <p style={{ margin: 'var(--space-4) 0 0', color: 'var(--color-muted)', fontSize: 'var(--type-size-small)' }}>
          6 notes · updated 2h ago
        </p>
      </Card>
    ),
  },
  {
    group: 'Containers',
    name: 'Dialog',
    subtitle: 'Native <dialog>: focus trap, Escape, backdrop click',
    render: () => <DialogDemo />,
    previewRender: () => (
      // The dialog panel rendered statically (a div with the panel class) —
      // a closed <dialog> is display:none and would make an empty card.
      <div className="ui-dialog" style={{ position: 'static' }}>
        <h2 className="ui-dialog-title">Delete note?</h2>
        <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: 'var(--type-size-small)' }}>
          This removes the note for everyone. There is no undo.
        </p>
        <div className="ui-dialog-footer">
          <Button variant="quiet">Cancel</Button>
          <Button variant="danger">Delete</Button>
        </div>
      </div>
    ),
  },
  {
    group: 'Feedback',
    name: 'EmptyState',
    render: () => <EmptyState title="No notes yet" hint="Write the first one above and it will show up here." />,
  },
  {
    group: 'Feedback',
    name: 'Skeleton',
    subtitle: 'Static, mirrors the loaded layout — no shimmer',
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', maxWidth: '20rem' }}>
        <Skeleton height="2.75rem" />
        <Skeleton height="2.75rem" width="80%" />
        <Skeleton height="2.75rem" width="90%" />
      </div>
    ),
  },
  {
    group: 'Feedback',
    name: 'Toast',
    render: () => (
      <div style={{ display: 'flex', gap: 'var(--space-12)' }}>
        <Button variant="quiet" onClick={() => toast('Note saved')}>Show toast</Button>
        <Button variant="quiet" onClick={() => toast('Could not save — try again', 'danger')}>Show error toast</Button>
      </div>
    ),
    previewRender: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', alignItems: 'flex-start' }}>
        <div className="ui-toast">Note saved</div>
        <div className="ui-toast ui-toast--danger">Could not save — try again</div>
      </div>
    ),
  },
];

function ThemeToggle() {
  // Effective theme, not just the data-theme override — with no override the
  // OS preference decides, and the control must show the true current state.
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () =>
      (document.documentElement.dataset.theme as 'light' | 'dark') ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  );
  function toggle() {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    setTheme(next);
  }
  return (
    <Button variant="quiet" onClick={toggle} aria-pressed={theme === 'dark'}>
      Theme: {theme}
    </Button>
  );
}

export function DesignSystemGallery() {
  const groups = [...new Set(galleryEntries.map((e) => e.group))];
  return (
    <main className="wrap" style={{ maxWidth: '52rem' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-16)' }}>
        <div>
          <h1>Design system</h1>
          <p className="sub">Every primitive in ui/, in every state. Tokens from src/interfaces/@brand/tokens.json.</p>
        </div>
        <ThemeToggle />
      </header>
      {groups.map((group) => (
        <section key={group} style={{ marginTop: 'var(--space-32)' }}>
          <h2 style={{ fontSize: 'var(--type-size-title)', margin: '0 0 var(--space-8)' }}>{group}</h2>
          {/* Hairline-divided sections, not cards — the demos themselves may be
              cards, and nesting containers is a named enemy. */}
          {galleryEntries
            .filter((e) => e.group === group)
            .map((entry) => (
              <div
                key={entry.name}
                data-ds-card={entry.name}
                data-ds-group={entry.group}
                style={{ borderTop: '1px solid var(--color-line)', padding: 'var(--space-16) 0 var(--space-24)' }}
              >
                <p style={{ margin: '0 0 var(--space-4)', fontWeight: 'var(--type-weight-display)' }}>{entry.name}</p>
                {entry.subtitle && (
                  <p style={{ margin: '0 0 var(--space-12)', color: 'var(--color-muted)', fontSize: 'var(--type-size-small)' }}>
                    {entry.subtitle}
                  </p>
                )}
                {entry.render()}
              </div>
            ))}
        </section>
      ))}
      <Toaster />
    </main>
  );
}

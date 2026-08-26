// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Example component test — jsdom env (via the docblock above). The RPC client is
// mocked so no network is hit; this exercises render, the loading state, and an
// action. Copy this shape for components with logic; trivial render-only ones can
// be skipped.
const { listNotes, addNote } = vi.hoisted(() => ({ listNotes: vi.fn(), addNote: vi.fn() }));
vi.mock('./lib/client', () => ({ client: { listNotes, addNote } }));

import { App } from './App';

beforeEach(() => {
  vi.clearAllMocks();
  listNotes.mockResolvedValue([]);
});

describe('<App>', () => {
  it('loads notes on mount and renders them', async () => {
    listNotes.mockResolvedValue([{ id: 1, text: 'remember milk', createdAt: '2026-01-01' }]);
    render(<App />);
    expect(await screen.findByText('remember milk')).toBeInTheDocument();
  });

  it('adds a note through the composer', async () => {
    addNote.mockResolvedValue({ id: 2, text: 'new note', createdAt: '2026-01-02' });
    render(<App />);
    await userEvent.type(screen.getByPlaceholderText('Write a note'), 'new note');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(addNote).toHaveBeenCalledWith({ text: 'new note' });
    expect(await screen.findByText('new note')).toBeInTheDocument();
  });
});

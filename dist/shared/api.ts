// The API contract shared by the backend (which implements it) and the frontend
// (which calls it). No runtime imports here, so it is safe to import from the browser.

export interface Note {
  id: number;
  text: string;
  createdAt: string;
}

export interface Methods {
  listNotes(input?: Record<string, never>): Promise<Note[]>;
  addNote(input: { text: string }): Promise<Note>;
}

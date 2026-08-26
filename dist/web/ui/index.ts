// Builder UI primitives — the app's component layer, themed entirely by
// dist/web/tokens.css (generated from src/interfaces/@brand/tokens.json).
//
// The reuse rule: before writing any new frontend element, check here first.
// Extend a primitive over duplicating it; extract a new one on the third
// repetition of a pattern, and add it to gallery.tsx so /design-system shows it.
//
// ui.css is imported by main.tsx (not here) so non-Vite tooling — the
// design-sync preview builder, tsx scripts — can import these modules.

export { Button } from './Button';
export { Input, Select } from './Input';
export { Field } from './Field';
export { Card } from './Card';
export { Dialog } from './Dialog';
export { EmptyState } from './EmptyState';
export { Skeleton } from './Skeleton';
export { toast, Toaster } from './Toast';

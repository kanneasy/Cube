import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { DesignSystemGallery } from './ui/gallery';
import './tokens.css';
import './styles.css';
import './ui/ui.css';

// /design-system renders the component gallery (ui/gallery.tsx) — every ui/
// primitive in every state, for review and visual regression. When the app
// adopts a real router (wouter), fold this path in as a route.
const Root = window.location.pathname === '/design-system' ? DesignSystemGallery : App;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);

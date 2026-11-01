import React from 'react';
import { createRoot } from 'react-dom/client';

// Enkel routing ud fra adressen:
//   /      → oversigt over de seks designforslag
//   /1..6  → det enkelte forslag
const pages = {
  1: () => import('./forslag/F1.jsx'),
  2: () => import('./forslag/F2.jsx'),
  3: () => import('./forslag/F3.jsx'),
  4: () => import('./forslag/F4.jsx'),
  5: () => import('./forslag/F5.jsx'),
  6: () => import('./forslag/F6.jsx'),
};

const path = window.location.pathname.replace(/\/+$/, '');
const m = path.match(/^\/(?:forslag\/)?(\d)$/);
const load = m && pages[m[1]] ? pages[m[1]] : () => import('./Overview.jsx');

load().then((mod) => {
  const Page = mod.default;
  document.title = Page.title ? `${Page.title} · Sørens hverdagshjælp` : 'Designforslag til Sørens hverdagshjælp';
  createRoot(document.getElementById('root')).render(<Page />);
});

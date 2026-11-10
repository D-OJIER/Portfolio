import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { applyAppearanceToDocument, readSavedAppearance } from './hooks/useTheme';
import './style.css';

// Apply the saved theme before the first render so the page never paints
// with the wrong colours.
applyAppearanceToDocument(readSavedAppearance());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

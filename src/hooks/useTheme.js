import { useCallback, useLayoutEffect, useState } from 'react';
import { cloudSets } from './useClouds';

// Same localStorage keys ("theme", "darkMode") and the same default as the
// original site: gold theme, light mode.
export const DEFAULT_THEME = 'gold';

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
}

export function readSavedAppearance() {
  const saved = readStorage('theme');
  return {
    // Ignore unknown values so a bad entry can't leave the page unstyled.
    theme: saved in cloudSets ? saved : DEFAULT_THEME,
    isDark: readStorage('darkMode') === 'true',
  };
}

export function applyAppearanceToDocument({ theme, isDark }) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.toggle('theme_dark', isDark);
  writeStorage('theme', theme);
  writeStorage('darkMode', String(isDark));
}

/** Returns [appearance, applyTheme]. */
export function useTheme() {
  const [appearance, setAppearance] = useState(readSavedAppearance);

  useLayoutEffect(() => {
    applyAppearanceToDocument(appearance);
  }, [appearance]);

  const applyTheme = useCallback((theme, isDark) => {
    setAppearance((prev) => (prev.theme === theme && prev.isDark === isDark ? prev : { theme, isDark }));
  }, []);

  return [appearance, applyTheme];
}

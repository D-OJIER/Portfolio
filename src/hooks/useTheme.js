import { useCallback, useLayoutEffect, useState } from 'react';

// Port of theme.js. Same localStorage keys ("theme", "darkMode") and the same
// default: gold theme, light mode.
export const DEFAULT_THEME = 'gold';

export function readSavedAppearance() {
  return {
    theme: localStorage.getItem('theme') || DEFAULT_THEME,
    isDark: localStorage.getItem('darkMode') === 'true',
  };
}

export function applyAppearanceToDocument({ theme, isDark }) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.toggle('theme_dark', isDark);
  localStorage.setItem('theme', theme);
  localStorage.setItem('darkMode', isDark);
}

/**
 * Returns [appearance, applyTheme]. `appearance` is a fresh object on every
 * applyTheme() call (even when the values are unchanged) so that effects can
 * react to each call, matching the original where every applyTheme() call
 * also re-applied cloud opacity.
 */
export function useTheme() {
  const [appearance, setAppearance] = useState(readSavedAppearance);

  useLayoutEffect(() => {
    applyAppearanceToDocument(appearance);
  }, [appearance]);

  const applyTheme = useCallback((theme, isDark) => {
    setAppearance({ theme, isDark });
  }, []);

  return [appearance, applyTheme];
}

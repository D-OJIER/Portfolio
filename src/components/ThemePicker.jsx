import { useEffect, useRef, useState } from 'react';
import { themes } from '../data/portfolio';
import { useGame } from '../game/GameContext';

export default function ThemePicker({ appearance, applyTheme }) {
  const { theme, isDark } = appearance;
  const { secretTheme } = useGame();
  const [open, setOpen] = useState(false);
  const controlsRef = useRef(null);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return undefined;
    const onDocumentClick = (e) => {
      if (!controlsRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const visibleThemes = themes.filter((t) => !t.secret || secretTheme);

  return (
    <div className="theme-controls" ref={controlsRef}>
      <button
        type="button"
        aria-label="Theme"
        aria-expanded={open}
        aria-controls="themePicker"
        id="themeToggle"
        className="theme-btn"
        onClick={() => setOpen((o) => !o)}
      >
        🎨
      </button>
      <div className={open ? 'theme-picker active' : 'theme-picker'} id="themePicker">
        <p className="picker-label">Select colour</p>
        <div className="color-buttons">
          {visibleThemes.map((t) => (
            <button
              type="button"
              key={t.id}
              className={`color-btn ${t.id}`}
              data-theme={t.id}
              title={t.title}
              aria-label={t.title}
              aria-pressed={theme === t.id}
              tabIndex={open ? 0 : -1}
              onClick={() => {
                applyTheme(t.id, isDark);
                setOpen(false);
              }}
            />
          ))}
        </div>
        <div className="mode-toggle">
          <label className="switch">
            {/* Checked = light mode. */}
            <input
              type="checkbox"
              id="darkMode"
              aria-label="Light mode"
              checked={!isDark}
              tabIndex={open ? 0 : -1}
              onChange={(e) => applyTheme(theme, !e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

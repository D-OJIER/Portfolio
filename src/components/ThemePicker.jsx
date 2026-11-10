import { useEffect, useRef, useState } from 'react';
import { themes } from '../data/portfolio';

export default function ThemePicker({ appearance, applyTheme }) {
  const { theme, isDark } = appearance;
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const pickerRef = useRef(null);

  // Close the picker when clicking anywhere outside it.
  useEffect(() => {
    const onDocumentClick = (e) => {
      if (!pickerRef.current.contains(e.target) && !toggleRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, []);

  return (
    <div className="theme-controls">
      <button
        ref={toggleRef}
        aria-label="Theme"
        id="themeToggle"
        className="theme-btn"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        🎨
      </button>
      <div ref={pickerRef} className={open ? 'theme-picker active' : 'theme-picker'} id="themePicker">
        <div className="color-buttons">
          {themes.map((t) => (
            <button
              key={t.id}
              className={`color-btn ${t.id}`}
              data-theme={t.id}
              title={t.title}
              onClick={(e) => {
                e.stopPropagation();
                // Keep the current light/dark mode (the original flipped it here).
                applyTheme(t.id, isDark);
                setOpen(false);
              }}
            />
          ))}
        </div>
        <div className="mode-toggle">
          <label className="switch">
            {/* Checked = light mode, as in the original. */}
            <input
              type="checkbox"
              id="darkMode"
              checked={!isDark}
              onChange={(e) => applyTheme(theme, !e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

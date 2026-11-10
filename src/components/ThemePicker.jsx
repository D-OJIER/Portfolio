import { useEffect, useRef, useState } from 'react';
import { themes } from '../data/portfolio';
import { useGame } from '../game/GameContext';
import Icon, { SwatchIcon } from './Icon';

const LABELS = { gold: 'Gold', green: 'Neon', blue: 'Azure', red: 'Ember', synth: 'Synth' };

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
        className={open ? 'theme-btn open' : 'theme-btn'}
        onClick={() => setOpen((o) => !o)}
      >
        <SwatchIcon />
        <span className="theme-btn-label">Theme</span>
      </button>
      <div className={open ? 'theme-picker active' : 'theme-picker'} id="themePicker">
        <div className="picker-head">
          <span className="picker-label">Appearance</span>
          <span className="picker-current">{LABELS[theme]}</span>
        </div>

        <div className="color-buttons" role="group" aria-label="Colour">
          {visibleThemes.map((t) => {
            const selected = theme === t.id;
            return (
              <button
                type="button"
                key={t.id}
                className={`color-btn ${t.id}`}
                data-theme={t.id}
                title={t.title}
                aria-label={t.title}
                aria-pressed={selected}
                onClick={() => {
                  applyTheme(t.id, isDark);
                  setOpen(false);
                }}
              >
                <span className="swatch" />
                <span className="swatch-name">{LABELS[t.id]}</span>
                {selected && <Icon name="check" size={10} className="swatch-check" />}
              </button>
            );
          })}
        </div>

        <div className="mode-toggle">
          {/* Checked = light mode. */}
          <label className="mode-seg">
            <input
              type="checkbox"
              id="darkMode"
              aria-label="Light mode"
              checked={!isDark}
              onChange={(e) => applyTheme(theme, !e.target.checked)}
            />
            <span className="seg seg-dark">
              <Icon name="moon" size={12} /> Dark
            </span>
            <span className="seg seg-light">
              <Icon name="sun" size={12} /> Light
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

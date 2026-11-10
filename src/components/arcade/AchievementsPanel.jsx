import { useEffect, useRef } from 'react';
import { ACHIEVEMENTS } from '../../game/achievements';
import { useGame } from '../../game/GameContext';

export default function AchievementsPanel() {
  const { panelOpen, unlocked, actions } = useGame();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!panelOpen) return undefined;
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();
    document.body.classList.add('no-scroll');
    const onKey = (e) => e.key === 'Escape' && actions.closePanel();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
      previouslyFocused?.focus?.();
    };
  }, [panelOpen, actions]);

  if (!panelOpen) return null;

  return (
    <div className="ach-backdrop" onClick={actions.closePanel}>
      <div
        className="ach-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="achTitle"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ach-head">
          <div>
            <p className="kicker">Trophy room</p>
            <h2 id="achTitle">Achievements</h2>
          </div>
          <p className="ach-count">
            {unlocked.size} / {ACHIEVEMENTS.length}
          </p>
          <button ref={closeRef} type="button" className="ach-close" onClick={actions.closePanel} aria-label="Close">
            ✕
          </button>
        </div>
        <ul className="ach-list">
          {ACHIEVEMENTS.map((a) => {
            const got = unlocked.has(a.id);
            const hidden = a.secret && !got;
            return (
              <li key={a.id} className={got ? 'got' : 'locked'}>
                <span className="ach-icon" aria-hidden="true">
                  {got ? a.icon : '?'}
                </span>
                <div>
                  <h3>{hidden ? '???' : a.title}</h3>
                  <p>{hidden ? a.hint : a.desc}</p>
                </div>
                <span className="visually-hidden">{got ? 'Unlocked' : 'Locked'}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

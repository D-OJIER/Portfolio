import { useGame } from '../../game/GameContext';

// Only the two newest are shown so a burst of unlocks can't cover the page.
export default function Toasts() {
  const { toasts } = useGame();
  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.slice(-2).map((t) => (
        <div className="achievement-toast" key={t.key}>
          <span className="toast-icon" aria-hidden="true">
            {t.icon}
          </span>
          <div>
            <p className="toast-kicker">Achievement unlocked</p>
            <p className="toast-title">{t.title}</p>
            <p className="toast-desc">{t.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

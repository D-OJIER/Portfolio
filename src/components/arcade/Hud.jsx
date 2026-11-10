import { ACHIEVEMENTS } from '../../game/achievements';
import { useGame } from '../../game/GameContext';
import Icon from '../Icon';

const pad = (n) => String(n).padStart(6, '0');

// Bottom-left arcade HUD: score, hi-score and the arcade settings.
export default function Hud() {
  const { score, hiScore, unlocked, soundOn, crtOn, actions } = useGame();

  return (
    <div id="hud" className="hud">
      <div className="hud-score" aria-label={`Score ${score}`}>
        <span className="hud-label">Score</span>
        <span className="hud-value">{pad(score)}</span>
      </div>
      <div className="hud-score" aria-label={`High score ${hiScore}`}>
        <span className="hud-label">Hi</span>
        <span className="hud-value">{pad(hiScore)}</span>
      </div>
      <div className="hud-buttons">
        <button type="button" className="hud-btn" onClick={actions.openPanel} aria-label="Achievements">
          <Icon name="trophy" size={11} /> {unlocked.size}/{ACHIEVEMENTS.length}
        </button>
        <button
          type="button"
          className="hud-btn"
          onClick={actions.toggleSound}
          aria-pressed={soundOn}
          aria-label="Sound effects"
        >
          SFX <span className={soundOn ? 'led on' : 'led'} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="hud-btn"
          onClick={actions.toggleCrt}
          aria-pressed={crtOn}
          aria-label="CRT effect"
        >
          CRT <span className={crtOn ? 'led on' : 'led'} aria-hidden="true" />
        </button>
      </div>
      {!unlocked.has('first-pop') && (
        <p className="hud-hint" aria-hidden="true">
          Tip: shoot the clouds
        </p>
      )}
    </div>
  );
}

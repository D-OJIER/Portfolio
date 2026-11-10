import { useCallback, useEffect, useRef, useState } from 'react';
import { hero } from '../../data/portfolio';
import { randomQuote } from '../../data/quotes';
import { useGame } from '../../game/GameContext';
import { sessionFlag, setSessionFlag } from '../../game/storage';

const SESSION_KEY = 'arcadeStarted';

// "Insert coin" title screen, shown once per browser session.
export default function StartScreen() {
  const { actions } = useGame();
  const [phase, setPhase] = useState(() => (sessionFlag(SESSION_KEY) ? 'done' : 'idle'));
  const startedRef = useRef(false);
  const [quote] = useState(randomQuote);
  const buttonRef = useRef(null);

  const begin = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    setSessionFlag(SESSION_KEY);
    actions.start();
    setPhase('leaving');
    setTimeout(() => setPhase('done'), 650);
  }, [actions]);

  useEffect(() => {
    if (phase !== 'idle') return undefined;
    document.body.classList.add('no-scroll');
    buttonRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Tab' || e.metaKey || e.ctrlKey || e.altKey) return;
      e.preventDefault();
      begin();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [phase, begin]);

  if (phase === 'done') return null;

  return (
    <div
      className={phase === 'leaving' ? 'start-screen leaving' : 'start-screen'}
      role="dialog"
      aria-modal="true"
      aria-label="Start screen"
      onClick={begin}
    >
      <div className="start-inner">
        <p className="start-kicker">Portfolio · Stage select</p>
        <h2 className="start-name">{hero.name}</h2>
        <p className="start-sub">{hero.subtitle}</p>
        <button
          ref={buttonRef}
          type="button"
          className="start-button"
          onClick={(e) => {
            e.stopPropagation();
            begin();
          }}
        >
          ► Press start
        </button>
        <p className="start-coin">
          Insert coin <span aria-hidden="true">·</span> Credit {phase === 'leaving' ? '01' : '00'}
        </p>
        <p className="start-hint">Click or press any key</p>
        <p className="start-quote">“{quote.text}”</p>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { quotes } from '../../data/quotes';
import { useGame } from '../../game/GameContext';
import { useInView } from '../../hooks/useInView';

const AUTO_ADVANCE = 12000;

function Flame() {
  const embers = Array.from({ length: 7 }, (_, i) => ({
    x: 40 + ((i * 13) % 40),
    delay: (i * 0.53) % 3,
    dur: 2.2 + (i % 3) * 0.6,
  }));
  return (
    <svg className="bonfire-flame" viewBox="0 0 120 140" aria-hidden="true">
      <ellipse className="bf-glow" cx="60" cy="112" rx="52" ry="14" />
      {embers.map((e, i) => (
        <rect
          key={i}
          className="bf-ember"
          x={e.x}
          y="96"
          width="3"
          height="3"
          style={{ animationDelay: `${e.delay}s`, animationDuration: `${e.dur}s` }}
        />
      ))}
      <polygon className="bf-flame outer" points="60,22 86,92 76,112 44,112 34,92" />
      <polygon className="bf-flame mid" points="60,44 78,96 70,112 50,112 42,96" />
      <polygon className="bf-flame core" points="60,66 70,100 64,112 56,112 50,100" />
      {/* Coiled sword */}
      <rect className="bf-sword" x="58" y="18" width="4" height="86" transform="rotate(8 60 104)" />
      <rect className="bf-sword" x="50" y="26" width="20" height="4" transform="rotate(8 60 104)" />
      {/* Stones */}
      {[18, 36, 54, 72, 90].map((x, i) => (
        <rect key={x} className="bf-stone" x={x} y={i % 2 ? 110 : 114} width="14" height="10" />
      ))}
    </svg>
  );
}

// A resting place at the bottom of the page where the quotes are kept.
export default function Bonfire() {
  const { actions } = useGame();
  const ref = useRef(null);
  const inView = useInView(ref, 0.4);
  const [index, setIndex] = useState(() => Math.floor(Math.random() * quotes.length));
  const [paused, setPaused] = useState(false);
  const quote = quotes[index];

  useEffect(() => {
    if (inView) actions.quoteRead(quote.text);
  }, [inView, quote, actions]);

  useEffect(() => {
    if (!inView || paused) return undefined;
    const id = setTimeout(() => setIndex((i) => (i + 1) % quotes.length), AUTO_ADVANCE);
    return () => clearTimeout(id);
  }, [inView, paused, index]);

  const rest = () => {
    setIndex((i) => (i + 1) % quotes.length);
    actions.rest();
  };

  return (
    <section
      id="bonfire"
      className="pixel-border bonfire"
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Flame />
      <div className="bonfire-body">
        <h2>Bonfire</h2>
        <p className="kicker">Words of the wanderer</p>
        <blockquote className="bonfire-quote" key={quote.text} aria-live="polite">
          <p>{quote.text}</p>
          <cite>{quote.source}</cite>
        </blockquote>
        <div className="bonfire-actions">
          <button type="button" className="pixel-button" onClick={rest}>
            Rest
          </button>
          <span className="bonfire-count">
            {String(index + 1).padStart(2, '0')} / {quotes.length}
          </span>
        </div>
      </div>
    </section>
  );
}

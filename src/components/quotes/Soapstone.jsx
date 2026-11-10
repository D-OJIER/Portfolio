import { useState } from 'react';
import { drawQuote } from '../../data/quotes';
import { useGame } from '../../game/GameContext';

// Slots between sections where a message may lie. A random handful are used
// on each visit, so the messages turn up in different places every time.
const SLOTS = ['after-hero', 'after-profile', 'after-expertise', 'after-columns', 'after-projects'];
const ACTIVE = new Set([...SLOTS].sort(() => Math.random() - 0.5).slice(0, 3));

function Rune() {
  return (
    <svg className="rune" viewBox="0 0 32 32" aria-hidden="true">
      <circle className="rune-halo" cx="16" cy="16" r="13" />
      <g className="rune-spin">
        <polygon className="rune-diamond" points="16,5 27,16 16,27 5,16" />
        <line className="rune-ray" x1="16" y1="1" x2="16" y2="5" />
        <line className="rune-ray" x1="16" y1="27" x2="16" y2="31" />
        <line className="rune-ray" x1="1" y1="16" x2="5" y2="16" />
        <line className="rune-ray" x1="27" y1="16" x2="31" y2="16" />
      </g>
      <rect className="rune-core" x="14" y="14" width="4" height="4" />
    </svg>
  );
}

// A glowing message left on the ground, in the spirit of soapstone messages.
export default function Soapstone({ slot }) {
  const { actions } = useGame();
  const [quote] = useState(() => (ACTIVE.has(slot) ? drawQuote() : null));
  const [side] = useState(() => (Math.random() < 0.5 ? 'left' : 'right'));
  const [read, setRead] = useState(false);

  if (!quote) return null;

  const reveal = () => {
    if (read) return;
    setRead(true);
    actions.quoteRead(quote.text);
  };

  return (
    <div className={`soapstone ${side}${read ? ' read' : ''}`}>
      <button
        type="button"
        className="soapstone-mark"
        onPointerEnter={reveal}
        onFocus={reveal}
        onClick={reveal}
        aria-expanded={read}
      >
        <Rune />
        <span className="soapstone-hint">{read ? 'A message, read' : 'A message lies here'}</span>
      </button>
      <blockquote className="soapstone-text" aria-hidden={!read}>
        <p>{quote.text}</p>
        <cite>{quote.source}</cite>
      </blockquote>
    </div>
  );
}

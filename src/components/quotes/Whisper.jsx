import { useEffect, useState } from 'react';
import { randomQuote } from '../../data/quotes';
import { useGame } from '../../game/GameContext';

const FIRST_DELAY = [25000, 45000];
const NEXT_DELAY = [60000, 110000];
const SHOW_FOR = 8000;

const between = ([min, max]) => min + Math.random() * (max - min);

// Every so often a faint line drifts in near the bottom and fades away.
export default function Whisper() {
  const { panelOpen } = useGame();
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    let timer;
    const schedule = (range) => {
      timer = setTimeout(() => {
        if (document.hidden || document.body.classList.contains('no-scroll')) {
          schedule([5000, 10000]);
          return;
        }
        setQuote(randomQuote());
        timer = setTimeout(() => {
          setQuote(null);
          schedule(NEXT_DELAY);
        }, SHOW_FOR);
      }, between(range));
    };
    schedule(FIRST_DELAY);
    return () => clearTimeout(timer);
  }, []);

  if (!quote || panelOpen) return null;

  return (
    <div className="whisper" aria-hidden="true" key={quote.text}>
      <p>{quote.text}</p>
    </div>
  );
}

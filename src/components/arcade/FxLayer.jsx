import { useState } from 'react';
import { useGame } from '../../game/GameContext';

function Burst({ x, y }) {
  const [pixels] = useState(() =>
    Array.from({ length: 14 }, (_, i) => {
      const angle = (i / 14) * Math.PI * 2 + Math.random() * 0.4;
      const dist = 36 + Math.random() * 40;
      return {
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        size: 4 + Math.round(Math.random() * 4),
      };
    }),
  );
  return (
    <div className="fx-burst" style={{ left: x, top: y }}>
      {pixels.map((p, i) => (
        <i key={i} style={{ '--dx': `${p.dx}px`, '--dy': `${p.dy}px`, '--s': `${p.size}px` }} />
      ))}
    </div>
  );
}

function CoinRain() {
  const [coins] = useState(() =>
    Array.from({ length: 36 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 1.1,
      duration: 1.4 + Math.random() * 1,
    })),
  );
  return coins.map((c, i) => (
    <i
      key={i}
      className="fx-coin"
      style={{ left: `${c.left}%`, '--delay': `${c.delay}s`, '--dur': `${c.duration}s` }}
    />
  ));
}

// Fixed overlay for game effects: cloud bursts, score popups, coin rain.
export default function FxLayer() {
  const { effects } = useGame();
  return (
    <div className="fx-layer" aria-hidden="true">
      {effects.map((e) => {
        if (e.type === 'burst') return <Burst key={e.key} x={e.x} y={e.y} />;
        if (e.type === 'popup')
          return (
            <span key={e.key} className="fx-popup" style={{ left: e.x, top: e.y }}>
              {e.text}
            </span>
          );
        return <CoinRain key={e.key} />;
      })}
    </div>
  );
}

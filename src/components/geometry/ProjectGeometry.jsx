import { useEffect, useRef } from 'react';

// Animated geometric emblems, one per project, each hinting at what the
// project does. Pure SVG + CSS animations (see "Project geometry" in style.css).

// RentEase: lender (square) and renter (circle) hand items back and forth.
function Handoff() {
  const out = 'M84 52 C 104 22, 136 22, 156 52';
  const back = 'M156 68 C 136 98, 104 98, 84 68';
  return (
    <svg className="geo geo-handoff" viewBox="0 0 240 120" aria-hidden="true">
      <path className="geo-track" d={out} />
      <path className="geo-track" d={back} />
      <g className="geo-node">
        <rect className="geo-frame" x="48" y="44" width="32" height="32" />
        <rect className="geo-solid pulse-a" x="55" y="51" width="18" height="18" />
      </g>
      <g className="geo-node">
        <circle className="geo-frame" cx="176" cy="60" r="17" />
        <circle className="geo-solid pulse-b" cx="176" cy="60" r="9" />
      </g>
      <rect className="geo-packet" x="-4" y="-4" width="8" height="8" transform="rotate(45)">
        <animateMotion dur="2.8s" repeatCount="indefinite" path={out} calcMode="spline" keyTimes="0;1" keySplines="0.6 0 0.4 1" />
      </rect>
      <rect className="geo-packet" x="-4" y="-4" width="8" height="8" transform="rotate(45)">
        <animateMotion dur="2.8s" begin="-1.4s" repeatCount="indefinite" path={back} calcMode="spline" keyTimes="0;1" keySplines="0.6 0 0.4 1" />
      </rect>
    </svg>
  );
}

// Parker: parking bays light up as cars arrive and leave; a scanner sweeps.
function Bays() {
  const bays = Array.from({ length: 14 }, (_, i) => ({
    x: 22 + (i % 7) * 29,
    y: i < 7 ? 18 : 70,
    delay: ((i * 7) % 11) * 0.45,
  }));
  return (
    <svg className="geo geo-bays" viewBox="0 0 240 120" aria-hidden="true">
      <line className="geo-track" x1="12" y1="60" x2="228" y2="60" />
      {bays.map((b, i) => (
        <g key={i}>
          <rect className="geo-bay" x={b.x} y={b.y} width="22" height="32" />
          <rect
            className="geo-car"
            x={b.x + 5}
            y={b.y + 6}
            width="12"
            height="20"
            style={{ animationDelay: `${b.delay}s` }}
          />
        </g>
      ))}
      <rect className="geo-scan" x="0" y="10" width="3" height="100" />
    </svg>
  );
}

// Campus One: a hub broadcasting messages to every corner of campus.
function Hub() {
  const spokes = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    return { x: 120 + Math.cos(a) * 46, y: 60 + Math.sin(a) * 46, i };
  });
  return (
    <svg className="geo geo-hub" viewBox="0 0 240 120" aria-hidden="true">
      <circle className="geo-ripple" cx="120" cy="60" r="14" />
      <circle className="geo-ripple delay" cx="120" cy="60" r="14" />
      {spokes.map((s) => (
        <g key={s.i}>
          <line className="geo-track" x1="120" y1="60" x2={s.x} y2={s.y} />
          <circle className="geo-sat" cx={s.x} cy={s.y} r="6" style={{ animationDelay: `${s.i * 0.3}s` }} />
          <circle className="geo-pulse" r="3">
            <animateMotion
              dur="1.8s"
              begin={`-${s.i * 0.3}s`}
              repeatCount="indefinite"
              path={`M120 60 L${s.x.toFixed(1)} ${s.y.toFixed(1)}`}
            />
          </circle>
        </g>
      ))}
      <polygon className="geo-solid spin-slow" points="120,44 134,52 134,68 120,76 106,68 106,52" />
    </svg>
  );
}

const SHAPES = { handoff: Handoff, bays: Bays, hub: Hub };

export default function ProjectGeometry({ kind }) {
  const ref = useRef(null);
  // SMIL motion isn't covered by the CSS reduced-motion rules; pause it here.
  useEffect(() => {
    const svg = ref.current?.querySelector('svg');
    if (svg && window.matchMedia('(prefers-reduced-motion: reduce)').matches) svg.pauseAnimations();
  }, []);
  const Shape = SHAPES[kind];
  return <div ref={ref} className="geo-wrap">{Shape && <Shape />}</div>;
}

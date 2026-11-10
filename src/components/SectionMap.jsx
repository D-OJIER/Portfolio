import { useEffect, useRef, useState } from 'react';
import { navLinks } from '../data/portfolio';
import { quotes } from '../data/quotes';
import { useGame } from '../game/GameContext';
import { playSound } from '../game/sound';

const HEADER_OFFSET = 80;
const SHORT_QUOTES = quotes.filter((q) => q.text.length <= 60);

// Original pixel character: a small hooded wanderer carrying a lantern.
// B = body (currentColor: white in dark mode), E = eyes, L = lantern.
const BODY = [
  '.........BB......',
  '........BBB......',
  '.......BBBB......',
  '......BBBBBB.....',
  '.....BBBBBBBB....',
  '....BBBBBBBBBB...',
  '...BBB......BBB..',
  '...BB........BB..',
  '...BB........BB..',
  '...BB........BB..',
  '....BB......BB...',
  '....BBBBBBBBBB.B.',
  '...BBBBBBBBBBB.B.',
  '...BBBBBBBBBBB...',
  '..BBBBBBBBBBBB...',
  '..BBBBBBBBBBBB...',
];
const EYES = [
  [6, 7],
  [7, 7],
  [6, 8],
  [7, 8],
  [10, 7],
  [11, 7],
  [10, 8],
  [11, 8],
];
const LANTERN = [
  [14, 13],
  [15, 13],
  [16, 13],
  [14, 14],
  [15, 14],
  [16, 14],
  [15, 15],
];
const LEGS_A = [
  [5, 16],
  [6, 16],
  [10, 16],
  [11, 16],
  [5, 17],
  [6, 17],
  [10, 17],
  [11, 17],
];
const LEGS_B = [
  [6, 16],
  [7, 16],
  [9, 16],
  [10, 16],
  [7, 17],
  [9, 17],
];

const toPath = (cells) => cells.map(([x, y]) => `M${x} ${y}h1v1h-1z`).join('');
const BODY_PATH = toPath(
  BODY.flatMap((row, y) => [...row].map((c, x) => (c === 'B' ? [x, y] : null)).filter(Boolean)),
);

function Wanderer() {
  return (
    <svg className="wanderer-sprite" viewBox="0 0 17 18" shapeRendering="crispEdges" aria-hidden="true">
      <path className="w-body" d={BODY_PATH} />
      <path className="w-legs legs-a" d={toPath(LEGS_A)} />
      <path className="w-legs legs-b" d={toPath(LEGS_B)} />
      <g className="w-eyes">
        <path d={toPath(EYES)} />
      </g>
      <path className="w-lantern" d={toPath(LANTERN)} />
    </svg>
  );
}

function scrollToSection(e) {
  const target = document.querySelector(e.currentTarget.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
    behavior: reduce ? 'auto' : 'smooth',
  });
}

// Replaces the classic nav: a path with a waypoint per section. The wanderer
// walks along it as you scroll; click a waypoint to travel there.
export default function SectionMap() {
  const { actions } = useGame();
  const trackRef = useRef(null);
  const walkerRef = useRef(null);
  const [active, setActive] = useState(0);
  const [bubble, setBubble] = useState(null);
  const [jumping, setJumping] = useState(false);
  const last = navLinks.length - 1;

  useEffect(() => {
    let raf = 0;
    let lastX = null;
    let idleTimer;

    const update = () => {
      raf = 0;
      const track = trackRef.current;
      const walker = walkerRef.current;
      if (!track || !walker) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const stops = navLinks.map((link) => {
        const el = document.querySelector(link.href);
        if (!el) return max;
        return Math.min(el.getBoundingClientRect().top + y - HEADER_OFFSET - 2, max);
      });

      let p = last;
      if (y <= stops[0]) p = 0;
      else {
        for (let i = 0; i < last; i++) {
          if (y < stops[i + 1]) {
            p = i + (y - stops[i]) / Math.max(1, stops[i + 1] - stops[i]);
            break;
          }
        }
      }
      const frac = p / last;
      const x = frac * track.clientWidth;
      track.style.setProperty('--p', frac);
      walker.style.transform = `translateX(${x}px)`;
      walker.dataset.side = frac > 0.5 ? 'right' : 'left';

      if (lastX !== null && Math.abs(x - lastX) > 0.5) {
        walker.classList.add('walking');
        walker.classList.toggle('left', x < lastX);
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => walker.classList.remove('walking'), 220);
      }
      lastX = x;
      setActive(Math.round(p));
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    // Eyes follow the pointer.
    const onMove = (e) => {
      const walker = walkerRef.current;
      if (!walker) return;
      const r = walker.getBoundingClientRect();
      let look = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / 160));
      if (walker.classList.contains('left')) look = -look;
      walker.style.setProperty('--look', look.toFixed(2));
    };

    request();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    window.addEventListener('mousemove', onMove, { passive: true });
    const ro = new ResizeObserver(request);
    ro.observe(document.body);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      window.removeEventListener('mousemove', onMove);
      ro.disconnect();
    };
  }, [last]);

  // Poke the wanderer: it hops and murmurs a line.
  useEffect(() => {
    if (!bubble) return undefined;
    const id = setTimeout(() => setBubble(null), 4200);
    return () => clearTimeout(id);
  }, [bubble]);

  const poke = () => {
    setJumping(true);
    setTimeout(() => setJumping(false), 450);
    setBubble(SHORT_QUOTES[Math.floor(Math.random() * SHORT_QUOTES.length)]);
    playSound('jump');
    actions.pokeWanderer();
  };

  return (
    <div className="section-map">
      <div className="map-track" ref={trackRef}>
        <div className="map-nodes" id="navLinks">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={`headerLink map-node${i === active ? ' current' : ''}${i < active ? ' visited' : ''}`}
              style={{ left: `${(i / last) * 100}%` }}
              aria-current={i === active ? 'location' : undefined}
              onClick={scrollToSection}
            >
              <span className="map-pip" aria-hidden="true" />
              <span className="map-label">{link.label}</span>
            </a>
          ))}
        </div>
        <button
          type="button"
          ref={walkerRef}
          className={jumping ? 'wanderer jump' : 'wanderer'}
          onClick={poke}
          aria-label="The wanderer"
        >
          <Wanderer />
          {bubble && (
            <span className="wanderer-bubble" role="status">
              {bubble.text}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

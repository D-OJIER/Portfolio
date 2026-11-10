// Animated glyph for each expertise, wrapped in a segmented progress ring.

function Stack() {
  return (
    <g>
      {[2, 1, 0].map((i) => (
        <polygon
          key={i}
          className={i === 0 ? 'glyph-layer top' : 'glyph-layer'}
          points="32,13 46,20 32,27 18,20"
          transform={`translate(0 ${i * 9})`}
          style={{ animationDelay: `${i * 0.25}s` }}
        />
      ))}
    </g>
  );
}

function Java() {
  return (
    <g>
      <polygon className="glyph-solid" points="20,30 44,30 41,46 23,46" />
      <rect className="glyph-line" x="44" y="33" width="5" height="7" />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          className="glyph-steam"
          x={25 + i * 6}
          y="24"
          width="3"
          height="3"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </g>
  );
}

function Mobile() {
  return (
    <g>
      <rect className="glyph-line" x="24" y="16" width="16" height="30" />
      <rect className="glyph-solid" x="27" y="20" width="10" height="20" />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          className="glyph-wave"
          d={`M${44 + i * 4} ${26 - i * 3} q${4 + i * 2} ${5 + i * 3} 0 ${10 + i * 6}`}
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </g>
  );
}

function Database() {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <ellipse key={i} className="glyph-line" cx="32" cy={20 + i * 10} rx="12" ry="4" />
      ))}
      <line className="glyph-line" x1="20" y1="20" x2="20" y2="40" />
      <line className="glyph-line" x1="44" y1="20" x2="44" y2="40" />
      <g className="glyph-orbit">
        <rect className="glyph-solid" x="30" y="10" width="4" height="4" />
      </g>
    </g>
  );
}

const GLYPHS = { stack: Stack, java: Java, mobile: Mobile, database: Database };

const SEGMENTS = 24;

// The ring is 24 pixel segments; the lit ones show the level.
export default function SkillGlyph({ kind, level }) {
  const Glyph = GLYPHS[kind];
  const lit = Math.round((level / 100) * SEGMENTS);
  return (
    <svg className="skill-glyph" viewBox="0 0 64 64" aria-hidden="true">
      {Array.from({ length: SEGMENTS }, (_, i) => (
        <rect
          key={i}
          className={i < lit ? 'ring-seg lit' : 'ring-seg'}
          x="30.5"
          y="0.5"
          width="3"
          height="6"
          transform={`rotate(${(i * 360) / SEGMENTS} 32 32)`}
          style={{ '--d': i }}
        />
      ))}
      {Glyph && <Glyph />}
    </svg>
  );
}

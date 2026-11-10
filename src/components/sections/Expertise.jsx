import { useRef } from 'react';
import { expertise } from '../../data/portfolio';
import { useInView } from '../../hooks/useInView';
import SkillGlyph from '../geometry/SkillGlyph';

// Each expertise: animated glyph inside a segmented ring, plus an XP bar.
export default function Expertise() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section id="expertise" className="pixel-border" ref={ref}>
      <h2>{expertise.title}</h2>
      <div className={inView ? 'skill-expertise in-view' : 'skill-expertise'}>
        {expertise.items.map((item, i) => (
          <div className="expertise-item" key={item.name} style={{ '--i': i }}>
            <SkillGlyph kind={item.glyph} level={item.level} />
            <div className="expertise-body">
              <div className="expertise-header">
                <span className="expertise-name">{item.name}</span>
                <span className="expertise-level">LV {item.level}</span>
              </div>
              <div
                className="expertise-bar"
                role="meter"
                aria-label={item.name}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={item.level}
              >
                <div className="expertise-fill" style={{ '--level': `${item.level}%` }}>
                  <span className="expertise-head" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

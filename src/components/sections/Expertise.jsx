import { useRef } from 'react';
import { expertise } from '../../data/portfolio';
import { useInView } from '../../hooks/useInView';

// Skill levels drawn as segmented XP bars that fill when scrolled into view.
export default function Expertise() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section id="expertise" className="pixel-border" ref={ref}>
      <h2>{expertise.title}</h2>
      <div className={inView ? 'skill-expertise in-view' : 'skill-expertise'}>
        {expertise.items.map((item) => (
          <div className="expertise-item" key={item.name}>
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
              <div className="expertise-fill" style={{ '--level': `${item.level}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

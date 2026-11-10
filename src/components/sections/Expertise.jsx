import { expertise } from '../../data/portfolio';

// Skill bars. The id "Skills" (capital S) is kept from the original; the nav
// "Skills" link targets #skills (the Technical Skills section).
export default function Expertise() {
  return (
    <section id="Skills" className="pixel-border">
      <div className="skill-expertise">
        {expertise.map((item) => (
          <div className="expertise-item" key={item.name}>
            <div className="expertise-header">
              <span className="expertise-name">{item.name}</span>
              <span className="expertise-level">{item.level}</span>
            </div>
            <div className="expertise-bar">
              <div className="expertise-fill" style={{ width: item.width }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

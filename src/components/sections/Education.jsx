import { education } from '../../data/portfolio';

export default function Education() {
  return (
    <section id="education" className="pixel-border">
      <h2>{education.title}</h2>
      {education.items.map((item) => (
        <div className="edu-item" key={item.school}>
          <h3>{item.school}</h3>
          <p>{item.details}</p>
        </div>
      ))}
    </section>
  );
}

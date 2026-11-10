import { skills } from '../../data/portfolio';

export default function Skills() {
  return (
    <section id="skills" className="pixel-border">
      <h2>{skills.title}</h2>
      <ul className="skill-list">
        {skills.items.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

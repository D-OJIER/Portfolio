import { projects } from '../../data/portfolio';

export default function Projects() {
  return (
    <section id="projects" className="pixel-border">
      <h2>{projects.title}</h2>
      <div className="project-grid">
        {projects.items.map((project) => (
          <div className="project-item" key={project.name}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import { projects } from '../../data/portfolio';
import { useGame } from '../../game/GameContext';

export default function Projects() {
  const { actions } = useGame();
  const total = projects.items.length;

  return (
    <section id="projects" className="pixel-border">
      <h2>{projects.title}</h2>
      <div className="project-grid">
        {projects.items.map((project, i) => (
          <div
            className="project-item"
            key={project.name}
            onPointerEnter={() => actions.projectSeen(project.name, total)}
          >
            <span className="stage-tag">Stage 1-{i + 1}</span>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <span className="press-start" aria-hidden="true">
              ▶ Press start
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

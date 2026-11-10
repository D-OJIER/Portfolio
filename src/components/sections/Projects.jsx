import { useEffect, useRef, useState } from 'react';
import { projects } from '../../data/portfolio';
import { useGame } from '../../game/GameContext';
import ProjectGeometry from '../geometry/ProjectGeometry';
import MockScreen from '../geometry/MockScreens';
import Icon from '../Icon';

const HOVER_DELAY = 140; // ms before a hovered card expands (avoids flicker)

const SCROLL_SPEED = 28; // px per second
const END_PAUSE = 1400; // ms to rest at each end

// Screens auto-scroll back and forth while the card is open. The native
// scrollbar is hidden and replaced by a pixel track you can click or drag.
function Screens({ screens, active }) {
  const stripRef = useRef(null);
  const holdRef = useRef(false);
  const [bar, setBar] = useState({ size: 1, pos: 0 });
  const hasMock = screens.some((s) => !s.image);

  useEffect(() => {
    const el = stripRef.current;
    const measure = () => {
      const max = el.scrollWidth - el.clientWidth;
      setBar({ size: Math.min(1, el.clientWidth / el.scrollWidth), pos: max > 0 ? el.scrollLeft / max : 0 });
    };
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', measure);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!active || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const el = stripRef.current;
    let raf;
    let lastT = performance.now();
    let pauseUntil = lastT + 900;
    let dir = 1;
    let pos = el.scrollLeft;
    const tick = (now) => {
      const dt = Math.min(now - lastT, 64);
      lastT = now;
      const max = el.scrollWidth - el.clientWidth;
      if (max > 2 && !holdRef.current && now > pauseUntil) {
        pos += (dir * SCROLL_SPEED * dt) / 1000;
        if (pos >= max) {
          pos = max;
          dir = -1;
          pauseUntil = now + END_PAUSE;
        } else if (pos <= 0) {
          pos = 0;
          dir = 1;
          pauseUntil = now + END_PAUSE;
        }
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft; // follow manual scrolling
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const hold = (on) => () => {
    holdRef.current = on;
  };

  // Click or drag on the track to move.
  const seek = (e) => {
    const el = stripRef.current;
    const track = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - track.left) / track.width));
    el.scrollLeft = ratio * (el.scrollWidth - el.clientWidth);
  };
  const onTrackDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    holdRef.current = true;
    seek(e);
  };
  const onTrackMove = (e) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) seek(e);
  };
  const onTrackUp = () => {
    holdRef.current = false;
  };
  const step = (dir) => {
    const el = stripRef.current;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  const scrollable = bar.size < 0.99;

  return (
    <div className="project-screens">
      <div
        className="screen-strip"
        ref={stripRef}
        onPointerEnter={hold(true)}
        onPointerLeave={hold(false)}
        onTouchStart={hold(true)}
        onTouchEnd={() => setTimeout(hold(false), 2000)}
        onFocus={hold(true)}
        onBlur={hold(false)}
      >
        {screens.map((screen) => (
          <figure className="screen" key={screen.label}>
            {screen.image ? (
              <img src={screen.image} alt={screen.label} loading="lazy" />
            ) : (
              <MockScreen id={screen.mock} />
            )}
            <figcaption>{screen.label}</figcaption>
          </figure>
        ))}
      </div>
      <div className="strip-footer">
        {scrollable && (
          <>
            <button type="button" className="strip-step" onClick={() => step(-1)} aria-label="Previous screens">
              ◄
            </button>
            <div
              className="strip-track"
              onPointerDown={onTrackDown}
              onPointerMove={onTrackMove}
              onPointerUp={onTrackUp}
              onPointerCancel={onTrackUp}
              aria-hidden="true"
            >
              <span
                className="strip-thumb"
                style={{ width: `${bar.size * 100}%`, left: `${bar.pos * (1 - bar.size) * 100}%` }}
              />
            </div>
            <button type="button" className="strip-step" onClick={() => step(1)} aria-label="Next screens">
              ►
            </button>
          </>
        )}
        {hasMock && <span className="screen-note">Mock-up</span>}
      </div>
    </div>
  );
}

export default function Projects() {
  const { actions } = useGame();
  const [active, setActive] = useState(null);
  const timer = useRef(null);
  const total = projects.items.length;

  useEffect(() => () => clearTimeout(timer.current), []);

  const open = (i, delay = 0) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setActive(i);
      actions.projectSeen(projects.items[i].name, total);
    }, delay);
  };
  const close = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(null), HOVER_DELAY);
  };

  return (
    <section id="projects" className="pixel-border">
      <h2>{projects.title}</h2>
      <div className={active === null ? 'project-grid' : 'project-grid has-active'} onPointerLeave={(e) => e.pointerType === 'mouse' && close()}>
        {projects.items.map((project, i) => {
          const isActive = active === i;
          return (
            <article
              className={isActive ? 'project-item active' : 'project-item'}
              key={project.name}
              onPointerEnter={(e) => e.pointerType === 'mouse' && open(i, HOVER_DELAY)}
            >
              <div className="project-geo">
                <ProjectGeometry kind={project.geometry} />
              </div>
              <span className="stage-tag">Stage 1-{i + 1}</span>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <ul className="tag-list" aria-label="Built with">
                {project.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="project-actions">
                <button
                  type="button"
                  className="project-toggle"
                  aria-expanded={isActive}
                  onClick={() => (isActive ? setActive(null) : open(i))}
                >
                  {isActive ? '▼ Hide screens' : '► View screens'}
                </button>
                {project.repo && (
                  <a className="project-repo" href={project.repo} target="_blank" rel="noopener noreferrer">
                    Source <Icon name="arrow" size={10} />
                  </a>
                )}
              </div>
              <div className="project-expand" aria-hidden={!isActive}>
                <Screens screens={project.screens} active={isActive} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

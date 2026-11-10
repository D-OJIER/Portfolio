import ThemePicker from './ThemePicker';
import SectionMap from './SectionMap';
import { logo } from '../data/portfolio';
import { useGame } from '../game/GameContext';

export default function Header({ appearance, applyTheme }) {
  const { actions } = useGame();

  return (
    <div id="mainHeader">
      <div className="logo-section">
        <a
          href="#"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            actions.logoClick();
            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
          }}
        >
          {logo}
          <span className="logo-tag" aria-hidden="true">
            P1
          </span>
        </a>
        <ThemePicker appearance={appearance} applyTheme={applyTheme} />
      </div>

      <nav className="main-nav" aria-label="Sections">
        <SectionMap />
      </nav>
    </div>
  );
}

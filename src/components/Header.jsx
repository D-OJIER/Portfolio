import { useEffect, useState } from 'react';
import ThemePicker from './ThemePicker';
import { logo, navLinks } from '../data/portfolio';
import { useGame } from '../game/GameContext';

const HEADER_OFFSET = 80;

function scrollToY(top) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
}

function scrollToSection(e) {
  const target = document.querySelector(e.currentTarget.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  scrollToY(target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET);
}

export default function Header({ appearance, applyTheme }) {
  const { actions } = useGame();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu when scrolling down past the header.
  useEffect(() => {
    let lastScroll = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      if (current > lastScroll && current > 70) setMenuOpen(false);
      lastScroll = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div id="mainHeader">
      <div className="logo-section">
        <a
          href="#"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            actions.logoClick();
            scrollToY(0);
          }}
        >
          {logo}
        </a>
        <ThemePicker appearance={appearance} applyTheme={applyTheme} />
      </div>

      <nav className="main-nav" aria-label="Sections">
        <button
          type="button"
          id="mobileMenuBtn"
          className="mobile-menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="navLinks"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? '×' : '☰'}
        </button>
        <div className={menuOpen ? 'nav-links active' : 'nav-links'} id="navLinks">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="headerLink"
              href={link.href}
              onClick={(e) => {
                setMenuOpen(false);
                scrollToSection(e);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}

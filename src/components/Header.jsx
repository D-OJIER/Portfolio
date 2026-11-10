import ThemePicker from './ThemePicker';
import { logo, navLinks } from '../data/portfolio';

const HEADER_OFFSET = 80;

// Port of navbar.js's smooth scroll (which never ran in the original because
// the script threw on the missing #mobileMenuBtn).
function scrollToSection(e) {
  const targetId = e.currentTarget.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  if (!targetSection) return;
  e.preventDefault();
  // Page position of the section (offsetTop would be relative to #mainContent).
  const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({
    top: elementPosition - HEADER_OFFSET,
    behavior: 'smooth',
  });
}

export default function Header({ appearance, applyTheme }) {
  return (
    <div id="mainHeader">
      <div className="logo-section">
        <a href="#" className="logo">
          {logo}
        </a>
        <ThemePicker appearance={appearance} applyTheme={applyTheme} />
      </div>

      <nav className="main-nav">
        <div className="nav-links" id="navLinks">
          {navLinks.map((link) => (
            <a key={link.href} className="headerLink" href={link.href} onClick={scrollToSection}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}

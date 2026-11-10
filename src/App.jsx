import Header from './components/Header';
import Clouds from './components/Clouds';
import CustomCursor from './components/CustomCursor';
import Hero from './components/sections/Hero';
import Profile from './components/sections/Profile';
import Expertise from './components/sections/Expertise';
import Education from './components/sections/Education';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const [appearance, applyTheme] = useTheme();

  return (
    <>
      <Header appearance={appearance} applyTheme={applyTheme} />

      <Clouds appearance={appearance} />

      <div id="mainContent">
        <Hero />

        <div className="theTopics">
          <Profile />
          <Expertise />

          <div className="two-column">
            <Education />
            <Skills />
          </div>

          <Projects />
          <Contact />
        </div>
      </div>

      <CustomCursor />
    </>
  );
}

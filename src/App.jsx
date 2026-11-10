import { useEffect, useRef } from 'react';
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
import StartScreen from './components/arcade/StartScreen';
import Hud from './components/arcade/Hud';
import Toasts from './components/arcade/Toasts';
import AchievementsPanel from './components/arcade/AchievementsPanel';
import FxLayer from './components/arcade/FxLayer';
import CrtOverlay from './components/arcade/CrtOverlay';
import Soapstone from './components/quotes/Soapstone';
import Whisper from './components/quotes/Whisper';
import Bonfire from './components/quotes/Bonfire';
import { useTheme } from './hooks/useTheme';
import { useKonami } from './hooks/useKonami';
import { useSectionTracking } from './hooks/useInView';
import { useGame } from './game/GameContext';
import { SECTION_IDS } from './game/achievements';

export default function App() {
  const [appearance, applyTheme] = useTheme();
  const { actions } = useGame();

  // Achievements for trying themes and switching light/dark.
  const previous = useRef(appearance);
  useEffect(() => {
    const prev = previous.current;
    previous.current = appearance;
    actions.recordTheme(appearance.theme);
    if (prev.isDark !== appearance.isDark) actions.recordModeSwitch();
  }, [appearance, actions]);

  useSectionTracking(SECTION_IDS, actions.sectionSeen);

  useKonami(() => {
    actions.cheat();
    applyTheme('synth', appearance.isDark);
  });

  return (
    <>
      <Header appearance={appearance} applyTheme={applyTheme} />

      <Clouds theme={appearance.theme} />

      <main id="mainContent">
        <Hero />

        <div className="theTopics">
          <Soapstone slot="after-hero" />
          <Profile />
          <Soapstone slot="after-profile" />
          <Expertise />
          <Soapstone slot="after-expertise" />

          <div className="two-column">
            <Education />
            <Skills />
          </div>

          <Soapstone slot="after-columns" />
          <Projects />
          <Soapstone slot="after-projects" />
          <Contact />
          <Bonfire />
        </div>
      </main>

      <Whisper />
      <Hud />
      <FxLayer />
      <Toasts />
      <AchievementsPanel />
      <StartScreen />
      <CrtOverlay />
      <CustomCursor />
    </>
  );
}

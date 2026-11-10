import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  ACHIEVEMENTS,
  HIGH_ROLLER_SCORE,
  POINTS,
  SECTION_IDS,
  SPEEDRUN_MS,
  STANDARD_THEMES,
  WISDOM_COUNT,
} from './achievements';
import { playSound, setSoundEnabled } from './sound';
import { load, save } from './storage';

const GameContext = createContext(null);

export function useGame() {
  return useContext(GameContext);
}

let uid = 0;

/**
 * Holds the arcade layer: score, achievements, toasts, effects and the
 * sound / CRT settings. `actions` is a stable object, so components can use it
 * in effects without re-subscribing on every score change.
 */
export function GameProvider({ children }) {
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(() => Number(load('hiScore', 0)) || 0);
  const [unlocked, setUnlocked] = useState(() => new Set(load('achievements', [])));
  const [toasts, setToasts] = useState([]);
  const [effects, setEffects] = useState([]);
  const [soundOn, setSoundOn] = useState(() => load('sound', false) === true);
  const [crtOn, setCrtOn] = useState(() => load('crt', true) !== false);
  const [secretTheme, setSecretTheme] = useState(() => load('secretTheme', false) === true);
  const [panelOpen, setPanelOpen] = useState(false);

  // Mutable game state that handlers read synchronously.
  const stateRef = useRef(null);
  if (stateRef.current === null) {
    stateRef.current = {
      score: 0,
      hi: hiScore,
      unlocked,
      soundOn,
      crtOn,
      stats: { popped: 0, themes: [], ...load('arcadeStats', {}) },
      sections: new Set(),
      projects: new Set(),
      logoClicks: [],
      quotesRead: new Set(),
      startedAt: Date.now(),
      timers: new Set(),
    };
  }

  useEffect(() => {
    setSoundEnabled(soundOn);
  }, [soundOn]);

  const actions = useMemo(() => {
    const s = stateRef.current;

    const later = (fn, ms) => {
      const id = setTimeout(() => {
        s.timers.delete(id);
        fn();
      }, ms);
      s.timers.add(id);
    };
    const addEffect = (effect, ttl) => {
      const key = ++uid;
      setEffects((list) => [...list, { ...effect, key }]);
      later(() => setEffects((list) => list.filter((e) => e.key !== key)), ttl);
    };
    const saveStats = () => save('arcadeStats', s.stats);

    const a = {
      addScore(points) {
        s.score += points;
        setScore(s.score);
        if (s.score > s.hi) {
          s.hi = s.score;
          setHiScore(s.hi);
          save('hiScore', s.hi);
        }
        if (s.score >= HIGH_ROLLER_SCORE) a.unlock('high-roller');
      },

      unlock(id) {
        if (s.unlocked.has(id)) return;
        const def = ACHIEVEMENTS.find((x) => x.id === id);
        if (!def) return;
        s.unlocked = new Set(s.unlocked).add(id);
        setUnlocked(s.unlocked);
        save('achievements', [...s.unlocked]);

        const key = ++uid;
        setToasts((list) => [...list, { ...def, key }]);
        later(() => setToasts((list) => list.filter((t) => t.key !== key)), 4200);
        playSound('achievement');
        a.addScore(POINTS.achievement);

        const allOthers = ACHIEVEMENTS.every((x) => x.id === 'completionist' || s.unlocked.has(x.id));
        if (id !== 'completionist' && allOthers) later(() => a.unlock('completionist'), 1500);
      },

      start() {
        s.startedAt = Date.now();
        playSound('start');
        a.unlock('insert-coin');
      },

      popCloud(x, y) {
        playSound('pop');
        addEffect({ type: 'burst', x, y }, 800);
        addEffect({ type: 'popup', x, y, text: `+${POINTS.cloud}` }, 900);
        a.addScore(POINTS.cloud);
        s.stats.popped += 1;
        saveStats();
        a.unlock('first-pop');
        if (s.stats.popped >= 10) a.unlock('cloud-buster');
        if (s.stats.popped >= 50) a.unlock('storm-chaser');
      },

      recordTheme(theme) {
        if (!STANDARD_THEMES.includes(theme) || s.stats.themes.includes(theme)) return;
        s.stats.themes = [...s.stats.themes, theme];
        saveStats();
        if (s.stats.themes.length === STANDARD_THEMES.length) a.unlock('chameleon');
      },

      recordModeSwitch() {
        a.unlock('lights-out');
      },

      sectionSeen(id) {
        s.sections.add(id);
        if (id === 'contact' && Date.now() - s.startedAt <= SPEEDRUN_MS) a.unlock('speedrunner');
        if (SECTION_IDS.every((x) => s.sections.has(x))) a.unlock('explorer');
      },

      projectSeen(name, total) {
        s.projects.add(name);
        if (s.projects.size >= total) a.unlock('level-select');
      },

      logoClick() {
        const now = Date.now();
        s.logoClicks = [...s.logoClicks.filter((t) => now - t < 2000), now];
        if (s.logoClicks.length >= 5) a.unlock('button-masher');
      },

      quoteRead(text) {
        s.quotesRead.add(text);
        if (s.quotesRead.size >= WISDOM_COUNT) a.unlock('wanderer');
      },

      pokeWanderer() {
        a.unlock('fellow-traveller');
      },

      rest() {
        playSound('coin');
        a.unlock('bonfire-lit');
      },

      contactClick() {
        a.unlock('player-two');
      },

      toggleSound() {
        s.soundOn = !s.soundOn;
        setSoundEnabled(s.soundOn);
        setSoundOn(s.soundOn);
        save('sound', s.soundOn);
        if (s.soundOn) {
          playSound('coin');
          a.unlock('sound-check');
        }
      },

      toggleCrt() {
        s.crtOn = !s.crtOn;
        setCrtOn(s.crtOn);
        save('crt', s.crtOn);
        playSound('click');
        a.unlock('degauss');
      },

      openPanel() {
        setPanelOpen(true);
        a.unlock('trophy-room');
      },

      closePanel() {
        setPanelOpen(false);
      },

      cheat() {
        setSecretTheme(true);
        save('secretTheme', true);
        playSound('secret');
        addEffect({ type: 'coins' }, 3400);
        a.unlock('cheat-code');
      },
    };
    return a;
  }, []);

  // Clear pending timers on unmount.
  useEffect(() => {
    const timers = stateRef.current.timers;
    return () => {
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, []);

  const value = useMemo(
    () => ({ actions, score, hiScore, unlocked, toasts, effects, soundOn, crtOn, secretTheme, panelOpen }),
    [actions, score, hiScore, unlocked, toasts, effects, soundOn, crtOn, secretTheme, panelOpen],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

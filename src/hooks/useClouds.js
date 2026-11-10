import { useCallback, useEffect, useRef, useState } from 'react';

// Port of clouds.js. Theme -> cloud image folder (under public/Images/).
export const cloudSets = {
  gold: 'orange_2',
  green: 'fiolet_2',
  blue: 'blue_2',
  red: 'pink_2',
};

const MAX_CLOUDS = 5;
const MIN_DURATION = 40;
const MAX_DURATION = 80;
const BASE_CLOUD_SIZE = 100;
// The original page started two CloudGenerators (one in clouds.js, one in
// theme.js) sharing the same container. That is kept on purpose so the
// background looks the same: each generator adds MAX_CLOUDS clouds, 10 in
// total. The .clouds animation is infinite, so they stay on screen; the
// refill logic only kicks in if an image fails to load.
const GENERATOR_COUNT = 2;

function getResponsiveSize() {
  const width = window.innerWidth;
  if (width < 768) return BASE_CLOUD_SIZE * 0.6;
  if (width < 1024) return BASE_CLOUD_SIZE * 0.8;
  return BASE_CLOUD_SIZE;
}

export function cloudSrc(theme, number) {
  return `Images/${cloudSets[theme]}/2.${number}.png`;
}

let nextCloudId = 0;

export function useClouds(appearance) {
  const [clouds, setClouds] = useState([]);
  const [size, setSize] = useState(getResponsiveSize);
  // Mirror of `clouds` so timers can read the current count synchronously,
  // like the original did with getElementsByClassName('clouds').length.
  const cloudsRef = useRef([]);
  const isDarkRef = useRef(appearance.isDark);
  isDarkRef.current = appearance.isDark;
  // Pending timeouts from addNewCloud(); cleared on unmount.
  const timeoutsRef = useRef(new Set());

  const commit = useCallback((next) => {
    cloudsRef.current = next;
    setClouds(next);
  }, []);

  const later = useCallback((fn, ms) => {
    const id = setTimeout(() => {
      timeoutsRef.current.delete(id);
      fn();
    }, ms);
    timeoutsRef.current.add(id);
  }, []);

  const generateRandomCloud = useCallback(() => {
    const cloud = {
      id: nextCloudId++,
      number: Math.floor(Math.random() * 67) + 1,
      duration: Math.random() * (MAX_DURATION - MIN_DURATION) + MIN_DURATION,
      yPos: Math.random() * (window.innerHeight * 0.8),
      direction: Math.random() < 0.5 ? 'floatLeftToRight' : 'floatRightToLeft',
      opacity: isDarkRef.current ? 0.2 : 0.4,
    };
    commit([...cloudsRef.current, cloud]);
  }, [commit]);

  const addNewCloud = useCallback(() => {
    if (cloudsRef.current.length < MAX_CLOUDS) {
      later(generateRandomCloud, Math.random() * 3000);
    }
  }, [later, generateRandomCloud]);

  const removeCloud = useCallback(
    (id) => {
      commit(cloudsRef.current.filter((c) => c.id !== id));
      addNewCloud();
    },
    [commit, addNewCloud],
  );

  // start()/stop() for each generator.
  useEffect(() => {
    const timeouts = timeoutsRef.current;
    const intervals = [];
    for (let g = 0; g < GENERATOR_COUNT; g++) {
      for (let i = 0; i < MAX_CLOUDS; i++) {
        later(generateRandomCloud, i * 2000);
      }
      intervals.push(setInterval(addNewCloud, 4000));
    }
    return () => {
      intervals.forEach(clearInterval);
      timeouts.forEach(clearTimeout);
      timeouts.clear();
    };
  }, [later, generateRandomCloud, addNewCloud]);

  // updateCloudSizes() on resize.
  useEffect(() => {
    const onResize = () => setSize(getResponsiveSize());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // updateOpacity(): every theme/mode change re-applies opacity to the clouds
  // already on screen (0.7 light / 0.2 dark). New clouds start at 0.4 / 0.2,
  // as in the original. Skipped for the initial appearance, when the original
  // had no clouds yet.
  const firstAppearance = useRef(appearance);
  useEffect(() => {
    if (appearance === firstAppearance.current) return;
    const opacity = appearance.isDark ? 0.2 : 0.7;
    commit(cloudsRef.current.map((c) => ({ ...c, opacity })));
  }, [appearance, commit]);

  return { clouds, size, removeCloud };
}

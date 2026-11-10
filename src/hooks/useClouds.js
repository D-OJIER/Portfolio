import { useCallback, useEffect, useRef, useState } from 'react';

// Theme -> cloud image folder (under public/Images/).
export const cloudSets = {
  gold: 'orange_2',
  green: 'fiolet_2',
  blue: 'blue_2',
  red: 'pink_2',
  synth: 'fiolet_2',
};

// The original site ran two generators of 5 clouds each; one generator of 10
// gives the same background.
const TOTAL_CLOUDS = 10;
const MIN_DURATION = 40;
const MAX_DURATION = 80;
const BASE_CLOUD_SIZE = 100;

function getResponsiveSize() {
  const width = window.innerWidth;
  if (width < 768) return BASE_CLOUD_SIZE * 0.6;
  if (width < 1024) return BASE_CLOUD_SIZE * 0.8;
  return BASE_CLOUD_SIZE;
}

export function cloudSrc(theme, number) {
  return `Images/${cloudSets[theme] ?? cloudSets.gold}/2.${number}.png`;
}

let nextCloudId = 0;

export function useClouds() {
  const [clouds, setClouds] = useState([]);
  const [size, setSize] = useState(getResponsiveSize);
  // Mirror of `clouds` so timers can read the current count synchronously.
  const cloudsRef = useRef([]);
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
    if (cloudsRef.current.length >= TOTAL_CLOUDS) return;
    const cloud = {
      id: nextCloudId++,
      number: Math.floor(Math.random() * 67) + 1,
      duration: Math.random() * (MAX_DURATION - MIN_DURATION) + MIN_DURATION,
      yPos: Math.random() * (window.innerHeight * 0.8),
      direction: Math.random() < 0.5 ? 'floatLeftToRight' : 'floatRightToLeft',
    };
    commit([...cloudsRef.current, cloud]);
  }, [commit]);

  const addNewCloud = useCallback(() => {
    if (cloudsRef.current.length < TOTAL_CLOUDS) {
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

  useEffect(() => {
    const timeouts = timeoutsRef.current;
    // Two clouds every 2 s until the sky is full, like the original.
    for (let i = 0; i < TOTAL_CLOUDS; i++) {
      later(generateRandomCloud, Math.floor(i / 2) * 2000);
    }
    const interval = setInterval(addNewCloud, 4000);
    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
      timeouts.clear();
      commit([]);
    };
  }, [later, generateRandomCloud, addNewCloud, commit]);

  useEffect(() => {
    const onResize = () => setSize(getResponsiveSize());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return { clouds, size, removeCloud };
}

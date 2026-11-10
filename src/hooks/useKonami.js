import { useEffect, useRef } from 'react';

const CODE = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a',
];

// Calls `onUnlock` when ↑ ↑ ↓ ↓ ← → ← → B A is typed.
export function useKonami(onUnlock) {
  const callbackRef = useRef(onUnlock);
  useEffect(() => {
    callbackRef.current = onUnlock;
  });

  useEffect(() => {
    let index = 0;
    const onKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (key === CODE[index]) {
        index += 1;
        if (index === CODE.length) {
          index = 0;
          callbackRef.current();
        }
      } else {
        index = key === CODE[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}

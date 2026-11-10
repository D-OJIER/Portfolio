import { useEffect, useRef } from 'react';
import { useClouds, cloudSrc } from '../hooks/useClouds';
import { useGame } from '../game/GameContext';

// Clicks on these never count as shots: they are UI or sit on top of the clouds.
const BLOCKERS =
  '.pixel-border, #mainHeader, #hud, .toasts, .ach-backdrop, .start-screen, a, button, input, label';
// Shrink the hit box a little: the cloud images have transparent padding.
const HIT_INSET = 0.15;

export default function Clouds({ theme }) {
  const { clouds, size, removeCloud } = useClouds();
  const { actions } = useGame();
  const containerRef = useRef(null);

  // Shoot clouds: hit-test clicks against the cloud images (they have
  // pointer-events: none so they never block the page).
  useEffect(() => {
    const onClick = (e) => {
      if (e.button !== 0 || e.target.closest(BLOCKERS)) return;
      const { clientX: x, clientY: y } = e;
      for (const img of containerRef.current.querySelectorAll('.clouds')) {
        const r = img.getBoundingClientRect();
        const dx = r.width * HIT_INSET;
        const dy = r.height * HIT_INSET;
        if (x >= r.left + dx && x <= r.right - dx && y >= r.top + dy && y <= r.bottom - dy) {
          removeCloud(Number(img.dataset.id));
          actions.popCloud(x, y);
          return;
        }
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [removeCloud, actions]);

  return (
    <div id="backgroundHeader" ref={containerRef}>
      {clouds.map((cloud) => {
        const src = cloudSrc(theme, cloud.number);
        return (
          <img
            key={cloud.id}
            data-id={cloud.id}
            className="clouds"
            src={src}
            alt=""
            style={{
              width: `${size}px`,
              '--duration': `${cloud.duration}s`,
              '--ypos': `${cloud.yPos}px`,
              '--animation-name': cloud.direction,
            }}
            onError={() => {
              console.error(`Failed to load cloud image: ${src}`);
              removeCloud(cloud.id);
            }}
          />
        );
      })}
    </div>
  );
}

import { useEffect, useRef } from 'react';
import { playSound } from '../game/sound';

const INTERACTIVE_SELECTOR = 'a, button, .pixel-button, .color-btn, input, label, .headerLink';
const FINE_POINTER = '(hover: hover) and (pointer: fine)';

// Crosshair cursor. Position is written straight to the DOM (no React state)
// so mouse movement never re-renders. Also plays the hover/click blips.
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const scopeRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const scope = scopeRef.current;
    const finePointer = window.matchMedia(FINE_POINTER).matches;
    let lastX = 0;
    let lastY = 0;
    let hovered = null;

    const updateCursor = (e) => {
      // Hidden until the first move so it never sits in the top-left corner.
      if (cursor.style.display !== 'flex') cursor.style.display = 'flex';
      const velocityX = e.clientX - lastX;
      const velocityY = e.clientY - lastY;
      const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

      const currentX = e.clientX - cursor.offsetWidth / 2;
      const currentY = e.clientY - cursor.offsetHeight / 2;
      cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;

      const angle = (Math.atan2(velocityY, velocityX) * 180) / Math.PI;
      const stretch = Math.min(speed / 10, 2);
      scope.style.transform = `rotate(${angle}deg) scale(${1 + stretch * 0.1}, ${1 - stretch * 0.05})`;

      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onMouseDown = () => cursor.classList.add('clicking');
    const onMouseUp = () => cursor.classList.remove('clicking');
    const onDocLeave = () => {
      cursor.style.display = 'none';
    };
    // Delegated, so elements added later (HUD, dialogs) also get the hover state.
    const onOver = (e) => {
      const el = e.target.closest?.(INTERACTIVE_SELECTOR) ?? null;
      if (el === hovered) return;
      hovered = el;
      cursor.classList.toggle('hovering', Boolean(el));
      if (el) playSound('hover');
    };
    const onClick = (e) => {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) playSound('click');
    };

    if (finePointer) {
      document.addEventListener('mousemove', updateCursor);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
      document.documentElement.addEventListener('mouseleave', onDocLeave);
      document.addEventListener('mouseover', onOver);
    }
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onDocLeave);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <div id="customCursor" ref={cursorRef} aria-hidden="true">
      <div className="cursor-scope" ref={scopeRef}>
        <div className="scope-ring"></div>
        <div className="scope-crosshair">
          <div className="scope-line horizontal"></div>
          <div className="scope-line vertical"></div>
          <div className="scope-dot"></div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR = 'a, button, .pixel-button, .color-btn, input, .headerLink';

// Port of cursor.js. Position and transforms are written straight to the DOM
// (no React state) so mouse movement never triggers a re-render.
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const scopeRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const scope = scopeRef.current;
    let lastX = 0;
    let lastY = 0;

    const updateCursor = (e) => {
      const velocityX = e.clientX - lastX;
      const velocityY = e.clientY - lastY;
      const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

      const currentX = e.clientX - cursor.offsetWidth / 2;
      const currentY = e.clientY - cursor.offsetHeight / 2;
      cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;

      // "Motion blur" effect based on velocity
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
    const onDocEnter = () => {
      cursor.style.display = 'block';
    };
    const onHover = () => cursor.classList.add('hovering');
    const onUnhover = () => cursor.classList.remove('hovering');

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onDocLeave);
    document.addEventListener('mouseenter', onDocEnter);
    // In the original, the browser's load-time mouseenter reached this
    // listener (plain scripts ran before it fired). React mounts later and can
    // miss it, so apply the same result if the pointer is already on the page.
    if (document.documentElement.matches(':hover')) onDocEnter();

    // The page is static, so the interactive elements all exist once mounted.
    const interactive = document.querySelectorAll(INTERACTIVE_SELECTOR);
    interactive.forEach((el) => {
      el.addEventListener('mouseover', onHover);
      el.addEventListener('mouseleave', onUnhover);
    });

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onDocLeave);
      document.removeEventListener('mouseenter', onDocEnter);
      interactive.forEach((el) => {
        el.removeEventListener('mouseover', onHover);
        el.removeEventListener('mouseleave', onUnhover);
      });
    };
  }, []);

  return (
    <div id="customCursor" ref={cursorRef}>
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

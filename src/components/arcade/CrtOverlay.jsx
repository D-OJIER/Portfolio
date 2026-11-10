import { useGame } from '../../game/GameContext';

// Scanlines, vignette and a slow rolling band. Purely decorative.
export default function CrtOverlay() {
  const { crtOn } = useGame();
  return (
    <div className={crtOn ? 'crt on' : 'crt'} aria-hidden="true">
      <div className="crt-roll" />
    </div>
  );
}

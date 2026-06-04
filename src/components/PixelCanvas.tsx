import { usePixelCanvas } from '@/hooks/usePixelCanvas';
import { useScrollBackground } from '@/hooks/useScrollBackground';

export function PixelCanvas() {
  const canvasRef = usePixelCanvas();
  const { canvasOpacity } = useScrollBackground();

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: canvasOpacity,
        transition: 'opacity 0.1s linear',
      }}
    />
  );
}

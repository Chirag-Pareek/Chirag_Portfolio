import { useEffect, useRef, useState } from 'react';

type TrailPoint = {
  x: number;
  y: number;
  id: number;
};

const TRAIL_LENGTH = 8;

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const rafId = useRef<number>(0);
  const frameRef = useRef(0);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    function onMouseMove(e: MouseEvent) {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        isHoveringRef.current = true;
        setIsHovering(true);
      }
    }

    function onMouseOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        isHoveringRef.current = false;
        setIsHovering(false);
      }
    }

    function animate() {
      rafId.current = requestAnimationFrame(animate);

      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15;

      const size = isHoveringRef.current ? 18 : 12;
      const offset = size / 2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x - offset}px, ${posRef.current.y - offset}px)`;
        cursorRef.current.style.width = `${size}px`;
        cursorRef.current.style.height = `${size}px`;
      }

      frameRef.current += 1;
      if (frameRef.current % 2 === 0) {
        setTrail((prev) => {
          const next = [
            { x: posRef.current.x, y: posRef.current.y, id: Date.now() + frameRef.current },
            ...prev,
          ];
          return next.slice(0, TRAIL_LENGTH);
        });
      }
    }

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseover', onMouseOver);
    document.body.addEventListener('mouseout', onMouseOut);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseover', onMouseOver);
      document.body.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[9998] hidden md:block" aria-hidden="true">
        {trail.map((point, index) => {
          const strength = 1 - index / TRAIL_LENGTH;
          return (
            <span
              key={point.id}
              className={`absolute rounded-sm ${isHovering ? 'bg-[#D87D15]' : 'bg-[#E8943A]'}`}
              style={{
                width: isHovering ? `${12 * strength}px` : `${10 * strength}px`,
                height: isHovering ? `${12 * strength}px` : `${10 * strength}px`,
                left: point.x,
                top: point.y,
                opacity: isHovering ? 0.65 * strength : 0.16 * strength,
                transform: 'translate(-50%, -50%)',
                filter: isHovering ? `blur(${(1 - strength) * 0.8}px)` : `blur(${(1 - strength) * 2}px)`,
              }}
            />
          );
        })}
      </div>

      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '12px',
          height: '12px',
          backgroundColor: '#E8943A',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease',
          imageRendering: 'pixelated',
        }}
        aria-hidden="true"
      />
    </>
  );
}

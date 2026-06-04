import { useEffect, useRef, useState } from 'react';

type HistoryPoint = {
  x: number;
  y: number;
  time: number;
};

const TRAIL_LENGTH = 8;

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const rafId = useRef<number>(0);
  const scaleRef = useRef(1);
  const lastTimeRef = useRef(0);
  const historyRef = useRef<HistoryPoint[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    if (isTouch) return;

    historyRef.current = [];
    lastTimeRef.current = 0;

    function onMouseMove(e: MouseEvent) {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer, [class*="cursor-pointer"]')) {
        isHoveringRef.current = true;
        setIsHovering(true);
      }
    }

    // Capture standard drag-out/leaves
    function onMouseOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer, [class*="cursor-pointer"]')) {
        isHoveringRef.current = false;
        setIsHovering(false);
      }
    }

    function animate(time: number) {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }
      // Clamp delta time to avoid huge leaps (e.g. after tab suspension)
      const dt = Math.min(time - lastTimeRef.current, 100);
      lastTimeRef.current = time;

      // Make interpolation factors frame-rate independent.
      // Based on typical 60fps (16.67ms) factors:
      // pos factor is 0.25, scale factor is 0.15
      const posFactor = 1 - Math.pow(0.75, dt / 16.67);
      const scaleFactor = 1 - Math.pow(0.85, dt / 16.67);

      posRef.current.x += (targetRef.current.x - posRef.current.x) * posFactor;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * posFactor;

      const targetScale = isHoveringRef.current ? 1.5 : 1;
      scaleRef.current += (targetScale - scaleRef.current) * scaleFactor;

      // Update main cursor dot transform directly (using translate + scale)
      // This is a composite-only change, bypassing heavy style recalculations
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x - 6}px, ${posRef.current.y - 6}px) scale(${scaleRef.current})`;
      }

      // Add coordinates to history
      historyRef.current.unshift({ x: posRef.current.x, y: posRef.current.y, time });
      
      const maxDelay = (TRAIL_LENGTH + 1) * 15; // 135ms history buffer
      while (
        historyRef.current.length > 0 && 
        time - historyRef.current[historyRef.current.length - 1].time > maxDelay + 50
      ) {
        historyRef.current.pop();
      }

      // Update trail spans transform directly using time-based history interpolation.
      // This makes the trail spacing feel identical across different refresh rates (60Hz vs 144Hz+).
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const trailEl = trailRefs.current[i];
        if (trailEl) {
          // Delay each dot by a multiple of 15ms
          const targetTime = time - (i + 1) * 15;
          let point = posRef.current;

          const history = historyRef.current;
          if (history.length > 0) {
            let index = 0;
            while (index < history.length && history[index].time > targetTime) {
              index++;
            }

            if (index === 0) {
              point = history[0];
            } else if (index >= history.length) {
              point = history[history.length - 1];
            } else {
              const pNew = history[index - 1];
              const pOld = history[index];
              const tDiff = pNew.time - pOld.time;
              if (tDiff > 0) {
                const pct = (pNew.time - targetTime) / tDiff;
                point = {
                  x: pNew.x + (pOld.x - pNew.x) * pct,
                  y: pNew.y + (pOld.y - pNew.y) * pct,
                };
              } else {
                point = pOld;
              }
            }
          }
          
          trailEl.style.transform = `translate(${point.x}px, ${point.y}px) translate(-50%, -50%)`;
          trailEl.style.display = 'block';
        }
      }

      rafId.current = requestAnimationFrame(animate);
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
      {/* Trail Points overlay */}
      <div className="pointer-events-none fixed inset-0 z-[9998] hidden md:block" aria-hidden="true">
        {Array.from({ length: TRAIL_LENGTH }).map((_, index) => {
          const strength = 1 - index / TRAIL_LENGTH;
          return (
            <span
              key={index}
              ref={(el) => {
                trailRefs.current[index] = el;
              }}
              className={`absolute rounded-sm ${isHovering ? 'bg-[#D87D15]' : 'bg-[#E8943A]'}`}
              style={{
                display: 'none',
                position: 'fixed',
                left: 0,
                top: 0,
                width: isHovering ? `${12 * strength}px` : `${10 * strength}px`,
                height: isHovering ? `${12 * strength}px` : `${10 * strength}px`,
                opacity: isHovering ? 0.65 * strength : 0.16 * strength,
                filter: isHovering ? `blur(${(1 - strength) * 0.8}px)` : `blur(${(1 - strength) * 2}px)`,
                pointerEvents: 'none',
                zIndex: 9998,
              }}
            />
          );
        })}
      </div>

      {/* Main Cursor Dot */}
      <div
        ref={cursorRef}
        className="hidden md:block"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '12px',
          height: '12px',
          backgroundColor: isHovering ? '#D87D15' : '#E8943A',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'background-color 0.15s ease',
          imageRendering: 'pixelated',
        }}
        aria-hidden="true"
      />
    </>
  );
}

import { useState, useEffect, useRef, useCallback } from 'react';

export function useScrollBackground() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [canvasOpacity, setCanvasOpacity] = useState(1);
  const rafId = useRef<number>(0);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    lastScrollY.current = window.scrollY;

    if (rafId.current === 0) {
      rafId.current = requestAnimationFrame(() => {
        const scrollY = lastScrollY.current;
        const vh = window.innerHeight;

        setIsScrolled(scrollY > 100);
        setCanvasOpacity(Math.max(0.2, 1 - (scrollY / vh) * 0.8));

        rafId.current = 0;
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll]);

  return { isScrolled, canvasOpacity };
}

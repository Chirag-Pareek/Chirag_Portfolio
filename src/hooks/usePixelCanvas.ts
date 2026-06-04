import { useRef, useEffect } from 'react';

interface PixelParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

interface SparkleParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  phase: number;
}

interface DotParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

interface TrailParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  life: number;
}

const COLORS = ['#E8943A', '#F5D9A8', '#FFD27A', '#8B8175'];
const SPARKLE_COLORS = ['#FFD27A', '#FFFFFF'];

export function usePixelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.scale(dpr, dpr);
    }

    resize();

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Draw static gradient background
      ctx.fillStyle = '#FFFBF5';
      ctx.fillRect(0, 0, width, height);
      return;
    }

    // Initialize pixel squares
    const squares: PixelParticle[] = [];
    for (let i = 0; i < 150; i++) {
      squares.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.floor(2 + Math.random() * 4),
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: -(0.2 + Math.random() * 0.6),
        opacity: 0.15 + Math.random() * 0.35,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    // Initialize sparkle crosses
    const sparkles: SparkleParticle[] = [];
    for (let i = 0; i < 30; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 4 + Math.random() * 4,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: -(0.1 + Math.random() * 0.3),
        opacity: 0.3 + Math.random() * 0.4,
        color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Initialize tiny dots
    const dots: DotParticle[] = [];
    for (let i = 0; i < 80; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random(),
        opacity: 0.3 + Math.random() * 0.3,
      });
    }

    // Trail particles
    const trailParticles: TrailParticle[] = [];

    // Mouse tracking
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let currentMouseX = -1000;
    let currentMouseY = -1000;

    function handleMouseMove(e: MouseEvent) {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;

      // Spawn trail particles
      if (Math.random() > 0.3) {
        trailParticles.push({
          x: e.clientX,
          y: e.clientY,
          size: 2,
          opacity: 0.6 + Math.random() * 0.4,
          life: 30,
        });
      }
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resize);

    let animationFrameId: number;

    function animate(timestamp: number) {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.1;
      currentMouseY += (targetMouseY - currentMouseY) * 0.1;

      ctx!.clearRect(0, 0, width, height);

      // Render dots (background layer)
      for (const dot of dots) {
        dot.y -= 0.05;
        if (dot.y < -5) dot.y = height + 5;

        ctx!.globalAlpha = dot.opacity;
        ctx!.fillStyle = '#E8E0D4';
        ctx!.fillRect(Math.floor(dot.x), Math.floor(dot.y), dot.size, dot.size);
      }

      // Render pixel squares
      for (const p of squares) {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Mouse repulsion
        const dx = p.x - currentMouseX;
        const dy = p.y - currentMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150 * 0.5;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        ctx!.globalAlpha = p.opacity;
        ctx!.fillStyle = p.color;
        ctx!.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
      }

      // Render sparkle crosses
      for (const s of sparkles) {
        s.x += s.speedX;
        s.y += s.speedY;

        if (s.y < -10) s.y = height + 10;
        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;

        // Twinkle effect
        const twinkle = Math.sin(timestamp * 0.003 + s.phase) * 0.3 + 0.7;

        ctx!.globalAlpha = s.opacity * twinkle;
        ctx!.strokeStyle = s.color;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(s.x - s.size, s.y);
        ctx!.lineTo(s.x + s.size, s.y);
        ctx!.moveTo(s.x, s.y - s.size);
        ctx!.lineTo(s.x, s.y + s.size);
        ctx!.stroke();
      }

      // Render trail particles
      for (let i = trailParticles.length - 1; i >= 0; i--) {
        const t = trailParticles[i];
        t.life--;
        t.opacity *= 0.95;

        if (t.life <= 0 || t.opacity < 0.01) {
          trailParticles.splice(i, 1);
          continue;
        }

        ctx!.globalAlpha = t.opacity;
        ctx!.fillStyle = '#E8943A';
        ctx!.fillRect(Math.floor(t.x), Math.floor(t.y), t.size, t.size);
      }

      ctx!.globalAlpha = 1;
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return canvasRef;
}

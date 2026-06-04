import { useEffect, useMemo, useRef, useState } from 'react';
import catSprite from '../../spreadhseet/BlackCatSlimeFree/BlackCatSlimeFree/Idle.png';
import demonicCatSprite from '../../spreadhseet/DemonicCatSlimeFree/DemonicCatSlimeFree/Idle.png';
import fishSprite from '../../spreadhseet/fish_transparent.png';
import { playClickSound, playCoinSound, playOpenSound, playCloseSound, getMuteState, toggleMute } from '@/lib/sounds';

type Point = {
  x: number;
  y: number;
};

type Coin = Point & {
  id: number;
};

type MapNode = Point & {
  label: string;
  subtitle: string;
  date: string;
  image: string;
  links: { label: string; url: string }[];
  description: string;
  features?: string[];
  tech: string;
};

type Direction = 'left' | 'right' | 'up' | 'down';

const INITIAL_PLAYER: Point = { x: 78, y: 43 };
const INITIAL_COINS: Coin[] = [
  { id: 1, x: 35, y: 34 },
  { id: 2, x: 58, y: 30 },
  { id: 3, x: 53, y: 66 },
  { id: 4, x: 77, y: 60 },
  { id: 5, x: 25, y: 78 },
  { id: 6, x: 86, y: 28 },
  { id: 7, x: 18, y: 22 },
  { id: 8, x: 45, y: 82 },
  { id: 9, x: 90, y: 75 },
  { id: 10, x: 68, y: 48 },
  { id: 11, x: 30, y: 15 },
];

const MAP_NODES: MapNode[] = [
  {
    label: 'KNOVI',
    subtitle: 'Fullstack // AI Quiz Platform',
    date: '2023 - 2024',
    x: 40,
    y: 50,
    image: '/assets/knovi-icon.png',
    links: [
      { label: 'Live Website ↗', url: 'https://knovi-web.vercel.app/' },
      { label: 'Download APK ↗', url: 'https://github.com/Chirag-Pareek/Knovi-WebAndApp/releases/download/v1.0/Knovi.apk' },
      { label: 'GitHub ↗', url: 'https://github.com/Chirag-Pareek/Knovi-WebAndApp' }
    ],
    description: 'An AI-powered quiz and interview simulation platform featuring interactive vector animations. It helps users test their real-world knowledge through advanced, topic-based assessments.',
    features: [
      'Full-stack platform: React website and Flutter mobile app powered by Groq AI API and Supabase backend.',
      'Interactive UI: Features advanced DOM animations via Framer Motion and interactive vector animations using Rive.',
      'Core features: Dynamic, topic-based assessments that test real-world knowledge with robust state management via Zustand.'
    ],
    tech: 'React, Flutter, Supabase, Groq API, Zustand',
  },
  {
    label: 'MIMICLY',
    subtitle: 'AI Agent // Chat Assistant',
    date: '2024 - 2025',
    x: 63,
    y: 22,
    image: '/assets/mimicly-icon.png',
    links: [
      { label: 'Live Website ↗', url: 'https://mimicly.netlify.app/' },
      { label: 'GitHub ↗', url: 'https://github.com/Chirag-Pareek/Mimicly-AI' }
    ],
    description: 'A persona-based AI assistant that generates smart replies for messaging apps via an overlay bubble system. Instantly reply like a friend, partner, or professional.',
    features: [
      'AI-powered assistant: Generates context-aware smart replies across major messaging apps via an overlay UI bubble.',
      'Custom Personas: Allows users to tailor replies by selecting personas (e.g., Boss, Friend) for perfect tone matching.',
      'High-performance Landing Page: Built natively with vanilla HTML, CSS, and JS, featuring a custom 3D curved screenshot carousel and animated dark/light modes.'
    ],
    tech: 'React, TypeScript, NestJS, Supabase',
  },

  {
    label: 'LINKEDIN TRANSLATOR',
    subtitle: 'Browser Extension // AI Tool',
    date: '2025 - 2026',
    x: 80,
    y: 68,
    image: '/assets/linkedin-translator-icon.png',
    links: [],
    description: 'A production Chrome Extension that uses the Groq API to simplify LinkedIn posts into honest English, featuring server-side caching and daily usage limits.',
    features: [
      'Content Simplifier: Manifest V3 extension using a MutationObserver to dynamically simplify LinkedIn posts into honest English via Groq AI.',
      'Scalable Backend: Node.js API hosted on Vercel with Firebase/Firestore integration for caching and enforcing daily usage limits.',
      'Monetization integration: Supports a premium tier using LemonSqueezy checkout and secure billing webhooks.'
    ],
    tech: 'JavaScript, Vercel API, Firebase, Groq',
  },
  {
    label: 'GITDOCS',
    subtitle: 'Web Tool // Developer Tools',
    date: '2023 - 2024',
    x: 75,
    y: 35,
    image: '/assets/gitdocs-mascot.png',
    links: [
      { label: 'Live Website ↗', url: 'https://git-docs-one.vercel.app' },
      { label: 'GitHub ↗', url: 'https://github.com/Chirag-Pareek/GitDocs-' }
    ],
    description: 'GitDocs+ – All GitHub commands in one modern, accessible interface with instant search and one-click copy. No more memorizing complex syntax.',
    features: [
      'Modern Web Interface: Complete GitHub command reference built with bleeding-edge React 19, TypeScript, and Vite.',
      'Accessible UI: Styled with TailwindCSS and Radix UI primitives, featuring instant search and one-click copy functionality.',
      'Advanced features: Implements data visualization with Recharts, sliding carousels with Embla, and form validation using Zod and React Hook Form.'
    ],
    tech: 'React 19, TypeScript, TailwindCSS, Radix UI',
  },
  {
    label: 'WATCHFLO',
    subtitle: 'Mobile App // Entertainment',
    date: '2024 - 2025',
    x: 18,
    y: 55,
    image: '/assets/watchflo-icon.png',
    links: [
      { label: 'Live Website ↗', url: 'https://watchfloapp.com' },
      { label: 'GitHub ↗', url: 'https://github.com/Chirag-Pareek/WatchFlo' }
    ],
    description: 'A cross-platform mobile and web application for tracking and streaming watch progress seamlessly across devices, featuring OTA updates.',
    features: [
      'Cross-platform tracking: A mobile and web application for tracking and streaming watch progress seamlessly across devices.',
      'Robust Mobile App: Built with Flutter and Dart, compiling natively to iOS, Android, and Desktop platforms.',
      'OTA Updates: Integrates Shorebird for over-the-air deployment, enabling instant patches directly to production without app store reviews.'
    ],
    tech: 'Dart, Flutter, Shorebird, React, TailwindCSS',
  },
];

const KEY_TO_VECTOR: Record<string, Point> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  a: { x: -1, y: 0 },
  s: { x: 0, y: 1 },
  d: { x: 1, y: 0 },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function pixelDistance(a: Point, b: Point) {
  if (typeof window === 'undefined') return Math.hypot(a.x - b.x, a.y - b.y);
  const axPx = (a.x / 100) * window.innerWidth;
  const ayPx = (a.y / 100) * window.innerHeight;
  const bxPx = (b.x / 100) * window.innerWidth;
  const byPx = (b.y / 100) * window.innerHeight;
  return Math.hypot(axPx - bxPx, ayPx - byPx);
}

function isBehindCard(xPercent: number, yPercent: number): boolean {
  if (typeof window === 'undefined') return false;
  if (window.innerWidth < 768) return false;
  
  const xPx = (xPercent / 100) * window.innerWidth;
  const yPx = (yPercent / 100) * window.innerHeight;
  
  return xPx < 400 && yPx < 370;
}

function isNearProjectNode(xPercent: number, yPercent: number): boolean {
  return MAP_NODES.some((node) => {
    const dist = Math.hypot(xPercent - node.x, yPercent - node.y);
    return dist < 6.0;
  });
}

function randomPoint(): Point {
  let pt = {
    x: 16 + Math.random() * 72,
    y: 18 + Math.random() * 62,
  };
  let attempts = 0;
  while ((isBehindCard(pt.x, pt.y) || isNearProjectNode(pt.x, pt.y)) && attempts < 100) {
    pt = {
      x: 16 + Math.random() * 72,
      y: 18 + Math.random() * 62,
    };
    attempts++;
  }
  return pt;
}

function createCoin(id: number): Coin {
  return {
    id,
    ...randomPoint(),
  };
}

function directionFromVector(vector: Point, fallback: Direction): Direction {
  if (Math.abs(vector.x) > Math.abs(vector.y)) {
    return vector.x < 0 ? 'left' : 'right';
  }

  if (Math.abs(vector.y) > 0.05) {
    return vector.y < 0 ? 'up' : 'down';
  }

  return fallback;
}

function CatSprite({ direction, isEating }: { direction: Direction; isEating: boolean }) {
  const flip = direction === 'left' ? -1 : 1;

  return (
    <div
      className="cat-sprite relative h-[44px] w-[44px]"
      style={{
        backgroundImage: `url(${isEating ? demonicCatSprite : catSprite})`,
        transform: `scaleX(${flip})`,
      }}
      role="img"
      aria-label="Cat player"
    />
  );
}


function CoinSprite() {
  return (
    <img
      src={fishSprite}
      alt="Fish"
      className="coin-sprite block h-6 w-6"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}

export function HeroSection() {
  const initialCoinsFiltered = useMemo(() => {
    return INITIAL_COINS.map((coin) => {
      if (isBehindCard(coin.x, coin.y) || isNearProjectNode(coin.x, coin.y)) {
        return { ...coin, ...randomPoint() };
      }
      return coin;
    });
  }, []);

  const [player, setPlayer] = useState<Point>(INITIAL_PLAYER);
  const [direction, setDirection] = useState<Direction>('left');
  const [coins, setCoins] = useState<Coin[]>(initialCoinsFiltered);
  const [score, setScore] = useState(0);
  const [isEating, setIsEating] = useState(false);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [activeProject, setActiveProject] = useState<MapNode | null>(null);
  const [isListView, setIsListView] = useState(false);
  
  const playerRef = useRef<Point>(INITIAL_PLAYER);
  const directionRef = useRef<Direction>('left');
  const coinsRef = useRef<Coin[]>(initialCoinsFiltered);
  const keysRef = useRef<Set<string>>(new Set());
  const lastTimeRef = useRef<number>(0);
  const coinIdRef = useRef(100);
  const rafRef = useRef<number>(0);
  const eatingTimeoutRef = useRef<number | null>(null);

  const isAutoModeRef = useRef(true);
  const roamDirectionRef = useRef<Point>({ x: 1, y: 0 });
  const lastChangeTimeRef = useRef<number>(0);
  const nextChangeIntervalRef = useRef<number>(2000 + Math.random() * 1000);
  const lastActiveTimeRef = useRef<number>(Date.now());
  const activeProjectRef = useRef<MapNode | null>(null);
  const lastCloseTimeRef = useRef<number>(0);
  const targetPosRef = useRef<Point | null>(null);

  const [dpadOffset, setDpadOffset] = useState<Point>({ x: 0, y: 0 });
  const [activeDpadDir, setActiveDpadDir] = useState<'up' | 'down' | 'left' | 'right' | null>(null);
  const [isJoystickActive, setIsJoystickActive] = useState(false);
  const [isDraggingDpad, setIsDraggingDpad] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(getMuteState());

  const handleMuteToggle = () => {
    const newMuted = toggleMute();
    setIsSoundMuted(newMuted);
    if (!newMuted) {
      playClickSound();
    }
  };

  const dpadOffsetRef = useRef<Point>({ x: 0, y: 0 });
  const activeDpadDirRef = useRef<'up' | 'down' | 'left' | 'right' | null>(null);
  const isJoystickActiveRef = useRef(false);
  const isDraggingDpadRef = useRef(false);
  const dragStartPosRef = useRef<Point>({ x: 0, y: 0 });
  const dpadStartOffsetRef = useRef<Point>({ x: 0, y: 0 });
  const joystickVectorRef = useRef<Point | null>(null);

  const closePopup = () => {
    setActiveProject(null);
    activeProjectRef.current = null;
    lastCloseTimeRef.current = Date.now();
    playCloseSound();
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, .coin-sprite, .cat-sprite')) {
      return;
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;
    
    const targetX = clamp(clickX, 6, 94);
    const targetY = clamp(clickY, 13, 86);
    
    if (!isBehindCard(targetX, targetY)) {
      targetPosRef.current = { x: targetX, y: targetY };
      setIsAutoMode(false);
      isAutoModeRef.current = false;
      lastActiveTimeRef.current = Date.now();
    }
  };

  const handleDpadStart = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    setIsAutoMode(false);
    isAutoModeRef.current = false;
    targetPosRef.current = null;
    lastActiveTimeRef.current = Date.now();

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const targetElement = document.elementFromPoint(clientX, clientY) as HTMLElement | null;
    const dirButton = targetElement?.closest('[data-direction]') as HTMLElement | null;

    if (dirButton) {
      const dir = dirButton.getAttribute('data-direction') as 'up' | 'down' | 'left' | 'right';
      setActiveDpadDir(dir);
      activeDpadDirRef.current = dir;
      
      const vectors = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 }
      };
      joystickVectorRef.current = vectors[dir];

      playClickSound();

      setIsJoystickActive(true);
      isJoystickActiveRef.current = true;
      setIsDraggingDpad(false);
      isDraggingDpadRef.current = false;
    } else {
      setIsDraggingDpad(true);
      isDraggingDpadRef.current = true;
      dragStartPosRef.current = { x: clientX, y: clientY };
      dpadStartOffsetRef.current = { ...dpadOffsetRef.current };

      setIsJoystickActive(true);
      isJoystickActiveRef.current = true;
    }
  };

  const handleDpadMove = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    if (!isJoystickActiveRef.current) return;
    
    if ('touches' in e && e.cancelable) {
      e.preventDefault();
    }

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    lastActiveTimeRef.current = Date.now();

    if (isDraggingDpadRef.current) {
      const dx = clientX - dragStartPosRef.current.x;
      const dy = clientY - dragStartPosRef.current.y;
      const newOffset = {
        x: dpadStartOffsetRef.current.x + dx,
        y: dpadStartOffsetRef.current.y + dy
      };
      setDpadOffset(newOffset);
      dpadOffsetRef.current = newOffset;
    } else {
      const targetElement = document.elementFromPoint(clientX, clientY) as HTMLElement | null;
      const dirButton = targetElement?.closest('[data-direction]') as HTMLElement | null;

      if (dirButton) {
        const dir = dirButton.getAttribute('data-direction') as 'up' | 'down' | 'left' | 'right';
        if (activeDpadDirRef.current !== dir) {
          setActiveDpadDir(dir);
          activeDpadDirRef.current = dir;
          
          playClickSound();
          
          const vectors = {
            up: { x: 0, y: -1 },
            down: { x: 0, y: 1 },
            left: { x: -1, y: 0 },
            right: { x: 1, y: 0 }
          };
          joystickVectorRef.current = vectors[dir];
        }
      } else {
        setActiveDpadDir(null);
        activeDpadDirRef.current = null;
        joystickVectorRef.current = null;
      }
    }
  };

  const handleDpadEnd = () => {
    setActiveDpadDir(null);
    activeDpadDirRef.current = null;
    joystickVectorRef.current = null;
    
    setIsDraggingDpad(false);
    isDraggingDpadRef.current = false;
    
    setIsJoystickActive(false);
    isJoystickActiveRef.current = false;
    
    lastActiveTimeRef.current = Date.now();
  };

  useEffect(() => {
    isAutoModeRef.current = isAutoMode;
  }, [isAutoMode]);

  const pixels = useMemo(
    () => Array.from({ length: 72 }, (_, index) => ({
      id: index,
      x: (index * 17 + 8) % 100,
      y: (index * 29 + 12) % 100,
      size: index % 5 === 0 ? 8 : index % 3 === 0 ? 4 : 2,
      warm: index % 6 === 0,
    })),
    [],
  );

  useEffect(() => {
    coinsRef.current = coins;
  }, [coins]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (KEY_TO_VECTOR[key]) {
        event.preventDefault();
        keysRef.current.add(key);
        targetPosRef.current = null; // Clear tap-to-walk target
        lastActiveTimeRef.current = Date.now();
        if (isAutoModeRef.current) {
          setIsAutoMode(false);
        }
      }
    }

    function onKeyUp(event: KeyboardEvent) {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (KEY_TO_VECTOR[key]) {
        event.preventDefault();
        keysRef.current.delete(key);
        lastActiveTimeRef.current = Date.now();
      }
    }

    function getKeyboardVector() {
      let x = 0;
      let y = 0;

      keysRef.current.forEach((key) => {
        x += KEY_TO_VECTOR[key].x;
        y += KEY_TO_VECTOR[key].y;
      });

      // Restrict to cardinal directions only – pick the dominant axis
      if (x !== 0 || y !== 0) {
        if (Math.abs(x) >= Math.abs(y)) {
          return { x: x > 0 ? 1 : -1, y: 0 };
        }
        return { x: 0, y: y > 0 ? 1 : -1 };
      }
      return { x: 0, y: 0 };
    }

    function move(time: number) {
      if (activeProjectRef.current) {
        rafRef.current = requestAnimationFrame(move);
        return;
      }

      const previousTime = lastTimeRef.current || time;
      const delta = Math.min((time - previousTime) / 1000, 0.04);
      lastTimeRef.current = time;

      const keyboard = getKeyboardVector();
      let manual = keyboard.x !== 0 || keyboard.y !== 0;
      let movement = keyboard;

      if (isAutoModeRef.current) {
        // Auto Mode: movement changes every 2 to 3 random seconds or when hitting screen boundaries
        const current = playerRef.current;
        const hitLeft = current.x <= 6.1;
        const hitRight = current.x >= 93.9;
        const hitTop = current.y <= 13.1;
        const hitBottom = current.y >= 85.9;

        const isHeadingLeft = roamDirectionRef.current.x < 0;
        const isHeadingRight = roamDirectionRef.current.x > 0;
        const isHeadingUp = roamDirectionRef.current.y < 0;
        const isHeadingDown = roamDirectionRef.current.y > 0;

        const hitBoundary = (hitLeft && isHeadingLeft) || 
                            (hitRight && isHeadingRight) || 
                            (hitTop && isHeadingUp) || 
                            (hitBottom && isHeadingDown);

        const elapsed = time - lastChangeTimeRef.current;

        if (lastChangeTimeRef.current === 0 || elapsed >= nextChangeIntervalRef.current || hitBoundary) {
          const possibleDirections: Point[] = [];
          if (!hitLeft) possibleDirections.push({ x: -1, y: 0 });
          if (!hitRight) possibleDirections.push({ x: 1, y: 0 });
          if (!hitTop) possibleDirections.push({ x: 0, y: -1 });
          if (!hitBottom) possibleDirections.push({ x: 0, y: 1 });

          if (possibleDirections.length === 0) {
            possibleDirections.push({ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 });
          }

          roamDirectionRef.current = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
          lastChangeTimeRef.current = time;
          nextChangeIntervalRef.current = 2000 + Math.random() * 1000;
        }

        movement = roamDirectionRef.current;
      } else {
        // Manual Mode: direction comes from keyboard, joystick vector, or tap target
        if (manual) {
          targetPosRef.current = null;
        } else if (joystickVectorRef.current) {
          const jx = joystickVectorRef.current.x;
          const jy = joystickVectorRef.current.y;
          if (Math.abs(jx) >= Math.abs(jy)) {
            movement = { x: jx > 0 ? 1 : -1, y: 0 };
          } else {
            movement = { x: 0, y: jy > 0 ? 1 : -1 };
          }
          manual = true;
          targetPosRef.current = null;
        } else if (targetPosRef.current) {
          const distPx = pixelDistance(playerRef.current, targetPosRef.current);
          if (distPx < 15) {
            targetPosRef.current = null;
            movement = { x: 0, y: 0 };
          } else {
            const dx = targetPosRef.current.x - playerRef.current.x;
            const dy = targetPosRef.current.y - playerRef.current.y;
            const dist = Math.hypot(dx, dy);
            movement = { x: dx / dist, y: dy / dist };
            manual = true;
          }
        }

        if (manual) {
          lastActiveTimeRef.current = Date.now();
        } else if (Date.now() - lastActiveTimeRef.current >= 6000) {
          setIsAutoMode(true);
        }
      }

      const speed = isAutoModeRef.current ? 7 : (manual ? 22 : 0);
      const aspect = window.innerWidth / window.innerHeight || 1.77;
      let nextPlayer = {
        x: clamp(playerRef.current.x + (movement.x / aspect) * speed * delta, 6, 94),
        y: clamp(playerRef.current.y + movement.y * speed * delta, 13, 86),
      };

      if (isBehindCard(nextPlayer.x, nextPlayer.y)) {
        nextPlayer = playerRef.current;
        if (isAutoModeRef.current) {
          lastChangeTimeRef.current = 0; // Trigger instant direction change
        }
      }

      const nextDirection = directionFromVector(movement, directionRef.current);
      if (nextDirection !== directionRef.current) {
        directionRef.current = nextDirection;
        setDirection(nextDirection);
      }

      const nextCoins = coinsRef.current.map((coin) => (
        pixelDistance(nextPlayer, coin) < 38 ? createCoin(coinIdRef.current++) : coin
      ));

      const collected = nextCoins.filter((coin, index) => coin.id !== coinsRef.current[index].id).length;
      if (collected > 0) {
        coinsRef.current = nextCoins;
        setCoins(nextCoins);
        setScore((current) => current + collected);
        playCoinSound();
        setIsEating(true);
        if (eatingTimeoutRef.current) {
          clearTimeout(eatingTimeoutRef.current);
        }
        eatingTimeoutRef.current = window.setTimeout(() => {
          setIsEating(false);
        }, 800);
      }

      // Check collision with project nodes (with a 2.5-second cooldown after closing a popup)
      if (Date.now() - lastCloseTimeRef.current > 2500) {
        MAP_NODES.forEach((node) => {
          if (pixelDistance(nextPlayer, node) < 45) {
            if (activeProjectRef.current?.label !== node.label) {
              setActiveProject(node);
              activeProjectRef.current = node;
              setScore(0);
              playOpenSound();
              
              // Relocate cat to a safe center area of the board
              const centerPoint = { x: 55, y: 40 };
              setPlayer(centerPoint);
              playerRef.current = centerPoint;
              nextPlayer = centerPoint;
            }
          }
        });
      }

      playerRef.current = nextPlayer;
      setPlayer(nextPlayer);
      rafRef.current = requestAnimationFrame(move);
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    rafRef.current = requestAnimationFrame(move);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      cancelAnimationFrame(rafRef.current);
      if (eatingTimeoutRef.current) {
        clearTimeout(eatingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="fixed inset-0 overflow-hidden pt-[68px] pb-0 md:pb-[72px]">
      <div
        onClick={isListView ? undefined : handleMapClick}
        className={`relative h-full w-full overflow-hidden bg-white/35 ${isListView ? 'overflow-y-auto' : 'cursor-crosshair'}`}
      >
        {isListView ? (
          /* List Mode for Mobile/Tablet */
          <div className="absolute inset-0 overflow-y-auto px-4 py-20 bg-[#FDFBF7] flex flex-col gap-6 scroll-smooth">
            <div className="border-b border-[#E8E0D4] pb-3 flex justify-between items-end">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#F7B33D] font-bold">
                  — PROJECT QUESTS
                </span>
                <h2 className="font-pixel text-[20px] text-ink mt-1">Level Select</h2>
              </div>
              <div className="text-right">
                <span className="font-mono text-[9px] uppercase tracking-wider text-warm-gray block mb-1">XP Points</span>
                <span className="font-pixel text-[14px] text-amber">05 Curated</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              {MAP_NODES.map((node) => (
                <button
                  key={node.label}
                  onClick={() => {
                    playOpenSound();
                    setActiveProject(node);
                    activeProjectRef.current = node;
                    setScore(0);
                  }}
                  className="w-full text-left border border-[#E8E0D4] bg-white p-4 flex items-center gap-4 cursor-pointer hover:border-amber hover:shadow-sm active:scale-[0.98] transition-all select-none focus:outline-none rounded-sm"
                >
                  <img
                    src={node.image}
                    alt={node.label}
                    className="w-12 h-12 rounded-md border border-[#E8E0D4] bg-white object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline gap-2">
                      <h3 className="font-pixel text-[12px] text-ink truncate">{node.label}</h3>
                      <span className="font-mono text-[9px] text-[#F7B33D] font-bold shrink-0">{node.date}</span>
                    </div>
                    <p className="font-mono text-[10px] text-warm-gray truncate mt-1">{node.subtitle}</p>
                    <p className="font-mono text-[9px] text-[#B5B0AA] uppercase tracking-wider truncate mt-1">
                      {node.tech}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Map Mode (Default Grid) */
          <>
            <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
              <path d="M16 44 H48 V18 H63 V33 H78" stroke="#DADFD9" strokeWidth="2" strokeDasharray="2 5" fill="none" />
              <path d="M41 18 V52 H61 V73 H83" stroke="#DADFD9" strokeWidth="2" strokeDasharray="2 5" fill="none" />
              <path d="M26 74 H53 V33 H64" stroke="#DADFD9" strokeWidth="2" strokeDasharray="2 5" fill="none" />
              <path d="M63 22 H80 V68" stroke="#DADFD9" strokeWidth="2" strokeDasharray="2 5" fill="none" />
            </svg>

            {pixels.map((pixel) => (
              <span
                key={pixel.id}
                className={pixel.warm ? 'absolute bg-[#F7B557]' : 'absolute bg-[#D7DCD9]'}
                style={{
                  left: `${pixel.x}%`,
                  top: `${pixel.y}%`,
                  width: `${pixel.size}px`,
                  height: `${pixel.size}px`,
                  opacity: pixel.warm ? 0.65 : 0.42,
                  transform: pixel.size >= 8 ? 'rotate(45deg)' : undefined,
                }}
                aria-hidden="true"
              />
            ))}

            <aside className="absolute left-6 top-6 z-40 hidden w-[360px] border border-[#E8E0D4] bg-white/88 shadow-[0_28px_70px_rgba(26,26,26,0.08)] backdrop-blur-sm md:block">
              <div className="flex h-8 items-center justify-between border-b border-[#D99B3B] bg-[#F7B33D] px-4">
                <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-ink">portfolio_map</span>
                <span className="grid h-3.5 w-3.5 place-items-center border border-[#B9822A] text-[9px] text-[#8A5D1B]">-</span>
              </div>

              <div className="space-y-5 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-warm-gray">Score</p>
                    <p className="mt-1 font-pixel text-[30px] leading-none score-glowing">
                      {score.toString().padStart(3, '0')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleMuteToggle}
                      className="border p-2 flex items-center justify-center select-none active:scale-90 transition-all rounded-sm border-[#E8E0D4] bg-white text-ink hover:border-amber w-9 h-9 font-mono text-[12px] uppercase font-bold shrink-0 shadow-sm"
                      title={isSoundMuted ? 'Unmute Sounds' : 'Mute Sounds'}
                    >
                      <span className={`transition-transform duration-200 block ${isSoundMuted ? 'rotate-12 scale-90' : 'scale-100 hover:scale-110'}`}>
                        {isSoundMuted ? '🔇' : '🔊'}
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        playClickSound();
                        setIsAutoMode((prev) => !prev);
                      }}
                      className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] select-none transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 ${
                        isAutoMode
                          ? 'border-[#A8F3ED] bg-[#EFFFFD] text-[#00A9A0]'
                          : 'border-[#F3DFA8] bg-[#FFFDEF] text-[#A98400]'
                      }`}
                    >
                      {isAutoMode ? 'Auto mode' : 'Manual mode'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-[#E8E0D4] p-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-warm-gray">Status</p>
                    <p className="mt-3 font-mono text-[12px] text-ink">{isAutoMode ? 'fish scanning' : 'manual play'}</p>
                  </div>
                  <div className="border border-[#E8E0D4] p-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-warm-gray">Nodes live</p>
                    <p className="mt-3 font-mono text-[12px] text-ink">05 curated</p>
                  </div>
                </div>

                <div className="border border-[#E8E0D4] p-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-warm-gray">Selected project</p>
                  <p className="mt-3 font-mono text-[12px] text-ink">Collect fish with the cat</p>
                  <p className="mt-2 font-mono text-[10px] text-warm-gray">Click map to walk or use WASD/Arrows</p>
                </div>
              </div>
            </aside>

            {MAP_NODES.map((node) => (
              <button
                key={node.label}
                onClick={() => {
                  playOpenSound();
                  setActiveProject(node);
                  activeProjectRef.current = node;
                  setScore(0);
                }}
                className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 outline-none cursor-pointer hover:scale-105 active:scale-95 transition-all duration-100"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                {/* Hover Tooltip */}
                <div className="pointer-events-none absolute bottom-[110%] left-[110%] mb-1 hidden -translate-x-4 flex-col items-start border border-[#A8F3ED] bg-white p-3 shadow-sm group-hover:flex whitespace-nowrap z-50">
                  <span className="font-mono text-[12px] uppercase tracking-wider text-ink font-bold">
                    {node.label}
                  </span>
                  <span className="font-mono text-[10px] text-[#A8B0B5] mt-1">
                    {node.subtitle}
                  </span>
                </div>
                
                <img
                  src={node.image}
                  alt={node.label}
                  className="h-10 w-10 rounded-md border border-[#E8E0D4] object-cover shadow-sm transition-transform duration-200 group-hover:-translate-y-1 bg-white"
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#B5B0AA] group-hover:text-amber">
                  {node.label}
                </span>
              </button>
            ))}

            {coins.map((coin) => (
              <div
                key={coin.id}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse"
                style={{ left: `${coin.x}%`, top: `${coin.y}%` }}
              >
                <CoinSprite />
              </div>
            ))}

            <div
              className="absolute z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: `${player.x}%`, top: `${player.y}%` }}
            >
              <CatSprite direction={direction} isEating={isEating} />
            </div>

            <div className="absolute bottom-7 left-1/2 z-40 hidden -translate-x-1/2 border border-[#EFE8DD] bg-white/72 px-6 py-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[#CDC8C1] shadow-[0_18px_50px_rgba(26,26,26,0.04)] md:block select-none">
              Click map to walk // WASD or arrows work too
            </div>
          </>
        )}

        {/* Mobile HUD overlay (Mobile only, hidden on md) */}
        <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between border border-[#E8E0D4] bg-white/95 backdrop-blur-sm p-3 shadow-md md:hidden rounded-sm">
          <div className="flex items-center gap-3">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-wider text-warm-gray">Score</p>
              <p className="font-pixel text-[14px] leading-none score-glowing">
                {score.toString().padStart(3, '0')}
              </p>
            </div>
            <div className="h-6 w-px bg-[#E8E0D4]" />
            <div>
              <p className="font-mono text-[8px] uppercase tracking-wider text-warm-gray">Status</p>
              <p className="font-mono text-[10px] text-ink font-bold leading-none mt-0.5">
                {isAutoMode ? 'auto roam' : 'playing'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleMuteToggle}
              className="border flex items-center justify-center select-none active:scale-90 transition-all rounded-sm border-[#E8E0D4] bg-white text-ink w-8 h-8 text-[12px] shrink-0"
              title={isSoundMuted ? 'Unmute Sounds' : 'Mute Sounds'}
            >
              <span className={`transition-transform duration-200 block ${isSoundMuted ? 'rotate-12 scale-90' : 'scale-100'}`}>
                {isSoundMuted ? '🔇' : '🔊'}
              </span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                setIsAutoMode((prev) => !prev);
              }}
              className={`border px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider select-none active:scale-95 transition-all rounded-sm ${
                isAutoMode
                  ? 'border-[#A8F3ED] bg-[#EFFFFD] text-[#00A9A0] font-bold'
                  : 'border-[#F3DFA8] bg-[#FFFDEF] text-[#A98400] font-bold'
              }`}
            >
              {isAutoMode ? 'Auto' : 'Manual'}
            </button>
          </div>
        </div>

        {/* Mobile Toggle View Button (Mobile only, hidden on md) - Swapped to the Right */}
        <div className="absolute bottom-4 right-4 z-40 md:hidden pointer-events-auto">
          <button
            onClick={() => {
              playClickSound();
              setIsListView((prev) => !prev);
            }}
            className="bg-[#F7B33D] border border-ink text-ink font-mono text-[10px] uppercase tracking-[0.12em] font-bold px-4 py-2 shadow-md hover:bg-amber-400 active:scale-95 transition-all select-none flex items-center gap-1.5 whitespace-nowrap rounded-sm cursor-pointer"
          >
            {isListView ? '🗺️ Map View' : '📋 List View'}
          </button>
        </div>

        {/* Mobile D-pad (Mobile only, hidden on md) - Swapped to the Left */}
        {!isListView && (
          <div 
            className="absolute bottom-4 left-4 z-40 md:hidden pointer-events-auto select-none"
            onTouchStart={handleDpadStart}
            onTouchMove={handleDpadMove}
            onTouchEnd={handleDpadEnd}
            onTouchCancel={handleDpadEnd}
            onMouseDown={handleDpadStart}
            onMouseMove={handleDpadMove}
            onMouseUp={handleDpadEnd}
            onMouseLeave={handleDpadEnd}
            style={{
              transform: `translate(${dpadOffset.x}px, ${dpadOffset.y}px)`,
              transition: isDraggingDpad ? 'none' : 'transform 0.15s ease-out',
              touchAction: 'none'
            }}
          >
            <div 
              className={`p-1.5 bg-[#FFFBF5]/90 border border-ink rounded-xl shadow-lg backdrop-blur-sm grid grid-cols-3 grid-rows-3 gap-1 transition-all duration-200 ${
                isJoystickActive ? 'border-amber bg-[#FFFBF5]' : ''
              }`}
            >
              {/* Row 1 */}
              <div className="w-8 h-8" />
              <button
                data-direction="up"
                className={`w-8 h-8 border border-ink rounded-lg flex items-center justify-center shadow-sm select-none transition-all pointer-events-auto active:scale-95 duration-100 ${
                  activeDpadDir === 'up' 
                    ? 'bg-[#F7B33D] text-white border-amber shadow-inner scale-95' 
                    : 'bg-white text-ink hover:bg-neutral-50'
                }`}
              >
                <span className="text-[10px] font-pixel select-none pointer-events-none">▲</span>
              </button>
              <div className="w-8 h-8" />

              {/* Row 2 */}
              <button
                data-direction="left"
                className={`w-8 h-8 border border-ink rounded-lg flex items-center justify-center shadow-sm select-none transition-all pointer-events-auto active:scale-95 duration-100 ${
                  activeDpadDir === 'left' 
                    ? 'bg-[#F7B33D] text-white border-amber shadow-inner scale-95' 
                    : 'bg-white text-ink hover:bg-neutral-50'
                }`}
              >
                <span className="text-[10px] font-pixel select-none pointer-events-none">◀</span>
              </button>
              
              {/* Center cell - Empty center but subtle drag crosshair */}
              <div className="w-8 h-8 flex items-center justify-center relative pointer-events-none">
                <div className="w-2 h-2 flex items-center justify-center relative opacity-20">
                  <div className="absolute w-1.5 h-0.5 bg-ink rounded-full" />
                  <div className="absolute w-0.5 h-1.5 bg-ink rounded-full" />
                </div>
              </div>

              <button
                data-direction="right"
                className={`w-8 h-8 border border-ink rounded-lg flex items-center justify-center shadow-sm select-none transition-all pointer-events-auto active:scale-95 duration-100 ${
                  activeDpadDir === 'right' 
                    ? 'bg-[#F7B33D] text-white border-amber shadow-inner scale-95' 
                    : 'bg-white text-ink hover:bg-neutral-50'
                }`}
              >
                <span className="text-[10px] font-pixel select-none pointer-events-none">▶</span>
              </button>

              {/* Row 3 */}
              <div className="w-8 h-8" />
              <button
                data-direction="down"
                className={`w-8 h-8 border border-ink rounded-lg flex items-center justify-center shadow-sm select-none transition-all pointer-events-auto active:scale-95 duration-100 ${
                  activeDpadDir === 'down' 
                    ? 'bg-[#F7B33D] text-white border-amber shadow-inner scale-95' 
                    : 'bg-white text-ink hover:bg-neutral-50'
                }`}
              >
                <span className="text-[10px] font-pixel select-none pointer-events-none">▼</span>
              </button>
              <div className="w-8 h-8" />
            </div>
          </div>
        )}

        <div style={{ display: 'none' }} aria-hidden="true">
          <img src={catSprite} alt="" />
          <img src={demonicCatSprite} alt="" />
        </div>

        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#EBE7E0]/95 p-4">
            <div className="w-full max-w-[720px] max-h-[90vh] overflow-y-auto bg-white shadow-[0_28px_70px_rgba(26,26,26,0.15)] pointer-events-auto flex flex-col border border-[#E8E0D4] rounded-sm">
              {/* Title Bar */}
              <div className="flex h-10 items-center justify-between bg-[#F7B33D] px-4 font-mono text-[11px] font-bold tracking-[0.08em] text-ink border-b border-[#D99B3B]">
                <span>project_overview</span>
                <button
                  onClick={closePopup}
                  className="relative overflow-hidden group font-bold border border-ink px-2 py-0.5 text-[10px] leading-none active:scale-90 rounded-sm transition-all cursor-pointer text-ink"
                >
                  <div className="absolute inset-0 bg-[#00E5FF] translate-y-[calc(100%+26px)] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0">
                    <svg 
                      viewBox="0 0 240 40" 
                      className="absolute left-0 w-[200%] h-8 -top-[24px] text-[#00E5FF] fill-current pointer-events-none animate-wave"
                    >
                      <path d="M 0 10 C 30 10, 30 0, 60 0 C 90 0, 90 10, 120 10 C 150 10, 150 0, 180 0 C 210 0, 210 10, 240 10 L 240 40 L 0 40 Z" />
                    </svg>
                  </div>
                  <span className="relative z-10">X</span>
                </button>
              </div>
              
              {/* Content */}
              <div className="p-5 md:p-6 text-left flex flex-col gap-4">
                <div className="flex flex-col-reverse md:flex-row gap-6 items-stretch">
                  {/* Left Column - Details */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-pixel text-[20px] sm:text-[26px] md:text-[32px] leading-tight text-ink">{activeProject.label}</h3>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em] bg-[#F7B33D] text-ink px-2 py-1 font-bold">
                        {activeProject.date}
                      </span>
                      <span className="font-mono text-[10px] text-warm-gray tracking-wider uppercase">
                        {activeProject.subtitle}
                      </span>
                    </div>

                    <div className="w-full h-px bg-[#EFE8DD] my-4"></div>

                    <p className="font-mono text-[11px] text-ink leading-relaxed mb-3">{activeProject.description}</p>
                    
                    {activeProject.features && (
                      <ul className="list-disc pl-4 mb-4 font-mono text-[10px] text-ink leading-relaxed space-y-1.5 marker:text-[#F7B33D]">
                        {activeProject.features.map((feature, i) => (
                          <li key={i}>
                            <strong>{feature.split(':')[0]}:</strong>{feature.split(':')[1]}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <div>
                      <p className="font-mono text-[9px] text-warm-gray uppercase tracking-[0.2em] mb-3">Tech Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tech.split(',').map((t) => (
                          <span key={t} className="border border-[#E8E0D4] px-3 py-1.5 font-mono text-[10px] text-ink uppercase tracking-wider bg-[#FAFAFA]">
                            {t.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Icon/Image */}
                  <div className="w-full md:w-[200px] shrink-0 flex flex-col items-center justify-center p-4 border border-[#E8E0D4] bg-[#FAFAFA] min-h-[120px] md:min-h-[180px]">
                    <img 
                      src={activeProject.image} 
                      alt={activeProject.label} 
                      className="w-28 h-28 object-contain bg-white rounded-xl shadow-sm border border-[#E8E0D4]"
                    />
                  </div>
                </div>

                {/* Footer - Links & Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 mt-2 border-t border-[#EFE8DD]">
                  <div className="flex gap-2 flex-wrap w-full sm:w-auto justify-center sm:justify-start">
                    {activeProject.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClickSound}
                        className="bg-[#F7B33D] text-ink px-4 py-2 font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-[#ffc252] active:scale-95 transition-all text-center cursor-pointer font-bold flex items-center justify-center gap-2 border border-transparent hover:border-ink w-full sm:w-auto select-none"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                  <button
                    onClick={closePopup}
                    className="relative overflow-hidden group w-full sm:w-auto border border-ink bg-white text-ink px-6 py-2 font-mono text-[10px] uppercase tracking-[0.1em] active:scale-95 transition-all cursor-pointer font-bold shrink-0 rounded-sm"
                  >
                    <div className="absolute inset-0 bg-[#00E5FF] translate-y-[calc(100%+26px)] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0">
                      <svg 
                        viewBox="0 0 240 40" 
                        className="absolute left-0 w-[200%] h-8 -top-[24px] text-[#00E5FF] fill-current pointer-events-none animate-wave"
                      >
                        <path d="M 0 10 C 30 10, 30 0, 60 0 C 90 0, 90 10, 120 10 C 150 10, 150 0, 180 0 C 210 0, 210 10, 240 10 L 240 40 L 0 40 Z" />
                      </svg>
                    </div>
                    <span className="relative z-10">CLOSE WINDOW</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

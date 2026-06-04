import { useEffect, useMemo, useRef, useState } from 'react';
import catSprite from '../../spreadhseet/BlackCatSlimeFree/BlackCatSlimeFree/Idle.png';
import demonicCatSprite from '../../spreadhseet/DemonicCatSlimeFree/DemonicCatSlimeFree/Idle.png';
import fishSprite from '../../spreadhseet/fish_transparent.png';

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
    image: '/assets/project-icon-2.jpg',
    links: [
      { label: 'Live Website ↗', url: 'https://knovi-web.vercel.app/' },
      { label: 'Download APK ↗', url: 'https://github.com/Chirag-Pareek/Knovi-WebAndApp/releases/download/v1.0/Knovi.apk' },
      { label: 'GitHub ↗', url: 'https://github.com/Chirag-Pareek/Knovi-WebAndApp' }
    ],
    description: 'Knovi is an AI-powered interview simulation platform that helps users test their real-world knowledge through advanced, topic-based assessments.',
    tech: 'React, Flutter, Groq API, Node.js, PostgreSQL',
  },
  {
    label: 'MIMICLY',
    subtitle: 'AI Agent // Chat Assistant',
    date: '2024 - 2025',
    x: 63,
    y: 22,
    image: '/assets/project-icon-1.jpg',
    links: [
      { label: 'Live Website ↗', url: 'https://mimicly.netlify.app/' },
      { label: 'GitHub ↗', url: 'https://github.com/Chirag-Pareek/Mimicly-AI' }
    ],
    description: 'An AI assistant that helps you reply like anyone — whether it’s a friend, partner, or professional — in seconds.',
    tech: 'React, TypeScript, NestJS, Supabase',
  },
  {
    label: 'NOTEFORGE',
    subtitle: 'Mobile App // EdTech',
    date: '2024 - 2025',
    x: 28,
    y: 74,
    image: '/assets/project-icon-3.jpg',
    links: [
      { label: 'GitHub ↗', url: 'https://github.com/Chirag-Pareek/NoteForge' }
    ],
    description: 'NoteForge is an all-in-one AI-powered learning app designed to help students study smarter, stay organized, and track real progress.',
    tech: 'Dart, Flutter, AI Integration',
  },
  {
    label: 'FINEPRINT',
    subtitle: 'Mobile App // Legal AI',
    date: '2025 - 2026',
    x: 80,
    y: 68,
    image: '/assets/studio-logo.png',
    links: [
      { label: 'GitHub ↗', url: 'https://github.com/Chirag-Pareek/Fineprint' }
    ],
    description: 'Scan contracts (gym, lease, job offer, SaaS terms) → get plain-English risk analysis → take action.',
    tech: 'Dart, Flutter, AI Analysis',
  },
  {
    label: 'GITDOCS',
    subtitle: 'Web Tool // Developer Tools',
    date: '2023 - 2024',
    x: 75,
    y: 35,
    image: '/assets/project-icon-2.jpg',
    links: [
      { label: 'Live Website ↗', url: 'https://git-docs-one.vercel.app' },
      { label: 'GitHub ↗', url: 'https://github.com/Chirag-Pareek/GitDocs-' }
    ],
    description: 'GitDocs+ – All GitHub commands. One modern, easy-to-use interface. Just read, copy, and use. Simple.',
    tech: 'TypeScript, React',
  },
  {
    label: 'WATCHFLO',
    subtitle: 'Mobile App // Entertainment',
    date: '2024 - 2025',
    x: 20,
    y: 30,
    image: '/assets/project-icon-1.jpg',
    links: [
      { label: 'GitHub ↗', url: 'https://github.com/Chirag-Pareek/WatchFlo' }
    ],
    description: 'A modern mobile application for tracking and streaming watch progress seamlessly across devices.',
    tech: 'Dart, Flutter',
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

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
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

  const closePopup = () => {
    setActiveProject(null);
    activeProjectRef.current = null;
    lastCloseTimeRef.current = Date.now();
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
      const manual = keyboard.x !== 0 || keyboard.y !== 0;
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
        // Manual Mode: direction comes from keyboard vector
        movement = keyboard;
        
        if (manual) {
          lastActiveTimeRef.current = Date.now();
        } else if (Date.now() - lastActiveTimeRef.current >= 3000) {
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
        distance(nextPlayer, coin) < 2.5 ? createCoin(coinIdRef.current++) : coin
      ));

      const collected = nextCoins.filter((coin, index) => coin.id !== coinsRef.current[index].id).length;
      if (collected > 0) {
        coinsRef.current = nextCoins;
        setCoins(nextCoins);
        setScore((current) => current + collected);
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
          if (distance(nextPlayer, node) < 3.5) {
            if (activeProjectRef.current?.label !== node.label) {
              setActiveProject(node);
              activeProjectRef.current = node;
              setScore(0);
              
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
    <section className="fixed inset-0 overflow-hidden pt-[68px] pb-[72px]">
      <div className="relative h-full w-full overflow-hidden bg-white/35">
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

        <aside className="absolute left-6 top-6 z-20 hidden w-[360px] border border-[#E8E0D4] bg-white/88 shadow-[0_28px_70px_rgba(26,26,26,0.08)] backdrop-blur-sm md:block">
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
              <button
                onClick={() => setIsAutoMode((prev) => !prev)}
                className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] select-none transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 ${
                  isAutoMode
                    ? 'border-[#A8F3ED] bg-[#EFFFFD] text-[#00A9A0]'
                    : 'border-[#F3DFA8] bg-[#FFFDEF] text-[#A98400]'
                }`}
              >
                {isAutoMode ? 'Auto mode' : 'Manual mode'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="border border-[#E8E0D4] p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-warm-gray">Status</p>
                <p className="mt-3 font-mono text-[12px] text-ink">{isAutoMode ? 'fish scanning' : 'manual play'}</p>
              </div>
              <div className="border border-[#E8E0D4] p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-warm-gray">Nodes live</p>
                <p className="mt-3 font-mono text-[12px] text-ink">06 curated</p>
              </div>
            </div>

            <div className="border border-[#E8E0D4] p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-warm-gray">Selected project</p>
              <p className="mt-3 font-mono text-[12px] text-ink">Collect fish with the cat</p>
              <p className="mt-2 font-mono text-[10px] text-warm-gray">Use WASD or arrow keys to explore</p>
            </div>
          </div>
        </aside>

        {MAP_NODES.map((node) => (
          <button
            key={node.label}
            onClick={() => {
              setActiveProject(node);
              activeProjectRef.current = node;
              setScore(0);
            }}
            className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 outline-none cursor-pointer"
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
              className="h-10 w-10 rounded-md border border-[#E8E0D4] object-cover shadow-sm transition-transform duration-200 group-hover:-translate-y-1"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#B5B0AA] group-hover:text-amber">
              {node.label}
            </span>
          </button>
        ))}

        {coins.map((coin) => (
          <div
            key={coin.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${coin.x}%`, top: `${coin.y}%` }}
          >
            <CoinSprite />
          </div>
        ))}

        <div
          className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${player.x}%`, top: `${player.y}%` }}
        >
          <CatSprite direction={direction} isEating={isEating} />
        </div>

        <div className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 border border-[#EFE8DD] bg-white/72 px-6 py-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[#CDC8C1] shadow-[0_18px_50px_rgba(26,26,26,0.04)] md:block">
          WASD or arrow keys to move // auto roam stays on
        </div>
        <div style={{ display: 'none' }} aria-hidden="true">
          <img src={catSprite} alt="" />
          <img src={demonicCatSprite} alt="" />
        </div>

        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#EBE7E0]/80 backdrop-blur-sm">
            <div className="w-[90%] max-w-[480px] bg-white shadow-[0_28px_70px_rgba(26,26,26,0.15)] pointer-events-auto flex flex-col">
              {/* Title Bar */}
              <div className="flex h-8 items-center justify-between bg-[#F7B33D] px-4 font-mono text-[11px] font-bold tracking-[0.08em] text-ink">
                <span>project_overview</span>
                <button
                  onClick={closePopup}
                  className="text-ink hover:text-white transition-colors cursor-pointer font-bold"
                >
                  X
                </button>
              </div>
              {/* Content */}
              <div className="p-8 text-left flex flex-col gap-4">
                <div>
                  <h3 className="font-pixel text-[24px] leading-tight text-ink">{activeProject.label}</h3>
                  <p className="font-mono text-[10px] text-warm-gray mt-2">{activeProject.subtitle}</p>
                  <p className="font-mono text-[9px] text-warm-gray">{activeProject.date}</p>
                </div>

                <p className="font-mono text-[11px] text-ink leading-relaxed mt-2">{activeProject.description}</p>
                <p className="font-mono text-[10px] text-amber font-bold leading-relaxed mt-1">Tech: {activeProject.tech}</p>

                <div className="flex justify-between items-center gap-3 pt-6 mt-4 border-t border-[#EFE8DD]">
                  <div className="flex gap-2 flex-wrap">
                    {activeProject.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#F7B33D] text-ink px-4 py-2 font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-[#ffc252] active:scale-95 transition-all text-center cursor-pointer font-bold flex items-center gap-2"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                  <button
                    onClick={closePopup}
                    className="border border-ink bg-white text-ink px-6 py-2 font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer font-bold shrink-0"
                  >
                    CONTINUE
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

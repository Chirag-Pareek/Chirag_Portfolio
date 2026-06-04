import { useEffect, useState } from 'react';
import catSprite from '../../spreadhseet/BlackCatSlimeFree/BlackCatSlimeFree/Idle.png';
import { playOpenSound } from '@/lib/sounds';

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [currentText, setCurrentText] = useState('BOOTING SYSTEM...');

  useEffect(() => {
    const duration = 1600; // 1.6 seconds total
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 25) {
      setCurrentText('RETRIEVING QUEST LOGS...');
    } else if (progress < 50) {
      setCurrentText('SPAWNING FISH REEF...');
    } else if (progress < 75) {
      setCurrentText('CHARGING CAT BATTERY...');
    } else if (progress < 99) {
      setCurrentText('GENERATING RETRO GRID...');
    } else {
      setCurrentText('SYSTEM READY! GO!');
    }
  }, [progress]);

  useEffect(() => {
    if (progress === 100) {
      const audioTimer = setTimeout(() => {
        playOpenSound();
      }, 100);

      const finishTimer = setTimeout(() => {
        setIsFinished(true);
        // Triggers App.tsx content animation reveal
        const completeTimer = setTimeout(() => {
          onComplete();
        }, 600);
        return () => clearTimeout(completeTimer);
      }, 500);

      return () => {
        clearTimeout(audioTimer);
        clearTimeout(finishTimer);
      };
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FFFBF5] text-ink select-none transition-transform duration-700 ${
        isFinished ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.85, 0, 0.15, 1)' }}
    >
      <div className="w-[85vw] max-w-[380px] flex flex-col gap-6 items-center">
        {/* Title / Version */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[18px] sm:text-[22px] text-amber tracking-widest score-glowing">CHIRAG</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] border border-ink px-1.5 py-0.5 rounded-sm bg-white shrink-0">v1.2.6</span>
          </div>
          <span className="font-mono text-[9px] text-warm-gray tracking-[0.16em] uppercase mt-0.5">initializing digital port...</span>
        </div>

        {/* Bar container */}
        <div className="w-full relative mt-6 pb-2">
          {/* Walking Cat Sprite on Progress Bar */}
          <div
            className="absolute bottom-[20px] -translate-x-[22px] transition-all duration-75 ease-out"
            style={{ left: `${progress}%` }}
          >
            {progress < 100 && (
              <div
                className="cat-sprite h-[44px] w-[44px]"
                style={{
                  backgroundImage: `url(${catSprite})`,
                  transform: 'scaleX(1)', // Face right
                }}
                role="img"
                aria-label="Loading cat"
              />
            )}
          </div>

          {/* Retro Progress Bar Border */}
          <div className="w-full h-[22px] border border-ink bg-[#EFE8DD] p-[2px] relative overflow-hidden rounded-sm">
            <div
              className="h-full bg-[#F7B33D] transition-all duration-75 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Retro scanlines on filled bar */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.15)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px]" />
            </div>
          </div>
        </div>

        {/* Text Logs & Percentage */}
        <div className="w-full flex justify-between items-center font-mono text-[10px] px-0.5">
          <span className="text-[#CDC8C1] blink-text truncate max-w-[260px]">
            &gt; {currentText}
          </span>
          <span className="font-bold text-amber tracking-wider shrink-0 ml-2 font-mono">
            {Math.floor(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}

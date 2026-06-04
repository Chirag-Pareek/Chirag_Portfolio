import type { ViewState } from '../App';
import { playClickSound } from '@/lib/sounds';

interface NavigationProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
}

export function Navigation({ currentView, setCurrentView }: NavigationProps) {
  const handleViewChange = (view: ViewState) => {
    playClickSound();
    setCurrentView(view);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 h-[68px] border-b border-[#E8E0D4] bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[1500px] items-center justify-between px-4 sm:px-6 md:px-12">
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            src="/assets/profile-pic.png"
            alt="Avatar"
            className="w-8 h-8 object-cover rounded-full pixelated cursor-pointer active:scale-90 transition-transform duration-100"
            onClick={() => handleViewChange('projects')}
          />
          <button
            onClick={() => handleViewChange('projects')}
            className="font-pixel text-[9px] tracking-wider text-ink transition-all duration-150 hover:text-amber active:scale-95 md:text-xs select-none"
          >
            Chirag Pareek <span className="text-amber">//</span>
          </button>
          <span className="hidden font-mono text-[10px] tracking-[0.15em] text-warm-gray sm:inline">
            building AI apps fast
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <button
            onClick={() => handleViewChange('projects')}
            className={`relative font-mono text-[11px] uppercase tracking-[0.14em] px-3 py-2 rounded-md transition-all duration-150 active:scale-95 select-none md:text-xs group ${
              currentView === 'projects' ? 'text-amber font-bold' : 'text-warm-gray hover:text-ink'
            }`}
          >
            <span>Projects</span>
            <span className={`absolute bottom-0.5 left-3 right-3 h-[2px] bg-amber transition-transform duration-300 origin-left ${
              currentView === 'projects' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            }`} />
          </button>
          <button
            onClick={() => handleViewChange('about')}
            className={`relative font-mono text-[11px] uppercase tracking-[0.14em] px-3 py-2 rounded-md transition-all duration-150 active:scale-95 select-none md:text-xs group ${
              currentView === 'about' ? 'text-amber font-bold' : 'text-warm-gray hover:text-ink'
            }`}
          >
            <span>About</span>
            <span className={`absolute bottom-0.5 left-3 right-3 h-[2px] bg-amber transition-transform duration-300 origin-left ${
              currentView === 'about' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            }`} />
          </button>
        </div>
      </div>
    </nav>
  );
}

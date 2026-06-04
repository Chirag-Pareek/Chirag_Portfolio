import type { ViewState } from '../App';

interface NavigationProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
}

export function Navigation({ currentView, setCurrentView }: NavigationProps) {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 h-[68px] border-b border-[#E8E0D4] bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[1500px] items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-4">
          <img src="/assets/profile-pic.png" alt="Avatar" className="w-8 h-8 object-contain pixelated cursor-pointer" onClick={() => setCurrentView('projects')} />
          <button
            onClick={() => setCurrentView('projects')}
            className="font-pixel text-[10px] tracking-wider text-ink transition-colors duration-200 hover:text-amber md:text-xs"
          >
            Chirag Pareek <span className="text-amber">//</span>
          </button>
          <span className="hidden font-mono text-[11px] tracking-[0.18em] text-warm-gray sm:inline">
            building AI apps fast
          </span>
        </div>

        <div className="flex items-center gap-6 md:gap-8">
          <button
            onClick={() => setCurrentView('projects')}
            className={`font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 hover:text-amber md:text-xs ${currentView === 'projects' ? 'text-amber' : 'text-warm-gray'}`}
          >
            Projects
          </button>
          <button
            onClick={() => setCurrentView('about')}
            className={`font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 hover:text-amber md:text-xs ${currentView === 'about' ? 'text-amber' : 'text-warm-gray'}`}
          >
            About
          </button>
        </div>
      </div>
    </nav>
  );
}

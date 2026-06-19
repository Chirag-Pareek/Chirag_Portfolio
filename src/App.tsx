import { useState } from 'react';
import './App.css';

import { CustomCursor } from '@/components/CustomCursor';
import { Navigation } from '@/components/Navigation';
import { PixelCanvas } from '@/components/PixelCanvas';
import { HeroSection } from '@/sections/HeroSection';
import { AboutSection } from '@/sections/AboutSection';
import { Footer } from '@/sections/Footer';

export type ViewState = 'projects' | 'about';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('projects');
  const [isLoaded, setIsLoaded] = useState(true);

  return (
    <div className="h-dvh w-screen overflow-hidden bg-[#FFFCF7] text-ink relative">
      
      <div 
        className={`h-full w-full flex flex-col transition-all duration-1000 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98] pointer-events-none'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <CustomCursor />
        <PixelCanvas />
        <Navigation currentView={currentView} setCurrentView={setCurrentView} />
        <main className="relative z-10 h-full w-full">
          {currentView === 'projects' ? <HeroSection /> : <AboutSection />}
        </main>
        {currentView === 'projects' && <Footer />}
      </div>
    </div>
  );
}

export default App;

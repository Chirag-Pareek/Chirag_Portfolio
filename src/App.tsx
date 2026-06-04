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

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#FFFCF7] text-ink">
      <CustomCursor />
      <PixelCanvas />
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      <main className="relative z-10 h-full w-full">
        {currentView === 'projects' ? <HeroSection /> : <AboutSection />}
      </main>
      <Footer />
    </div>
  );
}

export default App;

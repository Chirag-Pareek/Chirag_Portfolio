import { SocialIcon } from '@/components/SocialIcon';

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-[72px] border-t border-[#E8E0D4] bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[1500px] items-center justify-between px-6 md:px-12">
        <p className="font-mono text-[11px] text-warm-gray">
          2026 <span className="text-amber">Chirag Pareek</span> // All rights reserved
        </p>
        <div className="flex gap-2">
          <SocialIcon platform="github" href="https://github.com/Chirag-Pareek" size="sm" />
          <SocialIcon platform="twitter" href="https://x.com/chiragpareek677" size="sm" />
          <SocialIcon platform="linkedin" href="https://www.linkedin.com/in/chirag-pareek-369b4b265" size="sm" />
        </div>
      </div>
    </footer>
  );
}

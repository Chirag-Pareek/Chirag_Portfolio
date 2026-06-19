
import { playClickSound, playCoinSound } from '@/lib/sounds';
import { GitHubCalendar } from 'react-github-calendar';

const SKILLS_DEV = [
  { name: 'Flutter / Dart', level: 90, tier: 'Expert' },
  { name: 'React / Next.js', level: 85, tier: 'Advanced' },
  { name: 'Node.js / NestJS', level: 80, tier: 'Advanced' },
  { name: 'TypeScript', level: 95, tier: 'MAX' },
  { name: 'PostgreSQL / Supabase', level: 75, tier: 'Advanced' },
];

const SKILLS_AI = [
  { name: 'Prompt Engineering', level: 90, tier: 'Expert' },
  { name: 'LLM Integration', level: 85, tier: 'Advanced' },
  { name: 'Groq API / OpenAI', level: 85, tier: 'Advanced' },
  { name: 'AI Architecture', level: 80, tier: 'Advanced' },
];

const QUESTS = [
  {
    category: 'MAIN QUEST',
    xp: '+50 XP',
    title: 'Knovi',
    subtitle: 'AI Quiz Platform',
    date: '2023 - 2024 . Fullstack Builder',
    description: 'Built an AI-powered interview simulation platform that helps users test their real-world knowledge through advanced, topic-based assessments using Groq and Flutter.',
  },
  {
    category: 'PASSION PROJECT',
    xp: '+40 XP',
    title: 'Mimicly',
    subtitle: 'AI Chat Assistant',
    date: '2024 - 2025 . Self-Initiated',
    description: 'Developed an AI assistant that helps you reply like anyone—whether it’s a friend, partner, or professional—in seconds using React and NestJS.',
  },
  {
    category: 'MAIN QUEST',
    xp: '+45 XP',
    title: 'NoteForge',
    subtitle: 'EdTech Mobile App',
    date: '2024 - 2025 . Full-time',
    description: 'Created NoteForge, an all-in-one AI-powered learning app designed to help students study smarter, stay organized, and track real progress.',
  },
  {
    category: 'SIDE QUEST',
    xp: '+60 XP',
    title: 'Fineprint',
    subtitle: 'Legal AI Analysis',
    date: '2025 - 2026 . Freelance',
    description: 'Built an app to scan contracts (gym, lease, job offer, SaaS terms) and get plain-English risk analysis so users can take action safely.',
  },
  {
    category: 'MAIN QUEST',
    xp: '+30 XP',
    title: 'GitDocs+',
    subtitle: 'Developer Web Tool',
    date: '2023 - 2024 . Open Source',
    description: 'Designed and built GitDocs+ – All GitHub commands in one modern, easy-to-use interface. Just read, copy, and use. Simple.',
  },
  {
    category: 'SIDE QUEST',
    xp: '+35 XP',
    title: 'WatchFlo',
    subtitle: 'Entertainment App',
    date: '2024 - 2025 . Part-time',
    description: 'A modern mobile application for tracking and streaming watch progress seamlessly across multiple devices.',
  },
];

interface AnimatedSocialButtonProps {
  platform: 'github' | 'linkedin' | 'x';
  href: string;
}

const SOCIAL_ICONS = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
};

const SOCIAL_COLORS = {
  github: {
    bg: 'bg-[#24292e]',
    textHover: 'group-hover:text-white',
    border: 'hover:border-[#24292e]',
    shadow: 'hover:shadow-[0_8px_20px_rgba(36,41,46,0.25)]'
  },
  linkedin: {
    bg: 'bg-[#0A66C2]',
    textHover: 'group-hover:text-white',
    border: 'hover:border-[#0A66C2]',
    shadow: 'hover:shadow-[0_8px_20px_rgba(10,102,194,0.25)]'
  },
  x: {
    bg: 'bg-[#000000]',
    textHover: 'group-hover:text-white',
    border: 'hover:border-black',
    shadow: 'hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]'
  }
};

function AnimatedSocialButton({ platform, href }: AnimatedSocialButtonProps) {
  const colors = SOCIAL_COLORS[platform];
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        playClickSound();
      }}
      className={`relative w-12 h-12 flex items-center justify-center border border-ink bg-white text-ink overflow-hidden rounded-md group hover:-translate-y-1 transition-all duration-300 ${colors.border} ${colors.shadow}`}
    >
      <div 
        className={`absolute bottom-0 left-0 w-full h-full ${colors.bg} translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0`}
      />
      <span className={`relative z-10 text-ink transition-colors duration-300 ${colors.textHover}`}>
        {SOCIAL_ICONS[platform]}
      </span>
    </a>
  );
}

export function AboutSection() {
  return (
    <section className="absolute inset-0 pt-[68px] overflow-y-auto bg-[#FDFBF7] scroll-smooth">
      <div className="mx-auto max-w-[1200px] w-full px-6 py-16 md:px-12 flex flex-col gap-24">
        
        {/* PLAYER PROFILE */}
        <div className="flex flex-col lg:flex-row gap-16 justify-between items-start">
          
          {/* Left Column: Info */}
          <div className="flex-1 flex flex-col gap-8 max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F7B33D] font-bold">
              — PLAYER PROFILE
            </span>
            
            <div>
              <h1 className="font-pixel text-[26px] sm:text-[38px] md:text-[56px] leading-tight text-ink">
                Chirag
                <br />
                Pareek
              </h1>
            </div>

            <p className="font-mono text-[11px] leading-[1.8] text-ink/80 max-w-xl">
              I operate at the intersection where code meets intelligence - conjuring the magic in between. From full-stack web applications to perceptive mobile interfaces, I build digital worlds from the ground up. From pixels to protocols.
              <br /><br />
              Early builder at multiple AI startups. Fluent in Flutter, React, and Node.js.
            </p>

            {/* Social Buttons with slide-up fill effect */}
            <div className="flex flex-col gap-3 pt-2">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#B5B0AA] block select-none">
                CONNECT / SOCIALS
              </span>
              <div className="flex gap-3">
                <AnimatedSocialButton platform="github" href="https://github.com/Chirag-Pareek" />
                <AnimatedSocialButton platform="linkedin" href="https://www.linkedin.com/in/chirag-pareek-369b4b265" />
                <AnimatedSocialButton platform="x" href="https://x.com/chiragpareek677" />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {['FULL STACK', 'AI INTEGRATION', 'MOBILE DEV', 'SYSTEM DESIGN', 'FRONTEND', 'BACKEND'].map((tag) => (
                <span
                  key={tag}
                  onClick={playClickSound}
                  className="border border-[#E8E0D4] bg-white px-4 py-2 font-mono text-[9px] uppercase tracking-wider text-warm-gray cursor-pointer hover:border-amber hover:text-amber active:scale-95 transition-all select-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Sprite Card */}
          <div className="w-full lg:w-[400px] border border-[#E8E0D4] bg-white shadow-[0_20px_50px_rgba(26,26,26,0.03)] flex flex-col shrink-0">
            <div className="p-6 border-b border-[#E8E0D4] flex justify-center items-center bg-[#FDFBF7] min-h-[300px] relative">
              <div className="absolute top-6 left-6 bg-[#F7B33D] px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-white font-bold">
                CREATIVE SOFTWARE ENGINEER
              </div>
              <img
                src="/assets/profile-pic.png"
                alt="Avatar"
                className="w-48 h-48 object-contain pixelated drop-shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all"
                onClick={playCoinSound}
              />
            </div>
            
            <div className="p-6 flex flex-col gap-6">
              <div className="flex justify-between">
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#B5B0AA] block mb-1">TOKEN</span>
                  <span className="font-mono text-[11px] text-[#F7B33D] font-bold tracking-wider uppercase">chiragpareek</span>
                </div>
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#B5B0AA] block mb-1">AGE</span>
                  <span className="font-pixel text-[14px] text-ink uppercase">21</span>
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#B5B0AA] block mb-1">CLASS</span>
                  <span className="font-mono text-[10px] text-ink font-bold tracking-wider uppercase">Full Stack Dev</span>
                </div>
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#B5B0AA] block mb-1">GUILD</span>
                  <span className="font-mono text-[10px] text-ink font-bold tracking-wider uppercase">AI Innovators</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-2">
                {[
                  { label: 'DEVELOPMENT POWER', val: 95 },
                  { label: 'AI INTEGRATION XP', val: 85 },
                  { label: 'MOBILE SKILL', val: 90 },
                  { label: 'BACKEND / DB', val: 80 }
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1.5">
                    <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#B5B0AA]">{stat.label}</span>
                    <div className="h-1 w-full bg-[#EFE8DD]">
                      <div className="h-full bg-[#F7B33D]" style={{ width: `${stat.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* QUEST LOG */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4 border-b border-[#E8E0D4] pb-4">
            <span className="font-pixel text-[20px] text-[#F7B33D]">01</span>
            <h2 className="font-pixel text-[24px] text-ink">Quest Log</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 border-l border-t border-[#E8E0D4]">
            {QUESTS.map((quest, i) => (
              <div
                key={i}
                onClick={playClickSound}
                className="border-r border-b border-[#E8E0D4] p-8 flex flex-col bg-white hover:bg-[#FDFBF7] cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all select-none"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#F7B33D] font-bold">
                    — {quest.category}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#F7B33D]">
                    {quest.xp}
                  </span>
                </div>
                
                <h3 className="font-pixel text-[18px] text-ink mb-2">{quest.title}</h3>
                <p className="font-mono text-[10px] text-warm-gray mb-1">{quest.subtitle}</p>
                <p className="font-mono text-[9px] text-[#B5B0AA] mb-6 uppercase tracking-wider">{quest.date}</p>
                
                <p className="font-mono text-[10px] text-ink leading-relaxed">
                  {quest.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SKILL TREE */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4 border-b border-[#E8E0D4] pb-4">
            <span className="font-pixel text-[20px] text-[#F7B33D]">02</span>
            <h2 className="font-pixel text-[24px] text-ink">Skill Tree</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-12">
            
            {/* Column 1 */}
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F7B33D] font-bold mb-2">
                — DEVELOPMENT
              </span>
              {SKILLS_DEV.map((skill) => (
                <div key={skill.name} className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <span className="font-mono text-[11px] font-bold text-ink uppercase tracking-wider">{skill.name}</span>
                    <span className="font-mono text-[8px] text-[#B5B0AA] uppercase tracking-[0.1em]">{skill.tier}</span>
                  </div>
                  <div className="h-[2px] w-full bg-[#EFE8DD] relative">
                    <div 
                      className="absolute left-0 top-0 h-full bg-[#F7B33D]" 
                      style={{ width: `${skill.level}%` }}
                    />
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 bg-[#F7B33D]"
                      style={{ left: `${skill.level}%`, transform: 'translate(-50%, -50%)' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F7B33D] font-bold mb-2">
                — AI & CLOUD
              </span>
              {SKILLS_AI.map((skill) => (
                <div key={skill.name} className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <span className="font-mono text-[11px] font-bold text-ink uppercase tracking-wider">{skill.name}</span>
                    <span className="font-mono text-[8px] text-[#B5B0AA] uppercase tracking-[0.1em]">{skill.tier}</span>
                  </div>
                  <div className="h-[2px] w-full bg-[#EFE8DD] relative">
                    <div 
                      className="absolute left-0 top-0 h-full bg-[#F7B33D]" 
                      style={{ width: `${skill.level}%` }}
                    />
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 bg-[#F7B33D]"
                      style={{ left: `${skill.level}%`, transform: 'translate(-50%, -50%)' }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* GITHUB ANALYTICS */}
        <div className="flex flex-col gap-8 pb-24">
          <div className="flex items-center gap-4 border-b border-[#E8E0D4] pb-4">
            <span className="font-pixel text-[20px] text-[#F7B33D]">03</span>
            <h2 className="font-pixel text-[24px] text-ink">GitHub Analytics</h2>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border border-[#E8E0D4] bg-white p-6 flex justify-center items-center hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(232,148,58,0.08)] hover:shadow-[0_8px_30px_rgba(232,148,58,0.2)] hover:border-[#F7B33D]/50 rounded-lg cursor-default relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F7B33D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src="https://github-readme-stats.vercel.app/api?username=Chirag-Pareek&show_icons=true&bg_color=FFFFFF&title_color=F7B33D&text_color=1A1A1A&icon_color=F7B33D&border_color=FFFFFF&hide_border=true&border_radius=0" 
                alt="GitHub Stats" 
                className="w-full max-w-[450px] relative z-10 drop-shadow-sm"
              />
            </div>
            <div className="border border-[#E8E0D4] bg-white p-6 flex justify-center items-center hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(232,148,58,0.08)] hover:shadow-[0_8px_30px_rgba(232,148,58,0.2)] hover:border-[#F7B33D]/50 rounded-lg cursor-default relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-bl from-[#F7B33D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=Chirag-Pareek&layout=compact&bg_color=FFFFFF&title_color=F7B33D&text_color=1A1A1A&border_color=FFFFFF&hide_border=true&border_radius=0" 
                alt="Top Languages" 
                className="w-full max-w-[400px] relative z-10 drop-shadow-sm"
              />
            </div>
          </div>

          {/* Streak Stats */}
          <div className="border border-[#E8E0D4] bg-white p-6 flex justify-center items-center hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(232,148,58,0.08)] hover:shadow-[0_8px_30px_rgba(232,148,58,0.2)] hover:border-[#F7B33D]/50 rounded-lg cursor-default relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-b from-[#F7B33D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <img 
                src="https://github-readme-streak-stats.herokuapp.com/?user=Chirag-Pareek&background=FFFFFF&border=FFFFFF&stroke=F7B33D&ring=F7B33D&fire=F7B33D&currStreakNum=F7B33D&sideNums=1A1A1A&currStreakLabel=1A1A1A&sideLabels=1A1A1A&dates=8B8175&hide_border=true&border_radius=0" 
                alt="GitHub Streak" 
                className="w-full max-w-[800px] relative z-10 drop-shadow-md"
              />
          </div>

          {/* Contributions Graph */}
          <div className="border border-[#E8E0D4] bg-white p-8 flex justify-center items-center overflow-x-auto hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(232,148,58,0.08)] hover:shadow-[0_8px_30px_rgba(232,148,58,0.2)] hover:border-[#F7B33D]/50 rounded-lg cursor-default relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#F7B33D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="min-w-[800px] flex justify-center relative z-10 [&_rect:hover]:drop-shadow-[0_0_6px_rgba(247,179,61,0.8)] [&_rect[data-level='1']]:drop-shadow-[0_0_2px_rgba(245,217,168,0.3)] [&_rect[data-level='2']]:drop-shadow-[0_0_3px_rgba(255,210,122,0.5)] [&_rect[data-level='3']]:drop-shadow-[0_0_4px_rgba(232,148,58,0.7)] [&_rect[data-level='4']]:drop-shadow-[0_0_6px_rgba(212,121,42,0.9)] transition-all duration-300">
              <GitHubCalendar 
                username="Chirag-Pareek" 
                blockSize={15}
                blockMargin={5}
                fontSize={13}
                theme={{
                  light: ['#EFE8DD', '#F5D9A8', '#FFD27A', '#E8943A', '#D4792A'],
                  dark: ['#EFE8DD', '#F5D9A8', '#FFD27A', '#E8943A', '#D4792A'],
                }}
                labels={{
                  totalCount: '{{count}} contributions in the last year',
                }}
                style={{
                  color: '#1A1A1A',
                  fontFamily: '"JetBrains Mono", monospace'
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

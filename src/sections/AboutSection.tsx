import React from 'react';

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
              <h1 className="font-pixel text-[42px] leading-tight text-ink md:text-[56px]">
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

            <div className="flex flex-wrap gap-3 pt-2">
              {['FULL STACK', 'AI INTEGRATION', 'MOBILE DEV', 'SYSTEM DESIGN', 'FRONTEND', 'BACKEND'].map((tag) => (
                <span
                  key={tag}
                  className="border border-[#E8E0D4] bg-white px-4 py-2 font-mono text-[9px] uppercase tracking-wider text-warm-gray"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Sprite Card */}
          <div className="w-full lg:w-[400px] border border-[#E8E0D4] bg-white shadow-[0_20px_50px_rgba(26,26,26,0.03)] flex flex-col shrink-0">
            <div className="p-6 border-b border-[#E8E0D4] flex justify-center items-center bg-[#FDFBF7] min-h-[300px]">
              <div className="absolute top-6 left-6 bg-[#F7B33D] px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-white font-bold">
                chirag the builder
              </div>
              <img src="/assets/profile-pic.png" alt="Avatar" className="w-48 h-48 object-contain pixelated drop-shadow-md" />
            </div>
            
            <div className="p-6 flex flex-col gap-6">
              <div className="flex justify-between">
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#B5B0AA] block mb-1">TOKEN</span>
                  <span className="font-mono text-[11px] text-[#F7B33D] font-bold tracking-wider uppercase">chrgprk</span>
                </div>
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#B5B0AA] block mb-1">LEVEL</span>
                  <span className="font-pixel text-[14px] text-ink uppercase">015</span>
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
              <div key={i} className="border-r border-b border-[#E8E0D4] p-8 flex flex-col bg-white hover:bg-[#FDFBF7] transition-colors">
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
        <div className="flex flex-col gap-8 pb-24">
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

      </div>
    </section>
  );
}

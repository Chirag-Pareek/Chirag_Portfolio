import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  color: string;
}

const SKILLS: Skill[] = [
  { name: 'Flutter', color: '#54C5F8' },
  { name: 'Dart', color: '#0175C2' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'React', color: '#61DAFB' },
  { name: 'NestJS', color: '#E0234E' },
  { name: 'REST APIs', color: '#FF7A59' },
  { name: 'JWT Auth', color: '#8B5CF6' },
  { name: 'OAuth', color: '#0EA5E9' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'Supabase', color: '#3ECF8E' },
  { name: 'Firebase', color: '#FFCA28' },
  { name: 'OpenAI API', color: '#10A37F' },
  { name: 'Groq API', color: '#F55036' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'Git', color: '#F05032' },
  { name: 'VS Code', color: '#007ACC' },
];

function SkillPill({ skill }: { skill: Skill }) {
  return (
    <span className="inline-flex items-center gap-2 bg-card-bg border border-card-border rounded px-4 py-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.06em] text-ink hover:bg-[#FFF5EB] hover:border-amber hover:-translate-y-px transition-all duration-200">
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: skill.color }}
      />
      {skill.name}
    </span>
  );
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const pills = sectionRef.current?.querySelectorAll('.skill-pill');
    if (pills) {
      gsap.from(pills, {
        scale: 0.8,
        opacity: 0,
        stagger: 0.04,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative z-10 max-w-[720px] mx-auto px-6 py-[80px] md:py-[100px]"
    >
      <SectionLabel text="TECH STACK" />

      <div className="flex flex-wrap gap-3 justify-center">
        {SKILLS.map((skill) => (
          <span key={skill.name} className="skill-pill">
            <SkillPill skill={skill} />
          </span>
        ))}
      </div>
    </section>
  );
}

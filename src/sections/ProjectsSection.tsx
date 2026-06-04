import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: string;
  description: string;
  icon: string;
  href: string;
}

const PROJECTS: Project[] = [
  {
    name: 'Mimicly',
    description: 'AI chat assistant with overlay UI, NestJS backend, Supabase, auth, payments, and SaaS-style usage tracking',
    icon: '/assets/project-icon-1.jpg',
    href: 'https://mimicly.netlify.app/',
  },
  {
    name: 'Knovi',
    description: 'AI quiz platform with Flutter app, React web experience, Groq API, anti-cheat flows, and live leaderboard',
    icon: '/assets/project-icon-2.jpg',
    href: 'https://knovi-web.vercel.app/',
  },
  {
    name: 'Knovi APK',
    description: 'Android build for the AI quiz experience with custom mobile gameplay and anti-cheat protection',
    icon: '/assets/project-icon-3.jpg',
    href: 'https://github.com/Chirag-Pareek/Knovi-WebAndApp/releases/download/v1.0/Knovi.apk',
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 bg-card-bg border border-card-border rounded-lg px-4 py-2 hover:border-amber hover:-translate-y-0.5 hover:shadow-amber-glow transition-all duration-300 will-change-transform"
    >
      <img
        src={project.icon}
        alt={project.name}
        className="w-8 h-8 rounded-md object-cover"
      />
      <span className="font-mono text-[14px] font-medium text-ink">
        {project.name}
      </span>
    </a>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const rows = sectionRef.current?.querySelectorAll('.project-row');
    if (rows) {
      gsap.from(rows, {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-10 max-w-[720px] mx-auto px-6 py-[80px] md:py-[100px]"
    >
      <SectionLabel text="PROJECTS" />

      <div className="space-y-8">
        {PROJECTS.map((project) => (
          <div key={project.name} className="project-row flex flex-wrap items-center gap-3">
            <span className="font-mono text-[15px] text-warm-gray">
              I built
            </span>
            <ProjectCard project={project} />
            <span className="font-mono text-[15px] text-warm-gray">
              - {project.description}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

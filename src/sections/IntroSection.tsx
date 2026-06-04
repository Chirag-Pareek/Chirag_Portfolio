import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const lines = sectionRef.current?.querySelectorAll('.intro-line');
    if (lines) {
      gsap.from(lines, {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
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
      id="about"
      className="relative z-10 max-w-[720px] mx-auto px-6 py-[100px] md:py-[120px]"
    >
      <div className="space-y-6 font-mono text-[16px] sm:text-[18px] leading-[1.75] text-ink">
        <p className="intro-line flex flex-wrap items-center gap-2">
          <span>Hi, I'm</span>
          <span className="inline-flex items-center gap-2">
            <img
              src="/assets/profile-pic.png"
              alt="Chirag Pareek"
              className="w-10 h-10 rounded-full border-2 border-amber hover:scale-110 transition-transform duration-200"
              style={{ imageRendering: 'pixelated' }}
            />
            <span>Chirag Pareek</span>
          </span>
        </p>

        <p className="intro-line">
          Flutter Developer and Backend Engineer building AI-powered products for mobile and web.
        </p>

        <p className="intro-line">
          I work across clean architecture, REST API integration, authentication flows, and production-ready full-stack systems.
        </p>

        <p className="intro-line flex flex-wrap items-center gap-2">
          <span>Featured projects include</span>
          <a
            href="https://mimicly.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-warm-gray hover:text-amber transition-colors duration-200"
          >
            Mimicly
          </a>
          <span>,</span>
          <a
            href="https://knovi-web.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-warm-gray hover:text-amber transition-colors duration-200"
          >
            Knovi
          </a>
          <span>, and NoteForge.</span>
        </p>

        <p className="intro-line">
          Based in Vadodara, Gujarat, India with a builder mindset from concept to live deployment.
        </p>

        <p className="intro-line flex flex-wrap items-center gap-2">
          <span>Reach me at</span>
          <a
            href="mailto:chiragpareek677@gmail.com"
            className="inline-flex items-center gap-2 bg-card-bg border border-card-border rounded-full px-3.5 py-1 hover:border-amber hover:shadow-amber-glow transition-all duration-300"
          >
            <span className="font-mono text-[14px] text-amber font-medium">chiragpareek677@gmail.com</span>
          </a>
        </p>
      </div>
    </section>
  );
}

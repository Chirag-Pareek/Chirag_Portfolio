import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const rows = sectionRef.current?.querySelectorAll('.cta-row');
    if (rows) {
      gsap.from(rows, {
        y: 20,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative z-10 max-w-[720px] mx-auto px-6 py-[60px] md:py-[80px] mb-[40px]"
    >
      <div className="border-t border-card-border pt-12 space-y-4">
        <p className="cta-row font-mono text-[15px] text-ink">
          Need a developer?{' '}
          <a href="mailto:chiragpareek677@gmail.com?subject=Hiring%20Inquiry" className="text-amber hover:text-amber-hover hover:underline underline-offset-4 transition-colors duration-200">
            Hire me {'->'}
          </a>
        </p>
        <p className="cta-row font-mono text-[15px] text-ink">
          Want to collaborate?{' '}
          <a href="https://www.linkedin.com/in/chirag-pareek-369b4b265" target="_blank" rel="noopener noreferrer" className="text-amber hover:text-amber-hover hover:underline underline-offset-4 transition-colors duration-200">
            Let's talk {'->'}
          </a>
        </p>
        <p className="cta-row font-mono text-[15px] text-ink">
          Just saying hi?{' '}
          <a href="https://x.com/chiragpareek677" target="_blank" rel="noopener noreferrer" className="text-amber hover:text-amber-hover hover:underline underline-offset-4 transition-colors duration-200">
            Say hello {'->'}
          </a>
        </p>
      </div>
    </section>
  );
}

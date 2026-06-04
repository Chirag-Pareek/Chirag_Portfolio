import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { SocialIcon } from '@/components/SocialIcon';

gsap.registerPlugin(ScrollTrigger);

export function SocialSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const icons = sectionRef.current?.querySelectorAll('.social-icon-wrap');
    if (icons) {
      gsap.from(icons, {
        x: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
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
      className="relative z-10 max-w-[720px] mx-auto px-6 py-[80px] md:py-[100px]"
    >
      <SectionLabel text="CONNECT" />

      <p className="font-mono text-[16px] sm:text-[18px] text-ink mb-6">
        Find me on these platforms or drop me an email.
      </p>

      <div className="flex gap-4">
        <span className="social-icon-wrap">
          <SocialIcon platform="github" href="https://github.com/Chirag-Pareek" />
        </span>
        <span className="social-icon-wrap">
          <SocialIcon platform="twitter" href="https://x.com/chiragpareek677" />
        </span>
        <span className="social-icon-wrap">
          <SocialIcon platform="linkedin" href="https://www.linkedin.com/in/chirag-pareek-369b4b265" />
        </span>
        <span className="social-icon-wrap">
          <SocialIcon platform="discord" href="mailto:chiragpareek677@gmail.com" />
        </span>
      </div>
    </section>
  );
}

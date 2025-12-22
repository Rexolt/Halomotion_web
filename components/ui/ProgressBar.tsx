'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProgressBar = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // FONTOS: Height helyett scaleY-t használunk a simább animációért
    gsap.fromTo(barRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0,
        }
      }
    );
  });

  return (
    <div className="fixed top-0 right-0 h-screen w-1.5 z-[9990] mix-blend-difference pointer-events-none">
      {/* Háttér csík (halvány) */}
      <div className="absolute inset-0 bg-white/10 w-full h-full" />

      {/* Mozgó csík (piros) */}
      <div
        ref={barRef}
        className="w-full h-full bg-halo-red origin-top"
      />
    </div>
  );
};
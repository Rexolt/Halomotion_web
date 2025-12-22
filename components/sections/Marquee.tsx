'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const Marquee = () => {
  const container = useRef<HTMLDivElement>(null);
  const firstText = useRef<HTMLDivElement>(null);
  const secondText = useRef<HTMLDivElement>(null);
  const xPercent = useRef(0);
  const direction = useRef(-1);

  useGSAP(() => {
    const animation = () => {
      if (!firstText.current || !secondText.current) return;

      if (xPercent.current <= -100) xPercent.current = 0;
      if (xPercent.current > 0) xPercent.current = -100;

      gsap.set(firstText.current, { xPercent: xPercent.current });
      gsap.set(secondText.current, { xPercent: xPercent.current });

      xPercent.current += 0.05 * direction.current;
    };

    gsap.ticker.add(animation);

    return () => {
      gsap.ticker.remove(animation);
    };
  }, { scope: container });

  return (
    <div ref={container} className="relative overflow-hidden bg-halo-dark py-12 border-y border-white/10">
      <div className="flex whitespace-nowrap">
        <div ref={firstText} className="flex gap-20 pr-20">
          <span className="text-[10vw] md:text-[4vw] font-display font-bold text-transparent uppercase" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>Cinematography Color Grading Sound Design VFX</span>
        </div>
        <div ref={secondText} className="flex gap-20 pr-20 absolute left-full top-0 py-12">
          <span className="text-[10vw] md:text-[4vw] font-display font-bold text-transparent uppercase" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>Cinematography Color Grading Sound Design VFX</span>
        </div>
      </div>
    </div>
  );
};
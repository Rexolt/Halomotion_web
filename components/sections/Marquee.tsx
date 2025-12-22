'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const Marquee = () => {
  const firstText = useRef(null);
  const secondText = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    requestAnimationFrame(animation);
  }, []);

  const animation = () => {
    if (xPercent <= -100) xPercent = 0;
    if (xPercent > 0) xPercent = -100;
    
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    
    xPercent += 0.05 * direction; // Sebesség
    requestAnimationFrame(animation);
  };

  return (
    <div className="relative overflow-hidden bg-halo-dark py-12 border-y border-white/10">
      <div className="flex whitespace-nowrap">
        <div ref={firstText} className="flex gap-20 pr-20">
          <span className="text-[4vw] font-display font-bold text-transparent uppercase" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>Cinematography Color Grading Sound Design VFX</span>
        </div>
        <div ref={secondText} className="flex gap-20 pr-20 absolute left-full top-0 py-12">
          <span className="text-[4vw] font-display font-bold text-transparent uppercase" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>Cinematography Color Grading Sound Design VFX</span>
        </div>
      </div>
    </div>
  );
};
'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const CustomCursor = () => {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorOutline = useRef<HTMLDivElement>(null);

  useGSAP(() => {

    const isDesktop = window.matchMedia("(pointer: fine)").matches;
    if (!isDesktop) return;

    const dot = cursorDot.current;
    const outline = cursorOutline.current;

    if (!dot || !outline) return;


    gsap.set([dot, outline], { xPercent: -50, yPercent: -50, opacity: 0 });


    const xToDot = gsap.quickTo(dot, "x", { duration: 0.01, ease: "power1.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.01, ease: "power1.out" });

    const xToOutline = gsap.quickTo(outline, "x", { duration: 0.15, ease: "power2.out" });
    const yToOutline = gsap.quickTo(outline, "y", { duration: 0.15, ease: "power2.out" });

    const moveCursor = (e: MouseEvent) => {

      if (dot.style.opacity === '0') {
        gsap.to([dot, outline], { opacity: 1, duration: 0.3 });
      }

      xToDot(e.clientX);
      yToDot(e.clientY);
      xToOutline(e.clientX);
      yToOutline(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  });


  return (
    <>

      <div
        ref={cursorDot}
        className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none mix-blend-exclusion z-[99999]"
      />

      <div
        ref={cursorOutline}
        className="hidden md:block fixed top-0 left-0 w-10 h-10 border border-white/60 rounded-full pointer-events-none mix-blend-exclusion z-[99999]"
      />
    </>
  );
};
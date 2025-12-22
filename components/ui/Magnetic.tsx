'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const magnetic = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const element = magnetic.current;
    if (!element) return;

    // A mozgás sebessége és rugalmassága
    const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      
      // Kiszámoljuk a középponttól való távolságot
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Mozgatjuk az elemet (a 0.35 az erősség, növeld ha erősebb hatást akarsz)
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const mouseLeave = () => {
      // Visszaállás középre
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", mouseMove);
    element.addEventListener("mouseleave", mouseLeave);

    return () => {
      element.removeEventListener("mousemove", mouseMove);
      element.removeEventListener("mouseleave", mouseLeave);
    };
  }, { scope: magnetic });

  // Fontos: a 'w-fit' miatt csak akkora lesz, mint a tartalom
  return (
    <div ref={magnetic} className="w-fit h-fit inline-block cursor-pointer">
      {children}
    </div>
  );
};
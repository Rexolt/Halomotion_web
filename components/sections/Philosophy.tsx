// components/sections/Philosophy.tsx
'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const Philosophy = ({ text }: { text: string }) => {
  const container = useRef(null);

  useGSAP(() => {
    const words = gsap.utils.toArray('.reveal-word');
    gsap.to(words, {
      opacity: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        end: "bottom 50%",
        scrub: true
      }
    });
  }, { scope: container });

  const words = text.split(" ");

  return (
    <section ref={container} className="py-20 px-6 md:py-40 md:px-20 bg-halo-black border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <span className="text-halo-red font-display text-xs tracking-widest mb-8 block">PHILOSOPHY</span>
        <p className="text-xl md:text-4xl leading-[1.6] font-light text-white">
          {words.map((word, i) => (
            <span key={i} className="reveal-word inline-block mr-2 opacity-10 transition-opacity">{word}</span>
          ))}
        </p>
      </div>
    </section>
  );
};
'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { 
    id: '01', 
    phase: 'PRE-PRODUCTION',
    title: 'THE VISION', 
    desc: 'Mielőtt az első képkocka rögzülne, lebontjuk az üzenetet az atomjaira. Storyboard, casting, location scouting – a káoszban rendet teremtünk.', 
    img: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070',
    color: '#dc2626'
  },
  { 
    id: '02', 
    phase: 'PRODUCTION',
    title: 'THE ACTION', 
    desc: 'A forgatás napja a szentírás. High-end kamerák, fények tánca és precíz rendezés. Nincs felesleges mozdulat, csak a tökéletes pillanat vadászata.', 
    img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1470',
    color: '#ffffff'
  },
  { 
    id: '03', 
    phase: 'POST-PRODUCTION',
    title: 'THE MAGIC', 
    desc: 'A vágószoba csendjében születik meg a ritmus. Color grading, sound design és VFX. Itt válik a nyersanyagból valódi, lélegző történet.', 
    img: 'https://images.unsplash.com/photo-1704806050523-177b86dec093?q=80&w=763',
    color: '#dc2626'
  }
];

export const Process = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.process-card');
    
    cards.forEach((card: any, index) => {
      if (index === cards.length - 1) return;
      const nextCard = cards[index + 1];

      gsap.to(card, {
        scale: 0.9,
        opacity: 0.4,
        filter: 'blur(5px)',
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true,
          pinSpacing: false,
        }
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative bg-halo-black py-10 md:py-20 pb-20 md:pb-40 px-3 md:px-10">
      
      <div className="mb-12 md:mb-20 px-2 md:px-10">
        <span className="text-halo-red font-display text-xs tracking-widest block mb-4">WORKFLOW</span>
        <h2 className="font-display text-4xl md:text-7xl text-white">THE <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>PROCESS</span></h2>
      </div>

      <div className="flex flex-col items-center w-full">
        {steps.map((step, i) => (
          <div 
            key={i} 
            // UPDATED: Adjusted height for mobile (60vh) vs desktop (80vh)
            className="process-card sticky top-20 w-full max-w-6xl h-[60vh] md:h-[80vh] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl flex flex-col md:flex-row mb-6 md:mb-10 origin-top"
            style={{ 
              zIndex: i + 1, 
              top: `calc(10vh + ${i * 10}px)` 
            }}
          >
            
            {/* UPDATED: Text overlay on mobile (absolute), side-by-side on desktop (relative) */}
            <div className="absolute inset-0 md:relative w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-end md:justify-center z-20 bg-gradient-to-t from-black via-black/60 to-transparent md:bg-none">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-halo-red to-transparent opacity-50 hidden md:block"></div>
              
              <span className="font-display text-5xl md:text-9xl font-bold text-white/10 absolute top-4 left-4 md:top-4 md:left-4 select-none">{step.id}</span>
              
              <div className="relative">
                <span className="text-halo-red text-[10px] md:text-xs font-display tracking-[0.3em] uppercase mb-2 md:mb-4 block">{step.phase}</span>
                <h3 className="font-display text-3xl md:text-6xl text-white mb-3 md:mb-6 leading-none">{step.title}</h3>
                <p className="text-gray-300 md:text-gray-400 font-sans text-sm md:text-xl font-light leading-relaxed max-w-md drop-shadow-md">
                  {step.desc}
                </p>
              </div>
            </div>

            {/* UPDATED: Image fills container on mobile */}
            <div className="absolute inset-0 md:relative w-full md:w-1/2 h-full z-0">
              <Image 
                src={step.img} 
                alt={step.title} 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 md:bg-gradient-to-l md:from-transparent md:to-black/80"></div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
'use client';
import { useRef, useEffect } from 'react';
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
    img: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    color: '#dc2626'
  },
  { 
    id: '02', 
    phase: 'PRODUCTION',
    title: 'THE ACTION', 
    desc: 'A forgatás napja a szentírás. High-end kamerák, fények tánca és precíz rendezés. Nincs felesleges mozdulat, csak a tökéletes pillanat vadászata.', 
    img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    color: '#ffffff'
  },
  { 
    id: '03', 
    phase: 'POST-PRODUCTION',
    title: 'THE MAGIC', 
    desc: 'A vágószoba csendjében születik meg a ritmus. Color grading, sound design és VFX. Itt válik a nyersanyagból valódi, lélegző történet.', 
    img: 'https://images.unsplash.com/photo-1704806050523-177b86dec093?q=80&w=763&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    color: '#dc2626'
  }
];

export const Process = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.process-card');
    
    cards.forEach((card: any, index) => {
      // Az utolsó kártyát nem kell animálni (az marad felül)
      if (index === cards.length - 1) return;

      const nextCard = cards[index + 1];

      // Skálázás és sötétedés effekt, ahogy a következő kártya rájön
      gsap.to(card, {
        scale: 0.9, // Kicsit összemeny
        opacity: 0.4, // Elhalványul
        filter: 'blur(5px)', // Homályosodik
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true, // "Odaragasztjuk" a képernyőhöz
          pinSpacing: false, // Hogy a következő kártya rácsússzon
        }
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative bg-halo-black py-20 pb-40 px-4 md:px-10">
      
      {/* Szekció Cím */}
      <div className="mb-20 px-6 md:px-10">
        <span className="text-halo-red font-display text-xs tracking-widest block mb-4">WORKFLOW</span>
        <h2 className="font-display text-5xl md:text-7xl text-white">THE <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>PROCESS</span></h2>
      </div>

      <div className="flex flex-col items-center w-full">
        {steps.map((step, i) => (
          <div 
            key={i} 
            className="process-card sticky top-24 w-full max-w-6xl h-[70vh] md:h-[80vh] rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl flex flex-col md:flex-row mb-10 origin-top"
            style={{ 
              zIndex: i + 1, // Rétegezés: a későbbiek feljebb vannak
              top: `calc(10vh + ${i * 20}px)` // Lépcsőzetes eltolás
            }}
          >
            
            {/* Bal oldal: Szöveg */}
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative z-10 bg-black/80 backdrop-blur-sm md:bg-transparent">
              {/* Vékony vonal dekoráció */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-halo-red to-transparent opacity-50 hidden md:block"></div>
              
              <span className="font-display text-6xl md:text-9xl font-bold text-white/5 absolute top-4 left-4 select-none">{step.id}</span>
              
              <div className="relative">
                <span className="text-halo-red text-xs font-display tracking-[0.3em] uppercase mb-4 block">{step.phase}</span>
                <h3 className="font-display text-4xl md:text-6xl text-white mb-6 leading-none">{step.title}</h3>
                <p className="text-gray-400 font-sans text-lg md:text-xl font-light leading-relaxed max-w-md">
                  {step.desc}
                </p>
              </div>
            </div>

            {/* Jobb oldal: Kép/Videó */}
            <div className="w-full md:w-1/2 h-full relative">
              <Image 
                src={step.img} 
                alt={step.title} 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 hover:scale-110"
              />
              {/* Overlay, hogy a szöveg olvasható legyen mobilon */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:to-black/80"></div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
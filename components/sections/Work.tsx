'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  video?: string;
}

export const Work = ({ projects }: { projects: Project[] }) => {
  const container = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.work-card') as HTMLElement[];
    
    cards.forEach((card, index) => {
      if (index === cards.length - 1) return;
      const nextCard = cards[index + 1];

      gsap.to(card, {
        scale: 0.9,
        opacity: 0.4,
        filter: "blur(5px)",
        ease: "none",
        scrollTrigger: {
          trigger: nextCard,
          start: "top bottom", 
          end: "top 20%",
          scrub: true,
        }
      });
    });
  }, { scope: container });

  return (
    <section ref={container} id="work" className="relative bg-[#050505] z-10 pb-20">
      <div className="px-6 md:px-20 py-20">
        <span className="text-halo-red font-display text-xs tracking-widest block mb-4">PORTFOLIO</span>
        <h2 className="font-display text-5xl md:text-8xl text-white">SELECTED WORKS</h2>
      </div>

      <div className="px-3 md:px-10 flex flex-col gap-20">
        {projects.map((project, index) => (
          <div key={project.id} className="work-card sticky top-20 h-[70vh] md:h-[80vh] w-full rounded-2xl border border-white/10 bg-[#111] overflow-hidden group origin-top shadow-2xl relative">
             
             {/* Háttér konténer */}
             <div className="absolute inset-0 h-full w-full z-0">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority={index === 0}
                  className="object-cover transition-opacity duration-700 group-hover:opacity-0"
                />
                {project.video && (
                  <video 
                    loop 
                    muted 
                    playsInline 
                    autoPlay 
                    suppressHydrationWarning={true} // <--- EZ IS KRITIKUS
                    crossOrigin="anonymous"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-60 transition-opacity duration-700"
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none"></div>
             </div>

             <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col md:flex-row justify-between md:items-end pointer-events-none z-10">
                <div>
                   <h3 className="font-display text-4xl md:text-8xl font-bold uppercase text-white mb-2 shadow-black drop-shadow-lg">{project.title}</h3>
                   <p className="font-sans text-gray-400 italic text-lg">{project.category}</p>
                </div>
                <button className="pointer-events-auto px-8 py-3 border border-white/30 rounded-full text-white text-xs font-display tracking-widest uppercase hover:bg-white hover:text-black transition-colors backdrop-blur-sm bg-black/20">
                  View Case
                </button>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
};
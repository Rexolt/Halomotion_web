'use client';
import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { createPortal } from 'react-dom';

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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const openProject = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; // Lock scroll
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = ''; // Unlock scroll
  };

  return (
    <>
      <section ref={container} id="work" className="relative bg-[#050505] z-10 pb-10 md:pb-20">

        {/* UPDATED: Reduced padding for mobile */}
        <div className="px-4 md:px-20 py-10 md:py-20">
          <span className="text-halo-red font-display text-xs tracking-widest block mb-4">PORTFOLIO</span>
          {/* UPDATED: Responsive font size */}
          <h2 className="font-display text-4xl md:text-8xl text-white">SELECTED WORKS</h2>
        </div>

        <div className="px-3 md:px-10 flex flex-col gap-10 md:gap-20">
          {projects.map((project, index) => (
            // UPDATED: Reduced height for mobile (50vh)
            <div key={project.id} className="work-card sticky top-20 h-[50vh] md:h-[80vh] w-full rounded-xl md:rounded-2xl border border-white/10 bg-[#111] overflow-hidden group origin-top shadow-2xl relative">

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
                    suppressHydrationWarning={true}
                    crossOrigin="anonymous"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-60 transition-opacity duration-700"
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none"></div>
              </div>

              {/* UPDATED: Responsive layout and padding */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col md:flex-row justify-between md:items-end pointer-events-none z-10">
                <div>
                  {/* UPDATED: Responsive title size */}
                  <h3 className="font-display text-3xl md:text-8xl font-bold uppercase text-white mb-2 shadow-black drop-shadow-lg">{project.title}</h3>
                  <p className="font-sans text-gray-400 italic text-sm md:text-lg">{project.category}</p>
                </div>
                <button
                  onClick={() => openProject(project)}
                  className="pointer-events-auto px-6 py-2 md:px-8 md:py-3 mt-4 md:mt-0 border border-white/30 rounded-full text-white text-[10px] md:text-xs font-display tracking-widest uppercase hover:bg-white hover:text-black transition-colors backdrop-blur-sm bg-black/20 w-fit"
                >
                  View Case
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECT MODAL OVERLAY - Rendered via Portal */}
      {mounted && selectedProject && createPortal(
        <div className="fixed inset-0 z-[9999999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in duration-300" onClick={closeProject}>

          <button
            onClick={closeProject}
            className="absolute top-5 right-5 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors z-[10000000]"
          >
            <span className="font-display text-sm md:text-base tracking-widest border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors bg-black">CLOSE</span>
          </button>

          <div
            className="relative w-full max-w-5xl aspect-video bg-[#050505] rounded-lg overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-500 z-[10000000]"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedProject.video ? (
              <video
                src={selectedProject.video}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            ) : (
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="mt-8 text-center pointer-events-none relative z-[10000000]">
            <h2 className="font-display text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
            <p className="font-sans text-gray-500 text-sm uppercase tracking-widest">{selectedProject.category}</p>
          </div>

        </div>,
        document.getElementById('portal-root') || document.body
      )}
    </>
  );
};
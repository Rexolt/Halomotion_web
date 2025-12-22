'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RecIndicator } from '@/components/ui/RecIndicator'; // <--- ÚJ IMPORT

gsap.registerPlugin(ScrollTrigger);

export const Hero = ({ title1 = "BEYOND", title2 = "REALITY", videoUrl = "" }) => {
  const container = useRef(null);
  const videoRef = useRef(null);

  useGSAP(() => {
    // ... (az animációs kódod marad változatlan) ...
    const tl = gsap.timeline();
    tl.from(".hero-char", { yPercent: 120, duration: 1.5, ease: "power4.out", stagger: 0.05 });
    
    gsap.to(videoRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: { trigger: container.current, start: "top top", end: "bottom top", scrub: true }
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden bg-black">
      
      {/* KAMERA OVERLAY (REC, IDŐKÓD) */}
      <RecIndicator />  {/* <--- IDE KERÜLT A DINAMIKUS MODUL */}

      <div className="absolute inset-0 z-0 w-full h-full">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
          suppressHydrationWarning={true}
          poster="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000"
          className="w-full h-full object-cover opacity-60 grayscale scale-110"
        >
          <source src={videoUrl || "https://cdn.pixabay.com/video/2023/02/25/152085-802335503_large.mp4"} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/30 to-[#050505]"></div>
      </div>
      
      {/* ... (Címsor marad) ... */}
      <div className="relative z-10 flex flex-col items-center w-full px-4">
        <h1 className="font-display text-[14vw] md:text-9xl font-bold leading-[0.9] tracking-tighter mix-blend-overlay opacity-90 text-white">
          <div className="overflow-hidden"><span className="hero-char block">{title1}</span></div>
          <div className="overflow-hidden"><span className="hero-char block text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>{title2}</span></div>
        </h1>
      </div>
    </section>
  );
};
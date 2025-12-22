'use client';
import { useEffect, useRef } from 'react';
import { Magnetic } from '@/components/ui/Magnetic';

const ServiceCard = ({ number, title, desc }: { number: string, title: string, desc: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const dots: { x: number; y: number; ox: number; oy: number }[] = [];
    const gap = 25;
    const mouse = { x: -1000, y: -1000 };

    for (let x = 0; x < width; x += gap) {
      for (let y = 0; y < height; y += gap) {
        dots.push({ x, y, ox: x, oy: y });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      dots.forEach(dot => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          const force = (100 - dist) / 100;
          dot.x -= (dx / dist) * force * 2;
          dot.y -= (dy / dist) * force * 2;
        } else {
          dot.x += (dot.ox - dot.x) * 0.1;
          dot.y += (dot.oy - dot.y) * 0.1;
        }

        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    
    const animId = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -1000; };

    canvas.parentElement?.addEventListener('mousemove', onMove);
    canvas.parentElement?.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(animId);
      canvas.parentElement?.removeEventListener('mousemove', onMove);
      canvas.parentElement?.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="group border border-white/5 bg-white/[0.02] p-8 md:p-12 min-h-[300px] md:min-h-[400px] flex flex-col justify-between relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />
      <span className="font-display text-2xl text-halo-red">{number}</span>
      <div className="z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="font-display text-2xl md:text-3xl text-white uppercase mb-4">{title}</h3>
        <p className="text-gray-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{desc}</p>
      </div>
    </div>
  );
};

export const Services = () => {
  return (
    <section id="services" className="relative py-20 px-4 md:px-20 bg-[#080808]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        <ServiceCard number="01" title="Commercial" desc="Reklámfilmek, amik nem eladnak, hanem érzelmet közvetítenek." />
        <ServiceCard number="02" title="Music Video" desc="Vizuális szimfóniák, ahol minden vágás egy ütem." />
        <ServiceCard number="03" title="Brand ID" desc="Arculat, ami nem csak látszik, de érezhető is." />
      </div>
    </section>
  );
};
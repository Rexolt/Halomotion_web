'use client';
import { useState, useEffect } from 'react';

export const RecIndicator = () => {
  const [timecode, setTimecode] = useState("00:00:00:00");

  useEffect(() => {
    // Kezdési idő (amikor az oldal betöltött)
    const startTime = Date.now();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = now - startTime;

      // Idő kiszámítása (Óra:Perc:Másodperc)
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      // Framek szimulálása (25 FPS esetén 40ms egy frame)
      const ms = diff % 1000;
      const frames = Math.floor(ms / 40); 

      // Formázás két számjegyre (padLeft)
      const f = (n: number) => n.toString().padStart(2, '0');

      setTimecode(`${f(hours)}:${f(minutes)}:${f(seconds)}:${f(frames)}`);
    }, 40); // 40ms frissítés = kb 25 FPS

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-24 right-5 md:top-32 md:right-10 z-20 flex items-center gap-4 md:gap-6 font-display text-[10px] tracking-[0.2em] text-gray-200 uppercase select-none pointer-events-none mix-blend-difference">
      
      {/* Villogó REC gomb */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-halo-red opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-halo-red"></span>
        </span>
        <span className="font-bold">REC</span>
      </div>

      {/* Dinamikus Időkód */}
      <span className="tabular-nums font-mono opacity-90 w-[100px] text-right">
        {timecode}
      </span>

      {/* Tech Specs */}
      <span className="opacity-50 hidden md:inline">
        4K / 25FPS
      </span>
    </div>
  );
};
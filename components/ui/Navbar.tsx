'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Magnetic } from '@/components/ui/Magnetic';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* JAVÍTÁS: w-full helyett w-screen, left-0, top-0, z-index fix */}
      <nav className="fixed top-0 left-0 w-screen flex justify-between items-center p-5 md:p-8 z-[9950] mix-blend-difference text-white pointer-events-none">
        
        {/* A pointer-events-auto kell, hogy a gombok kattinthatóak legyenek, miközben a sáv átenged a kattintást */}
        <div className="pointer-events-auto">
          <Magnetic>
            <Link href="/" className="font-display font-bold text-lg md:text-xl tracking-widest uppercase block p-2">
              HALOMOTION
            </Link>
          </Magnetic>
        </div>

        <div className="hidden md:flex gap-12 font-display text-xs tracking-[0.2em] pointer-events-auto">
          {['Szolgáltatások', 'Munkáink', 'Csapat', 'Kapcsolat'].map((item) => (
            <Magnetic key={item}>
              <a href={`#${item.toLowerCase()}`} className="hover:text-halo-red transition-colors block p-2">
                {item}
              </a>
            </Magnetic>
          ))}
        </div>

        <div className="pointer-events-auto md:hidden">
            <Magnetic>
            <button onClick={toggleMenu} className="font-display text-[10px] border border-white/30 px-5 py-2 rounded-full backdrop-blur-md">
                {isOpen ? 'CLOSE' : 'MENU'}
            </button>
            </Magnetic>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-[9900] transition-transform duration-700 ${isOpen ? 'translate-y-0' : 'translate-y-full'} flex items-center justify-center`}>
         <div className="flex flex-col gap-8 text-center">
            {['Szolgáltatások', 'Munkáink', 'Csapat', 'Kapcsolat'].map((item) => (
               <a key={item} href={`#${item.toLowerCase()}`} onClick={toggleMenu} className="font-display text-2xl text-white uppercase tracking-widest hover:text-halo-red">
                  {item}
               </a>
            ))}
         </div>
      </div>
    </>
  );
};
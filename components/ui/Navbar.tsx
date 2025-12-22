'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLenis } from 'lenis/react';
import { Magnetic } from '@/components/ui/Magnetic';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const lenis = useLenis();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: 0, duration: 2 });
    }
    if (isOpen) toggleMenu();
  };

  const navItems = [
    { label: 'Szolgáltatások', id: 'services' },
    { label: 'Munkáink', id: 'work' },
    { label: 'Csapat', id: 'team' },
    { label: 'Kapcsolat', id: 'contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-5 md:p-8 z-[10000] mix-blend-difference text-white pointer-events-none translate-z-0">

        <div className="pointer-events-auto">
          <Magnetic>
            <Link href="/" className="font-display font-bold text-lg md:text-xl tracking-widest uppercase block p-2">
              HALOMOTION
            </Link>
          </Magnetic>
        </div>

        <div className="hidden md:flex gap-12 font-display text-xs tracking-[0.2em] pointer-events-auto">
          {navItems.map((item) => (
            <Magnetic key={item.label}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleScroll(e, item.id)}
                className="hover:text-halo-red transition-colors block p-2"
              >
                {item.label}
              </a>
            </Magnetic>
          ))}
        </div>

        <div className="pointer-events-auto md:hidden">
          <Magnetic>
            <button onClick={toggleMenu} className="font-display text-[10px] border border-white/30 px-5 py-2 rounded-full backdrop-blur-md bg-black/50">
              {isOpen ? 'CLOSE' : 'MENU'}
            </button>
          </Magnetic>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/90 backdrop-blur-xl z-[9900] transition-transform duration-700 ${isOpen ? 'translate-y-0' : 'translate-y-full'} flex items-center justify-center`}>
        <div className="flex flex-col gap-8 text-center">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              onClick={(e) => handleScroll(e, item.id)}
              className="font-display text-2xl text-white uppercase tracking-widest hover:text-halo-red"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
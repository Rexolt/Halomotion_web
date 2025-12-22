import { Navbar } from '@/components/ui/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Philosophy } from '@/components/sections/Philosophy';
// --- ÚJ IMPORT START ---
import { Marquee } from '@/components/sections/Marquee';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Team } from '@/components/sections/Team';
// --- ÚJ IMPORT END ---
import { Work } from '@/components/sections/Work';
import { Contact } from '@/components/sections/Contact';

// Adatok a Work szekcióhoz
const projects = [
  { 
    id: '1', 
    title: 'Apex Hunter', 
    category: 'Automotive', 
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000', 
    video: 'https://cdn.pixabay.com/video/2019/03/03/21770-321216454_large.mp4' 
  },
  { 
    id: '2', 
    title: 'Velvet Silk', 
    category: 'Fashion', 
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000',
    video: 'https://cdn.pixabay.com/video/2019/07/07/25028-347024110_large.mp4'
  },
  { 
    id: '3', 
    title: 'Neural Link', 
    category: 'Tech', 
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000',
    video: 'https://assets.mixkit.co/videos/42653/42653-720.mp4'

  }
];

export default function Home() {
  return (
    <main className="w-full relative">
      {/* Globális zaj effekt */}
      <div className="grain"></div>
      
   
      
      {/* 1. Hero Szekció */}
      <Hero 
        title1="BEYOND" 
        title2="REALITY" 
        videoUrl="https://cdn.pixabay.com/video/2023/02/25/152085-802335503_large.mp4" 
      />
      
      {/* 2. Filozófia (Szöveg Scrub) */}
      <Philosophy 
        text="A HaloMotion nem csupán rögzít. Mi a csendet vesszük fel két szívdobbanás között. Nem a valóságot másoljuk, hanem újat teremtünk." 
      />
      
      {/* 3. Marquee (Végtelenített szöveg - ÚJ) */}
      <Marquee />
      
      {/* 4. Szolgáltatások (Interaktív Grid - ÚJ) */}
      <Services />
      
      {/* 5. Munkafolyamat (Új Sticky Process szekció - ÚJ) */}
      <Process />
      
      {/* 6. Munkáink (Stacking Cards) */}
      <Work projects={projects} />
      
      {/* 7. Csapat (ÚJ) */}
      <Team />
      
      {/* 8. Kapcsolat és Footer */}
      <Contact />
    </main>
  );
}
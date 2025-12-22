// components/sections/Contact.tsx
'use client';
//import { useAnalytics } from '@/hooks/useAnalytics'; // Amit az előző válaszban írtam

export const Contact = () => {
  // const { trackEvent } = useAnalytics(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // trackEvent('submit_form', { location: 'footer' });
    alert("Ez csak demo!");
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 px-6 md:px-20 bg-halo-black border-t border-white/10 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h2 className="font-display text-5xl md:text-8xl leading-none tracking-tighter text-white mb-8">
            START<br /><span className="text-gray-700">PROJECT</span>
          </h2>
          <a href="mailto:studio@halomotion.hu" className="text-2xl text-halo-red border-b border-red-900/30 pb-2">studio@halomotion.hu</a>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <input type="email" placeholder="EMAIL" className="bg-transparent border-b border-gray-800 py-4 text-white focus:border-halo-red outline-none transition-colors" />
          <textarea placeholder="AZ ÖTLET" rows={3} className="bg-transparent border-b border-gray-800 py-4 text-white focus:border-halo-red outline-none transition-colors"></textarea>
          <button type="submit" className="py-5 bg-white text-black font-display font-bold tracking-widest hover:bg-halo-red hover:text-white transition-colors">KÜLDÉS</button>
        </form>
      </div>

      <div className="mt-40 border-t border-white/5 pt-10 text-center">
        <h1 className="font-display text-[15vw] leading-none font-bold text-[#111] select-none">HALOMOTION</h1>
        <div className="flex justify-center gap-8 text-[10px] uppercase tracking-widest text-gray-600 mt-8">
          <span>© 2024 HALOMOTION</span>
          <span>BUDAPEST</span>
        </div>
      </div>
    </section>
  );
};
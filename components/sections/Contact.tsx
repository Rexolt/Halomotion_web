// components/sections/Contact.tsx
'use client';
//import { useAnalytics } from '@/hooks/useAnalytics'; 

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
            AJÁNLAT<br /><span className="text-gray-700">KÉRÉS</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-8 max-w-md">
            Csapatunk 1 napon belül megnézi az üzenetet és válaszol.
          </p>
          <a href="mailto:team@halomotion.hu" className="text-2xl text-halo-red border-b border-red-900/30 pb-2">team@halomotion.hu</a>
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

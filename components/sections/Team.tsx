import Image from 'next/image';

const team = [
  { name: 'Kovács Dávid', role: 'Creative Director', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000' },
  { name: 'Nagy Anna', role: 'D.O.P', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000' },
  { name: 'Tóth Márk', role: 'Lead Editor', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000' },
];

export const Team = () => {
  return (
    <section id="team" className="py-20 md:py-32 px-6 md:px-20 bg-halo-black border-t border-white/10">
      <div className="mb-20">
        <span className="text-halo-red font-display text-xs tracking-widest block mb-4">THE SQUAD</span>
        <h2 className="font-display text-5xl md:text-7xl text-white">CREATIVE <span className="text-gray-700">MINDS</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {team.map((member, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#111] mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 ease-out">
              <Image
                src={member.img}
                alt={member.name}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="border-t border-white/20 pt-4">
              <h3 className="font-display text-2xl text-white mb-1">{member.name}</h3>
              <p className="text-xs tracking-widest text-halo-red font-display uppercase">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
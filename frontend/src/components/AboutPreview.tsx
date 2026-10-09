import { WhoAreWe } from './WhoAreWe';
import { AboutStats } from './AboutStats';
import { Marquee } from './Marquee';

export function AboutPreview() {
  return (
    <section
      id="about"
      className="w-full bg-[#F3F0E8] text-[#050505] pt-16 pb-24 md:pt-20 md:pb-32 relative z-10 overflow-hidden"
    >
      {/* Architectural Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }}
      />
      <div className="relative z-10 flex flex-col gap-24 md:gap-32 w-full">
        <WhoAreWe />
        <AboutStats />
      </div>
      <div className="relative z-10">
        <Marquee />
      </div>
    </section>
  );
}

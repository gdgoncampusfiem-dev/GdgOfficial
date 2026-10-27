import { WhoAreWe } from './WhoAreWe';
import { AboutStats } from './AboutStats';
import { OurFlagshipEvents } from './ourflagshipevents';
import { RecentEvents } from './RecentEvents';
import { OurSponsors } from './OurSponsors';

export function AboutPreview() {
  return (
    <section
      id="about"
      className="w-full bg-[#F3F0E8] text-[#050505] pt-16 pb-24 md:pt-20 md:pb-32 relative z-10 overflow-hidden"
    >
      <div className="relative z-10 flex flex-col gap-24 md:gap-32 w-full">
        <WhoAreWe />
        <AboutStats />
        <RecentEvents />
        <OurFlagshipEvents />
        <OurSponsors />
      </div>
    </section>
  );
}

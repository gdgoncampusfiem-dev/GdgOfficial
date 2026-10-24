import { TeamMember, getTeamMemberSocials } from '@/data/team';
import Image from 'next/image';
import { renderPlatformIcon } from '@/components/ui/SocialIcons';
import { getSocialHref, getPlatformLabel } from '@/data/socialPlatforms';

const colorMap = {
  blue: 'bg-[#4285F4]',
  red: 'bg-[#EA4335]',
  yellow: 'bg-[#FBBC04]',
  green: 'bg-[#34A853]',
};

export function TeamCard({ member }: { member: TeamMember }) {
  const socials = getTeamMemberSocials(member);
  const socialEntries = Object.entries(socials).filter(([, url]) => Boolean(url && url.trim()));
  const isDataUrl = member.imageUrl?.startsWith('data:');

  return (
    <div 
      className="group relative flex flex-col h-full bg-white border-[2px] border-[#050505] transition-all duration-300 shadow-[4px_4px_0px_#050505] hover:shadow-[6px_6px_0px_#050505] hover:-translate-y-1 hover:-translate-x-1"
    >
      {/* Accent Header Line */}
      <div className={`h-2 w-full ${colorMap[member.accentColor || 'blue']} border-b-[2px] border-[#050505]`} />
      
      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] border-b-[2px] border-[#050505] overflow-hidden bg-[#F3F0E8]">
        {isDataUrl ? (
          <img
            src={member.imageUrl}
            alt={member.name}
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
          />
        ) : (
          <Image
            src={member.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80'}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
          />
        )}
        {/* Domain Badge */}
        {member.domain && (
          <div className="absolute top-3 right-3 bg-white border-[2px] border-[#050505] px-2 py-1 text-xs font-bold uppercase tracking-wider text-[#050505] shadow-[2px_2px_0px_#050505] z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
            {member.domain}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow relative bg-white">
        <h3 className="text-xl font-black text-[#050505] tracking-tight mb-1 uppercase">
          {member.name}
        </h3>
        <p className="text-xs font-bold text-[#575550] uppercase tracking-widest mb-2">
          {member.role}
        </p>
        
        {/* Intro - Animated reveal on hover for desktop, always visible on mobile */}
        {member.intro && (
          <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-all duration-500 overflow-hidden mb-4 lg:mb-0 lg:group-hover:mb-4">
            <div className="min-h-0">
              <p className="text-sm text-[#575550] leading-relaxed pt-2 border-t-[1px] border-dashed border-[#050505]/20 mt-2">
                {member.intro}
              </p>
            </div>
          </div>
        )}

        {/* Social Links */}
        {socialEntries.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            {socialEntries.map(([platform, url]) => {
              const href = getSocialHref(platform, url);
              const label = getPlatformLabel(platform, member.customSocialPlatforms);
              return (
                <a 
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 border-[2px] border-[#050505] bg-white hover:bg-[#F3F0E8] transition-all shadow-[2px_2px_0px_#050505] hover:shadow-[1px_1px_0px_#050505] hover:translate-y-[1px] hover:translate-x-[1px]"
                  aria-label={`${member.name} ${label}`}
                  title={`${member.name} on ${label}`}
                >
                  <span className="text-[#050505]">
                    {renderPlatformIcon(platform, "w-4 h-4")}
                  </span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

import { TeamMember } from '@/data/team';
import Image from 'next/image';


const colorMap = {
  blue: 'bg-[#4285F4]',
  red: 'bg-[#EA4335]',
  yellow: 'bg-[#FBBC04]',
  green: 'bg-[#34A853]',
};

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div 
      className="group relative flex flex-col h-full bg-white border-[2px] border-[#050505] transition-all duration-300 shadow-[4px_4px_0px_#050505] hover:shadow-[6px_6px_0px_#050505] hover:-translate-y-1 hover:-translate-x-1"
    >
      {/* Accent Header Line */}
      <div className={`h-2 w-full ${colorMap[member.accentColor]} border-b-[2px] border-[#050505]`} />
      
      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] border-b-[2px] border-[#050505] overflow-hidden bg-[#F3F0E8]">
        <Image
          src={member.imageUrl}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
        />
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
        <div className="mt-auto flex gap-2 pt-4">
          {member.linkedinUrl && (
            <a 
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 border-[2px] border-[#050505] bg-white hover:bg-[#F3F0E8] transition-all shadow-[2px_2px_0px_#050505] hover:shadow-[1px_1px_0px_#050505] hover:translate-y-[1px] hover:translate-x-[1px]"
              aria-label={`${member.name} LinkedIn`}
            >
              <LinkedinIcon className="w-4 h-4 text-[#050505]" />
            </a>
          )}
          {member.githubUrl && (
            <a 
              href={member.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 border-[2px] border-[#050505] bg-white hover:bg-[#F3F0E8] transition-all shadow-[2px_2px_0px_#050505] hover:shadow-[1px_1px_0px_#050505] hover:translate-y-[1px] hover:translate-x-[1px]"
              aria-label={`${member.name} GitHub`}
            >
              <GithubIcon className="w-4 h-4 text-[#050505]" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

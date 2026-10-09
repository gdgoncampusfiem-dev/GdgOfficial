import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/utils/cn';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Domains', href: '#domains' },
  { label: 'Team', href: '#team' },
  { label: 'Sponsor', href: '#sponsor' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:px-6 md:pt-6 pointer-events-none">
        <nav
          className={cn(
            "relative pointer-events-auto w-full max-w-6xl rounded-full px-6 py-3.5 flex items-center justify-between transition-all duration-500 ease-out",
            isScrolled
              ? "bg-[#F3F0E8]/40 border border-black/10 shadow-sm text-black"
              : "bg-black/40 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.4)] text-[#F4F1EA]"
          )}
          style={{
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          }}
        >
          {/* Liquid Glass Fluid Layer - only visible on dark hero */}
          <div className={cn(
            "absolute inset-0 rounded-full overflow-hidden pointer-events-none transition-opacity duration-500",
            isScrolled ? "opacity-0" : "opacity-100"
          )}>
            {/* Top glass meniscus highlight */}
            <div className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            {/* Liquid Flow Primary */}
            <div 
              className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] pointer-events-none mix-blend-screen"
              style={{
                background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.08) 40%, transparent 70%)',
                animation: 'liquid-flow-primary 6s ease-in-out infinite alternate'
              }}
            />

            {/* Liquid Flow Secondary */}
            <div 
              className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] pointer-events-none mix-blend-screen"
              style={{
                background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(200, 230, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)',
                animation: 'liquid-flow-secondary 8s ease-in-out infinite alternate-reverse'
              }}
            />

            {/* Continuous Liquid Highlight Glide */}
            <div 
              className="absolute inset-0 pointer-events-none mix-blend-screen opacity-30"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                animation: 'liquid-rim-flow 4s ease-in-out infinite'
              }}
            />
          </div>

          {/* Logo */}
          <Link 
            href="/" 
            className="relative z-10 font-bold tracking-tight text-lg transition-opacity hover:opacity-80"
          >
            GDG KOLKATA
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex relative z-10 items-center gap-8 text-sm font-medium tracking-wide">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block relative z-10">
            <Link 
              href="#join"
              className={cn(
                "px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5",
                isScrolled 
                  ? "bg-black text-white hover:bg-black/80" 
                  : "bg-white text-black hover:bg-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]"
              )}
            >
              JOIN US <span className="text-[10px]">↗</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden relative z-10 p-1.5 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Glass Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 transition-all duration-500 pointer-events-none",
          isOpen ? "opacity-100" : "opacity-0"
        )}
      >
        <div 
          className="absolute inset-0 bg-black/40" 
          style={{ 
            backdropFilter: 'blur(20px) saturate(150%)', 
            WebkitBackdropFilter: 'blur(20px) saturate(150%)' 
          }}
          onClick={() => setIsOpen(false)}
        />
        <div className={cn(
          "absolute inset-x-4 top-24 rounded-3xl bg-white/10 border border-white/20 p-8 flex flex-col items-center gap-6 shadow-2xl transition-transform duration-500 pointer-events-auto",
          isOpen ? "translate-y-0" : "-translate-y-4"
        )}>
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.label} 
              href={link.href} 
              className="text-xl font-medium tracking-wide text-white/80 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

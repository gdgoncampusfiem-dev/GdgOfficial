import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/utils/cn';

const NAV_LINKS = [
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
      setIsScrolled(window.scrollY > window.innerHeight - 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-10 md:px-8 md:pt-14 pointer-events-none">
        <nav
          className={cn(
            "relative pointer-events-auto w-full max-w-6xl rounded-full px-6 py-3.5 flex items-center justify-between transition-all duration-500 ease-out",
            isScrolled
              ? "bg-white/60 border border-black/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,1),0_10px_34px_-12px_rgba(16,24,40,0.2)] text-black"
              : "bg-white/10 border border-white/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15),0_10px_34px_-12px_rgba(0,0,0,0.5)] text-white"
          )}
          style={{
            backdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'blur(12px) saturate(100%)',
            WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'blur(12px) saturate(100%)',
          }}
        >
          {/* Logo */}
          <Link 
            href="/" 
            className="relative z-10 font-bold tracking-tight text-lg transition-opacity hover:opacity-80"
          >
            GDG OC FIEM
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex relative z-10 items-center gap-8 lg:gap-12 text-[13px] font-medium tracking-widest uppercase">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="px-2 py-1 opacity-60 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
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

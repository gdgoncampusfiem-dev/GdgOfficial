'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative w-full h-screen bg-[#050505] overflow-hidden">
      {/* Chalkboard / Matte Slate Texture Base */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 48%, #090909ff 0%, #060606 60%, #020202 100%)'
        }}
      />

      {/* Subtle hand-rubbed chalk dust patina (toned down) */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none filter blur-[50px]"
        style={{
          backgroundImage: `
            radial-gradient(at 25% 25%, rgba(245, 242, 235, 0.06) 0px, transparent 50%),
            radial-gradient(at 78% 22%, rgba(245, 242, 235, 0.04) 0px, transparent 45%),
            radial-gradient(at 45% 72%, rgba(245, 242, 235, 0.05) 0px, transparent 55%),
            radial-gradient(at 80% 82%, rgba(245, 242, 235, 0.04) 0px, transparent 48%)
          `
        }}
      />

      {/* Micro Chalk Noise Texture (Softened Grain) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.15] mix-blend-screen pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="chalkGrain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="
              0 0 0 0 0.96
              0 0 0 0 0.94
              0 0 0 0 0.91
              0 0 0 1 0
            "
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#chalkGrain)" />
      </svg>

      {/* Organic Chalk Flecks & Dust Specks (Softened) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.09] mix-blend-screen pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="chalkDustSpecks">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.18"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="
              0 0 0 0 0.96
              0 0 0 0 0.94
              0 0 0 0 0.91
              0 0 0 3 -1.7
            "
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#chalkDustSpecks)" />
      </svg>

      {/* Perimeter Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.75) 100%)'
        }}
      />

      {/* Premium Hero Typography Treatment */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-start pointer-events-none select-none px-6 md:px-12 lg:px-24 mt-[-5vh]">
        <h1 
          className="font-sans text-left tracking-tighter text-[#F4F1EA] drop-shadow-2xl"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.05em',
            textShadow: `
              0 -1px 1px rgba(255, 255, 255, 0.2),
              0 4px 8px rgba(0, 0, 0, 0.5),
              0 12px 24px rgba(0, 0, 0, 0.6),
              0 24px 48px rgba(0, 0, 0, 0.7),
              0 32px 80px rgba(0, 0, 0, 0.8)
            `,
            transform: 'perspective(1000px) translateY(-28px)',
            transformOrigin: 'left center',
          }}
        >
          <span className="block font-thin opacity-90">
            {"Beyond the ".split('').map((char, i) => (
              <motion.span 
                key={`l1-${i}`} 
                initial={{ opacity: 0, display: 'none' }}
                animate={{ opacity: 1, display: 'inline' }}
                transition={{ duration: 0.01, delay: 0.2 + (i * 0.05) }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
            <em className="italic font-extralight pr-2 text-gdg-shimmer">
              {"Code.".split('').map((char, i) => (
                <motion.span 
                  key={`l1-h-${i}`} 
                  initial={{ opacity: 0, display: 'none' }}
                  animate={{ opacity: 1, display: 'inline' }}
                  transition={{ duration: 0.01, delay: 0.2 + ((11 + i) * 0.05) }}
                >
                  {char}
                </motion.span>
              ))}
            </em>
          </span>
          <span className="block font-thin opacity-90">
            {"Beyond the ".split('').map((char, i) => (
              <motion.span 
                key={`l2-${i}`} 
                initial={{ opacity: 0, display: 'none' }}
                animate={{ opacity: 1, display: 'inline' }}
                transition={{ duration: 0.01, delay: 0.2 + ((16 + i) * 0.05) }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
            <em className="italic font-extralight pr-2 text-gdg-shimmer">
              {"Ordinary.".split('').map((char, i) => (
                <motion.span 
                  key={`l2-h-${i}`} 
                  initial={{ opacity: 0, display: 'none' }}
                  animate={{ opacity: 1, display: 'inline' }}
                  transition={{ duration: 0.01, delay: 0.2 + ((27 + i) * 0.05) }}
                >
                  {char}
                </motion.span>
              ))}
            </em>
          </span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 2.0 }}
          className="font-sans font-light text-[#F4F1EA]/70 max-w-lg text-left"
          style={{
            fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
            transform: 'perspective(1000px) rotateX(1deg) translateY(-16px)',
            letterSpacing: '0em',
            lineHeight: 1.4,
          }}
        >
          Where curious minds come together to explore technology, turn bold ideas into reality, and build what’s next.
        </motion.p>
      </div>

      {/* Kolkata City Skyline rising from the extreme bottom */}
      <motion.div 
        initial={{ opacity: 0, y: '20%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="absolute bottom-0 left-0 right-0 w-full flex justify-center items-end pointer-events-none select-none overflow-hidden z-10"
      >
        <Image
          src="/kolkata-skyline-hd.png"
          alt="Kolkata City Skyline"
          width={4128}
          height={2304}
          priority
          className="w-full max-w-[2400px] min-w-[1000px] h-auto object-bottom mix-blend-screen pointer-events-none translate-y-[15%] opacity-50"
        />
      </motion.div>
    </section>
  );
}



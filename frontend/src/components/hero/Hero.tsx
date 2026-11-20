'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative w-full h-screen bg-[#050505] overflow-hidden">
      {/* Premium Hero Typography Treatment */}
      <div 
        className="absolute inset-0 z-20 flex flex-col justify-center items-start pointer-events-none select-none px-6 md:px-12 lg:px-24 mt-[-5vh]"
        style={{ fontFamily: "'Josefin Sans', system-ui, -apple-system, sans-serif" }}
      >
        <h1 
          aria-label="Beyond the Code. Beyond the Ordinary."
          className="text-left tracking-tighter text-[#F4F1EA] drop-shadow-2xl"
          style={{
            fontFamily: "'Josefin Sans', system-ui, -apple-system, sans-serif",
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
          <span aria-hidden="true" className="block font-thin text-white drop-shadow-sm">
            {"Beyond the ".split('').map((char, i) => (
              <motion.span 
                key={`l1-${i}`} 
                initial={{ visibility: 'hidden' }}
                animate={{ visibility: 'visible' }}
                transition={{ duration: 0.01, delay: 0.2 + (i * 0.05) }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
            <em className="italic font-extralight pr-2 text-gdg-shimmer">
              {"Code.".split('').map((char, i) => (
                <motion.span 
                  key={`l1-h-${i}`} 
                  initial={{ visibility: 'hidden' }}
                  animate={{ visibility: 'visible' }}
                  transition={{ duration: 0.01, delay: 0.2 + ((11 + i) * 0.05) }}
                >
                  {char}
                </motion.span>
              ))}
            </em>
          </span>
          <span aria-hidden="true" className="block font-thin text-white drop-shadow-sm">
            {"Beyond the ".split('').map((char, i) => (
              <motion.span 
                key={`l2-${i}`} 
                initial={{ visibility: 'hidden' }}
                animate={{ visibility: 'visible' }}
                transition={{ duration: 0.01, delay: 0.2 + ((16 + i) * 0.05) }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
            <em className="italic font-extralight pr-2 text-gdg-shimmer">
              {"Ordinary.".split('').map((char, i) => (
                <motion.span 
                  key={`l2-h-${i}`} 
                  initial={{ visibility: 'hidden' }}
                  animate={{ visibility: 'visible' }}
                  transition={{ duration: 0.01, delay: 0.2 + ((27 + i) * 0.05) }}
                >
                  {char}
                </motion.span>
              ))}
            </em>
          </span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: -16 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 2.0 }}
          className="font-light text-white/95 max-w-lg text-left drop-shadow-sm"
          style={{
            fontFamily: "'Josefin Sans', system-ui, -apple-system, sans-serif",
            fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
            letterSpacing: '0em',
            lineHeight: 1.4,
            willChange: 'transform, opacity',
          }}
        >
          Where curious minds come together to explore technology, turn bold ideas into reality, and build what’s next.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 2.2 }}
          className="mt-[25px] md:mt-[41px] pointer-events-auto"
          style={{ willChange: 'transform, opacity' }}
        >
          <Button onClick={() => alert('Join functionality coming soon!')}>
            Join Our Community
          </Button>
        </motion.div>
      </div>

      {/* Kolkata City Skyline rising from the extreme bottom */}
      <motion.div 
        initial={{ opacity: 0, y: '20%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="absolute bottom-0 left-0 right-0 w-full flex justify-center items-end pointer-events-none select-none overflow-hidden z-10"
        style={{ willChange: 'transform, opacity' }}
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

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export interface SponsorItem {
  name: string;
  image: string;
  width: number;
  height: number;
  displayHeight: number;
}

export const OUR_SPONSORS_LETTER_SPACING = '0em';

export const SPONSORS: SponsorItem[] = [
  {
    name: 'Google for Developers',
    image: '/sponsors/gfdlogo.svg',
    width: 1323,
    height: 151,
    displayHeight: 46,
  },
  {
    name: 'GitHub',
    image: '/sponsors/githublogo.svg',
    width: 1180,
    height: 278,
    displayHeight: 52,
  },
  {
    name: 'AMD',
    image: '/sponsors/amdlogo.svg',
    width: 1223,
    height: 300,
    displayHeight: 50,
  },
  {
    name: 'Neo4j',
    image: '/sponsors/neo4jlogo.svg',
    width: 1216,
    height: 404,
    displayHeight: 52,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

/**
 * Duplicate the sponsor list to fill the marquee track seamlessly.
 * 4 sets loop by translating -25% (= 1 full set) for a pixel-perfect loop.
 */
const TRACK = [...SPONSORS, ...SPONSORS, ...SPONSORS, ...SPONSORS];

export function OurSponsors() {
  return (
    <section
      aria-labelledby="trusted-by-heading"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col items-center"
    >
      {/* Subheading */}
      <div className="w-full flex flex-col items-center text-center mb-8 md:mb-12">
        <motion.h2
          id="trusted-by-heading"
          {...fadeUp}
          style={{
            letterSpacing: OUR_SPONSORS_LETTER_SPACING,
            fontFamily: "'Product Sans', 'Google Sans', system-ui, -apple-system, sans-serif",
          }}
          className="text-2xl sm:text-3xl md:text-[48px] whitespace-nowrap text-[#050505] leading-tight"
        >
          <span className="subheading-words font-light">Trusted </span>
          <span className="subheading-last font-bold">By</span>
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 md:mt-4 text-base sm:text-lg md:text-xl text-[#575550] max-w-3xl font-light leading-relaxed font-product text-center"
        >
          Collaborating with world-class technology leaders and innovators to empower our developer community
        </motion.p>
      </div>

      {/* Marquee strip with edge fades */}
      <div
        className="relative w-full overflow-hidden py-6 sm:py-8"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        {/* Scrolling track */}
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'sponsor-marquee 28s linear infinite',
            willChange: 'transform',
            alignItems: 'center',
          }}
        >
          {TRACK.map((sponsor, idx) => (
            <div
              key={`${sponsor.name}-${idx}`}
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 36px',
              }}
            >
              <Image
                src={sponsor.image}
                alt={`${sponsor.name} logo`}
                width={sponsor.width}
                height={sponsor.height}
                className="transition-transform duration-300 hover:scale-105"
                style={{
                  height: `${sponsor.displayHeight}px`,
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

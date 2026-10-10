'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GalleryItem } from '@/data/gallery';
import { Maximize2 } from 'lucide-react';

interface GalleryCollageProps {
  items: GalleryItem[];
  onSelectImage: (item: GalleryItem) => void;
}

export function GalleryMasonry({ items, onSelectImage }: GalleryCollageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle Multi-Plane Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yTop = useTransform(scrollYProgress, [0, 1], [-14, 14]);
  const yBottom = useTransform(scrollYProgress, [0, 1], [16, -16]);

  // Safely map items to the 8 jigsaw positions
  const getItem = (idx: number) => (items.length > 0 ? items[idx % items.length] : null);
  const p1 = getItem(0); // Top-left (wide crowd)
  const p2 = getItem(1); // Top-middle-1 (speaker keynote)
  const p3 = getItem(5); // Top-middle-2 (pair debugging)
  const p4 = getItem(16) || getItem(3); // Top-right (celebration cake)
  const p5 = getItem(4); // Middle-left (group celebration)
  const p6 = getItem(10) || getItem(6); // Bottom-left (workshop desk team)
  const p7 = getItem(2); // Bottom-middle (focused audience)
  const p8 = getItem(3) || getItem(7); // Bottom-right (packed auditorium hands up)

  return (
    <div ref={containerRef} className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-24">
      {/* =========================================================================
          MOBILE & TABLET VIEW (lg:hidden)
          2-column masonry with full-color high-res photos
         ========================================================================= */}
      <div className="lg:hidden">
        {/* Mobile Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 pt-4"
        >
          <span className="inline-block py-1 px-3 border-[2px] border-[#050505] bg-white text-[#050505] text-[10px] font-black uppercase tracking-[0.2em] shadow-[2px_2px_0px_#050505] mb-4">
            The Visual Chronicle
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#050505] tracking-tight uppercase leading-tight">
            Photo <span className="font-bold">Gallery</span>
          </h1>
          <p className="text-sm sm:text-base text-[#575550] mt-3 max-w-md mx-auto font-medium">
            A glimpse into our most memorable moments
          </p>
        </motion.div>

        {/* 2-Column Responsive Masonry */}
        <div className="columns-2 gap-3 sm:gap-4">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.75,
                delay: (idx % 4) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="break-inside-avoid mb-3 sm:mb-4 group relative overflow-hidden rounded-2xl border border-[#050505]/15 bg-white shadow-[0_4px_18px_-4px_rgba(5,5,5,0.07)] hover:shadow-[0_16px_32px_-8px_rgba(5,5,5,0.16)] hover:border-[#050505]/40 hover:-translate-y-1 cursor-pointer transition-all duration-300"
              onClick={() => onSelectImage(item)}
            >
              <div className={`relative w-full ${item.aspect} overflow-hidden bg-[#E5E0D8]`}>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  quality={90}
                  sizes="48vw"
                  className="object-cover saturate-[1.06] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Refined Hover Gradient with Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                  <div className="flex items-center justify-between w-full text-white">
                    <div className="pr-2">
                      <span className="inline-block px-1.5 py-0.5 rounded-sm bg-white/20 backdrop-blur-md text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-white mb-1">
                        {item.category}
                      </span>
                      <p className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1 drop-shadow-sm">
                        {item.title}
                      </p>
                    </div>
                    <div className="flex-shrink-0 p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          DESKTOP VIEW (hidden lg:block)
          High-Res Colorful Interlocking Canvas with Full Vibe Effects
         ========================================================================= */}
      <div className="hidden lg:block">
        <div className="relative w-full aspect-[1400/966]">
          {/* --- CENTER EMBEDDED TITLE --- */}
          <div
            className="absolute flex items-center justify-center select-none z-20 p-4"
            style={{
              left: '30.70%',
              top: '34.19%',
              width: '40.78%',
              height: '31.41%',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center flex flex-col items-center justify-center"
            >
              <span className="inline-block py-1.5 px-3.5 border-[2px] border-[#050505] bg-white text-[#050505] text-[11px] font-black uppercase tracking-[0.2em] shadow-[3px_3px_0px_#050505] mb-4">
                The Visual Chronicle
              </span>
              <h1
                className="text-[#050505] leading-none whitespace-nowrap tracking-tight font-black"
                style={{ fontSize: 'clamp(2.4rem, 4.2vw, 4.2rem)' }}
              >
                Photo <span className="font-bold">Gallery</span>
              </h1>
              <p
                className="text-[#575550] mt-3 font-medium max-w-sm mx-auto"
                style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1.15rem)' }}
              >
                A glimpse into our most memorable moments
              </p>
            </motion.div>
          </div>

          {/* Helper render function for each interlocking desktop frame */}
          {[
            { item: p1, left: '0%', top: '0%', width: '28.60%', height: '31.41%', y: yTop, delay: 0.05, priority: true },
            { item: p2, left: '30.70%', top: '0%', width: '18.25%', height: '31.41%', y: yTop, delay: 0.1, priority: true },
            { item: p3, left: '51.05%', top: '0%', width: '18.33%', height: '31.41%', y: yTop, delay: 0.15, priority: true },
            { item: p4, left: '71.48%', top: '0%', width: '28.52%', height: '45.88%', y: yTop, delay: 0.2, priority: false },
            { item: p5, left: '0%', top: '34.19%', width: '28.60%', height: '31.41%', y: 0, delay: 0.25, priority: false },
            { item: p6, left: '0%', top: '68.59%', width: '41.90%', height: '31.41%', y: yBottom, delay: 0.3, priority: false },
            { item: p7, left: '44.00%', top: '68.59%', width: '25.32%', height: '31.41%', y: yBottom, delay: 0.35, priority: false },
            { item: p8, left: '71.48%', top: '48.85%', width: '28.52%', height: '51.15%', y: yBottom, delay: 0.4, priority: false },
          ].map((cfg, idx) => {
            const itm = cfg.item;
            if (!itm) return null;

            return (
              <motion.figure
                key={itm.id + idx}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: cfg.delay, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  left: cfg.left,
                  top: cfg.top,
                  width: cfg.width,
                  height: cfg.height,
                  y: cfg.y,
                }}
                className="absolute overflow-hidden rounded-2xl border border-[#050505]/15 bg-white shadow-[0_4px_22px_-3px_rgba(5,5,5,0.07),0_1px_3px_rgba(5,5,5,0.04)] hover:shadow-[0_22px_45px_-10px_rgba(5,5,5,0.18)] hover:border-[#050505]/40 hover:-translate-y-1.5 hover:scale-[1.012] cursor-pointer group transition-all duration-300 ease-out"
                onClick={() => onSelectImage(itm)}
              >
                {/* High-Res Full Coverage Image Container */}
                <div className="relative w-full h-full overflow-hidden bg-[#E5E0D8]">
                  <Image
                    src={itm.imageUrl}
                    alt={itm.title}
                    fill
                    priority={cfg.priority}
                    quality={90}
                    sizes="(min-width: 1024px) 35vw, 50vw"
                    className="object-cover saturate-[1.06] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Refined Editorial Gradient & Hover Info Tag */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 lg:p-5 pointer-events-none">
                    <div className="flex items-center justify-between w-full text-white">
                      <div className="pr-3">
                        <span className="inline-block px-2 py-0.5 rounded-sm bg-white/20 backdrop-blur-md text-[10px] font-mono font-bold uppercase tracking-wider text-white mb-1.5">
                          {itm.category}
                        </span>
                        <p className="text-sm lg:text-base font-bold tracking-tight text-white line-clamp-1 drop-shadow-sm">
                          {itm.title}
                        </p>
                      </div>
                      <div className="flex-shrink-0 p-2 rounded-full bg-white/20 backdrop-blur-md text-white group-hover:scale-110 transition-transform duration-200">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}

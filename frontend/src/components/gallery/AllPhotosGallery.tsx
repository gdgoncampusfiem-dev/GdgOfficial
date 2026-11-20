'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, MapPin, Camera, Sparkles } from 'lucide-react';
import { GalleryItem, GalleryCategory, CATEGORIES } from '@/data/gallery';

interface AllPhotosGalleryProps {
  photos: GalleryItem[];
  onSelectImage: (item: GalleryItem, allPhotos: GalleryItem[]) => void;
}

// IDs of the curated hero highlight photos from the top collage
const FEATURED_HERO_IDS = new Set(['df-1', 'df-2', 'ws-4', 'hk-2', 'hk-5', 'cm-3', 'cm-7', 'ws-1']);

export function AllPhotosGallery({ photos, onSelectImage }: AllPhotosGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') return photos;
    return photos.filter((item) => item.category === activeCategory);
  }, [photos, activeCategory]);

  return (
    <section
      id="all-photos"
      className="relative w-full pt-16 pb-24 md:pb-32 overflow-hidden border-t border-[#050505]/10 bg-[#F3F0E8]"
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Editorial Section Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              {/* Venue & Location Badge - Softened Editorial Style */}
              <div className="mb-3.5">
                <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full border border-black/10 bg-white/80 text-[#050505] text-[10px] sm:text-[11px] font-mono font-medium uppercase tracking-wider shadow-sm backdrop-blur-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#050505]" />
                  <span>FIEM Kolkata</span>
                </span>
              </div>

              {/* Section Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#050505] uppercase tracking-tight leading-[0.95] mb-3 font-sans">
                <span className="subheading-words font-light">All Captured </span>
                <span className="subheading-last font-bold">Moments</span>
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#575550] font-normal leading-relaxed max-w-2xl">
                Every captured moment across all our conferences, hackathons, coding workshops, and campus meetups.
              </p>
            </div>

            {/* Right: Clean Captured Photos Counter Badge */}
            <div className="flex-shrink-0 self-start md:self-end">
              <div className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full border border-black/10 bg-white/80 text-[11px] font-mono font-medium uppercase tracking-wider text-[#050505] shadow-sm backdrop-blur-sm">
                <Camera className="w-3.5 h-3.5 text-[#050505]" />
                <span>{filteredPhotos.length} Photos</span>
              </div>
            </div>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-2.5">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#050505] text-[#F3F0E8] shadow-[0_4px_14px_rgba(0,0,0,0.18)] scale-[1.02]'
                      : 'bg-white/80 hover:bg-white text-[#575550] hover:text-[#050505] border border-black/10 shadow-sm backdrop-blur-sm'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#050505]/5 text-[#575550]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Complete Photos Exhibition Grid (Clean 3-column Masonry) */}
        {filteredPhotos.length === 0 ? (
          <div className="rounded-2xl border border-[#050505]/10 bg-white/60 p-14 text-center shadow-sm backdrop-blur-sm">
            <p className="font-mono text-xs sm:text-sm font-medium text-[#575550] uppercase tracking-wider">
              No photos found in this category.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5"
            >
              {filteredPhotos.map((photo, pIdx) => {
                const isFeatured = FEATURED_HERO_IDS.has(photo.id);

                return (
                  <motion.div
                    key={`all-photos-${photo.id}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.5,
                      delay: Math.min((pIdx % 6) * 0.05, 0.25),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="break-inside-avoid mb-4 sm:mb-5 group relative overflow-hidden rounded-2xl border border-[#050505]/10 bg-[#E5E0D8] shadow-[0_4px_20px_-3px_rgba(5,5,5,0.06),0_1px_3px_rgba(5,5,5,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(5,5,5,0.18)] hover:border-[#050505]/30 hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer"
                    onClick={() => onSelectImage(photo, filteredPhotos)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectImage(photo, filteredPhotos);
                      }
                    }}
                  >
                    <div className={`relative w-full ${photo.aspect} overflow-hidden bg-[#E5E0D8]`}>
                      <Image
                        src={photo.imageUrl}
                        alt={photo.title}
                        fill
                        quality={90}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover saturate-[1.06] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Featured Highlight Pill Badge */}
                      {isFeatured && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] font-mono font-medium uppercase tracking-wider border border-white/20 shadow-md">
                            <Sparkles className="w-2.5 h-2.5 text-[#FBBC04]" />
                            <span>Featured</span>
                          </span>
                        </div>
                      )}

                      {/* Refined Hover Gradient with Details */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                        <div className="flex items-center justify-between w-full text-white">
                          <div className="pr-3">
                            <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[9px] sm:text-[10px] font-mono font-medium uppercase tracking-wider text-white mb-1.5">
                              {photo.category}
                            </span>
                            <p className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1 drop-shadow-sm font-sans">
                              {photo.title}
                            </p>
                            {photo.subtitle && (
                              <p className="text-[11px] text-white/80 font-light line-clamp-1 mt-0.5">
                                {photo.subtitle}
                              </p>
                            )}
                          </div>
                          <div className="flex-shrink-0 p-2 rounded-full bg-white/20 backdrop-blur-md text-white group-hover:scale-110 transition-transform duration-200">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}

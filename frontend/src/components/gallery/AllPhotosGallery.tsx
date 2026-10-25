'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Maximize2, MapPin, Camera } from 'lucide-react';
import { GalleryItem } from '@/data/gallery';

interface AllPhotosGalleryProps {
  photos: GalleryItem[];
  onSelectImage: (item: GalleryItem, allPhotos: GalleryItem[]) => void;
}

export function AllPhotosGallery({ photos, onSelectImage }: AllPhotosGalleryProps) {
  return (
    <section
      id="all-photos"
      className="relative w-full pt-16 pb-24 md:pb-32 overflow-hidden border-t-2 border-[#050505]/10 bg-[#F3F0E8]"
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Clean Architectural Header (No Filter Controls) */}
        <div className="mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-[#050505]/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              {/* Venue & Location Badge */}
              <div className="mb-3.5">
                <span className="inline-flex items-center gap-1.5 py-1 px-3 border-[2px] border-[#050505] bg-white text-[#050505] text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider shadow-[2.5px_2.5px_0px_#050505]">
                  <MapPin className="w-3.5 h-3.5 text-[#050505]" />
                  <span>FIEM Kolkata</span>
                </span>
              </div>

              {/* Section Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#050505] uppercase tracking-tight leading-[0.95] mb-3 font-sans">
                All Captured Moments
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#575550] font-medium leading-relaxed max-w-2xl">
                Every captured moment across all our conferences, hackathons, coding workshops, and campus meetups.
              </p>
            </div>

            {/* Right: Clean Captured Photos Counter Badge */}
            <div className="flex-shrink-0 self-start md:self-end">
              <div className="inline-flex items-center gap-2 py-1 px-3.5 border-[2px] border-[#050505] bg-white text-[11px] font-mono font-bold uppercase tracking-wider text-[#050505] shadow-[2.5px_2.5px_0px_#050505]">
                <Camera className="w-3.5 h-3.5 text-[#050505]" />
                <span>{photos.length} Captured Photos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Complete Photos Exhibition Grid (Clean 3-column Masonry) */}
        {photos.length === 0 ? (
          <div className="rounded-2xl border border-[#050505]/15 bg-white p-14 text-center shadow-[0_4px_18px_-4px_rgba(5,5,5,0.05)]">
            <p className="font-mono text-xs sm:text-sm font-bold text-[#575550] uppercase tracking-wider">
              No photos archived yet.
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5">
            {photos.map((photo, pIdx) => {
              return (
                <motion.div
                  key={`all-photos-${photo.id}`}
                  initial={{ opacity: 0, y: 32, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min((pIdx % 6) * 0.06, 0.28),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="break-inside-avoid mb-4 sm:mb-5 group relative overflow-hidden rounded-2xl border border-[#050505]/15 bg-[#E5E0D8] shadow-[0_4px_20px_-3px_rgba(5,5,5,0.06),0_1px_3px_rgba(5,5,5,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(5,5,5,0.18)] hover:border-[#050505]/40 hover:-translate-y-1.5 hover:scale-[1.01] cursor-pointer transition-all duration-300 ease-out"
                  onClick={() => onSelectImage(photo, photos)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectImage(photo, photos);
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

                    {/* Refined Hover Gradient with Details */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                      <div className="flex items-center justify-between w-full text-white">
                        <div className="pr-3">
                          <span className="inline-block px-1.5 py-0.5 rounded-sm bg-white/20 backdrop-blur-md text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-white mb-1">
                            {photo.category}
                          </span>
                          <p className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1 drop-shadow-sm font-sans">
                            {photo.title}
                          </p>
                          {photo.subtitle && (
                            <p className="text-[11px] text-white/75 font-light line-clamp-1 mt-0.5">
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
          </div>
        )}
      </div>
    </section>
  );
}

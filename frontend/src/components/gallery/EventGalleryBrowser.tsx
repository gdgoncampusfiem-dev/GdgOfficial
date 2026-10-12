'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { EVENT_GALLERIES, EventGallery, GalleryItem } from '@/data/gallery';

interface EventGalleryBrowserProps {
  onSelectImage: (item: GalleryItem, eventPhotos: GalleryItem[]) => void;
}

export function EventGalleryBrowser({ onSelectImage }: EventGalleryBrowserProps) {
  const [selectedEventId, setSelectedEventId] = useState<string>(EVENT_GALLERIES[0].id);
  const tabsScrollRef = useRef<HTMLDivElement>(null);

  const activeEventIndex = EVENT_GALLERIES.findIndex((e) => e.id === selectedEventId);
  const activeEvent: EventGallery =
    activeEventIndex !== -1 ? EVENT_GALLERIES[activeEventIndex] : EVENT_GALLERIES[0];

  const handlePrevEvent = () => {
    const prevIndex = activeEventIndex <= 0 ? EVENT_GALLERIES.length - 1 : activeEventIndex - 1;
    setSelectedEventId(EVENT_GALLERIES[prevIndex].id);
    scrollTabIntoView(prevIndex);
  };

  const handleNextEvent = () => {
    const nextIndex = activeEventIndex >= EVENT_GALLERIES.length - 1 ? 0 : activeEventIndex + 1;
    setSelectedEventId(EVENT_GALLERIES[nextIndex].id);
    scrollTabIntoView(nextIndex);
  };

  const scrollTabIntoView = (index: number) => {
    const container = tabsScrollRef.current;
    if (!container) return;
    const tabButtons = container.querySelectorAll<HTMLButtonElement>('button[data-tab-index]');
    const target = tabButtons[index];
    if (target) {
      const scrollLeft =
        target.offsetLeft - container.clientWidth / 2 + target.clientWidth / 2;
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
    }
  };

  return (
    <section
      id="events-by-day"
      className="relative w-full pt-4 sm:pt-6 pb-20 md:pb-28 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* =========================================================================
            SEAMLESS CHAPTER HEADER
            Thin editorial hairline rule gracefully bridging the Jigsaw canvas into event archives
           ========================================================================= */}
        <div className="border-t border-[#050505]/15 pt-8 md:pt-10 mb-8 md:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-sans text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-[#575550]">
                Events &amp; Meetups
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#050505] tracking-tight uppercase leading-none mt-2">
                Moments By <span className="font-bold">Event</span>
              </h2>
            </div>

            {/* Quiet Minimalist Stepper */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="font-sans text-xs sm:text-sm font-bold tracking-widest text-[#575550] mr-2">
                {String(activeEventIndex + 1).padStart(2, '0')} / {String(EVENT_GALLERIES.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={handlePrevEvent}
                className="p-2 sm:p-2.5 rounded-full border border-[#050505]/20 hover:border-[#050505] bg-white text-[#050505] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_2px_8px_-2px_rgba(5,5,5,0.06)]"
                aria-label="Previous Event"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextEvent}
                className="p-2 sm:p-2.5 rounded-full border border-[#050505]/20 hover:border-[#050505] bg-white text-[#050505] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_2px_8px_-2px_rgba(5,5,5,0.06)]"
                aria-label="Next Event"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            EDITORIAL EVENT TABS (Clean, refined, professional — no colored bubbles)
           ========================================================================= */}
        <div className="relative z-20 mb-10">
          <div
            ref={tabsScrollRef}
            className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            role="tablist"
            aria-label="Events"
          >
            {EVENT_GALLERIES.map((evt, idx) => {
              const isActive = evt.id === activeEvent.id;

              return (
                <button
                  type="button"
                  key={evt.id}
                  data-tab-index={idx}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setSelectedEventId(evt.id);
                    scrollTabIntoView(idx);
                  }}
                  className={`group relative z-20 flex-shrink-0 snap-start px-4 sm:px-5 py-3 rounded-xl border transition-all duration-200 text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#050505] text-[#F3F0E8] border-[#050505] shadow-[0_6px_18px_-4px_rgba(5,5,5,0.22)] -translate-y-0.5'
                      : 'bg-white/80 hover:bg-white text-[#050505] border-[#050505]/15 hover:border-[#050505]/40 shadow-[0_2px_8px_-2px_rgba(5,5,5,0.06)] hover:shadow-[0_6px_16px_-4px_rgba(5,5,5,0.12)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <span
                      className={`font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${
                        isActive ? 'text-[#F3F0E8]/70' : 'text-[#575550]'
                      }`}
                    >
                      {evt.date}
                    </span>
                    <span
                      className={`font-sans text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-white/15 text-white/90'
                          : 'bg-[#050505]/5 text-[#575550]'
                      }`}
                    >
                      {evt.photos.length}
                    </span>
                  </div>

                  <h3
                    className={`font-bold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap ${
                      isActive ? 'text-white' : 'text-[#050505]'
                    }`}
                  >
                    {evt.name}
                  </h3>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            ACTIVE EVENT TITLE ON TOP & ASSOCIATED PHOTOS
           ========================================================================= */}
        <AnimatePresence mode="sync">
          <motion.div
            key={activeEvent.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {/* Active Event Header Info */}
            <div className="mb-8 md:mb-10 pt-1">
              {/* Event Metadata row */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-[13px] font-sans font-bold uppercase tracking-wider text-[#575550] mb-3">
                <span className="font-black text-[#050505]">{activeEvent.categoryLabel}</span>
                <span className="text-[#050505]/30">/</span>
                <span>{activeEvent.date}</span>
                <span className="text-[#050505]/30">/</span>
                <span>{activeEvent.location}</span>
                <span className="text-[#050505]/30">/</span>
                <span>{activeEvent.photos.length} photos</span>
              </div>

              {/* EVENT NAME ON TOP */}
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#050505] uppercase tracking-tight leading-[0.95] mb-2.5">
                {activeEvent.name}
              </h3>

              {/* Event Description */}
              <p className="text-sm sm:text-base text-[#575550] max-w-3xl font-medium leading-relaxed">
                {activeEvent.description}
              </p>
            </div>

            {/* =========================================================================
                EVENT-SPECIFIC IMAGES GRID
                Styled identically to the top masonry gallery for seamless visual harmony
               ========================================================================= */}
            {activeEvent.photos.length === 0 ? (
              <div className="rounded-2xl border border-[#050505]/15 bg-white p-12 text-center shadow-[0_4px_18px_-4px_rgba(5,5,5,0.07)]">
                <p className="font-sans text-xs sm:text-sm font-bold text-[#575550] uppercase tracking-wider">
                  No photos added for this event yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                {activeEvent.photos.map((photo, pIdx) => {
                  return (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: Math.min((pIdx % 6) * 0.05, 0.25),
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="group relative overflow-hidden rounded-2xl border border-[#050505]/15 bg-[#E5E0D8] shadow-[0_4px_18px_-4px_rgba(5,5,5,0.07)] hover:shadow-[0_16px_32px_-8px_rgba(5,5,5,0.16)] hover:border-[#050505]/40 hover:-translate-y-1 cursor-pointer transition-all duration-300"
                      onClick={() => onSelectImage(photo, activeEvent.photos)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectImage(photo, activeEvent.photos);
                        }
                      }}
                    >
                      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#E5E0D8]">
                        <Image
                          src={photo.imageUrl}
                          alt={photo.title}
                          fill
                          quality={90}
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover saturate-[1.06] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Top corner subtle photo index */}
                        <div className="absolute top-3 left-3 z-10">
                          <span className="font-sans text-[10px] font-bold tracking-wider px-2 py-0.5 bg-black/60 text-white backdrop-blur-md rounded-sm">
                            {String(pIdx + 1).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Refined Hover Gradient with Details */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                          <div className="flex items-center justify-between w-full text-white">
                            <div className="pr-2">
                              <span className="inline-block px-1.5 py-0.5 rounded-sm bg-white/20 backdrop-blur-md text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-white mb-1">
                                {photo.category}
                              </span>
                              <p className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1 drop-shadow-sm">
                                {photo.title}
                              </p>
                              {photo.subtitle && (
                                <p className="text-[11px] text-white/75 font-light line-clamp-1 mt-0.5">
                                  {photo.subtitle}
                                </p>
                              )}
                            </div>
                            <div className="flex-shrink-0 p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white">
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
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

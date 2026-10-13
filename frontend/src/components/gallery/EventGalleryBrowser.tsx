'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, MapPin, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { EVENT_GALLERIES, EventGallery, GalleryItem } from '@/data/gallery';

interface EventGalleryBrowserProps {
  onSelectImage: (item: GalleryItem, eventPhotos: GalleryItem[]) => void;
  selectedEventId?: string;
  onSelectEvent?: (eventId: string) => void;
}

// Official Google 4-Color Sequence for specific events: Blue -> Red -> Yellow -> Green
const googleActiveStyles: Record<
  string,
  {
    bg: string;
    text: string;
    subText: string;
    pill: string;
    dotBg: string;
  }
> = {
  blue: {
    bg: 'bg-[#4285F4]',
    text: 'text-white',
    subText: 'text-white/85 font-bold',
    pill: 'bg-white/25 text-white',
    dotBg: 'bg-[#4285F4]',
  },
  red: {
    bg: 'bg-[#EA4335]',
    text: 'text-white',
    subText: 'text-white/85 font-bold',
    pill: 'bg-white/25 text-white',
    dotBg: 'bg-[#EA4335]',
  },
  yellow: {
    bg: 'bg-[#FBBC04]',
    text: 'text-[#050505]',
    subText: 'text-[#050505]/80 font-bold',
    pill: 'bg-black/15 text-[#050505]',
    dotBg: 'bg-[#FBBC04]',
  },
  green: {
    bg: 'bg-[#34A853]',
    text: 'text-white',
    subText: 'text-white/85 font-bold',
    pill: 'bg-white/25 text-white',
    dotBg: 'bg-[#34A853]',
  },
};

// Ambient Pale Google Color Tints for smooth atmospheric scrolling/selection
const googleAmbientBg: Record<string, string> = {
  blue: 'bg-[#EAF1FE]/50',
  red: 'bg-[#FCECEB]/50',
  yellow: 'bg-[#FFF7E6]/50',
  green: 'bg-[#EBF6EE]/50',
};

export function EventGalleryBrowser({
  onSelectImage,
  selectedEventId: propSelectedEventId,
  onSelectEvent,
}: EventGalleryBrowserProps) {
  const [internalSelectedEventId, setInternalSelectedEventId] = useState<string>(EVENT_GALLERIES[0].id);
  const selectedEventId = propSelectedEventId ?? internalSelectedEventId;

  const setSelectedEventId = useCallback(
    (id: string) => {
      setInternalSelectedEventId(id);
      onSelectEvent?.(id);
    },
    [onSelectEvent]
  );

  const tabsScrollRef = useRef<HTMLDivElement>(null);

  const activeEventIndex = EVENT_GALLERIES.findIndex((e) => e.id === selectedEventId);
  const activeEvent: EventGallery =
    activeEventIndex !== -1 ? EVENT_GALLERIES[activeEventIndex] : EVENT_GALLERIES[0];

  const scrollTabIntoView = useCallback((index: number) => {
    const container = tabsScrollRef.current;
    if (!container) return;
    const tabButtons = container.querySelectorAll<HTMLButtonElement>('button[data-tab-index]');
    const target = tabButtons[index];
    if (target) {
      if (index === 0) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }
      const scrollLeft =
        target.offsetLeft - container.clientWidth / 2 + target.clientWidth / 2;
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
    }
  }, []);

  const handlePrevEvent = useCallback(() => {
    const prevIndex = activeEventIndex <= 0 ? EVENT_GALLERIES.length - 1 : activeEventIndex - 1;
    setSelectedEventId(EVENT_GALLERIES[prevIndex].id);
    scrollTabIntoView(prevIndex);
  }, [activeEventIndex, scrollTabIntoView]);

  const handleNextEvent = useCallback(() => {
    const nextIndex = activeEventIndex >= EVENT_GALLERIES.length - 1 ? 0 : activeEventIndex + 1;
    setSelectedEventId(EVENT_GALLERIES[nextIndex].id);
    scrollTabIntoView(nextIndex);
  }, [activeEventIndex, scrollTabIntoView]);

  // Support Left and Right arrow keys for seamless browsing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if not typing in an input
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;
      if (e.key === 'ArrowLeft') handlePrevEvent();
      if (e.key === 'ArrowRight') handleNextEvent();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevEvent, handleNextEvent]);

  // Sync scroll position when active event changes externally
  useEffect(() => {
    if (propSelectedEventId) {
      const idx = EVENT_GALLERIES.findIndex((e) => e.id === propSelectedEventId);
      if (idx !== -1) {
        scrollTabIntoView(idx);
      }
    }
  }, [propSelectedEventId, scrollTabIntoView]);

  const isAllEvents = activeEvent.id === 'all';
  const ambientBgClass = isAllEvents
    ? 'bg-transparent'
    : googleAmbientBg[activeEvent.accentColor] || 'bg-transparent';

  return (
    <section
      id="events-by-day"
      className={`relative w-full pt-12 sm:pt-16 pb-24 md:pb-32 overflow-hidden border-t-2 border-[#050505]/10 transition-colors duration-700 ease-out ${ambientBgClass}`}
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* =========================================================================
            EDITORIAL CHAPTER HEADER WITH STEPPER & ARROW CONTROLS (Scroll Reveal)
           ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="inline-block py-1.5 px-3.5 border-[2px] border-[#050505] bg-white text-[#050505] text-[11px] font-black uppercase tracking-[0.2em] shadow-[3px_3px_0px_#050505] mb-4">
                EVENT ARCHIVES
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#050505] tracking-tight uppercase leading-[0.95]">
                Filter By <span className="font-bold">Event</span>
              </h2>
              <p className="text-sm sm:text-base text-[#575550] mt-3 max-w-xl font-medium leading-relaxed">
                Explore our photographic records filtered by specific conferences, hackathons, and community meetups.
              </p>
            </div>

            {/* Left / Right Arrow Stepper Controls */}
            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              <span className="font-mono text-xs font-bold tracking-widest text-[#575550] mr-2">
                {String(activeEventIndex + 1).padStart(2, '0')} / {String(EVENT_GALLERIES.length).padStart(2, '0')}
              </span>
              <motion.button
                type="button"
                onClick={handlePrevEvent}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.94, y: 0 }}
                className="p-2.5 rounded-xl border-2 border-[#050505] bg-white text-[#050505] hover:bg-[#F3F0E8] shadow-[2px_2px_0px_#050505] hover:shadow-[3px_3px_0px_#050505] transition-all cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#050505]"
                aria-label="Previous Event"
                title="Previous Event (or press Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                type="button"
                onClick={handleNextEvent}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.94, y: 0 }}
                className="p-2.5 rounded-xl border-2 border-[#050505] bg-white text-[#050505] hover:bg-[#F3F0E8] shadow-[2px_2px_0px_#050505] hover:shadow-[3px_3px_0px_#050505] transition-all cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#050505]"
                aria-label="Next Event"
                title="Next Event (or press Right Arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Expanding Architectural Rule (from EventsDomain / WhoAreWe) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-[1.5px] bg-[#050505]/20 mt-6 origin-left"
          />
        </motion.div>

        {/* =========================================================================
            PROPER, BALANCED FILTER TAB BOXES (Scroll Reveal)
            - By default: Clean, balanced white cards with proper rounded-xl corners
            - When selected: specific events burst into their official Google color
            - Animated sliding pill indicator using Framer Motion layoutId
           ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 mb-12"
        >
          <div
            ref={tabsScrollRef}
            className="flex items-center gap-3 sm:gap-3.5 overflow-x-auto pt-2 pb-4 px-2 scrollbar-none no-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            role="tablist"
            aria-label="Filter events"
          >
            {EVENT_GALLERIES.map((evt, idx) => {
              const isActive = evt.id === activeEvent.id;
              const isAllEvents = evt.id === 'all';
              const activeStyle = googleActiveStyles[evt.accentColor] || googleActiveStyles.blue;

              let buttonClasses = '';
              let subTextClasses = '';
              let titleClasses = '';
              let pillClasses = '';

              if (isActive && isAllEvents) {
                // All Events Selected (Clean, prestigious, neutral, proper)
                buttonClasses = '-translate-y-0.5';
                subTextClasses = 'text-[#575550] font-bold';
                titleClasses = 'text-[#050505] font-black';
                pillClasses = 'bg-[#050505] text-white';
              } else if (isActive && !isAllEvents) {
                // Specific Event Selected (Official Google Color Accent)
                buttonClasses = '-translate-y-0.5';
                subTextClasses = activeStyle.subText;
                titleClasses = activeStyle.text;
                pillClasses = activeStyle.pill;
              } else {
                // Inactive State (Clean, complete, proper box)
                buttonClasses = 'bg-white text-[#050505] border-2 border-[#050505]/20 hover:border-[#050505] shadow-[2px_2px_0px_rgba(5,5,5,0.06)] hover:shadow-[3px_3px_0px_#050505] hover:-translate-y-0.5';
                subTextClasses = 'text-[#575550]';
                titleClasses = 'text-[#050505]/85 group-hover:text-[#050505]';
                pillClasses = 'bg-[#050505]/8 text-[#575550] group-hover:bg-[#050505]/15';
              }

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
                  className={`group relative z-20 flex-shrink-0 snap-start px-5 py-3.5 rounded-xl transition-all duration-200 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#050505] focus-visible:ring-offset-2 ${buttonClasses}`}
                >
                  {/* Sliding Fluid Indicator via Framer Motion layoutId */}
                  {isActive && (
                    <motion.div
                      layoutId="activeEventTabIndicator"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className={`absolute inset-0 rounded-xl border-2 border-[#050505] shadow-[3px_3px_0px_#050505] pointer-events-none -z-10 ${
                        isAllEvents ? 'bg-white' : activeStyle.bg
                      }`}
                    />
                  )}

                  <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] tracking-wider uppercase">
                    <span className={subTextClasses}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="opacity-40">·</span>
                    <span className={subTextClasses}>
                      {evt.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap ${titleClasses}`}
                    >
                      {evt.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-full transition-colors ${pillClasses}`}
                    >
                      {evt.photos.length}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* =========================================================================
            ACTIVE EVENT BILLBOARD
            Clean editorial layout presenting the selected event's context
           ========================================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {/* Event Metadata & Title (Clean Architectural Header) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-[#050505]/10"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-3xl">
                  {/* Venue & Location Badge (Brutalist style matching EVENT ARCHIVES) */}
                  <div className="mb-3.5">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 border-[2px] border-[#050505] bg-white text-[#050505] text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider shadow-[2.5px_2.5px_0px_#050505]">
                      <MapPin className="w-3.5 h-3.5 text-[#050505]" />
                      <span>{activeEvent.location}</span>
                    </span>
                  </div>

                  {/* Event Name */}
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#050505] uppercase tracking-tight leading-[0.95] mb-3 font-sans">
                    {activeEvent.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#575550] font-medium leading-relaxed max-w-2xl">
                    {activeEvent.description}
                  </p>
                </div>

                {/* Right: Clean Captured Photos Counter Badge */}
                <div className="flex-shrink-0 self-start md:self-end">
                  <div className="inline-flex items-center gap-2 py-1 px-3.5 border-[2px] border-[#050505] bg-white text-[11px] font-mono font-bold uppercase tracking-wider text-[#050505] shadow-[2.5px_2.5px_0px_#050505]">
                    <Camera className="w-3.5 h-3.5 text-[#050505]" />
                    <span>{activeEvent.photos.length} Captured Photos</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* =========================================================================
                EVENT-SPECIFIC EXHIBITION GRID (Lazy Viewport Unveil)
                Asymmetrical, dynamic photo layout with clean, unobstructed photo surfaces
               ========================================================================= */}
            {activeEvent.photos.length === 0 ? (
              <div className="rounded-2xl border border-[#050505]/15 bg-white p-14 text-center shadow-[0_4px_18px_-4px_rgba(5,5,5,0.05)]">
                <p className="font-mono text-xs sm:text-sm font-bold text-[#575550] uppercase tracking-wider">
                  No photos archived for this event yet.
                </p>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5">
                {activeEvent.photos.map((photo, pIdx) => {
                  return (
                    <motion.div
                      key={`timeline-${activeEvent.id}-${photo.id}`}
                      initial={{ opacity: 0, y: 32, scale: 0.94 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: 0.5,
                        delay: Math.min((pIdx % 6) * 0.06, 0.28),
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="break-inside-avoid mb-4 sm:mb-5 group relative overflow-hidden rounded-2xl border border-[#050505]/15 bg-[#E5E0D8] shadow-[0_4px_20px_-3px_rgba(5,5,5,0.06),0_1px_3px_rgba(5,5,5,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(5,5,5,0.18)] hover:border-[#050505]/40 hover:-translate-y-1.5 hover:scale-[1.01] cursor-pointer transition-all duration-300 ease-out"
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
                              <p className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1 drop-shadow-sm">
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
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

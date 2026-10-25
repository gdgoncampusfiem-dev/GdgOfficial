'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { GalleryItem, EVENT_GALLERIES, EventGallery } from '@/data/gallery';
import { Maximize2, Search, X } from 'lucide-react';

interface GalleryCollageProps {
  items: GalleryItem[];
  onSelectImage: (item: GalleryItem, currentPhotos?: GalleryItem[]) => void;
  selectedEventId?: string;
  onSelectEvent?: (eventId: string) => void;
}

const QUICK_EVENTS = [
  { id: 'study-jam', label: 'Study Jam', query: 'Google Cloud Study Jam' },
  { id: 'devfest-2025', label: 'DevFest', query: 'DevFest Kolkata 2025' },
  { id: 'midnight-hackathon', label: 'Hackathon', query: 'Midnight Hackathon Sprint' },
  { id: 'flutter-codelab', label: 'Flutter', query: 'Hands-on Flutter & Cloud Codelab' },
];

const googleDotColors: Record<string, string> = {
  blue: 'bg-[#4285F4]',
  red: 'bg-[#EA4335]',
  yellow: 'bg-[#FBBC04]',
  green: 'bg-[#34A853]',
};

/**
 * Editorial Date Formatter
 * Formats dates like "OCT 18, 2025" -> "18 OCT 25" for clean, minimalist presentation
 */
function formatEditorialDate(dateStr: string): string {
  if (!dateStr) return '';
  const m1 = dateStr.match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/);
  if (m1) {
    const [, month, day, year] = m1;
    return `${day.padStart(2, '0')} ${month.toUpperCase()} ${year.slice(-2)}`;
  }
  const m2 = dateStr.match(/^([A-Za-z]+)\s+([0-9–-]+),\s+(\d{4})$/);
  if (m2) {
    const [, month, days, year] = m2;
    return `${days} ${month.toUpperCase()} ${year.slice(-2)}`;
  }
  return dateStr.toUpperCase();
}

export function GalleryMasonry({
  items,
  onSelectImage,
  selectedEventId,
  onSelectEvent,
}: GalleryCollageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Subtle Multi-Plane Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yTop = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const yMid = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const yBottom = useTransform(scrollYProgress, [0, 1], [22, -22]);

  // Global / Keyboard shortcut listener for instantaneous search activation
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;
      if (e.key === '/') {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => inputRef.current?.focus(), 60);
      }
      if (e.key === 'Escape') {
        setSearchQuery('');
        setIsSearchOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const showExpandedSearch = isSearchOpen || trimmedQuery.length > 0;

  // Matched official event from EVENT_GALLERIES (synced with search or external selection)
  const matchedEvent: EventGallery | null = useMemo(() => {
    if (!trimmedQuery) {
      if (selectedEventId && selectedEventId !== 'all') {
        return EVENT_GALLERIES.find((e) => e.id === selectedEventId) || null;
      }
      return null;
    }
    return (
      EVENT_GALLERIES.find(
        (e) =>
          e.id !== 'all' &&
          (e.name.toLowerCase().includes(trimmedQuery) ||
            e.id.toLowerCase().includes(trimmedQuery) ||
            e.categoryLabel.toLowerCase().includes(trimmedQuery) ||
            e.tagline.toLowerCase().includes(trimmedQuery))
      ) || null
    );
  }, [trimmedQuery, selectedEventId]);

  // Filter photos based on search query or matched event
  const filteredPhotos = useMemo(() => {
    if (!trimmedQuery) return items;

    if (matchedEvent && matchedEvent.photos.length > 0) {
      return matchedEvent.photos;
    }

    const matched = items.filter(
      (item) =>
        item.eventName?.toLowerCase().includes(trimmedQuery) ||
        item.title.toLowerCase().includes(trimmedQuery) ||
        item.subtitle?.toLowerCase().includes(trimmedQuery) ||
        item.category.toLowerCase().includes(trimmedQuery) ||
        item.location?.toLowerCase().includes(trimmedQuery)
    );

    return matched;
  }, [items, trimmedQuery, matchedEvent]);

  const hasNoMatches = trimmedQuery.length > 0 && filteredPhotos.length === 0;
  const effectiveItems = filteredPhotos.length > 0 ? filteredPhotos : items;

  // Key tracking active search/filter state to trigger coordinated arise animation
  const searchCycleKey = matchedEvent
    ? matchedEvent.id
    : trimmedQuery
    ? `q-${trimmedQuery}`
    : selectedEventId || 'all';

  // Safe mapping helper
  const getItem = (idx: number) => effectiveItems[idx % effectiveItems.length];

  const p1 = trimmedQuery ? getItem(0) : getItem(0);
  const p2 = trimmedQuery ? getItem(1) : getItem(1);
  const p3 = trimmedQuery ? getItem(2) : getItem(5);
  const p4 = trimmedQuery ? getItem(3) : (items[16] || getItem(3));
  const p5 = trimmedQuery ? getItem(4) : getItem(4);
  const p6 = trimmedQuery ? getItem(5) : (items[10] || getItem(6));
  const p7 = trimmedQuery ? getItem(6) : getItem(2);
  const p8 = trimmedQuery ? getItem(7) : (items[3] || getItem(7));

  const handleScrollToArchive = () => {
    if (matchedEvent) {
      onSelectEvent?.(matchedEvent.id);
    }
    const target = document.getElementById('events-by-day');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 60);
  };

  const handleCloseSearch = () => {
    setSearchQuery('');
    setIsSearchOpen(false);
    inputRef.current?.blur();
    onSelectEvent?.('all');
  };

  return (
    <div ref={containerRef} className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-10 sm:pb-14">
      {/* =========================================================================
          MOBILE & TABLET VIEW (lg:hidden)
          2-column masonry with full-color high-res photos
         ========================================================================= */}
      <div className="lg:hidden">
        {/* Mobile Heading & Expandable Search */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 pt-4 flex flex-col items-center"
        >
          {/* Top Badge */}
          {matchedEvent ? (
            <span className="inline-flex items-center gap-1.5 py-1 px-3 border-2 border-[#050505] bg-white text-[#050505] text-[10px] font-mono font-bold uppercase tracking-[0.2em] shadow-[2px_2px_0px_#050505] mb-3">
              <span className={`w-2 h-2 rounded-full ${googleDotColors[matchedEvent.accentColor] || 'bg-[#4285F4]'}`} />
              EVENT ARCHIVE · {matchedEvent.categoryLabel}
            </span>
          ) : hasNoMatches ? (
            <span className="inline-block py-1 px-3 border-2 border-[#EA4335] bg-white text-[#EA4335] text-[10px] font-mono font-bold uppercase tracking-[0.2em] shadow-[2px_2px_0px_#EA4335] mb-3">
              NO ARCHIVES FOUND
            </span>
          ) : (
            <span className="inline-block py-1 px-3 border-2 border-[#050505] bg-white text-[#050505] text-[10px] font-mono font-bold uppercase tracking-[0.2em] shadow-[2px_2px_0px_#050505] mb-3">
              The Visual Chronicle
            </span>
          )}

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-black text-[#050505] tracking-tight uppercase leading-tight font-sans">
            {matchedEvent ? (
              matchedEvent.name
            ) : hasNoMatches ? (
              'No Matches'
            ) : trimmedQuery ? (
              `"${searchQuery}"`
            ) : (
              <>
                Photo <span className="font-bold">Gallery</span>
              </>
            )}
          </h1>

          {/* Clean Minimalist Subtitle - Date and Year Only */}
          <p className="text-xs text-[#575550] mt-1.5 font-mono font-bold tracking-[0.2em] uppercase">
            {matchedEvent
              ? formatEditorialDate(matchedEvent.date)
              : hasNoMatches
              ? 'Try searching "Study Jam", "DevFest", or "Hackathon"'
              : trimmedQuery
              ? `${filteredPhotos.length} matching photos`
              : 'A glimpse into our chapter moments'}
          </p>

          {/* Expandable Search Trigger OR Full Input Bar */}
          <AnimatePresence mode="wait">
            {!showExpandedSearch ? (
              /* Magnifying Glass Trigger Button */
              <motion.button
                key="trigger-btn-mobile"
                type="button"
                onClick={handleOpenSearch}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-3.5 px-4 py-2 rounded-xl border-2 border-[#050505] bg-white text-[#050505] shadow-[2px_2px_0px_#050505] active:translate-y-0.5 flex items-center gap-2 cursor-pointer transition-all"
                aria-label="Open search"
              >
                <Search className="w-3.5 h-3.5 text-[#050505]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  Search Events
                </span>
              </motion.button>
            ) : (
              /* Full Search Bar & Chips */
              <motion.div
                key="expanded-search-mobile"
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-sm mx-auto mt-4 px-1"
              >
                <div className="relative flex items-center">
                  <Search className="absolute left-3.5 w-4 h-4 text-[#050505]/50 pointer-events-none" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search event (e.g. Study Jam, DevFest)..."
                    className="w-full pl-10 pr-9 py-2.5 rounded-xl border-2 border-[#050505] bg-white text-[#050505] placeholder:text-[#575550]/60 text-xs font-mono font-medium shadow-[2px_2px_0px_#050505] focus:shadow-[3px_3px_0px_#050505] focus:outline-none transition-all"
                    aria-label="Search gallery events"
                  />
                  <button
                    type="button"
                    onClick={handleCloseSearch}
                    className="absolute right-3 p-1 rounded-full text-[#575550] hover:text-[#050505] transition-colors"
                    aria-label="Close search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Mobile Quick Chips */}
                <div className="flex items-center justify-center flex-wrap gap-1.5 mt-2.5">
                  {QUICK_EVENTS.map((qEvt) => {
                    const isCurrent =
                      searchQuery.toLowerCase().trim() === qEvt.query.toLowerCase().trim() ||
                      matchedEvent?.id === qEvt.id;
                    return (
                      <button
                        key={qEvt.id}
                        type="button"
                        onClick={() => {
                          inputRef.current?.blur();
                          if (isCurrent) {
                            setSearchQuery('');
                            onSelectEvent?.('all');
                          } else {
                            setSearchQuery(qEvt.query);
                            onSelectEvent?.(qEvt.id);
                          }
                        }}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider transition-all border ${
                          isCurrent
                            ? 'bg-[#050505] text-white border-[#050505] shadow-[1px_1px_0px_#050505]'
                            : 'bg-white text-[#575550] hover:text-[#050505] border-[#050505]/20 hover:border-[#050505]'
                        }`}
                      >
                        {qEvt.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 2-Column Responsive Masonry */}
        <div className="columns-2 gap-3 sm:gap-4">
          {effectiveItems.map((item, idx) => (
            <motion.div
              key={`m-${searchCycleKey}-${item.id}-${idx}`}
              initial={{ opacity: 0, y: 32, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.52,
                delay: Math.min((idx % 4) * 0.07, 0.28),
                ease: [0.16, 1, 0.3, 1],
              }}
              className="break-inside-avoid mb-3 sm:mb-4 group relative overflow-hidden rounded-2xl border border-[#050505]/15 bg-white shadow-[0_4px_18px_-4px_rgba(5,5,5,0.07)] hover:shadow-[0_16px_32px_-8px_rgba(5,5,5,0.16)] hover:border-[#050505]/40 hover:-translate-y-1 cursor-pointer transition-all duration-300"
              onClick={() => onSelectImage(item, effectiveItems)}
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

                {/* Hover Gradient with Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                  <div className="flex items-center justify-between w-full text-white">
                    <div className="pr-2">
                      <span className="inline-block px-1.5 py-0.5 rounded-sm bg-white/20 backdrop-blur-md text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-white mb-1">
                        {item.category}
                      </span>
                      <p className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1 drop-shadow-sm font-sans">
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
          {/* --- CENTER EMBEDDED TITLE & SEARCH BAR --- */}
          <div
            className="absolute flex items-center justify-center z-20 p-2 sm:p-4"
            style={{
              left: '30.70%',
              top: '34.19%',
              width: '40.78%',
              height: '31.41%',
            }}
          >
            <div className="text-center flex flex-col items-center justify-center w-full">
              {/* Dynamic Title Animated Transformation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={matchedEvent ? matchedEvent.id : trimmedQuery ? `q-${trimmedQuery}` : 'default'}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center w-full"
                >
                  {/* Top Badge */}
                  {matchedEvent ? (
                    <span className="inline-flex items-center gap-1.5 py-1 px-3.5 border-2 border-[#050505] bg-white text-[#050505] text-[10px] font-mono font-bold uppercase tracking-[0.2em] shadow-[2px_2px_0px_#050505] mb-2">
                      <motion.span
                        animate={{ scale: [1, 1.35, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className={`w-2 h-2 rounded-full ${googleDotColors[matchedEvent.accentColor] || 'bg-[#4285F4]'}`}
                      />
                      EVENT ARCHIVE · {matchedEvent.categoryLabel}
                    </span>
                  ) : hasNoMatches ? (
                    <span className="inline-block py-1 px-3.5 border-2 border-[#EA4335] bg-white text-[#EA4335] text-[10px] font-mono font-bold uppercase tracking-[0.2em] shadow-[2px_2px_0px_#EA4335] mb-2">
                      NO ARCHIVES FOUND
                    </span>
                  ) : (
                    <span className="inline-block py-1 px-3.5 border-2 border-[#050505] bg-white text-[#050505] text-[10px] font-mono font-bold uppercase tracking-[0.2em] shadow-[2px_2px_0px_#050505] mb-2">
                      The Visual Chronicle
                    </span>
                  )}

                  {/* Heading - Transforms smoothly to Event Name */}
                  <h1
                    className="text-[#050505] leading-[1.12] tracking-tight font-black uppercase max-w-lg mx-auto font-sans"
                    style={{
                      fontSize: matchedEvent
                        ? 'clamp(1.2rem, 1.8vw, 2.1rem)'
                        : hasNoMatches
                        ? 'clamp(1.5rem, 2.2vw, 2.4rem)'
                        : 'clamp(2.1rem, 3.4vw, 3.6rem)',
                    }}
                  >
                    {matchedEvent ? (
                      matchedEvent.name
                    ) : hasNoMatches ? (
                      'No Matches'
                    ) : trimmedQuery ? (
                      `"${searchQuery}"`
                    ) : (
                      <>
                        Photo <span className="font-bold">Gallery</span>
                      </>
                    )}
                  </h1>

                  {/* Architectural Hairline Reveal Divider */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-12 h-[1.5px] bg-[#050505]/25 my-1.5 origin-center"
                  />

                  {/* Clean Minimalist Subtitle - Date and Year Only */}
                  <p className="text-[#575550] font-mono font-bold text-xs tracking-[0.2em] uppercase max-w-sm mx-auto line-clamp-1">
                    {matchedEvent
                      ? formatEditorialDate(matchedEvent.date)
                      : hasNoMatches
                      ? 'Try searching "Study Jam", "DevFest", or "Hackathon"'
                      : trimmedQuery
                      ? `${filteredPhotos.length} matching photos`
                      : 'A visual chronicle of chapter moments'}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Expandable Search Trigger OR Full Search Input Bar */}
              <AnimatePresence mode="wait">
                {!showExpandedSearch ? (
                  /* Magnifying Glass Trigger Button */
                  <motion.button
                    key="trigger-btn-desktop"
                    type="button"
                    onClick={handleOpenSearch}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -2, boxShadow: '4px 4px 0px #050505' }}
                    whileTap={{ y: 0, boxShadow: '2px 2px 0px #050505' }}
                    className="mt-3.5 px-4 py-2 rounded-xl border-2 border-[#050505] bg-white text-[#050505] shadow-[3px_3px_0px_#050505] flex items-center justify-center gap-2.5 group cursor-pointer transition-all"
                    aria-label="Open event search"
                    title="Click to search events or press /"
                  >
                    <Search className="w-3.5 h-3.5 text-[#050505] group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#050505]">
                      Search Events
                    </span>
                    <span className="px-1.5 py-0.5 rounded border border-[#050505]/20 bg-[#F3F0E8] font-mono text-[9px] font-bold text-[#575550]">
                      /
                    </span>
                  </motion.button>
                ) : (
                  /* Full Architectural Search Bar & Quick Suggest Chips */
                  <motion.div
                    key="expanded-search-desktop"
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-sm sm:max-w-md mx-auto mt-3 px-2"
                  >
                    <div className="relative flex items-center">
                      <Search className="absolute left-3.5 w-4 h-4 text-[#050505]/50 pointer-events-none" />
                      <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search event (e.g. Study Jam, DevFest)..."
                        className="w-full pl-10 pr-10 py-2 rounded-xl border-2 border-[#050505] bg-white text-[#050505] placeholder:text-[#575550]/60 text-xs font-mono font-medium shadow-[2px_2px_0px_#050505] focus:shadow-[3px_3px_0px_#050505] focus:outline-none transition-all"
                        aria-label="Search events"
                      />
                      <button
                        type="button"
                        onClick={handleCloseSearch}
                        className="absolute right-3 p-1 rounded-full text-[#575550] hover:text-[#050505] hover:bg-[#050505]/10 transition-colors cursor-pointer"
                        aria-label="Close search"
                        title="Close search (Esc)"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Quick Suggestion Chips */}
                    <div className="flex items-center justify-center flex-wrap gap-1.5 mt-2">
                      <span className="text-[10px] font-mono text-[#575550] uppercase tracking-wider mr-1">
                        QUICK:
                      </span>
                      {QUICK_EVENTS.map((qEvt) => {
                        const isCurrent =
                          searchQuery.toLowerCase().trim() === qEvt.query.toLowerCase().trim() ||
                          matchedEvent?.id === qEvt.id;
                        return (
                          <button
                            key={qEvt.id}
                            type="button"
                            onClick={() => {
                              inputRef.current?.blur();
                              if (isCurrent) {
                                setSearchQuery('');
                                onSelectEvent?.('all');
                              } else {
                                setSearchQuery(qEvt.query);
                                onSelectEvent?.(qEvt.id);
                              }
                            }}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider transition-all border cursor-pointer ${
                              isCurrent
                                ? 'bg-[#050505] text-white border-[#050505] shadow-[1px_1px_0px_#050505]'
                                : 'bg-white text-[#575550] hover:text-[#050505] border-[#050505]/20 hover:border-[#050505] shadow-[1px_1px_0px_rgba(5,5,5,0.04)]'
                            }`}
                          >
                            {qEvt.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Link to Jump to Full Timeline Archive */}
                    {matchedEvent && (
                      <div className="mt-2 text-center">
                        <button
                          type="button"
                          onClick={handleScrollToArchive}
                          className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#575550] hover:text-[#050505] transition-colors group cursor-pointer"
                        >
                          <span>TIMELINE ARCHIVE</span>
                          <span className="transition-transform group-hover:translate-y-0.5">↓</span>
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Interlocking Desktop Frames (Clean, Unobstructed, Pure Photography) */}
          {[
            { item: p1, left: '0%', top: '0%', width: '28.60%', height: '31.41%', y: yTop, delay: 0.04, priority: true },
            { item: p2, left: '30.70%', top: '0%', width: '18.25%', height: '31.41%', y: yTop, delay: 0.08, priority: true },
            { item: p3, left: '51.05%', top: '0%', width: '18.33%', height: '31.41%', y: yTop, delay: 0.12, priority: true },
            { item: p4, left: '71.48%', top: '0%', width: '28.52%', height: '45.88%', y: yTop, delay: 0.16, priority: false },
            { item: p5, left: '0%', top: '34.19%', width: '28.60%', height: '31.41%', y: yMid, delay: 0.2, priority: false },
            { item: p6, left: '0%', top: '68.59%', width: '41.90%', height: '31.41%', y: yBottom, delay: 0.24, priority: false },
            { item: p7, left: '44.00%', top: '68.59%', width: '25.32%', height: '31.41%', y: yBottom, delay: 0.28, priority: false },
            { item: p8, left: '71.48%', top: '48.85%', width: '28.52%', height: '51.15%', y: yBottom, delay: 0.32, priority: false },
          ].map((cfg, idx) => {
            const itm = cfg.item;
            if (!itm) return null;

            return (
              <motion.figure
                key={`slot-${idx}`}
                style={{
                  left: cfg.left,
                  top: cfg.top,
                  width: cfg.width,
                  height: cfg.height,
                  y: cfg.y,
                }}
                className="absolute overflow-hidden rounded-2xl border border-[#050505]/15 bg-white shadow-[0_4px_22px_-3px_rgba(5,5,5,0.07),0_1px_3px_rgba(5,5,5,0.04)] hover:shadow-[0_22px_45px_-10px_rgba(5,5,5,0.18)] hover:border-[#050505]/40 hover:-translate-y-1.5 hover:scale-[1.012] cursor-pointer group transition-all duration-300 ease-out"
                onClick={() => onSelectImage(itm, effectiveItems)}
              >
                {/* Photo Arising Animation on Search & Filter Change */}
                <motion.div
                  key={`arise-${searchCycleKey}-${itm.id}`}
                  initial={{ opacity: 0, y: 34, scale: 0.93 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: cfg.delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative w-full h-full overflow-hidden bg-[#E5E0D8]"
                >
                  <Image
                    src={itm.imageUrl}
                    alt={itm.title}
                    fill
                    priority={cfg.priority}
                    quality={90}
                    sizes="(min-width: 1024px) 35vw, 50vw"
                    className="object-cover saturate-[1.06] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Refined Editorial Gradient & Hover Info Tag (Only on hover) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 lg:p-5 pointer-events-none">
                    <div className="flex items-center justify-between w-full text-white">
                      <div className="pr-3">
                        <span className="inline-block px-2 py-0.5 rounded-sm bg-white/20 backdrop-blur-md text-[10px] font-mono font-bold uppercase tracking-wider text-white mb-1.5">
                          {itm.category}
                        </span>
                        <p className="text-sm lg:text-base font-bold tracking-tight text-white line-clamp-1 drop-shadow-sm font-sans">
                          {itm.title}
                        </p>
                      </div>
                      <div className="flex-shrink-0 p-2 rounded-full bg-white/20 backdrop-blur-md text-white group-hover:scale-110 transition-transform duration-200">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}

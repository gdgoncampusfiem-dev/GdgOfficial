'use client';

import { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { GalleryItem } from '@/data/gallery';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  currentIndex: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function GalleryLightbox({
  item,
  currentIndex,
  total,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (!item) return;

    window.addEventListener('keydown', handleKeyDown);

    // Prevent scrollbar layout shift on Windows/desktop
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [item, handleKeyDown]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-[#050505]/95 backdrop-blur-2xl"
            onClick={onClose}
          />

          {/* Top Control Bar */}
          <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-5 md:p-8 pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-3">
              <span className="font-mono text-xs md:text-sm font-semibold tracking-widest text-white/70">
                {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full bg-white/10 text-white/90 border border-white/15 backdrop-blur-md">
                {item.category}
              </span>
            </div>

            <button
              onClick={onClose}
              className="pointer-events-auto flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-md shadow-lg"
              aria-label="Close Lightbox"
            >
              <span className="text-[11px] font-mono font-medium text-white/70 hidden sm:inline">ESC</span>
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Navigation Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 md:left-8 z-30 p-3 md:p-4 rounded-full border border-white/20 bg-white/10 hover:bg-white/25 text-white transition-all duration-200 hover:scale-110 active:scale-95 shadow-2xl backdrop-blur-md hidden sm:flex items-center justify-center"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Navigation Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 md:right-8 z-30 p-3 md:p-4 rounded-full border border-white/20 bg-white/10 hover:bg-white/25 text-white transition-all duration-200 hover:scale-110 active:scale-95 shadow-2xl backdrop-blur-md hidden sm:flex items-center justify-center"
            aria-label="Next Image"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Main Image Stage */}
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 max-w-5xl max-h-[72vh] w-[90vw] h-[72vh] flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full border border-white/15 rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] bg-black/50">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                priority
                quality={90}
                sizes="(max-width: 1200px) 90vw, 1200px"
                className="object-contain saturate-[1.04]"
              />
            </div>
          </motion.div>

          {/* Bottom Details Bar */}
          <motion.div
            key={`caption-${item.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.25, delay: 0.08 }}
            className="absolute bottom-5 md:bottom-8 left-4 right-4 md:left-auto md:right-auto z-30 max-w-2xl bg-[#0D0D0D]/90 border border-white/15 rounded-2xl px-6 py-4 shadow-2xl backdrop-blur-xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-white/60 font-mono shrink-0">
                  {item.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#4285F4]" />
                      {item.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#FBBC04]" />
                    {item.date}
                  </span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

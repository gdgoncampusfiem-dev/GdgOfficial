import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export interface CreativeDomainDetail {
  key: string;
  name: string;
  trackNumber: string;
  title: string;
  description: [string, string, string];
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  shadowColor: string;
}

export const CREATIVE_DOMAINS_MODAL_DATA: Record<string, CreativeDomainDetail> = {
  'UI/UX': {
    key: 'ui-ux',
    name: 'UI/UX',
    trackNumber: '01',
    title: 'UI/UX Design | GDG OC FIEM',
    description: [
      'Our team designs all club interfaces, creates Figma prototypes, and ensures every digital product feels intuitive and user-friendly.',
      '',
      '',
    ],
    accentColor: '#EA4335',
    accentBg: '#FCECEB',
    accentBorder: '#EA4335',
    shadowColor: '#EA4335',
  },
  'Graphic Design': {
    key: 'graphic-design',
    name: 'GRAPHIC DESIGN',
    trackNumber: '02',
    title: 'Graphic Design | GDG OC FIEM',
    description: [
      'Our team creates event posters, branding kits, and visual assets that define the club\'s identity across all platforms.',
      '',
      '',
    ],
    accentColor: '#FBBC04',
    accentBg: '#FFF7E6',
    accentBorder: '#FBBC04',
    shadowColor: '#FBBC04',
  },
  'Video Editing': {
    key: 'video-editing',
    name: 'VIDEO EDITING',
    trackNumber: '03',
    title: 'Video Editing | GDG OC FIEM',
    description: [
      'Our team produces aftermovies, event recaps, and promo reels that capture the community\'s energy and story.',
      '',
      '',
    ],
    accentColor: '#4285F4',
    accentBg: '#EAF1FE',
    accentBorder: '#4285F4',
    shadowColor: '#4285F4',
  },
  'Content Creation': {
    key: 'content-creation',
    name: 'CONTENT CREATION',
    trackNumber: '04',
    title: 'Content Creation | GDG OC FIEM',
    description: [
      'Our team writes posts, captions, and campaigns that grow the club\'s presence on LinkedIn, Instagram, and beyond.',
      '',
      '',
    ],
    accentColor: '#34A853',
    accentBg: '#EBF6EE',
    accentBorder: '#34A853',
    shadowColor: '#34A853',
  },
};

export function getCreativeDomainDetail(key: string | null): CreativeDomainDetail | null {
  if (!key) return null;
  if (CREATIVE_DOMAINS_MODAL_DATA[key]) return CREATIVE_DOMAINS_MODAL_DATA[key];

  const normalized = key.toLowerCase().replace(/[\s\/\-_]/g, '');
  for (const [k, v] of Object.entries(CREATIVE_DOMAINS_MODAL_DATA)) {
    if (k.toLowerCase().replace(/[\s\/\-_]/g, '') === normalized) {
      return v;
    }
  }
  return null;
}

interface CreativeDomainModalProps {
  isOpen: boolean;
  domainKey: string | null;
  onClose: () => void;
  triggerButtonRef?: React.RefObject<HTMLElement | null>;
}

export function CreativeDomainModal({
  isOpen,
  domainKey,
  onClose,
  triggerButtonRef
}: CreativeDomainModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const modalCardRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const domain = getCreativeDomainDetail(domainKey);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Keyboard accessibility: Escape key to dismiss
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Simple focus trap
      if (e.key === 'Tab' && modalCardRef.current) {
        const focusableElements = modalCardRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener('keydown', handleKeyDown);

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Set initial focus to close button
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      clearTimeout(timer);

      // Return focus to trigger button
      if (triggerButtonRef?.current) {
        triggerButtonRef.current.focus();
      }
    };
  }, [isOpen, handleKeyDown, triggerButtonRef]);

  if (!isMounted) return null;

  const content = (
    <AnimatePresence mode="wait">
      {isOpen && domain && (
        <motion.div
          key="creative-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden={!isOpen}
        >
          <motion.div
            ref={modalCardRef}
            key={`creative-modal-card-${domain.key}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="creative-domain-modal-title"
            aria-describedby="creative-domain-modal-description"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[340px] max-w-[92vw] flex flex-col bg-[#F3F0E8] border-[3px] border-[#050505] shadow-[8px_8px_0px_#050505] focus:outline-none"
            style={{ borderRadius: 0 }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
          >
            {/* Window Chrome Header */}
            <div className="w-full h-10 border-b border-[#050505]/10 bg-white px-5 flex items-center justify-between select-none shrink-0" style={{ borderRadius: 0 }}>
              <span className="font-sans text-[11px] font-medium text-[#050505]/50 tracking-widest uppercase">
                GDG On Campus · FIEM
              </span>

              {/* Close Button "✕" */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label={`Close ${domain.title} details`}
                className="flex items-center justify-center text-[#050505]/40 hover:text-[#050505] transition-colors duration-150 cursor-pointer focus-visible:outline-none rounded"
              >
                <span className="text-lg font-light leading-none" aria-hidden="true">
                  ✕
                </span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto px-7 pt-6 pb-7 flex flex-col gap-3">

              {/* Title */}
              <h2
                id="creative-domain-modal-title"
                className="text-xl sm:text-2xl font-semibold text-[#050505] tracking-tight leading-snug font-sans"
              >
                {domain.title}
              </h2>

              {/* Description */}
              <div id="creative-domain-modal-description" className="mt-1">
                <p className="text-[15px] sm:text-base font-normal text-[#4a4845] leading-[1.75]">
                  {domain.description[0]}
                </p>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}

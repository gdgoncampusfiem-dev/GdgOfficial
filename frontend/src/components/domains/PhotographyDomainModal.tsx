import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export interface PhotographyDomainDetail {
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

export const PHOTOGRAPHY_DOMAINS_MODAL_DATA: Record<string, PhotographyDomainDetail> = {
  'Photography': {
    key: 'photography',
    name: 'PHOTOGRAPHY',
    trackNumber: '01',
    title: 'Photography | GDG OC FIEM',
    description: [
      'Our team documents keynote moments, candid team interactions, and crowd energy with high-end camera gear at all community gatherings.',
      '',
      '',
    ],
    accentColor: '#4285F4',
    accentBg: '#EAF1FE',
    accentBorder: '#4285F4',
    shadowColor: '#4285F4',
  },
  'Videography': {
    key: 'videography',
    name: 'VIDEOGRAPHY',
    trackNumber: '02',
    title: 'Videography & Cinematography | GDG OC FIEM',
    description: [
      'Our team directs cinematic event teasers, participant interviews, and live coverage to showcase the vibrant culture of GDG.',
      '',
      '',
    ],
    accentColor: '#EA4335',
    accentBg: '#FCECEB',
    accentBorder: '#EA4335',
    shadowColor: '#EA4335',
  },
  'Lightroom': {
    key: 'lightroom',
    name: 'LIGHTROOM',
    trackNumber: '03',
    title: 'Photo Post-Processing | GDG OC FIEM',
    description: [
      'Our team color-grades, enhances, and curates hundreds of event photos in Lightroom to deliver a consistent, vibrant brand aesthetic.',
      '',
      '',
    ],
    accentColor: '#FBBC04',
    accentBg: '#FFF7E6',
    accentBorder: '#FBBC04',
    shadowColor: '#FBBC04',
  },
  'Editing': {
    key: 'editing',
    name: 'EDITING',
    trackNumber: '04',
    title: 'Media Editing & Production | GDG OC FIEM',
    description: [
      'Our team handles sound design, motion titles, and rapid video cuts in Premiere Pro and DaVinci to push fast recaps across all social channels.',
      '',
      '',
    ],
    accentColor: '#34A853',
    accentBg: '#EBF6EE',
    accentBorder: '#34A853',
    shadowColor: '#34A853',
  },
};

export function getPhotographyDomainDetail(key: string | null): PhotographyDomainDetail | null {
  if (!key) return null;
  if (PHOTOGRAPHY_DOMAINS_MODAL_DATA[key]) return PHOTOGRAPHY_DOMAINS_MODAL_DATA[key];

  const normalized = key.toLowerCase().replace(/[\s\/\-_]/g, '');
  for (const [k, v] of Object.entries(PHOTOGRAPHY_DOMAINS_MODAL_DATA)) {
    if (k.toLowerCase().replace(/[\s\/\-_]/g, '') === normalized) {
      return v;
    }
  }
  return null;
}

interface PhotographyDomainModalProps {
  isOpen: boolean;
  domainKey: string | null;
  onClose: () => void;
  triggerButtonRef?: React.RefObject<HTMLElement | null>;
}

export function PhotographyDomainModal({
  isOpen,
  domainKey,
  onClose,
  triggerButtonRef,
}: PhotographyDomainModalProps) {
  const [mounted, setMounted] = useState(false);
  const modalCardRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const domain = getPhotographyDomainDetail(domainKey);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle Escape key and focus trapping
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

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
    [isOpen, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Lock body scroll and manage focus restoration
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Auto focus close button after mounting
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;

      // Restore focus to triggering button
      if (triggerButtonRef?.current) {
        triggerButtonRef.current.focus();
      }
    };
  }, [isOpen, triggerButtonRef]);

  if (!mounted) return null;

  const content = (
    <AnimatePresence mode="wait">
      {isOpen && domain && (
        <motion.div
          key="photography-modal-backdrop"
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
            key={`photography-modal-card-${domain.key}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="photography-domain-modal-title"
            aria-describedby="photography-domain-modal-description"
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
                id="photography-domain-modal-title"
                className="text-xl sm:text-2xl font-semibold text-[#050505] tracking-tight leading-snug font-sans"
              >
                {domain.title}
              </h2>

              {/* Description */}
              <div id="photography-domain-modal-description" className="mt-1">
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


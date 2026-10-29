'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// --- Data Types ---
export interface OtherDomainDetail {
  key: string;
  name: string;
  title: string;
  description: string;
}

// --- Modal Data ---
export const OTHER_DOMAINS_MODAL_DATA: Record<string, OtherDomainDetail> = {
  // Outreach
  'Networking': {
    key: 'networking',
    name: 'NETWORKING',
    title: 'Networking & PR | GDG OC FIEM',
    description: 'Our team builds connections with industry leaders, alumni, and partner organizations to grow the club\'s reach and opportunities.',
  },
  'Social Media': {
    key: 'social-media',
    name: 'SOCIAL MEDIA',
    title: 'Social Media & Outreach | GDG OC FIEM',
    description: 'Our team manages the club\'s presence on LinkedIn, Instagram, and X — crafting posts and strategies that keep the community engaged.',
  },
  'Sponsorships': {
    key: 'sponsorships',
    name: 'SPONSORSHIPS',
    title: 'Sponsorships & Partnerships | GDG OC FIEM',
    description: 'Our team secures funding and in-kind support from companies and partner brands to power the club\'s flagship events and initiatives.',
  },
  'Marketing': {
    key: 'marketing',
    name: 'MARKETING',
    title: 'Marketing & Growth | GDG OC FIEM',
    description: 'Our team promotes club events and bootcamps through targeted campaigns, email outreach, and data-driven engagement that drives registrations.',
  },

  // Events
  'Logistics': {
    key: 'logistics',
    name: 'LOGISTICS',
    title: 'Logistics & Venue Management | GDG OC FIEM',
    description: 'Our team manages venue booking, audio-visual equipment, catering, and transport to ensure every event runs smoothly without a hitch.',
  },
  'Operations': {
    key: 'operations',
    name: 'OPERATIONS',
    title: 'Event Operations | GDG OC FIEM',
    description: 'Our team oversees on-ground coordination, volunteer task assignments, crowd control, and real-time troubleshooting on event day.',
  },
  'Planning': {
    key: 'planning',
    name: 'PLANNING',
    title: 'Event Planning & Strategy | GDG OC FIEM',
    description: 'Our team crafts comprehensive event blueprints, speaker schedules, timelines, and interactive attendee experiences from start to finish.',
  },
  'Execution': {
    key: 'execution',
    name: 'EXECUTION',
    title: 'Event Execution | GDG OC FIEM',
    description: 'Our team brings hackathons, workshops, and speaker summits to life — handling stage production, attendee check-ins, and final wrap-ups.',
  },

  // Photography
  'Photography': {
    key: 'photography',
    name: 'PHOTOGRAPHY',
    title: 'Photography | GDG OC FIEM',
    description: 'Our team documents keynote moments, candid team interactions, and crowd energy with high-end camera gear at all community gatherings.',
  },
  'Videography': {
    key: 'videography',
    name: 'VIDEOGRAPHY',
    title: 'Videography & Cinematography | GDG OC FIEM',
    description: 'Our team directs cinematic event teasers, participant interviews, and live coverage to showcase the vibrant culture of GDG.',
  },
  'Lightroom': {
    key: 'lightroom',
    name: 'LIGHTROOM',
    title: 'Photo Post-Processing | GDG OC FIEM',
    description: 'Our team color-grades, enhances, and curates hundreds of event photos in Lightroom to deliver a consistent, vibrant brand aesthetic.',
  },
  'Editing': {
    key: 'editing',
    name: 'EDITING',
    title: 'Media Editing & Production | GDG OC FIEM',
    description: 'Our team handles sound design, motion titles, and rapid video cuts in Premiere Pro and DaVinci to push fast recaps across all social channels.',
  },
};

export function getOtherDomainDetail(key: string | null): OtherDomainDetail | null {
  if (!key) return null;
  if (OTHER_DOMAINS_MODAL_DATA[key]) return OTHER_DOMAINS_MODAL_DATA[key];

  const normalized = key.toLowerCase().replace(/[\s\/\-_]/g, '');
  for (const [k, v] of Object.entries(OTHER_DOMAINS_MODAL_DATA)) {
    if (k.toLowerCase().replace(/[\s\/\-_]/g, '') === normalized) {
      return v;
    }
  }
  return null;
}

// --- Component ---
export interface OtherDomainModalProps {
  isOpen: boolean;
  domainKey: string | null;
  onClose: () => void;
  accentColor?: string;
  accentBg?: string;
  triggerButtonRef?: React.RefObject<HTMLElement | null>;
}

export function OtherDomainModal({
  isOpen,
  domainKey,
  onClose,
  triggerButtonRef,
}: OtherDomainModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const modalCardRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const domain = getOtherDomainDetail(domainKey);

  useEffect(() => { setIsMounted(true); }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      if (e.key === 'Tab' && modalCardRef.current) {
        const focusable = modalCardRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    const timer = setTimeout(() => { closeButtonRef.current?.focus(); }, 50);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.paddingRight = '';
      clearTimeout(timer);
      if (triggerButtonRef?.current) triggerButtonRef.current.focus();
    };
  }, [isOpen, handleKeyDown, triggerButtonRef]);

  if (!isMounted) return null;

  const content = (
    <AnimatePresence mode="wait">
      {isOpen && domain && (
        <motion.div
          key="other-modal-backdrop"
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
            key={`other-modal-card-${domain.key}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="other-domain-modal-title"
            aria-describedby="other-domain-modal-description"
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
            <div
              className="w-full h-10 border-b border-[#050505]/10 bg-white px-5 flex items-center justify-between select-none shrink-0"
              style={{ borderRadius: 0 }}
            >
              <span className="font-sans text-[11px] font-medium text-[#050505]/50 tracking-widest uppercase">
                GDG On Campus · FIEM
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label={`Close ${domain.title} details`}
                className="flex items-center justify-center text-[#050505]/40 hover:text-[#050505] transition-colors duration-150 cursor-pointer focus-visible:outline-none rounded"
              >
                <span className="text-lg font-light leading-none" aria-hidden="true">✕</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto px-7 pt-6 pb-7 flex flex-col gap-3">
              {/* Title */}
              <h2
                id="other-domain-modal-title"
                className="text-xl sm:text-2xl font-semibold text-[#050505] tracking-tight leading-snug font-sans"
              >
                {domain.title}
              </h2>

              {/* Description */}
              <div id="other-domain-modal-description" className="mt-1">
                <p className="text-[15px] sm:text-base font-normal text-[#4a4845] leading-[1.75]">
                  {domain.description}
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

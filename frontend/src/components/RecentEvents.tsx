'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  venue: string;
  status: 'Open' | 'Closed';
  posterUrl: string;
  pastelBg: string;
  pastelBorder: string;
  accentColor: string;
}

/**
 * =========================================================================
 * SUBHEADING CONFIGURATION
 * =========================================================================
 * - Line 30: Change letter spacing (e.g. '0em', '-0.01em', '0.05em')
 * - Line 91: Desktop font size is 48px (`md:text-[48px]`)
 * - Global Font Weights: Edit `src/styles/globals.css`:
 *     `--subheading-weight-words` (words before last word)
 *     `--subheading-weight-last`  (last word)
 */
export const RECENT_EVENTS_LETTER_SPACING = '0em';

const recentEvents: EventItem[] = [
  {
    id: 'io-extended-2026',
    title: "Google I/O Extended Kolkata '26",
    category: 'Flagship Summit',
    date: 'April 18, 2026',
    venue: 'Kolkata Town Hall',
    status: 'Open',
    posterUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
    pastelBg: 'bg-[#E9F9EE]',
    pastelBorder: 'border-[#C8E8D2]',
    accentColor: '#34A853',
  },
  {
    id: 'build-with-ai-sprint',
    title: 'Build with AI: Gemini Workshop',
    category: 'Hands-on Lab',
    date: 'May 02, 2026',
    venue: 'FIEM Campus, Lab 4',
    status: 'Open',
    posterUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
    pastelBg: 'bg-[#FFF7E0]',
    pastelBorder: 'border-[#F7E5B5]',
    accentColor: '#FBBC04',
  },
  {
    id: 'cloud-community-day',
    title: 'Cloud Architecture & DevOps Day',
    category: 'Technical Conference',
    date: 'February 28, 2026',
    venue: 'Biswa Bangla Convention Centre',
    status: 'Closed',
    posterUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
    pastelBg: 'bg-[#E8F0FE]',
    pastelBorder: 'border-[#CCE0FD]',
    accentColor: '#4285F4',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export function RecentEvents() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col items-center">
      {/* Subheading: "Recent Events" */}
      <div className="w-full flex flex-col items-center text-center mb-10 md:mb-14">
        <motion.h2
          {...fadeUp}
          style={{
            letterSpacing: RECENT_EVENTS_LETTER_SPACING,
            fontFamily: "'Product Sans', 'Google Sans', system-ui, -apple-system, sans-serif"
          }}
          className="text-2xl sm:text-3xl md:text-[48px] whitespace-nowrap text-[#050505] leading-tight"
        >
          <span className="subheading-words font-light">Our Recent </span>
          <span className="subheading-last font-bold">Events</span>
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ color: '#575550' }}
          className="mt-3 md:mt-4 text-base sm:text-lg md:text-xl text-[#575550] max-w-3xl font-light leading-relaxed font-product text-center"
        >
          Explore the latest sessions, workshops, and build sprints empowering our developer ecosystem
        </motion.p>
      </div>

      {/* 3 Pastel Event Cards (Increased size, generous spacing, clean design without divider lines or category pills) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 w-full items-stretch">
        {recentEvents.map((event, index) => (
          <motion.article
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.7,
              delay: index * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -6 }}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl ${event.pastelBg} p-4 sm:p-5 lg:p-6 shadow-[0_8px_30px_-6px_rgba(16,24,40,0.08),0_2px_8px_-2px_rgba(16,24,40,0.04)] transition-all duration-500 hover:shadow-[0_24px_45px_-8px_rgba(16,24,40,0.14),0_8px_20px_-4px_rgba(16,24,40,0.06)]`}
          >
            <div className="flex flex-col">
              {/* Framed Poster with Rounded Corners (Border line & Category Pill removed) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-black/5 shadow-inner">
                <Image
                  src={event.posterUrl}
                  alt={`${event.title} poster`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover filter contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Event Content Container */}
              <div className="pt-4 sm:pt-5 pb-3">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#050505] line-clamp-2 transition-colors duration-300 group-hover:text-[#4285F4]">
                  {event.title}
                </h3>
              </div>
            </div>

            {/* Event Meta & Action (Dividing lines removed) */}
            <div className="pt-0 flex flex-col gap-4 mt-auto">
              <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-medium text-[#050505]/75">
                {/* Date */}
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#4285F4] shrink-0" />
                  <span>{event.date}</span>
                </div>

                {/* Venue */}
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#EA4335] shrink-0" />
                  <span className="truncate" title={event.venue}>
                    {event.venue}
                  </span>
                </div>
              </div>

              {/* Status & Action Row */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  {event.status === 'Open' ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#34A853]/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-[#0D652D]">
                      <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                      Open for RSVP
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1.5 text-xs font-medium tracking-wide text-[#050505]/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/35" />
                      Registration Closed
                    </span>
                  )}
                </div>

                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/5 group-hover:bg-[#050505] text-[#050505] group-hover:text-white flex items-center justify-center transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}


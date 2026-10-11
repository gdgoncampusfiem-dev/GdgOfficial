'use client';

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { GalleryMasonry } from '@/components/gallery/GalleryMasonry';
import { GalleryLightbox } from '@/components/gallery/GalleryLightbox';
import { GALLERY_ITEMS, GalleryItem } from '@/data/gallery';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Lightbox index calculations across all photos
  const currentIndex = selectedItem
    ? GALLERY_ITEMS.findIndex((item) => item.id === selectedItem.id)
    : -1;

  const handlePrev = () => {
    if (currentIndex <= 0) {
      setSelectedItem(GALLERY_ITEMS[GALLERY_ITEMS.length - 1]);
    } else {
      setSelectedItem(GALLERY_ITEMS[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex >= GALLERY_ITEMS.length - 1) {
      setSelectedItem(GALLERY_ITEMS[0]);
    } else {
      setSelectedItem(GALLERY_ITEMS[currentIndex + 1]);
    }
  };

  return (
    <>
      <Head>
        <title>Photo Gallery | GDGoc FIEM</title>
        <meta
          name="description"
          content="A visual glimpse into our most memorable events, hackathons, and workshops at GDG on Campus FIEM, Kolkata."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="relative min-h-screen bg-[#F3F0E8] font-sans selection:bg-[#050505] selection:text-[#F3F0E8] overflow-x-hidden">
        {/* Architectural Background Grid Texture */}
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
          }}
        />

        {/* Global Floating Navbar */}
        <Navbar theme="light" />

        {/* =========================================================================
            THE SIGNATURE PHOTO GALLERY (Jigsaw Canvas inspired by GDG Noida)
            No external headings or filter bars - the title sits in the center hole!
           ========================================================================= */}
        <div className="relative z-10 pt-28 md:pt-36">
          <GalleryMasonry
            items={GALLERY_ITEMS}
            onSelectImage={(item) => setSelectedItem(item)}
          />

          {/* Fullscreen Interactive Lightbox Modal */}
          <GalleryLightbox
            item={selectedItem}
            currentIndex={currentIndex}
            total={GALLERY_ITEMS.length}
            onClose={() => setSelectedItem(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />

          {/* Signature Closing CTA Section */}
          <section className="relative w-full py-24 md:py-32 border-t-[3px] border-[#050505] bg-white">
            <div className="max-w-5xl mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-block py-1 px-3 border-[2px] border-[#050505] bg-[#F3F0E8] text-[#050505] text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] shadow-[3px_3px_0px_#050505] mb-6">
                  BE IN THE NEXT SHOT
                </span>
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#050505] uppercase tracking-tighter mb-6 leading-[0.95]">
                  Experience It In Person.
                </h2>
                <p className="text-base sm:text-lg md:text-xl font-bold text-[#575550] max-w-xl mx-auto mb-10 leading-relaxed">
                  Join upcoming sessions, hackathons, and meetups to build with Kolkata’s most passionate student developers.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/events"
                    className="px-8 py-4 bg-[#050505] text-[#F3F0E8] font-black uppercase tracking-widest text-xs sm:text-sm shadow-[5px_5px_0px_#4285F4] hover:shadow-[2px_2px_0px_#4285F4] hover:translate-x-0.5 hover:translate-y-0.5 transition-all border-[2px] border-[#050505] flex items-center gap-2"
                  >
                    <span>View Upcoming Events</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/teams"
                    className="px-8 py-4 bg-white text-[#050505] font-black uppercase tracking-widest text-xs sm:text-sm shadow-[5px_5px_0px_#050505] hover:shadow-[2px_2px_0px_#050505] hover:translate-x-0.5 hover:translate-y-0.5 transition-all border-[2px] border-[#050505]"
                  >
                    Meet The Organizers
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

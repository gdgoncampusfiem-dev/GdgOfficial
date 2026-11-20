'use client';

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { GalleryMasonry } from '@/components/gallery/GalleryMasonry';
import { AllPhotosGallery } from '@/components/gallery/AllPhotosGallery';
import { GalleryLightbox } from '@/components/gallery/GalleryLightbox';
import { GALLERY_ITEMS, GalleryItem } from '@/data/gallery';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [lightboxList, setLightboxList] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [selectedEventId, setSelectedEventId] = useState<string>('all');

  // Lightbox index calculations across active context
  const currentIndex = selectedItem
    ? lightboxList.findIndex((item) => item.id === selectedItem.id)
    : -1;

  const handlePrev = () => {
    if (lightboxList.length === 0) return;
    if (currentIndex <= 0) {
      setSelectedItem(lightboxList[lightboxList.length - 1]);
    } else {
      setSelectedItem(lightboxList[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (lightboxList.length === 0) return;
    if (currentIndex >= lightboxList.length - 1) {
      setSelectedItem(lightboxList[0]);
    } else {
      setSelectedItem(lightboxList[currentIndex + 1]);
    }
  };

  return (
    <>
      <Head>
        <title>Photo Gallery | GDG on Campus FIEM</title>
        <meta
          name="description"
          content="A visual glimpse into our most memorable events, hackathons, and workshops at GDG on Campus FIEM, Kolkata."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="relative min-h-screen bg-[#F3F0E8] font-sans selection:bg-[#050505] selection:text-[#F3F0E8] overflow-x-hidden">

        {/* Global Floating Navbar */}
        <Navbar theme="light" />

        {/* =========================================================================
            THE SIGNATURE PHOTO GALLERY (Jigsaw Canvas)
            Integrated event searching, interactive arise wave, and fluid photo grid
           ========================================================================= */}
        <div className="relative z-10 pt-28 md:pt-36">
          <GalleryMasonry
            items={GALLERY_ITEMS}
            selectedEventId={selectedEventId}
            onSelectEvent={setSelectedEventId}
            onSelectImage={(item, currentPhotos) => {
              setLightboxList(currentPhotos && currentPhotos.length > 0 ? currentPhotos : GALLERY_ITEMS);
              setSelectedItem(item);
            }}
          />

          {/* =========================================================================
              COMPLETE PHOTO ARCHIVE (All Photos Grid - Clean, No Filter UI)
              Full photographic exhibition grid of all community moments
             ========================================================================= */}
          <AllPhotosGallery
            photos={GALLERY_ITEMS}
            onSelectImage={(item, allPhotos) => {
              setLightboxList(allPhotos);
              setSelectedItem(item);
            }}
          />

          {/* Fullscreen Interactive Lightbox Modal */}
          <GalleryLightbox
            item={selectedItem}
            currentIndex={currentIndex}
            total={lightboxList.length}
            onClose={() => setSelectedItem(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />

          {/* Signature Closing CTA Section */}
          <section className="relative w-full py-24 md:py-32 border-t border-[#050505]/10 bg-white">
            <div className="max-w-5xl mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-block py-1.5 px-4 rounded-full border border-black/10 bg-[#F3F0E8] text-[#575550] text-[10px] sm:text-xs font-mono font-medium uppercase tracking-[0.2em] shadow-sm mb-6">
                  BE IN THE NEXT SHOT
                </span>
                <h2 className="text-4xl sm:text-6xl md:text-7xl text-[#050505] uppercase tracking-tighter mb-6 leading-[0.95]">
                  <span className="subheading-words font-light">Experience It In </span>
                  <span className="subheading-last font-bold">Person.</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl font-normal text-[#575550] max-w-xl mx-auto mb-10 leading-relaxed">
                  Join upcoming sessions, hackathons, and meetups to build with Kolkata’s most passionate student developers.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/events"
                    className="px-8 py-3.5 rounded-full bg-[#050505] text-[#F3F0E8] font-medium text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:bg-[#202020] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                  >
                    <span>View Upcoming Events</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/teams"
                    className="px-8 py-3.5 rounded-full bg-white text-[#050505] font-medium text-xs sm:text-sm uppercase tracking-wider border border-black/15 shadow-[0_4px_14px_rgba(0,0,0,0.06)] hover:bg-[#F3F0E8] hover:scale-[1.02] active:scale-[0.98] transition-all"
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

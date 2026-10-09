import { useEffect } from 'react';
import Head from 'next/head';
import Lenis from 'lenis';

import { Navbar } from '@/components/navigation/Navbar';
import { Hero } from '@/components/hero/Hero';
import { AboutPreview } from '@/components/AboutPreview';
import { ShowcaseGallery } from '@/components/ShowcaseGallery';

export default function Home() {
  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Head>
        <title>GDG Kolkata | Where Kolkata Builds What&apos;s Next</title>
        <meta name="description" content="A community where developers learn, build, share ideas, and connect through technology in Kolkata." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-[#050505] font-sans selection:bg-[#F3F0E8] selection:text-[#050505]">
        <Navbar />
        <Hero />
        <AboutPreview />
        <ShowcaseGallery />
        
        {/* Placeholder for the rest of the site to allow scrolling past About Preview */}
        <div className="h-[20vh] bg-[#F3F0E8]" />
      </main>
    </>
  );
}

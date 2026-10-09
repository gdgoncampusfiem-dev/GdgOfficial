import { useEffect } from 'react';
import Head from 'next/head';
import Lenis from 'lenis';

import { Navbar } from '@/components/navigation/Navbar';
import { Hero } from '@/components/hero/Hero';
import { AboutPreview } from '@/components/AboutPreview';

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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
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

      <main className="min-h-screen bg-[#F3F0E8] font-sans selection:bg-[#050505] selection:text-[#F4F1EA]">
        <Navbar />
        <Hero />
        <AboutPreview />
        
        {/* Placeholder for the rest of the site to allow scrolling past About Preview */}
        <div className="h-[50vh] bg-[#F3F0E8]" />
      </main>
    </>
  );
}

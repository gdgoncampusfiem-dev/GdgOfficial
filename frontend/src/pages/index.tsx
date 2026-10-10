import Head from 'next/head';

import { Navbar } from '@/components/navigation/Navbar';
import { Hero } from '@/components/hero/Hero';
import { AboutPreview } from '@/components/AboutPreview';
import { ShowcaseGallery } from '@/components/ShowcaseGallery';

export default function Home() {

  return (
    <>
      <Head>
        <title>GDGoc FIEM | Built on Ideas. Driven by Innovation.</title>
        <meta name="description" content="A community where developers learn, build, share ideas, and connect through technology in Kolkata." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#050505" />
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

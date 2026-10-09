import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

// Bigger, tighter cluster — exaggerated angles, varied sizes, no uniform grid
const scatteredImages = [
  // LARGE

  {
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop",
    style: { top: "0%", right: "-2%", width: "clamp(150px, 17vw, 240px)" },
    aspect: "aspect-[3/4]", rotate: 10,
    yRange: [70, -70] as [number, number], delay: 0.4,
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    style: { bottom: "1%", left: "-1%", width: "clamp(150px, 16vw, 240px)" },
    aspect: "aspect-square", rotate: 7,
    yRange: [-85, 85] as [number, number], delay: 0.2,
  },
  {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
    style: { bottom: "0%", right: "-1%", width: "clamp(155px, 17vw, 250px)" },
    aspect: "aspect-[4/3]", rotate: -6,
    yRange: [-75, 75] as [number, number], delay: 0.6,
  },
  // MEDIUM
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    style: { top: "4%", left: "3%", width: "clamp(100px, 12vw, 180px)" },
    aspect: "aspect-[3/4]", rotate: -4,
    yRange: [50, -50] as [number, number], delay: 0.8,
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800&auto=format&fit=crop",
    style: { top: "22%", right: "5%", width: "clamp(115px, 12vw, 190px)" },
    aspect: "aspect-[4/3]", rotate: -12,
    yRange: [60, -60] as [number, number], delay: 1.0,
  },
  {
    src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop",
    style: { bottom: "22%", right: "6%", width: "clamp(110px, 12vw, 185px)" },
    aspect: "aspect-square", rotate: 9,
    yRange: [-50, 50] as [number, number], delay: 0.3,
  },
  // SMALL (accents close to text)
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
    style: { top: "5%", left: "30%", width: "clamp(80px, 9vw, 140px)" },
    aspect: "aspect-square", rotate: -14,
    yRange: [35, -35] as [number, number], delay: 0.5,
  },
  {
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
    style: { top: "6%", right: "30%", width: "clamp(75px, 8vw, 130px)" },
    aspect: "aspect-[4/3]", rotate: 11,
    yRange: [30, -30] as [number, number], delay: 0.7,
  },
  {
    src: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=800&auto=format&fit=crop",
    style: { bottom: "5%", left: "29%", width: "clamp(80px, 9vw, 135px)" },
    aspect: "aspect-[3/4]", rotate: 15,
    yRange: [-40, 40] as [number, number], delay: 0.9,
  },
  {
    src: "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=800&auto=format&fit=crop",
    style: { bottom: "4%", right: "29%", width: "clamp(75px, 8vw, 125px)" },
    aspect: "aspect-square", rotate: -11,
    yRange: [-38, 38] as [number, number], delay: 1.1,
  },
];

// GPU-safe floating animation (transform+opacity only, no layout repaint)
const floatVariants = (delay: number) => ({
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 5 + delay * 0.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay,
    },
  },
});

function Img({ img, index }: { img: typeof scatteredImages[0]; index: number }) {
  const revealVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: img.rotate - 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: img.rotate,
      transition: { duration: 1, delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={revealVariants}
      style={{ ...img.style, position: 'absolute' }}
      className={`z-10 ${img.aspect}`}
    >
      <motion.div
        variants={floatVariants(img.delay)}
        animate="animate"
        style={{ willChange: 'transform' }}
        className="w-full h-full relative shadow-2xl overflow-hidden group"
      >
        <Image
          src={img.src}
          alt="Community event showcase"
          fill
          sizes="(max-width: 768px) 30vw, 20vw"
          className="object-cover filter grayscale group-hover:grayscale-0 contrast-110 transition-all duration-700 group-hover:scale-110"
        />
      </motion.div>
    </motion.div>
  );
}

export function ShowcaseGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <section
      ref={containerRef}
      aria-label="Community Showcase Gallery"
      className="relative w-full h-[90vh] md:h-[130vh] bg-[#F3F0E8] overflow-hidden flex items-center justify-center"
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)`,
          backgroundSize: '4rem 4rem',
        }}
      />

      {/* ── SCATTERED IMAGES ────────── */}
      {scatteredImages.map((img, i) => (
        <Img key={i} img={img} index={i} />
      ))}

      {/* ── CENTRE CONTENT ────── */}
      <div className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-4 pointer-events-none select-none" style={{ isolation: 'isolate' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* === Decorative outline layer 1 — wide stroke, low opacity === */}
          <div
            className="absolute inset-0 px-4 md:px-8 text-[13vw] md:text-[11vw] font-black tracking-tighter leading-none pointer-events-none flex items-center justify-center translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4"
            style={{
              color: 'transparent',
              WebkitTextStroke: '3px rgba(5,5,5,0.05)',
              userSelect: 'none',
            }}
            aria-hidden
          >
            GDG On Campus
          </div>

          {/* === Decorative outline layer 2 — thin crisp stroke === */}
          <div
            className="absolute inset-0 px-4 md:px-8 text-[13vw] md:text-[11vw] font-black tracking-tighter leading-none pointer-events-none flex items-center justify-center translate-x-1 translate-y-1 md:translate-x-2 md:translate-y-2"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1px rgba(5,5,5,0.10)',
              userSelect: 'none',
            }}
            aria-hidden
          >
            GDG On Campus
          </div>

          {/* === Main solid text === */}
          <motion.h2
            animate={{ scale: hovered ? 1.025 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'transform' }}
            className="px-4 md:px-8 text-[13vw] md:text-[11vw] font-black tracking-tighter leading-none relative z-10"
          >
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">D</span>
            <span className="text-[#FBBC04]">G</span>
            {" "}
            <span className="text-[#4285F4]">O</span>
            <span className="text-[#34A853]">n</span>
            {" "}
            <span className="text-[#EA4335]">C</span>
            <span className="text-[#4285F4]">a</span>
            <span className="text-[#FBBC04]">m</span>
            <span className="text-[#34A853]">p</span>
            <span className="text-[#EA4335]">u</span>
            <span className="text-[#4285F4]">s</span>
          </motion.h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-4 md:mt-6 text-[0.7rem] sm:text-[0.85rem] md:text-[1rem] tracking-[0.2em] md:tracking-[0.35em] uppercase font-bold text-[#050505]"
        >
          Future Institute of Engineering and Management
        </motion.p>
      </div>
    </section>
  );
}

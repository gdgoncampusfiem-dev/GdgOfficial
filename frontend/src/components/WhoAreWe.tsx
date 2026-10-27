import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
};

/**
 * =================================================
 * 
 * ========================
 * SUBHEADING & DESCRIPTION CONFIGURATION
 * =========================================================================
 * - Line 25: Change letter spacing (e.g. '0em', '-0.01em', '0.05em')
 * - Line 26: Description font weight (200 = extra light / thin, 300 = light)
 * - Line 68: Desktop subheading size is 48px (`md:text-[48px]`)
 */
export const WHO_ARE_WE_LETTER_SPACING = '0em';
export const WHO_ARE_WE_DESC_WEIGHT = 200;

export function WhoAreWe() {
  const containerRef = useRef<HTMLDivElement>(null);

  const paragraphText = "We are a collective of engineers, designers, and visionaries dedicated to building a culture where technology meets empathy. We bridge the gap between raw talent and world-class engineering to redefine the digital landscape in Kolkata and beyond.";
  const words = paragraphText.split(" ");

  // Spring-smoothed Parallax for the collage to eliminate scroll stutter
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y1 = useTransform(smoothProgress, [0, 1], [0, -20]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, 15]);
  const y3 = useTransform(smoothProgress, [0, 1], [10, -10]);

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto px-6 md:px-12 w-full flex flex-col items-center pt-8 md:pt-12">
      {/* Centered Heading (Underline removed, closely spaced text) */}
      <div className="w-full flex justify-center mb-10 md:mb-14">
        <div className="relative inline-flex flex-col items-center">
          <motion.h2
            {...fadeUp}
            style={{
              letterSpacing: WHO_ARE_WE_LETTER_SPACING,
              fontFamily: "'Product Sans', 'Google Sans', system-ui, -apple-system, sans-serif"
            }}
            className="text-2xl sm:text-3xl md:text-[48px] whitespace-nowrap text-[#050505] leading-tight"
          >
            <span className="subheading-words font-light">Who are </span>
            <span className="subheading-last font-bold">we</span>
          </motion.h2>
        </div>
      </div>

      {/* Adjacent Content: Body Text and Pictures at the same level */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start w-full">
        {/* Left: Body Text */}
        <div className="lg:col-span-6 flex flex-col justify-start relative z-20">
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.025,
                  delayChildren: 0.2
                }
              }
            }}
            style={{
              fontFamily: "'Product Sans Light', 'Product Sans Thin', 'Product Sans', system-ui, -apple-system, sans-serif",
              fontWeight: WHO_ARE_WE_DESC_WEIGHT,
            }}
            className="text-2xl md:text-3xl lg:text-[2.05rem] leading-[1.5] tracking-normal text-[#4a4742] flex flex-wrap gap-x-[0.25em] gap-y-2"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { duration: 0.3 } }
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </div>

        {/* Right: Bento Grid of Pictures */}
        <div className="lg:col-span-6 w-full flex justify-center lg:justify-end relative">
          <div className="w-full max-w-lg grid grid-cols-2 gap-4 lg:gap-5">
            <motion.div
              style={{ y: y1 }}
              className="col-span-2 aspect-[21/9] sm:aspect-[2/1] relative overflow-hidden rounded-xl bg-black/5"
            >
              <Image
                src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=800&auto=format&fit=crop"
                alt="Community Event Placeholder"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>

            <motion.div
              style={{ y: y2 }}
              className="col-span-1 aspect-square sm:aspect-[4/3] relative overflow-hidden rounded-xl bg-black/5"
            >
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                alt="Collaboration Placeholder"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>

            <motion.div
              style={{ y: y3 }}
              className="col-span-1 aspect-square sm:aspect-[4/3] relative overflow-hidden rounded-xl bg-black/5"
            >
              <Image
                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop"
                alt="Workshop Placeholder"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export function WhoAreWe() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const paragraphText = "We are a collective of engineers, designers, and visionaries dedicated to building a culture where technology meets empathy. We bridge the gap between raw talent and world-class engineering to redefine the digital landscape in Kolkata and beyond.";
  const words = paragraphText.split(" ");
  
  // Subtle Parallax for the collage
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const y3 = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start w-full pt-8 md:pt-12">
      {/* Left: Text Content */}
      <div className="lg:col-span-5 flex flex-col items-start relative z-40">
        <div className="relative inline-block pb-2 mb-6 pr-8 md:pr-12">
          <motion.h2 
            {...fadeUp}
            className="text-xl md:text-2xl font-medium tracking-[0.2em] uppercase whitespace-nowrap"
          >
            Who are we
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 h-[1px] bg-black/30"
          />
        </div>

        <p className="text-2xl md:text-3xl lg:text-4xl font-light italic leading-[1.4] tracking-tight text-[#050505] drop-shadow-sm flex flex-wrap gap-x-[0.25em] gap-y-2">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: i * 0.03 + 0.2 }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </p>
      </div>

      {/* Right: Bento Grid Layout */}
      <div className="lg:col-span-7 w-full flex justify-end mt-12 lg:mt-0 relative">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-md grid grid-cols-2 gap-4 lg:gap-6">
          <motion.div
            style={{ y: y1 }}
            className="col-span-2 aspect-[21/9] sm:aspect-[2/1] relative overflow-hidden bg-transparent"
          >
            <img
              src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=800&auto=format&fit=crop"
              alt="Community Event Placeholder"
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 contrast-125 mix-blend-multiply opacity-90 hover:scale-105 transition-all duration-700"
            />
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            className="col-span-1 aspect-square sm:aspect-[4/3] relative overflow-hidden bg-transparent"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
              alt="Collaboration Placeholder"
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 contrast-125 mix-blend-multiply opacity-90 hover:scale-105 transition-all duration-700"
            />
          </motion.div>

          <motion.div
            style={{ y: y3 }}
            className="col-span-1 aspect-square sm:aspect-[4/3] relative overflow-hidden bg-transparent"
          >
            <img
              src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop"
              alt="Workshop Placeholder"
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 contrast-125 mix-blend-multiply opacity-90 hover:scale-105 transition-all duration-700"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

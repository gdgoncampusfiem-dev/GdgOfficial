import { motion } from 'framer-motion';

export function AboutPreview() {
  return (
    <section 
      id="about" 
      className="w-full bg-[#F3F0E8] text-[#050505] py-32 md:py-48 px-6 md:px-12 relative z-10"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-12 md:gap-24">
        {/* Editorial Title */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4"
        >
          <span className="text-xs font-mono tracking-widest uppercase opacity-50">
            01 / Identity
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight max-w-4xl">
            We are a community where developers learn, build, share ideas, and connect through technology.
          </h2>
        </motion.div>

        {/* Supporting Copy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-[#575550] leading-relaxed max-w-md"
          >
            Google Developer Groups Kolkata is not just another tech club. It is a serious technology institution dedicated to bridging the gap between raw talent and world-class engineering.
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <p className="text-base text-[#575550] leading-relaxed">
              Our culture is rooted in genuine collaboration, open source development, and architectural thinking. We believe in building solutions that scale and designing experiences that matter.
            </p>
            <button className="self-start group flex items-center gap-2 border-b border-[#050505] pb-1 font-medium tracking-wide uppercase text-sm hover:opacity-60 transition-opacity">
              <span>Read our story</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

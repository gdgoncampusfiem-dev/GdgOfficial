import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export function AboutPreview() {
  return (
    <section 
      id="about" 
      className="w-full bg-[#F3F0E8] text-[#050505] py-32 md:py-48 px-6 md:px-12 relative z-10"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col gap-24 md:gap-40">
        
        {/* Massive Editorial Headline */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Metadata Column */}
          <div className="md:col-span-3">
            <motion.span 
              {...fadeUp}
              className="text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase opacity-40 block"
              style={{ willChange: 'transform, opacity' }}
            >
              01 / Identity
            </motion.span>
          </div>
          
          {/* Headline Column */}
          <div className="md:col-span-9">
            <motion.h2 
              {...fadeUp}
              className="text-5xl md:text-7xl lg:text-[6.5rem] font-light tracking-tighter leading-[1.05]"
              style={{ willChange: 'transform, opacity' }}
            >
              A space where<br />
              <span className="italic font-normal">culture</span> meets code.<br />
              Where Kolkata builds<br />
              what comes next.
            </motion.h2>
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-t border-black/10 pt-16 lg:pt-24">
          <Pillar 
            index="01" 
            title="Who We Are" 
            text="A collective of engineers, designers, and visionaries redefining the technology landscape in Kolkata." 
            delay={0.1}
          />
          <Pillar 
            index="02" 
            title="Our Belief" 
            text="Technology is a tool. Empathy, architectural thinking, and scale are the foundations of true innovation." 
            delay={0.2}
          />
          <Pillar 
            index="03" 
            title="The Experience" 
            text="Beyond tutorials. We focus on real-world engineering, open-source contribution, and intense collaboration." 
            delay={0.3}
          />
          <Pillar 
            index="04" 
            title="What We Create" 
            text="Scalable systems, intuitive interfaces, and a culture that bridges the gap between raw talent and global impact." 
            delay={0.4}
          />
        </div>

      </div>
    </section>
  );
}

function Pillar({ index, title, text, delay }: { index: string, title: string, text: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-6"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="flex items-center gap-4">
        <span className="text-xs font-semibold tracking-widest opacity-30">{index}</span>
        <h3 className="text-sm font-bold tracking-widest uppercase">{title}</h3>
      </div>
      <p className="text-lg md:text-xl font-light text-[#050505]/70 leading-relaxed pr-4">
        {text}
      </p>
    </motion.div>
  );
}

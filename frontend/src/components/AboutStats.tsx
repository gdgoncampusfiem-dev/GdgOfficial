import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { label: "Community Members", value: 2000, suffix: "+" },
  { label: "Successful Events", value: 150, suffix: "+" },
  { label: "Active Contributors", value: 40, suffix: "+" },
  { label: "City", value: 1, suffix: "", prefix: "0" }
];

function Counter({ from = 0, to, duration = 2, delay = 0 }: { from?: number; to: number; duration?: number; delay?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!inView) return;
    
    let startTime: number;
    let animationFrame: number;
    let startTimeout: NodeJS.Timeout;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * (to - from) + from));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    startTimeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [inView, from, to, duration, delay]);

  return <span ref={nodeRef}>{count}</span>;
}

export function AboutStats() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);

  return (
    <div ref={ref} className="w-full max-w-6xl mx-auto px-6 md:px-12 pt-16">
      <div className="flex flex-wrap md:flex-nowrap justify-between items-start w-full gap-12 md:gap-4">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
            <motion.div style={{ scale, transformOrigin: 'left bottom' }} className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-none">
              {stat.prefix}<Counter to={stat.value} delay={index * 0.15} />{stat.suffix}
            </motion.div>
            <div className="text-xs md:text-sm font-semibold tracking-widest uppercase opacity-40 -mt-1 md:-mt-2">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

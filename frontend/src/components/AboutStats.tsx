import { motion, useInView } from 'framer-motion';
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
    
    const startTimeout = setTimeout(() => {
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

  return (
    <div ref={ref} className="w-full max-w-6xl mx-auto px-6 md:px-12 pt-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <div className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-none tabular-nums">
              {stat.prefix}<Counter to={stat.value} delay={0} />{stat.suffix}
            </div>
            <div className="text-xs md:text-sm font-semibold tracking-widest uppercase opacity-40 mt-2 md:mt-3">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

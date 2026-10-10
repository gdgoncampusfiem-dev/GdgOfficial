import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const TechVisual = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="relative w-full aspect-square md:aspect-[4/3] bg-white overflow-hidden flex items-center justify-center group border-[3px] border-[#050505] shadow-[6px_6px_0px_#050505]">
      {/* Abstract Grid and Shapes representing Web */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(#4285F4 2px, transparent 2px), linear-gradient(90deg, #4285F4 2px, transparent 2px)`,
          backgroundSize: '24px 24px'
        }}
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-[80%] md:w-2/3 h-2/3 border-[3px] border-[#050505] bg-white shadow-[8px_8px_0px_#4285F4] flex flex-col group-hover:-translate-y-2 group-hover:shadow-[12px_12px_0px_#4285F4] transition-all duration-500"
      >
        <div className="w-full h-8 border-b-[3px] border-[#050505] flex items-center px-3 gap-2 bg-[#F3F0E8]">
          <div className="w-3 h-3 rounded-full bg-[#EA4335] border-[2px] border-[#050505] hover:bg-[#ff5c5c] cursor-pointer transition-colors" />
          <div className="w-3 h-3 rounded-full bg-[#FBBC04] border-[2px] border-[#050505] hover:bg-[#ffca28] cursor-pointer transition-colors" />
          <div className="w-3 h-3 rounded-full bg-[#34A853] border-[2px] border-[#050505] hover:bg-[#4ade80] cursor-pointer transition-colors" />
        </div>
        <div className="flex-1 p-4 md:p-5 flex flex-col bg-[#050505] overflow-hidden relative">
          <div className="font-mono text-xs md:text-sm font-bold text-white flex flex-col gap-2">
            {/* Line 1 typing animation */}
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: 1.2, ease: "linear", delay: 0.3 }}
              className="whitespace-nowrap"
            >
              <span className="text-[#EA4335]">const</span> gdg <span className="text-[#4285F4]">=</span> <span className="text-[#FBBC04]">new</span> <span className="text-[#34A853]">Community</span>();
            </motion.div>
            {/* Line 2 typing animation */}
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: 1, ease: "linear", delay: 1.7 }}
              className="whitespace-nowrap"
            >
              gdg.<span className="text-[#4285F4]">build</span>(<span className="text-[#EA4335]">'future'</span>);
            </motion.div>
            {/* Server Output 1 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.1, delay: 3.0 }}
              className="whitespace-nowrap mt-1 text-white/50 font-normal"
            >
              <span className="text-[#34A853] font-black">✓</span> Compiled successfully in 143ms
            </motion.div>
            {/* Server Output 2 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.1, delay: 3.5 }}
              className="whitespace-nowrap text-white/50 font-normal"
            >

              <span className="text-[#4285F4] font-black">ready</span> - started server on <span className="text-white hover:underline cursor-pointer">localhost:3000</span>
            </motion.div>
            {/* Blinking cursor */}
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="w-2.5 h-4 bg-white mt-1"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

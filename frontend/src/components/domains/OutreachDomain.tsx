import { motion } from 'framer-motion';

export const OutreachVisual = () => (
  <div className="relative w-full aspect-square md:aspect-[4/3] bg-[#F8F9FA] overflow-hidden flex items-center justify-center group border-[3px] border-[#050505] shadow-[6px_6px_0px_#050505]">
    {/* Concentric Broadcasting Waves */}
    <motion.div
      animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
      className="absolute w-32 h-32 rounded-full border-[2px] border-[#4285F4]"
    />
    <motion.div
      animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.4, 0] }}
      transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: "easeOut" }}
      className="absolute w-32 h-32 rounded-full border-[2px] border-[#4285F4]"
    />

    {/* Connecting SVG Lines */}
    <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <motion.path 
        d="M 50% 50% L 20% 30%" stroke="#050505" strokeWidth="3" strokeDasharray="5,5"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1 }}
      />
      <motion.path 
        d="M 50% 50% L 80% 25%" stroke="#050505" strokeWidth="3" strokeDasharray="5,5"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1, delay: 0.2 }}
      />
      <motion.path 
        d="M 50% 50% L 75% 80%" stroke="#050505" strokeWidth="3" strokeDasharray="5,5"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1, delay: 0.4 }}
      />
      <motion.path 
        d="M 50% 50% L 25% 75%" stroke="#050505" strokeWidth="3" strokeDasharray="5,5"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1, delay: 0.6 }}
      />
    </svg>

    {/* Central Node */}
    <motion.div 
      className="relative z-10 w-24 h-24 bg-[#34A853] rounded-full border-[3px] border-[#050505] shadow-[6px_6px_0px_#050505] flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
    >
      <div className="w-10 h-10 bg-white border-[3px] border-[#050505] rounded-full flex items-center justify-center">
        <div className="w-3 h-3 bg-[#EA4335] rounded-full animate-pulse" />
      </div>
    </motion.div>

    {/* Floating Satellite Nodes */}
    {/* Top Left */}
    <motion.div 
      initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.5 }}
      className="absolute top-[20%] left-[10%] md:top-[25%] md:left-[15%] w-12 h-12 bg-white rounded-full border-[3px] border-[#050505] shadow-[4px_4px_0px_#FBBC04] flex items-center justify-center z-10 group-hover:-translate-y-2 transition-transform"
    >
      <div className="w-4 h-4 bg-[#FBBC04] rounded-full border-[2px] border-[#050505]" />
    </motion.div>
    
    {/* Top Right */}
    <motion.div 
      initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.7 }}
      className="absolute top-[15%] right-[10%] md:top-[20%] md:right-[15%] w-16 h-16 bg-[#EA4335] rounded-full border-[3px] border-[#050505] shadow-[4px_4px_0px_#050505] flex items-center justify-center z-10 group-hover:translate-x-2 transition-transform"
    >
      <div className="w-8 h-4 bg-white border-[2px] border-[#050505] rounded-full" />
    </motion.div>

    {/* Bottom Right */}
    <motion.div 
      initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.9 }}
      className="absolute bottom-[10%] right-[15%] md:bottom-[15%] md:right-[20%] w-14 h-14 bg-white rounded-full border-[3px] border-[#050505] shadow-[4px_4px_0px_#4285F4] flex items-center justify-center z-10 group-hover:translate-y-2 transition-transform"
    >
      <div className="w-6 h-6 bg-[#4285F4] rotate-45 border-[2px] border-[#050505]" />
    </motion.div>

    {/* Bottom Left Speech Bubble */}
    <motion.div 
      initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 1.1 }}
      className="absolute bottom-[15%] left-[15%] md:bottom-[20%] md:left-[20%] z-20 group-hover:-translate-x-2 transition-transform"
    >
      <div className="px-4 py-2 bg-white border-[3px] border-[#050505] shadow-[4px_4px_0px_#050505] rounded-2xl rounded-bl-none text-xs font-black tracking-widest uppercase text-[#050505]">
        Connect.
      </div>
    </motion.div>
  </div>
);

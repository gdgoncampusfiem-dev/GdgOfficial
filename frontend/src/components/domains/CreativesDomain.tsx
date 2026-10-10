import { motion } from 'framer-motion';

export const CreativesVisual = () => (
  <div className="relative w-full aspect-square md:aspect-[4/3] bg-[#F8F9FA] overflow-hidden flex items-center justify-center group border-[3px] border-[#050505] shadow-[6px_6px_0px_#050505]">
    {/* Design Canvas Grid */}
    <div 
      className="absolute inset-0 opacity-20"
      style={{ backgroundImage: 'radial-gradient(#050505 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}
    />

    {/* Floating Toolbar */}
    <motion.div 
      initial={{ x: -50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 md:w-12 bg-white border-[3px] border-[#050505] shadow-[4px_4px_0px_#050505] rounded-full py-4 flex flex-col gap-3 items-center z-20 group-hover:-translate-y-6 transition-transform duration-500"
    >
      <div className="w-5 h-5 rounded-full border-[2px] border-[#050505] bg-[#050505]" />
      <div className="w-5 h-5 border-[2px] border-[#050505] hover:bg-[#EA4335] transition-colors cursor-pointer" />
      <div className="w-5 h-5 rounded-full border-[2px] border-[#050505] hover:bg-[#4285F4] transition-colors cursor-pointer" />
      <div className="w-5 h-0 border-t-[2px] border-[#050505]" />
      <div className="w-5 h-5 bg-[#FBBC04] border-[2px] border-[#050505]" />
    </motion.div>

    {/* Editable Shape */}
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
      className="relative z-10 w-32 h-32 md:w-48 md:h-48 bg-[#EA4335] border-[3px] border-[#050505] group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-700 ease-out"
    >
      {/* Transform Handles */}
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-white border-[2px] border-[#4285F4] z-20" />
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-white border-[2px] border-[#4285F4] z-20" />
      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white border-[2px] border-[#4285F4] z-20" />
      <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border-[2px] border-[#4285F4] z-20" />
      
      {/* Inner Decorative Element */}
      <div className="absolute inset-0 m-auto w-16 h-16 md:w-24 md:h-24 rounded-full border-[3px] border-[#050505] bg-[#FBBC04] flex items-center justify-center overflow-hidden">
        <div className="w-full h-full bg-[#34A853] rotate-45 translate-x-1/2" />
      </div>
    </motion.div>

    {/* Custom Animated Cursor */}
    <motion.div
      initial={{ x: 100, y: 100, opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      animate={{ 
        x: [100, 20, -10, 20, 100], 
        y: [100, 20, 40, 20, 100] 
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute z-30 w-8 h-8 pointer-events-none"
      style={{ originX: 0, originY: 0 }}
    >
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 drop-shadow-md relative z-10">
        <path d="M5.5 3.5L18.5 10.5L11.5 13.5L8.5 21.5L5.5 3.5Z" fill="#050505" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
      <div className="absolute top-6 left-6 px-2 py-0.5 bg-[#4285F4] text-white text-[8px] md:text-[10px] font-bold font-mono rounded-r-md rounded-bl-md shadow-sm whitespace-nowrap">
        Design Team
      </div>
    </motion.div>

    {/* Color Palette Popover */}
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
      className="absolute bottom-6 md:bottom-8 right-6 md:right-8 bg-white border-[3px] border-[#050505] shadow-[6px_6px_0px_#050505] p-2 flex gap-2 z-20 group-hover:shadow-[2px_2px_0px_#050505] group-hover:translate-x-1 group-hover:translate-y-1 transition-all"
    >
      <div className="w-6 h-6 md:w-8 md:h-8 bg-[#EA4335] border-[2px] border-[#050505]" />
      <div className="w-6 h-6 md:w-8 md:h-8 bg-[#FBBC04] border-[2px] border-[#050505]" />
      <div className="w-6 h-6 md:w-8 md:h-8 bg-[#34A853] border-[2px] border-[#050505]" />
      <div className="w-6 h-6 md:w-8 md:h-8 bg-[#4285F4] border-[2px] border-[#050505] relative after:content-[''] after:absolute after:inset-0 after:m-auto after:w-2 after:h-2 after:bg-white after:rounded-full" />
    </motion.div>
  </div>
);

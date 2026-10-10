import { motion } from 'framer-motion';

export const EventsVisual = () => (
  <div className="relative w-full aspect-square md:aspect-[4/3] bg-[#F3F0E8] overflow-hidden flex flex-col p-6 md:p-10 group border-[3px] border-[#050505] shadow-[6px_6px_0px_#050505]">
    
    {/* Architectural Header */}
    <div className="w-full flex justify-between items-end border-b-[3px] border-[#050505] pb-2 mb-6">
      <div className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none text-[#050505]">
        LOGISTICS<br/><span className="text-[#4285F4]">/ PLAN</span>
      </div>
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-[#050505] rounded-full" />
        <div className="w-3 h-3 bg-[#050505] rounded-full" />
        <div className="w-3 h-3 bg-[#EA4335] rounded-full animate-pulse border-[2px] border-[#050505]" />
      </div>
    </div>

    {/* Gantt / Flow Blocks */}
    <div className="flex-1 w-full flex flex-col justify-center gap-4 md:gap-6 relative z-10">
      {/* Tracking Line */}
      <div className="absolute left-[30%] top-0 bottom-0 w-[2px] opacity-50 z-0 border-l-[2px] border-dashed border-[#EA4335]" />
      
      {/* Block 1 */}
      <motion.div 
        initial={{ width: "20%" }}
        whileInView={{ width: "80%" }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 h-10 md:h-12 bg-[#050505] border-[3px] border-[#050505] flex items-center px-4 text-white font-mono text-xs md:text-sm font-bold shadow-[4px_4px_0px_#FBBC04] hover:scale-[1.02] transition-transform origin-left"
      >
        INITIATION_
      </motion.div>
      
      {/* Block 2 */}
      <motion.div 
        initial={{ width: "10%", x: "20%" }}
        whileInView={{ width: "70%", x: "20%" }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="relative z-10 h-10 md:h-12 bg-[#4285F4] border-[3px] border-[#050505] shadow-[4px_4px_0px_#050505] flex items-center px-4 text-white font-mono text-xs md:text-sm font-bold hover:scale-[1.02] transition-transform origin-left"
      >
        EXECUTION_
      </motion.div>
      
      {/* Block 3 */}
      <motion.div 
        initial={{ width: "10%", x: "50%" }}
        whileInView={{ width: "40%", x: "50%" }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        className="relative z-10 h-10 md:h-12 bg-[#34A853] border-[3px] border-[#050505] shadow-[4px_4px_0px_#050505] flex items-center px-4 text-[#050505] font-mono text-xs md:text-sm font-bold hover:scale-[1.02] transition-transform origin-left"
      >
        WRAP_UP
      </motion.div>
    </div>

    {/* Background scale lines */}
    <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 h-4 border-t-[3px] border-[#050505] flex justify-between z-0">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="w-[3px] h-3 bg-[#050505]" />
      ))}
    </div>
  </div>
);

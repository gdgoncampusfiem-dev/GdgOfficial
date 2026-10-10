import { motion } from 'framer-motion';

export const PhotographyVisual = () => (
  <div className="relative w-full aspect-square md:aspect-[4/3] bg-[#EAF1FE] overflow-hidden flex items-center justify-center group border-[3px] border-[#050505] shadow-[6px_6px_0px_#050505]">
    
    {/* Background Grid */}
    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,#050505_1px,transparent_1px),linear-gradient(180deg,#050505_1px,transparent_1px)] bg-[size:16px_16px]" />

    {/* The Camera */}
    <motion.div
      initial={{ y: 20 }}
      whileInView={{ y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="relative z-10 w-3/4 max-w-[280px] md:max-w-[320px] aspect-[4/3] bg-white border-[3px] border-[#050505] shadow-[12px_12px_0px_#050505] flex items-center justify-center"
    >
      {/* Top Dials & Flash */}
      <div className="absolute -top-[27px] left-4 w-12 h-6 border-[3px] border-b-0 border-[#050505] bg-[#EA4335]" />
      <div className="absolute -top-[19px] left-20 w-6 h-4 border-[3px] border-b-0 border-[#050505] bg-white" />
      <div className="absolute -top-[35px] right-6 w-16 h-8 border-[3px] border-b-0 border-[#050505] bg-[#FBBC04] flex items-center justify-center">
        <div className="w-8 h-2 bg-[#050505]" />
      </div>

      {/* Viewfinder/Red dot */}
      <div className="absolute top-4 right-4 w-4 h-4 bg-[#EA4335] border-[2px] border-[#050505] rounded-full shadow-[2px_2px_0px_#050505] animate-pulse" />
      <div className="absolute top-4 left-4 w-12 h-8 border-[3px] border-[#050505] bg-[#F3F0E8] shadow-[inset_2px_2px_0px_rgba(0,0,0,0.1)]" />

      {/* Main Lens Base */}
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#F3F0E8] border-[4px] border-[#050505] shadow-[6px_6px_0px_#050505] flex items-center justify-center relative overflow-hidden group-hover:rotate-180 transition-transform duration-1000 ease-in-out">
        
        {/* Shutter Blades (Abstract) */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-[#050505] rotate-45" />
          <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-[#050505] -rotate-45" />
          <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-[#050505] rotate-90" />
        </div>

        {/* Inner Lens ring 1 */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-[3px] border-[#050505] bg-[#34A853] flex items-center justify-center shadow-[inset_4px_4px_0px_rgba(0,0,0,0.3)]">
          {/* Inner Lens ring 2 */}
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-[3px] border-[#050505] bg-[#050505] flex items-center justify-center relative">
            {/* Lens Glare / Reflection */}
            <div className="absolute top-2 right-2 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full opacity-90" />
            <div className="absolute bottom-3 left-3 w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full opacity-60" />
          </div>
        </div>
      </div>
      
      {/* Detail lines on body */}
      <div className="absolute bottom-4 left-4 right-4 h-4 border-t-[2px] border-b-[2px] border-[#050505] opacity-20" />
    </motion.div>

    {/* Shutter Click Flash */}
    <motion.div 
      className="absolute inset-0 bg-white z-20 pointer-events-none"
      animate={{ opacity: [0, 0.9, 0, 0, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeOut", times: [0, 0.05, 0.1, 1] }}
    />
  </div>
);

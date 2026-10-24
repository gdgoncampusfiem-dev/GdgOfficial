import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const TARGET_TEXT = 'Ordinary Ends Here.';

const PILLARS = [
  {
    index: '01',
    label: 'BEYOND THE BOILERPLATE',
    description:
      'We strip away superficial abstractions to master foundational engineering, systems design, and performance-critical computing.',
    accent: '#4285F4' // Google Blue
  },
  {
    index: '02',
    label: 'CULTURE OF AMBITION',
    description:
      "Kolkata's builders converging to engineer production-grade open source, generative models, and resilient distributed systems.",
    accent: '#EA4335' // Google Red
  },
  {
    index: '03',
    label: 'RADICAL COLLABORATION',
    description:
      'Zero gatekeeping. First-year coders ship alongside senior architects, transforming curiosity into industry-standard execution.',
    accent: '#34A853' // Google Green
  }
];

export function OrdinaryEndsHere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();

  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const textToRender = shouldReduceMotion ? TARGET_TEXT : displayedText;
  const isComplete = shouldReduceMotion ? true : isTypingComplete;

  // Typewriting character effect with organic cadence
  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      currentIndex++;
      setDisplayedText(TARGET_TEXT.slice(0, currentIndex));

      if (currentIndex >= TARGET_TEXT.length) {
        setIsTypingComplete(true);
        return;
      }

      // Natural typing cadence: slight pause on spaces and before punctuation
      const char = TARGET_TEXT[currentIndex - 1];
      const delay = char === ' ' ? 130 : char === 's' ? 110 : 85;
      timeoutId = setTimeout(typeNextChar, delay);
    };

    // Initial slight pause before typing starts once in viewport
    timeoutId = setTimeout(typeNextChar, 250);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isInView, shouldReduceMotion]);

  return (
    <div 
      ref={containerRef} 
      className="w-full max-w-6xl mx-auto px-6 md:px-12 pt-4 pb-8 select-none"
    >
      {/* 1. Architectural Section Meta Header */}
      <div className="flex items-center justify-between border-t border-b border-black/15 py-3.5 mb-10 md:mb-14">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#EA4335] inline-block animate-pulse" />
          <span className="text-[10px] md:text-xs font-bold tracking-[0.28em] uppercase text-[#050505]/75">
            Manifesto // 002
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest text-[#050505]/40 uppercase">
            CALCUTTA [22.5726° N, 88.3639° E]
          </span>
          <span className="text-[10px] md:text-xs font-mono font-medium tracking-widest text-[#050505]/60 uppercase">
            GDGOC // FIEM
          </span>
        </div>
      </div>

      {/* 2. Three Editorial Pillars (Ethos Beneath AboutStats) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pb-14 border-b border-black/10">
        {PILLARS.map((pillar) => (
          <motion.div
            key={pillar.index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#050505]/40 group-hover:text-[#050505] transition-colors">
                {pillar.index}
              </span>
              <span 
                className="w-1.5 h-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" 
                style={{ backgroundColor: pillar.accent }}
              />
            </div>
            <h3 className="text-sm md:text-base font-bold tracking-[0.15em] uppercase text-[#050505]">
              {pillar.label}
            </h3>
            <p className="text-xs md:text-sm font-light text-[#575550] leading-relaxed">
              {pillar.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 3. Massive Typewriting Headline ("Ordinary Ends Here.") */}
      <div className="relative pt-12 md:pt-16 pb-6 min-h-[160px] sm:min-h-[220px] md:min-h-[280px] lg:min-h-[320px] flex flex-col justify-center">
        <div className="text-[10px] md:text-xs font-mono font-semibold tracking-[0.3em] uppercase text-[#050505]/40 mb-3 md:mb-5">
          THE GDG THESIS
        </div>

        <h2 
          aria-label={TARGET_TEXT}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9.25rem] font-black uppercase tracking-tighter leading-[0.84] text-[#050505] break-words"
          style={{
            letterSpacing: '-0.045em',
            textRendering: 'optimizeLegibility',
          }}
        >
          {/* Accessible typed display */}
          <span aria-hidden="true">
            {textToRender.replace(/\.$/, '')}
            {textToRender.endsWith('.') && (
              <span className="text-[#4285F4]">.</span>
            )}
          </span>

          {/* Smooth framer-motion blinking cursor */}
          <motion.span
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{
              repeat: Infinity,
              duration: 0.9,
              times: [0, 0.49, 0.5, 1],
              ease: 'linear',
            }}
            className="inline-block w-[0.32em] h-[0.76em] ml-2 md:ml-4 bg-[#050505] align-baseline"
            aria-hidden="true"
          />
        </h2>
      </div>

      {/* 4. Supporting Manifesto Conclusion & Chapter Seal */}
      <div className="pt-8 md:pt-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-end border-t border-black/10">
        <div className="md:col-span-8">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base md:text-lg font-light text-[#575550] leading-relaxed max-w-2xl"
          >
            A collective engineered for those who challenge defaults, dismantle boilerplate thinking, and turn ambitious architectural ideas into reality.
          </motion.p>
        </div>

        <div className="md:col-span-4 flex justify-start md:justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isComplete ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2.5 text-[10px] md:text-[11px] font-mono tracking-widest text-[#050505]/70 uppercase border border-black/15 bg-white/50 px-3.5 py-2 rounded-full shadow-[2px_2px_0px_#050505]"
          >
            <span className="w-2 h-2 rounded-full bg-[#34A853]" />
            <span>COMMUNITY EDITION 2026</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

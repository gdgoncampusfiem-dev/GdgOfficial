import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const TARGET_TEXT = 'Ordinary Ends Here';

export function OrdinaryEndsHere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });
  const shouldReduceMotion = useReducedMotion();

  const [displayedText, setDisplayedText] = useState('');

  const textToRender = shouldReduceMotion ? TARGET_TEXT : displayedText;

  // Typewriting character effect with natural cadence
  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      currentIndex++;
      setDisplayedText(TARGET_TEXT.slice(0, currentIndex));

      if (currentIndex >= TARGET_TEXT.length) {
        return;
      }

      const char = TARGET_TEXT[currentIndex - 1];
      const delay = char === ' ' ? 120 : 80;
      timeoutId = setTimeout(typeNextChar, delay);
    };

    timeoutId = setTimeout(typeNextChar, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isInView, shouldReduceMotion]);

  return (
    <div 
      ref={containerRef} 
      className="w-full max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-16 flex flex-col items-center justify-center text-center select-none"
    >
      <h2 
        aria-label={TARGET_TEXT}
        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.5rem] font-black uppercase tracking-tighter leading-[0.86] text-[#050505] break-words"
        style={{
          letterSpacing: '-0.045em',
          textRendering: 'optimizeLegibility',
        }}
      >
        <span aria-hidden="true">
          {textToRender}
        </span>

        {/* Blinking terminal block cursor */}
        <motion.span
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            repeat: Infinity,
            duration: 0.9,
            times: [0, 0.49, 0.5, 1],
            ease: 'linear',
          }}
          className="inline-block w-[0.3em] h-[0.76em] ml-2 md:ml-4 bg-[#050505] align-baseline"
          aria-hidden="true"
        />
      </h2>
    </div>
  );
}

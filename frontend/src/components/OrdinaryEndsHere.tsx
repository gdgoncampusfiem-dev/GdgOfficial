'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const TARGET_TEXT = 'Ordinary Ends Here';
const CHARS = TARGET_TEXT.split('');

export function OrdinaryEndsHere() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Positive margin fires intersection 400px before the element enters the
  // viewport, so typing begins while the user is still scrolling toward it.
  const isInView = useInView(containerRef, { once: true, margin: '400px' });
  const shouldReduceMotion = useReducedMotion();

  // Tracks how many characters are currently revealed.
  // Starts at 0 on both SSR and client — no hydration mismatch.
  const [charIndex, setCharIndex] = useState(0);

  const isTypingComplete = charIndex >= CHARS.length;

  // Typing animation — 70 ms per character, fully async (no sync setState).
  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNext = () => {
      currentIndex++;
      setCharIndex(currentIndex);
      if (currentIndex < CHARS.length) {
        timeoutId = setTimeout(typeNext, 70);
      }
    };

    timeoutId = setTimeout(typeNext, 80);

    return () => clearTimeout(timeoutId);
  }, [isInView, shouldReduceMotion]);

  // After typing finishes, smooth-scroll down to the GDG On Campus showcase.
  useEffect(() => {
    if (!isTypingComplete) return;

    const scrollTimer = setTimeout(() => {
      document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
    }, 900);

    return () => clearTimeout(scrollTimer);
  }, [isTypingComplete]);

  // For reduced-motion: show all chars at once (safe — derived, no setState).
  // isInView is false on SSR, so visibleCount is 0 there too.
  const visibleCount = (isInView && shouldReduceMotion) ? CHARS.length : charIndex;

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden px-6 md:px-12 py-10 md:py-16 flex items-center justify-center select-none"
    >
      <h2
        aria-label={TARGET_TEXT}
        className="whitespace-nowrap font-black uppercase text-[#050505]"
        style={{
          fontSize: 'clamp(2.5rem, 8.5vw, 9rem)',
          letterSpacing: '-0.045em',
          lineHeight: 1,
          textRendering: 'optimizeLegibility',
        }}
      >
        {CHARS.map((char, i) => (
          <motion.span
            key={i}
            // Both SSR and initial client render: all chars start at opacity 0 + blurred.
            // As charIndex grows, each char transitions to fully visible.
            initial={{ opacity: 0, filter: 'blur(16px)' }}
            animate={
              visibleCount > i
                ? { opacity: 1, filter: 'blur(0px)' }
                : { opacity: 0, filter: 'blur(16px)' }
            }
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            // Spaces must remain inline so they don't collapse
            style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </h2>
    </div>
  );
}

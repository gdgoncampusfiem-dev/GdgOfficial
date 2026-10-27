# High-End Motion Patterns & Code Recipes

## 1. Lenis Smooth Scroll Synchronizer

Connect Lenis smooth scrolling with Next.js and Framer Motion:

```tsx
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

---

## 2. Hover Preview Follower

A signature interaction where hovering over a list item (event, team member, domain) causes a visual image preview to follow the mouse pointer with smooth spring lag:

```tsx
'use client';

import { useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function HoverRosterItem({
  title,
  category,
  imageSrc
}: {
  title: string;
  category: string;
  imageSrc: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative border-b border-[#26262B] py-6 px-4 flex items-center justify-between cursor-pointer group"
    >
      <span className="text-xl md:text-2xl font-light tracking-tight text-[#F5F5F7] group-hover:text-white transition-colors">
        {title}
      </span>
      <span className="font-mono text-xs text-[#8E8E93] uppercase tracking-widest">
        {category}
      </span>

      {/* Floating Preview Image */}
      <motion.div
        className="pointer-events-none absolute z-50 overflow-hidden w-64 h-40 shadow-2xl rounded-sm"
        style={{
          left: smoothX,
          top: smoothY,
          x: '-50%',
          y: '-50%',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover filter grayscale contrast-125"
        />
      </motion.div>
    </div>
  );
}
```

---

## 3. Magnetic Interaction (Subtle Button Gravitation)

Attracts the button element slightly toward the cursor on hover:

```tsx
'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function MagneticCTA({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Subtle movement (divide by 5 to prevent aggressive pull)
    setPosition({ x: middleX / 5, y: middleY / 5 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
```

---
name: editorial-motion-craft
description: >-
  Provides award-winning animation patterns, Framer Motion 14 techniques, Lenis smooth scroll
  integration, SVG path drawing, and editorial micro-interactions. Use this skill whenever
  building, refining, or animating high-end UI components, page transitions, or interactive spreads.
---

# Editorial Motion Craft Skill

This skill provides production-grade animation patterns for editorial web design. It pairs **Framer Motion 14** and **Lenis** to create fluid, museum-grade interactions without generic bounce physics or performance bottlenecks.

---

## Motion Philosophy for GDG Kolkata

1. **Restraint Over Chaos**: Animations should feel like an architectural drawing coming to life or a prestige publication unfolding. Never use bouncy, playful cartoon physics.
2. **Kinetic Typography**: Text reveals should be deliberate (line-by-line or subtle word masking with slight delays).
3. **Scroll Narrative**: Coordinate with the page narrative:
   `BLACK → CITY → NETWORK → COMMUNITY → WHITE → (FOOTER: BLACK)`
4. **Performance First**:
   - Animate only composite properties: `transform` (`x`, `y`, `scale`) and `opacity`.
   - Never animate `top`, `left`, `width`, `height`, or `margin`.
   - Use `will-change: transform` sparingly on active layers only.

---

## Key Animation Patterns

### 1. Architectural SVG Path Drawing
Use `pathLength` motion values linked to scroll or viewport entry:
```tsx
import { motion, useScroll, useTransform } from 'framer-motion';

export function ArchitecturalBridge({ containerRef }: { containerRef: React.RefObject<HTMLElement> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <svg viewBox="0 0 1000 400" className="w-full stroke-current">
      <motion.path
        d="M 100 350 L 500 50 L 900 350 ..."
        fill="none"
        strokeWidth="1.2"
        style={{ pathLength }}
      />
    </svg>
  );
}
```

### 2. Editorial Text Masking Reveal
Mask text from bottom up with an overflow-hidden wrapper:
```tsx
import { motion } from 'framer-motion';

export function EditorialHeading({ title }: { title: string }) {
  return (
    <h1 className="overflow-hidden">
      <motion.span
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {title}
      </motion.span>
    </h1>
  );
}
```

### 3. Floating Preview on Roster Hover
When hovering over an event or team member name, show a floating preview image following the cursor:
- See the complete pattern in [motion-patterns.md](./references/motion-patterns.md#hover-preview-follower).

---

## Accessibility & Reduced Motion

Always respect users' motion preferences:
```tsx
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();
const transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] };
```

---

## Detailed References

- [Full Motion Patterns & Snippets](./references/motion-patterns.md)

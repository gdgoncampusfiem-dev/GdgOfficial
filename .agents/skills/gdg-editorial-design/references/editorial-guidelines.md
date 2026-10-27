# Editorial Design Guidelines & Layout Archetypes

## 1. Editorial Layout Patterns

### A. Asymmetric Grids
Instead of rigid 3-column card grids, use editorial magazine-style asymmetric spreads:
- Wide headline with inset narrative paragraph.
- Large typographic index with dynamic preview panels.
- Generous gutters and deliberate white/negative space.

### B. Event Archive Layout
- Avoid card boxes.
- Implement an editorial chronological list or timeline:
  - Column 1: Monospace Date / Category
  - Column 2: Event Title in large display weight
  - Column 3: Location / Meta details
  - On hover: Image preview reveals smoothly without layout shifts.

### C. Community Metrics Spread
- Editorial data presentation rather than dashboard KPI tiles.
- Large numerical glyphs with restrained captions underneath.
- Subtle counting animation triggered only on viewport entry.

### D. Team & Domain Roster
- Editorial typography-first roster.
- Clean horizontal borders or index numbering (`01`, `02`, `03`).
- Interactive hover effects that reveal portraits or detail descriptions smoothly.

---

## 2. Animation Philosophy

1. **Subtle and Intentional**:
   - Reveal animations (fade up, line draw).
   - Text masking and gentle opacity transitions.
   - Micro-parallax for the Kolkata linework hero.
2. **Strict Disallowances**:
   - Bouncy cartoonish spring physics.
   - Continuous spinning icons.
   - Competing entrance animations.
3. **Accessibility**:
   - Always wrap framer-motion or CSS transitions in reduced motion guards:
     ```css
     @media (prefers-reduced-motion: reduce) {
       * {
         animation-duration: 0.01ms !important;
         transition-duration: 0.01ms !important;
       }
     }
     ```

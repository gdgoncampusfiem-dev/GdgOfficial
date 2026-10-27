---
name: authored-svg-geometry
description: >-
  Provides patterns for authoring custom architectural SVG illustrations, geometric linework,
  procedural noise filters, and responsive vector blueprints. Use this skill whenever creating
  or refining SVG artwork, city linework (Howrah Bridge, tram wires, monuments), or SVG texture filters.
---

# Authored SVG Geometry Skill

This skill guides the creation and animation of precision architectural SVG artwork, procedural filters, and geometric linework.

## Core Rules for GDG Kolkata

1. **No AI/Stock Blob Illustrations**: Linework must be crisp, technical, and architectural (like a blueprint or engineering drawing).
2. **Hairline Strokes**: Use fine, high-precision stroke widths (`0.75px` to `1.5px`) with clean `vector-effect="non-scaling-stroke"`.
3. **Structured Grouping**: Group structural layers (`bridge-cantilever`, `tram-wires`, `piers`, `monument-silhouette`, `network-nodes`) so they can be individually animated with Framer Motion.
4. **Procedural Filters**: Use SVG filters for tactile patinas (chalk dust, film grain, paper texture) instead of heavy external image bitmaps.

---

## Authoring Architectural Linework

### Howrah Bridge Cantilever Truss Geometry
Trusses should use rhythmic triangle-and-cross geometry:

```tsx
export function HowrahBridgeSilhouette() {
  return (
    <svg viewBox="0 0 1200 400" className="w-full h-auto stroke-[#E8E6DF]/30 fill-none">
      {/* Base Waterline / Haulage Line */}
      <line x1="50" y1="350" x2="1150" y2="350" strokeWidth="1" />

      {/* Main Cantilever Arch Spans */}
      <path
        d="M 100 350 Q 350 180 600 240 Q 850 180 1100 350"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />

      {/* Vertical Suspension Posts */}
      {Array.from({ length: 21 }).map((_, i) => {
        const x = 120 + i * 48;
        return (
          <line
            key={i}
            x1={x}
            y1={350}
            x2={x}
            y2={220 + Math.sin((i / 20) * Math.PI) * -60}
            strokeWidth="0.8"
            strokeDasharray={i % 3 === 0 ? 'none' : '2 2'}
          />
        );
      })}
    </svg>
  );
}
```

---

## Procedural Grain & Noise Filters

Instead of loading heavy raster PNG/JPG noise images, generate infinite-resolution noise with SVG:

```tsx
export function ArchitecturalPaperGrain() {
  return (
    <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.06] mix-blend-overlay">
      <filter id="architecturalNoise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#architecturalNoise)" />
    </svg>
  );
}
```

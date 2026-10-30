---
name: gdg-editorial-design
description: >-
  Provides editorial design rules, typography hierarchy, visual identity (City × Technology × Community),
  and aesthetic guardrails for GDG Kolkata. Use this skill whenever designing, reviewing, or styling
  UI components, layouts, color palettes, animations, or city illustration motifs.
---

# GDG Kolkata Editorial Design Skill

This skill guides the design, styling, and aesthetic quality of the GDG Kolkata web platform.

## Creative North Star

- **Core Concept**: `CITY × TECHNOLOGY × COMMUNITY`
- **Narrative Arc**: `BLACK → CITY → NETWORK → COMMUNITY → WHITE → (FOOTER: BLACK)`
- **Aesthetic Tone**: Serious technology institution, architectural, editorial, minimal, culturally rooted in Kolkata, modern, human.

---

## Non-Negotiable Rules

1. **Strictly Avoid Generic SaaS Aesthetics**:
   - NO glassmorphism, NO gradient blobs, NO generic AI/stock imagery.
   - NO excessive rounded cards or generic card grids.
   - NO random floating 3D objects or unnecessary decorative icons.
   - Whitespace, typography, alignment, and restrained linework must do the heavy lifting.

2. **Color System & Palette Hierarchy**:
   - Dominant neutrals: Near-black (`#0D0D0E`), Graphite (`#1E1E22`), Warm White/Off-White (`#F7F6F2`), Warm Stone (`#E8E6DF`).
   - Google Brand Colors (Blue, Red, Yellow, Green) must only appear as **subtle accents**, never as dominant rainbow themes.
   - The dark-to-light transition is a deliberate narrative journey from the hero through content to the footer.

3. **Typography**:
   - Distinctive display font for editorial impact.
   - Clean, highly readable sans-serif for body and editorial copy.
   - Monospace for technical metadata, coordinates, metrics, or category tags.

4. **Kolkata City Linework Motif**:
   - Treat Kolkata as an architectural drawing rather than tourist landmarks.
   - Focus on structural linework: Howrah Bridge trusses, tram wires, Victoria Memorial silhouettes, urban geometry.
   - Linework evolves into network nodes and interactive pathways.

---

## Detailed References

For comprehensive specifications and tokens, consult:
- [Editorial Guidelines](./references/editorial-guidelines.md)
- [Palette and Design Tokens](./references/palette-and-tokens.md)

---

## Verification Checklist

Before finalizing any UI implementation or component:
- [ ] Does it feel like an editorial publication rather than a SaaS template?
- [ ] Is spacing deliberate with ample whitespace?
- [ ] Are Google brand colors restrained to subtle accents?
- [ ] Are animations intentional, restrained, and respecting `prefers-reduced-motion`?
- [ ] Is real community content prioritized over placeholders?

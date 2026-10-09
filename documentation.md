# GDG Kolkata - Website Documentation

You are the lead product designer, creative director, senior frontend architect and interaction designer for a premium Google Developer Group chapter website based in Kolkata.

Build a highly polished, editorial, community-first website that feels like a serious technology institution rather than a college club, SaaS startup, template website or generic developer community.

The website's purpose is to showcase the chapter's identity, people, events, photographs, technical domains and opportunities for collaboration.

## CORE CREATIVE IDEA:
CITY × TECHNOLOGY × COMMUNITY

Kolkata should be treated as a visual language rather than a tourist theme. Use restrained architectural linework, urban geometry, tram wires, bridge structures, architectural silhouettes and subtle city references to create a unique visual identity.

The website should feel:
* premium
* editorial
* intelligent
* minimal
* sophisticated
* human
* technologically modern
* culturally rooted
* highly intentional

### AVOID:
* generic SaaS aesthetics
* excessive glassmorphism
* gradient blobs
* excessive Google-colored gradients
* generic AI imagery
* stock photography
* excessive rounded cards
* unnecessary 3D objects
* template-like sections
* excessive icons
* childish illustrations
* random animations
* excessive text
* meaningless marketing jargon

## GOOGLE / GDG BRAND:
Respect official Google and GDG brand guidelines.

Do not recreate Google's visual identity.
Do not distort official logos.
Do not imply corporate Google ownership.
Do not use Google branding as the primary decorative design language.

The chapter should have its own visual identity while correctly using official GDG assets where appropriate.

## GLOBAL NAVIGATION:
ABOUT
EVENTS
GALLERY
DOMAINS
TEAM
SPONSOR US

**Primary CTA:** JOIN THE COMMUNITY ↗

## PAGES:
/
/about
/events
/events/[slug]
/gallery
/domains
/domains/[slug]
/team
/sponsor-us

## HOMEPAGE:

### 1. HERO
Create a memorable editorial hero based around Kolkata.
Use a large custom architectural line-art illustration representing Kolkata.

Potential visual elements:
* Howrah Bridge
* tram wires
* Victoria Memorial
* architectural silhouettes
* city geometry

The illustration should feel like an architectural technical drawing rather than a tourist illustration.
Hero typography should be large and sophisticated.

Possible conceptual headline:
"Where Kolkata builds what comes next."
Use chapter-specific copy where available.

Create subtle parallax and line-reveal animation.
The city illustration should gradually evolve visually as the user scrolls.

### 2. ABOUT
Create a strong editorial introduction.
Avoid generic community copy.
Use large typography, deliberate line breaks and strong whitespace.

Explain:
* who the community is
* what it believes in
* what members experience
* what the chapter creates

### 3. COMMUNITY NUMBERS
Use actual verified chapter statistics only.
Display metrics in an editorial data-spread style.

Examples: members, events, speakers, developers reached.
Animate numbers when they enter the viewport.

### 4. EVENTS
Make Events one of the most visually important sections.
Feature the upcoming event prominently.

Include: date, title, category, location, description, CTA, visual.
Then create an event archive as an editorial timeline rather than a card grid.
Hovering an event should reveal its visual preview.

### 5. GALLERY
Create a sophisticated asymmetric masonry gallery.
Use authentic community photography.

Include: workshops, talks, people, behind-the-scenes moments, community interactions.
Create a fullscreen lightbox.
Add one signature full-width photographic transition with strong typography.

### 6. DOMAINS
Do not use ordinary cards.
Create an interactive editorial index:
WEB, AI / ML, CLOUD, ANDROID, CYBERSECURITY, DATA, UI / UX, OPEN SOURCE.

Use subtle visual transformations on hover.
Each domain must eventually support its own detail page.

### 7. TEAM
Avoid a conventional card grid.
Create an editorial roster.
Names and roles should form the main visual structure.
Hovering a name can reveal a portrait and profile information.
Include one major group photograph section.

### 8. SPONSOR US
Create a sophisticated partnership page.

Hero: "Partner with the next generation."
Focus on collaboration rather than begging for sponsorship.
Explain partnership value through: REACH, EXPERIENCE, TALENT, COMMUNITY.

Provide partnership opportunities such as:
* event partnerships
* workshops
* hackathons
* technology/cloud support
* speakers/mentorship
* community partnerships

Use only real offerings.
Include genuine partner logos only when verified.
Create a premium multi-step enquiry form.

### 9. FOOTER
End with a memorable statement.
Example: "Build something worth remembering."
Include navigation and verified social links.

## DESIGN SYSTEM:
Use one distinctive display font, one highly readable sans-serif and optionally a monospace font for metadata.
Use warm white/off-white, near-black, graphite and restrained neutral tones.
Google colors may appear only as subtle accents.
Avoid making the website look like a Google corporate site.

## ANIMATION:
Use animation intentionally.

**Allowed:**
* reveal animations
* image clipping
* text masking
* subtle parallax
* hover image previews
* counters
* line drawing
* page transitions
* subtle scale
* horizontal editorial movement

**Avoid:**
* excessive rotation
* bouncing
* random floating elements
* scroll-jacking
* animation for decoration without purpose

Respect prefers-reduced-motion.

## TECHNOLOGY:
Use:
Next.js
React
JavaScript / JSX
Tailwind CSS
Framer Motion
Lenis
GSAP only when genuinely necessary
Lucide React

Prefer JavaScript rather than TypeScript.
Create clean reusable components.

## PROJECT STRUCTURE:
app/
components/
data/
public/
lib/
hooks/

Use dedicated components for: navigation, hero, Kolkata illustration, about, stats, events, gallery, domains, team, sponsor, footer, buttons, reveal animations, image reveals, cursor interactions.

## DATA:
Keep event, team, gallery, domain and partner content separate from presentation logic.
Use local data initially but structure everything so PostgreSQL/Prisma/Neon can be integrated later.

## RESPONSIVENESS:
Desktop must use asymmetric editorial layouts and sophisticated interactions.
Mobile must be deliberately designed rather than simply scaled down.
Disable expensive cursor effects on touch devices.
Use touch-friendly galleries and expandable content.

## PERFORMANCE:
Target Lighthouse:
Performance 90+
Accessibility 95+
Best Practices 95+
SEO 95+

Use: Next Image, lazy loading, responsive image sizes, dynamic imports, optimized fonts, compressed assets.

## ACCESSIBILITY:
Use semantic HTML. Keyboard navigation. Visible focus states. Proper labels. Alt text. Accessible forms. Reduced motion. Sufficient contrast.

## SEO:
Implement: metadata, OpenGraph, canonical URLs, sitemap, robots, structured metadata.

## IMPORTANT:
Do not invent chapter statistics, sponsors, social accounts, events, people or partnerships.
Use clearly marked placeholders where actual information is unavailable.
Do not create fake testimonials.
Do not invent sponsor logos.

The finished product should look like a premium digital publication created specifically for this GDG chapter.
Every section must have a reason to exist.
Every animation must have a purpose.
Every visual element must support the chapter's identity.

The final result should make someone unfamiliar with the chapter think:
"This is a serious community, and I want to be part of it."

# GDG on Campus FIEM (Kolkata) — Team Master Plan & Complete Guide 🚀
> **Welcome to the official developer guide and team roadmap.**  
> Whether you are a frontend developer, backend architect, UI/UX designer, or community organizer, this document contains **everything you need to know, everything that exists, and step-by-step instructions on how to build and contribute.**

---

## 📑 Table of Contents
1. [🌟 The Vision: What Makes This Website Special](#1--the-vision-what-makes-this-website-special)
2. [⚡ Quick Start: Zero to Running in 5 Minutes](#2--quick-start-zero-to-running-in-5-minutes)
3. [🗺️ Repository Map & File Guide](#3--repository-map--file-guide)
4. [🔍 Honest Status Check: What Works vs. What Needs Work](#4--honest-status-check-what-works-vs-what-needs-work)
5. [🎨 Design System & Editorial Rules](#5--design-system--editorial-rules)
6. [🛠️ "How-To" Cookbooks: How to Do Everything](#6--how-to-cookbooks-how-to-do-everything)
   - [How to Add or Edit a Team Member](#how-to-add-or-edit-a-team-member)
   - [How to Add or Update Events](#how-to-add-or-update-events)
   - [How to Add New Photos to the Gallery](#how-to-add-new-photos-to-the-gallery)
   - [How to Create a New Page or Route](#how-to-create-a-new-page-or-route)
   - [How to Build an Animated Component](#how-to-build-an-animated-component)
   - [How to Fix the Mobile "Under Development" Screen](#how-to-fix-the-mobile-under-development-screen)
   - [How to Build Backend Endpoints](#how-to-build-backend-endpoints)
   - [How to Connect the Admin Panel to the Backend](#how-to-connect-the-admin-panel-to-the-backend)
7. [🧪 Testing, Verification & Code Quality](#7--testing-verification--code-quality)
8. [🌿 Git Workflow & Collaboration Rules](#8--git-workflow--collaboration-rules)
9. [🚀 Deployment Guide (Vercel & Cloud)](#9--deployment-guide-vercel--cloud)
10. [🧯 Troubleshooting & FAQ](#10--troubleshooting--faq)
11. [🎯 Team Action Roadmap & Task Checklist](#11--team-action-roadmap--task-checklist)

---

## 1. 🌟 The Vision: What Makes This Website Special

### The Concept: `CITY × TECHNOLOGY × COMMUNITY`
Most developer community websites look like generic templates with rainbow gradient cards, stock photos, and floating emojis. **We are building something completely different.**

Our website is built like a **high-end architectural magazine or prestige technology publication** celebrating Kolkata's engineering culture.

```
       [ 1. DARK OPENING ]  --> Deep slate black (#050505), Kolkata architectural linework & chalk dust
                ↓
       [ 2. CITY TO NETWORK ] --> Howrah Bridge & tram wire geometry evolving into digital nodes
                ↓
       [ 3. EDITORIAL CANVAS ] --> Smooth transition into warm-white (#F3F0E8) magazine spreads
                ↓
       [ 4. CLOSING STATEMENT ] --> Return to deep black footer: "Build something worth remembering."
```

### The 4 Golden Rules of Our Brand:
1. **Rooted in Kolkata, not touristy**: Use technical architectural lines (cantilever trusses, tram overhead lines, Victoria Memorial silhouettes), not cartoon taxis or tourist clichés.
2. **Restrained Color**: The website is 90% neutral (black, slate, warm white, graphite). Google colors (`#4285F4` Blue, `#EA4335` Red, `#FBBC04` Yellow, `#34A853` Green) are **rare accents**, not giant rainbow gradients.
3. **No Fake Data**: Never invent fake attendance numbers, fake sponsor logos, or placeholder quotes disguised as real. Always use marked placeholders (`[Organizer Name]`) until verified.
4. **Purposeful Motion**: Every animation must feel deliberate and architectural (smooth reveals, line draws, gentle text masks). No bouncy cartoon springs.

---

## 2. ⚡ Quick Start: Zero to Running in 5 Minutes

### Prerequisites
Make sure your computer has:
- **Node.js**: Version `20.x` or `22.x` (LTS recommended)
- **npm**: Version `10.x` or higher
- **Git**

---

### Step 1: Open the Repository
```powershell
cd c:\Users\LENOVO\Desktop\GDG\GdgOfficial
```

---

### Step 2: Run the Frontend (Next.js)
Open a terminal and run:
```powershell
cd frontend
npm install   # (if running for the first time)
npm run dev
```
👉 Open your browser at: **`http://localhost:3000`**

---

### Step 3: Run the Backend (Express & TypeScript)
Open a second terminal window and run:
```powershell
cd backend
npm install   # (if running for the first time)
npm run dev
```
👉 Backend API server runs at: **`http://localhost:8080`**

---

### Step 4: Access the Admin Panel
Open: **`http://localhost:3000/admin`**  
This is our fully functional operations console where you can manage events, team members, photo galleries, sponsor inquiries, and announcements!

---

## 3. 🗺️ Repository Map & File Guide

Here is where everything lives in simple terms:

```text
GdgOfficial/
├── frontend/                          # Next.js 16 (Pages Router) + React 19 + Tailwind v4
│   ├── public/                        # Static assets (logos, skyline images, icons)
│   │   ├── sponsors/                  # Verified sponsor SVG logos (AMD, GitHub, GfD, Neo4j)
│   │   ├── kolkata-skyline-hd.png     # Rising Kolkata skyline for Hero
│   │   └── kolkata-footer-art-rygb.png# Kolkata art for the footer
│   ├── src/
│   │   ├── pages/                     # The Website Pages (URL routes)
│   │   │   ├── index.tsx              # Homepage (Hero, About, Stats, Flagship Events, Sponsors)
│   │   │   ├── domains.tsx            # /domains — Interactive 5 technical domain showcase
│   │   │   ├── gallery.tsx            # /gallery — Interactive Jigsaw photo gallery + Lightbox
│   │   │   ├── teams.tsx              # /teams — Team Roster (Faculty, Organizers, Core)
│   │   │   ├── sponsor-us.tsx         # /sponsor-us & /sponsors — Interactive Partner Pitch Deck
│   │   │   ├── admin.tsx              # /admin — Operations Management Dashboard
│   │   │   ├── _app.tsx               # Root app wrapper (Lenis smooth scroll, global fonts)
│   │   │   └── _document.tsx          # HTML document layout & meta headers
│   │   ├── components/                # Reusable UI Components
│   │   │   ├── hero/Hero.tsx          # Hero section with chalk texture and rising skyline
│   │   │   ├── navigation/Navbar.tsx  # Floating pill navigation bar with scroll detection
│   │   │   ├── WhoAreWe.tsx           # Editorial narrative with parallax image collage
│   │   │   ├── AboutStats.tsx         # Animated numerical counters
│   │   │   ├── ourflagshipevents.tsx  # DevFest, Solution Challenge, I/O showcase cards
│   │   │   ├── RecentEvents.tsx       # Timeline of recent events and workshops
│   │   │   ├── OurSponsors.tsx        # Infinite auto-scrolling sponsor logo marquee
│   │   │   ├── domains/               # Interactive graphics for Tech, Design, Outreach, Events
│   │   │   ├── gallery/               # GalleryMasonry, Lightbox, and AllPhotosGallery
│   │   │   ├── sponsor/SponsorDeck.tsx# 4-slide interactive sponsorship pitch deck
│   │   │   └── team/TeamCard.tsx      # Member card with hover elevation and Google color accents
│   │   ├── admin/                     # Complete Admin Dashboard System
│   │   │   ├── AdminApp.tsx           # Admin shell with tab router
│   │   │   ├── AdminContext.tsx       # State management with automatic LocalStorage sync
│   │   │   ├── tabs/                  # Dashboard, Events, Gallery, Team, Domains, Inquiries
│   │   │   └── modals/                # Create/Edit popups for Events, Photos, Team members
│   │   ├── data/                      # Hardcoded local data files
│   │   │   ├── team.ts                # Faculty coordinator, organizers, core team array
│   │   │   └── gallery.ts             # 15+ high-res community photos with metadata
│   │   ├── styles/
│   │   │   ├── globals.css            # Tailwind CSS v4 setup, Product Sans font definitions
│   │   │   └── sponsor-deck.css       # Specific styles for the sponsor presentation
│   │   └── utils/cn.ts                # Class merging utility (clsx + twMerge)
│   ├── package.json
│   └── next.config.ts                 # Next.js configuration (Turbopack, Unsplash remote images)
│
├── backend/                           # Express 5 + TypeScript + Node.js
│   ├── src/
│   │   └── index.ts                   # Express server entry point (CORS, JSON parser, root route)
│   ├── tsconfig.json                  # Pinned to TypeScript 5.9.3 for stability
│   └── package.json
│
├── .agents/skills/                    # AI & Developer workflow skills
│   ├── gdg-dev-workflow/              # Scripts to test and verify the whole project
│   ├── gdg-editorial-design/          # Design guidelines, color tokens, typography rules
│   ├── editorial-motion-craft/        # Framer Motion 14 and Lenis smooth scroll patterns
│   └── authored-svg-geometry/         # Instructions for architectural SVG linework
│
├── vercel.json                        # Deployment routing config for Vercel
└── package.json                       # Monorepo root scripts
```

---

## 4. 🔍 Honest Status Check: What Works vs. What Needs Work

To save you hours of confusion, here is the honest current status of the project:

### ✅ What is Fully Built and Working
1. **Homepage Hero (`/`)**: Dark chalkboard texture, atmospheric lighting, Josefin Sans headline reveal, rising Kolkata skyline.
2. **About & Community Narrative**: Smooth parallax collage, animated number counters (`AboutStats`), recent event cards, and infinite sponsor marquee.
3. **Domains Page (`/domains`)**: 5 fully interactive domain modules (Tech, Design, Outreach, Events, Photography) with custom animations and SVGs.
4. **Photo Gallery (`/gallery`)**: Jigsaw photo masonry, category filter tabs (DevFest, Workshops, Hackathons), full-screen Lightbox with arrow/keyboard controls.
5. **Team Page (`/teams`)**: Roster for faculty mentor, organizers, and core members with Google color border accents.
6. **Sponsor Deck (`/sponsor` or `/sponsor-us`)**: Complete interactive slide deck with interactive inquiry form.
7. **Admin Dashboard (`/admin`)**: Fully working UI with 8 tabs, add/edit/delete modals, activity logs, and browser `localStorage` persistence.
8. **Automated Verification Script**: Available at `.agents/skills/gdg-dev-workflow/scripts/verify-project.ps1`.

---

### ⚠️ Current Roadblocks & Pending Tasks (Priority 1)

| # | Issue / Missing Piece | Where in Code | How to Solve It |
|---|----------------------|---------------|-----------------|
| 🚨 **1** | **Mobile "Under Development" Blocker** | `frontend/src/pages/_app.tsx` (Lines 28-34) | A full-screen black overlay blocks all mobile phone screens saying "Under Development". Needs responsive cleanup so mobile users can view the site! |
| 🚨 **2** | **Dedicated `/events` Page Missing** | `frontend/src/pages/` | The Navbar links to `/events`, but there is currently no `events.tsx` page file. Clicking "Events" results in a 404. |
| 🚨 **3** | **Homepage Dark Footer Missing** | `frontend/src/pages/index.tsx` (Line 25) | Currently has a placeholder blank `div` instead of the dark architectural footer using `kolkata-footer-art-rygb.png`. |
| 🚨 **4** | **Backend Database Not Connected** | `backend/src/index.ts` | The backend only returns `"GDG Kolkata API is running"`. The Admin panel currently saves only to your browser's `localStorage`. Needs PostgreSQL + Prisma ORM to save data permanently. |
| 🚨 **5** | **Next.js Security Upgrade** | `frontend/package.json` | Next.js 16.4.0 triggers an advisory recommendation during production builds. Running `next upgrade` will align this to the latest patch. |

---

## 5. 🎨 Design System & Editorial Rules

### 1. Color Palette Tokens
| Token | Hex | Where to Use |
|-------|-----|--------------|
| **Deep Slate / Hero Black** | `#050505` | Hero background, closing footer, primary dark cards |
| **Warm White Canvas** | `#F3F0E8` | Main content background, About section, Gallery background |
| **Pure White** | `#FFFFFF` | Inset cards, forms, modals, light buttons |
| **Graphite Body Text** | `#575550` or `#4a4742` | Body paragraphs, descriptions, secondary copy |
| **Google Blue** | `#4285F4` | Tech domain, primary active accents, key links |
| **Google Red** | `#EA4335` | Creative domain, live badges, alerts |
| **Google Yellow** | `#FBBC04` | Event management domain, date badges, highlights |
| **Google Green** | `#34A853` | Outreach domain, confirmed status, success states |

---

### 2. Typography Rules
- **Display Headlines & Hero**: `Josefin Sans` (Thin, Light, Regular). Sizing: `clamp(2.5rem, 5vw, 5.5rem)`.
- **Editorial Subheadings**: `Product Sans`. The first words are `font-light` (300 weight) and the last word is `font-bold` (700 weight).
  - *Example*: `<span className="subheading-words">Who are </span><span className="subheading-last">we</span>`
- **Body Text**: `Product Sans Light` or system sans-serif with comfortable line height (`leading-relaxed` or `leading-[1.5]`).
- **Metadata, Timestamps & Labels**: Monospace or uppercase tracking (`font-mono text-xs uppercase tracking-widest`).

---

### 3. Motion Principles (Framer Motion 14)
- **Easing**: Always use the signature editorial curve: `ease: [0.16, 1, 0.3, 1]` (fast start, silky smooth deceleration).
- **Durations**:
  - Micro-interactions (hover, click): `0.15s` – `0.25s`
  - Content fade & slide up: `0.6s` – `0.8s`
  - Hero cinematic reveals: `1.0s` – `1.4s`
- **Composite Properties Only**: Animate `opacity`, `transform` (`x`, `y`, `scale`). Never animate CSS `height`, `width`, or `margin` directly.
- **Reduced Motion**: Never let motion break usability. Respect users who disable motion.

---

## 6. 🛠️ "How-To" Cookbooks: How to Do Everything

---

### How to Add or Edit a Team Member

#### Option A: Through the Admin UI (Easiest for Non-Coders)
1. Open `http://localhost:3000/admin`
2. Click the **"Team"** tab on the left sidebar.
3. Click the blue **"+ Add Member"** button.
4. Fill in: Name, Role (e.g. Organizer, Web Lead), Domain, Profile Image URL, LinkedIn, and GitHub.
5. Click **"Add Member"**. Done!

#### Option B: Directly in the Codebase
Open: [`frontend/src/data/team.ts`](file:///c:/Users/LENOVO/Desktop/GDG/GdgOfficial/frontend/src/data/team.ts)
```typescript
// To add a new organizer:
export const organizers: TeamMember[] = [
  {
    id: 'org-subhajit',
    name: 'Subhajit Dey',
    role: 'Lead Organizer',
    domain: 'Leadership',
    imageUrl: 'https://images.unsplash.com/...', // Or place in /public/assets/team/
    linkedinUrl: 'https://linkedin.com/in/...',
    githubUrl: 'https://github.com/...',
    intro: 'Building community platforms and scaling developer engagement.',
    accentColor: 'blue', // 'blue' | 'red' | 'yellow' | 'green'
  },
  // ...
];
```

---

### How to Add or Update Events

#### For the Homepage Flagship Events
Open: [`frontend/src/components/ourflagshipevents.tsx`](file:///c:/Users/LENOVO/Desktop/GDG/GdgOfficial/frontend/src/components/ourflagshipevents.tsx)
Locate the `flagshipEvents` array (around line 32) and add your event:
```typescript
{
  id: 'devfest-2026',
  title: 'DevFest Kolkata 2026',
  category: 'Annual Developer Conference',
  date: 'October 24, 2026',
  venue: 'Biswa Bangla Convention Centre',
  status: 'Open', // 'Open' or 'Closed'
  posterUrl: 'https://images.unsplash.com/...',
  pastelBg: 'bg-[#E8F0FE]',
  pastelBorder: 'border-[#CCE0FD]',
  accentColor: '#4285F4',
}
```

#### For Recent Events
Open: [`frontend/src/components/RecentEvents.tsx`](file:///c:/Users/LENOVO/Desktop/GDG/GdgOfficial/frontend/src/components/RecentEvents.tsx)
Edit the `recentEvents` array (around line 32).

---

### How to Add New Photos to the Gallery

Open: [`frontend/src/data/gallery.ts`](file:///c:/Users/LENOVO/Desktop/GDG/GdgOfficial/frontend/src/data/gallery.ts)
Add your photo object to the `GALLERY_ITEMS` array:
```typescript
{
  id: 'df-new-photo',
  title: 'Audience Keynote Reaction',
  subtitle: 'Attendees testing hands-on Gemini API code lab.',
  date: 'OCT 2025',
  category: 'devfest', // 'devfest' | 'workshops' | 'hackathons' | 'community'
  imageUrl: 'https://images.unsplash.com/...', // Or an image from /public/
  location: 'Main Auditorium',
  aspect: 'aspect-[16/9]', // 'aspect-[16/9]' | 'aspect-[4/3]' | 'aspect-[3/4]' | 'aspect-square'
  accentColor: 'blue',     // 'blue' | 'red' | 'yellow' | 'green'
  eventId: 'devfest-2025',
  eventName: 'DevFest Kolkata 2025',
}
```

---

### How to Create a New Page or Route

Since we use the **Next.js Pages Router**, creating a page is as easy as adding a `.tsx` file inside `frontend/src/pages/`.

#### Example: Creating the Missing `/events` Page
1. Create a new file: `frontend/src/pages/events.tsx`
2. Add your page template:
```tsx
import Head from 'next/head';
import { Navbar } from '@/components/navigation/Navbar';
import { OurFlagshipEvents } from '@/components/ourflagshipevents';
import { RecentEvents } from '@/components/RecentEvents';

export default function EventsPage() {
  return (
    <>
      <Head>
        <title>Events & Workshops | GDGoc FIEM</title>
        <meta name="description" content="Discover upcoming hackathons, tech workshops, and conferences." />
      </Head>

      <main className="min-h-screen bg-[#F3F0E8] font-sans selection:bg-[#050505] selection:text-[#F3F0E8]">
        <Navbar theme="light" />
        <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">Events</h1>
          <p className="text-xl text-[#575550] mb-12">Every talk, hackathon, and code sprint in Kolkata.</p>
          <OurFlagshipEvents />
          <div className="mt-20">
            <RecentEvents />
          </div>
        </div>
      </main>
    </>
  );
}
```
3. Save and open `http://localhost:3000/events` in your browser. Done!

---

### How to Build an Animated Component

When creating animated components, use **Framer Motion 14** and standard Tailwind CSS:

```tsx
'use client';

import { motion } from 'framer-motion';

export function EditorialFeature() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="p-8 border border-[#E2E0D8] bg-white rounded-lg shadow-sm"
    >
      <h3 className="text-2xl font-bold text-[#050505]">Architectural Linework</h3>
      <p className="text-[#575550] mt-2">Smoothly reveals as the user scrolls into view.</p>
    </motion.div>
  );
}
```

---

### How to Fix the Mobile "Under Development" Screen

In [`frontend/src/pages/_app.tsx`](file:///c:/Users/LENOVO/Desktop/GDG/GdgOfficial/frontend/src/pages/_app.tsx), lines 28–42 currently hide the website on mobile devices:

```tsx
// CURRENT BLOCKER in _app.tsx:
{!isSponsorPage && (
  <div className="md:hidden fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center">
    <h1 className="text-white font-sans font-extralight tracking-widest uppercase text-sm">
      Under Development
    </h1>
  </div>
)}

{isSponsorPage ? (
  <Component {...pageProps} />
) : (
  <div className="hidden md:block">
    <Component {...pageProps} />
  </div>
)}
```

#### How to Fix It:
Once the homepage and other pages have been reviewed for responsive padding and overflow:
1. Remove the `md:hidden` "Under Development" banner.
2. Remove the `hidden md:block` wrapper so `<Component {...pageProps} />` renders directly on all screens!

---

### How to Build Backend Endpoints

Our backend is written in **Express 5 + TypeScript**.  
Open: [`backend/src/index.ts`](file:///c:/Users/LENOVO/Desktop/GDG/GdgOfficial/backend/src/index.ts)

Here is how to add REST API endpoints:
```typescript
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// 1. Healthcheck
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// 2. Events API
app.get('/api/events', (req: Request, res: Response) => {
  // Return events from DB
  res.json({ success: true, data: [] });
});

// 3. Sponsor Inquiries Form Submission API
app.post('/api/inquiries', (req: Request, res: Response) => {
  const { companyName, contactName, email, message } = req.body;
  if (!companyName || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  // Save to database or forward to email notification
  res.status(201).json({ success: true, message: 'Inquiry received' });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server running at http://localhost:${port}`);
});
```

---

### How to Connect the Admin Panel to the Backend

Right now, [`frontend/src/admin/AdminContext.tsx`](file:///c:/Users/LENOVO/Desktop/GDG/GdgOfficial/frontend/src/admin/AdminContext.tsx) loads and saves to `localStorage`:

```typescript
// Replace localStorage logic with fetch calls:
const fetchEvents = async () => {
  try {
    const res = await fetch('http://localhost:8080/api/events');
    const data = await res.json();
    setEvents(data);
  } catch (err) {
    console.error('Failed to load events from backend', err);
  }
};
```

---

## 7. 🧪 Testing, Verification & Code Quality

Always verify your code before pushing to GitHub!

### Run Quality Checks Manually

#### Frontend:
```powershell
cd frontend
npm run lint    # Checks for code styling and syntax mistakes
npm run build   # Validates TypeScript types and builds the production bundle
```

#### Backend:
```powershell
cd backend
npm run build   # Runs TypeScript compiler (tsc)
```

---

### Run the Automated Full-Stack Verification Script
We have a ready-made PowerShell script that tests both frontend and backend in one command:
```powershell
powershell -ExecutionPolicy Bypass -File .agents/skills/gdg-dev-workflow/scripts/verify-project.ps1
```

---

## 8. 🌿 Git Workflow & Collaboration Rules

To keep the repository clean and avoid merge conflicts, follow this standardized team workflow:

### 1. Branch Naming Rules
Always create a branch from `master` with this pattern:
- `feat/feature-name` (e.g. `feat/events-page`, `feat/footer-component`)
- `fix/bug-description` (e.g. `fix/mobile-overflow`, `fix/navbar-z-index`)
- `docs/doc-update` (e.g. `docs/team-plan`)

### 2. Commit Message Convention
Use clean semantic commits:
```bash
git add .
git commit -m "feat(events): create dedicated events archive page"
git commit -m "fix(responsive): enable mobile view by removing under-development gate"
git commit -m "style(hero): refine chalk grain texture opacity"
```

### 3. Pull Request (PR) Checklist Before Merging
Before submitting a PR:
- [ ] Code builds without errors (`npm run build`).
- [ ] No hardcoded secrets, API keys, or `.env` files committed.
- [ ] Tested on both desktop (1440px) and mobile screen sizes.
- [ ] No unverified stats or fake sponsor logos added.
- [ ] Unused imports or `console.log` statements cleaned up.

---

## 9. 🚀 Deployment Guide (Vercel & Cloud)

### Frontend Deployment on Vercel
The frontend is pre-configured for **Vercel** with [`vercel.json`](file:///c:/Users/LENOVO/Desktop/GDG/GdgOfficial/vercel.json):
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "installCommand": "npm --prefix frontend install",
  "buildCommand": "npm --prefix frontend run build",
  "outputDirectory": "frontend/.next"
}
```

#### How to Deploy:
1. Connect the GitHub repo to your Vercel team account.
2. Root directory: `./` (or `frontend` if setting up standalone).
3. Build command: `npm --prefix frontend run build` (automatic).
4. Add environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: Your backend API base URL.

---

### Backend Deployment Options
The backend can be hosted for free/low cost on:
1. **Render.com** (Web Service, environment: Node, build: `npm run build`, start: `npm start`).
2. **Railway.app** (Deploy from GitHub repo, subfolder `/backend`).
3. Set `PORT=8080` and `CORS_ORIGIN=https://your-domain.vercel.app`.

---

## 10. 🧯 Troubleshooting & FAQ

#### Q: "Tailwind classes aren't applying or `@tailwind base;` shows an error!"
> **Cause**: This project uses **Tailwind CSS v4**!  
> **Solution**: Tailwind v4 uses `@import "tailwindcss";` in `globals.css`. Do **not** create a `tailwind.config.js` or use legacy v3 `@tailwind` directives. Theme tokens are defined in `globals.css` under `@theme { ... }`.

#### Q: "Image failed to load with `Invalid src prop on next/image`!"
> **Cause**: Next.js blocks external images that are not whitelisted.  
> **Solution**: If using external images (like Unsplash), add the domain in [`frontend/next.config.ts`](file:///c:/Users/LENOVO/Desktop/GDG/GdgOfficial/frontend/next.config.ts) under `images.remotePatterns`.

#### Q: "Port 3000 or Port 8080 is already in use!"
> **Solution**:
> On Windows PowerShell, find and kill the process holding the port:
> ```powershell
> Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force
> ```

#### Q: "Where is the database stored right now?"
> **Answer**: Right now, changes made in the `/admin` dashboard are saved in your browser's `localStorage`. Connecting Neon PostgreSQL + Prisma is on the roadmap (Phase 3).

---

## 11. 🎯 Team Action Roadmap & Task Checklist

Here is our prioritized task list divided into actionable phases:

### Phase 1: Polish & Unblock Mobile (Week 1)
- [ ] **Task 1.1**: Audit and fix mobile layout issues across all pages.
- [ ] **Task 1.2**: Remove the `Under Development` overlay in `frontend/src/pages/_app.tsx`.
- [ ] **Task 1.3**: Run `next upgrade` to clear the Next.js security advisory.
- [ ] **Task 1.4**: Build the dark architectural **Footer** component with Kolkata skyline art and verified chapter social links.

### Phase 2: Missing Core Pages & Navigation (Week 2)
- [ ] **Task 2.1**: Build the dedicated `/events` page linking upcoming + past event chronicles.
- [ ] **Task 2.2**: Build `/events/[slug]` dynamic detail pages with event agenda, speakers, and RSVP buttons.
- [ ] **Task 2.3**: Replace all `[Placeholder]` names in `team.ts` with real GDG on Campus FIEM organizers and core members.
- [ ] **Task 2.4**: Replace placeholder sponsor stories in `SponsorDeck.tsx` with authentic chapter testimonials.

### Phase 3: Backend & Database Connection (Week 3)
- [ ] **Task 3.1**: Initialize **Prisma ORM** with Neon PostgreSQL in `backend/`.
- [ ] **Task 3.2**: Create schemas for `Event`, `TeamMember`, `GalleryPhoto`, and `Inquiry`.
- [ ] **Task 3.3**: Build CRUD endpoints in `backend/src/index.ts`.
- [ ] **Task 3.4**: Connect `AdminContext.tsx` to read and write from the backend API instead of `localStorage`.
- [ ] **Task 3.5**: Wire the Sponsor contact form to save directly to the inquiries table.

### Phase 4: Production Launch & Performance (Week 4)
- [ ] **Task 4.1**: Run Lighthouse audits (Aiming for 90+ Performance, 95+ Accessibility, 100 SEO).
- [ ] **Task 4.2**: Configure OpenGraph social preview images and Twitter/X cards.
- [ ] **Task 4.3**: Deploy frontend to custom chapter domain on Vercel.
- [ ] **Task 4.4**: Deploy backend to production cloud service.

---

**Remember**: Every section must have a reason to exist. Every animation must have a purpose. Build something worth remembering! 🚀

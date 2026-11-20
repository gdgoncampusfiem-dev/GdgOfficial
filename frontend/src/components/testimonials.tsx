"use client";

import React from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Types ────────────────────────────────────────────────────── */
interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  tint: string;
}

/* ─── Data ─────────────────────────────────────────────────────── */
const col1: Testimonial[] = [
  {
    // blue → green → yellow  (blue anchor at top)
    quote:
      "GDG on Campus FIEM doesn't just teach you to code — it shows you why you code. The community energy here is unmatched.",
    name: "Arnab Chatterjee",
    role: "GDE · Guest Speaker",
    initials: "AC",
    tint: "bg-[#E8F0FE]/80 text-neutral-900 border-[#D2E3FC]",
  },
  {
    quote:
      "DevFest was my first proper tech event. The talks on Gemini and Flutter were dense but practical — I shipped a project two weeks later.",
    name: "Rounak Ghosh",
    role: "4th Year, CSE",
    initials: "RG",
    tint: "bg-[#E8F5E9]/70 text-neutral-900 border-[#C8E6C9]",
  },
  {
    quote:
      "Hands-down the most welcoming tech space on campus. Nobody makes you feel silly for asking basic Linux or cloud questions.",
    name: "Priya Das",
    role: "2nd Year, ECE",
    initials: "PD",
    tint: "bg-[#FEF7E0]/80 text-neutral-900 border-[#FEEFC3]",
  },
];

const col2: Testimonial[] = [
  {
    // red → yellow → green  (offset by 1 from col1)
    quote:
      "Winning the AI/ML track at the GDG hackathon changed how I approach problem-solving. Mentors pushed us to build something real.",
    name: "Sohini Das",
    role: "3rd Year, CSE",
    initials: "SD",
    tint: "bg-[#FCE8E6]/70 text-neutral-900 border-[#FAD2CF]",
  },
  {
    quote:
      "Contributing to the community docs showed me that open-source is a conversation, not just code. Opened my first PR here.",
    name: "Pritha Mondal",
    role: "Frontend Domain",
    initials: "PM",
    tint: "bg-[#FEF7E0]/80 text-neutral-900 border-[#FEEFC3]",
  },
  {
    quote:
      "Found my hackathon teammates right here in Lab 4. Went from a rough Figma wireframe to a working prototype in 24 hours.",
    name: "Soham Mukherjee",
    role: "3rd Year, IT",
    initials: "SM",
    tint: "bg-[#E8F5E9]/70 text-neutral-900 border-[#C8E6C9]",
  },
];

const col3: Testimonial[] = [
  {
    // green → red → yellow  (offset by 2 from col1 — yellow never aligns with col2)
    quote:
      "The Android bootcamp was intense and completely worth it. We went from zero to publishing an app on the Play Store in four weekends.",
    name: "Ayush Kumar",
    role: "Android Bootcamp",
    initials: "AK",
    tint: "bg-[#E8F5E9]/70 text-neutral-900 border-[#C8E6C9]",
  },
  {
    quote:
      "Organizing and speaking at GDG on Campus sessions gave me the confidence to crack my summer internship interviews.",
    name: "Arjun Chatterjee",
    role: "Alumni, CSE '26",
    initials: "AC",
    tint: "bg-[#FCE8E6]/70 text-neutral-900 border-[#FAD2CF]",
  },
  {
    quote:
      "The Study Jams actually force you to build instead of just watching slideshows. Best tech community at FIEM.",
    name: "Ananya Sen",
    role: "3rd Year, CSE",
    initials: "AS",
    tint: "bg-[#FEF7E0]/80 text-neutral-900 border-[#FEEFC3]",
  },
];

/* ─── Card ──────────────────────────────────────────────────────── */
function TestimonialCard({ item, idx }: { item: Testimonial; idx: number }) {
  return (
    <div
      key={idx}
      className={`rounded-3xl p-6 border ${item.tint}`}
    >
      <p className="text-sm md:text-base leading-relaxed">
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3 pt-4 border-t border-current/10">
        <div className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold bg-neutral-900 text-white">
          {item.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900">{item.name}</p>
          <p className="text-xs text-neutral-500">{item.role}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Column ─────────────────────────────────────────────────────── */
function MarqueeColumn({
  items,
  reverse = false,
}: {
  items: Testimonial[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative h-[540px] overflow-hidden group">
      <div
        className={`flex flex-col gap-5 ${
          reverse ? "animate-marquee-down" : "animate-marquee-up"
        } group-hover:[animation-play-state:paused]`}
      >
        {doubled.map((item, idx) => (
          <TestimonialCard key={idx} item={item} idx={idx} />
        ))}
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────── */
export function Testimonials() {
  return (
    <section className="w-full py-20 md:py-28 bg-[#F3F0E8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Heading */}
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.18em] text-[#575550] mb-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          Community Voices
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-light text-[#050505] mb-12 md:mb-16 max-w-xl leading-[1.15]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.06 }}
        >
          <span className="font-light">Words from </span>
          <span className="font-bold">our people</span>
        </motion.h2>

        {/* 3-column marquee with top/bottom fade mask */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
          <MarqueeColumn items={col1} />
          <MarqueeColumn items={col2} reverse />
          <div className="hidden md:block">
            <MarqueeColumn items={col3} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

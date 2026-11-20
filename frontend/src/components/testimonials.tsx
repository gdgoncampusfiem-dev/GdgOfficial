"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: EASE, delay: i * 0.08 },
  }),
};

interface TestimonialItem {
  id: number;
  quote: string;
  name: string;
  role: string;
  featured?: boolean;
  accent?: string; // bg class
  border?: string; // border class
}

const items: TestimonialItem[] = [
  {
    id: 0,
    featured: true,
    quote:
      "GDG on Campus FIEM doesn't just teach you to code — it shows you why you code. The community energy here is unlike anything I've seen at other university chapters.",
    name: "Arnab Chatterjee",
    role: "Google Developer Expert · Guest Speaker, DevFest 2024",
    accent: "bg-[#050505]",
    border: "border-transparent",
  },
  {
    id: 1,
    quote:
      "Winning the AI/ML track at the GDG hackathon changed how I approach problem-solving. The mentors pushed us to build something real, not just a demo.",
    name: "Sohini Das",
    role: "Hackathon Finalist · 3rd Year, CSE",
    accent: "bg-[#E8F0FE]",
    border: "border-[#c5d8fc]",
  },
  {
    id: 2,
    quote:
      "DevFest was my first proper tech event. The talks on Gemini and Flutter were dense but actually practical — I shipped a side project two weeks later.",
    name: "Rounak Ghosh",
    role: "DevFest Attendee · 4th Year, CSE",
    accent: "bg-[#E9F9EE]",
    border: "border-[#b6edd0]",
  },
  {
    id: 3,
    quote:
      "Contributing to the community docs showed me that open-source is a conversation, not just code. GDG gave me the confidence to open my first PR.",
    name: "Pritha Mondal",
    role: "Community Contributor · Frontend Domain",
    accent: "bg-[#FFF7E0]",
    border: "border-[#f5e0a0]",
  },
  {
    id: 4,
    quote:
      "The Android bootcamp was intense and completely worth it. We went from zero to publishing an app on the Play Store in four weekends.",
    name: "Ayush Kumar",
    role: "Workshop Participant · Android Bootcamp",
    accent: "bg-[#FCECEB]",
    border: "border-[#f5c5c0]",
  },
];

function Monogram({
  name,
  featured,
}: {
  name: string;
  featured?: boolean;
}) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
  return (
    <div
      className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
        featured ? "bg-white/15 text-white" : "bg-neutral-900 text-white"
      }`}
    >
      {initials}
    </div>
  );
}

export function Testimonials() {
  const featured = items.find((i) => i.featured)!;
  const cards = items.filter((i) => !i.featured);

  return (
    <section className="w-full py-20 md:py-28 bg-[#F3F0E8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Section heading */}
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

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {/* Featured card — spans 2 columns on md+ */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`md:col-span-2 rounded-2xl p-7 sm:p-9 flex flex-col justify-between min-h-[280px] border ${featured.border} ${featured.accent}`}
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-normal italic leading-[1.4] text-white">
              &ldquo;{featured.quote}&rdquo;
            </p>
            <div className="mt-10 flex items-center gap-3 pt-5 border-t border-white/10">
              <Monogram name={featured.name} featured />
              <div>
                <p className="text-sm font-semibold text-white">{featured.name}</p>
                <p className="text-xs text-neutral-400">{featured.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Compact cards — right column stacked, then bottom row */}
          {cards.slice(0, 1).map((item, i) => (
            <motion.div
              key={item.id}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between border ${item.border} ${item.accent}`}
            >
              <p className="text-base text-neutral-700 leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-neutral-900/10">
                <Monogram name={item.name} />
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{item.name}</p>
                  <p className="text-xs text-neutral-500">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Bottom row — 3 compact cards */}
          {cards.slice(1).map((item, i) => (
            <motion.div
              key={item.id}
              custom={i + 2}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between border ${item.border} ${item.accent}`}
            >
              <p className="text-base text-neutral-700 leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-neutral-900/10">
                <Monogram name={item.name} />
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{item.name}</p>
                  <p className="text-xs text-neutral-500">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

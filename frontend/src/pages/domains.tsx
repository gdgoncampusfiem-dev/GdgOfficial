import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { motion } from 'framer-motion';

import { TechVisual } from '@/components/domains/TechDomain';
import { CreativesVisual } from '@/components/domains/CreativesDomain';
import { OutreachVisual } from '@/components/domains/OutreachDomain';
import { EventsVisual } from '@/components/domains/EventsDomain';
import { PhotographyVisual } from '@/components/domains/PhotographyDomain';

// --- Data ---

const DOMAINS = [
  {
    id: 'tech',
    index: '01',
    title: ['Tech', 'Domain'],
    watermark: 'TECH',
    description: 'Building the digital backbone of our community. From cutting-edge web applications to machine learning models, we turn complex problems into elegant code.',
    technologies: ['Web Dev', 'App Dev', 'AI/ML', 'Cloud Computing'],
    accentColor: 'text-[#4285F4]', // Blue
    bgColor: 'bg-[#EAF1FE]', // Pale blue
    Visual: TechVisual
  },
  {
    id: 'creatives',
    index: '02',
    title: ['Creative', 'Design'],
    watermark: 'DESIGN',
    description: 'Crafting the visual identity and user experience. We bridge the gap between human psychology and digital interaction through stunning design and storytelling.',
    technologies: ['UI/UX', 'Graphic Design', 'Video Editing', 'Content Creation'],
    accentColor: 'text-[#EA4335]', // Red
    bgColor: 'bg-[#FCECEB]', // Pale red
    Visual: CreativesVisual
  },
  {
    id: 'outreach',
    index: '03',
    title: ['PR &', 'Outreach'],
    watermark: 'OUTREACH',
    description: 'Connecting our community with the world. We build strategic partnerships, manage communications, and ensure our message reaches the right audience at the right time.',
    technologies: ['Networking', 'Social Media', 'Sponsorships', 'Marketing'],
    accentColor: 'text-[#34A853]', // Green
    bgColor: 'bg-[#EBF6EE]', // Pale green
    Visual: OutreachVisual
  },
  {
    id: 'events',
    index: '04',
    title: ['Event', 'Management'],
    watermark: 'EVENTS',
    description: 'Orchestrating seamless experiences. From massive hackathons to intimate speaker sessions, we handle the logistics, planning, and execution that bring our events to life.',
    technologies: ['Logistics', 'Operations', 'Planning', 'Execution'],
    accentColor: 'text-[#FBBC04]', // Yellow
    bgColor: 'bg-[#FFF7E6]', // Pale yellow
    Visual: EventsVisual
  },
  {
    id: 'photography',
    index: '05',
    title: ['Photography', '& Media'],
    watermark: 'PHOTO',
    description: 'Capturing moments and telling visual stories. We document the community’s journey, events, and milestones through high-quality photography and videography.',
    technologies: ['Photography', 'Videography', 'Lightroom', 'Editing'],
    accentColor: 'text-[#4285F4]', // Blue
    bgColor: 'bg-[#EAF1FE]', // Pale blue
    Visual: PhotographyVisual
  }
];

// --- Reusable Component ---

const DomainRow = ({ domain, isEven }: { domain: typeof DOMAINS[0], isEven: boolean }) => {
  return (
    <section id={`domain-${domain.id}`} className={`relative w-full py-20 md:py-32 border-t-[3px] border-[#050505] transition-colors duration-700 ${domain.bgColor} overflow-hidden`}>

      {/* Massive Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none w-full flex justify-center items-center opacity-[0.03] z-0">
        <h2 className="text-[12rem] sm:text-[20rem] md:text-[28rem] lg:text-[40rem] font-black uppercase text-[#050505] tracking-tighter whitespace-nowrap leading-none">
          {domain.watermark}
        </h2>
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center`}>

        {/* Text Content */}
        <div className={`flex flex-col w-full ${isEven ? 'md:order-1' : 'md:order-2'}`}>
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            {/* Title */}
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-[#050505] uppercase tracking-tighter leading-[0.9] mb-6 md:mb-8"
            >
              {domain.title[0]}<br />
              <span className={domain.accentColor}>{domain.title[1]}</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-lg md:text-xl text-[#575550] max-w-md font-bold leading-relaxed mb-8"
            >
              {domain.description}
            </motion.p>

            {/* Mobile Visual (Visible only on small screens, inserted logically) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="block md:hidden w-full mb-10"
            >
              <domain.Visual />
            </motion.div>

            {/* Technologies */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              className="flex flex-wrap gap-2 mb-10 md:mb-12"
            >
              {domain.technologies.map(tech => (
                <motion.span
                  key={tech}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    show: { opacity: 1, scale: 1, transition: { duration: 0.4, type: "spring", stiffness: 200 } }
                  }}
                  className="px-3 py-1.5 text-xs font-black uppercase tracking-wider text-[#050505] border-[2px] border-[#050505] bg-white shadow-[2px_2px_0px_#050505]"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

          </motion.div>
        </div>

        {/* Desktop Visual Component (Visible only on medium screens and up) */}
        <div className={`hidden md:block w-full ${isEven ? 'md:order-2' : 'md:order-1'}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <domain.Visual />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

// --- Typewriter Hero Component ---

const TypewriterHero = ({ onReveal }: { onReveal: () => void }) => {
  const fullText = "OUR DOMAINS";
  const [displayed, setDisplayed] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        setTypingComplete(true);
        setTimeout(() => {
          setSlideUp(true);
          onReveal();
        }, 1200); // Wait for 1.2s after typing finishes before sliding up
      }
    }, 150); // Speed of typing

    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  const parts = displayed.split(' ');

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: slideUp ? "-100vh" : 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed inset-0 bg-[#F3F0E8] flex flex-col justify-center z-50 overflow-hidden ${slideUp ? 'pointer-events-none' : ''}`}
    >
      {/* Background Gridlines for the Curtain */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)`,
          backgroundSize: '4rem 4rem',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-5xl sm:text-7xl md:text-[9rem] font-black text-[#050505] tracking-tighter mb-8 uppercase leading-[0.85] min-h-[2.5em] md:min-h-[2em]">
            {parts[0]}<br />{parts.slice(1).join(' ')}
            <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} text-[#EA4335]`}>_</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: typingComplete ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="text-xl md:text-2xl text-[#575550] max-w-2xl font-bold leading-relaxed border-l-[4px] border-[#050505] pl-6"
          >
            Five focused tracks. Infinite possibilities. Where do you want to build?
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- Page Component ---

export default function Domains() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <>
      <Head>
        <title>Domains | GDGoc FIEM</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="relative min-h-screen bg-[#F3F0E8] font-sans selection:bg-[#050505] selection:text-[#F3F0E8] overflow-clip">
        {/* Background Gridlines */}
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)`,
            backgroundSize: '4rem 4rem',
          }}
        />

        <Navbar theme="light" />

        <TypewriterHero onReveal={() => setIsRevealed(true)} />

        {/* Alternating Domain Sections (Rendered when curtain lifts) */}
        {isRevealed && (
          <div className="w-full">
            {DOMAINS.map((domain, idx) => (
              <DomainRow key={domain.id} domain={domain} isEven={idx % 2 === 0} />
            ))}
          </div>
        )}

        {/* Bottom Call to Action */}
        <section className="relative w-full py-24 md:py-32 border-t-[3px] border-[#050505] bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-[#050505] uppercase tracking-tighter mb-6"
            >
              Meet the Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl font-bold text-[#575550] mb-12"
            >
              The builders, creators, and organizers behind the community.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="px-8 py-4 bg-[#050505] text-[#F3F0E8] font-black uppercase tracking-widest text-sm shadow-[6px_6px_0px_#4285F4] hover:shadow-[2px_2px_0px_#4285F4] hover:translate-x-1 hover:translate-y-1 transition-all border-[2px] border-[#050505]"
              onClick={() => window.location.href = '/teams'}
            >
              Explore Teams
            </motion.button>
          </div>
        </section>
      </main>
    </>
  );
}

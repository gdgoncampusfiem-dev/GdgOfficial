import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const items = [
  { text: "MACHINE LEARNING", icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /> },
  { text: "WEB ARCHITECTURE", icon: <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" /> },
  { text: "UI/UX DESIGN", icon: <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /> },
  { text: "OPEN SOURCE", icon: <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2" /> },
  { text: "SYSTEMS ENGINEERING", icon: <path d="M12 2v20M2 12h20" /> },
  { text: "CLOUD COMPUTING", icon: <path d="M17.5 19A4.5 4.5 0 0 0 18 10h-1.26A8 8 0 1 0 4 15.25" /> }
];

interface ParallaxTextProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex whitespace-nowrap gap-12 flex-nowrap items-center" style={{ x }}>
        {children}
      </motion.div>
    </div>
  );
}

export function Marquee() {
  const content = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full border-y border-black/10 py-4 mt-16 md:mt-24 bg-[#050505]/[0.02]">
      <ParallaxText baseVelocity={-2}>
        {content.map((item, i) => (
          <div key={i} className="flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase opacity-50">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              {item.icon}
            </svg>
            <span>{item.text}</span>
          </div>
        ))}
      </ParallaxText>
    </div>
  );
}

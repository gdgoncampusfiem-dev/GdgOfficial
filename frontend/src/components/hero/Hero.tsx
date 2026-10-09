import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative w-full h-screen bg-[#050505] overflow-hidden">
      {/* Chalkboard / Matte Slate Texture Base */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 48%, #090909ff 0%, #060606 60%, #020202 100%)'
        }}
      />

      {/* Subtle hand-rubbed chalk dust patina (toned down) */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none filter blur-[50px]"
        style={{
          backgroundImage: `
            radial-gradient(at 25% 25%, rgba(245, 242, 235, 0.06) 0px, transparent 50%),
            radial-gradient(at 78% 22%, rgba(245, 242, 235, 0.04) 0px, transparent 45%),
            radial-gradient(at 45% 72%, rgba(245, 242, 235, 0.05) 0px, transparent 55%),
            radial-gradient(at 80% 82%, rgba(245, 242, 235, 0.04) 0px, transparent 48%)
          `
        }}
      />

      {/* Micro Chalk Noise Texture (Softened Grain) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.15] mix-blend-screen pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="chalkGrain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="
              0 0 0 0 0.96
              0 0 0 0 0.94
              0 0 0 0 0.91
              0 0 0 1 0
            "
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#chalkGrain)" />
      </svg>

      {/* Organic Chalk Flecks & Dust Specks (Softened) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.09] mix-blend-screen pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="chalkDustSpecks">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.18"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="
              0 0 0 0 0.96
              0 0 0 0 0.94
              0 0 0 0 0.91
              0 0 0 3 -1.7
            "
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#chalkDustSpecks)" />
      </svg>

      {/* Perimeter Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.75) 100%)'
        }}
      />

      {/* Kolkata City Skyline rising from the extreme bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full flex justify-center items-end pointer-events-none select-none overflow-hidden z-10">
        <Image
          src="/kolkata-skyline-hd.png"
          alt="Kolkata City Skyline"
          width={4128}
          height={2304}
          priority
          className="w-full max-w-[2400px] min-w-[1000px] h-auto object-bottom mix-blend-screen pointer-events-none translate-y-[15%] opacity-50"
        />
      </div>
    </section>
  );
}



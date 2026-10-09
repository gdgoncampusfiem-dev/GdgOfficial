import "@fontsource/josefin-sans/100.css";
import "@fontsource/josefin-sans/200.css";
import "@fontsource/josefin-sans/300.css";
import "@fontsource/josefin-sans/400.css";
import "@fontsource/josefin-sans/700.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReactLenis } from 'lenis/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.06, 
        wheelMultiplier: 1, 
        smoothWheel: true, 
        syncTouch: true 
      }}
    >
      {/* Mobile Blocker Screen */}
      <div className="md:hidden fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center">
        <h1 className="text-white font-sans font-extralight tracking-widest uppercase text-sm">
          Under Development
        </h1>
      </div>
      
      {/* Desktop App */}
      <div className="hidden md:block">
        <Component {...pageProps} />
      </div>
    </ReactLenis>
  );
}

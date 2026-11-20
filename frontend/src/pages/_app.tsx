import "@fontsource/josefin-sans/100.css";
import "@fontsource/josefin-sans/200.css";
import "@fontsource/josefin-sans/300.css";
import "@fontsource/josefin-sans/400.css";
import "@fontsource/josefin-sans/700.css";
import "@/styles/globals.css";
import "@/styles/sponsor-deck.css";
import type { AppProps } from "next/app";
import { ReactLenis } from "lenis/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        wheelMultiplier: 0.9,
        smoothWheel: true,
        syncTouch: true,
      }}
    >
      <Component {...pageProps} />
    </ReactLenis>
  );
}

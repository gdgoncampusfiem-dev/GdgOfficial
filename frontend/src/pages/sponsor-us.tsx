import Head from "next/head";

import SponsorDeck from "@/components/sponsor/SponsorDeck";

export default function SponsorUsPage() {
  return (
    <>
      <Head>
        <title>Sponsor Us | GDG on Campus FIEM</title>
        <meta
          name="description"
          content="Partner with GDG on Campus FIEM. Placeholder sponsor stories will be replaced with verified quotes after review."
        />
      </Head>
      <SponsorDeck />
    </>
  );
}

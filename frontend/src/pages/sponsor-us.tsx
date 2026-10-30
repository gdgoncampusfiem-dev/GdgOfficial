import Head from "next/head";

import SponsorDeck from "@/components/sponsor/SponsorDeck";

export default function SponsorUsPage() {
  return (
    <>
      <Head>
        <title>Sponsor Us | GDG on Campus FIEM</title>
        <meta
          name="description"
          content="Explore partnership opportunities with GDG on Campus FIEM, from events and workshops to mentorship and community collaboration."
        />
      </Head>
      <SponsorDeck />
    </>
  );
}

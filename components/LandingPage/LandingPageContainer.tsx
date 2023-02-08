import Head from 'next/head';

import { CallToAction } from './CallToAction';
import { Faqs } from './Faqs';
import { Footer } from './Footer';
import { Header } from './Header';
import { Hero } from './Hero';
import { Pricing } from './Pricing';
import { PrimaryFeatures } from './PrimaryFeatures';
import { SecondaryFeatures } from './SecondaryFeatures';
import { Testimonials } from './Testimonials';

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Candirate - Interviewing made simple for recruiters and candidates
        </title>
        <meta
          name="description"
          content="There were no apps that could help to track and manage your interviews all in one place. Voila! We made it for you."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        {/* <SecondaryFeatures /> */}
        <CallToAction />
        {/* <Testimonials /> */}
        <Pricing />
        {/* <Faqs /> */}
      </main>
      <Footer />
    </>
  );
}

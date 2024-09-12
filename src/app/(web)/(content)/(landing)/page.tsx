import { createReader } from "@keystatic/core/reader";

import Events from "components/Landing/Events";
import Hero from "components/Landing/Hero";
import Stats from "components/Landing/Stats";
import Story from "components/Landing/Story";
import Footer from "components/shared/Footer";
import ConferenceBanner from "components/Landing/ConferenceBanner";

import keystaticConfig from "../../../../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Landing() {
  const landing = await reader.collections.landing.read("2024");
  let content;

  const {
    titles,
    subtitle,
    description,
    cta,
    ctaLink,
    mainSectionTitle,
    mainSectionSubtitle,
    mainSectionContent,
    mainSectionImage,
    mainButton,
    mainButtonLink,
    eventsSectionTitle,
    eventsSectionSubtitle,
    statsSectionTitle,
    statsSectionSubtitle,
    stats,
  } = landing ?? {};

  if (mainSectionContent) content = await mainSectionContent();

  return (
    <div className="container flex w-full flex-col items-center justify-center">
      <ConferenceBanner />

      <Hero
        ctaButtonText={cta}
        ctaButtonUrl={ctaLink}
        description={description}
        heroWords={titles}
        slackButtonText={mainButton}
        slackButtonUrl={mainButtonLink}
        subtitle={subtitle}
      />

      <Story content={content} image={mainSectionImage} subtitle={mainSectionSubtitle} title={mainSectionTitle} />
      <Stats stats={stats} subtitle={statsSectionSubtitle} title={statsSectionTitle} />
      <div className="flex w-full flex-col">
        <Events events={[]} subtitle={eventsSectionSubtitle} title={eventsSectionTitle} />
        <Footer />
      </div>
    </div>
  );
}

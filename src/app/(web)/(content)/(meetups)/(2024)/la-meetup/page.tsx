import { createReader } from "@keystatic/core/reader";
import { cache } from "react";

import OpenSpaceSummary from "components/Meetups/2024/OpenSpace";
import Agenda from "components/Meetups/2024/Agenda";
import Hero from "components/Meetups/2024/Hero";
import Sponsors from "components/Meetups/2024/Sponsors";
import Footer from "components/shared/Footer";
import Staff from "components/Meetups/2024/Staff";
import CommunitiesCarousel from "components/Meetups/2024/Communities";
import Introduction from "components/Meetups/2024/Introduction";
import { SectionKey } from "components/shared/Navbar/navSections";
import Gallery from "components/Meetups/2024/Gallery";

import keystaticConfig from "../../../../../../../keystatic.config";

import getAgenda from "./services/getAgenda";
import getMeetup from "./services/getMeetup";
import getGallery from "./services/getGallery";

export const metadata = {
  title: "La Meetup 2024 | OWU Uruguay",
  description:
    "La Meetup ofrece un espacio para reunirnos en persona y conectar con comunidades de tecnología uruguayas.",
};

const reader = cache(() => {
  return createReader(process.cwd(), keystaticConfig);
});

export default async function LaMeetup2024Page() {
  const laMeetup = await reader().collections.laMeetup2024.read(SectionKey.MeetupEvent);
  let content;

  const {
    title,
    subtitle,
    date,
    location,
    locationUrl,
    primaryButtonName,
    primaryButtonUrl,
    secondaryButtonName,
    secondaryButtonUrl,
    ctaText,
    ctaUrl,
    agendaTitle,
    agendaSubtitle,
    // speakersTitle,
    // speakersSubtitle,
    openSpaceTitle,
    openSpaceSubtitle,
    openSpaceDescription,
    openSpacePrimaryButtonName,
    openSpacePrimaryButtonUrl,
    sponsorsTitle,
    sponsorsSubtitle,
    staffTitle,
    staffSubtitle,
    communitiesTitle,
    communitiesSubtitle,
  } = laMeetup ?? {};

  if (openSpaceDescription) content = await openSpaceDescription();

  const { docs: agenda } = await getAgenda();

  const { docs: meetup } = await getMeetup();

  const { docs: gallery } = await getGallery();

  const { staff, openspaceGallery, sponsors, communities } = meetup[0] ?? {
    staff: [],
    communities: [],
    speakers: [],
    sponsors: [],
    openspaceGallery: [],
  };

  return (
    <div className="container flex w-full flex-col items-center justify-center gap-12 self-center xl:gap-28">
      <Hero
        ctaText={ctaText}
        ctaUrl={ctaUrl}
        date={date}
        location={location}
        locationUrl={locationUrl}
        primaryButtonName={primaryButtonName}
        primaryButtonUrl={primaryButtonUrl}
        secondaryButtonName={secondaryButtonName}
        secondaryButtonUrl={secondaryButtonUrl}
        sponsors={sponsors}
        subtitle={subtitle}
        title={title}
      />
      <Introduction />
      <Agenda agenda={agenda} subtitle={agendaSubtitle} title={agendaTitle} />
      <OpenSpaceSummary
        content={content}
        gallery={openspaceGallery}
        primaryButtonName={openSpacePrimaryButtonName}
        primaryButtonUrl={openSpacePrimaryButtonUrl}
        subtitle={openSpaceSubtitle}
        title={openSpaceTitle}
      />
      <Gallery gallery={gallery} />
      <Sponsors sponsors={sponsors} subtitle={sponsorsSubtitle} title={sponsorsTitle} />
      <Staff staff={staff} subtitle={staffSubtitle} title={staffTitle} />
      <CommunitiesCarousel communities={communities} subtitle={communitiesSubtitle} title={communitiesTitle} />
      <Footer />
    </div>
  );
}

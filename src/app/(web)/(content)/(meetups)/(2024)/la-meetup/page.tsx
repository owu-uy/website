import { createReader } from "@keystatic/core/reader";
import { cache } from "react";

import OpenSpace from "components/Meetups/2024/OpenSpace";
import Agenda from "components/Meetups/2024/Agenda";
import Hero from "components/Meetups/2024/Hero";
// import Speakers from "components/Meetups/2024/Speakers";
import Sponsors from "components/Meetups/2024/Sponsors";
// import Gallery from "components/Meetups/2024/Gallery";
import Footer from "components/shared/Footer";
import Staff from "components/Meetups/2024/Staff";
// import Communities from "components/Meetups/2024/Communities";
import Introduction from "components/Meetups/2024/Introduction";

import keystaticConfig from "../../../../../../../keystatic.config";

import getAgenda from "./services/getAgenda";
import getMeetup from "./services/getMeetup";

export const metadata = {
  title: "La Meetup 2024 | OWU Uruguay",
  description:
    "La Meetup ofrece un espacio para reunirnos en persona y conectar con comunidades de tecnología uruguayas.",
};

const reader = cache(() => {
  return createReader(process.cwd(), keystaticConfig);
});

export default async function LaMeetup2024Page() {
  const laMeetup = await reader().collections.laMeetup2024.read("la-meetup");
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
    // communitiesTitle,
    // communitiesSubtitle,
  } = laMeetup ?? {};

  if (openSpaceDescription) content = await openSpaceDescription();

  const { docs: agenda } = await getAgenda();

  const { docs: meetup } = await getMeetup();

  const { staff, openspaceGallery, sponsors } = meetup[0] ?? {
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
        subtitle={subtitle}
        title={title}
      />
      <Introduction />
      <Agenda agenda={agenda} subtitle={agendaSubtitle} title={agendaTitle} />
      {/* TODO: Manually enable Speakers once the data is loaded */}
      {/* <Speakers speakers={speakers} subtitle={speakersSubtitle} title={speakersTitle} /> */}
      <OpenSpace
        content={content}
        gallery={openspaceGallery}
        primaryButtonName={openSpacePrimaryButtonName}
        primaryButtonUrl={openSpacePrimaryButtonUrl}
        subtitle={openSpaceSubtitle}
        title={openSpaceTitle}
      />
      <Sponsors sponsors={sponsors} subtitle={sponsorsSubtitle} title={sponsorsTitle} />
      {/* TODO: Manually enable gallery after La Meetup ends and pictures are loaded */}
      {/* <Gallery /> */}
      <Staff staff={staff} subtitle={staffSubtitle} title={staffTitle} />
      {/* <Communities communities={communities} subtitle={communitiesSubtitle} title={communitiesTitle} /> */}
      <Footer />
    </div>
  );
}

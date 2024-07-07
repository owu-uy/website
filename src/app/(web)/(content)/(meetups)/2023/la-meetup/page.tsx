import { LA_MEETUP } from "app/lib/constants";
import Communities from "components/Meetups/2023/Communities";
import CoductCode from "components/Meetups/2023/ConductCode";
import Hero from "components/Meetups/2023/Hero";
import OpenSpace from "components/Meetups/2023/OpenSpace";
import Agenda from "components/Meetups/2023/Agenda";
import Speakers from "components/Meetups/2023/Speakers";
import Sponsors from "components/Meetups/2023/Sponsors";
import Staff from "components/Meetups/2023/Staff";
import Footer from "components/shared/Footer";

// TODO: This is temporary and structured in this way for future implementation of a CMS
const {
  title,
  subtitle,
  date,
  location,
  location_url,
  agenda: { scheduleTitle, scheduleList },
  speakers: { speakersTitle, speakersSubtitle, speakersList },
  openSpace: {
    openSpaceTitle,
    openSpaceHowToParticipateDescription,
    openSpaceHowToParticipateTitle,
    openSpaceIPresentDescription,
    openSpaceSubtitle,
    openSpaceIPresentTitle,
    openSpaceLetsDiscussDescription,
    openSpaceLetsDiscussTitle,
    openSpaceStages,
  },
  sponsors: { sponsorsList, sponsorsSubtitle, sponsorsTitle },
  communities: { communitiesList, communitiesSubtitle, communitiesTitle },
  staff: { staffList, staffSubtitle, staffTitle },
  conductCode: {
    conductCodeTitle,
    conductCodeSubtitle,
    conductCodeIntroduction,
    conductCodeExpectations,
    conductCodeUnacceptableBehaviors,
    conductCodeConsequences,
    conductCodeParticipationAgreement,
    conductCodeScope,
  },
  seo,
} = LA_MEETUP;

export const metadata = {
  title: seo.title,
  description: seo.description,
};

export default function LaMeetup2023() {
  return (
    <div className="container flex w-full flex-col items-center justify-center self-center">
      <Hero date={date} location={location} locationHref={location_url} subtitle={subtitle} title={title} />
      <Agenda agenda={scheduleList} title={scheduleTitle} />
      <Speakers speakers={speakersList} subtitle={speakersSubtitle} title={speakersTitle} />
      <OpenSpace
        howToParticipateDescription={openSpaceHowToParticipateDescription}
        howToParticipateTitle={openSpaceHowToParticipateTitle}
        iPresentDescription={openSpaceIPresentDescription}
        iPresentTitle={openSpaceIPresentTitle}
        letsDiscussDescription={openSpaceLetsDiscussDescription}
        letsDiscussTitle={openSpaceLetsDiscussTitle}
        stages={openSpaceStages}
        subtitle={openSpaceSubtitle}
        title={openSpaceTitle}
      />
      <Sponsors sponsors={sponsorsList} subtitle={sponsorsSubtitle} title={sponsorsTitle} />
      <Communities communities={communitiesList} subtitle={communitiesSubtitle} title={communitiesTitle} />
      <Staff staff={staffList} subtitle={staffSubtitle} title={staffTitle} />
      <CoductCode
        consequences={conductCodeConsequences}
        expectations={conductCodeExpectations}
        introduction={conductCodeIntroduction}
        participationAgreement={conductCodeParticipationAgreement}
        scope={conductCodeScope}
        subtitle={conductCodeSubtitle}
        title={conductCodeTitle}
        unacceptableBehaviors={conductCodeUnacceptableBehaviors}
      />
      <Footer />
    </div>
  );
}

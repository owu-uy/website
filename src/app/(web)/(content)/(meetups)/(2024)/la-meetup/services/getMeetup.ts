import { getPayloadHMR } from "@payloadcms/next/utilities";

import configPromise from "../../../../../../../admin/payload.config";

type Meetup = {
  docs: {
    id: number;
    name: string;
    date: Date;
    location: string;
    subtitle: string;
    primaryButtonName: string;
    primaryButtonUrl: string;
    secondaryButtonName: string;
    secondaryButtonUrl: string;
    ctaText: string;
    ctaUrl: string;
    agendaTitle: string;
    agendaSubtitle: string;
    speakersTitle: string;
    speakersSubtitle: string;
    speakers?: {
      firstname: string;
      lastname: string;
      picture: {
        url: string;
      };
      jobtitle: string;
    }[];
    openSpaceTitle: string;
    openSpaceSubtitle: string;
    openSpaceDescription: string;
    openSpacePrimaryButtonName: string;
    openSpacePrimaryButtonUrl: string;
    sponsorsTitle: string;
    sponsorsSubtitle: string;
    sponsors?: {
      name: string;
      logo: {
        url: string;
      };
      website?: string;
    }[];
    staffTitle: string;
    staffSubtitle: string;
    staff?: {
      firstname: string;
      lastname: string;
      picture: {
        url: string;
      };
      jobtitle: string;
    }[];
    communitiesTitle: string;
    communitiesSubtitle: string;
    communities?: {
      name: string;
      logo: {
        url: string;
      };
      website?: string;
    }[];
    openspaceGallery?: {
      id: string;
      url: string;
      alt: string;
    }[];
  }[];
};

export default async function getMeetup() {
  const payload = await getPayloadHMR({ config: configPromise });
  const meetup = await payload.find({
    collection: "meetups",
  });

  // TODO: Use the payload types to define the return type of this function
  return meetup as unknown as Meetup;
}

import { getPayloadHMR } from "@payloadcms/next/utilities";
import { type ElementNode } from "@payloadcms/richtext-slate";

import configPromise from "admin/payload.config";

type Agenda = {
  docs?: {
    id: number;
    title: string;
    richText: ElementNode[];
    startTime: Date;
    endTime: Date;
    presenter?: {
      firstname: string;
      lastname: string;
      picture: {
        url: string;
      };
    };
    location?: {
      name: string;
      capacity: number;
    };
    attendees?: {
      name: string;
      image: string;
    }[];
  }[];
};

export default async function getAgenda(): Promise<Agenda> {
  const payload = await getPayloadHMR({ config: configPromise });
  const meetup = await payload.find({
    collection: "agenda",
    sort: "startTime",
  });

  // TODO: Use the payload types here to define the return type of this function
  return meetup as unknown as Agenda;
}

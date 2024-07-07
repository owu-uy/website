import { type ElementNode } from "@payloadcms/richtext-slate";

import { PAYLOAD_API_URL } from "app/lib/constants";

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
  const res = await fetch(`${PAYLOAD_API_URL}/api/admin/agenda?sort=startTime`, {
    next: { tags: ["agenda"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch agenda");
  }

  return await res.json();
}

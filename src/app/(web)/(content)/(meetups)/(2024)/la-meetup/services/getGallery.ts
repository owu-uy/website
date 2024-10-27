import { getPayloadHMR } from "@payloadcms/next/utilities";

import configPromise from "admin/payload.config";

type Gallery = {
  docs: {
    id: string;
    image: {
      url: string;
    };
    alt?: string;
  }[];
};

export default async function getGallery(): Promise<Gallery> {
  const payload = await getPayloadHMR({ config: configPromise });
  const gallery = await payload.find({
    collection: "la-meetup-2024-gallery",
  });

  // TODO: Use the payload types here to define the return type of this function
  return gallery as unknown as Gallery;
}

import type { CollectionConfig } from "payload";

import { revalidatePath } from "next/cache";

export const LaMeetup2024Gallery: CollectionConfig = {
  slug: "la-meetup-2024-gallery",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "image",
      label: "Image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "alt",
      label: "Image Alt Text",
      type: "text",
    },
  ],
  hooks: {
    afterChange: [
      () => {
        revalidatePath("/la-meetup");
      },
    ],
  },
};

export default LaMeetup2024Gallery;

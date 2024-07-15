import type { CollectionConfig } from "payload";

import { revalidatePath } from "next/cache";

import formatSlug from "../utils/formatSlug";

export const Communities: CollectionConfig = {
  slug: "communities",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "picture",
      label: "Picture",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "slack",
      label: "Slack",
      type: "text",
    },
    {
      name: "linkedin",
      label: "LinkedIn",
      type: "text",
    },
    {
      name: "github",
      label: "GitHub",
      type: "text",
    },
    {
      name: "website",
      label: "Website",
      type: "text",
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [formatSlug("title")],
        afterChange: [
          () => {
            revalidatePath("/la-meetup");
          },
        ],
      },
    },
  ],
};

export default Communities;

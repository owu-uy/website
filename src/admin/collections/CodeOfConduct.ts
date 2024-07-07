import type { CollectionConfig } from "payload";

import formatSlug from "../utils/formatSlug";

export const CodeOfConduct: CollectionConfig = {
  slug: "code-of-conduct",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      label: "Content",
      required: true,
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
      },
    },
  ],
};

export default CodeOfConduct;

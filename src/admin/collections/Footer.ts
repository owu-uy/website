import type { CollectionConfig } from "payload";

export const Footer: CollectionConfig = {
  slug: "footer",
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
      name: "href",
      label: "Href",
      type: "text",
      required: true,
    },
  ],
};

export default Footer;

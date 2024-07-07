import type { CollectionConfig } from "payload";

export const Navbar: CollectionConfig = {
  slug: "navbar",
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

export default Navbar;

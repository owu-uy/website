import type { CollectionConfig } from "payload";

export const Stats: CollectionConfig = {
  slug: "stats",
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
      name: "subtitle",
      label: "Subtitle",
      type: "text",
      required: true,
    },
    {
      name: "count",
      label: "Count",
      type: "number",
      required: true,
      min: 0,
    },
  ],
};

export default Stats;

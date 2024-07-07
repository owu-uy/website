import type { CollectionConfig } from "payload";

export const Agenda: CollectionConfig = {
  slug: "agenda",
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
      name: "richText",
      type: "richText",
      label: "Description",
    },
    {
      name: "startTime",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "timeOnly",
          displayFormat: "HH:mm",
        },
      },
    },
    {
      name: "endTime",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "timeOnly",
          displayFormat: "HH:mm",
        },
      },
    },
    {
      name: "location",
      type: "relationship",
      relationTo: "locations",
    },
    {
      name: "presenter",
      type: "relationship",
      relationTo: "members",
      hasMany: false,
    },
    {
      name: "attendees",
      type: "relationship",
      relationTo: "members",
      hasMany: true,
    },
  ],
};

export default Agenda;

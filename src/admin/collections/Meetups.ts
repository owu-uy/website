import type { CollectionConfig } from "payload";

import { revalidatePath } from "next/cache";

import formatSlug from "../utils/formatSlug";

export const Meetups: CollectionConfig = {
  slug: "meetups",
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
      name: "location",
      label: "Location",
      type: "text",
      required: true,
    },
    {
      name: "start",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "dd/MM/yyyy HH:mm",
        },
      },
      required: true,
    },
    {
      name: "end",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "dd/MM/yyyy HH:mm",
        },
      },
      required: true,
    },
    {
      name: "banner",
      label: "Banner",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "speakers",
      type: "relationship",
      relationTo: "members",
      hasMany: true,
    },
    {
      name: "communities",
      type: "relationship",
      relationTo: "communities",
      hasMany: true,
    },
    {
      name: "staff",
      type: "relationship",
      relationTo: "members",
      hasMany: true,
    },
    {
      name: "sponsors",
      type: "relationship",
      relationTo: "sponsors",
      hasMany: true,
    },
    {
      name: "openspaceGallery",
      label: "Open Space Gallery",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [formatSlug("name")],
      },
    },
  ],
  hooks: {
    afterChange: [
      () => {
        revalidatePath("/");
        revalidatePath("/la-meetup");
      },
    ],
  },
};

export default Meetups;

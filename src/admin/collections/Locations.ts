import type { CollectionConfig } from "payload";

import { revalidatePath } from "next/cache";

export const Locations: CollectionConfig = {
  slug: "locations",
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
      name: "capacity",
      label: "Capacity",
      type: "number",
      required: true,
    },
    {
      name: "resources",
      type: "select",
      hasMany: true,
      admin: {
        isClearable: true,
        isSortable: true,
      },
      options: [
        {
          label: "Chairs",
          value: "chairs",
        },
        {
          label: "TV",
          value: "tv",
        },
      ],
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

export default Locations;

import type { CollectionConfig } from "payload";

import { revalidatePath } from "next/cache";

import formatSlug from "../utils/formatSlug";

export const Members: CollectionConfig = {
  slug: "members",
  admin: {
    useAsTitle: "lastname",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "firstname",
      label: "First Name",
      type: "text",
      required: true,
    },
    {
      name: "lastname",
      label: "Last Name",
      type: "text",
    },
    {
      name: "picture",
      label: "Picture",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "jobtitle",
      label: "Job Title",
      type: "text",
    },
    {
      name: "slackprofile",
      label: "Slack Profile",
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
      name: "twitter",
      label: "Twitter",
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

export default Members;

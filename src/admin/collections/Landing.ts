import type { CollectionConfig } from "payload";

export const Landing: CollectionConfig = {
  slug: "landing",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      label: "Titles",
      type: "array",
      fields: [
        {
          name: "text",
          label: "Title",
          type: "text",
        },
      ],
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: true,
    },
    {
      name: "main_button",
      label: "Main Button Text",
      type: "text",
      required: true,
    },
    {
      name: "main_button_link",
      label: "Main Button Link",
      type: "text",
      required: true,
      defaultValue: "#",
    },
    {
      name: "cta",
      label: "Call to Action Text",
      type: "text",
      required: true,
    },
    {
      name: "cta_link",
      label: "Call to Action Link",
      type: "text",
      required: true,
    },
    {
      name: "main_section_title",
      label: "Main Section Title",
      type: "text",
      required: true,
      defaultValue: "¿Qué es OWU Uruguay?",
    },
    {
      name: "main_section_subtitle",
      label: "Main Section Subtitle",
      type: "text",
      required: true,
      defaultValue: "Nuestra Historia",
    },
    {
      name: "main_section_content",
      label: "Main Section Content",
      type: "richText",
      required: true,
    },
    {
      name: "main_section_image",
      label: "Main Section Image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "stats_section_title",
      label: "Stats Section Title",
      type: "text",
      required: true,
      defaultValue: "Nuestra comunidad en cifras",
    },
    {
      name: "stats_section_subtitle",
      label: "Stats Section Subtitle",
      type: "text",
      required: true,
      defaultValue: "Creciendo juntos, nuestra comunidad en números",
    },
    {
      name: "stats",
      label: "Stats",
      type: "relationship",
      relationTo: "stats",
      hasMany: true,
      required: true,
    },
    {
      name: "events_section_title",
      label: "Events Section Title",
      type: "text",
      required: true,
      defaultValue: "Eventos de la comunidad",
    },
    {
      name: "events_section_subtitle",
      label: "Events Section Subtitle",
      type: "text",
      required: true,
      defaultValue: "Próximos eventos",
    },
    {
      name: "events",
      label: "Events",
      type: "relationship",
      relationTo: "meetups",
      hasMany: true,
    },
  ],
};

export default Landing;

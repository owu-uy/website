import { collection, fields } from "@keystatic/core";

export const laMeetup2024 = collection({
  label: "La Meetup 2024 - Landing",
  slugField: "slug",
  schema: {
    slug: fields.slug({ name: { label: "Slug", validation: { isRequired: true } } }),
    title: fields.text({ label: "Title", validation: { isRequired: true } }),
    subtitle: fields.text({ label: "Subtitle", validation: { isRequired: true } }),
    date: fields.date({ label: "Date", validation: { isRequired: true } }),
    location: fields.text({ label: "Location", validation: { isRequired: true } }),
    locationUrl: fields.text({ label: "Location URL", validation: { isRequired: true } }),
    primaryButtonName: fields.text({ label: "Primary Button Name", validation: { isRequired: true } }),
    primaryButtonUrl: fields.text({ label: "Primary Button Url", validation: { isRequired: true } }),
    secondaryButtonName: fields.text({ label: "Secondary Button Name", validation: { isRequired: true } }),
    secondaryButtonUrl: fields.text({
      label: "Secondary Button Url",
      validation: {
        isRequired: true,
      },
    }),
    ctaText: fields.text({ label: "CTA Text", validation: { isRequired: true } }),
    ctaUrl: fields.text({ label: "CTA Url", validation: { isRequired: true } }),
    agendaTitle: fields.text({ label: "Agenda Title", validation: { isRequired: true } }),
    agendaSubtitle: fields.text({ label: "Agenda Subtitle", validation: { isRequired: true } }),
    speakersTitle: fields.text({ label: "Speakers Title", validation: { isRequired: true } }),
    speakersSubtitle: fields.text({ label: "Speakers Subtitle", validation: { isRequired: true } }),
    openSpaceTitle: fields.text({ label: "Open Space Title", validation: { isRequired: true } }),
    openSpaceSubtitle: fields.text({ label: "Open Space Subtitle", validation: { isRequired: true } }),
    openSpaceDescription: fields.mdx({
      label: "Open Space Description",
      extension: "md",
    }),
    openSpacePrimaryButtonName: fields.text({
      label: "Open Space Primary Button Name",
      validation: { isRequired: true },
    }),
    openSpacePrimaryButtonUrl: fields.text({
      label: "Open Space Primary Button Url",
      validation: { isRequired: true },
    }),
    sponsorsTitle: fields.text({ label: "Sponsors Title", validation: { isRequired: true } }),
    sponsorsSubtitle: fields.text({ label: "Sponsors Subtitle", validation: { isRequired: true } }),
    communitiesTitle: fields.text({ label: "Communities Title", validation: { isRequired: true } }),
    communitiesSubtitle: fields.text({ label: "Communities Subtitle", validation: { isRequired: true } }),
    staffTitle: fields.text({ label: "Staff Title", validation: { isRequired: true } }),
    staffSubtitle: fields.text({ label: "Staff Subtitle", validation: { isRequired: true } }),
  },
  path: "content/la-meetup-2024/*/",
});

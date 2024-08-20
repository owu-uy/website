export interface Section {
  id: string;
  link: string;
  title: string;
}

export enum SectionKey {
  Hero = "inicio",
  Story = "historia",
  Stats = "estadisticas",
  Events = "eventos",
  CurrentEvent = "la-meetup",
}

export const navSections: Record<SectionKey, Section> = {
  [SectionKey.Hero]: { title: "Inicio", link: "/#inicio", id: SectionKey.Hero },
  [SectionKey.Story]: { title: "Historia", link: "/#historia", id: SectionKey.Story },
  [SectionKey.Stats]: { title: "Estadísticas", link: "/#estadisticas", id: SectionKey.Stats },
  [SectionKey.Events]: { title: "Eventos", link: "/#eventos", id: SectionKey.Events },
  [SectionKey.CurrentEvent]: { title: "La Meetup 2024", link: "/la-meetup", id: SectionKey.CurrentEvent },
};

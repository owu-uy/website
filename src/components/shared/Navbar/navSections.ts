export interface Section {
  id: string;
  link: string;
  title: string;
}

export const navSections: Section[] = [
  { title: "Inicio", link: "/#inicio", id: "inicio" },
  { title: "Historia", link: "/#historia", id: "historia" },
  { title: "Estadísticas", link: "/#estadisticas", id: "estadisticas" },
  { title: "Eventos", link: "/#eventos", id: "eventos" },
  { title: "La Meetup 2024", link: "/la-meetup", id: "la-meetup" },
];

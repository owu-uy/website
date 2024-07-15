export interface NavLink {
  title: string;
  link: string;
}

export const navLinks: NavLink[] = [
  { title: "Inicio", link: "/" },
  { title: "Historia", link: "/#historia" },
  { title: "Estadísticas", link: "/#estadisticas" },
  { title: "Eventos", link: "/#eventos" },
  { title: "La Meetup 2024", link: "/la-meetup" },
];

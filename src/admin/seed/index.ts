import type { Payload } from "payload";

import path from "path";

// WARNING/REMINDER: Please change the email and password to your own after seeding the data into production environment!
export const seed = async (payload: Payload) => {
  await payload.create({
    collection: "users",
    data: {
      email: "admin@owu.uy",
      password: "admin",
    },
  });

  const { id: carpinchoImageID } = await payload.create({
    collection: "media",
    filePath: path.resolve(__dirname, "images/carpincho.png"),
    data: {
      alt: "Logo Carpincho",
    },
  });

  const { id: statID } = await payload.create({
    collection: "stats",
    data: {
      title: "Meetups",
      subtitle: "coordinadas",
      count: 20,
    },
  });

  const { id: statID2 } = await payload.create({
    collection: "stats",
    data: {
      title: "Personas",
      subtitle: "conectadas",
      count: 3800,
    },
  });

  const { id: statID3 } = await payload.create({
    collection: "stats",
    data: {
      title: "Personas",
      subtitle: "activas diariamente",
      count: 500,
    },
  });

  const { id: statID4 } = await payload.create({
    collection: "stats",
    data: {
      title: "Años",
      subtitle: "desde su creación",
      count: 9,
    },
  });

  await payload.create({
    collection: "landing",
    data: {
      title: [
        {
          text: "Aprendemoss",
        },
      ],
      subtitle: "en OWU",
      description: "Un espacio donde personas del rubro IT se reunen, comparten y convierten sus ideas en realidad",
      main_button: "¡Sumate a la Comunidad!",
      main_button_link: "https://slack.owu.uy/",
      cta: "¡Conocé nuestra historia y próximos eventos!",
      cta_link: "/#historia",
      main_section_title: "¿Qué es OWU Uruguay?",
      main_section_subtitle: "Nuestra Historia",
      main_section_content: [
        {
          children: [
            {
              bold: true,
              text: "OWU",
            },
            {
              text: " es una de las principales comunidades de desarrolladores en Uruguay. Originada como una organización de Slack para facilitar la organización de la JSConfUY 2014.\n",
            },
          ],
        },
        {
          children: [
            {
              text: "Se ha popularizado abarcando actualmente diversas subcomunidades, entre las que se incluyen la comunidad de Ruby, JavaScript, Angular, Node, React, testing, devops, data y otras.",
            },
          ],
        },
        {
          children: [
            {
              text: "Esta comunidad ha evolucionado de manera orgánica y en la actualidad cuenta con una robusta membresía de más de 3.400 personas, de las cuales más de 500 participan activamente a diario.\n",
            },
          ],
        },
        {
          children: [
            {
              text: "A través de la comunidad se promueve la organización de meetups y eventos relacionados con el desarrollo de software. Brindando además una vía a través de la que profesionales del sector buscan y brindan ayuda, comparten noticias, propuestas de trabajo, opiniones y todo ello en un entorno de interacción continua y de autogestión.",
            },
          ],
        },
      ],
      main_section_image: Number(carpinchoImageID),
      stats_section_title: "Nuestra comunidad en cifras",
      stats_section_subtitle: "Creciendo juntos, nuestra comunidad en números",
      stats: [Number(statID), Number(statID2), Number(statID3), Number(statID4)],
      events_section_title: "Eventos de la comunidad",
      events_section_subtitle: "Próximos eventos",
    },
  });
};

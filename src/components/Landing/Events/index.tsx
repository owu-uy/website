"use client";

import { SectionKey } from "components/shared/Navbar/navSections";
import { useNavigationContext } from "components/shared/Navbar/navigationProvider";

import Event from "../Event";

type EventsProps = {
  title?: string;
  subtitle?: string;
  events?: {
    id: string;
    name: string;
    description: string;
    banner: {
      url: string;
    };
    location: string;
    start: string;
    slug: string;
  }[];
};

export default function Events({ title, subtitle, events }: EventsProps) {
  const { sectionsRefs } = useNavigationContext();

  return (
    <section
      ref={sectionsRefs[SectionKey.Events]}
      className="relative flex min-h-[800px] w-full flex-col justify-center gap-8 self-center pt-20 text-white"
      id={SectionKey.Events}
    >
      <span className="flex flex-col gap-1">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">{title}</h2>
        <h3 className="text-center text-zinc-400">{subtitle}</h3>
      </span>
      {!!events?.length ? (
        <ol className="flex w-full flex-row flex-wrap justify-center gap-4">
          {events.map(({ id, name, description, banner, location, start, slug }) => (
            <Event
              key={id}
              banner_alt=""
              banner_image={banner.url}
              description={description}
              location={location}
              slug={slug}
              start={start}
              title={name}
            />
          ))}
        </ol>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-5">
          <img alt="Calendario Triste" className="w-full max-w-[300px]" src="/sad_calendar.svg" />
          <span className="flex flex-col items-center justify-center">
            <h2 className="text-center text-lg font-semibold">¡Lo sentimos!</h2>
            <h3 className="text-center text-lg">No se han encontrado eventos</h3>
          </span>
        </div>
      )}
      <div className="position absolute bottom-1 z-[-1] hidden w-full max-w-[1200px] flex-row items-end justify-between self-center xl:flex">
        <img alt="Ilustración de una mujer" className="max-h-[380px]" src="/girl.svg" />
        <img alt="Ilustración de un hombre" className="max-h-[380px]" src="/man.svg" />
      </div>
    </section>
  );
}

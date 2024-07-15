import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";

type EventProps = {
  title: string;
  location: string;
  start: string;
  description: string;
  banner_image: string;
  banner_alt: string;
  slug: string;
};

export default function Event({ title, location, start, description, banner_image, banner_alt }: EventProps) {
  return (
    <li className="group flex w-full min-w-0 cursor-pointer gap-3 rounded-md bg-white/10 text-white sm:max-w-[360px]">
      <Link className="w-full" href="/la-meetup">
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 rounded-md bg-[#36393e] p-4 group-hover:bg-[#000214]/10">
          <span className="flex flex-row items-center justify-between">
            <span className="flex flex-col items-start">
              <h3 className="truncate text-center text-base">{title}</h3>
              <h3 className="truncate text-center text-xs text-zinc-400">{location}</h3>
            </span>
            <p>
              <time
                className="hidden flex-col items-center justify-center rounded-xl border border-zinc-400 text-center text-xs capitalize sm:flex sm:min-h-[55px] sm:min-w-[55px] sm:text-sm"
                dateTime={start}
              >
                {format(parseISO(start), "MMM", { locale: es })}
                <br />
                {format(parseISO(start), "dd", {
                  locale: es,
                })}
              </time>
            </p>
          </span>
          <p className="line-clamp-4 text-sm text-zinc-400">{description}</p>
          <span className="relative flex h-[180px] w-full flex-col items-center justify-center">
            <Image fill alt={banner_alt} className="w-full rounded-md object-cover" loading="lazy" src={banner_image} />
          </span>
        </div>
      </Link>
    </li>
  );
}

"use client";

import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import { FaCalendarAlt, FaChevronDown, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa6";
import { useEffect, useState } from "react";

import CountdownTimer from "components/Landing/CountdownTimer";

import TicketHome from "../TicketHome";

type HeroProps = {
  title?: string;
  subtitle?: string;
  date?: string;
  location?: string;
  locationUrl?: string;
  primaryButtonName?: string;
  primaryButtonUrl?: string;
  secondaryButtonName?: string;
  secondaryButtonUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  sponsors?: any[];
};

export default function Hero({
  title,
  subtitle,
  date,
  location,
  locationUrl = "#",
  primaryButtonName,
  primaryButtonUrl = "#",
  secondaryButtonName,
  secondaryButtonUrl = "#",
  ctaText,
  ctaUrl = "#",
  sponsors,
}: HeroProps) {
  // State variable to track if current date is after September 23, 2024, at 11:00 am
  const [isAfterSep232024, setIsAfterSep232024] = useState<boolean | null>(null);

  useEffect(() => {
    setIsAfterSep232024(false);
    const targetDate = new Date("2024-09-23T11:00:00");
    const now = new Date();
    const timeUntilTarget = targetDate.getTime() - now.getTime();

    if (timeUntilTarget > 0) {
      // Set a timeout to update the state when the target date is reached
      const timeoutId = setTimeout(() => {
        setIsAfterSep232024(true);
      }, timeUntilTarget);

      // Clean up the timeout if the component unmounts before the timeout fires
      return () => clearTimeout(timeoutId);
    } else {
      // If the target date is already passed, set the state to true
      setIsAfterSep232024(true);
    }
  }, []);

  return (
    <section
      className="relative flex min-h-[calc(100dvh-56px)] w-full flex-1 flex-col items-center justify-center"
      id="inicio"
    >
      <div className="flex w-full flex-row flex-wrap-reverse items-center justify-center gap-8 xl:flex-nowrap">
        <div className="flex w-full max-w-[550px] flex-col items-center justify-center gap-8">
          <img
            alt="carpincho"
            className="hidden w-full max-w-[250px] gap-4 xl:flex xl:max-w-[500px]"
            src="/carpincho.png"
          />
          {/* Enable this CountdownTimer after September 23, 2024 */}
          <div className="hidden h-[184px] w-full items-center justify-center xl:flex">
            <CountdownTimer
              targetDate={isAfterSep232024 ? "2024-10-19T09:00:00" : "2024-09-23T11:00:00"}
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/prefer-nullish-coalescing
              title={
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/no-unnecessary-condition
                isAfterSep232024 === null
                  ? "‎"
                  : isAfterSep232024
                    ? "La Meetup comienza en:"
                    : "Entradas disponibles en:"
              }
            />
          </div>
        </div>
        <div className="flex min-h-[calc(100dvh-56px)] w-full max-w-[650px] flex-col items-center justify-center">
          <h1 className="mb-12 text-center text-7xl font-black uppercase italic leading-none text-primary text-yellow-400 xl:mb-6 xl:text-[80px]">
            {title}
            <span className="block text-7xl uppercase lg:text-8xl xl:text-9xl">{subtitle}</span>
          </h1>
          <div className="flex w-full flex-col gap-10 xl:gap-2">
            <span className="flex w-full flex-col items-center justify-center">
              <h2 className="animate-fadeIn animate-delay-200 text-center text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
                {date
                  ? format(parseISO(date), "dd 'de' MMMM yyyy", {
                      locale: es,
                    })
                  : "Not Defined"}
              </h2>
              <Link href={locationUrl} rel="noopener" target="_blank">
                <h3 className="animate-fadeIn animate-delay-200 md:underline-transition mt-2 flex w-fit flex-row items-center justify-center pb-2 text-center text-sm font-[600] text-white transition-all duration-300 ease-in-out motion-reduce:transition-none lg:text-lg">
                  <FaMapMarkerAlt className="mr-2 hidden md:inline-block" />
                  {location}
                </h3>
              </Link>
            </span>

            <span className="flex-column flex w-full flex-wrap items-center justify-center gap-8">
              {/* Show this component after September 23, 2024 */}
              <Link
                className="hidden xl:block"
                href={
                  isAfterSep232024
                    ? "https://gdg.community.dev/events/details/google-gdg-montevideo-presents-la-meetup-owu-1/"
                    : "#"
                }
              >
                <TicketHome sponsors={sponsors} />
              </Link>
              {/* Hide this component after September 23, 2024 */}
              {isAfterSep232024 !== null ? (
                <div className="h-[184px] w-full items-center justify-center xl:hidden">
                  <CountdownTimer
                    targetDate={isAfterSep232024 ? "2024-10-19T09:00:00" : "2024-09-23T11:00:00"}
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/prefer-nullish-coalescing
                    title={
                      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/no-unnecessary-condition
                      isAfterSep232024 === null
                        ? "‎"
                        : isAfterSep232024
                          ? "La Meetup comienza en:"
                          : "Entradas disponibles en:"
                    }
                  />
                </div>
              ) : null}

              <Link
                className="inline-flex w-full max-w-[280px] skew-x-[-21deg] cursor-pointer items-center justify-center border-2 border-white px-5 py-2.5 text-base font-semibold uppercase text-white ease-in before:absolute before:-inset-0.5 before:origin-right before:scale-x-0 before:bg-white hover:scale-110 hover:text-black hover:before:origin-left hover:before:scale-x-100 aria-disabled:pointer-events-none aria-disabled:border-[#666] aria-disabled:bg-[#666] aria-disabled:text-[#111] motion-safe:transition-[color,transform] motion-safe:before:transition-transform motion-safe:before:duration-300 motion-safe:before:ease-in motion-safe:hover:delay-100 motion-safe:hover:ease-out motion-safe:hover:before:delay-100 motion-safe:hover:before:ease-out"
                href={primaryButtonUrl}
                target="_blank"
              >
                <span className="inline-flex skew-x-[21deg] items-center justify-center text-center">
                  <FaCalendarAlt className="mr-1.5 inline-block" />
                  {primaryButtonName}
                </span>
              </Link>
              <Link
                className="inline-flex w-full max-w-[280px] skew-x-[-21deg] cursor-pointer items-center justify-center border-2 border-white px-5 py-2.5 text-base font-semibold uppercase text-white ease-in before:absolute before:-inset-0.5 before:origin-right before:scale-x-0 before:bg-white hover:scale-110 hover:text-black hover:before:origin-left hover:before:scale-x-100 aria-disabled:pointer-events-none aria-disabled:border-[#666] aria-disabled:bg-[#666] aria-disabled:text-[#111] motion-safe:transition-[color,transform] motion-safe:before:transition-transform motion-safe:before:duration-300 motion-safe:before:ease-in motion-safe:hover:delay-100 motion-safe:hover:ease-out motion-safe:hover:before:delay-100 motion-safe:hover:before:ease-out"
                href={
                  isAfterSep232024
                    ? "https://gdg.community.dev/events/details/google-gdg-montevideo-presents-la-meetup-owu-1/"
                    : secondaryButtonUrl
                }
                target={isAfterSep232024 ? "_blank" : undefined}
              >
                <span className="inline-flex skew-x-[21deg] items-center justify-center text-center">
                  {isAfterSep232024 === null ? null : isAfterSep232024 ? (
                    <FaTicketAlt className="mr-1.5 inline-block text-xl" />
                  ) : (
                    <FaLightbulb className="mr-1.5 inline-block text-xl" />
                  )}

                  {isAfterSep232024 === null ? "‎" : isAfterSep232024 ? "¡QUIERO MI TICKET!" : secondaryButtonName}
                </span>
              </Link>
            </span>
          </div>
        </div>
      </div>
      <Link
        className="bottom-2 hidden flex-col items-center justify-center gap-2.5 self-center text-lg font-semibold tracking-wider text-white lg:flex"
        href={ctaUrl}
      >
        {ctaText}
        <FaChevronDown className="ml-3 animate-bounce" width="16px" />
      </Link>
    </section>
  );
}

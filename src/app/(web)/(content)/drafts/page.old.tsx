import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { BiParty } from "react-icons/bi";

import Footer from "components/shared/Footer";

export const metadata = {
  title: "La Meetup 2024 | OWU Uruguay",
  description: "¡En construcción!",
};

export default async function LaMeetup2024() {
  return (
    <div className="container flex h-full min-h-[calc(100dvh-56px)] w-full flex-col items-center justify-center gap-5 pt-20">
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-5">
        <h1 className="text-center text-3xl font-semibold text-white sm:text-5xl">¡En Construcción!</h1>
        <img
          alt="Logo de OWU Uruguay"
          className="w-full max-w-[280px] animate-pulse 2xl:max-w-[450px]"
          loading="lazy"
          src="carpincho.png"
        />
        <h2 className="text-center text-lg font-semibold text-white sm:text-2xl">
          ¡Te invitamos a revivir lo mejor de la primera edición de La Meetup!
        </h2>
        <Link
          className="text-md mt-5 flex min-w-[250px] items-center justify-center gap-2 rounded-md bg-white py-2 font-semibold text-black hover:bg-yellow-400 md:px-8 md:py-2.5"
          href="/2023/la-meetup"
        >
          <BiParty />
          Primera Edición 2023
          <FaExternalLinkAlt />
        </Link>
      </div>
      <Footer />
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client";

import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

export default function() {
    return (
      <div className="relative flex min-h-[calc(100dvh-56px)] w-full flex-1 flex-col items-center justify-center gap-4 bg-red-500">
        <Link href="/la-meetup" rel="noreferrer" target="_blank">
          <h1 className="mb-12 -rotate-[10deg] text-center text-6xl font-black uppercase italic leading-none text-primary text-yellow-400 xl:text-[80px]">
            LA<span className="block text-6xl uppercase lg:text-8xl xl:text-9xl">MEETUP 2024</span>
          </h1>
        </Link>
        <div>
          <h2 className="animate-fadeIn animate-delay-200 text-center text-4xl font-extrabold text-white lg:text-5xl">
            19 de octubre 2024
          </h2>
          <a rel="noopener" target="_blank" href="https://maps.app.goo.gl/PWsJEYZGZdzGkmaRA">
            <h3 className="animate-fadeIn animate-delay-200 mt-2 text-center text-lg font-[600] text-white lg:text-lg">
              Sinergia Faro, Víctor Soliño 349, Montevideo
            </h3>
          </a>
        </div>
        <Link className="absolute bottom-28 flex flex-col items-center justify-center gap-2.5 self-center text-sm font-semibold text-white md:bottom-16 md:text-lg" href="/#inicio">
            <FaChevronDown className="ml-3 animate-bounce" width="16px" />
        </Link>
      </div>
    );
}
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type CommunitiesProps = {
  title?: string;
  subtitle?: string;
  communities?: {
    name: string;
    logo: {
      url: string;
    };
    website?: string;
  }[];
};

export default function Communities({ title, subtitle, communities = [] }: CommunitiesProps) {
  const logos = [...communities, ...communities];

  return (
    <div className="flex w-full max-w-[1200px] flex-col items-center gap-5">
      <span>
        <h2 className="text-center text-5xl font-bold text-yellow-400">{title}</h2>
        <p className="mt-2 text-center text-lg font-[400] text-white">{subtitle}</p>
      </span>
      <div className="relative h-full w-full max-w-[1200px] overflow-hidden py-8 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
        <motion.div
          animate={{
            x: ["0%", "-100%"],
            transition: {
              ease: "linear",
              duration: 60,
              repeat: Infinity,
            },
          }}
          className="relative flex items-center"
        >
          {logos.map(({ name, logo, website }) => (
            <Link
              key={website ?? "#"}
              className="z-50 mx-2 flex w-2/6 flex-shrink-0 hover:scale-105 md:w-1/6"
              href={website ?? "#"}
              target="_blank"
            >
              <img alt={name} className="w-full max-w-[150px] brightness-0 contrast-100 invert filter" src={logo.url} />
            </Link>
          ))}
        </motion.div>
      </div>
      <Link
        className="inline-flex w-full max-w-[280px] skew-x-[-21deg] cursor-pointer items-center justify-center self-center border-2 border-yellow-400 px-5 py-2.5 text-base font-semibold uppercase text-white ease-in before:absolute before:-inset-0.5 before:origin-right before:scale-x-0 before:bg-yellow-400 hover:scale-110 hover:text-black hover:before:origin-left hover:before:scale-x-100 aria-disabled:pointer-events-none aria-disabled:border-[#666] aria-disabled:bg-[#666] aria-disabled:text-[#111] motion-safe:transition-[color,transform] motion-safe:before:transition-transform motion-safe:before:duration-300 motion-safe:before:ease-in motion-safe:hover:delay-100 motion-safe:hover:ease-out motion-safe:hover:before:delay-100 motion-safe:hover:before:ease-out"
        href="/la-meetup/comunidades"
      >
        <span className="inline-flex skew-x-[21deg] items-center justify-center text-center">¡SUMÁ TU COMUNIDAD!</span>
      </Link>
    </div>
  );
}

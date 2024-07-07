"use client";

import { randomArraySort } from "app/lib/utils";

import Member from "../Member";

type SpeakersProps = {
  title?: string;
  subtitle?: string;
  speakers?: {
    firstname: string;
    lastname: string;
    jobtitle: string;
    picture?: {
      url: string;
    };
  }[];
};

export default function Speakers({ title, subtitle, speakers }: SpeakersProps) {
  return (
    <section
      className="relative flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center gap-4"
      id="speakers"
    >
      <span>
        <h2 className="text-center text-5xl font-bold text-yellow-400">{title}</h2>
        <p className="mt-2 text-center text-lg font-[400] text-white">{subtitle}</p>
      </span>
      <div className="flex flex-row flex-wrap justify-center gap-5 xl:justify-normal xl:gap-2">
        {randomArraySort(speakers).map(({ firstname, lastname, jobtitle, picture }) => (
          <Member
            key={lastname}
            image={picture?.url ?? "/carpincho.png"}
            name={`${firstname} ${lastname}`}
            role={jobtitle}
          />
        ))}
      </div>
    </section>
  );
}

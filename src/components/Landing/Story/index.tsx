import Image from "next/image";

import { RichText } from "components/shared/RichText";

type StoryProps = {
  title?: string;
  subtitle?: string;
  content?: string;
  image?: string;
};

export default function Story({ title, subtitle, content, image }: StoryProps) {
  return (
    <section className="flex w-full flex-col justify-center gap-8 self-center pt-20 text-white" id="historia">
      <span className="flex flex-col gap-1">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">{title}</h2>
        <h3 className="text-center text-zinc-400">{subtitle}</h3>
      </span>
      <span className="grid place-items-center md:grid-cols-[1fr_500px]">
        <div className="flex w-full flex-col gap-4">
          <RichText content={content} />
        </div>
        <div className="flex min-h-[400px] w-full flex-col items-center justify-end xl:items-end">
          <span className="relative min-h-[400px] w-full max-w-[400px]">
            <Image
              fill
              alt="ilustración de un carpincho"
              className="w-full max-w-[400px] object-contain"
              src={image ?? ""}
            />
          </span>
        </div>
      </span>
    </section>
  );
}

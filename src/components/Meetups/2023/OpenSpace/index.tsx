type OpenSpaceProps = {
  title: string;
  subtitle: string;
  stages?: {
    title: string;
    description: string;
  }[];
  howToParticipateTitle: string;
  howToParticipateDescription: string;
  iPresentTitle: string;
  iPresentDescription: string;
  letsDiscussTitle: string;
  letsDiscussDescription: string;
};

export default function OpenSpace({
  title,
  subtitle,
  stages,
  howToParticipateTitle,
  howToParticipateDescription,
  iPresentTitle,
  iPresentDescription,
  letsDiscussTitle,
  letsDiscussDescription,
}: OpenSpaceProps) {
  return (
    <section
      className="flex w-full max-w-[800px] flex-col items-center justify-center space-y-6 pt-[64px] text-white"
      id="open-space"
    >
      <h2 className="text-center text-3xl font-bold text-yellow-400 sm:text-4xl">{title}</h2>
      <div className="flex max-w-[800px] flex-col gap-8">
        <div>
          <p>{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="col-span-2">
            <h3 className="font-bold text-yellow-400">{stages?.[0].title}</h3>
            <p>{stages?.[0].description}</p>
          </div>

          <div className="col-span-2">
            <h3 className="font-bold text-yellow-400">{stages?.[1].title}</h3>
            <p>{stages?.[1].description}</p>
          </div>

          <div className="col-span-2">
            <h3 className="font-bold text-yellow-400">{stages?.[2].title}</h3>
            <p>{stages?.[2].title}</p>
          </div>

          <div className="col-span-2">
            <h3 className="font-bold text-yellow-400">{stages?.[3].title}</h3>
            <p>{stages?.[3].title}</p>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-yellow-400">{howToParticipateTitle}</h2>
          <h3>{howToParticipateDescription}</h3>
        </div>

        <div>
          <h2 className="text-yellow-400">{iPresentTitle}</h2>
          <p>{iPresentDescription}</p>
        </div>

        <div>
          <h2 className="text-yellow-400">{letsDiscussTitle}</h2>
          <p>{letsDiscussDescription}</p>
        </div>
      </div>
    </section>
  );
}

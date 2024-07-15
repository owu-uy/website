import AgendaItem from "../AgendaItem";

type AgendaProps = {
  title: string;
  agenda?: {
    title: string;
    startTime: string;
    endTime: string;
    description: string;
  }[];
};

export default function Agenda({ title, agenda }: AgendaProps) {
  return (
    <section
      className="relative flex w-full max-w-[800px] flex-1 flex-col items-center justify-center gap-4 pt-[64px]"
      id="agenda"
    >
      <span>
        <h2 className="text-center text-5xl font-bold text-yellow-400">{title}</h2>
      </span>
      {agenda?.map(({ description, endTime, title, startTime }) => (
        <AgendaItem key={title} description={description} endTime={endTime} startTime={startTime} title={title} />
      ))}
    </section>
  );
}

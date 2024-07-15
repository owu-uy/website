type StatProps = {
  title: string;
  count: number | null;
  subtitle: string;
};

export default function Stat({ title, count, subtitle }: StatProps) {
  return (
    <div className="text-center text-white">
      <p className="text-4xl font-bold text-yellow-400">+{count}</p>
      <p className="text-2xl font-semibold">{title}</p>
      <p className="text-base">{subtitle}</p>
    </div>
  );
}

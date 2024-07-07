type SponsorProps = {
  name: string;
  logo: string;
  url: string;
};

export default function Sponsor({ name, logo, url }: SponsorProps) {
  return (
    <div className="h-[124px] w-[187px] cursor-pointer bg-white hover:scale-105">
      <a className="flex h-full items-center justify-center" href={url} rel="noopener" target="_blank">
        <img alt={name} className="max-h-full" src={logo} />
      </a>
    </div>
  );
}

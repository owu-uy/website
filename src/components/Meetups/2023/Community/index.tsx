type CommunityProps = {
  name: string;
  logo: string;
  url: string;
};

export default function Community({ name, logo, url }: CommunityProps) {
  return (
    <div className="w-[187px] cursor-pointer bg-white hover:scale-105">
      <a className="flex h-full flex-col" href={url} rel="noopener" target="_blank">
        <figure className="flex-1">
          <img alt={`Logo de ${name}`} className="h-full w-full object-fill" src={logo} />
        </figure>
        <div>
          <span className="flex justify-center text-lg font-bold">{name}</span>
        </div>
      </a>
    </div>
  );
}

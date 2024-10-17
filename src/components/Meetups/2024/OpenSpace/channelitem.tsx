import classNames from "classnames";
import { type Channel, ChannelBox } from "planby";
import { Fragment } from "react";

interface ChannelItemProps {
  channel: Channel;
  isApp?: boolean;
}

export function ChannelItem({ channel, isApp }: ChannelItemProps) {
  const { position, logo } = channel;
  const channelClassName = classNames(
    "flex  flex-row items-center justify-center rounded-[2px] px-2 py-0.5 text-center font-bold tracking-tighter text-black",
    {
      "max-h-[112px] min-h-[112px] text-[10.5px]": isApp,
      "max-h-[157px] min-h-[157px] text-[15px]": !isApp,
      "bg-[#03A9F4] text-black": channel.logo === "LOBBY",
      "bg-[#FFEB3B] text-black": channel.logo === "CENTRO",
      "bg-[#74B276] text-black": channel.logo === "CUEVA",
      "bg-[#FF9800] text-black": channel.logo === "VENTANA",
      "bg-[#CD363C] text-white": channel.logo === "RINCÓN",
    }
  );

  return (
    <ChannelBox {...position}>
      <span className="flex h-full w-full flex-1 items-center justify-center">
        <p className={channelClassName}>
          {logo.split("").map((letter, index) => (
            <Fragment key={index}>
              {letter}
              <br />
            </Fragment>
          ))}
        </p>
      </span>
    </ChannelBox>
  );
}

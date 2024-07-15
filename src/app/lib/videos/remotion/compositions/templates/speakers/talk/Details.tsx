import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { IconWithCaption } from "../../../../design/molecules/IconWithCaption";

type DetailsProps = {
  startingDateTime: Date | string;
};

export function Details({ startingDateTime }: DetailsProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const inputDate: string = startingDateTime instanceof Date ? startingDateTime.toISOString() : startingDateTime;

  const date = new Date(inputDate);
  const startingDate = format(date, "dd 'de' MMMM 'de' yyyy", {
    locale: es,
  });
  const startingTime = format(date, "HH:mm 'hs'");

  const slideIn = spring({
    frame,
    fps,
    from: -100,
    to: 50,
    durationInFrames: 30,
  });

  return (
    <IconWithCaption
      caption={`${startingDate} - ${startingTime}`}
      iconStyle={{
        fontSize: "4.5rem",
        color: "white",
      }}
      iconifyId="material-symbols:calendar-today-rounded"
      style={{
        position: "absolute",
        height: "max-content",
        width: "50%",
        left: 0,
        color: "white",
        fontWeight: "bold",
        bottom: slideIn,
      }}
    />
  );
}

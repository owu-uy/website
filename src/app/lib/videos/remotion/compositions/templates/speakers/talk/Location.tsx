import { spring, useCurrentFrame, useVideoConfig } from "remotion";

import { IconWithCaption } from "../../../../design/molecules/IconWithCaption";

type LocationProps = {
  location: string;
};

export function Location({ location }: LocationProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame,
    fps,
    from: -100,
    to: 50,
    durationInFrames: 30,
  });

  return (
    <IconWithCaption
      caption={location}
      iconStyle={{
        fontSize: "4.5rem",
        color: "white",
      }}
      iconifyId="material-symbols:location-on-rounded"
      style={{
        position: "absolute",
        height: "max-content",
        width: "50%",
        right: 0,
        color: "white",
        fontWeight: "bold",
        bottom: slideIn,
      }}
    />
  );
}

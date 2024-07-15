import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { Text } from "../../../../design/atoms/Text";
import { IconWithCaption } from "../../../../design/molecules/IconWithCaption";

type SpeakerInfoProps = {
  name: string;
  company?: string;
  job?: string;
  iconStyle?: React.CSSProperties;
};

export function SpeakerInfo({ name, company, job, iconStyle }: SpeakerInfoProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = spring({
    frame: frame - 10,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 30,
  });
  const unblur = interpolate(frame, [10, 30], [5, 0], {
    extrapolateRight: "clamp",
  });

  const textStyles = {
    opacity,
    fontFamily: "inherit",
    filter: `blur(${unblur}px)`,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text
        style={{
          ...textStyles,
          width: "auto",
          fontSize: "2.75rem",
          fontWeight: "bold",
        }}
      >
        {name}
      </Text>
      <hr
        style={{
          ...textStyles,
          background: "white",
          width: 50,
          height: 4,
          marginLeft: 20,
          marginTop: 20,
          border: "none",
        }}
      />
      {company ? (
        <IconWithCaption
          caption={company}
          iconStyle={{ width: 35, ...iconStyle }}
          iconifyId="mdi:company"
          style={{
            ...textStyles,
            justifyContent: "flex-start",
            fontSize: "1.5rem",
            color: "white",
            paddingLeft: 15,
          }}
        />
      ) : null}
      {job ? (
        <IconWithCaption
          caption={job}
          iconStyle={{ width: 35, height: 35, ...iconStyle }}
          iconifyId="mdi:user"
          style={{
            ...textStyles,
            justifyContent: "flex-start",
            fontSize: "1.25rem",
            color: "white",
            paddingLeft: 15,
          }}
        />
      ) : null}
    </div>
  );
}

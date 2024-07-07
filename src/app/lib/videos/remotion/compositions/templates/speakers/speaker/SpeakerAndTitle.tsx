import React from "react";
import { interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { Title } from "../../../../design/atoms/Title";

import { TalkSpeaker } from "./TalkSpeaker";

type SpeakerAndTitleProps = {
  speakerPicture: string;
  speakersNames: string;
  titleSize: string;
  talkTitle: string;
};

export function SpeakerAndTitle({ speakerPicture, speakersNames, titleSize, talkTitle }: SpeakerAndTitleProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titlesAnimationDelay = 30;
  const titleOpacity = spring({
    frame: frame - titlesAnimationDelay,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 60,
  });
  const titleUnblur = interpolate(frame, [titlesAnimationDelay, 20 + titlesAnimationDelay], [5, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <>
      <Sequence from={20} name="Speaker">
        <TalkSpeaker
          speakerNameStyle={{
            width: "100%",
            color: "#efdb50",
            position: "absolute",
            fontSize: 70,
            top: "55%",
            opacity: titleOpacity,
            filter: `blur(${titleUnblur}px)`,
            textAlign: "center",
            fontWeight: "bold",
            textShadow: "2px 2px 0px black",
          }}
          speakerPicture={speakerPicture}
          speakersNames={speakersNames}
        />
      </Sequence>

      <Sequence from={titlesAnimationDelay} name="Title">
        <Title
          style={{
            width: "100%",
            color: "white",
            position: "absolute",
            fontSize: `${titleSize}px`,
            top: "70%",
            opacity: titleOpacity,
            filter: `blur(${titleUnblur}px)`,
            textAlign: "center",
            paddingLeft: "50px",
            paddingRight: "50px",
          }}
        >
          {talkTitle}
        </Title>
      </Sequence>
    </>
  );
}

import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

import { AvatarWithCaption } from "../../../../design/molecules/AvatarWithCaption";
import { Title } from "../../shared/Title";

type TalkSpeakerProps = {
  speakerPicture: string;
  speakersNames: string;
  speakerNameStyle: React.CSSProperties;
};

export function TalkSpeaker({ speakerPicture, speakersNames, speakerNameStyle }: TalkSpeakerProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pictureDrop = spring({
    frame,
    fps,
    from: -600,
    to: 100,
    durationInFrames: 30,
  });

  return (
    <>
      {speakerPicture ? (
        <AvatarWithCaption
          avatarPictureUrl={speakerPicture}
          avatarStyle={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, 0)",
            top: pictureDrop,
          }}
          caption={speakersNames}
          captionStyle={{ ...speakerNameStyle }}
        />
      ) : (
        <Title style={{ ...speakerNameStyle }} title={speakersNames} />
      )}
    </>
  );
}

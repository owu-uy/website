import React from "react";
import { loadFont } from "@remotion/google-fonts/OpenSans";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { type z } from "zod";

import { BackgroundCircleNoise } from "../../../../design/atoms/BackgroundCircleNoise";
import { Title } from "../../shared/Title";
import { type SpeakersSchema } from "../zod-schemas/talks.types";
import { Details } from "../talk/Details";
import { Location } from "../talk/Location";

import { Speaker } from "./SpeakerCard";

const { fontFamily } = loadFont();

export function Speakers({ backgroundColor, title, startingDate, location, speakers }: z.infer<typeof SpeakersSchema>) {
  const speakersData = speakers;
  const baseOffsetY = speakersData.length > 1 ? -50 : 0;
  const avatarSize = speakersData.length > 1 ? 150 : 200;
  const speakerIconStyle: React.CSSProperties | undefined = speakersData.length > 1 ? { fontSize: "2rem" } : undefined;

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        fontFamily,
      }}
    >
      <Sequence name="Noise Background">
        <BackgroundCircleNoise circleRadius={2.5} maxOffset={20} speed={0.01} />
      </Sequence>
      <Sequence from={10} name="Speaker">
        {speakersData.map((speaker, index) => {
          return (
            <Speaker
              key={speaker.name}
              avatarSize={avatarSize}
              company={speaker.company}
              iconStyle={speakerIconStyle}
              job={speaker.job}
              name={speaker.name}
              offsetY={index * 200 + baseOffsetY}
              pictureUrl={staticFile(speaker.pictureUrl) || staticFile("/images/common/defaultAvatar.svg")}
            />
          );
        })}
      </Sequence>
      <Sequence from={40} name="Title">
        <Title title={title} />
      </Sequence>
      <Sequence from={50} name="Details">
        <Details startingDateTime={startingDate} />
      </Sequence>
      {location ? (
        <Sequence from={50} name="Location">
          <Location location={location} />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
}

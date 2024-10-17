import React from "react";
import { loadFont } from "@remotion/google-fonts/OpenSans";
import { AbsoluteFill, Sequence } from "remotion";

import CountdownTimer from "../../../../../../../components/Landing/CountdownTimer";
import { BackgroundCircleNoise } from "../../../design/atoms/BackgroundCircleNoise";
import { Title } from "../shared/Title";

import OpenSpaceAgendaContainer from "./OpenSpaceAgendaContainer";

const { fontFamily } = loadFont();

export function OpenSpace() {
  return (
    <div className="relative w-full">
      <AbsoluteFill
        className="relative"
        style={{
          backgroundColor: "#18181b",
          fontFamily,
        }}
      >
        <Sequence name="Noise Background">
          <BackgroundCircleNoise circleRadius={2.5} maxOffset={20} speed={0.01} />
        </Sequence>

        <Sequence from={10} name="Title">
          <Title
            style={{
              top: 50,
            }}
            title="Agenda del Open Space"
          />
        </Sequence>

        <Sequence from={20} name="Map">
          <OpenSpaceAgendaContainer />
        </Sequence>
      </AbsoluteFill>
      <div className="absolute right-10 top-10 w-fit">
        <CountdownTimer targetDate="2024-10-09T22:59:00" />
      </div>
    </div>
  );
}

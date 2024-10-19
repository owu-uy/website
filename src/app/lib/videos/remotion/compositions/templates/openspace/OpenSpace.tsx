import React from "react";
import { loadFont } from "@remotion/google-fonts/OpenSans";
import { AbsoluteFill, Sequence } from "remotion";

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
          <span className="mx-auto mt-5">
            <h1 className="font-inter mb-[20px] text-center text-[80px] font-bold tracking-[-2px] text-[#FFD700]">
              Agenda del Open Space
            </h1>
            <p className="mt-2 text-center text-[40px] font-[400] text-white">
              ¡Conocé los horarios y ubicaciones de las actividades del Open Space!
            </p>
          </span>
        </Sequence>

        <Sequence from={20} name="Map">
          <OpenSpaceAgendaContainer />
        </Sequence>
      </AbsoluteFill>
    </div>
  );
}

import React from "react";
import { loadFont } from "@remotion/google-fonts/OpenSans";
import { AbsoluteFill, Img, Sequence } from "remotion";

import { BackgroundCircleNoise } from "../../../design/atoms/BackgroundCircleNoise";
import { Title } from "../shared/Title";
const { fontFamily } = loadFont();

export function Silence() {
  return (
    <div className="relative w-full">
      <AbsoluteFill
        className="relative"
        style={{
          backgroundColor: "black",
          fontFamily,
          animation: "blink 1s infinite",
        }}
      >
        <style>
          {`
        @keyframes blink {
          0% { background-color: black; }
          50% { background-color: #EA4335; }
          100% { background-color: black; }
        }
        `}
        </style>
        <Sequence name="Noise Background">
          <BackgroundCircleNoise circleRadius={6} maxOffset={10} speed={0.06} />
        </Sequence>

        <Sequence name="Title">
          <Title
            style={{
              top: 50,
              fontSize: "220px",
            }}
            title="SILENCIO"
          />
        </Sequence>

        <Sequence name="Microphone">
          <div className="flex w-full flex-1 flex-col items-center justify-center">
            <Img
              loading="eager"
              src="https://cdn-icons-png.flaticon.com/512/1165/1165576.png"
              style={{ width: 400, height: 400 }}
            />
          </div>
        </Sequence>

        <Sequence name="Title">
          <Title
            style={{
              top: 750,
              fontSize: "220px",
            }}
            title="POR FAVOR"
          />
        </Sequence>
      </AbsoluteFill>
    </div>
  );
}

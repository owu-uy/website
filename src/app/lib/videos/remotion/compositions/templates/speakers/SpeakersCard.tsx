/* eslint-disable react/function-component-definition */
import React from "react";
import { AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";

import { BackgroundCircleNoise } from "../../../design/atoms/BackgroundCircleNoise";

interface SpeakerCardProps {
  name: string;
  photo: string;
  talk: string;
}

export const SpeakerCard: React.FC<SpeakerCardProps> = ({ name, photo, talk }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1E1E1E",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity,
        overflow: "hidden",
        fontFamily: '"Inter", sans-serif',
      }}
    >
      <Sequence name="Noise Background">
        <BackgroundCircleNoise circleRadius={2.5} maxOffset={20} speed={0.01} />
      </Sequence>
      <div
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          borderRadius: "20px",
          paddingTop: "40px",
          paddingBottom: "20px",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 0 40px rgba(255, 215, 0, 0.3)",
        }}
      >
        <h1
          style={{
            fontSize: 100,
            fontWeight: "bold",
            color: "#FFD700",
            marginBottom: 60,
            textAlign: "center",
            textShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
            fontFamily: '"Inter", sans-serif',
            letterSpacing: "-2px",
          }}
        >
          Speakers
        </h1>

        <div
          style={{
            width: 380,
            height: 380,
            borderRadius: "50%",
            overflow: "hidden",
            border: "5px solid #FFD700",
            marginBottom: 20,
            boxShadow: "0 0 40px rgba(255, 215, 0, 0.7)",
          }}
        >
          <Img
            src={staticFile(photo)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <h2
          style={{
            fontSize: 66,
            fontWeight: "bold",
            color: "#FFFFFF",
            marginBottom: 0,
            textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
            fontFamily: '"Inter", sans-serif',
            textAlign: "center",
          }}
        >
          {name}
        </h2>

        <h3
          style={{
            fontSize: 58,
            color: "#FFD700",
            maxWidth: "80%",
            textAlign: "center",
            lineHeight: 1.4,
            textShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
            fontFamily: '"Inter", sans-serif',
            fontWeight: "normal",
            letterSpacing: "0px",
          }}
        >
          {talk}
        </h3>
      </div>
    </AbsoluteFill>
  );
};

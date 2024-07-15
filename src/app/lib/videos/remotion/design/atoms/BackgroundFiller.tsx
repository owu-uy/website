import React from "react";
import { Img } from "remotion";

export type BackgroundFillerProps = {
  imageUrl: string;
  bottomGradient?: boolean;
  style?: React.CSSProperties;
};

export function BackgroundFiller({ imageUrl, bottomGradient = false, style }: BackgroundFillerProps) {
  return (
    <>
      <Img
        src={imageUrl}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "scale(1.1)",
          ...style,
        }}
      />
      {bottomGradient ? (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage: "linear-gradient(to top, rgba(12,12,12,1), rgba(255,0,0,0))",
          }}
        />
      ) : null}
    </>
  );
}

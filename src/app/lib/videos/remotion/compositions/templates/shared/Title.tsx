import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { Title as TitleAtom } from "../../../design/atoms/Title";

type TitleProps = {
  title: string;
  style?: React.CSSProperties;
};

export function Title({ title, style }: TitleProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 60,
  });
  const titleUnblur = interpolate(frame, [0, 20], [5, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ top: 380, ...style }}>
      <TitleAtom
        style={{
          fontFamily: "inherit",
          fontSize: "3.25rem",
          width: "100%",
          opacity: titleOpacity,
          filter: `blur(${titleUnblur}px)`,
        }}
      >
        {title}
      </TitleAtom>
    </AbsoluteFill>
  );
}

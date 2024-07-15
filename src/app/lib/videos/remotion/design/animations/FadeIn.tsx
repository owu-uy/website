import { type CSSProperties, type ReactNode } from "react";
import { interpolate, useCurrentFrame } from "remotion";

type FadeInProps = {
  children?: ReactNode;
  duration?: number;
  style?: CSSProperties;
};

export function FadeIn({ children, duration = 20, style }: FadeInProps) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, duration], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        ...style,
        opacity,
      }}
    >
      {children}
    </div>
  );
}

import { type CSSProperties } from "react";
import { Img, staticFile } from "remotion";

type AvatarProps = {
  style?: CSSProperties;
  src?: string;
  size?: number;
};

export function Avatar({ style, src = staticFile("/images/common/defaultAvatar.svg"), size = 500 }: AvatarProps) {
  return (
    <Img
      src={src}
      style={{
        height: size,
        width: size,
        borderRadius: "50%",
        border: "30px solid white",
        backgroundColor: "white",
        objectFit: "cover",
        ...style,
      }}
    />
  );
}

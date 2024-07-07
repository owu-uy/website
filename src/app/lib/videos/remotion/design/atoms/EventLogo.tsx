import { type CSSProperties } from "react";
import { Img, staticFile } from "remotion";

export type EventLogoProps = {
  style?: CSSProperties;
  src?: string;
};

export function EventLogo({ style, src }: EventLogoProps) {
  return src ? (
    <Img src={src} style={style} />
  ) : (
    <Img src={staticFile("/images/showcases/lyonjs/lyonjsSquaredLogo.png")} style={style} />
  );
}

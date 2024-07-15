import React from "react";
import { Icon } from "@iconify/react";

import { Text } from "../atoms/Text";

type IconWithCaptionProps = {
  iconifyId: string;
  caption: string;
  iconStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  style?: React.CSSProperties;
};

export function IconWithCaption({ iconifyId, caption, style, iconStyle, textStyle }: IconWithCaptionProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        height: "max-content",
        fontSize: "1.6rem",
        ...style,
      }}
    >
      <Icon
        icon={iconifyId}
        style={{
          fontSize: "4rem",
          ...iconStyle,
        }}
      />
      <Text
        style={{
          position: "relative",
          fontSize: "inherit",
          color: "inherit",
          width: "max-content",
          padding: 0,
          ...textStyle,
        }}
      >
        {caption}
      </Text>
    </div>
  );
}

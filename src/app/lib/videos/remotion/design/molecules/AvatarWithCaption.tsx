import React, { type ReactNode } from "react";
import { staticFile } from "remotion";

import { Avatar } from "../atoms/Avatar";
import { Text } from "../atoms/Text";

type AvatarWithCaptionProps = {
  children?: ReactNode;
  avatarPictureUrl?: string;
  caption?: string;
  avatarStyle?: React.CSSProperties;
  captionStyle?: React.CSSProperties;
  style?: React.CSSProperties;
};

export function AvatarWithCaption({
  children,
  avatarPictureUrl,
  caption,
  avatarStyle,
  captionStyle,
  style,
}: AvatarWithCaptionProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "max-content",
        gap: 20,
        ...style,
      }}
    >
      <Avatar
        src={avatarPictureUrl ?? staticFile("images/common/defaultAvatar.svg")}
        style={{
          position: "relative",
          ...avatarStyle,
        }}
      />
      {!children && (
        <Text
          style={{
            fontSize: "4.5rem",
            color: "white",
            width: "auto",
            ...captionStyle,
          }}
        >
          {caption}
        </Text>
      )}
      {children}
    </div>
  );
}

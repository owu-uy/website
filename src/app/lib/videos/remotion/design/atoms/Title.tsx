import React from "react";

import { Text } from "./Text";

type TitleProps = {
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export function Title({ style, children }: TitleProps) {
  return (
    <h1>
      <Text
        style={{
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: "2",
          display: "-webkit-box",
          fontSize: "3.2rem",
          fontWeight: "bold",
          overflow: "hidden",
          textOverflow: "ellipsis",
          ...style,
        }}
      >
        {children}
      </Text>
    </h1>
  );
}

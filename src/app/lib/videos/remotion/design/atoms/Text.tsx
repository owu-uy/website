import React, { type ReactNode } from "react";

type TextProps = {
  children: ReactNode;
  style?: React.CSSProperties;
};

export function Text({ children, style }: TextProps) {
  return (
    <span
      style={{
        height: "max-content",
        margin: 0,
        padding: "0 20px",
        width: "100%",
        fontSize: "1.5rem",
        color: "white",
        textAlign: "center",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

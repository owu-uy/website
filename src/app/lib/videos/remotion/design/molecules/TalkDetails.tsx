import { IconWithCaption } from "./IconWithCaption";

type TalkDetailsProps = {
  items: {
    date?: string;
    time?: string;
    location?: string;
    icons?: {
      dateIcon?: string;
      timeIcon?: string;
      locationIcon?: string;
    };
  };
  style?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
};

export function TalkDetails({ items, style, iconStyle, textStyle }: TalkDetailsProps) {
  const countColumn = (items.date ? 1 : 0) + (items.time ? 1 : 0) + (items.location ? 1 : 0);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${countColumn}, 1fr)`,
        position: "absolute",
        bottom: "3rem",
        width: "100%",
        fontWeight: 700,
        color: "white",
        ...style,
      }}
    >
      {items.date ? (
        <div
          style={{
            position: "relative",
            width: "auto",
          }}
        >
          <IconWithCaption
            caption={items.date}
            iconStyle={iconStyle}
            iconifyId={items.icons?.dateIcon ?? "mdi:calendar"}
            style={{
              position: "absolute",
              left: "50%",
              bottom: 0,
              transform: "translateX(-50%)",
              ...style,
            }}
            textStyle={textStyle}
          />
        </div>
      ) : null}
      {items.time ? (
        <div
          style={{
            position: "relative",
            width: "auto",
          }}
        >
          <IconWithCaption
            caption={items.time}
            iconStyle={iconStyle}
            iconifyId={items.icons?.timeIcon ?? "mdi:clock"}
            style={{
              position: "absolute",
              left: "50%",
              bottom: 0,
              transform: "translateX(-50%)",
              ...style,
            }}
            textStyle={textStyle}
          />
        </div>
      ) : null}
      {items.location ? (
        <div
          style={{
            position: "relative",
            width: "auto",
          }}
        >
          <IconWithCaption
            caption={items.location}
            iconStyle={iconStyle}
            iconifyId={items.icons?.locationIcon ?? "mdi:map-marker-radius-outline"}
            style={{
              position: "absolute",
              left: "50%",
              bottom: 0,
              transform: "translateX(-50%)",
              ...style,
            }}
            textStyle={textStyle}
          />
        </div>
      ) : null}
    </div>
  );
}

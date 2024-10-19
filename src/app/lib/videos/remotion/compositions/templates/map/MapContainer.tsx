/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import OpenSpaceMap from "../../../../../../../components/Meetups/2024/OpenSpace/Map";

type MapContainerProps = {
  event?: any;
  animate?: boolean;
  events?: any[];
  scene?: number;
};

export default function MapContainer({ event, animate = false, events = [], scene = 1 }: MapContainerProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame,
    fps,
    from: animate ? 0 : 1,
    to: 1,
    durationInFrames: animate ? 30 : 1,
  });

  const mapUnblur = interpolate(frame, [0, 20], [5, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        top: 100,
        maxWidth: "1750px",
        margin: "0 auto",
        opacity,
        filter: animate ? `blur(${mapUnblur}px` : "none",
      }}
    >
      <div className="relative h-full w-full rounded-lg bg-transparent p-5 shadow-md backdrop-blur-sm backdrop-brightness-[1]">
        <OpenSpaceMap event={event} events={events} scene={scene} />
        {event ? (
          <h2 className="mt-10 text-5xl font-bold text-white">
            {event?.location}:{" "}
            <span className="font-semibold">{events.filter((e: any) => e.location === event.location)[0]?.title}</span>
          </h2>
        ) : null}
      </div>
    </AbsoluteFill>
  );
}

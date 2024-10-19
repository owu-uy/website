/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react/no-array-index-key */
"use client";
import React, { useEffect, useState } from "react";
import { loadFont } from "@remotion/google-fonts/OpenSans";
import { AbsoluteFill, Sequence } from "remotion";

import { fetchEpgClient } from "components/Meetups/2024/OpenSpace/helpers/common";

import { BackgroundCircleNoise } from "../../../design/atoms/BackgroundCircleNoise";
import { Title } from "../shared/Title";

import MapContainer from "./MapContainer";

const { fontFamily } = loadFont();

const locations = [
  { name: "VENTANA", startFrame: 50 },
  { name: "LOBBY", startFrame: 130 },
  { name: "CENTRO", startFrame: 210 },
  { name: "CUEVA", startFrame: 290 },
  { name: "RINCÓN", startFrame: 370 },
];

export default function Map({ scene }: { scene?: number }) {
  interface Event {
    since: string;
    till: string;
    location: string;
    title: string;
    channelUuid: string;
    speaker: string;
  }

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await fetchEpgClient();

        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="relative w-full">
      <AbsoluteFill
        style={{
          backgroundColor: "#18181b",
          fontFamily,
        }}
      >
        <Sequence name="Noise Background">
          <BackgroundCircleNoise circleRadius={2.5} maxOffset={20} speed={0.01} />
        </Sequence>

        <Sequence from={10} name="Title">
          <span className="mx-auto mt-7">
            <h1 className="font-inter text-center text-[60px] font-bold tracking-[-2px] text-[#FFD700]">
              Áreas del Open Space
            </h1>
          </span>
        </Sequence>

        <Sequence durationInFrames={30} from={20} name="Map Initial Animation">
          <MapContainer animate />
        </Sequence>

        {locations.map((location, index) => (
          <Sequence key={index} durationInFrames={80} from={location.startFrame} name={`Map - ${location.name}`}>
            <MapContainer
              event={{
                location: location.name,
              }}
              events={events}
              scene={scene}
            />
          </Sequence>
        ))}
      </AbsoluteFill>
    </div>
  );
}

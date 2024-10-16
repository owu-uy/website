/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react/no-array-index-key */
"use client";
import React, { useEffect, useState } from "react";
import { loadFont } from "@remotion/google-fonts/OpenSans";
import { AbsoluteFill, Sequence } from "remotion";

import { fetchEpg } from "components/Meetups/2024/OpenSpace/helpers/common";
import epg from "components/Meetups/2024/OpenSpace/helpers/epg";

import CountdownTimer from "../../../../../../../components/Landing/CountdownTimer";
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

export default function Map() {
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
        const data = await epg();

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
          <Title
            style={{
              top: 50,
            }}
            title="Áreas del Open Space"
          />
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
            />
          </Sequence>
        ))}
      </AbsoluteFill>
      <div className="absolute right-10 top-10 w-fit">
        <CountdownTimer targetDate="2024-10-09T22:59:00" />
      </div>
    </div>
  );
}

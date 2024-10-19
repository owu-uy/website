/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { Epg, Layout } from "planby";
import { type SetStateAction, type Dispatch } from "react";

import { Program } from "../../../../components/Meetups/2024/OpenSpace/programitem";
import { Timeline } from "../../../../components/Meetups/2024/OpenSpace/calendar";
import { ChannelItem } from "../../../../components/Meetups/2024/OpenSpace/channelitem";
import { useApp } from "../OpenSpace/useApp";

export default function OpenSpaceAgenda({
  event = {},
  setEvent,
  isApp = true,
  initialEpg = [],
}: {
  event?: {
    name?: string;
    location?: string;
  };
  setEvent?: Dispatch<
    SetStateAction<{
      name?: string;
      location?: string;
    }>
  >;
  isApp: boolean;
  initialEpg: any[];
}) {
  const { getEpgProps, getLayoutProps, isLoading } = useApp({
    isApp,
    initialEpg,
  });

  return (
    <Epg isLoading={isApp ? isLoading : false} {...getEpgProps()}>
      <Layout
        {...getLayoutProps()}
        renderChannel={({ channel }) => <ChannelItem key={channel.uuid} channel={channel} isApp={isApp} />}
        renderProgram={({ program, ...rest }) => (
          <Program
            key={program.data.id}
            event={event}
            isApp={isApp}
            program={program}
            onClick={() => {
              setEvent &&
                setEvent({
                  name: event.name === program.data.title ? undefined : program.data.title,
                  location: event.location === program.data.location ? undefined : program.data.location,
                });
            }}
            {...rest}
          />
        )}
        renderTimeline={(props) => <Timeline {...props} />}
      />
    </Epg>
  );
}

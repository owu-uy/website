/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";
import React, { useState } from "react";
import { useEpg } from "planby";
import { continueRender, delayRender } from "remotion";

import { fetchChannels, fetchEpgClient } from "./helpers/common";

export function useApp({ isApp = true, initialEpg = [] }: any) {
  const [channels, setChannels] = React.useState([]);
  const [epg, setEpg] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const channelsData = React.useMemo(() => channels, [channels]);
  const epgData = React.useMemo(() => epg, [epg]);

  const { getEpgProps, getLayoutProps } = useEpg({
    channels: channelsData,
    epg: epgData,
    dayWidth: isApp ? 1190 : 1800,
    sidebarWidth: 32,
    itemHeight: isApp ? 120 : 165,
    height: isApp ? 680 : 1000,
    isSidebar: true,
    isTimeline: true,
    isLine: true,
    startDate: "2024-10-19T10:00:00",
    endDate: "2024-10-19T14:00:00",
    theme: {
      primary: {
        600: "#1a202c",
        900: isApp ? "#181922" : "none",
      },
      grey: { 300: "#d1d1d1" },
      white: "#fff",
      green: {
        300: "#2c7a7b",
      },
      scrollbar: {
        border: "#ffffff",
        thumb: {
          bg: "#e1e1e1",
        },
      },
      loader: {
        teal: "#5DDADB",
        purple: "#3437A2",
        pink: "#F78EB6",
        bg: "#181922",
      },
      gradient: {
        blue: {
          300: "#002eb3",
          600: "#002360",
          900: "#051937",
        },
      },

      text: {
        grey: {
          300: "#a0aec0",
          500: "#718096",
        },
      },

      timeline: {
        divider: {
          bg: "#fff",
        },
      },
    },
  });

  const [handle] = useState(() => delayRender());

  const handleFetchResources = React.useCallback(async () => {
    setIsLoading(true);

    let epg = initialEpg;

    if (isApp) {
    } else {
      epg = await fetchEpgClient();
    }

    const channels = await fetchChannels();

    setEpg(epg);
    // @ts-expect-error ddasmjasmdkansdkjnaskjdn
    setChannels(channels);
    setIsLoading(false);
    continueRender(handle);
  }, []);

  React.useEffect(() => {
    handleFetchResources();
  }, [handleFetchResources]);

  return { getEpgProps, getLayoutProps, isLoading };
}

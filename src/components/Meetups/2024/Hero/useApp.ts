import React from "react";
import { useEpg } from "planby";

import { fetchEpgClient, fetchChannels } from "../OpenSpace/helpers/common";
import { theme } from "../OpenSpace/helpers/theme";

export function useApp() {
  const [channels, setChannels] = React.useState([]);
  const [epg, setEpg] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const channelsData = React.useMemo(() => channels, [channels]);
  const epgData = React.useMemo(() => epg, [epg]);

  const { getEpgProps, getLayoutProps } = useEpg({
    channels: channelsData,
    epg: epgData,
    dayWidth: 1140,
    sidebarWidth: 45,
    itemHeight: 120,
    height: 500,
    isSidebar: true,
    isTimeline: true,
    isLine: true,
    startDate: "2024-10-19T10:00:00",
    endDate: "2024-10-19T14:00:00",
    theme,
  });

  const handleFetchResources = React.useCallback(async () => {
    setIsLoading(false);
    const epg = await fetchEpgClient();
    const channels = await fetchChannels();

    console.log("epg", epg);
    // @ts-expect-error ddasmjasmdkansdkjnaskjdn
    setEpg(epg);
    // @ts-expect-error ddasmjasmdkansdkjnaskjdn
    setChannels(channels);
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    handleFetchResources();
  }, [handleFetchResources]);

  return { getEpgProps, getLayoutProps, isLoading };
}

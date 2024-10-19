"use server";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";

import OpenSpaceAgenda from "../OpenSpaceAgenda";
import { fetchEpgServer } from "../OpenSpace/helpers/common";

export default async function OpenSpaceAgendaServer({ setEvent }: any) {
  const epg: any[] = await fetchEpgServer();

  console.log({ epg: epg });

  return <OpenSpaceAgenda initialEpg={epg} isApp={false} setEvent={setEvent} />;
}

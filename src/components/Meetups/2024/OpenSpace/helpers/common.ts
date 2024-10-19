import { channels } from "./channels";
import epg_client from "./epg_client";
import epg_server from "./epg_server";

export const fetchChannels = async () => new Promise((res) => res(channels));

export const fetchEpgClient = async () => await epg_client();

export const fetchEpgServer = async () => await epg_server();

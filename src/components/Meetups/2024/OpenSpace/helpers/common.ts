import { channels } from "./channels";
import epg from "./epg";

export const fetchChannels = async () => new Promise((res) => res(channels));

export const fetchEpg = async () => await epg();

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Payload } from "payload";
import type { InitOptions } from "payload";

import dotenv from "dotenv";
import payload from "payload";

dotenv.config();

// TODO: Remove any when Payload CMS has a fix for the global client definition
let cachedPayload = (global as any).payload;

if (!cachedPayload) {
  // TODO: Remove any when Payload CMS has a fix for the global client definition
  cachedPayload = (global as any).payload = { client: null, promise: null };
}

interface Args {
  initOptions?: Partial<InitOptions>;
}

export const getPayloadClient = async ({ initOptions }: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("[x] PAYLOAD_SECRET environment variable is missing");
  }

  if (cachedPayload.client) {
    return cachedPayload.client;
  }

  try {
    cachedPayload.client = await cachedPayload.promise;
  } catch (error) {
    console.error(`[x] CMS Error: ${error}`);
    cachedPayload.promise = null;
    throw error;
  }

  return cachedPayload.client;
};

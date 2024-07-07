/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { makeRouteHandler } from "@keystatic/next/route-handler";

import keystaticConfig from "../../../../../keystatic.config";

export const { GET, POST } = makeRouteHandler({
  config: keystaticConfig,
});

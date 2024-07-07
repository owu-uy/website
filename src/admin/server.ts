import path from "path";

import dotenv from "dotenv";
import express from "express";
import next from "next";
import nextBuild from "next/dist/build";

import { seed } from "./seed";
import { getPayloadClient } from "./utils/getPayload";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

const start = async (): Promise<void> => {
  const payload = await getPayloadClient({
    initOptions: {
      // onInit: async (newPayload) => {
      //   newPayload.logger.info(`[x] CMS Admin URL: ${newPayload.getAdminURL()}`);
      // },
    },
  });

  if (process.env.PAYLOAD_SEED === "true") {
    payload.logger.info("Seeding data...");

    await seed(payload);
    process.exit();
  }

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info(`[x] Next.js is now building...`);
      // @ts-expect-error - nextBuild is not typed
      await nextBuild(path.join(__dirname, ".."));
      process.exit();
    });

    return;
  }

  const nextApp = next({
    dev: process.env.NODE_ENV !== "production",
  });

  const nextHandler = nextApp.getRequestHandler();

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("[x] Next.js started");

    app.listen(PORT, async () => {
      payload.logger.info(
        `Next.js App URL: ${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.PAYLOAD_PUBLIC_SERVER_URL}`
      );
    });
  });
};

start();

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import { slateEditor } from "@payloadcms/richtext-slate";
import dotenv from "dotenv";
import { buildConfig } from "payload";

import { PAYLOAD_API_URL } from "app/lib/constants";

import Logo from "../components/shared/Logo";

import { Agenda } from "./collections/Agenda";
import { Communities } from "./collections/Communities";
import { Locations } from "./collections/Locations";
import { Media } from "./collections/Media";
import { Meetups } from "./collections/Meetups";
import { Members } from "./collections/Member";
import { Sponsors } from "./collections/Sponsors";
dotenv.config();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    components: {
      graphics: {
        Logo,
      },
    },
    meta: {
      titleSuffix: " | OWU Admin Panel",
    },
  },
  collections: [Media, Sponsors, Agenda, Communities, Members, Meetups, Locations],
  db: postgresAdapter({
    migrationDir: path.resolve(dirname, "migrations"),
    pool: {
      connectionString: process.env.POSTGRES_URL,
    },
  }),
  editor: slateEditor({}),
  graphQL: {
    schemaOutputFile: path.resolve(dirname, "types/graphql/schema.graphql"),
  },
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: s3Adapter({
            bucket: "owu",
            config: {
              credentials: {
                accessKeyId: process.env.STORAGE_ACCESS_KEY_ID ?? "",
                secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY ?? "",
              },
              endpoint: process.env.STORAGE_ENDPOINT,
              region: "enam",
            },
          }),
        },
      },
    }),
  ],
  routes: {
    api: "/api/admin",
  },
  secret: process.env.PAYLOAD_SECRET ?? "",
  serverURL: PAYLOAD_API_URL,
  typescript: {
    outputFile: path.resolve(dirname, "types/ts/payload-types.ts"),
  },
});

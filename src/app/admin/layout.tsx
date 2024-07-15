/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */

import "@payloadcms/next/css";
import { RootLayout } from "@payloadcms/next/layouts";
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import React from "react";

import configPromise from "../../admin/payload.config";
type Args = {
  children: React.ReactNode;
};

function Layout({ children }: Args) {
  return <RootLayout config={configPromise}>{children}</RootLayout>;
}

export default Layout;

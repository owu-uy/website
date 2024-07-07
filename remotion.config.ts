import { Config } from "@remotion/cli/config";

import { webpackOverride } from "./src/app/lib/videos/remotion/webpack-override.mjs";

Config.setVideoImageFormat("jpeg");

Config.overrideWebpackConfig(webpackOverride);

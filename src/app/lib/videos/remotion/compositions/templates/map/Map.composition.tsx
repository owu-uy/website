import React from "react";
import { Composition, Folder } from "remotion";

import Map from "./Map";

export function MapComposition() {
  return (
    <Folder name="Map">
      <Composition
        component={Map}
        defaultProps={{
          events: [],
        }}
        durationInFrames={450}
        fps={30}
        height={1080}
        id="Map"
        width={1920}
      />
    </Folder>
  );
}

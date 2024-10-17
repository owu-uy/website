import React from "react";
import { Composition, Folder } from "remotion";

import { OpenSpace } from "./OpenSpace";

export function OpenSpaceComposition() {
  return (
    <Folder name="OpenSpace">
      <Composition
        component={OpenSpace}
        defaultProps={{}}
        durationInFrames={450}
        fps={30}
        height={1080}
        id="OpenSpace"
        width={1920}
      />
    </Folder>
  );
}

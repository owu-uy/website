import React from "react";
import { Folder } from "remotion";

import { TalksComposition } from "./speakers/talk/Talks.composition";
import { MapComposition } from "./map/Map.composition";
import { OpenSpaceComposition } from "./openspace/OpenSpace.composition";

export function Composition() {
  return (
    <Folder name="Owu">
      <TalksComposition />
      <MapComposition />
      <OpenSpaceComposition />
    </Folder>
  );
}

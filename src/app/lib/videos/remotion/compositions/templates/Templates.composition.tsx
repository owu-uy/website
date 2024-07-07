import React from "react";
import { Folder } from "remotion";

import { TalksComposition } from "./speakers/talk/Talks.composition";

export function Composition() {
  return (
    <Folder name="Owu">
      <TalksComposition />
    </Folder>
  );
}

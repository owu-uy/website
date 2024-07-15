import React from "react";
import { Composition, Folder } from "remotion";

import { AvatarWithCaption } from "./AvatarWithCaption";
import { IconWithCaption } from "./IconWithCaption";
import { TalkDetails } from "./TalkDetails";

export function MoleculesComposition() {
  return (
    <Folder name="Molecules">
      <Composition
        component={AvatarWithCaption}
        defaultProps={{
          caption: "Association Lyon.Js",
        }}
        durationInFrames={120}
        fps={30}
        height={1200}
        id="AvatarWithCaption"
        width={1200}
      />
      <Composition
        component={IconWithCaption}
        defaultProps={{
          caption: "19 Décembre 2023",
          iconifyId: "mdi:calendar",
          style: {
            color: "black",
            padding: 20,
          },
        }}
        durationInFrames={120}
        fps={30}
        height={1200}
        id="IconifyWithCaption"
        width={1200}
      />
      <Composition
        component={TalkDetails}
        defaultProps={{
          items: {
            date: "19 Décembre 2023",
            time: "17h30",
            location: "Salle 1",
          },
        }}
        durationInFrames={120}
        fps={30}
        height={1200}
        id="Details"
        width={1200}
      />
    </Folder>
  );
}

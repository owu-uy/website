import React from "react";
import { Composition, Folder, staticFile } from "remotion";

import { Avatar } from "./Avatar";
import { BackgroundCircleNoise } from "./BackgroundCircleNoise";
import { BackgroundFiller } from "./BackgroundFiller";
import { BackgroundTriangle } from "./BackgroundTriangle";
import { EventLogo } from "./EventLogo";
import { Text } from "./Text";
import { Title } from "./Title";

export function AtomsComposition() {
  return (
    <Folder name="Atoms">
      <Composition component={Avatar} durationInFrames={120} fps={30} height={1200} id="Avatar" width={1200} />
      <Composition component={EventLogo} durationInFrames={120} fps={30} height={1200} id="EventLogo" width={1200} />
      <Composition
        component={Text}
        defaultProps={{ children: "Hello World !" }}
        durationInFrames={120}
        fps={30}
        height={1200}
        id="Text"
        width={1200}
      />
      <Composition
        component={Title}
        defaultProps={{ children: "Hello World !" }}
        durationInFrames={120}
        fps={30}
        height={1200}
        id="Title"
        width={1200}
      />
      <Composition
        component={BackgroundFiller}
        defaultProps={{
          imageUrl: staticFile("/images/showcases/lyonjs/defaultBackgroundImage.jpeg"),
        }}
        durationInFrames={120}
        fps={30}
        height={1200}
        id="ImageBackground"
        width={1200}
      />
      <Composition
        component={BackgroundTriangle}
        durationInFrames={120}
        fps={30}
        height={1080}
        id="TriangleBackground"
        width={1920}
      />
      <Composition
        component={BackgroundCircleNoise}
        defaultProps={{ speed: 0.01, circleRadius: 5, maxOffset: 20 }}
        durationInFrames={150}
        fps={30}
        height={700}
        id="BackgroundCircleNoise"
        width={1200}
      />
    </Folder>
  );
}

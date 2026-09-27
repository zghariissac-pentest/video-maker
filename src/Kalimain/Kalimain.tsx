import React from "react";
import { Series } from "remotion";
import { Scene1_Reply } from "./scenes/Scene1_Reply";
import { Scene2_Tools } from "./scenes/Scene2_Tools";
import { Scene3_Root } from "./scenes/Scene3_Root";
import { Scene4_Comments } from "./scenes/Scene4_Comments";

export const Kalimain: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={300}>
        <Scene1_Reply />
      </Series.Sequence>
      <Series.Sequence durationInFrames={360}>
        <Scene2_Tools />
      </Series.Sequence>
      <Series.Sequence durationInFrames={360}>
        <Scene3_Root />
      </Series.Sequence>
      <Series.Sequence durationInFrames={360}>
        <Scene4_Comments />
      </Series.Sequence>
    </Series>
  );
};

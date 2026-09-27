import React from "react";
import { Series } from "remotion";
import { Scene1_Visualizer } from "./scenes/Scene1_Visualizer";
import { Scene2_AIReplace } from "./scenes/Scene2_AIReplace";
import { Scene3_EntryJobs } from "./scenes/Scene3_EntryJobs";
import { Scene4_HighStandard } from "./scenes/Scene4_HighStandard";
import { Scene5_Context } from "./scenes/Scene5_Context";

export const MyOpinion1: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={180}>
        <Scene1_Visualizer />
      </Series.Sequence>
      <Series.Sequence durationInFrames={300}>
        <Scene2_AIReplace />
      </Series.Sequence>
      <Series.Sequence durationInFrames={300}>
        <Scene3_EntryJobs />
      </Series.Sequence>
      <Series.Sequence durationInFrames={300}>
        <Scene4_HighStandard />
      </Series.Sequence>
      <Series.Sequence durationInFrames={300}>
        <Scene5_Context />
      </Series.Sequence>
    </Series>
  );
};

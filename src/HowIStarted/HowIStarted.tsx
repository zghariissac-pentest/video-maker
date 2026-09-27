import React from "react";
import { Series } from "remotion";
import { Scene1_Hook } from "./scenes/Scene1_Hook";
import { Scene3_Random } from "./scenes/Scene3_Random";
import { Scene4_Knowledge } from "./scenes/Scene4_Knowledge";
import { Scene5_Final } from "./scenes/Scene5_Final";

// Video: howistarted — TorAndTails style
// Only your script, scene by scene
export const HowIStarted: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={210}>
        <Scene1_Hook />
      </Series.Sequence>
      <Series.Sequence durationInFrames={260}>
        <Scene3_Random />
      </Series.Sequence>
      <Series.Sequence durationInFrames={260}>
        <Scene4_Knowledge />
      </Series.Sequence>
      <Series.Sequence durationInFrames={280}>
        <Scene5_Final />
      </Series.Sequence>
    </Series>
  );
};

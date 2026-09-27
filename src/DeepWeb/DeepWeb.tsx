import React from "react";
import { Series } from "remotion";
import { Scene1_Myth } from "./scenes/Scene1_Myth";
import { Scene2_Explain } from "./scenes/Scene2_Explain";
import { Scene3_Onion } from "./scenes/Scene3_Onion";
import { Scene4_RelayBounce } from "./scenes/Scene4_RelayBounce";
import { Scene5_RealUsers } from "./scenes/Scene5_RealUsers";

export const DeepWeb: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={300}>
        <Scene1_Myth />
      </Series.Sequence>
      <Series.Sequence durationInFrames={420}>
        <Scene2_Explain />
      </Series.Sequence>
      <Series.Sequence durationInFrames={360}>
        <Scene3_Onion />
      </Series.Sequence>
      <Series.Sequence durationInFrames={360}>
        <Scene4_RelayBounce />
      </Series.Sequence>
      <Series.Sequence durationInFrames={360}>
        <Scene5_RealUsers />
      </Series.Sequence>
    </Series>
  );
};

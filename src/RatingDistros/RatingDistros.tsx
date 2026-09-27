import React from "react";
import { Series } from "remotion";
import { Scene1_Hook } from "./scenes/Scene1_Hook";
import { Scene2_TierList } from "./scenes/Scene2_TierList";
import { Scene3_UbuntuTier } from "./scenes/Scene3_UbuntuTier";

export const RatingDistros: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={105}>
        <Scene1_Hook />
      </Series.Sequence>
      <Series.Sequence durationInFrames={540}>
        <Scene2_TierList />
      </Series.Sequence>
      <Series.Sequence durationInFrames={540}>
        <Scene3_UbuntuTier />
      </Series.Sequence>
    </Series>
  );
};

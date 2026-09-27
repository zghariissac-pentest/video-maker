import React from "react";
import { Series } from "remotion";
import { Scene1Hook, SCENE1_DURATION } from "./scenes/Scene1_Hook";
import { Scene2University, SCENE2_DURATION } from "./scenes/Scene2_University";

// BacMen — you feed scenes one by one. Add new scenes here as we build them.
// Keep it clean / light / premium.

export const BacMen: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={SCENE1_DURATION}>
        <Scene1Hook />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE2_DURATION}>
        <Scene2University />
      </Series.Sequence>
    </Series>
  );
};

// Helpers for Root.tsx
export const BACMEN_DURATION = SCENE1_DURATION + SCENE2_DURATION;
export const BACMEN_FPS = 30;
export const BACMEN_WIDTH = 1080;
export const BACMEN_HEIGHT = 1920;

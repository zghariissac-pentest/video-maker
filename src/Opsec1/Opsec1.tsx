import React from "react";
import { Series } from "remotion";
import { Scene1_Hook } from "./scenes/Scene1_Hook";

// opsec1 — terminal hook + clean high-motion rest (to be added scene by scene)
import { Scene2_LeakAndIsolation } from "./scenes/Scene2_LeakAndIsolation";
import { Scene3_IsolatedPersonas } from "./scenes/Scene3_IsolatedPersonas";
import { Scene4_Intersection } from "./scenes/Scene4_Intersection";
import { Scene5_BehavioralLeaks } from "./scenes/Scene5_BehavioralLeaks";

export const Opsec1: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={240}>
        <Scene1_Hook />
      </Series.Sequence>
      <Series.Sequence durationInFrames={380}>
        <Scene2_LeakAndIsolation />
      </Series.Sequence>
      <Series.Sequence durationInFrames={360}>
        <Scene3_IsolatedPersonas />
      </Series.Sequence>
      <Series.Sequence durationInFrames={380}>
        <Scene4_Intersection />
      </Series.Sequence>
      <Series.Sequence durationInFrames={300}>
        <Scene5_BehavioralLeaks />
      </Series.Sequence>
    </Series>
  );
};

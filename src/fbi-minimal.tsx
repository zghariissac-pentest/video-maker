import { registerRoot } from "remotion";
import { Fbi } from "./Fbi/Fbi";
import React from "react";
import { Composition } from "remotion";

const Root: React.FC = () => {
  return React.createElement(Composition, { id: "Fbi", component: Fbi, durationInFrames: 150, fps: 30, width: 1080, height: 1920 });
};

registerRoot(Root);

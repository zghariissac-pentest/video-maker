import { registerRoot } from "remotion";
import { Rdp } from "./Rdp/Rdp";
import React from "react";
import { Composition } from "remotion";

const Root: React.FC = () => {
  return React.createElement(Composition, { id: "Rdp", component: Rdp, durationInFrames: 760, fps: 30, width: 1080, height: 1920 });
};

registerRoot(Root);

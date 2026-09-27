import { registerRoot } from "remotion";
import { IP } from "./IP/IP";
import React from "react";
import { Composition } from "remotion";

const Root: React.FC = () => {
  return React.createElement(Composition, { id: "IP", component: IP, durationInFrames: 1290, fps: 30, width: 1080, height: 1920 });
};

registerRoot(Root);

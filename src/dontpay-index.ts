import "./index.css";
import { registerRoot } from "remotion";
import { Dontpay } from "./Dontpay/Dontpay";
import React from "react";
import { Composition } from "remotion";

export const RemotionRoot: React.FC = () => {
  return React.createElement(Composition, {
    id: "Dontpay",
    component: Dontpay,
    durationInFrames: 1060,
    fps: 30,
    width: 1080,
    height: 1920,
  });
};

registerRoot(RemotionRoot);

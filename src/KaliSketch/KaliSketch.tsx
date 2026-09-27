import React from "react";
import { Series } from "remotion";
import { SketchHook } from "./scenes/SketchHook";
import { SketchTools } from "./scenes/SketchTools";
import { SketchRoot } from "./scenes/SketchRoot";
import { SketchRoast } from "./scenes/SketchRoast";

export const KaliSketch: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={240}>
        <SketchHook />
      </Series.Sequence>
      <Series.Sequence durationInFrames={300}>
        <SketchTools />
      </Series.Sequence>
      <Series.Sequence durationInFrames={300}>
        <SketchRoot />
      </Series.Sequence>
      <Series.Sequence durationInFrames={360}>
        <SketchRoast />
      </Series.Sequence>
    </Series>
  );
};

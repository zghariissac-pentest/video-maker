import React from "react";
import { AbsoluteFill, Series, staticFile, Video } from "remotion";
import { CodingScene1 } from "./CodingScene1";
import { CodingScene2 } from "./CodingScene2";
import { CodingScene3 } from "./CodingScene3";
import { CodingScene4 } from "./CodingScene4";
import { CodingScene5 } from "./CodingScene5";

const CodingRest: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
    </AbsoluteFill>
  );
};

export const Coding: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Series>
        <Series.Sequence durationInFrames={210} name="Hook - C++">
          <CodingScene1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={270} name="Entry level - SOC">
          <CodingScene2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240} name="GRC + VulnMgmt">
          <CodingScene3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240} name="AI writes code">
          <CodingScene4 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240} name="You review - last line">
          <CodingScene5 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240} name="BG loop - rest">
          <CodingRest />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

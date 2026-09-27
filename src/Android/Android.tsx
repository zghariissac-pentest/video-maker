import React from "react";
import { AbsoluteFill, Series, staticFile, Video } from "remotion";
import { AndroidScene1 } from "./AndroidScene1";
import { AndroidScene2 } from "./AndroidScene2";
import { AndroidScene3 } from "./AndroidScene3";
import { AndroidScene4 } from "./AndroidScene4";

const AndroidRest: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
    </AbsoluteFill>
  );
};

export const Android: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Series>
        <Series.Sequence durationInFrames={210} name="Hook - Android Linux">
          <AndroidScene1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240} name="Kernel - Linux based">
          <AndroidScene2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={360} name="What kernel does">
          <AndroidScene3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={300} name="Google builds on top">
          <AndroidScene4 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={90} name="BG loop - rest">
          <AndroidRest />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

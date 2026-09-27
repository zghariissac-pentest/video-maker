import React from "react";
import "./index.css";
import { Composition } from "remotion";
import { Android } from "./Android/Android";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="Android" component={Android} durationInFrames={1200} fps={30} width={1080} height={1920} />
    </>
  );
};

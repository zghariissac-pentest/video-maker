import React from "react";
import "./index.css";
import { Composition } from "remotion";
import { Coding } from "./Coding/Coding";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="Coding" component={Coding} durationInFrames={1680} fps={30} width={1080} height={1920} />
    </>
  );
};

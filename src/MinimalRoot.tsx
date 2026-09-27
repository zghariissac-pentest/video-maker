import React from "react";
import "./index.css";
import { Composition } from "remotion";
import { Aw } from "./Aw/Aw";
import { Kalisucks } from "./Kalisucks/Kalisucks";
import { BestV2 } from "./BestV2/BestV2";
import { WhyLinuxOverWindows } from "./WhyLinuxOverWindows/WhyLinuxOverWindows";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="aw" component={Aw} durationInFrames={630} fps={30} width={1080} height={1920} />
      <Composition id="kalisucks" component={Kalisucks} durationInFrames={840} fps={30} width={1080} height={1920} />
      <Composition id="bestv2" component={BestV2} durationInFrames={390} fps={30} width={1080} height={1920} />
      <Composition id="whylinuxoverwindows" component={WhyLinuxOverWindows} durationInFrames={150} fps={30} width={1080} height={1920} />
    </>
  );
};

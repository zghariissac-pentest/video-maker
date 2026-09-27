import {registerRoot} from "remotion";
import React from "react";
import {Composition} from "remotion";
import {WebApp1} from "./WebApp1/WebApp1";
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="WebApp1" component={WebApp1} durationInFrames={1260} fps={30} width={1080} height={1920} />
    </>
  );
};
registerRoot(RemotionRoot);

import {registerRoot} from "remotion";
import React from "react";
import {Composition} from "remotion";
import {Vs} from "./Vs/Vs";
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="Vs" component={Vs} durationInFrames={900} fps={30} width={1080} height={1920} />
    </>
  );
};
registerRoot(RemotionRoot);

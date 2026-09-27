import {registerRoot} from "remotion";
import React from "react";
import {Composition} from "remotion";
import {Certsvsreality} from "./Certsvsreality/Certsvsreality";
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="Certsvsreality" component={Certsvsreality} durationInFrames={1050} fps={30} width={1080} height={1920} />
    </>
  );
};
registerRoot(RemotionRoot);

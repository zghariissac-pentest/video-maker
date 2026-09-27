import {registerRoot} from "remotion";
import React from "react";
import {Composition} from "remotion";
import {WebApp2} from "./WebApp2/WebApp2";
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="WebApp2" component={WebApp2} durationInFrames={1560} fps={30} width={1080} height={1920} />
    </>
  );
};
registerRoot(RemotionRoot);

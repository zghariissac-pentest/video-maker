import {registerRoot} from "remotion";
import React from "react";
import {Composition} from "remotion";
import {Books} from "./Books/Books";
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="Books" component={Books} durationInFrames={1040} fps={30} width={1080} height={1920} />
    </>
  );
};
registerRoot(RemotionRoot);

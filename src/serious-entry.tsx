import {registerRoot} from "remotion";
import React from "react";
import {Composition} from "remotion";
import {SeriousSituation} from "./SeriousSituation/SeriousSituation";
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="SeriousSituation" component={SeriousSituation} durationInFrames={800} fps={30} width={1080} height={1920} />
    </>
  );
};
registerRoot(RemotionRoot);

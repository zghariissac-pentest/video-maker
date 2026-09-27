export const machineCompositions: Array<{
    id: string;
    component: React.FC;
    durationInFrames: number;
    fps: number;
    width: number;
    height: number;
}> = [];

// Generated: MyFirstVideo
import { MyFirstVideo } from "./machine-generated/MyFirstVideo/MyFirstVideo";
machineCompositions.push({
  id: "MyFirstVideo",
  component: MyFirstVideo,
  durationInFrames: 300,
  fps: 30,
  width: 1080,
  height: 1920
});



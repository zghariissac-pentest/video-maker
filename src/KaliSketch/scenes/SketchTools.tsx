import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MemeCaption, STICKER } from "../meme";

const tools = [
  { src: "assets/burpsuite.svg", radius: 225, speed: 0.016, phase: 0 },
  { src: "wireshark.svg", radius: 225, speed: -0.013, phase: Math.PI / 2 },
  { src: "assets/hackthebox.png", radius: 225, speed: 0.016, phase: Math.PI },
  {
    src: "assets/exploitdb.png",
    radius: 225,
    speed: -0.013,
    phase: (3 * Math.PI) / 2,
  },
];

export const SketchTools: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) =>
    spring({ frame: frame - d, fps, config: { damping: 14, stiffness: 120 } });

  const brainIn = s(6);

  return (
    <AbsoluteFill
      style={{ background: "#000000" }}
      className="flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative" style={{ width: 640, height: 460 }}>
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            opacity: brainIn,
            transform: "translate(-50%,-52%)",
          }}
        >
          <Img
            src={staticFile("assets/wojak/brainlet.png")}
            style={{ width: 250, height: 250, objectFit: "contain", ...STICKER }}
          />
        </div>
        {tools.map((t, i) => {
          const enter = s(26 + i * 12);
          const angle = t.phase + frame * t.speed * 2.4;
          const x = Math.cos(angle) * t.radius;
          const y = Math.sin(angle) * t.radius * 0.62;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                opacity: enter,
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${interpolate(enter, [0, 1], [0.4, 1])}) rotate(${Math.sin(frame * 0.06 + i) * 8}deg)`,
              }}
            >
              <Img
                src={staticFile(t.src)}
                style={{ width: 92, height: 92, objectFit: "contain", ...STICKER }}
              />
            </div>
          );
        })}
      </div>

      {/* soyjak laughing in corner */}
      <div
        className="absolute bottom-24 right-4"
        style={{
          opacity: s(120),
          transform: `rotate(6deg) scale(${interpolate(s(120), [0, 1], [0.4, 1])})`,
        }}
      >
        <Img
          src={staticFile("assets/wojak/soyjak.png")}
          style={{ width: 190, height: 190, objectFit: "contain", ...STICKER }}
        />
        <div
          className="font-mono font-black text-black bg-white px-2 py-0.5 text-center"
          style={{ fontSize: 20, transform: "rotate(-4deg)" }}
        >
          ههههه
        </div>
      </div>

      <div className="px-6 mt-2">
        <MemeCaption delay={30} fontSize={44}>
          مخك وأنت تحمل 200 أداة
        </MemeCaption>
      </div>
      <div className="px-6 mt-2">
        <MemeCaption delay={130} fontSize={40} color="#00FF88" rotate={2}>
          199 منهم عمرك ما راح تفتحهم
        </MemeCaption>
      </div>

      <Sequence from={26}>
        <Audio src={staticFile("assets/cyber/sfx/pop.mp3")} volume={0.6} />
      </Sequence>
      <Sequence from={120}>
        <Audio src={staticFile("assets/cyber/sfx/pop.mp3")} volume={0.8} />
      </Sequence>
    </AbsoluteFill>
  );
};

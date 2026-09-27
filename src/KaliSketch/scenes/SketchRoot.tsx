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

export const SketchRoot: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) =>
    spring({ frame: frame - d, fps, config: { damping: 16, stiffness: 110 } });

  const rows = ["nmap -sV", "burpsuite", "wireshark", "msfconsole", "hydra"];

  return (
    <AbsoluteFill
      style={{ background: "#000000" }}
      className="flex flex-col items-center justify-center overflow-hidden"
    >
      {/* soyjak pointing */}
      <div
        className="absolute left-2 top-1/3"
        style={{
          opacity: s(8),
          transform: `translateX(${interpolate(s(8), [0, 1], [-200, 0])}px) rotate(-5deg)`,
        }}
      >
        <Img
          src={staticFile("assets/wojak/soyjak.png")}
          style={{
            width: 230,
            height: 230,
            objectFit: "contain",
            ...STICKER,
            transform: "scaleX(-1)",
          }}
        />
        <div
          className="font-mono font-black text-black bg-white px-2 py-0.5 text-center"
          style={{ fontSize: 22, transform: "rotate(3deg)" }}
        >
          شوف شوف!
        </div>
      </div>

      {/* terminal spewing root */}
      <div
        className="w-full max-w-[560px] ml-[200px] rounded-[14px] bg-[#0b0e14] border-2 border-white overflow-hidden"
        style={{
          opacity: s(20),
          transform: `translateY(${interpolate(s(20), [0, 1], [30, 0])}px)`,
          boxShadow: "6px 6px 0 rgba(255,255,255,0.15)",
        }}
      >
        <div className="px-4 py-2 border-b-2 border-white/20 font-mono text-[12px] font-black text-white">
          root@kali:~#
        </div>
        <div className="p-3 font-mono text-[14px] leading-[1.8] min-h-[190px]">
          {rows.map((r, i) => {
            const show = frame >= 40 + i * 14;
            return (
              <div key={i} style={{ opacity: show ? 1 : 0 }}>
                <span className="text-red-500 font-black">root</span>
                <span className="text-white/60"> :: {r}</span>
              </div>
            );
          })}
          {frame >= 40 + rows.length * 14 && (
            <div className="text-green-400 font-black">
              [ كلش root — ولا سطر واحد باسمك ]
            </div>
          )}
        </div>
      </div>

      {/* big OFF toggle */}
      <div
        className="mt-5 flex items-center gap-3"
        style={{
          opacity: s(140),
          transform: `scale(${interpolate(s(140), [0, 1], [1.5, 1])}) rotate(-2deg)`,
        }}
      >
        <span className="font-mono font-black text-white/60" style={{ fontSize: 20 }}>
          APPARMOR
        </span>
        <div className="w-[110px] h-[52px] rounded-full bg-red-500 border-4 border-white flex items-center px-1">
          <div className="w-[38px] h-[38px] rounded-full bg-white font-mono font-black text-black flex items-center justify-center" style={{ fontSize: 12 }}>
            OFF
          </div>
        </div>
      </div>

      <div className="px-6 mt-4">
        <MemeCaption delay={170} fontSize={42}>
          كلش root و الحماية طافية
        </MemeCaption>
      </div>

      <Sequence from={40}>
        <Audio src={staticFile("assets/cyber/sfx/typing.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={140}>
        <Audio src={staticFile("assets/cyber/sfx/impact.mp3")} volume={0.9} />
      </Sequence>
    </AbsoluteFill>
  );
};

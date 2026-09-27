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

export const SketchHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) =>
    spring({ frame: frame - d, fps, config: { damping: 13, stiffness: 130 } });

  const noobIn = s(6);
  const kaliIn = s(30);
  const gmailIn = s(58);

  // Zoom-punch when Gmail pops
  const punch =
    frame >= 58 && frame < 70
      ? interpolate(frame, [58, 64, 70], [1, 1.1, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  const shake =
    frame >= 30 && frame < 42
      ? Math.sin((frame - 30) * 2.6) *
        interpolate(frame, [30, 42], [10, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  return (
    <AbsoluteFill
      style={{ background: "#000000" }}
      className="overflow-hidden"
    >
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ transform: `scale(${punch}) translateX(${shake}px)` }}
      >
        {/* POV label */}
        <div
          className="font-mono font-black tracking-[0.2em] text-black bg-white px-4 py-1.5"
          style={{
            fontSize: 26,
            opacity: s(0),
            transform: `rotate(-2deg) scale(${interpolate(s(0), [0, 1], [1.6, 1])})`,
            boxShadow: "5px 5px 0 rgba(255,255,255,0.2)",
          }}
        >
          POV:
        </div>

        {/* noob vs Kali */}
        <div className="mt-6 flex items-end justify-center gap-4 w-full px-6">
          <div
            style={{
              opacity: noobIn,
              transform: `translateX(${interpolate(noobIn, [0, 1], [-260, 0])}px) rotate(-3deg)`,
            }}
          >
            <Img
              src={staticFile("assets/wojak/noob.png")}
              style={{ width: 300, height: 300, objectFit: "contain", ...STICKER }}
            />
          </div>
          <div
            className="font-black text-white self-center"
            style={{ fontSize: 54, opacity: kaliIn }}
          >
            VS
          </div>
          <div
            style={{
              opacity: kaliIn,
              transform: `translateX(${interpolate(kaliIn, [0, 1], [260, 0])}px) rotate(3deg)`,
            }}
          >
            <Img
              src={staticFile("assets/kalimain/kali_logo.png")}
              style={{ width: 280, height: 280, objectFit: "contain", ...STICKER }}
            />
          </div>
        </div>

        {/* red arrow down to Gmail */}
        <svg
          width="60"
          height="90"
          viewBox="0 0 60 90"
          style={{
            opacity: gmailIn,
            transform: `translateY(${interpolate(gmailIn, [0, 1], [-16, 0])}px)`,
            marginTop: 4,
          }}
        >
          <path
            d="M30 4 L30 66 M12 50 L30 70 L48 50"
            stroke="#ef4444"
            strokeWidth={9}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Gmail circled */}
        <div
          className="relative"
          style={{
            opacity: gmailIn,
            transform: `scale(${interpolate(gmailIn, [0, 1], [0.5, 1])}) rotate(2deg)`,
          }}
        >
          <div className="bg-white rounded-[22px] p-4">
            <Img
              src={staticFile("assets/kalimain/gmail.svg")}
              style={{ width: 120, height: 120, objectFit: "contain" }}
            />
          </div>
          <div
            className="absolute -inset-3 rounded-[28px] border-[6px] border-red-500 pointer-events-none"
            style={{ transform: "rotate(-3deg)" }}
          />
        </div>

        <div className="mt-7 px-6">
          <MemeCaption delay={76} fontSize={46}>
            ثبت كالي باش تريبوندي على إيميل
          </MemeCaption>
        </div>
      </div>

      <Sequence from={30}>
        <Audio src={staticFile("assets/cyber/sfx/impact.mp3")} volume={0.9} />
      </Sequence>
      <Sequence from={58}>
        <Audio src={staticFile("assets/cyber/sfx/pop.mp3")} volume={0.8} />
      </Sequence>
    </AbsoluteFill>
  );
};

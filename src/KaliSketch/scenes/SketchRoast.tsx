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

const comments = [
  { logo: "assets/distros/ubuntu.svg", user: "@user_dz", roast: "snap بطيء صاحبي" },
  { logo: "assets/distros/archlinux.svg", user: "@arch_btw", roast: "التحديث كسر النظام؟" },
  { logo: "assets/distros/windows-real.png", user: "@windows11", roast: "defender حذف الكراك؟" },
];

export const SketchRoast: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) =>
    spring({ frame: frame - d, fps, config: { damping: 18, stiffness: 110 } });

  // Record-scratch freeze: first 10 frames grayscale + crack
  const frozen = frame < 10;

  return (
    <AbsoluteFill
      style={{
        background: "#000000",
        filter: frozen ? "grayscale(1) contrast(1.25)" : "none",
      }}
      className="flex flex-col items-center justify-center overflow-hidden"
    >
      {frozen && (
        <>
          <svg viewBox="0 0 1080 1920" className="absolute inset-0 w-full h-full pointer-events-none">
            <path d="M 0 640 L 1080 700 M 0 1200 L 1080 1240" stroke="white" strokeWidth={3} opacity={0.9} />
          </svg>
          <div
            className="font-mono font-black text-black bg-white px-4 py-1"
            style={{ fontSize: 24, transform: "rotate(-3deg)" }}
          >
            * RECORD SCRATCH *
          </div>
        </>
      )}

      {!frozen && (
        <>
          {/* chad approves */}
          <div
            className="absolute bottom-16 right-2"
            style={{
              opacity: s(14),
              transform: `rotate(4deg) scale(${interpolate(s(14), [0, 1], [0.6, 1])})`,
            }}
          >
            <Img
              src={staticFile("assets/wojak/chad.png")}
              style={{ width: 220, height: 220, objectFit: "contain", ...STICKER }}
            />
          </div>

          <div className="w-full max-w-[800px] px-6 space-y-3">
            {comments.map((c, i) => {
              const p = s(30 + i * 30);
              return (
                <div
                  key={i}
                  className="rounded-[14px] bg-white/[0.06] border-2 border-white p-3 flex gap-3 items-center"
                  style={{
                    opacity: p,
                    transform: `translateX(${interpolate(p, [0, 1], [-60, 0])}px) rotate(-1deg)`,
                    boxShadow: "5px 5px 0 rgba(255,255,255,0.12)",
                  }}
                >
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0">
                    <Img
                      src={staticFile(c.logo)}
                      style={{ width: 32, height: 32, objectFit: "contain" }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-[11px] text-white/40">{c.user}</div>
                    <div
                      dir="rtl"
                      className="font-black text-red-400 text-right"
                      style={{ fontFamily: "Cairo, sans-serif", fontSize: 19 }}
                    >
                      {c.roast}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-6 mt-6">
            <MemeCaption delay={130} fontSize={42}>
              اكتب نظامك وارواح نتنمرو
            </MemeCaption>
          </div>

          <Sequence from={30}>
            <Audio src={staticFile("assets/cyber/sfx/pop.mp3")} volume={0.7} />
          </Sequence>
        </>
      )}
    </AbsoluteFill>
  );
};

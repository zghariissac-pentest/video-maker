import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Flame, Heart, MessageCircle, Send } from "lucide-react";

const comments = [
  {
    logo: "assets/distros/ubuntu.svg",
    user: "user_dz",
    text: "أنا نستعمل أوبونتو",
    roast: "snap بطيء صاحبي",
    color: "#e95420",
  },
  {
    logo: "assets/distros/archlinux.svg",
    user: "arch_btw",
    text: "arch btw",
    roast: "التحديث كسر النظام؟",
    color: "#1793d1",
  },
  {
    logo: "assets/distros/linuxmint.svg",
    user: "mint_fan",
    text: "mint خفيف ونظيف",
    roast: "جدك يستعملو ثاني",
    color: "#22c55e",
  },
  {
    logo: "assets/distros/windows-real.png",
    user: "windows11",
    text: "ويندوز 11",
    roast: "defender حذف الكراك؟",
    color: "#0078d4",
  },
];

export const Scene4_Comments: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) =>
    spring({ frame: frame - d, fps, config: { damping: 19, stiffness: 105 } });

  const boxIn = s(8);
  const text1In = s(26);
  const text2In = s(44);

  // fake typing in comment box
  const draft = "أنا نستعمل...";
  const typed = draft.slice(
    0,
    Math.floor(
      interpolate(frame, [18, 70], [0, draft.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    )
  );
  const cursorOn = frame < 74 && frame % 12 < 6;

  return (
    <AbsoluteFill
      style={{ background: "#000000" }}
      className="flex flex-col items-center justify-center overflow-hidden"
    >
      <div
        className="flex items-center gap-2"
        style={{
          opacity: boxIn,
          transform: `translateY(${interpolate(boxIn, [0, 1], [8, 0])}px)`,
        }}
      >
        <MessageCircle size={13} color="#22c55e" />
        <span className="font-mono text-[11px] tracking-[0.28em] text-white/35">
          COMMENTS • ROAST TIME
        </span>
      </div>

      {/* Comment input */}
      <div
        className="w-full max-w-[800px] mx-6 mt-5 rounded-full bg-white/[0.06] border border-white/12 flex items-center px-5 py-3.5 gap-3"
        style={{
          opacity: boxIn,
          transform: `translateY(${interpolate(boxIn, [0, 1], [10, 0])}px)`,
        }}
      >
        <div className="w-9 h-9 rounded-full bg-[#367bf0] flex items-center justify-center shrink-0 font-mono text-[13px] font-black text-white">
          أ
        </div>
        <div
          dir="rtl"
          className="flex-1 font-bold text-white/80"
          style={{ fontFamily: "Cairo, sans-serif", fontSize: 16 }}
        >
          {typed}
          {cursorOn && (
            <span className="inline-block w-[2px] h-4 bg-green-400 mr-1 align-middle" />
          )}
        </div>
        <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center shrink-0">
          <Send size={15} color="black" />
        </div>
      </div>

      {/* Comments flying in */}
      <div className="w-full max-w-[800px] mx-6 mt-4 space-y-3">
        {comments.map((c, i) => {
          const p = s(70 + i * 26);
          const likes = Math.floor(
            interpolate(frame, [78 + i * 26, 140 + i * 26], [3, 48 + i * 37], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          );
          const roastIn = s(92 + i * 26);
          return (
            <div
              key={i}
              className="rounded-[16px] bg-white/[0.05] border border-white/10 p-3.5 flex gap-3"
              style={{
                opacity: p,
                transform: `translateY(${interpolate(p, [0, 1], [16, 0])}px) scale(${interpolate(p, [0, 1], [0.95, 1])})`,
              }}
            >
              <div
                className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0"
                style={{ boxShadow: `0 0 12px ${c.color}30` }}
              >
                <Img
                  src={staticFile(c.logo)}
                  style={{ width: 30, height: 30, objectFit: "contain" }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[11px] text-white/40">
                  @{c.user}
                </div>
                <div
                  dir="rtl"
                  className="font-bold text-white text-right"
                  style={{ fontFamily: "Cairo, sans-serif", fontSize: 16 }}
                >
                  {c.text}
                </div>
                <div
                  dir="rtl"
                  className="mt-1.5 flex items-center gap-1.5 rounded-lg bg-red-500/10 border border-red-500/25 px-2.5 py-1.5"
                  style={{
                    opacity: roastIn,
                    transform: `translateX(${interpolate(roastIn, [0, 1], [10, 0])}px)`,
                  }}
                >
                  <Flame size={12} color="#ef4444" />
                  <span
                    className="font-bold text-red-300"
                    style={{ fontFamily: "Cairo, sans-serif", fontSize: 14 }}
                  >
                    {c.roast}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 shrink-0 pt-1">
                <Heart
                  size={16}
                  color="#ef4444"
                  fill={frame > 90 + i * 26 ? "#ef4444" : "transparent"}
                />
                <span className="font-mono text-[10px] text-white/50">
                  {likes}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Script text */}
      <div
        dir="rtl"
        className="text-center px-8 mt-6"
        style={{
          opacity: text1In,
          transform: `translateY(${interpolate(text1In, [0, 1], [12, 0])}px)`,
          filter: `blur(${interpolate(text1In, [0, 1], [6, 0])}px)`,
        }}
      >
        <div
          className="font-black leading-[1.6] text-white"
          style={{ fontFamily: "Cairo, sans-serif", fontSize: 30 }}
        >
          اكتب نظامك اليومي في{" "}
          <span style={{ color: "#22c55e" }}>لي كومنتار</span>
        </div>
        <div
          className="font-black leading-[1.6]"
          style={{
            fontFamily: "Cairo, sans-serif",
            fontSize: 30,
            color: "#fbbc04",
            opacity: text2In,
            transform: `translateY(${interpolate(text2In, [0, 1], [12, 0])}px)`,
            textShadow: "0 0 16px rgba(251,191,36,0.35)",
          }}
        >
          وارواح نتنمرو على بعضانا
        </div>
      </div>
    </AbsoluteFill>
  );
};

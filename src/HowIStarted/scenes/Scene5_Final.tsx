import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, random } from "remotion";

const MatrixBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const columns = Math.floor(width / 20);
  return (
    <AbsoluteFill className="bg-black overflow-hidden">
      {Array.from({ length: columns }).map((_, i) => {
        const speed = 1 + (i % 5) * 0.2;
        const offset = (i * 79) % height;
        const y = (frame * speed + offset) % (height + 200) - 100;
        return (
          <div
            key={i}
            className="absolute text-green-500 font-mono text-xs"
            style={{
              left: i * 20,
              top: y,
              opacity: 0.03,
              writingMode: "vertical-rl" as any,
              textOrientation: "upright" as any,
            }}
          >
            {Array.from({ length: 20 })
              .map((_, j) => (random(`s5-${i}-${j}`) > 0.5 ? "1" : "0"))
              .join("")}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const Scene5_Final: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) => spring({ frame: frame - d, fps, config: { damping: 22, stiffness: 70, mass: 1 } });

  const kickerIn = s(6);
  const l1 = s(22);
  const l2 = s(44);
  const l3 = s(68);
  const ctaIn = s(92);

  const pulse = 1 + Math.sin(frame * 0.08) * 0.02;

  return (
    <AbsoluteFill className="bg-black flex flex-col items-center justify-center overflow-hidden">
      <MatrixBackground />

      <div className="absolute w-[900px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(34,197,94,0.08), transparent 68%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

      <div className="absolute top-8 z-10 flex items-center gap-2.5" style={{ opacity: kickerIn, transform: `translateY(${interpolate(kickerIn, [0, 1], [6, 0])}px)` }}>
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.9)]" />
        <span className="font-mono text-[11px] tracking-[0.32em] text-green-500/85">FINAL</span>
        <span className="font-mono text-[10px] tracking-[0.16em] text-white/25">START NOW</span>
      </div>

      <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full max-w-[860px] px-6">
        {/* big play/start visual — clean */}
        <div
          className="relative w-[96px] h-[96px] rounded-full bg-white flex items-center justify-center mb-6"
          style={{
            opacity: ctaIn,
            transform: `scale(${interpolate(ctaIn, [0, 1], [0.82, 1]) * pulse})`,
            boxShadow: "0 0 28px rgba(34,197,94,0.45), 0 12px 30px rgba(0,0,0,0.4)",
            border: "2px solid rgba(34,197,94,0.9)",
          }}
        >
          <div className="w-0 h-0 border-l-[22px] border-l-black border-y-[14px] border-y-transparent ml-1" />
          <div className="absolute inset-0 rounded-full border border-green-500/20" style={{ transform: `scale(${1 + Math.sin(frame * 0.06) * 0.08})` }} />
        </div>

        <div dir="rtl" className="text-center space-y-3">
          <div
            className="font-bold leading-tight text-white"
            style={{ fontFamily: "Cairo, sans-serif", fontSize: 28, opacity: l1, transform: `translateY(${interpolate(l1, [0, 1], [10, 0])}px)` }}
          >
            تسما اذا راك حابس بسبة انك ملقيتش{" "}
            <span className="text-green-400">خطة مثالية</span>
          </div>
          <div
            className="font-bold leading-tight text-white"
            style={{ fontFamily: "Cairo, sans-serif", fontSize: 30, opacity: l2, transform: `translateY(${interpolate(l2, [0, 1], [10, 0])}px)` }}
          >
            متتستناش لانك <span className="text-white/60">مراحش تلقاها</span>
          </div>
          <div
            className="font-black leading-none"
            style={{
              fontFamily: "Cairo, sans-serif",
              fontSize: 38,
              color: "#22c55e",
              opacity: l3,
              transform: `translateY(${interpolate(l3, [0, 1], [10, 0])}px) scale(${interpolate(l3, [0, 1], [0.98, 1])})`,
              textShadow: "0 0 18px rgba(34,197,94,0.5)",
            }}
          >
            ابدا وخلي اهتمامك يخليك تكمل في التعلم
          </div>
        </div>

        <div
          className="mt-7 px-8 py-3 rounded-full bg-green-500 text-black font-black tracking-[0.14em] flex items-center gap-2"
          style={{
            fontFamily: "Cairo, sans-serif",
            fontSize: 16,
            opacity: ctaIn,
            transform: `translateY(${interpolate(ctaIn, [0, 1], [8, 0])}px) scale(${interpolate(ctaIn, [0, 1], [0.96, 1])})`,
            boxShadow: "0 8px 24px rgba(34,197,94,0.35)",
          }}
        >
          ابدا الآن — START
          <span>→</span>
        </div>

        <div className="mt-4 h-px w-20 bg-gradient-to-r from-transparent via-white/15 to-transparent" style={{ opacity: ctaIn }} />
      </div>
    </AbsoluteFill>
  );
};

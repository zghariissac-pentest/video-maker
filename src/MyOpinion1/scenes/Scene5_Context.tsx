import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { AlertTriangle, Eye, GitBranch, BotOff, Brain } from "lucide-react";

export const Scene5_Context: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) => spring({ frame: frame - d, fps, config: { damping: 26, stiffness: 68, mass: 1 } });

  const kickerIn = s(6);
  const cardsIn = s(18);
  const text1In = s(22);
  const text2In = s(42);
  const text3In = s(62);

  const items = [
    { Icon: AlertTriangle, title: "حالات جديدة", sub: "غير متوقعة", color: "#f59e0b" },
    { Icon: Eye, title: "فهم السياق", sub: "Context", color: "#3b82f6" },
    { Icon: GitBranch, title: "اتخاذ قرارات", sub: "حاسمة", color: "#22c55e" },
  ];

  return (
    <AbsoluteFill style={{ background: "#08090a" }} className="overflow-hidden">
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 38%, #121417 0%, #08090a 68%)" }} />
      <div className="absolute rounded-full overflow-hidden" style={{ width: 148, height: 148, right: 36, top: 36, border: "2.5px solid rgba(255,255,255,0.92)", boxShadow: "0 12px 30px rgba(0,0,0,0.5)", background: "white" }}>
        <Img src={staticFile("profile_myopinion1.png")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 18%", display: "block" }} />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-[50%] -translate-y-1/2 w-full max-w-[900px] px-6 flex flex-col items-center">
        <div className="flex items-center gap-2" style={{ opacity: kickerIn, transform: `translateY(${interpolate(kickerIn, [0, 1], [8, 0])}px)` }}>
          <Brain size={14} color="#22c55e" />
          <span className="font-mono text-[11px] tracking-[0.28em] text-green-400/80">HUMAN EDGE</span>
          <span className="font-mono text-[10px] text-white/25">NOT AUTOMATION</span>
        </div>

        <div className="mt-7 flex gap-4 justify-center" style={{ opacity: cardsIn }}>
          {items.map((it, i) => {
            const p = s(18 + i * 12);
            return (
              <div key={i} className="relative w-[264px] rounded-[22px] border bg-white/[0.05] backdrop-blur p-6 flex flex-col items-center text-center" style={{ borderColor: "rgba(255,255,255,0.10)", opacity: p, transform: `translateY(${interpolate(p, [0, 1], [10, 0])}px) scale(${interpolate(p, [0, 1], [0.96, 1])})` }}>
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-[0_6px_16px_rgba(0,0,0,0.25)]">
                  <it.Icon size={32} color="#0a0a0a" strokeWidth={1.9} />
                </div>
                <div className="mt-3 font-bold text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 17 }}>{it.title}</div>
                <div className="font-mono text-[11px] tracking-[0.14em] text-white/40">{it.sub}</div>
                <div className="mt-2 w-8 h-px" style={{ background: it.color, opacity: 0.6 }} />
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/08" style={{ opacity: s(54), transform: `translateY(${interpolate(s(54), [0, 1], [8, 0])}px)` }}>
          <BotOff size={13} color="#ef4444" />
          <span className="font-mono text-[10px] tracking-[0.18em] text-red-400/80 line-through">AUTOMATION</span>
          <span className="font-mono text-[10px] text-white/30">→ بعيدا كل البعد</span>
        </div>
      </div>

      <div dir="rtl" className="absolute left-0 right-0 mx-auto text-center px-8" style={{ top: "69%", maxWidth: 840, opacity: text1In, transform: `translateY(${interpolate(text1In, [0, 1], [8, 0])}px)` }}>
        <div className="font-bold leading-[1.7] text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 27, opacity: text1In }}>
          لان هاذو يحتاجو التعامل مع حالات جديدة و
          <span className="text-amber-400"> غير متوقعة</span>
        </div>
        <div className="mt-1 font-bold leading-[1.7]" style={{ fontFamily: "Cairo, sans-serif", fontSize: 27, opacity: text2In, transform: `translateY(${interpolate(text2In, [0, 1], [8, 0])}px)` }}>
          وفهم <span className="text-green-400">السياق</span> واتخاذ <span className="text-green-400">قرارات</span>
        </div>
        <div className="mt-1 font-bold leading-[1.7] text-red-400" style={{ fontFamily: "Cairo, sans-serif", fontSize: 26, opacity: text3In, transform: `translateY(${interpolate(text3In, [0, 1], [8, 0])}px)` }}>
          بعيدا كل البعد عن automation
        </div>
      </div>
    </AbsoluteFill>
  );
};

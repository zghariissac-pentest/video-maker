import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { Bot, Cpu, Shield, Users } from "lucide-react";

export const Scene2_AIReplace: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) => spring({ frame: frame - d, fps, config: { damping: 26, stiffness: 68, mass: 1 } });

  const pfpProgress = interpolate(frame, [0, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (t) => 1 - Math.pow(1 - t, 3) });
  const pfpSize = interpolate(pfpProgress, [0, 1], [460, 148]);
  const pfpX = interpolate(pfpProgress, [0, 1], [0, 360]);
  const pfpY = interpolate(pfpProgress, [0, 1], [0, -660]);

  const kickerIn = s(18);
  const cardsIn = s(30);
  const line1In = s(76);
  const line2In = s(94);

  const jobs = [
    { title: "SOC L1", sub: "Triage", status: "REPLACED", icon: Shield, color: "#ef4444" },
    { title: "Intel", sub: "Collection", status: "ASSISTED", icon: Cpu, color: "#3b82f6" },
    { title: "Pentest", sub: "Report", status: "HUMAN", icon: Users, color: "#22c55e" },
  ];

  return (
    <AbsoluteFill style={{ background: "#08090a" }} className="overflow-hidden">
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 42%, #121417 0%, #08090a 68%)" }} />
      <div className="absolute rounded-full overflow-hidden" style={{ width: pfpSize, height: pfpSize, left: "50%", top: "50%", transform: `translate(calc(-50% + ${pfpX}px), calc(-50% + ${pfpY}px))`, border: `${interpolate(pfpProgress, [0, 1], [3, 2.5])}px solid rgba(255,255,255,0.92)`, boxShadow: "0 12px 36px rgba(0,0,0,0.55)", background: "white", zIndex: 20 }}>
        <Img src={staticFile("profile_myopinion1.png")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 18%", display: "block" }} />
      </div>

      {/* clean centered animation — no small clutter */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-[18%] w-full max-w-[860px] px-6 flex flex-col items-center">
        <div className="flex items-center gap-2" style={{ opacity: kickerIn, transform: `translateY(${interpolate(kickerIn, [0, 1], [8, 0])}px)` }}>
          <Bot size={14} color="#22c55e" />
          <span className="font-mono text-[11px] tracking-[0.30em] text-green-500/80">AI vs JOBS</span>
        </div>

        <div className="mt-8 w-full flex gap-5 justify-center" style={{ opacity: cardsIn }}>
          {jobs.map((j, i) => {
            const d = s(34 + i * 16);
            return (
              <div key={i} className="flex-1 max-w-[250px] rounded-[24px] border bg-white/[0.04] backdrop-blur p-6 flex flex-col items-center text-center" style={{ borderColor: j.status === "REPLACED" ? "rgba(239,68,68,0.28)" : j.status === "ASSISTED" ? "rgba(59,130,246,0.28)" : "rgba(34,197,94,0.28)", opacity: d, transform: `translateY(${interpolate(d, [0, 1], [10, 0])}px) scale(${interpolate(d, [0, 1], [0.96, 1])})` }}>
                <div className="w-[72px] h-[72px] rounded-[18px] bg-white flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.25)]">
                  <j.icon size={30} color="#0a0a0a" strokeWidth={1.8} />
                </div>
                <div className="mt-3 font-mono text-[12px] tracking-[0.16em] text-white/90">{j.title}</div>
                <div className="font-mono text-[10px] text-white/40 tracking-[0.12em]">{j.sub}</div>
                <div className={`mt-3 px-3 py-1 rounded-full font-mono text-[10px] font-black tracking-widest ${j.status === "REPLACED" ? "bg-red-500 text-white" : j.status === "ASSISTED" ? "bg-blue-500 text-white" : "bg-green-500 text-black"}`}>{j.status}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* text under — visually comfortable: more line height, breathing */}
      <div dir="rtl" className="absolute left-0 right-0 mx-auto text-center px-8" style={{ top: "63%", maxWidth: 820, opacity: line1In }}>
        <div className="font-bold text-white leading-[1.6]" style={{ fontFamily: "Cairo, sans-serif", fontSize: 30, letterSpacing: -0.2, opacity: line1In, transform: `translateY(${interpolate(line1In, [0, 1], [8, 0])}px)` }}>
          نشوف انو ال <span className="text-green-400">AI</span> بالفعل راه قضى على عدة وظائف
        </div>
        <div className="mt-3 font-bold leading-[1.6]" style={{ fontFamily: "Cairo, sans-serif", fontSize: 28, opacity: line2In, transform: `translateY(${interpolate(line2In, [0, 1], [8, 0])}px)` }}>
          <span className="text-white/75">وراح ياخذ جزء في </span>
          <span className="text-green-400">المستقبل القريب</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

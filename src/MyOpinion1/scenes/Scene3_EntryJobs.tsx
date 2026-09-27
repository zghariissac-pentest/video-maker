import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { Shield, Headphones, FileText, Database, Link2, X, Bot } from "lucide-react";

export const Scene3_EntryJobs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) => spring({ frame: frame - d, fps, config: { damping: 26, stiffness: 68, mass: 1 } });

  const kickerIn = s(6);
  const text1In = s(18);
  const text2In = s(40);
  const text3In = s(64);

  const entryJobs = [
    { Icon: Shield, label: "SOC L1" },
    { Icon: Headphones, label: "HELPDESK" },
    { Icon: FileText, label: "Triage" },
    { Icon: Database, label: "Log Review" },
  ];

  // x marks appear after icons
  const xProgress = (i: number) => s(48 + i * 8);

  // chain appears at 110
  const chainIn = s(96);
  const chainPulse = Math.sin(frame * 0.12) * 0.3 + 0.7;

  // red marks on all after chain
  const redAll = s(148);

  return (
    <AbsoluteFill style={{ background: "#08090a" }} className="overflow-hidden">
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 38%, #111315 0%, #08090a 68%)" }} />

      {/* pfp stays top-right — same as previous scene end */}
      <div className="absolute rounded-full overflow-hidden" style={{ width: 148, height: 148, right: 36, top: 36, border: "2.5px solid rgba(255,255,255,0.92)", boxShadow: "0 12px 30px rgba(0,0,0,0.5)", background: "white" }}>
        <Img src={staticFile("profile_myopinion1.png")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 18%", display: "block" }} />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-[52%] -translate-y-1/2 w-full max-w-[900px] px-6 flex flex-col items-center">
        <div className="flex items-center gap-2" style={{ opacity: kickerIn, transform: `translateY(${interpolate(kickerIn, [0, 1], [8, 0])}px)` }}>
          <Bot size={14} color="#ef4444" />
          <span className="font-mono text-[11px] tracking-[0.28em] text-red-400/80">ENTRY LEVEL</span>
          <span className="font-mono text-[10px] text-white/25">AUTOMATION</span>
        </div>

        {/* Entry jobs row — appear then X on all */}
        <div className="mt-7 flex gap-4 justify-center">
          {entryJobs.map((j, i) => {
            const p = s(12 + i * 10);
            const xP = xProgress(i);
            return (
              <div key={i} className="relative flex flex-col items-center" style={{ opacity: p, transform: `translateY(${interpolate(p, [0, 1], [10, 0])}px) scale(${interpolate(p, [0, 1], [0.92, 1])})` }}>
                <div className="relative w-[144px] h-[144px] rounded-[22px] bg-white flex items-center justify-center border-2" style={{ borderColor: xP > 0.5 ? "rgba(239,68,68,0.85)" : "rgba(255,255,255,0.92)", boxShadow: xP > 0.5 ? "0 0 22px rgba(239,68,68,0.4)" : "0 10px 28px rgba(0,0,0,0.4)" }}>
                  <j.Icon size={46} color={xP > 0.5 ? "#ef4444" : "#0a0a0a"} strokeWidth={1.9} />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 border-2 border-black flex items-center justify-center shadow-[0_0_12px_rgba(239,68,68,0.6)]" style={{ opacity: xP, transform: `scale(${interpolate(xP, [0, 1], [0.6, 1])})` }}>
                    <X size={16} color="white" strokeWidth={3} />
                  </div>
                  <div className="absolute inset-0 rounded-[22px] bg-red-500/10 pointer-events-none" style={{ opacity: xP * 0.6 }} />
                </div>
                <span className="mt-3 font-mono text-[11px] tracking-[0.14em]" style={{ color: xP > 0.5 ? "#ef4444" : "rgba(255,255,255,0.78)" }}>{j.label}</span>
              </div>
            );
          })}
        </div>

        {/* Automation chain — like a chain text */}
        <div className="mt-6 relative w-full max-w-[640px] h-[54px] flex items-center justify-center" style={{ opacity: chainIn, transform: `translateY(${interpolate(chainIn, [0, 1], [8, 0])}px)` }}>
          <div className="absolute left-0 right-0 h-px bg-white/10" />
          <div className="absolute left-0 h-px bg-red-500/60" style={{ width: `${interpolate(frame, [110, 168], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%` }} />
          {/* chain links */}
          <div className="flex items-center gap-1 bg-[#0f0f0f] px-3 py-1.5 rounded-full border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
            {Array.from({ length: 7 }).map((_, k) => (
              <Link2 key={k} size={12} color={k % 2 === 0 ? "#ef4444" : "rgba(255,255,255,0.5)"} style={{ opacity: 0.7 + chainPulse * 0.3 }} />
            ))}
            <span className="ml-2 font-mono text-[11px] tracking-[0.22em] text-red-400 font-black">AUTOMATION</span>
            <span className="font-mono text-[9px] text-white/30 ml-1">CHAIN</span>
          </div>
        </div>

        {/* connected different jobs get red mark */}
        <div className="mt-4 flex gap-3" style={{ opacity: redAll, transform: `translateY(${interpolate(redAll, [0, 1], [8, 0])}px)` }}>
          {["JUNIOR SOC", "ALERT TRIAGE", "COMPLIANCE"].map((t, i) => (
            <div key={i} className="px-3 py-1.5 rounded-full border bg-red-500/10 flex items-center gap-1.5" style={{ borderColor: "rgba(239,68,68,0.35)" }}>
              <X size={10} color="#ef4444" strokeWidth={2.5} />
              <span className="font-mono text-[9px] tracking-[0.14em] text-red-400">{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div dir="rtl" className="absolute left-0 right-0 mx-auto text-center px-8" style={{ top: "69%", maxWidth: 860, opacity: text1In, transform: `translateY(${interpolate(text1In, [0, 1], [8, 0])}px)` }}>
        <div className="font-bold leading-[1.7] text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 31, opacity: text1In }}>
          و <span className="text-red-400">entry level jobs</span> راح تستبدل بشكل نهائي
        </div>
        <div className="mt-2 font-bold leading-[1.7]" style={{ fontFamily: "Cairo, sans-serif", fontSize: 29, opacity: text2In, transform: `translateY(${interpolate(text2In, [0, 1], [8, 0])}px)` }}>
          لانها تعتامد على <span className="text-red-400">automation</span>
        </div>
        <div className="mt-2 font-bold leading-[1.7]" style={{ fontFamily: "Cairo, sans-serif", fontSize: 23, opacity: text3In, transform: `translateY(${interpolate(text3In, [0, 1], [8, 0])}px)` }}>
          <span className="text-white/80">واي حاجة تعتمد على automation انتهت لان ال</span>
          <span className="text-green-400"> ai</span>
          <span className="text-white/80"> يقوم بذي المهمة بشكل مثالي</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

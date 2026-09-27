import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, random } from "remotion";
import { Skull, Lock, DollarSign, Search } from "lucide-react";

export const Scene1_HookSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame ranges at 30fps
  // 0-15, 15-30, 30-45, 45-60, 60-66, 66-90, 90-105

  return (
    <AbsoluteFill style={{ background: "#000" }} className="overflow-hidden">
      {/* Frame 1: 0-15 hooded silhouette */}
      {frame < 15 && (
        <AbsoluteFill className="bg-[#030805] flex items-center justify-center overflow-hidden">
          <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 65%, #0a1a0f 0%, #030805 70%)" }} />
          {/* silhouette */}
          <div className="relative flex flex-col items-center" style={{ transform: `scale(${interpolate(frame, [0, 15], [0.96, 1])})` }}>
            <div className="relative w-[320px] h-[380px] flex flex-col items-center">
              {/* hood */}
              <div className="absolute top-0 w-[220px] h-[220px] rounded-full bg-[#0a0a0a] border-2 border-[#1a1a1a]" style={{ boxShadow: "0 0 40px rgba(0,0,0,0.9)" }} />
              <div className="absolute top-[34px] w-[160px] h-[120px] rounded-[60px] bg-black" style={{ filter: "blur(8px)" }} />
              {/* glasses reflection */}
              <div className="absolute top-[78px] left-[92px] w-[58px] h-[28px] rounded-full bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="font-mono text-[5px] leading-[1.1] text-green-400 whitespace-nowrap" style={{ transform: `translateX(${interpolate(frame, [0, 15], [-10, 10])}px)` }}>
                  sudo access --system<br />Scanning ports...
                </div>
              </div>
              <div className="absolute top-[78px] right-[92px] w-[58px] h-[28px] rounded-full bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="font-mono text-[5px] leading-[1.1] text-green-400 whitespace-nowrap" style={{ transform: `translateX(${interpolate(frame, [0, 15], [10, -10])}px)` }}>
                  Analyzing...<br />Bypass firewall...
                </div>
              </div>
              {/* laptop */}
              <div className="absolute bottom-0 w-[260px] h-[140px] rounded-xl bg-[#0e1a14] border border-green-900/30 flex flex-col p-3" style={{ boxShadow: "0 0 30px rgba(34,197,94,0.25)" }}>
                <div className="font-mono text-[7px] text-green-500 leading-[1.3]">
                  root@kali:~# █<br />Initializing...<br />Access granted.
                </div>
                <div className="mt-2 h-1 bg-green-500/20 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${interpolate(frame, [0, 15], [20, 88])}%` }} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.18em] text-green-500/40">0.0s — HOODED • HIDDEN</div>
        </AbsoluteFill>
      )}

      {/* Frame 2: 15-30 skull glitch */}
      {frame >= 15 && frame < 30 && (
        <AbsoluteFill className="bg-black flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, rgba(239,68,68,0.08) 1px, transparent 2px)`, transform: `translateY(${frame * 2}px)` }} />
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle, rgba(239,68,68,0.18), transparent 62%)`, opacity: interpolate(frame, [15, 22, 30], [0, 0.6, 0]) }} />
          <div style={{ opacity: frame % 3 === 0 ? 1 : 0.72, transform: `translateX(${frame % 2 === 0 ? -2 : 2}px) scale(${frame % 4 === 0 ? 1.04 : 1})` }}>
            <Skull size={148} color="white" strokeWidth={1.4} style={{ filter: "drop-shadow(0 0 18px rgba(239,68,68,0.7))" }} />
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{ background: `repeating-linear-gradient(90deg, transparent 0px, rgba(255,255,255,0.04) 2px, transparent 4px)`, opacity: 0.35 }} />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.18em] text-red-400/60">0.5s — SKULL • GLITCH</div>
        </AbsoluteFill>
      )}

      {/* Frame 3: 30-45 marketplace listing */}
      {frame >= 30 && frame < 45 && (
        <AbsoluteFill className="bg-[#0a0a0a] flex items-center justify-center p-6">
          <div className="w-full max-w-[640px] rounded-2xl border border-white/10 bg-[#141414] p-4 space-y-3" style={{ filter: `blur(${interpolate(frame, [30, 32], [0, 0])}px)`, transform: `scale(${interpolate(frame, [30, 45], [0.96, 1])})` }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[64px] rounded-xl bg-white/[0.04] border border-white/06 p-3 flex gap-3" style={{ filter: "blur(3px)", opacity: 0.85 }}>
                <div className="w-12 h-12 rounded bg-white/10" />
                <div className="flex-1 space-y-2">
                  <div className="h-2 w-3/4 rounded bg-white/10" />
                  <div className="h-2 w-1/2 rounded bg-white/06" />
                </div>
                <div className="w-16 h-6 rounded bg-white/10" />
              </div>
            ))}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 px-8 py-3 rounded bg-red-600 border-2 border-white flex items-center gap-2"
              style={{ transform: `translate(-50%,-50%) rotate(-12deg) scale(${interpolate(frame, [30, 38], [0.7, 1])})`, boxShadow: "0 8px 24px rgba(239,68,68,0.5)" }}
            >
              <span className="text-white font-black tracking-[0.18em] text-[18px]">⚠️ RESTRICTED</span>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.18em] text-white/30">1.0s — MARKETPLACE</div>
        </AbsoluteFill>
      )}

      {/* Frame 4: 45-60 dollar + padlock multiply scatter + fast zoom */}
      {frame >= 45 && frame < 60 && (
        <AbsoluteFill className="bg-black flex items-center justify-center overflow-hidden" style={{ transform: `scale(${interpolate(frame, [45, 60], [1, 1.18])})` }}>
          <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, #1a0f00 0%, #000 68%)" }} />
          {Array.from({ length: 18 }).map((_, i) => {
            const x = random(`x4-${i}`) * 100;
            const y = random(`y4-${i}`) * 100;
            const isDollar = i % 2 === 0;
            const scale = 0.7 + random(`s4-${i}`) * 0.6 + (frame - 45) * 0.02;
            return (
              <div key={i} className="absolute flex items-center justify-center" style={{ left: `${x}%`, top: `${y}%`, transform: `translate(-50%,-50%) scale(${scale}) rotate(${random(`r4-${i}`) * 40 - 20}deg)`, opacity: 0.85 }}>
                {isDollar ? <DollarSign size={28} color="#f59e0b" /> : <Lock size={24} color="#22c55e" />}
              </div>
            );
          })}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.18em] text-amber-400/60">1.5s — MULTIPLY • ZOOM</div>
        </AbsoluteFill>
      )}

      {/* Frame 5: 60-66 freeze desaturate + crack */}
      {frame >= 60 && frame < 66 && (
        <AbsoluteFill className="bg-black flex items-center justify-center overflow-hidden" style={{ filter: "grayscale(1) contrast(1.2)" }}>
          <AbsoluteFill style={{ background: "#0a0a0a" }} />
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="absolute opacity-20" style={{ left: `${random(`fx-${i}`) * 100}%`, top: `${random(`fy-${i}`) * 100}%`, transform: `rotate(${random(`fr-${i}`) * 60}deg)` }}>
              {i % 2 === 0 ? <DollarSign size={22} color="white" /> : <Lock size={18} color="white" />}
            </div>
          ))}
          <svg viewBox="0 0 1080 1920" className="absolute inset-0 w-full h-full pointer-events-none">
            <path d="M 0 620 L 1080 680 M 0 1180 L 1080 1220 M 540 0 L 560 1920" stroke="white" strokeWidth={2} opacity={0.85} />
            <path d="M 220 400 L 860 1500" stroke="white" strokeWidth={1.2} opacity={0.5} />
          </svg>
          <div className="absolute inset-0 border-[3px] border-white/20 pointer-events-none" />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.18em] text-white/50">2.0s — FREEZE • CRACK</div>
        </AbsoluteFill>
      )}

      {/* Frame 6: 66-90 clean pale browser */}
      {frame >= 66 && frame < 90 && (
        <AbsoluteFill className="bg-[#f2f0eb] flex items-center justify-center p-8">
          <div className="w-full max-w-[720px] rounded-[18px] border border-black/08 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] overflow-hidden" style={{ transform: `scale(${interpolate(frame, [66, 90], [0.96, 1])})` }}>
            <div className="h-9 flex items-center gap-1.5 px-4 border-b border-black/06 bg-black/[0.02]">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 font-mono text-[10px] text-black/40">New Tab — Clean</span>
            </div>
            <div className="p-8 flex flex-col items-center">
              <div className="flex items-center gap-1 mb-6">
                <span className="font-black text-[26px] tracking-tight" style={{ color: "#4285F4" }}>G</span>
                <span className="font-black text-[26px]" style={{ color: "#EA4335" }}>o</span>
                <span className="font-black text-[26px]" style={{ color: "#FBBC05" }}>o</span>
                <span className="font-black text-[26px]" style={{ color: "#4285F4" }}>g</span>
                <span className="font-black text-[26px]" style={{ color: "#34A853" }}>l</span>
                <span className="font-black text-[26px]" style={{ color: "#EA4335" }}>e</span>
              </div>
              <div className="w-full max-w-[520px] h-[48px] rounded-full border border-black/10 bg-white flex items-center px-4 gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
                <Search size={16} color="#9ca3af" />
                <span className="flex-1 font-mono text-[13px] text-black/70">
                  <span style={{ opacity: interpolate(frame % 30, [0, 15, 16, 30], [1, 1, 0, 0]) }} className="inline-block w-px h-4 bg-black/60 align-middle">|</span>
                </span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.18em] text-black/30">2.2s — CALM • CLEAN</div>
        </AbsoluteFill>
      )}

      {/* Frame 7: 90-105 zoom into address bar + 3 dots dashed */}
      {frame >= 90 && (
        <AbsoluteFill className="bg-[#f2f0eb] flex items-center justify-center p-8" style={{ transform: `scale(${interpolate(frame, [90, 105], [1, 1.06])})` }}>
          <div className="w-full max-w-[720px] rounded-[18px] border border-black/08 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] overflow-hidden">
            <div className="h-9 flex items-center gap-1.5 px-4 border-b border-black/06 bg-black/[0.02]">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="h-[88px] flex items-center justify-center relative">
              <div className="w-[520px] h-[44px] rounded-full border border-black/10 bg-white flex items-center px-4">
                <div className="flex-1 h-2 rounded-full bg-black/06" />
              </div>
              {/* three dots above */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-10">
                {[0, 1, 2].map((i) => {
                  const op = interpolate(frame, [92 + i * 6, 98 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  return <div key={i} className="w-3 h-3 rounded-full bg-[#7a5af5] border border-black/10" style={{ opacity: op, transform: `translateY(${interpolate(op, [0, 1], [6, 0])}px)`, boxShadow: "0 2px 8px rgba(122,90,245,0.35)" }} />;
                })}
              </div>
              <svg className="absolute -top-2 left-1/2 -translate-x-1/2 w-[280px] h-[24px] pointer-events-none" viewBox="0 0 280 24">
                {[0, 1].map((i) => {
                  const prog = interpolate(frame, [96 + i * 6, 104 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  const x1 = 90 + i * 50;
                  const x2 = 140 + i * 50;
                  return <line key={i} x1={x1} y1={12} x2={x1 + (x2 - x1) * prog} y2={12} stroke="#7a5af5" strokeWidth={1.2} strokeDasharray="4 4" opacity={0.55} />;
                })}
              </svg>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.18em] text-black/30">3.0s — ONION HINT • 3 NODES</div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

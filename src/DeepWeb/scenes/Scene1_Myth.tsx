import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, useCurrentFrame, spring, useVideoConfig, random } from "remotion";
import { ShieldAlert, Crosshair, Ghost, Eye, Skull } from "lucide-react";

export const Scene1_Myth: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) => spring({ frame: frame - d, fps, config: { damping: 16, stiffness: 140 } });

  const kickerIn = s(6);
  const torIn = s(14);
  const hackerIn = s(26);
  const hitmanIn = s(38);
  const text1In = s(18);
  const text2In = s(34);
  const text3In = s(52);

  const pulse = Math.sin(frame * 0.14) * 0.15 + 0.85;
  const glitch = frame >= 72 && frame < 96 ? Math.sin(frame * 2.4) * 6 : 0;
  const vignettePulse = 0.45 + Math.sin(frame * 0.09) * 0.12;

  return (
    <AbsoluteFill style={{ background: "#050508" }} className="flex flex-col items-center justify-center overflow-hidden">
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 38%, #1a0f1f 0%, #050508 66%)" }} />
      {/* red danger vignette */}
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at center, transparent 56%, rgba(239,68,68,${vignettePulse * 0.18}) 100%)`, opacity: vignettePulse }} />
      {/* scanline */}
      <div className="absolute w-full h-px bg-red-500/10" style={{ top: (frame * 3.2) % 1920 }} />

      {/* faint SCARY watermark */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[22%] font-black tracking-[0.32em] text-white/[0.035] text-[88px] pointer-events-none select-none" style={{ transform: `translate(-50%,0) scale(${1 + Math.sin(frame * 0.06) * 0.02})` }}>
        SCARY?
      </div>

      <div className="flex items-center gap-2 z-10" style={{ opacity: kickerIn, transform: `translateY(${interpolate(kickerIn, [0, 1], [8, 0])}px)` }}>
        <Eye size={13} color="#ef4444" />
        <span className="font-mono text-[11px] tracking-[0.28em] text-red-400/80">MYTH</span>
        <span className="w-6 h-px bg-red-500/20" />
        <span className="font-mono text-[10px] tracking-[0.16em] text-white/25">PEOPLE STILL THINK</span>
      </div>

      {/* icons — big, animated */}
      <div className="mt-7 flex items-center gap-6 z-10">
        <div className="flex flex-col items-center gap-2" style={{ opacity: torIn, transform: `translateY(${interpolate(torIn, [0, 1], [12, 0])}px) scale(${interpolate(torIn, [0, 1], [0.86, 1])})` }}>
          <div
            className="relative w-[108px] h-[108px] rounded-[22px] bg-white flex items-center justify-center border-2"
            style={{
              borderColor: glitch ? "#ef4444" : "white",
              boxShadow: `0 0 ${18 + pulse * 10}px rgba(239,68,68,${0.15 + pulse * 0.1}), 0 10px 32px rgba(0,0,0,0.5)`,
              transform: `translateX(${glitch}px)`,
            }}
          >
            <Img src={staticFile("tor-icon.svg")} style={{ width: 64, height: 64, objectFit: "contain", filter: glitch ? "hue-rotate( -12deg )" : undefined }} />
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          </div>
          <span className="font-mono text-[10px] tracking-[0.16em] text-white/50">TOR</span>
        </div>

        <span className="font-black text-white/20 text-[20px]" style={{ opacity: hackerIn }}>
          ×
        </span>

        <div className="flex flex-col items-center gap-2" style={{ opacity: hackerIn, transform: `translateY(${interpolate(hackerIn, [0, 1], [12, 0])}px) scale(${interpolate(hackerIn, [0, 1], [0.86, 1])}) rotate(${glitch ? Math.sin(frame * 1.8) * 2 : 0}deg)` }}>
          <div className="relative w-[108px] h-[108px] rounded-[22px] bg-white/[0.06] border border-red-500/30 backdrop-blur flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/15 to-transparent" />
            <ShieldAlert size={42} color="#ef4444" strokeWidth={1.7} />
            {glitch && <div className="absolute inset-0 bg-red-500/10" style={{ opacity: interpolate(frame % 6, [0, 3, 6], [0.15, 0.02, 0.15]) }} />}
          </div>
          <span className="font-mono text-[10px] tracking-[0.16em] text-red-400/70 flex items-center gap-1">
            <Skull size={10} /> هاكرز
          </span>
        </div>

        <span className="font-black text-white/20 text-[20px]" style={{ opacity: hitmanIn }}>
          +
        </span>

        <div className="flex flex-col items-center gap-2" style={{ opacity: hitmanIn, transform: `translateY(${interpolate(hitmanIn, [0, 1], [12, 0])}px) scale(${interpolate(hitmanIn, [0, 1], [0.86, 1])}) rotate(${glitch ? -Math.sin(frame * 1.8) * 2 : 0}deg)` }}>
          <div className="relative w-[108px] h-[108px] rounded-[22px] bg-white/[0.06] border border-amber-500/25 backdrop-blur flex items-center justify-center">
            <Crosshair size={42} color="#f59e0b" strokeWidth={1.7} />
            <div className="absolute w-16 h-16 rounded-full border border-amber-500/15" style={{ transform: `scale(${0.92 + pulse * 0.18})` }} />
          </div>
          <span className="font-mono text-[10px] tracking-[0.16em] text-amber-400/70">hitman</span>
        </div>
      </div>

      {/* quick scare flash */}
      {frame >= 78 && frame < 86 && <AbsoluteFill style={{ background: "rgba(239,68,68,0.08)", pointerEvents: "none" }} />}

      <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 z-10" style={{ opacity: hitmanIn, transform: `translateY(${interpolate(hitmanIn, [0, 1], [6, 0])}px)` }}>
        <Ghost size={12} color="#ef4444" />
        <span className="font-mono text-[9px] tracking-[0.18em] text-red-400/80">SCARY STEREOTYPE</span>
        <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
      </div>

      <div dir="rtl" className="mt-7 text-center max-w-[880px] px-6 z-10">
        <div className="font-black leading-[1.5] text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 32, opacity: text1In, transform: `translateY(${interpolate(text1In, [0, 1], [10, 0])}px)`, textShadow: glitch ? "0 0 14px rgba(239,68,68,0.5)" : undefined }}>
          الناس لليوم مزالت تتخيل <span className="inline-flex items-center gap-1.5 align-middle"><span className="w-6 h-6 rounded bg-white inline-flex items-center justify-center"><Img src={staticFile("tor-icon.svg")} style={{ width: 14, height: 14, objectFit: "contain" }} /></span> تور</span> وديب ويب
        </div>
        <div className="mt-1 font-black leading-[1.5]" style={{ fontFamily: "Cairo, sans-serif", fontSize: 32, opacity: text2In, transform: `translateY(${interpolate(text2In, [0, 1], [10, 0])}px)` }}>
          <span className="text-white">على انو </span>
          <span className="text-red-400" style={{ textShadow: "0 0 12px rgba(239,68,68,0.45)" }}>
            خطير
          </span>
          <span className="text-white"> وفيه</span>
        </div>
        <div className="mt-1 font-black leading-none flex items-center justify-center gap-3" style={{ opacity: text3In, transform: `translateY(${interpolate(text3In, [0, 1], [10, 0])}px) scale(${interpolate(text3In, [0, 1], [0.96, 1])})` }}>
          <span className="text-red-400" style={{ fontFamily: "Cairo, sans-serif", fontSize: 40, textShadow: "0 0 16px rgba(239,68,68,0.5)" }}>
            هاكرز
          </span>
          <span className="text-white/60 text-[22px]">و</span>
          <span className="text-amber-400" style={{ fontFamily: "Cairo, sans-serif", fontSize: 40, textShadow: "0 0 16px rgba(245,158,11,0.45)" }}>
            hitman
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-60">
        <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
        <span className="font-mono text-[9px] tracking-[0.18em] text-white/30">HOOK • MYTH BUSTING NEXT</span>
      </div>
    </AbsoluteFill>
  );
};

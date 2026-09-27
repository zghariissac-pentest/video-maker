import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { Globe, Server, Shield, EyeOff } from "lucide-react";

export const Scene4_RelayBounce: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) => spring({ frame: frame - d, fps, config: { damping: 20, stiffness: 88 } });

  const line1In = s(14);
  const line2In = s(36);
  const line3In = s(58);
  const diagramIn = s(18);

  const hops = [
    { label: "YOU", sub: "أنت", color: "#22c55e" },
    { label: "RELAY 1", sub: "خادم 1", color: "#7a5af5" },
    { label: "RELAY 2", sub: "خادم 2", color: "#7a5af5" },
    { label: "RELAY 3", sub: "خادم 3", color: "#7a5af5" },
    { label: "WEBSITE", sub: "الموقع", color: "#ffffff" },
  ];

  const packetProgress = interpolate(frame, [52, 168], [0, 4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const packetIdx = Math.floor(packetProgress);
  const packetT = packetProgress - packetIdx;

  return (
    <AbsoluteFill style={{ background: "#050508" }} className="flex flex-col items-center justify-center overflow-hidden">
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 38%, #141418 0%, #050508 70%)" }} />

      <div className="flex items-center gap-2" style={{ opacity: diagramIn, transform: `translateY(${interpolate(diagramIn, [0, 1], [8, 0])}px)` }}>
        <span className="font-mono text-[11px] tracking-[0.28em] text-white/30">3 HOPS</span>
        <span className="w-6 h-px bg-white/10" />
        <span className="font-mono text-[10px] tracking-[0.14em] text-[#7a5af5]">BOUNCE</span>
      </div>

      {/* diagram — bigger in middle */}
      <div className="relative mt-6 w-[920px] h-[220px] flex items-center justify-between px-4" style={{ opacity: diagramIn }}>
        {/* line bg */}
        <div className="absolute left-[48px] right-[48px] top-[62px] h-px bg-white/10" />
        {/* progress line */}
        <div className="absolute left-[48px] top-[62px] h-px bg-[#7a5af5]" style={{ width: `${interpolate(packetProgress, [0, 4], [0, 824], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px`, boxShadow: "0 0 8px rgba(122,90,245,0.5)" }} />

        {hops.map((h, i) => {
          const isActive = packetIdx === i;
          const isPast = packetIdx > i;
          const p = s(22 + i * 12);
          return (
            <div key={i} className="flex flex-col items-center" style={{ opacity: p, transform: `translateY(${interpolate(p, [0, 1], [10, 0])}px) scale(${interpolate(p, [0, 1], [0.92, 1])})` }}>
              <div
                className="relative w-[92px] h-[92px] rounded-[18px] flex items-center justify-center border-2"
                style={{
                  background: i === 0 ? "#22c55e" : i === 4 ? "white" : isActive ? "#7a5af5" : "rgba(255,255,255,0.06)",
                  borderColor: isActive ? "#7a5af5" : i === 0 ? "#22c55e" : i === 4 ? "white" : "rgba(255,255,255,0.12)",
                  boxShadow: isActive ? "0 0 18px rgba(122,90,245,0.5)" : i === 0 ? "0 0 14px rgba(34,197,94,0.35)" : undefined,
                }}
              >
                {i === 0 ? <Globe size={30} color="black" /> : i === 4 ? <Globe size={30} color="#0a0a0a" /> : <Server size={26} color={isActive ? "white" : "rgba(255,255,255,0.6)"} />}
                {isPast && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black" />}
              </div>
              <div className="mt-2 font-mono text-[10px] tracking-[0.14em] text-white/80">{h.label}</div>
              <div className="font-mono text-[8px] tracking-[0.12em] text-white/30">{h.sub}</div>
              {/* knowledge scope — only neighbors */}
              {i > 0 && i < 4 && (
                <div className="mt-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full border bg-black/40" style={{ borderColor: isActive ? "rgba(122,90,245,0.35)" : "rgba(255,255,255,0.08)", opacity: isActive ? 1 : 0.45 }}>
                  <EyeOff size={10} color={isActive ? "#7a5af5" : "rgba(255,255,255,0.4)"} />
                  <span className="font-mono text-[7px] tracking-[0.12em] text-white/40">KNOWS ±1</span>
                </div>
              )}
            </div>
          );
        })}

        {/* packet */}
        {packetIdx < 4 && (
          <div
            className="absolute w-3.5 h-3.5 rounded-full bg-white border-2 border-[#7a5af5] flex items-center justify-center"
            style={{
              left: 48 + 206 * packetIdx + 206 * packetT,
              top: 62,
              transform: "translate(-50%,-50%)",
              boxShadow: "0 0 12px rgba(122,90,245,0.9), 0 0 22px rgba(255,255,255,0.35)",
              opacity: diagramIn,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#7a5af5] animate-pulse" />
          </div>
        )}
      </div>

      <div className="mt-2 flex items-center gap-2 px-3 py-1 rounded-full bg-white/05 border border-white/10" style={{ opacity: diagramIn }}>
        <Shield size={10} color="#7a5af5" />
        <span className="font-mono text-[9px] tracking-[0.14em] text-white/50">EACH NODE KNOWS ONLY PREV + NEXT — NEVER WHOLE PATH</span>
      </div>

      <div dir="rtl" className="mt-6 text-center max-w-[860px] px-6">
        <div className="font-bold leading-[1.7] text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 26, opacity: line1In, transform: `translateY(${interpolate(line1In, [0, 1], [8, 0])}px)` }}>
          بدلًا من الاتصال المباشر بالموقع، حركة المرور ديالك تمر عبر <span className="text-[#7a5af5]">ثلاثة خوادم عشوائية</span> حول العالم.
        </div>
        <div className="mt-2 font-bold leading-[1.7]" style={{ fontFamily: "Cairo, sans-serif", fontSize: 24, opacity: line2In, transform: `translateY(${interpolate(line2In, [0, 1], [8, 0])}px)` }}>
          <span className="text-white">كل خادم يعرف غير </span>
          <span className="text-green-400">الخطوة لي قبلو والخطوة لي بعدو</span>
          <span className="text-white"> —</span>
        </div>
        <div className="font-black leading-[1.5]" style={{ fontFamily: "Cairo, sans-serif", fontSize: 26, color: "#ef4444", opacity: line3In, transform: `translateY(${interpolate(line3In, [0, 1], [8, 0])}px)` }}>
          عمره ما يعرف المسار كامل
        </div>
      </div>
    </AbsoluteFill>
  );
};

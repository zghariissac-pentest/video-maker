import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { Globe, Search, Lock, EyeOff } from "lucide-react";

export const Scene2_Explain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) => spring({ frame: frame - d, fps, config: { damping: 20, stiffness: 90 } });

  // one by one, each big in middle
  const p1 = frame < 140;
  const p2 = frame >= 130 && frame < 278;
  const p3 = frame >= 268;

  const p1Opacity = interpolate(frame, [0, 20, 122, 142], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p2Opacity = interpolate(frame, [130, 150, 258, 278], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p3Opacity = interpolate(frame, [268, 288, 400, 420], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#050508" }} className="overflow-hidden">
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 42%, #141418 0%, #050508 70%)" }} />

      {/* PART 1 — big in middle, one by one */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8" style={{ opacity: p1Opacity, pointerEvents: p1 ? "auto" : "none" }}>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[12px] tracking-[0.28em] text-white/30">TRUTH 01</span>
          <span className="w-8 h-px bg-white/10" />
          <span className="font-mono text-[11px] tracking-[0.16em] text-green-400/60">TOR = BROWSER</span>
        </div>

        <div className="mt-8 flex gap-5 justify-center">
          {[
            { label: "Chrome", sub: "Normal" },
            { label: "Firefox", sub: "Normal" },
            { label: "Tor", sub: "Just a browser", isTor: true },
          ].map((b: any, i) => {
            const p = s(18 + i * 12);
            return (
              <div key={i} className="w-[200px] rounded-[22px] border bg-white flex flex-col items-center p-6" style={{ borderColor: b.isTor ? "rgba(122,90,245,0.45)" : "rgba(0,0,0,0.08)", opacity: p, transform: `translateY(${interpolate(p, [0, 1], [14, 0])}px) scale(${interpolate(p, [0, 1], [0.92, 1])})`, boxShadow: b.isTor ? "0 0 24px rgba(122,90,245,0.28)" : "0 12px 28px rgba(0,0,0,0.25)" }}>
                <div className="w-[88px] h-[88px] rounded-2xl flex items-center justify-center" style={{ background: b.isTor ? "white" : "#f3f4f6" }}>
                  {b.isTor ? <Img src={staticFile("tor-icon.svg")} style={{ width: 52, height: 52, objectFit: "contain" }} /> : <Globe size={36} color="#374151" strokeWidth={1.7} />}
                </div>
                <div className="mt-3 font-mono text-[13px] tracking-[0.12em] text-black/70">{b.label}</div>
                <div className={`mt-1.5 px-3 py-1 rounded-full font-mono text-[10px] font-black tracking-widest ${b.isTor ? "bg-[#7a5af5] text-white" : "bg-black/05 text-black/40"}`}>{b.sub}</div>
              </div>
            );
          })}
        </div>

        <div dir="rtl" className="mt-8 text-center">
          <span className="font-black text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 36 }}>
            <span className="inline-flex items-center gap-2 align-middle">
              <span className="w-7 h-7 rounded bg-white inline-flex items-center justify-center">
                <Img src={staticFile("tor-icon.svg")} style={{ width: 16, height: 16 }} />
              </span>
              tor
            </span>{" "}
            مجرد متصفح
          </span>
        </div>
      </div>

      {/* PART 2 — big in middle */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8" style={{ opacity: p2Opacity, pointerEvents: p2 ? "auto" : "none" }}>
        <div className="flex items-center gap-2">
          <Search size={13} color="white" />
          <span className="font-mono text-[12px] tracking-[0.28em] text-white/30">DEEP WEB</span>
        </div>

        <div className="mt-8 w-full max-w-[720px] rounded-[22px] border border-white/10 bg-white/[0.04] backdrop-blur p-6 flex items-center gap-5">
          <div className="flex-1 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">
              <Search size={22} color="#0a0a0a" />
            </div>
            <div>
              <div className="font-mono text-[13px] tracking-[0.12em] text-white/80">Google • Chrome</div>
              <div className="font-mono text-[11px] text-white/30">Normal browsers</div>
            </div>
          </div>
          <span className="text-white/15 text-[22px]">→</span>
          <div className="flex-1 h-[64px] rounded-2xl bg-black/50 border-2 border-red-500/30 flex items-center justify-center gap-3">
            <Lock size={20} color="#ef4444" />
            <span className="font-mono text-[12px] tracking-[0.16em] text-red-400/80">CAN'T ACCESS</span>
            <EyeOff size={14} color="#ef4444" />
          </div>
        </div>

        <div dir="rtl" className="mt-8 text-center max-w-[820px]">
          <div className="font-bold leading-[1.5] text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 28 }}>
            والحاجة لي تعيطلها <span className="text-white">deep web</span> هي كل حاجة متقدرش توصللها
          </div>
          <div className="mt-2 font-bold leading-[1.5] text-white/80" style={{ fontFamily: "Cairo, sans-serif", fontSize: 26 }}>
            من <span className="text-green-400">المتصفحات العادية</span> ومحركات البحث كيما google
          </div>
        </div>
      </div>

      {/* PART 3 — big in middle */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8" style={{ opacity: p3Opacity, pointerEvents: p3 ? "auto" : "none" }}>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[12px] tracking-[0.18em] text-white/30">SPLIT</span>
          <span className="w-8 h-px bg-white/10" />
          <span className="font-mono text-[11px] tracking-[0.16em] text-white/20">YOUR USAGE vs REST</span>
        </div>

        <div className="mt-8 w-full max-w-[720px] rounded-[22px] border border-white/10 bg-white/[0.03] backdrop-blur p-6 space-y-4">
          <div>
            <div className="flex justify-between font-mono text-[11px] tracking-[0.12em] text-white/60 mb-2">
              <span>استخدامك اليومي</span>
              <span className="text-green-400">~ الأكبر</span>
            </div>
            <div className="h-10 rounded-full bg-white/10 overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 rounded-full bg-white" style={{ width: `${interpolate(frame, [278, 328], [0, 78], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%` }} />
              <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-black text-black/60 tracking-widest">SURFACE WEB</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between font-mono text-[11px] tracking-[0.12em] text-white/40 mb-2">
              <span>الباقي</span>
              <span className="text-white/60">deep / dark</span>
            </div>
            <div className="h-10 rounded-full bg-white/05 overflow-hidden relative border border-white/10">
              <div className="absolute left-0 top-0 bottom-0 rounded-full" style={{ width: `${interpolate(frame, [308, 358], [0, 22], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`, background: "#7a5af5" }} />
              <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-black text-white/70 tracking-widest">DEEP WEB</span>
            </div>
          </div>
        </div>

        <div dir="rtl" className="mt-6 text-center font-bold leading-[1.5] text-white/80" style={{ fontFamily: "Cairo, sans-serif", fontSize: 22 }}>
          استخدامك اليومي يمثل <span className="text-white">اكبر جزء</span> من الانترنت والباقي هو <span className="text-[#7a5af5]">deep web/dark web</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

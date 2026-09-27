import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { Shield, Siren, Wrench } from "lucide-react";

export const Scene4_HighStandard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) => spring({ frame: frame - d, fps, config: { damping: 26, stiffness: 68, mass: 1 } });

  const kickerIn = s(6);
  const barIn = s(18);
  const cardsIn = s(42);
  const text1In = s(20);
  const text2In = s(38);
  const text3In = s(58);

  const standardHeight = interpolate(frame, [32, 120], [18, 92], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#08090a" }} className="overflow-hidden">
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 38%, #121417 0%, #08090a 68%)" }} />
      <div className="absolute rounded-full overflow-hidden" style={{ width: 148, height: 148, right: 36, top: 36, border: "2.5px solid rgba(255,255,255,0.92)", boxShadow: "0 12px 30px rgba(0,0,0,0.5)", background: "white" }}>
        <Img src={staticFile("profile_myopinion1.png")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 18%", display: "block" }} />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-[50%] -translate-y-1/2 w-full max-w-[900px] px-6 flex flex-col items-center">
        <div className="flex items-center gap-2" style={{ opacity: kickerIn, transform: `translateY(${interpolate(kickerIn, [0, 1], [8, 0])}px)` }}>
          <Shield size={14} color="#22c55e" />
          <span className="font-mono text-[11px] tracking-[0.28em] text-green-400/80">HIGH STANDARD</span>
          <span className="font-mono text-[10px] text-white/25">HARD TO REPLACE</span>
        </div>

        {/* Rising standard bar + protected roles */}
        <div className="mt-7 flex gap-6 items-end justify-center w-full" style={{ opacity: barIn }}>
          {/* bar */}
          <div className="relative w-[86px] h-[220px] rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden flex flex-col justify-end p-2">
            <div className="absolute inset-0 bg-gradient-to-t from-green-500/15 to-transparent pointer-events-none" />
            <div className="relative w-full rounded-xl overflow-hidden" style={{ height: `${standardHeight}%`, background: "linear-gradient(180deg, #22c55e, #16a34a)", boxShadow: "0 0 16px rgba(34,197,94,0.4)" }}>
              <div className="absolute top-1 left-1 right-1 h-px bg-white/30" />
            </div>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-green-500 text-black font-mono text-[8px] font-black tracking-widest whitespace-nowrap" style={{ opacity: barIn }}>
              STANDARD ↑ {Math.round(standardHeight)}%
            </div>
          </div>

          <div className="flex gap-5" style={{ opacity: cardsIn, transform: `translateY(${interpolate(cardsIn, [0, 1], [10, 0])}px)` }}>
            {[
              { Icon: Siren, title: "Incident Response", sub: "Analyst", badge: "HUMAN" },
              { Icon: Wrench, title: "Security", sub: "Engineer", badge: "HUMAN" },
            ].map((c, i) => {
              const d = s(52 + i * 14);
              return (
                <div
                  key={i}
                  className="relative w-[280px] rounded-[22px] border bg-white/[0.05] backdrop-blur p-6 flex flex-col"
                  style={{
                    borderColor: "rgba(34,197,94,0.32)",
                    opacity: d,
                    transform: `translateY(${interpolate(d, [0, 1], [12, 0])}px) scale(${interpolate(d, [0, 1], [0.96, 1])})`,
                  }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                    <c.Icon size={26} color="#0a0a0a" strokeWidth={1.9} />
                  </div>
                  <div className="mt-4 font-mono text-[14px] tracking-[0.14em] text-white/90">{c.title}</div>
                  <div className="font-mono text-[11px] text-white/40">{c.sub}</div>
                  <div className="mt-3 inline-flex self-start px-2.5 py-1 rounded-full bg-green-500 text-black font-mono text-[10px] font-black tracking-widest">● {c.badge}</div>
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center border-2 border-black shadow-[0_0_12px_rgba(34,197,94,0.5)]">
                    <Shield size={13} color="white" />
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-3 font-mono text-[10px] tracking-[0.16em] text-green-400/50" style={{ opacity: cardsIn }}>
          AI CAN’T REPLACE • JUDGEMENT • EXPERIENCE
        </div>
      </div>

      <div dir="rtl" className="absolute left-0 right-0 mx-auto text-center px-8" style={{ top: "70%", maxWidth: 860, opacity: text1In, transform: `translateY(${interpolate(text1In, [0, 1], [8, 0])}px)` }}>
        <div className="font-bold leading-[1.7] text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 30, opacity: text1In }}>
          المعيار لي راح يخليك قابل للتوظيف راح <span className="text-green-400">يرتفع</span>
        </div>
        <div className="mt-1 font-bold leading-[1.7] text-white/80" style={{ fontFamily: "Cairo, sans-serif", fontSize: 26, opacity: text2In, transform: `translateY(${interpolate(text2In, [0, 1], [8, 0])}px)` }}>
          ومن الصعب انو <span className="text-white">ai</span> في الوقت الحالي يستبدل
        </div>
        <div className="mt-1 font-black leading-[1.7]" style={{ fontFamily: "Cairo, sans-serif", fontSize: 24, opacity: text3In, transform: `translateY(${interpolate(text3In, [0, 1], [8, 0])}px)` }}>
          <span className="text-green-400">incident response analyst</span>
          <span className="text-white"> و </span>
          <span className="text-green-400">security engineer</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

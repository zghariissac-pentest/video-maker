import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, useCurrentFrame, spring } from "remotion";

const tiers = [
  { label: "S", bg: "#ff4e4e" },
  { label: "A", bg: "#ff9a3c" },
  { label: "B", bg: "#ffca3c" },
  { label: "C", bg: "#8bc34a" },
  { label: "D", bg: "#4fc3f7" },
  { label: "F", bg: "#9e9e9e" },
];

export const Scene3_UbuntuTier: React.FC = () => {
  const frame = useCurrentFrame();
  const s = (d: number) => spring({ frame: frame - d, fps: 30, config: { damping: 18, stiffness: 90 } });

  const showNormal = frame < 30;
  const showUbuntu = frame >= 30 && frame < 390;
  const showTierD = frame >= 390;

  return (
    <AbsoluteFill style={{ background: "#000000" }} className="flex flex-col items-center justify-center p-4 overflow-hidden">
      {showNormal && (
        <div className="w-full max-w-[1020px] rounded-[10px] overflow-hidden border-[3px] border-[#2a2a2a] bg-[#1a1a1a]" style={{ opacity: s(6), transform: `translateY(${interpolate(s(6), [0, 1], [8, 0])}px)` }}>
          {tiers.map((t) => (
            <div key={t.label} className="flex h-[168px] border-b-[3px] border-black last:border-0">
              <div className="w-[110px] flex items-center justify-center font-black text-black text-[36px] shrink-0" style={{ background: t.bg }}>
                {t.label}
              </div>
              <div className="flex-1 bg-[#2a2a2a] flex items-center px-3">
                <div className="flex-1 h-[132px] rounded-[8px] border-2 border-dashed border-white/10 bg-white/[0.03] flex items-center justify-center">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-white/18">—</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showUbuntu && (
        <>
          <div className="absolute inset-0 flex items-center justify-center p-4 opacity-[0.28]" style={{ filter: "blur(3px) saturate(1.3)" }}>
            <div className="w-full max-w-[1020px] rounded-[10px] overflow-hidden border-[3px] border-[#2a2a2a] bg-[#1a1a1a]">
              {tiers.map((t) => (
                <div key={t.label} className="flex h-[168px] border-b-[3px] border-black last:border-0">
                  <div className="w-[110px] flex items-center justify-center font-black text-black text-[36px] shrink-0" style={{ background: t.bg }}>
                    {t.label}
                  </div>
                  <div className="flex-1 bg-[#2a2a2a]" />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0" style={{ background: "rgba(8,8,10,0.48)", backdropFilter: "blur(6px) saturate(1.35) brightness(1.08)" }} />
          <div className="relative flex flex-col items-center text-center" style={{ opacity: s(32), transform: `translateY(${interpolate(s(32), [0, 1], [10, 0])}px) scale(${interpolate(s(32), [0, 1], [0.97, 1])})` }}>
            <div className="w-[180px] h-[180px] rounded-[22px] bg-white flex items-center justify-center border-2 border-white/20" style={{ boxShadow: "0 12px 32px rgba(0,0,0,0.5)" }}>
              <Img src={staticFile("assets/distros/ubuntu.svg")} style={{ width: 110, height: 110, objectFit: "contain" }} />
            </div>
            <div dir="rtl" className="mt-6 font-black leading-[1.4] text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 32 }}>
              snap <span className="text-amber-400">بطيئ</span>
            </div>
            <div dir="rtl" className="font-bold leading-[1.5] text-white/80 text-center max-w-[760px]" style={{ fontFamily: "Cairo, sans-serif", fontSize: 22 }}>
              canonical تدير قرارات <span className="text-red-400">متساعدش المستخدم</span>
            </div>
            <div dir="rtl" className="mt-2 font-bold leading-[1.5]" style={{ fontFamily: "Cairo, sans-serif", fontSize: 22, color: "#22c55e" }}>
              بصح مليح للمبتدئين عموما
            </div>
          </div>
        </>
      )}

      {showTierD && (
        <div className="w-full max-w-[1020px] rounded-[10px] overflow-hidden border-[3px] border-[#2a2a2a] bg-[#1a1a1a]" style={{ opacity: s(392), transform: `translateY(${interpolate(s(392), [0, 1], [8, 0])}px)` }}>
          {tiers.map((t) => {
            const isC = t.label === "C";
            const isD = t.label === "D";
            return (
              <div key={t.label} className="flex h-[168px] border-b-[3px] border-black last:border-0">
                <div className="w-[110px] flex items-center justify-center font-black text-black text-[36px] shrink-0" style={{ background: t.bg }}>
                  {t.label}
                </div>
                <div className="flex-1 bg-[#2a2a2a] flex items-center px-3 gap-2">
                  {isC && (
                    <div className="w-[120px] h-[120px] rounded-[10px] bg-white border-2 border-black flex flex-col items-center justify-center p-2" style={{ boxShadow: "4px 4px 0 #1a1a1a" }}>
                      <Img src={staticFile("assets/distros/manjaro.svg")} style={{ width: 56, height: 56, objectFit: "contain" }} />
                      <span className="mt-1 font-mono text-[9px] tracking-[0.12em] text-black/60">Manjaro</span>
                    </div>
                  )}
                  {isD && (
                    <div className="w-[120px] h-[120px] rounded-[10px] bg-white border-2 border-black flex flex-col items-center justify-center p-2" style={{ boxShadow: "4px 4px 0 #1a1a1a" }}>
                      <Img src={staticFile("assets/distros/ubuntu.svg")} style={{ width: 56, height: 56, objectFit: "contain" }} />
                      <span className="mt-1 font-mono text-[9px] tracking-[0.12em] text-black/60">Ubuntu</span>
                    </div>
                  )}
                  {!isC && !isD && (
                    <div className="flex-1 h-[132px] rounded-[8px] border-2 border-dashed border-white/08 bg-white/[0.02] flex items-center justify-center">
                      <span className="font-mono text-[11px] tracking-[0.18em] text-white/14">—</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};

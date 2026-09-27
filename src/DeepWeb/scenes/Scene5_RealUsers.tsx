import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, spring } from "remotion";
import { Newspaper, Megaphone, ShieldAlert, Globe, UserCheck } from "lucide-react";

export const Scene5_RealUsers: React.FC = () => {
  const frame = useCurrentFrame();
  const s = (d: number) => spring({ frame: frame - d, fps: 30, config: { damping: 22, stiffness: 90 } });

  const items = [
    { Icon: Newspaper, title: "صحفيون", sub: "مصادر سرية" },
    { Icon: Megaphone, title: "نشطاء", sub: "تحت الرقابة" },
    { Icon: ShieldAlert, title: "مُبلغون", sub: "يكشفون الفساد" },
    { Icon: Globe, title: "شعوب محجوبة", sub: "أخبار مقطوعة" },
    { Icon: UserCheck, title: "أناس عاديون", sub: "يرفضون التتبع" },
  ];

  return (
    <AbsoluteFill style={{ background: "#060607" }} className="flex flex-col items-center justify-center overflow-hidden">
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 40%, #141418 0%, #060607 72%)" }} />

      <div className="flex items-center gap-2" style={{ opacity: s(8), transform: `translateY(${interpolate(s(8), [0, 1], [6, 0])}px)` }}>
        <span className="font-mono text-[11px] tracking-[0.28em] text-white/30">REAL USERS</span>
        <span className="w-6 h-px bg-white/10" />
        <span className="font-mono text-[10px] tracking-[0.14em] text-green-400/60">NOT MYTH</span>
      </div>

      <div className="mt-8 flex gap-3 justify-center" style={{ opacity: s(14) }}>
        {items.map((it, i) => {
          const p = s(18 + i * 10);
          return (
            <div key={i} className="w-[148px] rounded-[16px] border border-white/10 bg-white/[0.04] backdrop-blur p-4 flex flex-col items-center text-center" style={{ opacity: p, transform: `translateY(${interpolate(p, [0, 1], [8, 0])}px)` }}>
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0">
                <it.Icon size={22} color="#0a0a0a" strokeWidth={1.8} />
              </div>
              <div className="mt-2 font-bold text-white leading-none" style={{ fontFamily: "Cairo, sans-serif", fontSize: 13 }}>
                {it.title}
              </div>
              <div className="font-mono text-[8px] tracking-[0.12em] text-white/35 mt-0.5">{it.sub}</div>
            </div>
          );
        })}
      </div>

      <div dir="rtl" className="mt-8 text-center max-w-[780px] px-6" style={{ opacity: s(72), transform: `translateY(${interpolate(s(72), [0, 1], [8, 0])}px)` }}>
        <div className="font-bold leading-[1.7] text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 18 }}>
          صحفيون يتواصلون مع مصادرهم. نشطاء تحت الرقابة. <span className="text-red-400">مُبلغون.</span>
        </div>
        <div className="font-bold leading-[1.7] text-white/70" style={{ fontFamily: "Cairo, sans-serif", fontSize: 18 }}>
          شعوب في بلدان الأخبار محجوبة فيها.
        </div>
        <div className="mt-1 font-black" style={{ fontFamily: "Cairo, sans-serif", fontSize: 21, color: "#22c55e" }}>
          وأكيد — أناس عاديون لا يريدون أن يتم تتبعهم
        </div>
      </div>
    </AbsoluteFill>
  );
};

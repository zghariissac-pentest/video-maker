import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { Type, Activity, Clock } from "lucide-react";

export const Scene5_BehavioralLeaks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) => spring({ frame: frame - d, fps, config: { damping: 22, stiffness: 78 } });

  const kickerIn = s(8);
  const card1In = s(18);
  const card2In = s(32);
  const card3In = s(46);
  const voIn = s(62);

  const pulse = Math.sin(frame * 0.14) * 0.2 + 0.8;

  return (
    <AbsoluteFill style={{ background: "#060607" }} className="overflow-hidden flex flex-col items-center justify-center">
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 38%, #141416 0%, #060607 68%)" }} />
      <div className="absolute rounded-full overflow-hidden" style={{ width: 148, height: 148, right: 36, top: 36, border: "2.5px solid rgba(255,255,255,0.92)", boxShadow: "0 12px 30px rgba(0,0,0,0.5)", background: "white" }}>
        <Img src={staticFile("profile_myopinion1.png")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 18%", display: "block" }} />
      </div>

      <div className="flex items-center gap-2" style={{ opacity: kickerIn, transform: `translateY(${interpolate(kickerIn, [0, 1], [8, 0])}px)` }}>
        <span className="font-mono text-[11px] tracking-[0.28em] text-red-400/80">BEHAVIORAL LEAKS</span>
        <span className="font-mono text-[10px] text-white/20">HARDEST PART</span>
      </div>

      {/* Animated explanation — 3 cards */}
      <div className="mt-7 flex gap-4 justify-center w-full max-w-[900px] px-6">
        {/* Writing style */}
        <div className="flex-1 rounded-[20px] border border-white/10 bg-white/[0.04] backdrop-blur p-5 flex flex-col" style={{ opacity: card1In, transform: `translateY(${interpolate(card1In, [0, 1], [10, 0])}px) scale(${interpolate(card1In, [0, 1], [0.97, 1])})` }}>
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
            <Type size={20} color="#0a0a0a" strokeWidth={1.9} />
          </div>
          <div className="mt-3 font-mono text-[11px] tracking-[0.14em] text-white/90">أسلوب الكتابة</div>
          <div className="mt-2 space-y-1.5">
            {["الـ ... ـة", "نفس الفاصلة ,", "نفس الخطأ"].map((t, i) => (
              <div key={i} className="h-6 rounded bg-white/[0.06] border border-white/08 flex items-center px-2" style={{ opacity: 0.7 + Math.sin((frame + i * 18) * 0.12) * 0.3 }}>
                <span className="font-mono text-[9px] text-white/60">{t}</span>
                <span className="ml-auto w-1.5 h-1.5 bg-green-500 rounded-full" style={{ opacity: pulse }} />
              </div>
            ))}
          </div>
          <div className="mt-2 font-mono text-[8px] tracking-[0.14em] text-amber-400/60">WRITING FINGERPRINT</div>
        </div>

        {/* Sentence rhythm */}
        <div className="flex-1 rounded-[20px] border border-white/10 bg-white/[0.04] backdrop-blur p-5 flex flex-col" style={{ opacity: card2In, transform: `translateY(${interpolate(card2In, [0, 1], [10, 0])}px) scale(${interpolate(card2In, [0, 1], [0.97, 1])})` }}>
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
            <Activity size={20} color="#0a0a0a" strokeWidth={1.9} />
          </div>
          <div className="mt-3 font-mono text-[11px] tracking-[0.14em] text-white/90">إيقاع الجُمل</div>
          <div className="mt-3 flex items-end gap-1 h-[36px]">
            {[0.45, 0.82, 0.38, 0.66, 0.52, 0.88].map((v, i) => {
              const h = 10 + v * 22 + Math.sin((frame + i * 14) * 0.18) * 4;
              return <div key={i} className="flex-1 rounded-t bg-green-500/70" style={{ height: h, opacity: 0.75 + Math.sin((frame + i * 10) * 0.15) * 0.25 }} />;
            })}
          </div>
          <div className="mt-2 font-mono text-[8px] tracking-[0.14em] text-green-400/60">RHYTHM PATTERN</div>
        </div>

        {/* Posting time */}
        <div className="flex-1 rounded-[20px] border border-white/10 bg-white/[0.04] backdrop-blur p-5 flex flex-col" style={{ opacity: card3In, transform: `translateY(${interpolate(card3In, [0, 1], [10, 0])}px) scale(${interpolate(card3In, [0, 1], [0.97, 1])})` }}>
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
            <Clock size={20} color="#0a0a0a" strokeWidth={1.9} />
          </div>
          <div className="mt-3 font-mono text-[11px] tracking-[0.14em] text-white/90">توقيت النشر</div>
          <div className="mt-2 relative h-[36px] rounded bg-black/40 border border-white/08 overflow-hidden flex items-center px-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-white/10" />
              {Array.from({ length: 7 }).map((_, k) => (
                <div key={k} className="absolute w-1.5 h-1.5 rounded-full bg-green-500" style={{ left: `${18 + k * 12}%`, top: "50%", transform: `translate(-50%,-50%) scale(${1 + Math.sin((frame + k * 22) * 0.14) * 0.25})`, opacity: 0.9, boxShadow: "0 0 6px rgba(34,197,94,0.6)" }} />
              ))}
            </div>
            <span className="relative font-mono text-[8px] tracking-[0.12em] text-white/40">UTC+1 • 22:00</span>
          </div>
          <div className="mt-2 font-mono text-[8px] tracking-[0.14em] text-amber-400/60">TIMEZONE LEAK</div>
        </div>
      </div>

      <div dir="rtl" className="mt-7 text-center px-6 max-w-[860px]" style={{ opacity: voIn, transform: `translateY(${interpolate(voIn, [0, 1], [8, 0])}px)` }}>
        <div className="font-bold leading-[1.6] text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 16, color: "rgba(255,255,255,0.65)" }}>
          كل هذا يُستخدم فعليًا في <span className="text-white">التحليل اللغوي الجنائي</span> و<span className="text-green-400">تحليل توقيت حركة البيانات</span> لربط هويات لم تتشارك أبدًا أي رابط تقني مباشر.
        </div>
        <div className="mx-auto mt-3 h-px w-12 bg-white/15" />
      </div>
    </AbsoluteFill>
  );
};

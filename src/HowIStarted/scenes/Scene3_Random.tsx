import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  random,
} from "remotion";

const MatrixBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const columns = Math.floor(width / 20);
  return (
    <AbsoluteFill className="bg-black overflow-hidden">
      {Array.from({ length: columns }).map((_, i) => {
        const speed = 1 + (i % 5) * 0.24;
        const offset = (i * 79) % height;
        const y = (frame * speed + offset) % (height + 200) - 100;
        return (
          <div
            key={i}
            className="absolute text-green-500 font-mono text-xs"
            style={{
              left: i * 20,
              top: y,
              opacity: 0.045,
              writingMode: "vertical-rl" as any,
              textOrientation: "upright" as any,
            }}
          >
            {Array.from({ length: 20 })
              .map((_, j) => (random(`s3f-${i}-${j}`) > 0.5 ? "1" : "0"))
              .join("")}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const YTVideoRow: React.FC<{ title: string; channel: string; views: string; time: string; delay: number }> = ({
  title,
  channel,
  views,
  time,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 110 } });
  return (
    <div
      className="flex gap-4"
      style={{
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [10, 0])}px)`,
      }}
    >
      <div className="w-[228px] h-[128px] rounded-xl overflow-hidden bg-[#1a1a1a] relative shrink-0 border border-white/05">
        <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
            <div className="w-0 h-0 border-l-[12px] border-l-black border-y-[8px] border-y-transparent ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[9px] text-white tracking-wider">{time}</div>
        <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_6px_red]" />
        <div className="absolute bottom-1.5 left-1.5 px-1 py-0.5 rounded bg-red-600 font-mono text-[7px] font-bold text-white tracking-widest">LIVE</div>
      </div>
      <div className="flex-1 py-2 pr-1">
        <div className="font-bold text-white text-[16.5px] leading-[1.28] line-clamp-2" style={{ fontFamily: "Cairo, sans-serif" }}>
          {title}
        </div>
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 shrink-0" />
          <span className="font-mono text-[11px] text-zinc-300">{channel}</span>
          <span className="w-1 h-1 bg-zinc-600 rounded-full" />
          <span className="font-mono text-[10px] text-zinc-500">{views}</span>
        </div>
        <div className="font-mono text-[10px] text-zinc-500 mt-0.5 flex items-center gap-1.5">
          <span>▶ 236K</span>
          <span>•</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

export const Scene3_Random: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) => spring({ frame: frame - d, fps, config: { damping: 18, stiffness: 120 } });

  const ytPhase = frame < 136;
  const ytOpacity = interpolate(frame, [0, 18, 122, 142], [0, 1, 1, 0]);
  const googleOpacity = interpolate(frame, [128, 148], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const scrollY = interpolate(frame, [14, 118], [0, -132], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const query = "ethical hacking basics";
  const queryAr = "شنو هي ethical hacking";
  const clickScale = frame >= 142 && frame < 150 ? interpolate(frame, [142, 146, 150], [1, 0.96, 1]) : 1;
  const chars = Math.floor(interpolate(frame, [152, 210], [0, query.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const shown = query.slice(0, chars);
  const cursorOn = frame >= 152 && frame < 214 && interpolate(frame % 16, [0, 8, 9, 16], [1, 1, 0, 0]) > 0.5;
  const showResults = frame > 208;

  const text1In = s(18);
  const text2In = s(34);
  const text3In = s(52);

  return (
    <AbsoluteFill className="bg-black flex flex-col items-center justify-center overflow-hidden">
      <MatrixBackground />

      {/* kicker — stays top but animation is true middle */}
      <div
        className="absolute top-8 z-10 flex items-center gap-2.5"
        style={{ opacity: s(4), transform: `translateY(${interpolate(s(4), [0, 1], [6, 0])}px)` }}
      >
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.9)]" />
        <span className="font-mono text-[11px] tracking-[0.32em] text-green-500/85">RANDOM START</span>
        <span
          className="font-mono text-[10px] px-2 py-0.5 rounded-full border"
          style={{
            borderColor: ytPhase ? "rgba(255,0,0,0.35)" : "rgba(34,197,94,0.35)",
            color: ytPhase ? "#ff4444" : "#22c55e",
            background: ytPhase ? "rgba(255,0,0,0.08)" : "rgba(34,197,94,0.08)",
          }}
        >
          {ytPhase ? "● YOUTUBE FYP" : "○ GOOGLE SEARCH"}
        </span>
      </div>

      {/* MIDDLE — centered animation + text under it */}
      <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full max-w-[820px] px-4">
        {/* Animation stage — BIG, true middle */}
        <div className="relative w-full h-[560px] flex flex-col items-center justify-center">
          {/* YOUTUBE */}
          <div className="absolute inset-0" style={{ opacity: ytOpacity, pointerEvents: "none" }}>
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-7 h-7 rounded bg-red-600 flex items-center justify-center">
                <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-0.5" />
              </div>
              <span className="font-black text-white text-[15px] tracking-tight">YouTube</span>
              <span className="ml-2 font-mono text-[10px] px-2 py-0.5 rounded-full bg-red-600 text-white tracking-widest">FYP</span>
              <span className="font-mono text-[10px] text-zinc-500 ml-auto">RECOMMENDED • AUTO-PLAY</span>
            </div>
            <div className="h-[500px] overflow-hidden rounded-[22px] border border-white/10 bg-[#0f0f0f] p-4 shadow-[0_16px_50px_rgba(0,0,0,0.65)]">
              <div style={{ transform: `translateY(${scrollY}px)` }} className="space-y-4">
                <YTVideoRow
                  delay={8}
                  title="تعلم الهكر الأخلاقي من الصفر — اول خطوة"
                  channel="Cyber Academy"
                  views="240K views"
                  time="12:34"
                />
                <YTVideoRow
                  delay={14}
                  title="Linux for Hackers — Terminal BasicsRandom"
                  channel="NetworkChuck"
                  views="1.2M views"
                  time="08:11"
                />
                <YTVideoRow
                  delay={20}
                  title="كيف تبدأ في الأمن السيبراني بدون خطة"
                  channel="ArabSec"
                  views="88K views"
                  time="15:02"
                />
                <YTVideoRow
                  delay={26}
                  title="Wireshark — كيف ترى الحزم عشوائيا"
                  channel="HackerSploit"
                  views="560K views"
                  time="09:40"
                />
                <YTVideoRow
                  delay={32}
                  title="TryHackMe — حل عشوائي لتحدي سهل"
                  channel="TryHackMe"
                  views="12K views"
                  time="06:18"
                />
              </div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/10">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <span className="font-mono text-[8px] tracking-widest text-white/70">SCROLLING • RANDOM FEED</span>
              </div>
            </div>
          </div>

          {/* GOOGLE */}
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: googleOpacity }}>
            <div className="flex items-center gap-0.5 mb-6" style={{ transform: `scale(${clickScale})` }}>
              <span className="font-black text-[36px] tracking-tight" style={{ color: "#4285F4" }}>G</span>
              <span className="font-black text-[36px] tracking-tight" style={{ color: "#EA4335" }}>o</span>
              <span className="font-black text-[36px] tracking-tight" style={{ color: "#FBBC05" }}>o</span>
              <span className="font-black text-[36px] tracking-tight" style={{ color: "#4285F4" }}>g</span>
              <span className="font-black text-[36px] tracking-tight" style={{ color: "#34A853" }}>l</span>
              <span className="font-black text-[36px] tracking-tight" style={{ color: "#EA4335" }}>e</span>
            </div>

            <div
              className="w-[580px] h-[64px] rounded-full border bg-white flex items-center px-5 gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              style={{
                borderColor: frame >= 142 && frame < 214 ? "rgba(66,133,244,0.45)" : "rgba(0,0,0,0.08)",
                boxShadow: frame >= 142 && frame < 214 ? "0 0 0 4px rgba(66,133,244,0.12), 0 10px 30px rgba(0,0,0,0.15)" : "0 10px 30px rgba(0,0,0,0.12)",
                transform: `scale(${clickScale})`,
              }}
            >
              <span className="text-[22px] text-zinc-400">⌕</span>
              <span className="flex-1 font-mono text-[17px] text-zinc-800 truncate">
                {shown}
                {cursorOn && <span className="inline-block w-0.5 h-5 bg-zinc-800 ml-0.5 align-middle" />}
                {shown.length === 0 && frame < 152 && <span className="text-zinc-400">ابحث في Google</span>}
              </span>
              <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">🎙</div>
              <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">◉</div>
            </div>

            {/* bilingual hint under bar */}
            <div className="mt-2 font-mono text-[10px] text-zinc-500/70 tracking-wide" style={{ opacity: googleOpacity }}>
              {queryAr} • {query}
            </div>

            {frame >= 136 && frame < 156 && (
              <div
                className="absolute w-5 h-5 pointer-events-none"
                style={{
                  left: "66%",
                  top: "48%",
                  transform: `translate(-50%,-50%) scale(${frame >= 142 && frame < 148 ? 0.85 : 1})`,
                  opacity: interpolate(frame, [136, 140, 154, 158], [0, 1, 1, 0]),
                }}
              >
                <div className="w-0 h-0 border-l-[11px] border-l-black border-y-[7px] border-y-transparent rotate-[-14deg] drop-shadow" />
              </div>
            )}

            <div
              className="mt-4 w-[580px] rounded-2xl border border-black/10 bg-white overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
              style={{
                opacity: showResults ? 1 : 0,
                transform: `translateY(${showResults ? 0 : 8}px)`,
              }}
            >
              {[
                { t: "ethical hacking basics — للمبتدئين", s: "دورة مجانية • 45 دقيقة • من الصفر" },
                { t: "ما معنى googling terms للمخترق", s: "كيف تبحث عن مصطلحات لا تفهمها" },
                { t: "بدون خطة — كيف تبدأ عشوائيا", s: "تجربة • أخطاء • تعلم" },
              ].map((r, i) => (
                <div key={i} className="flex gap-3 px-5 py-3.5 border-b border-zinc-100 last:border-0">
                  <span className="text-zinc-400 text-[14px] mt-0.5">⌕</span>
                  <div className="flex-1">
                    <div className="font-mono text-[14px] text-zinc-800 leading-tight">{r.t}</div>
                    <div className="font-mono text-[11px] text-zinc-500 mt-0.5">{r.s}</div>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400">↗</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TEXT UNDER ANIMATION — true under, centered */}
        <div
          dir="rtl"
          className="mt-4 text-center px-4 max-w-[820px]"
          style={{
            opacity: text1In,
            transform: `translateY(${interpolate(text1In, [0, 1], [8, 0])}px)`,
          }}
        >
          <div className="font-bold leading-[1.45] text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 27 }}>
            بديت بشكل عشوائي نتفرج في اي فيديو يخرجلي
          </div>
          <div
            className="mt-1 font-bold leading-tight"
            style={{
              fontFamily: "Cairo, sans-serif",
              fontSize: 28,
              opacity: text2In,
              transform: `translateY(${interpolate(text2In, [0, 1], [8, 0])}px)`,
            }}
          >
            <span className="text-green-400">googling</span>
            <span className="text-white"> اي حاجة منفهمهاش</span>
          </div>
          <div
            className="mt-1 font-black leading-none text-white"
            style={{
              fontFamily: "Cairo, sans-serif",
              fontSize: 52,
              opacity: text3In,
              transform: `translateY(${interpolate(text3In, [0, 1], [8, 0])}px)`,
            }}
          >
            بلا اي خطة
            <span
              className="inline-block w-[3px] h-6 bg-green-500 mr-2 align-middle"
              style={{ opacity: interpolate(frame % 24, [0, 12, 13, 24], [1, 1, 0, 0]) }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile, Img, useCurrentFrame, interpolate, spring } from "remotion";

export const Nopc: React.FC = () => {
  const frame = useCurrentFrame();
  const vignette = 0.55 + Math.sin(frame * 0.04) * 0.05;
  const s = (d: number) => spring({ frame: frame - d, fps: 30, config: { damping: 18, stiffness: 120 } });

  const showFilter = frame >= 60 && frame < 300;
  const filterOpacity = interpolate(frame, [60, 78, 282, 300], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const g1In = s(64);
  const g2In = s(196);

  const showP1 = frame >= 304 && frame < 400;
  const p1Filter = interpolate(frame, [304, 322, 382, 400], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p1Title = s(308);

  const showTheory = frame >= 404 && frame < 840;
  const theoryFilter = interpolate(frame, [404, 422, 822, 840], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const theoryIn = s(410);
  const show80 = frame >= 844 && frame < 1280;
  const p80Filter = interpolate(frame, [844, 862, 1262, 1280], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p80In = s(850);

  const showScatter = frame >= 1284 && frame < 1684;
  const scatterFilter = interpolate(frame, [1284, 1302, 1666, 1684], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scatterIn = s(1288);

  const showTry = frame >= 1688 && frame < 2124;
  const tryFilter = interpolate(frame, [1688, 1706, 2106, 2124], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tryIn = s(1692);

  const showFake = frame >= 2128 && frame < 2550;
  const fakeFilter = interpolate(frame, [2128, 2146, 2532, 2550], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fakeIn = s(2132);

  return (
    <AbsoluteFill style={{ background: "black" }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <OffthreadVideo
          src={staticFile("assets/nopc/katana_trim.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            filter: "contrast(1.05) saturate(1.08)",
          }}
          volume={0.35}
        />
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.22) 28%, rgba(0,0,0,0.48) 100%)" }} />
        <AbsoluteFill style={{ background: `radial-gradient(ellipse at center, transparent 62%, rgba(0,0,0,${vignette}) 100%)`, pointerEvents: "none" }} />
        <AbsoluteFill style={{ opacity: 0.06, background: "repeating-linear-gradient(0deg, transparent 0px, rgba(255,255,255,0.06) 1px, transparent 2px)", pointerEvents: "none" }} />
      </AbsoluteFill>

      {/* Filter fitting Katana Zero style — pixel + dark + neon */}
      {showFilter && (
        <AbsoluteFill style={{ opacity: filterOpacity, background: "rgba(6,6,10,0.72)", backdropFilter: "blur(1px)", pointerEvents: "none" }} />
      )}
      {showFilter && (
        <AbsoluteFill className="flex flex-col items-center justify-center p-8" style={{ opacity: filterOpacity }}>
          <div className="absolute inset-4 rounded-[18px] border-2 border-white/12 pointer-events-none" style={{ borderStyle: "dashed", opacity: 0.35 }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "repeating-linear-gradient(0deg, transparent 0px, rgba(122,90,245,0.04) 1px, transparent 2px)", opacity: 0.5 }} />

          {frame < 192 && (
            <div className="flex flex-col items-center text-center" style={{ opacity: g1In, transform: `translateY(${interpolate(g1In, [0, 1], [12, 0])}px) scale(${interpolate(g1In, [0, 1], [0.97, 1])})` }}>
              <Img src={staticFile("assets/nopc/tux_white.png")} style={{ width: 176, height: 176, objectFit: "contain", filter: "drop-shadow(0 0 14px rgba(255,255,255,0.22))" }} />
              <div dir="rtl" className="mt-4 font-black leading-[1.3] text-white text-center" style={{ fontFamily: "Cairo, sans-serif", fontSize: 48, textShadow: "3px 3px 0 #1a1a1a" }}>
                اذا عمرك بين 13 و 18
              </div>
              <div dir="rtl" className="font-black leading-[1.3] text-center" style={{ fontFamily: "Cairo, sans-serif", fontSize: 42 }}>
                <span className="text-white/90">وحاب تتعلم </span>
                <span style={{ color: "#7a5af5", textShadow: "0 0 14px rgba(122,90,245,0.45)" }}>ethical hacking</span>
              </div>
            </div>
          )}

          {frame >= 192 && frame < 300 && (
            <div className="flex flex-col items-center text-center" style={{ opacity: g2In, transform: `translateY(${interpolate(g2In, [0, 1], [10, 0])}px) scale(${interpolate(g2In, [0, 1], [0.97, 1])})` }}>
              <div dir="rtl" className="font-black leading-[1.3] text-white text-center" style={{ fontFamily: "Cairo, sans-serif", fontSize: 52, textShadow: "3px 3px 0 #1a1a1a" }}>
                راح تواجه <span style={{ color: "#ef4444" }}>3 مشاكل</span>
              </div>
            </div>
          )}
        </AbsoluteFill>
      )}

      {showP1 && (
        <>
          <AbsoluteFill style={{ opacity: p1Filter, background: "rgba(6,6,10,0.78)", backdropFilter: "blur(1px)", pointerEvents: "none" }} />
          <AbsoluteFill className="flex flex-col items-center justify-center p-8" style={{ opacity: p1Filter }}>
            <div className="absolute inset-4 rounded-[18px] border-2 border-white/12 pointer-events-none" style={{ borderStyle: "dashed", opacity: 0.30 }} />
            <div className="flex flex-col items-center text-center" style={{ opacity: p1Title, transform: `translateY(${interpolate(p1Title, [0, 1], [14, 0])}px) scale(${interpolate(p1Title, [0, 1], [0.96, 1])})` }}>
              <div className="font-mono text-[11px] tracking-[0.32em] text-[#7a5af5]/70">PROBLEM 01</div>
              <div dir="rtl" className="mt-2 font-black leading-[1.2] text-white text-center" style={{ fontFamily: "Cairo, sans-serif", fontSize: 62, textShadow: "5px 5px 0 #1a1a1a, 0 0 22px rgba(0,0,0,0.5)" }}>
                المشكل الاول :<br />
                <span style={{ color: "#ef4444" }}>معندكش بي سي</span>
              </div>
              <div className="mt-6 w-[320px] h-[220px] rounded-[16px] overflow-hidden border-4 border-white" style={{ boxShadow: "6px 6px 0 #1a1a1a, 0 12px 30px rgba(0,0,0,0.4)" }}>
                <Img src={staticFile("assets/nopc/pc_pixel.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          </AbsoluteFill>
        </>
      )}

      {/* الوقت لي تستنى فيه باش تلايم مبلغ للبي سي استغلو في تعلم النظري — youtube scrolling + cyber socials */}
      {showTheory && (
        <>
          <AbsoluteFill style={{ opacity: theoryFilter, background: "rgba(6,6,10,0.76)", backdropFilter: "blur(1px)", pointerEvents: "none" }} />
          <AbsoluteFill className="flex flex-col items-center justify-center p-6" style={{ opacity: theoryFilter }}>
            <div className="absolute inset-4 rounded-[18px] border-2 border-white/10 pointer-events-none" style={{ borderStyle: "dashed", opacity: 0.28 }} />
            <div className="w-full max-w-[720px] flex flex-col items-center" style={{ opacity: theoryIn, transform: `translateY(${interpolate(theoryIn, [0, 1], [10, 0])}px)` }}>
              {/* youtube + socials mock */}
              <div className="w-full rounded-[18px] border-[3px] border-white bg-white overflow-hidden" style={{ boxShadow: "8px 8px 0 #1a1a1a, 0 12px 32px rgba(0,0,0,0.35)" }}>
                <div className="h-9 flex items-center gap-2 px-3 border-b-[2px] border-black/10 bg-[#fafafa]">
                  <div className="w-3 h-3 rounded-full bg-red-500 border border-black/10" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black/10" />
                  <div className="w-3 h-3 rounded-full bg-green-500 border border-black/10" />
                  <span className="ml-2 font-mono text-[10px] tracking-[0.16em] text-black/50">YOUTUBE • CYBER THEORY</span>
                  <span className="ml-auto flex items-center gap-1.5 font-mono text-[9px] px-2.5 py-1 rounded-full bg-red-500 text-white tracking-widest">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    SCROLLING
                  </span>
                </div>
                <div className="h-[260px] overflow-hidden relative bg-[#08080a] p-3">
                  <div className="space-y-3 will-change-transform" style={{ transform: `translateY(${interpolate(frame, [414, 632], [0, -168], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)` }}>
                    {[
                      { t: "Network Basics — نظري كامل", c: "Hacker101", v: "240K", d: "12:34" },
                      { t: "لينكس للمبتدئين — Terminal", c: "ArabSec", v: "88K", d: "08:12" },
                      { t: "Web Hacking — كيف تفهم الثغرة", c: "Cyber Academy", v: "120K", d: "15:03" },
                      { t: "OSINT بلا بي سي — تجميع معلومات", c: "OSINT Lab", v: "45K", d: "06:44" },
                      { t: "نظري قبل التطبيق — لماذا؟", c: "Theory", v: "60K", d: "10:22" },
                      { t: "HTTP & Burp — نظري معمق", c: "WebSec", v: "92K", d: "09:18" },
                    ].map((v, i) => (
                      <div key={i} className="h-[76px] rounded-[14px] bg-white/[0.08] border border-white/[0.10] flex gap-3.5 p-3 items-center backdrop-blur will-change-transform" style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.25)" }}>
                        <div className="w-[124px] h-[68px] rounded-[10px] bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center shrink-0 relative overflow-hidden border border-white/10">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
                            <div className="w-0 h-0 border-l-[9px] border-l-black border-y-[6px] border-y-transparent ml-0.5" />
                          </div>
                          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/85 font-mono text-[9px] text-white tracking-wide">{v.d}</span>
                          <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-black text-white text-[15px] leading-[1.25] truncate" style={{ fontFamily: "Cairo, sans-serif" }}>
                            {v.t}
                          </div>
                          <div className="font-mono text-[11px] text-white/50 mt-1 flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 shrink-0 border border-white/20" />
                            {v.c} • {v.v} views • قبل يومين
                          </div>
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse shrink-0" />
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-2 right-2 flex gap-1.5">
                    {[
                      { bg: "#ff0000", t: "▶" },
                      { bg: "#1da1f2", t: "𝕏" },
                      { bg: "#e1306c", t: "◎" },
                    ].map((s, k) => (
                      <div key={k} className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white border border-white/20 shadow-sm" style={{ background: s.bg }}>
                        {s.t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div dir="rtl" className="mt-6 text-center">
                <div className="font-black leading-[1.4] text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 32 }}>
                  الوقت لي تستنى فيه باش تلايم مبلغ للبي سي
                </div>
                <div className="font-black leading-[1.4]" style={{ fontFamily: "Cairo, sans-serif", fontSize: 32, color: "#7a5af5", textShadow: "0 0 14px rgba(122,90,245,0.35)" }}>
                  استغلو في تعلم النظري
                </div>
              </div>
            </div>
          </AbsoluteFill>
        </>
      )}

      {show80 && (
        <>
          <AbsoluteFill style={{ opacity: p80Filter, background: "rgba(6,6,10,0.76)", backdropFilter: "blur(1px)", pointerEvents: "none" }} />
          <AbsoluteFill className="flex flex-col items-center justify-center p-8" style={{ opacity: p80Filter }}>
            <div className="w-full max-w-[640px] rounded-[18px] border-2 border-white bg-white p-6" style={{ boxShadow: "6px 6px 0 #1a1a1a" }}>
              <div className="flex justify-between font-mono text-[10px] tracking-[0.16em] text-black/40 mb-2">
                <span>KNOWLEDGE NEEDED</span>
                <span className="text-[#7a5af5] font-black">80% THEORY</span>
              </div>
              <div className="h-8 rounded-full bg-black/05 border-2 border-black overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 bg-[#7a5af5]" style={{ width: `${interpolate(frame, [854, 940], [0, 80], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%` }} />
                <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-black tracking-widest text-white" style={{ textShadow: "0 1px 0 rgba(0,0,0,0.3)" }}>
                  {Math.round(interpolate(frame, [854, 940], [0, 80], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))}%
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2 font-mono text-[9px] tracking-[0.14em] text-black/40">
                <span className="w-2 h-2 bg-[#7a5af5] rounded-full" />
                <span>فهم التقنية لي راح تختارقها</span>
              </div>
            </div>
            <div dir="rtl" className="mt-6 text-center max-w-[780px]" style={{ opacity: p80In, transform: `translateY(${interpolate(p80In, [0, 1], [10, 0])}px)` }}>
              <div className="font-black leading-[1.5] text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 28 }}>
                80% من <span className="text-white">knowlege</span> لي تحتاجها في تطبيق تعتامد على
              </div>
              <div className="font-black leading-[1.5]" style={{ fontFamily: "Cairo, sans-serif", fontSize: 28, color: "#7a5af5" }}>
                فهم التقنية لي راح تختارقها
              </div>
            </div>
          </AbsoluteFill>
        </>
      )}

      {showScatter && (
        <>
          <AbsoluteFill style={{ opacity: scatterFilter, background: "rgba(6,6,10,0.82)", backdropFilter: "blur(1px)", pointerEvents: "none" }} />
          <AbsoluteFill className="flex flex-col items-center justify-center p-8" style={{ opacity: scatterFilter }}>
            <div className="absolute inset-4 rounded-[18px] border-2 border-white/10 pointer-events-none" style={{ borderStyle: "dashed", opacity: 0.22 }} />
            <div className="relative flex flex-col items-center text-center" style={{ opacity: scatterIn, transform: `translateY(${interpolate(scatterIn, [0, 1], [14, 0])}px) scale(${interpolate(scatterIn, [0, 1], [0.96, 1])})` }}>
              <div className="font-mono text-[11px] tracking-[0.32em] text-white/30">CHAOS • OVERLOAD</div>
              <div dir="rtl" className="mt-3 font-black leading-[1.2] text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 56, letterSpacing: -0.5, textShadow: "4px 4px 0 #1a1a1a" }}>
                الضياع من كثرة المصادر
              </div>
              <div className="mt-3 h-1 w-24 bg-white/20 rounded-full" />
            </div>
          </AbsoluteFill>
        </>
      )}

      {showTry && (
        <>
          <AbsoluteFill style={{ opacity: tryFilter, background: "rgba(6,6,10,0.82)", backdropFilter: "blur(1px)", pointerEvents: "none" }} />
          <AbsoluteFill className="flex flex-col items-center justify-center p-8" style={{ opacity: tryFilter }}>
            <div className="absolute inset-4 rounded-[18px] border-2 border-white/10 pointer-events-none" style={{ borderStyle: "dashed", opacity: 0.28 }} />
            <div className="flex flex-col items-center text-center" style={{ opacity: tryIn, transform: `translateY(${interpolate(tryIn, [0, 1], [12, 0])}px) scale(${interpolate(tryIn, [0, 1], [0.96, 1])})` }}>
              <div className="w-[520px] rounded-[16px] overflow-hidden border-2 border-white bg-[#0a0a0a] flex items-center justify-center p-6" style={{ boxShadow: "8px 8px 0 #1a1a1a, 0 14px 36px rgba(0,0,0,0.45)" }}>
                <Img src={staticFile("assets/nopc/tryhackme_official.svg")} style={{ width: 420, height: 120, objectFit: "contain" }} />
              </div>
              <div dir="rtl" className="mt-6 font-black leading-[1.4] text-white text-center" style={{ fontFamily: "Cairo, sans-serif", fontSize: 34 }}>
                في البداية تاعك دايمن اعتامد على
              </div>
              <div dir="rtl" className="font-black leading-[1.4] text-center" style={{ fontFamily: "Cairo, sans-serif", fontSize: 36, color: "#cc0000", textShadow: "0 0 14px rgba(204,0,0,0.35)" }}>
                مسارات <span className="text-white">tryhackme</span>
              </div>
              <div dir="rtl" className="mt-2 font-bold leading-[1.4] text-white/80" style={{ fontFamily: "Cairo, sans-serif", fontSize: 24 }}>
                وخلي قناة ولا زوج اتعلم منها المفاهيم
              </div>
            </div>
          </AbsoluteFill>
        </>
      )}

      {showFake && (
        <>
          <AbsoluteFill style={{ opacity: fakeFilter, background: "rgba(6,6,10,0.84)", backdropFilter: "blur(1px)", pointerEvents: "none" }} />
          <AbsoluteFill className="flex flex-col items-center justify-center p-8" style={{ opacity: fakeFilter }}>
            <div className="absolute inset-4 rounded-[18px] border-2 border-white/10 pointer-events-none" style={{ borderStyle: "dashed", opacity: 0.28 }} />
            {frame < 2248 && (
              <div className="flex flex-col items-center text-center" style={{ opacity: fakeIn, transform: `translateY(${interpolate(fakeIn, [0, 1], [12, 0])}px) scale(${interpolate(fakeIn, [0, 1], [0.96, 1])})` }}>
                <div className="font-mono text-[11px] tracking-[0.32em] text-red-400/70">FAKE GURUS</div>
                <div dir="rtl" className="mt-3 font-black leading-[1.2] text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 72, textShadow: "5px 5px 0 #1a1a1a" }}>
                  اشباه الهاكرز
                </div>
                <div className="mt-4 h-1 w-24 bg-red-500/60 rounded-full" />
              </div>
            )}
            {frame >= 2248 && (
              <div className="flex flex-col items-center text-center" style={{ opacity: s(2252), transform: `translateY(${interpolate(s(2252), [0, 1], [12, 0])}px)` }}>
                <div dir="rtl" className="font-bold leading-[1.5] text-white text-center max-w-[820px]" style={{ fontFamily: "Cairo, sans-serif", fontSize: 28 }}>
                  في البداية تاعك راح تلقى ناس يروجولك للاساسيات في الكورسات
                </div>
                <div dir="rtl" className="mt-3 font-bold leading-[1.5] text-center max-w-[820px]" style={{ fontFamily: "Cairo, sans-serif", fontSize: 22 }}>
                  <span className="text-white/80">لي يليث تعرفها انو في البدية تاعك </span>
                  <span className="text-green-400">متحتاج تدفع والو</span>
                </div>
                <div dir="rtl" className="font-black leading-[1.5] text-center" style={{ fontFamily: "Cairo, sans-serif", fontSize: 28, color: "#22c55e", textShadow: "0 0 14px rgba(34,197,94,0.35)" }}>
                  الاساسيات كامل متوفرة مجانا
                </div>
                <div className="mt-4 px-4 py-1.5 rounded-full bg-green-500 text-black font-mono text-[10px] font-black tracking-widest">FREE • YOUTUBE • DOCS</div>
              </div>
            )}
          </AbsoluteFill>
        </>
      )}
    </AbsoluteFill>
  );
};

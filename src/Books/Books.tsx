import React from "react";
import { AbsoluteFill, Img, Video, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig, Easing, Sequence } from "remotion";
import { BookOpen, Hammer, Cpu, Brain, ShieldCheck } from "lucide-react";

// Scene 1 (hook): coding bg, picture in middle (bg removed), clean text under
const BooksScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);

  const imgIn = spring({ frame, fps, config: { damping: 20, stiffness: 110 } });
  const imgScale = interpolate(imgIn, [0, 1], [0.92, 1]);
  const imgOpacity = interpolate(imgIn, [0, 1], [0, 1]);
  const imgY = interpolate(imgIn, [0, 1], [24, 0]);

  const textIn = interpolate(frame, [22, 42], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textY = interpolate(textIn, [0, 1], [14, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.58)" }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 32px" }}>
        <div style={{ opacity: imgOpacity, transform: `translateY(${imgY}px) scale(${imgScale})`, filter: "drop-shadow(0 18px 42px rgba(0,0,0,0.65))", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Img src={staticFile("books.png")} style={{ width: 780, height: 760, objectFit: "contain", display: "block" }} />
        </div>
        <div dir="rtl" style={{ marginTop: 28, textAlign: "center", opacity: textIn, transform: `translateY(${textY}px)`, maxWidth: 940 }}>
          <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontWeight: 800, fontSize: 46, color: "white", letterSpacing: "-0.02em", lineHeight: 1.35, textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}>
            <span>كتب تع </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: "JetBrains Mono, monospace", fontWeight: 800 }}>hackin</span>
            <span> خير من </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: "JetBrains Mono, monospace", fontWeight: 800, color: "#22D3EE" }}>100</span>
            <span> كورس تفرجتو</span>
          </div>
          <div style={{ marginTop: 14, width: 72, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, marginInline: "auto", opacity: textIn, transform: `scaleX(${textIn})` }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 2: same coding bg, text + outdated meme in middle
const BooksScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textIn = spring({ frame: frame + 6, fps, config: { damping: 20, stiffness: 110 } });
  const imgIn = spring({ frame: frame - 14, fps, config: { damping: 20, stiffness: 110 } });
  const imgScale = interpolate(imgIn, [0, 1], [0.92, 1]);
  const imgY = interpolate(imgIn, [0, 1], [24, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.62)" }} />
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 36px", gap: 18 }}>
        <div dir="rtl" style={{ opacity: textIn, transform: `translateY(${interpolate(textIn, [0, 1], [14, 0])}px)`, textAlign: "center", maxWidth: 940 }}>
          <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontWeight: 700, fontSize: 32, color: "white", lineHeight: 1.5, textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}>
            <span>كورس يعلمك تبيراطي </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: "JetBrains Mono, monospace", fontWeight: 800, color: "#22D3EE" }}>version</span>
            <span> من </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: "JetBrains Mono, monospace", fontWeight: 800 }}>application</span>
            <span> ولا نظام , غي تخرج </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: "JetBrains Mono, monospace", fontWeight: 800, color: "#22D3EE" }}>version</span>
            <span> جديدة يولي كورس بللا فايدة</span>
          </div>
          <div style={{ marginTop: 12, width: 56, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, marginInline: "auto", opacity: textIn, transform: `scaleX(${textIn})` }} />
        </div>
        <div style={{ opacity: imgIn, transform: `translateY(${imgY}px) scale(${imgScale})`, filter: "drop-shadow(0 18px 42px rgba(0,0,0,0.65))", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Img src={staticFile("books-outdated.png")} style={{ width: 700, height: 880, objectFit: "contain", display: "block", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 3 (first part): REAL book cover big in middle
const BooksScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame + 6, fps, config: { damping: 20, stiffness: 110 } });
  const coverIn = spring({ frame: frame - 10, fps, config: { damping: 18, stiffness: 110 } });
  const coverY = interpolate(coverIn, [0, 1], [30, 0]);
  const coverScale = interpolate(coverIn, [0, 1], [0.9, 1]);
  const subIn = interpolate(frame, [34, 54], [0, 1], { easing: Easing.bezier(0.22, 1, 0.36, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.60)" }} />
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", gap: 18 }}>
        <div dir="rtl" style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [14, 0])}px)`, fontFamily: "Cairo, Changa, sans-serif", fontWeight: 800, fontSize: 44, color: "white", textAlign: "center" }}>
          بصح كتاب كيما
        </div>
        {/* Real cover - big, with spine + glow */}
        <div style={{ opacity: coverIn, transform: `translateY(${coverY}px) scale(${coverScale})`, display: "flex", alignItems: "stretch", filter: "drop-shadow(0 28px 60px rgba(0,0,0,0.7))" }}>
          <div style={{ width: 22, borderRadius: "10px 0 0 10px", background: "linear-gradient(180deg, #1a1a1a, #000)", border: "1px solid rgba(255,255,255,0.10)", borderRight: "none" }} />
          <Img src={staticFile("books-aoe.jpg")} style={{ width: 460, height: 600, objectFit: "cover", display: "block", borderRadius: "0 12px 12px 0", border: "1px solid rgba(255,255,255,0.12)" }} />
        </div>
        <div style={{ opacity: subIn, transform: `translateY(${interpolate(subIn, [0, 1], [12, 0])}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div dir="ltr" style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 900, fontSize: 26, color: "#22D3EE" }}>Hacking: The Art of Exploitation</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "rgba(255,255,255,0.65)" }}>JON ERICKSON</span>
            <span style={{ width: 5, height: 5, borderRadius: 999, background: "#22D3EE" }} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "rgba(255,255,255,0.65)" }}>2ND EDITION</span>
            <span style={{ width: 5, height: 5, borderRadius: 999, background: "#22D3EE" }} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "rgba(255,255,255,0.65)" }}>488 PAGES</span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 4: each sentence deep animation - bigger & better, point by point
const BooksScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const points = [
    { text: "يعلمك كيفاش تتبنى الثغرة من زيرو", icon: Hammer },
    { text: "memory logic", icon: Cpu },
    { text: "وكيفاش يخمم attacker", icon: Brain },
    { text: "تسما principle يبقى مام مور 10 سنين", icon: ShieldCheck },
  ];
  const pointDur = 85;
  const pointStart = 26;
  const activeIdx = Math.min(points.length - 1, Math.max(0, Math.floor((frame - pointStart) / pointDur)));
  const pointFrame = frame - (pointStart + activeIdx * pointDur);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.64)" }} />
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 28px", gap: 16 }}>
        <div style={{ width: "100%", maxWidth: 960, display: "flex", flexDirection: "column", alignItems: "center" }}>
          {points.map((pt, i) => {
            if (i !== activeIdx) return null;
            const p = spring({ frame: pointFrame, fps, config: { damping: 22, stiffness: 95 } });
            const y = interpolate(p, [0, 1], [18, 0], { easing: Easing.bezier(0.22, 1, 0.36, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ opacity: p, transform: `translateY(${y}px) scale(${interpolate(p, [0, 1], [0.98, 1])})`, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 18, padding: "34px 28px", borderRadius: 26, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)", textAlign: "center", willChange: "transform, opacity", boxShadow: "0 14px 36px rgba(0,0,0,0.30)" }}>
                <div style={{ width: 88, height: 88, borderRadius: 22, background: "rgba(34,211,238,0.14)", border: "1px solid rgba(34,211,238,0.22)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 24px rgba(34,211,238,0.20)" }}>
                  <pt.icon size={40} color="#22D3EE" strokeWidth={1.8} />
                </div>
                <div dir="rtl" style={{ fontFamily: "Cairo, Changa, sans-serif", fontWeight: 800, fontSize: 38, color: "white", lineHeight: 1.4, textAlign: "center" }}>
                  {i === 2 ? (
                    <span dir="ltr" style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 900, color: "#22D3EE" }}>memory logic</span>
                  ) : i === 3 ? (
                    <><span>وكيفاش يخمم </span><span dir="ltr" style={{ display: "inline-block", fontFamily: "JetBrains Mono, monospace", fontWeight: 900, color: "#22D3EE" }}>attacker</span></>
                  ) : i === 4 || pt.text.includes("principle") ? (
                    <><span>تسما </span><span dir="ltr" style={{ display: "inline-block", fontFamily: "JetBrains Mono, monospace", fontWeight: 900, color: "#22D3EE" }}>principle</span><span> يبقى مام مور 10 سنين</span></>
                  ) : (
                    <span>{pt.text}</span>
                  )}
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 4 }}>
                  {i === 0 && (
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ width: 66, height: 52, borderRadius: 14, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "JetBrains Mono, monospace", fontSize: 22, fontWeight: 900, color: "rgba(255,255,255,0.6)" }}>0</div>
                      <div style={{ width: 150, height: 12, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                        <div style={{ width: `${interpolate(pointFrame, [10, 40], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.22, 1, 0.36, 1) })}%`, height: "100%", background: "#22D3EE" }} />
                      </div>
                      <div style={{ padding: "10px 16px", borderRadius: 14, background: "#22D3EE", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 0 16px rgba(34,211,238,0.45)", opacity: interpolate(pointFrame, [36, 48], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                        <span style={{ fontSize: 18 }}>🐞</span>
                        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, fontWeight: 900, color: "#000" }}>EXPLOIT</span>
                      </div>
                    </div>
                  )}
                  {i === 1 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                        {["STACK", "HEAP", "REGS"].map((t, k) => {
                          const fill = interpolate(pointFrame, [10 + k * 10, 26 + k * 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                          const overflow = k === 0 ? interpolate(pointFrame, [44, 58], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
                          return (
                            <div key={t} style={{ width: 92, height: 104, borderRadius: 12, background: "#0F172A", border: k === 1 ? "1px solid rgba(34,211,238,0.35)" : "1px solid rgba(34,211,238,0.22)", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: k === 1 ? "0 0 14px rgba(34,211,238,0.25)" : "none" }}>
                              <div style={{ flex: 1, display: "flex", alignItems: "flex-end", padding: 6, position: "relative" }}>
                                <div style={{ width: "100%", height: `${fill * 100}%`, borderRadius: 7, background: k === 1 ? "#22D3EE" : "rgba(34,211,238,0.45)" }} />
                                {k === 0 && overflow > 0 && (
                                  <div style={{ position: "absolute", top: 4, left: 6, right: 6, padding: "3px 0", borderRadius: 6, background: "#EF4444", fontSize: 8, fontWeight: 900, color: "white", textAlign: "center", opacity: overflow }}>OVERFLOW</div>
                                )}
                              </div>
                              <div style={{ fontSize: 10, color: k === 1 ? "#22D3EE" : "rgba(255,255,255,0.5)", fontFamily: "JetBrains Mono, monospace", fontWeight: 800, textAlign: "center", paddingBottom: 5 }}>{t}</div>
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(255,255,255,0.45)" }}>0x7fff… → EIP overwritten ✓</div>
                    </div>
                  )}
                  {i === 2 && (
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ width: 190, height: 60, borderRadius: 999, background: "#0F172A", border: "1px solid rgba(34,211,238,0.22)", display: "flex", alignItems: "center", padding: "0 12px", gap: 10 }}>
                        <Brain size={24} color="#22D3EE" />
                        <div style={{ display: "flex", gap: 4 }}>
                          {[0, 1, 2, 3].map(k => (
                            <span key={k} style={{ width: 8, height: 8, borderRadius: 999, background: "#22D3EE", opacity: (Math.floor(pointFrame / 7) + k) % 4 === 0 ? 1 : 0.2 }} />
                          ))}
                        </div>
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontFamily: "JetBrains Mono, monospace" }}>thinking…</span>
                      </div>
                      <span style={{ color: "#22D3EE", fontSize: 20 }}>→</span>
                      <div style={{ padding: "10px 18px", borderRadius: 999, background: "#22D3EE", color: "#000", fontWeight: 900, fontSize: 14, fontFamily: "JetBrains Mono, monospace", opacity: interpolate(pointFrame, [32, 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), boxShadow: "0 0 16px rgba(34,211,238,0.5)" }}>PWNED</div>
                    </div>
                  )}
                  {i === 3 && (
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      {[2016, 2021, 2026, "∞"].map((yr, k) => {
                        const on = pointFrame > 10 + k * 12;
                        return (
                          <div key={String(yr)} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ padding: "10px 14px", borderRadius: 14, background: on ? "rgba(34,211,238,0.14)" : "rgba(255,255,255,0.06)", border: on ? "1px solid rgba(34,211,238,0.32)" : "1px solid rgba(255,255,255,0.10)", fontFamily: "JetBrains Mono, monospace", fontSize: 15, fontWeight: 800, color: on ? "#22D3EE" : "rgba(255,255,255,0.4)" }}>{yr}</div>
                            {k < 3 && <span style={{ color: on ? "#22D3EE" : "rgba(255,255,255,0.2)", fontSize: 16 }}>→</span>}
                          </div>
                        );
                      })}
                      <ShieldCheck size={30} color="#22D3EE" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
          {points.map((_, i) => (
            <div key={i} style={{ width: i === activeIdx ? 24 : 8, height: 8, borderRadius: 999, background: i === activeIdx ? "#22D3EE" : i < activeIdx ? "rgba(34,211,238,0.5)" : "rgba(255,255,255,0.18)" }} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Last scene: closing line
const BooksScene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const iconIn = spring({ frame: frame + 6, fps, config: { damping: 20, stiffness: 110 } });
  const words = "هادو قواعد ميتغيروش مام مور عشر سنين".split(" ");

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.62)" }} />
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 36px", gap: 20 }}>
        <div style={{ opacity: iconIn, transform: `translateY(${interpolate(iconIn, [0, 1], [16, 0])}px) scale(${interpolate(iconIn, [0, 1], [0.9, 1])})`, width: 96, height: 96, borderRadius: 24, background: "rgba(34,211,238,0.14)", border: "1px solid rgba(34,211,238,0.22)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 28px rgba(34,211,238,0.20)" }}>
          <ShieldCheck size={44} color="#22D3EE" strokeWidth={1.8} />
        </div>
        <div dir="rtl" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, maxWidth: 920, fontFamily: "Cairo, Changa, sans-serif", fontWeight: 800, fontSize: 44, lineHeight: 1.4, textAlign: "center" }}>
          {words.map((w, i) => {
            const p = spring({ frame: frame - (18 + i * 5), fps, config: { damping: 18, stiffness: 150 } });
            return (
              <span key={i} style={{ display: "inline-block", opacity: p, transform: `translateY(${interpolate(p, [0, 1], [16, 0])}px)`, color: "white", textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}>{w}</span>
            );
          })}
        </div>
        <div style={{ width: 72, height: 2, background: "rgba(34,211,238,0.9)", borderRadius: 999, opacity: interpolate(frame, [52, 66], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), transform: `scaleX(${interpolate(frame, [52, 66], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`, boxShadow: "0 0 10px rgba(34,211,238,0.5)" }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Books: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Sequence from={0} durationInFrames={150}>
        <BooksScene1 />
      </Sequence>
      <Sequence from={150} durationInFrames={200}>
        <BooksScene2 />
      </Sequence>
      <Sequence from={350} durationInFrames={160}>
        <BooksScene3 />
      </Sequence>
      <Sequence from={510} durationInFrames={380}>
        <BooksScene4 />
      </Sequence>
      <Sequence from={890} durationInFrames={150}>
        <BooksScene5 />
      </Sequence>
    </AbsoluteFill>
  );
};

export const BOOKS_DURATION = 1040;
export const BOOKS_FPS = 30;
export const BOOKS_WIDTH = 1080;
export const BOOKS_HEIGHT = 1920;

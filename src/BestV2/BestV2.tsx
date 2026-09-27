import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

const STARS = [
  { x: 12, y: 18, s: 1.2, o: 0.22 }, { x: 84, y: 32, s: 1, o: 0.18 }, { x: 38, y: 44, s: 1.4, o: 0.16 },
  { x: 72, y: 12, s: 1.1, o: 0.2 }, { x: 18, y: 62, s: 1, o: 0.15 }, { x: 92, y: 54, s: 1.3, o: 0.19 },
  { x: 28, y: 82, s: 1, o: 0.14 }, { x: 64, y: 78, s: 1.2, o: 0.17 }, { x: 46, y: 22, s: 1, o: 0.13 },
  { x: 8, y: 42, s: 1.1, o: 0.18 }, { x: 88, y: 88, s: 1, o: 0.15 }, { x: 54, y: 36, s: 1.3, o: 0.2 },
  { x: 22, y: 28, s: 1, o: 0.16 }, { x: 78, y: 64, s: 1.1, o: 0.17 }, { x: 36, y: 72, s: 1, o: 0.14 },
  { x: 58, y: 14, s: 1.2, o: 0.19 }, { x: 14, y: 52, s: 1, o: 0.15 }, { x: 68, y: 42, s: 1, o: 0.13 },
  { x: 42, y: 92, s: 1.1, o: 0.16 }, { x: 96, y: 24, s: 1, o: 0.18 }, { x: 32, y: 38, s: 1.2, o: 0.2 },
  { x: 76, y: 26, s: 1, o: 0.15 }, { x: 48, y: 58, s: 1, o: 0.14 }, { x: 18, y: 76, s: 1.3, o: 0.17 },
  { x: 62, y: 88, s: 1, o: 0.13 }, { x: 52, y: 68, s: 1.1, o: 0.16 }, { x: 88, y: 42, s: 1, o: 0.18 },
  { x: 26, y: 56, s: 1, o: 0.15 }, { x: 74, y: 72, s: 1.2, o: 0.19 }, { x: 34, y: 16, s: 1, o: 0.14 },
];

export const BestV2: React.FC = () => {
  const frame = useCurrentFrame();
  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);

  // Scene 1: 0-149 — Hook
  if (frame < 150) {
    const logoOpacity = interpolate(frame, [0, 16], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const logoScale = interpolate(frame, [0, 16], [0.94, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const fullText = "افضل قرار تديره في حياتك";
    const typeSpeed = 1.15;
    const startType = 14;
    const charsToShow = Math.max(0, Math.min(fullText.length, Math.floor((frame - startType) / typeSpeed) + 1));
    const showCursor = frame >= startType && frame < startType + fullText.length * typeSpeed + 28 && frame % 10 < 6;
    const displayed = frame >= startType ? fullText.slice(0, charsToShow) : "";
    const textOpacity = interpolate(frame, [startType - 4, startType + 2], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
      <AbsoluteFill style={{ backgroundColor: "#060814" }}>
        {STARS.map((st, i) => (
          <div key={i} style={{ position: "absolute", left: `${st.x}%`, top: `${st.y}%`, width: st.s * 2.2, height: st.s * 2.2, borderRadius: 999, background: "white", opacity: st.o, boxShadow: `0 0 ${st.s * 4}px rgba(255,255,255,${st.o * 0.6})` }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(900px 600px at 50% 42%, rgba(255,255,255,0.03), transparent 62%)", pointerEvents: "none" }} />
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 32px" }}>
          <div style={{ opacity: logoOpacity, transform: `scale(${logoScale})`, willChange: "transform, opacity", filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.45))", position: "relative" }}>
            <Img src={staticFile("best-tux-cut.png")} style={{ width: 680, height: 560, objectFit: "contain", display: "block" }} />
          </div>
          <div dir="rtl" style={{ marginTop: 32, opacity: textOpacity, textAlign: "center", minHeight: 64 }}>
            <span style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 950, fontSize: 58, color: "white", letterSpacing: "-0.04em", lineHeight: 1, textShadow: "0 4px 24px rgba(0,0,0,0.75), 0 0 32px rgba(250,204,21,0.18)", direction: "rtl", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", padding: "10px 18px", borderRadius: 14 }}>
              {displayed}
              <span style={{ background: showCursor ? "#facc15" : "transparent", width: 5, height: 40, display: "inline-block", marginRight: 8, verticalAlign: "middle", marginBottom: 4, opacity: showCursor ? 1 : 0, boxShadow: showCursor ? "0 0 12px rgba(250,204,21,0.8)" : "none" }} />
            </span>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  // Scene 2: 150-239 — Logo left middle (mustache) BEFORE quote — keep everything
  if (frame < 240) {
    const s = frame - 150; // 0-89
    const logoIn = interpolate(s, [0, 16], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return (
      <AbsoluteFill style={{ backgroundColor: "#060814" }}>
        {STARS.map((st, i) => (
          <div key={i} style={{ position: "absolute", left: `${st.x}%`, top: `${st.y}%`, width: st.s * 2.2, height: st.s * 2.2, borderRadius: 999, background: "white", opacity: st.o * 0.85, boxShadow: `0 0 ${st.s * 4}px rgba(255,255,255,${st.o * 0.5})` }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(900px 600px at 50% 42%, rgba(255,255,255,0.03), transparent 62%)", pointerEvents: "none" }} />
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 32px" }}>
          <div style={{ opacity: logoIn, transform: `translateX(${interpolate(logoIn, [0, 1], [-18, 0])}px) scale(${interpolate(logoIn, [0, 1], [0.92, 1])})`, filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.5))", position: "absolute", left: "8%", top: "50%", transformOrigin: "center" }}>
            <Img src={staticFile("best-linux-mustache.png")} style={{ width: 460, height: 460, objectFit: "contain", display: "block" }} />
          </div>
          <div style={{ position: "absolute", left: "54%", right: 32, top: "50%", transform: "translateY(-50%)", opacity: interpolate(s, [12, 26], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
            <div style={{ width: 48, height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 999, marginBottom: 16 }} />
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.2em", color: "rgba(255,255,255,0.28)", fontWeight: 700 }}>IMAGE 01 • LINUX</div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  // Scene 3: 240-389 — Quote يخدم بلينيكس then big why — 2 scenes total for this part
  const s = frame - 240; // 0-149
  const quoteIn = interpolate(s, [0, 16], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const holdOut = interpolate(s, [88, 102], [1, 0], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const whyIn = interpolate(s, [108, 128], [0, 1], { easing: Easing.bezier(0.34, 1.56, 0.64, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const showFirst = s < 102;
  const showWhy = s >= 108;

  return (
    <AbsoluteFill style={{ backgroundColor: "#060814" }}>
      {STARS.map((st, i) => (
        <div key={i} style={{ position: "absolute", left: `${st.x}%`, top: `${st.y}%`, width: st.s * 2.2, height: st.s * 2.2, borderRadius: 999, background: "white", opacity: st.o * 0.85, boxShadow: `0 0 ${st.s * 4}px rgba(255,255,255,${st.o * 0.5})` }} />
      ))}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(900px 600px at 50% 42%, rgba(255,255,255,0.03), transparent 62%)", pointerEvents: "none" }} />

      {showFirst && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 36px", opacity: holdOut }}>
          <div dir="rtl" style={{ textAlign: "center", opacity: quoteIn, transform: `translateY(${interpolate(quoteIn, [0, 1], [12, 0])}px)` }}>
            <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 950, fontSize: 46, color: "white", letterSpacing: "-0.03em", lineHeight: 1.3, textShadow: "0 4px 24px rgba(0,0,0,0.6)" }}>
              “الانسان الاعلى<br />يخدم <span style={{ color: "#facc15" }}>بلينيكس</span>”
            </div>
            <div style={{ marginTop: 12, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.18em", color: "rgba(255,255,255,0.28)", fontWeight: 700 }}>NIETZSCHE • PARODY</div>
          </div>
        </AbsoluteFill>
      )}

      {showWhy && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: whyIn, transform: `scale(${interpolate(whyIn, [0, 1], [0.82, 1])})` }}>
          <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 950, fontSize: 168, color: "white", letterSpacing: "-0.06em", lineHeight: 1, textShadow: "0 8px 32px rgba(0,0,0,0.7), 0 0 40px rgba(255,255,255,0.12)" }}>
            why<span style={{ color: "#facc15" }}>?</span>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

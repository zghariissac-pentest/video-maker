import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

// Nearly black, empty cosmic — sparse tiny white stars, large empty areas, subtle nebula, few particles
const STARS = [
  { x: 14, y: 16, s: 1, o: 0.18 }, { x: 82, y: 28, s: 1.1, o: 0.16 }, { x: 38, y: 42, s: 1, o: 0.12 },
  { x: 68, y: 14, s: 1, o: 0.15 }, { x: 22, y: 64, s: 1, o: 0.12 }, { x: 90, y: 52, s: 1.1, o: 0.14 },
  { x: 32, y: 78, s: 1, o: 0.11 }, { x: 60, y: 76, s: 1, o: 0.13 }, { x: 48, y: 20, s: 1, o: 0.10 },
  { x: 10, y: 44, s: 1, o: 0.14 }, { x: 86, y: 86, s: 1, o: 0.12 }, { x: 56, y: 34, s: 1, o: 0.15 },
  { x: 24, y: 30, s: 1, o: 0.11 }, { x: 76, y: 62, s: 1, o: 0.13 }, { x: 40, y: 88, s: 1, o: 0.10 },
  { x: 62, y: 12, s: 1, o: 0.14 }, { x: 18, y: 54, s: 1, o: 0.12 }, { x: 70, y: 40, s: 1, o: 0.10 },
  { x: 44, y: 90, s: 1, o: 0.11 }, { x: 94, y: 22, s: 1, o: 0.13 }, { x: 30, y: 36, s: 1, o: 0.14 },
  { x: 74, y: 24, s: 1, o: 0.12 }, { x: 50, y: 56, s: 1, o: 0.10 }, { x: 20, y: 74, s: 1, o: 0.13 },
];

export const WhyLinuxOverWindows: React.FC = () => {
  const frame = useCurrentFrame();
  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);

  // hook: text + icon in middle isolated + text under
  const logoOpacity = interpolate(frame, [0, 18], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const logoScale = interpolate(frame, [0, 18], [0.94, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line1In = interpolate(frame, [14, 28], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subIn = interpolate(frame, [28, 42], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#05070a" }}>
      {/* sparse stars */}
      {STARS.map((st, i) => (
        <div key={i} style={{ position: "absolute", left: `${st.x}%`, top: `${st.y}%`, width: st.s * 1.8, height: st.s * 1.8, borderRadius: 999, background: "white", opacity: st.o, boxShadow: `0 0 ${st.s * 3}px rgba(255,255,255,${st.o * 0.5})` }} />
      ))}
      {/* extremely subtle nebula — almost monochrome */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(800px 500px at 52% 38%, rgba(255,255,255,0.025), transparent 62%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(600px 400px at 30% 70%, rgba(255,255,255,0.015), transparent 60%)", pointerEvents: "none" }} />
      {/* few tiny particles drifting slowly */}
      {[
        { x: 18, y: 28, d: 0 }, { x: 82, y: 36, d: 1.2 }, { x: 48, y: 78, d: 0.6 },
      ].map((p, idx) => (
        <div key={idx} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: 1.5, height: 1.5, borderRadius: 999, background: "rgba(255,255,255,0.28)", opacity: 0.35, transform: `translateY(${Math.sin(frame * 0.02 + p.d) * 4}px)`, boxShadow: "0 0 4px rgba(255,255,255,0.25)" }} />
      ))}
      {/* faint dust */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(1000px 700px at 50% 50%, transparent 60%, rgba(0,0,0,0.22) 100%)", pointerEvents: "none" }} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 36px" }}>
        {/* text */}
        <div dir="rtl" style={{ textAlign: "center", opacity: line1In, transform: `translateY(${interpolate(line1In, [0, 1], [10, 0])}px)`, marginBottom: 28 }}>
          <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 950, fontSize: 52, color: "white", letterSpacing: "-0.03em", lineHeight: 1.15, textShadow: "0 4px 24px rgba(0,0,0,0.6)" }}>
            افضل قرار تديرو في حياتك
          </div>
          <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 950, fontSize: 48, color: "#facc15", letterSpacing: "-0.03em", lineHeight: 1.15, marginTop: 4 }}>
            انك تحول <span style={{ color: "white" }}>لينيكس</span>
          </div>
        </div>

        {/* icon in middle — background removal isolated */}
        <div style={{ opacity: logoOpacity, transform: `scale(${logoScale})`, willChange: "transform, opacity", filter: "drop-shadow(0 14px 32px rgba(0,0,0,0.55))" }}>
          <Img src={staticFile("best-tux-cut.png")} style={{ width: 620, height: 520, objectFit: "contain", display: "block" }} />
        </div>

        {/* text under it — optional subtle */}
        <div dir="rtl" style={{ marginTop: 22, opacity: subIn, transform: `translateY(${interpolate(subIn, [0, 1], [8, 0])}px)`, textAlign: "center" }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.2em", color: "rgba(255,255,255,0.24)", fontWeight: 700 }}>WHY LINUX OVER WINDOWS • SWITCH NOW</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

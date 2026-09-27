import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Video } from "remotion";

export const AndroidScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);
  const imgIn = spring({ frame, fps, config: { damping: 16, stiffness: 140 } });
  const textIn = interpolate(frame, [16, 30], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 40px", gap: 24 }}>
        <div style={{ opacity: imgIn, transform: `scale(${interpolate(imgIn, [0, 1], [0.96, 1])}) translateY(${interpolate(imgIn, [0, 1], [12, 0])}px)`, filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.6))" }}>
          <Img src={staticFile("android-kernel.jpg")} style={{ width: 620, height: 620, objectFit: "cover", borderRadius: 18, display: "block", border: "1px solid rgba(255,255,255,0.14)" }} />
        </div>
        <div dir="rtl" style={{ textAlign: "center", opacity: textIn, transform: `translateY(${interpolate(textIn, [0, 1], [10, 0])}px)` }}>
          <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 950, fontSize: 44, color: "white", lineHeight: 1.35, textShadow: "0 4px 24px rgba(0,0,0,0.7)" }}>
            نواة هاتف الاندرويد لي عندك مبنية على <span style={{ color: "#22c55e" }}>لينيكس</span>
          </div>
          <div style={{ marginTop: 8, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.16em", color: "rgba(255,255,255,0.45)", fontWeight: 700 }}>
            ANDROID KERNEL • LINUX BASED
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

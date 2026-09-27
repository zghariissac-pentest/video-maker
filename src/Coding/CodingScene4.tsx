import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Video } from "remotion";

export const CodingScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);
  const imgIn = spring({ frame, fps, config: { damping: 16, stiffness: 140 } });
  const textIn = interpolate(frame, [16, 30], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.62)" }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 40px", gap: 24 }}>
        <div style={{ opacity: imgIn, transform: `scale(${interpolate(imgIn, [0, 1], [0.96, 1])}) translateY(${interpolate(imgIn, [0, 1], [12, 0])}px)` }}>
          <Img src={staticFile("coding-ai.jpg")} style={{ width: 620, height: 510, objectFit: "cover", borderRadius: 18, display: "block", border: "1px solid rgba(255,255,255,0.14)" }} />
        </div>
        <div dir="rtl" style={{ textAlign: "center", opacity: textIn, transform: `translateY(${interpolate(textIn, [0, 1], [10, 0])}px)` }}>
          <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 950, fontSize: 42, color: "white", lineHeight: 1.35, textShadow: "0 4px 24px rgba(0,0,0,0.7)" }}>
            بصح يا زيرو ال<span style={{ color: "#60a5fa" }}>ai</span> راه يكتب كود خير منا كامل
          </div>
          <div style={{ marginTop: 10, width: 64, height: 2, background: "rgba(255,255,255,0.55)", borderRadius: 999, marginInline: "auto" }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

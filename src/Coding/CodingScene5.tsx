import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Video } from "remotion";

export const CodingScene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);
  const l1 = spring({ frame, fps, config: { damping: 16, stiffness: 140 } });
  const l2 = interpolate(frame, [22, 36], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badgeIn = interpolate(frame, [40, 54], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.62)" }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 44px", gap: 20 }}>
        <div dir="rtl" style={{ textAlign: "center", opacity: l1, transform: `scale(${interpolate(l1, [0, 1], [0.94, 1])}) translateY(${interpolate(l1, [0, 1], [12, 0])}px)` }}>
          <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 950, fontSize: 42, color: "white", lineHeight: 1.4, textShadow: "0 4px 24px rgba(0,0,0,0.7)" }}>
            <span style={{ color: "#60a5fa" }}>ai</span> يكتب كود ونتا يليق <span style={{ color: "#22c55e" }}>تراجعو</span>
          </div>
        </div>
        <div dir="rtl" style={{ textAlign: "center", opacity: l2, transform: `translateY(${interpolate(l2, [0, 1], [12, 0])}px)` }}>
          <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 800, fontSize: 28, color: "rgba(255,255,255,0.92)", lineHeight: 1.5, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "14px 20px" }}>
            تسما المهمة تاعك ولات المراجعة وتكون خط الدفاع التالي
          </div>
        </div>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.16em", color: "rgba(255,255,255,0.45)", fontWeight: 700, opacity: badgeIn }}>
          YOU REVIEW — YOU ARE THE LAST LINE
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

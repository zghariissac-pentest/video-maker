import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Video } from "remotion";

export const CodingScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);
  const titleIn = spring({ frame, fps, config: { damping: 16, stiffness: 140 } });
  const pillsIn = spring({ frame: frame - 28, fps, config: { damping: 16, stiffness: 140 } });
  const badgeIn = interpolate(frame, [20, 34], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.62)" }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 44px", gap: 22 }}>
        <div dir="rtl" style={{ textAlign: "center", opacity: titleIn, transform: `scale(${interpolate(titleIn, [0, 1], [0.94, 1])}) translateY(${interpolate(titleIn, [0, 1], [12, 0])}px)` }}>
          <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 950, fontSize: 44, color: "white", lineHeight: 1.35, textShadow: "0 4px 24px rgba(0,0,0,0.7)" }}>
            نفس شي مع <span style={{ color: "#60a5fa" }}>GRC</span> و <span style={{ color: "#facc15" }}>Vulnerability Management</span>
          </div>
          <div style={{ marginTop: 8, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.16em", color: "rgba(255,255,255,0.45)", fontWeight: 700, opacity: badgeIn }}>
            SAME — NO CODING NEEDED
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", opacity: pillsIn, transform: `translateY(${interpolate(pillsIn, [0, 1], [12, 0])}px)` }}>
          {["GRC", "vulnerability management"].map((j) => (
            <div key={j} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 999, padding: "12px 20px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.6)" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 15, color: "white" }}>{j}</span>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

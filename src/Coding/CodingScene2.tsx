import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Video } from "remotion";

export const CodingScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);
  const imgIn = spring({ frame, fps, config: { damping: 16, stiffness: 140 } });
  const titleIn = interpolate(frame, [14, 28], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pillsIn = spring({ frame: frame - 30, fps, config: { damping: 16, stiffness: 140 } });
  const jobs = ["SOC analyst", "GRC", "vulnerability management"];
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.62)" }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 40px", gap: 20 }}>
        <div style={{ opacity: imgIn, transform: `scale(${interpolate(imgIn, [0, 1], [0.96, 1])}) translateY(${interpolate(imgIn, [0, 1], [12, 0])}px)` }}>
          <Img src={staticFile("coding-soc.jpg")} style={{ width: 620, height: 618, objectFit: "cover", borderRadius: 18, display: "block", border: "1px solid rgba(255,255,255,0.14)" }} />
        </div>
        <div dir="rtl" style={{ textAlign: "center", opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [10, 0])}px)` }}>
          <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 950, fontSize: 36, color: "white", lineHeight: 1.35, textShadow: "0 4px 24px rgba(0,0,0,0.7)" }}>
            لل <span style={{ color: "#60a5fa" }}>entry level jobs</span> متحتاجش <span style={{ color: "#facc15" }}>programming</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", opacity: pillsIn, transform: `translateY(${interpolate(pillsIn, [0, 1], [12, 0])}px)` }}>
          {jobs.map((j) => (
            <div key={j} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 999, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.6)" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 13, color: "white" }}>{j}</span>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

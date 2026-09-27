import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CYBER, FONT } from "../../profx/Theme";

export const ScenePerformance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title entrance — big
  const tSpring = spring({ frame, fps, config: { damping: 16, stiffness: 140 } });
  const tY = interpolate(tSpring, [0, 1], [22, 0]);
  const tOpacity = tSpring;

  // Microwave — quick pop in middle, delay 12f
  const mDelay = 12;
  const mSpring = spring({ frame: frame - mDelay, fps, config: { damping: 14, stiffness: 180, mass: 0.8 } });
  const mScale = interpolate(mSpring, [0, 1], [0.82, 1]);
  const mY = interpolate(mSpring, [0, 1], [18, 0]);
  const mBlur = interpolate(mSpring, [0, 1], [14, 0]);
  const mOpacity = interpolate(mSpring, [0, 0.5], [0, 1]);

  return (
    <AbsoluteFill style={{ background: "#000000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px" }}>
      {/* big title */}
      <div style={{ opacity: tOpacity, transform: `translateY(${tY}px)`, textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 56, fontWeight: 900, color: CYBER.white, direction: "rtl", lineHeight: 1, textShadow: "0 0 22px rgba(34,211,238,0.22)" }}>
          اداء افضل على الاجهزة القديمة
        </div>
        <div style={{ width: 72, height: 2, background: CYBER.cyan, borderRadius: 999, margin: "12px auto 0", boxShadow: "0 0 10px rgba(34,211,238,0.7)", opacity: tOpacity }} />
      </div>

      {/* microwave — quickly in middle */}
      <div
        style={{
          opacity: mOpacity,
          transform: `translateY(${mY}px) scale(${mScale})`,
          filter: mBlur > 0.3 ? `blur(${mBlur}px)` : `drop-shadow(0 22px 50px rgba(0,0,0,0.65)) drop-shadow(0 0 26px rgba(255,255,255,0.08))`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Img src={staticFile("linux-microwave.png")} style={{ width: 780, height: 475, objectFit: "contain" }} />
      </div>

      {/* tiny caption */}
      <div
        style={{
          marginTop: 18,
          fontFamily: FONT.mono,
          fontSize: 12,
          color: "rgba(255,255,255,0.42)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          opacity: interpolate(frame, [28, 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        حتى <span style={{ color: CYBER.white }}>الـ toaster</span> يطير مع لينكس
      </div>
    </AbsoluteFill>
  );
};

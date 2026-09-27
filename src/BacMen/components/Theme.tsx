import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// -- BAC-MEN : dark, clean, premium --
export const BM = {
  bg: "#060A14",
  bg2: "#0B1220",
  paper: "#0F172A",
  ink: "#F8FAFC",
  muted: "#94A3B8",
  line: "#1E293B",
  accent: "#EF4444", // red strike
  accent2: "#22D3EE", // cyber cyan
  accent3: "#22C55E", // success
  gold: "#F59E0B",
  cyan: "#06B6D4",
};

export const BacMenBg: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 10;
  return (
    <AbsoluteFill style={{ background: BM.bg, overflow: "hidden" }}>
      {/* subtle grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${BM.line} 1px, transparent 1px), linear-gradient(90deg, ${BM.line} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          opacity: 0.18,
          maskImage: "radial-gradient(ellipse 82% 64% at 50% 38%, black 38%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 82% 64% at 50% 38%, black 38%, transparent 78%)",
        }}
      />
      {/* soft glows */}
      <div
        style={{
          position: "absolute",
          left: "10%",
          top: "10%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BM.accent}14, transparent 70%)`,
          filter: "blur(34px)",
          transform: `translate(${drift}px, ${-drift * 0.6}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "-6%",
          bottom: "14%",
          width: 720,
          height: 720,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BM.accent2}12, transparent 70%)`,
          filter: "blur(38px)",
          transform: `translate(${-drift}px, ${drift * 0.5}px)`,
        }}
      />
      {/* vignette */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse 92% 74% at 50% 50%, transparent 58%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

export const TopBar: React.FC<{ label?: string }> = ({ label = "BAC-MEN  •  CYBERSECURITY" }) => (
  <div
    style={{
      position: "absolute",
      top: 34,
      left: 28,
      right: 28,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 5,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 9,
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: BM.accent }} />
      </div>
      <span
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 11,
          letterSpacing: "0.16em",
          fontWeight: 700,
          color: BM.muted,
        }}
      >
        {label}
      </span>
    </div>
    <div
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 10,
        letterSpacing: "0.14em",
        color: BM.muted,
        border: `1px solid ${BM.line}`,
        background: "rgba(255,255,255,0.06)",
        padding: "6px 10px",
        borderRadius: 999,
      }}
    >
      01 / HOOK
    </div>
  </div>
);

export const Pill: React.FC<{ children: React.ReactNode; tone?: string }> = ({ children, tone = BM.accent }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "9px 15px",
      borderRadius: 999,
      background: "rgba(255,255,255,0.06)",
      border: `1px solid ${BM.line}`,
      fontFamily: "JetBrains Mono, monospace",
      fontSize: 11,
      letterSpacing: "0.14em",
      fontWeight: 800,
      color: tone,
    }}
  >
    <span style={{ width: 7, height: 7, borderRadius: "50%", background: tone, display: "inline-block" }} />
    {children}
  </div>
);

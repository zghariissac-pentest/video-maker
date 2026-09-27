import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CYBER, FONT } from "./Theme";

// ---------------------------------------------------------------------------
// Arty UI building blocks: glass panels, radar, orbits, satellites, counters.
// ---------------------------------------------------------------------------

export const GlassCard: React.FC<{
  children: React.ReactNode;
  accent?: string;
  style?: React.CSSProperties;
  corner?: boolean;
}> = ({ children, accent = CYBER.cyan, style, corner = true }) => {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 18,
        background: `linear-gradient(160deg, rgba(${RGBa(accent)},0.10), rgba(3,8,14,0.72) 55%)`,
        border: `1px solid ${accent}55`,
        boxShadow: `0 0 0 1px rgba(0,0,0,0.4), 0 16px 60px rgba(0,0,0,0.55), inset 0 0 40px ${accent}22`,
        backdropFilter: "blur(6px)",
        padding: 26,
        ...style,
      }}
    >
      {corner && (
        <>
          <span style={cornerDot("top", "left", accent)} />
          <span style={cornerDot("top", "right", accent)} />
          <span style={cornerDot("bottom", "left", accent)} />
          <span style={cornerDot("bottom", "right", accent)} />
        </>
      )}
      {children}
    </div>
  );
};

const RGBa = (c: string) => {
  const hex = c.replace("#", "");
  const n = parseInt(hex.padEnd(6, "0"), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
};

function cornerDot(ver: "top" | "bottom", hor: "left" | "right", accent: string): React.CSSProperties {
  return {
    position: "absolute",
    [ver]: 8,
    [hor]: 8,
    width: 10,
    height: 10,
    borderTop: ver === "top" ? `2px solid ${accent}` : "none",
    borderBottom: ver === "bottom" ? `2px solid ${accent}` : "none",
    borderLeft: hor === "left" ? `2px solid ${accent}` : "none",
    borderRight: hor === "right" ? `2px solid ${accent}` : "none",
  };
}

export const Badge: React.FC<{
  label: string;
  icon?: React.ReactNode;
  accent?: string;
  startAt?: number;
}> = ({ label, icon, accent = CYBER.cyan, startAt = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - startAt, fps, config: { damping: 13, stiffness: 160 } });
  return (
    <div
      style={{
        fontFamily: FONT.mono,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 20px",
        borderRadius: 999,
        border: `1px solid ${accent}66`,
        background: `rgba(${RGBa(accent)},0.12)`,
        color: CYBER.white,
        letterSpacing: "0.2em",
        fontSize: 24,
        textTransform: "uppercase",
        transform: `scale(${s})`,
        opacity: s,
      }}
    >
      {icon}
      {label}
    </div>
  );
};

export const ProgressBar: React.FC<{
  value: number; // 0..1 target
  accent?: string;
  startAt?: number;
  label?: string;
}> = ({ value, accent = CYBER.green, startAt = 0, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - startAt, fps, config: { damping: 15, stiffness: 60 } });
  const fill = p * value;
  return (
    <div style={{ width: "100%" }}>
      {label && (
        <div
          style={{
            fontFamily: FONT.mono,
            display: "flex",
            justifyContent: "space-between",
            color: CYBER.muted,
            fontSize: 20,
            marginBottom: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <span>{label}</span>
          <span style={{ color: accent }}>{Math.round(fill * 100)}%</span>
        </div>
      )}
      <div
        style={{
          height: 16,
          borderRadius: 8,
          background: "rgba(0,0,0,0.5)",
          border: `1px solid ${accent}44`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${fill * 100}%`,
            background: `linear-gradient(90deg, ${accent}, #ffffff)`,
            boxShadow: `0 0 20px ${accent}`,
          }}
        />
      </div>
    </div>
  );
};

export const CountUp: React.FC<{
  to: number;
  startAt?: number;
  format?: (n: number) => string;
}> = ({ to, startAt = 0, format }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - startAt, fps, config: { damping: 18, stiffness: 55 } });
  const v = Math.round(to * p);
  return <span>{format ? format(v) : v}</span>;
};

export const Radar: React.FC<{
  size?: number;
  accent?: string;
  children?: React.ReactNode;
}> = ({ size = 260, accent = CYBER.cyan, children }) => {
  const frame = useCurrentFrame();
  const sweep = (frame * 360) / 150; // one revolution ~5s
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {[0.05, 0.35, 0.62, 0.9].map((o, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: `${o * 100}%`,
            borderRadius: "50%",
            border: `1px solid ${accent}${Math.round(30 + i * 8)}`,
          }}
        />
      ))}
      {/* crosshair */}
      <div style={{ position: "absolute", inset: 0, border: `1px solid ${accent}22` }}>
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: `${accent}22` }} />
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: `${accent}22` }} />
      </div>
      {/* sweep */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: `conic-gradient(from 0deg, ${accent}66, transparent 60deg)`,
          transform: `rotate(${sweep}deg)`,
        }}
      />
      {children}
    </div>
  );
};

export const Blip: React.FC<{
  x: number; // -1..1
  y: number;
  accent?: string;
  size?: number;
}> = ({ x, y, accent = CYBER.green, size = 12 }) => {
  const frame = useCurrentFrame();
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.15);
  return (
    <div
      style={{
        position: "absolute",
        left: `calc(50% + ${x * 50}%)`,
        top: `calc(50% + ${y * 50}%)`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: accent,
        boxShadow: `0 0 ${10 + pulse * 14}px ${accent}`,
        transform: "translate(-50%,-50%)",
      }}
    />
  );
};

export const Orbit: React.FC<{
  accent?: string;
  r: number; // 0..1 fraction of container
  speed?: number;
  satellite?: boolean;
}> = ({ accent = CYBER.magenta, r, speed = 1, satellite = true }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        inset: `${(1 - r) * 50}%`,
        borderRadius: "50%",
        border: `1px dashed ${accent}77`,
        transform: `rotate(${frame * speed}deg)`,
      }}
    >
      {satellite && (
        <div
          style={{
            position: "absolute",
            top: -6,
            left: "50%",
            width: 12,
            height: 12,
            marginLeft: -6,
            borderRadius: "50%",
            background: accent,
            boxShadow: `0 0 16px ${accent}`,
          }}
        />
      )}
    </div>
  );
};

export const Prompt: React.FC<{
  line: string;
  accent?: string;
  prompt?: string;
  startAt?: number;
}> = ({ line, accent = CYBER.green, prompt = ">", startAt = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - startAt, fps, config: { damping: 14, stiffness: 120 } });
  return (
    <div
      style={{
        fontFamily: FONT.mono,
        color: accent,
        fontSize: 30,
        letterSpacing: "0.08em",
        whiteSpace: "pre-wrap",
        opacity: s,
        transform: `translateX(${(1 - s) * 30}px)`,
      }}
    >
      <span style={{ color: CYBER.muted }}>{prompt} </span>
      {line}
    </div>
  );
};
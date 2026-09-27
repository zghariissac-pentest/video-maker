import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from "remotion";
import { CYBER, FONT } from "../profx/Theme";
import { SPRINGS } from "./presets";

export const Typewriter: React.FC<{ text: string; startAt?: number; speed?: number; cursor?: boolean; color?: string; fontSize?: number }> = ({ text, startAt = 0, speed = 2.2, cursor = true, color = CYBER.white, fontSize = 42 }) => {
  const frame = useCurrentFrame();
  const shown = Math.max(0, Math.floor((frame - startAt) * speed));
  const visible = text.slice(0, shown);
  const done = shown >= text.length;
  const blinkOn = Math.floor(frame / 14) % 2 === 0;
  return (
    <div style={{ fontFamily: FONT.mono, fontSize, color, whiteSpace: "pre-wrap", lineHeight: 1.3 }}>
      {visible}
      {cursor && !done && <span style={{ background: blinkOn ? CYBER.cyan : "transparent", color: blinkOn ? CYBER.bg0 : color, padding: "0 2px", marginLeft: 2, boxShadow: blinkOn ? `0 0 8px ${CYBER.cyan}` : undefined }}>▌</span>}
    </div>
  );
};

export const SplitText: React.FC<{ text: string; startAt?: number; stagger?: number; fontSize?: number; color?: string }> = ({ text, startAt = 0, stagger = 3, fontSize = 64, color = CYBER.white }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chars = text.split("");
  return (
    <div style={{ display: "flex", gap: 2, fontFamily: FONT.mono, fontSize, color, fontWeight: 800 }}>
      {chars.map((ch, i) => {
        if (ch === " ") return <span key={i} style={{ width: "0.45em" }} />;
        const s = spring({ frame: frame - startAt - i * stagger, fps, config: SPRINGS.snappy });
        const ry = interpolate(s, [0, 1], [90, 0]);
        const op = interpolate(s, [0, 1], [0, 1]);
        return <span key={i} style={{ display: "inline-block", opacity: op, transform: `perspective(400px) rotateX(${ry}deg)`, transformOrigin: "bottom" }}>{ch}</span>;
      })}
    </div>
  );
};

export const AnimatedCounter: React.FC<{ value: number; startAt?: number; prefix?: string; suffix?: string; color?: string }> = ({ value, startAt = 0, prefix = "", suffix = "", color = CYBER.green }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - startAt, fps, config: SPRINGS.gentle });
  const n = Math.round(value * p);
  return <span style={{ fontFamily: FONT.mono, fontSize: 72, fontWeight: 800, color, textShadow: `0 0 20px ${color}66` }}>{prefix}{n.toLocaleString()}{suffix}</span>;
};

export const GradientTitle: React.FC<{ lines: string[]; startAt?: number; fontSize?: number; gradient?: string }> = ({ lines, startAt = 0, fontSize = 84, gradient = `linear-gradient(90deg, ${CYBER.cyan}, ${CYBER.magenta})` }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, textAlign: "center" }}>
      {lines.map((line, i) => {
        const s = spring({ frame: frame - startAt - i * 9, fps, config: SPRINGS.bouncy });
        const y = interpolate(s, [0, 1], [80, 0]);
        const op = interpolate(s, [0, 1], [0, 1]);
        const clip = interpolate(frame, [startAt + i * 9 + 6, startAt + i * 9 + 32], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
        return (
          <div key={i} style={{ overflow: "hidden" }}>
            <div style={{ opacity: op, transform: `translateY(${y}px)`, fontFamily: FONT.display, fontSize, fontWeight: 900, lineHeight: 1, background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: `drop-shadow(0 0 16px ${CYBER.cyan}44)`, clipPath: `inset(0 ${100 - clip}% 0 0)` }}>{line}</div>
          </div>
        );
      })}
    </div>
  );
};

export const PulseBadge: React.FC<{ label: string; accent?: string }> = ({ label, accent = CYBER.cyan }) => {
  const frame = useCurrentFrame();
  const scale = 1 + Math.sin(frame * 0.16) * 0.04;
  const glow = 0.6 + Math.sin(frame * 0.2) * 0.3;
  return <div style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.18em", textTransform: "uppercase", color: CYBER.white, background: accent, padding: "10px 22px", borderRadius: 999, transform: `scale(${scale})`, boxShadow: `0 0 ${18 * glow}px ${accent}88` }}>{label}</div>;
};

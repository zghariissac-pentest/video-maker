import React from "react";
import {
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CYBER, FONT } from "./Theme";

// ---------------------------------------------------------------------------
// Cyber typography kit: scramble decode, word-by-word reveal, mask wipe,
// neon gradient title. All pure Remotion, deterministic.
// ---------------------------------------------------------------------------

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@+=~";

export const Caret: React.FC<{ width?: string }> = ({ width = "1ch" }) => {
  const frame = useCurrentFrame();
  const on = Math.floor(frame / 18) % 2 === 0;
  return (
    <span
      style={{
        display: "inline-block",
        width,
        height: "1em",
        background: on ? CYBER.cyan : "transparent",
        marginLeft: 4,
        verticalAlign: "text-bottom",
        boxShadow: on ? "0 0 12px rgba(34,211,238,0.8)" : undefined,
      }}
    />
  );
};

// Glyph-by-glyph decode into the real text (classic "hacking in" effect).
export const ScrambleText: React.FC<{
  text: string;
  startAt?: number;
  charsPerFrame?: number;
  className?: string;
}> = ({ text, startAt = 0, charsPerFrame = 1.6, className }) => {
  const frame = useCurrentFrame();
  const rel = frame - startAt;
  const shown = Math.max(0, (rel * charsPerFrame) | 0);
  const out = text.split("").map((ch, i) => {
    if (i >= shown) return "";
    if (/[\s.,:'"\-()]/.test(ch)) return ch;
    if (rel - i / charsPerFrame > 14) return ch;
    return GLYPHS[Math.floor(random(startAt + i * 3) * GLYPHS.length)];
  });
  return (
    <div className={className} style={{ fontFamily: FONT.mono, whiteSpace: "pre-wrap" }}>
      {out.join("")}
      {shown < text.length && <Caret />}
    </div>
  );
};

// Words fly up + unblur, staggered — the premium explainer reveal.
export const WordReveal: React.FC<{
  text: string;
  startAt?: number;
  stagger?: number;
  align?: "left" | "center" | "right";
  fontSize?: number;
  color?: string;
  glow?: boolean;
  className?: string;
}> = ({
  text,
  startAt = 0,
  stagger = 7,
  align = "center",
  fontSize = 64,
  color = CYBER.white,
  glow = true,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div
      className={className}
      style={{
        fontFamily: FONT.mono,
        display: "flex",
        flexWrap: "wrap",
        justifyContent:
          align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
        columnGap: "0.22em",
        rowGap: "0.1em",
        fontSize,
        lineHeight: 1.15,
        textAlign: align,
        color,
        textShadow: glow ? "0 0 24px rgba(34,211,238,0.45)" : undefined,
      }}
    >
      {words.map((word, i) => {
        const s = spring({
          frame: frame - startAt - i * stagger,
          fps,
          config: { damping: 13, stiffness: 130 },
        });
        const ty = interpolate(s, [0, 1], [42, 0]);
        const blur = interpolate(s, [0, 1], [18, 0]);
        const op = interpolate(s, [0, 0.35], [0, 1]);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: op,
              transform: `translateY(${ty}px)`,
              filter: `blur(${blur}px)`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

// A wipe mask reveals the text as a solid pane slides across — clean + arty.
export const MaskWipe: React.FC<{
  text: string;
  startAt?: number;
  duration?: number;
  color?: string;
  fontSize?: number;
  className?: string;
}> = ({ text, startAt = 0, duration = 30, color = CYBER.cyan, fontSize = 58, className }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [startAt, startAt + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
  });
  const inset = `${(1 - p) * 100}% 0 0 0`;
  return (
    <div
      className={className}
      style={{
        fontFamily: FONT.mono,
        position: "relative",
        fontSize,
        fontWeight: 700,
        color,
        letterSpacing: "0.04em",
        clipPath: `inset(${inset})`,
        textShadow: `0 0 22px ${color}66`,
        whiteSpace: "pre-wrap",
      }}
    >
      {text}
    </div>
  );
};

// Big hero title: layered neon glow + a travelling shine sweep.
export const NeonTitle: React.FC<{
  lines: string[];
  startAt?: number;
  lineGap?: number;
  colors?: string[];
  fontSize?: number;
  className?: string;
}> = ({ lines, startAt = 0, lineGap = 0.05, colors, fontSize = 96, className }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      className={className}
      style={{
        fontFamily: FONT.mono,
        fontSize,
        lineHeight: 1.02,
        fontWeight: 800,
        letterSpacing: "0.02em",
        textAlign: "center",
      }}
    >
      {lines.map((line, i) => {
        const s = spring({
          frame: frame - startAt - i * 10,
          fps,
          config: { damping: 11, stiffness: 150 },
        });
        const ty = interpolate(s, [0, 1], [120, 0]);
        const op = interpolate(s, [0, 0.6], [0, 1]);
        const col = colors?.[i % colors.length] ?? (i % 2 === 0 ? CYBER.white : CYBER.cyan);
        const shine = interpolate(frame, [startAt + i * 10 + 12, startAt + i * 10 + 40], [-0.8, 1.6], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div key={i} style={{ position: "relative", overflow: "hidden", marginBottom: lineGap }}>
            <div style={{ opacity: op, transform: `translateY(${ty}px)`, color: col }}>
              <span
                style={{
                  textShadow: `0 0 6px ${col}, 0 0 28px ${col}55, 0 0 60px ${col}33`,
                }}
              >
                {line}
              </span>
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: "18%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)",
                  transform: `translateX(${shine * 100}%)`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Small uppercase section label with rule lines — editorial + techy.
export const Kicker: React.FC<{
  label: string;
  color?: string;
  className?: string;
}> = ({ label, color = CYBER.magenta, className }) => (
  <div
    className={className}
    style={{
      fontFamily: FONT.mono,
      display: "flex",
      alignItems: "center",
      gap: 14,
      fontSize: 22,
      letterSpacing: "0.42em",
      textTransform: "uppercase",
      color,
      textShadow: `0 0 16px ${color}77`,
    }}
  >
    <span style={{ width: 46, height: 1, background: color, opacity: 0.7 }} />
    {label}
    <span style={{ width: 46, height: 1, background: color, opacity: 0.7 }} />
  </div>
);

// Fullscreen "type-on-terminal" block used for quotes / key calls-to-action.
export const TerminalQuote: React.FC<{
  lines: string[];
  startAt?: number;
  prompt?: string;
  className?: string;
}> = ({ lines, startAt = 0, prompt = "root@prosecute:#", className }) => {
  const frame = useCurrentFrame();
  return (
    <div
      className={className}
      style={{
        fontFamily: FONT.mono,
        fontSize: 30,
        color: CYBER.green,
        textAlign: "left",
        background: "rgba(2,8,14,0.85)",
        border: `1px solid rgba(34,197,94,0.4)`,
        borderRadius: 14,
        padding: "30px 36px",
        boxShadow: "0 0 40px rgba(34,197,94,0.18) inset, 0 8px 40px rgba(0,0,0,0.5)",
      }}
    >
      {lines.map((line, i) => {
        const at = startAt + i * (line.length / 2 + 8);
        const shown = Math.max(0, Math.floor((frame - at) * 1.8));
        return (
          <div key={i} style={{ marginBottom: 10, whiteSpace: "pre-wrap" }}>
            <span style={{ color: CYBER.amber, marginRight: 12 }}>{prompt}</span>
            {line.slice(0, shown)}
            {shown < line.length && <Caret width="1.4ch" />}
          </div>
        );
      })}
    </div>
  );
};

// Composition-ready scrolling log (decoration layer, placed absolutely).
export const LogStream: React.FC<{
  lines: string[];
  startAt?: number;
  interval?: number;
  className?: string;
}> = ({ lines, startAt = 0, interval = 8, className }) => {
  const frame = useCurrentFrame();
  const active = Math.max(0, Math.floor((frame - startAt) / interval));
  return (
    <div
      className={className}
      style={{
        fontFamily: FONT.mono,
        fontSize: 18,
        color: CYBER.muted,
        lineHeight: 1.9,
        overflow: "hidden",
        textShadow: "0 0 10px rgba(34,197,94,0.3)",
      }}
    >
      {lines.slice(0, active).map((l, i) => (
        <div key={i} style={{ opacity: Math.min(1, (active - i) / 8) }}>
          <span style={{ color: CYBER.green }}>[{String(i + 1).padStart(3, "0")}]</span> {l}
        </div>
      ))}
    </div>
  );
};

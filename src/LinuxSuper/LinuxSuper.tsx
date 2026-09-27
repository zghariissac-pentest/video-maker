import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { SceneCustom } from "./scenes/SceneCustom";
import { ScenePerformance } from "./scenes/ScenePerformance";
import { ScenePrivacy } from "./scenes/ScenePrivacy";
import { SceneCommunity } from "./scenes/SceneCommunity";

// "WHY?" — clean, minimal, matching black + Tux superhuman vibe. No glass box.
const WhyBadge: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // overall badge appear
  const appear = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 140 } });
  const y = interpolate(appear, [0, 1], [16, 0]);
  const blur = interpolate(appear, [0, 1], [10, 0]);

  // letters stagger — W H Y ? appear one by one
  const letters = ["W", "H", "Y", "?"];
  const line = interpolate(spring({ frame: frame - delay - 18, fps, config: { damping: 18, stiffness: 120 } }), [0, 1], [0, 1]);

  // subtle post-settle float (very gentle, not drift)
  const floatY = Math.sin((frame - delay) * 0.06) * 1.0;

  return (
    <div
      style={{
        opacity: appear,
        transform: `translateY(${y + floatY}px)`,
        filter: blur > 0.4 ? `blur(${blur}px)` : `drop-shadow(0 10px 28px rgba(0,0,0,0.75))`,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 6,
      }}
    >
      {/* connector — thin, minimal */}
      <div style={{ position: "absolute", left: -22, top: 34, display: "flex", alignItems: "center", opacity: appear }}>
        <div style={{ width: 16, height: 1, background: "rgba(34,211,238,0.95)", boxShadow: "0 0 6px rgba(34,211,238,0.7)" }} />
        <div style={{ width: 7, height: 7, borderRadius: 999, background: "#22D3EE", marginLeft: -1, boxShadow: "0 0 10px rgba(34,211,238,1)" }} />
      </div>

      {/* WHY? — letters stagger pop */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 0, transform: "rotate(-1.2deg)", transformOrigin: "left center" }}>
        {letters.map((ch, i) => {
          const s = spring({ frame: frame - delay - i * 4, fps, config: { damping: 12, stiffness: 180, mass: 0.7 } });
          const sc = interpolate(s, [0, 1], [0.4, 1]);
          const ty = interpolate(s, [0, 1], [18, 0]);
          const isQ = ch === "?";
          return (
            <span
              key={i}
              style={{
                fontFamily: "Changa, monospace",
                fontWeight: 900,
                fontSize: isQ ? 78 : 62,
                lineHeight: 1,
                letterSpacing: isQ ? "0" : "0.06em",
                color: isQ ? "#22D3EE" : "#FFFFFF",
                display: "inline-block",
                opacity: s,
                transform: `translateY(${ty}px) scale(${sc})`,
                textShadow: isQ ? "0 0 16px rgba(34,211,238,0.9), 0 0 36px rgba(34,211,238,0.35)" : "0 2px 12px rgba(0,0,0,0.6), 0 0 10px rgba(255,255,255,0.12)",
                marginLeft: isQ ? 2 : 0,
                transformOrigin: "bottom center",
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>

      {/* clean underline — draws */}
      <div
        style={{
          width: 96,
          height: 2,
          background: "#22D3EE",
          borderRadius: 999,
          transform: `scaleX(${line})`,
          transformOrigin: "left",
          boxShadow: "0 0 8px rgba(34,211,238,0.7)",
          opacity: line,
          marginTop: -2,
          marginLeft: 2,
        }}
      />
      {/* small clean label — no uppercase shout */}
      <span
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 10,
          letterSpacing: "0.18em",
          color: `rgba(255,255,255,${0.52 * line})`,
          marginLeft: 2,
          opacity: line,
        }}
      >
        why linux ?
      </span>
    </div>
  );
};

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 18, stiffness: 90, mass: 0.9 } });
  const opacity = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(s, [0, 1], [0.86, 1]);
  const blur = interpolate(frame, [0, 22], [18, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(s, [0, 1], [28, 0]);
  const text = "الانسان الاعلى يخدم بلينيكس";
  const startAt = 34;
  const shown = Math.max(0, Math.min(text.length, Math.floor((frame - startAt) * 0.9)));
  const caretOn = Math.floor(frame / 16) % 2 === 0;
  const textOpacity = interpolate(frame, [startAt - 4, startAt + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#000000", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column", gap: 0 }}>
      <div style={{ opacity, transform: `translateY(${y}px) scale(${scale})`, filter: blur > 0.2 ? `blur(${blur}px)` : undefined, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
        <Img src={staticFile("best-linux-mustache.png")} style={{ width: 620, height: 620, objectFit: "contain", filter: "drop-shadow(0 0 24px rgba(255,255,255,0.08))" }} />
        <div style={{ position: "absolute", left: "68%", top: "14%", pointerEvents: "none" }}>
          <WhyBadge delay={64} />
        </div>
      </div>
      <div style={{ marginTop: 18, minHeight: 84, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity: textOpacity }}>
        <div style={{ fontFamily: "Cairo, Changa, monospace", fontSize: 42, fontWeight: 700, color: "#EAF7FF", letterSpacing: "0.02em", textAlign: "center", direction: "rtl", lineHeight: 1.3, textShadow: "0 0 16px rgba(34,211,238,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span>{text.slice(0, shown)}</span>
          {shown < text.length && <span style={{ display: "inline-block", width: "3px", height: "1.05em", background: caretOn ? "#22D3EE" : "transparent", marginRight: 6, marginLeft: 2, boxShadow: caretOn ? "0 0 8px rgba(34,211,238,0.9)" : undefined }} />}
        </div>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "rgba(255,255,255,0.38)", letterSpacing: "0.18em", textTransform: "uppercase", opacity: interpolate(frame, [startAt + text.length * 1.1 + 10, startAt + text.length * 1.1 + 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <span style={{ color: "#22D3EE" }}>{">"}</span> superhuman · linux
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const LinuxSuper: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000000" }}>
      {/* Hook: 0-120 */}
      <Sequence from={0} durationInFrames={120}>
        <Hook />
      </Sequence>
      {/* Scene 1: تخصيص لا محدود — 112-332 */}
      <Sequence from={112} durationInFrames={220}>
        <SceneCustom />
      </Sequence>
      {/* Scene 2: اداء افضل على الاجهزة القديمة — 332-452 (120f) */}
      <Sequence from={332} durationInFrames={120}>
        <ScenePerformance />
      </Sequence>
      {/* Scene 3: مجتمع ضخم يدعمك مجانا — 452-600 (148f) — swapped */}
      <Sequence from={452} durationInFrames={148}>
        <SceneCommunity />
      </Sequence>
      {/* Scene 4: خصوصية اعلى مقارنة ب windows — 600-740 (140f) — swapped */}
      <Sequence from={600} durationInFrames={140}>
        <ScenePrivacy />
      </Sequence>
    </AbsoluteFill>
  );
};

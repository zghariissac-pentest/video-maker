import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CYBER, FONT } from "../../profx/Theme";

export const SceneCommunity: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tS = spring({ frame, fps, config: { damping: 16, stiffness: 140 } });
  const tY = interpolate(tS, [0, 1], [18, 0]);

  // penguin phone — quick pop, no drift
  const pDelay = 14;
  const pS = spring({ frame: frame - pDelay, fps, config: { damping: 15, stiffness: 160, mass: 0.85 } });
  const pScale = interpolate(pS, [0, 1], [0.78, 1]);
  const pY = interpolate(pS, [0, 1], [22, 0]);
  const pOpacity = pS;

  return (
    <AbsoluteFill style={{ background: "#000000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 24px", gap: 0 }}>
      {/* big clean title */}
      <div style={{ opacity: tS, transform: `translateY(${tY}px)`, textAlign: "center" }}>
        <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 56, fontWeight: 900, color: CYBER.white, direction: "rtl", lineHeight: 1, textShadow: "0 0 22px rgba(34,211,238,0.18)" }}>
          مجتمع ضخم يدعمك <span style={{ color: CYBER.cyan }}>مجانا</span>
        </div>
        <div style={{ width: 72, height: 2, background: CYBER.cyan, borderRadius: 999, margin: "10px auto 0", boxShadow: "0 0 10px rgba(34,211,238,0.6)", opacity: tS }} />
        <div
          style={{
            fontFamily: "Cairo, Changa, sans-serif",
            fontSize: 20,
            color: "rgba(255,255,255,0.72)",
            direction: "rtl",
            marginTop: 10,
            lineHeight: 1.5,
            fontWeight: 700,
            opacity: interpolate(frame, [10, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          اي بروبلام يواجهك تلقى شخص حلو من قبل
        </div>
        <div style={{ fontFamily: FONT.mono, fontSize: 10, color: "rgba(255,255,255,0.32)", letterSpacing: "0.16em", marginTop: 6, opacity: interpolate(frame, [16, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          ASK · SOMEONE ALREADY SOLVED IT · FOR FREE
        </div>
      </div>

      {/* penguin phone — deleted bg, centered big, clean */}
      <div
        style={{
          marginTop: 22,
          opacity: pOpacity,
          transform: `translateY(${pY}px) scale(${pScale})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          filter: `drop-shadow(0 22px 40px rgba(0,0,0,0.65)) drop-shadow(0 0 18px rgba(34,211,238,0.12))`,
        }}
      >
        <Img src={staticFile("linux-penguin-phone.png")} style={{ width: 420, height: 556, objectFit: "contain" }} />
      </div>

      {/* clean bottom hint — minimal */}
      <div
        style={{
          marginTop: 16,
          display: "flex",
          gap: 8,
          opacity: interpolate(frame, [30, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(frame, [30, 46], [8, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
        }}
      >
        {[
          { n: "reddit", c: CYBER.cyan },
          { n: "discord", c: "#5865F2" },
          { n: "github", c: "#FFFFFF" },
        ].map((p) => (
          <span key={p.n} style={{ fontFamily: FONT.mono, fontSize: 10, color: p.c, background: `${p.c}12`, border: `1px solid ${p.c}28`, padding: "6px 12px", borderRadius: 999, letterSpacing: "0.1em" }}>
            {p.n}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

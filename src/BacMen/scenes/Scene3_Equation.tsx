import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, Easing, useVideoConfig } from "remotion";
import { BM, BacMenBg } from "../components/Theme";
import { ShieldCheck, GraduationCap } from "phosphor-react";

export const Scene3Equation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mk = (s: number, e: number) => {
    const inn = interpolate(frame, [s, s + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
    const out = interpolate(frame, [e - 12, e], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
    return inn * out;
  };

  const l1 = mk(8, 72);
  const l2 = mk(76, 142);
  const l3 = mk(146, 210);

  const strike = interpolate(frame, [152, 174], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const pop = (d: number) => spring({ frame: frame - d, fps, config: { damping: 14, stiffness: 150 } });

  return (
    <AbsoluteFill style={{ background: BM.bg }}>
      <BacMenBg />

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 36px", gap: 28 }}>
        {/* BIG visual — equation */}
        <div style={{ position: "relative", width: 720, height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* SKILLS badge */}
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, opacity: l2 }}>
            <div style={{ width: 140, height: 140, borderRadius: 28, background: "rgba(34,211,238,0.12)", border: "2px solid rgba(34,211,238,0.26)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${interpolate(pop(80), [0, 1], [0.86, 1])})`, boxShadow: "0 0 36px rgba(34,211,238,0.22)" }}>
              <ShieldCheck size={64} weight="duotone" color={BM.accent2} />
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, letterSpacing: "0.18em", fontWeight: 800, color: BM.accent2, background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.22)", padding: "6px 12px", borderRadius: 999 }}>SKILLS = CODE • LINUX • PWN</div>
          </div>

          {/* NOT DIPLOMA — crossed */}
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, opacity: l3 }}>
            <div style={{ position: "relative", width: 140, height: 140, borderRadius: 28, background: "rgba(239,68,68,0.09)", border: "2px solid rgba(239,68,68,0.24)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${interpolate(pop(150), [0, 1], [0.86, 1])})` }}>
              <GraduationCap size={64} weight="duotone" color={BM.accent} />
              <div style={{ position: "absolute", left: 18, right: 18, top: "50%", height: 4, background: BM.accent, borderRadius: 999, transform: `scaleX(${strike})`, transformOrigin: "center" }} />
            </div>
          </div>
        </div>

        {/* TEXT — huge, fixed, 3 lines */}
        <div style={{ position: "relative", width: "100%", height: 220, overflow: "visible", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: l1, transform: `scale(${interpolate(pop(10), [0, 1], [0.92, 1])})` }}>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 62, fontWeight: 900, letterSpacing: "-0.03em", color: BM.ink }}>CYBERSECURITY</span>
          </div>

          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, opacity: l2, transform: `scale(${interpolate(pop(78), [0, 1], [0.92, 1])})` }}>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 62, fontWeight: 900, color: BM.ink }}>=</span>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 62, fontWeight: 900, color: BM.accent2, textShadow: "0 0 28px rgba(34,211,238,0.35)" }}>SKILLS</span>
          </div>

          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, opacity: l3, transform: `scale(${interpolate(pop(148), [0, 1], [0.92, 1])})` }}>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 42, fontWeight: 800, color: BM.muted }}>NOT</span>
            <span style={{ position: "relative", fontFamily: "JetBrains Mono, monospace", fontSize: 56, fontWeight: 900, color: "#475569", padding: "0 6px" }}>
              DIPLOMA
              <span style={{ position: "absolute", left: -6, right: -6, top: "54%", height: 5, background: BM.accent, borderRadius: 999, transform: `scaleX(${strike})`, transformOrigin: "center" }} />
            </span>
          </div>
        </div>

        {/* equation bar */}
        <div style={{ width: 520, height: 2, background: BM.line, borderRadius: 999, opacity: 0.6 }} />
      </div>
    </AbsoluteFill>
  );
};

export const SCENE3_DURATION = 220;

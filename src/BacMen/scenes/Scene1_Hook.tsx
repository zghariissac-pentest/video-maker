import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { BM, BacMenBg } from "../components/Theme";
import { GraduationCap, ShieldCheck } from "phosphor-react";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();

  // 3 words -> disappear -> next 3 words, fixed center, smooth fade only (no movement)
  const g1In = interpolate(frame, [6, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const g1Out = interpolate(frame, [68, 82], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const g1Opacity = g1In * g1Out;

  const g2In = interpolate(frame, [84, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const g2Out = interpolate(frame, [168, 180], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const g2Opacity = g2In * g2Out;

  const strike = interpolate(frame, [16, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // icon crossfade (fixed position, no movement)
  const icon1Opacity = g1Opacity;
  const icon2Opacity = g2Opacity;

  return (
    <AbsoluteFill style={{ background: BM.bg }}>
      <BacMenBg />

      {/* fixed center container — text & icons do not move, only fade */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 40px" }}>
        {/* ICONS — fixed, centered, big, clean, only opacity changes */}
        <div style={{ position: "relative", width: 140, height: 140, marginBottom: 36 }}>
          {/* icon 1 — bac */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: icon1Opacity }}>
            <div style={{ width: 140, height: 140, borderRadius: 32, background: "rgba(239,68,68,0.09)", border: "1.5px solid rgba(239,68,68,0.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap size={66} weight="duotone" color={BM.accent} />
            </div>
            {/* red X corner */}
            <div style={{ position: "absolute", bottom: -6, right: -6, width: 34, height: 34, borderRadius: "50%", background: BM.accent, border: "3px solid #060A14", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: 18, fontWeight: 900, lineHeight: 1 }}>×</span>
            </div>
          </div>
          {/* icon 2 — cyber */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: icon2Opacity }}>
            <div style={{ width: 140, height: 140, borderRadius: 32, background: "rgba(34,211,238,0.10)", border: "1.5px solid rgba(34,211,238,0.24)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 28px rgba(34,211,238,0.16)" }}>
              <ShieldCheck size={66} weight="duotone" color={BM.accent2} />
            </div>
            <div style={{ position: "absolute", bottom: -6, right: -6, width: 34, height: 34, borderRadius: "50%", background: BM.accent3, border: "3px solid #060A14", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: 16, fontWeight: 900 }}>✓</span>
            </div>
          </div>
        </div>

        {/* TEXT GROUPS — fixed position, stacked, only opacity */}
        <div style={{ position: "relative", width: "100%", height: 260, display: "flex", alignItems: "center", justifyContent: "center", overflow: "visible" }}>
          {/* Group 1: متحتاجش شهادة البكالوريا */}
          <div className="dir-rtl" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, opacity: g1Opacity }}>
            <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 78, fontWeight: 800, color: BM.ink, lineHeight: 1 }}>متحتاجش</span>
            <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 78, fontWeight: 800, color: BM.ink, lineHeight: 1 }}>شهادة</span>
            <span style={{ position: "relative", fontFamily: "Cairo, sans-serif", fontSize: 78, fontWeight: 900, color: "#475569", lineHeight: 1, padding: "0 4px" }}>
              البكالوريا
              <span style={{ position: "absolute", left: -6, right: -6, top: "54%", height: 6, background: BM.accent, borderRadius: 999, transform: `scaleX(${strike})`, transformOrigin: "right center" }} />
            </span>
          </div>

          {/* Group 2: باش تتعلم الامن — then السيبراني on next line but same group for timing */}
          <div className="dir-rtl" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, opacity: g2Opacity }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 78, fontWeight: 800, color: BM.ink, lineHeight: 1.15 }}>باش</span>
              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 78, fontWeight: 800, color: BM.ink, lineHeight: 1.15 }}>تتعلم</span>
              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 78, fontWeight: 800, color: BM.ink, lineHeight: 1.15 }}>الامن</span>
            </div>
            <div
              style={{
                fontFamily: "Cairo, sans-serif",
                fontSize: 84,
                fontWeight: 900,
                lineHeight: 1.25,
                paddingBottom: 8,
                color: BM.accent2,
                textShadow: "0 0 24px rgba(34,211,238,0.35)",
              }}
            >
              السيبراني
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const SCENE1_DURATION = 180;

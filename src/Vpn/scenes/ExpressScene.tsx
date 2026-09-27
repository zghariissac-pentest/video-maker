import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CYBER, FONT } from "../../profx/Theme";

export const ExpressScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoS = spring({ frame, fps, config: { damping: 16, stiffness: 140 } });
  const logoY = interpolate(logoS, [0, 1], [20, 0]);
  const t1 = spring({ frame: frame - 18, fps, config: { damping: 18, stiffness: 90 } });
  const t2 = spring({ frame: frame - 34, fps, config: { damping: 18, stiffness: 90 } });

  return (
    <AbsoluteFill style={{ background: "#000000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 24px", gap: 0 }}>
      <div style={{ width: 280, height: 280, borderRadius: 36, background: "rgba(255,255,255,1)", border: "1px solid rgba(255,255,255,0.16)", boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 24px rgba(229,57,53,0.15)", display: "flex", alignItems: "center", justifyContent: "center", padding: 22, opacity: logoS, transform: `translateY(${logoY}px) scale(${interpolate(logoS, [0, 1], [0.86, 1])})` }}>
        <Img src={staticFile("vpn/express.png")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.18em", color: "#e53935", marginTop: 12, opacity: logoS, fontWeight: 800 }}>EXPRESS VPN</div>

      <div style={{ marginTop: 22, opacity: t1, transform: `translateY(${interpolate(t1, [0, 1], [16, 0])}px) scale(${interpolate(t1, [0, 1], [0.96, 1])})`, fontFamily: "Cairo, Changa, sans-serif", fontSize: 48, fontWeight: 900, color: CYBER.white, direction: "rtl", textAlign: "center", lineHeight: 1, textShadow: "0 0 22px rgba(255,255,255,0.12)" }}>
        سيرفرات <span style={{ color: "#e53935" }}>قليلة بزاف</span>
        <div style={{ width: 64, height: 2, background: "#e53935", borderRadius: 999, margin: "8px auto 0", boxShadow: "0 0 10px #e53935", opacity: t1 }} />
      </div>

      <div style={{ marginTop: 14, opacity: t2, transform: `translateY(${interpolate(t2, [0, 1], [14, 0])}px)`, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "14px 22px", borderRadius: 16, maxWidth: 860 }}>
        <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 22, fontWeight: 700, color: "rgba(255,255,255,0.78)", direction: "rtl", textAlign: "center", lineHeight: 1.6 }}>
          مقارنة بزوج لوالا <span style={{ color: CYBER.white, fontWeight: 900 }}>— تغطية أقل، اختيارات أقل</span>
        </div>
        <div style={{ fontFamily: FONT.mono, fontSize: 10, color: "rgba(255,255,255,0.32)", letterSpacing: "0.12em", textAlign: "center", marginTop: 6 }}>FEWER SERVERS • LESS FLEXIBILITY</div>
      </div>
    </AbsoluteFill>
  );
};

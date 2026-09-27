import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CYBER, FONT } from "../../profx/Theme";

export const ProtonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoS = spring({ frame, fps, config: { damping: 16, stiffness: 140 } });
  const logoY = interpolate(logoS, [0, 1], [20, 0]);
  const t1 = spring({ frame: frame - 18, fps, config: { damping: 18, stiffness: 90 } });
  const t2 = spring({ frame: frame - 36, fps, config: { damping: 18, stiffness: 90 } });
  const t3 = spring({ frame: frame - 54, fps, config: { damping: 18, stiffness: 90 } });

  return (
    <AbsoluteFill style={{ background: "#000000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 24px", gap: 0 }}>
      <div style={{ width: 280, height: 280, borderRadius: 36, background: "rgba(255,255,255,1)", border: "1px solid rgba(255,255,255,0.16)", boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 24px rgba(124,92,253,0.15)", display: "flex", alignItems: "center", justifyContent: "center", padding: 22, opacity: logoS, transform: `translateY(${logoY}px) scale(${interpolate(logoS, [0, 1], [0.86, 1])})` }}>
        <Img src={staticFile("vpn/proton.png")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.18em", color: "#7c5cfb", marginTop: 12, opacity: logoS, fontWeight: 800 }}>PROTON VPN • SWITZERLAND</div>

      <div style={{ marginTop: 22, opacity: t1, transform: `translateY(${interpolate(t1, [0, 1], [16, 0])}px) scale(${interpolate(t1, [0, 1], [0.96, 1])})`, fontFamily: "Cairo, Changa, sans-serif", fontSize: 58, fontWeight: 900, color: CYBER.white, direction: "rtl", textAlign: "center", lineHeight: 1, textShadow: "0 0 22px rgba(255,255,255,0.16)" }}>
        الافضل <span style={{ color: "#7c5cfb" }}>للخصوصية</span>
        <div style={{ width: 64, height: 2, background: "#7c5cfb", borderRadius: 999, margin: "8px auto 0", boxShadow: "0 0 10px #7c5cfb", opacity: t1 }} />
      </div>

      <div style={{ marginTop: 14, opacity: t2, transform: `translateY(${interpolate(t2, [0, 1], [14, 0])}px)`, background: "rgba(124,92,253,0.10)", border: "1px solid rgba(124,92,253,0.22)", padding: "14px 22px", borderRadius: 16, maxWidth: 900 }}>
        <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 20, fontWeight: 800, color: CYBER.white, direction: "rtl", textAlign: "center", lineHeight: 1.6 }}>
          سياسة <span style={{ color: "#7c5cfb", background: "rgba(124,92,253,0.14)", padding: "2px 10px", borderRadius: 999, fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.04em" }}>no logs</span> وبانت في المحاكم مشي هدرة برك
        </div>
        <div style={{ fontFamily: FONT.mono, fontSize: 10, color: "rgba(255,255,255,0.38)", letterSpacing: "0.10em", textAlign: "center", marginTop: 6 }}>AUDITED • COURT-PROVEN • SWISS PRIVACY LAWS</div>
      </div>

      <div style={{ marginTop: 14, opacity: t3, transform: `translateY(${interpolate(t3, [0, 1], [12, 0])}px)`, display: "flex", alignItems: "center", gap: 8, background: "rgba(124,92,253,0.14)", border: "1px solid rgba(124,92,253,0.28)", padding: "10px 18px", borderRadius: 999 }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "#7c5cfb", boxShadow: "0 0 8px #7c5cfb" }} />
        <span style={{ fontFamily: FONT.mono, fontSize: 11, color: "rgba(255,255,255,0.72)", letterSpacing: "0.08em" }}>TRUSTED • VERIFIED</span>
      </div>
    </AbsoluteFill>
  );
};

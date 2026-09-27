import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CYBER, FONT } from "../../profx/Theme";

export const SurfSharkScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoS = spring({ frame, fps, config: { damping: 16, stiffness: 140 } });
  const logoY = interpolate(logoS, [0, 1], [20, 0]);
  const t1 = spring({ frame: frame - 18, fps, config: { damping: 18, stiffness: 90 } });
  const t2 = spring({ frame: frame - 36, fps, config: { damping: 18, stiffness: 90 } });
  const t3 = spring({ frame: frame - 52, fps, config: { damping: 18, stiffness: 90 } });

  return (
    <AbsoluteFill style={{ background: "#000000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 24px", gap: 0 }}>
      <div style={{ width: 280, height: 280, borderRadius: 36, background: "rgba(255,255,255,1)", border: "1px solid rgba(255,255,255,0.16)", boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 24px rgba(16,205,165,0.15)", display: "flex", alignItems: "center", justifyContent: "center", padding: 22, opacity: logoS, transform: `translateY(${logoY}px) scale(${interpolate(logoS, [0, 1], [0.86, 1])})` }}>
        <Img src={staticFile("vpn/surfshark.png")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.18em", color: "#10cda5", marginTop: 12, opacity: logoS, fontWeight: 800 }}>SURFSHARK</div>

      <div style={{ marginTop: 18, opacity: t1, transform: `translateY(${interpolate(t1, [0, 1], [16, 0])}px) scale(${interpolate(t1, [0, 1], [0.96, 1])})`, fontFamily: "Cairo, Changa, sans-serif", fontSize: 42, fontWeight: 900, color: CYBER.white, direction: "rtl", textAlign: "center", lineHeight: 1.1, textShadow: "0 0 18px rgba(255,255,255,0.12)" }}>
        <span style={{ color: "#10cda5" }}>ارخص</span> واحد فيهم
        <div style={{ width: 56, height: 2, background: "#10cda5", borderRadius: 999, margin: "8px auto 0", boxShadow: "0 0 10px #10cda5", opacity: t1 }} />
      </div>

      <div style={{ marginTop: 14, opacity: t2, transform: `translateY(${interpolate(t2, [0, 1], [14, 0])}px)`, background: "rgba(16,205,165,0.10)", border: "1px solid rgba(16,205,165,0.22)", padding: "14px 22px", borderRadius: 16, maxWidth: 860 }}>
        <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 22, fontWeight: 800, color: CYBER.white, direction: "rtl", textAlign: "center", lineHeight: 1.6 }}>
          وفيه <span style={{ color: "#10cda5", background: "rgba(16,205,165,0.14)", padding: "2px 10px", borderRadius: 999 }}>عدد غير محدود</span> للاجهزة
        </div>
        <div style={{ fontFamily: FONT.mono, fontSize: 10, color: "rgba(255,255,255,0.32)", letterSpacing: "0.12em", textAlign: "center", marginTop: 6 }}>UNLIMITED DEVICES • ONE SUBSCRIPTION</div>
      </div>

      <div style={{ marginTop: 14, opacity: t3, transform: `translateY(${interpolate(t3, [0, 1], [12, 0])}px)`, display: "flex", gap: 8, alignItems: "center", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", padding: "10px 18px", borderRadius: 999 }}>
        <span style={{ fontSize: 16 }}>🌍</span>
        <span style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 18, fontWeight: 800, color: CYBER.white, direction: "rtl" }}>باختصار عالمي جميل رائع</span>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: "#10cda5", boxShadow: "0 0 8px #10cda5" }} />
      </div>
    </AbsoluteFill>
  );
};

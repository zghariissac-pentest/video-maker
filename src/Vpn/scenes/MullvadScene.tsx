import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CYBER, FONT } from "../../profx/Theme";

export const MullvadScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoS = spring({ frame, fps, config: { damping: 16, stiffness: 140 } });
  const logoY = interpolate(logoS, [0, 1], [20, 0]);
  const t1 = spring({ frame: frame - 18, fps, config: { damping: 18, stiffness: 90 } });
  const t2 = spring({ frame: frame - 36, fps, config: { damping: 18, stiffness: 90 } });
  const t3 = spring({ frame: frame - 54, fps, config: { damping: 18, stiffness: 90 } });

  return (
    <AbsoluteFill style={{ background: "#000000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 24px", gap: 0 }}>
      <div style={{ width: 280, height: 280, borderRadius: 36, background: "#0a1f3a", border: "1px solid rgba(255,204,0,0.22)", boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 24px rgba(255,204,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center", padding: 18, opacity: logoS, transform: `translateY(${logoY}px) scale(${interpolate(logoS, [0, 1], [0.86, 1])})` }}>
        <Img src={staticFile("vpn/mullvad.png")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.18em", color: "#ffcc00", marginTop: 12, opacity: logoS, fontWeight: 800 }}>MULLVAD VPN • SWEDEN</div>

      <div style={{ marginTop: 22, opacity: t1, transform: `translateY(${interpolate(t1, [0, 1], [16, 0])}px) scale(${interpolate(t1, [0, 1], [0.96, 1])})`, fontFamily: "Cairo, Changa, sans-serif", fontSize: 48, fontWeight: 900, color: CYBER.white, direction: "rtl", textAlign: "center", lineHeight: 1, letterSpacing: "-0.01em" }}>
        مولفاد
        <div style={{ fontSize: 30, fontWeight: 800, color: "#ffcc00", marginTop: 6, textShadow: "0 0 16px rgba(255,204,0,0.35)" }}>اعلى مستوى خصوصية</div>
        <div style={{ width: 64, height: 2, background: "#ffcc00", borderRadius: 999, margin: "8px auto 0", boxShadow: "0 0 10px #ffcc00", opacity: t1 }} />
      </div>

      <div style={{ marginTop: 16, opacity: t2, transform: `translateY(${interpolate(t2, [0, 1], [14, 0])}px)`, background: "rgba(255,204,0,0.10)", border: "1px solid rgba(255,204,0,0.22)", padding: "16px 22px", borderRadius: 16, maxWidth: 860 }}>
        <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 22, fontWeight: 800, color: CYBER.white, direction: "rtl", textAlign: "center", lineHeight: 1.6 }}>
          ميطلبش <span style={{ color: "#ffcc00", background: "rgba(255,204,0,0.14)", padding: "2px 10px", borderRadius: 999 }}>ايميل ولا اي معلومة شخصية</span>
        </div>
        <div style={{ fontFamily: FONT.mono, fontSize: 10, color: "rgba(255,255,255,0.38)", letterSpacing: "0.12em", textAlign: "center", marginTop: 6 }}>NO EMAIL • NO PERSONAL INFO • ACCOUNT NUMBER ONLY</div>
      </div>

      <div style={{ marginTop: 14, opacity: t3, transform: `translateY(${interpolate(t3, [0, 1], [12, 0])}px)`, display: "flex", gap: 8, alignItems: "center", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", padding: "10px 18px", borderRadius: 999 }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "#ffcc00", boxShadow: "0 0 8px #ffcc00" }} />
        <span style={{ fontFamily: FONT.mono, fontSize: 11, color: "rgba(255,255,255,0.72)", letterSpacing: "0.08em" }}>MAX ANONYMITY</span>
      </div>
    </AbsoluteFill>
  );
};

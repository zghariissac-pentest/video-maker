import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CYBER, FONT } from "../../profx/Theme";

export const NordScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoS = spring({ frame, fps, config: { damping: 16, stiffness: 140 } });
  const logoY = interpolate(logoS, [0, 1], [20, 0]);

  const t1 = spring({ frame: frame - 18, fps, config: { damping: 18, stiffness: 90 } });
  const t2 = spring({ frame: frame - 36, fps, config: { damping: 18, stiffness: 90 } });
  const t3 = spring({ frame: frame - 54, fps, config: { damping: 18, stiffness: 90 } });

  return (
    <AbsoluteFill style={{ background: "#000000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 24px", gap: 0 }}>
      {/* logo in middle */}
      <div
        style={{
          width: 280,
          height: 280,
          borderRadius: 36,
          background: "rgba(255,255,255,1)",
          border: "1px solid rgba(255,255,255,0.16)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 24px rgba(255,255,255,0.10)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 22,
          opacity: logoS,
          transform: `translateY(${logoY}px) scale(${interpolate(logoS, [0, 1], [0.86, 1])})`,
        }}
      >
        <Img src={staticFile("vpn/nord.png")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.18em", color: CYBER.cyan, marginTop: 12, opacity: logoS }}>NORD VPN</div>

      {/* under it: سرعة عالية — BIGGER */}
      <div
        style={{
          marginTop: 22,
          opacity: t1,
          transform: `translateY(${interpolate(t1, [0, 1], [16, 0])}px) scale(${interpolate(t1, [0, 1], [0.96, 1])})`,
          fontFamily: "Cairo, Changa, sans-serif",
          fontSize: 58,
          fontWeight: 900,
          color: CYBER.white,
          direction: "rtl",
          textAlign: "center",
          lineHeight: 1,
          textShadow: "0 0 22px rgba(255,255,255,0.16), 0 0 32px rgba(34,211,238,0.14)",
          letterSpacing: "-0.01em",
        }}
      >
        سرعة <span style={{ color: CYBER.cyan, textShadow: `0 0 16px ${CYBER.cyan}66` }}>عالية</span>
        <div style={{ width: 64, height: 2, background: CYBER.cyan, borderRadius: 999, margin: "8px auto 0", boxShadow: `0 0 10px ${CYBER.cyan}`, opacity: t1 }} />
      </div>

      {/* مقر تع في بنما — BIGGER, cleaner card */}
      <div
        style={{
          marginTop: 14,
          opacity: t2,
          transform: `translateY(${interpolate(t2, [0, 1], [14, 0])}px)`,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "14px 22px",
          borderRadius: 16,
          backdropFilter: "blur(6px)",
          maxWidth: 900,
        }}
      >
        <div
          style={{
            fontFamily: "Cairo, Changa, sans-serif",
            fontSize: 22,
            fontWeight: 800,
            color: "rgba(255,255,255,0.88)",
            direction: "rtl",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          مقر تاعو في <span style={{ color: CYBER.white, fontWeight: 900, background: "rgba(255,255,255,0.08)", padding: "2px 10px", borderRadius: 999 }}>بنما</span> تسما بعيد على تحالفات لتشارك البيانات
        </div>
        <div style={{ fontFamily: FONT.mono, fontSize: 10, color: "rgba(255,255,255,0.32)", letterSpacing: "0.14em", textAlign: "center", marginTop: 6 }}>PANAMA • OUTSIDE 5/9/14 EYES ALLIANCE</div>
      </div>

      {/* مشكلة الوحيدة — BIGGER */}
      <div
        style={{
          marginTop: 16,
          opacity: t3,
          transform: `translateY(${interpolate(t3, [0, 1], [12, 0])}px) scale(${interpolate(t3, [0, 1], [0.98, 1])})`,
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "rgba(239,68,68,0.12)",
          border: "1px solid rgba(239,68,68,0.28)",
          padding: "14px 22px",
          borderRadius: 999,
          boxShadow: "0 8px 24px rgba(239,68,68,0.14)",
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: 999, background: CYBER.red, boxShadow: `0 0 10px ${CYBER.red}` }} />
        <span style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 20, fontWeight: 800, color: CYBER.white, direction: "rtl", lineHeight: 1 }}>
          مشكلة الوحيدة السعر تاعو يزيد كي تبغي تدير تجديد
        </span>
      </div>
    </AbsoluteFill>
  );
};

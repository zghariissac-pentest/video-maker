import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CYBER, FONT } from "../../profx/Theme";
import { GlassCard } from "../../profx/Panels";
import { IconEye, IconShield, IconLock } from "../../profx/Icons";

export const ScenePrivacy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tS = spring({ frame, fps, config: { damping: 16, stiffness: 140 } });
  const tY = interpolate(tS, [0, 1], [20, 0]);

  // cards
  const c1 = spring({ frame: frame - 14, fps, config: { damping: 16, stiffness: 130 } });
  const c2 = spring({ frame: frame - 22, fps, config: { damping: 16, stiffness: 130 } });
  const vs = spring({ frame: frame - 34, fps, config: { damping: 12, stiffness: 180 } });

  // eye open/close flicker for Windows — open eye that blinks
  const blink = Math.floor(frame / 38) % 7 === 0 && frame % 38 < 6;
  // data leak dots for Windows
  const leakDots = Array.from({ length: 5 }).map((_, i) => {
    const y = interpolate((frame + i * 9) % 40, [0, 40], [30, -90], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const x = (i - 2) * 8;
    const op = interpolate((frame + i * 9) % 40, [0, 20, 40], [0, 0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return { x, y, op };
  });

  return (
    <AbsoluteFill style={{ background: "#000000", padding: "30px 28px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
      {/* big title */}
      <div style={{ opacity: tS, transform: `translateY(${tY}px)`, textAlign: "center" }}>
        <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 48, fontWeight: 900, color: CYBER.white, direction: "rtl", lineHeight: 1, textShadow: "0 0 18px rgba(34,211,238,0.18)" }}>
          خصوصية اعلى مقارنة ب <span style={{ color: CYBER.cyan, fontFamily: FONT.mono, fontSize: 44, letterSpacing: "0.02em" }}>windows</span>
        </div>
        <div style={{ width: 72, height: 2, background: CYBER.cyan, borderRadius: 999, margin: "10px auto 0", boxShadow: "0 0 10px rgba(34,211,238,0.6)", opacity: tS }} />
        <div style={{ fontFamily: FONT.mono, fontSize: 11, color: "rgba(255,255,255,0.38)", letterSpacing: "0.16em", marginTop: 8 }}>PRIVACY · NO TELEMETRY · YOU OWN YOUR DATA</div>
      </div>

      {/* two cards — VS in middle */}
      <div style={{ display: "flex", gap: 16, width: "100%", justifyContent: "center", alignItems: "stretch", marginTop: 6 }}>
        {/* Windows — leaking */}
        <div style={{ flex: 1, opacity: c1, transform: `translateY(${interpolate(c1, [0, 1], [18, 0])}px) scale(${interpolate(c1, [0, 1], [0.96, 1])})`, position: "relative" }}>
          <GlassCard accent={CYBER.red} style={{ padding: 22, height: 360, display: "flex", flexDirection: "column", gap: 12, borderColor: `${CYBER.red}55`, background: `linear-gradient(160deg, rgba(239,68,68,0.10), rgba(8,10,14,0.85))` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: CYBER.red, boxShadow: `0 0 10px ${CYBER.red}` }} />
              <span style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.18em", color: CYBER.red }}>WINDOWS</span>
              <span style={{ marginLeft: "auto", fontFamily: FONT.mono, fontSize: 10, color: "rgba(255,255,255,0.35)" }}>telemetry ON</span>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, position: "relative" }}>
              {/* eye with leak */}
              <div style={{ position: "relative", width: 90, height: 90, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconEye size={72} color={blink ? "#000000" : CYBER.red} glow={blink ? "none" : "red" as any} delay={0} drawDuration={18} />
                {/* leaking dots */}
                {!blink &&
                  leakDots.map((d, i) => (
                    <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: 6, height: 6, borderRadius: 999, background: CYBER.red, opacity: d.op, transform: `translate(${d.x}px, ${d.y}px)`, boxShadow: `0 0 8px ${CYBER.red}` }} />
                  ))}
              </div>
              <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 16, color: CYBER.red, fontWeight: 800, direction: "rtl" }}>يتتبعك</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 11, color: "rgba(255,255,255,0.55)", textAlign: "center", lineHeight: 1.5 }}>إعلانات · تتبع · بياناتك تُباع</div>
              {/* bar 28% */}
              <div style={{ width: "100%", height: 8, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden", marginTop: 4 }}>
                <div style={{ width: `${interpolate(c1, [0, 1], [0, 28])}%`, height: "100%", background: CYBER.red, boxShadow: `0 0 10px ${CYBER.red}` }} />
              </div>
              <div style={{ fontFamily: FONT.mono, fontSize: 10, color: CYBER.red, letterSpacing: "0.12em" }}>PRIVACY 28%</div>
            </div>
          </GlassCard>
        </div>

        {/* VS */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", opacity: vs, transform: `scale(${interpolate(vs, [0, 1], [0.6, 1])})` }}>
          <div style={{ width: 56, height: 56, borderRadius: 999, background: "#FFFFFF", color: "#000000", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.display, fontWeight: 900, fontSize: 18, boxShadow: "0 8px 24px rgba(0,0,0,0.6)" }}>VS</div>
        </div>

        {/* Linux — shielded */}
        <div style={{ flex: 1, opacity: c2, transform: `translateY(${interpolate(c2, [0, 1], [18, 0])}px) scale(${interpolate(c2, [0, 1], [0.96, 1])})` }}>
          <GlassCard accent={CYBER.green} style={{ padding: 22, height: 360, display: "flex", flexDirection: "column", gap: 12, background: `linear-gradient(160deg, rgba(34,197,94,0.10), rgba(6,14,12,0.85))` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: CYBER.green, boxShadow: `0 0 10px ${CYBER.green}` }} />
              <span style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.18em", color: CYBER.green }}>LINUX</span>
              <span style={{ marginLeft: "auto", fontFamily: FONT.mono, fontSize: 10, color: "rgba(255,255,255,0.35)" }}>telemetry OFF</span>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <IconShield size={56} color={CYBER.green} glow="green" delay={26} drawDuration={20} />
                <IconLock size={42} color={CYBER.cyan} glow="cyan" delay={34} drawDuration={18} />
              </div>
              <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 16, color: CYBER.green, fontWeight: 800, direction: "rtl" }}>محمي</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 11, color: "rgba(255,255,255,0.62)", textAlign: "center", lineHeight: 1.5 }}>مفتوح المصدر · بلا تتبع · أنت تملك بياناتك</div>
              <div style={{ width: "100%", height: 8, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden", marginTop: 4 }}>
                <div style={{ width: `${interpolate(c2, [0, 1], [0, 96])}%`, height: "100%", background: `linear-gradient(90deg, ${CYBER.green}, ${CYBER.cyan})`, boxShadow: `0 0 12px ${CYBER.green}` }} />
              </div>
              <div style={{ fontFamily: FONT.mono, fontSize: 10, color: CYBER.green, letterSpacing: "0.12em" }}>PRIVACY 96%</div>
            </div>
          </GlassCard>
        </div>
      </div>
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, Easing, useVideoConfig } from "remotion";
import { BM, BacMenBg } from "../components/Theme";
import { GraduationCap, Buildings, ChartBar, CheckCircle, Code, Terminal, Bug, ShieldCheck, Sparkle } from "phosphor-react";

const Group: React.FC<{ opacity: number; scale?: number; children: React.ReactNode }> = ({ opacity, scale = 1, children }) => (
  <div className="dir-rtl" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, opacity, transform: `scale(${scale})` }}>
    {children}
  </div>
);

export const Scene2University: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mk = (s: number, e: number) => {
    const inn = interpolate(frame, [s, s + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
    const out = interpolate(frame, [e - 10, e], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
    return inn * out;
  };
  const a1 = mk(6, 62);
  const a2 = mk(66, 122);
  const a3 = mk(126, 188);
  const b1 = mk(192, 252);
  const b2 = mk(256, 316);
  const b3 = mk(320, 380);

  const bar = interpolate(frame, [72, 106], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const count = interpolate(bar, [0, 1], [9.5, 14.6]);
  const pop = (d: number) => spring({ frame: frame - d, fps, config: { damping: 12, stiffness: 140 } });

  // big attention pulse
  const pulseA3 = interpolate(pop(130), [0, 1], [0.86, 1]);
  const pulseB3 = interpolate(pop(322), [0, 1], [0.82, 1]);

  return (
    <AbsoluteFill style={{ background: BM.bg }}>
      <BacMenBg />

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 28px", gap: 22 }}>
        {/* MASSIVE VISUAL STAGE */}
        <div style={{ position: "relative", width: 720, height: 380, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* A1: BIG university duo */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, opacity: a1 }}>
            <div style={{ width: 160, height: 160, borderRadius: 28, background: "rgba(148,163,184,0.09)", border: "2px solid rgba(148,163,184,0.18)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Buildings size={58} weight="duotone" color="#94A3B8" />
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.14em", color: BM.muted, fontWeight: 800 }}>UNIVERSITY</span>
            </div>
            <div style={{ fontSize: 28, color: BM.muted, fontWeight: 900 }}>+</div>
            <div style={{ width: 160, height: 160, borderRadius: 28, background: "rgba(148,163,184,0.09)", border: "2px solid rgba(148,163,184,0.18)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, transform: `scale(${interpolate(pop(10), [0, 1], [0.88, 1])})` }}>
              <GraduationCap size={58} weight="duotone" color="#94A3B8" />
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 800, color: "#94A3B8" }}>DIPLOMA</span>
            </div>
          </div>

          {/* A2: HUGE meter */}
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, opacity: a2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 13, letterSpacing: "0.16em", color: BM.muted, fontWeight: 800 }}>
              <ChartBar size={20} weight="duotone" color="#94A3B8" /> SEUIL D'ADMISSION
            </div>
            <div style={{ width: 580, height: 34, borderRadius: 999, background: "rgba(255,255,255,0.07)", border: "1.5px solid #263142", overflow: "hidden", padding: 5, position: "relative" }}>
              <div style={{ width: `${bar * 100}%`, height: "100%", borderRadius: 999, background: `linear-gradient(90deg, #334155, #E2E8F0)`, boxShadow: "0 0 18px rgba(148,163,184,0.45)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)`, transform: `translateX(${interpolate(bar, [0, 1], [-140, 220])}%)` }} />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 44, fontWeight: 900, color: BM.ink }}>{count.toFixed(1)}</span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 16, color: BM.muted, fontWeight: 700 }}>/ 20</span>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: bar > 0.85 ? BM.accent3 : "#475569", boxShadow: bar > 0.85 ? "0 0 12px rgba(34,197,94,0.6)" : undefined }} />
            </div>
          </div>

          {/* A3: MASSIVE مشي مشكل */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: a3 }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 18, background: "rgba(34,197,94,0.14)", border: "2px solid rgba(34,197,94,0.28)", padding: "28px 36px", borderRadius: 28, transform: `scale(${pulseA3})`, boxShadow: "0 0 48px rgba(34,197,94,0.22)" }}>
              <CheckCircle size={54} weight="fill" color={BM.accent3} />
              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 46, fontWeight: 900, color: BM.accent3, lineHeight: 1 }}>مشي مشكل</span>
              <Sparkle size={28} weight="fill" color={BM.accent3} style={{ opacity: 0.9 }} />
              <div style={{ position: "absolute", inset: -14, borderRadius: 30, border: "1px solid rgba(34,197,94,0.22)", opacity: interpolate(pop(132), [0, 1], [0, 0.7]), transform: `scale(${interpolate(pop(132), [0, 1], [0.92, 1.08])})`, pointerEvents: "none" }} />
            </div>
          </div>

          {/* B1: field icons HUGE */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, opacity: b1 }}>
            {[
              { I: Buildings, bg: "rgba(34,211,238,0.10)" },
              { I: Code, bg: "rgba(34,211,238,0.14)" },
              { I: Terminal, bg: "rgba(34,211,238,0.10)" },
              { I: Bug, bg: "rgba(34,211,238,0.10)" },
            ].map((it, i) => {
              const s = spring({ frame: frame - (196 + i * 4), fps, config: { damping: 14, stiffness: 160 } });
              return (
                <div key={i} style={{ width: 118, height: 118, borderRadius: 24, background: it.bg, border: "1.5px solid rgba(34,211,238,0.22)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${interpolate(s, [0, 1], [0.78, 1])})`, boxShadow: i === 1 ? "0 0 26px rgba(34,211,238,0.22)" : undefined }}>
                  <it.I size={44} weight="duotone" color={BM.accent2} />
                </div>
              );
            })}
          </div>

          {/* B2: grade crossed HUGE */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, opacity: b2 }}>
            <div style={{ position: "relative", width: 180, height: 106, borderRadius: 22, background: "rgba(148,163,184,0.08)", border: "2px solid rgba(148,163,184,0.16)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 38, fontWeight: 900, color: "#64748B" }}>13.20</span>
              <div style={{ position: "absolute", left: 18, right: 18, top: "50%", height: 4, background: BM.accent, borderRadius: 999, transform: `rotate(-10deg) scaleX(${interpolate(frame, [260, 278], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`, transformOrigin: "center" }} />
              <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "JetBrains Mono, monospace", fontSize: 38, fontWeight: 900, color: BM.accent, opacity: interpolate(frame, [268, 272, 278], [0, 0.35, 0], { extrapolateLeft: "clamp" }), transform: "translate(2px,-1px)" }}>13.20</span>
            </div>
            <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 26, fontWeight: 800, color: BM.muted }}>× ميهتمش</span>
          </div>

          {/* B3: CYBERSECURITY = SKILLS, NOT DIPLOMA */}
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, opacity: b3 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, transform: `scale(${pulseB3})` }}>
              <div style={{ width: 132, height: 132, borderRadius: 26, background: "rgba(34,211,238,0.12)", border: "2px solid rgba(34,211,238,0.26)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 32px rgba(34,211,238,0.22)" }}>
                <ShieldCheck size={58} weight="duotone" color={BM.accent2} />
              </div>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 28, fontWeight: 900, color: BM.ink }}>=</span>
              <div style={{ position: "relative", width: 132, height: 132, borderRadius: 26, background: "rgba(239,68,68,0.09)", border: "2px solid rgba(239,68,68,0.24)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <GraduationCap size={58} weight="duotone" color={BM.accent} />
                <div style={{ position: "absolute", left: 18, right: 18, top: "50%", height: 4, background: BM.accent, borderRadius: 999, transform: `scaleX(${interpolate(frame, [324, 342], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`, transformOrigin: "center" }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", color: BM.accent2, background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.22)", padding: "6px 10px", borderRadius: 999 }}>SKILLS</span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", color: BM.accent, background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.22)", padding: "6px 10px", borderRadius: 999, textDecoration: "line-through" }}>NOT DIPLOMA</span>
            </div>
          </div>
        </div>

        {/* TEXT — BIGGER, bolder */}
        <div style={{ position: "relative", width: "100%", height: 120, overflow: "visible" }}>
          <Group opacity={a1} scale={interpolate(pop(8), [0, 1], [0.92, 1])}><span style={{ fontFamily: "Cairo, sans-serif", fontSize: 62, fontWeight: 900, color: BM.ink }}>الجامعة تشترط</span></Group>
          <Group opacity={a2} scale={interpolate(pop(68), [0, 1], [0.92, 1])}><span style={{ fontFamily: "Cairo, sans-serif", fontSize: 62, fontWeight: 900, color: BM.ink }}>معدل باش تدخل</span></Group>
          <Group opacity={a3} scale={pulseA3}><span style={{ fontFamily: "Cairo, sans-serif", fontSize: 68, fontWeight: 900, color: BM.accent3, textShadow: "0 0 28px rgba(34,197,94,0.35)" }}>وهذا مشي مشكل</span></Group>

          <Group opacity={b1} scale={interpolate(pop(190), [0, 1], [0.92, 1])}><span style={{ fontFamily: "Cairo, sans-serif", fontSize: 62, fontWeight: 900, color: BM.ink }}>بصح المجال عموما</span></Group>
          <Group opacity={b2} scale={interpolate(pop(254), [0, 1], [0.92, 1])}><span style={{ fontFamily: "Cairo, sans-serif", fontSize: 56, fontWeight: 900, color: "#64748B" }}>ميهتمش بالمعدل</span></Group>
          <Group opacity={b3} scale={pulseB3}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 28, fontWeight: 900, letterSpacing: "-0.02em", color: BM.ink }}>CYBERSECURITY</span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 34, fontWeight: 900, color: BM.accent2, textShadow: "0 0 22px rgba(34,211,238,0.35)" }}>= SKILLS</span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 22, fontWeight: 800, color: BM.accent, letterSpacing: "0.10em" }}>NOT DIPLOMA</span>
            </div>
          </Group>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const SCENE2_DURATION = 384;

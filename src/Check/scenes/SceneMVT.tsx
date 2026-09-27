import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CYBER, FONT } from "../../profx/Theme";
import { Icon } from "../../icons/Icon";

export const SceneMVT: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isPhase2 = frame >= 78;
  const phase2Frame = frame - 78;

  if (!isPhase2) {
    // --- PHASE 1: حمل mvt + terminal downloading (bigger) ---
    return (
      <AbsoluteFill style={{ background: "#000000", padding: "28px 18px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: spring({ frame, fps, config: { damping: 16, stiffness: 140 } }) as unknown as number, transform: `translateY(${interpolate(spring({ frame, fps, config: { damping: 16, stiffness: 140 } }), [0, 1], [14, 0])}px)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="lucide:download" size={22} color={CYBER.cyan} glow="cyan" animation="pop" />
            <span style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 48, fontWeight: 900, color: CYBER.white, direction: "rtl" }}>
              حمّل <span style={{ color: CYBER.cyan }}>MVT</span>
            </span>
          </div>
          <span style={{ fontFamily: FONT.mono, fontSize: 11, color: "rgba(255,255,255,0.38)", letterSpacing: "0.14em" }}>Mobile Verification Toolkit • Amnesty International</span>
        </div>

        <div
          style={{
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#06080e",
            boxShadow: "0 18px 60px rgba(0,0,0,0.6)",
            opacity: spring({ frame: frame - 6, fps, config: { damping: 16, stiffness: 130 } }) as unknown as number,
            transform: `translateY(${interpolate(spring({ frame: frame - 6, fps, config: { damping: 16, stiffness: 130 } }), [0, 1], [12, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)" }}>
            <span style={{ width: 10, height: 10, borderRadius: 999, background: "#ff5f56" }} />
            <span style={{ width: 10, height: 10, borderRadius: 999, background: "#ffbd2e" }} />
            <span style={{ width: 10, height: 10, borderRadius: 999, background: "#27c93f" }} />
            <span style={{ marginLeft: 10, fontFamily: FONT.mono, fontSize: 11, color: "rgba(255,255,255,0.38)" }}>zsh — pip install</span>
          </div>
          <div style={{ padding: "20px 18px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", gap: 8, fontFamily: FONT.mono, fontSize: 17, alignItems: "center" }}>
              <span style={{ color: CYBER.green }}>$</span>
              <span style={{ color: CYBER.white }}>
                {(() => {
                  const text = "pip install mvt";
                  const shown = Math.max(0, Math.floor((frame - 14) * 2.2));
                  const sub = text.slice(0, Math.min(shown, text.length));
                  const caret = shown < text.length && Math.floor(frame / 10) % 2 === 0;
                  return (
                    <>
                      {sub}
                      <span style={{ width: 9, height: 19, background: caret ? CYBER.cyan : "transparent", marginLeft: 3, boxShadow: caret ? `0 0 6px ${CYBER.cyan}` : undefined, display: "inline-block", verticalAlign: "middle" }} />
                    </>
                  );
                })()}
              </span>
            </div>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6, opacity: interpolate(frame, [26, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
              {[
                { t: "Collecting mvt", d: 28 },
                { t: "Downloading mvt-2.5.2-py3-none-any.whl (42.1 kB)", d: 36 },
                { t: "Collecting adb-shell, libusb1, rich", d: 44 },
                { t: "Installing collected packages: mvt ✓", d: 54 },
              ].map((row, i) => {
                const s = spring({ frame: frame - row.d, fps, config: { damping: 18, stiffness: 130 } });
                return (
                  <div key={i} style={{ opacity: s, transform: `translateX(${interpolate(s, [0, 1], [-8, 0])}px)`, display: "flex", gap: 8, fontFamily: FONT.mono, fontSize: 12, color: i === 3 ? CYBER.green : "rgba(255,255,255,0.62)" }}>
                    <span style={{ color: i === 3 ? CYBER.green : CYBER.cyan }}>{i === 3 ? "✓" : "▸"}</span>
                    <span>{row.t}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 12, opacity: interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONT.mono, fontSize: 11, color: "rgba(255,255,255,0.48)", marginBottom: 8 }}>
                <span>downloading</span>
                <span style={{ color: CYBER.cyan }}>{Math.round(interpolate(frame, [32, 68], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))}%</span>
              </div>
              <div style={{ height: 14, borderRadius: 999, background: "rgba(255,255,255,0.07)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: `${interpolate(frame, [32, 68], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`, height: "100%", background: `linear-gradient(90deg, ${CYBER.cyan}, ${CYBER.green})`, boxShadow: `0 0 12px ${CYBER.cyan}` }} />
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    );
  }

  // --- PHASE 2: CONNECT (individual bigger) + BACKUP (individual bigger) ---
  // split phase2 into two substeps
  const showConnect = phase2Frame < 42;
  const showBackup = phase2Frame >= 38;

  return (
    <AbsoluteFill style={{ background: "#000000", overflow: "hidden" }}>
      {/* CONNECT — BIG standalone */}
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 18px", gap: 14, opacity: showConnect ? 1 : interpolate(phase2Frame, [38, 48], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <div style={{ textAlign: "center", direction: "rtl", opacity: spring({ frame: phase2Frame, fps, config: { damping: 16, stiffness: 140 } }) as unknown as number, transform: `translateY(${interpolate(spring({ frame: phase2Frame, fps, config: { damping: 16, stiffness: 140 } }), [0, 1], [12, 0])}px)` }}>
          <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 38, fontWeight: 900, color: CYBER.white, lineHeight: 1.2 }}>كونيكتي تيليفونك بالـ<span style={{ color: CYBER.cyan }}>PC</span></div>
          <div style={{ fontFamily: FONT.mono, fontSize: 11, color: "rgba(255,255,255,0.38)", letterSpacing: "0.16em", marginTop: 6 }}>USB • WIRED • DIRECT</div>
        </div>

        <div style={{ position: "relative", width: 820, height: 280, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
          {/* phone BIG */}
          <div style={{ opacity: spring({ frame: phase2Frame - 4, fps, config: { damping: 16, stiffness: 130 } }) as unknown as number, transform: `translateX(${interpolate(spring({ frame: phase2Frame - 4, fps, config: { damping: 16, stiffness: 130 } }), [0, 1], [-28, 0])}px) scale(${interpolate(spring({ frame: phase2Frame - 4, fps, config: { damping: 16, stiffness: 130 } }), [0, 1], [0.92, 1])})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ width: 138, height: 252, borderRadius: 26, background: "linear-gradient(180deg, #0f141e, #05070e)", border: "2px solid rgba(255,255,255,0.12)", boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 22px rgba(34,211,238,0.12)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <Icon name="lucide:smartphone" size={56} color={CYBER.cyan} glow="cyan" animation="none" />
              <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 22, height: 4, borderRadius: 999, background: CYBER.cyan, boxShadow: `0 0 8px ${CYBER.cyan}` }} />
            </div>
            <span style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.14em", color: "rgba(255,255,255,0.55)" }}>PHONE</span>
          </div>

          {/* cable BIG */}
          <svg width={360} height={120} viewBox="0 0 360 120" style={{ overflow: "visible", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", marginLeft: 6 }}>
            {(() => {
              const p = interpolate(phase2Frame, [10, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const d = "M 0 60 C 90 60, 90 60, 180 60 C 270 60, 270 60, 360 60";
              const len = 360;
              return (
                <>
                  <path d={d} fill="none" stroke="rgba(255,255,255,0.96)" strokeWidth={5} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len - p * len} />
                  <path d={d} fill="none" stroke={CYBER.cyan} strokeWidth={2.2} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len - p * len} style={{ filter: `drop-shadow(0 0 8px ${CYBER.cyan})` }} />
                  <g opacity={p > 0.06 ? 1 : 0} transform={`translate(${p * 360}, 60)`}>
                    <rect x={-10} y={-6} width={20} height={12} rx={3} fill={CYBER.white} stroke={CYBER.cyan} strokeWidth={1.2} />
                  </g>
                  {p > 0.97 && <circle cx={360} cy={60} r={6} fill={CYBER.cyan} style={{ filter: `drop-shadow(0 0 12px ${CYBER.cyan})` }} />}
                  {p > 0.97 && <circle cx={360} cy={60} r={14} fill="none" stroke={CYBER.cyan} strokeWidth={1.4} opacity={interpolate(p, [0.97, 1], [1, 0])} />}
                </>
              );
            })()}
          </svg>

          {/* pc BIG */}
          <div style={{ opacity: spring({ frame: phase2Frame - 10, fps, config: { damping: 16, stiffness: 130 } }) as unknown as number, transform: `translateX(${interpolate(spring({ frame: phase2Frame - 10, fps, config: { damping: 16, stiffness: 130 } }), [0, 1], [28, 0])}px) scale(${interpolate(spring({ frame: phase2Frame - 10, fps, config: { damping: 16, stiffness: 130 } }), [0, 1], [0.92, 1])})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ width: 220, height: 148, borderRadius: 16, background: "linear-gradient(180deg, #0f1116, #07080b)", border: "2px solid rgba(255,255,255,0.12)", boxShadow: "0 24px 60px rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="lucide:laptop" size={64} color={CYBER.magenta} glow="magenta" animation="none" />
            </div>
            <span style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.14em", color: "rgba(255,255,255,0.55)" }}>PC</span>
          </div>
        </div>
        <div style={{ fontFamily: FONT.mono, fontSize: 11, color: CYBER.cyan, letterSpacing: "0.12em", opacity: spring({ frame: phase2Frame - 32, fps, config: { damping: 16, stiffness: 120 } }) as unknown as number }}>PLUG • CONNECTED ✓</div>
      </AbsoluteFill>

      {/* BACKUP — BIG standalone, fades in */}
      <AbsoluteFill style={{ background: "#000000", padding: "28px 22px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16, opacity: showBackup ? spring({ frame: phase2Frame - 38, fps, config: { damping: 16, stiffness: 130 } }) as unknown as number : 0, transform: `translateY(${showBackup ? interpolate(spring({ frame: phase2Frame - 38, fps, config: { damping: 16, stiffness: 130 } }), [0, 1], [16, 0]) : 16}px)` }}>
        <div style={{ textAlign: "center", direction: "rtl" }}>
          <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 36, fontWeight: 900, color: CYBER.white, lineHeight: 1.2 }}>واصنع نسخة احتياطية <span style={{ color: CYBER.green }}>كاملة</span></div>
          <div style={{ fontFamily: FONT.mono, fontSize: 11, color: "rgba(255,255,255,0.38)", letterSpacing: "0.14em", marginTop: 6 }}>FULL ENCRYPTED BACKUP • KEEP DEVICE CONNECTED</div>
        </div>
        <div style={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.04)", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONT.mono, fontSize: 12, color: "rgba(255,255,255,0.52)" }}>
            <span>BACKUP — iTunes / adb • FULL</span>
            <span style={{ color: CYBER.white, fontWeight: 800, fontSize: 14 }}>{Math.round(interpolate(phase2Frame, [44, 82], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))}%</span>
          </div>
          <div style={{ height: 18, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ width: `${interpolate(phase2Frame, [44, 82], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`, height: "100%", background: `linear-gradient(90deg, ${CYBER.cyan}, ${CYBER.green})`, boxShadow: `0 0 16px ${CYBER.cyan}` }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONT.mono, fontSize: 10, color: "rgba(255,255,255,0.38)" }}>
            <span>Creating backup…</span>
            <span style={{ color: CYBER.green, opacity: phase2Frame > 78 ? 1 : 0 }}>encrypted ✓</span>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 4 }}>
            {[
              { n: "photos", c: CYBER.cyan },
              { n: "messages", c: CYBER.green },
              { n: "apps", c: CYBER.magenta },
            ].map((t, i) => {
              const p = interpolate(phase2Frame, [48 + i * 6, 68 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <span key={t.n} style={{ fontFamily: FONT.mono, fontSize: 9, color: t.c, background: `${t.c}14`, border: `1px solid ${t.c}33`, padding: "4px 10px", borderRadius: 999, opacity: p, transform: `translateY(${interpolate(p, [0, 1], [8, 0])}px)` }}>
                  {t.n} ✓
                </span>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

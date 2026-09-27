import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CYBER, FONT } from "../../profx/Theme";
import { Icon } from "../../icons/Icon";

export const SceneScan: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t1 = spring({ frame, fps, config: { damping: 16, stiffness: 140 } });
  const progress = interpolate(frame, [38, 98], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const detected = frame >= 98;
  const files = ["sms.db", "cache.plist", "manifest.db", "apps.sqlite", "locationd.log", "keychain.db"];
  const stix = ["Pegasus • 0x4a", "Predator • 0x7f", "Reign • 0x11", "Graphite • 0x3c"];

  return (
    <AbsoluteFill style={{ background: "#000000", overflow: "hidden" }}>
      {/* HEADER — top, not middle */}
      <div style={{ position: "absolute", top: 28, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: t1, transform: `translateY(${interpolate(t1, [0, 1], [14, 0])}px)`, padding: "0 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="lucide:terminal" size={20} color={CYBER.cyan} glow="cyan" animation="pop" />
          <span style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 36, fontWeight: 900, color: CYBER.white, direction: "rtl" }}>شغل امر الفحص</span>
        </div>
        <span style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 14, color: "rgba(255,255,255,0.62)", direction: "rtl", textAlign: "center", maxWidth: 860, lineHeight: 1.6 }}>
          الاداة تكومباري الملفات ب <span style={{ color: CYBER.cyan }}>database</span> لمؤشرات <span style={{ color: CYBER.red }}>malwares</span> معروفة
        </span>
      </div>

      {/* TERMINAL — below header, above middle */}
      <div style={{ position: "absolute", top: 120, left: 18, right: 18 }}>
        <div
          style={{
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#06080e",
            overflow: "hidden",
            opacity: spring({ frame: frame - 10, fps, config: { damping: 16, stiffness: 130 } }) as unknown as number,
            transform: `translateY(${interpolate(spring({ frame: frame - 10, fps, config: { damping: 16, stiffness: 130 } }), [0, 1], [10, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", gap: 6, padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)", alignItems: "center" }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "#ff5f56" }} />
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "#ffbd2e" }} />
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "#27c93f" }} />
            <span style={{ marginLeft: 8, fontFamily: FONT.mono, fontSize: 10, color: "rgba(255,255,255,0.35)" }}>mvt • check-backup</span>
            <span style={{ marginLeft: "auto", fontFamily: FONT.mono, fontSize: 10, color: CYBER.cyan, opacity: 0.9 }}>● scanning</span>
          </div>
          <div style={{ padding: "10px 14px", display: "flex", gap: 8, fontFamily: FONT.mono, fontSize: 12, alignItems: "center" }}>
            <span style={{ color: CYBER.green }}>$</span>
            <span style={{ color: CYBER.white }}>
              {(() => {
                const text = "mvt-ios check-backup --output /tmp/mvt";
                const shown = Math.max(0, Math.floor((frame - 16) * 2));
                return text.slice(0, Math.min(shown, text.length));
              })()}
              <span style={{ width: 7, height: 14, background: frame % 20 < 10 ? CYBER.cyan : "transparent", marginLeft: 4, display: "inline-block", verticalAlign: "middle" }} />
            </span>
          </div>
        </div>
      </div>

      {/* COMPARISON — EXACT MIDDLE OF PAGE */}
      <div style={{ position: "absolute", top: "50%", left: 18, right: 18, height: 440, transform: "translateY(-42%)", display: "flex", gap: 14, alignItems: "stretch", justifyContent: "center" }}>
        {/* files */}
        <div style={{ flex: 1, maxWidth: 430, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", padding: 16, display: "flex", flexDirection: "column", gap: 10, opacity: spring({ frame: frame - 28, fps, config: { damping: 16, stiffness: 130 } }) as unknown as number, transform: `scale(${interpolate(spring({ frame: frame - 28, fps, config: { damping: 16, stiffness: 130 } }), [0, 1], [0.96, 1])})` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="lucide:file-code" size={22} color={CYBER.cyan} glow="cyan" animation="none" />
            <span style={{ fontFamily: FONT.mono, fontSize: 13, color: CYBER.white, letterSpacing: "0.08em", fontWeight: 700 }}>BACKUP FILES</span>
            <span style={{ marginLeft: "auto", fontFamily: FONT.mono, fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{files.length} files</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 6 }}>
            {files.map((f, i) => {
              const p = interpolate(frame, [34 + i * 6, 48 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const isDetected = detected && (i === 1 || i === 4);
              return (
                <div key={f} style={{ opacity: p, transform: `translateX(${interpolate(p, [0, 1], [-10, 0])}px)`, display: "flex", alignItems: "center", gap: 10, background: isDetected ? "rgba(239,68,68,0.16)" : "rgba(255,255,255,0.05)", border: `1px solid ${isDetected ? "rgba(239,68,68,0.42)" : "rgba(255,255,255,0.07)"}`, padding: "10px 14px", borderRadius: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: isDetected ? CYBER.red : CYBER.cyan, boxShadow: `0 0 8px ${isDetected ? CYBER.red : CYBER.cyan}` }} />
                  <span style={{ fontFamily: FONT.mono, fontSize: 13, color: isDetected ? CYBER.red : "rgba(255,255,255,0.86)", fontWeight: isDetected ? 700 : 400 }}>{f}</span>
                  <span style={{ marginLeft: "auto", fontFamily: FONT.mono, fontSize: 10, color: isDetected ? CYBER.red : "rgba(255,255,255,0.38)", fontWeight: 700 }}>{isDetected ? "MATCH!" : `${Math.round(p * 100)}%`}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* center */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, width: 88 }}>
          <div style={{ width: 64, height: 64, borderRadius: 999, background: `${CYBER.cyan}16`, border: `1.5px solid ${CYBER.cyan}44`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 18px rgba(34,211,238,0.25)`, opacity: spring({ frame: frame - 36, fps, config: { damping: 16, stiffness: 130 } }) as unknown as number, transform: `scale(${interpolate(spring({ frame: frame - 36, fps, config: { damping: 16, stiffness: 130 } }), [0, 1], [0.8, 1])})` }}>
            <Icon name="lucide:search" size={30} color={CYBER.cyan} glow="cyan" animation={frame < 98 ? "pulse" : "none"} />
          </div>
          <div style={{ width: 2, height: 72, background: `linear-gradient(180deg, ${CYBER.cyan}, transparent)`, opacity: 0.7 }} />
          <span style={{ fontFamily: FONT.mono, fontSize: 13, color: CYBER.cyan, letterSpacing: "0.14em", fontWeight: 800 }}>{detected ? "DONE" : `${Math.round(progress * 100)}%`}</span>
          <div style={{ width: 64, height: 6, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ width: `${progress * 100}%`, height: "100%", background: `linear-gradient(90deg, ${CYBER.cyan}, ${CYBER.green})`, boxShadow: `0 0 10px ${CYBER.cyan}` }} />
          </div>
        </div>

        {/* database */}
        <div style={{ flex: 1, maxWidth: 430, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", padding: 16, display: "flex", flexDirection: "column", gap: 10, opacity: spring({ frame: frame - 32, fps, config: { damping: 16, stiffness: 130 } }) as unknown as number, transform: `scale(${interpolate(spring({ frame: frame - 32, fps, config: { damping: 16, stiffness: 130 } }), [0, 1], [0.96, 1])})` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="lucide:database" size={22} color={CYBER.magenta} glow="magenta" animation="none" />
            <span style={{ fontFamily: FONT.mono, fontSize: 13, color: CYBER.white, letterSpacing: "0.08em", fontWeight: 700 }}>STIX DATABASE</span>
            <span style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: 999, background: CYBER.green, boxShadow: `0 0 8px ${CYBER.green}` }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 6 }}>
            {stix.map((s, i) => {
              const p = spring({ frame: frame - (40 + i * 5), fps, config: { damping: 16, stiffness: 130 } });
              return (
                <div key={s} style={{ opacity: p, transform: `translateX(${interpolate(p, [0, 1], [10, 0])}px)`, display: "flex", gap: 8, fontFamily: FONT.mono, fontSize: 12, color: "rgba(255,255,255,0.72)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", padding: "9px 12px", borderRadius: 10 }}>
                  <span style={{ color: CYBER.magenta }}>◆</span>
                  <span>{s}</span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: "auto", fontFamily: FONT.mono, fontSize: 10, color: "rgba(255,255,255,0.36)", textAlign: "center", letterSpacing: "0.06em" }}>Amnesty STIX • {stix.length} indicators • verified</div>
        </div>
      </div>

      {/* bottom */}
      <div style={{ position: "absolute", bottom: 34, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: spring({ frame: frame - 102, fps, config: { damping: 16, stiffness: 130 } }) as unknown as number, transform: `translateY(${interpolate(spring({ frame: frame - 102, fps, config: { damping: 16, stiffness: 130 } }), [0, 1], [10, 0])}px)` }}>
        <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 13, color: CYBER.red, direction: "rtl", fontWeight: 700, background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.22)", padding: "6px 12px", borderRadius: 999 }}>⚠️ detected 2 files matched • review required</div>
        <span style={{ fontFamily: FONT.mono, fontSize: 11, color: "rgba(255,255,255,0.62)", letterSpacing: "0.08em" }}>after getting results u can see the detected files</span>
      </div>
    </AbsoluteFill>
  );
};

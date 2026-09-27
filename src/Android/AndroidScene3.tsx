import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Video } from "remotion";

export const AndroidScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);

  // Title
  const titleIn = spring({ frame, fps, config: { damping: 16, stiffness: 130 } });
  const badgeIn = interpolate(frame, [18, 32], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Sentence 1: kernel <-> hardware (starts 40f)
  const s1 = spring({ frame: frame - 40, fps, config: { damping: 15, stiffness: 130 } });
  const pkt = interpolate(frame, [52, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pktX = interpolate((frame - 52) % 60, [0, 60], [-90, 90]);
  const hwGlow = Math.sin(frame * 0.12) * 0.5 + 0.5;
  const hwIcons = [
    { e: "📱", l: "PHONE" },
    { e: "💾", l: "DISK" },
    { e: "📶", l: "RADIO" },
  ];

  // Sentence 2: memory manager (starts 120f)
  const s2 = spring({ frame: frame - 120, fps, config: { damping: 15, stiffness: 130 } });
  const memFill = interpolate(frame, [132, 210], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const memCells = 12;
  const memUsed = Math.floor(memFill * memCells);
  const memApps = [
    { n: "camera", c: "#60a5fa" },
    { n: "whatsapp", c: "#22c55e" },
    { n: "game", c: "#f59e0b" },
  ];

  // Sentence 3: process scheduler (starts 200f)
  const s3 = spring({ frame: frame - 200, fps, config: { damping: 15, stiffness: 130 } });
  const schedTick = Math.floor((frame - 210) / 22);
  const procs = [
    { name: "init", pid: "1", icon: "⭐" },
    { name: "bash", pid: "1558", icon: "💻" },
    { name: "camera", pid: "2048", icon: "📷" },
    { name: "netd", pid: "3110", icon: "🌐" },
  ];
  const activeProc = ((schedTick % procs.length) + procs.length) % procs.length;

  // Footer summary (starts 300f)
  const footIn = interpolate(frame, [300, 314], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.66)" }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 36px", gap: 16 }}>
        {/* BIG title */}
        <div dir="rtl" style={{ textAlign: "center", opacity: titleIn, transform: `scale(${interpolate(titleIn, [0, 1], [0.9, 1])}) translateY(${interpolate(titleIn, [0, 1], [16, 0])}px)` }}>
          <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 950, fontSize: 56, color: "white", lineHeight: 1.25, textShadow: "0 6px 28px rgba(0,0,0,0.7)" }}>
            اي نظام تشغيل يحتاج <span style={{ color: "#22c55e", background: "rgba(34,197,94,0.12)", padding: "2px 12px", borderRadius: 12, textShadow: "0 0 22px rgba(34,197,94,0.55)" }}>kernel</span>
          </div>
          <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.18)", borderRadius: 999, padding: "8px 16px", opacity: badgeIn }}>
            <span style={{ width: 9, height: 9, borderRadius: 999, background: "#22c55e", boxShadow: "0 0 10px rgba(34,197,94,0.8)" }} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.16em", color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>KERNEL • CORE OF EVERY OS</span>
          </div>
        </div>

        {/* SENTENCE 1 — kernel talks to hardware */}
        <div style={{ width: "100%", opacity: s1, transform: `translateY(${interpolate(s1, [0, 1], [18, 0])}px) scale(${interpolate(s1, [0, 1], [0.95, 1])})`, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(34,197,94,0.22)", borderRadius: 20, padding: "14px 16px" }}>
          <div dir="rtl" style={{ fontFamily: "Cairo, sans-serif", fontWeight: 900, fontSize: 22, color: "white", marginBottom: 10 }}>
            <span style={{ background: "#22c55e", color: "white", borderRadius: 999, padding: "2px 12px", fontSize: 15, marginInlineEnd: 8 }}>1</span>
            يتواصل مباشرة مع <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 800 }}>hardware</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: "#22c55e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: `0 0 ${12 + hwGlow * 12}px rgba(34,197,94,0.55)` }}>
              <span style={{ fontSize: 26 }}>🧠</span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 8, fontWeight: 800, color: "white" }}>KERNEL</span>
            </div>
            <div style={{ position: "relative", width: 120, height: 3, background: "rgba(255,255,255,0.10)", borderRadius: 999, overflow: "hidden", opacity: pkt }}>
              <div style={{ position: "absolute", top: "50%", left: "50%", width: 12, height: 12, borderRadius: 999, background: "#22c55e", boxShadow: "0 0 10px rgba(34,197,94,0.9)", transform: `translate(calc(-50% + ${pktX}px), -50%)` }} />
              <div style={{ position: "absolute", top: "50%", left: "50%", width: 8, height: 8, borderRadius: 999, background: "#22c55e", opacity: 0.5, boxShadow: "0 0 8px rgba(34,197,94,0.7)", transform: `translate(calc(-50% + ${-pktX}px), -50%)` }} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {hwIcons.map((h, i) => {
                const hi = spring({ frame: frame - 52 - i * 8, fps, config: { damping: 14, stiffness: 150 } });
                return (
                  <div key={h.l} style={{ opacity: hi, transform: `scale(${interpolate(hi, [0, 1], [0.7, 1])})`, width: 72, height: 76, borderRadius: 16, background: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, boxShadow: `0 0 ${8 + hwGlow * 8}px rgba(255,255,255,${0.12 + hwGlow * 0.12})` }}>
                    <span style={{ fontSize: 26 }}>{h.e}</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 8, fontWeight: 800, color: "#0a0a0a" }}>{h.l}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SENTENCE 2 — manages memory */}
        <div style={{ width: "100%", opacity: s2, transform: `translateY(${interpolate(s2, [0, 1], [18, 0])}px) scale(${interpolate(s2, [0, 1], [0.95, 1])})`, background: "rgba(96,165,250,0.07)", border: "1px solid rgba(96,165,250,0.25)", borderRadius: 20, padding: "14px 16px" }}>
          <div dir="rtl" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "Cairo, sans-serif", fontWeight: 900, fontSize: 22, color: "white" }}>
              <span style={{ background: "#60a5fa", color: "white", borderRadius: 999, padding: "2px 12px", fontSize: 15, marginInlineEnd: 8 }}>2</span>
              يدير <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 800 }}>memory</span>
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "#60a5fa", fontWeight: 800 }}>{Math.round(memFill * 100)}%</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6, marginTop: 10 }}>
            {Array.from({ length: memCells }).map((_, i) => {
              const filled = i < memUsed;
              const app = memApps[i % memApps.length];
              return (
                <div key={i} style={{ height: 34, borderRadius: 8, background: filled ? app.c : "rgba(255,255,255,0.08)", border: `1px solid ${filled ? app.c : "rgba(255,255,255,0.10)"}`, boxShadow: filled ? `0 0 8px ${app.c}55` : "none", transform: filled ? "scale(1)" : "scale(0.96)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 11, opacity: filled ? 1 : 0.25 }}>▦</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 8, justifyContent: "center" }}>
            {memApps.map((a) => (
              <div key={a.n} style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(0,0,0,0.3)", borderRadius: 999, padding: "4px 10px" }}>
                <span style={{ width: 8, height: 8, borderRadius: 3, background: a.c }} />
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "white", fontWeight: 700 }}>{a.n}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SENTENCE 3 — runs processes */}
        <div style={{ width: "100%", opacity: s3, transform: `translateY(${interpolate(s3, [0, 1], [18, 0])}px) scale(${interpolate(s3, [0, 1], [0.95, 1])})`, background: "white", borderRadius: 20, padding: "14px 16px", boxShadow: "0 16px 32px rgba(0,0,0,0.4)" }}>
          <div dir="rtl" style={{ fontFamily: "Cairo, sans-serif", fontWeight: 900, fontSize: 22, color: "#0a0a0a", marginBottom: 8 }}>
            <span style={{ background: "#0a0a0a", color: "white", borderRadius: 999, padding: "2px 12px", fontSize: 15, marginInlineEnd: 8 }}>3</span>
            يشغل <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 800 }}>processes</span>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(0,0,0,0.45)", marginInlineStart: 8, fontWeight: 700 }}>SCHEDULER • ROUND-ROBIN</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {procs.map((p, i) => {
              const pi = spring({ frame: frame - 212 - i * 9, fps, config: { damping: 14, stiffness: 160 } });
              const isActive = frame >= 210 && i === activeProc;
              return (
                <div key={p.pid} style={{ opacity: pi, transform: `translateX(${interpolate(pi, [0, 1], [20, 0])}px)`, display: "flex", alignItems: "center", gap: 8, background: isActive ? "#22c55e" : "#0a0a0a", borderRadius: 12, padding: "8px 12px", boxShadow: isActive ? "0 0 14px rgba(34,197,94,0.55)" : "none" }}>
                  <span style={{ fontSize: 14 }}>{p.icon}</span>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "white", fontWeight: 800 }}>{p.name}</span>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: isActive ? "white" : "rgba(255,255,255,0.45)" }}>pid {p.pid}</span>
                  <span style={{ marginInlineStart: "auto", fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 800, color: isActive ? "white" : "#22c55e" }}>{isActive ? "▶ RUNNING" : "● READY"}</span>
                  {isActive && <span style={{ width: 8, height: 8, borderRadius: 999, background: "white", boxShadow: "0 0 8px white" }} />}
                </div>
              );
            })}
          </div>
        </div>

        {/* footer */}
        <div style={{ opacity: footIn, transform: `translateY(${interpolate(footIn, [0, 1], [8, 0])}px)`, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.14em", color: "rgba(34,197,94,0.8)", fontWeight: 700 }}>
          KERNEL = MANAGER • HARDWARE + MEMORY + PROCESSES
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

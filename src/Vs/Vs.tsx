import React from "react";
import { AbsoluteFill, Img, Video, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig, Easing, Sequence } from "remotion";
import { GraduationCap, BookOpen, Layers, Monitor, Terminal, ShieldAlert, Server, Trophy, Zap } from "lucide-react";

// Scene 1: Very clean - like Fbi/Ai: coding bg, pic in middle, text under (background properly removed)
const VsScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);
  const imgIn = spring({ frame: frame + 12, fps, config: { damping: 16, stiffness: 130 } });
  const imgScale = interpolate(imgIn, [0, 1], [0.86, 1]);
  const imgOpacity = interpolate(imgIn, [0, 1], [0.4, 1]);
  const imgY = interpolate(imgIn, [0, 1], [18, 0]);
  const textIn = interpolate(frame, [18, 32], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textY = interpolate(textIn, [0, 1], [12, 0]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.58)" }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 32px" }}>
        <div style={{ opacity: imgOpacity, transform: `translateY(${imgY}px) scale(${imgScale})`, filter: "drop-shadow(0 18px 42px rgba(0,0,0,0.65))", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Img src={staticFile("vs-matrix.png")} style={{ width: 780, height: 740, objectFit: "contain", display: "block" }} />
        </div>
        <div dir="rtl" style={{ marginTop: 32, textAlign: "center", opacity: textIn, transform: `translateY(${textY}px)` }}>
          <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontWeight: 800, fontSize: 52, color: "white", letterSpacing: "-0.02em", lineHeight: 1.2, textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}>
            tryhackme ولا hackthebox
          </div>
          <div style={{ marginTop: 14, width: 72, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, marginInline: "auto", opacity: textIn, transform: `scaleX(${textIn})` }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 2: TryHackMe logo up + point by point in middle (all centered, not all at once)
const VsScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoIn = spring({ frame: frame + 6, fps, config: { damping: 20, stiffness: 100 } });

  // Slower transition - point by point, bigger shapes
  const points = [
    { text: "افضل نقطة باش يبدا مبتدأ", icon: GraduationCap },
    { text: "فيها rooms تعليمية فيها توجيه خطوة بخطوة", icon: BookOpen },
    { text: "تشرح المفاهيم ونتا تتقدم", icon: Layers },
    { text: "interface مشي معقدة", icon: Monitor },
    { text: "مليحة اذا جامي توشيت terminal", icon: Terminal },
  ];
  const pointDur = 72; // more time for each point
  const pointStart = 24;
  const activeIdx = Math.min(points.length - 1, Math.max(0, Math.floor((frame - pointStart) / pointDur)));
  const pointFrame = frame - (pointStart + activeIdx * pointDur);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.64)" }} />
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", gap: 18 }}>
        {/* Logo - clearer, bigger */}
        <div style={{ opacity: logoIn, transform: `translateY(${interpolate(logoIn, [0, 1], [12, 0])}px) scale(${interpolate(logoIn, [0, 1], [0.96, 1])})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ width: 220, height: 220, borderRadius: 32, background: "white", padding: 18, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 18px 42px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08) inset" }}>
            <Img src={staticFile("labs/tryhackme.svg")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 900, fontSize: 32, color: "#EF4444", letterSpacing: "-0.02em" }}>tryhackme</div>
        </div>

        {/* All in middle - single point centered, point by point - bigger better shape */}
        <div style={{ width: "100%", maxWidth: 920, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginTop: 10 }}>
          {points.map((pt, i) => {
            if (i !== activeIdx) return null;
            // Slower smoother, more fixed
            const p = spring({ frame: pointFrame, fps, config: { damping: 22, stiffness: 95 } });
            const y = interpolate(p, [0, 1], [16, 0], { easing: Easing.bezier(0.22, 1, 0.36, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const scale = interpolate(p, [0, 1], [0.98, 1]);
            return (
              <div key={i} style={{ opacity: p, transform: `translateY(${y}px) scale(${scale})`, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "28px 24px", borderRadius: 24, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)", textAlign: "center", willChange: "transform, opacity", boxShadow: "0 12px 32px rgba(0,0,0,0.28)" }}>
                <div style={{ width: 76, height: 76, borderRadius: 20, background: i === 4 ? "#22D3EE" : "rgba(239,68,68,0.14)", border: `1px solid ${i === 4 ? "rgba(34,211,238,0.24)" : "rgba(239,68,68,0.20)"}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: i === 4 ? "0 8px 20px rgba(34,211,238,0.25)" : "0 8px 20px rgba(239,68,68,0.18)" }}>
                  <pt.icon size={34} color={i === 4 ? "black" : "#EF4444"} strokeWidth={1.8} />
                </div>
                <div dir="rtl" style={{ fontFamily: "Cairo, Changa, sans-serif", fontWeight: 800, fontSize: 36, color: "white", lineHeight: 1.35, textAlign: "center" }}>{pt.text}</div>
                {/* Deep describing animation per point - bigger better shape */}
                <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 6 }}>
                  {i === 0 && (
                    <div style={{ width: 280, height: 44, borderRadius: 999, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", padding: 5, gap: 5, position: "relative" }}>
                      {["0", "→", "1"].map((t, idx) => (
                        <div key={idx} style={{ flex: 1, height: "100%", borderRadius: 999, background: idx === 2 && pointFrame > 14 ? "#EF4444" : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "JetBrains Mono, monospace", fontSize: 14, fontWeight: 800, color: idx === 2 && pointFrame > 14 ? "white" : "rgba(255,255,255,0.5)" }}>{t}</div>
                      ))}
                      <div style={{ position: "absolute", left: 5 + (interpolate(pointFrame, [10, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.22, 1, 0.36, 1) }) * 190), top: 5, bottom: 5, width: 28, borderRadius: 999, background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.25)", opacity: pointFrame > 8 ? 1 : 0 }} />
                    </div>
                  )}
                  {i === 1 && (
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      {[0, 1, 2].map(k => {
                        const active = pointFrame > 10 + k * 10;
                        return <div key={k} style={{ width: 62, height: 42, borderRadius: 12, background: active ? "#EF4444" : "rgba(255,255,255,0.08)", border: active ? "1px solid white" : "1px solid rgba(255,255,255,0.10)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "JetBrains Mono, monospace", fontSize: 14, fontWeight: 800, color: active ? "white" : "rgba(255,255,255,0.4)", transform: `scale(${active && pointFrame > 12 + k * 10 && pointFrame < 18 + k * 10 ? 1.08 : 1})`, boxShadow: active ? "0 0 12px rgba(239,68,68,0.4)" : "none" }}>{k + 1}</div>;
                      })}
                      <span style={{ color: "#EF4444", fontSize: 16 }}>→</span>
                      <div style={{ width: 32, height: 32, borderRadius: 999, background: pointFrame > 42 ? "#22D3EE" : "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✓</div>
                    </div>
                  )}
                  {i === 2 && (
                    <div style={{ width: 260, display: "flex", flexDirection: "column", gap: 8 }}>
                      {[0, 1, 2].map(k => {
                        const prog = interpolate(pointFrame, [10 + k * 8, 20 + k * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.22, 1, 0.36, 1) });
                        return <div key={k} style={{ height: 10, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}><div style={{ width: `${prog * 100}%`, height: "100%", background: "#EF4444" }} /></div>;
                      })}
                    </div>
                  )}
                  {i === 3 && (
                    <div style={{ width: 260, height: 62, borderRadius: 14, background: "white", border: "1px solid rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", padding: 8, gap: 5 }}>
                      <div style={{ height: 10, borderRadius: 4, background: "#EF4444", width: "44%" }} />
                      <div style={{ display: "flex", gap: 5, flex: 1 }}><div style={{ flex: 1, borderRadius: 10, background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.12)" }} /><div style={{ flex: 1.2, borderRadius: 10, background: "rgba(0,0,0,0.04)" }} /></div>
                    </div>
                  )}
                  {i === 4 && (
                    <div style={{ width: 260, height: 44, borderRadius: 12, background: "#0F172A", border: "1px solid rgba(34,211,238,0.22)", display: "flex", alignItems: "center", padding: "0 12px", gap: 10 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 999, background: "#22D3EE" }} />
                      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, color: "white" }}>tryhackme</span>
                      <span style={{ width: 10, height: 18, background: Math.floor(pointFrame / 10) % 2 === 0 ? "white" : "transparent", marginLeft: 2 }} />
                      <span style={{ marginLeft: "auto", fontSize: 11, color: "#22D3EE", background: "rgba(34,211,238,0.12)", padding: "3px 10px", borderRadius: 999 }}>NO EXP</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress dots - all in middle bottom */}
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          {points.map((_, i) => (
            <div key={i} style={{ width: i === activeIdx ? 22 : 8, height: 8, borderRadius: 999, background: i === activeIdx ? "#EF4444" : i < activeIdx ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.18)", transition: "width 0.3s" }} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 3: HackTheBox - same style, hackthebox logo up, point by point
const VsScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoIn = spring({ frame: frame + 6, fps, config: { damping: 20, stiffness: 100 } });

  const points = [
    { text: "هنا الحالة تلقاها واقعية بزاف بلا توجيه", icon: ShieldAlert },
    { text: "تحطك نيشان مع الجهاز بلا حتى تلميح (ابار اذا اشتاركت)", icon: Server },
    { text: "افضل مور متحكم الاساسيات , بسك تحاكي اختبار اختراق بلا مساعدة", icon: Trophy },
  ];
  const pointDur = 96; // more time between points
  const pointStart = 24;
  const activeIdx = Math.min(points.length - 1, Math.max(0, Math.floor((frame - pointStart) / pointDur)));
  const pointFrame = frame - (pointStart + activeIdx * pointDur);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.64)" }} />
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", gap: 18 }}>
        <div style={{ opacity: logoIn, transform: `translateY(${interpolate(logoIn, [0, 1], [12, 0])}px) scale(${interpolate(logoIn, [0, 1], [0.96, 1])})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ width: 220, height: 220, borderRadius: 32, background: "white", padding: 18, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 18px 42px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08) inset" }}>
            <Img src={staticFile("labs/hackthebox.svg")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 900, fontSize: 28, color: "#22D3EE" }}>hackthebox</div>
        </div>

        <div style={{ width: "100%", maxWidth: 920, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginTop: 8 }}>
          {points.map((pt, i) => {
            if (i !== activeIdx) return null;
            const p = spring({ frame: pointFrame, fps, config: { damping: 22, stiffness: 95 } });
            const y = interpolate(p, [0, 1], [16, 0], { easing: Easing.bezier(0.22, 1, 0.36, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ opacity: p, transform: `translateY(${y}px) scale(${interpolate(p, [0, 1], [0.98, 1])})`, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "28px 24px", borderRadius: 24, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)", textAlign: "center", willChange: "transform, opacity", boxShadow: "0 12px 32px rgba(0,0,0,0.28)" }}>
                <div style={{ width: 76, height: 76, borderRadius: 20, background: "rgba(34,211,238,0.14)", border: "1px solid rgba(34,211,238,0.20)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(34,211,238,0.18)" }}>
                  <pt.icon size={34} color="#22D3EE" strokeWidth={1.8} />
                </div>
                <div dir="rtl" style={{ fontFamily: "Cairo, Changa, sans-serif", fontWeight: 800, fontSize: i === 2 ? 28 : 32, color: "white", lineHeight: 1.4, textAlign: "center" }}>{pt.text}</div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 6 }}>
                  {i === 0 && (
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div style={{ width: 64, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 999, background: "#22D3EE", opacity: 0.9 + Math.sin(pointFrame * 0.2) * 0.1 }} />
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontFamily: "JetBrains Mono, monospace" }}>REAL</span>
                      </div>
                      <span style={{ color: "rgba(255,255,255,0.3)" }}>—</span>
                      <div style={{ padding: "6px 12px", borderRadius: 999, background: "rgba(239,68,68,0.0)", border: "1px dashed rgba(255,255,255,0.18)", fontSize: 11, color: "rgba(255,255,255,0.45)" }}>بلا توجيه</div>
                    </div>
                  )}
                  {i === 1 && (
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ width: 88, height: 44, borderRadius: 12, background: "#0F172A", border: "1px solid rgba(34,211,238,0.22)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                        <Server size={16} color="#22D3EE" />
                        <span style={{ fontSize: 11, color: "white", fontFamily: "JetBrains Mono, monospace" }}>machine</span>
                      </div>
                      <span style={{ color: "rgba(255,255,255,0.3)" }}>✕</span>
                      <div style={{ padding: "6px 10px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 11, color: "rgba(255,255,255,0.45)", textDecoration: "line-through" }}>تلميح</div>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.32)" }}>(إلا باشتراك)</span>
                    </div>
                  )}
                  {i === 2 && (
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div style={{ padding: "6px 12px", borderRadius: 999, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", fontSize: 11, color: "white" }}>الأساسيات ✓</div>
                      <span style={{ color: "#22D3EE" }}>→</span>
                      <div style={{ padding: "6px 14px", borderRadius: 999, background: "#22D3EE", color: "#000", fontWeight: 800, fontSize: 11, fontFamily: "JetBrains Mono, monospace" }}>PENTEST REAL</div>
                      <Zap size={16} color="#22D3EE" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          {points.map((_, i) => (
            <div key={i} style={{ width: i === activeIdx ? 22 : 8, height: 8, borderRadius: 999, background: i === activeIdx ? "#22D3EE" : i < activeIdx ? "rgba(34,211,238,0.5)" : "rgba(255,255,255,0.18)" }} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Vs: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Sequence from={0} durationInFrames={150}>
        <VsScene1 />
      </Sequence>
      <Sequence from={150} durationInFrames={390}>
        <VsScene2 />
      </Sequence>
      <Sequence from={540} durationInFrames={360}>
        <VsScene3 />
      </Sequence>
    </AbsoluteFill>
  );
};

export const VS_DURATION = 900;
export const VS_FPS = 30;
export const VS_WIDTH = 1080;
export const VS_HEIGHT = 1920;

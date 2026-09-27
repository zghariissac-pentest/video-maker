import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const Farm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);

  // Scene 1: 0-179 Hook GTA — clean text
  if (frame < 180) {
    const imgIn = spring({ frame, fps, config: { damping: 16, stiffness: 140 } });
    const textIn = interpolate(frame, [16, 30], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return (
      <AbsoluteFill style={{ backgroundColor: "#000" }}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 40px", gap: 28 }}>
          <div style={{ opacity: imgIn, transform: `scale(${interpolate(imgIn, [0, 1], [0.96, 1])}) translateY(${interpolate(imgIn, [0, 1], [12, 0])}px)` }}>
            <Img src={staticFile("farm-gta.jpg")} style={{ width: 860, height: 560, objectFit: "cover", borderRadius: 18, display: "block", border: "1px solid rgba(255,255,255,0.08)" }} />
          </div>
          <div dir="rtl" style={{ textAlign: "center", opacity: textIn, transform: `translateY(${interpolate(textIn, [0, 1], [10, 0])}px)` }}>
            <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 950, fontSize: 64, color: "white", letterSpacing: "-0.03em", lineHeight: 1 }}>
              كي تريح معا صحابك
            </div>
            <div style={{ marginTop: 10, width: 64, height: 2, background: "rgba(255,255,255,0.55)", borderRadius: 999, marginInline: "auto" }} />
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  // Scene 2: 180-359 cat aura — detailed aura farming visualization
  if (frame < 360) {
    const s = frame - 180;
    const imgIn = spring({ frame: s, fps, config: { damping: 14, stiffness: 120 } });
    const imgScale = interpolate(imgIn, [0, 1], [0.84, 1]);
    const auraPulse = (Math.sin(s * 0.12) * 0.5 + 0.5);
    const textIn = interpolate(s, [14, 28], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return (
      <AbsoluteFill style={{ backgroundColor: "#000" }}>
        {/* aura glow */}
        <div style={{ position: "absolute", left: "50%", top: "42%", width: 720, height: 720, transform: "translate(-50%, -50%)", background: `radial-gradient(circle, rgba(34,197,94,${0.14 + auraPulse * 0.08}) 0%, transparent 62%)`, opacity: imgIn, filter: "blur(6px)" }} />
        {/* orbiting particles */}
        {[0, 1, 2, 3].map((i) => {
          const ang = (s * 0.04 + (i * Math.PI) / 2) * 57.3;
          return <div key={i} style={{ position: "absolute", left: "50%", top: "42%", width: 6, height: 6, borderRadius: 999, background: "#22c55e", boxShadow: "0 0 10px rgba(34,197,94,0.8)", transform: `translate(-50%, -50%) rotate(${ang}deg) translate(168px)`, opacity: imgIn * 0.7 }} />;
        })}
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 36px", gap: 20 }}>
          <div style={{ position: "relative", opacity: imgIn, transform: `scale(${imgScale})` }}>
            <Img src={staticFile("farm-aura.jpg")} style={{ width: 560, height: 560, objectFit: "cover", borderRadius: 24, display: "block", border: "1.5px solid rgba(34,197,94,0.35)", boxShadow: `0 0 ${20 + auraPulse * 16}px rgba(34,197,94,0.35), 0 18px 40px rgba(0,0,0,0.6)` }} />
            <div style={{ position: "absolute", inset: -6, borderRadius: 28, border: "1px solid rgba(34,197,94,0.22)", opacity: 0.6 + auraPulse * 0.4, transform: `scale(${0.98 + auraPulse * 0.03})` }} />
            <div style={{ position: "absolute", bottom: -14, left: "50%", transform: "translateX(-50%)", background: "#22c55e", color: "white", fontFamily: "JetBrains Mono, monospace", fontWeight: 900, fontSize: 12, padding: "6px 14px", borderRadius: 999, opacity: textIn, boxShadow: "0 6px 18px rgba(34,197,94,0.45)" }}>+ AURA</div>
          </div>
          <div dir="rtl" style={{ textAlign: "center", opacity: textIn, transform: `translateY(${interpolate(textIn, [0, 1], [12, 0])}px)` }}>
            <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 950, fontSize: 44, color: "white", lineHeight: 1.1 }}>
              يليق تفارمي <span style={{ color: "#22c55e", textShadow: `0 0 ${10 + auraPulse * 10}px rgba(34,197,94,0.7)` }}>aura</span> بمعلوماتك
            </div>
            <div style={{ marginTop: 10, display: "inline-flex", gap: 6, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.14)", borderRadius: 999, padding: "6px 12px" }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "#22c55e", animation: "none", boxShadow: "0 0 8px rgba(34,197,94,0.6)" }} />
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,255,255,0.55)", fontWeight: 700 }}>KNOWLEDGE = AURA • EACH INFO +10</span>
            </div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  // Scene 3: 360-539 supply chain — company manufactures clean app
  if (frame < 540) {
    const s = frame - 360;
    const titleIn = spring({ frame: s, fps, config: { damping: 14, stiffness: 130 } });
    const subIn = interpolate(s, [18, 30], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const lineIn = spring({ frame: s - 20, fps, config: { damping: 18, stiffness: 160 } });
    const c1 = spring({ frame: s - 36, fps, config: { damping: 14, stiffness: 140 } });
    const arr = spring({ frame: s - 48, fps, config: { damping: 14, stiffness: 140 } });
    const c2 = spring({ frame: s - 60, fps, config: { damping: 14, stiffness: 140 } });
    const chk = spring({ frame: s - 76, fps, config: { damping: 12, stiffness: 160 } });
    const trail = interpolate(s, [48, 88], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return (
      <AbsoluteFill style={{ backgroundColor: "#000" }}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 44px", gap: 20 }}>
          <div dir="rtl" style={{ textAlign: "center", opacity: titleIn, transform: `scale(${interpolate(titleIn, [0, 1], [0.9, 1])}) translateY(${interpolate(titleIn, [0, 1], [14, 0])}px)` }}>
            <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 950, fontSize: 62, color: "white", lineHeight: 0.96 }}>ايبا اشرحلهم <span style={{ color: "#ef4444" }}>supply chain attack</span></div>
            <div style={{ marginTop: 8, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.18em", color: "rgba(239,68,68,0.6)", fontWeight: 700 }}>SUPPLY CHAIN — WHERE TRUST BREAKS</div>
          </div>
          <div style={{ width: 72, height: 2, background: "rgba(255,255,255,0.85)", borderRadius: 999, opacity: lineIn, transform: `scaleX(${lineIn})` }} />
          <div dir="rtl" style={{ opacity: subIn, transform: `translateY(${interpolate(subIn, [0, 1], [10, 0])}px)`, fontFamily: "Cairo, sans-serif", fontWeight: 700, fontSize: 28, color: "rgba(255,255,255,0.92)" }}>الشركة تصنع تطبيق عادي ونظيف</div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 6, position: "relative" }}>
            <div style={{ opacity: c1, transform: `translateY(${interpolate(c1, [0, 1], [16, 0])}px) scale(${interpolate(c1, [0, 1], [0.92, 1])})`, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 18, padding: "16px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 190 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🏢</div>
              <div style={{ fontFamily: "Cairo, sans-serif", fontWeight: 900, fontSize: 13, color: "white" }}>الشركة</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "rgba(255,255,255,0.4)" }}>SOURCE • BUILD</div>
              <div style={{ display: "flex", gap: 4, marginTop: 2 }}>{[1, 2, 3].map((k) => <div key={k} style={{ width: 18, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.18)", opacity: c1 }} />)}</div>
            </div>

            <div style={{ position: "relative", width: 64, height: 2, background: "rgba(255,255,255,0.12)", borderRadius: 999, overflow: "hidden", opacity: arr }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, #22c55e, transparent)", transform: `translateX(${interpolate(trail, [0, 1], [-64, 64])}px)`, width: 40, height: 2 }} />
              <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 8, height: 8, borderRadius: 999, background: "#22c55e", boxShadow: "0 0 10px rgba(34,197,94,0.7)", opacity: arr }} />
            </div>
            <div style={{ opacity: c2, transform: `translateY(${interpolate(c2, [0, 1], [16, 0])}px) scale(${interpolate(c2, [0, 1], [0.92, 1])})`, background: "white", borderRadius: 18, padding: "16px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 190, position: "relative", boxShadow: "0 16px 32px rgba(0,0,0,0.35)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "white" }}>📱</div>
              <div style={{ fontFamily: "Cairo, sans-serif", fontWeight: 900, fontSize: 13, color: "#0a0a0a" }}>تطبيق نظيف</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "rgba(0,0,0,0.45)" }}>CLEAN • VERIFIED</div>
              <div style={{ position: "absolute", top: -10, right: -10, width: 28, height: 28, borderRadius: 999, background: "#22c55e", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center", opacity: chk, transform: `scale(${chk})` }}><span style={{ color: "white", fontWeight: 900 }}>✓</span></div>
            </div>
          </div>
          <div style={{ opacity: chk, fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.14em", color: "rgba(34,197,94,0.75)", fontWeight: 700 }}>BUILD PIPELINE • NO MALWARE • SIGNED</div>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  // Scene 4: 540-719 third-party libs
  if (frame < 720) {
    const s = frame - 540;
    const titleIn = spring({ frame: s, fps, config: { damping: 14, stiffness: 130 } });
    const libsIn = spring({ frame: s - 28, fps, config: { damping: 14, stiffness: 130 } });
    const subIn = spring({ frame: s - 18, fps, config: { damping: 16, stiffness: 140 } });
    const pulse = Math.sin(s * 0.1) * 0.5 + 0.5;
    const libs = ["react", "axios", "lodash", "express"];
    return (
      <AbsoluteFill style={{ backgroundColor: "#000" }}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 44px", gap: 18 }}>
          <div dir="rtl" style={{ textAlign: "center", opacity: titleIn, transform: `scale(${interpolate(titleIn, [0, 1], [0.94, 1])})` }}>
            <div style={{ fontFamily: "Cairo, sans-serif", fontWeight: 950, fontSize: 34, color: "white", lineHeight: 1.35 }}>بصح هذا تطبيق كيفه كيف باقي التطبيقات <br />يستخدم <span style={{ color: "#f59e0b", background: "rgba(245,158,11,0.12)", padding: "2px 10px", borderRadius: 10 }}>مكتبات خارجية</span></div>
            <div style={{ marginTop: 8, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.16em", color: "rgba(255,255,255,0.35)", fontWeight: 700 }}>THIRD-PARTY • npm • 1000s OF DEPS</div>
          </div>

          {/* central app + orbiting libs */}
          <div style={{ position: "relative", width: 420, height: 220, opacity: libsIn }}>
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 96, height: 96, borderRadius: 22, background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, boxShadow: "0 14px 28px rgba(0,0,0,0.35)", border: "2px solid rgba(245,158,11,0.25)" }}>📱</div>
            {/* connection lines */}
            <svg style={{ position: "absolute", inset: 0, width: 420, height: 220 }} viewBox="0 0 420 220">
              {[
                { x1: 210, y1: 110, x2: 48, y2: 46 }, { x1: 210, y1: 110, x2: 372, y2: 46 }, { x1: 210, y1: 110, x2: 48, y2: 174 }, { x1: 210, y1: 110, x2: 372, y2: 174 },
              ].map((l, i) => {
                const p = interpolate(libsIn, [0, 1], [0, 1]);
                return <line key={i} x1={l.x1} y1={l.y1} x2={l.x1 + (l.x2 - l.x1) * p} y2={l.y1 + (l.y2 - l.y1) * p} stroke="rgba(245,158,11,0.45)" strokeWidth="2" strokeDasharray="6 6" opacity={0.6 + Math.sin(s * 0.08 + i) * 0.2} />;
              })}
            </svg>
            {libs.map((lib, i) => {
              const pos = [{ x: 18, y: 16 }, { x: 300, y: 16 }, { x: 18, y: 144 }, { x: 300, y: 144 }][i];
              const si = spring({ frame: s - 36 - i * 6, fps, config: { damping: 14, stiffness: 140 } });
              return (
                <div key={lib} style={{ position: "absolute", left: pos.x, top: pos.y, opacity: si, transform: `scale(${interpolate(si, [0, 1], [0.8, 1])})`, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 999, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, boxShadow: `0 0 ${8 + pulse * 8}px rgba(245,158,11,${0.15 + pulse * 0.1})` }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: "#f59e0b" }} />
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 800, fontSize: 12, color: "white" }}>{lib}</span>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>📦</span>
                </div>
              );
            })}
          </div>

          <div dir="rtl" style={{ opacity: subIn, transform: `scale(${interpolate(subIn, [0, 1], [0.94, 1])})`, background: "white", borderRadius: 999, padding: "12px 22px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 32, height: 32, borderRadius: 999, background: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 900 }}>⏱</span>
            <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 900, fontSize: 18, color: "#0a0a0a" }}>باش يوفرو الوقت</span>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(0,0,0,0.45)", fontWeight: 700 }}>90% CODE REUSED</span>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  // Scene 5: 720-959 — clean, simple text-only (fixed messy)
  {
    const s = frame - 720;
    const l1 = interpolate(s, [0, 16], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const l2 = interpolate(s, [38, 52], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const l3 = interpolate(s, [76, 90], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const l4 = interpolate(s, [114, 128], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return (
      <AbsoluteFill style={{ backgroundColor: "#000" }}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 48px", gap: 20 }}>
          <div dir="rtl" style={{ textAlign: "center", opacity: l1, transform: `translateY(${interpolate(l1, [0, 1], [14, 0])}px)` }}>
            <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 900, fontSize: 28, color: "white", lineHeight: 1.4, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "16px 20px" }}>
              والهاكر هنا ميحتاجش يختارق شركة كاملة<br />يكفي انو يختارق <span style={{ color: "#ef4444" }}>library وحده</span>
            </div>
          </div>
          <div dir="rtl" style={{ opacity: l2, transform: `translateY(${interpolate(l2, [0, 1], [10, 0])}px)`, fontFamily: "Cairo, Inter, sans-serif", fontWeight: 800, fontSize: 26, color: "#ef4444", background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.16)", borderRadius: 999, padding: "10px 20px" }}>
            يضيف كود خبيث
          </div>
          <div dir="rtl" style={{ opacity: l3, transform: `translateY(${interpolate(l3, [0, 1], [10, 0])}px)`, background: "white", borderRadius: 999, padding: "12px 22px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 900, fontSize: 18, color: "#0a0a0a" }}>حنا نديرو تحديث للتطبيق و</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 950, fontSize: 22, color: "#ef4444" }}>gg</span>
          </div>
          <div dir="rtl" style={{ opacity: l4, transform: `translateY(${interpolate(l4, [0, 1], [10, 0])}px)`, fontFamily: "Cairo, sans-serif", fontWeight: 700, fontSize: 20, color: "rgba(255,255,255,0.62)", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 12 }}>
            بلا متعرف الشركة اصلا
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }
};
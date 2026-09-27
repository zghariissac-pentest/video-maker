import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Video } from "remotion";

// Uniform icon badge — one style for every icon in the scene
const Badge: React.FC<{ children: React.ReactNode; glow?: string; size?: number }> = ({ children, glow = "rgba(255,255,255,0.14)", size = 96 }) => (
  <div style={{ width: size, height: size, borderRadius: 26, background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 12px 28px rgba(0,0,0,0.45), 0 0 18px ${glow}` }}>
    {children}
  </div>
);

export const AndroidScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);

  // Title + Google badge
  const titleIn = spring({ frame, fps, config: { damping: 16, stiffness: 130 } });
  const gIn = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 140 } });
  const badgeIn = interpolate(frame, [24, 38], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Flow: kernel -> google -> modified (starts 55f)
  const kIn = spring({ frame: frame - 55, fps, config: { damping: 16, stiffness: 140 } });
  const gCardIn = spring({ frame: frame - 75, fps, config: { damping: 16, stiffness: 140 } });
  const modIn = spring({ frame: frame - 105, fps, config: { damping: 16, stiffness: 140 } });
  const flowPkt = interpolate((frame - 85) % 55, [0, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Layer stack (starts 150f)
  const l1 = spring({ frame: frame - 150, fps, config: { damping: 16, stiffness: 140 } });
  const l2 = spring({ frame: frame - 175, fps, config: { damping: 16, stiffness: 140 } });
  const l3 = spring({ frame: frame - 200, fps, config: { damping: 16, stiffness: 140 } });
  const footIn = interpolate(frame, [248, 262], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.66)" }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 36px", gap: 16 }}>
        {/* title with Google G in the same badge style */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: titleIn, transform: `scale(${interpolate(titleIn, [0, 1], [0.92, 1])}) translateY(${interpolate(titleIn, [0, 1], [14, 0])}px)` }}>
          <div style={{ opacity: gIn, transform: `scale(${interpolate(gIn, [0, 1], [0.7, 1])})` }}>
            <Badge glow="rgba(66,133,244,0.45)" size={96}>
              <Img src={staticFile("google-g.png")} style={{ width: 56, height: 56, objectFit: "contain", display: "block" }} />
            </Badge>
          </div>
          <div dir="rtl" style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 950, fontSize: 42, color: "white", lineHeight: 1.3, textShadow: "0 6px 28px rgba(0,0,0,0.7)" }}>
              <span style={{ color: "#60a5fa" }}>google</span> دات نواة لينيكس <span style={{ color: "#22c55e" }}>مفتوحة المصدر</span>
            </div>
            <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 999, padding: "8px 16px", opacity: badgeIn }}>
              <span style={{ fontSize: 14 }}>🔓</span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.14em", color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>OPEN SOURCE • FREE TO TAKE</span>
            </div>
          </div>
        </div>

        {/* flow: kernel -> google -> modified — all badges identical */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ opacity: kIn, transform: `translateX(${interpolate(kIn, [0, 1], [-20, 0])}px) scale(${interpolate(kIn, [0, 1], [0.88, 1])})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <Badge size={96}><span style={{ fontSize: 48 }}>🐧</span></Badge>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 800, color: "#22c55e" }}>LINUX</span>
          </div>
          <div style={{ position: "relative", width: 52, height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 999, overflow: "hidden", opacity: gCardIn }}>
            <div style={{ position: "absolute", top: "50%", left: 0, width: 11, height: 11, borderRadius: 999, background: "#4285F4", boxShadow: "0 0 10px rgba(66,133,244,0.9)", transform: `translate(${flowPkt * 52 - 5.5}px, -50%)` }} />
          </div>
          <div style={{ opacity: gCardIn, transform: `scale(${interpolate(gCardIn, [0, 1], [0.85, 1])})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <Badge glow="rgba(66,133,244,0.4)" size={96}>
              <Img src={staticFile("google-g.png")} style={{ width: 56, height: 56, objectFit: "contain", display: "block" }} />
            </Badge>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 800, color: "#60a5fa" }}>GOOGLE</span>
          </div>
          <div style={{ position: "relative", width: 52, height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 999, overflow: "hidden", opacity: modIn }}>
            <div style={{ position: "absolute", top: "50%", left: 0, width: 11, height: 11, borderRadius: 999, background: "#22c55e", boxShadow: "0 0 10px rgba(34,197,94,0.9)", transform: `translate(${flowPkt * 52 - 5.5}px, -50%)` }} />
          </div>
          <div style={{ opacity: modIn, transform: `scale(${interpolate(modIn, [0, 1], [0.85, 1])})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <Badge glow="rgba(34,197,94,0.45)" size={96}><span style={{ fontSize: 48 }}>🤖</span></Badge>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 800, color: "#22c55e" }}>MODDED</span>
          </div>
          <div dir="rtl" style={{ opacity: modIn, fontFamily: "Cairo, sans-serif", fontWeight: 900, fontSize: 20, color: "white", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 999, padding: "10px 18px" }}>
            عدلتها
          </div>
        </div>

        {/* layer stack — same badge style on every row */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ opacity: l3, transform: `translateY(${interpolate(l3, [0, 1], [24, 0])}px) scale(${interpolate(l3, [0, 1], [0.94, 1])})`, width: "84%", background: "white", borderRadius: "18px 18px 10px 10px", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 16px 32px rgba(0,0,0,0.45)", zIndex: 3 }}>
            <Badge size={56}><span style={{ fontSize: 28 }}>📱</span></Badge>
            <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 900, fontSize: 19, color: "#0a0a0a" }}>الواجهة</span>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(0,0,0,0.45)", fontWeight: 700, marginInlineStart: "auto" }}>UI • APPS</span>
          </div>
          <div style={{ opacity: l2, transform: `translateY(${interpolate(l2, [0, 1], [24, 0])}px) scale(${interpolate(l2, [0, 1], [0.94, 1])})`, width: "92%", background: "#4285F4", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, zIndex: 2, marginTop: -5 }}>
            <Badge size={56}><span style={{ fontSize: 28 }}>🧩</span></Badge>
            <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 900, fontSize: 19, color: "white" }}>framework</span>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(255,255,255,0.8)", fontWeight: 700, marginInlineStart: "auto" }}>ANDROID FRAMEWORK</span>
          </div>
          <div style={{ opacity: l1, transform: `translateY(${interpolate(l1, [0, 1], [24, 0])}px) scale(${interpolate(l1, [0, 1], [0.94, 1])})`, width: "100%", background: "#0a0a0a", border: "1.5px solid rgba(34,197,94,0.4)", borderRadius: "10px 10px 18px 18px", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, zIndex: 1, marginTop: -5 }}>
            <Badge size={56}><span style={{ fontSize: 28 }}>🐧</span></Badge>
            <div dir="rtl" style={{ fontFamily: "Cairo, sans-serif", fontWeight: 900, fontSize: 19, color: "white" }}>
              بنات فوقها <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 800 }}>framework</span> والواجهة
            </div>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#22c55e", fontWeight: 800, marginInlineStart: "auto" }}>MODIFIED LINUX KERNEL</span>
          </div>
        </div>

        <div style={{ opacity: footIn, transform: `translateY(${interpolate(footIn, [0, 1], [8, 0])}px)`, display: "flex", alignItems: "center", gap: 8 }}>
          <Img src={staticFile("google-g.png")} style={{ width: 18, height: 18, objectFit: "contain", display: "block" }} />
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.14em", color: "rgba(255,255,255,0.55)", fontWeight: 700 }}>ANDROID = LINUX + GOOGLE LAYERS</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

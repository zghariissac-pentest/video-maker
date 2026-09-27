import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const KaliBlueLogo: React.FC<{ size?: number }> = ({ size = 340 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: "radial-gradient(130% 130% at 30% 20%, #5ba2ff 0%, #1a73ff 22%, #0a4bd1 58%, #082f8a 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 18px 60px rgba(26,115,255,0.45), 0 4px 18px rgba(0,0,0,0.6), inset 0 2px 10px rgba(255,255,255,0.35)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(80% 60% at 28% 18%, rgba(255,255,255,0.28), transparent 55%)", pointerEvents: "none" }} />
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.08), inset 0 -8px 18px rgba(0,0,0,0.22)", pointerEvents: "none" }} />
    <svg viewBox="0 0 24 24" width={size * 0.68} height={size * 0.68} fill="white" style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.28))", position: "relative", zIndex: 1 }}>
      <path d="M12.778 5.943s-1.97-.13-5.327.92c-3.42 1.07-5.36 2.587-5.36 2.587s5.098-2.847 10.852-3.008zm7.351 3.095l.257-.017s-1.468-1.78-4.278-2.648c1.58.642 2.954 1.493 4.021 2.665zm.42.74c.039-.068.166.217.263.337.004.024.01.039-.045.027-.005-.025-.013-.032-.013-.032s-.135-.08-.177-.137c-.041-.057-.049-.157-.028-.195zm3.448 8.479s.312-3.578-5.31-4.403a18.277 18.277 0 0 0-2.524-.187c-4.506.06-4.67-5.197-1.275-5.462 1.407-.116 3.087.643 4.73 1.408-.007.204.002.385.136.552.134.168.648.35.813.445.164.094.691.43 1.014.85.07-.131.654-.512.654-.512s-.14.003-.465-.119c-.326-.122-.713-.49-.722-.511-.01-.022-.015-.055.06-.07.059-.049-.072-.207-.13-.265-.058-.058-.445-.716-.454-.73-.009-.016-.012-.031-.04-.05-.085-.027-.46.04-.46.04s-.575-.283-.774-.893c.003.107-.099.224 0 .469-.3-.127-.558-.344-.762-.88-.12.305 0 .499 0 .499s-.707-.198-.82-.85c-.124.293 0 .469 0 .469s-1.153-.602-3.069-.61c-1.283-.118-1.55-2.374-1.43-2.754 0 0-1.85-.975-5.493-1.406-3.642-.43-6.628-.065-6.628-.065s6.45-.31 11.617 1.783c.176.785.704 2.094.989 2.723-.815.563-1.733 1.092-1.876 2.97-.143 1.878 1.472 3.53 3.474 3.58 1.9.102 3.214.116 4.806.942 1.52.84 2.766 3.4 2.89 5.703.132-1.709-.509-5.383-3.5-6.498 4.181.732 4.549 3.832 4.549 3.832zM12.68 5.663l-.15-.485s-2.484-.441-5.822-.204C3.37 5.211 0 6.38 0 6.38s6.896-1.735 12.68-.717Z" />
    </svg>
  </div>
);

export const Aw: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene 1: 0-149 Hook (larp award)
  if (frame < 150) {
    const imgIn = spring({ frame, fps, config: { damping: 14, stiffness: 110 } });
    const imgScale = interpolate(imgIn, [0, 1], [0.82, 1]);
    const textIn = interpolate(frame, [18, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const subIn = spring({ frame: frame - 28, fps, config: { damping: 16, stiffness: 120 } });
    const lineIn = interpolate(frame, [42, 54], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return (
      <AbsoluteFill style={{ backgroundColor: "#000" }}>
        <div style={{ position: "absolute", width: 860, height: 860, left: "50%", top: "42%", transform: "translate(-50%, -50%)", background: "radial-gradient(circle, rgba(250,204,21,0.10) 0%, rgba(26,115,255,0.06) 36%, transparent 68%)", opacity: imgIn, pointerEvents: "none" }} />
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 36px" }}>
          <div style={{ opacity: imgIn, transform: `scale(${imgScale})`, willChange: "transform, opacity", filter: "drop-shadow(0 20px 44px rgba(0,0,0,0.65)) drop-shadow(0 0 22px rgba(250,204,21,0.18))" }}>
            <Img src={staticFile("aw-award-cut.png")} style={{ width: 520, height: 520, objectFit: "contain", display: "block" }} />
          </div>
          <div style={{ marginTop: 28, textAlign: "center", opacity: textIn, transform: `translateY(${interpolate(textIn, [0, 1], [14, 0])}px)`, lineHeight: 1 }}>
            <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontWeight: 950, fontSize: 56, letterSpacing: "-0.05em", color: "white", lineHeight: 0.92, textTransform: "lowercase" }}>how to larp into</div>
            <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontWeight: 950, fontSize: 58, letterSpacing: "-0.05em", color: "#facc15", lineHeight: 0.92, marginTop: 6, textTransform: "lowercase", textShadow: "0 0 22px rgba(250,204,21,0.35)" }}>cyber security</div>
            <div style={{ marginTop: 16, width: 160, height: 2, background: "rgba(255,255,255,0.14)", marginLeft: "auto", marginRight: "auto", opacity: lineIn, transform: `scaleX(${lineIn})` }} />
            <div style={{ marginTop: 14, opacity: subIn, transform: `scale(${interpolate(subIn, [0, 1], [0.9, 1])})`, fontFamily: "Cairo, Inter, sans-serif", fontWeight: 900, fontSize: 36, letterSpacing: "-0.02em", color: "white", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.10)", padding: "10px 22px", borderRadius: 999, display: "inline-flex" }}>خطوة بخطوة</div>
            <div style={{ marginTop: 10, opacity: subIn, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.28em", color: "rgba(255,255,255,0.32)", fontWeight: 700, textTransform: "uppercase" }}>STEP BY STEP • NO BULLSHIT</div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  // Scene 2: 150-329 — pick a pfp — title right above pictures, no small text
  if (frame < 330) {
    const s = frame - 150; // 0-179
  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);
  const titleIn = interpolate(s, [0, 14], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const pfps = [
    { file: "aw-pfp1.jpg", label: "mr robot", sub: "elliot • fsociety" },
    { file: "aw-pfp2.jpg", label: "lain", sub: "serial experiments" },
    { file: "aw-pfp3.jpg", label: "tech vibe", sub: "anything related to tech" },
  ];

  const activeIdx = s < 62 ? 0 : s < 118 ? 1 : 2;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* centered column — title right above pictures */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 22, padding: "0 32px" }}>
        {/* title — right above pictures, no small text */}
        <div dir="rtl" style={{ textAlign: "center", opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [10, 0])}px)` }}>
          <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 950, fontSize: 52, color: "white", letterSpacing: "-0.03em", lineHeight: 1, textShadow: "0 4px 24px rgba(0,0,0,0.6)" }}>
            ختار <span style={{ color: "#facc15" }}>pfp</span> تاعك
          </div>
        </div>

        {/* pfp stage — just the pic, label up, normal then funny */}
        <div style={{ width: 560, height: 580, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
          {pfps.map((p, i) => {
            const enterStart = [12, 66, 120][i];
            const enterEnd = enterStart + 14;
            const exitStart = [56, 110, 999][i];
            const exitEnd = exitStart + 14;
            let opacity = 0;
            let scale = 1;

            if (s >= enterStart && s < enterEnd) {
              const t = interpolate(s, [enterStart, enterEnd], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              opacity = t;
              scale = interpolate(t, [0, 1], [0.96, 1]);
            } else if (s >= enterEnd && s < exitStart) {
              opacity = 1;
              scale = 1;
            } else if (s >= exitStart && s < exitEnd) {
              const t = interpolate(s, [exitStart, exitEnd], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              opacity = interpolate(t, [0, 1], [1, 0]);
              scale = interpolate(t, [0, 1], [1, 0.97]);
            } else if (s < enterStart) {
              opacity = 0;
            } else {
              opacity = s >= exitEnd ? 0 : 1;
            }

            if (opacity <= 0) return null;
            return (
              <div
                key={p.label}
                style={{
                  position: "absolute",
                  opacity,
                  transform: `scale(${scale})`,
                  willChange: "transform, opacity",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    background: i === activeIdx ? "#facc15" : "white",
                    padding: "8px 16px",
                    borderRadius: 999,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: "0 8px 18px rgba(0,0,0,0.32)",
                    border: "1px solid rgba(0,0,0,0.04)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: i === activeIdx ? "#0a0a0a" : "#22c55e" }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 15, color: "#0a0a0a", letterSpacing: "-0.02em", textTransform: "lowercase" }}>{p.label}</span>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(0,0,0,0.42)", fontWeight: 700 }}>{p.sub}</span>
                </div>
                <Img
                  src={staticFile(p.file)}
                  style={{
                    width: 460,
                    height: 460,
                    objectFit: "cover",
                    borderRadius: 20,
                    display: "block",
                    boxShadow: "0 16px 36px rgba(0,0,0,0.45)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* dots */}
      <div style={{ position: "absolute", left: "50%", bottom: 96, transform: "translateX(-50%)", display: "flex", gap: 10, opacity: titleIn }}>
        {[0, 1, 2].map((idx) => (
          <div
            key={idx}
            style={{
              width: activeIdx === idx ? 28 : 10,
              height: 10,
              borderRadius: 999,
              background: activeIdx === idx ? "#facc15" : "rgba(255,255,255,0.18)",
              boxShadow: activeIdx === idx ? "0 0 12px rgba(250,204,21,0.45)" : "none",
            }}
          />
        ))}
      </div>

      <div style={{ position: "absolute", bottom: 48, left: 0, right: 0, textAlign: "center", opacity: interpolate(s, [120, 134], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 800, fontSize: 16, color: "rgba(255,255,255,0.58)" }}>خيّر وحدة وبدا تتمهبل 😎</span>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.14em", color: "rgba(255,255,255,0.22)", marginLeft: 12 }}>PICK ONE • START LARPING</span>
      </div>
    </AbsoluteFill>
    );
  }

  // Scene 3: 330-479 — repostsss some random edits
  if (frame < 480) {
    const s = frame - 330; // 0-149
    const SMOOTH2 = Easing.bezier(0.22, 1, 0.36, 1);
    const titleIn3 = interpolate(s, [0, 16], [0, 1], { easing: SMOOTH2, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const gridIn = interpolate(s, [18, 38], [0, 1], { easing: SMOOTH2, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const arabicIn = interpolate(s, [48, 64], [0, 1], { easing: SMOOTH2, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
      <AbsoluteFill style={{ backgroundColor: "#000" }}>
        <div style={{ position: "absolute", top: 64, left: 0, right: 0, textAlign: "center", opacity: titleIn3, transform: `translateY(${interpolate(titleIn3, [0, 1], [12, 0])}px)` }}>
          <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 950, fontSize: 44, letterSpacing: "-0.04em", color: "white", textTransform: "lowercase" }}>repostsss some random edits</div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.28em", color: "rgba(255,255,255,0.28)", marginTop: 6, fontWeight: 700 }}>REPOST RANDOM EDITS • AESTHETIC</div>
        </div>

        {/* 3 pictures — grid */}
        <div style={{ position: "absolute", left: "50%", top: "48%", transform: `translate(-50%, -50%) scale(${interpolate(gridIn, [0, 1], [0.92, 1])})`, width: 840, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, opacity: gridIn }}>
          {[
            { file: "aw-nmap.jpg", rot: -1.5 },
            { file: "aw-jpg13.jpg", rot: 1.2 },
            { file: "aw-brave-lain.jpg", rot: -0.8 },
          ].map((p, i) => {
            const t = interpolate(s, [18 + i * 8, 34 + i * 8], [0, 1], { easing: SMOOTH2, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            if (t <= 0) return null;
            return (
              <div key={p.file} style={{ opacity: t, transform: `translateY(${interpolate(t, [0, 1], [18, 0])}px) rotate(${p.rot}deg) scale(${interpolate(t, [0, 1], [0.92, 1])})` }}>
                <div style={{ background: "white", padding: 8, borderRadius: 18, boxShadow: "0 12px 32px rgba(0,0,0,0.45)" }}>
                  <Img src={staticFile(p.file)} style={{ width: 260, height: 260, objectFit: "cover", borderRadius: 12, display: "block" }} />
                </div>
              </div>
            );
          })}
        </div>

        <div dir="rtl" style={{ position: "absolute", left: 32, right: 32, bottom: 86, textAlign: "center", opacity: arabicIn, transform: `translateY(${interpolate(arabicIn, [0, 1], [12, 0])}px)` }}>
          <div style={{ display: "inline-flex", background: "white", padding: "12px 22px", borderRadius: 999, boxShadow: "0 10px 28px rgba(0,0,0,0.35)" }}>
            <span style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 900, fontSize: 28, color: "#0a0a0a", letterSpacing: "-0.02em" }}>ريبوستي شويا ايديتس</span>
          </div>
        </div>
      </AbsoluteFill>
    );
  }

  // Scene 4: 480-629 — ومتنساش المعروف الذي لا يعرف — kali logo in middle
  {
    const s = frame - 480; // 0-149
    const SMOOTH4 = Easing.bezier(0.22, 1, 0.36, 1);
    const logoIn = spring({ frame: s, fps, config: { damping: 14, stiffness: 110 } });
    const textIn = interpolate(s, [18, 34], [0, 1], { easing: SMOOTH4, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return (
      <AbsoluteFill style={{ backgroundColor: "#000" }}>
        <div style={{ position: "absolute", width: 800, height: 800, left: "50%", top: "46%", transform: "translate(-50%, -50%)", background: "radial-gradient(circle, rgba(26,115,255,0.14) 0%, transparent 62%)", opacity: logoIn, pointerEvents: "none" }} />
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 32, padding: "0 36px" }}>
          <div style={{ opacity: logoIn, transform: `scale(${interpolate(logoIn, [0, 1], [0.78, 1])})`, filter: "drop-shadow(0 18px 42px rgba(0,0,0,0.55))" }}>
            <KaliBlueLogo size={380} />
          </div>
          <div dir="rtl" style={{ textAlign: "center", opacity: textIn, transform: `translateY(${interpolate(textIn, [0, 1], [12, 0])}px)` }}>
            <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 950, fontSize: 48, color: "white", letterSpacing: "-0.03em", lineHeight: 1.2, textShadow: "0 4px 24px rgba(0,0,0,0.6)" }}>
              ومتنساش <span style={{ color: "#facc15" }}>المعروف</span> الذي لا يعرف
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.22em", color: "rgba(255,255,255,0.28)", marginTop: 10, fontWeight: 700 }}>NEVER FORGET THE UNKNOWN FAVOR</div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }
};

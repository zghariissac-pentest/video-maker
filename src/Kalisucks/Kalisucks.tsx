import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Target, FileText, Trash2, ArrowRight } from "lucide-react";

// Blue Kali logo (vector - no white background, fits black)
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

// Real Anonymous mask — PNG with transparent bg
const RealMask: React.FC<{ size?: number }> = ({ size = 190 }) => (
  <Img
    src={staticFile("tools/anonymous_mask.png")}
    style={{
      width: size,
      height: size * 1.24,
      objectFit: "contain",
      filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.65)) drop-shadow(0 2px 10px rgba(0,0,0,0.4))",
    }}
  />
);

export const Kalisucks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scenes:
  // 0-89   Scene1 jpg zoom
  // 90-269 Scene2 logo + email + tiktok
  // 270-419 Scene3 kali tools bunch
  // 420-539 Scene4 debian + mask

  // —— Scene 1 ——
  if (frame < 90) {
    let scale = 1;
    if (frame < 13) scale = 1;
    else if (frame < 23) scale = interpolate(frame, [13, 16, 23], [1, 1.6, 1.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    else if (frame < 36) scale = interpolate(frame, [23, 26, 36], [1.5, 2.05, 1.95], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    else {
      const pulse = Math.sin((frame - 36) * 0.35) * 0.03;
      scale = 2.3 + pulse;
    }
    return (
      <AbsoluteFill style={{ backgroundColor: "#000" }}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div style={{ transform: `scale(${scale})`, willChange: "transform" }}>
            <Img src={staticFile("kalisucks.jpg")} style={{ width: 620, height: 500, objectFit: "contain" }} />
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  // —— Scene 2 ——
  if (frame < 270) {
    const s = frame - 90;
    const logoPop = spring({ frame: s, fps, config: { damping: 14, stiffness: 120 } });
    const logoScale = interpolate(logoPop, [0, 1], [0.42, 1]);
    const logoOpacity = logoPop;
    const moveUp = s >= 30 ? spring({ frame: s - 30, fps, config: { damping: 18, stiffness: 110 } }) : 0;
    const logoY = interpolate(moveUp, [0, 1], [0, -310]);
    const logoScale2 = interpolate(moveUp, [0, 1], [1, 0.82]);
    const glow = s < 30 ? interpolate(logoPop, [0, 1], [0, 0.45]) : 0.12 + Math.sin(s * 0.08) * 0.04;
    const emailIn = spring({ frame: s - 42, fps, config: { damping: 18, stiffness: 110 } });
    const emailY = interpolate(emailIn, [0, 1], [60, 0]);
    const emailOpacity = emailIn;
    const headerIn = interpolate(s, [58, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const row1In = interpolate(s, [68, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const row2In = interpolate(s, [76, 88], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const replyIn = spring({ frame: s - 92, fps, config: { damping: 17, stiffness: 140 } });
    const typingIn = interpolate(s, [110, 145], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const cursorOn = s % 14 < 7 && s >= 110;
    const stupidIn = interpolate(s, [148, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const words = ["هذا", "الرياكشن", "كي", "تشوف", "واحد", "مخلي", "KALI", "نظام", "اساسي،", "ويريبوندي", "على", "ايميل"];
    const captionStart = 56;
    const wordDur = 9;
    const rawIdx = Math.floor((s - captionStart) / wordDur);
    const activeIdx = Math.max(-1, Math.min(words.length - 1, rawIdx));
    const captionOpacity = interpolate(s, [captionStart - 8, captionStart], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
      <AbsoluteFill style={{ backgroundColor: "#000" }}>
        <div style={{ position: "absolute", width: 780, height: 780, left: "50%", top: `calc(50% + ${logoY}px)`, transform: "translate(-50%, -50%)", background: `radial-gradient(circle, rgba(26,115,255,${glow}) 0%, transparent 68%)`, opacity: logoOpacity, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%, -50%) translateY(${logoY}px) scale(${logoScale * logoScale2})`, opacity: logoOpacity, willChange: "transform, opacity", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <KaliBlueLogo size={s >= 30 ? 300 : 380} />
          <div style={{ opacity: moveUp, transform: `translateY(${interpolate(moveUp, [0, 1], [8, 0])}px)`, display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", padding: "6px 14px", borderRadius: 999 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.14em", color: "rgba(255,255,255,0.72)", fontWeight: 700 }}>KALI LINUX • RUNNING</span>
          </div>
        </div>
        <div style={{ position: "absolute", left: "50%", top: "57%", transform: `translate(-50%, -50%) translateY(${emailY}px)`, opacity: emailOpacity, width: "min(880px, calc(100% - 32px))", willChange: "transform, opacity" }}>
          <div style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 22, overflow: "hidden", boxShadow: "0 18px 48px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)" }}>
            <div style={{ display: "flex", height: 4 }}><div style={{ flex: 1, background: "#4285f4" }} /><div style={{ flex: 1, background: "#ea4335" }} /><div style={{ flex: 1, background: "#fbbc04" }} /><div style={{ flex: 1, background: "#34a853" }} /></div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", opacity: headerIn, transform: `translateY(${interpolate(headerIn, [0, 1], [8, 0])}px)` }}>
              <Img src={staticFile("assets/kalimain/gmail.svg")} style={{ width: 30, height: 30, objectFit: "contain" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 18, color: "rgba(255,255,255,0.88)" }}>Gmail</span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(255,255,255,0.32)" }}>• Inbox</span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 800, background: "#ea4335", color: "white", padding: "2px 8px", borderRadius: 999 }}>2 NEW</span>
              <div style={{ marginLeft: "auto", width: 190, height: 30, borderRadius: 999, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", padding: "0 12px", gap: 8 }}>
                <span style={{ color: "#6b7280", fontSize: 12 }}>⌕</span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(255,255,255,0.28)" }}>Search mail</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 22, padding: "10px 18px 0", opacity: headerIn }}>
              {[{ t: "Primary", n: "2", active: true }, { t: "Social", n: "14", active: false }, { t: "Promotions", n: "99+", active: false }].map((c) => (
                <div key={c.t} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, paddingBottom: 8 }}>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, fontWeight: c.active ? 800 : 400, color: c.active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.32)" }}>{c.t}</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, padding: "2px 6px", borderRadius: 999, background: c.active ? "#ea4335" : "rgba(255,255,255,0.08)", color: c.active ? "white" : "rgba(255,255,255,0.4)" }}>{c.n}</span>
                  </div>
                  <div style={{ height: 2, width: "100%", background: c.active ? "#ea4335" : "transparent", borderRadius: 999 }} />
                </div>
              ))}
            </div>
            <div style={{ padding: "10px 14px 0" }}>
              <div style={{ display: "flex", gap: 12, padding: "14px 14px", borderRadius: 14, background: "rgba(54,123,240,0.08)", border: "1px solid rgba(54,123,240,0.14)", alignItems: "center", opacity: row1In, transform: `translateY(${interpolate(row1In, [0, 1], [10, 0])}px)` }}>
                <div style={{ width: 38, height: 38, borderRadius: 999, background: "#367bf0", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "JetBrains Mono, monospace", fontWeight: 800, fontSize: 13 }}>B</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.9)" }}>boss@work.dz</span><span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 8, letterSpacing: "0.12em", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", padding: "2px 6px", borderRadius: 999 }}>WORK</span><span style={{ marginLeft: "auto", fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(255,255,255,0.32)" }}>09:41</span></div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.88)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>رد عاجل: تقرير اليوم ؟</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.42)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>نحتاج الرد على الإيميل قبل الظهر...</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, padding: "14px 14px", borderRadius: 14, alignItems: "center", opacity: row2In, transform: `translateY(${interpolate(row2In, [0, 1], [10, 0])}px)`, border: "1px solid transparent" }}>
                <div style={{ width: 38, height: 38, borderRadius: 999, background: "#7a5af5", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "JetBrains Mono, monospace", fontWeight: 800, fontSize: 13 }}>N</div>
                <div style={{ flex: 1 }}><div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>newsletter@dev.to</div><div style={{ height: 8, width: "68%", background: "rgba(255,255,255,0.08)", borderRadius: 999, marginTop: 6 }} /></div>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(255,255,255,0.25)" }}>08:15</span>
              </div>
            </div>
            <div style={{ margin: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 14, opacity: replyIn, transform: `translateY(${interpolate(replyIn, [0, 1], [12, 0])}px) scale(${interpolate(replyIn, [0, 1], [0.98, 1])})` }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(255,255,255,0.32)" }}>To: <span style={{ color: "rgba(255,255,255,0.68)" }}>boss@work.dz</span> <span style={{ color: "rgba(255,255,255,0.22)" }}>• Re: رد عاجل</span></div>
              <div style={{ marginTop: 10, minHeight: 32, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.01em" }}>{typingIn > 0 ? "Thanks! Got it — replying from Kali".slice(0, Math.floor(typingIn * 34)) : "Reply..."}</span>
                {cursorOn && <span style={{ width: 2, height: 16, background: "rgba(255,255,255,0.6)", display: "inline-block" }} />}
                <span style={{ marginLeft: "auto", color: "#6b7280", fontSize: 14 }}>➤</span>
              </div>
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 12, opacity: 0.9 }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#6b7280" }}>B</span><span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#6b7280", fontStyle: "italic" }}>I</span><span style={{ color: "#6b7280", fontSize: 12 }}>📎</span><span style={{ color: "#6b7280", fontSize: 12 }}>😊</span><span style={{ marginLeft: "auto", fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "rgba(255,255,255,0.22)" }}>Gmail • formatting</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 14, textAlign: "center", opacity: stupidIn, transform: `translateY(${interpolate(stupidIn, [0, 1], [8, 0])}px)` }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 20, color: "white", letterSpacing: "-0.02em" }}>Using <span style={{ color: "#60a5fa" }}>Kali</span> just to check emails?</div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.18em", color: "rgba(255,255,255,0.28)", marginTop: 4, textTransform: "uppercase" }}>COMPLETELY STUPID.</div>
          </div>
        </div>
        <div style={{ position: "absolute", left: 32, right: 32, bottom: 62, display: "flex", justifyContent: "center", pointerEvents: "none", opacity: captionOpacity }}>
          <div dir="rtl" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 14px", maxWidth: 920, padding: "18px 22px", background: "rgba(15,15,15,0.92)", borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 12px 36px rgba(0,0,0,0.6)" }}>
            {words.map((w, i) => {
              const isActive = i === activeIdx && s >= captionStart;
              const isPast = i < activeIdx;
              const pop = isActive ? interpolate(s, [captionStart + i * wordDur, captionStart + i * wordDur + 4], [0.92, 1.12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
              return (<span key={i + w} style={{ fontFamily: w === "KALI" ? "Inter, sans-serif" : "Cairo, Inter, sans-serif", fontWeight: isActive ? 950 : 800, fontSize: w === "KALI" ? 36 : 38, lineHeight: 1, color: isActive ? "#facc15" : isPast ? "rgba(255,255,255,0.38)" : "white", transform: `scale(${pop})`, textShadow: isActive ? "0 0 14px rgba(250,204,21,0.85), 0 2px 10px rgba(0,0,0,0.8)" : "0 2px 8px rgba(0,0,0,0.55)", WebkitTextStroke: isActive ? "1px rgba(250,204,21,0.25)" : "none", display: "inline-block", letterSpacing: w === "KALI" ? "-0.04em" : "-0.02em" }}>{w}</span>);
            })}
          </div>
        </div>
      </AbsoluteFill>
    );
  }

  // —— Scene 3 —— kali حزمة tools برك — logo middle tools flying around
  if (frame < 420) {
    const s = frame - 270; // 0-149
    const titleIn = interpolate(s, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const logoIn = spring({ frame: s - 12, fps, config: { damping: 14, stiffness: 110 } });
    const subIn = interpolate(s, [28, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    const tools: { label: string; bg: string; icon: string; size?: number }[] = [
      { label: "Burp Suite", bg: "#ffffff", icon: "tools/burpsuite.svg", size: 54 },
      { label: "Wireshark", bg: "#ffffff", icon: "tools/wireshark.svg", size: 48 },
      { label: "Nmap", bg: "#ffffff", icon: "tools/nmap.png", size: 62 },
      { label: "Metasploit", bg: "#ffffff", icon: "tools/metasploit.svg", size: 52 },
      { label: "Hashcat", bg: "#ffffff", icon: "tools/hashcat.svg", size: 48 },
      { label: "ExploitDB", bg: "#ffffff", icon: "tools/exploitdb.png", size: 56 },
      { label: "HackTheBox", bg: "#ffffff", icon: "tools/hackthebox.svg", size: 54 },
    ];

    return (
      <AbsoluteFill style={{ backgroundColor: "#000" }}>
        {/* title — big clean like other videos */}
        <div style={{ position: "absolute", top: 110, left: 0, right: 0, textAlign: "center", opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [12, 0])}px)` }}>
          <div dir="rtl" style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 950, fontSize: 58, color: "white", letterSpacing: "-0.03em", lineHeight: 1 }}>
            كالي <span style={{ color: "#60a5fa" }}>حزمة tools</span> برك
          </div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, letterSpacing: "0.32em", color: "rgba(255,255,255,0.32)", marginTop: 10, textTransform: "uppercase" }}>JUST A BUNCH OF TOOLS</div>
        </div>

        {/* centre logo */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) scale(${interpolate(logoIn, [0, 1], [0.7, 1])})`,
            opacity: logoIn,
            willChange: "transform",
          }}
        >
          <KaliBlueLogo size={300} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.08)", pointerEvents: "none" }} />
        </div>

        {/* orbiting tools */}
        {tools.map((t, i) => {
          const baseAngle = (i / tools.length) * Math.PI * 2;
          // staggered entrance
          const enter = spring({ frame: s - 22 - i * 4, fps, config: { damping: 16, stiffness: 120 } });
          if (enter <= 0) return null;
          const orbitSpeed = 0.016; // radians per frame
          const angle = baseAngle + s * orbitSpeed;
          const radius = 285 + (i % 2) * 42 + Math.sin(s * 0.06 + i) * 6;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius * 0.92; // slight ellipse
          const scale = interpolate(enter, [0, 1], [0.5, 1]) * (1 + Math.sin(s * 0.08 + i) * 0.04);
          return (
            <div
              key={t.label}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
                opacity: enter,
                willChange: "transform",
              }}
            >
              <div
                style={{
                  width: 94,
                  height: 94,
                  borderRadius: 22,
                  background: t.bg,
                  border: "1px solid rgba(255,255,255,0.14)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 28px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
                  position: "relative",
                  overflow: "hidden",
                  padding: 10,
                }}
              >
                <Img src={staticFile(t.icon)} style={{ width: t.size ?? 54, height: t.size ?? 54, objectFit: "contain" }} />
              </div>
              {/* label pill under icon */}
              <div style={{ position: "absolute", top: 92, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.72)", border: "1px solid rgba(255,255,255,0.08)", padding: "3px 8px", borderRadius: 999, whiteSpace: "nowrap" }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.72)", letterSpacing: "0.06em" }}>{t.label.toUpperCase()}</span>
              </div>
            </div>
          );
        })}

        {/* orbit rings subtle */}
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 570, height: 570, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", transform: "translate(-50%, -50%)", opacity: interpolate(s, [20, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 670, height: 670, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", transform: "translate(-50%, -50%)", opacity: interpolate(s, [28, 48], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />

        {/* sub caption */}
        <div dir="rtl" style={{ position: "absolute", bottom: 84, left: 32, right: 32, textAlign: "center", opacity: subIn, transform: `translateY(${interpolate(subIn, [0, 1], [10, 0])}px)` }}>
          <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 800, fontSize: 26, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.02em" }}>
            مجرد أدوات مجمعة — <span style={{ color: "#facc15" }}>مش نظام سحري</span>
          </div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.14em", color: "rgba(255,255,255,0.28)", marginTop: 6 }}>BUNCH OF PREINSTALLED TOOLS • NOT MAGIC</div>
        </div>
      </AbsoluteFill>
    );
  }

  // —— Scene 4 —— debian wearing anonymous mask — حرفيا debian مونطي قناع انونيموس
  if (frame < 540) {
    const s = frame - 420; // 0-119
    const debianIn = spring({ frame: s, fps, config: { damping: 14, stiffness: 110 } });
    const debianScale = interpolate(debianIn, [0, 1], [0.6, 1]);
    const maskIn = spring({ frame: s - 22, fps, config: { damping: 12, stiffness: 90 } });
    const maskY = interpolate(maskIn, [0, 1], [80, 0]);
    const maskRotate = interpolate(maskIn, [0, 1], [-8, 0]);
    const titleIn = interpolate(s, [40, 58], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const subIn = interpolate(s, [56, 72], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const revealIn = interpolate(s, [72, 88], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
      <AbsoluteFill style={{ backgroundColor: "#000" }}>
        {/* glow */}
        <div style={{ position: "absolute", width: 760, height: 760, left: "50%", top: "44%", transform: "translate(-50%, -50%)", background: "radial-gradient(circle, rgba(214,10,83,0.18) 0%, transparent 68%)", opacity: debianIn }} />

        {/* Debian base */}
        <div style={{ position: "absolute", left: "50%", top: "42%", transform: `translate(-50%, -50%) scale(${debianScale})`, opacity: debianIn, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: 360,
              height: 360,
              borderRadius: "50%",
              background: "radial-gradient(120% 120% at 30% 20%, #ff4d7a 0%, #d60a53 32%, #9a0c3a 68%, #5a0a24 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 18px 60px rgba(214,10,83,0.38), inset 0 2px 12px rgba(255,255,255,0.22)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(70% 50% at 28% 16%, rgba(255,255,255,0.22), transparent 58%)", pointerEvents: "none" }} />
            <Img src={staticFile("assets/distros/debian.svg")} style={{ width: 220, height: 220, objectFit: "contain", filter: "brightness(0) invert(1) drop-shadow(0 4px 12px rgba(0,0,0,0.35))", position: "relative", zIndex: 1 }} />
          </div>
          <div style={{ marginTop: 14, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", padding: "7px 16px", borderRadius: 999, display: "flex", alignItems: "center", gap: 8, opacity: debianIn }}>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.85)", letterSpacing: "0.1em" }}>DEBIAN</span>
            <span style={{ color: "rgba(255,255,255,0.22)" }}>•</span>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>STABLE</span>
          </div>
        </div>

        {/* Anonymous mask overlay — REAL mask PNG */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "42%",
            transform: `translate(-50%, -50%) translateY(${maskY}px) rotate(${maskRotate}deg)`,
            opacity: maskIn,
            willChange: "transform, opacity",
            zIndex: 2,
          }}
        >
          <div style={{ transform: "translate(62px, -22px) rotate(12deg)" }}>
            <RealMask size={182} />
          </div>
        </div>

        {/* equal sign and revelation */}
        <div style={{ position: "absolute", left: "50%", bottom: 170, transform: "translateX(-50%)", opacity: revealIn, display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", padding: "10px 18px", borderRadius: 999 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 18, color: "white" }}>KALI</span>
          <span style={{ color: "rgba(255,255,255,0.32)", fontSize: 18 }}>=</span>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, fontWeight: 800, color: "#ff4d7a" }}>DEBIAN</span>
          <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>+</span>
          <span style={{ fontSize: 16 }}>🎭</span>
        </div>

        {/* big text — حرفيا debian مونطي قناع انونيموس */}
        <div dir="rtl" style={{ position: "absolute", left: 28, right: 28, bottom: 64, textAlign: "center", opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [14, 0])}px)` }}>
          <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 950, fontSize: 52, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, textShadow: "0 4px 24px rgba(0,0,0,0.6)" }}>
            حرفيا <span style={{ color: "#ff4d7a" }}>debian</span> مونطي
            <br />
            <span style={{ color: "#facc15" }}>قناع انونيموس</span>
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, letterSpacing: "0.18em", color: "rgba(255,255,255,0.32)", marginTop: 12, textTransform: "uppercase", opacity: subIn, transform: `translateY(${interpolate(subIn, [0, 1], [6, 0])}px)` }}>
            LITERALLY DEBIAN WEARING AN ANONYMOUS MASK
          </div>
        </div>
      </AbsoluteFill>
    );
  }

  // —— Scene 5 —— داروه باش تختارق , تكتب report تاعك وتمحي / مشي باش تستعملو كل يوم
  if (frame < 690) {
    const s = frame - 540; // 0-149
    const topIn = interpolate(s, [0, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const line1In = interpolate(s, [14, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const line2In = interpolate(s, [30, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const line3In = interpolate(s, [46, 62], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const step1 = spring({ frame: s - 62, fps, config: { damping: 16, stiffness: 120 } });
    const step2 = spring({ frame: s - 72, fps, config: { damping: 16, stiffness: 120 } });
    const step3 = spring({ frame: s - 82, fps, config: { damping: 16, stiffness: 120 } });
    const crossIn = interpolate(s, [108, 124], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const bottomIn = interpolate(s, [118, 134], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    const StepCard: React.FC<{ Icon: React.FC<any>; label: string; sub: string; active: number; color: string }> = ({ Icon, label, sub, active, color }) => (
      <div
        style={{
          width: 310,
          background: active > 0.4 ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${active > 0.4 ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.07)"}`,
          borderRadius: 24,
          padding: "26px 20px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          opacity: active,
          transform: `translateY(${interpolate(active, [0, 1], [22, 0])}px) scale(${interpolate(active, [0, 1], [0.94, 1])})`,
          boxShadow: active > 0.4 ? `0 16px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)` : "0 8px 24px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            width: 78,
            height: 78,
            borderRadius: 20,
            background: active > 0.4 ? color : "rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: active > 0.4 ? `0 8px 22px ${color}55` : "none",
          }}
        >
          <Icon size={34} color={active > 0.4 ? "white" : "rgba(255,255,255,0.38)"} strokeWidth={1.9} />
        </div>
        <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 900, fontSize: 28, color: active > 0.4 ? "#0a0a0a" : "rgba(255,255,255,0.62)", letterSpacing: "-0.02em", textAlign: "center", lineHeight: 1 }}>{label}</div>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", color: active > 0.4 ? color : "rgba(255,255,255,0.24)", textTransform: "uppercase", textAlign: "center", background: active > 0.4 ? color + "18" : "transparent", padding: active > 0.4 ? "4px 10px" : "0", borderRadius: 999 }}>{sub}</div>
      </div>
    );

    return (
      <AbsoluteFill style={{ backgroundColor: "#000" }}>
        {/* top label */}
        <div style={{ position: "absolute", top: 78, left: 0, right: 0, textAlign: "center", opacity: topIn, transform: `translateY(${interpolate(topIn, [0, 1], [10, 0])}px)` }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, letterSpacing: "0.38em", color: "rgba(255,255,255,0.28)", fontWeight: 700, textTransform: "uppercase" }}>KALI PURPOSE • NOT DAILY DRIVER</span>
        </div>

        {/* big Arabic — 3 lines, big clean like previous */}
        <div dir="rtl" style={{ position: "absolute", top: 118, left: 32, right: 32, textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Cairo, Inter, sans-serif",
              fontWeight: 950,
              fontSize: 52,
              color: "white",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              opacity: line1In,
              transform: `translateY(${interpolate(line1In, [0, 1], [14, 0])}px)`,
              textShadow: "0 4px 24px rgba(0,0,0,0.6)",
            }}
          >
            داروه باش <span style={{ color: "#ef4444" }}>تختارق</span>
          </div>
          <div
            style={{
              fontFamily: "Cairo, Inter, sans-serif",
              fontWeight: 900,
              fontSize: 44,
              color: "rgba(255,255,255,0.92)",
              letterSpacing: "-0.02em",
              marginTop: 6,
              opacity: line2In,
              transform: `translateY(${interpolate(line2In, [0, 1], [14, 0])}px)`,
            }}
          >
            تكتب <span style={{ color: "#facc15", background: "rgba(250,204,21,0.12)", padding: "2px 10px", borderRadius: 8 }}>report</span> تاعك وتمحي
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginTop: 14,
              background: "rgba(239,68,68,0.10)",
              border: "1px solid rgba(239,68,68,0.22)",
              padding: "10px 18px",
              borderRadius: 999,
              opacity: line3In,
              transform: `translateY(${interpolate(line3In, [0, 1], [12, 0])}px) scale(${interpolate(line3In, [0, 1], [0.96, 1])})`,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "#ef4444", boxShadow: "0 0 8px #ef4444" }} />
            <span dir="rtl" style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 950, fontSize: 28, color: "#ef4444", letterSpacing: "-0.02em" }}>
              مشي باش تستعملو كل يوم
            </span>
          </div>
        </div>

        {/* 3-step workflow — cleaner with real icons and animated connectors */}
        <div style={{ position: "absolute", left: 0, right: 0, top: "54%", display: "flex", justifyContent: "center", alignItems: "center", gap: 0, padding: "0 18px" }}>
          <StepCard Icon={Target} label="تختارق" sub="EXPLOIT" active={step1} color="#ef4444" />
          {/* connector 1 */}
          <div style={{ width: 56, height: 2, margin: "0 6px", background: "rgba(255,255,255,0.08)", borderRadius: 999, position: "relative", overflow: "hidden", opacity: step2 }}>
            <div style={{ position: "absolute", inset: 0, background: "#facc15", transform: `scaleX(${interpolate(step2, [0, 1], [0, 1])})`, transformOrigin: "left", opacity: step2 }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%, -50%) translateX(${interpolate(step2, [0, 1], [-10, 0])}px)`, opacity: step2 }}>
              <ArrowRight size={14} color="white" strokeWidth={2.5} />
            </div>
          </div>
          <StepCard Icon={FileText} label="تكتب report" sub="DOCUMENT" active={step2} color="#eab308" />
          <div style={{ width: 56, height: 2, margin: "0 6px", background: "rgba(255,255,255,0.08)", borderRadius: 999, position: "relative", overflow: "hidden", opacity: step3 }}>
            <div style={{ position: "absolute", inset: 0, background: "#22c55e", transform: `scaleX(${interpolate(step3, [0, 1], [0, 1])})`, transformOrigin: "left", opacity: step3 }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%, -50%) translateX(${interpolate(step3, [0, 1], [-10, 0])}px)`, opacity: step3 }}>
              <ArrowRight size={14} color="white" strokeWidth={2.5} />
            </div>
          </div>
          <StepCard Icon={Trash2} label="تمحي" sub="WIPE" active={step3} color="#22c55e" />
        </div>

        {/* bottom emphasis — cleaner */}
        <div style={{ position: "absolute", left: "50%", top: "76.5%", transform: "translateX(-50%)", opacity: crossIn, display: "flex", alignItems: "center", gap: 10, background: "white", padding: "10px 18px", borderRadius: 999, boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "#ef4444" }} />
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", color: "#0a0a0a" }}>NOT FOR DAILY USE</span>
          <span style={{ color: "rgba(0,0,0,0.18)", fontWeight: 300 }}>|</span>
          <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, fontWeight: 800, color: "#0a0a0a" }}>مشي للاستعمال اليومي</span>
        </div>

        {/* bottom clean */}
        <div dir="rtl" style={{ position: "absolute", bottom: 62, left: 32, right: 32, textAlign: "center", opacity: bottomIn, transform: `translateY(${interpolate(bottomIn, [0, 1], [8, 0])}px)` }}>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.16em", color: "rgba(255,255,255,0.26)", textTransform: "uppercase" }}>USE → REPORT → WIPE • REPEAT NEXT ENGAGEMENT</div>
        </div>
      </AbsoluteFill>
    );
  }

  // —— Scene 6 —— قوللنا نظام لتستخدمو يوميا في التعليقات — all OS logos
  {
    const s = frame - 690; // 0-149
    const titleIn = interpolate(s, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const subIn = interpolate(s, [16, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const gridIn = spring({ frame: s - 28, fps, config: { damping: 14, stiffness: 100 } });
    const commentIn = spring({ frame: s - 68, fps, config: { damping: 16, stiffness: 120 } });
    const pulse = 1 + Math.sin(s * 0.12) * 0.015;

    const osList = [
      { file: "assets/distros/kalilinux.svg", name: "Kali" },
      { file: "assets/distros/debian.svg", name: "Debian" },
      { file: "assets/distros/archlinux.svg", name: "Arch" },
      { file: "assets/distros/ubuntu.svg", name: "Ubuntu" },
      { file: "assets/distros/fedora.svg", name: "Fedora" },
      { file: "assets/distros/linuxmint.svg", name: "Mint" },
      { file: "assets/distros/manjaro.svg", name: "Manjaro" },
      { file: "assets/distros/opensuse.svg", name: "openSUSE" },
      { file: "assets/distros/popos.svg", name: "Pop!_OS" },
      { file: "assets/distros/tails.svg", name: "Tails" },
      { file: "assets/distros/gentoo.svg", name: "Gentoo" },
      { file: "assets/distros/centos.svg", name: "CentOS" },
    ];

    return (
      <AbsoluteFill style={{ backgroundColor: "#000" }}>
        {/* glow */}
        <div style={{ position: "absolute", width: 900, height: 900, left: "50%", top: "42%", transform: "translate(-50%, -50%)", background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 62%)", opacity: gridIn }} />

        {/* title — big */}
        <div dir="rtl" style={{ position: "absolute", top: 92, left: 32, right: 32, textAlign: "center", opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [14, 0])}px) scale(${interpolate(titleIn, [0, 1], [0.96, 1])})` }}>
          <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 950, fontSize: 54, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            قوللنا <span style={{ color: "#60a5fa" }}>نظام</span> لتستخدمو يوميا
          </div>
          <div style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 900, fontSize: 44, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.02em", marginTop: 6, opacity: subIn, transform: `translateY(${interpolate(subIn, [0, 1], [12, 0])}px)` }}>
            في <span style={{ color: "#facc15" }}>التعليقات</span>
          </div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.22em", color: "rgba(255,255,255,0.26)", marginTop: 12, opacity: subIn }}>TELL US YOUR DAILY OS IN COMMENTS</div>
        </div>

        {/* OS grid */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) translateY(18px) scale(${interpolate(gridIn, [0, 1], [0.92, 1]) * pulse})`,
            opacity: gridIn,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
            width: 720,
          }}
        >
          {osList.map((os, i) => {
            const d = spring({ frame: s - 34 - i * 3, fps, config: { damping: 16, stiffness: 140 } });
            if (d <= 0) return null;
            return (
              <div
                key={os.name}
                style={{
                  background: "white",
                  borderRadius: 20,
                  height: 140,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 10px 28px rgba(0,0,0,0.45)",
                  opacity: d,
                  transform: `scale(${interpolate(d, [0, 1], [0.7, 1])}) translateY(${interpolate(d, [0, 1], [16, 0])}px)`,
                }}
              >
                <Img src={staticFile(os.file)} style={{ width: 56, height: 56, objectFit: "contain" }} />
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", color: "rgba(0,0,0,0.62)", textTransform: "uppercase" }}>{os.name}</span>
              </div>
            );
          })}
          {/* extra row center: Windows + Tux */}
          <div
            style={{
              gridColumn: "1 / span 4",
              display: "flex",
              justifyContent: "center",
              gap: 14,
              marginTop: 2,
              opacity: gridIn,
            }}
          >
            {[
              { file: "assets/distros/windows-real.png", name: "Windows" },
              { file: "assets/distros/linux-tux.png", name: "Tux" },
            ].map((os, i) => {
              const d = spring({ frame: s - 70 - i * 4, fps, config: { damping: 16, stiffness: 140 } });
              return (
                <div
                  key={os.name}
                  style={{
                    width: 168,
                    height: 102,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 18,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    opacity: d,
                    transform: `scale(${interpolate(d, [0, 1], [0.8, 1])})`,
                  }}
                >
                  <Img src={staticFile(os.file)} style={{ width: 44, height: 44, objectFit: "contain", filter: os.file.includes("windows") ? "none" : "none" }} />
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.55)" }}>{os.name.toUpperCase()}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* comment CTA */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 62,
            transform: `translateX(-50%) translateY(${interpolate(commentIn, [0, 1], [16, 0])}px)`,
            opacity: commentIn,
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "white",
            padding: "14px 20px",
            borderRadius: 999,
            boxShadow: "0 12px 36px rgba(0,0,0,0.45)",
            width: 560,
            maxWidth: "calc(100% - 40px)",
          }}
        >
          <div style={{ width: 36, height: 36, borderRadius: 999, background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 900, fontSize: 14 }}>💬</div>
          <span style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 800, fontSize: 17, color: "#0a0a0a", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>قوللنا 👇</span>
          <div style={{ flex: 1, height: 34, background: "rgba(0,0,0,0.06)", borderRadius: 999, display: "flex", alignItems: "center", padding: "0 14px" }}>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "rgba(0,0,0,0.32)" }}>Comment...</span>
          </div>
          <div style={{ background: "#0a0a0a", color: "white", padding: "8px 14px", borderRadius: 999, fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 13 }}>نتمرو 😈</div>
        </div>
      </AbsoluteFill>
    );
  }
};

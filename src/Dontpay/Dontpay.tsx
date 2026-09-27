import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence } from "remotion";
import { CYBER, FONT } from "../profx/Theme";
import { Icon } from "../icons/Icon";

const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 18, stiffness: 90, mass: 0.9 } });
  const opacity = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(s, [0, 1], [0.92, 1]);
  const blur = interpolate(frame, [0, 22], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(s, [0, 1], [18, 0]);

  const textS = spring({ frame: frame - 34, fps, config: { damping: 16, stiffness: 120 } });
  const textY = interpolate(textS, [0, 1], [14, 0]);

  return (
    <AbsoluteFill style={{ background: "#000000", overflow: "hidden" }}>
      <AbsoluteFill style={{ background: `radial-gradient(900px 700px at 50% 42%, rgba(124,92,253,0.10), transparent 62%), radial-gradient(700px 500px at 50% 95%, rgba(255,255,255,0.04), transparent 70%)`, opacity: 0.9 }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 88% 78% at 50% 50%, transparent 64%, rgba(0,0,0,0.62) 100%)` }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", display: "flex", padding: 0, flexDirection: "column", gap: 0 }}>
        <div style={{ width: 1080, height: 1560, display: "flex", justifyContent: "center", alignItems: "center", opacity, transform: `translateY(${y}px) scale(${scale})`, filter: blur > 0.5 ? `blur(${blur}px)` : `drop-shadow(0 0 28px rgba(255,255,255,0.06))` }}>
          <Img src={staticFile("dontpay/first.png")} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "50% 40%" }} />
        </div>
        <div
          style={{
            marginTop: -40,
            opacity: textS as unknown as number,
            transform: `translateY(${textY}px)`,
            background: "rgba(0,0,0,0.62)",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "14px 22px",
            borderRadius: 16,
            backdropFilter: "blur(8px)",
            textAlign: "center",
            direction: "rtl",
            maxWidth: 980,
          }}
        >
          <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 36, fontWeight: 900, color: "#FFFFFF", lineHeight: 1.3, textShadow: "0 0 14px rgba(255,255,255,0.12)" }}>
            اكثر كلمة راح تسمعها كي تبدا تعلم <span style={{ color: CYBER.cyan, fontWeight: 900, background: "rgba(34,211,238,0.16)", padding: "4px 14px", borderRadius: 999, border: "1px solid rgba(34,211,238,0.24)", fontSize: 34 }}>cyber security</span>
          </div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,255,255,0.38)", marginTop: 6 }}>THE MOST HEARD PHRASE</div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(180deg, transparent 72%, rgba(0,0,0,0.45) 100%)`, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};

const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 16, stiffness: 140 } });
  const scale = interpolate(s, [0, 1], [0.92, 1]);
  const y = interpolate(s, [0, 1], [16, 0]);
  const textS = spring({ frame: frame - 12, fps, config: { damping: 16, stiffness: 120 } });
  return (
    <AbsoluteFill style={{ background: "#000000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 20px", gap: 0 }}>
      <div style={{ width: 760, height: 800, borderRadius: 28, overflow: "hidden", background: "#ffffff", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 24px 60px rgba(0,0,0,0.6)", opacity: s as unknown as number, transform: `translateY(${y}px) scale(${scale})`, display: "flex", justifyContent: "center", alignItems: "center", padding: 12 }}>
        <Img src={staticFile("dontpay/scene3.jpg")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div style={{ marginTop: 24, opacity: textS as unknown as number, transform: `translateY(${interpolate(textS, [0, 1], [14, 0])}px) scale(${interpolate(textS, [0, 1], [0.96, 1])})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 62, fontWeight: 900, color: "#FFFFFF", direction: "rtl", textAlign: "center", lineHeight: 1, letterSpacing: "-0.02em", textShadow: "0 0 20px rgba(255,255,255,0.14), 0 0 40px rgba(124,92,253,0.18)" }}>
          نتا <span style={{ color: "#7c5cfb", background: "rgba(124,92,253,0.14)", padding: "4px 14px", borderRadius: 999, border: "1px solid rgba(124,92,253,0.22)" }}>كمبتدا</span>
        </div>
        <div style={{ width: 72, height: 3, background: "#7c5cfb", borderRadius: 999, boxShadow: "0 0 12px #7c5cfb", opacity: textS as unknown as number }} />
      </div>
    </AbsoluteFill>
  );
};

const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 16, stiffness: 140 } });
  const scale = interpolate(s, [0, 1], [0.92, 1]);
  const y = interpolate(s, [0, 1], [16, 0]);
  const textS = spring({ frame: frame - 12, fps, config: { damping: 16, stiffness: 120 } });
  return (
    <AbsoluteFill style={{ background: "#000000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 20px", gap: 0 }}>
      <div style={{ width: 760, height: 700, borderRadius: 28, overflow: "hidden", background: "#ffffff", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 24px 60px rgba(0,0,0,0.6)", opacity: s as unknown as number, transform: `translateY(${y}px) scale(${scale})`, display: "flex", justifyContent: "center", alignItems: "center", padding: 12 }}>
        <Img src={staticFile("dontpay/scene4.jpg")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div style={{ marginTop: 24, opacity: textS as unknown as number, transform: `translateY(${interpolate(textS, [0, 1], [14, 0])}px) scale(${interpolate(textS, [0, 1], [0.96, 1])})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center", direction: "rtl" }}>
        <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 44, fontWeight: 900, color: "#FFFFFF", lineHeight: 1.2, textShadow: "0 0 18px rgba(255,255,255,0.10)" }}>
          متحتاج تدفع <span style={{ color: "#22c55e", background: "rgba(34,197,94,0.12)", padding: "4px 14px", borderRadius: 999, border: "1px solid rgba(34,197,94,0.22)" }}>والو</span> في البدية تاعك
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", padding: "8px 16px", borderRadius: 999 }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.14em", color: "rgba(255,255,255,0.72)" }}>START FREE • NO PAYMENT</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tS = spring({ frame, fps, config: { damping: 16, stiffness: 140 } });
  return (
    <AbsoluteFill style={{ background: "#000000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 20px", gap: 16 }}>
      <div style={{ opacity: tS, transform: `translateY(${interpolate(tS, [0, 1], [16, 0])}px)`, textAlign: "center", direction: "rtl" }}>
        <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 48, fontWeight: 900, color: CYBER.white, lineHeight: 1.1, textShadow: "0 0 20px rgba(255,255,255,0.12)" }}>
          لانو الاساسيات كامل <span style={{ color: CYBER.cyan }}>كاينة مجانا</span>
        </div>
        <div style={{ width: 64, height: 3, background: CYBER.cyan, borderRadius: 999, margin: "10px auto 0", boxShadow: `0 0 12px ${CYBER.cyan}` }} />
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 8, justifyContent: "center", flexWrap: "wrap", maxWidth: 980 }}>
        {[
          { n: "youtube", label: "YouTube Channels", col: "#ff0033", icon: "lucide:play", sub: "tutorials • 24/7" },
          { n: "github", label: "GitHub", col: "#ffffff", icon: "dev:github", sub: "open source • code" },
          { n: "social", label: "Social Media", col: CYBER.cyan, icon: "lucide:share-2", sub: "community • help" },
        ].map((c, i) => {
          const s = spring({ frame: frame - 12 - i * 8, fps, config: { damping: 14, stiffness: 140 } });
          const y = interpolate(s, [0, 1], [18, 0]);
          return (
            <div key={c.n} style={{ opacity: s, transform: `translateY(${y}px) scale(${interpolate(s, [0, 1], [0.92, 1])})`, flex: "1 1 280px", maxWidth: 300, borderRadius: 18, background: "rgba(255,255,255,0.04)", border: `1px solid ${c.col}22`, padding: 18, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, boxShadow: `0 12px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset` }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: `${c.col}14`, border: `1px solid ${c.col}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={c.icon} size={30} color={c.col} glow={c.col === "#ff0033" ? ("red" as any) : c.col === "#ffffff" ? "none" : ("cyan" as any)} animation="pop" delay={12 + i * 8} />
              </div>
              <span style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.14em", color: c.col, fontWeight: 800 }}>{c.label}</span>
              <span style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.58)", direction: "rtl", textAlign: "center", lineHeight: 1.4 }}>{c.sub}</span>
              <div style={{ width: "100%", height: 3, borderRadius: 999, background: c.col, opacity: 0.85, boxShadow: `0 0 8px ${c.col}` }} />
            </div>
          );
        })}
      </div>
      <div style={{ position: "relative", width: 520, height: 80, marginTop: 4 }}>
        <svg viewBox="0 0 520 80" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          <path d="M 40 40 C 140 10, 260 10, 360 40 S 480 70, 480 40" fill="none" stroke={CYBER.cyan} strokeOpacity={0.14} strokeWidth={1.2} strokeDasharray={6} />
          {[0, 1, 2].map((k) => {
            const x = interpolate((frame + k * 18) % 90, [0, 90], [40, 480], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return <circle key={k} cx={x} cy={40 - Math.sin((x / 60) * Math.PI) * 12} r={4} fill={CYBER.cyan} opacity={0.9} style={{ filter: `drop-shadow(0 0 6px ${CYBER.cyan})` }} />;
          })}
        </svg>
      </div>
      <div style={{ fontFamily: FONT.mono, fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: "0.12em", opacity: spring({ frame: frame - 46, fps, config: { damping: 16, stiffness: 120 } }) as unknown as number }}>FREE BASICS • EVERYWHERE • FOREVER</div>
    </AbsoluteFill>
  );
};

const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 18, stiffness: 90 } });
  const y = interpolate(s, [0, 1], [18, 0]);
  const textS = spring({ frame: frame - 14, fps, config: { damping: 16, stiffness: 120 } });
  return (
    <AbsoluteFill style={{ background: "#000000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 20px", gap: 0 }}>
      <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 42, fontWeight: 900, color: CYBER.white, direction: "rtl", textAlign: "center", lineHeight: 1, opacity: s as unknown as number, transform: `translateY(${y}px)`, textShadow: "0 0 18px rgba(255,255,255,0.12)" }}>
        بصح <span style={{ color: CYBER.cyan }}>zero</span> وينتا يليق نبدا نشري ؟
      </div>
      <div style={{ marginTop: 18, opacity: s as unknown as number, transform: `translateY(${y}px) scale(${interpolate(s, [0, 1], [0.92, 1])})`, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Img src={staticFile("dontpay/scene5.jpg")} style={{ width: 560, height: 560, objectFit: "contain" }} />
      </div>
      <div style={{ marginTop: 20, opacity: textS as unknown as number, transform: `translateY(${interpolate(textS, [0, 1], [12, 0])}px)`, fontFamily: "Cairo, Changa, sans-serif", fontSize: 28, fontWeight: 800, color: "rgba(255,255,255,0.88)", direction: "rtl", textAlign: "center", lineHeight: 1.3, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", padding: "12px 22px", borderRadius: 999 }}>
        خليك تشوف <span style={{ color: CYBER.cyan }}>—</span>
      </div>
    </AbsoluteFill>
  );
};

const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 18, stiffness: 90 } });
  const y = interpolate(s, [0, 1], [18, 0]);
  const t1 = spring({ frame: frame - 14, fps, config: { damping: 16, stiffness: 120 } });
  const t2 = spring({ frame: frame - 28, fps, config: { damping: 16, stiffness: 120 } });
  return (
    <AbsoluteFill style={{ background: "#000000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 20px", gap: 16 }}>
      <div style={{ opacity: s as unknown as number, transform: `translateY(${y}px)`, textAlign: "center", direction: "rtl" }}>
        <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 44, fontWeight: 900, color: CYBER.white, lineHeight: 1.1, textShadow: "0 0 18px rgba(255,255,255,0.10)" }}>
          في <span style={{ color: CYBER.cyan }}>certifications</span>
        </div>
        <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 32, fontWeight: 800, color: "rgba(255,255,255,0.72)", marginTop: 8 }}>like comptaA+</div>
      </div>
      <div style={{ opacity: s as unknown as number, transform: `translateY(${y}px) scale(${interpolate(s, [0, 1], [0.92, 1])})`, width: 720, maxWidth: "92%", background: "#ffffff", borderRadius: 18, padding: 18, border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 24px 60px rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Img src={staticFile("comptia.svg")} style={{ width: "100%", height: 120, objectFit: "contain" }} />
      </div>
      <div style={{ opacity: t1, transform: `translateY(${interpolate(t1, [0, 1], [10, 0])}px)`, display: "flex", gap: 8, background: "rgba(238,39,34,0.10)", border: "1px solid rgba(238,39,34,0.22)", padding: "8px 14px", borderRadius: 999 }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "#ee2722", boxShadow: "0 0 8px #ee2722" }} />
        <span style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.08em", color: "#ee2722", fontWeight: 800 }}>COMPTIA • A+ • NETWORK+ • SECURITY+</span>
      </div>
      <div style={{ opacity: t2, transform: `translateY(${interpolate(t2, [0, 1], [10, 0])}px)`, fontFamily: "Cairo, Changa, sans-serif", fontSize: 18, color: "rgba(255,255,255,0.58)", direction: "rtl", textAlign: "center", maxWidth: 860, lineHeight: 1.5 }}>
        شهادات معترف بها عالميا تزيد فرصك في العمل
      </div>
    </AbsoluteFill>
  );
};

const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 16, stiffness: 140 } });
  const y = interpolate(s, [0, 1], [16, 0]);
  return (
    <AbsoluteFill style={{ background: "#000000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 20px", gap: 18 }}>
      <div style={{ opacity: s, transform: `translateY(${y}px)`, textAlign: "center", direction: "rtl" }}>
        <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 40, fontWeight: 900, color: CYBER.white, lineHeight: 1.1 }}>
          or <span style={{ color: CYBER.cyan, fontFamily: FONT.mono, fontSize: 36, letterSpacing: "0.04em" }}>labs</span> , وين تبراكتيسي
        </div>
        <div style={{ width: 64, height: 3, background: CYBER.cyan, borderRadius: 999, margin: "12px auto 0", boxShadow: `0 0 12px ${CYBER.cyan}`, opacity: s as unknown as number }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, width: "100%", maxWidth: 860, marginTop: 6 }}>
        {[
          { title: "TryHackMe", desc: "rooms • guided • beginner friendly", col: "#ff3d5a", bg: "#ffffff", logo: "labs/tryhackme.png", real: true },
          { title: "Hack The Box", desc: "machines • real world • pro", col: "#9fef00", bg: "#111111", logo: "labs/hackthebox.png", real: true },
          { title: "PortSwigger", desc: "Web Security Academy", col: CYBER.magenta, icon: "lucide:globe", real: false },
          { title: "VulnHub", desc: "offline VMs • practice", col: CYBER.amber, icon: "lucide:server", real: false },
        ].map((lab, i) => {
          const sp = spring({ frame: frame - 14 - i * 7, fps, config: { damping: 18, stiffness: 130 } });
          return (
            <div key={lab.title} style={{ opacity: sp, transform: `translateY(${interpolate(sp, [0, 1], [16, 0])}px)`, borderRadius: 18, background: "rgba(255,255,255,0.04)", border: `1px solid ${lab.col}26`, padding: 18, display: "flex", flexDirection: "column", gap: 10, alignItems: "center", textAlign: "center", boxShadow: "0 12px 28px rgba(0,0,0,0.42)" }}>
              <div style={{ width: 72, height: 72, borderRadius: 16, background: (lab as any).bg ?? `${lab.col}14`, border: `1px solid ${lab.col}33`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: (lab as any).real ? 10 : 0 }}>
                {(lab as any).real ? (
                  <Img src={staticFile((lab as any).logo)} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                ) : (
                  <Icon name={(lab as any).icon} size={30} color={lab.col} glow={lab.col === CYBER.magenta ? "magenta" : lab.col === CYBER.amber ? "none" : "cyan"} animation="none" />
                )}
              </div>
              <span style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.12em", color: lab.col, fontWeight: 800 }}>{lab.title}</span>
              <span style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.62)", lineHeight: 1.4 }}>{lab.desc}</span>
            </div>
          );
        })}
      </div>
      <div style={{ opacity: spring({ frame: frame - 48, fps, config: { damping: 16, stiffness: 120 } }) as unknown as number, display: "flex", gap: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", padding: "8px 14px", borderRadius: 999, marginTop: 4 }}>
        <Icon name="lucide:zap" size={14} color={CYBER.amber} glow="none" animation="none" />
        <span style={{ fontFamily: FONT.mono, fontSize: 11, color: "rgba(255,255,255,0.62)", letterSpacing: "0.08em" }}>PRACTICE • BREAK • LEARN • REPEAT</span>
      </div>
    </AbsoluteFill>
  );
};

const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 16, stiffness: 100 } });
  const y = interpolate(s, [0, 1], [18, 0]);
  const t2 = spring({ frame: frame - 18, fps, config: { damping: 16, stiffness: 120 } });
  return (
    <AbsoluteFill style={{ background: "#000000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 20px", gap: 18 }}>
      <div style={{ opacity: s, transform: `translateY(${y}px)`, textAlign: "center", direction: "rtl" }}>
        <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 36, fontWeight: 900, color: CYBER.white, lineHeight: 1.25, maxWidth: 960, textShadow: "0 0 18px rgba(255,255,255,0.10)" }}>
          مالاخير استثمر دراهمك في <span style={{ color: CYBER.cyan, background: "rgba(34,211,238,0.12)", padding: "4px 14px", borderRadius: 999, border: "1px solid rgba(34,211,238,0.22)" }}>حاجة تفيدك</span>
        </div>
        <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 32, fontWeight: 800, color: CYBER.cyan, marginTop: 10, lineHeight: 1.2 }}>وتطور <span style={{ color: CYBER.white }}>المهارات تاعك</span></div>
        <div style={{ width: 72, height: 3, background: CYBER.cyan, borderRadius: 999, margin: "12px auto 0", boxShadow: `0 0 12px ${CYBER.cyan}`, opacity: t2 as unknown as number }} />
      </div>
      <div style={{ opacity: t2, transform: `translateY(${interpolate(t2, [0, 1], [12, 0])}px)`, display: "flex", gap: 12, marginTop: 4 }}>
        {[
          { icon: "lucide:trending-up", label: "invest", col: CYBER.cyan },
          { icon: "lucide:brain", label: "skills", col: CYBER.green },
          { icon: "lucide:rocket", label: "future", col: CYBER.magenta },
        ].map((c, i) => {
          const sp = spring({ frame: frame - 26 - i * 6, fps, config: { damping: 14, stiffness: 140 } });
          return (
            <div key={c.label} style={{ opacity: sp, transform: `translateY(${interpolate(sp, [0, 1], [10, 0])}px) scale(${interpolate(sp, [0, 1], [0.96, 1])})`, width: 86, height: 86, borderRadius: 18, background: "rgba(255,255,255,0.04)", border: `1px solid ${c.col}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={c.icon} size={32} color={c.col} glow={c.col === CYBER.cyan ? "cyan" : c.col === CYBER.green ? "green" : "magenta"} animation="pop" delay={26 + i * 6} />
            </div>
          );
        })}
      </div>
      <div style={{ opacity: spring({ frame: frame - 46, fps, config: { damping: 16, stiffness: 120 } }) as unknown as number, fontFamily: FONT.mono, fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,255,255,0.32)", textAlign: "center" }}>INVEST IN YOURSELF • SKILLS OVER STUFF</div>
    </AbsoluteFill>
  );
};

export const Dontpay: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000000" }}>
      <Sequence from={0} durationInFrames={120}>
        <Scene1 />
      </Sequence>
      <Sequence from={120} durationInFrames={120}>
        <Scene2 />
      </Sequence>
      <Sequence from={240} durationInFrames={120}>
        <Scene3 />
      </Sequence>
      <Sequence from={360} durationInFrames={150}>
        <Scene4 />
      </Sequence>
      <Sequence from={510} durationInFrames={120}>
        <Scene5 />
      </Sequence>
      <Sequence from={630} durationInFrames={140}>
        <Scene6 />
      </Sequence>
      <Sequence from={770} durationInFrames={140}>
        <Scene7 />
      </Sequence>
      <Sequence from={910} durationInFrames={150}>
        <Scene8 />
      </Sequence>
    </AbsoluteFill>
  );
};

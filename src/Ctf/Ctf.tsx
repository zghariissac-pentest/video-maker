import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  Sequence,
} from "remotion";
import { Shield, Server, Globe, AppWindow, Bug, Flag, KeyRound, Terminal, FileSearch, Code, Play, Target, Clock, BookOpen, Search, Zap, Eye, FileText, Trophy } from "lucide-react";

// Scene 1: HOOK - leave untouched (simple black + picture)
const CtfScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const imgProgress = spring({ frame: frame + 12, fps, config: { damping: 16, stiffness: 130 } });
  const imgScale = interpolate(imgProgress, [0, 1], [0.86, 1]);
  const imgOpacity = interpolate(imgProgress, [0, 1], [0.4, 1]);
  const imgY = interpolate(imgProgress, [0, 1], [18, 0]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 32px" }}>
        <div style={{ opacity: imgOpacity, transform: `translateY(${imgY}px) scale(${imgScale})`, filter: "drop-shadow(0 18px 42px rgba(0,0,0,0.65)) drop-shadow(0 0 18px rgba(255,255,255,0.04))", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Img src={staticFile("ctf.png")} style={{ width: 860, height: 1080, objectFit: "contain", display: "block", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 2: DESCRIBING animations for "هي تحديات اختراق..." - flow diagram in middle
const CtfScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleIn = spring({ frame: frame + 6, fps, config: { damping: 16, stiffness: 140 } });
  const titleY = interpolate(titleIn, [0, 1], [16, 0]);

  const Word: React.FC<{ w: string; idx: number; start: number; highlight?: boolean }> = ({ w, idx, start, highlight }) => {
    const p = spring({ frame: frame - (start + idx * 4), fps, config: { damping: 14, stiffness: 160 } });
    const y = interpolate(p, [0, 1], [14, 0]);
    return <span style={{ display: "inline-block", opacity: p, transform: `translateY(${y}px)`, color: highlight ? "#22D3EE" : "white", fontWeight: highlight ? 900 : undefined }}>{w}</span>;
  };

  // Describing flow animation timings
  const scanProgress = interpolate(frame, [22, 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exploitPop = spring({ frame: frame - 44, fps, config: { damping: 12, stiffness: 160 } });
  const accessPop = spring({ frame: frame - 56, fps, config: { damping: 12, stiffness: 160 } });
  const flagPop = spring({ frame: frame - 68, fps, config: { damping: 10, stiffness: 160 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", gap: 16 }}>
        <div style={{ opacity: titleIn, transform: `translateY(${titleY}px)`, textAlign: "center" }}>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 800, fontSize: 42, color: "white" }}><span style={{ color: "#22D3EE" }}>ctf</span> <span style={{ color: "rgba(255,255,255,0.4)" }}>=</span> capture the flag</div>
          <div style={{ marginTop: 8, width: 64, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, marginInline: "auto", opacity: titleIn, transform: `scaleX(${titleIn})` }} />
        </div>

        <div dir="rtl" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4, fontFamily: "Cairo, Changa, sans-serif", fontWeight: 800, fontSize: 38, lineHeight: 1.3 }}>
          {"هي تحديات اختراق".split(" ").map((w, i) => <Word key={i} w={w} idx={i} start={16} highlight={w === "اختراق"} />)}
        </div>

        {/* DESCRIBING ANIMATION MIDDLE: You -> scan -> target -> flag + pipeline */}
        <div style={{ width: 920, padding: "14px 16px", borderRadius: 16, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Top flow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <div style={{ opacity: spring({ frame: frame - 18, fps, config: { damping: 16, stiffness: 140 } }), display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 48, height: 48, borderRadius: 999, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}><Shield size={20} color="white" /></div>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontFamily: "JetBrains Mono, monospace" }}>You</span>
            </div>
            <div style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.10)", borderRadius: 999, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, bottom: 0, width: 60, background: "#22D3EE", transform: `translateX(${interpolate(scanProgress, [0, 1], [-60, 300])}px)`, boxShadow: "0 0 10px #22D3EE" }} />
              <div style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)", fontSize: 10, color: "#22D3EE", fontFamily: "JetBrains Mono, monospace", opacity: scanProgress }}>scan</div>
            </div>
            <div style={{ opacity: spring({ frame: frame - 28, fps, config: { damping: 16, stiffness: 140 } }), display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, background: "rgba(34,211,238,0.12)", border: "1px solid rgba(34,211,238,0.22)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <Server size={22} color="#22D3EE" />
                <div style={{ position: "absolute", inset: -2, borderRadius: 12, border: "1px solid rgba(34,211,238,0.22)", opacity: 0.6 + Math.sin(frame * 0.2) * 0.3 }} />
              </div>
              <span style={{ fontSize: 10, color: "#22D3EE", fontFamily: "JetBrains Mono, monospace" }}>target</span>
            </div>
            <div style={{ width: 24, height: 2, background: exploitPop > 0.1 ? "#22D3EE" : "rgba(255,255,255,0.10)", opacity: exploitPop }} />
            <div style={{ opacity: flagPop, transform: `scale(${interpolate(flagPop, [0, 1], [0.7, 1])})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 48, height: 48, borderRadius: 999, background: "#22D3EE", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 18px rgba(34,211,238,0.4)" }}><Flag size={20} color="black" /></div>
              <span style={{ fontSize: 10, color: "#22D3EE", fontFamily: "JetBrains Mono, monospace" }}>flag</span>
            </div>
          </div>
          {/* Pipeline */}
          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
            {[
              { label: "Recon", pop: exploitPop, icon: Search },
              { label: "Exploit", pop: exploitPop, icon: Bug },
              { label: "Access", pop: accessPop, icon: Zap },
              { label: "Flag", pop: flagPop, icon: Trophy },
            ].map((step, i) => (
              <div key={step.label} style={{ flex: 1, opacity: step.pop, transform: `translateY(${interpolate(step.pop, [0, 1], [10, 0])}px)`, display: "flex", alignItems: "center", gap: 6, padding: "8px 8px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <step.icon size={14} color={i === 3 ? "#22D3EE" : "white"} />
                <span style={{ fontSize: 11, fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: i === 3 ? "#22D3EE" : "white" }}>{step.label}</span>
                {i < 3 && <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.3)" }}>→</span>}
              </div>
            ))}
          </div>
        </div>

        <div dir="rtl" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4, fontFamily: "Cairo, Changa, sans-serif", fontWeight: 700, fontSize: 26, maxWidth: 920, textAlign: "center" }}>
          {"كل تحدي فيه نظام ولا موقع ولا برنامج فيه ثغرة امنية مقصودة".split(" ").map((w, i) => <Word key={i} w={w} idx={i} start={36} highlight={["ثغرة", "امنية", "مقصودة"].includes(w)} />)}
        </div>

        <div dir="rtl" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 6, fontFamily: "Cairo, Changa, sans-serif", fontWeight: 800, fontSize: 36 }}>
          {"يليق نتا تستغلها وتلقى".split(" ").map((w, i) => <Word key={i} w={w} idx={i} start={62} />)}
          <span style={{ opacity: flagPop, transform: `translateY(${interpolate(flagPop, [0, 1], [10, 0])}px)`, background: "#22D3EE", color: "#000", padding: "2px 12px", borderRadius: 999, fontFamily: "JetBrains Mono, monospace", fontWeight: 900, fontSize: 28 }}>flag</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 3: 5 categories - DESCRIBING animations per category (mini demos)
const CtfScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleIn = spring({ frame: frame + 8, fps, config: { damping: 16, stiffness: 140 } });

  const cats = [
    { en: "Web", ar: "اختراق المواقع الإلكترونية", icon: Globe, demo: "web" },
    { en: "Crypto", ar: "كسر أنظمة تشفير ضعيفة", icon: KeyRound, demo: "crypto" },
    { en: "Pwn", ar: "استغلال البرامج مباشرة", icon: Terminal, demo: "pwn" },
    { en: "Forensics", ar: "التنقيب عن بيانات مخفية في الملفات", icon: FileSearch, demo: "for" },
    { en: "Reversing", ar: "فهم عمل برنامج دون الكود المصدري", icon: Code, demo: "rev" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", gap: 14 }}>
        <div style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [12, 0])}px)`, textAlign: "center" }}>
          <div dir="rtl" style={{ fontFamily: "Cairo, Changa, sans-serif", fontWeight: 800, fontSize: 38, color: "white" }}>فيها <span style={{ color: "#22D3EE" }}>5</span> فئات رئيسية راح تقابلها</div>
          <div style={{ marginTop: 8, width: 56, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, marginInline: "auto", opacity: titleIn, transform: `scaleX(${titleIn})` }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 920 }}>
          {cats.map((cat, i) => {
            const p = spring({ frame: frame - (18 + i * 8), fps, config: { damping: 18, stiffness: 150 } });
            const y = interpolate(p, [0, 1], [14, 0]);
            return (
              <div key={cat.en} style={{ opacity: p, transform: `translateY(${y}px)`, display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                  <cat.icon size={22} color="white" strokeWidth={1.7} />
                  {/* describing mini animation */}
                  {cat.demo === "web" && <div style={{ position: "absolute", bottom: 4, left: 6, right: 6, height: 2, background: "#22D3EE", opacity: 0.7 + Math.sin(frame * 0.3 + i) * 0.3, transform: `scaleX(${0.4 + Math.sin(frame * 0.15) * 0.2})` }} />}
                  {cat.demo === "crypto" && <div style={{ position: "absolute", top: 4, right: 4, width: 10, height: 10, borderRadius: 999, border: "1px solid #22D3EE", opacity: 0.6 + Math.sin(frame * 0.25) * 0.3, transform: `rotate(${frame * 2}deg)` }} />}
                  {cat.demo === "pwn" && <div style={{ position: "absolute", bottom: 6, left: 8, width: 2, height: 14, background: "white", opacity: frame % 20 < 10 ? 1 : 0 }} />}
                  {cat.demo === "for" && <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, transparent, rgba(34,211,238,0.18), transparent)`, transform: `translateX(${interpolate((frame % 40) / 40, [0, 1], [-50, 50])}px)` }} />}
                  {cat.demo === "rev" && <div style={{ position: "absolute", bottom: 4, left: 6, right: 6, display: "flex", gap: 2 }}>{[0, 1, 2].map(k => <div key={k} style={{ flex: 1, height: 2, background: k === 1 ? "#22D3EE" : "rgba(255,255,255,0.3)", opacity: 0.6 }} />)}</div>}
                </div>
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 800, fontSize: 20, color: "white" }}>{cat.en}</div>
                  <div dir="rtl" style={{ fontFamily: "Cairo, Changa, sans-serif", fontWeight: 700, fontSize: 22, color: "rgba(255,255,255,0.88)", textAlign: "right", flex: 1 }}>{cat.ar}</div>
                </div>
                <div style={{ width: 7, height: 7, borderRadius: 999, background: "#22D3EE", opacity: p, boxShadow: "0 0 8px #22D3EE" }} />
              </div>
            );
          })}
        </div>
        <div style={{ opacity: interpolate(frame, [72, 86], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), fontSize: 10, color: "rgba(255,255,255,0.30)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.14em" }}>HOVER • EXPLOIT • CAPTURE</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 4: 4 steps - DESCRIBING animations per step (visual demos)
const CtfScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleIn = spring({ frame: frame + 8, fps, config: { damping: 16, stiffness: 140 } });

  const steps = [
    { n: "1", icon: Play, title: "picoCTF", desc: "مجانية ومصممة للمبتدئين", color: "#CAA6D6" },
    { n: "2", icon: Target, title: "General Skills", desc: "فئة واحدة فقط", color: "#22D3EE" },
    { n: "3", icon: Clock, title: "٢٠-٣٠ دقيقة", desc: "ثم writeup", color: "#FACC15" },
    { n: "4", icon: BookOpen, title: "دفتر ملاحظات", desc: "لكل تقنية وأداة", color: "white" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", gap: 14 }}>
        <div style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [12, 0])}px)`, textAlign: "center" }}>
          <div dir="rtl" style={{ fontFamily: "Cairo, Changa, sans-serif", fontWeight: 800, fontSize: 36, color: "white" }}>خطة بداية <span style={{ color: "#22D3EE" }}>عملية</span></div>
          <div style={{ marginTop: 8, width: 56, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, marginInline: "auto", opacity: titleIn, transform: `scaleX(${titleIn})` }} />
        </div>

        {/* Logo describing */}
        <div style={{ opacity: spring({ frame: frame - 14, fps, config: { damping: 12, stiffness: 160 } }), transform: `scale(${interpolate(spring({ frame: frame - 14, fps, config: { damping: 12, stiffness: 160 } }), [0, 1], [0.8, 1])})`, display: "flex", alignItems: "center", gap: 12, padding: "8px 14px", borderRadius: 999, background: "rgba(202,166,214,0.10)", border: "1px solid rgba(202,166,214,0.22)" }}>
          <div style={{ width: 36, height: 36, borderRadius: 999, overflow: "hidden", background: "#CAA6D6", display: "flex", alignItems: "center", justifyContent: "center" }}><Img src={staticFile("picoctf.png")} style={{ width: 36, height: 36, objectFit: "cover" }} /></div>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 800, fontSize: 14, color: "white" }}>picoCTF</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>free • beginner</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 920 }}>
          {[
            { n: "1", icon: Play, text: <>ابدأ بـ <span style={{ color: "#CAA6D6", fontFamily: "JetBrains Mono, monospace", fontWeight: 800 }}>picoCTF</span> — مجانية ومصممة للمبتدئين.</>, prog: 0 },
            { n: "2", icon: Target, text: <>اختر فئة واحدة فقط، مثل <span style={{ background: "rgba(255,255,255,0.08)", padding: "1px 8px", borderRadius: 999, fontFamily: "JetBrains Mono, monospace", fontWeight: 800 }}>'General Skills'</span>.</>, prog: 0.35 },
            { n: "3", icon: Clock, text: <>أعطِ كل تحدٍّ <span style={{ color: "#22D3EE", fontWeight: 900 }}>٢٠-٣٠ دقيقة</span> كحد أقصى، ثم اقرأ <span style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(255,255,255,0.6)" }}>writeup</span> إن علقت — ببطء وبفهم كامل.</>, prog: 0.7 },
            { n: "4", icon: BookOpen, text: <>احتفظ بدفتر ملاحظات لكل تقنية وأداة جديدة تتعلمها.</>, prog: 1 },
          ].map((st, i) => {
            const p = spring({ frame: frame - (20 + i * 9), fps, config: { damping: 18, stiffness: 150 } });
            const y = interpolate(p, [0, 1], [12, 0]);
            return (
              <div key={st.n} style={{ opacity: p, transform: `translateY(${y}px)`, display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 14, background: i === 2 ? "rgba(34,211,238,0.06)" : "rgba(255,255,255,0.05)", border: i === 2 ? "1px solid rgba(34,211,238,0.14)" : "1px solid rgba(255,255,255,0.08)", position: "relative", overflow: "hidden" }}>
                <div style={{ width: 36, height: 36, borderRadius: 999, background: i === 2 ? "#22D3EE" : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: i === 2 ? "#000" : "white", flexShrink: 0 }}><span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 900, fontSize: 14 }}>{st.n}</span></div>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}><st.icon size={16} color={i === 2 ? "#22D3EE" : "white"} /></div>
                <div dir="rtl" style={{ flex: 1, fontFamily: "Cairo, Changa, sans-serif", fontWeight: 700, fontSize: 20, color: "rgba(255,255,255,0.92)", lineHeight: 1.4, textAlign: "right" }}>{st.text}</div>
                {/* describing progress bar for step 3 */}
                {i === 2 && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "rgba(34,211,238,0.22)" }}><div style={{ width: `${interpolate(frame, [40, 70], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`, height: "100%", background: "#22D3EE" }} /></div>}
                {i === 3 && <div style={{ position: "absolute", top: 8, right: 8, opacity: p }}><FileText size={14} color="rgba(255,255,255,0.25)" /></div>}
              </div>
            );
          })}
        </div>
        <div style={{ opacity: interpolate(frame, [70, 84], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), fontSize: 10, color: "rgba(255,255,255,0.28)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.14em" }}>TRY 30 MIN → READ WRITEUP → NOTE → REPEAT</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Ctf: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Sequence from={0} durationInFrames={150}><CtfScene1 /></Sequence>
      <Sequence from={150} durationInFrames={180}><CtfScene2 /></Sequence>
      <Sequence from={330} durationInFrames={220}><CtfScene3 /></Sequence>
      <Sequence from={550} durationInFrames={260}><CtfScene4 /></Sequence>
    </AbsoluteFill>
  );
};

export const CTF_DURATION = 810;
export const CTF_FPS = 30;
export const CTF_WIDTH = 1080;
export const CTF_HEIGHT = 1920;

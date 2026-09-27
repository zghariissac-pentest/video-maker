import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { Cpu, Gamepad2, Palette, GraduationCap, Briefcase, Check, X, MemoryStick, Clapperboard, Code, HardDrive, Zap, Rocket, CircuitBoard } from "lucide-react";

const BLUE = "#5B9DFF";
const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);
const MONO = "JetBrains Mono, monospace";
const AR = "Cairo, Changa, sans-serif";

// Scene 1 (hook): black bg, pic in middle, clean text under
const YourcomputerScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Image enter: spring pop, keeps quality - no stretch (pre-warmed so frame 0 is visible)
  const imgProgress = spring({
    frame: frame + 12,
    fps,
    config: { damping: 16, stiffness: 130 },
  });
  const imgScale = interpolate(imgProgress, [0, 1], [0.86, 1]);
  const imgOpacity = interpolate(imgProgress, [0, 1], [0.4, 1]);
  const imgY = interpolate(imgProgress, [0, 1], [18, 0]);

  // Text under it: simple clean fade + slide up (visible by frame 10)
  const textIn = interpolate(frame, [6, 22], [0, 1], {
    easing: SMOOTH,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(textIn, [0, 1], [14, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Center column: image mid-size in middle + clean text under */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "0 48px",
        }}
      >
        {/* Image — mid size, keep quality, centered like previous videos */}
        <div
          style={{
            opacity: imgOpacity,
            transform: `translateY(${imgY}px) scale(${imgScale})`,
            willChange: "transform, opacity",
            // keep quality: drop shadow only, no blur, no filter that harms sharpness
            filter:
              "drop-shadow(0 18px 42px rgba(0,0,0,0.65)) drop-shadow(0 0 18px rgba(255,255,255,0.04))",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("yourcomputer.jpg")}
            style={{
              width: 640,
              height: 480,
              objectFit: "contain",
              display: "block"
            }} />
        </div>

        {/* Text under image — simple clean style */}
        <div
          dir="rtl"
          style={{
            marginTop: 34,
            textAlign: "center",
            opacity: textIn,
            transform: `translateY(${textY}px)`,
            willChange: "transform, opacity",
          }}
        >
          <div
            style={{
              fontFamily: "Cairo, Changa, sans-serif",
              fontWeight: 800,
              fontSize: 52,
              color: "white",
              letterSpacing: "-0.02em",
              lineHeight: 1.35,
              textShadow: "0 2px 18px rgba(0,0,0,0.55)",
            }}
          >
            بالاك تطيح في هاذو الخدع التجارية كي تحب تشري{" "}
            <span dir="ltr" style={{ display: "inline-block", fontFamily: "JetBrains Mono, monospace", fontWeight: 800 }}>pc</span>
          </div>
          {/* thin subtle divider — optional clean touch, matches simple style */}
          <div
            style={{
              marginTop: 14,
              width: 84,
              height: 2,
              background: "rgba(255,255,255,0.14)",
              borderRadius: 999,
              marginLeft: "auto",
              marginRight: "auto",
              opacity: textIn,
              transform: `scaleX(${textIn})`,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Word helper — per-word spring like Check.tsx
const Word: React.FC<{ w: string; idx: number; start: number; highlight?: boolean; mono?: boolean }> = ({ w, idx, start, highlight, mono }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - (start + idx * 4), fps, config: { damping: 14, stiffness: 160 } });
  const y = interpolate(p, [0, 1], [16, 0]);
  return (
    <span style={{ display: "inline-block", opacity: p, transform: `translateY(${y}px)`, color: highlight ? BLUE : "white", fontWeight: highlight ? 900 : undefined, fontFamily: mono ? MONO : undefined, padding: "0 4px" }}>
      {w}
    </span>
  );
};

// Animated check stroke
const CheckDraw: React.FC<{ delay: number; size?: number; color?: string }> = ({ delay, size = 30, color = BLUE }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 14], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" style={{ opacity: p === 0 ? 0 : 1 }}>
      <path d="M6 16 L13 23 L24 8" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={32} strokeDashoffset={32 * (1 - p)} />
    </svg>
  );
};

// Scene 2: CPU — generation over name + profiles
const YourcomputerScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame + 6, fps, config: { damping: 16, stiffness: 140 } });

  // VS bars race
  const oldBar = interpolate(frame, [80, 118], [0, 34], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const newBar = interpolate(frame, [84, 126], [0, 88], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const vsIn = spring({ frame: frame - 58, fps, config: { damping: 16, stiffness: 140 } });
  const winIn = spring({ frame: frame - 128, fps, config: { damping: 12, stiffness: 160 } });

  // crossfade part A -> part B
  const aOut = interpolate(frame, [150, 166], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bIn = interpolate(frame, [158, 178], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // gen meter marker sweep
  const marker = interpolate(frame, [268, 300], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Title — stays whole scene */}
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 84 }}>
        <div style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [14, 0])}px)`, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(91,157,255,0.12)", border: "1px solid rgba(91,157,255,0.30)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(91,157,255,0.25)" }}>
            <Cpu size={32} color={BLUE} />
          </div>
          <div dir="rtl" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", fontFamily: AR, fontWeight: 800, fontSize: 46, lineHeight: 1.3 }}>
            {"دايمن نبداو بالمعالج".split(" ").map((w, i) => <Word key={i} w={w} idx={i} start={12} />)}
          </div>
        </div>
      </AbsoluteFill>

      {/* PART A: gen over name + old vs new */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: aOut }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, paddingTop: 120 }}>
          <div dir="rtl" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", fontFamily: AR, fontWeight: 700, fontSize: 34, maxWidth: 920, textAlign: "center" }}>
            {"نركزو على الجيل كثر مالاسم".split(" ").map((w, i) => <Word key={i} w={w} idx={i} start={30} highlight={w === "الجيل"} />)}
          </div>

          {/* VS: old i7 vs new i5 */}
          <div style={{ opacity: vsIn, transform: `translateY(${interpolate(vsIn, [0, 1], [16, 0])}px)`, display: "flex", alignItems: "stretch", gap: 14 }}>
            {/* old */}
            <div style={{ width: 400, borderRadius: 18, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", padding: "18px", display: "flex", flexDirection: "column", gap: 10, opacity: 0.75 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 34, color: "rgba(255,255,255,0.55)" }}>i7</span>
                <span style={{ fontFamily: MONO, fontSize: 12, color: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.07)", padding: "3px 10px", borderRadius: 999 }}>GEN 4 · قديم</span>
                <span style={{ marginLeft: "auto", display: "flex" }}><X size={20} color="rgba(255,255,255,0.35)" /></span>
              </div>
              <div style={{ height: 12, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                <div style={{ width: `${oldBar}%`, height: "100%", background: "rgba(255,255,255,0.30)", borderRadius: 999 }} />
              </div>
              <div dir="rtl" style={{ fontFamily: AR, fontSize: 17, color: "rgba(255,255,255,0.5)" }}>جيل قديم = أضعف</div>
            </div>

            <div style={{ display: "flex", alignItems: "center", fontFamily: MONO, fontWeight: 900, fontSize: 22, color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>VS</div>

            {/* new */}
            <div style={{ width: 400, borderRadius: 18, background: "rgba(91,157,255,0.08)", border: "1px solid rgba(91,157,255,0.35)", padding: "18px", display: "flex", flexDirection: "column", gap: 10, boxShadow: "0 0 30px rgba(91,157,255,0.18)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 34, color: "white" }}>i5</span>
                <span style={{ fontFamily: MONO, fontSize: 12, color: BLUE, background: "rgba(91,157,255,0.12)", border: "1px solid rgba(91,157,255,0.25)", padding: "3px 10px", borderRadius: 999 }}>GEN 12 · جديد</span>
                <span style={{ marginLeft: "auto", display: "flex", opacity: winIn }}><CheckDraw delay={128} size={24} /></span>
              </div>
              <div style={{ height: 12, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                <div style={{ width: `${newBar}%`, height: "100%", background: BLUE, borderRadius: 999, boxShadow: "0 0 12px rgba(91,157,255,0.7)" }} />
              </div>
              <div dir="rtl" style={{ fontFamily: AR, fontSize: 17, color: "rgba(255,255,255,0.75)" }}>جيل جديد = أقوى بزاف</div>
            </div>
          </div>

          <div dir="rtl" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", fontFamily: AR, fontWeight: 800, fontSize: 36, maxWidth: 920, textAlign: "center" }}>
            {"i7 جيل قديم أضعف من i5 جيل جديد.".split(" ").map((w, i) => <Word key={i} w={w} idx={i} start={96} highlight={w === "أضعف"} mono={w === "i7" || w === "i5"} />)}
          </div>
        </div>
      </AbsoluteFill>

      {/* PART B: profiles with draws */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: bIn }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 940, paddingTop: 150 }}>
          {/* gamer / designer */}
          {(() => {
            const p = spring({ frame: frame - 168, fps, config: { damping: 18, stiffness: 140 } });
            return (
              <div style={{ opacity: p, transform: `translateY(${interpolate(p, [0, 1], [18, 0])}px)`, borderRadius: 22, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", padding: "22px", display: "flex", gap: 18, alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ width: 62, height: 62, borderRadius: 18, background: "rgba(91,157,255,0.12)", border: "1px solid rgba(91,157,255,0.30)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Gamepad2 size={30} color={BLUE} />
                    </div>
                    <div style={{ width: 62, height: 62, borderRadius: 18, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Palette size={30} color="white" />
                    </div>
                  </div>
                  <div dir="rtl" style={{ fontFamily: AR, fontWeight: 800, fontSize: 20, color: "white", whiteSpace: "nowrap" }}>مصمم / Gamer</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div dir="rtl" style={{ fontFamily: AR, fontWeight: 700, fontSize: 27, color: "white", lineHeight: 1.6 }}>
                    <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>i5</span>
                    <span> أو </span>
                    <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Ryzen 5</span>
                    <span> فما فوق، وجيل حديث.</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 10, direction: "ltr" }}>
                    {["i5+", "Ryzen 5+", "جيل حديث"].map(t => (
                      <span key={t} style={{ fontFamily: t.includes("جيل") ? AR : MONO, fontSize: 14, fontWeight: 800, color: BLUE, background: "rgba(91,157,255,0.10)", border: "1px solid rgba(91,157,255,0.25)", padding: "4px 12px", borderRadius: 999 }}>{t}</span>
                    ))}
                    <span style={{ display: "flex", alignItems: "center" }}><CheckDraw delay={196} size={26} /></span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* student / office */}
          {(() => {
            const p = spring({ frame: frame - 210, fps, config: { damping: 18, stiffness: 140 } });
            return (
              <div style={{ opacity: p, transform: `translateY(${interpolate(p, [0, 1], [18, 0])}px)`, borderRadius: 22, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", padding: "22px", display: "flex", gap: 18, alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ width: 62, height: 62, borderRadius: 18, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <GraduationCap size={30} color="white" />
                    </div>
                    <div style={{ width: 62, height: 62, borderRadius: 18, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Briefcase size={30} color="white" />
                    </div>
                  </div>
                  <div dir="rtl" style={{ fontFamily: AR, fontWeight: 800, fontSize: 20, color: "white", whiteSpace: "nowrap" }}>طالب / مكتب</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div dir="rtl" style={{ fontFamily: AR, fontWeight: 700, fontSize: 26, color: "white", lineHeight: 1.6 }}>
                    <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>i3</span>
                    <span> أو </span>
                    <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Ryzen 3</span>
                    <span> كافي، بس لا يكون أقل من جيل 10.</span>
                  </div>
                  {/* gen meter: <10 dimmed, 10+ lit, marker sweeps */}
                  <div style={{ marginTop: 12, direction: "ltr" }}>
                    <div style={{ position: "relative", display: "flex", gap: 6 }}>
                      {[8, 9, 10, 11, 12, 13].map(g => {
                        const ok = g >= 10;
                        return (
                          <div key={g} style={{ flex: 1, padding: "8px 0", borderRadius: 10, textAlign: "center", fontFamily: MONO, fontSize: 15, fontWeight: 800, background: ok ? "rgba(91,157,255,0.14)" : "rgba(255,255,255,0.04)", border: ok ? "1px solid rgba(91,157,255,0.35)" : "1px solid rgba(255,255,255,0.08)", color: ok ? "white" : "rgba(255,255,255,0.30)", textDecoration: ok ? "none" : "line-through" }}>{g}</div>
                        );
                      })}
                      <div style={{ position: "absolute", top: -8, left: `${8 + marker * 84}%`, transform: "translateX(-50%)", width: 3, height: 58, background: BLUE, borderRadius: 999, boxShadow: "0 0 12px rgba(91,157,255,0.9)", opacity: marker > 0 ? 1 : 0 }} />
                    </div>
                    <div dir="rtl" style={{ fontFamily: AR, fontSize: 15, color: "rgba(255,255,255,0.55)", marginTop: 6 }}>الجيل 10 هو الحد الأدنى</div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 3: RAM — tiers with filling memory bars
const RAM_TIERS = [
  { profile: "طالب", icon: GraduationCap, text: "من احسن على الاقل", gb: 8, pct: 25 },
  { profile: "gaming", icon: Gamepad2, text: null as string | null, gb: 16, pct: 50, plus: true },
  { profile: "مونتاج / تصميم / برمجة ثقيلة", icons: [Clapperboard, Palette, Code], text: null as string | null, gb: 32, pct: 100, plus: true },
];

const YourcomputerScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame + 6, fps, config: { damping: 16, stiffness: 140 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, padding: "0 36px" }}>
        <div style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [14, 0])}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(91,157,255,0.12)", border: "1px solid rgba(91,157,255,0.30)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(91,157,255,0.25)" }}>
            <MemoryStick size={32} color={BLUE} />
          </div>
          <div dir="rtl" style={{ fontFamily: AR, fontWeight: 800, fontSize: 46, color: "white" }}>بالنسبة للرام</div>
          <div style={{ width: 64, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, opacity: titleIn, transform: `scaleX(${titleIn})` }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 940 }}>
          {RAM_TIERS.map((t, i) => {
            const p = spring({ frame: frame - (24 + i * 18), fps, config: { damping: 18, stiffness: 140 } });
            const fill = interpolate(frame, [34 + i * 18, 70 + i * 18], [0, t.pct], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const num = Math.round(interpolate(frame, [34 + i * 18, 70 + i * 18], [0, t.gb], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
            const icons = (t as { icons?: unknown[] }).icons ?? [t.icon];
            return (
              <div key={t.profile} style={{ opacity: p, transform: `translateY(${interpolate(p, [0, 1], [18, 0])}px)`, borderRadius: 22, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", padding: "20px 22px", display: "flex", gap: 18, alignItems: "center" }}>
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  {(icons as React.ElementType[]).map((Icon, k) => (
                    <div key={k} style={{ width: 54, height: 54, borderRadius: 16, background: i === 2 ? "rgba(91,157,255,0.12)" : "rgba(255,255,255,0.06)", border: i === 2 ? "1px solid rgba(91,157,255,0.30)" : "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={26} color={i === 2 ? BLUE : "white"} />
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1 }}>
                  <div dir="rtl" style={{ fontFamily: AR, fontWeight: 800, fontSize: 26, color: "white", textAlign: "right" }}>
                    {t.profile}
                    {t.text ? <span style={{ fontWeight: 700, fontSize: 22, color: "rgba(255,255,255,0.75)" }}> — {t.text}</span> : null}
                  </div>
                  {/* RAM stick */}
                  <div style={{ marginTop: 10, direction: "ltr" }}>
                    <div style={{ position: "relative", height: 26, borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", overflow: "hidden" }}>
                      <div style={{ width: `${fill}%`, height: "100%", background: i === 2 ? BLUE : i === 1 ? "rgba(91,157,255,0.65)" : "rgba(255,255,255,0.35)", borderRadius: 8, boxShadow: i > 0 ? "0 0 14px rgba(91,157,255,0.5)" : "none" }} />
                      <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                        {Array.from({ length: 8 }).map((_, k) => (
                          <div key={k} style={{ width: 2, height: 14, background: "rgba(0,0,0,0.45)", borderRadius: 999 }} />
                        ))}
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                      <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 24, color: i === 2 ? BLUE : "white" }}>{num}GB{(t as { plus?: boolean }).plus ? "+" : ""}</span>
                      {i === 2 ? <span style={{ display: "flex", alignItems: "center" }}><CheckDraw delay={90 + i * 18} size={24} /></span> : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 4: storage — speed race + rules
const STORAGE_RACE = [
  { en: "HDD", icon: HardDrive, pct: 18, color: "rgba(255,255,255,0.30)", glow: "none" as string },
  { en: "SSD", icon: Zap, pct: 55, color: "rgba(255,255,255,0.75)", glow: "none" as string },
  { en: "NVMe", icon: Rocket, pct: 96, color: BLUE, glow: "0 0 14px rgba(91,157,255,0.7)" },
];

const YourcomputerScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame + 6, fps, config: { damping: 16, stiffness: 140 } });
  const rule1 = spring({ frame: frame - 140, fps, config: { damping: 18, stiffness: 140 } });
  const rule2 = spring({ frame: frame - 190, fps, config: { damping: 18, stiffness: 140 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, padding: "0 36px" }}>
        <div style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [14, 0])}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(91,157,255,0.12)", border: "1px solid rgba(91,157,255,0.30)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(91,157,255,0.25)" }}>
            <HardDrive size={32} color={BLUE} />
          </div>
          <div dir="rtl" style={{ fontFamily: AR, fontWeight: 800, fontSize: 44, color: "white" }}>بالنسبة للـ storage</div>
          <div style={{ width: 64, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, opacity: titleIn, transform: `scaleX(${titleIn})` }} />
        </div>

        {/* speed race */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 940 }}>
          <div dir="rtl" style={{ fontFamily: AR, fontWeight: 700, fontSize: 28, color: "white", textAlign: "center" }}>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>SSD</span>
            <span> أسرع من </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: "rgba(255,255,255,0.6)" }}>HDD</span>
          </div>
          {STORAGE_RACE.map((s, i) => {
            const p = spring({ frame: frame - (24 + i * 12), fps, config: { damping: 18, stiffness: 140 } });
            const w = interpolate(frame, [30 + i * 12, 78 + i * 12], [0, s.pct], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={s.en} style={{ opacity: p, transform: `translateY(${interpolate(p, [0, 1], [14, 0])}px)`, display: "flex", alignItems: "center", gap: 14, borderRadius: 16, background: i === 2 ? "rgba(91,157,255,0.08)" : "rgba(255,255,255,0.04)", border: i === 2 ? "1px solid rgba(91,157,255,0.35)" : "1px solid rgba(255,255,255,0.08)", padding: "14px 18px" }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <s.icon size={22} color={i === 2 ? BLUE : "white"} />
                </div>
                <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 22, color: "white", width: 76 }}>{s.en}</span>
                <div style={{ flex: 1, height: 14, borderRadius: 999, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                  <div style={{ width: `${w}%`, height: "100%", background: s.color, borderRadius: 999, boxShadow: s.glow }} />
                </div>
                {i === 2 ? <span style={{ display: "flex", alignItems: "center" }}><CheckDraw delay={110} size={24} /></span> : null}
              </div>
            );
          })}
        </div>

        {/* rule 1: HDD only -> don't buy */}
        <div style={{ opacity: rule1, transform: `translateY(${interpolate(rule1, [0, 1], [16, 0])}px)`, width: 940, borderRadius: 18, background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.25)", padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 999, background: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <X size={24} color="white" strokeWidth={3} />
          </div>
          <div dir="rtl" style={{ fontFamily: AR, fontWeight: 800, fontSize: 27, color: "white", lineHeight: 1.5 }}>
            <span>اي حاسوب ميدعم </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: "#EF4444" }}>HDD</span>
            <span> برك — متشريش.</span>
          </div>
        </div>

        {/* rule 2: NVMe if budget allows */}
        <div style={{ opacity: rule2, transform: `translateY(${interpolate(rule2, [0, 1], [16, 0])}px)`, width: 940, borderRadius: 18, background: "rgba(91,157,255,0.08)", border: "1px solid rgba(91,157,255,0.30)", padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 0 26px rgba(91,157,255,0.15)" }}>
          <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}><CheckDraw delay={196} size={28} /></span>
          <div dir="rtl" style={{ fontFamily: AR, fontWeight: 700, fontSize: 26, color: "white", lineHeight: 1.6 }}>
            <span>واذا ميزانيتك مليحة </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>NVMe</span>
            <span> أسرع من </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800 }}>SSD</span>
            <span> العادي.</span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 5: GPU — integrated vs dedicated + VRAM rule
const YourcomputerScene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame + 6, fps, config: { damping: 16, stiffness: 140 } });
  const cardA = spring({ frame: frame - 26, fps, config: { damping: 18, stiffness: 140 } });
  const cardB = spring({ frame: frame - 40, fps, config: { damping: 18, stiffness: 140 } });
  const cardC = spring({ frame: frame - 150, fps, config: { damping: 18, stiffness: 140 } });
  const vramGlow = interpolate(frame, [170, 200], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, padding: "0 36px" }}>
        <div style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [14, 0])}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(91,157,255,0.12)", border: "1px solid rgba(91,157,255,0.30)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(91,157,255,0.25)" }}>
            <CircuitBoard size={32} color={BLUE} />
          </div>
          <div dir="rtl" style={{ fontFamily: AR, fontWeight: 800, fontSize: 40, color: "white", textAlign: "center" }}>
            هنا يختالفو بزاف ناس بصح بلا تعقيد:
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, alignItems: "stretch" }}>
          {/* integrated */}
          <div style={{ opacity: cardA, transform: `translateY(${interpolate(cardA, [0, 1], [18, 0])}px)`, width: 460, borderRadius: 22, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            {/* CPU die with glowing iGPU zone */}
            <div style={{ position: "relative", width: 150, height: 150 }}>
              <div style={{ position: "absolute", inset: 14, borderRadius: 12, background: "#101216", border: "1px solid rgba(255,255,255,0.16)" }} />
              {Array.from({ length: 5 }).map((_, k) => (
                <div key={`t${k}`} style={{ position: "absolute", top: 2, left: 30 + k * 18, width: 8, height: 12, borderRadius: 3, background: "rgba(255,255,255,0.25)" }} />
              ))}
              {Array.from({ length: 5 }).map((_, k) => (
                <div key={`b${k}`} style={{ position: "absolute", bottom: 2, left: 30 + k * 18, width: 8, height: 12, borderRadius: 3, background: "rgba(255,255,255,0.25)" }} />
              ))}
              <div style={{ position: "absolute", left: 34, right: 34, top: 52, bottom: 52, borderRadius: 8, background: `rgba(91,157,255,${0.18 + Math.sin(frame * 0.12) * 0.08})`, border: "1px solid rgba(91,157,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 18px rgba(91,157,255,0.35)" }}>
                <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 800, color: BLUE }}>iGPU</span>
              </div>
              <div style={{ position: "absolute", left: 0, right: 0, top: 20, textAlign: "center", fontFamily: MONO, fontSize: 10, color: "rgba(255,255,255,0.45)" }}>CPU</div>
            </div>
            <div dir="rtl" style={{ fontFamily: AR, fontWeight: 700, fontSize: 24, color: "white", lineHeight: 1.6, textAlign: "center" }}>
              اذا نتا تقرا برك — كارت <span style={{ color: BLUE, fontWeight: 900 }}>مدمج</span> يكفيك.
            </div>
            <span style={{ display: "flex", alignItems: "center" }}><CheckDraw delay={60} size={26} /></span>
          </div>

          {/* dedicated */}
          <div style={{ opacity: cardB, transform: `translateY(${interpolate(cardB, [0, 1], [18, 0])}px)`, width: 460, borderRadius: 22, background: "rgba(91,157,255,0.07)", border: "1px solid rgba(91,157,255,0.30)", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, boxShadow: "0 0 26px rgba(91,157,255,0.15)" }}>
            {/* GPU card with spinning fan */}
            <div style={{ position: "relative", width: 220, height: 120, borderRadius: 12, background: "#101216", border: "1px solid rgba(91,157,255,0.30)", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 14, background: "rgba(91,157,255,0.20)", borderTop: "1px solid rgba(91,157,255,0.35)" }} />
              <div style={{ position: "absolute", left: 22, top: 18, width: 76, height: 76, borderRadius: 999, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "relative", width: 56, height: 56, transform: `rotate(${frame * 9}deg)` }}>
                  {[0, 120, 240].map(a => (
                    <div key={a} style={{ position: "absolute", left: "50%", top: "50%", width: 12, height: 26, borderRadius: 6, background: "rgba(91,157,255,0.75)", transform: `translate(-50%,-50%) rotate(${a}deg) translateY(-13px)`, transformOrigin: "center" }} />
                  ))}
                  <div style={{ position: "absolute", left: "50%", top: "50%", width: 14, height: 14, borderRadius: 999, background: BLUE, transform: "translate(-50%,-50%)" }} />
                </div>
              </div>
              <div style={{ position: "absolute", right: 16, top: 22, display: "flex", gap: 5 }}>
                {[0, 1, 2].map(k => (
                  <div key={k} style={{ width: 16, height: 44, borderRadius: 4, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }} />
                ))}
              </div>
              <div style={{ position: "absolute", right: 14, bottom: 24, fontFamily: MONO, fontSize: 10, color: BLUE }}>VRAM</div>
            </div>
            <div dir="rtl" style={{ fontFamily: AR, fontWeight: 700, fontSize: 24, color: "white", lineHeight: 1.6, textAlign: "center" }}>
              مشي كيما <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800 }}>gamer</span> لي يحتاج كارت <span style={{ color: BLUE, fontWeight: 900 }}>منفصل</span>.
            </div>
          </div>
        </div>

        {/* designer / montage rule */}
        <div style={{ opacity: cardC, transform: `translateY(${interpolate(cardC, [0, 1], [18, 0])}px)`, width: 940, borderRadius: 20, background: "rgba(91,157,255,0.07)", border: "1px solid rgba(91,157,255,0.30)", padding: "18px 22px", boxShadow: `0 0 ${vramGlow * 26}px rgba(91,157,255,${vramGlow * 0.25})` }}>
          <div dir="rtl" style={{ fontFamily: AR, fontWeight: 800, fontSize: 27, color: "white", lineHeight: 1.5, textAlign: "center" }}>
            <span>مصمم / مونتاج: كرت منفصل بذاكرة </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 900, color: BLUE }}>VRAM</span>
            <span> لا تقل عن 4–6GB.</span>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12, direction: "ltr" }}>
            {["2", "4", "6", "8", "12"].map(g => {
              const ok = g === "4" || g === "6";
              return (
                <div key={g} style={{ flex: 1, padding: "9px 0", borderRadius: 12, textAlign: "center", fontFamily: MONO, fontSize: 16, fontWeight: 900, background: ok ? `rgba(91,157,255,${0.10 + vramGlow * 0.12})` : "rgba(255,255,255,0.04)", border: ok ? "1px solid rgba(91,157,255,0.45)" : "1px solid rgba(255,255,255,0.08)", color: ok ? "white" : "rgba(255,255,255,0.30)" }}>{g}GB</div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 6: screen — resolution vs refresh vs color
const YourcomputerScene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame + 6, fps, config: { damping: 16, stiffness: 140 } });
  const hz = Math.round(interpolate(frame, [50, 100], [60, 144], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const srgb = interpolate(frame, [150, 200], [0, 100], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scanTop = ((frame * 5) % 150) / 150;

  const rows = [
    {
      key: "fhd",
      delay: 24,
      icon: <Monitor size={26} color="white" />,
      title: (
        <span>
          <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 900, color: BLUE }}>Full HD</span>
          <span> كافي لأي استخدام عادي.</span>
        </span>
      ),
      visual: (
        <div style={{ position: "relative", width: 200, height: 120, borderRadius: 12, background: "#0B0D11", border: "1px solid rgba(255,255,255,0.14)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 26, color: "white" }}>1080p</span>
          <span style={{ position: "absolute", bottom: 8, right: 8, display: "flex" }}><CheckDraw delay={40} size={20} /></span>
        </div>
      ),
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, padding: "0 36px" }}>
        <div style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [14, 0])}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(91,157,255,0.12)", border: "1px solid rgba(91,157,255,0.30)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(91,157,255,0.25)" }}>
            <Monitor size={32} color={BLUE} />
          </div>
          <div dir="rtl" style={{ fontFamily: AR, fontWeight: 800, fontSize: 44, color: "white" }}>بالنسبة للـ screen</div>
          <div style={{ width: 64, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, opacity: titleIn, transform: `scaleX(${titleIn})` }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 940 }}>
          {/* Full HD */}
          {(() => {
            const p = spring({ frame: frame - rows[0].delay, fps, config: { damping: 18, stiffness: 140 } });
            return (
              <div style={{ opacity: p, transform: `translateY(${interpolate(p, [0, 1], [18, 0])}px)`, borderRadius: 22, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", padding: "20px 22px", display: "flex", gap: 18, alignItems: "center" }}>
                <div style={{ width: 54, height: 54, borderRadius: 16, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Monitor size={26} color="white" />
                </div>
                <div dir="rtl" style={{ flex: 1, fontFamily: AR, fontWeight: 700, fontSize: 26, color: "white", lineHeight: 1.6 }}>{rows[0].title}</div>
                {rows[0].visual}
              </div>
            );
          })()}

          {/* Gamer: refresh rate */}
          {(() => {
            const p = spring({ frame: frame - 70, fps, config: { damping: 18, stiffness: 140 } });
            return (
              <div style={{ opacity: p, transform: `translateY(${interpolate(p, [0, 1], [18, 0])}px)`, borderRadius: 22, background: "rgba(91,157,255,0.07)", border: "1px solid rgba(91,157,255,0.30)", padding: "20px 22px", display: "flex", gap: 18, alignItems: "center", boxShadow: "0 0 26px rgba(91,157,255,0.12)" }}>
                <div style={{ width: 54, height: 54, borderRadius: 16, background: "rgba(91,157,255,0.12)", border: "1px solid rgba(91,157,255,0.30)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Gamepad2 size={26} color={BLUE} />
                </div>
                <div dir="rtl" style={{ flex: 1, fontFamily: AR, fontWeight: 700, fontSize: 25, color: "white", lineHeight: 1.6 }}>
                  <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800 }}>Gamer</span>
                  <span>: دور على معدل تحديث عالي (</span>
                  <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 900, color: BLUE }}>120Hz</span>
                  <span> فما فوق) مو بس دقة عالية.</span>
                </div>
                <div style={{ position: "relative", width: 200, height: 120, borderRadius: 12, background: "#0B0D11", border: "1px solid rgba(91,157,255,0.35)", overflow: "hidden", flexShrink: 0 }}>
                  <div style={{ position: "absolute", left: 0, right: 0, top: `${scanTop * 100}%`, height: 26, background: "linear-gradient(180deg, transparent, rgba(91,157,255,0.35), transparent)" }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
                    <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 34, color: "white" }}>{hz}<span style={{ fontSize: 16, color: BLUE }}>Hz</span></span>
                    <span style={{ fontFamily: MONO, fontSize: 10, color: hz >= 120 ? BLUE : "rgba(255,255,255,0.4)" }}>{hz >= 120 ? "✓ SMOOTH" : "…loading"}</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Designer: color accuracy */}
          {(() => {
            const p = spring({ frame: frame - 130, fps, config: { damping: 18, stiffness: 140 } });
            return (
              <div style={{ opacity: p, transform: `translateY(${interpolate(p, [0, 1], [18, 0])}px)`, borderRadius: 22, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", padding: "20px 22px", display: "flex", gap: 18, alignItems: "center" }}>
                <div style={{ width: 54, height: 54, borderRadius: 16, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Palette size={26} color="white" />
                </div>
                <div dir="rtl" style={{ flex: 1, fontFamily: AR, fontWeight: 700, fontSize: 25, color: "white", lineHeight: 1.6 }}>
                  <span>مصمم: دقة الألوان (</span>
                  <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>sRGB coverage</span>
                  <span>) أهم من الدقة نفسها.</span>
                </div>
                <div style={{ width: 200, flexShrink: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ position: "relative", height: 26, borderRadius: 999, background: "linear-gradient(90deg, #EF4444, #FACC15, #22C55E, #22D3EE, #818CF8, #E879F9)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.14)" }}>
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, transparent ${srgb}%, rgba(0,0,0,0.72) ${srgb}%)` }} />
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 12, fontWeight: 800, color: BLUE, textAlign: "center", letterSpacing: "0.08em" }}>sRGB coverage</div>
                </div>
              </div>
            );
          })()}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Yourcomputer: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Sequence from={0} durationInFrames={150}>
        <YourcomputerScene1 />
      </Sequence>
      <Sequence from={150} durationInFrames={340}>
        <YourcomputerScene2 />
      </Sequence>
      <Sequence from={490} durationInFrames={260}>
        <YourcomputerScene3 />
      </Sequence>
      <Sequence from={750} durationInFrames={280}>
        <YourcomputerScene4 />
      </Sequence>
      <Sequence from={1030} durationInFrames={280}>
        <YourcomputerScene5 />
      </Sequence>
      <Sequence from={1310} durationInFrames={280}>
        <YourcomputerScene6 />
      </Sequence>
    </AbsoluteFill>
  );
};

export const YOURCOMPUTER_DURATION = 1590;
export const YOURCOMPUTER_FPS = 30;
export const YOURCOMPUTER_WIDTH = 1080;
export const YOURCOMPUTER_HEIGHT = 1920;

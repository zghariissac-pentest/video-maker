import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { Lock, KeyRound, Laptop, Globe, Cloud, Shield, ShieldX, ShieldAlert, Database, Settings, Server, Info, HardDrive, Cpu, Users, Check, X } from "lucide-react";

const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);
const MONO = "JetBrains Mono, monospace";
const AR = "Cairo, Changa, sans-serif";
const RED = "#EF4444";
const BLUE = "#5B9DFF";

// Word helper — per-word spring
const Word: React.FC<{ w: string; idx: number; start: number; highlight?: boolean; mono?: boolean }> = ({ w, idx, start, highlight, mono }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - (start + idx * 4), fps, config: { damping: 14, stiffness: 160 } });
  return (
    <span style={{ display: "inline-block", opacity: p, transform: `translateY(${interpolate(p, [0, 1], [16, 0])}px)`, color: highlight ? RED : "white", fontWeight: highlight ? 900 : undefined, fontFamily: mono ? MONO : undefined, textShadow: highlight ? "0 0 16px rgba(239,68,68,0.5)" : undefined, padding: "0 4px" }}>
      {w}
    </span>
  );
};

// Quadratic bezier point
const qbez = (p0: { x: number; y: number }, p1: { x: number; y: number }, p2: { x: number; y: number }, t: number) => {
  const u = 1 - t;
  return { x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x, y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y };
};

// Scene 1 (hook): organized in 3 zones —
// ZONE 1 top: hook text. ZONE 2 middle: one clean left→right flow. ZONE 3: single morph slot.
const SsrfScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame + 6, fps, config: { damping: 18, stiffness: 130 } });

  // One horizontal axis: app left, vault right, bend dips below middle
  const APP = { x: 300, y: 480 };
  const VAULT = { x: 780, y: 480 };
  const BEND = { x: 540, y: 660 };
  const FROM = { x: 40, y: 480 };

  // Phase 1: clean HTTP request enters the app (0-40)
  const tIn = interpolate(frame, [6, 38], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const inX = FROM.x + (APP.x - 150 - FROM.x) * tIn;

  // Phase 2: hijack along the bent path (40-95)
  const tHi = interpolate(frame, [40, 95], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const hi = qbez({ x: APP.x + 150, y: APP.y }, BEND, { x: VAULT.x - 90, y: VAULT.y }, tHi);
  const evil = interpolate(frame, [40, 54], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Camera: gentle organized push toward the bend (correct transform origin)
  const zoom = interpolate(frame, [40, 100], [1, 1.28], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fx = interpolate(frame, [40, 100], [540, hi.x], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fy = interpolate(frame, [40, 100], [480, hi.y], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Vault impact shake + pulse on arrival
  const arrived = interpolate(frame, [92, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shake = arrived > 0 && arrived < 1 ? Math.sin(frame * 1.4) * 5 * (1 - arrived) : 0;

  // Phase 3: reveal (105+) — stage crossfades out, single morph slot takes over
  const stageOut = interpolate(frame, [104, 118], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const slam = spring({ frame: frame - 108, fps, config: { damping: 9, stiffness: 170 } });
  const flash = interpolate(frame, [106, 111, 124], [0, 0.85, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Morph chain in ONE slot: SSRF -> Metadata -> Credentials
  const w1 = interpolate(frame, [112, 122, 148, 158], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const w2 = interpolate(frame, [156, 166, 186, 196], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const w3 = interpolate(frame, [194, 206], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const wordsOp = Math.max(w1, w2, w3);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* ── ZONE 1: hook text (compact, top) ── */}
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 72 }}>
        <div dir="rtl" style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [14, 0])}px)`, textAlign: "center", maxWidth: 940, padding: "0 40px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", fontFamily: AR, fontWeight: 800, fontSize: 40, lineHeight: 1.5 }}>
            {"ثغرة ssrf صغيرة...".split(" ").map((w, i) => (
              <Word key={i} w={w} idx={i} start={10} highlight={w === "ssrf"} mono={w === "ssrf"} />
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", fontFamily: AR, fontWeight: 800, fontSize: 34, lineHeight: 1.5, marginTop: 2 }}>
            {"قادر تخلاص بانهم يسؤقولك passwords".split(" ").map((w, i) => (
              <Word key={i} w={w} idx={i} start={22} highlight={w === "passwords"} mono={w === "passwords"} />
            ))}
          </div>
        </div>
      </AbsoluteFill>

      {/* ── ZONE 2: one clean flow (middle) ── */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: stageOut }}>
        <div style={{ width: 1080, height: 800, position: "relative", transform: `scale(${zoom})`, transformOrigin: `${fx}px ${fy}px` }}>
          {/* browser app (left) */}
          <div style={{ position: "absolute", left: APP.x, top: APP.y, transform: "translate(-50%,-50%)", width: 300, borderRadius: 18, background: "#0D0F13", border: `1px solid ${evil > 0.5 ? "rgba(239,68,68,0.55)" : "rgba(255,255,255,0.14)"}`, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.6)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              {[0, 1, 2].map(k => <span key={k} style={{ width: 10, height: 10, borderRadius: 999, background: "rgba(255,255,255,0.25)" }} />)}
              <span style={{ fontFamily: MONO, fontSize: 12, color: "rgba(255,255,255,0.5)", marginLeft: 6 }}>target.com</span>
            </div>
            <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ height: 14, borderRadius: 6, background: "rgba(255,255,255,0.10)", width: "60%" }} />
              <div style={{ height: 54, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
              <div style={{ height: 26, borderRadius: 8, background: evil > 0.5 ? "rgba(239,68,68,0.22)" : "rgba(255,255,255,0.10)", border: evil > 0.5 ? "1px solid rgba(239,68,68,0.6)" : "1px solid rgba(255,255,255,0.10)" }} />
            </div>
          </div>
          <div style={{ position: "absolute", left: APP.x, top: APP.y + 118, transform: "translateX(-50%)", fontFamily: MONO, fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.55)", letterSpacing: "0.14em" }}>WEB APP</div>

          {/* vault (right, same baseline) */}
          <div style={{ position: "absolute", left: VAULT.x + shake, top: VAULT.y, transform: "translate(-50%,-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ width: 130, height: 130, borderRadius: 26, background: "rgba(239,68,68,0.08)", border: "2px dashed rgba(239,68,68,0.55)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 ${20 + arrived * 30}px rgba(239,68,68,${0.15 + arrived * 0.25})` }}>
              <Lock size={48} color={RED} />
            </div>
            <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 800, color: RED, letterSpacing: "0.14em" }}>INTERNAL</span>
          </div>

          {/* single path */}
          <svg width="1080" height="800" style={{ position: "absolute", inset: 0 }}>
            {frame < 44 && (
              <line x1={FROM.x} y1={FROM.y} x2={inX} y2={APP.y} stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="7 7" strokeDashoffset={-frame * 3} />
            )}
            {frame >= 40 && (
              <path d={`M ${APP.x + 150} ${APP.y} Q ${BEND.x} ${BEND.y} ${hi.x} ${hi.y}`} fill="none" stroke={RED} strokeWidth="2.5" opacity={0.75} strokeDasharray="9 7" strokeDashoffset={-frame * 4} />
            )}
          </svg>

          {/* single packet */}
          {frame < 42 && (
            <div style={{ position: "absolute", left: inX, top: APP.y, transform: "translate(-50%,-50%)", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 15, height: 15, borderRadius: 999, background: "white", boxShadow: "0 0 16px rgba(255,255,255,0.9)" }} />
              <span style={{ fontFamily: MONO, fontSize: 12, color: "white", background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.25)", padding: "3px 10px", borderRadius: 7, whiteSpace: "nowrap" }}>GET /fetch?url=…</span>
            </div>
          )}
          {frame >= 40 && (
            <div style={{ position: "absolute", left: hi.x, top: hi.y, transform: "translate(-50%,-50%)", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 17, height: 17, borderRadius: 5, background: RED, boxShadow: "0 0 20px rgba(239,68,68,1)", transform: `rotate(${frame * 6}deg)` }} />
              <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 800, color: RED, background: "rgba(0,0,0,0.85)", border: "1px solid rgba(239,68,68,0.6)", padding: "3px 10px", borderRadius: 7, whiteSpace: "nowrap" }}>url=169.254.169.254</span>
            </div>
          )}
        </div>
      </AbsoluteFill>

      {flash > 0 && (
        <AbsoluteFill style={{ background: `radial-gradient(circle 300px at 50% 55%, rgba(239,68,68,${flash * 0.35}) 0%, transparent 70%)`, pointerEvents: "none" }} />
      )}

      {/* ── ZONE 3: single morph slot (centered, fixed) ── */}
      {wordsOp > 0 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingTop: 120 }}>
          <div style={{ position: "relative", width: 900, height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {w1 > 0 && (
              <div style={{ position: "absolute", opacity: w1, transform: `scale(${interpolate(slam, [0, 1], [0.6, 1])})`, fontFamily: MONO, fontWeight: 900, fontSize: 118, color: "white", letterSpacing: "-0.02em", textShadow: "0 0 50px rgba(239,68,68,0.65)" }}>SSRF</div>
            )}
            {w2 > 0 && (
              <div style={{ position: "absolute", opacity: w2, transform: `translateY(${(1 - w2) * 24}px)`, display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontFamily: MONO, fontSize: 30, color: RED }}>→</span>
                <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 70, color: "#FACC15", textShadow: "0 0 40px rgba(250,204,21,0.5)" }}>Metadata</span>
              </div>
            )}
            {w3 > 0 && (
              <div style={{ position: "absolute", opacity: w3, transform: `translateY(${(1 - w3) * 24}px) scale(${interpolate(w3, [0, 1], [0.9, 1])})`, display: "flex", alignItems: "center", gap: 16, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.4)", padding: "18px 36px", borderRadius: 22, boxShadow: `0 0 ${30 + Math.sin(frame * 0.12) * 10}px rgba(239,68,68,0.30)` }}>
                <span style={{ fontFamily: MONO, fontSize: 30, color: RED }}>→</span>
                <KeyRound size={42} color={RED} />
                <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 62, color: "white", textShadow: "0 0 40px rgba(239,68,68,0.6)" }}>Credentials</span>
              </div>
            )}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

// Scene 2: the normal flow — Attacker →(URL)→ Web App →(HTTP Request)→ Internet
const SsrfScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame + 6, fps, config: { damping: 18, stiffness: 130 } });

  // Chain nodes (stage 1080x1150)
  const NODES = [
    { label: "ATTACKER", icon: Laptop, y: 210 },
    { label: "WEB APPLICATION", icon: Globe, y: 575 },
    { label: "INTERNET", icon: Cloud, y: 940 },
  ];
  // Segments between node edges (node half-height ~95)
  const SEGS = [
    { from: 305, to: 480, tag: "URL", delay: 40 },
    { from: 670, to: 845, tag: "HTTP Request", delay: 70 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Title */}
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 72 }}>
        <div dir="rtl" style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [14, 0])}px)`, textAlign: "center", maxWidth: 960, padding: "0 40px" }}>
          <div style={{ fontFamily: AR, fontWeight: 700, fontSize: 34, color: "white", lineHeight: 1.7, textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}>
            <span>تخيل أن لديك </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Web Application</span>
            <span> يسمح للمستخدم بإدخال </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>URL</span>
            <span>، والـ</span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Server</span>
            <span> يقوم بعمل </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Request</span>
            <span> لهذا الرابط.</span>
          </div>
        </div>
      </AbsoluteFill>

      {/* Vertical chain */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 1080, height: 1150 }}>
          {/* links */}
          <svg width="1080" height="1150" style={{ position: "absolute", inset: 0 }}>
            {SEGS.map((s, i) => {
              const draw = interpolate(frame, [s.delay, s.delay + 22], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const len = s.to - s.from;
              return (
                <g key={i} opacity={draw}>
                  <line x1={540} y1={s.from} x2={540} y2={s.to} stroke="rgba(255,255,255,0.30)" strokeWidth="2" strokeDasharray={len} strokeDashoffset={len * (1 - draw)} />
                  <polygon points={`540,${s.to} 532,${s.to - 12} 548,${s.to - 12}`} fill="rgba(255,255,255,0.5)" />
                </g>
              );
            })}
          </svg>

          {/* travelling packets */}
          {SEGS.map((s, i) => {
            if (frame < s.delay + 22) return null;
            const t = ((frame - s.delay - 22 + i * 20) % 60) / 60;
            const y = s.from + (s.to - s.from) * t;
            return (
              <div key={i} style={{ position: "absolute", left: 540, top: y, transform: "translate(-50%,-50%)", opacity: Math.sin(t * Math.PI), display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 15, height: 15, borderRadius: 999, background: "white", boxShadow: "0 0 16px rgba(255,255,255,0.9)" }} />
                <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 800, color: "#000", background: "white", padding: "3px 12px", borderRadius: 999, whiteSpace: "nowrap" }}>{s.tag}</span>
              </div>
            );
          })}

          {/* nodes */}
          {NODES.map((n, i) => {
            const p = spring({ frame: frame - (14 + i * 22), fps, config: { damping: 16, stiffness: 130 } });
            return (
              <div key={n.label} style={{ position: "absolute", left: 540, top: n.y, transform: `translate(-50%,-50%) scale(${interpolate(p, [0, 1], [0.85, 1])})`, opacity: p, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ width: 150, height: 150, borderRadius: 30, background: i === 1 ? "rgba(91,157,255,0.08)" : "rgba(255,255,255,0.045)", border: i === 1 ? "1.5px solid rgba(91,157,255,0.45)" : "1.5px solid rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: i === 1 ? "0 0 34px rgba(91,157,255,0.20)" : "0 14px 34px rgba(0,0,0,0.5)" }}>
                  <n.icon size={58} color={i === 1 ? BLUE : "white"} />
                </div>
                <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 800, color: "white", letterSpacing: "0.12em", background: "rgba(0,0,0,0.6)", padding: "4px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.14)", whiteSpace: "nowrap" }}>{n.label}</span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 3: the problem — server reaches where attacker can't. Camera dives inside.
const SsrfScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame + 6, fps, config: { damping: 18, stiffness: 130 } });

  // Layout (stage 1080x1000): attacker left, firewall middle, server+internal right
  const ATK = { x: 220, y: 480 };
  const WALL = { x: 500, y: 480 };
  const SRV = { x: 780, y: 360 };
  const INT = { x: 780, y: 660 };

  // Phase A: attacker tries internal -> BLOCKED
  const denyDraw = interpolate(frame, [30, 52], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const denyX = spring({ frame: frame - 54, fps, config: { damping: 9, stiffness: 200 } });
  const denyShake = denyX > 0 && denyX < 1 ? Math.sin(frame * 1.6) * 6 * (1 - denyX) : 0;

  // Phase B: server reaches internal -> allowed
  const allowDraw = interpolate(frame, [80, 104], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const zoneLit = interpolate(frame, [100, 130], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Phase C: camera dives into the internal network
  const dive = interpolate(frame, [130, 185], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const zoom = 1 + dive * 0.75;
  const fx = 540 + (INT.x - 540) * dive;
  const fy = 500 + (INT.y - 500) * dive;

  const hosts = [
    { label: "169.254.169.254", sub: "metadata", icon: Cloud },
    { label: "internal-db", sub: "database", icon: Database },
    { label: "admin panel", sub: ":8080", icon: Settings },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Title */}
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 72 }}>
        <div dir="rtl" style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [14, 0])}px)`, textAlign: "center", maxWidth: 960, padding: "0 40px" }}>
          <div style={{ fontFamily: AR, fontWeight: 700, fontSize: 32, color: "white", lineHeight: 1.7, textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}>
            <span>المشكلة تبدأ عندما يستطيع هذا الـ</span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Server</span>
            <span> الوصول إلى أماكن لا يستطيع الـ</span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: RED }}>Attacker</span>
            <span> الوصول إليها مباشرة.</span>
          </div>
        </div>
      </AbsoluteFill>

      {/* Stage with dive camera */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: 1080, height: 1000, position: "relative", transform: `scale(${zoom})`, transformOrigin: `${fx}px ${fy}px` }}>
          {/* internal zone */}
          <div style={{ position: "absolute", left: 620, top: 200, width: 400, height: 640, borderRadius: 24, background: `rgba(91,157,255,${0.03 + zoneLit * 0.06})`, border: `${zoneLit > 0.5 ? "1.5px solid rgba(91,157,255,0.45)" : "1.5px dashed rgba(255,255,255,0.14)"}`, boxShadow: `0 0 ${zoneLit * 40}px rgba(91,157,255,${zoneLit * 0.20})` }}>
            <div style={{ position: "absolute", top: 12, left: 0, right: 0, textAlign: "center", fontFamily: MONO, fontSize: 13, fontWeight: 800, color: zoneLit > 0.5 ? BLUE : "rgba(255,255,255,0.4)", letterSpacing: "0.18em" }}>INTERNAL NETWORK</div>
          </div>

          {/* attacker */}
          {(() => {
            const p = spring({ frame: frame - 10, fps, config: { damping: 16, stiffness: 140 } });
            return (
              <div style={{ position: "absolute", left: ATK.x, top: ATK.y, transform: "translate(-50%,-50%)", opacity: p, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ width: 130, height: 130, borderRadius: 28, background: "rgba(255,255,255,0.045)", border: "1.5px solid rgba(255,255,255,0.16)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Laptop size={52} color="white" />
                </div>
                <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 800, color: RED, letterSpacing: "0.12em" }}>ATTACKER</span>
              </div>
            );
          })()}

          {/* firewall wall */}
          {(() => {
            const p = spring({ frame: frame - 18, fps, config: { damping: 16, stiffness: 140 } });
            return (
              <div style={{ position: "absolute", left: WALL.x, top: WALL.y, transform: "translate(-50%,-50%)", opacity: p, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ width: 26, height: 420, borderRadius: 13, background: "repeating-linear-gradient(180deg, rgba(239,68,68,0.55) 0 14px, rgba(0,0,0,0.6) 14px 28px)", border: "1px solid rgba(239,68,68,0.5)", boxShadow: "0 0 24px rgba(239,68,68,0.25)" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.16)", padding: "4px 12px", borderRadius: 999 }}>
                  <Shield size={14} color="white" />
                  <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 800, color: "white", letterSpacing: "0.1em" }}>FIREWALL</span>
                </div>
              </div>
            );
          })()}

          {/* denied path attacker -> internal */}
          <svg width="1080" height="1000" style={{ position: "absolute", inset: 0 }}>
            <line x1={ATK.x + 70} y1={ATK.y} x2={620} y2={INT.y} stroke="rgba(239,68,68,0.6)" strokeWidth="2.5" strokeDasharray={380} strokeDashoffset={380 * (1 - denyDraw)} />
          </svg>
          {denyX > 0 && (
            <div style={{ position: "absolute", left: 600 + denyShake, top: INT.y, transform: `translate(-50%,-50%) scale(${interpolate(denyX, [0, 1], [1.8, 1])})`, opacity: denyX }}>
              <ShieldX size={54} color={RED} />
            </div>
          )}

          {/* server */}
          {(() => {
            const p = spring({ frame: frame - 60, fps, config: { damping: 16, stiffness: 140 } });
            return (
              <div style={{ position: "absolute", left: SRV.x, top: SRV.y, transform: "translate(-50%,-50%)", opacity: p, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ width: 130, height: 130, borderRadius: 28, background: "rgba(91,157,255,0.08)", border: "1.5px solid rgba(91,157,255,0.45)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 30px rgba(91,157,255,0.20)" }}>
                  <Globe size={52} color={BLUE} />
                </div>
                <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 800, color: BLUE, letterSpacing: "0.12em" }}>SERVER</span>
              </div>
            );
          })()}

          {/* allowed path server -> internal */}
          <svg width="1080" height="1000" style={{ position: "absolute", inset: 0 }}>
            <line x1={SRV.x} y1={SRV.y + 70} x2={INT.x} y2={INT.y - 130} stroke={BLUE} strokeWidth="2.5" opacity={0.8} strokeDasharray={300} strokeDashoffset={300 * (1 - allowDraw)} />
          </svg>
          {frame > 104 && [0, 1].map(k => {
            const t = ((frame - 104 + k * 30) % 60) / 60;
            return (
              <div key={k} style={{ position: "absolute", left: SRV.x + (INT.x - SRV.x) * t, top: SRV.y + 70 + (INT.y - 130 - (SRV.y + 70)) * t, transform: "translate(-50%,-50%)", opacity: Math.sin(t * Math.PI) * allowDraw }}>
                <div style={{ width: 14, height: 14, borderRadius: 999, background: BLUE, boxShadow: "0 0 14px rgba(91,157,255,0.9)" }} />
              </div>
            );
          })}

          {/* inner hosts revealed by the dive */}
          {hosts.map((h, i) => {
            const p = spring({ frame: frame - (150 + i * 16), fps, config: { damping: 15, stiffness: 140 } });
            const xs = [700, 860, 780];
            const ys = [560, 600, 740];
            return (
              <div key={h.label} style={{ position: "absolute", left: xs[i], top: ys[i], transform: `translate(-50%,-50%) scale(${interpolate(p, [0, 1], [0.7, 1])})`, opacity: p, width: 190, borderRadius: 14, background: "rgba(10,12,16,0.92)", border: "1px solid rgba(91,157,255,0.40)", padding: "10px 12px", display: "flex", alignItems: "center", gap: 9, boxShadow: "0 0 22px rgba(91,157,255,0.25)" }}>
                <h.icon size={22} color={BLUE} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span dir="ltr" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 800, color: "white", whiteSpace: "nowrap" }}>{h.label}</span>
                  <span style={{ fontFamily: MONO, fontSize: 10, color: "rgba(255,255,255,0.45)" }}>{h.sub}</span>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 4: naming SSRF — fetch/sure speech, highlight sweep, cliffhanger
const SsrfScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame + 6, fps, config: { damping: 18, stiffness: 130 } });

  const NODES = [
    { label: "ATTACKER", icon: Laptop, y: 200, color: "white" },
    { label: "SERVER", icon: Server, y: 565, color: BLUE },
    { label: "INTERNAL SERVICE", icon: Database, y: 930, color: RED },
  ];
  const SEGS = [
    { from: 295, to: 470, delay: 34 },
    { from: 660, to: 835, delay: 96 },
  ];

  const fetchIn = spring({ frame: frame - 66, fps, config: { damping: 12, stiffness: 160 } });
  const sureIn = spring({ frame: frame - 122, fps, config: { damping: 12, stiffness: 160 } });

  // highlight sweep across the three labels
  const hi = (i: number) => interpolate(frame, [168 + i * 22, 182 + i * 22, 196 + i * 22, 210 + i * 22], [0, 1, 1, 0.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const closeIn = interpolate(frame, [224, 244], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Title */}
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 64 }}>
        <div dir="rtl" style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [14, 0])}px)`, textAlign: "center", maxWidth: 960, padding: "0 40px" }}>
          <div style={{ fontFamily: AR, fontWeight: 800, fontSize: 38, color: "white", lineHeight: 1.5 }}>
            <span>وهنا تأتي </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 900, color: RED, background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.35)", padding: "2px 16px", borderRadius: 999 }}>SSRF</span>
            <span>، أو </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 700, fontSize: 30, color: "rgba(255,255,255,0.85)" }}>Server-Side Request Forgery</span>
            <span>.</span>
          </div>
          <div dir="rtl" style={{ fontFamily: AR, fontWeight: 700, fontSize: 27, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginTop: 8 }}>
            <span>بدل أن تقوم أنت بإرسال الـ</span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Request</span>
            <span> مباشرة، تجعل الـ</span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Server</span>
            <span> يرسله بالنيابة عنك.</span>
          </div>
        </div>
      </AbsoluteFill>

      {/* Chain with speech */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 1080, height: 1150 }}>
          <svg width="1080" height="1150" style={{ position: "absolute", inset: 0 }}>
            {SEGS.map((s, i) => {
              const draw = interpolate(frame, [s.delay, s.delay + 22], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const len = s.to - s.from;
              return (
                <g key={i} opacity={draw}>
                  <line x1={540} y1={s.from} x2={540} y2={s.to} stroke={i === 0 ? "rgba(255,255,255,0.30)" : "rgba(239,68,68,0.55)"} strokeWidth="2" strokeDasharray={len} strokeDashoffset={len * (1 - draw)} />
                  <polygon points={`540,${s.to} 532,${s.to - 12} 548,${s.to - 12}`} fill={i === 0 ? "rgba(255,255,255,0.5)" : RED} />
                </g>
              );
            })}
          </svg>

          {/* packets */}
          {SEGS.map((s, i) => {
            if (frame < s.delay + 22) return null;
            const t = ((frame - s.delay - 22 + i * 24) % 64) / 64;
            return (
              <div key={i} style={{ position: "absolute", left: 540, top: s.from + (s.to - s.from) * t, transform: "translate(-50%,-50%)", opacity: Math.sin(t * Math.PI) }}>
                <div style={{ width: 14, height: 14, borderRadius: 999, background: i === 0 ? "white" : RED, boxShadow: `0 0 14px ${i === 0 ? "rgba(255,255,255,0.9)" : "rgba(239,68,68,0.9)"}` }} />
              </div>
            );
          })}

          {/* speech bubbles */}
          {fetchIn > 0 && (
            <div style={{ position: "absolute", left: 700, top: 385, opacity: fetchIn, transform: `translateY(${interpolate(fetchIn, [0, 1], [12, 0])}px) scale(${interpolate(fetchIn, [0, 1], [0.85, 1])})`, fontFamily: MONO, fontSize: 17, fontWeight: 800, color: "white", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.18)", padding: "9px 18px", borderRadius: "16px 16px 16px 4px", whiteSpace: "nowrap" }}>
              “Fetch this URL”
            </div>
          )}
          {sureIn > 0 && (
            <div style={{ position: "absolute", left: 380, top: 750, transform: "translate(-100%,0)", opacity: sureIn, fontFamily: MONO, fontSize: 17, fontWeight: 800, color: "#000", background: RED, padding: "9px 18px", borderRadius: "16px 16px 4px 16px", whiteSpace: "nowrap", boxShadow: "0 0 24px rgba(239,68,68,0.45)" }}>
              “Sure”
            </div>
          )}

          {/* nodes with highlight */}
          {NODES.map((n, i) => {
            const p = spring({ frame: frame - (14 + i * 24), fps, config: { damping: 16, stiffness: 130 } });
            const h = hi(i);
            return (
              <div key={n.label} style={{ position: "absolute", left: 540, top: n.y, transform: `translate(-50%,-50%) scale(${interpolate(p, [0, 1], [0.85, 1]) * (1 + h * 0.06)})`, opacity: p, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ width: 150, height: 150, borderRadius: 30, background: i === 2 ? "rgba(239,68,68,0.08)" : i === 1 ? "rgba(91,157,255,0.08)" : "rgba(255,255,255,0.045)", border: `1.5px solid ${i === 2 ? "rgba(239,68,68,0.5)" : i === 1 ? "rgba(91,157,255,0.45)" : "rgba(255,255,255,0.14)"}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 ${h * 40}px ${i === 2 ? "rgba(239,68,68,0.5)" : i === 1 ? "rgba(91,157,255,0.45)" : "rgba(255,255,255,0.20)"}` }}>
                  <n.icon size={58} color={n.color} />
                </div>
                <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 900, color: "white", letterSpacing: "0.12em", background: h > 0.5 ? (i === 2 ? "rgba(239,68,68,0.2)" : "rgba(91,157,255,0.15)") : "rgba(0,0,0,0.6)", padding: "4px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.14)", whiteSpace: "nowrap", textShadow: h > 0.5 ? "0 0 18px rgba(255,255,255,0.6)" : "none" }}>{n.label}</span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Closing cliffhanger */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 72, pointerEvents: "none" }}>
        <div dir="rtl" style={{ opacity: closeIn, transform: `translateY(${interpolate(closeIn, [0, 1], [14, 0])}px) scale(${interpolate(closeIn, [0, 1], [0.96, 1])})`, textAlign: "center", maxWidth: 940, padding: "0 40px" }}>
          <div style={{ fontFamily: AR, fontWeight: 800, fontSize: 38, color: "white", textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}>
            وهنا تصبح الأمور مثيرة للاهتمام.
          </div>
          <div style={{ marginTop: 10, width: 64, height: 2, background: RED, borderRadius: 999, marginInline: "auto", transform: `scaleX(${closeIn})`, boxShadow: "0 0 12px rgba(239,68,68,0.6)" }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 5: cloud VM nesting — app -> metadata service -> credentials
const SsrfScene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame + 6, fps, config: { damping: 18, stiffness: 130 } });
  const cloudIn = interpolate(frame, [8, 26], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const vmIn = spring({ frame: frame - 22, fps, config: { damping: 16, stiffness: 130 } });
  const appIn = spring({ frame: frame - 42, fps, config: { damping: 16, stiffness: 140 } });
  const metaIn = spring({ frame: frame - 72, fps, config: { damping: 14, stiffness: 140 } });
  const linkDraw = interpolate(frame, [66, 88], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const chip1 = spring({ frame: frame - 128, fps, config: { damping: 13, stiffness: 150 } });
  const chip2 = spring({ frame: frame - 150, fps, config: { damping: 13, stiffness: 150 } });
  const closeIn = interpolate(frame, [208, 230], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Title */}
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 64 }}>
        <div dir="rtl" style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [14, 0])}px)`, textAlign: "center", maxWidth: 960, padding: "0 40px" }}>
          <div style={{ fontFamily: AR, fontWeight: 700, fontSize: 31, color: "white", lineHeight: 1.7 }}>
            <span>في الـ</span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Cloud</span>
            <span>، الـ</span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Virtual Machine</span>
            <span> يمكنها الوصول إلى </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Metadata Service</span>
            <span> خاصة بالـ</span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Instance</span>
            <span>.</span>
          </div>
        </div>
      </AbsoluteFill>

      {/* Nesting doll */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 1080, height: 1050, opacity: cloudIn }}>
          {/* cloud zone */}
          <div style={{ position: "absolute", left: 540, top: 560, transform: "translate(-50%,-50%)", width: 860, height: 880, borderRadius: 36, background: "rgba(91,157,255,0.04)", border: "2px dashed rgba(91,157,255,0.35)" }}>
            <div style={{ position: "absolute", top: 14, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Cloud size={20} color={BLUE} />
              <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 800, color: BLUE, letterSpacing: "0.2em" }}>CLOUD</span>
            </div>
          </div>

          {/* VM box */}
          <div style={{ position: "absolute", left: 540, top: 470, transform: `translate(-50%,-50%) scale(${interpolate(vmIn, [0, 1], [0.9, 1])})`, opacity: vmIn, width: 620, borderRadius: 24, background: "rgba(255,255,255,0.045)", border: "1.5px solid rgba(255,255,255,0.16)", padding: "16px", display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 18px 50px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
              <Server size={22} color="white" />
              <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 800, color: "white", letterSpacing: "0.14em" }}>VIRTUAL MACHINE</span>
            </div>

            {/* application */}
            <div style={{ opacity: appIn, transform: `translateY(${interpolate(appIn, [0, 1], [14, 0])}px)`, borderRadius: 16, background: "rgba(91,157,255,0.08)", border: "1px solid rgba(91,157,255,0.35)", padding: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <Globe size={24} color={BLUE} />
              <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 800, color: "white" }}>Application</span>
            </div>

            {/* link app -> metadata */}
            <svg width="588" height="46" viewBox="0 0 588 46" style={{ opacity: linkDraw, margin: "-4px auto" }}>
              <line x1={294} y1={0} x2={294} y2={34} stroke={BLUE} strokeWidth="2" strokeDasharray={34} strokeDashoffset={34 * (1 - linkDraw)} />
              <polygon points="294,44 287,33 301,33" fill={BLUE} />
            </svg>

            {/* metadata service */}
            <div style={{ opacity: metaIn, transform: `translateY(${interpolate(metaIn, [0, 1], [14, 0])}px) scale(${interpolate(metaIn, [0, 1], [0.92, 1])})`, borderRadius: 16, background: "rgba(250,204,21,0.07)", border: "1px solid rgba(250,204,21,0.45)", padding: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 0 28px rgba(250,204,21,0.18)" }}>
              <Database size={24} color="#FACC15" />
              <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 800, color: "white" }}>Metadata Service</span>
            </div>
            <div dir="ltr" style={{ textAlign: "center", fontFamily: MONO, fontSize: 12, color: "rgba(255,255,255,0.45)" }}>169.254.169.254</div>
          </div>

          {/* credential chips */}
          <div style={{ position: "absolute", left: 540, top: 905, transform: "translateX(-50%)", display: "flex", gap: 14 }}>
            <div style={{ opacity: chip1, transform: `translateY(${interpolate(chip1, [0, 1], [16, 0])}px) scale(${interpolate(chip1, [0, 1], [0.85, 1])})`, display: "flex", alignItems: "center", gap: 9, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", padding: "11px 20px", borderRadius: 999 }}>
              <Info size={18} color="white" />
              <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 800, color: "white", whiteSpace: "nowrap" }}>Instance Information</span>
            </div>
            <div style={{ opacity: chip2, transform: `translateY(${interpolate(chip2, [0, 1], [16, 0])}px) scale(${interpolate(chip2, [0, 1], [0.85, 1])})`, display: "flex", alignItems: "center", gap: 9, background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.45)", padding: "11px 20px", borderRadius: 999, boxShadow: "0 0 24px rgba(239,68,68,0.25)" }}>
              <KeyRound size={18} color={RED} />
              <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 800, color: "white", whiteSpace: "nowrap" }}>Temporary Credentials</span>
            </div>
          </div>

          {/* packets app -> metadata */}
          {frame > 92 && [0, 1].map(k => {
            const t = ((frame - 92 + k * 30) % 60) / 60;
            return (
              <div key={k} style={{ position: "absolute", left: 540, top: 560 + t * 90, transform: "translate(-50%,-50%)", opacity: Math.sin(t * Math.PI) * linkDraw }}>
                <div style={{ width: 12, height: 12, borderRadius: 999, background: "#FACC15", boxShadow: "0 0 12px rgba(250,204,21,0.9)" }} />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Closing caption */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 64, pointerEvents: "none" }}>
        <div dir="rtl" style={{ opacity: closeIn, transform: `translateY(${interpolate(closeIn, [0, 1], [14, 0])}px)`, textAlign: "center", maxWidth: 960, padding: "0 40px" }}>
          <div style={{ fontFamily: AR, fontWeight: 700, fontSize: 28, color: "rgba(255,255,255,0.92)", lineHeight: 1.7 }}>
            <span>هذه الخدمة قد توفر معلومات عن الـ</span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Instance</span>
            <span>، وفي بعض البيئات يمكن أن تكون مصدرًا لـ</span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: RED }}>Temporary Credentials</span>
            <span>.</span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 6: exfiltration — creds travel server -> attacker -> cloud apis
const SsrfScene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kickIn = interpolate(frame, [4, 16], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const chain = [
    { label: "SSRF", color: RED, bg: "rgba(239,68,68,0.10)", border: "rgba(239,68,68,0.45)" },
    { label: "Metadata Service", color: "#FACC15", bg: "rgba(250,204,21,0.07)", border: "rgba(250,204,21,0.45)" },
    { label: "Temporary Credentials", color: "#FFFFFF", bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.16)", icon: true },
  ];
  const cap1 = interpolate(frame, [10, 26, 148, 164], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cap2 = interpolate(frame, [168, 186], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const srvIn = spring({ frame: frame - 150, fps, config: { damping: 16, stiffness: 130 } });
  const atkIn = spring({ frame: frame - 164, fps, config: { damping: 16, stiffness: 130 } });
  const pathDraw = interpolate(frame, [172, 196], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const apiIn = spring({ frame: frame - 218, fps, config: { damping: 12, stiffness: 150 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 72 }}>
        <div style={{ opacity: kickIn, fontFamily: MONO, fontSize: 15, color: RED, letterSpacing: "0.32em" }}>06 · EXFILTRATION</div>
      </AbsoluteFill>

      {/* chain */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 1080, height: 1150 }}>
          <div style={{ position: "absolute", left: 540, top: 300, transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
            {chain.map((c, i) => {
              const p = spring({ frame: frame - (18 + i * 26), fps, config: { damping: 16, stiffness: 140 } });
              const link = i < 2 ? interpolate(frame, [44 + i * 26, 62 + i * 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
              return (
                <div key={c.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: p }}>
                  <div style={{ transform: `scale(${interpolate(p, [0, 1], [0.85, 1])})`, display: "flex", alignItems: "center", gap: 10, background: c.bg, border: `1.5px solid ${c.border}`, padding: "13px 30px", borderRadius: 999, boxShadow: `0 0 26px ${c.border}` }}>
                    {c.icon ? <KeyRound size={20} color={RED} /> : null}
                    <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 22, color: "white", whiteSpace: "nowrap" }}>{c.label}</span>
                  </div>
                  {i < 2 && (
                    <div style={{ position: "relative", width: 2, height: 44, background: "rgba(255,255,255,0.10)", borderRadius: 999, margin: "6px 0", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: `${link * 100}%`, background: c.color }} />
                      <div style={{ position: "absolute", left: "50%", top: 38, transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `8px solid ${c.color}`, opacity: link }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* exfil row: server -> attacker */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 830 }}>
            <svg width="1080" height="120" style={{ position: "absolute", inset: 0 }}>
              <line x1={300} y1={60} x2={780} y2={60} stroke={RED} strokeWidth="2.5" opacity={0.7 * pathDraw} strokeDasharray={480} strokeDashoffset={480 * (1 - pathDraw)} />
              <line x1={300} y1={60} x2={780} y2={60} stroke="rgba(255,255,255,0.12)" strokeWidth="7" opacity={0.5 * pathDraw} strokeDasharray={480} strokeDashoffset={480 * (1 - pathDraw)} />
            </svg>
            {frame > 200 && [0, 1].map(k => {
              const t = ((frame - 200 + k * 30) % 60) / 60;
              return (
                <div key={k} style={{ position: "absolute", left: 300 + 480 * t, top: 60, transform: "translate(-50%,-50%)", opacity: Math.sin(t * Math.PI) }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(0,0,0,0.85)", border: "1px solid rgba(239,68,68,0.6)", padding: "5px 13px", borderRadius: 999, boxShadow: "0 0 18px rgba(239,68,68,0.6)" }}>
                    <KeyRound size={14} color={RED} />
                    <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 800, color: "white", letterSpacing: 2 }}>••••</span>
                  </div>
                </div>
              );
            })}
            <div style={{ position: "absolute", left: 300, top: 60, transform: "translate(-50%,-50%)", opacity: srvIn, display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
              <div style={{ width: 104, height: 104, borderRadius: 24, background: "rgba(91,157,255,0.08)", border: "1px solid rgba(91,157,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Server size={44} color={BLUE} />
              </div>
              <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 800, color: "white", letterSpacing: "0.1em" }}>SERVER</span>
            </div>
            <div style={{ position: "absolute", left: 780, top: 60, transform: "translate(-50%,-50%)", opacity: atkIn, display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
              <div style={{ width: 104, height: 104, borderRadius: 24, background: atkIn > 0.7 ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.045)", border: atkIn > 0.7 ? "1.5px solid rgba(239,68,68,0.55)" : "1px solid rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: atkIn > 0.7 ? "0 0 30px rgba(239,68,68,0.35)" : "none" }}>
                <Laptop size={44} color={atkIn > 0.7 ? RED : "white"} />
              </div>
              <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 800, color: atkIn > 0.7 ? RED : "white", letterSpacing: "0.1em" }}>ATTACKER</span>
            </div>
            {apiIn > 0 && (
              <div style={{ position: "absolute", left: 780, top: 150, transform: "translateX(-50%)", opacity: apiIn }}>
                <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 800, color: "#000", background: "#FACC15", padding: "6px 18px", borderRadius: 999, boxShadow: "0 0 22px rgba(250,204,21,0.5)", whiteSpace: "nowrap" }}>+ Cloud APIs</span>
              </div>
            )}
          </div>
        </div>
      </AbsoluteFill>

      {/* captions */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 64, pointerEvents: "none" }}>
        <div dir="rtl" style={{ position: "relative", width: 940, height: 150, padding: "0 40px" }}>
          <div style={{ opacity: cap1, position: "absolute", inset: "0 40px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: AR, fontWeight: 700, fontSize: 29, color: "white", lineHeight: 1.6, textAlign: "center", textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}>
            <div>
              <span>الآن لم يعد الـ</span>
              <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Attacker</span>
              <span> يحاول الوصول إلى الـ</span>
              <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Internal Service</span>
              <span> فقط.</span>
            </div>
          </div>
          <div style={{ opacity: cap2, position: "absolute", inset: "0 40px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: AR, fontWeight: 800, fontSize: 30, color: "white", lineHeight: 1.6, textAlign: "center", textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}>
            <div>
              <span>قد أصبح لديه </span>
              <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: RED }}>Temporary Credentials</span>
              <span> يمكن استخدامها مع </span>
              <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: "#FACC15" }}>Cloud APIs</span>
              <span>.</span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 7: permissions — restricted vs overprivileged identity
const OVER_ROWS = ["Storage", "Databases", "Secrets", "Compute", "IAM"];
const OVER_ICONS = [HardDrive, Database, KeyRound, Cpu, Users];

const SsrfScene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame + 6, fps, config: { damping: 18, stiffness: 130 } });
  const leftIn = spring({ frame: frame - 28, fps, config: { damping: 17, stiffness: 130 } });
  const rightIn = spring({ frame: frame - 44, fps, config: { damping: 17, stiffness: 130 } });

  const cap3 = interpolate(frame, [128, 146, 198, 214], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cap4 = interpolate(frame, [218, 238], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const vsIn = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const warnIn = interpolate(frame, [140, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 60 }}>
        <div style={{ opacity: titleIn, transform: "translateY(" + interpolate(titleIn, [0, 1], [14, 0]) + "px)", textAlign: "center" }}>
          <div style={{ fontFamily: MONO, fontSize: 15, color: "#FACC15", letterSpacing: "0.32em", marginBottom: 8 }}>07 - PERMISSIONS</div>
          <div dir="rtl" style={{ fontFamily: AR, fontWeight: 800, fontSize: 33, color: "white", lineHeight: 1.6, maxWidth: 960, padding: "0 40px" }}>
            <span>لكن هنا توجد نقطة مهمة جدا: الحصول على </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: RED }}>Credentials</span>
            <span> لا يعني تلقائيا السيطرة على الـ</span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Cloud</span>
            <span>.</span>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 18, alignItems: "stretch", marginTop: 90 }}>
          <div style={{ opacity: leftIn, transform: "translateY(" + interpolate(leftIn, [0, 1], [18, 0]) + "px)", width: 440, borderRadius: 22, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
              <Shield size={26} color="rgba(255,255,255,0.7)" />
              <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 19, color: "white" }}>Restricted Identity</span>
            </div>
            <PermRow delay={58} ok={true} a="Read" b="Specific Resource" frame={frame} fps={fps} />
            <PermRow delay={78} ok={false} a="Write" b="None" frame={frame} fps={fps} />
            <div style={{ textAlign: "center", fontFamily: MONO, fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>LEAST PRIVILEGE - SAFE</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", fontFamily: MONO, fontWeight: 900, fontSize: 20, color: "rgba(255,255,255,0.35)", fontStyle: "italic", opacity: vsIn }}>VS</div>

          <div style={{ opacity: rightIn, transform: "translateY(" + interpolate(rightIn, [0, 1], [18, 0]) + "px)", width: 440, borderRadius: 22, background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.40)", padding: "20px", display: "flex", flexDirection: "column", gap: 9, boxShadow: "0 0 34px rgba(239,68,68,0.18)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
              <ShieldAlert size={26} color={RED} />
              <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 19, color: "white" }}>Overprivileged Identity</span>
            </div>
            {OVER_ROWS.map((name, i) => {
              const Icon = OVER_ICONS[i];
              const p = spring({ frame: frame - (70 + i * 12), fps, config: { damping: 16, stiffness: 150 } });
              return (
                <div key={name} style={{ opacity: p, transform: "translateX(" + interpolate(p, [0, 1], [-14, 0]) + "px)", display: "flex", alignItems: "center", gap: 10, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 12, padding: "9px 14px" }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: RED, boxShadow: "0 0 10px rgba(239,68,68,0.8)" }} />
                  <Icon size={17} color="white" />
                  <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 15, color: "white" }}>{name}</span>
                </div>
              );
            })}
            <div style={{ textAlign: "center", fontFamily: MONO, fontSize: 11, color: RED, letterSpacing: "0.1em", opacity: warnIn }}>!! BLAST RADIUS: EVERYTHING</div>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 60, pointerEvents: "none" }}>
        <div dir="rtl" style={{ position: "relative", width: 940, height: 150, padding: "0 40px" }}>
          <div style={{ opacity: cap3, position: "absolute", top: 0, bottom: 0, left: 40, right: 40, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: AR, fontWeight: 700, fontSize: 29, color: "white", lineHeight: 1.6, textAlign: "center", textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}>
            <div>
              <span>كل شيء يعتمد على الصلاحيات المرتبطة بهذه الـ</span>
              <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Identity</span>
              <span>.</span>
            </div>
          </div>
          <div style={{ opacity: cap4, position: "absolute", top: 0, bottom: 0, left: 40, right: 40, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: AR, fontWeight: 800, fontSize: 28, color: "white", lineHeight: 1.6, textAlign: "center", textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}>
            <div>
              <span>اذا كانت الصلاحيات اوسع مما يجب، يمكن ان تتحول </span>
              <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: RED }}>SSRF</span>
              <span> الى نقطة بداية لهجوم اكبر بكثير.</span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const PermRow: React.FC<{ delay: number; ok: boolean; a: string; b: string; frame: number; fps: number }> = ({ delay, ok, a, b, frame, fps }) => {
  const p = spring({ frame: frame - delay, fps, config: { damping: 16, stiffness: 150 } });
  return (
    <div style={{ opacity: p, display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "11px 14px" }}>
      {ok ? <Check size={18} color="#22C55E" /> : <X size={18} color="rgba(255,255,255,0.4)" />}
      <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 16, color: "white" }}>{a}</span>
      <span style={{ color: "rgba(255,255,255,0.35)" }}>-&gt;</span>
      <span style={{ fontFamily: MONO, fontSize: 14, color: ok ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.4)" }}>{b}</span>
    </div>
  );
};

export const Ssrf: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Sequence from={0} durationInFrames={240}>
        <SsrfScene1 />
      </Sequence>
      <Sequence from={240} durationInFrames={220}>
        <SsrfScene2 />
      </Sequence>
      <Sequence from={460} durationInFrames={240}>
        <SsrfScene3 />
      </Sequence>
      <Sequence from={700} durationInFrames={300}>
        <SsrfScene4 />
      </Sequence>
      <Sequence from={1000} durationInFrames={300}>
        <SsrfScene5 />
      </Sequence>
      <Sequence from={1300} durationInFrames={300}>
        <SsrfScene6 />
      </Sequence>
      <Sequence from={1600} durationInFrames={320}>
        <SsrfScene7 />
      </Sequence>
    </AbsoluteFill>
  );
};

export const SSRF_DURATION = 1920;
export const SSRF_FPS = 30;
export const SSRF_WIDTH = 1080;
export const SSRF_HEIGHT = 1920;

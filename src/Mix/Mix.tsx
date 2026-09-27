import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig, Easing, Sequence } from "remotion";
import { Terminal, Code, Globe, Monitor, Activity, Rocket, Bell, Lock, Image, Wifi, Search, Flag, Box, Package, GitBranch, Cpu } from "lucide-react";


const BLUE = "#5B9DFF";
const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);
const MONO = "JetBrains Mono, monospace";
const AR = "Cairo, Changa, sans-serif";

// Triangle geometry (in a 1080x1180 stage, center CX/CY)
const CX = 540;
const CY = 560;
const BASE = [
  { x: 540, y: 225 }, // top — ENVIRONMENT
  { x: 265, y: 705 }, // bottom-left — HACKING
  { x: 815, y: 705 }, // bottom-right — UI AESTHETIC
];

const NODES = [
  { en: "ENVIRONMENT", ar: "بيئة العمل", img: "mix-env.svg", accent: BLUE },
  { en: "HACKING", ar: "الاختراق", img: "mix-hack.svg", accent: "#FFFFFF" },
  { en: "UI AESTHETIC", ar: "جمالية الواجهة", img: "mix-ui.svg", accent: BLUE },
];

const rotPt = (p: { x: number; y: number }, a: number) => {
  const dx = p.x - CX;
  const dy = p.y - CY;
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: CX + dx * c - dy * s, y: CY + dx * s + dy * c };
};

// point travelling the triangle perimeter, s in [0,1)
const perimPt = (v: { x: number; y: number }[], s: number) => {
  const lens = [0, 1, 2].map(i => {
    const a = v[i];
    const b = v[(i + 1) % 3];
    return Math.hypot(b.x - a.x, b.y - a.y);
  });
  const total = lens[0] + lens[1] + lens[2];
  let d = (((s % 1) + 1) % 1) * total;
  for (let i = 0; i < 3; i++) {
    if (d <= lens[i] || i === 2) {
      const t = Math.min(1, d / lens[i]);
      const a = v[i];
      const b = v[(i + 1) % 3];
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    }
    d -= lens[i];
  }
  return v[0];
};

const MixHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── fast timeline ─────────────────────────────────────────────
  // 0-28:   triangle snaps into shape (quick formation)
  // 28-84:  rotation + energy exchange
  // 86-128: contraction — merge to center
  // 126-140: flash + shockwaves, core born
  // 140-180: core blooms, satellites orbit
  // 180-240: lockup + breathing hold

  const rotA = interpolate(frame, [28, 84], [0, 0.7], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const contract = interpolate(frame, [86, 128], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const vertsU = BASE.map(p => rotPt(p, rotA)); // uncontracted (for streak anchors)
  const verts = vertsU.map(r => ({ x: CX + (r.x - CX) * (1 - contract), y: CY + (r.y - CY) * (1 - contract) }));

  const triIn = interpolate(frame, [4, 14], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const triOut = interpolate(frame, [118, 132], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const triOp = triIn * triOut;

  const flash = interpolate(frame, [126, 131, 140], [0, 0.85, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const coreIn = spring({ frame: frame - 124, fps, config: { damping: 13, stiffness: 130 } });
  const coreOp = interpolate(frame, [124, 136], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Tux appears right after the merge completes
  const tuxIn = spring({ frame: frame - 146, fps, config: { damping: 12, stiffness: 140 } });
  const tuxScale = interpolate(tuxIn, [0, 1], [0.5, 1]);
  const tuxRot = interpolate(tuxIn, [0, 1], [-8, 0]);
  const glow = 0.5 + Math.sin(frame * 0.15) * 0.25;

  const satOp = interpolate(frame, [140, 160], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tagIn = interpolate(frame, [178, 195], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const arIn = interpolate(frame, [6, 20], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // perimeter traveller + comet trail
  const travS = (frame - 16) / 72;
  const trav = frame > 16 ? perimPt(verts, travS) : verts[0];
  const trail = frame > 16 ? perimPt(verts, travS - 0.03) : verts[0];

  const sats = [0, 1, 2].map(i => {
    const a = frame * 0.032 + i * ((Math.PI * 2) / 3);
    const x = CX + Math.cos(a) * 250;
    const y = CY + Math.sin(a) * 135;
    const d = (Math.sin(a) + 1) / 2;
    return { x, y, scale: 0.82 + 0.28 * d, op: satOp * (0.55 + 0.45 * d), i };
  });

  const ring = (f0: number) => ({
    r: interpolate(frame, [f0, f0 + 30], [30, 340], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    op: (1 - interpolate(frame, [f0, f0 + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })) * 0.55,
  });
  const r1 = ring(128);
  const r2 = ring(135);

  // implosion streaks during contraction
  const streakOp = Math.sin(Math.min(1, Math.max(0, contract)) * Math.PI) * 0.85;

  // rotation-phase float envelope
  const floatEnv = interpolate(frame, [28, 40, 84, 96], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* vignette + ambient core glow */}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 90% 75% at 50% 48%, transparent 55%, rgba(0,0,0,0.55) 100%)", pointerEvents: "none" }} />
      <AbsoluteFill style={{ background: `radial-gradient(circle 260px at 50% 47%, rgba(91,157,255,${0.10 + flash * 0.45 + coreOp * 0.08}) 0%, transparent 70%)`, pointerEvents: "none" }} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 1080, height: 1180 }}>
          {/* ── triangle edges (glowing) ── */}
          <svg width="1080" height="1180" style={{ position: "absolute", inset: 0, opacity: triOp, filter: "drop-shadow(0 0 10px rgba(91,157,255,0.35))" }}>
            <polygon
              points={verts.map(v => `${v.x},${v.y}`).join(" ")}
              fill="rgba(91,157,255,0.05)"
              stroke="rgba(255,255,255,0.30)"
              strokeWidth="1.5"
              strokeDasharray="12 9"
              strokeDashoffset={-frame * 2.2}
            />
            <polygon
              points={verts.map(v => `${v.x},${v.y}`).join(" ")}
              fill="none"
              stroke={BLUE}
              strokeWidth="1.2"
              strokeDasharray="3 14"
              strokeDashoffset={frame * 3}
              opacity={0.8}
            />
            {/* traveller comet */}
            {frame > 16 && (
              <g>
                <line x1={trail.x} y1={trail.y} x2={trav.x} y2={trav.y} stroke="white" strokeWidth="2.5" opacity={0.5} strokeLinecap="round" />
                <circle cx={trav.x} cy={trav.y} r="11" fill={BLUE} opacity={0.20} />
                <circle cx={trav.x} cy={trav.y} r="4.5" fill="white" />
              </g>
            )}
          </svg>

          {/* ── implosion streaks ── */}
          {streakOp > 0.02 && (
            <svg width="1080" height="1180" style={{ position: "absolute", inset: 0, opacity: streakOp }}>
              {Array.from({ length: 9 }).map((_, k) => {
                const anchor = perimPt(vertsU, k / 9 + 0.04);
                const e = Easing.inOut(Easing.cubic)(contract);
                return (
                  <circle key={k} cx={anchor.x + (CX - anchor.x) * e} cy={anchor.y + (CY - anchor.y) * e} r={k % 3 === 0 ? 3.5 : 2.2} fill={k % 3 === 0 ? "white" : BLUE} />
                );
              })}
            </svg>
          )}

          {/* ── the three nodes (upgraded orbs) ── */}
          {NODES.map((n, i) => {
            const sp = spring({ frame: frame - (4 + i * 5), fps, config: { damping: 15, stiffness: 130 } });
            const sx = CX + (BASE[i].x - CX) * 2.1;
            const sy = CY + (BASE[i].y - CY) * 2.1;
            const bob = Math.sin(frame * 0.12 + i * 2.1) * 6 * floatEnv;
            const x = sx + (verts[i].x - sx) * sp;
            const y = sy + (verts[i].y - sy) * sp + bob;
            const shrink = 1 - contract * 0.55;
            const op = sp * (1 - interpolate(frame, [118, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
            const blue = n.accent === BLUE;
            const logoScale = interpolate(sp, [0, 1], [0.5, 1]);
            return (
              <div key={n.en} style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) scale(${shrink})`, opacity: op, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ position: "relative", width: 215, height: 170, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, ${blue ? "rgba(91,157,255,0.20)" : "rgba(255,255,255,0.08)"} 0%, transparent 65%)`, pointerEvents: "none" }} />
                  <Img src={staticFile(n.img)} style={{ position: "relative", width: 185, height: 140, objectFit: "contain", display: "block", transform: `scale(${logoScale})`, opacity: sp, filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.65))" }} />
                </div>
                <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 16, color: "white", letterSpacing: "0.08em", whiteSpace: "nowrap", textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}>{n.en}</div>
                <div dir="rtl" style={{ fontFamily: AR, fontSize: 15, color: "rgba(255,255,255,0.55)" }}>{n.ar}</div>
              </div>
            );
          })}

          {/* ── flash + shockwaves ── */}
          <div style={{ position: "absolute", left: CX, top: CY, width: 1080, height: 1080, transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(91,157,255,0.35) 30%, transparent 65%)", opacity: flash, pointerEvents: "none" }} />
          {[r1, r2].map((r, k) => (
            <div key={k} style={{ position: "absolute", left: CX, top: CY, width: r.r * 2, height: r.r * 2, borderRadius: 999, border: "1.5px solid rgba(255,255,255,0.5)", transform: "translate(-50%,-50%)", opacity: r.op, pointerEvents: "none" }} />
          ))}

          {/* ── the ONE: Tux free-floating ── */}
          {coreOp > 0 && (
            <div style={{ position: "absolute", left: CX, top: CY, transform: `translate(-50%,-50%) scale(${interpolate(coreIn, [0, 1], [0.6, 1])})`, opacity: coreOp, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ position: "relative", width: 300, height: 270, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, rgba(91,157,255,${0.22 + glow * 0.15}) 0%, transparent 65%)`, pointerEvents: "none" }} />
                <div style={{ opacity: tuxIn, transform: `scale(${tuxScale}) rotate(${tuxRot}deg)`, position: "relative", filter: "drop-shadow(0 16px 30px rgba(0,0,0,0.65))" }}>
                  <Img src={staticFile("best-tux-cut.png")} style={{ width: 260, height: 235, objectFit: "contain", display: "block" }} />
                </div>
              </div>
              <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 24, color: "white", letterSpacing: "0.10em", textShadow: "0 2px 14px rgba(0,0,0,0.7)" }}>LINUX</div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: BLUE, letterSpacing: "0.30em" }}>THE ONE</div>
            </div>
          )}

          {/* ── orbit ring + spokes + satellites ── */}
          {satOp > 0 && (
            <svg width="1080" height="1180" style={{ position: "absolute", inset: 0, opacity: satOp * 0.55, filter: "drop-shadow(0 0 6px rgba(91,157,255,0.4))" }}>
              <ellipse cx={CX} cy={CY} rx="250" ry="135" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1" strokeDasharray="6 10" strokeDashoffset={-frame * 1.4} />
              {sats.map(s => (
                <line key={s.i} x1={CX} y1={CY} x2={s.x} y2={s.y} stroke="rgba(91,157,255,0.32)" strokeWidth="1" />
              ))}
            </svg>
          )}
          {sats.map(s => (
            <div key={s.i} style={{ position: "absolute", left: s.x, top: s.y, transform: `translate(-50%,-50%) scale(${s.scale})`, opacity: s.op, display: "flex", alignItems: "center", gap: 8, background: "rgba(12,14,18,0.88)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 999, padding: "7px 15px 7px 9px", boxShadow: "0 4px 14px rgba(0,0,0,0.5)" }}>
              <Img src={staticFile(NODES[s.i].img)} style={{ width: 30, height: 26, objectFit: "contain", display: "block", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }} />
              <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 13, color: "white", letterSpacing: "0.06em" }}>{["ENV", "HACK", "UI"][s.i]}</span>
            </div>
          ))}

          {/* ── lockup tagline ── */}
          <div style={{ position: "absolute", left: CX, top: CY + 330, transform: `translate(-50%,0) translateY(${interpolate(tagIn, [0, 1], [14, 0])}px)`, opacity: tagIn, textAlign: "center" }}>
            <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 26, color: "white", letterSpacing: "0.06em", whiteSpace: "nowrap", textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}>ONE WORKSTATION. THREE FORCES.</div>
            <div style={{ marginTop: 10, width: 72, height: 2, background: BLUE, borderRadius: 999, marginInline: "auto", transform: `scaleX(${tagIn})`, boxShadow: "0 0 12px rgba(91,157,255,0.6)" }} />
          </div>
        </div>
      </AbsoluteFill>

      {/* Arabic hook under animation */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 110, pointerEvents: "none" }}>
        <div dir="rtl" style={{ opacity: arIn, transform: `translateY(${interpolate(arIn, [0, 1], [12, 0])}px)`, textAlign: "center", maxWidth: 940, padding: "0 40px" }}>
          <div style={{ fontFamily: AR, fontWeight: 800, fontSize: 40, color: "white", lineHeight: 1.5, textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}>
            <span>اليوم نوريلك كيفاش توازن بين </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>eniverment</span>
            <span> و </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>hackin</span>
            <span> و </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>UI asthtic</span>
          </div>
          <div style={{ marginTop: 12, width: 64, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, marginInline: "auto" }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── SCENE 2: distro — three choices, spotlight cycle ────────────────
const DISTROS = [
  { en: "Fedora", ar: "حديثة • مستقرة", img: "mix-fedora.svg", color: "#51A2DA" },
  { en: "Arch", ar: "تحكم كامل • آخر التحديثات", img: "mix-arch.svg", color: "#1793D1" },
  { en: "Debian", ar: "صلبة • موثوقة", img: "mix-env.svg", color: "#D70A53" },
];

const MixDistro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame + 6, fps, config: { damping: 20, stiffness: 110 } });
  const subIn = interpolate(frame, [16, 32], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const capIn = interpolate(frame, [24, 40], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // spotlight cycles 0→1→2, then locks all three on
  const cyc = frame < 150 ? Math.floor(Math.max(0, frame - 64) / 26) % 3 : -1;
  const sweepX = interpolate(frame, [56, 100], [-300, 1200], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 90% 75% at 50% 48%, transparent 55%, rgba(0,0,0,0.55) 100%)", pointerEvents: "none" }} />
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26, padding: "0 40px" }}>
        <div style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [14, 0])}px)`, textAlign: "center" }}>
          <div style={{ fontFamily: MONO, fontSize: 15, color: BLUE, letterSpacing: "0.32em", marginBottom: 10 }}>01 · DISTRO</div>
          <div dir="rtl" style={{ fontFamily: AR, fontWeight: 800, fontSize: 44, color: "white", lineHeight: 1.35 }}>
            <span>أول حاجة لازم نحددوها هي الـ </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 900, fontSize: 40, color: BLUE, background: "rgba(91,157,255,0.12)", border: "1px solid rgba(91,157,255,0.30)", padding: "2px 16px", borderRadius: 999 }}>Distro</span>
          </div>
        </div>

        <div style={{ position: "relative", display: "flex", gap: 22, overflow: "hidden", borderRadius: 24, padding: 6 }}>
          {DISTROS.map((d, i) => {
            const p = spring({ frame: frame - (30 + i * 12), fps, config: { damping: 16, stiffness: 120 } });
            const y = interpolate(p, [0, 1], [26, 0]);
            const on = cyc === -1 || cyc === i;
            const dim = cyc !== -1 && cyc !== i;
            return (
              <div key={d.en} style={{ opacity: p, transform: `translateY(${y}px) scale(${interpolate(p, [0, 1], [0.92, 1])})`, width: 300, borderRadius: 22, background: "rgba(255,255,255,0.05)", border: `1.5px solid ${on ? d.color : "rgba(255,255,255,0.08)"}`, padding: "26px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, boxShadow: on ? `0 0 34px ${d.color}55, 0 14px 30px rgba(0,0,0,0.45)` : "0 10px 24px rgba(0,0,0,0.35)", filter: dim ? "brightness(0.55)" : "none" }}>
                <div style={{ fontFamily: MONO, fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em" }}>0{i + 1}</div>
                <Img src={staticFile(d.img)} style={{ width: 108, height: 108, objectFit: "contain", display: "block", filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.6))" }} />
                <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 26, color: "white", letterSpacing: "-0.01em" }}>{d.en}</div>
                <div dir="rtl" style={{ fontFamily: AR, fontWeight: 700, fontSize: 21, color: "rgba(255,255,255,0.75)" }}>{d.ar}</div>
              </div>
            );
          })}
          {/* shine sweep */}
          <div style={{ position: "absolute", top: 0, bottom: 0, width: 180, background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.10), transparent)", transform: `translateX(${sweepX}px)`, opacity: interpolate(frame, [56, 72, 100], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), pointerEvents: "none" }} />
        </div>

        <div style={{ opacity: subIn, transform: `translateY(${interpolate(subIn, [0, 1], [12, 0])}px)`, fontFamily: MONO, fontSize: 13, color: "rgba(255,255,255,0.45)", letterSpacing: "0.22em" }}>ONE MACHINE · THREE PATHS</div>
      </AbsoluteFill>

      {/* caption under animation */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 110, pointerEvents: "none" }}>
        <div dir="rtl" style={{ opacity: capIn, transform: `translateY(${interpolate(capIn, [0, 1], [12, 0])}px)`, textAlign: "center", maxWidth: 940, padding: "0 40px" }}>
          <div style={{ fontFamily: AR, fontWeight: 800, fontSize: 34, color: "white", lineHeight: 1.6, textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}>
            <span>وعندنا بزاف اختيارات، بصح راح نركزو على </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, fontSize: 30, color: "#51A2DA" }}>Fedora</span>
            <span>، </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, fontSize: 30, color: "#1793D1" }}>Arch</span>
            <span>، و </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, fontSize: 30, color: "#D70A53" }}>Debian</span>
          </div>
          <div style={{ marginTop: 12, width: 64, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, marginInline: "auto" }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── SCENE 3: purpose — one point under each distro ────────────────
const MixPurpose: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cols = [
    {
      en: "Fedora", img: "mix-fedora.svg", color: "#51A2DA",
      body: (
        <>
          <span>تحاول تكون حديثة، ومتوازنة بين الـ </span>
          <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: "#51A2DA" }}>Stability</span>
          <span> والـ </span>
          <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: "#51A2DA" }}>Latest Technologies</span>
          <span>.</span>
        </>
      ),
    },
    {
      en: "Arch", img: "mix-arch.svg", color: "#1793D1",
      body: <span>تعطيك تحكم أكبر بزاف في النظام، وتخليك تبني تقريباً كل حاجة بالطريقة لي تحبها.</span>,
    },
    {
      en: "Debian", img: "mix-debian.svg", color: "#D70A53",
      body: (
        <>
          <span>أما </span>
          <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: "#D70A53" }}>Debian</span>
          <span>، فهي معروفة أكثر بالـ </span>
          <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: "#D70A53" }}>Stability</span>
          <span> والمحافظة على تغييرات النظام.</span>
        </>
      ),
    },
  ];

  const closeIn = interpolate(frame, [120, 145], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 90% 75% at 50% 48%, transparent 55%, rgba(0,0,0,0.55) 100%)", pointerEvents: "none" }} />
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, padding: "0 36px" }}>
        <div style={{ display: "flex", gap: 20, alignItems: "stretch" }}>
          {cols.map((c, i) => {
            const h = spring({ frame: frame - (6 + i * 6), fps, config: { damping: 18, stiffness: 130 } });
            const p = spring({ frame: frame - (22 + i * 16), fps, config: { damping: 18, stiffness: 140 } });
            return (
              <div key={c.en} style={{ width: 312, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                <div style={{ opacity: h, transform: `translateY(${interpolate(h, [0, 1], [16, 0])}px) scale(${interpolate(h, [0, 1], [0.9, 1])})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <Img src={staticFile(c.img)} style={{ width: 76, height: 76, objectFit: "contain", display: "block", filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.6))" }} />
                  <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 20, color: "white" }}>{c.en}</div>
                </div>
                <div style={{ opacity: p, transform: `translateY(${interpolate(p, [0, 1], [16, 0])}px)`, flex: 1, width: "100%", borderRadius: 18, background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.09)", borderTop: `2px solid ${c.color}`, padding: "18px 16px", boxShadow: `0 12px 28px rgba(0,0,0,0.35), 0 0 22px ${c.color}22` }}>
                  <div dir="rtl" style={{ fontFamily: AR, fontWeight: 700, fontSize: 23, color: "rgba(255,255,255,0.92)", lineHeight: 1.65, textAlign: "center" }}>{c.body}</div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* closing line under animation */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 110, pointerEvents: "none" }}>
        <div dir="rtl" style={{ opacity: closeIn, transform: `translateY(${interpolate(closeIn, [0, 1], [14, 0])}px) scale(${interpolate(closeIn, [0, 1], [0.97, 1])})`, textAlign: "center", maxWidth: 940, padding: "0 40px" }}>
          <div style={{ fontFamily: AR, fontWeight: 800, fontSize: 36, color: "white", lineHeight: 1.5, textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}>
            وما كاش وحدة نقدر نقولو عليها هي الأفضل للجميع.
          </div>
          <div style={{ marginTop: 12, width: 72, height: 2, background: BLUE, borderRadius: 999, marginInline: "auto", transform: `scaleX(${closeIn})`, boxShadow: "0 0 12px rgba(91,157,255,0.6)" }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── SCENE 4: wayland — live protocol diagram ───────────────────────
const MixWayland: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame + 6, fps, config: { damping: 20, stiffness: 110 } });

  // phases
  const ph1 = interpolate(frame, [10, 30], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ph2 = interpolate(frame, [95, 120], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ph3 = interpolate(frame, [185, 210], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // captions under animation, one per phase
  const capA = interpolate(frame, [18, 32, 92, 104], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const capB = interpolate(frame, [102, 116, 182, 194], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const capC = interpolate(frame, [192, 208], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const apps = [
    { icon: Terminal, label: "terminal" },
    { icon: Code, label: "editor" },
    { icon: Globe, label: "browser" },
  ];

  // packet flow down the vertical protocol pipe (y from 300 to 500)
  const packets = [0, 1, 2, 3].map(k => {
    const t = ((frame * 6 + k * 55) % 220) / 220;
    return { y: 300 + t * 200, op: ph1 * (1 - ph3 * 0.4) * (t > 0.9 ? (1 - t) / 0.1 : 1) };
  });

  // compositor tiling: 4 panes scattered -> 2x2 grid
  const tile = interpolate(frame, [112, 150], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scatter = [{ x: -130, y: -90 }, { x: 130, y: -80 }, { x: -120, y: 85 }, { x: 125, y: 80 }];
  const grid = [{ x: -132, y: -62 }, { x: 132, y: -62 }, { x: -132, y: 62 }, { x: 132, y: 62 }];

  // screen output glow
  const screenOn = interpolate(frame, [140, 165], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // hyprland finale
  const hlIn = spring({ frame: frame - 188, fps, config: { damping: 12, stiffness: 130 } });
  const dim = 1 - ph3 * 0.72;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 90% 75% at 50% 48%, transparent 55%, rgba(0,0,0,0.55) 100%)", pointerEvents: "none" }} />

      {/* title */}
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 120 }}>
        <div dir="rtl" style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [14, 0])}px)`, textAlign: "center", maxWidth: 940, padding: "0 40px" }}>
          <div style={{ fontFamily: MONO, fontSize: 15, color: BLUE, letterSpacing: "0.32em", marginBottom: 10 }}>02 · DISPLAY PROTOCOL</div>
          <div style={{ fontFamily: AR, fontWeight: 800, fontSize: 38, color: "white", lineHeight: 1.5 }}>
            <span>الـ</span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Display Protocol</span>
            <span> لي راح نستعملوه هنا هو </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 900, color: BLUE, background: "rgba(91,157,255,0.12)", border: "1px solid rgba(91,157,255,0.30)", padding: "2px 14px", borderRadius: 999 }}>Wayland</span>
            <span>.</span>
          </div>
          <div style={{ marginTop: 14, display: "flex", gap: 8, justifyContent: "center", direction: "ltr" }}>
            {[["PROTOCOL", 0], ["COMPOSITOR", 1], ["HYPRLAND", 2]].map(([label, k]) => {
              const active = (frame < 95 && k === 0) || (frame >= 95 && frame < 185 && k === 1) || (frame >= 185 && k === 2);
              const done = (frame >= 95 && k === 0) || (frame >= 185 && k === 1);
              return (
                <div key={label as string} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, background: active ? "rgba(91,157,255,0.14)" : "rgba(255,255,255,0.04)", border: active ? "1px solid rgba(91,157,255,0.45)" : "1px solid rgba(255,255,255,0.10)", fontFamily: MONO, fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", color: active ? "white" : done ? "rgba(91,157,255,0.7)" : "rgba(255,255,255,0.35)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: active || done ? BLUE : "rgba(255,255,255,0.25)" }} />
                  {label}
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>

      {/* diagram — big centered vertical flow */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 1080, height: 1150, opacity: dim }}>
          {/* apps row */}
          {apps.map((a, i) => {
            const p = spring({ frame: frame - (12 + i * 8), fps, config: { damping: 18, stiffness: 140 } });
            const xs = [250, 540, 830];
            return (
              <div key={a.label} style={{ position: "absolute", left: xs[i], top: 150, transform: `translate(-50%,-50%) translateY(${interpolate(p, [0, 1], [18, 0])}px) scale(${interpolate(p, [0, 1], [0.94, 1])})`, opacity: p, width: 250, borderRadius: 18, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", padding: "18px 14px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <a.icon size={34} color="white" />
                <span style={{ fontFamily: MONO, fontSize: 15, color: "rgba(255,255,255,0.65)", letterSpacing: "0.08em" }}>{a.label}</span>
              </div>
            );
          })}

          {/* connectors apps -> pipe */}
          <svg width="1080" height="1150" style={{ position: "absolute", inset: 0, opacity: ph1 }}>
            {[250, 540, 830].map(x => (
              <line key={x} x1={x} y1={225} x2={540} y2={310} stroke="rgba(255,255,255,0.20)" strokeWidth="2" />
            ))}
          </svg>

          {/* protocol pipe (vertical) */}
          <div style={{ position: "absolute", left: 540, top: 400, transform: "translate(-50%,-50%)", opacity: ph1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 17, color: BLUE, letterSpacing: "0.22em" }}>WAYLAND</div>
            <div style={{ position: "relative", width: 36, height: 200, borderRadius: 999, background: "rgba(91,157,255,0.08)", border: "1px solid rgba(91,157,255,0.35)", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: -14, background: `repeating-linear-gradient(180deg, transparent 0 10px, rgba(91,157,255,0.25) 10px 14px)`, transform: `translateY(${((frame * 2) % 14)}px)`, height: "115%" }} />
              {packets.map((pk, k) => (
                <div key={k} style={{ position: "absolute", left: 10, top: pk.y - 300, width: 16, height: 16, borderRadius: 5, background: BLUE, boxShadow: "0 0 12px rgba(91,157,255,0.9)", opacity: Math.max(0, pk.op) }} />
              ))}
            </div>
            <div style={{ fontFamily: MONO, fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.14em" }}>protocol</div>
          </div>

          {/* connector pipe -> compositor */}
          <svg width="1080" height="1150" style={{ position: "absolute", inset: 0, opacity: ph2 }}>
            <line x1={540} y1={505} x2={540} y2={560} stroke="rgba(91,157,255,0.5)" strokeWidth="2" strokeDasharray="7 7" strokeDashoffset={-frame * 2} />
          </svg>

          {/* compositor */}
          <div style={{ position: "absolute", left: 540, top: 745, transform: "translate(-50%,-50%)", opacity: ph2, width: 620, borderRadius: 22, background: "rgba(91,157,255,0.07)", border: "1px solid rgba(91,157,255,0.35)", padding: "18px", display: "flex", flexDirection: "column", gap: 12, boxShadow: `0 0 36px rgba(91,157,255,${0.15 + ph2 * 0.15})` }}>
            <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 15, color: BLUE, letterSpacing: "0.22em", textAlign: "center" }}>COMPOSITOR</div>
            <div style={{ position: "relative", height: 260 }}>
              {[0, 1, 2, 3].map(k => {
                const x = interpolate(tile, [0, 1], [scatter[k].x, grid[k].x], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                const y = interpolate(tile, [0, 1], [scatter[k].y, grid[k].y], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                return <div key={k} style={{ position: "absolute", left: "50%", top: "50%", width: 250, height: 112, borderRadius: 10, background: k === 0 ? "rgba(91,157,255,0.16)" : "rgba(255,255,255,0.05)", border: k === 0 ? "1px solid rgba(91,157,255,0.5)" : "1px solid rgba(255,255,255,0.14)", transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }} />;
              })}
            </div>
          </div>

          {/* connector compositor -> screen */}
          <svg width="1080" height="1150" style={{ position: "absolute", inset: 0, opacity: ph2 }}>
            <line x1={540} y1={935} x2={540} y2={975} stroke="rgba(91,157,255,0.5)" strokeWidth="2" strokeDasharray="7 7" strokeDashoffset={-frame * 2} />
          </svg>

          {/* screen */}
          <div style={{ position: "absolute", left: 540, top: 1055, transform: "translate(-50%,-50%)", opacity: ph2, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ width: 480, height: 130, borderRadius: 14, background: "#0B0D11", border: `1px solid rgba(91,157,255,${0.25 + screenOn * 0.45})`, padding: 10, display: "flex", gap: 8, boxShadow: `0 0 ${screenOn * 34}px rgba(91,157,255,${screenOn * 0.4})` }}>
              {[0, 1, 2].map(k => (
                <div key={k} style={{ flex: 1, borderRadius: 8, background: k === 0 ? `rgba(91,157,255,${0.10 + screenOn * 0.14})` : `rgba(255,255,255,${0.04 + screenOn * 0.07})`, border: "1px solid rgba(255,255,255,0.12)" }} />
              ))}
            </div>
            <Monitor size={22} color={screenOn > 0.5 ? BLUE : "rgba(255,255,255,0.4)"} />
          </div>
        </div>
      </AbsoluteFill>

      {/* hyprland finale */}
      {ph3 > 0 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", pointerEvents: "none" }}>
          <div style={{ opacity: hlIn, transform: `translateY(${interpolate(hlIn, [0, 1], [26, 0])}px) scale(${interpolate(hlIn, [0, 1], [0.85, 1])})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, background: "rgba(5,6,8,0.72)", border: "1px solid rgba(91,157,255,0.25)", borderRadius: 26, padding: "34px 60px", boxShadow: "0 24px 70px rgba(0,0,0,0.7)" }}>
            <Img src={staticFile("mix-ui.svg")} style={{ width: 150, height: 150, objectFit: "contain", display: "block", filter: "drop-shadow(0 0 26px rgba(255,255,255,0.25))" }} />
            <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 34, color: "white", letterSpacing: "0.02em" }}>Hyprland</div>
            <div dir="rtl" style={{ fontFamily: AR, fontWeight: 700, fontSize: 22, color: "rgba(255,255,255,0.7)" }}>الـ Compositor تاعنا</div>
          </div>
        </AbsoluteFill>
      )}

      {/* captions under animation — fixed stack, crossfade only, never reflows */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 100, pointerEvents: "none" }}>
        <div dir="rtl" style={{ position: "relative", width: 940, height: 180, padding: "0 40px" }}>
          <div style={{ opacity: capA, position: "absolute", inset: "0 40px", display: "flex", alignItems: "center", justifyContent: "center", transform: `translateY(${(1 - capA) * 14}px)`, fontFamily: AR, fontWeight: 700, fontSize: 30, color: "white", lineHeight: 1.6, textAlign: "center", textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}>
            <div>
              <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Wayland</span>
              <span> هو </span>
              <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Protocol</span>
              <span> يحدد كيفاش التطبيقات تتواصل مع الـ</span>
              <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Compositor</span>
              <span>.</span>
            </div>
          </div>
          <div style={{ opacity: capB, position: "absolute", inset: "0 40px", display: "flex", alignItems: "center", justifyContent: "center", transform: `translateY(${(1 - capB) * 14}px)`, fontFamily: AR, fontWeight: 700, fontSize: 30, color: "white", lineHeight: 1.6, textAlign: "center", textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}>
            <div>
              <span>أما الـ</span>
              <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Compositor</span>
              <span>، فهو لي يتعامل مع الـ</span>
              <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Windows</span>
              <span> ويحدد كيفاش راح يتعرضو على الشاشة.</span>
            </div>
          </div>
          <div style={{ opacity: capC, position: "absolute", inset: "0 40px", display: "flex", alignItems: "center", justifyContent: "center", transform: `translateY(${(1 - capC) * 14}px)`, fontFamily: AR, fontWeight: 800, fontSize: 34, color: "white", lineHeight: 1.5, textAlign: "center", textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}>
            <div>
              <span>وهذا هو المكان لي يدخل فيه </span>
              <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 900, color: BLUE }}>Hyprland</span>
              <span>.</span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── SCENE 5: desktop — hyprland + components, each with a job ─────
const DESKTOP_APPS = [
  { en: "Waybar", ar: "شريط الحالة", icon: Activity },
  { en: "Launcher", ar: "مشغّل التطبيقات", icon: Rocket },
  { en: "Notifications", ar: "التنبيهات", icon: Bell },
  { en: "Lock Screen", ar: "قفل الشاشة", icon: Lock },
  { en: "Wallpaper", ar: "الخلفية", icon: Image },
];

const MixDesktop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame + 6, fps, config: { damping: 20, stiffness: 110 } });
  const logoIn = spring({ frame: frame - 14, fps, config: { damping: 14, stiffness: 130 } });
  const capIn = interpolate(frame, [150, 170], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // sequential spotlight, then all steady
  const cyc = frame < 150 ? Math.floor(Math.max(0, frame - 52) / 20) % DESKTOP_APPS.length : -1;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 90% 75% at 50% 48%, transparent 55%, rgba(0,0,0,0.55) 100%)", pointerEvents: "none" }} />
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, padding: "0 36px" }}>
        <div style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [14, 0])}px)`, textAlign: "center" }}>
          <div style={{ fontFamily: MONO, fontSize: 15, color: BLUE, letterSpacing: "0.32em", marginBottom: 10 }}>03 · ENVIRONMENT</div>
          <div dir="rtl" style={{ fontFamily: AR, fontWeight: 800, fontSize: 42, color: "white", lineHeight: 1.4 }}>
            <span>بصح </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 900, color: BLUE }}>Hyprland</span>
            <span> وحدو ما يكفيش.</span>
          </div>
        </div>

        {/* hyprland core */}
        <div style={{ opacity: logoIn, transform: `translateY(${interpolate(logoIn, [0, 1], [14, 0])}px) scale(${interpolate(logoIn, [0, 1], [0.9, 1])})`, display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999, padding: "10px 26px 10px 12px" }}>
          <Img src={staticFile("mix-ui.svg")} style={{ width: 52, height: 52, objectFit: "contain", display: "block" }} />
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 24, color: "white" }}>Hyprland</span>
          <span style={{ fontFamily: MONO, fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: "0.14em" }}>CORE</span>
        </div>

        {/* connector */}
        <div style={{ width: 2, height: 22, background: "linear-gradient(180deg, rgba(91,157,255,0.6), rgba(91,157,255,0.1))", borderRadius: 999, opacity: interpolate(frame, [40, 56], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />

        {/* components grid */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", maxWidth: 980 }}>
          {DESKTOP_APPS.map((a, i) => {
            const p = spring({ frame: frame - (44 + i * 14), fps, config: { damping: 17, stiffness: 130 } });
            const on = cyc === -1 || cyc === i;
            const dim = cyc !== -1 && cyc !== i;
            return (
              <div key={a.en} style={{ opacity: p, transform: `translateY(${interpolate(p, [0, 1], [18, 0])}px) scale(${interpolate(p, [0, 1], [0.94, 1])})`, width: 300, borderRadius: 20, background: "rgba(255,255,255,0.05)", border: on ? "1.5px solid rgba(91,157,255,0.55)" : "1px solid rgba(255,255,255,0.09)", padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, boxShadow: on ? "0 0 28px rgba(91,157,255,0.22), 0 12px 26px rgba(0,0,0,0.4)" : "0 10px 22px rgba(0,0,0,0.35)", filter: dim ? "brightness(0.6)" : "none" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: on ? "rgba(91,157,255,0.14)" : "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <a.icon size={26} color={on ? BLUE : "white"} />
                </div>
                <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 19, color: "white" }}>{a.en}</div>
                <div dir="rtl" style={{ fontFamily: AR, fontWeight: 700, fontSize: 20, color: "rgba(255,255,255,0.72)" }}>{a.ar}</div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* closing line under animation */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 110, pointerEvents: "none" }}>
        <div dir="rtl" style={{ opacity: capIn, transform: `translateY(${interpolate(capIn, [0, 1], [14, 0])}px)`, textAlign: "center", maxWidth: 940, padding: "0 40px" }}>
          <div style={{ fontFamily: AR, fontWeight: 800, fontSize: 36, color: "white", lineHeight: 1.5, textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}>
            وكل حاجة عندها وظيفة محددة.
          </div>
          <div style={{ marginTop: 12, width: 72, height: 2, background: BLUE, borderRadius: 999, marginInline: "auto", transform: `scaleX(${capIn})`, boxShadow: "0 0 12px rgba(91,157,255,0.6)" }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── SCENE 6: cyber — security workstation ─────────────────────────
const CYBER_CATS = [
  { en: "Network Analysis", icon: Wifi },
  { en: "Web Security", icon: Globe },
  { en: "Recon", icon: Search },
  { en: "Reverse Eng.", icon: Cpu },
  { en: "CTF", icon: Flag },
];
const TOOL_SOURCES = [
  { en: "Repositories", icon: Package },
  { en: "Git", icon: GitBranch },
  { en: "Python envs", icon: Code },
];

const MixCyber: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame + 6, fps, config: { damping: 20, stiffness: 110 } });
  const srcIn = spring({ frame: frame - 88, fps, config: { damping: 18, stiffness: 130 } });
  const isoIn = spring({ frame: frame - 138, fps, config: { damping: 17, stiffness: 130 } });
  const closeIn = interpolate(frame, [212, 234], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // tool dots flying into isolation boxes (loop)
  const dots = [0, 1, 2, 3, 4, 5].map(k => {
    const raw = frame - 150 + k * 18;
    const t = raw < 0 ? -1 : (raw % 110) / 110;
    if (t < 0) return null;
    const sx = 170 + (k % 3) * 290;
    const ex = k % 2 === 0 ? 240 : 700;
    const e = Easing.inOut(Easing.cubic)(t);
    return {
      x: sx + (ex - sx) * e,
      y: 12 + (168 - 12) * e,
      op: Math.sin(t * Math.PI),
      blue: k % 2 === 0,
    };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 90% 75% at 50% 48%, transparent 55%, rgba(0,0,0,0.55) 100%)", pointerEvents: "none" }} />
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, padding: "0 36px" }}>
        <div style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [14, 0])}px)`, textAlign: "center" }}>
          <div style={{ fontFamily: MONO, fontSize: 15, color: BLUE, letterSpacing: "0.32em", marginBottom: 10 }}>04 · SECURITY</div>
          <div dir="rtl" style={{ fontFamily: AR, fontWeight: 800, fontSize: 40, color: "white", lineHeight: 1.4 }}>
            <span>درك نجهزو الـ</span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 900, color: BLUE }}>Cybersecurity Environment</span>
            <span>.</span>
          </div>
        </div>

        {/* 5 categories */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", maxWidth: 980 }}>
          {CYBER_CATS.map((c, i) => {
            const p = spring({ frame: frame - (24 + i * 10), fps, config: { damping: 18, stiffness: 150 } });
            return (
              <div key={c.en} style={{ opacity: p, transform: `translateY(${interpolate(p, [0, 1], [16, 0])}px) scale(${interpolate(p, [0, 1], [0.92, 1])})`, display: "flex", alignItems: "center", gap: 9, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 999, padding: "10px 18px" }}>
                <c.icon size={17} color={BLUE} />
                <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 15, color: "white", whiteSpace: "nowrap" }}>{c.en}</span>
              </div>
            );
          })}
        </div>

        {/* tool sources */}
        <div style={{ opacity: srcIn, transform: `translateY(${interpolate(srcIn, [0, 1], [14, 0])}px)`, display: "flex", alignItems: "center", gap: 12 }}>
          <div dir="rtl" style={{ fontFamily: AR, fontWeight: 700, fontSize: 22, color: "rgba(255,255,255,0.75)" }}>نجيبو الـ Tools من:</div>
          <div style={{ display: "flex", gap: 10 }}>
            {TOOL_SOURCES.map((s, i) => {
              const p = spring({ frame: frame - (96 + i * 8), fps, config: { damping: 18, stiffness: 150 } });
              return (
                <div key={s.en} style={{ opacity: p, transform: `translateY(${interpolate(p, [0, 1], [12, 0])}px)`, display: "flex", alignItems: "center", gap: 7, background: "rgba(91,157,255,0.10)", border: "1px solid rgba(91,157,255,0.25)", borderRadius: 12, padding: "9px 14px" }}>
                  <s.icon size={16} color={BLUE} />
                  <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 14, color: "white", whiteSpace: "nowrap" }}>{s.en}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* isolation demo */}
        <div style={{ opacity: isoIn, transform: `translateY(${interpolate(isoIn, [0, 1], [16, 0])}px)`, position: "relative", width: 940, height: 250, borderRadius: 20, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
          <div dir="rtl" style={{ position: "absolute", top: 10, left: 0, right: 0, textAlign: "center", fontFamily: AR, fontWeight: 700, fontSize: 18, color: "rgba(255,255,255,0.55)" }}>نعزلوها حسب الحاجة</div>
          {[
            { label: "CONTAINERS", icon: Box, x: 240 },
            { label: "VMs", icon: Monitor, x: 700 },
          ].map(b => (
            <div key={b.label} style={{ position: "absolute", left: b.x, top: 150, transform: "translate(-50%,-50%)", width: 280, borderRadius: 16, background: "rgba(91,157,255,0.07)", border: "1px dashed rgba(91,157,255,0.35)", padding: "14px 12px", display: "flex", alignItems: "center", justifyContent: "center", gap: 9 }}>
              <b.icon size={20} color={BLUE} />
              <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 16, color: "white", letterSpacing: "0.06em" }}>{b.label}</span>
            </div>
          ))}
          {dots.map((d, k) =>
            d ? (
              <div key={k} style={{ position: "absolute", left: d.x, top: d.y, transform: "translate(-50%,-50%)", width: 13, height: 13, borderRadius: 4, background: d.blue ? BLUE : "white", boxShadow: `0 0 12px ${d.blue ? "rgba(91,157,255,0.9)" : "rgba(255,255,255,0.7)"}`, opacity: Math.max(0, d.op) }} />
            ) : null
          )}
        </div>
      </AbsoluteFill>

      {/* closing line under animation */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 110, pointerEvents: "none" }}>
        <div dir="rtl" style={{ opacity: closeIn, transform: `translateY(${interpolate(closeIn, [0, 1], [14, 0])}px)`, textAlign: "center", maxWidth: 940, padding: "0 40px" }}>
          <div style={{ fontFamily: AR, fontWeight: 800, fontSize: 32, color: "white", lineHeight: 1.6, textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}>
            <span>لأن </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Security Workstation</span>
            <span> ماشي معناها تثبت كل </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Hacking Tool</span>
            <span> موجودة.</span>
          </div>
          <div style={{ marginTop: 12, width: 72, height: 2, background: BLUE, borderRadius: 999, marginInline: "auto", transform: `scaleX(${closeIn})`, boxShadow: "0 0 12px rgba(91,157,255,0.6)" }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Mix: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Sequence from={0} durationInFrames={240}>
        <MixHook />
      </Sequence>
      <Sequence from={240} durationInFrames={200}>
        <MixDistro />
      </Sequence>
      <Sequence from={440} durationInFrames={220}>
        <MixPurpose />
      </Sequence>
      <Sequence from={660} durationInFrames={300}>
        <MixWayland />
      </Sequence>
      <Sequence from={960} durationInFrames={280}>
        <MixDesktop />
      </Sequence>
      <Sequence from={1240} durationInFrames={300}>
        <MixCyber />
      </Sequence>
    </AbsoluteFill>
  );
};

export const MIX_DURATION = 1540;
export const MIX_FPS = 30;
export const MIX_WIDTH = 1080;
export const MIX_HEIGHT = 1920;

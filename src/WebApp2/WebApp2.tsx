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
import { Laptop, FileText, ArrowLeftRight, Database, Globe, Link, Mail, User, KeyRound } from "lucide-react";

const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);
const MONO = "JetBrains Mono, monospace";
const AR = "Cairo, Changa, sans-serif";
const RED = "#EF4444";
const BLUE = "#5B9DFF";
const PURPLE = "#A78BFA";
const GREEN = "#22C55E";
const YELLOW = "#FACC15";
const ORANGE = "#FB9234";

// Word helper — per-word spring
const Word: React.FC<{ w: string; idx: number; start: number; color?: string; mono?: boolean; size?: number }> = ({ w, idx, start, color, mono, size }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - (start + idx * 4), fps, config: { damping: 14, stiffness: 160 } });
  return (
    <span style={{ display: "inline-block", opacity: p, transform: "translateY(" + interpolate(p, [0, 1], [16, 0]) + "px)", color: color || "white", fontWeight: color ? 900 : undefined, fontFamily: mono ? MONO : undefined, fontSize: size, padding: "0 4px" }}>
      {w}
    </span>
  );
};

// Text under visual (always)
const UnderText: React.FC<{ frame: number; delay?: number; children: React.ReactNode; size?: number }> = ({ frame, delay = 24, children, size }) => {
  const textIn = interpolate(frame, [delay, delay + 22], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 92, pointerEvents: "none" }}>
      <div dir="rtl" style={{ opacity: textIn, transform: "translateY(" + interpolate(textIn, [0, 1], [14, 0]) + "px)", textAlign: "center", maxWidth: 960, padding: "0 40px" }}>
        <div style={{ fontFamily: AR, fontWeight: 800, fontSize: size || 36, color: "white", lineHeight: 1.65, textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}>{children}</div>
        <div style={{ marginTop: 12, width: 72, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, marginInline: "auto", opacity: textIn, transform: "scaleX(" + textIn + ")" }} />
      </div>
    </AbsoluteFill>
  );
};

const M = (latin: string, color: string, size?: number) => (
  <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color, fontSize: size }}>{latin}</span>
);

// Shared vertical cascade with drawing connectors
const Cascade: React.FC<{ frame: number; fps: number; steps: { t: string; c: string }[]; start?: number }> = ({ frame, fps, steps, start = 14 }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {steps.map((s, i) => {
        const p = spring({ frame: frame - (start + i * 30), fps, config: { damping: 15, stiffness: 130 } });
        const last = i === steps.length - 1;
        return (
          <div key={s.t} style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: p }}>
            <div style={{ transform: "scale(" + interpolate(p, [0, 1], [0.85, 1]) + ")", fontFamily: MONO, fontWeight: 900, fontSize: last ? 34 : 29, color: "white", background: last ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.04)", border: "1.5px solid " + s.c, padding: last ? "18px 42px" : "14px 34px", borderRadius: 20, boxShadow: "0 0 " + (last ? 40 : 22) + "px " + s.c + "44", whiteSpace: "nowrap" }}>{s.t}</div>
            {i < steps.length - 1 && (
              <div style={{ position: "relative", width: 2, height: 42, background: "rgba(255,255,255,0.10)", borderRadius: 999, margin: "8px 0", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: interpolate(frame, [start + 24 + i * 30, start + 42 + i * 30], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) + "%", background: s.c }} />
                <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: "9px solid " + s.c, opacity: interpolate(frame, [start + 36 + i * 30, start + 46 + i * 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Scene 1 (hook): host header injection chain — text under visual from the start
const WebApp2Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const NODES = [
    { label: "ATTACKER", Icon: Laptop, y: 170, color: RED },
    { label: "HOST HEADER", Icon: FileText, y: 430, color: YELLOW },
    { label: "REVERSE PROXY", Icon: ArrowLeftRight, y: 690, color: BLUE },
    { label: "BACKEND", Icon: Database, y: 950, color: GREEN },
  ];
  const SEGS = [
    { from: 265, to: 335, delay: 40 },
    { from: 525, to: 595, delay: 70 },
    { from: 785, to: 855, delay: 100 },
  ];

  const morph = interpolate(frame, [84, 112], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const trustHit = interpolate(frame, [128, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 1080, height: 1150, marginTop: -70 }}>
          <svg width="1080" height="1150" style={{ position: "absolute", inset: 0 }}>
            {SEGS.map((s, i) => {
              const d = interpolate(frame, [s.delay, s.delay + 24], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const len = s.to - s.from;
              return (
                <g key={i} opacity={d}>
                  <line x1={540} y1={s.from} x2={540} y2={s.to} stroke={i === 2 && trustHit > 0.3 ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.30)"} strokeWidth="2.5" strokeDasharray={len} strokeDashoffset={len * (1 - d)} />
                  <polygon points={"540," + s.to + " 531," + (s.to - 13) + " 549," + (s.to - 13)} fill={i === 2 && trustHit > 0.3 ? RED : "rgba(255,255,255,0.5)"} />
                </g>
              );
            })}
          </svg>

          {SEGS.map((s, i) => {
            if (frame < s.delay + 24) return null;
            const t = ((frame - s.delay - 24 + i * 18) % 56) / 56;
            const evil = i >= 1 && morph > 0.5;
            return (
              <div key={i} style={{ position: "absolute", left: 540 + 26, top: s.from + (s.to - s.from) * t, transform: "translateY(-50%)", opacity: Math.sin(t * Math.PI), display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 13, height: 13, borderRadius: 999, background: evil ? RED : "white", boxShadow: "0 0 14px " + (evil ? "rgba(239,68,68,0.9)" : "rgba(255,255,255,0.9)") }} />
                {i === 0 && (
                  <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 800, color: morph > 0.5 ? RED : "white", background: "rgba(0,0,0,0.85)", border: "1px solid " + (morph > 0.5 ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.25)"), padding: "3px 10px", borderRadius: 7, whiteSpace: "nowrap" }}>
                    Host: {morph > 0.5 ? "evil.com" : "target.com"}
                  </span>
                )}
              </div>
            );
          })}

          {NODES.map((n, i) => {
            const p = spring({ frame: frame - (14 + i * 16), fps, config: { damping: 16, stiffness: 140 } });
            const Icon = n.Icon;
            return (
              <div key={n.label} style={{ position: "absolute", left: 540, top: n.y, transform: "translate(-50%,-50%)", opacity: p, display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 104, height: 104, borderRadius: 26, background: "rgba(255,255,255,0.045)", border: "1.5px solid " + n.color, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 26px " + n.color + "33" }}>
                  <Icon size={42} color="white" />
                </div>
                <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 900, color: "white", letterSpacing: "0.08em", background: "rgba(0,0,0,0.6)", padding: "5px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.14)", whiteSpace: "nowrap" }}>{n.label}</span>
              </div>
            );
          })}

          {trustHit > 0 && (
            <div style={{ position: "absolute", left: 540 + 120, top: 820, opacity: trustHit }}>
              <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 800, color: RED, background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.5)", padding: "5px 14px", borderRadius: 999, letterSpacing: "0.1em" }}>TRUSTED?!</span>
            </div>
          )}
        </div>
      </AbsoluteFill>

      {/* Hook text under visual, from the start — better design */}
      <UnderText frame={frame} delay={8} size={38}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", lineHeight: 1.6 }}>
          {["host header", "يبانلك مجرد معلومة على", "domain"].map((w, i) => (
            <Word key={i} w={w} idx={i} start={8} color={w === "host header" || w === "domain" ? BLUE : undefined} mono={w === "host header" || w === "domain"} size={38} />
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", lineHeight: 1.6, marginTop: 4 }}>
          {[["بصح واش يصرى", 0], ["trust", 1], ["بينه وبين", 0], ["backend", 1]].map(([w, kind], i) => (
            <Word key={i} w={w as string} idx={i + 3} start={8} color={kind === 1 ? (w === "trust" ? RED : GREEN) : undefined} mono={kind === 1} size={32} />
          ))}
        </div>
      </UnderText>
    </AbsoluteFill>
  );
};

// Scene 2: apps build links from host — email URL typing
const WebApp2Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const base = "https://example.com/reset?token=";
  const token = "A9f3kQ7z";
  const baseN = Math.floor(interpolate(frame, [70, 120], [0, base.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const tokN = Math.floor(interpolate(frame, [120, 160], [0, token.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  const NODES = [
    { label: "HOST", Icon: FileText, y: 200, color: YELLOW },
    { label: "APPLICATION", Icon: Globe, y: 480, color: BLUE },
  ];
  const SEGS = [
    { from: 270, to: 390, delay: 40 },
    { from: 570, to: 660, delay: 80 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 1080, height: 1050, marginTop: -80 }}>
          <svg width="1080" height="1050" style={{ position: "absolute", inset: 0 }}>
            {SEGS.map((s, i) => {
              const d = interpolate(frame, [s.delay, s.delay + 24], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const len = s.to - s.from;
              return (
                <g key={i} opacity={d}>
                  <line x1={540} y1={s.from} x2={540} y2={s.to} stroke="rgba(255,255,255,0.30)" strokeWidth="2.5" strokeDasharray={len} strokeDashoffset={len * (1 - d)} />
                  <polygon points={"540," + s.to + " 531," + (s.to - 13) + " 549," + (s.to - 13)} fill="rgba(255,255,255,0.5)" />
                </g>
              );
            })}
          </svg>

          {NODES.map((n, i) => {
            const p = spring({ frame: frame - (14 + i * 20), fps, config: { damping: 16, stiffness: 140 } });
            const Icon = n.Icon;
            return (
              <div key={n.label} style={{ position: "absolute", left: 540, top: n.y, transform: "translate(-50%,-50%)", opacity: p, display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 110, height: 110, borderRadius: 28, background: "rgba(255,255,255,0.045)", border: "1.5px solid " + n.color, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 26px " + n.color + "33" }}>
                  <Icon size={44} color="white" />
                </div>
                <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 900, color: "white", letterSpacing: "0.08em", background: "rgba(0,0,0,0.6)", padding: "5px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.14)", whiteSpace: "nowrap" }}>{n.label}</span>
              </div>
            );
          })}

          {/* email URL bar typing */}
          {(() => {
            const p = spring({ frame: frame - 100, fps, config: { damping: 16, stiffness: 140 } });
            return (
              <div style={{ position: "absolute", left: 540, top: 800, transform: "translate(-50%,-50%)", opacity: p, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#0B0D11", border: "1px solid rgba(255,255,255,0.16)", padding: "16px 22px", borderRadius: 16, direction: "ltr", boxShadow: "0 14px 40px rgba(0,0,0,0.5)" }}>
                  <Mail size={22} color={BLUE} />
                  <span style={{ fontFamily: MONO, fontSize: 19, color: "white" }}>
                    {base.slice(0, baseN)}
                    <span style={{ color: YELLOW, fontWeight: 900 }}>{token.slice(0, tokN)}</span>
                    <span style={{ display: "inline-block", width: 3, height: 20, background: Math.floor(frame / 12) % 2 === 0 ? BLUE : "transparent", verticalAlign: -3, marginLeft: 2 }} />
                  </span>
                </div>
                <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em" }}>RESET EMAIL</span>
              </div>
            );
          })()}

          {SEGS.map((s, i) => {
            if (frame < s.delay + 24) return null;
            const t = ((frame - s.delay - 24 + i * 20) % 60) / 60;
            return (
              <div key={i} style={{ position: "absolute", left: 540 - 24, top: s.from + (s.to - s.from) * t, transform: "translateY(-50%)", opacity: Math.sin(t * Math.PI) }}>
                <div style={{ width: 13, height: 13, borderRadius: 999, background: "white", boxShadow: "0 0 14px rgba(255,255,255,0.9)" }} />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      <UnderText frame={frame} delay={20} size={34}>
        <span>بعض ال</span>
        {M("apps", "white")}
        <span> تتخدم ال </span>
        {M("host", YELLOW)}
        <span> باش تبني روابط داخل رسائل </span>
        {M("email", BLUE)}
      </UnderText>
    </AbsoluteFill>
  );
};

// Scene 3: X-Forwarded-Host + trusted backend
const WebApp2Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const morph = interpolate(frame, [90, 118], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const trustFx = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const NODES = [
    { label: "X-FORWARDED-HOST", Icon: FileText, y: 190, color: RED },
    { label: "BACKEND", Icon: Database, y: 480, color: GREEN },
    { label: "RESET EMAIL", Icon: Mail, y: 770, color: BLUE },
  ];
  const SEGS = [
    { from: 275, to: 375, delay: 40 },
    { from: 565, to: 665, delay: 80 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 1080, height: 1050, marginTop: -60 }}>
          <svg width="1080" height="1050" style={{ position: "absolute", inset: 0 }}>
            {SEGS.map((s, i) => {
              const d = interpolate(frame, [s.delay, s.delay + 24], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const len = s.to - s.from;
              return (
                <g key={i} opacity={d}>
                  <line x1={540} y1={s.from} x2={540} y2={s.to} stroke={i === 1 && trustFx > 0.3 ? "rgba(239,68,68,0.55)" : "rgba(255,255,255,0.30)"} strokeWidth="2.5" strokeDasharray={len} strokeDashoffset={len * (1 - d)} />
                  <polygon points={"540," + s.to + " 531," + (s.to - 13) + " 549," + (s.to - 13)} fill={i === 1 && trustFx > 0.3 ? RED : "rgba(255,255,255,0.5)"} />
                </g>
              );
            })}
          </svg>

          {NODES.map((n, i) => {
            const p = spring({ frame: frame - (14 + i * 20), fps, config: { damping: 16, stiffness: 140 } });
            const Icon = n.Icon;
            return (
              <div key={n.label} style={{ position: "absolute", left: 540, top: n.y, transform: "translate(-50%,-50%)", opacity: p, display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 110, height: 110, borderRadius: 28, background: "rgba(255,255,255,0.045)", border: "1.5px solid " + n.color, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 26px " + n.color + "33" }}>
                  <Icon size={44} color="white" />
                </div>
                <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 900, color: "white", letterSpacing: "0.06em", background: "rgba(0,0,0,0.6)", padding: "5px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.14)", whiteSpace: "nowrap" }}>{n.label}</span>
              </div>
            );
          })}

          {/* header value morph */}
          <div style={{ position: "absolute", left: 540 + 200, top: 190, transform: "translateY(-50%)", opacity: interpolate(frame, [60, 76], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
            <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 800, color: morph > 0.5 ? RED : "white", background: "rgba(0,0,0,0.85)", border: "1px solid " + (morph > 0.5 ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.25)"), padding: "6px 14px", borderRadius: 9, whiteSpace: "nowrap" }}>
              X-Forwarded-Host: {morph > 0.5 ? "evil.com" : "shop.com"}
            </span>
          </div>

          {/* trust tag */}
          {trustFx > 0 && (
            <div style={{ position: "absolute", left: 540 + 190, top: 480, transform: "translateY(-50%)", opacity: trustFx }}>
              <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 800, color: RED, background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.5)", padding: "5px 14px", borderRadius: 999 }}>TRUSTED?!</span>
            </div>
          )}

          {/* evil link inside email */}
          {trustFx > 0.4 && (
            <div style={{ position: "absolute", left: 540, top: 890, transform: "translateX(-50%)", opacity: trustFx, direction: "ltr", fontFamily: MONO, fontSize: 15, color: "white", background: "#0B0D11", border: "1px solid rgba(239,68,68,0.45)", padding: "10px 18px", borderRadius: 12 }}>
              https://<span style={{ color: RED, fontWeight: 900 }}>evil.com</span>/reset?token=…
            </div>
          )}

          {SEGS.map((s, i) => {
            if (frame < s.delay + 24) return null;
            const t = ((frame - s.delay - 24 + i * 20) % 60) / 60;
            const evil = i === 1 && morph > 0.5;
            return (
              <div key={i} style={{ position: "absolute", left: 540 - 24, top: s.from + (s.to - s.from) * t, transform: "translateY(-50%)", opacity: Math.sin(t * Math.PI) }}>
                <div style={{ width: 13, height: 13, borderRadius: 999, background: evil ? RED : "white", boxShadow: "0 0 14px " + (evil ? "rgba(239,68,68,0.9)" : "rgba(255,255,255,0.9)") }} />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      <UnderText frame={frame} delay={20} size={29}>
        <span>اذا قدر المهاجم يتحكم في </span>
        {M("host", YELLOW)}
        <span> ولا ف </span>
        {M("header", YELLOW)}
        <span> كيما: </span>
        {M("X-Forwarded-Host", RED)}
        <span> وكان </span>
        {M("backend", GREEN)}
        <span> داير </span>
        {M("trust", RED)}
        <span> في ذيك القيمة يقدر يغير </span>
        {M("domain", BLUE)}
        <span> لي كاين في الرابط</span>
      </UnderText>
    </AbsoluteFill>
  );
};

// Scene 4: victim chain + URL morph (domain flips, token stays)
const WebApp2Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const morph = interpolate(frame, [120, 150], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lockIn = spring({ frame: frame - 158, fps, config: { damping: 13, stiffness: 150 } });

  const NODES = [
    { label: "VICTIM", Icon: User, y: 150, color: "white" },
    { label: "RESET EMAIL", Icon: Mail, y: 400, color: BLUE },
    { label: "ATTACKER DOMAIN", Icon: Globe, y: 650, color: RED },
    { label: "RESET TOKEN", Icon: KeyRound, y: 900, color: YELLOW },
  ];
  const SEGS = [
    { from: 225, to: 315, delay: 36 },
    { from: 475, to: 565, delay: 60 },
    { from: 725, to: 815, delay: 84 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 1080, height: 1080, marginTop: -70 }}>
          <svg width="1080" height="1080" style={{ position: "absolute", inset: 0 }}>
            {SEGS.map((s, i) => {
              const d = interpolate(frame, [s.delay, s.delay + 22], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const len = s.to - s.from;
              return (
                <g key={i} opacity={d}>
                  <line x1={540} y1={s.from} x2={540} y2={s.to} stroke={i >= 1 && morph > 0.3 ? "rgba(239,68,68,0.55)" : "rgba(255,255,255,0.30)"} strokeWidth="2.5" strokeDasharray={len} strokeDashoffset={len * (1 - d)} />
                  <polygon points={"540," + s.to + " 531," + (s.to - 13) + " 549," + (s.to - 13)} fill={i >= 1 && morph > 0.3 ? RED : "rgba(255,255,255,0.5)"} />
                </g>
              );
            })}
          </svg>

          {NODES.map((n, i) => {
            const p = spring({ frame: frame - (12 + i * 18), fps, config: { damping: 16, stiffness: 140 } });
            const Icon = n.Icon;
            return (
              <div key={n.label} style={{ position: "absolute", left: 540, top: n.y, transform: "translate(-50%,-50%)", opacity: p, display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 100, height: 100, borderRadius: 26, background: "rgba(255,255,255,0.045)", border: "1.5px solid " + (n.color === "white" ? "rgba(255,255,255,0.2)" : n.color), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px " + (n.color === "white" ? "rgba(255,255,255,0.08)" : n.color + "33") }}>
                  <Icon size={40} color="white" />
                </div>
                <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 900, color: "white", letterSpacing: "0.06em", background: "rgba(0,0,0,0.6)", padding: "5px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.14)", whiteSpace: "nowrap" }}>{n.label}</span>
              </div>
            );
          })}

          {/* URL morph bar */}
          <div style={{ position: "absolute", left: 540, top: 525, transform: "translate(-50%,-50%)", opacity: interpolate(frame, [100, 118], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), direction: "ltr", fontFamily: MONO, fontSize: 17, fontWeight: 800, color: "white", background: "#0B0D11", border: "1px solid rgba(255,255,255,0.16)", padding: "12px 20px", borderRadius: 14, whiteSpace: "nowrap" }}>
            <span>https://</span>
            <span style={{ color: morph > 0.5 ? RED : "white" }}>{morph > 0.5 ? "evil.com" : "example.com"}</span>
            <span style={{ color: "rgba(255,255,255,0.6)" }}>/reset?token=</span>
            <span style={{ color: YELLOW }}>A9f3kQ7z</span>
          </div>

          {/* token stays locked to victim */}
          {lockIn > 0 && (
            <div style={{ position: "absolute", left: 540 + 250, top: 900, opacity: lockIn, transform: "translateY(" + interpolate(lockIn, [0, 1], [12, 0]) + "px)" }}>
              <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 800, color: YELLOW, background: "rgba(250,204,21,0.10)", border: "1px solid rgba(250,204,21,0.45)", padding: "6px 14px", borderRadius: 999, whiteSpace: "nowrap" }}>same token = victim account</span>
            </div>
          )}
        </div>
      </AbsoluteFill>

      <UnderText frame={frame} delay={20} size={32}>
        <span>في بلاصة ميكون الرابط هاك يولي هاك و </span>
        {M("token", YELLOW)}
        <span> نفسو يبقى مرتبط بحساب الضحية</span>
      </UnderText>
    </AbsoluteFill>
  );
};

// Scene 5: the chain cascade
const WebApp2Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ marginTop: -120 }}>
          <Cascade frame={frame} fps={fps} start={16} steps={[
            { t: "Host Header Manipulation", c: "rgba(255,255,255,0.9)" },
            { t: "Password Reset Poisoning", c: YELLOW },
            { t: "Reset Token Exposure", c: ORANGE },
            { t: "Account Takeover", c: RED },
          ]} />
        </div>
      </AbsoluteFill>

      <UnderText frame={frame} delay={40} size={30}>
        <div>
          <span>إذا الضحية فتحت الرابط، الـ </span>
          {M("Token", RED)}
          <span> ممكن يوصل إلى سيرفر المهاجم.</span>
        </div>
        <div style={{ marginTop: 6 }}>
          <span>وبعدها يمكن استخدامه في عملية إعادة تعيين كلمة المرور.</span>
        </div>
      </UnderText>
    </AbsoluteFill>
  );
};

// Scene 6 (ending): root cause cascade
const WebApp2Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ marginTop: -120 }}>
          <Cascade frame={frame} fps={fps} start={16} steps={[
            { t: "User-Controlled Input", c: "rgba(255,255,255,0.9)" },
            { t: "Implicit Trust", c: YELLOW },
            { t: "Security-Sensitive URL", c: ORANGE },
            { t: "Account Takeover", c: RED },
          ]} />
        </div>
      </AbsoluteFill>

      <UnderText frame={frame} delay={40} size={30}>
        <div>
          <span>المشكلة هنا مش أن الـ </span>
          {M("Host Header", RED)}
          <span> خطير بحد ذاته.</span>
        </div>
        <div style={{ marginTop: 6 }}>
          <span>المشكلة أن التطبيق عامله كأنه مصدر موثوق للـ </span>
          {M("Origin", BLUE)}
          <span>.</span>
        </div>
      </UnderText>
    </AbsoluteFill>
  );
};

export const WebApp2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Sequence from={0} durationInFrames={260}>
        <WebApp2Scene1 />
      </Sequence>
      <Sequence from={260} durationInFrames={240}>
        <WebApp2Scene2 />
      </Sequence>
      <Sequence from={500} durationInFrames={280}>
        <WebApp2Scene3 />
      </Sequence>
      <Sequence from={780} durationInFrames={280}>
        <WebApp2Scene4 />
      </Sequence>
      <Sequence from={1060} durationInFrames={260}>
        <WebApp2Scene5 />
      </Sequence>
      <Sequence from={1320} durationInFrames={240}>
        <WebApp2Scene6 />
      </Sequence>
    </AbsoluteFill>
  );
};

export const WEBAPP2_DURATION = 1560;
export const WEBAPP2_FPS = 30;
export const WEBAPP2_WIDTH = 1080;
export const WEBAPP2_HEIGHT = 1920;

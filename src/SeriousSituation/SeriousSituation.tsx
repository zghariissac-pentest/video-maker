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
import { Server, Monitor, Smartphone } from "lucide-react";

const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);
const MONO = "JetBrains Mono, monospace";
const AR = "Cairo, Changa, sans-serif";
const BLUE = "#5B9DFF";

const PICS = ["serious-rooby.jpg", "serious-maw.jpg", "serious-super.jpg"];

// Scene 1 (hook): black bg, 3 pics fanned nicely, text under
const SeriousSituationScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text under pics: clean fade + slide up
  const textIn = interpolate(frame, [30, 48], [0, 1], {
    easing: SMOOTH,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(textIn, [0, 1], [14, 0]);

  // Fan layout: middle forward, sides tilted
  const slots = [
    { x: -300, y: 26, rot: -7, s: 0.92 },
    { x: 0, y: -14, rot: 0, s: 1.04 },
    { x: 300, y: 26, rot: 7, s: 0.92 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 1080, height: 640, marginTop: -160 }}>
          {PICS.map((f, i) => {
            const enter = spring({
              frame: frame - (10 + i * 10),
              fps,
              config: { damping: 17, stiffness: 130 },
            });
            return (
              <div
                key={f}
                style={{
                  position: "absolute",
                  left: 540 + slots[i].x,
                  top: 320 + slots[i].y,
                  transform: `translate(-50%,-50%) rotate(${slots[i].rot}deg) scale(${interpolate(enter, [0, 1], [0.6, 1]) * slots[i].s})`,
                  opacity: enter,
                  filter: "drop-shadow(0 18px 42px rgba(0,0,0,0.65))",
                  willChange: "transform, opacity",
                  zIndex: i === 1 ? 2 : 1,
                }}
              >
                <Img
                  src={staticFile(f)}
                  style={{
                    width: 300,
                    height: 300,
                    objectFit: "cover",
                    display: "block",
                    borderRadius: 18,
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Text under pics */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 300 }}>
        <div
          dir="rtl"
          style={{
            textAlign: "center",
            opacity: textIn,
            transform: `translateY(${textY}px)`,
            willChange: "transform, opacity",
            maxWidth: 940,
            padding: "0 40px",
          }}
        >
          <div
            style={{
              fontFamily: AR,
              fontWeight: 800,
              fontSize: 50,
              color: "white",
              letterSpacing: "-0.02em",
              lineHeight: 1.45,
              textShadow: "0 2px 18px rgba(0,0,0,0.55)",
            }}
          >
            سقسيت روحك علاه المواضيع الحساسة تولي ميمز؟
          </div>
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

// Drawn seal badge (no download needed)
const SealBadge: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" style={{ display: "block" }}>
    <defs>
      <path id="sealArc" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" fill="none" />
    </defs>
    <circle cx="60" cy="60" r="58" fill="#0B0D11" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
    <circle cx="60" cy="60" r="52" fill="none" stroke={BLUE} strokeWidth="1" opacity={0.6} />
    <circle cx="60" cy="60" r="30" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
    <text fontFamily={MONO} fontSize="10.5" fontWeight={800} fill="white" letterSpacing="2.5">
      <textPath href="#sealArc">US GOVERNMENT • OFFICIAL •</textPath>
    </text>
    <path d="M60 42 L64.5 55 L78 55 L67 63 L71 76 L60 68 L49 76 L53 63 L42 55 L55.5 55 Z" fill={BLUE} />
    {[0, 1, 2].map(k => (
      <rect key={k} x={30 + k * 18} y={88} width={12} height={4} rx={2} fill={k === 1 ? BLUE : "rgba(255,255,255,0.3)"} />
    ))}
  </svg>
);

// CIA badge (drawn, matches seal style)
const CiaBadge: React.FC<{ size?: number }> = ({ size = 112 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" style={{ display: "block" }}>
    <circle cx="60" cy="60" r="58" fill="#0B0D11" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
    <circle cx="60" cy="60" r="52" fill="none" stroke="#EF4444" strokeWidth="1" opacity={0.7} />
    <path d="M60 30 L63.5 47 L81 47 L67 57 L72 74 L60 64 L48 74 L53 57 L39 47 L56.5 47 Z" fill="white" />
    <text x="60" y="98" textAnchor="middle" fontFamily={MONO} fontSize="17" fontWeight={900} fill="white" letterSpacing="4">CIA</text>
  </svg>
);

// Scene 2: screenshot middle, US + CIA logos under it, text under from scene start
const SeriousSituationScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text under: visible from the beginning of this scene
  const textIn = interpolate(frame, [6, 22], [0, 1], {
    easing: SMOOTH,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shotIn = spring({ frame: frame + 10, fps, config: { damping: 17, stiffness: 120 } });
  const usIn = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 140 } });
  const ciaIn = spring({ frame: frame - 42, fps, config: { damping: 14, stiffness: 140 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26, padding: "0 48px" }}>
        {/* Screenshot */}
        <div
          style={{
            opacity: interpolate(shotIn, [0, 1], [0.4, 1]),
            transform: `translateY(${interpolate(shotIn, [0, 1], [20, 0])}px) scale(${interpolate(shotIn, [0, 1], [0.92, 1])})`,
            filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.7))",
            display: "flex",
          }}
        >
          <Img
            src={staticFile("serious-google.png")}
            style={{
              width: 920,
              height: 268,
              objectFit: "contain",
              display: "block",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.10)",
              background: "#101216",
              padding: "10px 14px",
            }}
          />
        </div>

        {/* US + CIA logos — real seals, big */}
        <div style={{ display: "flex", gap: 60, alignItems: "flex-start" }}>
          <div style={{ opacity: usIn, transform: `translateY(${interpolate(usIn, [0, 1], [18, 0])}px) scale(${interpolate(usIn, [0, 1], [0.7, 1])})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.65))" }}>
            <Img src={staticFile("serious-us.png")} style={{ width: 210, height: 210, objectFit: "contain", display: "block" }} />
            <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 800, color: "white", letterSpacing: "0.2em" }}>US GOV</span>
          </div>
          <div style={{ opacity: ciaIn, transform: `translateY(${interpolate(ciaIn, [0, 1], [18, 0])}px) scale(${interpolate(ciaIn, [0, 1], [0.7, 1])})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.65))" }}>
            <Img src={staticFile("serious-cia.png")} style={{ width: 210, height: 210, objectFit: "contain", display: "block" }} />
            <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 800, color: "white", letterSpacing: "0.2em" }}>CIA</span>
          </div>
        </div>
      </AbsoluteFill>

      {/* Text under — from the beginning of the scene */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 130, pointerEvents: "none" }}>
        <div dir="rtl" style={{ opacity: textIn, transform: `translateY(${interpolate(textIn, [0, 1], [14, 0])}px)`, textAlign: "center", maxWidth: 960, padding: "0 40px" }}>
          <div style={{ fontFamily: AR, fontWeight: 800, fontSize: 38, color: "white", lineHeight: 1.55, textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}>
            <span>الحكومة الامريكية عتارفت بلي تستخدم </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>memetic warfare</span>
            <span> باش تخفف ردة الفعل تاعنا</span>
          </div>
          <div style={{ marginTop: 12, width: 72, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, marginInline: "auto", opacity: textIn, transform: `scaleX(${textIn})` }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 3: patrick + text under
const SeriousSituationScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgIn = spring({ frame: frame + 12, fps, config: { damping: 16, stiffness: 130 } });
  const textIn = interpolate(frame, [6, 22], [0, 1], {
    easing: SMOOTH,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 48px" }}>
        <div
          style={{
            opacity: interpolate(imgIn, [0, 1], [0.4, 1]),
            transform: `translateY(${interpolate(imgIn, [0, 1], [18, 0])}px) scale(${interpolate(imgIn, [0, 1], [0.86, 1])})`,
            filter: "drop-shadow(0 18px 42px rgba(0,0,0,0.65))",
            display: "flex",
          }}
        >
          <Img
            src={staticFile("serious-patrick.jpg")}
            style={{
              width: 620,
              height: 620,
              objectFit: "cover",
              display: "block",
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          />
        </div>
        <div dir="rtl" style={{ marginTop: 32, textAlign: "center", opacity: textIn, transform: `translateY(${interpolate(textIn, [0, 1], [14, 0])}px)`, maxWidth: 940 }}>
          <div style={{ fontFamily: AR, fontWeight: 800, fontSize: 44, color: "white", lineHeight: 1.5, textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}>
            وفعلا شفنا بزاف ناس بدا يجيها الامر عادي وتضحك على هادو الميمز
          </div>
          <div style={{ marginTop: 14, width: 84, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, marginInline: "auto", opacity: textIn, transform: `scaleX(${textIn})` }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 4 (last): botnet army posting memes to socials
const SOCIALS = ["facebook", "x", "instagram", "tiktok", "youtube", "telegram"];
const BOT_COLS = [240, 440, 640, 840];
const BOT_ROWS = [520, 645, 770];

const SeriousSituationScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame + 6, fps, config: { damping: 18, stiffness: 130 } });
  const c2In = spring({ frame: frame - 12, fps, config: { damping: 14, stiffness: 130 } });
  const beams = interpolate(frame, [24, 48], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // C2 radar rings
  const ringT = frame > 30 ? ((frame - 30) % 60) / 60 : -1;

  // social slot x positions
  const socX = (i: number) => 140 + i * 160;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Title */}
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 92 }}>
        <div dir="rtl" style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [14, 0])}px)`, textAlign: "center", maxWidth: 960, padding: "0 40px" }}>
          <div style={{ fontFamily: AR, fontWeight: 800, fontSize: 42, color: "white", lineHeight: 1.6, textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}>
            <span>هادو الميمز ينتاشرو عبر </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: "#EF4444" }}>botnets</span>
            <span> و </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: "#FACC15" }}>sockpuppets accounts</span>
            <span> و </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>ai</span>
          </div>
        </div>
      </AbsoluteFill>

      {/* Botnet stage */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 1080, height: 1080 }}>
          {/* C2 radar rings */}
          {ringT >= 0 && [0, 1].map(k => {
            const t = (ringT + k * 0.5) % 1;
            return (
              <div key={k} style={{ position: "absolute", left: 540, top: 240, width: t * 420, height: t * 420, borderRadius: 999, border: "1px solid rgba(239,68,68,0.45)", transform: "translate(-50%,-50%)", opacity: (1 - t) * 0.6 }} />
            );
          })}

          {/* C2 server */}
          <div style={{ position: "absolute", left: 540, top: 240, transform: "translate(-50%,-50%)", opacity: c2In, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 118, height: 118, borderRadius: 28, background: "rgba(239,68,68,0.10)", border: "2px solid #EF4444", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 ${26 + Math.sin(frame * 0.15) * 10}px rgba(239,68,68,0.45)` }}>
              <Server size={52} color="#EF4444" />
            </div>
            <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 16, color: "white", background: "#EF4444", padding: "3px 16px", borderRadius: 999, letterSpacing: "0.14em" }}>C2 · COMMAND</span>
          </div>

          {/* command beams + pulses */}
          <svg width="1080" height="1080" style={{ position: "absolute", inset: 0 }}>
            {BOT_COLS.map(x => (
              <line key={x} x1={540} y1={305} x2={x} y2={470} stroke="rgba(239,68,68,0.40)" strokeWidth="2" strokeDasharray={400} strokeDashoffset={400 * (1 - beams)} />
            ))}
            {frame > 50 && BOT_COLS.map((x, b) => {
              const t = ((frame - 50 + b * 15) % 55) / 55;
              return (
                <g key={x} opacity={beams * Math.sin(t * Math.PI)}>
                  <circle cx={540 + (x - 540) * t} cy={305 + (470 - 305) * t} r="10" fill="#EF4444" opacity={0.25} />
                  <circle cx={540 + (x - 540) * t} cy={305 + (470 - 305) * t} r="4.5" fill="white" />
                </g>
              );
            })}
          </svg>

          {/* bot grid */}
          {BOT_COLS.map((x, c) =>
            BOT_ROWS.map((y, r) => {
              const p = spring({ frame: frame - (52 + c * 12 + r * 7), fps, config: { damping: 15, stiffness: 150 } });
              const Icon = (c + r) % 2 === 0 ? Smartphone : Monitor;
              const hot = 0.65 + Math.sin(frame * 0.2 + c * 1.3 + r) * 0.35;
              return (
                <div key={`${c}-${r}`} style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) scale(${interpolate(p, [0, 1], [0.5, 1])})`, opacity: p }}>
                  <div style={{ width: 92, height: 92, borderRadius: 22, background: "rgba(239,68,68,0.08)", border: "1.5px solid rgba(239,68,68,0.55)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 ${12 + hot * 16}px rgba(239,68,68,${0.25 + hot * 0.25})` }}>
                    <Icon size={38} color="white" />
                  </div>
                </div>
              );
            })
          )}

          {/* meme volleys bots -> socials */}
          <svg width="1080" height="1080" style={{ position: "absolute", inset: 0 }}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map(k => {
              if (frame < 125) return null;
              const t = ((frame - 125 + k * 14) % 96) / 96;
              const b = (k * 5) % 12;
              const sx = BOT_COLS[b % 4];
              const sy = BOT_ROWS[Math.floor(b / 4)];
              const ex = socX(k % 6);
              const ey = 950;
              return (
                <g key={k} opacity={Math.sin(t * Math.PI)}>
                  <circle cx={sx + (ex - sx) * t} cy={sy + (ey - sy) * t} r="9" fill="white" opacity={0.3} />
                  <circle cx={sx + (ex - sx) * t} cy={sy + (ey - sy) * t} r="4" fill="white" />
                </g>
              );
            })}
          </svg>

          {/* social row */}
          {SOCIALS.map((s, i) => {
            const p = spring({ frame: frame - (118 + i * 10), fps, config: { damping: 14, stiffness: 140 } });
            const lit = interpolate(frame, [150 + i * 10, 170 + i * 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={s} style={{ position: "absolute", left: socX(i), top: 950, transform: "translate(-50%,-50%)", opacity: p, display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
                <div style={{ width: 84, height: 84, borderRadius: 999, background: "rgba(255,255,255,0.055)", border: `1.5px solid rgba(255,255,255,${0.14 + lit * 0.3})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: lit > 0.5 ? "0 0 22px rgba(255,255,255,0.22)" : "none", transform: `scale(${interpolate(p, [0, 1], [0.6, 1])})` }}>
                  <Img src={staticFile(`soc-${s}.svg`)} style={{ width: 38, height: 38, objectFit: "contain", display: "block", filter: "brightness(0) invert(1)" }} />
                </div>
                <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.75)", textTransform: "capitalize" }}>{s}</span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const SeriousSituation: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Sequence from={0} durationInFrames={150}>
        <SeriousSituationScene1 />
      </Sequence>
      <Sequence from={150} durationInFrames={260}>
        <SeriousSituationScene2 />
      </Sequence>
      <Sequence from={410} durationInFrames={150}>
        <SeriousSituationScene3 />
      </Sequence>
      <Sequence from={560} durationInFrames={240}>
        <SeriousSituationScene4 />
      </Sequence>
    </AbsoluteFill>
  );
};

export const SERIOUSSITUATION_DURATION = 800;
export const SERIOUSSITUATION_FPS = 30;
export const SERIOUSSITUATION_WIDTH = 1080;
export const SERIOUSSITUATION_HEIGHT = 1920;

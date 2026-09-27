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
import { Laptop, ArrowLeftRight, Database } from "lucide-react";

const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);
const MONO = "JetBrains Mono, monospace";
const AR = "Cairo, Changa, sans-serif";
const RED = "#EF4444";
const BLUE = "#5B9DFF";
const GREEN = "#22C55E";
const YELLOW = "#FACC15";

// Word helper — per-word spring
const Word: React.FC<{ w: string; idx: number; start: number; color?: string; mono?: boolean }> = ({ w, idx, start, color, mono }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - (start + idx * 4), fps, config: { damping: 14, stiffness: 160 } });
  return (
    <span style={{ display: "inline-block", opacity: p, transform: "translateY(" + interpolate(p, [0, 1], [16, 0]) + "px)", color: color || "white", fontWeight: color ? 900 : undefined, fontFamily: mono ? MONO : undefined, padding: "0 4px" }}>
      {w}
    </span>
  );
};

// Scene 1 (hook): attacker -> reverse proxy -> backend, two parsers disagree
const WebApp1Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame + 6, fps, config: { damping: 18, stiffness: 130 } });

  // Nodes on one horizontal axis
  const NX = [200, 540, 880];
  const NY = 560;
  const nodeCols = [RED, BLUE, GREEN];

  const link1 = interpolate(frame, [52, 74], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const link2 = interpolate(frame, [70, 92], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Smuggled packet travels the full chain then splits at the backend
  const tAll = interpolate(frame, [78, 150], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pktX = NX[0] + 90 + ((NX[2] - 90 - (NX[0] + 90)) * tAll);
  const split = interpolate(frame, [150, 175], [0, 1], { easing: Easing.out(Easing.back(1.4)), extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Parser badges pop
  const pA = spring({ frame: frame - 96, fps, config: { damping: 14, stiffness: 150 } });
  const pB = spring({ frame: frame - 108, fps, config: { damping: 14, stiffness: 150 } });
  const desyncIn = spring({ frame: frame - 176, fps, config: { damping: 11, stiffness: 150 } });

  const nodes = [
    { label: "ATTACKER", Icon: Laptop, color: RED },
    { label: "REVERSE PROXY", Icon: ArrowLeftRight, color: BLUE },
    { label: "BACKEND", Icon: Database, color: GREEN },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Text right under animation */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 330 }}>
        <div dir="rtl" style={{ opacity: titleIn, transform: "translateY(" + interpolate(titleIn, [0, 1], [14, 0]) + "px)", textAlign: "center", maxWidth: 960, padding: "0 40px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", fontFamily: AR, fontWeight: 800, fontSize: 42, lineHeight: 1.55 }}>
            <Word w="الـ" idx={0} start={10} />
            <Word w="Request Smuggling" idx={1} start={10} color={RED} mono />
            <Word w="مش مجرد" idx={3} start={10} />
          </div>
          <div dir="ltr" style={{ fontFamily: MONO, fontWeight: 700, fontSize: 30, color: "rgba(255,255,255,0.85)", marginTop: 6 }}>
            <Word w='"Request' idx={0} start={24} />
            <Word w="داخل" idx={1} start={24} />
            <Word w='Request".' idx={2} start={24} />
          </div>
        </div>
      </AbsoluteFill>

      {/* Chain */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 1080, height: 900 }}>
          {/* links */}
          <svg width="1080" height="900" style={{ position: "absolute", inset: 0 }}>
            <line x1={NX[0] + 75} y1={NY} x2={NX[1] - 75} y2={NY} stroke={RED} strokeWidth="2.5" opacity={0.7 * link1} strokeDasharray={190} strokeDashoffset={190 * (1 - link1)} />
            <line x1={NX[1] + 75} y1={NY} x2={NX[2] - 75} y2={NY} stroke={BLUE} strokeWidth="2.5" opacity={0.7 * link2} strokeDasharray={190} strokeDashoffset={190 * (1 - link2)} />
          </svg>

          {/* smuggled packet with CL+TE tag */}
          {frame >= 78 && split < 1 && (
            <div style={{ position: "absolute", left: pktX, top: NY, transform: "translate(-50%,-130%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 800, color: "#000", background: YELLOW, padding: "3px 12px", borderRadius: 999, whiteSpace: "nowrap" }}>CL + TE</span>
              <div style={{ width: 17, height: 17, borderRadius: 5, background: RED, boxShadow: "0 0 20px rgba(239,68,68,1)", transform: "rotate(" + frame * 6 + "deg)" }} />
            </div>
          )}

          {/* split at backend: 1 seen as 2 */}
          {split > 0 && (
            <div style={{ position: "absolute", left: NX[2], top: NY - 170, transform: "translateX(-50%)", opacity: split, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ transform: "translateX(" + interpolate(split, [0, 1], [30, -46]) + "px)", padding: "10px 18px", borderRadius: 12, background: "rgba(91,157,255,0.10)", border: "1px solid rgba(91,157,255,0.5)", fontFamily: MONO, fontSize: 14, fontWeight: 800, color: "white", whiteSpace: "nowrap" }}>req 1</div>
              <div style={{ transform: "translateX(" + interpolate(split, [0, 1], [-30, 46]) + "px)", padding: "10px 18px", borderRadius: 12, background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.6)", fontFamily: MONO, fontSize: 14, fontWeight: 800, color: "white", whiteSpace: "nowrap", boxShadow: "0 0 22px rgba(239,68,68,0.35)" }}>req 2?!</div>
            </div>
          )}

          {/* nodes */}
          {nodes.map((n, i) => {
            const p = spring({ frame: frame - (24 + i * 14), fps, config: { damping: 16, stiffness: 140 } });
            const Icon = n.Icon;
            return (
              <div key={n.label} style={{ position: "absolute", left: NX[i], top: NY, transform: "translate(-50%,-50%)", opacity: p, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ width: 140, height: 140, borderRadius: 30, background: "rgba(255,255,255,0.04)", border: "1.5px solid " + n.color, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 30px " + n.color + "44" }}>
                  <Icon size={52} color="white" />
                </div>
                <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 900, color: "white", letterSpacing: "0.08em", background: "rgba(0,0,0,0.6)", padding: "4px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.14)", whiteSpace: "nowrap" }}>{n.label}</span>
              </div>
            );
          })}

          {/* two parsers */}
          {pA > 0 && (
            <div style={{ position: "absolute", left: NX[1], top: NY + 150, transform: "translateX(-50%)", opacity: pA }}>
              <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 800, color: BLUE, background: "rgba(91,157,255,0.10)", border: "1px solid rgba(91,157,255,0.45)", padding: "6px 16px", borderRadius: 999, whiteSpace: "nowrap" }}>parser A: sees 1 request</span>
            </div>
          )}
          {pB > 0 && (
            <div style={{ position: "absolute", left: NX[2], top: NY + 150, transform: "translateX(-50%)", opacity: pB }}>
              <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 800, color: GREEN, background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.45)", padding: "6px 16px", borderRadius: 999, whiteSpace: "nowrap" }}>parser B: sees 2 requests</span>
            </div>
          )}

          {/* DESYNC stamp */}
          {desyncIn > 0 && (
            <div style={{ position: "absolute", left: 540, top: NY + 250, transform: "translateX(-50%)", opacity: desyncIn }}>
              <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 30, color: RED, letterSpacing: "0.2em", border: "2px solid rgba(239,68,68,0.7)", padding: "8px 26px", borderRadius: 12, background: "rgba(239,68,68,0.07)", boxShadow: "0 0 30px rgba(239,68,68,0.30)", transform: "rotate(-3deg)", display: "inline-block" }}>DESYNC</span>
            </div>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 2: the problem — many parsers, one path
const WebApp1Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame + 6, fps, config: { damping: 18, stiffness: 130 } });

  const stages = [
    { t: "HTTP/2", c: BLUE },
    { t: "PROXY", c: "#A78BFA" },
    { t: "HTTP/1.1", c: GREEN },
    { t: "BACKEND", c: YELLOW },
  ];
  const SX = [170, 410, 650, 890];
  const SY = 560;

  const pktX = interpolate(frame, [40, 140], [40, SX[3]], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const arrived = interpolate(frame, [140, 155], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Title */}
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 72 }}>
        <div dir="rtl" style={{ opacity: titleIn, transform: "translateY(" + interpolate(titleIn, [0, 1], [14, 0]) + "px)", textAlign: "center", maxWidth: 960, padding: "0 40px" }}>
          <div style={{ fontFamily: AR, fontWeight: 800, fontSize: 40, color: "white", lineHeight: 1.6 }}>
            <span>المشكلة تبدا كي يكون عندك كثر من </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: YELLOW }}>http parser</span>
            <span> في نفس ال </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: YELLOW }}>request path</span>
          </div>
        </div>
      </AbsoluteFill>

      {/* Chain */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 1080, height: 800 }}>
          <svg width="1080" height="800" style={{ position: "absolute", inset: 0 }}>
            {[0, 1, 2].map(i => {
              const d = interpolate(frame, [36 + i * 18, 58 + i * 18], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const len = SX[i + 1] - SX[i] - 190;
              return <line key={i} x1={SX[i] + 95} y1={SY} x2={SX[i] + 95 + len} y2={SY} stroke="rgba(255,255,255,0.30)" strokeWidth="2.5" strokeDasharray={len} strokeDashoffset={len * (1 - d)} />;
            })}
          </svg>

          {/* travelling request */}
          {frame >= 40 && (
            <div style={{ position: "absolute", left: pktX, top: SY - 64, transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 800, color: "#000", background: "white", padding: "3px 14px", borderRadius: 999, whiteSpace: "nowrap" }}>Request</span>
              <div style={{ width: 16, height: 16, borderRadius: 999, background: "white", boxShadow: "0 0 18px rgba(255,255,255,0.9)" }} />
            </div>
          )}

          {stages.map((s, i) => {
            const p = spring({ frame: frame - (20 + i * 14), fps, config: { damping: 16, stiffness: 140 } });
            const pp = spring({ frame: frame - (100 + i * 16), fps, config: { damping: 14, stiffness: 150 } });
            return (
              <div key={s.t} style={{ position: "absolute", left: SX[i], top: SY, transform: "translate(-50%,-50%)", opacity: p, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div style={{ width: 170, padding: "20px 10px", borderRadius: 20, background: "rgba(255,255,255,0.04)", border: "1.5px solid " + s.c, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 26px " + s.c + "33" }}>
                  <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: i === 2 ? 22 : 24, color: "white", whiteSpace: "nowrap" }}>{s.t}</span>
                </div>
                {i < 3 && (
                  <span style={{ opacity: pp, transform: "scale(" + interpolate(pp, [0, 1], [0.7, 1]) + ")", fontFamily: MONO, fontSize: 13, fontWeight: 800, color: s.c, background: "rgba(0,0,0,0.7)", border: "1px solid " + s.c + "66", padding: "4px 14px", borderRadius: 999, whiteSpace: "nowrap" }}>parser {i + 1} ≠</span>
                )}
              </div>
            );
          })}

          {/* arrival shockwave on backend */}
          {arrived > 0 && arrived < 1 && (
            <div style={{ position: "absolute", left: SX[3], top: SY, transform: "translate(-50%,-50%)", width: 200 + arrived * 160, height: 200 + arrived * 160, borderRadius: 999, border: "2px solid rgba(250,204,21,0.6)", opacity: (1 - arrived) * 0.9 }} />
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 3: HTTP/2 -> proxy converts -> HTTP/1.1 -> backend (visual up, text under)
const WebApp1Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textIn = interpolate(frame, [20, 40], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Nodes top-down
  const H2 = 200;
  const PROXY = 470;
  const H1 = 740;
  const BE = 1010;

  const segs = [
    { from: H2 + 45, to: PROXY - 95, delay: 30 },
    { from: PROXY + 95, to: H1 - 40, delay: 60 },
    { from: H1 + 40, to: BE - 100, delay: 90 },
  ];

  // conversion packet: blue above proxy, green below
  const conv = frame > 70 ? ((frame - 70) % 130) / 130 : -1;
  const convY = conv < 0 ? 0 : 245 + conv * 665;
  const converted = convY > PROXY + 95;
  const insideProxy = convY > PROXY - 95 && convY < PROXY + 95;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Visual */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 1080, height: 1150 }}>
          <svg width="1080" height="1150" style={{ position: "absolute", inset: 0 }}>
            {segs.map((s, i) => {
              const d = interpolate(frame, [s.delay, s.delay + 24], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const len = s.to - s.from;
              return (
                <g key={i} opacity={d}>
                  <line x1={540} y1={s.from} x2={540} y2={s.to} stroke="rgba(255,255,255,0.30)" strokeWidth="2.5" strokeDasharray={len} strokeDashoffset={len * (1 - d)} />
                  <polygon points={`540,${s.to} 531,${s.to - 13} 549,${s.to - 13}`} fill="rgba(255,255,255,0.55)" />
                </g>
              );
            })}
          </svg>

          {/* HTTP/2 */}
          {(() => {
            const p = spring({ frame: frame - 12, fps, config: { damping: 16, stiffness: 140 } });
            return (
              <div style={{ position: "absolute", left: 540, top: H2, transform: "translate(-50%,-50%)", opacity: p }}>
                <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 30, color: "white", background: "rgba(91,157,255,0.10)", border: "1.5px solid " + BLUE, padding: "14px 34px", borderRadius: 18, boxShadow: "0 0 26px rgba(91,157,255,0.25)" }}>HTTP/2</span>
              </div>
            );
          })()}

          {/* PROXY (converter, glows while packet inside) */}
          {(() => {
            const p = spring({ frame: frame - 26, fps, config: { damping: 16, stiffness: 140 } });
            return (
              <div style={{ position: "absolute", left: 540, top: PROXY, transform: "translate(-50%,-50%)", opacity: p, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ width: 320, padding: "22px 10px", borderRadius: 22, background: insideProxy ? "rgba(167,139,250,0.14)" : "rgba(255,255,255,0.04)", border: "1.5px solid #A78BFA", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: insideProxy ? "0 0 40px rgba(167,139,250,0.45)" : "0 0 26px rgba(167,139,250,0.20)", transition: "background 0.2s" }}>
                  <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 30, color: "white" }}>PROXY</span>
                </div>
                <span style={{ opacity: insideProxy ? 1 : 0, fontFamily: MONO, fontSize: 13, fontWeight: 800, color: "#A78BFA", letterSpacing: "0.14em" }}>CONVERTING…</span>
              </div>
            );
          })()}

          {/* HTTP/1.1 */}
          {(() => {
            const p = spring({ frame: frame - 48, fps, config: { damping: 16, stiffness: 140 } });
            return (
              <div style={{ position: "absolute", left: 540, top: H1, transform: "translate(-50%,-50%)", opacity: p }}>
                <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 30, color: "white", background: "rgba(34,197,94,0.10)", border: "1.5px solid " + GREEN, padding: "14px 34px", borderRadius: 18, boxShadow: "0 0 26px rgba(34,197,94,0.25)" }}>HTTP/1.1</span>
              </div>
            );
          })()}

          {/* BACKEND */}
          {(() => {
            const p = spring({ frame: frame - 66, fps, config: { damping: 16, stiffness: 140 } });
            return (
              <div style={{ position: "absolute", left: 540, top: BE, transform: "translate(-50%,-50%)", opacity: p, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ width: 320, padding: "22px 10px", borderRadius: 22, background: "rgba(255,255,255,0.04)", border: "1.5px solid " + YELLOW, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 26px rgba(250,204,21,0.20)" }}>
                  <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 30, color: "white" }}>BACKEND</span>
                </div>
              </div>
            );
          })()}

          {/* conversion packet */}
          {conv >= 0 && (
            <div style={{ position: "absolute", left: 540 + 130, top: convY, transform: "translate(-50%,-50%)", opacity: Math.sin(Math.min(1, Math.max(0, (convY - 245) / 665)) * Math.PI) * 0.95 + 0.05, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 15, height: 15, borderRadius: 999, background: converted ? GREEN : BLUE, boxShadow: "0 0 16px " + (converted ? "rgba(34,197,94,0.9)" : "rgba(91,157,255,0.9)") }} />
              <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 800, color: converted ? GREEN : BLUE, background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.2)", padding: "3px 12px", borderRadius: 999, whiteSpace: "nowrap" }}>{converted ? "HTTP/1.1" : "HTTP/2"}</span>
            </div>
          )}
        </div>
      </AbsoluteFill>

      {/* Text under visual */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 96, pointerEvents: "none" }}>
        <div dir="rtl" style={{ opacity: textIn, transform: "translateY(" + interpolate(textIn, [0, 1], [14, 0]) + "px)", textAlign: "center", maxWidth: 960, padding: "0 40px" }}>
          <div style={{ fontFamily: AR, fontWeight: 700, fontSize: 31, color: "white", lineHeight: 1.7, textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}>
            <span>مثلا: الـ </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: "#A78BFA" }}>Proxy</span>
            <span> يستقبل: </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>HTTP/2</span>
            <span> ثم يحول الطلب الى: </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: GREEN }}>HTTP/1.1</span>
            <span> قبل ارساله الى الـ </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: YELLOW }}>Backend</span>
            <span>.</span>
          </div>
          <div style={{ marginTop: 12, width: 72, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, marginInline: "auto", opacity: textIn, transform: "scaleX(" + textIn + ")" }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 4: same bytes, two readings (visual up, text under)
const WebApp1Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textIn = interpolate(frame, [20, 40], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const bytesIn = spring({ frame: frame + 8, fps, config: { damping: 16, stiffness: 130 } });
  const cardA = spring({ frame: frame - 56, fps, config: { damping: 17, stiffness: 130 } });
  const cardB = spring({ frame: frame - 68, fps, config: { damping: 17, stiffness: 130 } });
  const cutA = interpolate(frame, [110, 130], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cutB = interpolate(frame, [130, 150], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // copies fly from bytes box down into each card
  const fly = interpolate(frame, [44, 72], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const cells = ["47", "45", "54", "20", "2F", "0D", "0A", "0D", "0A", "33", "0D", "0A", "41", "42"];

  const ByteStrip: React.FC<{ cut: number; cutOp: number; smuggle: boolean; color: string }> = ({ cut, cutOp, smuggle, color }) => (
    <div style={{ display: "flex", gap: 4, direction: "ltr" }}>
      {cells.map((c, k) => {
        const after = k >= cut;
        return (
          <div key={k} style={{ position: "relative", width: 24, height: 34, borderRadius: 6, background: after && smuggle ? "rgba(239,68,68,0.16)" : "rgba(255,255,255,0.06)", border: after && smuggle ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: 9, fontWeight: 800, color: after && smuggle ? "#EF4444" : "rgba(255,255,255,0.75)" }}>
            {c}
            {k === cut - 1 && (
              <div style={{ position: "absolute", right: -5, top: -8, bottom: -8, width: 3, borderRadius: 999, background: color, boxShadow: "0 0 10px " + color, opacity: cutOp, transform: "scaleY(" + cutOp + ")" }} />
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Visual */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 1080, height: 1150 }}>
          {/* same bytes */}
          <div style={{ position: "absolute", left: 540, top: 170, transform: "translateX(-50%)", opacity: bytesIn, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 800, color: "rgba(255,255,255,0.55)", letterSpacing: "0.2em" }}>SAME BYTES</span>
            <div style={{ display: "flex", gap: 4, direction: "ltr", padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)" }}>
              {cells.map((c, k) => (
                <div key={k} style={{ width: 26, height: 36, borderRadius: 6, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: 10, fontWeight: 800, color: "white" }}>{c}</div>
              ))}
            </div>
          </div>

          {/* flying copies */}
          <div style={{ position: "absolute", left: 540, top: 300, transform: "translateX(-50%)", opacity: fly > 0 && fly < 1 ? 1 : 0, display: "flex", gap: 300 }}>
            <div style={{ width: 60, height: 22, borderRadius: 8, background: "rgba(91,157,255,0.25)", border: "1px solid rgba(91,157,255,0.5)", transform: "translateX(" + interpolate(fly, [0, 1], [180, -60]) + "px) translateY(" + interpolate(fly, [0, 1], [0, 190]) + "px)" }} />
            <div style={{ width: 60, height: 22, borderRadius: 8, background: "rgba(34,197,94,0.25)", border: "1px solid rgba(34,197,94,0.5)", transform: "translateX(" + interpolate(fly, [0, 1], [-180, 60]) + "px) translateY(" + interpolate(fly, [0, 1], [0, 190]) + "px)" }} />
          </div>

          {/* Proxy card */}
          <div style={{ position: "absolute", left: 270, top: 640, transform: "translate(-50%,-50%)", opacity: cardA, width: 470, borderRadius: 22, background: "rgba(91,157,255,0.06)", border: "1px solid rgba(91,157,255,0.35)", padding: "20px", display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
            <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 24, color: "white" }}>Proxy</span>
            <ByteStrip cut={8} cutOp={cutA} smuggle={false} color={BLUE} />
            <span style={{ opacity: cutA, fontFamily: MONO, fontSize: 15, fontWeight: 800, color: BLUE, background: "rgba(91,157,255,0.10)", border: "1px solid rgba(91,157,255,0.35)", padding: "6px 18px", borderRadius: 999 }}>Interpretation A</span>
          </div>

          {/* Backend card */}
          <div style={{ position: "absolute", left: 810, top: 640, transform: "translate(-50%,-50%)", opacity: cardB, width: 470, borderRadius: 22, background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.40)", padding: "20px", display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
            <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 24, color: "white" }}>Backend</span>
            <ByteStrip cut={5} cutOp={cutB} smuggle color={GREEN} />
            <span style={{ opacity: cutB, fontFamily: MONO, fontSize: 15, fontWeight: 800, color: GREEN, background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.40)", padding: "6px 18px", borderRadius: 999 }}>Interpretation B</span>
          </div>
        </div>
      </AbsoluteFill>

      {/* Text under visual */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 96, pointerEvents: "none" }}>
        <div dir="rtl" style={{ opacity: textIn, transform: "translateY(" + interpolate(textIn, [0, 1], [14, 0]) + "px)", textAlign: "center", maxWidth: 960, padding: "0 40px" }}>
          <div style={{ fontFamily: AR, fontWeight: 700, fontSize: 33, color: "white", lineHeight: 1.7, textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}>
            <span>نفس الـ </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>bytes</span>
            <span> يمكن أن تفسر بشكل مختلف بين الطرفين.</span>
          </div>
          <div style={{ marginTop: 12, width: 72, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, marginInline: "auto", opacity: textIn, transform: "scaleX(" + textIn + ")" }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 5 (last): the essence — cascade + closing lines under
const WebApp1Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textIn = interpolate(frame, [120, 145], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const steps = [
    { t: "Parser Differential", c: BLUE },
    { t: "Desynchronization", c: YELLOW },
    { t: "Request Smuggling", c: RED },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Visual cascade */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: -140 }}>
          {steps.map((s, i) => {
            const p = spring({ frame: frame - (16 + i * 30), fps, config: { damping: 15, stiffness: 130 } });
            const last = i === steps.length - 1;
            return (
              <div key={s.t} style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: p }}>
                <div style={{ transform: "scale(" + interpolate(p, [0, 1], [0.85, 1]) + ")", fontFamily: MONO, fontWeight: 900, fontSize: last ? 40 : 34, color: "white", background: last ? "rgba(239,68,68,0.10)" : "rgba(255,255,255,0.045)", border: "1.5px solid " + s.c, padding: last ? "20px 46px" : "16px 38px", borderRadius: 20, boxShadow: "0 0 " + (last ? 44 : 24) + "px " + s.c + "44", whiteSpace: "nowrap" }}>
                  {s.t}
                </div>
                {i < steps.length - 1 && (
                  <div style={{ position: "relative", width: 2, height: 46, background: "rgba(255,255,255,0.10)", borderRadius: 999, margin: "8px 0", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: interpolate(frame, [40 + i * 30, 58 + i * 30], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) + "%", background: s.c }} />
                    <div style={{ position: "absolute", bottom: -2, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: "9px solid " + s.c, opacity: interpolate(frame, [52 + i * 30, 62 + i * 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Text under visual */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 120, pointerEvents: "none" }}>
        <div dir="rtl" style={{ opacity: textIn, transform: "translateY(" + interpolate(textIn, [0, 1], [14, 0]) + "px)", textAlign: "center", maxWidth: 960, padding: "0 40px" }}>
          <div style={{ fontFamily: AR, fontWeight: 800, fontSize: 38, color: "white", lineHeight: 1.6, textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}>
            <span>وهذا هو جوهر </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 900, color: RED }}>Request Smuggling</span>
            <span>:</span>
          </div>
          <div style={{ fontFamily: AR, fontWeight: 700, fontSize: 30, color: "rgba(255,255,255,0.88)", lineHeight: 1.7, marginTop: 8 }}>
            <span>مشكلتك مش في الـ </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: BLUE }}>Request</span>
            <span> نفسه... المشكلة في أن مكوّنين موثوقين فسّروا نفس البيانات بشكل مختلف.</span>
          </div>
          <div style={{ marginTop: 14, width: 72, height: 2, background: RED, borderRadius: 999, marginInline: "auto", opacity: textIn, transform: "scaleX(" + textIn + ")", boxShadow: "0 0 12px rgba(239,68,68,0.6)" }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const WebApp1: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Sequence from={0} durationInFrames={240}>
        <WebApp1Scene1 />
      </Sequence>
      <Sequence from={240} durationInFrames={260}>
        <WebApp1Scene2 />
      </Sequence>
      <Sequence from={500} durationInFrames={260}>
        <WebApp1Scene3 />
      </Sequence>
      <Sequence from={760} durationInFrames={260}>
        <WebApp1Scene4 />
      </Sequence>
      <Sequence from={1020} durationInFrames={240}>
        <WebApp1Scene5 />
      </Sequence>
    </AbsoluteFill>
  );
};

export const WEBAPP1_DURATION = 1260;
export const WEBAPP1_FPS = 30;
export const WEBAPP1_WIDTH = 1080;
export const WEBAPP1_HEIGHT = 1920;

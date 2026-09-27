import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CYBER, FONT } from "../../profx/Theme";

const CardImage: React.FC<{
  src: string;
  delay: number;
}> = ({ src, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 120 } });
  const y = interpolate(s, [0, 1], [22, 0]);
  const scale = interpolate(s, [0, 1], [0.94, 1]);
  const opacity = interpolate(s, [0, 0.6], [0, 1]);
  // keep quality — no tilt, no stretch, full cover
  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        borderRadius: 18,
        overflow: "hidden",
        border: `1px solid rgba(255,255,255,0.12)`,
        boxShadow: `0 22px 70px rgba(0,0,0,0.72), 0 0 0 1px rgba(255,255,255,0.05) inset`,
        background: "#0a0a0a",
        width: 860,
        height: 484, // 736x414 native ~1.78, 860x484 keeps ratio, full quality
        flex: "none",
        position: "relative",
      }}
    >
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
    </div>
  );
};

// File system growing — BIG centered in middle
const FileSystemGrowing: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const branches = [
    { from: { x: 540, y: 50 }, to: { x: 260, y: 190 }, label: "/home", accent: CYBER.cyan },
    { from: { x: 540, y: 50 }, to: { x: 540, y: 190 }, label: "/usr", accent: CYBER.magenta },
    { from: { x: 540, y: 50 }, to: { x: 820, y: 190 }, label: "/etc", accent: CYBER.green },
    { from: { x: 260, y: 190 }, to: { x: 150, y: 330 }, label: "/user/docs", accent: CYBER.cyan },
    { from: { x: 260, y: 190 }, to: { x: 370, y: 330 }, label: "/user/pics", accent: CYBER.cyan },
    { from: { x: 540, y: 190 }, to: { x: 540, y: 330 }, label: "/bin", accent: CYBER.magenta },
    { from: { x: 820, y: 190 }, to: { x: 710, y: 330 }, label: "/conf", accent: CYBER.green },
    { from: { x: 820, y: 190 }, to: { x: 930, y: 330 }, label: "/system", accent: CYBER.green },
  ];

  return (
    <AbsoluteFill style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <svg viewBox="0 0 1080 460" style={{ width: 980, height: 460, overflow: "visible" }}>
        {/* root */}
        <g opacity={spring({ frame: frame - delay, fps, config: { damping: 16, stiffness: 140 } })}>
          <circle cx={540} cy={30} r={12} fill={CYBER.white} stroke={CYBER.cyan} strokeWidth={2.5} style={{ filter: `drop-shadow(0 0 10px ${CYBER.cyan})` }} />
          <text x={540} y={12} textAnchor="middle" fontFamily={FONT.mono} fontSize={13} fill={CYBER.cyan} letterSpacing="0.14em" fontWeight={700}>ROOT /</text>
        </g>

        {branches.map((b, i) => {
          const d = delay + 8 + i * 5;
          const p = spring({ frame: frame - d, fps, config: { damping: 18, stiffness: 95 } });
          const len = Math.hypot(b.to.x - b.from.x, b.to.y - b.from.y);
          const draw = interpolate(p, [0, 1], [len, 0]);
          const scale = interpolate(p, [0, 1], [0.7, 1]);
          return (
            <g key={i} opacity={p}>
              <line x1={b.from.x} y1={b.from.y} x2={b.to.x} y2={b.to.y} stroke={b.accent} strokeWidth={2.5} strokeOpacity={0.98} strokeDasharray={len} strokeDashoffset={draw} strokeLinecap="round" />
              <g transform={`translate(${b.to.x}, ${b.to.y}) scale(${scale})`}>
                <rect x={-62} y={-20} width={124} height={34} rx={10} fill="rgba(255,255,255,0.08)" stroke={`${b.accent}88`} strokeWidth={1.4} />
                <text x={0} y={6} textAnchor="middle" fontFamily={FONT.mono} fontSize={13} fill={b.accent} fontWeight={800}>{b.label}</text>
                <circle cx={54} cy={-10} r={3.5} fill={b.accent} opacity={0.75 + Math.sin((frame + i) * 0.22) * 0.25} />
              </g>
            </g>
          );
        })}

        {/* packets */}
        {branches.slice(0, 3).map((b, i) => {
          const d = delay + 46 + i * 3;
          const t = interpolate(frame, [d, d + 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const x = interpolate(t, [0, 1], [b.from.x, b.to.x]);
          const y = interpolate(t, [0, 1], [b.from.y, b.to.y]);
          const op = t > 0 && t < 1 ? 1 : 0;
          return <circle key={`p-${i}`} cx={x} cy={y} r={5} fill={b.accent} opacity={op} style={{ filter: `drop-shadow(0 0 8px ${b.accent})` }} />;
        })}
      </svg>

      {/* tech ticker — bigger, centered */}
      <div style={{ position: "absolute", bottom: 14, left: 0, right: 0, display: "flex", gap: 12, justifyContent: "center" }}>
        {[
          { k: "ext4", v: "mounted" },
          { k: "systemd", v: "active" },
          { k: "kernel", v: "6.8.11" },
        ].map((t, i) => {
          const d = delay + 58 + i * 5;
          const s = spring({ frame: frame - d, fps, config: { damping: 16, stiffness: 140 } });
          return (
            <div key={t.k} style={{ opacity: s, transform: `translateY(${interpolate(s, [0, 1], [10, 0])}px) scale(${interpolate(s, [0, 1], [0.92, 1])})`, display: "flex", alignItems: "center", gap: 9, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", padding: "9px 16px", borderRadius: 999, backdropFilter: "blur(6px)" }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: i === 0 ? CYBER.green : i === 1 ? CYBER.cyan : CYBER.magenta, boxShadow: `0 0 10px ${i === 0 ? CYBER.green : i === 1 ? CYBER.cyan : CYBER.magenta}` }} />
              <span style={{ fontFamily: FONT.mono, fontSize: 13, color: CYBER.white, letterSpacing: "0.14em", fontWeight: 700 }}>{t.k}</span>
              <span style={{ fontFamily: FONT.mono, fontSize: 13, color: "rgba(255,255,255,0.62)" }}>{t.v}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const SceneCustom: React.FC = () => {
  const frame = useCurrentFrame();

  // Title + phase handling
  // 0-95: "من inter face" + 2 pictures
  // 95-220: "لكيفاش النظام يخدم" + filesystem
  const phase = frame < 96 ? 0 : 1;

  return (
    <AbsoluteFill style={{ background: "#000000", padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {/* big title — always center */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginBottom: 18 }}>
        <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 56, fontWeight: 900, color: CYBER.white, direction: "rtl", lineHeight: 1, textAlign: "center", textShadow: "0 0 22px rgba(34,211,238,0.22)" }}>
          تخصيص لا محدود
        </div>
        <div style={{ width: 72, height: 2, background: CYBER.cyan, borderRadius: 999, opacity: 0.9, boxShadow: "0 0 10px rgba(34,211,238,0.7)" }} />
        {phase === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginTop: 4 }}>
            <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 26, fontWeight: 800, color: "rgba(255,255,255,0.92)", direction: "rtl" }}>
              من <span style={{ color: CYBER.cyan, fontFamily: FONT.mono, fontSize: 24, letterSpacing: "0.08em" }}>interface</span>
            </div>
            <div style={{ fontFamily: FONT.mono, fontSize: 11, color: "rgba(255,255,255,0.38)", letterSpacing: "0.18em", textTransform: "uppercase" }}>your desktop, your rules</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginTop: 4, opacity: interpolate(frame, [96, 108], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
            <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 32, fontWeight: 900, color: CYBER.white, direction: "rtl" }}>لكيفاش النظام يخدم</div>
            <div style={{ fontFamily: FONT.mono, fontSize: 11, color: "rgba(255,255,255,0.44)", letterSpacing: "0.18em", textTransform: "uppercase" }}>filesystem · growing · tech stack</div>
          </div>
        )}
      </div>

      {/* Content — BIG and in middle */}
      {phase === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center", justifyContent: "center", flex: 1, width: "100%" }}>
          {/* Two pics — one under one, centered, kept full quality */}
          <CardImage src="linux-custom-purple.jpg" delay={12} />
          <CardImage src="linux-custom-kali.jpg" delay={22} />
          <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 14, color: "rgba(255,255,255,0.58)", direction: "rtl", textAlign: "center", lineHeight: 1.6, marginTop: 2, opacity: interpolate(frame, [30, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
            نفس النظام — شكلين مختلفين تمامًا. <span style={{ color: CYBER.white, fontWeight: 800 }}>الحرية البصرية</span>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", opacity: interpolate(frame, [96, 112], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <FileSystemGrowing delay={104} />
        </div>
      )}
    </AbsoluteFill>
  );
};

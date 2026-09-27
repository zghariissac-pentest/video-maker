import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, random } from "remotion";
import { Network, Globe, Cpu, Lock, Search, Cloud, Bug, Eye } from "lucide-react";

const MatrixBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const columns = Math.floor(width / 20);
  return (
    <AbsoluteFill className="bg-black overflow-hidden">
      {Array.from({ length: columns }).map((_, i) => {
        const speed = 1 + (i % 5) * 0.22;
        const offset = (i * 79) % height;
        const y = (frame * speed + offset) % (height + 200) - 100;
        return (
          <div
            key={i}
            className="absolute text-green-500 font-mono text-xs"
            style={{
              left: i * 20,
              top: y,
              opacity: 0.03,
              writingMode: "vertical-rl" as any,
              textOrientation: "upright" as any,
            }}
          >
            {Array.from({ length: 20 })
              .map((_, j) => (random(`s4c-${i}-${j}`) > 0.5 ? "1" : "0"))
              .join("")}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const pillars = [
  { Icon: Network, label: "NETWORK", sub: "ADVANCED", h: 1 },
  { Icon: Globe, label: "WEB", sub: "ADVANCED", h: 0.92 },
  { Icon: Cpu, label: "REVERSE", sub: "ENGINEERING", h: 1 },
  { Icon: Bug, label: "MALWARE", sub: "ANALYSIS", h: 0.88 },
  { Icon: Lock, label: "CRYPTO", sub: "ADVANCED", h: 0.96 },
  { Icon: Cloud, label: "CLOUD", sub: "SECURITY", h: 0.9 },
  { Icon: Search, label: "FORENSICS", sub: "ADVANCED", h: 1 },
  { Icon: Eye, label: "OSINT", sub: "ADVANCED", h: 0.86 },
];

export const Scene4_Knowledge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) => spring({ frame: frame - d, fps, config: { damping: 22, stiffness: 70, mass: 1 } });

  const kickerIn = s(6);
  const text1In = s(26);
  const text2In = s(50);

  return (
    <AbsoluteFill className="bg-black flex flex-col items-center justify-center overflow-hidden">
      <MatrixBackground />

      <div className="absolute top-8 z-10 flex items-center gap-2.5" style={{ opacity: kickerIn, transform: `translateY(${interpolate(kickerIn, [0, 1], [6, 0])}px)` }}>
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.9)]" />
        <span className="font-mono text-[11px] tracking-[0.32em] text-green-500/85">YEARS LATER</span>
        <span className="font-mono text-[10px] tracking-[0.16em] text-white/25">FULL COVERAGE</span>
      </div>

      <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full max-w-[920px] px-4">
        {/* SKYLINE — creative, not radial — 8 pillars rising = huge area */}
        <div className="relative w-full h-[380px] flex items-end justify-center gap-[10px] px-2">
          {/* ground line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
          <div className="absolute bottom-0 left-0 h-px bg-green-500/60" style={{ width: `${interpolate(frame, [18, 96], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%` }} />

          {pillars.map((p, i) => {
            const prog = s(16 + i * 10);
            const height = interpolate(prog, [0, 1], [0, 220 * p.h]);
            const glow = interpolate(prog, [0, 1], [0, 1]);
            return (
              <div key={i} className="flex flex-col items-center" style={{ opacity: prog }}>
                {/* icon — big, perfect */}
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 88,
                    height: 88,
                    borderRadius: 22,
                    background: "white",
                    border: "1.8px solid rgba(34,197,94,0.9)",
                    boxShadow: `0 10px 26px rgba(0,0,0,0.4), 0 0 ${12 + glow * 10}px rgba(34,197,94,0.38)`,
                    transform: `translateY(${interpolate(prog, [0, 1], [12, 0])}px) scale(${interpolate(prog, [0, 1], [0.82, 1])})`,
                  }}
                >
                  <p.Icon size={38} color="#0a2e16" strokeWidth={1.9} />
                </div>

                {/* pillar */}
                <div className="mt-3 relative" style={{ width: 88, height: 220 }}>
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-t-[14px] border-x border-t overflow-hidden"
                    style={{
                      height,
                      background: "linear-gradient(180deg, rgba(34,197,94,0.18), rgba(34,197,94,0.04) 60%, rgba(255,255,255,0.03))",
                      borderColor: "rgba(255,255,255,0.12)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14)",
                    }}
                  >
                    {/* inner scan line */}
                    <div
                      className="absolute left-0 right-0 h-px bg-green-400/40"
                      style={{ top: interpolate((frame * 0.7 + i * 40) % 120, [0, 120], [0, 220]) }}
                    />
                    {/* fill percent */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-widest text-green-300/70">
                      {Math.round(glow * 100)}%
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <div className="font-mono text-[9px] tracking-[0.14em] text-white/90">{p.label}</div>
                  <div className="font-mono text-[7px] tracking-[0.12em] text-green-400/60">{p.sub}</div>
                </div>
              </div>
            );
          })}

          {/* top shimmer that sweeps */}
          <div
            className="absolute top-10 left-0 h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent pointer-events-none"
            style={{ width: "100%", opacity: interpolate(frame, [90, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}
          />
        </div>

        <div className="mt-3 font-mono text-[10px] tracking-[0.18em] text-white/25">8 DOMAINS • FULL-STACK • NO GAPS</div>

        {/* TEXT UNDER — exact script */}
        <div dir="rtl" className="mt-6 text-center max-w-[820px]" style={{ opacity: text1In, transform: `translateY(${interpolate(text1In, [0, 1], [8, 0])}px)` }}>
          <div className="font-bold leading-tight text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 28 }}>
            بعد سنوات لقيت روحي بكم كبير من المعلومات
          </div>
          <div
            className="mt-1 font-black leading-none"
            style={{
              fontFamily: "Cairo, sans-serif",
              fontSize: 32,
              color: "#22c55e",
              opacity: text2In,
              transform: `translateY(${interpolate(text2In, [0, 1], [8, 0])}px)`,
              textShadow: "0 0 14px rgba(34,197,94,0.45)",
            }}
          >
            في كامل فروع الامن السيبراني
            <span className="inline-block w-[3px] h-6 bg-green-500 mr-2 align-middle" style={{ opacity: interpolate(frame % 24, [0, 12, 13, 24], [1, 1, 0, 0]) }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

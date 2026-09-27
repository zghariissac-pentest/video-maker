import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  random,
} from "remotion";

const MatrixBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const columns = Math.floor(width / 20);
  return (
    <AbsoluteFill className="bg-black overflow-hidden">
      {Array.from({ length: columns }).map((_, i) => {
        const speed = 1 + (i % 5) * 0.3;
        const offset = (i * 79) % height;
        const y = (frame * speed + offset) % (height + 200) - 100;
        return (
          <div
            key={i}
            className="absolute text-green-500 font-mono text-xs"
            style={{
              left: i * 20,
              top: y,
              opacity: 0.07,
              writingMode: "vertical-rl" as any,
              textOrientation: "upright" as any,
            }}
          >
            {Array.from({ length: 20 })
              .map((_, j) => (random(`m2f-${i}-${j}`) > 0.5 ? "1" : "0"))
              .join("")}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const Scene2_Roadmap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = (d: number) =>
    spring({ frame: frame - d, fps, config: { damping: 18, stiffness: 120 } });

  const kickerIn = s(6);
  const mapIn = s(14);
  const textIn = s(42);
  const text2In = s(68);

  const points = [
    { x: 88, y: 68 },
    { x: 214, y: 34 },
    { x: 340, y: 76 },
    { x: 466, y: 38 },
    { x: 592, y: 70 },
  ];

  const stepDelays = [20, 46, 72, 98, 124];
  const steps = stepDelays.map((d) => s(d));

  const lineProgress = interpolate(frame, [24, 132], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const destroyStart = 178;
  const destroyProgress = interpolate(frame, [destroyStart, 232], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fallY = interpolate(destroyProgress, [0, 1], [0, 420]);
  const fallRot = interpolate(destroyProgress, [0, 1], [0, 9]);
  const fallOpacity = interpolate(destroyProgress, [0, 0.65, 1], [1, 1, 0]);
  const scaleDown = interpolate(destroyProgress, [0, 1], [1, 0.94]);

  const icons = [
    { src: "wireshark.svg", label: "NETWORK" },
    { src: "kalilinux.svg", label: "LINUX" },
    { src: "assets/burpsuite.svg", label: "WEB" },
    { src: "assets/hackthebox.png", label: "PENTEST" },
    { src: "qubes-logo.png", label: "PRIVACY" },
  ];

  return (
    <AbsoluteFill className="bg-black flex flex-col items-center justify-center overflow-hidden">
      <MatrixBackground />



      {/* kicker — minimal */}
      <div
        className="z-10 flex items-center gap-2.5 mb-9"
        style={{
          opacity: kickerIn,
          transform: `translateY(${interpolate(kickerIn, [0, 1], [8, 0])}px)`,
        }}
      >
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.9)]" />
        <span className="font-mono text-[11px] tracking-[0.34em] text-green-500/85">ROADMAP</span>
      </div>

      {/* MAP — first shape, more visual & cleaner icons */}
      <div
        className="z-10 w-full max-w-[860px] px-4"
        style={{
          opacity: mapIn,
          transform: `translateY(${interpolate(mapIn, [0, 1], [10, 0])}px)`,
        }}
      >
        <div className="relative h-[240px] rounded-[26px] border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* falling canvas */}
          <div
            className="absolute inset-0 px-2"
            style={{
              transform: `translateY(${fallY}px) rotate(${fallRot}deg) scale(${scaleDown})`,
              opacity: fallOpacity,
              transformOrigin: "center 35%",
            }}
          >
            <svg viewBox="0 0 680 150" className="absolute inset-0 w-full h-[150px] mt-4">
              <path
                d={points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")}
                fill="none"
                stroke="rgba(255,255,255,0.09)"
                strokeWidth={2.8}
                strokeDasharray="8 10"
                strokeLinecap="round"
              />
              <path
                d={points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")}
                fill="none"
                stroke="#22c55e"
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray={760}
                strokeDashoffset={760 - 760 * lineProgress}
                style={{ filter: "drop-shadow(0 0 7px rgba(34,197,94,0.65))" }}
              />
            </svg>

            <div className="absolute inset-0">
              {points.map((p, i) => {
                const prog = steps[i];
                const active = prog > 0.5;
                return (
                  <div
                    key={i}
                    className="absolute flex flex-col items-center"
                    style={{
                      left: (p.x / 680) * 100 + "%",
                      top: p.y,
                      transform: `translate(-50%,-50%) translateY(${interpolate(prog, [0, 1], [10, 0])}px) scale(${interpolate(prog, [0, 1], [0.84, 1])})`,
                      opacity: prog,
                    }}
                  >
                    <div
                      className="relative flex items-center justify-center"
                      style={{
                        width: 92,
                        height: 92,
                        borderRadius: 24,
                        background: active
                          ? "rgba(255,255,255,0.98)"
                          : "rgba(255,255,255,0.06)",
                        border: `1.8px solid ${active ? "rgba(34,197,94,0.95)" : "rgba(255,255,255,0.13)"}`,
                        boxShadow: active
                          ? "0 10px 28px rgba(0,0,0,0.4), 0 0 24px rgba(34,197,94,0.42)"
                          : "0 6px 18px rgba(0,0,0,0.3)",
                      }}
                    >
                      {active && (
                        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/45 to-transparent pointer-events-none" />
                      )}
                      <Img
                        src={staticFile(icons[i].src)}
                        style={{
                          width: 48,
                          height: 48,
                          objectFit: "contain",
                          filter: active ? "none" : "brightness(0.92) saturate(0.9)",
                        }}
                      />
                      {active && (
                        <div className="absolute -top-1.5 -right-1.5 w-[20px] h-[20px] rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_10px_rgba(34,197,94,0.9)] border border-white">
                          <span className="font-mono text-[9px] font-black text-black leading-none">✓</span>
                        </div>
                      )}
                    </div>
                    <div
                      className="mt-2.5 font-mono text-[8.5px] tracking-[0.16em]"
                      style={{ color: active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.38)" }}
                    >
                      {icons[i].label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* traveling glow dot */}
            {frame > 28 && frame < destroyStart && (
              <div
                className="absolute w-[10px] h-[10px] rounded-full bg-white border-2 border-green-500"
                style={{
                  left: `${(points[0].x + (points[4].x - points[0].x) * lineProgress) / 680 * 100}%`,
                  top: 64,
                  boxShadow: "0 0 14px rgba(34,197,94,0.9), 0 0 28px rgba(34,197,94,0.4)",
                  transform: "translate(-50%,-50%)",
                }}
              />
            )}
          </div>

          {/* bottom progress — ultra thin */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/08" />
          <div
            className="absolute bottom-0 left-0 h-px bg-green-500"
            style={{ width: `${lineProgress * 100}%`, boxShadow: "0 0 8px rgba(34,197,94,0.7)" }}
          />
        </div>
      </div>

      {/* TEXT UNDER — better typography, deleted small stuff */}
      <div
        dir="rtl"
        className="z-10 mt-8 text-center px-8 max-w-[820px]"
        style={{
          opacity: textIn,
          transform: `translateY(${interpolate(textIn, [0, 1], [8, 0])}px)`,
        }}
      >
        <div
          className="font-bold leading-[1.35] text-white"
          style={{ fontFamily: "Cairo, sans-serif", fontSize: 33, letterSpacing: -0.3 }}
        >
          واذا راك متوقع اني راح نعطيك{" "}
          <span className="text-green-400">خطة مثالية</span> تمشي عليها
        </div>
        <div
          className="mt-1 font-black leading-none text-white"
          style={{
            fontFamily: "Cairo, sans-serif",
            fontSize: 58,
            letterSpacing: -0.8,
            opacity: text2In,
            transform: `translateY(${interpolate(text2In, [0, 1], [8, 0])}px) scale(${interpolate(text2In, [0, 1], [0.98, 1])})`,
            textShadow: "0 2px 20px rgba(0,0,0,0.4)",
          }}
        >
          مكانش عندي وحدة
          <span
            className="inline-block w-[3px] h-7 bg-green-500 mr-2 align-middle"
            style={{ opacity: interpolate(frame % 24, [0, 12, 13, 24], [1, 1, 0, 0]) }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

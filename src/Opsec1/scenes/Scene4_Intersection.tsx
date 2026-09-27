import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, random } from "remotion";
import { Laptop, Wifi, CreditCard, Type, Clock, Mail } from "lucide-react";

const MatrixBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const columns = Math.floor(width / 20);
  return (
    <AbsoluteFill className="bg-black overflow-hidden">
      {Array.from({ length: columns }).map((_, i) => {
        const speed = 1 + (i % 5) * 0.5;
        const offset = (i * 79) % height;
        const y = (frame * speed + offset) % (height + 200) - 100;
        return (
          <div key={i} className="absolute text-green-500 font-mono text-xs opacity-[0.10]" style={{ left: i * 20, top: y, writingMode: "vertical-rl" as any, textOrientation: "upright" as any }}>
            {Array.from({ length: 20 }).map((_, j) => (random(`opsec4-${i}-${j}`) > 0.5 ? "1" : "0")).join("")}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const Scene4_Intersection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) => spring({ frame: frame - d, fps, config: { damping: 20, stiffness: 90 } });

  const dimProgress = interpolate(frame, [52, 82], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dim = interpolate(dimProgress, [0, 1], [1, 0.32]);

  const redProg = interpolate(frame, [74, 154], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); // slower
  const glowIntensity = redProg > 0.5 ? interpolate(frame % 18, [0, 9, 18], [0.6, 1, 0.6]) : redProg;

  // positions — same as previous clusters
  const centerA = { x: 320, y: 540 };
  const centerB = { x: 760, y: 540 };
  const radius = 148;
  // email nodes are at angle 72°? Let's use top-right for A and top-left for B to make line horizontal-ish
  // A email at angle 0 (right), B email at angle 180 (left) — creates straight red connector across gap
  const emailA = { x: centerA.x + radius, y: centerA.y }; // rightmost of A
  const emailB = { x: centerB.x - radius, y: centerB.y }; // leftmost of B
  const rx1 = emailA.x + (emailB.x - emailA.x) * redProg;
  const ry1 = emailA.y + (emailB.y - emailA.y) * redProg;

  const text1In = s(12);
  const text2In = s(32);
  const text3In = s(54);

  const nodes = [
    { Icon: Laptop, label: "الجهاز" },
    { Icon: Wifi, label: "الشبكة" },
    { Icon: Mail, label: "البريد" },
    { Icon: CreditCard, label: "الدفع" },
    { Icon: Clock, label: "التوقيت" },
  ];

  const renderDimmedCluster = (center: { x: number; y: number }, label: string) => {
    return (
      <div style={{ opacity: dim }}>
        <div className="absolute flex flex-col items-center justify-center rounded-full bg-white border-2 border-green-500" style={{ left: center.x - 72, top: center.y - 72, width: 144, height: 144, borderColor: "#22c55e", background: "white" }}>
          <span className="font-mono text-[9px] tracking-[0.16em] text-black/40">PERSONA</span>
          <span className="font-black leading-none" style={{ fontFamily: "Cairo, sans-serif", fontSize: 22, color: "#0a0a0a" }}>{label}</span>
        </div>
        {nodes.map((n, i) => {
          const angle = -90 + i * 72;
          const rad = (angle * Math.PI) / 180;
          const px = center.x + Math.cos(rad) * radius;
          const py = center.y + Math.sin(rad) * radius;
          const isEmail = n.label === "البريد";
          return (
            <div key={i} className="absolute flex flex-col items-center" style={{ left: px - 28, top: py - 28, width: 56, opacity: isEmail ? 1 : dim }}>
              <div className="w-[56px] h-[56px] rounded-[14px] bg-white border-2 flex items-center justify-center" style={{ borderColor: isEmail && redProg > 0.2 ? "#ef4444" : "#22c55e", boxShadow: isEmail && redProg > 0.2 ? "0 0 14px rgba(239,68,68,0.5)" : undefined }}>
                <n.Icon size={20} color={isEmail && redProg > 0.2 ? "#ef4444" : "#0a0a0a"} strokeWidth={1.8} />
              </div>
              <div className="mt-1 font-bold text-white text-[8px]" style={{ fontFamily: "Cairo, sans-serif", opacity: isEmail ? 1 : dim }}>{n.label}</div>
            </div>
          );
        })}
        {/* green lines dimmed */}
        <svg viewBox="0 0 1080 760" className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: dim * 0.45 }}>
          {nodes.map((_, i) => {
            const angle = -90 + i * 72;
            const rad = (angle * Math.PI) / 180;
            const px = center.x + Math.cos(rad) * radius;
            const py = center.y + Math.sin(rad) * radius;
            return <line key={i} x1={center.x} y1={center.y} x2={px} y2={py} stroke="#22c55e" strokeWidth={1.4} opacity={0.4} />;
          })}
        </svg>
      </div>
    );
  };

  return (
    <AbsoluteFill style={{ background: "#000" }} className="overflow-hidden">
      <MatrixBackground />
      {renderDimmedCluster(centerA, "الهوية أ")}
      {renderDimmedCluster(centerB, "الهوية ب")}

      {/* single thin red line — gotcha */}
      <svg viewBox="0 0 1080 760" className="absolute inset-0 w-full h-full pointer-events-none">
        <line x1={emailA.x} y1={emailA.y} x2={rx1} y2={ry1} stroke="#ef4444" strokeWidth={2.2} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 ${4 + glowIntensity * 6}px rgba(239,68,68,0.9))` }} />
        {redProg > 0.02 && <circle cx={rx1} cy={ry1} r={3.5} fill="#ef4444" style={{ filter: "drop-shadow(0 0 6px #ef4444)" }} />}
      </svg>

      {/* red connector label */}
      <div
        className="absolute left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-red-500 border border-red-600 flex items-center gap-1.5"
        style={{ top: 520, opacity: interpolate(redProg, [0.3, 0.6], [0, 1]), transform: `scale(${interpolate(redProg, [0.3, 0.6], [0.86, 1])})`, boxShadow: "0 0 16px rgba(239,68,68,0.5)" }}
      >
        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        <span className="font-mono text-[9px] font-black tracking-[0.16em] text-white">ONE INTERSECTION</span>
      </div>

      <div dir="rtl" className="absolute left-0 right-0 mx-auto text-center px-6" style={{ top: "72%", maxWidth: 920 }}>
        <div className="font-bold leading-[1.6] text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 22, opacity: text1In, transform: `translateY(${interpolate(text1In, [0, 1], [8, 0])}px)` }}>
          الحالات الواقعية تتبع نفس النمط: نادرًا ما يكون <span className="text-white/40 line-through">فشل التشفير</span> هو السبب.
        </div>
        <div className="mt-1 font-bold leading-[1.6]" style={{ fontFamily: "Cairo, sans-serif", fontSize: 20, opacity: text2In, transform: `translateY(${interpolate(text2In, [0, 1], [8, 0])}px)` }}>
          <span className="text-red-400">بل تقاطع واحد</span>
          <span className="text-white"> — بريد إلكتروني لاستعادة كلمة المرور، رقم هاتف، أثر دفع —</span>
        </div>
        <div className="mt-1 font-bold leading-[1.6] text-green-400" style={{ fontFamily: "Cairo, sans-serif", fontSize: 20, opacity: text3In, transform: `translateY(${interpolate(text3In, [0, 1], [8, 0])}px)` }}>
          يسمح للمحققين بالانتقال من هوية إلى أخرى.
        </div>
      </div>
    </AbsoluteFill>
  );
};

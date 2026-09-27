import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, random } from "remotion";
import { Laptop, Wifi, CreditCard, Type, Clock } from "lucide-react";

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
          <div key={i} className="absolute text-green-500 font-mono text-xs opacity-[0.12]" style={{ left: i * 20, top: y, writingMode: "vertical-rl" as any, textOrientation: "upright" as any }}>
            {Array.from({ length: 20 }).map((_, j) => (random(`opsec3-${i}-${j}`) > 0.5 ? "1" : "0")).join("")}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const Scene3_IsolatedPersonas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) => spring({ frame: frame - d, fps, config: { damping: 20, stiffness: 90 } });

  const clusterAIn = s(12);
  const clusterBIn = s(54);
  const text1In = s(18);
  const text2In = s(42);
  const text3In = s(64);

  const nodes = [
    { Icon: Laptop, label: "الجهاز" },
    { Icon: Wifi, label: "الشبكة" },
    { Icon: CreditCard, label: "الدفع" },
    { Icon: Type, label: "الكتابة" },
    { Icon: Clock, label: "التوقيت" },
  ];

  const centerA = { x: 320, y: 560 };
  const centerB = { x: 760, y: 560 };
  const radius = 148;

  const renderCluster = (center: { x: number; y: number }, delay: number, label: string, inProg: number) => {
    const pts = nodes.map((_, i) => {
      const angle = -90 + i * 72;
      const rad = (angle * Math.PI) / 180;
      return { x: center.x + Math.cos(rad) * radius, y: center.y + Math.sin(rad) * radius, angle };
    });
    return (
      <div className="absolute inset-0" style={{ opacity: inProg }}>
        <svg viewBox="0 0 1080 760" className="absolute inset-0 w-full h-full">
          {pts.map((p, i) => {
            const prog = interpolate(frame, [delay + i * 16, delay + i * 16 + 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const lx = center.x + (p.x - center.x) * prog;
            const ly = center.y + (p.y - center.y) * prog;
            return <line key={i} x1={center.x} y1={center.y} x2={lx} y2={ly} stroke="#22c55e" strokeWidth={2.2} strokeLinecap="round" opacity={0.45} />;
          })}
        </svg>
        <div
          className="absolute flex flex-col items-center justify-center rounded-full bg-white border-3 border-green-500"
          style={{
            left: center.x - 72,
            top: center.y - 72,
            width: 144,
            height: 144,
            opacity: inProg,
            transform: `scale(${interpolate(inProg, [0, 1], [0.86, 1])})`,
            borderWidth: 3,
            boxShadow: "0 0 22px rgba(34,197,94,0.4)",
            borderColor: "#22c55e",
            background: "white",
          }}
        >
          <span className="font-mono text-[9px] tracking-[0.16em] text-black/40">PERSONA</span>
          <span className="font-black leading-none" style={{ fontFamily: "Cairo, sans-serif", fontSize: 22, color: "#0a0a0a" }}>
            {label}
          </span>
        </div>
        {pts.map((p, i) => {
          const op = s(delay + 12 + i * 10);
          return (
            <div key={i} className="absolute flex flex-col items-center" style={{ left: p.x - 36, top: p.y - 36, width: 72, opacity: op, transform: `scale(${interpolate(op, [0, 1], [0.86, 1])})` }}>
              <div className="w-[56px] h-[56px] rounded-[14px] bg-white border-2 border-green-500 flex items-center justify-center shadow-[0_6px_16px_rgba(0,0,0,0.3)]">
                <div style={{ opacity: op }}>
                  {React.createElement(nodes[i].Icon, { size: 20, color: "#0a0a0a", strokeWidth: 1.8 } as any)}
                </div>
              </div>
              <div className="mt-1 font-bold text-white text-[10px] leading-none" style={{ fontFamily: "Cairo, sans-serif" }}>
                {nodes[i].label}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <AbsoluteFill style={{ background: "#000" }} className="overflow-hidden">
      <MatrixBackground />
      {/* clusters */}
      {renderCluster(centerA, 18, "الهوية أ", clusterAIn)}
      {/* gap emphasize */}
      <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-px h-[280px] bg-gradient-to-b from-transparent via-white/08 to-transparent" style={{ opacity: clusterBIn }} />
      <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[72px] h-[72px] rounded-full border border-dashed border-white/10 flex items-center justify-center" style={{ opacity: clusterBIn }}>
        <span className="font-mono text-[8px] tracking-[0.18em] text-white/25">GAP</span>
      </div>
      {renderCluster(centerB, 62, "الهوية ب", clusterBIn)}

      {/* text under — exact script */}
      <div dir="rtl" className="absolute left-0 right-0 mx-auto text-center px-6" style={{ top: "74%", maxWidth: 900 }}>
        <div className="font-bold leading-[1.5] text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 22, opacity: text1In, transform: `translateY(${interpolate(text1In, [0, 1], [8, 0])}px)` }}>
          بالنسبة للهاكرز المحترفين تلقاهم يستعملو <span className="text-green-400">بيئات isolated</span> أجهزة منفصلة تُشترى نقدًا.
        </div>
        <div className="mt-1 font-bold leading-[1.5]" style={{ fontFamily: "Cairo, sans-serif", fontSize: 22, opacity: text2In, transform: `translateY(${interpolate(text2In, [0, 1], [8, 0])}px)` }}>
          <span className="text-white">شبكات منفصلة لا تتقاطع أبدًا.</span>
          <span className="text-green-400"> لا حساب دخول مشترك،</span>
          <span className="text-white"> أبدًا، تحت أي ظرف</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

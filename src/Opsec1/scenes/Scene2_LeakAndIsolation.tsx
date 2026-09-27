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
          <div key={i} className="absolute text-green-500 font-mono text-xs opacity-20" style={{ left: i * 20, top: y, writingMode: "vertical-rl" as any, textOrientation: "upright" as any }}>
            {Array.from({ length: 20 }).map((_, j) => (random(`opsec2-${i}-${j}`) > 0.5 ? "1" : "0")).join("")}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const Scene2_LeakAndIsolation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) => spring({ frame: frame - d, fps, config: { damping: 18, stiffness: 120 } });

  const isPart2 = frame >= 170;

  // Part 1 — terminal style, match Scene1_Hook
  const lineA = "اكبر خطا في opsec هو تسرب الهوية ,";
  const lineB = "ومكاش لي شرح العزل التقني";
  const speed = 1.9;
  const cA = Math.floor(frame / speed);
  const dA = lineA.slice(0, cA);
  const startB = lineA.length * speed + 14;
  const cB = Math.floor((frame - startB) / speed);
  const dB = cB > 0 ? lineB.slice(0, cB) : "";
  const showB = frame >= startB;
  const cursorOpacity = interpolate(frame % 20, [0, 10, 11, 20], [1, 1, 0, 0]);

  // Part 2 — diagram bigger, fat text, green match first scene
  const diagramIn = s(172);
  const centerIn = s(176);

  const nodes = [
    { Icon: Laptop, label: "الجهاز" },
    { Icon: Wifi, label: "الشبكة" },
    { Icon: CreditCard, label: "الدفع" },
    { Icon: Type, label: "الكتابة" },
    { Icon: Clock, label: "التوقيت" },
  ];
  const center = { x: 540, y: 580 };
  const radius = 300; // bigger and more in middle
  const outerPoints = nodes.map((_, i) => {
    const angle = -90 + i * 72;
    const rad = (angle * Math.PI) / 180;
    return { x: center.x + Math.cos(rad) * radius, y: center.y + Math.sin(rad) * radius, angle };
  });

  return (
    <AbsoluteFill style={{ background: "#000" }} className="overflow-hidden">
      <MatrixBackground />

      {/* PART 1 — text only, no terminal */}
      <div className="absolute inset-0 flex items-center justify-center p-8" style={{ opacity: isPart2 ? interpolate(frame, [170, 188], [1, 0]) : 1 }}>
        <div className="w-full max-w-[860px] text-center" dir="rtl">
          <div className="font-black leading-tight text-white text-[36px]" style={{ fontFamily: "Cairo, sans-serif" }}>
            {dA}
            {!showB && <span style={{ opacity: cursorOpacity }} className="inline-block w-2.5 h-8 bg-green-500 mr-1 align-middle" />}
          </div>
          {showB && (
            <div className="mt-3 font-black leading-tight text-green-400 text-[36px]" style={{ fontFamily: "Cairo, sans-serif" }}>
              {dB}
              <span style={{ opacity: cursorOpacity }} className="inline-block w-2.5 h-8 bg-green-500 mr-1 align-middle" />
            </div>
          )}
        </div>
      </div>

      {/* PART 2 — diagram, bigger, fat, green match first scene */}
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: isPart2 ? diagramIn : 0 }}>
        <div className="flex items-center gap-2 -mt-6" style={{ opacity: diagramIn, transform: `translateY(${interpolate(diagramIn, [0, 1], [8, 0])}px)` }}>
          <span className="font-mono text-[11px] tracking-[0.28em] text-green-500">DIAGRAM</span>
          <span className="w-6 h-px bg-green-500/30" />
          <span className="font-mono text-[10px] tracking-[0.16em] text-green-700">COMPARTMENTALIZATION</span>
        </div>

        <div className="relative w-[1080px] h-[760px] mt-2">
          <svg viewBox="0 0 1080 760" className="absolute inset-0 w-full h-full">
            {outerPoints.map((p, i) => {
              const delay = 188 + i * 20;
              const prog = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const lx = center.x + (p.x - center.x) * prog;
              const ly = center.y + (p.y - center.y) * prog;
              return <line key={i} x1={center.x} y1={center.y} x2={lx} y2={ly} stroke="#22c55e" strokeWidth={3} strokeLinecap="round" opacity={0.55} />;
            })}
            {outerPoints.map((p, i) => {
              const delay = 188 + i * 20 + 22;
              const op = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return <circle key={i} cx={p.x} cy={p.y} r={4} fill="#22c55e" opacity={op} />;
            })}
          </svg>

          <div
            className="absolute flex flex-col items-center justify-center rounded-full bg-white border-4 border-green-500"
            style={{
              left: center.x - 104,
              top: center.y - 104,
              width: 208,
              height: 208,
              opacity: centerIn,
              transform: `scale(${interpolate(centerIn, [0, 1], [0.88, 1])})`,
              boxShadow: "0 0 32px rgba(34,197,94,0.5), 0 14px 40px rgba(0,0,0,0.55)",
            }}
          >
            <span className="font-mono text-[11px] tracking-[0.18em] text-black/40">PERSONA</span>
            <span className="font-black leading-none" style={{ fontFamily: "Cairo, sans-serif", fontSize: 36, color: "#0a0a0a" }}>
              الهوية أ
            </span>
            <span className="mt-1 w-10 h-px bg-green-500/30" />
            <span className="font-mono text-[11px] tracking-[0.16em] text-green-700">CENTRAL</span>
          </div>

          {outerPoints.map((p, i) => {
            const node = nodes[i];
            const delay = 188 + i * 20 + 6;
            const op = s(delay);
            return (
              <div
                key={i}
                className="absolute flex flex-col items-center text-center"
                style={{ left: p.x - 72, top: p.y - 60, width: 144, opacity: op, transform: `translateY(${interpolate(op, [0, 1], [8, 0])}px) scale(${interpolate(op, [0, 1], [0.92, 1])})` }}
              >
                <div className="w-[96px] h-[96px] rounded-[24px] bg-white border-2 border-green-500 flex items-center justify-center shadow-[0_10px_28px_rgba(0,0,0,0.4)]">
                  <node.Icon size={38} color="#0a0a0a" strokeWidth={1.9} />
                </div>
                <div className="mt-2 font-black text-white leading-none" style={{ fontFamily: "Cairo, sans-serif", fontSize: 20 }}>
                  {node.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

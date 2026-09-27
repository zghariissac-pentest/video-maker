import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, random } from "remotion";

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
            {Array.from({ length: 20 }).map((_, j) => (random(`opsec1-m-${i}-${j}`) > 0.5 ? "1" : "0")).join("")}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const Scene1_Hook: React.FC = () => {
  const frame = useCurrentFrame();

  // Hook: العزل التقني (Compartmentalization): المهارة التي يتجاهلها الهاكرز المزيفون
  const line1a = "العزل التقني";
  const line1b = " (Compartmentalization):";
  const line2 = "المهارة التي يتجاهلها الهاكرز المزيفون";

  const speed = 1.9;
  const len1a = line1a.length;
  const len1b = line1b.length;
  const len2 = line2.length;

  const c1a = Math.floor(frame / speed);
  const d1a = line1a.slice(0, c1a);

  const start1b = len1a * speed + 12;
  const c1b = Math.floor((frame - start1b) / speed);
  const d1b = c1b > 0 ? line1b.slice(0, c1b) : "";

  const start2 = (len1a + len1b) * speed + 32;
  const c2 = Math.floor((frame - start2) / speed);
  const d2 = c2 > 0 ? line2.slice(0, c2) : "";

  const show1b = frame >= start1b;
  const show2 = frame >= start2;

  const cursorOpacity = interpolate(frame % 20, [0, 10, 11, 20], [1, 1, 0, 0]);

  return (
    <AbsoluteFill className="bg-black flex items-center justify-center p-8">
      <MatrixBackground />
      <div className="z-10 w-full max-w-4xl">
        <div className="bg-gray-900 border border-green-500 rounded-lg p-8 shadow-[0_0_22px_rgba(34,197,94,0.32)]">
          <div className="flex items-center gap-2 mb-7 border-b border-green-900 pb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 font-mono text-green-700 text-sm">terminal — opsec_hook</span>
            <span className="ml-auto font-mono text-green-900 text-xs">OPSEC_01</span>
          </div>

          <div className="font-mono leading-tight space-y-4" dir="rtl">
            <div className="flex items-start gap-4">
              <span className="text-green-500 text-3xl shrink-0 mt-1">$</span>
              <span className="flex-1 text-right">
                <span className="text-white text-[36px] font-bold" style={{ fontFamily: "Cairo, sans-serif" }}>
                  {d1a}
                </span>
                {show1b && <span className="text-green-400 text-[28px] font-bold"> {d1b}</span>}
                {!show2 && <span style={{ opacity: cursorOpacity }} className="inline-block w-2.5 h-8 bg-green-500 mr-1 align-middle" />}
              </span>
            </div>

            {show2 && (
              <div className="flex items-start gap-4">
                <span className="text-green-500 text-3xl shrink-0 mt-1">$</span>
                <span dir="rtl" className="flex-1 text-right text-white text-[32px] font-bold leading-tight" style={{ fontFamily: "Cairo, sans-serif" }}>
                  {d2}
                  <span style={{ opacity: cursorOpacity }} className="inline-block w-2.5 h-8 bg-green-500 mr-1 align-middle" />
                </span>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-between items-center border-t border-green-900/40 pt-4">
            <span className="font-mono text-[11px] text-green-800 tracking-widest">0x01 — COMPARTMENTALIZATION</span>
            <span className="font-mono text-[11px] text-green-700">{frame < start2 ? "TYPING..." : "HOOK_LOADED"}</span>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-8">
          <div className="flex items-center gap-2 text-green-500 font-mono opacity-50 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>OPSEC</span>
          </div>
          <div className="flex items-center gap-2 text-green-500 font-mono opacity-50 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>COMPARTMENT</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

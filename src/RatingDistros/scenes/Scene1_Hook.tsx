import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

export const Scene1_Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProg = spring({ frame, fps, config: { damping: 18, stiffness: 70, mass: 1.1 } });
  const titleY = interpolate(titleProg, [0, 1], [56, 0]);
  const titleScale = interpolate(titleProg, [0, 1], [0.84, 1]);
  const titleBlur = interpolate(titleProg, [0, 1], [10, 0]);

  const distros = [
    { src: "assets/distros/kalilinux.svg", glow: "rgba(43,110,255,0.7)", delay: 8 },
    { src: "assets/distros/fedora.svg", glow: "rgba(41,110,180,0.7)", delay: 14 },
    { src: "assets/distros/archlinux.svg", glow: "rgba(23,147,209,0.7)", delay: 20 },
    { src: "assets/distros/ubuntu.svg", glow: "rgba(233,84,32,0.7)", delay: 26 },
  ];

  return (
    <AbsoluteFill style={{ background: "#000000" }} className="flex items-center justify-center overflow-hidden">
      <div className="absolute rounded-full pointer-events-none" style={{ width: 800, height: 600, left: "50%", top: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(ellipse at center, rgba(255,255,255,0.045), transparent 72%)" }} />

      <div className="z-10 text-center px-6" style={{ opacity: titleProg, transform: `translateY(${titleY}px) scale(${titleScale})`, filter: `blur(${titleBlur}px)` }}>
        <div dir="rtl" className="font-black leading-[1.02] text-white" style={{ fontFamily: "Tajawal, Cairo, sans-serif", fontSize: 102, fontWeight: 900, letterSpacing: -1.2, textShadow: "0 0 28px rgba(255,255,255,0.14), 0 8px 24px rgba(0,0,0,0.9)" }}>
          تقييم اشهر
          <br />
          توزيعات لينكس
        </div>
        <div dir="rtl" className="mt-1 font-black leading-none" style={{ fontFamily: "Tajawal, Cairo, sans-serif", fontSize: 102, fontWeight: 900, background: "linear-gradient(90deg, #e5e7eb 0%, #a5b4fc 45%, #7a5af5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: -1, filter: "drop-shadow(0 0 14px rgba(122,90,245,0.25))" }}>
          بصراحة
        </div>
        <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ opacity: titleProg }} />
      </div>

      {distros.map((d, i) => {
        const enter = spring({ frame: frame - d.delay, fps, config: { damping: 20, stiffness: 70 } });
        const settled = frame > d.delay + 36;
        const baseRadius = 360;
        const angle = settled ? (frame - (d.delay + 36)) * 0.14 : 0;
        const baseA = i * 90;
        const x = Math.cos(((baseA + angle) * Math.PI) / 180) * baseRadius;
        const y = Math.sin(((baseA + angle) * Math.PI) / 180) * (baseRadius * 0.62);
        const entryX = interpolate(enter, [0, 1], [i % 2 === 0 ? -700 : 700, x]);
        const entryY = interpolate(enter, [0, 1], [i < 2 ? -700 : 700, y]);
        const fx = settled ? x : entryX;
        const fy = settled ? y : entryY;
        const labels = ["KALI", "FEDORA", "ARCH", "UBUNTU"];
        return (
          <div key={i} className="absolute flex flex-col items-center" style={{ left: "50%", top: "50%", transform: `translate(calc(-50% + ${fx}px), calc(-50% + ${fy}px))`, opacity: enter }}>
            <div className="w-[132px] h-[132px] rounded-[22px] bg-white flex items-center justify-center border border-white/10" style={{ boxShadow: `0 0 20px ${d.glow}, 0 10px 26px rgba(0,0,0,0.45)` }}>
              <Img src={staticFile(d.src)} style={{ width: 84, height: 84, objectFit: "contain" }} />
            </div>
            <span className="mt-2 font-mono text-[10px] tracking-[0.16em] text-white/55 bg-black/40 px-2 py-0.5 rounded-full border border-white/10">{labels[i]}</span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

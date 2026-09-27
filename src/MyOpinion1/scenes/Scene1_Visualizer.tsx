import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate } from "remotion";

export const Scene1_Visualizer: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = 180;
  const loopT = (frame % duration) / duration;
  const loopFrame = loopT * duration;
  const avatarSize = 460;
  const ringRadius = 278;
  const barCount = 96;

  return (
    <AbsoluteFill style={{ background: "#08090a" }} className="flex items-center justify-center overflow-hidden">
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, #111315 0%, #07080a 58%, #050607 100%)" }} />
      <div className="absolute rounded-full pointer-events-none" style={{ width: 640, height: 640, left: "50%", top: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(255,255,255,0.04), transparent 72%)" }} />
      <div className="absolute" style={{ width: 0, height: 0, left: "50%", top: "50%" }}>
        <div className="absolute rounded-full" style={{ width: avatarSize + 18, height: avatarSize + 18, left: -(avatarSize + 18) / 2, top: -(avatarSize + 18) / 2, border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 0 28px rgba(255,255,255,0.04)" }} />
        {Array.from({ length: barCount }).map((_, i) => {
          const angle = (i / barCount) * 360;
          const rad = (angle * Math.PI) / 180;
          const w1 = Math.sin((loopFrame * 0.52 + i * 0.55) * 0.32) * 0.5 + 0.5;
          const w2 = Math.sin((loopFrame * 0.31 - i * 0.41) * 0.28) * 0.5 + 0.5;
          const w3 = Math.sin((loopFrame * 0.18 + i * 0.18) * 0.5) * 0.22;
          const amp = interpolate(w1 * 0.58 + w2 * 0.38 + w3, [0, 1], [10, 38]);
          const loopPulse = Math.sin(loopT * Math.PI * 2) * 1.2 + Math.sin(loopT * Math.PI * 4 + i * 0.12) * 0.7;
          const h = Math.max(4, amp + loopPulse);
          const x1 = Math.cos(rad) * ringRadius;
          const y1 = Math.sin(rad) * ringRadius;
          const opacity = 0.5 + (h / 38) * 0.5;
          return (
            <div key={i} className="absolute rounded-full" style={{ left: x1, top: y1, width: 4.2, height: h, background: `rgba(255,255,255,${opacity})`, transformOrigin: "center bottom", transform: `translate(-50%,-50%) rotate(${angle + 90}deg) translateY(${-h / 2}px)`, boxShadow: h > 24 ? "0 0 8px rgba(255,255,255,0.45)" : h > 16 ? "0 0 5px rgba(255,255,255,0.3)" : undefined }} />
          );
        })}
        <div className="absolute rounded-full pointer-events-none" style={{ width: ringRadius * 2 + 52 + Math.sin(loopT * Math.PI * 2) * 4, height: ringRadius * 2 + 52 + Math.sin(loopT * Math.PI * 2) * 4, left: -(ringRadius * 2 + 52) / 2, top: -(ringRadius * 2 + 52) / 2, border: "1px solid rgba(255,255,255,0.06)", opacity: 0.9 }} />
      </div>
      <div className="absolute rounded-full overflow-hidden" style={{ width: avatarSize, height: avatarSize, left: "50%", top: "50%", transform: "translate(-50%,-50%)", border: "3px solid rgba(255,255,255,0.92)", boxShadow: "0 10px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)", background: "white" }}>
        <Img src={staticFile("profile_myopinion1.png")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 18%", display: "block" }} />
      </div>
      <div className="absolute rounded-full pointer-events-none" style={{ width: avatarSize, height: avatarSize, left: "50%", top: "50%", transform: "translate(-50%,-50%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 12px rgba(0,0,0,0.08)" }} />
      <div className="absolute left-1/2 -translate-x-1/2 text-center px-6" style={{ top: "calc(50% + 360px)", width: 900 }}>
        <div dir="rtl" className="font-black leading-tight text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 48, letterSpacing: -0.6, textShadow: "0 2px 18px rgba(0,0,0,0.45)" }}>
          الذكاء الاصطناعي يستبدل الجميع في لامن السيبراني ؟
        </div>
        <div className="mx-auto mt-3 h-px w-16 bg-white/20" />
      </div>
    </AbsoluteFill>
  );
};

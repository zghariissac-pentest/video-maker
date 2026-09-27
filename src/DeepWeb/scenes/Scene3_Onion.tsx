import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { Layers, Lock, Anchor } from "lucide-react";

export const Scene3_Onion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) => spring({ frame: frame - d, fps, config: { damping: 20, stiffness: 90 } });

  const p1 = frame < 140;
  const p2 = frame >= 130 && frame < 260;
  const p3 = frame >= 250;

  const p1Op = interpolate(frame, [0, 20, 120, 140], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p2Op = interpolate(frame, [130, 150, 240, 260], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p3Op = interpolate(frame, [250, 270, 340, 360], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#050508" }} className="overflow-hidden">
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 38%, #141418 0%, #050508 70%)" }} />

      {/* Part 1 — Tor = The Onion Router */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8" style={{ opacity: p1Op }}>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] tracking-[0.28em] text-white/30">NAME</span>
          <span className="w-8 h-px bg-white/10" />
          <span className="font-mono text-[11px] tracking-[0.14em] text-[#7a5af5]">ONION ROUTER</span>
        </div>

        <div className="mt-8 flex items-center gap-6">
          <div className="w-[160px] h-[160px] rounded-[22px] bg-white flex items-center justify-center border border-white/10" style={{ opacity: s(18), transform: `scale(${interpolate(s(18), [0, 1], [0.86, 1])})` }}>
            <Img src={staticFile("tor-icon.svg")} style={{ width: 88, height: 88, objectFit: "contain" }} />
          </div>
          <span className="font-mono text-[22px] text-white/20">=</span>
          <div className="flex flex-col items-center gap-2" style={{ opacity: s(28) }}>
            <div className="w-[160px] h-[160px] rounded-full bg-gradient-to-br from-[#7a5af5] to-[#4a2fb5] flex items-center justify-center border-2 border-white/20" style={{ boxShadow: "0 0 28px rgba(122,90,245,0.35)" }}>
              <Layers size={54} color="white" strokeWidth={1.6} />
            </div>
            <span className="font-mono text-[10px] tracking-[0.14em] text-white/40">ONION</span>
          </div>
        </div>

        <div dir="rtl" className="mt-8 text-center">
          <span className="font-black text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 34 }}>
            <span className="inline-flex items-center gap-2">
              <span className="w-7 h-7 rounded bg-white inline-flex items-center justify-center"><Img src={staticFile("tor-icon.svg")} style={{ width: 16, height: 16 }} /></span>
              tor
            </span>{" "}
            يمثل <span className="text-[#7a5af5]">the onion router</span>
          </span>
        </div>
      </div>

      {/* Part 2 — each layer is encryption — describing packet */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8" style={{ opacity: p2Op }}>
        <div className="relative w-[380px] h-[380px] flex items-center justify-center">
          {[0, 1, 2, 3].map((i) => {
            const prog = s(144 + i * 18);
            const size = 120 + i * 72;
            const isActive = frame >= 168 + i * 18 && frame < 188 + i * 18;
            return (
              <div key={i} className="absolute rounded-full border-2 flex items-center justify-center" style={{ width: size, height: size, opacity: prog, borderColor: isActive ? "#7a5af5" : i === 3 ? "rgba(122,90,245,0.35)" : "rgba(122,90,245,0.22)", background: i === 0 ? "white" : isActive ? "rgba(122,90,245,0.14)" : "transparent", transform: `scale(${interpolate(prog, [0, 1], [0.82, 1])})`, boxShadow: isActive ? "0 0 18px rgba(122,90,245,0.4)" : undefined }}>
                {i === 0 && <Lock size={28} color="#0a0a0a" />}
                {i > 0 && <span className="font-mono text-[10px] tracking-[0.14em]" style={{ color: isActive ? "#7a5af5" : "rgba(122,90,245,0.45)" }}>LAYER {i} • {["AES", "RSA", "TOR"][i - 1]}</span>}
              </div>
            );
          })}
          {/* packet traveling outward */}
          <div
            className="absolute w-3 h-3 rounded-full bg-white border-2 border-[#7a5af5]"
            style={{
              left: 190 + interpolate(frame, [168, 232], [0, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              top: 188,
              opacity: frame >= 168 && frame < 240 ? 1 : 0,
              boxShadow: "0 0 10px rgba(122,90,245,0.9)",
            }}
          />
          <div className="absolute w-[88px] h-[88px] rounded-full bg-white flex items-center justify-center" style={{ opacity: s(180), boxShadow: "0 8px 22px rgba(0,0,0,0.3)" }}>
            <Img src={staticFile("tor-icon.svg")} style={{ width: 48, height: 48 }} />
          </div>
          <div className="absolute -bottom-2 font-mono text-[9px] tracking-[0.16em] text-white/30" style={{ opacity: s(200) }}>
            DATA → ENCRYPTED {interpolate(frame, [168, 232], [1, 3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }).toFixed(0)}×
          </div>
        </div>

        <div dir="rtl" className="mt-2 text-center">
          <span className="font-black text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 32 }}>
            كل طبقة هي <span className="text-[#7a5af5]">طبقة تشفير</span>
          </span>
          <div className="mt-2 flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.14em] text-white/30">
            <Lock size={12} color="#7a5af5" />
            <span>PAYLOAD WRAPPED 3× • EACH HOP DECRYPTS ONE</span>
          </div>
        </div>
      </div>

      {/* Part 3 — built by US Navy — describing timeline */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8" style={{ opacity: p3Op }}>
        <div className="relative w-[720px] h-[200px] flex items-center justify-between px-4">
          <div className="absolute left-[80px] right-[80px] top-1/2 h-px bg-white/10" />
          <div className="absolute left-[80px] top-1/2 h-px bg-[#7a5af5]" style={{ width: `${interpolate(frame, [270, 310], [0, 560], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px`, boxShadow: "0 0 8px rgba(122,90,245,0.5)" }} />
          <div className="flex flex-col items-center gap-2 z-10" style={{ opacity: s(262), transform: `scale(${interpolate(s(262), [0, 1], [0.92, 1])})` }}>
            <div className="w-[110px] h-[110px] rounded-full bg-white border-2 border-black flex flex-col items-center justify-center" style={{ boxShadow: "4px 4px 0 #1a1a1a" }}>
              <Anchor size={30} color="#0a0a0a" strokeWidth={1.7} />
            </div>
            <span className="font-mono text-[10px] tracking-[0.14em] text-white/60">1995</span>
            <span className="font-black text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 14 }}>
              NAVAL RESEARCH LAB
            </span>
            <span className="font-mono text-[8px] text-white/30">ONION ROUTING PAPER</span>
          </div>
          <div className="flex flex-col items-center gap-2 z-10" style={{ opacity: s(274), transform: `scale(${interpolate(s(274), [0, 1], [0.92, 1])})` }}>
            <div className="w-[110px] h-[110px] rounded-full bg-[#7a5af5] border-2 border-white flex flex-col items-center justify-center" style={{ boxShadow: "0 0 22px rgba(122,90,245,0.45)" }}>
              <Img src={staticFile("tor-icon.svg")} style={{ width: 44, height: 44, filter: "brightness(0) invert(1)" }} />
            </div>
            <span className="font-mono text-[10px] tracking-[0.14em] text-white">2006</span>
            <span className="font-black text-white" style={{ fontFamily: "Cairo, sans-serif", fontSize: 14 }}>
              TOR PROJECT
            </span>
            <span className="font-mono text-[8px] text-white/40">PUBLIC RELEASE</span>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#7a5af5] border-2 border-white" style={{ opacity: s(268), boxShadow: "0 0 10px #7a5af5" }} />
        </div>

        <div dir="rtl" className="mt-4 text-center max-w-[820px]">
          <span className="font-bold text-white/80" style={{ fontFamily: "Cairo, sans-serif", fontSize: 24 }}>
            وهي في الاصل كانت مصنوعة من قبل
          </span>
          <span className="font-black text-white ml-2" style={{ fontFamily: "Cairo, sans-serif", fontSize: 30 }}>
            <span className="inline-flex items-center gap-2">
              <Anchor size={20} color="#7a5af5" /> us navy
            </span>
          </span>
          <div className="mt-2 font-mono text-[10px] tracking-[0.14em] text-white/25">RESEARCH → PRIVACY TOOL • NOT DARK WEB INVENTION</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

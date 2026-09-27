import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig, Easing, Sequence } from "remotion";
import { CYBER } from "../profx/Theme";
import { NordScene } from "./scenes/NordScene";
import { ProtonScene } from "./scenes/ProtonScene";
import { ExpressScene } from "./scenes/ExpressScene";
import { SurfSharkScene } from "./scenes/SurfSharkScene";
import { MullvadScene } from "./scenes/MullvadScene";

const LOGOS = [
  { file: "vpn/proton.png", delay: 6 },
  { file: "vpn/express.png", delay: 12 },
  { file: "vpn/mullvad.png", delay: 18 },
  { file: "vpn/surfshark.png", delay: 24 },
  { file: "vpn/nord.png", delay: 30 },
] as const;

const Center: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 18, stiffness: 120 } });
  const scale = interpolate(s, [0, 1], [0.84, 1]);
  const y = interpolate(s, [0, 1], [18, 0]);
  const rot = interpolate(s, [0, 1], [-1.5, 0]);
  // subtle breathing
  const breathe = 1 + Math.sin(frame * 0.04) * 0.015;
  return (
    <div
      style={{
        width: 380,
        height: 380,
        borderRadius: 32,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 28px 70px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 32px rgba(255,255,255,0.06)",
        background: "#08080a",
        opacity: s,
        transform: `translateY(${y}px) rotate(${rot}deg) scale(${scale * breathe})`,
        position: "relative",
      }}
    >
      <Img src={staticFile("vpn/center.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(0,0,0,0.55) 88%)" }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: 32, boxShadow: "inset 0 0 40px rgba(0,0,0,0.35)" }} />
    </div>
  );
};

const OrbitLogo: React.FC<{ file: string; index: number; delay: number }> = ({ file, index, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 160 } });
  const enterScale = interpolate(appear, [0, 1], [0.5, 1]);
  const enterY = interpolate(appear, [0, 1], [28, 0]);

  // WILD circle: bigger radius, bigger logos, see pic in middle
  const baseRadius = 440;
  const speed = 0.42; // wilder, faster orbit
  const offset = (index * 72 * Math.PI) / 180;
  const easedFrame = interpolate(frame, [delay, delay + 70], [0, 70], { easing: Easing.inOut(Easing.ease), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const progressFrame = frame < delay + 70 ? easedFrame : frame - delay - 70 + 70;
  const angle = (progressFrame * speed * Math.PI) / 180 + offset;

  const x = Math.cos(angle) * baseRadius;
  const y = Math.sin(angle) * baseRadius * 0.52; // wilder ellipse

  // depth with stronger punch
  const depth = Math.sin(angle);
  const depthScale = interpolate(depth, [-1, 1], [0.72, 1.22]);
  const depthBlur = interpolate(depth, [-1, 1], [3.5, 0]);
  const depthOpacity = interpolate(depth, [-1, 1], [0.58, 1]);
  const tilt = Math.cos(angle) * 8 - Math.sin(angle) * 3;
  const float = Math.sin((frame + index * 14) * 0.06) * 3.5;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 182,
        height: 182,
        marginLeft: -91,
        marginTop: -91,
        transform: `translate(${x}px, ${y + float}px) translateY(${enterY}px) rotate(${tilt}deg) scale(${enterScale * depthScale})`,
        opacity: appear * depthOpacity,
        filter: depthBlur > 0.6 ? `blur(${depthBlur}px) brightness(1)` : `brightness(1.05) drop-shadow(0 18px 34px rgba(0,0,0,0.62))`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 32,
        background: "rgba(255,255,255,1)",
        border: "1px solid rgba(255,255,255,0.16)",
        boxShadow: `0 0 0 1px rgba(255,255,255,0.10) inset, 0 22px 48px rgba(0,0,0,0.62)`,
        overflow: "hidden",
        padding: 18,
        zIndex: depth > 0 ? 2 : 1,
      }}
    >
      <Img src={staticFile(file)} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: 32, background: "linear-gradient(180deg, rgba(255,255,255,0.20), transparent 38%)", pointerEvents: "none" }} />
    </div>
  );
};

const VpnIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t1 = spring({ frame: frame - 14, fps, config: { damping: 18, stiffness: 160 } });
  const t2 = spring({ frame: frame - 22, fps, config: { damping: 18, stiffness: 160 } });
  return (
    <AbsoluteFill style={{ background: "#000000", overflow: "hidden" }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 82% 72% at 50% 50%, transparent 52%, rgba(0,0,0,0.78) 88%)` }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
        <div style={{ position: "absolute", width: 880, height: 458, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)", opacity: 0.9 }} />
        <div style={{ position: "absolute", width: 880, height: 458, borderRadius: "50%", border: "1px dashed rgba(34,211,238,0.12)", opacity: 0.5 + Math.sin(frame * 0.02) * 0.08 }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
        <Center />
        {LOGOS.map((l, i) => (
          <OrbitLogo key={l.file} file={l.file} index={i} delay={l.delay} />
        ))}
      </AbsoluteFill>
      <AbsoluteFill style={{ top: 1320, height: 160, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
        <div style={{ opacity: t1, transform: `translateY(${interpolate(t1, [0, 1], [14, 0])}px)`, fontFamily: "Cairo, Changa, sans-serif", fontSize: 48, fontWeight: 900, color: CYBER.white, direction: "rtl", textAlign: "center", lineHeight: 1 }}>
          سييت اشهر <span style={{ color: CYBER.cyan }}>vpns</span> واختابرتهم
        </div>
        <div style={{ opacity: t2, transform: `translateY(${interpolate(t2, [0, 1], [12, 0])}px) scale(${interpolate(t2, [0, 1], [0.96, 1])})`, display: "flex", alignItems: "center", gap: 12, background: CYBER.cyan, padding: "14px 28px", borderRadius: 999, boxShadow: `0 0 24px rgba(34,211,238,0.60)` }}>
          <span style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 32, fontWeight: 900, color: "#000", direction: "rtl", lineHeight: 1 }}>هاو ليك افضل خيار ليك</span>
          <span style={{ width: 1.5, height: 22, background: "rgba(0,0,0,0.14)" }} />
          <span style={{ fontSize: 22, color: "#000" }}>→</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Vpn: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000000" }}>
      <Sequence from={0} durationInFrames={180}>
        <VpnIntro />
      </Sequence>
      <Sequence from={180} durationInFrames={180}>
        <NordScene />
      </Sequence>
      <Sequence from={360} durationInFrames={180}>
        <ProtonScene />
      </Sequence>
      <Sequence from={540} durationInFrames={180}>
        <ExpressScene />
      </Sequence>
      <Sequence from={720} durationInFrames={180}>
        <SurfSharkScene />
      </Sequence>
      <Sequence from={900} durationInFrames={180}>
        <MullvadScene />
      </Sequence>
    </AbsoluteFill>
  );
};

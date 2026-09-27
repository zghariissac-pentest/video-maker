import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CYBER } from "./Theme";

// ---------------------------------------------------------------------------
// Cut/transition toolkit. Each is an overlay intended to live inside its own
// <Sequence from={CUT} durationInFrames={N}> so you can fire it exactly at a
// beat. Deterministic (no jitter frame-to-frame beyond Remotion's seeded rand).
// ---------------------------------------------------------------------------

// Classic glitch burst: RGB channel split + sliced bars + white flash.
export const GlitchBurst: React.FC<{
  intensity?: number;
  slices?: number;
}> = ({ intensity = 1, slices = 5 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames: d, width, height } = useVideoConfig();

  // Envelope: ramp in fast, plateau, crash out.
  const env = interpolate(
    frame,
    [0, d * 0.3, d * 0.65, d],
    [0, intensity, intensity * 0.8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) },
  );
  const jitter = interpolate(env, [0, intensity], [0, 24]) * (random(Math.floor(frame / 2)) - 0.5) * 4;

  const bars = Array.from({ length: slices }).map((_, i) => {
    const y = random(i) * height;
    const h = 4 + random(i + 9) * 18;
    const off = jitter * (random(i + 30) - 0.5) * 2;
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: -40,
          width: width + 80,
          height: h,
          top: y,
          transform: `translateX(${off}px)`,
          background:
            i % 2 === 0
              ? `rgba(34,211,238,${env * 0.5})`
              : `rgba(232,121,249,${env * 0.5})`,
          mixBlendMode: "screen",
        }}
      />
    );
  });

  const flash = interpolate(frame, [d * 0.55, d * 0.75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const off = interpolate(env, [0, intensity], [0, 10]);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* RGB split of a grayscale copy is expensive; approximate with tinted bars */}
      <AbsoluteFill
        style={{
          background: `rgba(34,211,238,${env * 0.18})`,
          transform: `translateX(${jitter}px)`,
          mixBlendMode: "screen",
        }}
      />
      <AbsoluteFill
        style={{
          background: `rgba(232,121,249,${env * 0.14})`,
          transform: `translateX(${-jitter}px)`,
          mixBlendMode: "screen",
        }}
      />
      {bars}
      <AbsoluteFill style={{ background: `rgba(255,255,255,${flash * 0.9})` }} />
      <AbsoluteFill
        style={{
          boxShadow: `inset 0 0 ${off * 4}px rgba(0,220,255,${env})`,
          border: `${1 + off}px solid rgba(34,211,238,${env * 0.4})`,
        }}
      />
    </AbsoluteFill>
  );
};

// Fullscreen analogue static that fades in/out — for "intercepting" cuts.
export const StaticBurst: React.FC<{ grain?: number }> = ({ grain = 0.8 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames: d } = useVideoConfig();
  const op = interpolate(
    frame,
    [0, d * 0.18, d * 0.75, d],
    [0, grain, grain * 0.5, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const seed = Math.floor(frame);

  return (
    <AbsoluteFill style={{ opacity: op, pointerEvents: "none" }}>
      <svg width="100%" height="100%">
        <filter id="static-jsr">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9 0.6"
            numOctaves={2}
            seed={seed}
          />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 1  0 0 0 0 0  0 0 0 0.9 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#static-jsr)" />
      </svg>
    </AbsoluteFill>
  );
};

// Wrap a new clip: starts big, blurred and dark, settles into place — a punch.
export const ZoomPunch: React.FC<{
  children: React.ReactNode;
  from?: number;
  to?: number;
}> = ({ children, from = 1.3, to = 1 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames: d } = useVideoConfig();
  const p = interpolate(frame, [0, d * 0.7], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const scale = interpolate(p, [0, 1], [from, to]);
  const blur = interpolate(p, [0, 0.5], [16, 0]);
  const dark = interpolate(p, [0, 0.6], [0.75, 0]);
  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale})`,
        filter: `blur(${blur}px)`,
      }}
    >
      {children}
      <AbsoluteFill
        style={{ background: `rgba(0,0,0,${dark})`, pointerEvents: "none" }}
      />
    </AbsoluteFill>
  );
};

// A thin scanning pane wipes vertically to reveal the frame beneath.
export const ScanWipe: React.FC<{
  children: React.ReactNode;
  accent?: string;
}> = ({ children, accent = CYBER.cyan }) => {
  const frame = useCurrentFrame();
  const { height, durationInFrames: d } = useVideoConfig();
  const p = interpolate(frame, [0, d], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const top = p * height;
  return (
    <AbsoluteFill>
      {children}
      {/* still-covered upper region (as a mask) */}
      <AbsoluteFill style={{ clipPath: `inset(0 0 ${(1 - p) * 100}% 0)` }}>
        <AbsoluteFill style={{ background: "rgba(3,8,14,0.98)" }} />
      </AbsoluteFill>
      {/* bright sweep line */}
      <div
        style={{
          position: "absolute",
          top: top,
          left: 0,
          width: "100%",
          height: 3,
          background: accent,
          boxShadow: `0 0 24px ${accent}`,
        }}
      />
    </AbsoluteFill>
  );
};

// Rolling noise + tint used to "interrupt" then recover into the next shot.
export const DigitalInterference: React.FC<{ tint?: string }> = ({ tint = CYBER.cyan }) => {
  const frame = useCurrentFrame();
  const { durationInFrames: d, width } = useVideoConfig();
  const o = interpolate(
    frame,
    [0, d * 0.2, d * 0.6, d],
    [0.9, 0.35, 0.5, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const rows = 12;
  return (
    <AbsoluteFill style={{ opacity: o, pointerEvents: "none" }}>
      {Array.from({ length: rows }).map((_, i) => {
        const tintline = tint + "55";
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              width,
              height: 100 / rows + "%",
              top: (i / rows) * 100 + "%",
              opacity: 0.5 + Math.abs(0.5 - random(frame + i)) * 0.5,
              background:
                i % 3 === 0
                  ? `repeating-linear-gradient(90deg, ${tintline}, transparent 30px)`
                  : "transparent",
            }}
          />
        );
      })}
      <AbsoluteFill style={{ background: `${tint}18`, mixBlendMode: "overlay" }} />
    </AbsoluteFill>
  );
};
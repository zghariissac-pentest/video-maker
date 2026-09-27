import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CYBER } from "./Theme";

// ---------------------------------------------------------------------------
// ProFX — a single wrapper that turns any composition into a graded, filmic,
// camera-aware shot. No edits to the scenes needed; just wrap them.
//
//   <ProFX shake letterbox glitchAt={[90, 300]}>
//     <MyScene />
//   </ProFX>
// ---------------------------------------------------------------------------

export type ProFXProps = {
  children: React.ReactNode;
  grain?: number; // 0..1 film grain opacity
  vignette?: number; // 0..1 vignette strength
  scanlines?: number; // 0..1 CRT scanlines
  letterbox?: boolean; // cinematic 2.35:1 bars
  shake?: number; // 0..1 handheld shake amplitude
  glitchAt?: number[]; // frame numbers to fire an RGB glitch burst
  lightLeak?: boolean; // drifting corner light
  accent?: string;
};

export const ProFX: React.FC<ProFXProps> = ({
  children,
  grain = 0.22,
  vignette = 0.9,
  scanlines = 0.16,
  letterbox = false,
  shake = 0.4,
  glitchAt = [],
  lightLeak = true,
  accent = CYBER.cyan,
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames: d, fps } = useVideoConfig();

  // ---- Camera shake (handheld drift, peaks on "cuts") ----
  const shakeAmt = interpolate(frame, [0, d], [shake, shake * 0.4], {
    extrapolateRight: "clamp",
  }) * 0.6;
  const tx = (Math.sin(frame * 0.37) * Math.sin(frame * 0.11)) * shakeAmt * 22;
  const ty = (Math.cos(frame * 0.29) * Math.sin(frame * 0.17)) * shakeAmt * 16;
  const rot = Math.sin(frame * 0.21) * shakeAmt * 1.6;

  // ---- RGB glitch burst detection ----
  let glitch = 0;
  for (const at of glitchAt) {
    const rel = frame - at;
    if (rel >= 0 && rel < 14) {
      const p = interpolate(rel, [0, 8, 14], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      glitch = Math.max(glitch, p);
    }
  }
  const glitchIntensity = glitch;
  const splitX = glitchIntensity * 14;
  const slices = glitchIntensity > 0 ? Math.floor(glitchIntensity * 6) : 0;

  // grain uses a shifting SVG noise plane
  const gShift = Math.floor(frame * 1.3);

  // drifting light-leak hue by time
  const leakHue = (frame / fps) % 3;

  return (
    <AbsoluteFill>
      {/* Scene (with handheld + glitch offsets) */}
      <AbsoluteFill
        style={{
          transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg)`,
          filter:
            glitchIntensity > 0
              ? `hue-rotate(${glitchIntensity * 24}deg) saturate(${1 + glitchIntensity})`
              : undefined,
        }}
      >
        {children}
      </AbsoluteFill>

      {/* RGB split on glitch bursts */}
      {glitchIntensity > 0 && (
        <>
          <AbsoluteFill
            style={{
              background: accent,
              mixBlendMode: "screen",
              opacity: glitchIntensity * 0.25,
              transform: `translateX(${splitX}px)`,
              pointerEvents: "none",
            }}
          />
          <AbsoluteFill
            style={{
              background: CYBER.magenta,
              mixBlendMode: "screen",
              opacity: glitchIntensity * 0.25,
              transform: `translateX(${-splitX}px)`,
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* glitch slices */}
      {glitchIntensity > 0 && slices > 0 && (
        <AbsoluteFill style={{ pointerEvents: "none" }}>
          {Array.from({ length: slices }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: (i * 8 + (i % 5) * 6) % height,
                left: 0,
                width,
                height: 3 + i * 2,
                background: i % 2 ? `${accent}88` : `${CYBER.magenta}88`,
                mixBlendMode: "screen",
                transform: `translateX(${(i % 2 === 0 ? 1 : -1) * splitX * 2}px)`,
              }}
            />
          ))}
        </AbsoluteFill>
      )}

      {/* scanlines */}
      {scanlines > 0 && (
        <AbsoluteFill
          style={{
            opacity: scanlines,
            background:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 1px, transparent 2px, transparent 4px)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* vignette */}
      {vignette > 0 && (
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse at center, transparent 48%, rgba(0,0,0,${vignette}) 100%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* light leak */}
      {lightLeak && (
        <AbsoluteFill
          style={{
            background: `conic-gradient(from ${leakHue * 360}deg at 0% 0%, transparent 40%, ${accent}${Math.round(18)} 60%, transparent 90%)`,
            mixBlendMode: "screen",
            opacity: 0.5 + Math.sin(frame * 0.08) * 0.3,
            pointerEvents: "none",
          }}
        />
      )}

      {/* film grain */}
      {grain > 0 && (
        <AbsoluteFill style={{ opacity: grain, pointerEvents: "none" }}>
          <svg width={width} height={height}>
            <filter id="profx-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.78 0.92" numOctaves={2} seed={gShift} />
            </filter>
            <rect width="100%" height="100%" filter="url(#profx-grain)" opacity={0.35} />
          </svg>
        </AbsoluteFill>
      )}

      {/* letterbox bars */}
      {letterbox && (
        <>
          <AbsoluteFill style={{ height: "10%", top: 0, background: "#000", pointerEvents: "none" }} />
          <AbsoluteFill style={{ height: "10%", bottom: 0, background: "#000", pointerEvents: "none" }} />
        </>
      )}
    </AbsoluteFill>
  );
};
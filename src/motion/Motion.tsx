import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { SPRINGS, EASE } from "./presets";

export const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; duration?: number; y?: number; blur?: number }> = ({ children, delay = 0, duration = 18, y = 16, blur = 8 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: SPRINGS.snappy });
  const p = interpolate(frame, [delay, delay + duration], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.bezSnappy });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const translateY = interpolate(p, [0, 1], [y, 0]);
  const blurPx = interpolate(p, [0, 1], [blur, 0]);
  return <div style={{ opacity, transform: `translateY(${translateY}px)`, filter: blurPx > 0.1 ? `blur(${blurPx}px)` : undefined }}>{children}</div>;
};

export const SlideIn: React.FC<{ children: React.ReactNode; delay?: number; from?: "left" | "right" | "top" | "bottom"; distance?: number }> = ({ children, delay = 0, from = "bottom", distance = 60 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: SPRINGS.snappy });
  const y = from === "bottom" ? interpolate(s, [0, 1], [distance, 0]) : from === "top" ? interpolate(s, [0, 1], [-distance, 0]) : 0;
  const x = from === "right" ? interpolate(s, [0, 1], [distance, 0]) : from === "left" ? interpolate(s, [0, 1], [-distance, 0]) : 0;
  return <div style={{ opacity: s, transform: `translate(${x}px, ${y}px)` }}>{children}</div>;
};

export const ScaleIn: React.FC<{ children: React.ReactNode; delay?: number; from?: number; preset?: keyof typeof SPRINGS }> = ({ children, delay = 0, from = 0.72, preset = "bouncy" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: SPRINGS[preset] });
  const scale = interpolate(s, [0, 1], [from, 1]);
  return <div style={{ opacity: s, transform: `scale(${scale})` }}>{children}</div>;
};

export const Stagger: React.FC<{ children: React.ReactNode; baseDelay?: number; stagger?: number; y?: number }> = ({ children, baseDelay = 0, stagger = 7, y = 18 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      {React.Children.map(children, (child, i) => {
        const s = spring({ frame: frame - baseDelay - i * stagger, fps, config: SPRINGS.snappy });
        const ty = interpolate(s, [0, 1], [y, 0]);
        const op = interpolate(s, [0, 0.5], [0, 1]);
        const blur = interpolate(s, [0, 1], [12, 0]);
        return <div key={i} style={{ opacity: op, transform: `translateY(${ty}px)`, filter: blur > 0.5 ? `blur(${blur}px)` : undefined }}>{child}</div>;
      })}
    </>
  );
};

export const BlurIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: SPRINGS.gentle });
  const blur = interpolate(s, [0, 1], [20, 0]);
  const op = interpolate(s, [0, 1], [0, 1]);
  return <div style={{ opacity: op, filter: `blur(${blur}px)` }}>{children}</div>;
};

export const KenBurns: React.FC<{ children: React.ReactNode; scaleFrom?: number; scaleTo?: number }> = ({ children, scaleFrom = 1, scaleTo = 1.08 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = interpolate(frame, [0, durationInFrames], [0, 1], { easing: EASE.glide });
  const scale = interpolate(p, [0, 1], [scaleFrom, scaleTo]);
  const x = interpolate(p, [0, 1], [-1, 1]) * 8;
  return <div style={{ transform: `scale(${scale}) translateX(${x}px)`, width: "100%", height: "100%" }}>{children}</div>;
};

export const Shimmer: React.FC<{ children: React.ReactNode; accent?: string }> = ({ children, accent = "rgba(255,255,255,0.18)" }) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame % 90, [0, 90], [-80, 180], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {children}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(100deg, transparent 30%, ${accent} 50%, transparent 70%)`, transform: `translateX(${x}%)`, pointerEvents: "none" }} />
    </div>
  );
};

export const SequenceFade: React.FC<{ children: React.ReactNode; holdFrom?: number; fadeDuration?: number }> = ({ children, holdFrom = 0, fadeDuration = 14 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [holdFrom, holdFrom + fadeDuration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

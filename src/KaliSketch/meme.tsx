import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Sticker look: thick white outline + hard offset shadow, no blur
export const STICKER: React.CSSProperties = {
  filter:
    "drop-shadow(3px 0 0 #fff) drop-shadow(-3px 0 0 #fff) drop-shadow(0 3px 0 #fff) drop-shadow(0 -3px 0 #fff) drop-shadow(7px 7px 0 rgba(255,255,255,0.12))",
};

export const CAPTION: React.CSSProperties = {
  fontFamily: "Impact, 'Arial Black', sans-serif",
  fontWeight: 900,
  color: "#fff",
  textShadow:
    "3px 3px 0 #000, -3px 3px 0 #000, 3px -3px 0 #000, -3px -3px 0 #000, 0 6px 0 #000",
  letterSpacing: 0.5,
};

export const MemeCaption: React.FC<{
  delay: number;
  children: React.ReactNode;
  fontSize?: number;
  rotate?: number;
  color?: string;
}> = ({ delay, children, fontSize = 44, rotate = -2, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 160 },
  });
  return (
    <div
      dir="rtl"
      className="text-center"
      style={{
        ...CAPTION,
        fontSize,
        color: color ?? "#fff",
        opacity: p,
        transform: `rotate(${rotate}deg) scale(${interpolate(p, [0, 1], [1.5, 1])})`,
      }}
    >
      {children}
    </div>
  );
};

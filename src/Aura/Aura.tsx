import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

// Aura — black simple background, original pic never edited
// First scene: "راك مريح معا صحابك" + picture in middle (original, no filters/crop edits)

export const Aura: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);

  const words = ["راك", "مريح", "معا", "صحابك"];

  const cardIn = spring({ frame, fps, config: { damping: 18, stiffness: 120 } });
  const cardY = interpolate(cardIn, [0, 1], [28, 0]);
  const cardScale = interpolate(cardIn, [0, 1], [0.92, 1]);

  return (
    <AbsoluteFill
      style={{
        background: "#000000",
        overflow: "hidden",
        fontFamily: "Cairo, Changa, sans-serif",
      }}
    >
      {/* === CONTENT — centered column === */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "0 36px",
          gap: 36,
        }}
      >
        {/* Text - on top */}
        <div
          dir="rtl"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "0.22em",
              direction: "rtl",
              justifyContent: "center",
              alignItems: "baseline",
              flexWrap: "wrap",
              lineHeight: 1,
            }}
          >
            {words.map((w, i) => {
              const s = spring({ frame: frame - 6 - i * 4, fps, config: { damping: 14, stiffness: 160 } });
              const y = interpolate(s, [0, 1], [22, 0]);
              return (
                <span
                  key={w + i}
                  style={{
                    fontFamily: "Cairo, Changa, sans-serif",
                    fontSize: 68,
                    fontWeight: 900,
                    color: "white",
                    opacity: s,
                    transform: `translateY(${y}px)`,
                    display: "inline-block",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {w}
                </span>
              );
            })}
          </div>
        </div>

        {/* Image — original, never edited — no crop, no filter, no zoom */}
        <div
          style={{
            opacity: cardIn,
            transform: `translateY(${cardY}px) scale(${cardScale})`,
            willChange: "transform, opacity",
            width: 920,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Img
            src={staticFile("aura-group.jpg")}
            style={{
              width: 920,
              height: "auto",
              maxHeight: 1100,
              objectFit: "contain",
              display: "block",
            }}
          />
          {/* Fallback hint if image missing — shows behind Img if Img fails */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#111",
              border: "1px dashed #333",
              borderRadius: 12,
              zIndex: -1,
              flexDirection: "column",
              gap: 8,
              padding: 20,
              textAlign: "center",
            }}
          >
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#facc15", fontWeight: 700 }}>
              Missing public/aura-group.jpg
            </span>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#888" }}>
              Upload at http://127.0.0.1:8000 or run scripts/push-image.sh
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Fbi: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);

  // Image enter: spring pop, keeps quality - no stretch (pre-warmed so frame 0 is visible)
  const imgProgress = spring({
    frame: frame + 12,
    fps,
    config: { damping: 16, stiffness: 130 },
  });
  const imgScale = interpolate(imgProgress, [0, 1], [0.86, 1]);
  const imgOpacity = interpolate(imgProgress, [0, 1], [0.4, 1]);
  const imgY = interpolate(imgProgress, [0, 1], [18, 0]);

  // Text under it: simple clean fade + slide up (visible by frame 10)
  const textIn = interpolate(frame, [6, 22], [0, 1], {
    easing: SMOOTH,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(textIn, [0, 1], [14, 0]);

  // Very subtle late vignette fade, no distracting effects — pure black as requested
  const caption = "بدلت ip ملا؟";

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Center column: image mid-size in middle + clean text under */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "0 48px",
        }}
      >
        {/* Image — mid size, keep quality, centered like previous videos */}
        <div
          style={{
            opacity: imgOpacity,
            transform: `translateY(${imgY}px) scale(${imgScale})`,
            willChange: "transform, opacity",
            // keep quality: drop shadow only, no blur, no filter that harms sharpness
            filter:
              "drop-shadow(0 18px 42px rgba(0,0,0,0.65)) drop-shadow(0 0 18px rgba(255,255,255,0.04))",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("fbi.jpg")}
            style={{
              width: 640,
              height: 480,
              objectFit: "contain",
              display: "block"
            }} />
        </div>

        {/* Text under image — simple clean style */}
        <div
          dir="rtl"
          style={{
            marginTop: 34,
            textAlign: "center",
            opacity: textIn,
            transform: `translateY(${textY}px)`,
            willChange: "transform, opacity",
          }}
        >
          <div
            style={{
              fontFamily: "Cairo, Changa, sans-serif",
              fontWeight: 800,
              fontSize: 56,
              color: "white",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              textShadow: "0 2px 18px rgba(0,0,0,0.55)",
              whiteSpace: "nowrap",
            }}
          >
            {caption}
          </div>
          {/* thin subtle divider — optional clean touch, matches simple style */}
          <div
            style={{
              marginTop: 14,
              width: 84,
              height: 2,
              background: "rgba(255,255,255,0.14)",
              borderRadius: 999,
              marginLeft: "auto",
              marginRight: "auto",
              opacity: textIn,
              transform: `scaleX(${textIn})`,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

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

export const Ai: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);

  // Usual style: same as Fbi - smooth spring, fixed (no breathing)
  const imgProgress = spring({
    frame: frame + 12,
    fps,
    config: { damping: 16, stiffness: 130 },
  });
  const imgScale = interpolate(imgProgress, [0, 1], [0.86, 1]);
  const imgOpacity = interpolate(imgProgress, [0, 1], [0.4, 1]);
  const imgY = interpolate(imgProgress, [0, 1], [18, 0]);

  // Text under pic - same timing as usual videos (visible by frame 10)
  const textIn = interpolate(frame, [6, 22], [0, 1], {
    easing: SMOOTH,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(textIn, [0, 1], [14, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Center column: image mid-size in middle + clean text under - usual style */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "0 48px",
        }}
      >
        {/* Image — smoothly appears, fixed (no scale breathing), keep quality */}
        <div
          style={{
            opacity: imgOpacity,
            transform: `translateY(${imgY}px) scale(${imgScale})`,
            willChange: "transform, opacity",
            filter:
              "drop-shadow(0 18px 42px rgba(0,0,0,0.65)) drop-shadow(0 0 18px rgba(255,255,255,0.04))",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("pon.jpg")}
            style={{
              width: 620,
              height: 780,
              objectFit: "contain",
              display: "block",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
        </div>

        {/* Text under image — usual clean style, rtl, two lines */}
        <div
          dir="rtl"
          style={{
            marginTop: 34,
            textAlign: "center",
            opacity: textIn,
            transform: `translateY(${textY}px)`,
            willChange: "transform, opacity",
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontFamily: "Cairo, Changa, sans-serif",
              fontWeight: 800,
              fontSize: 52,
              color: "white",
              letterSpacing: "-0.02em",
              lineHeight: 1.35,
              textShadow: "0 2px 18px rgba(0,0,0,0.55)",
            }}
          >
            <span style={{ color: "#FF3B2F" }}>90%</span>{" "}
            <span>من الهاكرز لي تتعلم منهم</span>
            <br />
            <span>ميكتبوش مامبا سكريبت تاعهم وحدهم</span>
          </div>
          {/* thin subtle divider — matches usual style */}
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

export const AI_DURATION = 150;
export const AI_FPS = 30;
export const AI_WIDTH = 1080;
export const AI_HEIGHT = 1920;

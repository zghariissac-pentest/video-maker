import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fitText, fillTextBox } from "@remotion/layout-utils";
import { Trail } from "@remotion/motion-blur";
import { CYBER, FONT } from "../profx/Theme";

// Layout + MotionBlur showcase — responsive text boxes & trailing blur
// https://www.remotion.dev/docs/layout-utils  https://www.remotion.dev/docs/motion-blur

export const LayoutKit: React.FC = () => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, 60], [0, 90], { extrapolateRight: "clamp" });

  // Fit text into a constrained box (like TikTok auto-sizing)
  const { fontSize } = fitText({
    text: "RESPONSIVE TYPE THAT NEVER OVERFLOWS",
    withinWidth: 900,
    fontFamily: FONT.display,
    fontWeight: 900,
  });

  // Fill box demo — returns a helper to track overflow
  const boxHelper = fillTextBox({ maxBoxWidth: 900, maxLines: 3 });

  return (
    <AbsoluteFill style={{ background: CYBER.bg0, padding: 48, display: "flex", flexDirection: "column", gap: 28, justifyContent: "center" }}>
      <div style={{ fontFamily: FONT.mono, fontSize: 14, letterSpacing: "0.2em", color: CYBER.cyan }}>LAYOUT-UTILS · MOTION-BLUR</div>

      {/* fitText demo */}
      <div
        style={{
          width: 900,
          height: 160,
          border: `2px dashed ${CYBER.cyan}55`,
          borderRadius: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(34,211,238,0.06)",
          padding: 12,
        }}
      >
        <div style={{ fontFamily: FONT.display, fontSize, fontWeight: 900, color: CYBER.white, textAlign: "center", lineHeight: 0.95 }}>
          RESPONSIVE TYPE THAT NEVER OVERFLOWS
        </div>
      </div>

      {/* Trail / motion blur demo */}
      <div style={{ height: 110, position: "relative", background: "rgba(255,255,255,0.04)", borderRadius: 16, overflow: "hidden", border: `1px solid rgba(255,255,255,0.08)` }}>
        <Trail layers={7} lagInFrames={1.2} trailOpacity={0.14}>
          <div
            style={{
              position: "absolute",
              top: 24,
              left: x * 8,
              width: 140,
              height: 60,
              borderRadius: 999,
              background: `linear-gradient(90deg, ${CYBER.magenta}, ${CYBER.cyan})`,
              boxShadow: `0 0 20px ${CYBER.magenta}88`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT.mono,
              fontWeight: 800,
              color: "white",
            }}
          >
            TRAIL →
          </div>
        </Trail>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", paddingLeft: 18, fontFamily: FONT.mono, fontSize: 13, color: CYBER.muted }}>
          &lt;Trail layers=7&gt; · hardware motion blur
        </div>
      </div>

      <div style={{ fontFamily: FONT.mono, fontSize: 15, color: CYBER.muted }}>
        fontSize {fontSize.toFixed(0)}px · <span style={{ color: CYBER.cyan }}>fitText()</span> + <span style={{ color: CYBER.magenta }}>fillTextBox()</span> prevent overflow on any device. Helper ready: {typeof boxHelper.add === "function" ? "ok" : "—"}
      </div>
    </AbsoluteFill>
  );
};

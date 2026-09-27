import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Circle, Rect, Star, Polygon } from "@remotion/shapes";
import { makeTriangle } from "@remotion/shapes";
import { evolvePath } from "@remotion/paths";
import { noise2D } from "@remotion/noise";
import { CYBER, FONT } from "../profx/Theme";

// Shapes + Paths + Noise template showcase
// https://www.remotion.dev/docs/shapes  https://www.remotion.dev/docs/paths  https://www.remotion.dev/docs/noise

export const ShapesKit: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 90], [0, 1], { extrapolateRight: "clamp" });

  // Morph demo: evolve a triangle path
  const triPath = makeTriangle({ length: 220, direction: "up" });
  const evolved = evolvePath(progress, triPath.path);

  // Noise-driven blobs
  const n = noise2D("seed", frame / 50, 0) * 12;

  return (
    <AbsoluteFill style={{ background: CYBER.bg0, justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column", gap: 28, padding: 40 }}>
      <div style={{ fontFamily: FONT.mono, fontSize: 14, letterSpacing: "0.2em", color: CYBER.amber }}>SHAPES · PATHS · NOISE</div>

      <div style={{ display: "flex", gap: 28, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
        {/* Circle */}
        <div style={{ width: 160, height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Circle radius={70} fill={CYBER.cyan} opacity={0.95} style={{ filter: `drop-shadow(0 0 16px ${CYBER.cyan})` }} />
        </div>
        {/* Rect */}
        <Rect width={150} height={110} fill="transparent" stroke={CYBER.magenta} strokeWidth={4} cornerRadius={18} style={{ filter: `drop-shadow(0 0 10px ${CYBER.magenta})` }} />
        {/* Triangle morph — uses evolvePath for stroke draw-on */}
        <svg width={220} height={220} viewBox="-120 -120 240 240" style={{ overflow: "visible" }}>
          <path
            d={triPath.path}
            fill="transparent"
            stroke={CYBER.green}
            strokeWidth={4}
            strokeDasharray={evolved.strokeDasharray}
            strokeDashoffset={evolved.strokeDashoffset}
            style={{ filter: `drop-shadow(0 0 10px ${CYBER.green})` }}
          />
        </svg>
        {/* Star with noise pulse */}
        <div style={{ transform: `scale(${0.96 + n * 0.012}) rotate(${frame * 0.35}deg)` }}>
          <Star points={5} innerRadius={42} outerRadius={78} fill={CYBER.amber} stroke={CYBER.white} strokeWidth={2} />
        </div>
        {/* Polygon (hex) */}
        <Polygon points={6} radius={72} fill="rgba(255,255,255,0.08)" stroke={CYBER.white} strokeWidth={2} />
      </div>

      <div style={{ display: "flex", gap: 24, marginTop: 8 }}>
        <code style={{ fontFamily: FONT.mono, fontSize: 16, color: CYBER.muted, background: "rgba(255,255,255,0.06)", padding: "8px 14px", borderRadius: 10 }}>
          makeTriangle() · evolvePath({progress.toFixed(2)})
        </code>
        <code style={{ fontFamily: FONT.mono, fontSize: 16, color: CYBER.muted, background: "rgba(255,255,255,0.06)", padding: "8px 14px", borderRadius: 10 }}>
          noise2D(): {n.toFixed(2)}
        </code>
      </div>

      <div style={{ fontFamily: FONT.mono, fontSize: 16, color: CYBER.dim, maxWidth: 760, textAlign: "center", lineHeight: 1.5 }}>
        Deterministic shapes + path morphing + noise = generative motion graphics. Swap in <b style={{ color: CYBER.cyan }}>makeCircle / makeStar / makeRect</b>,
        <b style={{ color: CYBER.magenta }}> evolvePath</b> and <b style={{ color: CYBER.green }}>noise2D/3D</b> anywhere.
      </div>
    </AbsoluteFill>
  );
};

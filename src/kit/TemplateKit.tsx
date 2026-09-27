import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { AudiogramKit } from "./AudiogramKit";
import { CaptionsKit } from "./CaptionsKit";
import { TransitionsKit } from "./TransitionsKit";
import { ShapesKit } from "./ShapesKit";
import { LayoutKit } from "./LayoutKit";
import { MediaKit } from "./MediaKit";
import { CYBER, FONT } from "../profx/Theme";
import { ProFX } from "../profx/ProFX";

// Master showcase — stitches all remotion-template-inspired kits into one 30s reel.
// Add as a Composition in Root.tsx: <Composition id="TemplateKit" component={TemplateKit} ... />
// Each kit mirrors a free template from https://www.remotion.dev/templates



export const TemplateKit: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: CYBER.bg0 }}>
      <ProFX grain={0.14} vignette={0.6} scanlines={0.06}>
        {/* 0-90: Transitions (TransitionSeries handles its own timing) */}
        <Sequence from={-10} durationInFrames={400} name="Transitions">
          <TransitionsKit />
        </Sequence>

        {/* 450-750: Shapes + Paths + Noise */}
        <Sequence from={420} durationInFrames={180} name="Shapes">
          <ShapesKit />
        </Sequence>

        {/* 650-950: Audiogram */}
        <Sequence from={620} durationInFrames={180} name="Audiogram">
          <AudiogramKit />
        </Sequence>

        {/* 850-1150: TikTok Captions */}
        <Sequence from={820} durationInFrames={150} name="Captions">
          <CaptionsKit />
        </Sequence>

        {/* 1000-1300: Layout + MotionBlur */}
        <Sequence from={990} durationInFrames={180} name="Layout">
          <LayoutKit />
        </Sequence>

        {/* 1200-1500: Media (Gif/Lottie/Video) */}
        <Sequence from={1190} durationInFrames={180} name="Media">
          <MediaKit />
        </Sequence>

        {/* Outro */}
        <Sequence from={1380} durationInFrames={120} name="Outro">
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column", gap: 18, background: `radial-gradient(900px 600px at 50% 0%, ${CYBER.cyan}18, transparent)` }}>
            <div style={{ fontFamily: FONT.mono, fontSize: 16, letterSpacing: "0.22em", color: CYBER.cyan }}>REMOTION TEMPLATES · INTEGRATED</div>
            <div style={{ fontFamily: FONT.display, fontSize: 68, fontWeight: 900, color: CYBER.white, textAlign: "center", lineHeight: 1 }}>
              build anything<br />
              <span style={{ color: CYBER.magenta }}>ship everywhere</span>
            </div>
            <div style={{ fontFamily: FONT.mono, fontSize: 16, color: CYBER.muted, textAlign: "center", maxWidth: 720, lineHeight: 1.6 }}>
              Captions · Transitions · Audiogram · Shapes · Paths · Noise · Layout · MotionBlur · Gif · Lottie · Player
              <br />
              docs: remotion.dev/templates
            </div>
          </AbsoluteFill>
        </Sequence>
      </ProFX>
    </AbsoluteFill>
  );
};

export const TEMPLATEKIT_DURATION = 1500;
export const TEMPLATEKIT_FPS = 30;
export const TEMPLATEKIT_WIDTH = 1080;
export const TEMPLATEKIT_HEIGHT = 1920;

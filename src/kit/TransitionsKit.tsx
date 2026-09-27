import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { CYBER, FONT } from "../profx/Theme";

// Transitions template showcase — uses @remotion/transitions
// Each panel is its own <TransitionSeries.Sequence> with a presentation between them.
// Docs: https://www.remotion.dev/docs/transitions

const Panel: React.FC<{ label: string; accent: string; sub: string; index: number }> = ({ label, accent, sub, index }) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(900px 700px at 50% 0%, ${accent}22, transparent 60%), linear-gradient(180deg, #070b14, #030509)`,
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      gap: 18,
      borderTop: `3px solid ${accent}`,
    }}
  >
    <div style={{ fontFamily: FONT.mono, fontSize: 16, letterSpacing: "0.2em", color: accent }}>0{index} — TRANSITION</div>
    <div style={{ fontFamily: FONT.display, fontSize: 84, fontWeight: 900, color: "#eaf7ff", lineHeight: 1 }}>{label}</div>
    <div style={{ fontFamily: FONT.mono, fontSize: 20, color: CYBER.muted }}>{sub}</div>
    <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
      <div style={{ width: 36, height: 4, borderRadius: 999, background: accent }} />
      <div style={{ width: 36, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.18)" }} />
      <div style={{ width: 36, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.12)" }} />
    </div>
  </AbsoluteFill>
);

export const TransitionsKit: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={60}>
        <Panel label="FADE" accent={CYBER.cyan} sub="fade(15) — linearTiming" index={1} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />
      <TransitionSeries.Sequence durationInFrames={60}>
        <Panel label="SLIDE" accent={CYBER.magenta} sub="slide('from-right')" index={2} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={springTiming({ config: { damping: 200 } })} />
      <TransitionSeries.Sequence durationInFrames={60}>
        <Panel label="WIPE" accent={CYBER.green} sub="wipe('from-left')" index={3} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={linearTiming({ durationInFrames: 20 })} />
      <TransitionSeries.Sequence durationInFrames={60}>
        <Panel label="FLIP" accent={CYBER.amber} sub="flip — springTiming" index={4} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={flip()} timing={springTiming({ config: { damping: 15 } })} />
      <TransitionSeries.Sequence durationInFrames={60}>
        <Panel label="CLOCK" accent={CYBER.cyan} sub="clockWipe — reveal" index={5} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={clockWipe({ width: 1080, height: 1920 })} timing={linearTiming({ durationInFrames: 22 })} />
      <TransitionSeries.Sequence durationInFrames={70}>
        <Panel label="END" accent={CYBER.white} sub="mix & match any presentation" index={6} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

// Backwards-compatible helper for manual Sequence usage (optional)
export const TransitionsDemo_SequenceWrapper: React.FC = () => (
  <AbsoluteFill style={{ background: CYBER.bg0 }}>
    <Sequence from={0} durationInFrames={90}>
      <Panel label="SEQ A" accent={CYBER.cyan} sub="without TransitionSeries" index={1} />
    </Sequence>
    <Sequence from={90} durationInFrames={90}>
      <Panel label="SEQ B" accent={CYBER.magenta} sub="manual cut" index={2} />
    </Sequence>
  </AbsoluteFill>
);

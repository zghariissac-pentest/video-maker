import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { CYBER, FONT, circuitBackground } from "./Theme";
import { ProFX } from "./ProFX";
import { GlitchBurst } from "./Transitions";
import { NeonTitle, Kicker, ScrambleText, WordReveal } from "./KineticText";
import {
  IconNetwork,
  IconShield,
  IconBug,
  IconLock,
  IconTerminal,
} from "./Icons";
import { Radar, Blip, ProgressBar, GlassCard, Orbit, Badge } from "./Panels";

const BG: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(180deg, #010309, #060a10 60%, #0a0612)" }}>
    <AbsoluteFill
      style={{
        background: circuitBackground(`${CYBER.cyan}1f`, 2, 46),
        opacity: 0.5,
        maskImage: "radial-gradient(ellipse at 50% 35%, black 30%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at 50% 35%, black 30%, transparent 75%)",
      }}
    />
    <div style={{ position: "absolute", left: "5%", bottom: "30%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,121,249,0.14), transparent 70%)", filter: "blur(44px)" }} />
    <div style={{ position: "absolute", right: "4%", top: "20%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.16), transparent 70%)", filter: "blur(36px)" }} />
  </AbsoluteFill>
);

const Intro: React.FC = () => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column", gap: 44, padding: 40 }}>
    <Kicker label="quick field test" />
    <NeonTitle lines={["TEST", "CLIP"]} colors={[CYBER.white, CYBER.cyan]} fontSize={170} />
    <div style={{ fontFamily: FONT.mono, color: CYBER.magenta, fontSize: 32 }}>
      <ScrambleText text="profx toolkit v1" startAt={12} />
    </div>
    <div style={{ position: "relative", width: 320, height: 320 }}>
      <Orbit accent={CYBER.magenta} r={1} speed={1.4} />
      <Orbit accent={CYBER.cyan} r={0.6} speed={-2} />
      <Radar size={190} accent={CYBER.green}>
        <Blip x={-0.4} y={-0.2} accent={CYBER.cyan} />
        <Blip x={0.5} y={-0.3} accent={CYBER.magenta} />
        <Blip x={0.1} y={0.45} accent={CYBER.amber} />
      </Radar>
    </div>
  </AbsoluteFill>
);

const Body: React.FC = () => (
  <AbsoluteFill style={{ justifyContent: "center", display: "flex", flexDirection: "column", gap: 40, padding: "110px 60px" }}>
    <Kicker label="running the numbers" color={CYBER.green} />
    <WordReveal text="tools draw themselves in" fontSize={62} align="left" startAt={4} />
    <Sequence from={16}>
      <div style={{ display: "flex", gap: 30 }}>
        <IconNetwork size={78} color={CYBER.cyan} drawDuration={24} />
        <IconShield size={78} color={CYBER.magenta} drawDuration={28} />
        <IconBug size={78} color={CYBER.amber} drawDuration={20} />
        <IconLock size={78} color={CYBER.green} drawDuration={30} />
      </div>
    </Sequence>
    <Sequence from={28}>
      <GlassCard accent={CYBER.cyan}>
        <div style={{ fontFamily: FONT.mono, color: CYBER.muted, fontSize: 26, lineHeight: 1.7, marginBottom: 18 }}>
          rendering pipeline: glitch, grain, vignette, scanlines
        </div>
        <ProgressBar value={0.95} accent={CYBER.green} label="READY" startAt={2} />
      </GlassCard>
    </Sequence>
    <Sequence from={42}>
      <div style={{ display: "flex", gap: 28 }}>
        <Badge label="CUT" accent={CYBER.cyan} startAt={0} />
        <Badge label="FX" accent={CYBER.magenta} startAt={8} />
        <Badge label="GO" accent={CYBER.green} startAt={16} />
      </div>
    </Sequence>
  </AbsoluteFill>
);

const Outro: React.FC = () => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column", gap: 40, padding: 60 }}>
    <Sequence from={0}>
      <IconTerminal size={120} color={CYBER.cyan} drawDuration={26} />
    </Sequence>
    <Kicker label="that's a wrap" color={CYBER.magenta} />
    <WordReveal text="export & upload" fontSize={76} startAt={6} />
  </AbsoluteFill>
);

export const TestClip: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: CYBER.bg0 }}>
      <ProFX grain={0.3} vignette={0.95} scanlines={0.14} shake={0.5} lightLeak glitchAt={[168, 335]}>
        <BG />
        <Sequence durationInFrames={180}>
          <Intro />
        </Sequence>
        <Sequence from={180} durationInFrames={155}>
          <Body />
        </Sequence>
        <Sequence from={335} durationInFrames={120}>
          <Outro />
        </Sequence>
        <Sequence from={180} durationInFrames={26}>
          <GlitchBurst />
        </Sequence>
        <Sequence from={335} durationInFrames={26}>
          <GlitchBurst intensity={1.2} />
        </Sequence>
      </ProFX>
    </AbsoluteFill>
  );
};
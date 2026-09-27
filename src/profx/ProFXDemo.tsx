import React from "react";
import { AbsoluteFill, random, Sequence, useCurrentFrame } from "remotion";
import { CYBER, FONT, circuitBackground } from "./Theme";
import { ProFX } from "./ProFX";
import { GlitchBurst, StaticBurst, ZoomPunch } from "./Transitions";
import {
  NeonTitle,
  Kicker,
  ScrambleText,
  WordReveal,
  TerminalQuote,
  MaskWipe,
} from "./KineticText";
import {
  IconRadar,
  IconShield,
  IconKey,
  IconNetwork,
  IconSkull,
  IconBug,
  IconTerminal,
  IconTarget,
  IconGlobe,
  IconBolt,
  IconEye,
} from "./Icons";
import {
  GlassCard,
  Radar,
  Blip,
  ProgressBar,
  CountUp,
  Orbit,
  Prompt,
  Badge,
} from "./Panels";

const H = 1920;

// Luxury cyber backdrop: circuit grid, drifting orbs, digital rain.
const Backdrop: React.FC<{ accent?: string }> = ({ accent = CYBER.cyan }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #01020a 0%, #050508 55%, #08040f 100%)" }}>
      <AbsoluteFill
        style={{
          background: circuitBackground(`${accent}22`, 2, 52),
          opacity: 0.55,
          maskImage: "radial-gradient(ellipse at 50% 34%, black 28%, transparent 76%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 34%, black 28%, transparent 76%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "6%",
          top: "16%",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,211,238,0.18), transparent 70%)",
          filter: "blur(34px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "4%",
          bottom: "30%",
          width: 430,
          height: 430,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,121,249,0.15), transparent 70%)",
          filter: "blur(42px)",
        }}
      />
      {Array.from({ length: 14 }).map((_, i) => {
        const y = ((frame * (0.6 + random(i) * 1.1)) + random(i) * H) % H;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: y,
              left: `${random(i * 3 + 40) * 100}%`,
              fontSize: 26,
              color: `${accent}${Math.round(28 + random(i * 9 + 7) * 46)}`,
              fontFamily: FONT.mono,
              writingMode: "vertical-rl",
              textShadow: `0 0 12px ${accent}`,
            }}
          >
            {random((frame + i) | 0).toString(16).slice(2, 8)}
          </div>
        );
      })}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, transparent 38%, rgba(0,0,0,0.5))" }} />
    </AbsoluteFill>
  );
};

const Opener: React.FC = () => (
  <AbsoluteFill
    style={{
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      gap: 52,
      padding: 40,
    }}
  >
    <Sequence from={0}>
      <Kicker label="Episode // Watchtower" />
    </Sequence>
    <Sequence from={8}>
      <NeonTitle lines={["BREAK", "THE"]} colors={[CYBER.white, CYBER.cyan]} fontSize={150} />
    </Sequence>
    <Sequence from={30}>
      <div style={{ fontFamily: FONT.mono, color: CYBER.magenta, fontSize: 34 }}>
        <ScrambleText text="system in plain sight" startAt={0} />
      </div>
    </Sequence>
    <Sequence from={42}>
      <div style={{ position: "relative", width: 350, height: 350 }}>
        <Orbit accent={CYBER.magenta} r={1} speed={1} />
        <Orbit accent={CYBER.cyan} r={0.62} speed={-2} />
        <Orbit accent={CYBER.green} r={0.3} speed={2.6} />
      </div>
    </Sequence>
    <Sequence from={62}>
      <div style={{ display: "flex", gap: 28 }}>
        <IconEye size={66} color={CYBER.cyan} drawDuration={24} />
        <IconBolt size={66} color={CYBER.amber} drawDuration={20} />
        <IconTarget size={66} color={CYBER.magenta} drawDuration={28} />
        <IconGlobe size={66} color={CYBER.green} drawDuration={26} />
      </div>
    </Sequence>
    <Sequence from={84}>
      <div style={{ display: "flex", gap: 30 }}>
        <Badge label="TRACE" accent={CYBER.cyan} startAt={0} />
        <Badge label="MAP" accent={CYBER.green} startAt={10} />
        <Badge label="PWN" accent={CYBER.magenta} startAt={20} />
      </div>
    </Sequence>
  </AbsoluteFill>
);

const Explain: React.FC = () => (
  <AbsoluteFill
    style={{
      flexDirection: "column",
      gap: 46,
      padding: "120px 64px",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Kicker label="HOW A LOOP CAPTURES TRAFFIC" color={CYBER.magenta} />
    <WordReveal text="every keystroke leaks out" fontSize={62} align="left" startAt={6} />
    <Sequence from={24}>
      <div style={{ display: "flex", gap: 34, marginTop: 8 }}>
        <IconNetwork size={82} color={CYBER.cyan} drawDuration={26} />
        <IconKey size={82} color={CYBER.green} drawDuration={24} />
        <IconShield size={82} color={CYBER.magenta} drawDuration={30} />
        <IconBug size={82} color={CYBER.amber} drawDuration={20} />
      </div>
    </Sequence>
    <Sequence from={40}>
      <GlassCard accent={CYBER.cyan}>
        <div style={{ fontFamily: FONT.mono, color: CYBER.muted, fontSize: 27, lineHeight: 1.7 }}>
          A rogue access point records the handshake, then replays it to impersonate the network.
        </div>
      </GlassCard>
    </Sequence>
    <Sequence from={56}>
      <div style={{ display: "flex", gap: 30 }}>
        <GlassCard accent={CYBER.green} style={{ flex: 1 }}>
          <ProgressBar value={0.82} accent={CYBER.green} label="CAPTURE" startAt={8} />
        </GlassCard>
        <GlassCard accent={CYBER.magenta} style={{ flex: 1 }}>
          <Prompt line="mitm -f eth0" startAt={4} />
          <Prompt line="--decrypt --dump creds" startAt={16} />
        </GlassCard>
      </div>
    </Sequence>
  </AbsoluteFill>
);

const Prove: React.FC = () => (
  <AbsoluteFill
    style={{
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      gap: 42,
      padding: 60,
    }}
  >
    <Kicker label="the boring secret" color={CYBER.green} />
    <div style={{ display: "flex", gap: 40 }}>
      <IconTerminal size={88} color={CYBER.cyan} drawDuration={26} />
      <IconSkull size={88} color={CYBER.magenta} drawDuration={30} />
      <IconRadar size={88} color={CYBER.green} drawDuration={24} />
    </div>
    <Sequence from={10}>
      <Radar size={290} accent={CYBER.cyan}>
        <Blip x={-0.5} y={-0.3} accent={CYBER.green} />
        <Blip x={0.5} y={-0.4} accent={CYBER.magenta} />
        <Blip x={0.1} y={0.5} accent={CYBER.amber} />
      </Radar>
    </Sequence>
    <Sequence from={28}>
      <GlassCard accent={CYBER.green} style={{ width: "100%" }}>
        <div style={{ display: "flex", gap: 58 }}>
          <div>
            <div style={{ fontFamily: FONT.mono, fontSize: 88, color: CYBER.green }}>
              <CountUp to={97} startAt={4} />
            </div>
            <div style={{ fontFamily: FONT.mono, color: CYBER.muted, fontSize: 22, letterSpacing: "0.18em", textTransform: "uppercase" }}>
              learned in
            </div>
          </div>
          <div>
            <div style={{ fontFamily: FONT.mono, fontSize: 88, color: CYBER.magenta }}>
              <CountUp to={60} startAt={10} />
            </div>
            <div style={{ fontFamily: FONT.mono, color: CYBER.muted, fontSize: 22, letterSpacing: "0.18em", textTransform: "uppercase" }}>
              minutes
            </div>
          </div>
          <div>
            <div style={{ fontFamily: FONT.mono, fontSize: 88, color: CYBER.cyan }}>
              <CountUp to={14} startAt={16} />
            </div>
            <div style={{ fontFamily: FONT.mono, color: CYBER.muted, fontSize: 22, letterSpacing: "0.18em", textTransform: "uppercase" }}>
              tools
            </div>
          </div>
        </div>
      </GlassCard>
    </Sequence>
    <Sequence from={48}>
      <MaskWipe text="the anonymity is a facade" color={CYBER.cyan} fontSize={40} startAt={0} />
    </Sequence>
    <Sequence from={58}>
      <TerminalQuote
        lines={["you are already leaking"]}
        prompt="watchtower//log"
        startAt={0}
      />
    </Sequence>
  </AbsoluteFill>
);

export const ProFXDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: CYBER.bg0 }}>
      <ProFX grain={0.24} vignette={0.95} scanlines={0.12} letterbox shake={0.5} lightLeak glitchAt={[299, 599]}>
        <Backdrop accent={CYBER.cyan} />

        <Sequence durationInFrames={300}>
          <Opener />
        </Sequence>

        <Sequence durationInFrames={300}>
          <ZoomPunch>
            <Explain />
          </ZoomPunch>
        </Sequence>

        <Sequence durationInFrames={300}>
          <Prove />
        </Sequence>

        <Sequence from={299} durationInFrames={28}>
          <GlitchBurst />
        </Sequence>
        <Sequence from={599} durationInFrames={30}>
          <StaticBurst />
        </Sequence>
      </ProFX>
    </AbsoluteFill>
  );
};
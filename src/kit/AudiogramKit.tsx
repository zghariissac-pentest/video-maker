import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, random } from "remotion";
import { visualizeAudioWaveform, useAudioData } from "@remotion/media-utils";
import { CYBER, FONT } from "../profx/Theme";

// Audiogram template – https://www.remotion.dev/templates/audiogram
// Visualizes waveform + frequency bars. Works with any audio via useAudioData.
// Falls back to synthetic waveform if no audio file is provided (so demo always renders).

const BAR_COUNT = 48;

export const AudiogramKit: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Try to load real audio if provided; otherwise synthetic
  const audioData = audioSrc ? useAudioData(audioSrc) : null;

  const waveform = React.useMemo(() => {
    if (!audioData) return null;
    try {
      return visualizeAudioWaveform({
        fps,
        frame,
        audioData,
        windowInSeconds: 0.12,
        numberOfSamples: BAR_COUNT,
      });
    } catch {
      return null;
    }
  }, [audioData, fps, frame]);

  // Synthetic fallback: smooth bars driven by frame + noise
  const synthetic = React.useMemo(() => {
    return Array.from({ length: BAR_COUNT }).map((_, i) => {
      const t = frame * 0.08 + i * 0.45;
      const n = Math.sin(t) * 0.5 + Math.cos(t * 0.7 + random(i) * 4) * 0.4;
      return 0.28 + Math.abs(n) * 0.72;
    });
  }, [frame]);

  const data = waveform ?? synthetic;

  return (
    <AbsoluteFill style={{ background: CYBER.bg0, justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column", gap: 36, padding: 40 }}>
      {/* header */}
      <div style={{ fontFamily: FONT.mono, fontSize: 14, letterSpacing: "0.22em", color: CYBER.green }}>AUDIOGRAM · WAVEFORM</div>
      <div style={{ fontFamily: FONT.display, fontSize: 56, fontWeight: 800, color: CYBER.white, textAlign: "center", lineHeight: 1 }}>
        every frequency tells <span style={{ color: CYBER.cyan }}>a story</span>
      </div>

      {/* waveform bars */}
      <div style={{ display: "flex", alignItems: "end", gap: 6, height: 180, padding: "0 40px" }}>
        {data.map((amp, i) => {
          const h = interpolate(amp, [0, 1], [12, 168]);
          const isPeak = amp > 0.82;
          return (
            <div
              key={i}
              style={{
                width: 10,
                height: h,
                borderRadius: 999,
                background: isPeak ? CYBER.magenta : i % 3 === 0 ? CYBER.cyan : "rgba(255,255,255,0.85)",
                boxShadow: isPeak ? `0 0 14px ${CYBER.magenta}` : `0 0 10px ${CYBER.cyan}55`,
                opacity: 0.92,
                transform: `scaleY(${0.92 + Math.sin(frame * 0.12 + i) * 0.06})`,
              }}
            />
          );
        })}
      </div>

      {/* mimic music-visualization template: circular radial */}
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: CYBER.green, boxShadow: `0 0 12px ${CYBER.green}`, animation: "pulse 1s infinite" }} />
        <span style={{ fontFamily: FONT.mono, fontSize: 18, color: CYBER.muted }}>
          {audioData ? "live audio" : "synthetic demo"} · {fps} fps · {BAR_COUNT} samples
        </span>
      </div>
    </AbsoluteFill>
  );
};

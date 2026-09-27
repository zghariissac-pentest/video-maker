import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence } from "remotion";
import { CYBER } from "../profx/Theme";
import { SceneMVT } from "./scenes/SceneMVT";
import { SceneScan } from "./scenes/SceneScan";

// Hook per spec: 0-2s text, 2-4s reaction meme, 4-6s freeze + CTA
const Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showText1 = frame < 68;
  const showCTA1 = frame >= 62;

  return (
    <AbsoluteFill style={{ background: "#000000", overflow: "hidden" }}>
      {/* 0-2s: full text first, then it shrinks and stays on top for reaction */}
      {frame < 58 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column", padding: 36 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, direction: "rtl" }}>
            <div style={{ display: "flex", gap: "0.14em", direction: "rtl", justifyContent: "center" }}>
              {["الهاتف", "تاعك", "قادر", "يكون"].map((w, i) => {
                const sp = spring({ frame: frame - i * 3, fps, config: { damping: 18, stiffness: 160 } });
                return (
                  <span key={w} style={{ fontFamily: "Cairo, Changa, sans-serif", fontSize: 62, fontWeight: 800, color: "#FFFFFF", opacity: sp, transform: `translateY(${interpolate(sp, [0, 1], [16, 0])}px)`, lineHeight: 1 }}>
                    {w}
                  </span>
                );
              })}
            </div>
            <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
              {(() => {
                const y = spring({ frame: frame - 16, fps, config: { damping: 14, stiffness: 160 } });
                const flicker = (frame >= 18 && frame < 22) || (frame >= 30 && frame < 34) ? (frame % 2 === 0 ? 0.3 : 1) : 1;
                const split = frame >= 20 && frame < 24 ? (frame % 2 === 0 ? 1.2 : -1.2) : 0;
                return (
                  <span
                    style={{
                      fontFamily: "Cairo, Changa, sans-serif",
                      fontSize: 88,
                      fontWeight: 900,
                      color: CYBER.red,
                      lineHeight: 1,
                      opacity: y * flicker,
                      transform: `translateY(${interpolate(y, [0, 1], [28, 0])}px)`,
                      textShadow: `0 0 18px rgba(239,68,68,0.65), 0 0 40px rgba(239,68,68,0.25)`,
                      position: "relative",
                    }}
                  >
                    مخترق
                    <span style={{ position: "absolute", inset: 0, color: "rgba(255,70,120,0.9)", transform: `translateX(${split}px)`, mixBlendMode: "screen", pointerEvents: "none", opacity: split ? 0.7 : 0 }}>مخترق</span>
                    <span style={{ position: "absolute", inset: 0, color: "rgba(70,220,255,0.9)", transform: `translateX(${-split}px)`, mixBlendMode: "screen", pointerEvents: "none", opacity: split ? 0.7 : 0 }}>مخترق</span>
                  </span>
                );
              })()}
            </div>
            <div style={{ width: 72, height: 2, background: CYBER.red, borderRadius: 999, marginTop: 8, opacity: spring({ frame: frame - 28, fps, config: { damping: 16, stiffness: 120 } }) as unknown as number, boxShadow: `0 0 10px ${CYBER.red}` }} />
          </div>
        </AbsoluteFill>
      )}



      {/* keep first part as is, then clean text with better animation */}
      {showCTA1 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column", padding: 36, background: "#000000" }}>
          <div
            style={{
              opacity: spring({ frame: frame - 62, fps, config: { damping: 18, stiffness: 160 } }) as unknown as number,
              transform: `translateY(${interpolate(spring({ frame: frame - 62, fps, config: { damping: 18, stiffness: 160 } }), [0, 1], [16, 0])}px) scale(${interpolate(spring({ frame: frame - 62, fps, config: { damping: 18, stiffness: 160 } }), [0, 1], [0.96, 1])})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              textAlign: "center",
              direction: "rtl",
            }}
          >
            {(() => {
              const words = "تقدر تتاكد في 60 ثانية".split(" ");
              return (
                <div style={{ display: "flex", gap: "0.14em", direction: "rtl", justifyContent: "center", flexWrap: "wrap" }}>
                  {words.map((w, i) => {
                    const s = spring({ frame: frame - 64 - i * 4, fps, config: { damping: 14, stiffness: 160 } });
                    const isNum = w === "60";
                    return (
                      <span
                        key={i}
                        style={{
                          fontFamily: isNum ? "JetBrains Mono, monospace" : "Cairo, Changa, sans-serif",
                          fontSize: isNum ? 52 : 46,
                          fontWeight: 900,
                          color: isNum ? CYBER.cyan : CYBER.white,
                          opacity: s,
                          transform: `translateY(${interpolate(s, [0, 1], [18, 0])}px) scale(${interpolate(s, [0, 1], [0.9, 1])})`,
                          textShadow: isNum ? `0 0 14px ${CYBER.cyan}66` : undefined,
                          background: isNum ? "rgba(34,211,238,0.10)" : undefined,
                          padding: isNum ? "2px 10px" : undefined,
                          borderRadius: isNum ? 999 : undefined,
                          border: isNum ? "1px solid rgba(34,211,238,0.22)" : undefined,
                          display: "inline-block",
                          lineHeight: 1,
                        }}
                      >
                        {w}
                      </span>
                    );
                  })}
                </div>
              );
            })()}
            <div style={{ width: 56, height: 2, background: CYBER.cyan, borderRadius: 999, boxShadow: `0 0 10px ${CYBER.cyan}`, opacity: spring({ frame: frame - 84, fps, config: { damping: 16, stiffness: 120 } }) as unknown as number }} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.16em", color: "rgba(255,255,255,0.42)", opacity: spring({ frame: frame - 88, fps, config: { damping: 16, stiffness: 120 } }) as unknown as number }}>QUICK CHECK • NO INSTALL</span>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

export const Check: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000000" }}>
      <Sequence from={0} durationInFrames={150}>
        <Hook />
      </Sequence>
      <Sequence from={150} durationInFrames={160}>
        <SceneMVT />
      </Sequence>
      <Sequence from={310} durationInFrames={150}>
        <SceneScan />
      </Sequence>
    </AbsoluteFill>
  );
};

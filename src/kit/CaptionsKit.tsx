import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { createTikTokStyleCaptions, parseSrt } from "@remotion/captions";
import { CYBER, FONT } from "../profx/Theme";

// Demo SRT — word-by-word TikTok style (template: /templates/tiktok)
const SAMPLE_SRT = `1
00:00:00,000 --> 00:00:00,400
you

2
00:00:00,400 --> 00:00:00,700
are

3
00:00:00,700 --> 00:00:01,100
already

4
00:00:01,100 --> 00:00:01,600
leaking

5
00:00:01,800 --> 00:00:02,200
every

6
00:00:02,200 --> 00:00:02,600
packet

7
00:00:02,600 --> 00:00:03,000
tells

8
00:00:03,000 --> 00:00:03,400
a

9
00:00:03,400 --> 00:00:03,900
story
`;

const { captions } = parseSrt({ input: SAMPLE_SRT });
const { pages } = createTikTokStyleCaptions({
  captions,
  combineTokensWithinMilliseconds: 700,
});

export const CaptionsKit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ms of current frame
  const ms = (frame / fps) * 1000;
  // find active page
  const activePage = pages.find((p) => ms >= p.startMs && ms < p.startMs + p.durationMs) ?? pages[0];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column", gap: 24, padding: 40 }}>
      <div style={{ fontFamily: FONT.mono, fontSize: 14, letterSpacing: "0.2em", color: CYBER.cyan, opacity: 0.8 }}>
        CAPTIONS · TIKTOK TEMPLATE
      </div>

      {/* Word-by-word */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18, justifyContent: "center", maxWidth: 900 }}>
        {activePage?.tokens.map((token, i) => {
          const isActive = ms >= token.fromMs && ms < token.toMs;
          const scale = interpolate(isActive ? 1 : 0, [0, 1], [1, 1.18]);
          const y = interpolate(isActive ? 1 : 0, [0, 1], [0, -6]);
          return (
            <span
              key={i}
              style={{
                fontFamily: FONT.display,
                fontSize: 72,
                fontWeight: 800,
                color: isActive ? CYBER.cyan : CYBER.white,
                textShadow: isActive ? `0 0 18px ${CYBER.cyan}` : "none",
                transform: `scale(${scale}) translateY(${y}px)`,
                transition: "color 0.15s",
                lineHeight: 1,
              }}
            >
              {token.text}
            </span>
          );
        })}
      </div>

      <div style={{ fontFamily: FONT.mono, fontSize: 18, color: CYBER.muted, marginTop: 12 }}>
        {activePage ? `${activePage.text}` : ""} · {pages.length} pages
      </div>

      {/* Progress */}
      <div style={{ width: 600, height: 4, background: "rgba(255,255,255,0.12)", borderRadius: 999, overflow: "hidden", marginTop: 8 }}>
        <div
          style={{
            width: `${interpolate(frame, [0, fps * 4], [0, 100], { extrapolateRight: "clamp" })}%`,
            height: "100%",
            background: CYBER.cyan,
            boxShadow: `0 0 10px ${CYBER.cyan}`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

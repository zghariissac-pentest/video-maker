import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

// Background: nearly black cosmic — sparse, tiny white stars, large empty areas, subtle monochrome nebula
const STARS = [
  { x: 14, y: 16, s: 1, o: 0.18 },
  { x: 82, y: 28, s: 1.1, o: 0.16 },
  { x: 38, y: 42, s: 1, o: 0.12 },
  { x: 68, y: 14, s: 1, o: 0.15 },
  { x: 22, y: 64, s: 1, o: 0.12 },
  { x: 90, y: 52, s: 1.1, o: 0.14 },
  { x: 32, y: 78, s: 1, o: 0.11 },
  { x: 60, y: 76, s: 1, o: 0.13 },
  { x: 48, y: 20, s: 1, o: 0.1 },
  { x: 10, y: 44, s: 1, o: 0.14 },
  { x: 86, y: 86, s: 1, o: 0.12 },
  { x: 56, y: 34, s: 1, o: 0.15 },
  { x: 24, y: 30, s: 1, o: 0.11 },
  { x: 76, y: 62, s: 1, o: 0.13 },
  { x: 40, y: 88, s: 1, o: 0.1 },
  { x: 62, y: 12, s: 1, o: 0.14 },
  { x: 18, y: 54, s: 1, o: 0.12 },
  { x: 70, y: 40, s: 1, o: 0.1 },
  { x: 44, y: 90, s: 1, o: 0.11 },
  { x: 94, y: 22, s: 1, o: 0.13 },
  { x: 30, y: 36, s: 1, o: 0.14 },
  { x: 74, y: 24, s: 1, o: 0.12 },
  { x: 50, y: 56, s: 1, o: 0.1 },
  { x: 20, y: 74, s: 1, o: 0.13 },
];

export const WhyLinux: React.FC = () => {
  const frame = useCurrentFrame();
  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);

  // ---- timeline ----
  // 0-65  : terminal typing arabic
  // 65-90 : "why" appears (typed)
  // 90-210: Tux + underneath text reveal
  const arabicText = "الانسان الاعلى يستخدم لينيكس";
  const whyText = "why";
  // typing progress
  const arabicChars = Math.floor(
    interpolate(frame, [0, 55], [0, arabicText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const arabicShown = arabicText.slice(0, arabicChars);
  const cursorOnArabic = frame < 55 ? frame % 14 < 7 : false;

  const whyStart = 58;
  const whyChars = Math.floor(
    interpolate(frame, [whyStart, whyStart + 18], [0, whyText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const whyShown = whyText.slice(0, whyChars);
  const cursorOnWhy = frame >= whyStart && frame < whyStart + 22 ? frame % 10 < 5 : false;
  const showWhyCursor = frame >= whyStart + 18 && frame % 16 < 8;

  const tuxIn = interpolate(frame, [78, 102], [0, 1], {
    easing: SMOOTH,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tuxScale = interpolate(frame, [78, 102], [0.86, 1], {
    easing: SMOOTH,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tuxY = interpolate(tuxIn, [0, 1], [18, 0]);

  const linuxIn = interpolate(frame, [108, 128], [0, 1], {
    easing: SMOOTH,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const quoteIn = interpolate(frame, [124, 144], [0, 1], {
    easing: SMOOTH,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const authorIn = interpolate(frame, [138, 158], [0, 1], {
    easing: SMOOTH,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // subtle vignette breathing
  const vignetteOpacity = 0.9;

  return (
    <AbsoluteFill style={{ backgroundColor: "#05070a" }}>
      {/* sparse stars */}
      {STARS.map((st, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${st.x}%`,
            top: `${st.y}%`,
            width: st.s * 1.8,
            height: st.s * 1.8,
            borderRadius: 999,
            background: "white",
            opacity: st.o,
            boxShadow: `0 0 ${st.s * 3}px rgba(255,255,255,${st.o * 0.5})`,
          }}
        />
      ))}
      {/* extremely subtle monochrome nebula */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(820px 520px at 52% 38%, rgba(255,255,255,0.025), transparent 62%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(620px 420px at 30% 70%, rgba(255,255,255,0.015), transparent 60%)",
          pointerEvents: "none",
        }}
      />
      {/* few drifting particles */}
      {[
        { x: 18, y: 28, d: 0 },
        { x: 82, y: 36, d: 1.2 },
        { x: 48, y: 78, d: 0.6 },
      ].map((p, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: 1.5,
            height: 1.5,
            borderRadius: 999,
            background: "rgba(255,255,255,0.26)",
            opacity: 0.32,
            transform: `translateY(${Math.sin(frame * 0.02 + p.d) * 4}px)`,
            boxShadow: "0 0 4px rgba(255,255,255,0.22)",
          }}
        />
      ))}
      {/* faint dust / vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(1100px 800px at 50% 50%, transparent 58%, rgba(0,0,0,0.28) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, rgba(0,0,0,${vignetteOpacity * 0.0}) 0%, rgba(0,0,0,0.18) 100%)`,
          pointerEvents: "none",
        }}
      />

      {/* ---------- MAIN CONTENT ---------- */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "0 42px",
        }}
      >
        {/* TERMINAL STYLE TEXT — top */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            marginBottom: 18,
            minHeight: 132,
            justifyContent: "flex-start",
          }}
        >
          {/* terminal window subtle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
              padding: "14px 20px 14px 18px",
              backdropFilter: "blur(6px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
              minWidth: 560,
              justifyContent: "center",
            }}
          >
            {/* prompt */}
            <span
              style={{
                fontFamily: "JetBrains Mono, ui-monospace, monospace",
                fontSize: 16,
                color: "#22c55e",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                flexShrink: 0,
                opacity: 0.95,
              }}
            >
              {">"} _
            </span>
            {/* arabic typing */}
            <span
              dir="rtl"
              style={{
                fontFamily: "Cairo, Inter, sans-serif",
                fontWeight: 800,
                fontSize: 28,
                color: "white",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                textShadow: "0 1px 10px rgba(0,0,0,0.5)",
                whiteSpace: "nowrap",
              }}
            >
              {arabicShown}
              {cursorOnArabic && (
                <span
                  style={{
                    display: "inline-block",
                    width: 10,
                    height: 22,
                    background: "white",
                    marginRight: 4,
                    verticalAlign: "middle",
                    opacity: 0.92,
                  }}
                />
              )}
            </span>
          </div>

          {/* why — terminal accent, appears after arabic done */}
          <div
            style={{
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: frame >= whyStart ? 1 : 0,
            }}
          >
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 26,
                fontWeight: 800,
                color: "#facc15",
                letterSpacing: "0.14em",
                textTransform: "lowercase",
                textShadow: "0 0 16px rgba(250,204,21,0.22)",
              }}
            >
              {whyShown}
              {(cursorOnWhy || (whyChars === whyText.length && showWhyCursor)) && (
                <span
                  style={{
                    display: "inline-block",
                    width: 12,
                    height: 3,
                    background: "#facc15",
                    marginLeft: 4,
                    verticalAlign: "baseline",
                    opacity: 1,
                  }}
                />
              )}
            </span>
            {whyChars === whyText.length && (
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.28)",
                  letterSpacing: "0.18em",
                  marginLeft: 6,
                  opacity: interpolate(frame, [whyStart + 18, whyStart + 30], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                ?
              </span>
            )}
          </div>
        </div>

        {/* ICON IN MIDDLE — isolated, background removed */}
        <div
          style={{
            opacity: tuxIn,
            transform: `translateY(${tuxY}px) scale(${tuxScale})`,
            willChange: "transform, opacity",
            filter: "drop-shadow(0 18px 42px rgba(0,0,0,0.62)) drop-shadow(0 2px 12px rgba(255,255,255,0.06))",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("best-tux-cut.png")}
            style={{
              width: 520,
              height: 440,
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>

        {/* TEXT UNDER IT — LINUX / Become what you are. / — FRIEDRICH NIETZSCHE */}
        <div
          style={{
            marginTop: 18,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 0,
          }}
        >
          <div
            style={{
              opacity: linuxIn,
              transform: `translateY(${interpolate(linuxIn, [0, 1], [10, 0])}px)`,
              fontFamily: "Times New Roman, Georgia, serif",
              fontWeight: 900,
              fontSize: 78,
              color: "white",
              letterSpacing: "0.18em",
              lineHeight: 1,
              textShadow: "0 2px 18px rgba(0,0,0,0.55), 0 0 28px rgba(255,255,255,0.08)",
            }}
          >
            LINUX
          </div>

          <div
            style={{
              opacity: quoteIn,
              transform: `translateY(${interpolate(quoteIn, [0, 1], [8, 0])}px)`,
              marginTop: 8,
              fontFamily: "Georgia, Times New Roman, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 26,
              color: "rgba(255,255,255,0.82)",
              letterSpacing: "0.02em",
              lineHeight: 1,
              textShadow: "0 1px 10px rgba(0,0,0,0.5)",
            }}
          >
            “Become what you are.”
          </div>

          <div
            style={{
              opacity: authorIn,
              transform: `translateY(${interpolate(authorIn, [0, 1], [6, 0])}px)`,
              marginTop: 10,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              fontWeight: 700,
              color: "rgba(255,255,255,0.32)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            — Friedrich Nietzsche
          </div>

          {/* subtle divider line */}
          <div
            style={{
              marginTop: 14,
              width: 120,
              height: 1,
              background: "rgba(255,255,255,0.10)",
              opacity: authorIn,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);
const MONO = "JetBrains Mono, monospace";
const AR = "Cairo, Changa, sans-serif";

// Word helper — per-word spring
const Word: React.FC<{ w: string; idx: number; start: number; mono?: boolean }> = ({ w, idx, start, mono }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - (start + idx * 4), fps, config: { damping: 14, stiffness: 160 } });
  return (
    <span style={{ display: "inline-block", opacity: p, transform: "translateY(" + interpolate(p, [0, 1], [16, 0]) + "px)", color: "white", fontFamily: mono ? MONO : undefined, fontWeight: mono ? 800 : undefined, padding: "0 4px" }}>
      {w}
    </span>
  );
};

// Scene 1 (hook): black bg, pic in middle, text under — both appear smoothly together
const TiredScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pic + text share one smooth entrance so they appear together
  const enter = spring({ frame, fps, config: { damping: 20, stiffness: 110 } });
  const imgScale = interpolate(enter, [0, 1], [0.92, 1]);
  const imgY = interpolate(enter, [0, 1], [24, 0]);

  const textIn = interpolate(frame, [10, 30], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textY = interpolate(textIn, [0, 1], [14, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "0 48px",
        }}
      >
        <div
          style={{
            opacity: enter,
            transform: `translateY(${imgY}px) scale(${imgScale})`,
            willChange: "transform, opacity",
            filter: "drop-shadow(0 18px 42px rgba(0,0,0,0.65)) drop-shadow(0 0 18px rgba(255,255,255,0.04))",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("tired.jpg")}
            style={{
              width: 560,
              height: 560,
              objectFit: "cover",
              display: "block",
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          />
        </div>

        <div
          dir="rtl"
          style={{
            marginTop: 34,
            textAlign: "center",
            opacity: textIn,
            transform: `translateY(${textY}px)`,
            willChange: "transform, opacity",
            maxWidth: 940,
          }}
        >
          <div
            style={{
              fontFamily: AR,
              fontWeight: 800,
              fontSize: 48,
              color: "white",
              letterSpacing: "-0.02em",
              lineHeight: 1.45,
              textShadow: "0 2px 18px rgba(0,0,0,0.55)",
            }}
          >
            <span>عيينا من </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800 }}>community</span>
            <span> تع </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800 }}>cyber security</span>
            <span> في الدزاير</span>
          </div>
          <div
            style={{
              marginTop: 14,
              width: 84,
              height: 2,
              background: "rgba(255,255,255,0.14)",
              borderRadius: 999,
              marginLeft: "auto",
              marginRight: "auto",
              opacity: textIn,
              transform: `scaleX(${textIn})`,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 2: text hook card
const TiredScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const divIn = interpolate(frame, [40, 56], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 44px" }}>
        <div dir="rtl" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", fontFamily: AR, fontWeight: 800, fontSize: 52, lineHeight: 1.6, textAlign: "center", maxWidth: 960 }}>
          {"مشكل صناع المحتوى تع cyber security في الدزاير".split(" ").map((w, i) => (
            <Word key={i} w={w} idx={i} start={10} mono={w === "cyber" || w === "security"} />
          ))}
        </div>
        <div style={{ marginTop: 18, width: 84, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, opacity: divIn, transform: "scaleX(" + divIn + ")" }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 3: same topics for years + old pic
const TiredScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgIn = spring({ frame: frame + 10, fps, config: { damping: 17, stiffness: 130 } });
  const textIn = interpolate(frame, [16, 34], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 48px" }}>
        <div
          style={{
            opacity: interpolate(imgIn, [0, 1], [0.4, 1]),
            transform: "translateY(" + interpolate(imgIn, [0, 1], [18, 0]) + "px) scale(" + interpolate(imgIn, [0, 1], [0.86, 1]) + ")",
            filter: "drop-shadow(0 18px 42px rgba(0,0,0,0.65))",
            display: "flex",
          }}
        >
          <Img
            src={staticFile("tired-old.jpg")}
            style={{ width: 620, height: 460, objectFit: "cover", display: "block", borderRadius: 18, border: "1px solid rgba(255,255,255,0.10)" }}
          />
        </div>
        <div dir="rtl" style={{ marginTop: 32, textAlign: "center", opacity: textIn, transform: "translateY(" + interpolate(textIn, [0, 1], [14, 0]) + "px)" }}>
          <div style={{ fontFamily: AR, fontWeight: 800, fontSize: 48, color: "white", lineHeight: 1.4, textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}>
            <span>نفس </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800 }}>topics</span>
            <span> يتعاودو من سنوات</span>
          </div>
          <div style={{ marginTop: 14, width: 84, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, marginInline: "auto", opacity: textIn, transform: "scaleX(" + textIn + ")" }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 4: recycled topics flying around + line under
const TOPICS = ["SQL Injection", "XSS", "Brute Force", "Nmap", "Kali Linux"];

const TiredScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const R = 330;
  const CX = 540;
  const CY = 780;
  const rot = interpolate(frame, [20, 200], [0, Math.PI * 2 * 0.6], { easing: Easing.inOut(Easing.sin), extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const textIn = interpolate(frame, [30, 50], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 1080, height: 900 }}>
          {/* dim old pic in center */}
          <div style={{ position: "absolute", left: CX, top: CY, transform: "translate(-50%,-50%)", opacity: interpolate(frame, [8, 26], [0, 0.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
            <Img src={staticFile("tired-old.jpg")} style={{ width: 220, height: 170, objectFit: "cover", display: "block", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }} />
          </div>
          {TOPICS.map((t, i) => {
            const enter = spring({ frame: frame - (12 + i * 9), fps, config: { damping: 16, stiffness: 130 } });
            const angle = rot + (i * Math.PI * 2) / TOPICS.length - Math.PI / 2;
            const x = CX + Math.cos(angle) * R;
            const y = CY + Math.sin(angle) * R * 0.6;
            const depth = (Math.sin(angle) + 1) / 2;
            return (
              <div key={t} style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-50%)", opacity: enter * (0.55 + depth * 0.45), filter: "blur(" + ((1 - depth) * 1.4) + "px) drop-shadow(0 12px 28px rgba(0,0,0,0.6))" }}>
                <div style={{ transform: "scale(" + (interpolate(enter, [0, 1], [0.6, 1]) * (0.85 + depth * 0.25)) + ")" }}>
                  <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 21, color: "white", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", padding: "10px 22px", borderRadius: 999, whiteSpace: "nowrap" }}>{t}</span>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 150, pointerEvents: "none" }}>
        <div dir="rtl" style={{ opacity: textIn, transform: "translateY(" + interpolate(textIn, [0, 1], [14, 0]) + "px)", textAlign: "center" }}>
          <div style={{ fontFamily: AR, fontWeight: 800, fontSize: 46, color: "white", textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}>
            بلا سياق حقيقي
          </div>
          <div style={{ marginTop: 12, width: 72, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, marginInline: "auto", opacity: textIn, transform: "scaleX(" + textIn + ")" }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 5: techniques aren't dead — presentation is. Cascade visual below text.
const TiredScene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = [0, 1, 2, 3, 4, 5].map(i =>
    interpolate(frame, [10 + i * 14, 26 + i * 14], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  );

  const steps = [
    { t: "Old Concept", c: "rgba(255,255,255,0.9)" },
    { t: "Modern Infrastructure", c: "#5B9DFF" },
    { t: "New Attack Chain", c: "#22C55E" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 84 }}>
        <div dir="rtl" style={{ textAlign: "center", maxWidth: 960, padding: "0 40px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ opacity: lines[0], transform: "translateY(" + interpolate(lines[0], [0, 1], [14, 0]) + "px)", fontFamily: AR, fontWeight: 700, fontSize: 34, color: "rgba(255,255,255,0.85)" }}>
            والمشكل مش أن هاد التقنيات قديمة.
          </div>
          {[
            { a: "SQLi", b: " ما ماتتش." },
            { a: "XSS", b: " ما ماتتش." },
            { a: "Nmap", b: " ما ماتش." },
          ].map((l, k) => (
            <div key={l.a} dir="rtl" style={{ opacity: lines[k + 1], transform: "translateY(" + interpolate(lines[k + 1], [0, 1], [14, 0]) + "px) scale(" + interpolate(lines[k + 1], [0, 1], [0.96, 1]) + ")", fontFamily: AR, fontWeight: 800, fontSize: 40, color: "white" }}>
              <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 900, color: "#5B9DFF" }}>{l.a}</span>
              <span>{l.b}</span>
            </div>
          ))}
          <div style={{ opacity: lines[4], transform: "translateY(" + interpolate(lines[4], [0, 1], [14, 0]) + "px)", fontFamily: AR, fontWeight: 700, fontSize: 32, color: "rgba(255,255,255,0.85)" }}>
            المشكل هو أنك تقدمها بنفس الطريقة
          </div>
          <div style={{ opacity: lines[5], transform: "translateY(" + interpolate(lines[5], [0, 1], [14, 0]) + "px)", fontFamily: AR, fontWeight: 700, fontSize: 30, color: "rgba(255,255,255,0.75)" }}>
            <span>وكأن الـ </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 800, color: "#5B9DFF" }}>threat landscape</span>
            <span> ما تبدلش.</span>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 130 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {steps.map((s, i) => {
            const p = spring({ frame: frame - (110 + i * 28), fps, config: { damping: 15, stiffness: 130 } });
            const last = i === steps.length - 1;
            return (
              <div key={s.t} style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: p }}>
                <div style={{ transform: "scale(" + interpolate(p, [0, 1], [0.85, 1]) + ")", fontFamily: MONO, fontWeight: 900, fontSize: last ? 32 : 28, color: "white", border: "1.5px solid " + s.c, padding: last ? "16px 42px" : "13px 34px", borderRadius: 20, boxShadow: "0 0 " + (last ? 38 : 20) + "px " + s.c + "44", whiteSpace: "nowrap", background: "rgba(0,0,0,0.6)" }}>{s.t}</div>
                {i < steps.length - 1 && (
                  <div style={{ position: "relative", width: 2, height: 40, background: "rgba(255,255,255,0.10)", borderRadius: 999, margin: "7px 0", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: interpolate(frame, [134 + i * 28, 152 + i * 28], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) + "%", background: s.c }} />
                    <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: "9px solid " + s.c, opacity: interpolate(frame, [146 + i * 28, 156 + i * 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Tired: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Sequence from={0} durationInFrames={150}>
        <TiredScene1 />
      </Sequence>
      <Sequence from={150} durationInFrames={130}>
        <TiredScene2 />
      </Sequence>
      <Sequence from={280} durationInFrames={200}>
        <TiredScene3 />
      </Sequence>
      <Sequence from={480} durationInFrames={250}>
        <TiredScene4 />
      </Sequence>
      <Sequence from={730} durationInFrames={280}>
        <TiredScene5 />
      </Sequence>
    </AbsoluteFill>
  );
};

export const TIRED_DURATION = 1010;
export const TIRED_FPS = 30;
export const TIRED_WIDTH = 1080;
export const TIRED_HEIGHT = 1920;

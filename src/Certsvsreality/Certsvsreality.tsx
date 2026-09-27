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
  Video,
  Sequence,
} from "remotion";

// Scene 1 (hook): usual coding background, image in middle, clean text under
const CertsvsrealityScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);

  // Image enter: spring pop, keeps quality
  const imgProgress = spring({
    frame: frame + 12,
    fps,
    config: { damping: 16, stiffness: 130 },
  });
  const imgScale = interpolate(imgProgress, [0, 1], [0.86, 1]);
  const imgOpacity = interpolate(imgProgress, [0, 1], [0.4, 1]);
  const imgY = interpolate(imgProgress, [0, 1], [18, 0]);

  // Text under it: simple clean fade + slide up
  const textIn = interpolate(frame, [6, 22], [0, 1], {
    easing: SMOOTH,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(textIn, [0, 1], [14, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.58)" }} />
      {/* Center column: image mid-size in middle + clean text under */}
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
            opacity: imgOpacity,
            transform: `translateY(${imgY}px) scale(${imgScale})`,
            willChange: "transform, opacity",
            filter:
              "drop-shadow(0 18px 42px rgba(0,0,0,0.65)) drop-shadow(0 0 18px rgba(255,255,255,0.04))",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("certs-hook.png")}
            style={{
              width: 680,
              height: 850,
              objectFit: "contain",
              display: "block",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
        </div>

        <div
          dir="rtl"
          style={{
            marginTop: 32,
            textAlign: "center",
            opacity: textIn,
            transform: `translateY(${textY}px)`,
            willChange: "transform, opacity",
          }}
        >
          <div
            style={{
              fontFamily: "Cairo, Changa, sans-serif",
              fontWeight: 800,
              fontSize: 52,
              color: "white",
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
              textShadow: "0 2px 18px rgba(0,0,0,0.55)",
            }}
          >
            الفراغ بين الشهادة وبيئة العمل
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

// Scene 2: exam sentence + pic, then both disappear into fixed Q&A sentence + two memes together
const CertsvsrealityScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);

  // Part A enter
  const aImg = spring({ frame: frame + 12, fps, config: { damping: 16, stiffness: 130 } });
  const aText = interpolate(frame, [6, 22], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Both disappear
  const aOut = interpolate(frame, [128, 144], [1, 0], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Part B enter
  const bImgs = spring({ frame: frame - 152, fps, config: { damping: 16, stiffness: 130 } });
  const bText = interpolate(frame, [158, 176], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const bg = (
    <>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.58)" }} />
    </>
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {bg}
      {/* PART A */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 48px", opacity: aOut }}>
        <div style={{ opacity: interpolate(aImg, [0, 1], [0.4, 1]), transform: `translateY(${interpolate(aImg, [0, 1], [18, 0])}px) scale(${interpolate(aImg, [0, 1], [0.86, 1])})`, filter: "drop-shadow(0 18px 42px rgba(0,0,0,0.65))", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Img src={staticFile("certs-exam.jpg")} style={{ width: 560, height: 560, objectFit: "cover", display: "block", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }} />
        </div>
        <div dir="rtl" style={{ marginTop: 32, textAlign: "center", opacity: aText, transform: `translateY(${interpolate(aText, [0, 1], [14, 0])}px)` }}>
          <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontWeight: 800, fontSize: 48, color: "white", lineHeight: 1.35, textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}>
            الشهادات تختابر مفاهيم محددة من قبل
          </div>
          <div style={{ marginTop: 14, width: 84, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, marginInline: "auto", opacity: aText, transform: `scaleX(${aText})` }} />
        </div>
      </AbsoluteFill>

      {/* PART B: both images with each other */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 40px", opacity: interpolate(frame, [144, 158], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <div style={{ opacity: interpolate(bImgs, [0, 1], [0.4, 1]), transform: `translateY(${interpolate(bImgs, [0, 1], [18, 0])}px) scale(${interpolate(bImgs, [0, 1], [0.86, 1])})`, display: "flex", gap: 18, justifyContent: "center", alignItems: "center" }}>
          {["certs-meme1.jpg", "certs-meme2.jpg"].map(f => (
            <div key={f} style={{ filter: "drop-shadow(0 18px 42px rgba(0,0,0,0.65))", display: "flex" }}>
              <Img src={staticFile(f)} style={{ width: 440, height: 440, objectFit: "cover", display: "block", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }} />
            </div>
          ))}
        </div>
        <div dir="rtl" style={{ marginTop: 32, textAlign: "center", opacity: bText, transform: `translateY(${interpolate(bText, [0, 1], [14, 0])}px)`, maxWidth: 960 }}>
          <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontWeight: 800, fontSize: 42, color: "white", lineHeight: 1.45, textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}>
            من اسئلة وسيناريو ثابت عندو اجابة وحده صحية
          </div>
          <div style={{ marginTop: 14, width: 84, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, marginInline: "auto", opacity: bText, transform: `scaleX(${bText})` }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 3: exam focus text, then work reality text + pic
const CertsvsrealityScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);

  // Part A: word-by-word text + vm chip
  const vmIn = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 140 } });
  const aOut = interpolate(frame, [138, 154], [1, 0], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Part B enter
  const bImg = spring({ frame: frame - 162, fps, config: { damping: 16, stiffness: 130 } });
  const bText = interpolate(frame, [168, 186], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const words = "تسمى اختبار الشهادة يركز على المدى تذكر وفهمك للتقنية , راح تجاوب على اسئلة وتطبق في".split(" ");

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.58)" }} />

      {/* PART A */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 44px", opacity: aOut }}>
        <div dir="rtl" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, fontFamily: "Cairo, Changa, sans-serif", fontWeight: 800, fontSize: 44, lineHeight: 1.5, textAlign: "center", maxWidth: 960 }}>
          {words.map((w, i) => {
            const p = spring({ frame: frame - (8 + i * 4), fps, config: { damping: 14, stiffness: 160 } });
            return (
              <span key={i} style={{ display: "inline-block", opacity: p, transform: `translateY(${interpolate(p, [0, 1], [16, 0])}px)`, color: "white", textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}>{w}</span>
            );
          })}
          {(() => {
            const p = spring({ frame: frame - (8 + words.length * 4), fps, config: { damping: 14, stiffness: 160 } });
            return (
              <span style={{ display: "inline-block", opacity: p, transform: `translateY(${interpolate(p, [0, 1], [16, 0])}px) scale(${interpolate(p, [0, 1], [0.8, 1])})`, fontFamily: "JetBrains Mono, monospace", fontWeight: 900, fontSize: 40, color: "#000", background: "white", padding: "2px 18px", borderRadius: 999, marginRight: 6 }}>vm</span>
            );
          })()}
        </div>
        <div style={{ marginTop: 22, opacity: vmIn, transform: `translateY(${interpolate(vmIn, [0, 1], [14, 0])}px) scale(${interpolate(vmIn, [0, 1], [0.92, 1])})`, width: 420, borderRadius: 16, background: "#0B0D11", border: "1px solid rgba(255,255,255,0.14)", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
            {[0, 1, 2].map(k => <span key={k} style={{ width: 9, height: 9, borderRadius: 999, background: "rgba(255,255,255,0.25)" }} />)}
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "rgba(255,255,255,0.55)", marginLeft: 4 }}>exam-vm</span>
            <span style={{ marginLeft: "auto", fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#22C55E", background: "rgba(34,197,94,0.12)", padding: "3px 10px", borderRadius: 999 }}>● RUNNING</span>
          </div>
          <div style={{ padding: "14px 16px", fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "rgba(255,255,255,0.8)", direction: "ltr" }}>
            <div>$ answer --question 12</div>
            <div style={{ color: "#22C55E" }}>✓ correct — next…</div>
          </div>
        </div>
      </AbsoluteFill>

      {/* PART B */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 48px", opacity: interpolate(frame, [154, 168], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <div style={{ opacity: interpolate(bImg, [0, 1], [0.4, 1]), transform: `translateY(${interpolate(bImg, [0, 1], [18, 0])}px) scale(${interpolate(bImg, [0, 1], [0.86, 1])})`, filter: "drop-shadow(0 18px 42px rgba(0,0,0,0.65))", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Img src={staticFile("certs-solder.jpg")} style={{ width: 560, height: 560, objectFit: "cover", display: "block", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }} />
        </div>
        <div dir="rtl" style={{ marginTop: 32, textAlign: "center", opacity: bText, transform: `translateY(${interpolate(bText, [0, 1], [14, 0])}px)` }}>
          <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontWeight: 800, fontSize: 52, color: "white", lineHeight: 1.3, textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}>
            بيئة العمل مشي هاك
          </div>
          <div style={{ marginTop: 14, width: 84, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, marginInline: "auto", opacity: bText, transform: `scaleX(${bText})` }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 4: alert fatigue + scattered reality
const CertsvsrealityScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);

  // Part A enter
  const aImg = spring({ frame: frame + 12, fps, config: { damping: 16, stiffness: 130 } });
  const aText = interpolate(frame, [6, 22], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Both disappear
  const aOut = interpolate(frame, [128, 144], [1, 0], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Part B enter
  const bImg = spring({ frame: frame - 152, fps, config: { damping: 16, stiffness: 130 } });
  const bText = interpolate(frame, [158, 176], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Video src={staticFile("coding-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} loop muted />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.58)" }} />

      {/* PART A */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 48px", opacity: aOut }}>
        <div style={{ opacity: interpolate(aImg, [0, 1], [0.4, 1]), transform: `translateY(${interpolate(aImg, [0, 1], [18, 0])}px) scale(${interpolate(aImg, [0, 1], [0.86, 1])})`, filter: "drop-shadow(0 18px 42px rgba(0,0,0,0.65))", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Img src={staticFile("certs-shinji.png")} style={{ width: 560, height: 640, objectFit: "contain", display: "block" }} />
        </div>
        <div dir="rtl" style={{ marginTop: 32, textAlign: "center", opacity: aText, transform: `translateY(${interpolate(aText, [0, 1], [14, 0])}px)` }}>
          <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontWeight: 800, fontSize: 50, color: "white", lineHeight: 1.35, textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}>
            <span>راح تعاني من </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: "JetBrains Mono, monospace", fontWeight: 800 }}>alert fatigue</span>
          </div>
          <div style={{ marginTop: 14, width: 84, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, marginInline: "auto", opacity: aText, transform: `scaleX(${aText})` }} />
        </div>
      </AbsoluteFill>

      {/* PART B */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 48px", opacity: interpolate(frame, [144, 158], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <div style={{ opacity: interpolate(bImg, [0, 1], [0.4, 1]), transform: `translateY(${interpolate(bImg, [0, 1], [18, 0])}px) scale(${interpolate(bImg, [0, 1], [0.86, 1])})`, filter: "drop-shadow(0 18px 42px rgba(0,0,0,0.65))", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Img src={staticFile("certs-gome.jpg")} style={{ width: 660, height: 450, objectFit: "cover", display: "block", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }} />
        </div>
        <div dir="rtl" style={{ marginTop: 32, textAlign: "center", opacity: bText, transform: `translateY(${interpolate(bText, [0, 1], [14, 0])}px)`, maxWidth: 940 }}>
          <div style={{ fontFamily: "Cairo, Changa, sans-serif", fontWeight: 800, fontSize: 44, color: "white", lineHeight: 1.5, textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}>
            <span>و </span>
            <span dir="ltr" style={{ display: "inline-block", fontFamily: "JetBrains Mono, monospace", fontWeight: 800 }}>logs</span>
            <span> المتفرقة والقرارات المتغيرة والادوات والضغط</span>
          </div>
          <div style={{ marginTop: 14, width: 84, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, marginInline: "auto", opacity: bText, transform: `scaleX(${bText})` }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Usual background (same as "vs" video and others): coding-bg.mp4 + dark overlay.
// Script scenes will be added here.
export const Certsvsreality: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Sequence from={0} durationInFrames={150}>
        <CertsvsrealityScene1 />
      </Sequence>
      <Sequence from={150} durationInFrames={300}>
        <CertsvsrealityScene2 />
      </Sequence>
      <Sequence from={450} durationInFrames={300}>
        <CertsvsrealityScene3 />
      </Sequence>
      <Sequence from={750} durationInFrames={300}>
        <CertsvsrealityScene4 />
      </Sequence>
    </AbsoluteFill>
  );
};

export const CERTSVSREALITY_DURATION = 1050;
export const CERTSVSREALITY_FPS = 30;
export const CERTSVSREALITY_WIDTH = 1080;
export const CERTSVSREALITY_HEIGHT = 1920;

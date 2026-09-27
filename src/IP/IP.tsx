import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  ShieldOff,
  Droplets,
  Globe,
  Eye,
  Fingerprint,
  Type,
  Moon,
  Clock3,
  MapPin,
  FileX2,
  ImageDown,
  BarChart3,
  ShieldAlert,
  WifiOff,
  Search,
  BookOpen,
  Brain,
  GraduationCap,
} from "lucide-react";

// tiny helper for fade+slide text
const useTextIn = (localFrame: number, fps: number, delay = 4) => {
  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);
  const p = interpolate(localFrame, [delay, delay + 16], [0, 1], {
    easing: SMOOTH,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(p, [0, 1], [16, 0]);
  return { p, y };
};

const IconWrap: React.FC<{
  progress: number;
  y: number;
  children: React.ReactNode;
}> = ({ progress, y, children }) => {
  const scale = interpolate(progress, [0, 1], [0.7, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        willChange: "transform, opacity",
        filter: "drop-shadow(0 12px 32px rgba(255,255,255,0.08))",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

export const IP: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);

  // Scene 1 & 2 (image scenes) — keep original math
  const text1In = interpolate(frame, [4, 20], [0, 1], {
    easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const text1Y = interpolate(text1In, [0, 1], [16, 0]);
  const img1P = spring({ frame: frame - 10, fps, config: { damping: 18, stiffness: 120 } });
  const img1Scale = interpolate(img1P, [0, 1], [0.88, 1]);
  const img1Opacity = interpolate(img1P, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const img1Y = interpolate(img1P, [0, 1], [24, 0]);

  const s2Frame = frame - 150;
  const text2In = interpolate(s2Frame, [4, 20], [0, 1], {
    easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const text2Y = interpolate(text2In, [0, 1], [16, 0]);
  const img2P = spring({ frame: s2Frame - 10, fps, config: { damping: 18, stiffness: 120 } });
  const img2Scale = interpolate(img2P, [0, 1], [0.88, 1]);
  const img2Opacity = interpolate(img2P, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const img2Y = interpolate(img2P, [0, 1], [24, 0]);

  // Shared helpers for icon scenes (each scene is 120f)
  const SCENE_LEN = 120;
  const makeScene = (start: number) => {
    const lf = frame - start;
    const t = useTextIn(lf, fps, 6);
    const iconP = spring({ frame: lf - 4, fps, config: { damping: 14, stiffness: 140 } });
    const iconY = interpolate(iconP, [0, 1], [18, 0]);
    return { lf, t, iconP, iconY };
  };

  const s3 = makeScene(300);
  const s4 = makeScene(420);
  const s5 = makeScene(540);
  const s6 = makeScene(660);
  const s7 = makeScene(780);
  const s8 = makeScene(900);
  const s9 = makeScene(1020);
  const s10 = makeScene(1140);

  // icons are fixed and clean — no pulse/shake, only entrance fade/scale via IconWrap

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Scene 1: 0-150 FBI */}
      <Sequence from={0} durationInFrames={150} name="S1-FBI">
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 48px" }}>
          <div dir="rtl" style={{ textAlign: "center", opacity: text1In, transform: `translateY(${text1Y}px)`, marginBottom: 36 }}>
            <div style={{ fontFamily: "Cairo, Changa, Tajawal, sans-serif", fontWeight: 800, fontSize: 64, color: "#fff", lineHeight: 1.2, whiteSpace: "nowrap" }}>بدلت ip ملا؟</div>
            <div style={{ marginTop: 16, width: 72, height: 2, background: "rgba(255,255,255,0.18)", borderRadius: 999, margin: "16px auto 0", opacity: text1In, transform: `scaleX(${text1In})` }} />
          </div>
          <div style={{ opacity: img1Opacity, transform: `translateY(${img1Y}px) scale(${img1Scale})`, filter: "drop-shadow(0 18px 42px rgba(0,0,0,0.65))" }}>
            <Img src={staticFile("hook_fbi.jpg")} style={{ width: 640, height: 480, objectFit: "contain", display: "block" }} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: 150-300 Cooked */}
      <Sequence from={150} durationInFrames={150} name="S2-Cooked">
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 48px" }}>
          <div dir="rtl" style={{ textAlign: "center", opacity: text2In, transform: `translateY(${text2Y}px)`, marginBottom: 32 }}>
            <div style={{ fontFamily: "Cairo, Changa, Tajawal, sans-serif", fontWeight: 800, fontSize: 60, color: "#fff", lineHeight: 1.25, whiteSpace: "nowrap" }}>بصح نسيت شوي هاذو</div>
            <div style={{ marginTop: 14, width: 72, height: 2, background: "rgba(255,255,255,0.18)", borderRadius: 999, margin: "14px auto 0", opacity: text2In, transform: `scaleX(${text2In})` }} />
          </div>
          <div style={{ opacity: img2Opacity, transform: `translateY(${img2Y}px) scale(${img2Scale})`, filter: "drop-shadow(0 18px 42px rgba(0,0,0,0.65))" }}>
            <Img src={staticFile("denji_im_cooked.jpg")} style={{ width: 640, height: 640, objectFit: "contain", display: "block" }} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: 300-420 VPN DNS leak */}
      <Sequence from={300} durationInFrames={SCENE_LEN} name="S3-VPN-DNS">
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 56px" }}>
          <IconWrap progress={s3.iconP} y={s3.iconY}>
            <div style={{ position: "relative", width: 140, height: 140, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <ShieldOff size={92} color="#fff" strokeWidth={1.7} />
              <Droplets size={28} color="#7dd3fc" style={{ position: "absolute", right: 6, bottom: 12 }} />
              <WifiOff size={22} color="#f87171" style={{ position: "absolute", left: 4, top: 8 }} />
            </div>
          </IconWrap>
          <div dir="rtl" style={{ marginTop: 28, textAlign: "center", opacity: s3.t.p, transform: `translateY(${s3.t.y}px)` }}>
            <div style={{ fontFamily: "Cairo, Tajawal, sans-serif", fontWeight: 800, fontSize: 44, color: "#fff", lineHeight: 1.35 }}>نسيت بلي <span style={{ color: "#facc15" }}>vpn</span> ميوقفش <span style={{ color: "#f87171" }}>dns leak</span></div>
            <div style={{ marginTop: 10, fontFamily: "Cairo, sans-serif", fontWeight: 600, fontSize: 22, color: "rgba(255,255,255,0.55)", letterSpacing: 0.2 }}>DNS يتسرب حتى مع VPN</div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: 420-540 WebRTC */}
      <Sequence from={420} durationInFrames={SCENE_LEN} name="S4-WebRTC">
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 56px" }}>
          <IconWrap progress={s4.iconP} y={s4.iconY}>
            <div style={{ position: "relative", width: 150, height: 120, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Globe size={86} color="#fff" strokeWidth={1.6} />
              <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Eye size={44} color="#38bdf8" strokeWidth={1.8} style={{ background: "rgba(56,189,248,0.12)", borderRadius: 999, padding: 6 }} />
              </div>
              <Search size={20} color="rgba(255,255,255,0.7)" style={{ position: "absolute", right: 0, top: 6 }} />
            </div>
          </IconWrap>
          <div dir="rtl" style={{ marginTop: 28, textAlign: "center", opacity: s4.t.p, transform: `translateY(${s4.t.y}px)` }}>
            <div style={{ fontFamily: "Cairo, Tajawal, sans-serif", fontWeight: 800, fontSize: 38, color: "#fff", lineHeight: 1.35 }}>
              ونسيت بلي <span style={{ color: "#38bdf8" }}>webrtc</span> يكشف <span style={{ color: "#38bdf8" }}>ip</span> تاع جهازك
            </div>
            <div style={{ marginTop: 6, fontFamily: "Cairo, sans-serif", fontWeight: 800, fontSize: 34, color: "#fff", lineHeight: 1.2 }}>من <span style={{ color: "#a78bfa" }}>browser</span></div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5: 540-660 Fingerprinting writing style */}
      <Sequence from={540} durationInFrames={SCENE_LEN} name="S5-Fingerprint">
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 56px" }}>
          <IconWrap progress={s5.iconP} y={s5.iconY}>
            <div style={{ position: "relative", width: 140, height: 140, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Fingerprint size={96} color="#fff" strokeWidth={1.4} />
              <Type size={26} color="#facc15" style={{ position: "absolute", right: 2, bottom: 16, background: "rgba(250,204,21,0.14)", borderRadius: 8, padding: 3 }} />
            </div>
          </IconWrap>
          <div dir="rtl" style={{ marginTop: 28, textAlign: "center", opacity: s5.t.p, transform: `translateY(${s5.t.y}px)` }}>
            <div style={{ fontFamily: "Cairo, Tajawal, sans-serif", fontWeight: 800, fontSize: 36, color: "#fff", lineHeight: 1.35 }}>ونسيت بلي الاسلوب لي تكتب بيه</div>
            <div style={{ marginTop: 6, fontFamily: "Cairo, Tajawal, sans-serif", fontWeight: 800, fontSize: 42, color: "#facc15", lineHeight: 1.2 }}>راه fingerprint</div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 6: 660-780 Sleep 2-9 timezone */}
      <Sequence from={660} durationInFrames={SCENE_LEN} name="S6-Sleep">
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 56px" }}>
          <IconWrap progress={s6.iconP} y={s6.iconY}>
            <div style={{ position: "relative", width: 160, height: 110, display: "flex", justifyContent: "center", alignItems: "center", gap: 14 }}>
              <Moon size={52} color="#e0e7ff" fill="rgba(224,231,255,0.12)" />
              <Clock3 size={54} color="#fff" strokeWidth={1.6} />
              <MapPin size={38} color="#f87171" fill="rgba(248,113,113,0.15)" />
            </div>
          </IconWrap>
          <div dir="rtl" style={{ marginTop: 28, textAlign: "center", opacity: s6.t.p, transform: `translateY(${s6.t.y}px)` }}>
            <div style={{ fontFamily: "Cairo, Tajawal, sans-serif", fontWeight: 800, fontSize: 34, color: "#fff", lineHeight: 1.4 }}>ونسيت بلي كي ترقد من <span style={{ color: "#a78bfa" }}>2 لل 9</span></div>
            <div style={{ marginTop: 6, fontFamily: "Cairo, Tajawal, sans-serif", fontWeight: 700, fontSize: 28, color: "rgba(255,255,255,0.88)", lineHeight: 1.35 }}>تكشف الموقع زمني تقريبي لنطاقك</div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 7: 780-900 Metadata */}
      <Sequence from={780} durationInFrames={SCENE_LEN} name="S7-Metadata">
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 56px" }}>
          <IconWrap progress={s7.iconP} y={s7.iconY}>
            <div style={{ position: "relative", width: 150, height: 130, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ position: "relative", background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.18)", borderRadius: 18, width: 92, height: 110, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <FileX2 size={48} color="#fff" strokeWidth={1.6} />
              </div>
              <ImageDown size={34} color="#38bdf8" style={{ position: "absolute", right: 4, bottom: 8, background: "rgba(56,189,248,0.12)", borderRadius: 10, padding: 5 }} />
            </div>
          </IconWrap>
          <div dir="rtl" style={{ marginTop: 28, textAlign: "center", opacity: s7.t.p, transform: `translateY(${s7.t.y}px)` }}>
            <div style={{ fontFamily: "Cairo, Tajawal, sans-serif", fontWeight: 800, fontSize: 36, color: "#fff", lineHeight: 1.35 }}>ودايمن تنسى تمحي <span style={{ color: "#38bdf8" }}>metadata</span></div>
            <div style={{ marginTop: 6, fontFamily: "Cairo, Tajawal, sans-serif", fontWeight: 700, fontSize: 28, color: "rgba(255,255,255,0.88)" }}>قبل مترسل <span style={{ color: "#f87171" }}>file</span></div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 8: 900-1020 1% easiest */}
      <Sequence from={900} durationInFrames={SCENE_LEN} name="S8-1percent">
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 56px" }}>
          <IconWrap progress={s8.iconP} y={s8.iconY}>
            <div style={{ display: "flex", alignItems: "end", gap: 10, height: 90 }}>
              <div style={{ width: 22, height: 46, background: "rgba(255,255,255,0.18)", borderRadius: 6 }} />
              <div style={{ width: 22, height: 64, background: "rgba(255,255,255,0.28)", borderRadius: 6 }} />
              <div style={{ width: 22, height: 86, background: "#fff", borderRadius: 6, boxShadow: "0 0 20px rgba(255,255,255,0.25)" }} />
              <BarChart3 size={36} color="rgba(255,255,255,0.55)" style={{ marginLeft: 6, marginBottom: 4 }} />
            </div>
          </IconWrap>
          <div dir="rtl" style={{ marginTop: 30, textAlign: "center", opacity: s8.t.p, transform: `translateY(${s8.t.y}px)` }}>
            <div style={{ fontFamily: "Cairo, Tajawal, sans-serif", fontWeight: 800, fontSize: 36, color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>والمشكل هاذو كامل راهم</div>
            <div style={{ marginTop: 6, fontFamily: "Cairo, Tajawal, sans-serif", fontWeight: 900, fontSize: 56, color: "#facc15", lineHeight: 1 }}>1% <span style={{ fontSize: 32, color: "#fff", fontWeight: 800 }}>اسهل مستوى</span></div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 9: 1020-1140 OPSEC not easy */}
      <Sequence from={1020} durationInFrames={120} name="S9-OpsecHard">
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 56px" }}>
          <IconWrap progress={s9.iconP} y={s9.iconY}>
            <ShieldAlert size={88} color="#f87171" strokeWidth={1.6} fill="rgba(248,113,113,0.10)" />
          </IconWrap>
          <div dir="rtl" style={{ marginTop: 28, textAlign: "center", opacity: s9.t.p, transform: `translateY(${s9.t.y}px)` }}>
            <div style={{ fontFamily: "Cairo, Tajawal, sans-serif", fontWeight: 900, fontSize: 62, color: "#fff", letterSpacing: -1, lineHeight: 1.1 }}>opsec مشي ساهل</div>
            <div style={{ marginTop: 14, width: 84, height: 3, background: "#f87171", borderRadius: 999, margin: "14px auto 0", opacity: s9.t.p, transform: `scaleX(${s9.t.p})` }} />
            <div style={{ marginTop: 12, fontFamily: "Cairo, sans-serif", fontWeight: 700, fontSize: 20, color: "rgba(255,255,255,0.55)" }}>not easy — level 1%</div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 10: 1140-1290 Final - long learning intensive + don't be stupid */}
      <Sequence from={1140} durationInFrames={150} name="S10-Final">
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 56px" }}>
          <IconWrap progress={s10.iconP} y={s10.iconY}>
            <div style={{ position: "relative", width: 160, height: 120, display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
              <BookOpen size={56} color="#fff" strokeWidth={1.6} />
              <Brain size={62} color="#a78bfa" strokeWidth={1.6} fill="rgba(167,139,250,0.12)" />
              <GraduationCap size={52} color="#facc15" />
              <Search size={20} color="rgba(255,255,255,0.5)" style={{ position: "absolute", right: 6, top: 4 }} />
            </div>
          </IconWrap>
          <div dir="rtl" style={{ marginTop: 28, textAlign: "center", opacity: s10.t.p, transform: `translateY(${s10.t.y}px)` }}>
            <div style={{ fontFamily: "Cairo, Tajawal, sans-serif", fontWeight: 800, fontSize: 36, color: "#fff", lineHeight: 1.4 }}>تحتاج تعلم طويل</div>
            <div style={{ marginTop: 6, fontFamily: "Cairo, Tajawal, sans-serif", fontWeight: 800, fontSize: 36, color: "#fff", lineHeight: 1.4 }}>ومبحث مكثف</div>
            <div
              style={{
                marginTop: 20,
                fontFamily: "Inter, sans-serif",
                fontWeight: 900,
                fontSize: 38,
                color: "#f87171",
                letterSpacing: -0.5,
                textTransform: "uppercase",
                background: "rgba(248,113,113,0.10)",
                border: "1.5px solid rgba(248,113,113,0.25)",
                borderRadius: 12,
                padding: "8px 22px",
                display: "inline-block",
                transform: `scale(${0.96 + s10.t.p * 0.04})`,
              }}
            >
              don&apos;t be stupid
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

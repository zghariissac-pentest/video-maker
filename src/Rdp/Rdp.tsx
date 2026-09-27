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
  User,
  Server,
  Building2,
  ArrowRight,
  Scale,
  DatabaseZap,
  CreditCard,
  Receipt,
  ShieldAlert,
  Lock,
  FileWarning,
} from "lucide-react";

export const Rdp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);

  // Hook text animations — fixed clean, only entrance
  const titleIn = interpolate(frame, [6, 22], [0, 1], {
    easing: SMOOTH,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(titleIn, [0, 1], [16, 0]);

  const subIn = interpolate(frame, [18, 34], [0, 1], {
    easing: SMOOTH,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(subIn, [0, 1], [14, 0]);

  // Image smooth spring in middle — hook
  const imgP = spring({ frame: frame - 8, fps, config: { damping: 18, stiffness: 120 } });
  const imgScale = interpolate(imgP, [0, 1], [0.88, 1]);
  const imgOpacity = interpolate(imgP, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const imgY = interpolate(imgP, [0, 1], [24, 0]);

  // Scene 2 helpers (180+140)
  const s2Frame = frame - 180;
  const s2TextIn = interpolate(s2Frame, [6, 22], [0, 1], {
    easing: SMOOTH,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s2TextY = interpolate(s2TextIn, [0, 1], [16, 0]);
  const s2ImgP = spring({ frame: s2Frame - 8, fps, config: { damping: 18, stiffness: 120 } });
  const s2ImgScale = interpolate(s2ImgP, [0, 1], [0.88, 1]);
  const s2ImgOpacity = interpolate(s2ImgP, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const s2ImgY = interpolate(s2ImgP, [0, 1], [24, 0]);

  // Scene 3 helpers (320+160)
  const s3Frame = frame - 320;
  const s3TextIn = interpolate(s3Frame, [6, 22], [0, 1], {
    easing: SMOOTH,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s3TextY = interpolate(s3TextIn, [0, 1], [16, 0]);

  // staggered reveals to explain idea step-by-step
  const s3a1 = interpolate(s3Frame, [18, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: SMOOTH });
  const s3a1Y = interpolate(s3a1, [0, 1], [12, 0]);
  const s3a2 = interpolate(s3Frame, [44, 58], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: SMOOTH });
  const s3a2Y = interpolate(s3a2, [0, 1], [12, 0]);
  const s3a3 = interpolate(s3Frame, [70, 84], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: SMOOTH });
  const s3a3Y = interpolate(s3a3, [0, 1], [12, 0]);
  const s3a4 = interpolate(s3Frame, [96, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: SMOOTH });
  const s3a4Y = interpolate(s3a4, [0, 1], [12, 0]);

  // arrow progress
  const s3Arrow = interpolate(s3Frame, [24, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Scene 4 — new (480+140)
  const s4Frame = frame - 480;
  const s4TextIn = interpolate(s4Frame, [6, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: SMOOTH });
  const s4TextY = interpolate(s4TextIn, [0, 1], [16, 0]);
  const s4IconP = spring({ frame: s4Frame - 6, fps, config: { damping: 14, stiffness: 140 } });
  const s4IconScale = interpolate(s4IconP, [0, 1], [0.82, 1]);

  // Scene 5 — last (620+140)
  const s5Frame = frame - 620;
  const s5TextIn = interpolate(s5Frame, [6, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: SMOOTH });
  const s5TextY = interpolate(s5TextIn, [0, 1], [16, 0]);
  const s5IconP = spring({ frame: s5Frame - 6, fps, config: { damping: 14, stiffness: 140 } });
  const s5IconScale = interpolate(s5IconP, [0, 1], [0.82, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Sequence from={0} durationInFrames={180} name="Hook-RDP">
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 48px" }}>
          {/* Title */}
          <div
            dir="rtl"
            style={{
              textAlign: "center",
              opacity: titleIn,
              transform: `translateY(${titleY}px)`,
              willChange: "transform, opacity",
            }}
          >
            <div
              style={{
                fontFamily: "Cairo, Changa, Tajawal, sans-serif",
                fontWeight: 900,
                fontSize: 62,
                color: "#fff",
                lineHeight: 1.15,
                letterSpacing: -0.5,
              }}
            >
              <span style={{ color: "#facc15" }}>rdp</span> وراك فريتها
            </div>
            <div
              style={{
                marginTop: 12,
                width: 72,
                height: 2,
                background: "rgba(255,255,255,0.18)",
                borderRadius: 999,
                marginLeft: "auto",
                marginRight: "auto",
                opacity: titleIn,
                transform: `scaleX(${titleIn})`,
              }}
            />
          </div>

          {/* Image middle — exact picture, no editing, no filter */}
          <div
            style={{
              marginTop: 30,
              opacity: imgOpacity,
              transform: `translateY(${imgY}px) scale(${imgScale})`,
              willChange: "transform, opacity",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Img
              key="rdp-hook-img"
              src={staticFile("rdp_hook_jpg4.jpg")}
              style={{
                width: 520,
                height: 520,
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>

          {/* Subtitle — two lines */}
          <div
            dir="rtl"
            style={{
              marginTop: 28,
              textAlign: "center",
              opacity: subIn,
              transform: `translateY(${subY}px)`,
              willChange: "transform, opacity",
              maxWidth: 980,
            }}
          >
            <div
              style={{
                fontFamily: "Cairo, Tajawal, sans-serif",
                fontWeight: 700,
                fontSize: 30,
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.45,
              }}
            >
              هذي الجملة وحدها تبين فهم خطأ للـ <span style={{ color: "#f87171", fontWeight: 800 }}>opsec</span>
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: "Cairo, Tajawal, sans-serif",
                fontWeight: 700,
                fontSize: 30,
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.45,
              }}
            >
              بسك راك حاسبو <span style={{ color: "#38bdf8", fontWeight: 800 }}>اداة</span> و <span style={{ color: "#a78bfa", fontWeight: 800 }}>gg</span>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: 180-300 — ذي الجملة وحدها ... */}
      <Sequence from={180} durationInFrames={140} name="S2-OpsecTech">
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 48px" }}>
          <div
            dir="rtl"
            style={{
              textAlign: "center",
              opacity: s2TextIn,
              transform: `translateY(${s2TextY}px)`,
              willChange: "transform, opacity",
              marginBottom: 28,
            }}
          >
            <div
              style={{
                fontFamily: "Cairo, Changa, Tajawal, sans-serif",
                fontWeight: 800,
                fontSize: 40,
                color: "#fff",
                lineHeight: 1.35,
              }}
            >
              ذي الجملة وحدها تبين فهم خاطي للـ <span style={{ color: "#f87171" }}>opsec</span>
            </div>
            <div
              style={{
                marginTop: 10,
                fontFamily: "Cairo, Tajawal, sans-serif",
                fontWeight: 700,
                fontSize: 36,
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.35,
              }}
            >
              بسك راك ختازلتو في <span style={{ color: "#facc15" }}>تقنية</span>
            </div>
            <div
              style={{
                marginTop: 12,
                width: 72,
                height: 2,
                background: "rgba(255,255,255,0.18)",
                borderRadius: 999,
                marginLeft: "auto",
                marginRight: "auto",
                opacity: s2TextIn,
                transform: `scaleX(${s2TextIn})`,
              }}
            />
          </div>

          <div
            style={{
              opacity: s2ImgOpacity,
              transform: `translateY(${s2ImgY}px) scale(${s2ImgScale})`,
              willChange: "transform, opacity",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Img
              src={staticFile("rdp_scene2.jpg")}
              style={{
                width: 560,
                height: 560,
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: 320-480 — third party trust / legal / breach / payment logs — ANIMATED EXPLANATION */}
      <Sequence from={320} durationInFrames={160} name="S3-Trust">
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "0 40px",
            gap: 18,
          }}
        >
          {/* Title row — always visible */}
          <div
            dir="rtl"
            style={{
              textAlign: "center",
              opacity: s3TextIn,
              transform: `translateY(${s3TextY}px)`,
              willChange: "transform, opacity",
              maxWidth: 980,
            }}
          >
            <div style={{ fontFamily: "Cairo, Changa, Tajawal, sans-serif", fontWeight: 900, fontSize: 38, color: "#fff", lineHeight: 1.4, letterSpacing: -0.3 }}>
              ول حاجة اي سارفيس تدخل فيه <span style={{ color: "#facc15" }}>third party trust</span>
            </div>
          </div>

          {/* Visual 1 — trust chain: YOU -> SERVICE -> THIRD PARTY (BIGGER) */}
          <div
            style={{
              opacity: s3a1,
              transform: `translateY(${s3a1Y}px) scale(${0.88 + s3a1 * 0.12})`,
              display: "flex",
              alignItems: "center",
              gap: 16,
              background: "rgba(255,255,255,0.08)",
              border: "1.5px solid rgba(255,255,255,0.14)",
              borderRadius: 20,
              padding: "18px 26px",
              willChange: "transform, opacity",
              boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <User size={44} color="#fff" strokeWidth={1.8} />
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", fontWeight: 800, letterSpacing: 0.5 }}>YOU</span>
            </div>
            <ArrowRight size={28} color="rgba(255,255,255,0.7)" strokeWidth={2.2} style={{ opacity: s3Arrow }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <Server size={44} color="#38bdf8" strokeWidth={1.8} />
              <span style={{ fontSize: 14, color: "#38bdf8", fontWeight: 800 }}>SERVICE</span>
            </div>
            <div style={{ width: 36, height: 2, background: `rgba(250,204,21,${0.5 + s3Arrow * 0.5})`, borderTop: "3px dashed rgba(250,204,21,0.95)", opacity: s3Arrow }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "rgba(250,204,21,0.14)", borderRadius: 14, padding: "10px 16px", border: "1.5px solid rgba(250,204,21,0.35)" }}>
              <Building2 size={44} color="#facc15" strokeWidth={1.8} />
              <span style={{ fontSize: 14, color: "#facc15", fontWeight: 800 }}>3RD PARTY</span>
            </div>
            <Lock size={26} color="#f87171" strokeWidth={2} style={{ opacity: s3a1 }} />
          </div>

          {/* Text 2 — legal — BIGGER */}
          <div
            dir="rtl"
            style={{
              opacity: s3a2,
              transform: `translateY(${s3a2Y}px) scale(${0.9 + s3a2 * 0.1})`,
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "rgba(248,113,113,0.10)",
              border: "1.5px solid rgba(248,113,113,0.22)",
              borderRadius: 16,
              padding: "16px 22px",
              boxShadow: "0 8px 32px rgba(248,113,113,0.12)",
            }}
          >
            <Scale size={36} color="#f87171" strokeWidth={1.8} />
            <span style={{ fontFamily: "Cairo, Tajawal, sans-serif", fontWeight: 800, fontSize: 34, color: "#fff" }}>
              خاضع قانونيا
            </span>
            <ShieldAlert size={28} color="#f87171" strokeWidth={1.8} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "rgba(255,255,255,0.65)", fontWeight: 700 }}>court order / subpoena</span>
          </div>

          {/* Visual 3 — data breach — BIGGER */}
          <div
            style={{
              opacity: s3a3,
              transform: `translateY(${s3a3Y}px) scale(${0.88 + s3a3 * 0.12})`,
              display: "flex",
              alignItems: "center",
              gap: 16,
              background: "rgba(255,255,255,0.07)",
              border: "1.5px solid rgba(255,255,255,0.13)",
              borderRadius: 18,
              padding: "16px 22px",
              boxShadow: "0 10px 36px rgba(0,0,0,0.4)",
            }}
          >
            <DatabaseZap size={42} color="#f87171" strokeWidth={1.8} />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 24, color: "#f87171", letterSpacing: -0.5 }}>data breach</span>
              <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 700, fontSize: 17, color: "rgba(255,255,255,0.75)" }}>تسريب — Logs / DB معروضة</span>
            </div>
            <FileWarning size={32} color="#facc15" strokeWidth={1.8} />
            <div style={{ width: 3, height: 32, background: "rgba(255,255,255,0.12)", borderRadius: 99 }} />
            <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 800, fontSize: 17, color: "#facc15" }}>احتمال دائم</span>
          </div>

          {/* Visual 4 — payment logs — BIGGER */}
          <div
            style={{
              opacity: s3a4,
              transform: `translateY(${s3a4Y}px) scale(${0.9 + s3a4 * 0.1})`,
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "rgba(56,189,248,0.10)",
              border: "1.5px solid rgba(56,189,248,0.22)",
              borderRadius: 16,
              padding: "16px 22px",
              boxShadow: "0 8px 32px rgba(56,189,248,0.10)",
            }}
          >
            <CreditCard size={38} color="#38bdf8" strokeWidth={1.8} />
            <Receipt size={32} color="#fff" strokeWidth={1.8} />
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 24, color: "#38bdf8", letterSpacing: -0.3 }}>payment logs</span>
              <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 700, fontSize: 17, color: "rgba(255,255,255,0.75)" }}>بطاقة / PayPal / Crypto trail</span>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: 480-620 — public solution loses value when spread */}
      <Sequence from={480} durationInFrames={140} name="S4-PublicLosesValue">
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 48px" }}>
          {/* Icon — mega-broadcast / value decay */}
          <div
            style={{
              opacity: s4TextIn,
              transform: `translateY(${s4TextY}px) scale(${s4IconScale})`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
              marginBottom: 26,
            }}
          >
            <div style={{ position: "relative", background: "rgba(250,204,21,0.10)", border: "1.5px solid rgba(250,204,21,0.25)", borderRadius: 20, padding: 18, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <ShieldAlert size={48} color="#facc15" strokeWidth={1.8} />
              <Lock size={22} color="#f87171" style={{ position: "absolute", right: -6, top: -6, background: "#000", borderRadius: 999, padding: 3, border: "1px solid rgba(248,113,113,0.4)" }} />
            </div>
            <ArrowRight size={32} color="rgba(255,255,255,0.4)" />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.85 - s4TextIn * 0.35 }}>
              <div style={{ display: "flex", gap: 4 }}>
                <User size={22} color="rgba(255,255,255,0.9)" /><User size={22} color="rgba(255,255,255,0.6)" /><User size={22} color="rgba(255,255,255,0.35)" />
              </div>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 700 }}>PUBLIC</span>
            </div>
            <span style={{ fontSize: 28, color: "rgba(248,113,113,0.9)" }}>→</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 26, color: "rgba(255,255,255,0.25)", textDecoration: "line-through" }}>VALUE</span>
          </div>

          <div dir="rtl" style={{ textAlign: "center", opacity: s4TextIn, transform: `translateY(${s4TextY}px)` }}>
            <div style={{ fontFamily: "Cairo, Changa, Tajawal, sans-serif", fontWeight: 800, fontSize: 36, color: "#fff", lineHeight: 1.45 }}>
              وباش نختاصر عليكم
            </div>
            <div style={{ marginTop: 10, fontFamily: "Cairo, Tajawal, sans-serif", fontWeight: 800, fontSize: 30, color: "rgba(255,255,255,0.92)", lineHeight: 1.5, maxWidth: 980 }}>
              اي حل <span style={{ color: "#facc15", background: "rgba(250,204,21,0.12)", padding: "2px 8px", borderRadius: 8 }}>"نهائي"</span> يشيع علنيا
            </div>
            <div style={{ marginTop: 10, fontFamily: "Cairo, Tajawal, sans-serif", fontWeight: 800, fontSize: 32, color: "#f87171", lineHeight: 1.4 }}>
              يفقد القيمة تاعو غي ينتاشر
            </div>
            <div style={{ marginTop: 14, width: 72, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 999, margin: "14px auto 0", opacity: s4TextIn, transform: `scaleX(${s4TextIn})` }} />
            <div style={{ marginTop: 10, fontFamily: "Inter, Cairo, sans-serif", fontWeight: 600, fontSize: 15, color: "rgba(255,255,255,0.45)" }}>public ≠ permanent — burned on share</div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5: 620-760 — last: depending on single tool as final solution is itself a mistake */}
      <Sequence from={620} durationInFrames={140} name="S5-SingleToolMistake">
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 48px" }}>
          <div
            style={{
              opacity: s5TextIn,
              transform: `translateY(${s5TextY}px) scale(${s5IconScale})`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 14,
              marginBottom: 28,
              background: "rgba(248,113,113,0.08)",
              border: "1.5px solid rgba(248,113,113,0.20)",
              borderRadius: 18,
              padding: "16px 20px",
            }}
          >
            <Server size={42} color="rgba(255,255,255,0.4)" style={{ opacity: 0.6 }} />
            <span style={{ fontSize: 28, color: "rgba(255,255,255,0.3)" }}>+</span>
            <Lock size={42} color="#facc15" strokeWidth={1.8} />
            <span style={{ fontSize: 24, color: "rgba(255,255,255,0.5)" }}>=</span>
            <ShieldAlert size={44} color="#f87171" strokeWidth={1.8} />
            <FileWarning size={26} color="#f87171" style={{ background: "rgba(248,113,113,0.15)", borderRadius: 999, padding: 4 }} />
          </div>

          <div dir="rtl" style={{ textAlign: "center", opacity: s5TextIn, transform: `translateY(${s5TextY}px)` }}>
            <div style={{ fontFamily: "Cairo, Changa, Tajawal, sans-serif", fontWeight: 800, fontSize: 30, color: "#fff", lineHeight: 1.45, maxWidth: 980 }}>
              كي تعتامد على <span style={{ color: "#38bdf8" }}>اداة</span> ولا <span style={{ color: "#a78bfa" }}>تقنية وحدة</span>
            </div>
            <div style={{ marginTop: 10, fontFamily: "Cairo, Tajawal, sans-serif", fontWeight: 800, fontSize: 30, color: "rgba(255,255,255,0.92)", lineHeight: 1.45 }}>
              كالحل <span style={{ color: "#facc15", background: "rgba(250,204,21,0.12)", padding: "2px 8px", borderRadius: 8 }}>"النهائي"</span>
            </div>
            <div style={{ marginTop: 12, fontFamily: "Cairo, Tajawal, sans-serif", fontWeight: 900, fontSize: 36, color: "#f87171", lineHeight: 1.35 }}>
              هذا بحد ذاتو غلطة
            </div>
            <div style={{ marginTop: 14, width: 72, height: 2, background: "rgba(248,113,113,0.35)", borderRadius: 999, margin: "14px auto 0", opacity: s5TextIn, transform: `scaleX(${s5TextIn})` }} />
            <div style={{ marginTop: 10, fontFamily: "Inter, Cairo, sans-serif", fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,0.45)" }}>single tool ≠ opsec</div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Crosshair, FileText, Trash2, Zap } from "lucide-react";

export const Scene2_Tools: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) =>
    spring({ frame: frame - d, fps, config: { damping: 16, stiffness: 95 } });

  // Beats: tools 0-124, debian mask 116-234, test-only flow 226-360
  const b1 = frame < 124;
  const b2 = frame >= 116 && frame < 234;
  const b3 = frame >= 226;

  const b1Op = interpolate(frame, [0, 14, 110, 124], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const b2Op = interpolate(frame, [116, 130, 220, 234], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const b3Op = interpolate(frame, [226, 240], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tools = [
    { src: "assets/burpsuite.svg", radius: 235, speed: 0.014, phase: 0 },
    { src: "wireshark.svg", radius: 235, speed: -0.011, phase: Math.PI / 2 },
    { src: "assets/hackthebox.png", radius: 235, speed: 0.014, phase: Math.PI },
    {
      src: "assets/exploitdb.png",
      radius: 235,
      speed: -0.011,
      phase: (3 * Math.PI) / 2,
    },
  ];

  const steps = [
    { Icon: Crosshair, ar: "اختراق نظام", color: "#ef4444" },
    { Icon: FileText, ar: "تكتب تقريرك", color: "#fbbc04" },
    { Icon: Trash2, ar: "تمحيه", color: "#22c55e" },
  ];

  // Stamp slam shake
  const stampShake =
    frame >= 296 && frame < 308
      ? Math.sin((frame - 296) * 2.4) *
        interpolate(frame, [296, 308], [7, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;
  const stampFlash = interpolate(frame, [296, 302], [0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Debian mask drop shake
  const maskShake =
    frame >= 146 && frame < 158
      ? Math.sin((frame - 146) * 2.6) *
        interpolate(frame, [146, 158], [6, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  return (
    <AbsoluteFill style={{ background: "#000000" }} className="overflow-hidden">
      {/* Beat 1: Kali + big tools flying around */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ opacity: b1Op, pointerEvents: b1 ? "auto" : "none" }}
      >
        <div className="flex items-center gap-2" style={{ opacity: s(8) }}>
          <Zap size={14} color="#367bf0" />
          <span className="font-mono text-[11px] tracking-[0.28em] text-white/35">
            BUNDLE • NOT MAGIC
          </span>
        </div>

        <div className="relative mt-4" style={{ width: 640, height: 480 }}>
          {/* orbit rings */}
          <div
            className="absolute left-1/2 top-1/2 rounded-full border border-white/08"
            style={{
              width: 470,
              height: 300,
              transform: "translate(-50%,-50%)",
              opacity: s(16),
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-white/10"
            style={{
              width: 560,
              height: 380,
              transform: `translate(-50%,-50%) rotate(${frame * 0.15}deg)`,
              opacity: s(20),
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: 200,
              height: 200,
              transform: "translate(-50%,-50%)",
              background:
                "radial-gradient(circle, rgba(54,123,240,0.14), transparent 70%)",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              opacity: s(12),
              transform: `translate(-50%,-50%) scale(${interpolate(s(12), [0, 1], [0.75, 1])})`,
            }}
          >
            <Img
              src={staticFile("assets/kalimain/kali_logo.png")}
              style={{
                width: 200,
                height: 200,
                objectFit: "contain",
                filter: "drop-shadow(0 0 26px rgba(54,123,240,0.45))",
              }}
            />
          </div>

          {tools.map((t, i) => {
            const enter = s(22 + i * 10);
            // swoop-in from far, then settle into orbit
            const swoop = interpolate(enter, [0, 1], [1.9, 1]);
            const angle = t.phase + frame * t.speed * 2.2;
            const x = Math.cos(angle) * t.radius * swoop;
            const y = Math.sin(angle) * (t.radius * 0.64) * swoop;
            const bob = Math.sin(frame * 0.09 + i * 1.7) * 10;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{
                  opacity: enter,
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y + bob}px)) scale(${interpolate(enter, [0, 1], [0.5, 1])}) rotate(${Math.sin(frame * 0.05 + i) * 5}deg)`,
                }}
              >
                {/* trail ghost */}
                <div
                  className="absolute inset-0 rounded-[24px] bg-white/10 blur-[6px]"
                  style={{
                    transform: `translate(${-Math.cos(angle) * 14}px, ${-Math.sin(angle) * 10}px)`,
                    opacity: 0.5,
                  }}
                />
                <div
                  className="w-[112px] h-[112px] rounded-[24px] bg-white flex items-center justify-center border border-white/10 relative"
                  style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
                >
                  <Img
                    src={staticFile(t.src)}
                    style={{ width: 66, height: 66, objectFit: "contain" }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div
          dir="rtl"
          className="font-black text-white"
          style={{
            fontFamily: "Cairo, sans-serif",
            fontSize: 44,
            opacity: s(44),
            transform: `translateY(${interpolate(s(44), [0, 1], [12, 0])}px)`,
            filter: `blur(${interpolate(s(44), [0, 1], [6, 0])}px)`,
          }}
        >
          <span style={{ color: "#367bf0" }}>kali</span> حزمة{" "}
          <span style={{ color: "#22c55e" }}>tools</span> برك
        </div>
      </div>

      {/* Beat 2: Debian + mask, bigger */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          opacity: b2Op,
          pointerEvents: b2 ? "auto" : "none",
          transform: `translateX(${maskShake}px)`,
        }}
      >
        <div className="flex items-center gap-2" style={{ opacity: s(124) }}>
          <span className="font-mono text-[11px] tracking-[0.28em] text-white/35">
            UNDER THE HOOD
          </span>
        </div>

        <div
          className="relative mt-6"
          style={{
            opacity: s(128),
            transform: `scale(${interpolate(s(128), [0, 1], [0.8, 1])})`,
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: 380,
              height: 380,
              transform: "translate(-50%,-50%)",
              background:
                "radial-gradient(circle, rgba(215,7,81,0.12), transparent 70%)",
            }}
          />
          <div
            className="rounded-full bg-white flex items-center justify-center overflow-hidden relative"
            style={{
              width: 300,
              height: 300,
              boxShadow: "0 16px 50px rgba(0,0,0,0.55)",
            }}
          >
            <Img
              src={staticFile("assets/distros/debian.svg")}
              style={{ width: 230, height: 230, objectFit: "contain" }}
            />
          </div>
          {/* mask drops from top with overshoot */}
          <div
            className="absolute left-1/2 bg-[#0a0a0a] flex items-center justify-between px-7"
            style={{
              top: 92,
              width: 262,
              height: 64,
              transform: `translateX(-50%) translateY(${interpolate(s(146), [0, 1], [-160, 0])}px) rotate(-4deg)`,
              opacity: s(146),
              borderRadius: 32,
              boxShadow: "0 8px 22px rgba(0,0,0,0.55)",
            }}
          >
            <div className="rounded-full bg-white" style={{ width: 32, height: 24 }} />
            <div className="rounded-full bg-white" style={{ width: 32, height: 24 }} />
          </div>
          <div
            className="absolute -bottom-3 left-1/2 px-4 py-1.5 rounded-full bg-[#0a0a0a] border border-white/15"
            style={{ transform: "translateX(-50%)", opacity: s(158) }}
          >
            <span className="font-mono text-[11px] font-black tracking-[0.18em] text-white">
              ANON MODE
            </span>
          </div>
        </div>

        <div
          dir="rtl"
          className="font-black text-white mt-8"
          style={{
            fontFamily: "Cairo, sans-serif",
            fontSize: 42,
            opacity: s(140),
            transform: `translateY(${interpolate(s(140), [0, 1], [12, 0])}px)`,
            filter: `blur(${interpolate(s(140), [0, 1], [6, 0])}px)`,
          }}
        >
          <span style={{ color: "#d70751" }}>debian</span> مونطي ماسك تع{" "}
          <span style={{ color: "#22c55e" }}>انونيموس</span>
        </div>
      </div>

      {/* Beat 3: test-only flow, upgraded */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          opacity: b3Op,
          pointerEvents: b3 ? "auto" : "none",
          transform: `translateX(${stampShake}px)`,
        }}
      >
        {stampFlash > 0.01 && (
          <div
            className="absolute inset-0 bg-white pointer-events-none"
            style={{ opacity: stampFlash }}
          />
        )}
        <div className="flex items-center gap-2" style={{ opacity: s(234) }}>
          <span className="font-mono text-[11px] tracking-[0.28em] text-white/35">
            TEST ONLY • NOT DAILY
          </span>
        </div>

        <div className="mt-8 relative">
          {/* progress line that fills as steps land */}
          <div className="absolute left-[70px] right-[70px] top-[62px] h-[3px] rounded-full bg-white/10" />
          <div
            className="absolute left-[70px] top-[62px] h-[3px] rounded-full bg-green-500"
            style={{
              width: `${interpolate(frame, [242, 296], [0, 740], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px`,
              maxWidth: 740,
              boxShadow: "0 0 10px rgba(34,197,94,0.6)",
            }}
          />
          <div className="flex items-start gap-3">
            {steps.map((st, i) => {
              const p = s(242 + i * 18);
              return (
                <div
                  key={i}
                  className="flex flex-col items-center"
                  style={{
                    opacity: p,
                    transform: `translateY(${interpolate(p, [0, 1], [26, 0])}px) scale(${interpolate(p, [0, 1], [0.7, 1])})`,
                  }}
                >
                  <div
                    className="w-[124px] h-[124px] rounded-[26px] bg-white/[0.06] backdrop-blur flex items-center justify-center border-2 relative"
                    style={{
                      borderColor: st.color,
                      boxShadow: `0 0 24px ${st.color}30, 0 10px 28px rgba(0,0,0,0.5)`,
                    }}
                  >
                    <st.Icon size={48} color="#FFFFFF" strokeWidth={1.8} />
                    <div
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-mono text-[13px] font-black text-white"
                      style={{ background: st.color }}
                    >
                      {i + 1}
                    </div>
                  </div>
                  <span
                    className="mt-2.5 font-black text-white"
                    style={{ fontFamily: "Cairo, sans-serif", fontSize: 17 }}
                  >
                    {st.ar}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="mt-7 px-6 py-2.5 rounded-full border-[3px] border-red-500"
          style={{
            opacity: s(296),
            transform: `scale(${interpolate(s(296), [0, 1], [1.6, 1])}) rotate(-3deg)`,
            background: "rgba(239,68,68,0.14)",
            boxShadow: "0 0 22px rgba(239,68,68,0.35)",
          }}
        >
          <span className="font-mono text-[13px] font-black tracking-[0.2em] text-red-400">
            NOT FOR DAILY USE
          </span>
        </div>

        <div
          dir="rtl"
          className="text-center px-8 mt-6"
          style={{
            opacity: s(258),
            transform: `translateY(${interpolate(s(258), [0, 1], [12, 0])}px)`,
            filter: `blur(${interpolate(s(258), [0, 1], [6, 0])}px)`,
          }}
        >
          <div
            className="font-black leading-[1.6] text-white"
            style={{ fontFamily: "Cairo, sans-serif", fontSize: 28 }}
          >
            التصميم تاعو مشي لنظام يومي
          </div>
          <div
            className="font-black leading-[1.6] text-white/85"
            style={{ fontFamily: "Cairo, sans-serif", fontSize: 26 }}
          >
            اختراق نظام تكتب تقرير تاعك{" "}
            <span style={{ color: "#ef4444" }}>وتمحيه</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

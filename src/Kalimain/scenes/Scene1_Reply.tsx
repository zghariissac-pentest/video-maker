import React from "react";
import {
  AbsoluteFill,
  Audio,
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
  Bold,
  Clock,
  Italic,
  Paperclip,
  Search,
  Send,
  Smile,
  Star,
} from "lucide-react";

const SMOOTH = Easing.bezier(0.22, 1, 0.36, 1);
const SLAM = 30;

export const Scene1_Reply: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) =>
    spring({ frame: frame - d, fps, config: { damping: 21, stiffness: 100 } });

  // Beats: dark inbox 0-30, zoom+slam 30-50, punchline 56+
  const zoomProgress = interpolate(frame, [SLAM, 50], [0, 1], {
    easing: SMOOTH,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const inboxScale = interpolate(zoomProgress, [0, 1], [1, 0.5]);
  const inboxDim = interpolate(frame, [SLAM, 56], [1, 0.28], {
    easing: SMOOTH,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shake =
    frame >= SLAM && frame < SLAM + 12
      ? Math.sin((frame - SLAM) * 2.8) *
        interpolate(frame, [SLAM, SLAM + 12], [9, 0], {
          easing: SMOOTH,
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  const flash = interpolate(frame, [SLAM, SLAM + 6], [0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ringProgress = interpolate(frame, [SLAM, SLAM + 22], [0, 1], {
    easing: SMOOTH,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const kaliIn = s(SLAM);
  const kaliFloat = Math.sin(frame * 0.05) * 6;
  const glowPulse =
    frame >= SLAM && frame < SLAM + 30
      ? interpolate(frame, [SLAM, SLAM + 30], [0.5, 0.12], {
          easing: SMOOTH,
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0.12;
  const textIn = s(56);

  const cursorOn = frame < SLAM && frame % 14 < 7;

  const senders = [
    {
      init: "B",
      name: "boss@work.dz",
      color: "#367bf0",
      unread: true,
      tag: "Work",
    },
    {
      init: "N",
      name: "newsletter@dev.to",
      color: "#7a5af5",
      unread: true,
      tag: "Dev",
    },
    {
      init: "S",
      name: "support@host.dz",
      color: "#22c55e",
      unread: false,
      tag: null,
    },
  ];

  return (
    <AbsoluteFill style={{ background: "#000000" }} className="overflow-hidden">
      {/* blue glow swells on slam */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 760,
          height: 760,
          left: "50%",
          top: "38%",
          transform: "translate(-50%,-50%)",
          background: `radial-gradient(circle, rgba(54,123,240,${glowPulse}), transparent 68%)`,
        }}
      />

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: `translateX(${shake}px)`, willChange: "transform" }}
      >
        {/* Dark Gmail inbox */}
        <div
          className="w-full max-w-[880px] mx-6 rounded-[20px] bg-[#0d1117] border border-white/10 overflow-hidden"
          style={{
            transform: `scale(${inboxScale})`,
            boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
            opacity: inboxDim,
            willChange: "transform, opacity",
          }}
        >
          {/* Google 4-color top bar */}
          <div className="flex h-1">
            <div className="flex-1" style={{ background: "#4285f4" }} />
            <div className="flex-1" style={{ background: "#ea4335" }} />
            <div className="flex-1" style={{ background: "#fbbc04" }} />
            <div className="flex-1" style={{ background: "#34a853" }} />
          </div>
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/08">
            <Img
              src={staticFile("assets/kalimain/gmail.svg")}
              style={{ width: 34, height: 34, objectFit: "contain" }}
            />
            <span
              className="font-black text-white/85"
              style={{ fontFamily: "sans-serif", fontSize: 19 }}
            >
              Gmail
            </span>
            <span className="font-mono text-[10px] text-white/35">
              • Inbox
            </span>
            <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-red-500 text-white font-black">
              2 NEW
            </span>
            <div className="ml-auto w-[200px] h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center px-3 gap-2">
              <Search size={12} color="#6b7280" />
              <span className="font-mono text-[10px] text-white/30">
                Search mail
              </span>
            </div>
          </div>
          {/* Category tabs */}
          <div className="flex items-center gap-5 px-4 pt-2.5">
            {[
              { t: "Primary", active: true, n: "2" },
              { t: "Social", active: false, n: "14" },
              { t: "Promotions", active: false, n: "99+" },
            ].map((c, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 pb-1.5">
                  <span
                    className={`font-mono text-[11px] ${c.active ? "font-black text-white/90" : "text-white/35"}`}
                  >
                    {c.t}
                  </span>
                  <span
                    className={`font-mono text-[9px] px-1.5 py-0.5 rounded-full ${c.active ? "bg-red-500 text-white" : "bg-white/10 text-white/40"}`}
                  >
                    {c.n}
                  </span>
                </div>
                <div
                  className="h-[2px] w-full rounded-full"
                  style={{ background: c.active ? "#ea4335" : "transparent" }}
                />
              </div>
            ))}
          </div>
          {senders.map((m, i) => (
            <div
              key={i}
              className="flex gap-3 px-4 py-3 border-b border-white/05 items-center"
              style={{
                background: m.unread
                  ? "rgba(54,123,240,0.07)"
                  : "transparent",
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-mono text-[13px] font-black text-white"
                style={{ background: m.color }}
              >
                {m.init}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <div
                    className={`font-mono text-[12px] ${m.unread ? "font-black text-white/90" : "text-white/45"}`}
                  >
                    {m.name}
                  </div>
                  {m.tag && (
                    <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-white/10 text-white/50 tracking-widest">
                      {m.tag}
                    </span>
                  )}
                </div>
                <div className="h-2 w-2/3 rounded bg-white/10 mt-1" />
              </div>
              {i === 0 && <Paperclip size={12} color="#6b7280" />}
              <Star
                size={13}
                color={i === 1 ? "#fbbc04" : "#4b5563"}
                fill={i === 1 ? "#fbbc04" : "transparent"}
              />
              <span className="font-mono text-[10px] text-white/35 flex items-center gap-1">
                <Clock size={10} color="#6b7280" />
                {["09:41", "08:15", "Hier"][i]}
              </span>
            </div>
          ))}
          <div className="m-4 rounded-[12px] bg-white/[0.05] border border-white/10 p-4">
            <div className="font-mono text-[10px] text-white/35">
              To: <span className="text-white/70">boss@work.dz</span>
              <span className="text-white/25"> • Re: رد عاجل</span>
            </div>
            <div className="mt-2 min-h-[30px] flex items-center">
              <span className="font-mono text-[13px] text-white/35">
                Reply...
              </span>
              {cursorOn && (
                <span className="inline-block w-[2px] h-4 bg-white/60 ml-1" />
              )}
              <Send size={14} color="#4b5563" style={{ marginLeft: "auto" }} />
            </div>
            <div className="mt-2 pt-2 border-t border-white/08 flex items-center gap-3">
              <Bold size={12} color="#6b7280" />
              <Italic size={12} color="#6b7280" />
              <Paperclip size={12} color="#6b7280" />
              <Smile size={12} color="#6b7280" />
              <span className="ml-auto font-mono text-[9px] text-white/25">
                Gmail • formatting
              </span>
            </div>
          </div>
        </div>

        {/* Kali slam */}
        {frame >= SLAM && (
          <div
            className="absolute left-1/2 top-[29%]"
            style={{
              opacity: kaliIn,
              transform: `translate(-50%,-50%) translateY(${kaliFloat + interpolate(kaliIn, [0, 1], [50, 0], { easing: SMOOTH })}px) scale(${interpolate(kaliIn, [0, 1], [0.5, 1], { easing: SMOOTH })})`,
              willChange: "transform, opacity",
            }}
          >
            <Img
              src={staticFile("assets/kalimain/kali_logo.png")}
              style={{
                width: 340,
                height: 340,
                objectFit: "contain",
                filter: "drop-shadow(0 0 34px rgba(54,123,240,0.5))",
              }}
            />
            {/* replying-via-Gmail pill keeps the logo present post-slam */}
            <div
              className="mx-auto mt-1 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.07] border border-white/12"
              style={{ width: "fit-content" }}
            >
              <Img
                src={staticFile("assets/kalimain/gmail.svg")}
                style={{ width: 20, height: 20, objectFit: "contain" }}
              />
              <span className="font-mono text-[10px] tracking-[0.14em] text-white/60">
                REPLYING VIA KALI
              </span>
              <span className="flex gap-1">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="w-1.5 h-1.5 rounded-full bg-green-400"
                    style={{
                      opacity:
                        frame % 24 < 8 + d * 4 && frame % 24 >= d * 4 ? 1 : 0.25,
                    }}
                  />
                ))}
              </span>
            </div>
          </div>
        )}

        {/* Shockwave ring */}
        {frame >= SLAM && frame < SLAM + 24 && (
          <div
            className="absolute left-1/2 rounded-full border-4 border-[#367bf0] pointer-events-none"
            style={{
              top: "29%",
              width: 360,
              height: 360,
              transform: `translate(-50%,-50%) scale(${interpolate(ringProgress, [0, 1], [0.6, 1.9], { easing: SMOOTH })})`,
              opacity: interpolate(ringProgress, [0, 1], [0.8, 0]),
            }}
          />
        )}

        {/* Debris particles */}
        {frame >= SLAM &&
          frame < SLAM + 26 &&
          Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const dist = interpolate(
              frame,
              [SLAM, SLAM + 26],
              [60, 300 + (i % 3) * 60],
              { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div
                key={i}
                className="absolute left-1/2 rounded-full bg-[#367bf0]"
                style={{
                  top: "29%",
                  width: i % 3 === 0 ? 8 : 5,
                  height: i % 3 === 0 ? 8 : 5,
                  transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist * 0.8}px))`,
                  opacity: interpolate(frame, [SLAM, SLAM + 26], [0.9, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              />
            );
          })}
      </div>

      {/* Impact flash */}
      {flash > 0.01 && (
        <AbsoluteFill style={{ background: `rgba(255,255,255,${flash})` }} />
      )}

      {/* Punchline — no animated blur filter (GPU-heavy), transform+opacity only */}
      {frame >= 54 && (
        <div
          dir="rtl"
          className="absolute left-0 right-0 text-center px-8"
          style={{
            top: "67%",
            opacity: textIn,
            transform: `translateY(${interpolate(textIn, [0, 1], [16, 0], { easing: SMOOTH })}px) scale(${interpolate(textIn, [0, 1], [0.94, 1], { easing: SMOOTH })})`,
            willChange: "transform, opacity",
          }}
        >
          <div
            className="font-black leading-[1.5] text-white"
            style={{
              fontFamily: "Cairo, sans-serif",
              fontSize: 48,
              textShadow: "0 2px 18px rgba(0,0,0,0.5)",
            }}
          >
            حبيبنا مطلع <span style={{ color: "#367bf0" }}>كالي</span> باش
            يريبوندي على <span style={{ color: "#22c55e" }}>email</span> ؟
          </div>
        </div>
      )}

      <Sequence from={SLAM}>
        <Audio src={staticFile("assets/cyber/sfx/impact.mp3")} volume={0.9} />
      </Sequence>
    </AbsoluteFill>
  );
};

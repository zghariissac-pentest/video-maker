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
import { Crown, ShieldOff } from "lucide-react";

export const Scene3_Root: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (d: number) =>
    spring({ frame: frame - d, fps, config: { damping: 18, stiffness: 95 } });

  const cardIn = s(10);
  const text1In = s(30);
  const text2In = s(52);

  // whoami typing
  const cmd = "whoami";
  const typedCmd = cmd.slice(
    0,
    Math.floor(
      interpolate(frame, [26, 52], [0, cmd.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    )
  );
  const showRoot = frame >= 56;
  const rootIn = s(56);

  // process rows all root
  const rows = ["nmap -sV", "burpsuite", "wireshark", "msfconsole"];

  // AppArmor toggle ON -> OFF
  const toggleProgress = interpolate(frame, [96, 132], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shieldDead = frame >= 132;
  const crackOp = interpolate(frame, [132, 148], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{ background: "#000000" }}
      className="flex flex-col items-center justify-center overflow-hidden"
    >
      <div
        className="flex items-center gap-2"
        style={{
          opacity: cardIn,
          transform: `translateY(${interpolate(cardIn, [0, 1], [8, 0])}px)`,
        }}
      >
        <Crown size={13} color="#fbbc04" />
        <span className="font-mono text-[11px] tracking-[0.28em] text-white/35">
          ROOT • NO CONFINEMENT
        </span>
      </div>

      <div className="mt-7 flex gap-4 justify-center w-full max-w-[920px] px-6">
        {/* Terminal: everything is root */}
        <div
          className="flex-1 rounded-[18px] bg-[#0b0e14] border border-white/10 overflow-hidden"
          style={{
            opacity: cardIn,
            transform: `translateY(${interpolate(cardIn, [0, 1], [12, 0])}px)`,
            boxShadow: "0 12px 36px rgba(0,0,0,0.5)",
          }}
        >
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/08">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="ml-2 font-mono text-[10px] text-white/35">
              root@kali:~#
            </span>
          </div>
          <div className="p-4 font-mono text-[13px] leading-[1.7]">
            <div>
              <span className="text-red-400">root@kali</span>
              <span className="text-white/40">:~# </span>
              <span className="text-white">{typedCmd}</span>
              {frame >= 26 && frame < 56 && frame % 12 < 6 && (
                <span className="inline-block w-[7px] h-[15px] bg-green-400 ml-1 align-middle" />
              )}
            </div>
            {showRoot && (
              <div
                className="text-green-400 font-black"
                style={{
                  opacity: rootIn,
                  transform: `scale(${interpolate(rootIn, [0, 1], [0.7, 1])})`,
                  textShadow: "0 0 12px rgba(34,197,94,0.5)",
                }}
              >
                root
              </div>
            )}
            <div className="mt-2 space-y-1">
              {rows.map((r, i) => {
                const p = s(70 + i * 12);
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded bg-white/[0.04] border border-white/06 px-2 py-1"
                    style={{
                      opacity: p,
                      transform: `translateX(${interpolate(p, [0, 1], [-10, 0])}px)`,
                    }}
                  >
                    <span className="text-amber-400 font-black">root</span>
                    <span className="text-white/50 truncate">{r}</span>
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400"
                      style={{ opacity: 0.6 + 0.4 * Math.sin(frame * 0.15 + i) }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AppArmor: switched OFF */}
        <div
          className="flex-1 rounded-[18px] bg-white/[0.04] border border-white/10 backdrop-blur p-5 flex flex-col items-center"
          style={{
            opacity: cardIn,
            transform: `translateY(${interpolate(cardIn, [0, 1], [12, 0])}px)`,
          }}
        >
          <div className="font-mono text-[10px] tracking-[0.2em] text-white/40">
            APPARMOR
          </div>
          <div className="relative mt-4" style={{ opacity: 1 - crackOp * 0.25 }}>
            <ShieldOff
              size={72}
              color={shieldDead ? "#3a3a3a" : "#22c55e"}
              strokeWidth={1.6}
            />
            {crackOp > 0.01 && (
              <svg
                viewBox="0 0 72 72"
                className="absolute inset-0 w-full h-full"
                style={{ opacity: crackOp }}
              >
                <path
                  d="M 36 6 L 44 28 L 34 40 L 46 58"
                  stroke="#ef4444"
                  strokeWidth={2.5}
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
          {/* toggle */}
          <div
            className="mt-4 w-[92px] h-[44px] rounded-full border-2 flex items-center px-1"
            style={{
              borderColor: toggleProgress > 0.5 ? "#ef4444" : "#22c55e",
              background:
                toggleProgress > 0.5
                  ? "rgba(239,68,68,0.12)"
                  : "rgba(34,197,94,0.12)",
              justifyContent:
                toggleProgress > 0.5 ? "flex-start" : "flex-end",
            }}
          >
            <div
              className="rounded-full bg-white flex items-center justify-center font-mono text-[9px] font-black"
              style={{
                width: 34,
                height: 34,
                color: toggleProgress > 0.5 ? "#ef4444" : "#22c55e",
                transform: `translateX(${interpolate(toggleProgress, [0, 1], [48, 0])}px)`,
              }}
            >
              {toggleProgress > 0.5 ? "OFF" : "ON"}
            </div>
          </div>
          <div
            className="mt-3 px-3 py-1 rounded-full font-mono text-[10px] font-black tracking-[0.16em]"
            style={{
              background: shieldDead ? "#ef4444" : "#22c55e",
              color: shieldDead ? "white" : "black",
              opacity: s(shieldDead ? 136 : 20),
            }}
          >
            {shieldDead ? "DISABLED" : "ENFORCING"}
          </div>
        </div>
      </div>

      {/* Script text */}
      <div
        dir="rtl"
        className="text-center px-8 mt-7"
        style={{
          opacity: text1In,
          transform: `translateY(${interpolate(text1In, [0, 1], [12, 0])}px)`,
          filter: `blur(${interpolate(text1In, [0, 1], [6, 0])}px)`,
        }}
      >
        <div
          className="font-black leading-[1.6] text-white"
          style={{ fontFamily: "Cairo, sans-serif", fontSize: 30 }}
        >
          بصح نيو يليق يمشي كلش بصلاحيات{" "}
          <span style={{ color: "#ef4444" }}>root</span>
        </div>
        <div
          className="font-black leading-[1.6] text-white/85"
          style={{
            fontFamily: "Cairo, sans-serif",
            fontSize: 27,
            opacity: text2In,
            transform: `translateY(${interpolate(text2In, [0, 1], [12, 0])}px)`,
          }}
        >
          ويعطل <span style={{ color: "#fbbc04" }}>apparmor</span> على جال{" "}
          <span style={{ color: "#22c55e" }}>التوافق</span>
        </div>
      </div>

      {/* Kali watermark */}
      <div className="absolute bottom-6 right-6 opacity-20">
        <Img
          src={staticFile("assets/kalimain/kali_logo.png")}
          style={{ width: 54, height: 54, objectFit: "contain" }}
        />
      </div>
    </AbsoluteFill>
  );
};

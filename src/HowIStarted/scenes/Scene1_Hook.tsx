import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  random,
} from "remotion";

const MatrixBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const columns = Math.floor(width / 20);
  return (
    <AbsoluteFill className="bg-black overflow-hidden">
      {Array.from({ length: columns }).map((_, i) => {
        const speed = 1 + (i % 5) * 0.5;
        const offset = (i * 79) % height;
        const y = (frame * speed + offset) % (height + 200) - 100;
        return (
          <div
            key={i}
            className="absolute text-green-500 font-mono text-xs opacity-20"
            style={{
              left: i * 20,
              top: y,
              writingMode: "vertical-rl" as any,
              textOrientation: "upright" as any,
            }}
          >
            {Array.from({ length: 20 })
              .map((_, j) => (random(`matrix-${i}-${j}`) > 0.5 ? "1" : "0"))
              .join("")}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const Scene1_Hook: React.FC = () => {
  const frame = useCurrentFrame();

  const text1 = "كان في عمري 15 سنة كي بديت";
  const text2 = "نتعلم ethical hacking";

  const typingSpeed = 2.2;

  const charsShown1 = Math.floor(frame / typingSpeed);
  const displayed1 = text1.slice(0, charsShown1);

  const startFrame2 = text1.length * typingSpeed + 28;
  const charsShown2 = Math.floor((frame - startFrame2) / typingSpeed);
  const displayed2 = charsShown2 > 0 ? text2.slice(0, charsShown2) : "";

  const cursorOpacity = interpolate(frame % 20, [0, 10, 11, 20], [1, 1, 0, 0]);
  const showSecond = frame >= startFrame2;

  // split second line for green highlight
  const prefix = "نتعلم ";
  const prefixShown = displayed2.slice(0, prefix.length);
  const greenPart = displayed2.length > prefix.length ? displayed2.slice(prefix.length) : "";

  return (
    <AbsoluteFill className="bg-black flex items-center justify-center p-8">
      <MatrixBackground />

      <div className="z-10 w-full max-w-4xl">
        <div className="bg-gray-900 border border-green-500 rounded-lg p-8 shadow-[0_0_22px_rgba(34,197,94,0.32)]">
          <div className="flex items-center gap-2 mb-7 border-b border-green-900 pb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 font-mono text-green-700 text-sm">
              terminal — origin-story
            </span>
            <span className="ml-auto font-mono text-green-900 text-xs">
              AGE=15
            </span>
          </div>

          {/* Terminal lines - exact script only */}
          <div className="font-mono leading-tight space-y-5">
            {/* Line 1 */}
            <div className="flex items-center gap-4">
              <span className="text-green-500 text-3xl shrink-0">$</span>
              <span
                dir="rtl"
                className="text-white text-[42px] font-bold flex-1 text-right"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                {displayed1}
                {frame < startFrame2 && (
                  <span
                    style={{ opacity: cursorOpacity }}
                    className="inline-block w-3 h-9 bg-green-500 mr-2 align-middle"
                  />
                )}
              </span>
            </div>

            {/* Line 2 */}
            {showSecond && (
              <div className="flex items-center gap-4">
                <span className="text-green-500 text-3xl shrink-0">$</span>
                <span
                  dir="rtl"
                  className="text-white text-[42px] font-bold flex-1 text-right"
                  style={{ fontFamily: "Cairo, sans-serif" }}
                >
                  <span>{prefixShown}</span>
                  <span className="text-green-400">{greenPart}</span>
                  <span
                    style={{ opacity: cursorOpacity }}
                    className="inline-block w-3 h-9 bg-green-500 mr-2 align-middle"
                  />
                </span>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-between items-center border-t border-green-900/40 pt-4">
            <span className="font-mono text-[11px] text-green-800 tracking-widest">
              0x0F — WHERE IT STARTED
            </span>
            <span className="font-mono text-[11px] text-green-700">
              {frame < startFrame2 ? "TYPING..." : "HOOK_LOADED"}
            </span>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-8">
          <div className="flex items-center gap-2 text-green-500 font-mono opacity-50 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>ORIGIN</span>
          </div>
          <div className="flex items-center gap-2 text-green-500 font-mono opacity-50 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>AGE_15</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

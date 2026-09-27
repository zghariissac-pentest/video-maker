import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from 'remotion';

export const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const text1 = "Encryption hides data.";
  const text2 = "Behavior creates identity.";
  const text3 = "So in short anonymity is based on behavior";
  const text4 = "more than a bunch of tools";

  const springConfig = { damping: 12 };
  const t1Opacity = spring({ frame: frame - 20, fps, config: springConfig });
  const t2Opacity = spring({ frame: frame - 80, fps, config: springConfig });
  const t3Opacity = spring({ frame: frame - 160, fps, config: springConfig });
  const t4Opacity = spring({ frame: frame - 200, fps, config: springConfig });

  const finalScale = spring({
    frame: frame - 240,
    fps,
    config: { damping: 15 },
  });

  return (
    <AbsoluteFill className="bg-black flex flex-col items-center justify-center p-20 overflow-hidden">
      {/* Background Glow */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #22c55e 0%, transparent 70%)',
          transform: `scale(${interpolate(frame, [0, 300], [1, 1.2])})`,
        }}
      />

      <div className="z-10 w-full max-w-5xl space-y-16">
        {/* Contrast Section */}
        <div className="grid grid-cols-2 gap-12">
          <div 
            className="bg-gray-900/40 border border-green-500/30 p-10 rounded-2xl backdrop-blur-md"
            style={{ 
              opacity: t1Opacity,
              transform: `translateX(${interpolate(t1Opacity, [0, 1], [-50, 0])}px)`
            }}
          >
            <div className="text-green-500 font-mono text-sm mb-4 uppercase tracking-[0.3em]">Technical Layer</div>
            <div className="text-white font-mono text-4xl font-bold leading-tight">
              {text1}
            </div>
            <div className="mt-6 flex gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-1 h-4 bg-green-900/50 rounded-full" />
              ))}
            </div>
          </div>

          <div 
            className="bg-gray-900/40 border border-purple-500/30 p-10 rounded-2xl backdrop-blur-md"
            style={{ 
              opacity: t2Opacity,
              transform: `translateX(${interpolate(t2Opacity, [0, 1], [50, 0])}px)`
            }}
          >
            <div className="text-purple-500 font-mono text-sm mb-4 uppercase tracking-[0.3em]">Human Layer</div>
            <div className="text-white font-mono text-4xl font-bold leading-tight">
              {text2}
            </div>
            <div className="mt-6 flex gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-1 h-4 bg-purple-900/50 rounded-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Final Summary */}
        <div className="text-center space-y-4 pt-12">
          <div 
            className="text-gray-400 font-mono text-2xl"
            style={{ opacity: t3Opacity }}
          >
            {text3}
          </div>
          <div 
            className="text-white font-mono text-5xl font-black tracking-tighter"
            style={{ 
              opacity: t4Opacity,
              transform: `scale(${interpolate(finalScale, [0, 1], [0.9, 1])})`
            }}
          >
            {text4.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Decorative Binary Rain (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none font-mono text-[8px] flex justify-around overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="flex flex-col">
            {Array.from({ length: 100 }).map((_, j) => (
              <span key={j} className="mb-1">{(i + j) % 2}</span>
            ))}
          </div>
        ))}
      </div>

      {/* Final Frame Border */}
      <div 
        className="absolute inset-8 border border-white/10 pointer-events-none"
        style={{ opacity: interpolate(frame, [250, 300], [0, 1]) }}
      />
    </AbsoluteFill>
  );
};

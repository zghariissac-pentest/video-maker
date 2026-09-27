import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  random,
} from 'remotion';

const PacketCluster: React.FC<{ delay: number; color: string; speed: number; y: number }> = ({ delay, color, speed, y }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => {
        const pDelay = delay + i * 2;
        const progress = ((frame - pDelay) * speed) / width;
        if (progress < 0 || progress > 1) return null;
        
        const x = progress * width;
        return (
          <div 
            key={i}
            className={`absolute w-3 h-3 rounded-sm ${color} shadow-[0_0_8px_currentColor]`}
            style={{
              left: x,
              top: y + (random(`p-y-${delay}-${i}`) - 0.5) * 10,
              opacity: interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
            }}
          />
        );
      })}
    </>
  );
};

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const text1 = "Packet bursts.";
  const text2 = "Pauses.";
  const text3 = "Flow direction.";
  const text4 = "If entry traffic and exit traffic look similar,";
  const text5 = "statistics link them. No hacking required.";

  const springConfig = { damping: 12 };
  const t1Opacity = spring({ frame: frame - 10, fps, config: springConfig });
  const t2Opacity = spring({ frame: frame - 40, fps, config: springConfig });
  const t3Opacity = spring({ frame: frame - 70, fps, config: springConfig });
  const t4Opacity = spring({ frame: frame - 120, fps, config: springConfig });
  const t5Opacity = spring({ frame: frame - 180, fps, config: springConfig });

  const correlationProgress = spring({
    frame: frame - 200,
    fps,
    config: { damping: 20 },
  });

  // Pattern: Bursts spaced out for longer duration
  const entryBursts = [20, 120, 220, 320, 420, 520];
  const exitBursts = [25, 125, 225, 325, 425, 525]; // Slightly delayed but same pattern

  return (
    <AbsoluteFill className="bg-black overflow-hidden p-12">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5 font-mono text-[10px] overflow-hidden leading-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i}>{Array.from({ length: 100 }).map(() => (random(i) > 0.5 ? '1' : '0')).join(' ')}</div>
        ))}
      </div>

      <div className="z-10 flex flex-col h-full space-y-8">
        {/* Script Text */}
        <div className="space-y-2 font-mono">
          <div className="flex gap-4">
            <span style={{ opacity: t1Opacity }} className="text-green-500">{text1}</span>
            <span style={{ opacity: t2Opacity }} className="text-green-500">{text2}</span>
            <span style={{ opacity: t3Opacity }} className="text-green-500">{text3}</span>
          </div>
          <div style={{ opacity: t4Opacity }} className="text-gray-400 text-2xl">{text4}</div>
          <div style={{ opacity: t5Opacity }} className="text-white text-3xl font-bold">{text5}</div>
        </div>

        {/* Traffic Comparison */}
        <div className="flex-1 flex flex-col justify-center space-y-20 relative">
          {/* Entry Node */}
          <div className="relative h-32 bg-green-950/10 border border-green-900/30 rounded-lg">
            <div className="absolute -top-6 left-0 text-green-700 font-mono text-xs">ENTRY_NODE_TRAFFIC</div>
            {entryBursts.map((d, i) => (
              <PacketCluster key={i} delay={d} color="bg-green-500" speed={10} y={64} />
            ))}
          </div>

          {/* Exit Node */}
          <div className="relative h-32 bg-blue-950/10 border border-blue-900/30 rounded-lg">
            <div className="absolute -top-6 left-0 text-blue-700 font-mono text-xs">EXIT_NODE_TRAFFIC</div>
            {exitBursts.map((d, i) => (
              <PacketCluster key={i} delay={d} color="bg-blue-500" speed={10} y={64} />
            ))}
          </div>

          {/* Correlation Lines */}
          {frame > 200 && (
            <div className="absolute inset-0 pointer-events-none">
              {entryBursts.map((d, i) => {
                const x = interpolate(frame - d, [0, 100], [0, width]);
                if (x < 100 || x > width - 100) return null;
                return (
                  <div 
                    key={i}
                    className="absolute w-px bg-red-500/50"
                    style={{
                      left: x,
                      top: '20%',
                      height: '60%',
                      opacity: correlationProgress * 0.5,
                      boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)',
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Correlation Alert */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ opacity: correlationProgress }}
          >
            <div className="bg-red-600 text-white font-mono px-6 py-2 rounded-full text-xl font-bold animate-pulse shadow-[0_0_30px_rgba(220,38,38,0.8)]">
              STATISTICAL_MATCH_FOUND
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-3 gap-4 font-mono text-[10px] text-green-900">
          <div className="border border-green-900/30 p-2">
            <div>BURST_PATTERN_ANALYSIS</div>
            <div className="text-green-600">MATCH: 98.4%</div>
          </div>
          <div className="border border-green-900/30 p-2">
            <div>TIMING_CORRELATION</div>
            <div className="text-green-600">CONFIDENCE: HIGH</div>
          </div>
          <div className="border border-green-900/30 p-2">
            <div>IDENTITY_LINKAGE</div>
            <div className="text-red-600">ESTABLISHED</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

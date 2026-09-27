import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  random,
} from 'remotion';

const Packet: React.FC<{ delay: number; color: string; speed: number }> = ({ delay, color, speed }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  
  const progress = ((frame - delay) * speed) / width;
  
  if (progress < 0 || progress > 1) return null;

  const x = progress * width;
  const y = 400 + Math.sin(progress * 10) * 20;

  return (
    <div 
      className={`absolute w-4 h-4 rounded-sm ${color} shadow-[0_0_10px_currentColor]`}
      style={{
        left: x,
        top: y,
        opacity: interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
      }}
    />
  );
};

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const packets = Array.from({ length: 30 }).map((_, i) => {
    const delay = i * 20 + random(`p-delay-${i}`) * 10;
    return <Packet key={i} delay={delay} color="bg-green-500" speed={8} />;
  });

  const text1 = "On the network, investigators don’t read your traffic";
  const text2 = "they look at timing.";

  const text1Opacity = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12 },
  });

  const text2Opacity = spring({
    frame: frame - 120,
    fps,
    config: { damping: 12 },
  });

  const timingHighlight = spring({
    frame: frame - 140,
    fps,
    config: { damping: 12 },
  });

  return (
    <AbsoluteFill className="bg-black overflow-hidden">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="z-10 p-20 flex flex-col h-full">
        <div className="flex-1">
          <div className="font-mono text-3xl text-gray-400 mb-4" style={{ opacity: text1Opacity }}>
            {text1}
          </div>
          <div className="font-mono text-6xl text-white font-bold" style={{ opacity: text2Opacity }}>
            {text2}
          </div>
        </div>

        {/* Network Visualization */}
        <div className="relative h-64 border-t border-b border-green-900/50 bg-green-950/10">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-green-700 text-xs">SOURCE</div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-green-700 text-xs">DESTINATION</div>
          
          {packets}

          {/* Timing Markers */}
          {frame > 140 && (
            <div className="absolute inset-0 flex items-center justify-around px-20">
              {Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={i} 
                  className="h-32 w-px bg-red-500/50 relative"
                  style={{
                    opacity: timingHighlight * (0.3 + random(`m-${i}`) * 0.7),
                    transform: `scaleY(${interpolate(frame % 20, [0, 10, 20], [1, 1.5, 1])})`,
                  }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-red-400 font-mono">
                    Δt_{i}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 flex items-end justify-between font-mono text-xs text-green-800">
          <div>MONITORING_ACTIVE: TRUE</div>
          <div>PACKET_INSPECTION: ENCRYPTED</div>
          <div>TIMING_ANALYSIS: RUNNING...</div>
        </div>
      </div>

      {/* Magnifying glass / Scanner effect */}
      <div 
        className="absolute border-2 border-red-500/30 rounded-full pointer-events-none shadow-[0_0_50px_rgba(239,68,68,0.2)]"
        style={{
          width: 300,
          height: 300,
          left: interpolate(frame, [0, 300], [width * 0.2, width * 0.8]),
          top: height / 2 - 150,
          opacity: interpolate(frame, [100, 120], [0, 1]),
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-red-500 font-mono text-sm mb-2">
          INVESTIGATOR_SCOPE
        </div>
      </div>
    </AbsoluteFill>
  );
};

import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  random,
} from 'remotion';

const GlitchText: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const progress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 12,
    },
  });

  if (frame < delay) return null;

  return (
    <div className={className} style={{ opacity: progress, transform: `scale(${interpolate(progress, [0, 1], [0.9, 1])})` }}>
      {text}
    </div>
  );
};

const StatusLine: React.FC<{ label: string; value: string; delay: number; color?: string }> = ({ label, value, delay, color = "text-green-500" }) => {
  const frame = useCurrentFrame();
  
  const showValue = frame > delay + 20;
  const blink = Math.floor(frame / 10) % 2 === 0;

  return (
    <div className="flex justify-between items-center font-mono text-2xl mb-4 border-b border-green-900/30 pb-2">
      <span className="text-gray-500">{label}</span>
      <div className="flex items-center gap-2">
        {showValue ? (
          <span className={color}>{value}</span>
        ) : frame > delay ? (
          <span className="text-green-800">ANALYZING...{blink ? '_' : ''}</span>
        ) : null}
      </div>
    </div>
  );
};

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const bgDots = Array.from({ length: 100 }).map((_, i) => {
    const x = random(`x-${i}`) * width;
    const y = random(`y-${i}`) * height;
    const opacity = interpolate(
      (frame + random(`o-${i}`) * 100) % 100,
      [0, 50, 100],
      [0, 0.3, 0]
    );
    return <div key={i} className="absolute w-1 h-1 bg-green-500 rounded-full" style={{ left: x, top: y, opacity }} />;
  });

  return (
    <AbsoluteFill className="bg-black flex flex-col items-center justify-center p-12 overflow-hidden">
      {bgDots}
      
      <div className="z-10 w-full max-w-2xl space-y-12">
        {/* TOR Section */}
        <div className="bg-gray-900/50 border-l-4 border-green-500 p-6 backdrop-blur-sm">
          <GlitchText text="[ SYSTEM: TOR ]" className="text-green-500 font-mono text-sm mb-4 opacity-70" delay={10} />
          <StatusLine label="NETWORK_IDENTITY" value="IP_HIDDEN" delay={20} />
          <div className="text-gray-400 font-mono text-lg italic">
            "TOR hides your IP."
          </div>
        </div>

        {/* TAILS Section */}
        <div className="bg-gray-900/50 border-l-4 border-blue-500 p-6 backdrop-blur-sm">
          <GlitchText text="[ SYSTEM: TAILS ]" className="text-blue-500 font-mono text-sm mb-4 opacity-70" delay={60} />
          <StatusLine label="STORAGE_STATE" value="WIPED_ON_SHUTDOWN" delay={70} color="text-blue-400" />
          <div className="text-gray-400 font-mono text-lg italic">
            "TAILS removes files after shutdown."
          </div>
        </div>

        {/* Conclusion */}
        <div className="text-center space-y-6 pt-8">
          <div className="overflow-hidden">
            <GlitchText 
              text="THAT’S IT." 
              className="text-white font-mono text-5xl font-bold tracking-tighter" 
              delay={120} 
            />
          </div>
          
          <div className="bg-red-900/20 border border-red-500/50 p-4 rounded animate-pulse">
            <GlitchText 
              text="WARNING: They don’t hide how you act online." 
              className="text-red-500 font-mono text-xl" 
              delay={160} 
            />
          </div>
        </div>
      </div>

      {/* Decorative scanning line */}
      <div 
        className="absolute w-full h-1 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
        style={{
          top: (frame * 5) % height,
        }}
      />
    </AbsoluteFill>
  );
};

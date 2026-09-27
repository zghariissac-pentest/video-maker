import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  random,
} from 'remotion';

const PatternNode: React.FC<{ delay: number; x: number; y: number; size: number }> = ({ delay, x, y, size }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  if (frame < delay) return null;

  return (
    <div 
      className="absolute border border-red-500/30 rounded-full flex items-center justify-center"
      style={{ 
        left: x, 
        top: y, 
        width: size, 
        height: size,
        opacity: progress * 0.5,
        transform: `scale(${interpolate(progress, [0, 1], [0.8, 1])})`
      }}
    >
      <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
    </div>
  );
};

export const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const text1 = "People don’t get caught because TOR failed.";
  const text2 = "They get caught because patterns are the reason.";

  const t1Opacity = spring({ frame: frame - 20, fps, config: { damping: 12 } });
  const t2Opacity = spring({ frame: frame - 120, fps, config: { damping: 12 } });

  const patternVisibility = spring({
    frame: frame - 140,
    fps,
    config: { damping: 20 },
  });

  // Generate a web of patterns
  const nodes = Array.from({ length: 24 }).map((_, i) => ({
    x: random(`node-x-${i}`) * width,
    y: random(`node-y-${i}`) * height,
    size: 40 + random(`node-s-${i}`) * 60,
    delay: 150 + i * 10,
  }));

  return (
    <AbsoluteFill className="bg-black overflow-hidden flex flex-col items-center justify-center p-20">
      {/* Background: The "Pattern Web" */}
      <div className="absolute inset-0 pointer-events-none">
        {nodes.map((node, i) => (
          <PatternNode key={i} {...node} />
        ))}
        
        {/* Connection lines between nodes */}
        {frame > 180 && (
          <svg className="absolute inset-0 w-full h-full">
            {nodes.map((node, i) => {
              const nextNode = nodes[(i + 1) % nodes.length];
              return (
                <line
                  key={i}
                  x1={node.x + node.size / 2}
                  y1={node.y + node.size / 2}
                  x2={nextNode.x + nextNode.size / 2}
                  y2={nextNode.y + nextNode.size / 2}
                  stroke="rgba(239, 68, 68, 0.2)"
                  strokeWidth="1"
                  style={{ opacity: patternVisibility }}
                />
              );
            })}
          </svg>
        )}
      </div>

      <div className="z-10 text-center space-y-12 max-w-4xl">
        {/* First Statement */}
        <div 
          className="font-mono text-3xl text-gray-400 border-l-4 border-green-500 pl-8 py-4 bg-green-500/5"
          style={{ opacity: t1Opacity }}
        >
          {text1}
        </div>

        {/* Second Statement - The Punchline */}
        <div 
          className="font-mono text-5xl font-bold text-white leading-tight"
          style={{ 
            opacity: t2Opacity,
            transform: `translateY(${interpolate(t2Opacity, [0, 1], [20, 0])}px)`
          }}
        >
          {text2.split('patterns').map((part, i, arr) => (
            <React.Fragment key={i}>
              {part}
              {i < arr.length - 1 && <span className="text-red-500 underline decoration-red-500/50 underline-offset-8">patterns</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Decorative glitch elements */}
      <div className="absolute bottom-10 left-10 font-mono text-[10px] text-red-900/40">
        ERROR_LOG: PATTERN_RECOGNITION_COMPLETE<br />
        MATCH_FOUND: TRUE<br />
        ANONYMITY: NULL
      </div>

      {/* Scanning overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(transparent, rgba(239, 68, 68, ${0.05 * patternVisibility}), transparent)`,
          height: '20%',
          top: (frame * 4) % height,
        }}
      />
    </AbsoluteFill>
  );
};

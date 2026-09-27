import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  random,
} from 'remotion';

const StylometryNode: React.FC<{ label: string; value: string; delay: number; x: number; y: number }> = ({ label, value, delay, x, y }) => {
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
      className="absolute flex flex-col items-center"
      style={{ 
        left: x, 
        top: y, 
        opacity: progress,
        transform: `scale(${interpolate(progress, [0, 1], [0.5, 1])})`
      }}
    >
      <div className="w-2 h-2 bg-purple-500 rounded-full mb-2 shadow-[0_0_10px_#a855f7]" />
      <div className="text-purple-400 font-mono text-[10px] uppercase tracking-tighter mb-1">{label}</div>
      <div className="text-white font-mono text-sm bg-purple-900/20 px-2 py-1 rounded border border-purple-500/30">
        {value}
      </div>
    </div>
  );
};

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const text1 = "And language?";
  const text2 = "Your writing style is basically a behavioral signature.";
  const text3 = "That follows you everywhere.";

  const t1Opacity = spring({ frame: frame - 10, fps, config: { damping: 12 } });
  const t2Opacity = spring({ frame: frame - 80, fps, config: { damping: 12 } });
  const t3Opacity = spring({ frame: frame - 180, fps, config: { damping: 12 } });

  const connectionProgress = spring({
    frame: frame - 220,
    fps,
    config: { damping: 20 },
  });

  return (
    <AbsoluteFill className="bg-black overflow-hidden p-16">
      {/* Background: Faded text snippets */}
      <div className="absolute inset-0 opacity-5 font-serif text-xs p-8 leading-relaxed select-none pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="mb-4">
            {Array.from({ length: 50 }).map((_, j) => 
              random(`bg-text-${i}-${j}`) > 0.5 ? 'the ' : 'and '
            ).join('')}
          </p>
        ))}
      </div>

      <div className="z-10 flex flex-col h-full">
        {/* Script Text */}
        <div className="mb-12 space-y-6">
          <div style={{ opacity: t1Opacity }} className="text-purple-500 font-mono text-4xl font-bold">
            {text1}
          </div>
          <div style={{ opacity: t2Opacity }} className="text-gray-300 font-mono text-2xl leading-tight max-w-2xl">
            {text2}
          </div>
          <div style={{ opacity: t3Opacity }} className="text-purple-400 font-mono text-xl italic">
            {text3}
          </div>
        </div>

        {/* Stylometry Analysis Visualization */}
        <div className="flex-1 relative border border-purple-900/30 bg-purple-950/5 rounded-2xl overflow-hidden">
          {/* Central "Signature" */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-64 h-64 border-2 border-purple-500/20 rounded-full flex items-center justify-center"
              style={{ transform: `rotate(${frame * 0.2}deg)` }}
            >
              <div className="w-48 h-48 border border-purple-500/40 rounded-full animate-pulse" />
            </div>
            <div className="absolute text-center">
              <div className="text-purple-500 font-mono text-[10px] mb-1">STYLOMETRIC_PROFILE</div>
              <div className="text-white font-mono text-4xl font-black tracking-widest">
                {frame > 150 ? 'USER_X' : '???'}
              </div>
            </div>
          </div>

          {/* Analysis Nodes */}
          <StylometryNode label="Punctuation_Density" value="HIGH" delay={100} x={width * 0.1} y={height * 0.4} />
          <StylometryNode label="Vocabulary_Richness" value="88%" delay={120} x={width * 0.7} y={height * 0.3} />
          <StylometryNode label="Sentence_Structure" value="COMPLEX" delay={140} x={width * 0.2} y={height * 0.7} />
          <StylometryNode label="Common_Typos" value="['teh', 'recieve']" delay={160} x={width * 0.6} y={height * 0.75} />

          {/* Connection Lines */}
          {frame > 220 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line 
                x1={width * 0.1 + 40} y1={height * 0.4 + 20} 
                x2={width * 0.5} y2={height * 0.5} 
                stroke="#a855f7" strokeWidth="1" strokeDasharray="4"
                style={{ opacity: connectionProgress * 0.5 }}
              />
              <line 
                x1={width * 0.7 + 40} y1={height * 0.3 + 20} 
                x2={width * 0.5} y2={height * 0.5} 
                stroke="#a855f7" strokeWidth="1" strokeDasharray="4"
                style={{ opacity: connectionProgress * 0.5 }}
              />
              <line 
                x1={width * 0.2 + 40} y1={height * 0.7 + 20} 
                x2={width * 0.5} y2={height * 0.5} 
                stroke="#a855f7" strokeWidth="1" strokeDasharray="4"
                style={{ opacity: connectionProgress * 0.5 }}
              />
              <line 
                x1={width * 0.6 + 40} y1={height * 0.75 + 20} 
                x2={width * 0.5} y2={height * 0.5} 
                stroke="#a855f7" strokeWidth="1" strokeDasharray="4"
                style={{ opacity: connectionProgress * 0.5 }}
              />
            </svg>
          )}
        </div>

        {/* Bottom Status */}
        <div className="mt-8 flex justify-between items-end font-mono text-[10px] text-purple-900">
          <div>LINGUISTIC_FINGERPRINTING: ACTIVE</div>
          <div>BEHAVIORAL_MATCH_CONFIDENCE: 99.2%</div>
          <div className="text-red-600 animate-pulse">ANONYMITY_COMPROMISED</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

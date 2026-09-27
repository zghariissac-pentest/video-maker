import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../components/HackingTheme';

export const Scene2_Interface: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      <CyberBackground />
      <HUD title="INTERFACE ANALYSIS" />
      
      <div className="z-20 flex flex-col items-center justify-center h-full px-20">
        <div className="max-w-4xl space-y-12">
          <div className="relative p-8 border border-green-500/30 bg-green-500/5 backdrop-blur-md rounded-xl">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-green-500" />
            <GlitchText 
              text="A tool is just an interface to an exploit." 
              className="text-3xl md:text-5xl font-mono text-white leading-tight"
            />
          </div>

          <div 
            className="relative p-8 border border-red-500/30 bg-red-500/5 backdrop-blur-md rounded-xl self-end"
            style={{ opacity }}
          >
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-red-500" />
            <GlitchText 
              text="If you don’t understand why it works, you’re useless the moment it fails." 
              className="text-2xl md:text-4xl font-mono text-gray-300 leading-tight"
              delay={40}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../components/HackingTheme';

export const Scene5_Firewall: React.FC = () => {
  const frame = useCurrentFrame();
  const alertOpacity = interpolate(Math.sin(frame * 0.2), [-1, 1], [0.1, 0.4]);

  return (
    <AbsoluteFill>
      <CyberBackground />
      <HUD title="SECURITY MITIGATION DETECTED" />
      
      {/* Alert Overlay */}
      <div 
        className="absolute inset-0 bg-red-600 z-10 pointer-events-none"
        style={{ opacity: alertOpacity }}
      />

      <div className="z-20 flex flex-col items-center justify-center h-full px-20 gap-12">
        <div className="w-full max-w-4xl space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 border-2 border-red-500 flex items-center justify-center text-red-500 font-bold text-4xl">!</div>
            <GlitchText 
              text="If a firewall drops SYNs but allows ACKs," 
              className="text-2xl md:text-4xl font-mono text-white"
            />
          </div>

          <div className="pl-26">
            <GlitchText 
              text="and you don’t understand TCP state," 
              className="text-xl md:text-3xl font-mono text-gray-400"
              delay={40}
            />
          </div>

          <div className="pt-8 text-center">
            <GlitchText 
              text="your scan lies to you." 
              className="text-5xl md:text-7xl font-mono text-red-500 font-black uppercase tracking-tighter"
              delay={80}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

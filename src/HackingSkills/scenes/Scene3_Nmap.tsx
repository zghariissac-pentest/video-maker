import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../components/HackingTheme';

const RadarScan: React.FC = () => {
  const frame = useCurrentFrame();
  const rotation = (frame * 3) % 360;
  
  return (
    <div className="relative w-64 h-64 rounded-full border border-green-500/30 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(34,197,94,0.1)_0%,transparent_70%)]" />
      <div 
        className="absolute w-full h-1/2 top-0 origin-bottom bg-gradient-to-t from-green-500/20 to-transparent"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
      <div className="w-full h-[1px] bg-green-500/20 absolute" />
      <div className="h-full w-[1px] bg-green-500/20 absolute" />
      <div className="w-48 h-48 rounded-full border border-green-500/10 absolute" />
      <div className="w-32 h-32 rounded-full border border-green-500/10 absolute" />
    </div>
  );
};

export const Scene3_Nmap: React.FC = () => {
  return (
    <AbsoluteFill>
      <CyberBackground />
      <HUD title="TARGET ENUMERATION" />
      
      <div className="z-20 flex flex-col items-center justify-center h-full gap-12">
        <RadarScan />
        <div className="text-center space-y-4">
          <GlitchText 
            text="Take Nmap." 
            className="text-4xl md:text-6xl font-mono text-white uppercase tracking-widest"
          />
          <GlitchText 
            text="Most people run a scan and feel powerful." 
            className="text-xl md:text-3xl font-mono text-green-500/70"
            delay={30}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

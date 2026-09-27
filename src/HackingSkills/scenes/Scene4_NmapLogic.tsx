import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, random } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../components/HackingTheme';

const PacketFlow: React.FC = () => {
  const frame = useCurrentFrame();
  
  return (
    <div className="flex gap-4 h-32 items-center">
      {Array.from({ length: 8 }).map((_, i) => {
        const x = ((frame * 5 + i * 100) % 800) - 400;
        return (
          <div 
            key={i}
            className="w-12 h-16 border border-cyan-500/50 bg-cyan-500/10 flex flex-col items-center justify-center font-mono text-[8px] text-cyan-500"
            style={{ transform: `translateX(${x}px)` }}
          >
            <div>TCP</div>
            <div>{Math.floor(random(i) * 65535)}</div>
          </div>
        );
      })}
    </div>
  );
};

export const Scene4_NmapLogic: React.FC = () => {
  return (
    <AbsoluteFill>
      <CyberBackground />
      <HUD title="PACKET ANALYSIS" />
      
      <div className="z-20 flex flex-col items-center justify-center h-full px-20 gap-16">
        <div className="text-center">
          <GlitchText 
            text="But Nmap doesn’t discover anything by magic." 
            className="text-3xl md:text-5xl font-mono text-white mb-4"
          />
        </div>

        <PacketFlow />

        <div className="max-w-4xl text-center">
          <GlitchText 
            text="It sends crafted packets, reads TCP/IP behavior, analyzes flags, window sizes, TTL, timing." 
            className="text-xl md:text-3xl font-mono text-cyan-400 leading-relaxed"
            delay={60}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

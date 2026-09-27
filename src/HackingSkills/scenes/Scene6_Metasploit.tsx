import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../components/HackingTheme';

export const Scene6_Metasploit: React.FC = () => {
  return (
    <AbsoluteFill>
      <CyberBackground />
      <HUD title="EXPLOIT FRAMEWORK" />
      
      <div className="z-20 flex flex-col items-center justify-center h-full px-20 gap-12">
        <div className="w-full max-w-3xl border border-green-500/20 bg-black/60 rounded-lg overflow-hidden">
          <div className="bg-green-500/20 px-6 py-2 border-b border-green-500/20 flex justify-between items-center">
            <span className="font-mono text-xs text-green-500">msfconsole</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
          </div>
          
          <div className="p-8 space-y-6">
            <GlitchText 
              text="Same with Metasploit." 
              className="text-3xl md:text-5xl font-mono text-white"
            />
            <div className="h-[1px] bg-green-500/10 w-full" />
            <GlitchText 
              text="Click exploit, set payload, run." 
              className="text-xl md:text-3xl font-mono text-green-400"
              delay={40}
            />
          </div>
        </div>

        <div className="flex gap-4">
          {['EXPLOIT', 'PAYLOAD', 'ENCODER', 'NOP'].map((tag, i) => (
            <div key={tag} className="px-4 py-1 border border-green-500/30 text-[10px] font-mono text-green-500/50">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

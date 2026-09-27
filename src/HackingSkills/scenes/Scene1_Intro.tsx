import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../components/HackingTheme';

export const Scene1_Intro: React.FC = () => {
  return (
    <AbsoluteFill>
      <CyberBackground />
      <HUD title="SYSTEM INITIALIZATION" />
      
      <div className="z-20 flex flex-col items-center justify-center h-full px-20 text-center">
        <GlitchText 
          text="tools don’t hack systems." 
          className="text-5xl md:text-7xl font-mono text-white mb-8 tracking-tighter"
        />
        <GlitchText 
          text="skill do." 
          className="text-6xl md:text-8xl font-mono text-green-500 font-bold uppercase tracking-widest"
          delay={60}
        />
      </div>
    </AbsoluteFill>
  );
};

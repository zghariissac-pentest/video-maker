import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, random } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../components/HackingTheme';

export const Scene8_Conclusion: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Glitch effect
  const glitchX = frame % 10 === 0 ? (random(frame) - 0.5) * 50 : 0;
  const glitchOpacity = frame % 15 === 0 ? 0.5 : 1;

  return (
    <AbsoluteFill>
      <CyberBackground />
      <HUD title="SYSTEM DEGRADATION" />
      
      <div 
        className="z-20 flex flex-col items-center justify-center h-full px-20 gap-12"
        style={{ transform: `translateX(${glitchX}px)`, opacity: glitchOpacity }}
      >
        <div className="space-y-8 text-center">
          <GlitchText 
            text="Tools break." 
            className="text-4xl md:text-6xl font-mono text-white"
          />
          <GlitchText 
            text="Signatures update." 
            className="text-4xl md:text-6xl font-mono text-white"
            delay={30}
          />
          <GlitchText 
            text="Defenses adapt." 
            className="text-4xl md:text-6xl font-mono text-white"
            delay={60}
          />
          <div className="pt-12">
            <GlitchText 
              text="Skills don’t." 
              className="text-6xl md:text-8xl font-mono text-green-500 font-black uppercase tracking-widest drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]"
              delay={100}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

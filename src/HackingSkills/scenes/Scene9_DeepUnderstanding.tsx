import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../components/HackingTheme';

export const Scene9_DeepUnderstanding: React.FC = () => {
  return (
    <AbsoluteFill>
      <CyberBackground />
      <HUD title="ROOT ACCESS GRANTED" />
      
      <div className="z-20 flex flex-col items-center justify-center h-full px-10">
        <div className="w-full max-w-5xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <GlitchText 
                text="If you understand networking at the packet level," 
                className="text-lg md:text-xl font-mono text-gray-400"
              />
              <GlitchText 
                text="how operating systems manage memory," 
                className="text-lg md:text-xl font-mono text-gray-400"
                delay={20}
              />
              <GlitchText 
                text="how compilers transform code," 
                className="text-lg md:text-xl font-mono text-gray-400"
                delay={40}
              />
              <GlitchText 
                text="how humans misconfigure systems," 
                className="text-lg md:text-xl font-mono text-gray-400"
                delay={60}
              />
            </div>

            <div className="flex flex-col justify-center space-y-6">
              <GlitchText 
                text="You don’t depend on tools." 
                className="text-2xl md:text-4xl font-mono text-green-400 font-bold"
                delay={100}
              />
              <GlitchText 
                text="You bend them." 
                className="text-3xl md:text-5xl font-mono text-green-500 font-bold"
                delay={130}
              />
              <GlitchText 
                text="Or you build your own." 
                className="text-3xl md:text-5xl font-mono text-green-600 font-bold"
                delay={160}
              />
              <GlitchText 
                text="Tools give speed." 
                className="text-2xl md:text-4xl font-mono text-white/50 italic"
                delay={200}
              />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

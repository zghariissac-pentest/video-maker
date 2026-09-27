import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  random,
} from 'remotion';

const MatrixBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const columns = Math.floor(width / 20);
  
  return (
    <AbsoluteFill className="bg-black overflow-hidden">
      {Array.from({ length: columns }).map((_, i) => {
        const speed = 1 + (i % 5) * 0.5;
        const offset = (i * 79) % height;
        const y = (frame * speed + offset) % (height + 200) - 100;
        
        return (
          <div
            key={i}
            className="absolute text-green-500 font-mono text-xs opacity-20"
            style={{
              left: i * 20,
              top: y,
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => 
              random(`matrix-${i}-${j}`) > 0.5 ? '1' : '0'
            ).join('')}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  // removed unused fps

  const text1 = "TOR isn’t the problem.";
  const text2 = "Most people just misunderstand what it actually does.";

  const typingSpeed = 2; // frames per character
  
  const charsShown1 = Math.floor(frame / typingSpeed);
  const displayedText1 = text1.slice(0, charsShown1);
  
  const startFrame2 = text1.length * typingSpeed + 30;
  const charsShown2 = Math.floor((frame - startFrame2) / typingSpeed);
  const displayedText2 = charsShown2 > 0 ? text2.slice(0, charsShown2) : "";

  const cursorOpacity = interpolate(
    (frame % 20),
    [0, 10, 11, 20],
    [1, 1, 0, 0]
  );

  return (
    <AbsoluteFill className="bg-black flex items-center justify-center p-20">
      <MatrixBackground />
      
      <div className="z-10 w-full max-w-4xl">
        <div className="bg-gray-900 border border-green-500 rounded-lg p-8 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          <div className="flex items-center gap-2 mb-6 border-b border-green-900 pb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 font-mono text-green-700 text-sm">terminal — tor-info</span>
          </div>
          
          <div className="font-mono text-3xl md:text-5xl leading-tight">
            <div className="flex flex-wrap items-center gap-x-4 mb-8">
              <span className="text-green-500">$</span>
              <span className="text-white">
                {displayedText1}
                {frame < startFrame2 && (
                  <span style={{ opacity: cursorOpacity }} className="inline-block w-4 h-10 bg-green-500 ml-1 align-middle" />
                )}
              </span>
            </div>
            
            {frame >= startFrame2 && (
              <div className="flex flex-wrap items-center gap-x-4">
                <span className="text-green-500">$</span>
                <span className="text-gray-300">
                  {displayedText2}
                  <span style={{ opacity: cursorOpacity }} className="inline-block w-4 h-10 bg-green-500 ml-1 align-middle" />
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-12 flex justify-center gap-8">
          <div className="flex items-center gap-3 text-green-500 font-mono opacity-50">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>ENCRYPTED</span>
          </div>
          <div className="flex items-center gap-3 text-green-500 font-mono opacity-50">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>ANONYMOUS</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

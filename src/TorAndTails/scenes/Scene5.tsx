import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  random,
} from 'remotion';

const HexStream: React.FC<{ delay: number; x: number }> = ({ delay, x }) => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();
  const speed = 5;
  const y = ((frame - delay) * speed) % (height + 200) - 100;
  
  if (frame < delay) return null;

  return (
    <div 
      className="absolute font-mono text-[10px] text-green-900/40 whitespace-nowrap"
      style={{ left: x, top: y, writingMode: 'vertical-rl' }}
    >
      {Array.from({ length: 20 }).map((_, i) => 
        Math.floor(random(`hex-${delay}-${i}`) * 256).toString(16).padStart(2, '0').toUpperCase()
      ).join(' ')}
    </div>
  );
};

const FingerprintItem: React.FC<{ label: string; value: string; delay: number; status: 'LEAKED' | 'EXTRACTING' }> = ({ label, value, delay, status }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  if (frame < delay) return null;

  return (
    <div className="flex flex-col mb-6" style={{ opacity: progress }}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">{label}</span>
        <span className={`font-mono text-[10px] px-2 py-0.5 rounded ${status === 'LEAKED' ? 'bg-red-900/40 text-red-500' : 'bg-yellow-900/40 text-yellow-500 animate-pulse'}`}>
          {status}
        </span>
      </div>
      <div className="font-mono text-xl text-white border-b border-gray-800 pb-2">
        {value}
      </div>
    </div>
  );
};

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const text1 = "Even encrypted apps leak fingerprints.";
  const text2 = "TLS handshakes, browser behavior, rendering quirks.";

  const t1Opacity = spring({ frame: frame - 10, fps, config: { damping: 12 } });
  const t2Opacity = spring({ frame: frame - 100, fps, config: { damping: 12 } });

  const fingerprintProgress = spring({
    frame: frame - 200,
    fps,
    config: { damping: 20 },
  });

  return (
    <AbsoluteFill className="bg-black overflow-hidden">
      {/* Background Hex Streams */}
      {Array.from({ length: 15 }).map((_, i) => (
        <HexStream key={i} delay={i * 20} x={(i * width) / 15} />
      ))}

      <div className="z-10 p-16 flex flex-col h-full">
        {/* Header Text */}
        <div className="mb-12">
          <div style={{ opacity: t1Opacity }} className="text-red-500 font-mono text-3xl font-bold mb-4">
            {text1}
          </div>
          <div style={{ opacity: t2Opacity }} className="text-gray-400 font-mono text-xl leading-relaxed">
            {text2}
          </div>
        </div>

        {/* Fingerprint Extraction UI */}
        <div className="flex-1 flex gap-12">
          {/* Left: Metadata List */}
          <div className="flex-1 space-y-4">
            <FingerprintItem 
              label="TLS_HANDSHAKE_SIGNATURE" 
              value="0x7A 0x1B 0xCC 0x92..." 
              delay={120} 
              status="LEAKED" 
            />
            <FingerprintItem 
              label="BROWSER_BEHAVIOR_PROFILE" 
              value="CHROME_ENGINE_V8_EXT" 
              delay={150} 
              status="LEAKED" 
            />
            <FingerprintItem 
              label="RENDERING_QUIRKS" 
              value="CANVAS_HASH_8821_AF" 
              delay={180} 
              status="EXTRACTING" 
            />
          </div>

          {/* Right: Fingerprint Visualization */}
          <div className="w-1/3 flex flex-col items-center justify-center border border-gray-800 bg-gray-900/20 rounded-xl p-8 relative">
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <div 
                className="w-full h-full" 
                style={{ 
                  backgroundImage: 'radial-gradient(circle, #ef4444 1px, transparent 1px)', 
                  backgroundSize: '10px 10px' 
                }} 
              />
            </div>
            
            <div 
              className="w-48 h-48 border-2 border-red-500/50 rounded-full flex items-center justify-center relative mb-6"
              style={{ transform: `scale(${interpolate(fingerprintProgress, [0, 1], [0.8, 1])})` }}
            >
              <div className="absolute inset-2 border border-red-500/20 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
              <div className="text-red-500 font-mono text-4xl font-black">
                {frame > 220 ? 'ID_772' : '???'}
              </div>
              
              {/* Scanning line */}
              <div 
                className="absolute w-full h-0.5 bg-red-500 shadow-[0_0_15px_#ef4444]"
                style={{ top: interpolate(Math.sin(frame / 10), [-1, 1], [0, 100]) + '%' }}
              />
            </div>
            
            <div className="text-center">
              <div className="text-gray-500 font-mono text-[10px] mb-1">UNIQUE_FINGERPRINT_HASH</div>
              <div className="text-red-500 font-mono text-xs break-all">
                {frame > 200 ? 'f4e2-991b-88ac-0012-cc77' : 'calculating...'}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status */}
        <div className="mt-8 flex justify-between items-end font-mono text-[10px]">
          <div className="text-green-900">ENCRYPTION: AES-256-GCM (BYPASSED_VIA_METADATA)</div>
          <div className="text-red-900 animate-pulse">IDENTITY_RECONSTRUCTION_IN_PROGRESS...</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

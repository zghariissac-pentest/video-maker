import { AbsoluteFill, useCurrentFrame, random } from 'remotion';

export const CyberBackground: React.FC<{ isStatic?: boolean }> = ({ isStatic }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="bg-[#050505] overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: isStatic ? 'none' : `translateY(${(frame * 0.5) % 40}px)`,
        }}
      />

      {/* Scanning Line */}
      {!isStatic && (
        <div
          className="absolute w-full h-[2px] bg-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.5)] z-10"
          style={{
            top: `${(frame * 2) % 100}%`,
          }}
        />
      )}

      {/* Random Data Streams */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-[10px] font-mono text-green-500/10 whitespace-nowrap"
          style={{
            left: `${random(i) * 100}%`,
            top: `${random(i + 10) * 100}%`,
            writingMode: 'vertical-rl',
          }}
        >
          {Array.from({ length: 50 }).map(() =>
            Math.floor(random(isStatic ? i : frame + i) * 16).toString(16)
          ).join('')}
        </div>
      ))}
    </AbsoluteFill>
  );
};

export const HUD: React.FC<{ title: string; showCorners?: boolean }> = ({ title, showCorners = true }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="pointer-events-none">
      {/* Corners */}
      {showCorners && (
        <>
          <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-green-500/50" />
          <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-green-500/50" />
          <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-green-500/50" />
          <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-green-500/50" />
        </>
      )}

      {/* Top Bar */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-2 bg-green-500/10 border border-green-500/30 rounded-full backdrop-blur-sm">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="font-mono text-green-500 text-sm tracking-[0.2em] uppercase">{title}</span>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </div>

      {/* Side Data */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-2 font-mono text-[10px] text-green-500/40">
        <div>LATENCY: {Math.floor(random(frame) * 50 + 10)}ms</div>
        <div>PACKETS: {Math.floor(frame * 1.5)}</div>
        <div>BUFFER: {(random(frame) * 100).toFixed(2)}%</div>
      </div>

      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2 font-mono text-[10px] text-green-500/40 text-right">
        <div>COORDS: {Math.floor(random(frame) * 1000)}, {Math.floor(random(frame + 1) * 1000)}</div>
        <div>STATUS: ACTIVE</div>
        <div>ENCRYPTION: AES-256</div>
      </div>
    </AbsoluteFill>
  );
};

export const SmoothWriteText: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className, delay = 0 }) => {
  const frame = useCurrentFrame();
  const progress = Math.max(0, frame - delay);

  // Roughly 1.5 characters per frame for a smooth writing feel
  const visibleChars = Math.floor(progress * 1.5);
  const currentText = text.slice(0, visibleChars);

  if (progress <= 0) return null;

  return (
    <div className={className}>
      {currentText}
      {visibleChars < text.length && (
        <span className="inline-block w-[3px] h-[1.2em] bg-green-500/80 align-middle ml-1" />
      )}
    </div>
  );
};

export const GlitchText: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className, delay = 0 }) => {
  const frame = useCurrentFrame();
  const progress = Math.max(0, frame - delay);

  if (progress <= 0) return null;

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
  const scrambled = text.split('').map((char, i) => {
    if (progress > i * 2 + 10) return char;
    if (progress > i * 2) return chars[Math.floor(random(frame + i) * chars.length)];
    return "";
  }).join('');

  return (
    <div className={className}>
      {scrambled}
      {progress < text.length * 2 + 10 && (
        <span className="inline-block w-[0.5em] h-[1em] bg-green-500 animate-pulse ml-1" />
      )}
    </div>
  );
};

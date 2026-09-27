import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';

export const SpaceBackground: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill className="bg-[#02040a] overflow-hidden">
            {/* Deep Space Gradient */}
            <div
                className="absolute inset-0 opacity-60"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, #1a237e 0%, #02040a 100%)',
                }}
            />

            {/* Stars */}
            {Array.from({ length: 150 }).map((_, i) => {
                const x = (Math.sin(i * 123.45) * 0.5 + 0.5) * 100;
                const y = (Math.cos(i * 678.90) * 0.5 + 0.5) * 100;
                const size = (Math.sin(i) * 0.5 + 0.5) * 2 + 1;
                const opacity = (Math.sin(frame / 20 + i) * 0.5 + 0.5) * 0.8 + 0.2;

                return (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full"
                        style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            width: size,
                            height: size,
                            opacity,
                            boxShadow: size > 2 ? '0 0 5px white' : 'none',
                        }}
                    />
                );
            })}

            {/* Nebula/Glow Effects */}
            <div
                className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-20 bg-purple-600"
                style={{
                    transform: `translate(${Math.sin(frame / 100) * 50}px, ${Math.cos(frame / 100) * 50}px)`,
                }}
            />
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] opacity-20 bg-blue-500"
                style={{
                    transform: `translate(${Math.cos(frame / 120) * 40}px, ${Math.sin(frame / 120) * 40}px)`,
                }}
            />
        </AbsoluteFill>
    );
};

export const WindowsDesktop: React.FC<{ scale?: number; opacity?: number }> = ({ scale = 1, opacity = 1 }) => {
    return (
        <div
            className="relative w-[800px] h-[500px] rounded-xl overflow-hidden shadow-2xl border border-white/10"
            style={{
                transform: `scale(${scale})`,
                opacity,
                background: 'linear-gradient(135deg, #0078d4 0%, #00182b 100%)',
            }}
        >
            {/* Windows 11 Wallpaper Look */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-400 rounded-full blur-[100px]" />
            </div>

            {/* Taskbar */}
            <div className="absolute bottom-0 w-full h-12 bg-black/40 backdrop-blur-md border-t border-white/5 flex items-center justify-center gap-2">
                {/* Start Icon */}
                <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="6.5" height="6.5" fill="#00BDF2" />
                        <rect x="8.5" y="1" width="6.5" height="6.5" fill="#00BDF2" />
                        <rect x="1" y="8.5" width="6.5" height="6.5" fill="#00BDF2" />
                        <rect x="8.5" y="8.5" width="6.5" height="6.5" fill="#00BDF2" />
                    </svg>
                </div>
                {/* Icons */}
                <div className="w-8 h-8 rounded bg-white/5" />
                <div className="w-8 h-8 rounded bg-white/5" />
                <div className="w-8 h-8 rounded bg-white/5" />
            </div>

            {/* Desktop Icons */}
            <div className="absolute top-8 left-8 flex flex-col gap-8">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 bg-white/10 rounded-md backdrop-blur-sm border border-white/20" />
                        <div className="w-12 h-2 bg-white/20 rounded-full" />
                    </div>
                ))}
            </div>

            {/* Open Window */}
            <div className="absolute top-20 left-40 w-[400px] h-[250px] bg-black/60 backdrop-blur-xl rounded-lg border border-white/20 shadow-xl overflow-hidden">
                <div className="h-8 bg-white/5 flex items-center px-3 justify-between">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    </div>
                    <div className="w-20 h-2 bg-white/10 rounded-full" />
                </div>
                <div className="p-4 space-y-2">
                    <div className="h-4 bg-blue-500/20 rounded w-3/4" />
                    <div className="h-4 bg-white/5 rounded w-full" />
                    <div className="h-4 bg-white/5 rounded w-5/6" />
                    <div className="h-4 bg-white/5 rounded w-1/2" />
                </div>
            </div>
        </div>
    );
};

export const WindowsLogo: React.FC<{ size?: number; className?: string }> = ({ size = 200, className }) => {
    const frame = useCurrentFrame();

    // Floating animation
    const translateY = Math.sin(frame / 25) * 20;
    const rotate = Math.cos(frame / 40) * 8;

    return (
        <div
            className={className}
            style={{
                width: size,
                height: size,
                transform: `translateY(${translateY}px) rotate(${rotate}deg)`,
                filter: 'drop-shadow(0 0 50px rgba(0, 189, 242, 0.4))'
            }}
        >
            <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="0" width="7.5" height="7.5" fill="#00BDF2" />
                <rect x="8.5" y="0" width="7.5" height="7.5" fill="#00BDF2" />
                <rect x="0" y="8.5" width="7.5" height="7.5" fill="#00BDF2" />
                <rect x="8.5" y="8.5" width="7.5" height="7.5" fill="#00BDF2" />
            </svg>
        </div>
    );
};

export const ProcessBox: React.FC<{ label: string; active?: boolean; className?: string }> = ({ label, active, className }) => {
    return (
        <div
            className={`px-8 py-4 bg-black/60 backdrop-blur-md border ${active ? 'border-blue-500 shadow-[0_0_20px_rgba(0,189,242,0.3)]' : 'border-white/20'} rounded-xl flex items-center gap-4 ${className}`}
        >
            <div className={`w-3 h-3 rounded-full ${active ? 'bg-blue-500 animate-pulse' : 'bg-white/20'}`} />
            <span className="text-2xl font-mono text-white tracking-widest uppercase">{label}</span>
        </div>
    );
};

export const DataHash: React.FC<{ hash: string; delay?: number; className?: string; style?: React.CSSProperties }> = ({ hash, delay = 0, className, style }) => {
    const frame = useCurrentFrame();
    const progress = Math.max(0, frame - delay);
    const opacity = interpolate(progress, [0, 10], [0, 1], { extrapolateLeft: 'clamp' });

    return (
        <div
            className={`font-mono text-xl text-blue-400/70 select-none ${className}`}
            style={{ ...style, opacity }}
        >
            {hash}
        </div>
    );
};

export const InfoCard: React.FC<{ title: string; content: string; delay?: number; className?: string }> = ({ title, content, delay = 0, className }) => {
    const frame = useCurrentFrame();
    const progress = Math.max(0, frame - delay);
    const springValue = spring({ frame: progress, fps: 30, config: { damping: 10, stiffness: 100 } });

    const translateY = interpolate(springValue, [0, 1], [100, 0]);
    const scale = interpolate(springValue, [0, 1], [0.8, 1]);

    return (
        <div
            className={`p-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] max-w-2xl shadow-2xl ${className}`}
            style={{
                transform: `translateY(${translateY}px) scale(${scale})`,
                opacity: interpolate(progress, [0, 10], [0, 1]),
                direction: 'rtl'
            }}
        >
            <h3 className="text-5xl font-bold text-blue-400 mb-6 font-[Cairo] leading-tight">{title}</h3>
            <p className="text-2xl text-white/90 leading-[1.8] font-[Cairo]">{content}</p>
        </div>
    );
};

export const GearIcon: React.FC<{ active?: boolean; className?: string }> = ({ active, className }) => {
    const frame = useCurrentFrame();
    const rotation = active ? (frame * 2) : 0;

    return (
        <div className={className} style={{ transform: `rotate(${rotation}deg)` }}>
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="#00BDF2" />
                <path fillRule="evenodd" clipRule="evenodd" d="M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.97 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14.01 2H10C9.75 2 9.54 2.18 9.51 2.42L9.13 5.07C8.52 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.73 4.97 4.46 5.05 4.34 5.27L2.34 8.73C2.21 8.95 2.27 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.67 4.5 12C4.5 12.33 4.53 12.66 4.57 12.98L2.46 14.63C2.27 14.78 2.22 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.73 19.03 4.95 18.95L7.44 17.95C7.96 18.35 8.52 18.68 9.13 18.93L9.51 21.58C9.54 21.82 9.75 22 9.99 22H14C14.24 22 14.45 21.82 14.48 21.58L14.86 18.93C15.47 18.68 16.03 18.34 16.55 17.95L19.04 18.95C19.26 19.03 19.53 18.95 19.65 18.73L21.65 15.27C21.77 15.05 21.72 14.78 21.53 14.63L19.43 12.98ZM12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z" fill="#00BDF2" fillOpacity="0.4" />
            </svg>
        </div>
    );
};

export const FileIcon: React.FC<{ type: 'safe' | 'malicious'; label?: string; className?: string }> = ({ type, label, className }) => {
    return (
        <div className={`p-8 rounded-[2rem] border-2 shadow-2xl backdrop-blur-md ${type === 'safe' ? 'border-blue-500/50 bg-blue-500/10' : 'border-red-500 bg-red-500/20'} flex flex-col items-center justify-center gap-4 ${className}`}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z"
                    stroke={type === 'safe' ? '#00BDF2' : '#ef4444'}
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={`text-xl font-bold font-mono uppercase tracking-tighter ${type === 'safe' ? 'text-blue-400' : 'text-red-500 animate-pulse'}`}>
                {label || (type === 'safe' ? 'SERVICE.EXE' : 'MALICIOUS.EXE')}
            </span>
        </div>
    );
};


export const ClockIcon: React.FC<{ className?: string }> = ({ className }) => {
    const frame = useCurrentFrame();
    const secondHandRotation = frame * 6; // Fast rotation for effect

    return (
        <div className={`relative ${className}`}>
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="#00BDF2" strokeWidth="2" fill="rgba(0,189,242,0.1)" />
                <path d="M12 7V12L15 15" stroke="#00BDF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line
                    x1="12" y1="12" x2="12" y2="5"
                    stroke="#00BDF2" strokeWidth="1"
                    style={{ transformOrigin: '12px 12px', transform: `rotate(${secondHandRotation}deg)` }}
                />
            </svg>
        </div>
    );
};

export const CleanText: React.FC<{
    text: string;
    secondaryText?: string;
    className?: string;
    delay?: number;
}> = ({ text, secondaryText, className, delay = 0 }) => {
    const frame = useCurrentFrame();
    const fps = 30;

    const springConfig = {
        damping: 12,
        stiffness: 100,
        mass: 0.5,
    };

    const anim = spring({
        frame: frame - delay,
        fps,
        config: springConfig,
    });

    const opacity = interpolate(frame - delay, [0, 15], [0, 1], { extrapolateLeft: 'clamp' });
    const translateY = interpolate(anim, [0, 1], [40, 0]);

    return (
        <div className={`flex flex-col items-center gap-4 ${className}`} style={{ opacity }}>
            <h1
                className="text-7xl font-bold text-white tracking-tight text-center"
                style={{
                    transform: `translateY(${translateY}px)`,
                    textShadow: '0 0 30px rgba(0,120,212,0.4)',
                    direction: 'rtl',
                    fontFamily: 'Cairo, sans-serif'
                }}
            >
                {text}
            </h1>
            {secondaryText && (
                <h2
                    className="text-4xl font-medium text-blue-400 tracking-wide text-center"
                    style={{
                        transform: `translateY(${translateY * 0.8}px)`,
                        opacity: interpolate(frame - delay - 10, [0, 20], [0, 1], { extrapolateLeft: 'clamp' }),
                        direction: 'rtl',
                        fontFamily: 'Cairo, sans-serif'
                    }}
                >
                    {secondaryText}
                </h2>
            )}
        </div>
    );
};

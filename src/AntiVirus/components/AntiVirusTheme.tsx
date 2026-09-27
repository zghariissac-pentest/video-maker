import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const SpaceBackground: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill className="bg-[#02040a] overflow-hidden">
            {/* Deep Space Gradient */}
            <div
                className="absolute inset-0 opacity-60"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, #0d1117 0%, #02040a 100%)',
                }}
            />

            {/* Subtle Nebula Background */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at 20% 30%, rgba(88, 28, 135, 0.15) 0%, transparent 70%), radial-gradient(circle at 80% 70%, rgba(30, 58, 138, 0.15) 0%, transparent 70%)',
                }}
            />

            {/* Deep Space Dust/Nebula Glows */}
            <div
                className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[150px] opacity-10 bg-purple-900"
                style={{
                    transform: `translate(${Math.sin(frame / 150) * 30}px, ${Math.cos(frame / 150) * 30}px)`,
                }}
            />
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[130px] opacity-10 bg-blue-900"
                style={{
                    transform: `translate(${Math.cos(frame / 180) * 40}px, ${Math.sin(frame / 180) * 40}px)`,
                }}
            />
        </AbsoluteFill>
    );
};

export const ShieldIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 100, color = "#3b82f6", className }) => {
    return (
        <div className={className} style={{ width: size, height: size }}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={`${color}22`} />
                <path d="M9 12L11 14L15 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
};

export const VirusIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 100, color = "#ef4444", className }) => {
    return (
        <div className={className} style={{ width: size, height: size }}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7V4M12 7C9.23858 7 7 9.23858 7 12M12 7C14.7614 7 17 9.23858 17 12M7 12H4M7 12C7 14.7614 9.23858 17 12 17M17 12H20M17 12C17 14.7614 14.7614 17 12 17M12 17V20M12 17C12 17 12 17 12 17M9 5L10.5 8M15 5L13.5 8M19 9L16 10.5M19 15L16 13.5M15 19L13.5 16M9 19L10.5 16M5 15L8 13.5M5 9L8 10.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="3" fill={color} />
            </svg>
        </div>
    );
};

export const SignatureIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 100, color = "#10b981", className }) => {
    return (
        <div className={className} style={{ width: size, height: size }}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4V20H20V13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
};

export const DatabaseIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 100, color = "#60a5fa", className }) => {
    return (
        <div className={className} style={{ width: size, height: size }}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="12" cy="5" rx="9" ry="3" stroke={color} strokeWidth="2" />
                <path d="M21 12C21 13.6569 16.9706 15 12 15C7.02944 15 3 13.6569 3 12" stroke={color} strokeWidth="2" />
                <path d="M21 5V19C21 20.6569 16.9706 22 12 22C7.02944 22 3 20.6569 3 19V5" stroke={color} strokeWidth="2" />
                <path d="M3 12V5" stroke={color} strokeWidth="2" />
            </svg>
        </div>
    );
};

export const ComparisonIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 100, color = "#facc15", className }) => {
    return (
        <div className={className} style={{ width: size, height: size }}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 3H21V8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 20L21 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 16V21H16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 15L21 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 4L9 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
};

export const WarningIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 100, color = "#f87171", className }) => {
    return (
        <div className={className} style={{ width: size, height: size }}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 20H22L12 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={`${color}22`} />
                <path d="M12 9V13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 17H12.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
};

export const PolymorphicIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 100, color = "#a855f7", className }) => {
    return (
        <div className={className} style={{ width: size, height: size }}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
};

export const ObfuscationIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 100, color = "#f472b6", className }) => {
    return (
        <div className={className} style={{ width: size, height: size }}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke={color} strokeWidth="2" />
                <path d="M12 22V12" stroke={color} strokeWidth="2" />
                <path d="M12 12L3.27 7" stroke={color} strokeWidth="2" />
                <path d="M12 12l8.73-5" stroke={color} strokeWidth="2" />
            </svg>
        </div>
    );
};

export const FilelessIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 100, color = "#fbbf24", className }) => {
    return (
        <div className={className} style={{ width: size, height: size }}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke={color} strokeWidth="2" strokeDasharray="4 4" />
                <path d="M12 11V14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 18H12.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
};

export const MemoryIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 100, color = "#34d399", className }) => {
    return (
        <div className={className} style={{ width: size, height: size }}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="5" width="20" height="14" rx="2" stroke={color} strokeWidth="2" />
                <line x1="6" y1="5" x2="6" y2="3" stroke={color} strokeWidth="2" />
                <line x1="10" y1="5" x2="10" y2="3" stroke={color} strokeWidth="2" />
                <line x1="14" y1="5" x2="14" y2="3" stroke={color} strokeWidth="2" />
                <line x1="18" y1="5" x2="18" y2="3" stroke={color} strokeWidth="2" />
                <line x1="6" y1="21" x2="6" y2="19" stroke={color} strokeWidth="2" />
                <line x1="10" y1="21" x2="10" y2="19" stroke={color} strokeWidth="2" />
                <line x1="14" y1="21" x2="14" y2="19" stroke={color} strokeWidth="2" />
                <line x1="18" y1="21" x2="18" y2="19" stroke={color} strokeWidth="2" />
                <rect x="6" y="9" width="3" height="6" rx="0.5" fill={`${color}44`} />
                <rect x="11" y="9" width="3" height="6" rx="0.5" fill={`${color}44`} />
                <rect x="16" y="9" width="3" height="6" rx="0.5" fill={`${color}44`} />
            </svg>
        </div>
    );
};

export const TerminalIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 100, color = "#60a5fa", className }) => {
    return (
        <div className={className} style={{ width: size, height: size }}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="2" />
                <path d="M7 10L10 12L7 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="12" y1="15" x2="16" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </svg>
        </div>
    );
};

export const ToolIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 100, color = "#94a3b8", className }) => {
    return (
        <div className={className} style={{ width: size, height: size }}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
};

export const BehaviorIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 100, color = "#f43f5e", className }) => {
    return (
        <div className={className} style={{ width: size, height: size }}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={`${color}22`} />
            </svg>
        </div>
    );
};

export const EDRIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 100, color = "#22d3ee", className }) => {
    return (
        <div className={className} style={{ width: size, height: size }}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 2 12 22Z" stroke={color} strokeWidth="2" />
                <path d="M12 2V12L17 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" fill={color} />
                <path d="M2 12H5M19 12H22M12 2V5M12 19V22" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </svg>
        </div>
    );
};

export const KeyIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 100, color = "#fbbf24", className }) => {
    return (
        <div className={className} style={{ width: size, height: size }}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="3" y="11" width="18" height="11" rx="2" stroke={color} strokeWidth="2" />
                <path d="M12 15v3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
};

export const NetworkIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 100, color = "#60a5fa", className }) => {
    return (
        <div className={className} style={{ width: size, height: size }}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M12 5l7 7-7 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="3" cy="12" r="2" fill={color} />
                <circle cx="21" cy="12" r="2" fill={color} />
            </svg>
        </div>
    );
};

export const LightEffectTitle: React.FC<{
    text: string;
    delay?: number;
    className?: string;
}> = ({ text, delay = 0, className }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const springValue = spring({
        frame: frame - delay,
        fps,
        config: {
            damping: 12,
            stiffness: 100,
            mass: 0.5,
        }
    });

    const opacity = interpolate(frame - delay, [0, 15], [0, 1], { extrapolateLeft: 'clamp' });
    const scale = interpolate(springValue, [0, 1], [0.8, 1]);
    const glowOpacity = interpolate(Math.sin(frame / 15), [-1, 1], [0.4, 0.9]);

    return (
        <div
            className={`flex flex-col items-center justify-center p-8 ${className}`}
            style={{
                opacity,
                transform: `scale(${scale})`,
            }}
        >
            <h1
                className="text-8xl font-black text-white text-center leading-tight drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                style={{
                    direction: 'rtl',
                    fontFamily: 'Cairo, sans-serif',
                    textShadow: `
                        0 0 10px rgba(255, 255, 255, ${glowOpacity}),
                        0 0 40px rgba(59, 130, 246, ${glowOpacity * 0.8}),
                        0 0 80px rgba(59, 130, 246, ${glowOpacity * 0.4})
                    `,
                }}
            >
                {text}
            </h1>

            <div
                className="h-2 bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-6"
                style={{
                    width: interpolate(springValue, [0.5, 1], [0, 600], { extrapolateLeft: 'clamp' }),
                    opacity: interpolate(springValue, [0.7, 1], [0, 1]),
                    boxShadow: '0 0 30px rgba(59, 130, 246, 0.9)',
                }}
            />
        </div>
    );
};

export const ContentCard: React.FC<{
    title?: string;
    children: React.ReactNode;
    delay?: number;
    className?: string;
    icon?: React.ReactNode;
}> = ({ title, children, delay = 0, className, icon }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const anim = spring({
        frame: frame - delay,
        fps,
        config: { damping: 15, stiffness: 80 }
    });

    const opacity = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateLeft: 'clamp' });
    const translateY = interpolate(anim, [0, 1], [100, 0]);
    const rotate = interpolate(anim, [0, 1], [5, 0]);

    return (
        <div
            className={`bg-black/40 backdrop-blur-xl border border-white/10 p-12 rounded-[2.5rem] shadow-2xl overflow-hidden relative ${className}`}
            style={{
                opacity,
                transform: `translateY(${translateY}px) rotate(${rotate}deg)`,
                direction: 'rtl',
            }}
        >
            {/* Background Glow */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />

            <div className="flex flex-col items-center gap-8 relative z-10">
                {icon && (
                    <div className="mb-2 animate-bounce-slow">
                        {icon}
                    </div>
                )}
                {title && (
                    <h2 className="text-5xl font-bold text-blue-400 font-[Cairo] text-center mb-2">
                        {title}
                    </h2>
                )}
                <div className="text-3xl text-white/90 leading-[1.8] font-[Cairo] text-center font-medium">
                    {children}
                </div>
            </div>
        </div>
    );
};

export const FloatingParticle: React.FC<{ delay: number; x: string; y: string; color: string }> = ({ delay, x, y, color }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(Math.sin((frame + delay) / 30), [-1, 1], [0.1, 0.4]);
    const floatY = Math.sin((frame + delay) / 40) * 20;

    return (
        <div
            className="absolute rounded-full blur-[2px]"
            style={{
                left: x,
                top: y,
                width: 4,
                height: 4,
                backgroundColor: color,
                opacity,
                transform: `translateY(${floatY}px)`,
                boxShadow: `0 0 10px ${color}`,
            }}
        />
    );
};

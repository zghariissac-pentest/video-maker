import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, Easing } from 'remotion';
import { loadFont } from "@remotion/google-fonts/Outfit";

const { fontFamily } = loadFont();

export const KINETIC_COLORS = {
    bg: '#0a0a0b',
    primary: '#3b82f6', // Electric Blue
    danger: '#ef4444', // Crimson
    warning: '#f59e0b', // Amber
    success: '#10b981', // Emerald
    white: '#ffffff',
    gray: '#1f2937',
};

// --- KINETIC BACKGROUND ---
export const KineticBackground: React.FC<{ color?: string }> = ({ color = KINETIC_COLORS.bg }) => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ backgroundColor: color, overflow: 'hidden' }}>
            {/* Soft Ambient Glow */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, ${KINETIC_COLORS.primary}22 0%, transparent 70%)`
                }}
            />

            {/* Dynamic Texture/Noise */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }} />
        </AbsoluteFill>
    );
};

// --- STOMP TEXT (High Impact) ---
export const StompText: React.FC<{
    text: string;
    delay: number;
    className?: string;
    color?: string;
    size?: string;
}> = ({ text, delay, className, color = 'white', size = 'text-7xl' }) => {
    const frame = useCurrentFrame();
    const progress = spring({
        frame: frame - delay,
        fps: 30,
        config: { stiffness: 300, damping: 20 }
    });

    const scale = interpolate(progress, [0, 1], [4, 1]);
    const opacity = interpolate(progress, [0, 0.1, 1], [0, 1, 1]);
    const blur = interpolate(progress, [0, 1], [20, 0]);

    if (frame < delay) return null;

    return (
        <div
            className={`${size} font-black uppercase tracking-tighter ${className}`}
            style={{
                opacity,
                transform: `scale(${scale})`,
                color,
                fontFamily,
                filter: `blur(${blur}px)`,
                textShadow: progress > 0.9 ? '0 10px 30px rgba(0,0,0,0.5)' : 'none'
            }}
        >
            {text}
        </div>
    );
};

// --- ICON BURST ---
export const IconBurst: React.FC<{
    Icon: any;
    delay: number;
    color: string;
    size?: number;
}> = ({ Icon, delay, color, size = 120 }) => {
    const frame = useCurrentFrame();
    const progress = spring({
        frame: frame - delay,
        fps: 30,
        config: { stiffness: 200, damping: 15 }
    });

    const scale = interpolate(progress, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
    const rotate = interpolate(progress, [0, 1], [-45, 0]);

    return (
        <div
            className="relative"
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)`, opacity: progress }}
        >
            {/* Pulse rings behind icon */}
            <div className="absolute inset-0 rounded-full animate-ping opacity-20 border-4" style={{ borderColor: color }} />
            <div className="bg-white/5 p-10 rounded-[40px] border-2 border-white/10 backdrop-blur-xl shadow-2xl">
                <Icon size={size} weight="fill" color={color} />
            </div>
        </div>
    );
};

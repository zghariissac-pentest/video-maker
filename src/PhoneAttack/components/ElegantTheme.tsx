import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, Easing } from 'remotion';
import { loadFont } from "@remotion/google-fonts/Outfit";

const { fontFamily } = loadFont();

export const ELEGANT_COLORS = {
    bg: '#0a0a0b',
    primary: '#3b82f6',
    danger: '#ef4444',
    warning: '#f59e0b',
    text: '#f8fafc',
    subtext: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.1)',
};

// --- ELEGANT BACKGROUND ---
export const ElegantBackground: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: ELEGANT_COLORS.bg, overflow: 'hidden' }}>
            {/* Subtle Gradient Glow - fixed, no harsh "light effects" */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, ${ELEGANT_COLORS.primary} 0%, transparent 70%)`
                }}
            />
            {/* Very fine grid for technical feel */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />
        </AbsoluteFill>
    );
};

// --- SMOOTH TEXT ---
export const SmoothText: React.FC<{
    text: string;
    delay: number;
    className?: string;
    color?: string;
    size?: string;
    weight?: string;
}> = ({ text, delay, className, color = ELEGANT_COLORS.text, size = 'text-5xl', weight = 'font-bold' }) => {
    const frame = useCurrentFrame();

    // SLOWER ANIMATION: lower stiffness, higher damping
    const progress = spring({
        frame: frame - delay,
        fps: 30,
        config: { stiffness: 60, damping: 15 }
    });

    const y = interpolate(progress, [0, 1], [20, 0]);
    const opacity = interpolate(progress, [0, 1], [0, 1]);

    if (frame < delay) return null;

    return (
        <div
            className={`${size} ${weight} tracking-tight ${className}`}
            style={{
                opacity,
                transform: `translateY(${y}px)`,
                color,
                fontFamily
            }}
        >
            {text}
        </div>
    );
};

// --- ELEGANT CARD ---
export const ElegantCard: React.FC<{
    children: React.ReactNode;
    delay: number;
    color: string;
    className?: string;
}> = ({ children, delay, color, className }) => {
    const frame = useCurrentFrame();
    const enter = spring({
        frame: frame - delay,
        fps: 30,
        config: { stiffness: 50, damping: 18 }
    });

    return (
        <div
            className={`bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 ${className}`}
            style={{
                opacity: enter,
                transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px)`,
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                borderLeft: `4px solid ${color}`
            }}
        >
            {children}
        </div>
    );
};

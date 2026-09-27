import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';

// --- THEME: IVORY & GRAPHITE (High-End Technical) ---
export const COLORS = {
    bg: '#f8f9fa', // Off-white/Ivory
    accent: '#1a1a1a', // Rich Graphite
    text: '#111827',
    subtext: '#4b5563',
    blue: '#2563eb',
    orange: '#f59e0b',
    red: '#dc2626',
};

export const PaperBackground: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill className="bg-[#f8f9fa] overflow-hidden">
            {/* Subtle Texture/Grain */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/micro-carbon.png')` }} />

            {/* Blueprint Grid */}
            <div className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: '100px 100px'
                }} />

            {/* Moving Light Shadow */}
            <div className="absolute inset-0 bg-radial-gradient(circle_at_10%_10%, rgba(255,255,255,0.8)_0%, transparent_50%)" />
        </AbsoluteFill>
    );
};

export const ModernCard: React.FC<{ children: React.ReactNode; delay: number; className?: string }> = ({ children, delay, className }) => {
    const frame = useCurrentFrame();
    const enter = spring({
        frame: frame - delay,
        fps: 30,
        config: { damping: 14, stiffness: 80 }
    });

    return (
        <div
            className={`bg-white border border-gray-200 rounded-[24px] p-6 shadow-sm ${className}`}
            style={{
                opacity: enter,
                transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px) scale(${interpolate(enter, [0, 1], [0.95, 1])})`,
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)'
            }}
        >
            {children}
        </div>
    );
};

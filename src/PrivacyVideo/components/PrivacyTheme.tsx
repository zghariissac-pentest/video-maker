import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, random } from 'remotion';

// The "Ghost Network" Background: Subtle drifting nodes and thin connection lines
export const GhostNetwork: React.FC = () => {
    const frame = useCurrentFrame();
    const numNodes = 15;

    return (
        <AbsoluteFill className="bg-[#050505] overflow-hidden">
            {/* Darker Gradient Overlay */}
            <div className="absolute inset-0 bg-radial-gradient(circle, #0F0F12 0%, #050505 100%)" />

            {/* Connection Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
                {Array.from({ length: numNodes }).map((_, i) => {
                    const nextIndex = (i + 1) % numNodes;
                    const x1 = (random(i) * 100) + Math.sin(frame * 0.01 + i) * 5;
                    const y1 = (random(i + 10) * 100) + Math.cos(frame * 0.015 + i) * 5;
                    const x2 = (random(nextIndex) * 100) + Math.sin(frame * 0.01 + nextIndex) * 5;
                    const y2 = (random(nextIndex + 10) * 100) + Math.cos(frame * 0.015 + nextIndex) * 5;

                    return (
                        <line
                            key={i}
                            x1={`${x1}%`}
                            y1={`${y1}%`}
                            x2={`${x2}%`}
                            y2={`${y2}%`}
                            stroke="#7D4698"
                            strokeWidth="1"
                        />
                    );
                })}
            </svg>

            {/* Drifting Nodes */}
            {Array.from({ length: numNodes }).map((_, i) => {
                const x = (random(i) * 100) + Math.sin(frame * 0.01 + i) * 5;
                const y = (random(i + 10) * 100) + Math.cos(frame * 0.015 + i) * 5;
                const opacity = interpolate(Math.sin(frame * 0.03 + i), [-1, 1], [0.1, 0.4]);

                return (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-500 rounded-full shadow-[0_0_10px_#7D4698]"
                        style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            opacity,
                        }}
                    />
                );
            })}

            {/* Faint Purple Aura */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, #7D469844 0%, transparent 70%)'
                }}
            />
        </AbsoluteFill>
    );
};

// A "Glassmorphic" panel for content
export const GlassPanel: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className, style }) => {
    return (
        <div
            className={`
                bg-white/5 
                backdrop-blur-xl 
                border border-white/10 
                rounded-3xl 
                shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
                ${className}
            `}
            style={style}
        >
            {children}
        </div>
    );
};

// Smooth Onion Reveal: Fades and blurs in, then out
export const OnionTransition: React.FC<{
    children: React.ReactNode;
    startFrame?: number;
    duration?: number;
}> = ({ children, startFrame = 0, duration = 30 }) => {
    const frame = useCurrentFrame();
    const progress = frame - startFrame;

    const opacity = interpolate(progress, [0, duration], [0, 1], { extrapolateRight: 'clamp' });
    const blur = interpolate(progress, [0, duration], [20, 0], { extrapolateRight: 'clamp' });
    const y = interpolate(progress, [0, duration], [20, 0], { extrapolateRight: 'clamp' });

    return (
        <div style={{ opacity, filter: `blur(${blur}px)`, transform: `translateY(${y}px)` }}>
            {children}
        </div>
    );
};

// "Privacy Pulse" - A subtle pulsing status indicator
export const PrivacyStatus: React.FC<{ active?: boolean }> = ({ active = true }) => {
    return (
        <div className="flex items-center gap-3 px-4 py-2 bg-black/40 rounded-full border border-purple-500/30">
            <div className={`w-2 h-2 rounded-full ${active ? 'bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF]' : 'bg-red-500'}`} />
            <span className="text-[10px] uppercase tracking-widest text-[#00E5FF]/80 font-mono">
                {active ? 'Protocol Active' : 'Protocol Failed'}
            </span>
        </div>
    );
};

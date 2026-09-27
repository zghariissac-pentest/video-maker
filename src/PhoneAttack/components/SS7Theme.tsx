import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, random, spring } from 'remotion';

export const SS7Background: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill className="bg-[#020617] overflow-hidden">
            {/* Dark Blue Radial Glow */}
            <div className="absolute inset-0 bg-radial-gradient(circle_at_center, #1e293b_0%, #020617_80%) opacity-50" />

            {/* Cyber Grid - Teal */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(90deg, #00f2ff 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                    transform: `perspective(1000px) rotateX(60deg) translateY(${(frame * 1.5) % 80}px)`
                }} />

            {/* Pulsing Data Nodes */}
            {Array.from({ length: 12 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute bg-[#00f2ff] rounded-full blur-[2px]"
                    style={{
                        left: `${random(`nx-${i}`) * 100}%`,
                        top: `${random(`ny-${i}`) * 100}%`,
                        width: '4px',
                        height: '4px',
                        opacity: interpolate(Math.sin(frame / 20 + i), [-1, 1], [0.1, 0.6])
                    }}
                />
            ))}
        </AbsoluteFill>
    );
};

export const SS7Panel: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className, style }) => {
    return (
        <div
            className={`bg-[#0ea5e9]/5 border border-[#0ea5e9]/20 backdrop-blur-md rounded-xl p-6 ${className}`}
            style={{
                boxShadow: '0 0 40px rgba(14, 165, 233, 0.1)',
                ...style
            }}
        >
            {children}
        </div>
    );
};

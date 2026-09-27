import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, random, spring } from 'remotion';

export const TacticalBackground: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill className="bg-[#080808] overflow-hidden">
            {/* Hexagonal Grid or Dots */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `radial-gradient(#00f0ff 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                    transform: `translateY(${(frame * 0.3) % 30}px)`,
                }}
            />

            {/* Subtle Gradient Glow */}
            <div className="absolute inset-0 bg-radial-gradient(circle_at_center, rgba(0, 240, 255, 0.05)_0%, transparent_70%)" />

            {/* Vertical Flowing Data Lines */}
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={`line-${i}`}
                    className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-[#00f0ff55] to-transparent"
                    style={{
                        left: `${(i + 1) * 16}%`,
                        opacity: interpolate(Math.sin(frame / 20 + i), [-1, 1], [0.1, 0.4]),
                        transform: `translateY(${(frame * (1 + random(i))) % 100 - 50}%)`,
                    }}
                />
            ))}
        </AbsoluteFill>
    );
};

export const TacticalHUD: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
    const frame = useCurrentFrame();
    const slideIn = spring({ frame, fps: 30, config: { damping: 10 } });

    return (
        <AbsoluteFill className="pointer-events-none p-12">
            {/* Top Info Bar */}
            <div
                className="flex justify-between items-start border-b border-[#00f0ff44] pb-4"
                style={{ opacity: slideIn, transform: `translateY(${(1 - slideIn) * -20}px)` }}
            >
                <div>
                    <div className="text-[#00f0ff] font-mono text-xs tracking-widest uppercase mb-1">
                        MISSION_PROTOCOL: {subtitle || "ACTIVE_INTERCEPTION"}
                    </div>
                    <div className="text-white font-bold text-2xl tracking-tighter">
                        {title}
                    </div>
                </div>
                <div className="text-right font-mono text-[10px] text-[#00f0ff88]">
                    <div>STATUS: SCANNING...</div>
                    <div>FREQ: 1800.42 MHZ</div>
                    <div>LOC: SOURCE_UNKNOWN</div>
                </div>
            </div>

            {/* Corner Markers */}
            <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-[#ff9a00aa]" />
            <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-[#ff9a00aa]" />
            <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-[#ff9a00aa]" />
            <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-[#ff9a00aa]" />

            {/* Activity Indicator (Bottom) */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1">
                {Array.from({ length: 15 }).map((_, i) => (
                    <div
                        key={i}
                        className="w-1 h-2 rounded-full"
                        style={{
                            backgroundColor: i < (frame / 2) % 15 ? '#ff9a00' : '#ffffff22',
                            opacity: i < (frame / 2) % 15 ? 1 : 0.3
                        }}
                    />
                ))}
            </div>
        </AbsoluteFill>
    );
};

export const GlassPanel: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className, style }) => {
    return (
        <div
            className={`bg-[#ffffff05] backdrop-blur-xl border border-[#ffffff11] rounded-2xl p-8 shadow-2xl ${className}`}
            style={{
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
                ...style
            }}
        >
            {children}
        </div>
    );
};

export const DecryptionText: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className, delay = 0 }) => {
    const frame = useCurrentFrame();
    const progress = Math.max(0, frame - delay);

    if (progress <= 0) return null;

    const chars = "0123456789ABCDEF!@#$%^&*";
    const scrambled = text.split('').map((char, i) => {
        if (progress > i * 1.5 + 5) return char;
        if (progress > i * 1.5) return chars[Math.floor(random(frame + i) * chars.length)];
        return "";
    }).join('');

    return (
        <div className={className}>
            {scrambled}
        </div>
    );
};

import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, random, spring, Easing } from 'remotion';

// --- THEME CONSTANTS ---
export const COLORS = {
    bg: '#050508',
    primary: '#8b5cf6', // Nebula Purple
    secondary: '#00f0ff', // Electric Cyan
    accent: '#f43f5e', // Rose
    text: '#ffffff',
    subtext: '#94a3b8',
};

// --- BACKGROUND: NEURAL NETWORK ---
export const NeuralBackground: React.FC = () => {
    const frame = useCurrentFrame();
    const dots = Array.from({ length: 40 }).map((_, i) => ({
        x: random(`x-${i}`) * 100,
        y: random(`y-${i}`) * 100,
        size: random(`s-${i}`) * 3 + 1,
        speed: random(`sp-${i}`) * 0.2 + 0.1,
    }));

    return (
        <AbsoluteFill className="bg-[#050508] overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                {dots.map((dot, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            left: `${dot.x}%`,
                            top: `${(dot.y + frame * dot.speed) % 100}%`,
                            width: dot.size,
                            height: dot.size,
                            boxShadow: `0 0 10px ${COLORS.primary}`,
                        }}
                    />
                ))}
            </div>
            {/* Ambient vignette */}
            <div className="absolute inset-0 bg-radial-gradient(circle_at_center, transparent_0%, #050508_80%)" />
        </AbsoluteFill>
    );
};

// --- COMPONENTS ---

export const FloatingCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    delay?: number;
}> = ({ children, className, delay = 0 }) => {
    const frame = useCurrentFrame();
    const enter = spring({
        frame: frame - delay,
        fps: 30,
        config: { damping: 15, stiffness: 60 }
    });

    const float = Math.sin(frame / 30) * 10;

    return (
        <div
            className={`relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl rounded-[32px] p-8 ${className}`}
            style={{
                opacity: enter,
                transform: `scale(${interpolate(enter, [0, 1], [0.9, 1])}) translateY(${float}px)`,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
        >
            {/* Gradient corner accent */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/20 blur-3xl rounded-full" />
            {children}
        </div>
    );
};

export const ModernText: React.FC<{
    text: string;
    className?: string;
    delay?: number;
    type?: 'heading' | 'body';
}> = ({ text, className, delay = 0, type = 'heading' }) => {
    const frame = useCurrentFrame();
    const words = text.split(' ');

    return (
        <div className={`flex flex-wrap gap-x-3 gap-y-1 ${className}`}>
            {words.map((word, i) => {
                const wordDelay = delay + i * 3;
                const opacity = interpolate(frame, [wordDelay, wordDelay + 10], [0, 1], { extrapolateRight: 'clamp' });
                const y = interpolate(frame, [wordDelay, wordDelay + 15], [20, 0], {
                    extrapolateRight: 'clamp',
                    easing: Easing.out(Easing.quad)
                });

                return (
                    <span
                        key={i}
                        className="inline-block"
                        style={{ opacity, transform: `translateY(${y}px)` }}
                    >
                        {word}
                    </span>
                );
            })}
        </div>
    );
};

export const SignalPulse: React.FC<{ className?: string }> = ({ className }) => {
    const frame = useCurrentFrame();
    const scale = interpolate(frame % 60, [0, 60], [1, 2]);
    const opacity = interpolate(frame % 60, [0, 60], [0.5, 0]);

    return (
        <div className={`relative ${className}`}>
            <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-20" />
            <div
                className="absolute inset-0 border-2 border-purple-500 rounded-full"
                style={{ transform: `scale(${scale})`, opacity }}
            />
        </div>
    );
};

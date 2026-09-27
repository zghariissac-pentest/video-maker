import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

// ─── Palette ─────────────────────────────────────────────────────────────────
export const COLORS = {
    bg: '#000000',
    primary: '#00ff41', // Matrix Green
    secondary: '#00d4ff', // Cyber Blue
    accent: '#ff0055', // Neon Pink/Red
    white: '#ffffff',
    terminalBg: '#050505',
};

// ─── Space Cyber Background ──────────────────────────────────────────────────
export const SpaceBg: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            {/* Deep Space Gradients */}
            <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle at 20% 30%, ${COLORS.primary}10 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${COLORS.secondary}10 0%, transparent 50%)`,
            }} />

            {/* Moving Grid - Perspective feel */}
            <div style={{
                position: 'absolute',
                width: '200%',
                height: '200%',
                left: '-50%',
                top: '-50%',
                backgroundImage: `
                    linear-gradient(${COLORS.primary}05 1px, transparent 1px),
                    linear-gradient(90deg, ${COLORS.primary}05 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px',
                transform: `perspective(1000px) rotateX(65deg) translateY(${(frame * 2) % 80}px)`,
                opacity: 0.5,
            }} />

            {/* Drifting Nebula Blobs */}
            <div style={{
                position: 'absolute', top: '20%', left: '10%',
                width: '50%', height: '50%', borderRadius: '50%',
                filter: 'blur(180px)', opacity: 0.1,
                background: COLORS.primary,
                transform: `translate(${Math.sin(frame / 120) * 50}px, ${Math.cos(frame / 120) * 30}px)`,
            }} />
        </AbsoluteFill>
    );
};

// ─── Star Field ──────────────────────────────────────────────────────────────
export const StarField: React.FC<{ count?: number }> = ({ count = 120 }) => {
    const frame = useCurrentFrame();
    const stars = React.useMemo(() => Array.from({ length: count }, (_, i) => ({
        id: i, x: (i * 137.5) % 100, y: (i * 73.1) % 100,
        size: (i % 2) + 0.5, speed: (i % 4) + 8,
    })), [count]);

    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            {stars.map(s => {
                const op = interpolate(Math.sin((frame + s.id * 10) / s.speed), [-1, 1], [0.1, 0.7]);
                return (
                    <div key={s.id} style={{
                        position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
                        width: s.size, height: s.size, borderRadius: '50%',
                        background: '#fff', opacity: op,
                        boxShadow: s.size > 1 ? `0 0 5px ${COLORS.primary}AA` : 'none',
                    }} />
                );
            })}
        </AbsoluteFill>
    );
};

// ─── Vignette ─────────────────────────────────────────────────────────────────
export const Vignette: React.FC = () => (
    <AbsoluteFill style={{
        pointerEvents: 'none',
        background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.8) 100%)',
    }} />
);

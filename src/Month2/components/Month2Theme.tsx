import React from 'react';
import { AbsoluteFill } from 'remotion';

export const COLORS = {
    bg: '#02060a',
    primary: '#47a0f5', // Blue for stability
    secondary: '#f54768', // Pink
    accent: '#47f5a0', // Green
    white: '#ffffff',
    terminalBg: '#0a0f14',
};

// ─── STABLE Space Cyber Background ─────────────────────────────────────────────
export const StableSpaceBg: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            {/* Deep Space Gradients */}
            <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle at 20% 30%, ${COLORS.primary}05 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${COLORS.accent}05 0%, transparent 50%)`,
            }} />

            {/* Static Grid - Perspective feel but NO animation */}
            <div style={{
                position: 'absolute',
                width: '200%',
                height: '200%',
                left: '-50%',
                top: '-50%',
                backgroundImage: `
                    linear-gradient(${COLORS.primary}03 1px, transparent 1px),
                    linear-gradient(90deg, ${COLORS.primary}03 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px',
                transform: `perspective(1000px) rotateX(60deg)`,
                opacity: 0.4,
            }} />

            {/* Static Nebula Blobs */}
            <div style={{
                position: 'absolute', top: '10%', left: '20%',
                width: '60%', height: '60%', borderRadius: '50%',
                filter: 'blur(150px)', opacity: 0.08,
                background: COLORS.primary,
            }} />
        </AbsoluteFill>
    );
};

// ─── STABLE Star Field ────────────────────────────────────────────────────────
export const StableStarField: React.FC<{ count?: number }> = ({ count = 100 }) => {
    const stars = React.useMemo(() => Array.from({ length: count }, (_, i) => ({
        id: i, x: (i * 137.5) % 100, y: (i * 73.1) % 100,
        size: (i % 2) + 1,
    })), [count]);

    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            {stars.map(s => {
                return (
                    <div key={s.id} style={{
                        position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
                        width: s.size, height: s.size, borderRadius: '50%',
                        background: '#fff', opacity: 0.3,
                        boxShadow: s.size > 1 ? `0 0 4px ${COLORS.primary}88` : 'none',
                    }} />
                );
            })}
        </AbsoluteFill>
    );
};

// ─── Static Vignette ──────────────────────────────────────────────────────────
export const StaticVignette: React.FC = () => (
    <AbsoluteFill style={{
        pointerEvents: 'none',
        background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.6) 100%)',
    }} />
);

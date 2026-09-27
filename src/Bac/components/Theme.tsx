import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const COLORS = {
    bg: '#02060a',
    primary: '#47a0f5',
    secondary: '#f54768',
    accent: '#47f5a0',
    white: '#ffffff',
    gold: '#f5c842',
};

export const SpaceBg: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle at 20% 30%, ${COLORS.primary}05 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${COLORS.secondary}05 0%, transparent 50%)`,
            }} />
            <div style={{
                position: 'absolute',
                width: '200%', height: '200%', left: '-50%', top: '-50%',
                backgroundImage: `
                    linear-gradient(${COLORS.primary}03 1px, transparent 1px),
                    linear-gradient(90deg, ${COLORS.primary}03 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px',
                transform: `perspective(1000px) rotateX(60deg) translateY(${(frame * 1.5) % 100}px)`,
                opacity: 0.4,
            }} />
            <div style={{
                position: 'absolute', top: '10%', left: '20%',
                width: '60%', height: '60%', borderRadius: '50%',
                filter: 'blur(150px)', opacity: 0.08,
                background: COLORS.secondary,
                transform: `translate(${Math.sin(frame / 150) * 40}px, ${Math.cos(frame / 150) * 20}px)`,
            }} />
        </AbsoluteFill>
    );
};

export const StarField: React.FC<{ count?: number }> = ({ count = 100 }) => {
    const frame = useCurrentFrame();
    const stars = React.useMemo(() => Array.from({ length: count }, (_, i) => ({
        id: i, x: (i * 137.5) % 100, y: (i * 73.1) % 100,
        size: (i % 2) + 1, speed: (i % 4) + 5,
    })), [count]);

    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            {stars.map(s => {
                const op = interpolate(Math.sin((frame + s.id * 15) / s.speed), [-1, 1], [0.1, 0.6]);
                return (
                    <div key={s.id} style={{
                        position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
                        width: s.size, height: s.size, borderRadius: '50%',
                        background: '#fff', opacity: op,
                    }} />
                );
            })}
        </AbsoluteFill>
    );
};

export const Vignette: React.FC = () => (
    <AbsoluteFill style={{
        pointerEvents: 'none',
        background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.6) 100%)',
    }} />
);

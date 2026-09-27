import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

// ─── Palette ─────────────────────────────────────────────────────────────────
export const COLORS = {
    bg: '#02060a',
    primary: '#00ff9d', // Nmap green
    secondary: '#00d4ff', // Electric blue
    accent: '#ff2a6d', // Tech pink
    white: '#ffffff',
    terminalBg: '#0a0f14',
};

// ─── Space Cyber Background ──────────────────────────────────────────────────
export const SpaceBg: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            {/* Deep Space Gradients */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 20% 30%, rgba(0,255,157,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0,212,255,0.05) 0%, transparent 50%)',
            }} />

            {/* Moving Grid - Perspective feel */}
            <div style={{
                position: 'absolute',
                width: '200%',
                height: '200%',
                left: '-50%',
                top: '-50%',
                backgroundImage: `
                    linear-gradient(rgba(0,255,157,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,255,157,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px',
                transform: `perspective(1000px) rotateX(60deg) translateY(${(frame * 1.5) % 100}px)`,
                opacity: 0.4,
            }} />

            {/* Drifting Nebula Blobs */}
            <div style={{
                position: 'absolute', top: '10%', left: '20%',
                width: '60%', height: '60%', borderRadius: '50%',
                filter: 'blur(150px)', opacity: 0.08,
                background: COLORS.primary,
                transform: `translate(${Math.sin(frame / 150) * 40}px, ${Math.cos(frame / 150) * 20}px)`,
            }} />
        </AbsoluteFill>
    );
};

// ─── Star Field ──────────────────────────────────────────────────────────────
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
                        boxShadow: s.size > 1 ? `0 0 4px ${COLORS.primary}88` : 'none',
                    }} />
                );
            })}
        </AbsoluteFill>
    );
};

// ─── Terminal Icon ────────────────────────────────────────────────────────────
export const TerminalIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.primary }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" fill={`${color}10`} />
        <path d="M7 10l2 2-2 2" />
        <path d="M12 14h5" />
    </svg>
);

// ─── Nmap Logo Visual ─────────────────────────────────────────────────────────
export const NmapIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.primary }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" fill={`${color}08`} />
        <circle cx="12" cy="12" r="6" strokeDasharray="4 4" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        <path d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
);

// ─── Speed Icon ───────────────────────────────────────────────────────────────
export const SpeedIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.secondary }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill={`${color}20`} />
    </svg>
);

// ─── Vignette ─────────────────────────────────────────────────────────────────
export const Vignette: React.FC = () => (
    <AbsoluteFill style={{
        pointerEvents: 'none',
        background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.6) 100%)',
    }} />
);

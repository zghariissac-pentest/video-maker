import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

// ─── Palette ─────────────────────────────────────────────────────────────────
export const COLORS = {
    bg: '#02060a',
    primary: '#00ffcc', // IoT Teal/Cyan
    secondary: '#ff2a6d', // Tech pink
    accent: '#7b61ff', // Purple accent
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
                background: `radial-gradient(circle at 20% 30%, ${COLORS.primary}05 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${COLORS.secondary}05 0%, transparent 50%)`,
            }} />

            {/* Moving Grid - Perspective feel */}
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

// ─── Icons ──────────────────────────────────────────────────────────────────
export const RouterIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.primary }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="14" width="20" height="8" rx="2" fill={`${color}15`} />
        <path d="M6.01 18H6" />
        <path d="M10.01 18H10" />
        <path d="M14.01 18H14" />
        <path d="M18.01 18H18" />
        <path d="M12 2v12" />
        <path d="M12 2C9 2 7 4 7 7" />
        <path d="M12 2c3 0 5 2 5 5" />
    </svg>
);

export const NetworkIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.accent }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="16" width="6" height="6" rx="1" fill={`${color}15`} />
        <rect x="1" y="2" width="6" height="6" rx="1" fill={`${color}15`} />
        <rect x="17" y="2" width="6" height="6" rx="1" fill={`${color}15`} />
        <path d="M4 8v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8" />
        <path d="M12 14v2" />
    </svg>
);

export const ShieldIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.primary }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={`${color}10`} />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
    </svg>
);

export const WebIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.primary }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" fill={`${color}05`} />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

export const ChipIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.accent }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" fill={`${color}10`} />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="15" x2="23" y2="15" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="15" x2="4" y2="15" />
    </svg>
);

export const ToolIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.secondary }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" fill={`${color}10`} />
    </svg>
);

// ─── Vignette ─────────────────────────────────────────────────────────────────
export const Vignette: React.FC = () => (
    <AbsoluteFill style={{
        pointerEvents: 'none',
        background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.6) 100%)',
    }} />
);

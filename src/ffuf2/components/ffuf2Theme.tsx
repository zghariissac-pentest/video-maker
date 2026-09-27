import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

// ─── Palette ─────────────────────────────────────────────────────────────────
export const COLORS = {
    bg: '#02060a',
    primary: '#00d4ff', // Electric Blue
    secondary: '#bd00ff', // Deep Purple
    accent: '#ff0055', // Neon Pink
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
                background: `radial-gradient(circle at 30% 20%, ${COLORS.primary}08 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${COLORS.secondary}08 0%, transparent 50%)`,
            }} />

            {/* Moving Grid - Perspective feel */}
            <div style={{
                position: 'absolute',
                width: '200%',
                height: '200%',
                left: '-50%',
                top: '-50%',
                backgroundImage: `
                    linear-gradient(${COLORS.primary}04 1px, transparent 1px),
                    linear-gradient(90deg, ${COLORS.primary}04 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px',
                transform: `perspective(1000px) rotateX(60deg) translateY(${(frame * 1.5) % 100}px)`,
                opacity: 0.4,
            }} />

            {/* Drifting Nebula Blobs */}
            <div style={{
                position: 'absolute', top: '15%', left: '15%',
                width: '70%', height: '70%', borderRadius: '50%',
                filter: 'blur(160px)', opacity: 0.1,
                background: COLORS.secondary,
                transform: `translate(${Math.cos(frame / 180) * 50}px, ${Math.sin(frame / 180) * 30}px)`,
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
                        boxShadow: s.size > 1 ? `0 0 5px ${COLORS.primary}88` : 'none',
                    }} />
                );
            })}
        </AbsoluteFill>
    );
};

// ─── Backup/File Icon ────────────────────────────────────────────────────────
export const BackupIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.primary }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" fill={`${color}10`} />
        <polyline points="14 2 14 8 20 8" />
        <path d="M10 13l2 2 2-2M12 17V11" />
    </svg>
);

// ─── Search/Recon Icon ────────────────────────────────────────────────────────
export const ReconIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.secondary }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" fill={`${color}08`} />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <path d="M11 7v1M7 11h1" opacity="0.5" />
    </svg>
);

// ─── Extension Badge ────────────────────────────────────────────────────────
export const ExtBadge: React.FC<{ text: string; color: string }> = ({ text, color }) => (
    <div style={{
        padding: '10px 25px',
        background: `${color}15`,
        border: `2px solid ${color}40`,
        borderRadius: '15px',
        color: color,
        fontFamily: 'monospace',
        fontSize: 32,
        fontWeight: 'bold',
        textShadow: `0 0 10px ${color}40`,
        boxShadow: `0 5px 15px rgba(0,0,0,0.3), inset 0 0 10px ${color}10`,
    }}>
        {text}
    </div>
);

// ─── Vignette ─────────────────────────────────────────────────────────────────
export const Vignette: React.FC = () => (
    <AbsoluteFill style={{
        pointerEvents: 'none',
        background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.7) 100%)',
    }} />
);

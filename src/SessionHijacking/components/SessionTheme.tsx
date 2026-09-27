import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

// ─── Palette ─────────────────────────────────────────────────────────────────
export const COLORS = {
    bg: '#050a0f',
    teal: '#00e5c8',
    red: '#ff3b5c',
    blue: '#3b8ff5',
    purple: '#9f7aea',
    white: '#ffffff',
};

// ─── Dark Cyber Background ────────────────────────────────────────────────────
export const CyberBg: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            {/* Moving grid */}
            <AbsoluteFill style={{
                backgroundImage: `
                    linear-gradient(rgba(0,229,200,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,229,200,0.04) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px',
                transform: `translateY(${(frame * 0.4) % 80}px)`,
            }} />
            {/* Deep glows */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 30% 20%, rgba(0,229,200,0.10) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(255,59,92,0.08) 0%, transparent 60%)',
            }} />
            {/* Drifting blobs */}
            <div style={{
                position: 'absolute', top: '-20%', left: '-10%',
                width: '70%', height: '60%', borderRadius: '50%',
                filter: 'blur(180px)', opacity: 0.13,
                background: COLORS.teal,
                transform: `translate(${Math.sin(frame / 200) * 50}px, ${Math.cos(frame / 200) * 30}px)`,
            }} />
            <div style={{
                position: 'absolute', bottom: '-20%', right: '-10%',
                width: '60%', height: '55%', borderRadius: '50%',
                filter: 'blur(160px)', opacity: 0.10,
                background: COLORS.red,
                transform: `translate(${Math.cos(frame / 250) * 40}px, ${Math.sin(frame / 250) * 30}px)`,
            }} />
        </AbsoluteFill>
    );
};

// ─── Star Field ──────────────────────────────────────────────────────────────
export const StarField: React.FC<{ count?: number }> = ({ count = 70 }) => {
    const frame = useCurrentFrame();
    const stars = React.useMemo(() => Array.from({ length: count }, (_, i) => ({
        id: i, x: (i * 139.1) % 100, y: (i * 71.3) % 100,
        size: (i % 3) + 1, speed: (i % 5) + 4,
    })), [count]);
    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            {stars.map(s => {
                const op = interpolate(Math.sin((frame + s.id * 18) / s.speed), [-1, 1], [0.08, 0.5]);
                return (
                    <div key={s.id} style={{
                        position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
                        width: s.size, height: s.size, borderRadius: '50%',
                        background: '#fff', opacity: op,
                        boxShadow: s.size > 2 ? '0 0 5px rgba(0,229,200,0.5)' : 'none',
                    }} />
                );
            })}
        </AbsoluteFill>
    );
};

// ─── Floating Particle ────────────────────────────────────────────────────────
export const FloatingDot: React.FC<{ delay: number; x: string; y: string; color: string }> = ({ delay, x, y, color }) => {
    const frame = useCurrentFrame();
    const op = interpolate(Math.sin((frame + delay) / 28), [-1, 1], [0.06, 0.32]);
    const fy = Math.sin((frame + delay) / 42) * 16;
    return (
        <div style={{
            position: 'absolute', left: x, top: y,
            width: 6, height: 6, borderRadius: '50%',
            background: color, opacity: op,
            transform: `translateY(${fy}px)`,
            filter: 'blur(1px)',
            boxShadow: `0 0 14px ${color}`,
        }} />
    );
};

// ─── Vignette ─────────────────────────────────────────────────────────────────
export const Vignette: React.FC = () => (
    <AbsoluteFill style={{
        pointerEvents: 'none',
        boxShadow: 'inset 0 0 500px rgba(0,0,0,0.88)',
    }} />
);

// ─── Session Token Icon ───────────────────────────────────────────────────────
// (browser cookie / token chip visual)
export const TokenIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = '#00e5c8' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="3" fill={`${color}18`} />
        <path d="M6 10h.01M6 14h.01" strokeWidth="2.5" />
        <path d="M10 10h4M10 14h4" />
        <path d="M18 10h.01M18 14h.01" strokeWidth="2.5" />
    </svg>
);

// ─── Hacker / Attacker Icon ───────────────────────────────────────────────────
export const HackerIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = '#ff3b5c' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 2.87 1.63 5.36 4 6.63V18h6v-2.37C17.37 14.36 19 11.87 19 9c0-3.87-3.13-7-7-7z" fill={`${color}15`} />
        <path d="M9 21h6" />
        <path d="M12 12v6" />
        <path d="M8 9c0-2.21 1.79-4 4-4" />
        <path d="M16 9c0 1.1-.45 2.1-1.17 2.83" strokeDasharray="2 1.5" />
    </svg>
);

// ─── Shield Broken Icon ───────────────────────────────────────────────────────
export const ShieldBrokenIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = '#ff3b5c' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={`${color}12`} />
        <path d="M10 9l4 4M14 9l-4 4" strokeWidth="2" />
    </svg>
);

// ─── Lock-Open Icon ───────────────────────────────────────────────────────────
export const LockOpenIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = '#00e5c8' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" fill={`${color}15`} />
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
        <circle cx="12" cy="16" r="1.5" fill={color} />
        <path d="M12 16v2" strokeWidth="2" />
    </svg>
);

// ─── Data Flow / Session Icon ─────────────────────────────────────────────────
export const SessionIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = '#3b8ff5' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="8" width="8" height="8" rx="2" fill={`${color}18`} />
        <rect x="14" y="8" width="8" height="8" rx="2" fill={`${color}18`} />
        <path d="M10 12h4" />
        <path d="M13 10l2 2-2 2" />
        <path d="M6 4v4M6 16v4M18 4v4M18 16v4" opacity="0.5" />
    </svg>
);

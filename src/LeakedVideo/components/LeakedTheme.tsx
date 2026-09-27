import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

// ─── Palette ─────────────────────────────────────────────────────────────────
export const COLORS = {
    bg: '#03070b',
    teal: '#00ccb1',
    red: '#ff2d55',
    blue: '#2e7df6',
    purple: '#8a5cf5',
    yellow: '#ffcc00',
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
                    linear-gradient(rgba(0,204,177,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,204,177,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px',
                transform: `rotate(15deg) scale(1.5) translateY(${(frame * 0.5) % 100}px)`,
                opacity: 0.6,
            }} />
            {/* Ambient glows */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 20% 30%, rgba(0,204,177,0.12) 0%, transparent 70%), radial-gradient(circle at 80% 70%, rgba(46,125,246,0.10) 0%, transparent 70%)',
            }} />
            {/* Drifting leak particles */}
            {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    top: `${(i * 137.5) % 100}%`,
                    left: `${(i * 224.7) % 100}%`,
                    width: 2,
                    height: 20,
                    background: i % 2 === 0 ? COLORS.teal : COLORS.blue,
                    opacity: 0.2,
                    transform: `translateY(${(frame * (2 + (i % 3))) % 1000}px)`,
                }} />
            ))}
        </AbsoluteFill>
    );
};

// ─── Star Field ──────────────────────────────────────────────────────────────
export const StarField: React.FC<{ count?: number }> = ({ count = 80 }) => {
    const frame = useCurrentFrame();
    const stars = React.useMemo(() => Array.from({ length: count }, (_, i) => ({
        id: i, x: (i * 157.1) % 100, y: (i * 91.3) % 100,
        size: (i % 2) + 1, speed: (i % 4) + 5,
    })), [count]);
    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            {stars.map(s => {
                const op = interpolate(Math.sin((frame + s.id * 12) / 25), [-1, 1], [0.1, 0.4]);
                return (
                    <div key={s.id} style={{
                        position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
                        width: s.size, height: s.size, borderRadius: '50%',
                        background: '#fff', opacity: op,
                        boxShadow: s.size > 1 ? `0 0 8px ${COLORS.teal}44` : 'none',
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
        boxShadow: 'inset 0 0 600px rgba(0,0,0,0.9)',
    }} />
);

// ─── Keyhole / Password Icon ──────────────────────────────────────────────────
export const PasswordIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.teal }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill={`${color}15`} />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1.5" fill={color} />
    </svg>
);

// ─── Data Leak / Database Icon ────────────────────────────────────────────────
export const DatabaseLeakIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.red }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" fill={`${color}15`} />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M12 15l-3 3 6 6" stroke={color} strokeWidth="2" opacity="0.8" />
        <path d="M15 15l3 3-6 6" stroke={color} strokeWidth="2" opacity="0.8" />
    </svg>
);

// ─── Internet / Web Icon ──────────────────────────────────────────────────────
export const WebIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.blue }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" fill={`${color}10`} />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

// ─── Warning Icon ─────────────────────────────────────────────────────────────
export const WarningIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.yellow }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill={`${color}20`} />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

// ─── Company Icon ────────────────────────────────────────────────────────────
export const CompanyIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.purple }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" fill={`${color}10`} />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" strokeWidth="2" />
    </svg>
);

// ─── Email Icon ──────────────────────────────────────────────────────────────
export const EmailIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.blue }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill={`${color}10`} />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

// ─── Hash / Secure Code Icon ──────────────────────────────────────────────────
export const HashIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.teal }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9h16M4 15h16M9 4v16M15 4v16" stroke={color} strokeWidth="2" />
        <path d="M4 9h16" opacity="0.5" />
        <circle cx="12" cy="12" r="3" fill={`${color}15`} />
    </svg>
);

// ─── Hacking / Terminal Icon ─────────────────────────────────────────────────
export const HackingIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.red }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
        <rect x="2" y="3" width="20" height="18" rx="2" ry="2" fill={`${color}10`} />
    </svg>
);

// ─── Dump / Stack Icon ─────────────────────────────────────────────────────
export const DumpIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.yellow }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill={`${color}20`} />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
    </svg>
);

// ─── Stuffing / Rapid Fire Icon ─────────────────────────────────────────────
export const StuffingIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.blue }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" fill={`${color}10`} />
        <path d="M7 14l3 3-3 3" />
        <path d="M13 14l3 3-3 3" />
        <path d="M19 14l3 3-3 3" />
    </svg>
);

// ─── Shield Check Icon ────────────────────────────────────────────────────────
export const ShieldCheckIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.teal }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={`${color}10`} />
        <polyline points="9 11 12 14 22 4" strokeWidth="2" />
    </svg>
);

// ─── Repeat / Reuse Icon ──────────────────────────────────────────────────────
export const RepeatIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.red }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
);

// ─── Multi-Site Icon ──────────────────────────────────────────────────────────
export const MultiSiteIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.blue }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="8" height="8" rx="1" fill={`${color}10`} />
        <rect x="14" y="2" width="8" height="8" rx="1" fill={`${color}10`} />
        <rect x="2" y="14" width="8" height="8" rx="1" fill={`${color}10`} />
        <rect x="14" y="14" width="8" height="8" rx="1" fill={`${color}10`} />
    </svg>
);

// ─── Two-Factor Icon ──────────────────────────────────────────────────────────
export const TwoFactorIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.yellow }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" fill={`${color}10`} />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
        <path d="M9 7h6" />
        <path d="M9 11h6" />
        <circle cx="12" cy="11" r="5" stroke={COLORS.white} strokeWidth="1" opacity="0.3" />
    </svg>
);




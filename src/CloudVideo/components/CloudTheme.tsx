import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

// ─── Palette ─────────────────────────────────────────────────────────────────
export const COLORS = {
    bg: '#020617',
    blue: '#3b82f6',
    cyan: '#06b6d4',
    purple: '#8b5cf6',
    red: '#ef4444',
    white: '#f8fafc',
};

// ─── Cloud Cyber Background ─────────────────────
export const CyberBg: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            {/* Perspective Grid */}
            <AbsoluteFill style={{
                backgroundImage: `
                    linear-gradient(rgba(59,130,246,0.05) 1.5px, transparent 1.5px),
                    linear-gradient(90deg, rgba(59,130,246,0.05) 1.5px, transparent 1.5px)
                `,
                backgroundSize: '80px 80px',
                transform: `perspective(500px) rotateX(60deg) translateY(${(frame * 2) % 80}px)`,
                opacity: 0.5,
                transformOrigin: 'center center',
            }} />

            {/* Floating Clouds / Orbs */}
            {[...Array(5)].map((_, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    top: `${(i * 25) % 100}%`,
                    left: `${(i * 35) % 100}%`,
                    width: 300, height: 300,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${COLORS.blue}11 0%, transparent 70%)`,
                    filter: 'blur(60px)',
                    transform: `translate(${Math.sin(frame / 100 + i) * 50}px, ${Math.cos(frame / 120 + i) * 30}px) scale(${1 + Math.sin(frame / 50) * 0.1})`,
                }} />
            ))}
        </AbsoluteFill>
    );
};

export const StarField: React.FC<{ count?: number }> = ({ count = 60 }) => {
    const frame = useCurrentFrame();
    const stars = React.useMemo(() => Array.from({ length: count }, (_, i) => ({
        id: i, x: (i * 137.5) % 100, y: (i * 92.1) % 100,
        size: (i % 2) + 1, speed: (i % 3) + 4,
    })), [count]);
    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            {stars.map(s => {
                const op = interpolate(Math.sin((frame + s.id * 10) / 30), [-1, 1], [0.1, 0.4]);
                return (
                    <div key={s.id} style={{
                        position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
                        width: s.size, height: s.size, borderRadius: '50%',
                        background: '#fff', opacity: op,
                        boxShadow: s.size > 1 ? `0 0 10px ${COLORS.blue}33` : 'none',
                    }} />
                );
            })}
        </AbsoluteFill>
    );
};

export const Vignette: React.FC = () => (
    <AbsoluteFill style={{
        pointerEvents: 'none',
        boxShadow: 'inset 0 0 600px rgba(0,0,0,0.9)',
    }} />
);

// ─── CLEAN CLOUD / SERVER ICON ───────────────────────────────────────────────
export const CloudServerIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.cyan }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19L19 19C21.2091 19 23 17.2091 23 15C23 12.7909 21.2091 11 19 11C19 8.23858 16.7614 6 14 6C12.4459 6 11.0668 6.7076 10.1509 7.81812C9.41738 7.30154 8.52554 7 7.5625 7C5.35336 7 3.5625 8.79086 3.5625 11C3.5625 11.1611 3.57201 11.3199 3.59049 11.4759C1.56455 12.043 0.125 13.8532 0.125 16C0.125 18.6234 2.25165 20.75 4.875 20.75L17.5 20.75" fill={`${color}08`} />
        <rect x="8" y="11" width="8" height="3" rx="1" fill={`${color}20`} />
        <rect x="8" y="16" width="8" height="3" rx="1" fill={`${color}20`} />
        <circle cx="10" cy="12.5" r="0.5" fill={color} />
        <circle cx="10" cy="17.5" r="0.5" fill={color} />
    </svg>
);

// ─── HACKER / ATTACKER ICON ──────────────────────────────────────────────────
export const HackerIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.red }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill={`${color}10`} />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        <path d="M12 12v10" strokeDasharray="2 2" />
        <circle cx="12" cy="7" r="2" fill={color} stroke="none" />
    </svg>
);

// ─── SETTINGS / CONFIG ERROR ICON ───────────────────────────────────────────
export const ConfigErrorIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.red }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" fill={`${color}15`} />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        <line x1="12" y1="12" x2="12" y2="12" strokeWidth="4" />
        <path d="M12 8v4M12 16h.01" stroke={COLORS.red} strokeWidth="2" />
    </svg>
);

// ─── BUCKET / STORAGE ICON ──────────────────────────────────────────────────
export const BucketIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.cyan }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 2L6 10l11 0L17 2M5 10l14 0c0 0-2 11-3 11L8 21C7 21 5 10 5 10z" fill={`${color}10`} />
        <path d="M12 10v6" opacity="0.4" />
        <circle cx="12" cy="15" r="1.5" fill={color} stroke="none" />
    </svg>
);

// ─── LOCK OPEN / PERMISSION ICON ─────────────────────────────────────────────
export const LockOpenIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.red }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" fill={`${color}10`} />
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
        <circle cx="12" cy="16" r="1.5" fill={color} stroke="none" />
    </svg>
);

// ─── EXPOSED DATABASE ICON ──────────────────────────────────────────────────
export const ExposedDBIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.purple }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" fill={`${color}10`} />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M12 12l5 5M17 12l-5 5" stroke={COLORS.red} strokeWidth="2" />
    </svg>
);

// ─── DATA EXTRACTION ICON ───────────────────────────────────────────────────
export const DataExtractIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.cyan }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
        <rect x="8" y="5" width="8" height="2" fill={color} opacity="0.3" stroke="none" />
    </svg>
);

// ─── SHIELD WARNING ICON ────────────────────────────────────────────────────
export const ShieldWarningIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.red }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={`${color}10`} />
        <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" />
        <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="3" />
    </svg>
);

// ─── FINAL CHECK ICON ───────────────────────────────────────────────────────
export const FinalCheckIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.blue }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

// ─── USER / VISITOR ICON ─────────────────────────────────────────────────────
export const UserIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.white }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);




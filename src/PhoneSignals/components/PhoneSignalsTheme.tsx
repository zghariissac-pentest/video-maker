import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

// ─── Palette ─────────────────────────────────────────────────────────────────
export const COLORS = {
    bg: '#03070b',
    cyan: '#00f2ff',
    blue: '#0072ff',
    purple: '#7b00ff',
    red: '#ff2d55',
    white: '#ffffff',
};

// ─── Dark Cyber Background ─────────────────────
export const CyberBg: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            <AbsoluteFill style={{
                backgroundImage: `
                    linear-gradient(rgba(0,242,255,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,242,255,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px',
                transform: `rotate(15deg) scale(1.5) translateY(${(frame * 0.5) % 100}px)`,
                opacity: 0.6,
            }} />
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 20% 30%, rgba(0,242,255,0.12) 0%, transparent 70%), radial-gradient(circle at 80% 70%, rgba(0,114,255,0.10) 0%, transparent 70%)',
            }} />
            {/* Ambient signal rings */}
            {Array.from({ length: 4 }).map((_, i) => {
                const startFrame = i * 45;
                const progress = ((frame - startFrame) % 180) / 180;
                if (frame < startFrame) return null;
                return (
                    <div key={i} style={{
                        position: 'absolute', top: '50%', left: '50%',
                        width: progress * 2000, height: progress * 2000,
                        borderRadius: '50%',
                        border: `1px solid ${COLORS.cyan}${Math.floor((1 - progress) * 30).toString(16).padStart(2, '0')}`,
                        transform: 'translate(-50%, -50%)',
                        opacity: 1 - progress,
                    }} />
                );
            })}
        </AbsoluteFill>
    );
};

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
                        boxShadow: s.size > 1 ? `0 0 8px ${COLORS.cyan}44` : 'none',
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

// ─── PREMIUM PHONE ICON ──────────────────────────────────────────────────────
export const PhoneIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.cyan }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Device Body */}
        <rect x="5" y="2" width="14" height="20" rx="3" fill={`${color}10`} />
        {/* Screen Area (Subtle) */}
        <rect x="6" y="3" width="12" height="18" rx="1.5" strokeOpacity="0.3" strokeWidth="0.8" />
        {/* Notch */}
        <path d="M10 2h4l-1 1.5h-2l-1-1.5z" fill={color} stroke="none" />
        {/* Home/Power Indicator */}
        <rect x="11" y="19" width="2" height="0.5" rx="0.25" fill={color} stroke="none" />
    </svg>
);

// ─── CLEAN WAVES ICON ────────────────────────────────────────────────────────
export const WavesIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.cyan }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5a7.5 7.5 0 0 1 14 0" />
        <path d="M8 13.5a4 4 0 0 1 8 0" />
        <circle cx="12" cy="15" r="1" fill={color} stroke="none" />
    </svg>
);

// ─── BOLD OFFLINE ICON ───────────────────────────────────────────────────────
export const OfflineIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.red }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 1l22 22" stroke={color} strokeWidth="2" strokeOpacity="0.8" />
        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" strokeOpacity="0.4" />
        <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" strokeOpacity="0.4" />
        <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
        <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    </svg>
);

// ─── CLEAN WIFI ICON ─────────────────────────────────────────────────────────
export const WifiIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.cyan }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="2" />
        <rect x="2" y="5" width="20" height="14" rx="2" fill={`${color}05`} stroke="none" />
    </svg>
);

// ─── PROBE REQUEST ICON ──────────────────────────────────────────────────────
export const ProbeIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.blue }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" fill={`${color}10`} />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <path d="M11 8v6" />
        <path d="M8 11h6" />
        <path d="M2 12h2M12 2v2M20 12h2M12 20v2" opacity="0.4" />
    </svg>
);

// ─── MAC ADDRESS ICON ────────────────────────────────────────────────────────
export const MacIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.purple }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" fill={`${color}10`} />
        <path d="M6 10h.01M6 14h.01M10 10h.01M10 14h.01M14 10h.01M14 14h.01M18 10h.01M18 14h.01" strokeWidth="2.5" />
        <path d="M4 12h16" opacity="0.3" />
    </svg>
);

// ─── TRACKING / TARGET ICON ──────────────────────────────────────────────────
export const TrackingIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.red }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
        <circle cx="12" cy="12" r="6" fill={`${color}15`} />
        <circle cx="12" cy="12" r="2" fill={color} stroke="none" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>
);

// ─── LOCATION / AIRPORT ICON ────────────────────────────────────────────────
export const LocationIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.blue }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill={`${color}10`} />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

// ─── RANDOMIZATION / REFRESH ICON ───────────────────────────────────────────
export const RandomIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.cyan }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 2v6h-6" />
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M3 22v-6h6" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
        <circle cx="12" cy="12" r="2" fill={color} stroke="none" />
    </svg>
);

// ─── FINGERPRINT ICON ────────────────────────────────────────────────────────
export const FingerprintIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.purple }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10" />
        <path d="M7 15a5 5 0 0 1 10 0" />
        <path d="M12 17v3" />
        <path d="M5 12a7 7 0 0 1 14 0" />
        <path d="M9 13a3 3 0 0 1 6 0" />
        <rect x="11" y="19" width="2" height="3" rx="1" fill={color} stroke="none" />
    </svg>
);

// ─── ANALYSIS ICON ──────────────────────────────────────────────────────────
export const AnalysisIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.blue }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" strokeWidth="2.5" />
        <line x1="12" y1="20" x2="12" y2="4" strokeWidth="2.5" />
        <line x1="6" y1="20" x2="6" y2="14" strokeWidth="2.5" />
        <path d="M3 20h18" />
    </svg>
);

// ─── ENVIRONMENT ICON ────────────────────────────────────────────────────────
export const EnvironmentIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.cyan }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
        <circle cx="12" cy="12" r="4" fill={`${color}15`} />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5l1.5 1.5M5 19l1.5-1.5M17.5 6.5l1.5-1.5" />
    </svg>
);




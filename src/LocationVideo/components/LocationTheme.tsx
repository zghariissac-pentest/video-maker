import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

// ─── Palette ─────────────────────────────────────────────────────────────────
export const COLORS = {
    bg: '#03070b',
    green: '#00ff88',
    blue: '#00ccff',
    purple: '#9d00ff',
    red: '#ff4d4d',
    white: '#ffffff',
};

// ─── Shared Space/Cyber Background ───────────────────────────────────────────
export const SpaceBg: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            {/* Moving Grid */}
            <AbsoluteFill style={{
                backgroundImage: `
                    linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px',
                transform: `rotate(15deg) scale(1.5) translateY(${(frame * 0.5) % 100}px)`,
                opacity: 0.6,
            }} />
            {/* Subtle Gradient Glows */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 20% 30%, rgba(0,255,136,0.08) 0%, transparent 70%), radial-gradient(circle at 80% 70%, rgba(0,204,255,0.08) 0%, transparent 70%)',
            }} />
        </AbsoluteFill>
    );
};

// ─── Star Field ──────────────────────────────────────────────────────────────
export const StarField: React.FC<{ count?: number }> = ({ count = 80 }) => {
    const frame = useCurrentFrame();
    const stars = React.useMemo(() => Array.from({ length: count }, (_, i) => ({
        id: i, x: (i * 157.1) % 100, y: (i * 91.3) % 100,
        size: (i % 2) + 1,
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
        boxShadow: 'inset 0 0 600px rgba(0,0,0,0.95)',
    }} />
);

// ─── GPS OFF ICON (CLEAN) ────────────────────────────────────────────────────
export const GpsOffIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.red }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 1l22 22" strokeWidth="2" strokeOpacity="0.8" />
        <path d="M9.93 4.23l.32-.33M16.75 11.25l-.32.33" />
        <path d="M12 21c-4.418 0-8-3.582-8-8 0-1.745.558-3.36 1.5-4.672" />
        <path d="M18.5 8.328A7.962 7.962 0 0 1 20 13c0 4.418-3.582 8-8 8" />
        <line x1="8" y1="8" x2="16" y2="16" />
        <line x1="16" y1="8" x2="8" y2="16" />
    </svg>
);

// ─── SCANNING PIN ICON (CLEAN) ───────────────────────────────────────────────
export const LocationPinIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.green }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill={`${color}10`} />
        <circle cx="12" cy="10" r="3" fill={color} stroke="none" />
        <path d="M12 7v6M9 10h6" opacity="0.4" />
    </svg>
);

// ─── HACKER TARGET ICON (CLEAN) ──────────────────────────────────────────────
export const HackerMapIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.blue }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
        <path d="M8 8l8 8M16 8l-8 8" strokeWidth="2" />
    </svg>
);

// ─── IP ADDRESS ICON ─────────────────────────────────────────────────────────
export const IpIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.purple }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" fill={`${color}10`} />
        <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01" strokeWidth="2.5" />
        <path d="M2 14h20" opacity="0.3" />
        <path d="M12 17h.01" strokeWidth="2" />
    </svg>
);

// ─── SSID / WIFI POINT ICON ──────────────────────────────────────────────────
export const SsidIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.blue }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M12 20h.01" strokeWidth="2.5" />
        <circle cx="12" cy="15" r="1" fill={color} stroke="none" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    </svg>
);

// ─── SIGNAL STRENGTH ICON ────────────────────────────────────────────────────
export const StrengthIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.green }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
        <path d="M2 20v-2" opacity="0.4" />
        <circle cx="18" cy="4" r="1" fill={color} stroke="none" />
    </svg>
);

// ─── GEOLOCATION / EARTH ICON ────────────────────────────────────────────────
export const GeolocationIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.blue }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" opacity="0.4" />
        <circle cx="12" cy="12" r="2" fill={color} stroke="none" />
    </svg>
);

// ─── PATTERN / ANALYTICS ICON ───────────────────────────────────────────────
export const PatternIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.purple }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M18 9l-5 5-2-2-5 5" strokeWidth="2" />
        <circle cx="18" cy="9" r="1" fill={color} stroke="none" />
    </svg>
);

// ─── HISTORY / PIN RECORD ICON ──────────────────────────────────────────────
export const HistoryIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.green }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
        <path d="M12 2a10 10 0 1 0 10 10" strokeDasharray="2 2" />
    </svg>
);

// ─── FINAL SHIELD ICON ──────────────────────────────────────────────────────
export const FinalShieldIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.blue }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={`${color}10`} />
        <path d="M12 8v4" />
        <path d="M12 16h.01" strokeWidth="2" />
    </svg>
);

// ─── GLOBAL WARNING ICON ────────────────────────────────────────────────────
export const GlobalWarningIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.red }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
        <path d="M12 8v4M12 16h.01" strokeWidth="2" />
        <path d="M22 12h-4M6 12H2M12 2v4M12 22v-4" opacity="0.4" />
        <circle cx="12" cy="12" r="3" fill={`${color}15`} />
    </svg>
);




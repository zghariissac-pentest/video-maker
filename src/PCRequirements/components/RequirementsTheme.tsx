import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

// ─── Palette ─────────────────────────────────────────────────────────────────
export const COLORS = {
    bg: '#03070b',
    teal: '#00f2fe',
    blue: '#4facfe',
    purple: '#7367f0',
    pink: '#ce9ffc',
    white: '#ffffff',
    gray: '#a0a0a0',
    red: '#ff4d4d',
};

// ─── Dark Premium Background ────────────────────────────────────────────────────
export const RequirementsBg: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            {/* Soft animated gradient blobs */}
            <div style={{
                position: 'absolute', top: '-10%', right: '-10%',
                width: '60%', height: '60%', borderRadius: '50%',
                background: `radial-gradient(circle, ${COLORS.blue}22 0%, transparent 70%)`,
                filter: 'blur(80px)',
                transform: `translate(${Math.sin(frame / 100) * 40}px, ${Math.cos(frame / 100) * 40}px)`,
            }} />
            <div style={{
                position: 'absolute', bottom: '-15%', left: '-10%',
                width: '70%', height: '70%', borderRadius: '50%',
                background: `radial-gradient(circle, ${COLORS.purple}18 0%, transparent 70%)`,
                filter: 'blur(100px)',
                transform: `translate(${Math.cos(frame / 120) * 50}px, ${Math.sin(frame / 120) * 50}px)`,
            }} />

            {/* Subtle Grid */}
            <AbsoluteFill style={{
                backgroundImage: `
                    linear-gradient(to right, ${COLORS.teal}08 1px, transparent 1px),
                    linear-gradient(to bottom, ${COLORS.teal}08 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px',
                opacity: 0.4,
            }} />
        </AbsoluteFill>
    );
};

// ─── Floating Particle ────────────────────────────────────────────────────────
export const Particle: React.FC<{ delay: number; x: string; y: string; size: number; color: string }> = ({ delay, x, y, size, color }) => {
    const frame = useCurrentFrame();
    const op = interpolate(Math.sin((frame + delay) / 30), [-1, 1], [0.1, 0.4]);
    const drift = Math.sin((frame + delay) / 50) * 20;
    return (
        <div style={{
            position: 'absolute', left: x, top: y,
            width: size, height: size, borderRadius: '50%',
            background: color, opacity: op,
            transform: `translateY(${drift}px)`,
            filter: `blur(${size / 2}px)`,
            boxShadow: `0 0 ${size * 2}px ${color}`,
        }} />
    );
};

// ─── Vignette ─────────────────────────────────────────────────────────────────
export const Vignette: React.FC = () => (
    <AbsoluteFill style={{
        pointerEvents: 'none',
        boxShadow: 'inset 0 0 400px rgba(0,0,0,0.9)',
    }} />
);

// ─── VM / Virtual Machine Icon ────────────────────────────────────────────────
export const VMIcon: React.FC<{ size?: number; color?: string }> = ({ size = 120, color = COLORS.pink }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="14" height="14" rx="2" fill={`${color}10`} />
            <rect x="8" y="8" width="14" height="14" rx="2" fill={`${color}15`} style={{ opacity: 0.8 }} />
            <path d="M12 12h2" opacity="0.6" />
            <path d="M12 15h4" opacity="0.4" />
        </svg>
    );
};

// ─── Tools Icon ──────────────────────────────────────────────────────────────
export const ToolIcon: React.FC<{ size?: number; color?: string }> = ({ size = 120, color = COLORS.blue }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" fill={`${color}10`} />
    </svg>
);

// ─── RAM Icon ───────────────────────────────────────────────────────────────
export const RAMIcon: React.FC<{ size?: number; color?: string }> = ({ size = 120, color = COLORS.teal }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="10" width="18" height="4" rx="1" fill={`${color}10`} />
        <path d="M5 10V8M9 10V8M13 10V8M17 10V8" />
        <path d="M5 14v2M9 14v2M13 14v2M17 14v2" />
        <rect x="7" y="11" width="2" height="2" fill={color} />
        <rect x="11" y="11" width="2" height="2" fill={color} />
        <rect x="15" y="11" width="2" height="2" fill={color} />
    </svg>
);

// ─── Target / Metasploitable Icon ───────────────────────────────────────────
export const TargetIcon: React.FC<{ size?: number; color?: string }> = ({ size = 120, color = COLORS.red }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" fill={`${color}10`} />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" fill={color} />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
    </svg>
);

// ─── Storage / SSD Icon ─────────────────────────────────────────────────────
export const StorageIcon: React.FC<{ size?: number; color?: string }> = ({ size = 120, color = COLORS.blue }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="14" width="18" height="6" rx="1" fill={`${color}10`} />
        <rect x="3" y="4" width="18" height="6" rx="1" fill={`${color}10`} />
        <circle cx="6" cy="7" r="1" fill={color} />
        <circle cx="6" cy="17" r="1" fill={color} />
        <path d="M10 7h8M10 17h8" opacity="0.6" />
        {/* Speed lines */}
        <path d="M19 10h3M18 12h5" strokeWidth="1" opacity="0.4" />
    </svg>
);

// ─── Wifi / Wireless Adapter Icon ───────────────────────────────────────────
export const WifiIcon: React.FC<{ size?: number; color?: string }> = ({ size = 120, color = COLORS.teal }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" strokeDasharray="1 2" opacity="0.4" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" strokeDasharray="2 1" opacity="0.6" />
            <circle cx="12" cy="20" r="1" fill={color} />
            {/* USB Shape */}
            <rect x="10" y="18" width="4" height="4" rx="1" fill={`${color}20`} opacity="0.5" />
        </svg>
    );
};

// ─── PC / Computer Icon ───────────────────────────────────────────────────────
export const PCIcon: React.FC<{ size?: number; color?: string }> = ({ size = 120, color = COLORS.teal }) => {
    const frame = useCurrentFrame();
    const pulse = interpolate(Math.sin(frame / 15), [-1, 1], [1, 1.05]);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `scale(${pulse})`, filter: `drop-shadow(0 0 15px ${color}44)` }}>
            {/* Monitor */}
            <rect x="2" y="3" width="20" height="14" rx="2" fill={`${color}10`} />
            <path d="M8 21h8" />
            <path d="M12 17v4" />
            {/* Screen detail */}
            <path d="M6 7h12" opacity="0.5" />
            <path d="M6 10h8" opacity="0.3" />
            {/* Terminal prompt symbol */}
            <path d="M5 13l2 1-2 1" strokeWidth="1.5" />
        </svg>
    );
};

// ─── Chip / CPU Icon ──────────────────────────────────────────────────────────
export const CPUIcon: React.FC<{ size?: number; color?: string }> = ({ size = 120, color = COLORS.purple }) => {
    const frame = useCurrentFrame();
    const pulse = interpolate(Math.sin(frame / 10), [-1, 1], [1, 1.08]);
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `scale(${pulse})` }}>
            <rect x="4" y="4" width="16" height="16" rx="2" fill={`${color}10`} />
            <rect x="9" y="9" width="6" height="6" fill={`${color}20`} />
            <path d="M15 2v2M9 2v2M20 15h2M20 9h2M15 20v2M9 20v2M2 15h2M2 9h2" />
        </svg>
    );
};

import React from 'react';
import {
    AbsoluteFill,
} from 'remotion';

export const COLORS = {
    primary: '#47a0f5',     // Electric Blue
    secondary: '#f54768',   // Vibrant Red/Pink
    accent: '#28c840',      // Success Green
    warning: '#febc2e',     // Alert Orange
    background: '#010103',
    card: 'rgba(10, 15, 25, 0.7)',
    white: '#ffffff',
    purple: '#a855f7',      // Creative Purple
};

// Stable Space Elements
export const StableSpaceBg: React.FC = () => (
    <AbsoluteFill style={{
        background: `radial-gradient(circle at 50% 50%, #050a14 0%, #010103 100%)`,
    }}>
        {/* Deep Nebulae */}
        <div style={{
            position: 'absolute',
            width: '150%',
            height: '150%',
            left: '-25%',
            top: '-25%',
            background: 'radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.05) 0%, transparent 40%), radial-gradient(circle at 70% 70%, rgba(71, 160, 245, 0.05) 0%, transparent 40%)',
            filter: 'blur(100px)',
        }} />
    </AbsoluteFill>
);

export const StableStarField: React.FC<{ count?: number }> = ({ count = 120 }) => (
    <AbsoluteFill>
        {[...Array(count)].map((_, i) => (
            <div key={i} style={{
                position: 'absolute',
                top: `${(i * 137.5) % 100}%`,
                left: `${(i * 224.7) % 100}%`,
                width: i % 10 === 0 ? 3 : 1.5,
                height: i % 10 === 0 ? 3 : 1.5,
                background: i % 5 === 0 ? COLORS.primary : COLORS.white,
                borderRadius: '50%',
                opacity: 0.3 + ((i * 0.1) % 0.5),
                boxShadow: i % 10 === 0 ? `0 0 10px ${COLORS.primary}` : 'none'
            }} />
        ))}
    </AbsoluteFill>
);

export const StaticVignette: React.FC = () => (
    <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 120%)',
        zIndex: 50,
        pointerEvents: 'none'
    }} />
);

// Advanced Glass Card
export const GlassCard: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
    <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(30px)',
        borderRadius: 24,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
        ...style
    }}>
        {children}
    </div>
);

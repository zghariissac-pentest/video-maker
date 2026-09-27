import React from 'react';
import {
    AbsoluteFill,
} from 'remotion';

export const COLORS = {
    primary: '#00f2ff',     // Cyber Cyan
    secondary: '#ff007a',   // Neon Magenta
    accent: '#39ff14',      // Neon Lime
    background: '#050508',
    surface: 'rgba(20, 20, 30, 0.4)',
    border: 'rgba(255, 255, 255, 0.1)',
    white: '#f0f0f5',
};

// Modern Background: Mesh Gradient + Subtle Grid
export const ModernBackground: React.FC = () => (
    <AbsoluteFill style={{
        background: COLORS.background,
        overflow: 'hidden',
    }}>
        {/* Mesh Gradients */}
        <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `
                radial-gradient(circle at 10% 10%, rgba(0, 242, 255, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 90% 90%, rgba(255, 0, 122, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 50% 10%, rgba(57, 255, 20, 0.03) 0%, transparent 40%)
            `,
            filter: 'blur(80px)',
        }} />

        {/* Subtle Architecture Grid */}
        <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            opacity: 0.5,
        }} />

        {/* Scanning Light Line */}
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0, 242, 255, 0.2), transparent)',
            boxShadow: '0 0 20px rgba(0, 242, 255, 0.4)',
            animation: 'scan 4s linear infinite',
        }} />
    </AbsoluteFill>
);

export const ModernStaticVignette: React.FC = () => (
    <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.9) 150%)',
        zIndex: 50,
        pointerEvents: 'none'
    }} />
);

// Modern "Bento" Style Card
export const BentoCard: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
    <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        borderRadius: 32,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.02)',
        padding: 30,
        ...style
    }}>
        {children}
    </div>
);

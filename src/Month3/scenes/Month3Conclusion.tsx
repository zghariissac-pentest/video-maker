import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
} from 'remotion';
import {
    StableSpaceBg, StableStarField, StaticVignette,
    COLORS
} from '../components/Month3Theme';

const FactLabel: React.FC<{ label: string; value: string; color: string; opacity: number; highlight?: boolean }> = ({ label, value, color, opacity, highlight }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        opacity,
        transform: highlight && opacity > 0 ? 'scale(1.05)' : 'none',
        transition: 'transform 0.3s ease-out'
    }}>
        <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.4)', fontWeight: 'bold' }}>{label}</div>
        <div style={{
            fontSize: 32,
            fontWeight: '900',
            color: highlight ? COLORS.secondary : COLORS.white,
            padding: '10px 30px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 12,
            border: `1px solid ${highlight ? COLORS.secondary : 'rgba(255,255,255,0.1)'}`,
            boxShadow: highlight ? `0 0 30px ${COLORS.secondary}30` : 'none'
        }}>
            {value}
        </div>
    </div>
);

export const Month3Conclusion: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{
            background: COLORS.background,
            fontFamily: 'Cairo, sans-serif',
            overflow: 'hidden',
        }}>
            <StableSpaceBg />
            <StableStarField count={100} />

            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 80,
                zIndex: 10
            }}>
                {/* HEADLINE */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    fontSize: 48,
                    fontWeight: 800,
                    color: COLORS.white,
                    maxWidth: 1000,
                    opacity: interpolate(frame, [10, 30], [0, 1])
                }}>
                    نفس المسار… نفس المستخدم…
                </div>

                {/* FACT GRID */}
                <div style={{ display: 'flex', gap: 40 }}>
                    <FactLabel
                        label="PATH"
                        value="/admin/dashboard"
                        color={COLORS.primary}
                        opacity={interpolate(frame, [40, 60], [0, 1])}
                    />
                    <FactLabel
                        label="USER"
                        value="ANONYMOUS"
                        color={COLORS.primary}
                        opacity={interpolate(frame, [70, 90], [0, 1])}
                    />
                    <FactLabel
                        label="METHOD"
                        value="POST (Tampered)"
                        color={COLORS.secondary}
                        highlight
                        opacity={interpolate(frame, [140, 160], [0, 1])}
                    />
                </div>

                {/* IMPACT TEXT */}
                <div style={{
                    direction: 'rtl',
                    fontSize: 55,
                    fontWeight: 900,
                    color: COLORS.secondary,
                    opacity: interpolate(frame, [150, 170], [0, 1]),
                    textShadow: `0 0 40px ${COLORS.secondary}40`
                }}>
                    لكن طريقة الطلب فقط… غيّرت النتيجة.
                </div>
            </div>

            <StaticVignette />
        </AbsoluteFill>
    );
};

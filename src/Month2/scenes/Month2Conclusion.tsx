import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
} from 'remotion';
import {
    StableSpaceBg, StableStarField, StaticVignette,
    COLORS
} from '../components/Month2Theme';

const DecisionBox: React.FC<{ label: string; isActive?: boolean; opacity: number }> = ({ label, isActive, opacity }) => (
    <div style={{
        width: 350,
        height: 120,
        background: isActive ? `${COLORS.primary}15` : 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(20px)',
        borderRadius: 20,
        border: `1px solid ${isActive ? COLORS.primary : 'rgba(255, 255, 255, 0.1)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: isActive ? COLORS.secondary : 'rgba(255, 255, 255, 0.4)',
        opacity,
        boxShadow: isActive ? `0 0 40px ${COLORS.primary}30` : 'none',
        transition: 'all 0.3s ease'
    }}>
        {label}
    </div>
);

export const Month2Conclusion: React.FC = () => {
    const frame = useCurrentFrame();
    const highlightResult = frame > 150;

    return (
        <AbsoluteFill style={{
            background: '#010103',
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
                gap: 60,
                zIndex: 10
            }}>
                {/* HEADLINE TEXT (Stable fade only) */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    fontSize: 40,
                    fontWeight: 700,
                    color: COLORS.white,
                    opacity: interpolate(frame, [20, 40], [0, 1])
                }}>
                    السيرفر قد يختار:
                </div>

                {/* DECISION MATRIX (Stable fade only) */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 25,
                }}>
                    <DecisionBox
                        label="أول قيمة"
                        opacity={interpolate(frame, [60, 80], [0, 1])}
                    />
                    <DecisionBox
                        label="أو آخر قيمة"
                        isActive={highlightResult}
                        opacity={interpolate(frame, [90, 110], [0, 1])}
                    />
                    <DecisionBox
                        label="أو تتصرف بشكل غير متوقع"
                        opacity={interpolate(frame, [120, 140], [0, 1])}
                    />
                </div>

                {/* HIGHLIGHTED RESULT */}
                <div style={{
                    marginTop: 20,
                    padding: '15px 40px',
                    background: highlightResult ? `${COLORS.secondary}15` : 'transparent',
                    borderRadius: 40,
                    border: `2px solid ${highlightResult ? COLORS.secondary : 'transparent'}`,
                    opacity: interpolate(frame, [160, 180], [0, 1]),
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                    color: COLORS.secondary,
                    fontSize: 32,
                    fontWeight: '900',
                    textShadow: `0 0 20px ${COLORS.secondary}50`
                }}>
                    <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span>role=admin used</span>
                </div>
            </div>

            <StaticVignette />
        </AbsoluteFill>
    );
};

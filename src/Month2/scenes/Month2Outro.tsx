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

export const Month2Outro: React.FC = () => {
    const frame = useCurrentFrame();

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
                gap: 40,
                zIndex: 10
            }}>
                {/* INTRO TEXT (Stable fade) */}
                <div style={{
                    fontSize: 40,
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.6)',
                    opacity: interpolate(frame, [20, 40], [0, 1]),
                }}>
                    هذه التقنية تُعرف بـ:
                </div>

                {/* MAIN TITLE (Stable fade + Glow) */}
                <div style={{
                    fontSize: 100,
                    fontWeight: 950,
                    color: COLORS.secondary,
                    opacity: interpolate(frame, [50, 70], [0, 1]),
                    textShadow: `0 0 50px ${COLORS.secondary}50`,
                    letterSpacing: '0.05em'
                }}>
                    Parameter Pollution
                </div>

                {/* BOTTOM TEXT (Stable fade) */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    maxWidth: 800,
                    fontSize: 45,
                    fontWeight: 800,
                    color: COLORS.white,
                    opacity: interpolate(frame, [100, 120], [0, 1]),
                    lineHeight: 1.5
                }}>
                    وتُستخدم لاختبار منطق التطبيق…<br />
                    وليس فقط المدخلات
                </div>
            </div>

            <StaticVignette />
        </AbsoluteFill>
    );
};

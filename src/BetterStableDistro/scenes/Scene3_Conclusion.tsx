import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig
} from 'remotion';
import { SpaceBg, StarField, Vignette, COLORS } from '../components/Theme';

// ─── Custom Icons ─────────────────────────────────────────────────────────────
const BalanceIcon: React.FC<{ size?: number; color1?: string; color2?: string }> = ({ size = 120, color1 = COLORS.primary, color2 = COLORS.accent }) => {
    const frame = useCurrentFrame();

    // Animate a slight balance tilting
    const tilt = interpolate(Math.sin(frame / 20), [-1, 1], [-5, 5]);

    return (
        <div style={{ transform: `rotate(${tilt}deg)`, transformOrigin: 'center bottom' }}>
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Scale base */}
                <path d="M12 3v18" stroke="white" strokeWidth="2" opacity="0.8" />
                <path d="M8 21h8" stroke="white" strokeWidth="2" opacity="0.8" />

                {/* Balance Beam */}
                <path d="M3 7h18" stroke="white" strokeWidth="2" opacity="0.8" />

                {/* Left Pan (Everyday Work - Blue) */}
                <path d="M3 7v5c0 3.5 2 6 4 6s4-2.5 4-6V7" stroke={color1} />
                <circle cx="7" cy="12" r="2" fill={color1} opacity="0.8" />

                {/* Right Pan (Cybersecurity - Green) */}
                <path d="M13 7v5c0 3.5 2 6 4 6s4-2.5 4-6V7" stroke={color2} />
                <path d="M17 10v4" stroke={color2} />
                <path d="M15 12h4" stroke={color2} />
            </svg>
        </div>
    );
};

export const Scene3_Conclusion: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={100} />

            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
            }}>
                <div style={{
                    opacity: interpolate(spring({ frame: frame - 10, fps }), [0, 1], [0, 1]),
                    transform: `scale(${interpolate(spring({ frame: frame - 10, fps, config: { damping: 12 } }), [0, 1], [0.5, 1])})`,
                    background: `linear-gradient(135deg, ${COLORS.primary}10, ${COLORS.accent}10)`,
                    borderRadius: '50%',
                    padding: '30px',
                    boxShadow: `0 0 40px ${COLORS.primary}20, inset 0 0 20px ${COLORS.accent}10`,
                    marginBottom: 50
                }}>
                    <BalanceIcon size={120} />
                </div>

                <p style={{
                    fontSize: 54,
                    fontWeight: 700,
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl',
                    textAlign: 'center',
                    color: 'white',
                    lineHeight: 1.6,
                    maxWidth: '85%',
                    textShadow: `0 0 20px rgba(255,255,255,0.2)`,
                    opacity: interpolate(spring({ frame: frame - 40, fps }), [0, 1], [0, 1]),
                    transform: `translateY(${interpolate(spring({ frame: frame - 40, fps }), [0, 1], [30, 0])}px)`
                }}>
                    وبهذه الطريقة يمكنك استخدام النظام <span style={{ color: COLORS.primary }}>للعمل اليومي</span><br />
                    <span style={{ color: COLORS.accent }}>وأدوات الاختبار الأمني</span> في نفس الوقت.
                </p>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};

import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import {
    SpaceBg, StarField, Vignette,
    COLORS, ShieldIcon
} from '../components/Theme';

export const Scene4_Conclusion: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={150} />

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: '0 60px',
                zIndex: 10,
                gap: 60
            }}>
                {/* Main Conclusion Icon */}
                <div style={{
                    width: 200, height: 200, borderRadius: '60px',
                    background: `${COLORS.primary}10`, border: `2px solid ${COLORS.primary}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 60px ${COLORS.primary}20`,
                    opacity: interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp' }),
                    transform: `scale(${interpolate(spring({ frame: frame - 10, fps }), [0, 1], [0.8, 1])}) rotate(${Math.sin(frame / 40) * 5}deg)`,
                }}>
                    <ShieldIcon size={120} color={COLORS.primary} />
                </div>

                {/* Conclusion Text Part 1 */}
                <div style={{
                    opacity: interpolate(frame, [40, 60], [0, 1], { extrapolateRight: 'clamp' }),
                    transform: `translateY(${interpolate(spring({ frame: frame - 40, fps }), [0, 1], [20, 0])}px)`,
                }}>
                    <p style={{
                        fontSize: 50,
                        fontWeight: 800,
                        fontFamily: 'Cairo, sans-serif',
                        direction: 'rtl',
                        textAlign: 'center',
                        color: 'white',
                        lineHeight: 1.6,
                        margin: 0,
                    }}>
                        في كثير من الحالات يكشف <span style={{ color: COLORS.secondary }}>تحليل Firmware</span><br />
                        معلومات حساسة أو <span style={{ color: COLORS.accent }}>آلية عمل الجهاز</span>.
                    </p>
                </div>

                {/* Conclusion Text Part 2 */}
                <div style={{
                    opacity: interpolate(frame, [160, 180], [0, 1], { extrapolateRight: 'clamp' }),
                    transform: `translateY(${interpolate(spring({ frame: frame - 160, fps }), [0, 1], [20, 0])}px)`,
                }}>
                    <p style={{
                        fontSize: 48,
                        fontWeight: 600,
                        fontFamily: 'Cairo, sans-serif',
                        direction: 'rtl',
                        textAlign: 'center',
                        color: 'rgba(255,255,255,0.9)',
                        lineHeight: 1.6,
                        margin: 0,
                    }}>
                        وهي <span style={{ color: COLORS.primary }}>خطوة أساسية</span> في <br />
                        تحليل أمن أجهزة <span style={{ color: COLORS.primary }}>IoT</span>.
                    </p>
                </div>

                {/* Final CTA Strip */}
                <div style={{
                    marginTop: 40,
                    background: `linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.accent}15)`,
                    padding: '35px 60px',
                    borderRadius: '30px',
                    border: `1px solid ${COLORS.primary}30`,
                    opacity: interpolate(frame, [260, 280], [0, 1], { extrapolateRight: 'clamp' }),
                    transform: `scale(${interpolate(spring({ frame: frame - 260, fps }), [0, 1], [0.95, 1])})`,
                    boxShadow: `0 20px 50px rgba(0,0,0,0.5)`,
                }}>
                    <p style={{
                        fontSize: 42,
                        fontWeight: 900,
                        fontFamily: 'Cairo, sans-serif',
                        direction: 'rtl',
                        textAlign: 'center',
                        color: 'white',
                        margin: 0,
                    }}>
                        للمزيد من أسرار <span style={{ color: COLORS.primary }}>IoT Security</span><br />
                        و <span style={{ color: COLORS.secondary }}>Cyber Hacking</span>.. تابع الحساب!
                    </p>
                </div>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};

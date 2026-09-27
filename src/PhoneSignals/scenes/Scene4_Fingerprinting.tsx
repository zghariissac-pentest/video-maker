import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import {
    CyberBg, StarField, Vignette,
    COLORS, FingerprintIcon, AnalysisIcon, EnvironmentIcon, PhoneIcon
} from '../components/PhoneSignalsTheme';

export const Scene4_Fingerprinting: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            <CyberBg />
            <StarField count={40} />
            <Vignette />

            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '0 60px',
            }}>

                {/* Part 1: Fingerprinting (0s - 10s) */}
                {frame < 300 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                        opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }) *
                            interpolate(frame, [285, 300], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                    }}>
                        <div style={{ display: 'flex', gap: 30 }}>
                            <div style={{
                                width: 140, height: 140, borderRadius: '40px',
                                background: `${COLORS.purple}15`, border: `1.5px solid ${COLORS.purple}33`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: `0 20px 40px ${COLORS.purple}22`,
                            }}>
                                <FingerprintIcon size={90} color={COLORS.purple} />
                            </div>
                            <div style={{
                                width: 140, height: 140, borderRadius: '40px',
                                background: `${COLORS.blue}15`, border: `1.5px solid ${COLORS.blue}33`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: `0 20px 40px ${COLORS.blue}22`,
                            }}>
                                <AnalysisIcon size={90} color={COLORS.blue} />
                            </div>
                        </div>

                        <p style={{
                            fontSize: 44, fontWeight: 700, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: '#fff', lineHeight: 1.6, margin: 0
                        }}>
                            لكن مع ذلك، ما زالت هناك طرق أخرى للتعرف على الأجهزة <br />
                            مثل تحليل <span style={{ color: COLORS.blue }}>أنماط الإرسال</span> أو استخدام <br />
                            تقنيات <span style={{ color: COLORS.purple, fontSize: 60, fontWeight: 900 }}>DEVICE FINGERPRINTING</span>.
                        </p>
                    </div>
                )}

                {/* Part 2: Still Communicating (10.3s - 20s) */}
                {frame >= 300 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                        opacity: interpolate(frame, [300, 315], [0, 1], { extrapolateRight: 'clamp' })
                    }}>
                        <div style={{
                            width: 180, height: 180, borderRadius: '50%',
                            background: `${COLORS.cyan}20`, border: `2px solid ${COLORS.cyan}44`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 0 70px ${COLORS.cyan}33`,
                            transform: `scale(${spring({ frame: frame - 300, fps, config: { damping: 10 } })})`
                        }}>
                            <div style={{ position: 'relative' }}>
                                <PhoneIcon size={90} color={COLORS.cyan} />
                                <div style={{
                                    position: 'absolute', inset: -40,
                                    border: `2px dashed ${COLORS.cyan}33`,
                                    borderRadius: '50%',
                                    animation: 'spin 10s linear infinite',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <EnvironmentIcon size={60} color={COLORS.cyan} />
                                </div>
                            </div>
                        </div>

                        <p style={{
                            fontSize: 48, fontWeight: 700, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: '#fff', lineHeight: 1.6, margin: 0
                        }}>
                            لهذا السبب، حتى عندما لا تستخدم الإنترنت فعلياً، <br />
                            فإن جهازك ما زال يتواصل مع <span style={{ color: COLORS.cyan }}>البيئة المحيطة</span> <br />
                            به عبر <span style={{ color: COLORS.blue }}>إشارات الشبكة</span>.
                        </p>
                    </div>
                )}

            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>

            <div style={{
                position: 'absolute', bottom: (frame * 5) % 1920, left: 0, right: 0,
                height: 2, background: `linear-gradient(90deg, transparent, ${COLORS.cyan}44, transparent)`, opacity: 0.3,
            }} />
        </AbsoluteFill>
    );
};

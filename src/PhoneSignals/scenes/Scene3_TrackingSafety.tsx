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
    COLORS, TrackingIcon, LocationIcon, RandomIcon, PhoneIcon
} from '../components/PhoneSignalsTheme';

export const Scene3_TrackingSafety: React.FC = () => {
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

                {/* Part 1: Historical Tracking (0s - 10s) */}
                {frame < 300 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                        opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }) *
                            interpolate(frame, [285, 300], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                    }}>
                        <div style={{ display: 'flex', gap: 30 }}>
                            <div style={{
                                width: 140, height: 140, borderRadius: '40px',
                                background: `${COLORS.red}15`, border: `1.5px solid ${COLORS.red}33`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: `0 20px 40px ${COLORS.red}22`,
                            }}>
                                <TrackingIcon size={90} color={COLORS.red} />
                            </div>
                            <div style={{
                                width: 140, height: 140, borderRadius: '40px',
                                background: `${COLORS.blue}15`, border: `1.5px solid ${COLORS.blue}33`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: `0 20px 40px ${COLORS.blue}22`,
                            }}>
                                <LocationIcon size={90} color={COLORS.blue} />
                            </div>
                        </div>

                        <p style={{
                            fontSize: 44, fontWeight: 700, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: '#fff', lineHeight: 1.6, margin: 0
                        }}>
                            في الماضي كان هذا يسمح بتتبع الأجهزة بسهولة <br />
                            داخل أماكن مثل <span style={{ color: COLORS.blue }}>المطارات</span> أو <span style={{ color: COLORS.blue }}>مراكز التسوق</span>، <br />
                            لأن نفس <span style={{ color: COLORS.red }}>MAC Address</span> يظهر في كل مرة.
                        </p>
                    </div>
                )}

                {/* Part 2: Modern Randomization (10.3s - 20s) */}
                {frame >= 300 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                        opacity: interpolate(frame, [300, 315], [0, 1], { extrapolateRight: 'clamp' })
                    }}>
                        <div style={{
                            width: 180, height: 180, borderRadius: '40px',
                            background: `${COLORS.cyan}20`, border: `2px solid ${COLORS.cyan}44`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 30px 60px ${COLORS.cyan}22`,
                            transform: `scale(${spring({ frame: frame - 300, fps, config: { damping: 10 } })})`
                        }}>
                            <div style={{ position: 'relative' }}>
                                <PhoneIcon size={100} color={COLORS.cyan} />
                                <div style={{
                                    position: 'absolute', top: -30, right: -40,
                                    transform: `rotate(${frame * 2}deg)`
                                }}>
                                    <RandomIcon size={70} color={COLORS.cyan} />
                                </div>
                            </div>
                        </div>

                        <p style={{
                            fontSize: 48, fontWeight: 700, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: '#fff', lineHeight: 1.6, margin: 0
                        }}>
                            بدأت الأنظمة الحديثة مثل <span style={{ color: COLORS.blue }}>Android</span> و <span style={{ color: COLORS.blue }}>iOS</span> <br />
                            باستخدام تقنية <span style={{ color: COLORS.cyan, fontSize: 60, fontWeight: 900 }}>RANDOMIZATION</span>، <br />
                            حيث يتم تغيير العنوان دورياً لتقليل إمكانية التتبع.
                        </p>
                    </div>
                )}

            </div>

            {/* Glowing Scan Bar */}
            <div style={{
                position: 'absolute', top: (frame * 7) % 1920, left: 0, right: 0,
                height: 100, background: `linear-gradient(to bottom, transparent, ${COLORS.cyan}08, transparent)`,
                pointerEvents: 'none'
            }} />
        </AbsoluteFill>
    );
};

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
    COLORS, GeolocationIcon, PatternIcon, HistoryIcon
} from '../components/LocationTheme';

export const Scene3_Techniques: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={40} />
            <Vignette />

            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '0 60px',
            }}>

                {/* Part 1: Geolocation Techniques (0s - 10s) */}
                {frame < 300 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 50,
                        opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }) *
                            interpolate(frame, [285, 300], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                    }}>
                        <div style={{
                            width: 170, height: 170, borderRadius: '45px',
                            background: `${COLORS.blue}15`, border: `1.5px solid ${COLORS.blue}33`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 25px 60px ${COLORS.blue}15`,
                            transform: `scale(${spring({ frame, fps, config: { damping: 12 } })})`
                        }}>
                            <GeolocationIcon size={110} color={COLORS.blue} />
                        </div>

                        <p style={{
                            fontSize: 48, fontWeight: 700, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: '#fff', lineHeight: 1.6, margin: 0
                        }}>
                            باستخدام هذه المعلومات، يمكن تقدير موقعك <br />
                            بشكل تقريبي جداً عبر تقنيات مثل <br />
                            <span style={{ color: COLORS.blue, fontSize: 56 }}>IP Geolocation</span> و <span style={{ color: COLORS.green }}>Wi-Fi Positioning</span>.
                        </p>
                    </div>
                )}

                {/* Part 2: Patterns & History (10s - 20s) */}
                {frame >= 300 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                        opacity: interpolate(frame, [300, 315], [0, 1], { extrapolateRight: 'clamp' })
                    }}>
                        <div style={{ display: 'flex', gap: 30 }}>
                            <div style={{
                                width: 150, height: 150, borderRadius: '40px',
                                background: `${COLORS.purple}15`, border: `1.5px solid ${COLORS.purple}33`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: `0 20px 50px ${COLORS.purple}15`,
                            }}>
                                <PatternIcon size={90} color={COLORS.purple} />
                            </div>
                            <div style={{
                                width: 150, height: 150, borderRadius: '40px',
                                background: `${COLORS.green}15`, border: `1.5px solid ${COLORS.green}33`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: `0 20px 50px ${COLORS.green}15`,
                            }}>
                                <HistoryIcon size={90} color={COLORS.green} />
                            </div>
                        </div>

                        <p style={{
                            fontSize: 44, fontWeight: 700, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: '#fff', lineHeight: 1.6, margin: 0
                        }}>
                            كما أن بعض التطبيقات تجمع بيانات إضافية <br />
                            مما يسمح بتحليل <span style={{ color: COLORS.purple }}>الأنماط</span> ومعرفة <br />
                            <span style={{ color: COLORS.green, background: COLORS.green + '15', padding: '5px 15px' }}>الأماكن التي تزورها غالباً</span>.
                        </p>
                    </div>
                )}

            </div>

            {/* Glowing Scan Bar */}
            <div style={{
                position: 'absolute', top: (frame * 7) % 1920, left: 0, right: 0,
                height: 120, background: `linear-gradient(to bottom, transparent, ${COLORS.blue}05, transparent)`,
                pointerEvents: 'none', opacity: 0.3
            }} />
        </AbsoluteFill>
    );
};

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
    COLORS, WifiIcon, ProbeIcon, MacIcon
} from '../components/PhoneSignalsTheme';

export const Scene2_ProbeRequests: React.FC = () => {
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

                {/* Part 1: WiFi Active & Probe Requests (0s - 7s) */}
                {frame < 210 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                        opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }) *
                            interpolate(frame, [195, 210], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                    }}>
                        <div style={{
                            width: 160, height: 160, borderRadius: '40px',
                            background: `${COLORS.cyan}15`, border: `1.5px solid ${COLORS.cyan}33`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 20px 50px ${COLORS.cyan}15`,
                            transform: `scale(${spring({ frame, fps, config: { damping: 12 } })})`
                        }}>
                            <WifiIcon size={100} color={COLORS.cyan} />
                        </div>

                        <p style={{
                            fontSize: 52, fontWeight: 700, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: '#fff', lineHeight: 1.6, margin: 0
                        }}>
                            عندما يكون <span style={{ color: COLORS.cyan }}>Wi-Fi</span> مفعلاً، يقوم الهاتف بشكل دوري <br />
                            بإرسال ما يسمى <span style={{ color: COLORS.blue, fontSize: 64 }}>Probe Requests</span>.
                        </p>
                    </div>
                )}

                {/* Part 2: Searching for networks (7.3s - 13s) */}
                {frame >= 210 && frame < 400 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                        opacity: interpolate(frame, [210, 225], [0, 1], { extrapolateRight: 'clamp' }) *
                            interpolate(frame, [385, 400], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                    }}>
                        <div style={{
                            width: 160, height: 160, borderRadius: '40px',
                            background: `${COLORS.blue}15`, border: `1.5px solid ${COLORS.blue}33`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 20px 50px ${COLORS.blue}15`,
                        }}>
                            <ProbeIcon size={100} color={COLORS.blue} />
                        </div>

                        <p style={{
                            fontSize: 48, fontWeight: 600, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: '#fff', lineHeight: 1.6, margin: 0
                        }}>
                            هذه عبارة عن طلبات قصيرة يبحث فيها الجهاز <br />
                            عن شبكات <span style={{ color: COLORS.blue }}>Wi-Fi</span> معروفة أو قريبة للاتصال بها.
                        </p>
                    </div>
                )}

                {/* Part 3: MAC Address (13.3s - 20s) */}
                {frame >= 400 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                        opacity: interpolate(frame, [400, 415], [0, 1], { extrapolateRight: 'clamp' })
                    }}>
                        <div style={{
                            width: 160, height: 160, borderRadius: '40px',
                            background: `${COLORS.purple}15`, border: `1.5px solid ${COLORS.purple}33`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 20px 50px ${COLORS.purple}15`,
                            transform: `rotate(${Math.sin(frame / 20) * 10}deg)`
                        }}>
                            <MacIcon size={100} color={COLORS.purple} />
                        </div>

                        <p style={{
                            fontSize: 48, fontWeight: 700, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: '#fff', lineHeight: 1.6, margin: 0
                        }}>
                            كل <span style={{ color: COLORS.blue }}>Probe Request</span> يحتوي على معلومات مثل <br />
                            <span style={{ color: COLORS.purple, fontSize: 64, fontWeight: 900 }}>MAC ADDRESS</span> <br />
                            وهو معرّف فريد لواجهة الشبكة.
                        </p>
                    </div>
                )}

            </div>

            {/* Scanning Line Effect */}
            <div style={{
                position: 'absolute', top: (frame * 6) % 1920, left: 0, right: 0,
                height: 2, background: `linear-gradient(90deg, transparent, ${COLORS.cyan}44, transparent)`, opacity: 0.3,
            }} />
        </AbsoluteFill>
    );
};

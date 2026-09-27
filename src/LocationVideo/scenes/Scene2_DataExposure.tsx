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
    COLORS, IpIcon, SsidIcon, StrengthIcon
} from '../components/LocationTheme';

const DataBox: React.FC<{
    icon: React.ReactNode;
    title: string;
    value: string;
    delay: number;
    accentColor: string;
}> = ({ icon, title, value, delay, accentColor }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < delay) return null;

    const slide = spring({
        frame: frame - delay,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 25,
            opacity: slide,
            transform: `translateX(${interpolate(slide, [0, 1], [50, 0])}px)`,
            background: `linear-gradient(90deg, ${accentColor}12, transparent)`,
            padding: '20px 30px',
            borderRadius: '20px',
            borderRight: `4px solid ${accentColor}`,
            width: '100%',
            marginBottom: 20,
            direction: 'rtl'
        }}>
            <div style={{
                width: 70, height: 70, borderRadius: '18px',
                background: `${accentColor}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>{icon}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span style={{ color: accentColor, fontSize: 24, fontWeight: 800, fontFamily: 'Cairo' }}>{title}</span>
                <span style={{ color: '#fff', fontSize: 36, fontWeight: 700, fontFamily: 'monospace' }}>{value}</span>
            </div>
        </div>
    );
};

export const Scene2_DataExposure: React.FC = () => {
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

                {/* Intro Title: When using apps/internet... (0s - 4s) */}
                {frame < 120 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                        opacity: interpolate(frame, [0, 15], [0, 1]) * interpolate(frame, [105, 120], [1, 0])
                    }}>
                        <p style={{
                            fontSize: 52, fontWeight: 800, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: '#fff', lineHeight: 1.5, margin: 0
                        }}>
                            عندما تستخدم <span style={{ color: COLORS.blue }}>الإنترنت</span> أو <span style={{ color: COLORS.green }}>التطبيقات</span>، <br />
                            يرسل جهازك معلومات مثل:
                        </p>
                    </div>
                )}

                {/* Data List: IP, SSID, Strength (4s - 15s) */}
                {frame >= 120 && (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <DataBox
                            delay={140}
                            accentColor={COLORS.purple}
                            icon={<IpIcon size={40} color={COLORS.purple} />}
                            title="عنوان الـ IP"
                            value="192.168.1.42"
                        />
                        <DataBox
                            delay={180}
                            accentColor={COLORS.blue}
                            icon={<SsidIcon size={40} color={COLORS.blue} />}
                            title="Wi-Fi SSID / BSSID"
                            value="Office_Wifi_5G"
                        />
                        <DataBox
                            delay={220}
                            accentColor={COLORS.green}
                            icon={<StrengthIcon size={40} color={COLORS.green} />}
                            title="قوة الإشارة"
                            value="-45 dBm (Strong)"
                        />

                        {/* Animated Visual: Triangulation circles */}
                        <div style={{
                            position: 'relative', marginTop: 40,
                            opacity: spring({ frame: frame - 250, fps })
                        }}>
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} style={{
                                    position: 'absolute',
                                    top: '50%', left: '50%',
                                    width: 150 + i * 80, height: 150 + i * 80,
                                    borderRadius: '50%',
                                    border: `1.5px dashed ${COLORS.green}${Math.floor(interpolate(Math.sin(frame / 20 + i), [-1, 1], [10, 50])).toString(16)}`,
                                    transform: `translate(-50%, -50%) rotate(${frame * (i + 1) * 0.2}deg)`,
                                }} />
                            ))}
                            <div style={{
                                width: 20, height: 20, background: COLORS.red, borderRadius: '50%',
                                boxShadow: `0 0 20px ${COLORS.red}`, zIndex: 5
                            }} />
                        </div>
                    </div>
                )}

            </div>

            {/* Glowing Scan Bar */}
            <div style={{
                position: 'absolute', top: (frame * 6) % 1920, left: 0, right: 0,
                height: 2, background: `linear-gradient(90deg, transparent, ${COLORS.green}44, transparent)`, opacity: 0.2
            }} />
        </AbsoluteFill>
    );
};

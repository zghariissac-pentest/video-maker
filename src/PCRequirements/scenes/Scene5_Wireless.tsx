import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import {
    RequirementsBg,
    Vignette,
    COLORS,
    WifiIcon,
    Particle
} from '../components/RequirementsTheme';

export const Scene5_Wireless: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 20 seconds = 600 frames
    const contentShow = 80;
    const adapterSpring = spring({ frame, fps, config: { damping: 12 } });

    // Pulse effect for wifi propagation
    const pulse = interpolate(frame % 40, [0, 40], [0, 1]);
    const pulseScale = interpolate(pulse, [0, 1], [0.8, 1.5]);
    const pulseOp = interpolate(pulse, [0, 1], [0.4, 0]);

    // Exit
    const { durationInFrames } = useVideoConfig();
    const exitOp = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0]);

    return (
        <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: 'hidden' }}>
            <RequirementsBg />

            <Particle delay={80} x="15%" y="40%" size={6} color={COLORS.teal} />
            <Particle delay={100} x="85%" y="60%" size={10} color={COLORS.purple} />

            <div style={{ opacity: exitOp, width: '100%', height: '100%' }}>

                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: 60,
                    padding: '0 80px',
                    transform: `translateY(${interpolate(adapterSpring, [0, 1], [40, 0])}px)`
                }}>
                    {/* Icon with propagation effect */}
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* Waves */}
                        <div style={{
                            position: 'absolute', width: 200, height: 200, borderRadius: '50%',
                            border: `2px solid ${COLORS.teal}44`, transform: `scale(${pulseScale})`, opacity: pulseOp
                        }} />
                        <div style={{
                            width: 180, height: 180, borderRadius: 50,
                            background: `radial-gradient(circle, ${COLORS.teal}11, transparent 70%)`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: `1px solid ${COLORS.teal}22`
                        }}>
                            <WifiIcon size={120} color={COLORS.teal} />
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{
                            color: COLORS.teal, fontSize: 64, fontWeight: 900, direction: 'rtl', margin: '0 0 20px 0', fontFamily: 'Cairo',
                            textShadow: `0 0 30px ${COLORS.teal}33`
                        }}>
                            تفصيل مهم
                        </h2>

                        <div style={{
                            opacity: interpolate(frame, [contentShow, contentShow + 15], [0, 1]),
                            transform: `translateY(${interpolate(spring({ frame: frame - contentShow, fps }), [0, 1], [20, 0])}px)`
                        }}>
                            <p style={{
                                color: 'white', fontSize: 40, fontWeight: 700, direction: 'rtl', lineHeight: 1.5, margin: 0,
                                fontFamily: 'Cairo'
                            }}>
                                إذا كنت مهتماً بمجال <span style={{ color: COLORS.teal }}>Wireless Security</span>
                                <br />
                                فقد تحتاج إلى <span style={{ color: COLORS.pink }}>USB Wi-Fi Adapter</span>
                            </p>

                            <div style={{
                                marginTop: 30, padding: '20px 30px', background: 'rgba(255,255,255,0.03)',
                                borderRadius: 20, borderLeft: `4px solid ${COLORS.teal}`, textAlign: 'right'
                            }}>
                                <p style={{ color: COLORS.gray, fontSize: 30, direction: 'rtl', margin: 0, fontFamily: 'Cairo', lineHeight: 1.4 }}>
                                    يجب أن يدعم <span style={{ color: COLORS.white }}>Monitor Mode</span> و <span style={{ color: COLORS.white }}>Packet Injection</span>
                                    <br />
                                    لاستخدام أدوات مثل <span style={{ color: COLORS.teal, fontWeight: 800 }}>Aircrack-ng</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <Vignette />
        </AbsoluteFill>
    );
};

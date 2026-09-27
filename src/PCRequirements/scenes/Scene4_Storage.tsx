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
    StorageIcon,
    VMIcon,
    Particle
} from '../components/RequirementsTheme';

export const Scene4_Storage: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 20 seconds = 600 frames
    const ssdImportanceShow = 40;
    const capacityShow = 300;

    const ssdSpring = spring({ frame, fps, config: { damping: 12 } });
    const capSpring = spring({ frame: frame - capacityShow, fps, config: { damping: 14 } });

    // SSD speed visual

    // Exit
    const { durationInFrames } = useVideoConfig();
    const exitOp = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0]);

    return (
        <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: 'hidden' }}>
            <RequirementsBg />

            <Particle delay={50} x="30%" y="15%" size={8} color={COLORS.blue} />
            <Particle delay={70} x="70%" y="85%" size={12} color={COLORS.teal} />

            <div style={{ opacity: exitOp, width: '100%', height: '100%' }}>

                {/* SSD Importance Section */}
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    opacity: interpolate(frame, [0, 15], [0, 1]) * interpolate(frame, [capacityShow - 10, capacityShow], [1, 0.3]),
                    gap: 50,
                    padding: '0 80px',
                    transform: `translateY(${interpolate(ssdSpring, [0, 1], [40, 0])}px)`
                }}>
                    <div style={{ position: 'relative' }}>
                        <StorageIcon size={180} color={COLORS.blue} />
                        {/* Speed lines effect */}
                        <div style={{
                            position: 'absolute', right: -40, top: '50%',
                            width: 60, height: 2, background: COLORS.blue, opacity: 0.3,
                            boxShadow: `0 0 10px ${COLORS.blue}`
                        }} />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ color: COLORS.blue, fontSize: 72, fontWeight: 900, direction: 'rtl', margin: '0 0 30px 0', fontFamily: 'Cairo' }}>
                            ثالثاً: التخزين – Storage
                        </h2>
                        <p style={{
                            color: 'white', fontSize: 48, fontWeight: 700, direction: 'rtl', lineHeight: 1.5, margin: 0,
                            fontFamily: 'Cairo',
                            opacity: interpolate(frame, [ssdImportanceShow, ssdImportanceShow + 15], [0, 1])
                        }}>
                            استخدام <span style={{ color: COLORS.blue }}>SSD</span> مهم جداً.
                            <br />
                            <span style={{ fontSize: 36, color: COLORS.gray }}>بسبب كثافة عمليات القراءة والكتابة للـ VMs.</span>
                        </p>
                    </div>
                </div>

                {/* Capacity Comparison Section */}
                {frame >= capacityShow && (
                    <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        gap: 50,
                        opacity: interpolate(capSpring, [0, 1], [0, 1]),
                        transform: `translateY(${interpolate(capSpring, [0, 1], [30, 0])}px)`
                    }}>
                        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-end' }}>
                            {/* 256GB Box */}
                            <div style={{
                                background: `${COLORS.blue}11`, border: `2px solid ${COLORS.blue}33`,
                                width: 220, height: 180, borderRadius: 24,
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                gap: 10
                            }}>
                                <div style={{ fontSize: 48, fontWeight: 900, color: COLORS.white }}>256GB</div>
                                <span style={{ color: COLORS.gray, fontSize: 24, fontWeight: 700 }}>Min</span>
                            </div>

                            {/* Arrow */}
                            <div style={{ fontSize: 50, color: COLORS.blue, marginBottom: 60 }}>→</div>

                            {/* 512GB Box */}
                            <div style={{
                                background: `linear-gradient(135deg, ${COLORS.blue}22, ${COLORS.teal}22)`,
                                border: `2px solid ${COLORS.teal}44`,
                                width: 250, height: 220, borderRadius: 24,
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                gap: 10,
                                boxShadow: `0 20px 50px ${COLORS.teal}11`,
                                transform: `scale(${interpolate(spring({ frame: frame - capacityShow - 15, fps }), [0, 1], [1, 1.05])})`
                            }}>
                                <div style={{ fontSize: 56, fontWeight: 900, color: COLORS.white }}>512GB+</div>
                                <span style={{ color: COLORS.teal, fontSize: 24, fontWeight: 800 }}>Recommended</span>
                            </div>
                        </div>

                        <p style={{
                            color: 'white', fontSize: 42, fontWeight: 600, direction: 'rtl', textAlign: 'center',
                            margin: 0, padding: '0 80px', fontFamily: 'Cairo', lineHeight: 1.4
                        }}>
                            مساحة <span style={{ color: COLORS.teal }}>512GB</span> أفضل
                            لبناء مختبر كامل يحتوي على عدة أنظمة.
                        </p>

                        {/* VM icons representing systems inside */}
                        <div style={{ display: 'flex', gap: 15, opacity: 0.5 }}>
                            <VMIcon size={40} color={COLORS.gray} />
                            <VMIcon size={40} color={COLORS.gray} />
                            <VMIcon size={40} color={COLORS.gray} />
                        </div>
                    </div>
                )}

            </div>

            <Vignette />
        </AbsoluteFill>
    );
};

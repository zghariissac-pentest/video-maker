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
    CPUIcon,
    RAMIcon,
    VMIcon,
    TargetIcon,
} from '../components/RequirementsTheme';

export const Scene3_Hardware: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Timings (40 seconds total = 1200 frames)
    const cpuStart = 0;
    const cpuFeatureShow = 120;
    const ramStart = 480; // 16s in
    const ramDetailStart = 660; // 22s in
    const ramLabStart = 900; // 30s in

    // CPU Animations
    const cpuSpring = spring({ frame: frame - cpuStart, fps, config: { damping: 12 } });
    const cpuFeatureSpring = spring({ frame: frame - cpuFeatureShow, fps, config: { damping: 14 } });

    // RAM Animations
    const ramSpring = spring({ frame: frame - ramStart, fps, config: { damping: 12 } });
    const ramDetailSpring = spring({ frame: frame - ramDetailStart, fps, config: { damping: 14 } });
    const ramLabSpring = spring({ frame: frame - ramLabStart, fps, config: { damping: 12 } });

    // Exit
    const { durationInFrames } = useVideoConfig();
    const exitOp = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0]);

    return (
        <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: 'hidden' }}>
            <RequirementsBg />

            <div style={{ opacity: exitOp, width: '100%', height: '100%' }}>

                {/* --- SECTION: CPU (0 - 8s) --- */}
                {frame < ramStart && (
                    <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        gap: 60, padding: '0 80px',
                        opacity: interpolate(frame, [ramStart - 15, ramStart], [1, 0])
                    }}>
                        <div style={{ transform: `scale(${interpolate(cpuSpring, [0, 1], [0.5, 1])}) translateY(${interpolate(cpuSpring, [0, 1], [50, 0])}px)` }}>
                            <CPUIcon size={180} color={COLORS.purple} />
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{ color: COLORS.purple, fontSize: 72, fontWeight: 900, direction: 'rtl', margin: '0 0 20px 0', fontFamily: 'Cairo' }}>
                                المعالج – CPU
                            </h2>
                            <p style={{
                                color: 'white', fontSize: 44, fontWeight: 600, direction: 'rtl', lineHeight: 1.4, margin: 0,
                                fontFamily: 'Cairo', opacity: interpolate(cpuFeatureSpring, [0, 1], [0, 1])
                            }}>
                                يجب أن يدعم خاصية <span style={{ color: COLORS.pink }}>Hardware Virtualization</span>
                                <br />
                                <span style={{ fontSize: 32, color: COLORS.gray }}>(Intel VT-x / AMD-V)</span>
                            </p>

                            {frame > cpuFeatureShow + 60 && (
                                <div style={{
                                    marginTop: 40, padding: '20px 40px', borderRadius: 20, background: `${COLORS.purple}11`, border: `1px solid ${COLORS.purple}33`,
                                    opacity: interpolate(frame, [cpuFeatureShow + 60, cpuFeatureShow + 80], [0, 1]),
                                    transform: `translateY(${interpolate(spring({ frame: frame - (cpuFeatureShow + 60), fps }), [0, 1], [20, 0])}px)`
                                }}>
                                    <p style={{ color: 'white', fontSize: 32, direction: 'rtl', margin: 0, fontFamily: 'Cairo' }}>
                                        تسمح بتشغيل أنظمة مثل Kali Linux بكفاءة عالية.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* --- SECTION: RAM (8s - 20s) --- */}
                {frame >= ramStart && (
                    <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        gap: 40, padding: '0 60px'
                    }}>
                        {/* RAM Icon & Title */}
                        {frame < ramLabStart && (
                            <div style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30,
                                opacity: interpolate(ramSpring, [0, 1], [0, 1]) * interpolate(frame, [ramLabStart - 10, ramLabStart], [1, 0.4])
                            }}>
                                <RAMIcon size={160} color={COLORS.teal} />
                                <h2 style={{ color: COLORS.teal, fontSize: 72, fontWeight: 900, margin: 0, fontFamily: 'Cairo' }}>
                                    الذاكرة – RAM
                                </h2>
                            </div>
                        )}

                        {/* Practical Minimum (8GB) */}
                        {frame >= ramStart + 30 && frame < ramLabStart && (
                            <div style={{
                                textAlign: 'center',
                                opacity: interpolate(ramDetailSpring, [0, 1], [0, 1]),
                                transform: `translateY(${interpolate(ramDetailSpring, [0, 1], [20, 0])}px)`
                            }}>
                                <div style={{ fontSize: 80, fontWeight: 900, color: COLORS.white, marginBottom: 10 }}>8GB <span style={{ fontSize: 40, color: COLORS.teal }}>Min</span></div>
                                <p style={{ color: COLORS.gray, fontSize: 36, direction: 'rtl', margin: 0, fontFamily: 'Cairo' }}>
                                    تكفي لتشغيل Virtual Machine واحدة فقط.
                                </p>
                            </div>
                        )}

                        {/* Lab Environment (16GB) */}
                        {frame >= ramLabStart && (
                            <div style={{
                                width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                                opacity: interpolate(ramLabSpring, [0, 1], [0, 1])
                            }}>
                                {/* Lab Visual */}
                                <div style={{ display: 'flex', gap: 60, alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15 }}>
                                        <VMIcon size={100} color={COLORS.blue} />
                                        <span style={{ color: COLORS.blue, fontSize: 24, fontWeight: 800 }}>KALI</span>
                                    </div>
                                    <div style={{ fontSize: 50, color: COLORS.gray }}>VS</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15 }}>
                                        <TargetIcon size={100} color={COLORS.red} />
                                        <span style={{ color: COLORS.red, fontSize: 24, fontWeight: 800 }}>TARGET</span>
                                    </div>
                                </div>

                                <div style={{
                                    background: `linear-gradient(135deg, ${COLORS.teal}22, ${COLORS.blue}22)`,
                                    padding: '40px 60px', borderRadius: 30, border: `2px solid ${COLORS.teal}44`,
                                    textAlign: 'center', boxShadow: `0 20px 50px ${COLORS.teal}11`
                                }}>
                                    <div style={{ fontSize: 90, fontWeight: 900, color: COLORS.white }}>16GB <span style={{ color: COLORS.teal }}>Recommended</span></div>
                                    <p style={{ color: 'white', fontSize: 36, direction: 'rtl', margin: '20px 0 0 0', fontFamily: 'Cairo', lineHeight: 1.4 }}>
                                        تسمح بتشغيل عدة أجهزة في نفس الوقت
                                        <br />
                                        <span style={{ color: COLORS.teal }}>لتجربة اختراق احترافية.</span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};

import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    spring,
    interpolate,
} from 'remotion';
import { Target, LayoutTemplate, Network, Activity, ShieldAlert, KeyRound, Terminal } from 'lucide-react';
import { SpaceBg, StarField, Vignette, COLORS } from '../components/Theme';

export const Scene2_Template: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animations for Part 1 (Template concept)
    const part1Appear = spring({
        frame,
        fps,
        config: { damping: 14, stiffness: 100 }
    });
    const part1Disappear = interpolate(frame, [140, 160], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const part1Opacity = frame < 140 ? part1Appear : part1Disappear;
    const part1Y = interpolate(frame, [140, 160], [0, -50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Animations for Part 2 (Sections)
    const part2Wait = 160;
    const part2Appear = spring({
        frame: frame - part2Wait,
        fps,
        config: { damping: 14, stiffness: 100 }
    });
    const part2Disappear = interpolate(frame, [380, 400], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const part2Opacity = frame < 380 ? part2Appear : part2Disappear;
    const part2Y = interpolate(frame, [380, 400], [0, -50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Animations for Part 3 (Final tip)
    const part3Wait = 400;
    const part3Appear = spring({
        frame: frame - part3Wait,
        fps,
        config: { damping: 14, stiffness: 100 }
    });
    const part3Scale = interpolate(part3Appear, [0, 1], [0.8, 1]);
    const part3Y = interpolate(part3Appear, [0, 1], [50, 0]);

    const sections = [
        { icon: <Network size={40} color={COLORS.primary} />, text: 'Recon' },
        { icon: <Activity size={40} color={COLORS.secondary} />, text: 'Subdomains' },
        { icon: <Target size={40} color={COLORS.accent} />, text: 'Open Ports' },
        { icon: <ShieldAlert size={40} color="#ff4d4d" />, text: 'Attack Surface' },
        { icon: <KeyRound size={40} color="#ffd700" />, text: 'Potential Entry Points' }
    ];

    return (
        <AbsoluteFill style={{ background: '#02060a', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField />
            <Vignette />

            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                {/* Part 1 */}
                <div style={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: part1Opacity,
                    transform: `translateY(${part1Y}px)`,
                }}>
                    <div style={{ display: 'flex', gap: 40, marginBottom: 50 }}>
                        <div style={{
                            padding: 30,
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '20px',
                            border: `2px solid ${COLORS.primary}80`,
                            boxShadow: `0 0 30px ${COLORS.primary}40`,
                        }}>
                            <LayoutTemplate size={80} color={COLORS.primary} />
                        </div>
                    </div>

                    <h1 style={{
                        fontFamily: 'Cairo, sans-serif',
                        fontSize: 60,
                        color: 'white',
                        textAlign: 'center',
                        direction: 'rtl',
                        lineHeight: 1.5,
                        textShadow: '0 0 20px rgba(255,255,255,0.3)',
                        maxWidth: '85%'
                    }}>
                        بدلاً من كتابة ملاحظات عشوائية،<br />
                        أنشئ <span style={{ color: COLORS.primary }}>Template</span> ثابت لكل هدف.
                    </h1>
                </div>

                {/* Part 2: Sections List */}
                <div style={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: part2Opacity,
                    width: '80%',
                    transform: `translateY(${part2Y}px)`,
                }}>
                    <h2 style={{
                        fontFamily: 'Cairo, sans-serif',
                        fontSize: 50,
                        color: 'white',
                        textAlign: 'center',
                        direction: 'rtl',
                        marginBottom: 40,
                        textShadow: '0 0 20px rgba(255,255,255,0.3)',
                    }}>
                        كل <span style={{ color: COLORS.secondary }}>Target</span> يجب أن يحتوي على أقسام مثل:
                    </h2>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 20,
                        width: '100%',
                        maxWidth: '600px',
                    }}>
                        {sections.map((sec, i) => {
                            const itemAppear = spring({
                                frame: frame - (part2Wait + 20 + i * 20),
                                fps,
                                config: { damping: 12, stiffness: 100 }
                            });
                            const translateX = interpolate(itemAppear, [0, 1], [-50, 0]);

                            return (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 20,
                                    padding: '15px 30px',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '15px',
                                    borderLeft: `4px solid ${i % 2 === 0 ? COLORS.primary : COLORS.secondary}`,
                                    opacity: itemAppear,
                                    transform: `translateX(${translateX}px)`,
                                }}>
                                    {sec.icon}
                                    <span style={{
                                        fontFamily: 'Fira Code, monospace',
                                        fontSize: 35,
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}>
                                        {sec.text}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Part 3 */}
                <div style={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: part3Appear,
                    transform: `scale(${part3Scale}) translateY(${part3Y}px)`,
                }}>
                    <div style={{
                        padding: 30,
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '50%',
                        border: `2px solid ${COLORS.accent}80`,
                        boxShadow: `0 0 30px ${COLORS.accent}40`,
                        marginBottom: 40,
                    }}>
                        <Terminal size={80} color={COLORS.accent} />
                    </div>
                    <h1 style={{
                        fontFamily: 'Cairo, sans-serif',
                        fontSize: 55,
                        color: 'white',
                        textAlign: 'center',
                        direction: 'rtl',
                        lineHeight: 1.5,
                        textShadow: '0 0 20px rgba(255,255,255,0.3)',
                        maxWidth: '90%'
                    }}>
                        ثم تضيف تحت كل قسم<br />
                        <span style={{ color: COLORS.accent }}>النتائج والأوامر</span> التي استخدمتها.
                    </h1>
                </div>

            </AbsoluteFill>
        </AbsoluteFill>
    );
};

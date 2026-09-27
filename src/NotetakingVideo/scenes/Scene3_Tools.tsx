import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    spring,
    interpolate,
    Img,
    staticFile
} from 'remotion';
import { Zap, Search, Waypoints } from 'lucide-react';
import { SpaceBg, StarField, Vignette, COLORS } from '../components/Theme';

export const Scene3_Tools: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animations for Part 1 (Tools Introduction)
    const part1Appear = spring({
        frame,
        fps,
        config: { damping: 14, stiffness: 100 }
    });

    const part1Disappear = interpolate(frame, [150, 170], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const part1Opacity = frame < 150 ? part1Appear : part1Disappear;
    const part1Y = interpolate(frame, [150, 170], [0, -50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Animations for Part 2 (Why use them)
    const part2Wait = 170;
    const part2Appear = spring({
        frame: frame - part2Wait,
        fps,
        config: { damping: 14, stiffness: 100 }
    });
    const part2Scale = interpolate(part2Appear, [0, 1], [0.8, 1]);
    const part2Y = interpolate(part2Appear, [0, 1], [50, 0]);

    return (
        <AbsoluteFill style={{ background: '#02060a', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField />
            <Vignette />

            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                {/* Part 1: Tools */}
                <div style={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: part1Opacity,
                    transform: `translateY(${part1Y}px)`,
                }}>
                    <div style={{ display: 'flex', gap: 60, marginBottom: 50 }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 15
                        }}>
                            <div style={{
                                padding: 30,
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '25px',
                                border: `2px solid #7c3aed80`,
                                boxShadow: `0 0 30px #7c3aed40`,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 144,
                                height: 144
                            }}>
                                <Img src={staticFile("obsidian.svg")} style={{ width: 80, height: 80 }} />
                            </div>
                            <span style={{ color: 'white', fontFamily: 'Fira Code', fontSize: 24 }}>Obsidian</span>
                        </div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 15
                        }}>
                            <div style={{
                                padding: 30,
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '25px',
                                border: `2px solid #ffffff80`,
                                boxShadow: `0 0 30px #ffffff40`,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 144,
                                height: 144
                            }}>
                                <Img src={staticFile("markdown.svg")} style={{ width: 80, height: 80, filter: 'brightness(0) invert(1)' }} />
                            </div>
                            <span style={{ color: 'white', fontFamily: 'Fira Code', fontSize: 24 }}>Markdown</span>
                        </div>
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
                        يمكنك استخدام أدوات مثل<br />
                        <span style={{ color: COLORS.primary }}>Obsidian</span> أو ملفات <span style={{ color: COLORS.secondary }}>Markdown</span>
                    </h1>
                </div>

                {/* Part 2: Features */}
                <div style={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: part2Appear,
                    transform: `scale(${part2Scale}) translateY(${part2Y}px)`,
                }}>
                    <div style={{ display: 'flex', gap: 40, marginBottom: 50 }}>
                        <div style={{
                            padding: 30,
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '30px',
                            border: `2px solid ${COLORS.accent}80`,
                            boxShadow: `0 0 30px ${COLORS.accent}40`,
                            display: 'flex',
                            gap: 15,
                            alignItems: 'center'
                        }}>
                            <Search size={45} color={COLORS.accent} />
                            <Zap size={45} color="#ffd700" />
                        </div>
                        <div style={{
                            padding: 30,
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '30px',
                            border: `2px solid ${COLORS.primary}80`,
                            boxShadow: `0 0 30px ${COLORS.primary}40`,
                        }}>
                            <Waypoints size={55} color={COLORS.primary} />
                        </div>
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
                        لأن <span style={{ color: COLORS.accent }}>البحث</span> داخلها سريع<br />
                        وتدعم <span style={{ color: COLORS.primary }}>الربط</span> بين الملاحظات.
                    </h1>
                </div>

            </AbsoluteFill>
        </AbsoluteFill>
    );
};

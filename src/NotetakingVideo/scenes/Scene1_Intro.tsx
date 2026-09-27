import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    spring,
    interpolate,
} from 'remotion';
import { Search, Bug, BookOpen, FolderTree } from 'lucide-react';
import { SpaceBg, StarField, Vignette, COLORS } from '../components/Theme';

export const Scene1_Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animations for Part 1 (Finding bugs)
    const part1Appear = spring({
        frame,
        fps,
        config: { damping: 14, stiffness: 100 }
    });
    const part1Disappear = interpolate(frame, [130, 150], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const part1Scale = interpolate(part1Appear, [0, 1], [0.8, 1]);
    const part1Opacity = frame < 130 ? part1Appear : part1Disappear;
    const part1Y = interpolate(frame, [130, 150], [0, -50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Animations for Part 2 (Organizing notes)
    const part2Wait = 150;
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
                {/* Part 1 */}
                <div style={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: part1Opacity,
                    transform: `scale(${part1Scale}) translateY(${part1Y}px)`,
                }}>
                    <div style={{ display: 'flex', gap: 40, marginBottom: 50 }}>
                        <div style={{
                            padding: 30,
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '50%',
                            border: `2px solid ${COLORS.primary}80`,
                            boxShadow: `0 0 30px ${COLORS.primary}40`,
                        }}>
                            <Search size={80} color={COLORS.primary} />
                        </div>
                        <div style={{
                            padding: 30,
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '50%',
                            border: `2px solid ${COLORS.secondary}80`,
                            boxShadow: `0 0 30px ${COLORS.secondary}40`,
                        }}>
                            <Bug size={80} color={COLORS.secondary} />
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
                        إذا كنت تريد أن تصبح أفضل في<br />
                        <span style={{ color: COLORS.secondary }}>العثور على الثغرات…</span>
                    </h1>
                </div>

                {/* Part 2 */}
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
                        }}>
                            <BookOpen size={100} color={COLORS.accent} />
                        </div>
                        <div style={{
                            padding: 30,
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '30px',
                            border: `2px solid ${COLORS.primary}80`,
                            boxShadow: `0 0 30px ${COLORS.primary}40`,
                        }}>
                            <FolderTree size={100} color={COLORS.primary} />
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
                        maxWidth: '90%'
                    }}>
                        ابدأ بتنظيم <span style={{ color: COLORS.accent }}>ملاحظاتك</span><br />
                        بهذه الطريقة.
                    </h1>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
